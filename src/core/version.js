/**
 * Parses a semver version string into parts for robust comparison.
 * Supports pre-releases (alpha, beta, rc) and build tags.
 * 
 * @param {string} v Version string (e.g. "1.0.0-beta.2")
 * @returns {{parts: number[], isPre: boolean, preType: number, preNumber: number}}
 */
export function parseVersion(v) {
    if (!v) return { parts: [0, 0, 0], isPre: false, preType: 3, preNumber: 0 };
    let clean = String(v).replace(/^v/, "");
    const hasBuild = clean.indexOf("+");
    if (hasBuild !== -1) clean = clean.substring(0, hasBuild);

    const hasPre = clean.indexOf("-");
    const isPre = hasPre !== -1;
    const base = isPre ? clean.substring(0, hasPre) : clean;
    const preTag = isPre ? clean.substring(hasPre + 1).toLowerCase() : "";

    const parts = base.split(".").map(p => {
        const val = parseInt(p, 10);
        return isNaN(val) ? 0 : val;
    });

    let preType = 3; // default: stable
    let preNumber = 0;
    if (isPre) {
        if (preTag.indexOf("alpha") !== -1) preType = 0;
        else if (preTag.indexOf("beta") !== -1) preType = 1;
        else if (preTag.indexOf("rc") !== -1) preType = 2;

        if (preType < 3) {
            const numMatch = preTag.match(/\d+/);
            if (numMatch) preNumber = parseInt(numMatch[0], 10);
        }
    }

    return {
        parts: [parts[0] || 0, parts[1] || 0, parts[2] || 0],
        isPre,
        preType,
        preNumber
    };
}

/**
 * Returns true if the incoming version is strictly newer than the current version.
 * 
 * @param {string} incoming Incoming version to check
 * @param {string} current Active/current version to compare against
 * @returns {boolean}
 */
export function isNewerVersion(incoming, current) {
    const a = parseVersion(incoming);
    const b = parseVersion(current);
    for (let i = 0; i < 3; i++) {
        if (a.parts[i] > b.parts[i]) return true;
        if (a.parts[i] < b.parts[i]) return false;
    }
    if (a.isPre !== b.isPre) {
        return !a.isPre;
    }
    if (a.preType > b.preType) return true;
    if (a.preType < b.preType) return false;
    if (a.preNumber > b.preNumber) return true;
    return false;
}

/**
 * Returns true if the incoming build date is strictly later than the current build date.
 * Both values are ISO 8601 strings (lexicographic comparison is valid for ISO dates).
 * Returns false if either date is missing or unparseable.
 *
 * @param {string} incomingDate Incoming build date ISO string
 * @param {string} currentDate  Active engine build date ISO string
 * @returns {boolean}
 */
export function isNewerBuildDate(incomingDate, currentDate) {
    if (!incomingDate || !currentDate) return false;
    if (incomingDate === 'development' || currentDate === 'development') return false;
    try {
        return new Date(incomingDate).getTime() > new Date(currentDate).getTime();
    } catch (e) {
        return false;
    }
}
