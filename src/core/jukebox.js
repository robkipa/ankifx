import FlodPlayer from 'funkymed-flod-module-player/src/FlodPlayer';

export class Jukebox {
    constructor(options = {}) {
        this.baseRawUrl = "https://raw.githubusercontent.com/michioxd/keygen-music/master/";
        this.indexUrl = this.baseRawUrl + "index.json";
        
        this.trackList = [];
        this.history = [];
        this.maxHistory = 50;
        this.historyCursor = -1;
        
        this.currentPlayer = null;
        this.isPlaying = false;
        this.pollInterval = null;
        this._opId = 0; // incremented on every play attempt to cancel stale async chains
        this.onTrackChange = options.onTrackChange || (() => {});
        this.onError = options.onError || (() => {});
        this.hasFetchedIndex = false;
        this.currentTrack = null;
    }

    async init() {
        if (this.hasFetchedIndex) return;
        try {
            const res = await fetch(this.indexUrl);
            if (!res.ok) throw new Error("Network response was not ok");
            const data = await res.json();
            
            const validExts = ['xm', 'mod', 's3m', 'it'];
            this.trackList = data.filter(track => 
                track.fileExtension && validExts.includes(track.fileExtension.toLowerCase())
            );
            this.hasFetchedIndex = true;
        } catch (e) {
            console.warn('[Jukebox] Offline or failed to fetch track index:', e.message);
            this.trackList = []; // silent fail
            this.onError("NO INTERNET OR BLOCKED ... TRY AGAIN?");
            throw e; // throw so playNext sees it
        }
    }

    async playNext(target = null) {
        this.stop();
        const opId = ++this._opId;

        try {
            if (!this.hasFetchedIndex) {
                await this.init();
                if (opId !== this._opId) return; // superseded
            }

            if (this.trackList.length === 0) {
                console.warn('[Jukebox] Track list is empty — no tracks to play.');
                return;
            }

            let track = null;

            if (target && typeof target === 'object') {
                const { title, trackTitle, artist } = target;
                const matches = this.trackList.filter(t => {
                    const artistMatch = !artist || (t.artist && t.artist.toLowerCase() === artist.toLowerCase());
                    const titleMatch = !title || (t.title && t.title.toLowerCase() === title.toLowerCase());
                    const trackMatch = !trackTitle || (t.trackTitle && t.trackTitle.toLowerCase() === trackTitle.toLowerCase());
                    return artistMatch && titleMatch && trackMatch;
                });
                
                if (matches.length === 0) {
                    console.warn('[Jukebox] No matches for target object — playing random:', target);
                } else if (matches.length > 1) {
                    console.warn(`[Jukebox] ${matches.length} ambiguous matches for target object — using first. Refine your search:`, matches);
                }
                track = matches[0] || null;
            } else if (target && typeof target === 'string') {
                const matches = this.trackList.filter(t => t.title && t.title.toLowerCase() === target.toLowerCase());
                if (matches.length === 0) {
                    console.warn('[Jukebox] No matches for target title string — playing random:', target);
                } else if (matches.length > 1) {
                    console.warn(`[Jukebox] ${matches.length} ambiguous matches for title string — using first:`, matches);
                }
                track = matches[0] || null;
            }

            if (!track && !target && this.historyCursor < this.history.length - 1) {
                this.historyCursor++;
                track = this.trackList[this.history[this.historyCursor]];
            } else if (!track) {
                // Pick a random track not in history
                const available = this.trackList.filter((_, i) => !this.history.includes(i));
                if (available.length === 0) {
                    this.history = []; // reset if somehow we played everything
                    this.historyCursor = -1;
                }

                const validList = available.length > 0 ? available : this.trackList;
                track = validList[Math.floor(Math.random() * validList.length)];
                
                const trackIndex = this.trackList.indexOf(track);
                
                if (this.historyCursor < this.history.length - 1) {
                    this.history = this.history.slice(0, this.historyCursor + 1);
                }

                this.history.push(trackIndex);
                if (this.history.length > this.maxHistory) {
                    this.history.shift();
                }
                this.historyCursor = this.history.length - 1;
            }

            await this._playTrack(track, opId);
        } catch (e) {
            console.warn('[Jukebox] Track fetch failed — network issue?', e.message);
            this.onError("NO INTERNET OR BLOCKED ... TRY AGAIN?");
        }
    }

    async playPrevious() {
        if (this.historyCursor > 0) {
            this.stop();
            const opId = ++this._opId;
            this.historyCursor--;
            const track = this.trackList[this.history[this.historyCursor]];
            try {
                await this._playTrack(track, opId);
            } catch (e) {
                console.warn('[Jukebox] Previous track fetch failed:', e.message);
                this.onError("NO INTERNET OR BLOCKED ... TRY AGAIN?");
            }
        }
    }

    async _playTrack(track, opId) {
        const encodedPath = track.path.split('/').map(segment => encodeURIComponent(segment)).join('/');
        const trackUrl = this.baseRawUrl + encodedPath;
        const res = await fetch(trackUrl);
        if (!res.ok) throw new Error("Failed to fetch audio file");
        if (opId !== this._opId) return; // superseded while fetching
        
        const arrayBuffer = await res.arrayBuffer();
        if (opId !== this._opId) return; // superseded while reading buffer
        
        let loaded = null;
        try {
            loaded = FlodPlayer.load(arrayBuffer);
        } catch (e) {
            console.warn(`[Jukebox] Unsupported format for "${track.title}" — skipping:`, e.message);
            if (opId === this._opId) setTimeout(() => this.playNext(), 100);
            return;
        }

        if (opId !== this._opId) return; // superseded while decoding
        this.currentPlayer = loaded;
        
        if (this.currentPlayer) {
            this.currentTrack = track;
            // Prevent automatic looping if the player supports it
            if (typeof this.currentPlayer.loopSong !== 'undefined') {
                this.currentPlayer.loopSong = 1;
            }
            
            this.currentPlayer.play();
            this.isPlaying = true;
            this.onTrackChange(track);
            this.setupCompletionPolling();
        } else {
            // If Flod fails to load it, play next randomly
            setTimeout(() => this.playNext(), 100);
        }
    }

    setupCompletionPolling() {
        if (this.pollInterval) clearInterval(this.pollInterval);

        this.pollInterval = setInterval(() => {
            if (!this.currentPlayer) return this.stopPolling();
            
            // Poll for player stop if it supports it automatically.
            let isStopped = false;
            if (this.currentPlayer.amiga && this.currentPlayer.amiga.playing === false) isStopped = true;
            if (this.currentPlayer.mixer && this.currentPlayer.mixer.playing === false) isStopped = true;
            if (this.currentPlayer.stopped) isStopped = true;
            if (this.currentPlayer.playing === false) isStopped = true;


            if (isStopped) {
                this.playNext();
            }
        }, 1000);
    }

    stopPolling() {
        if (this.pollInterval) {
            clearInterval(this.pollInterval);
            this.pollInterval = null;
        }
    }

    stop() {
        this._opId++; // Invalidate all pending async track loads
        this.stopPolling();
        this.isPlaying = false;
        
        if (this.currentPlayer) {
            try {
                this.currentPlayer.stop();
            } catch (e) {}
            this.currentPlayer = null;
        }
    }
}
