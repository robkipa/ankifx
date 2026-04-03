(()=>{var u=null;function E(b,o,l="bottom"){let e=document.createElement("canvas");e.style.position="absolute",e.style.top="0",e.style.left="0",e.style.width="100vw",e.style.height="100vh",e.style.zIndex="-1",e.style.pointerEvents="none",b.appendChild(e);let t=e.getContext("2d",{alpha:!1}),r,i,s=0;function x(){r=e.width=window.innerWidth||document.documentElement.clientWidth,i=e.height=window.innerHeight||document.documentElement.clientHeight,s=r}window.addEventListener("resize",x),x();let a=0,d=15,g=o.length*d;function h(){a+=.012,t.globalCompositeOperation="source-over",t.fillStyle="rgba(2, 2, 5, 0.3)",t.fillRect(0,0,r,i),t.globalCompositeOperation="lighter";let I=r/2,M=i/2,B=Math.max(r,i)*.85;for(let n=0;n<35;n++){let p=a+n*.05,c=(Math.sin(p*.8)*.5+.5)*B+n*12;t.save(),t.translate(I,M),t.rotate(Math.sin(a*.3)*Math.PI+n*.06),t.scale(Math.sin(a*.5+n*.1)*.4+.8,Math.cos(a*.4+n*.1)*.4+.8),t.beginPath();for(let f=0;f<=8;f++){let v=f/8*Math.PI*2,w=Math.cos(v)*c,k=Math.sin(v)*c;f===0?t.moveTo(w,k):t.lineTo(w,k)}let y=(a*50+n*10)%360;t.strokeStyle=`hsla(${y}, 95%, 65%, 0.6)`,t.lineWidth=4,t.stroke(),t.restore()}t.globalCompositeOperation="source-over",t.font='bold 24px "Courier New", monospace',s-=2.8,s<-(g+r*1.1)&&(s=r);for(let n=0;n<o.length;n++){let p=o[n],c=s+n*d;if(c>-40&&c<r+40){let f=(l==="bottom"?i-30:50)+Math.sin(a*4+n*.1)*12;t.fillStyle=`hsl(${(a*120+n*4)%360}, 100%, 55%)`,t.shadowColor=t.fillStyle,t.shadowBlur=15,t.fillText(p,c,f),t.shadowBlur=0}}u=requestAnimationFrame(h)}u=requestAnimationFrame(h)}function C(){u&&(cancelAnimationFrame(u),u=null)}var m=class{static init(o={}){if(document.getElementById("ankifx-overlay"))return;let l=window.AnkiFX_Config||{courseName:"Unknown Course",termsText:"No terms provided.",sources:[],marquee:"NO CONFIG FOUND",defaultEffect:"cracktro"};!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)&&o.forceShow,this.injectCSS();let t=this.injectUI(l,o);this.startEffect(l,t,o.marqueePosition)}static injectCSS(){let o=document.createElement("style");o.textContent=`
            :root {
                --afx-bg-color: rgba(10, 10, 15, 0.25);
                --afx-text-color: #f0f0f0;
            }
            
            #ankifx-overlay { 
                position: fixed; top: 0; left: 0; right: 0; bottom: 0; 
                background: rgba(0,0,0,0.8); z-index: 9999; display: flex; 
                align-items: center; justify-content: center; padding: 1rem; 
                overflow: hidden; font-family: arial; box-sizing: border-box;
            }
            
            /* Restored to your exact Enhanced Glassmorphism styling */
            .afx-dialog { 
                display: flex;
                flex-direction: column;
                background-color: var(--afx-bg-color, rgba(10, 10, 15, 0.25));
                color: var(--afx-text-color, #f0f0f0);
                padding: 2rem;
                border-radius: 16px; 
                max-width: 800px;
                width: 100%;
                max-height: calc(100vh - 16rem);
                overflow-y: auto;
                box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(14px);
                -webkit-backdrop-filter: blur(14px);
                border: 1px solid rgba(255, 255, 255, 0.15);
                box-sizing: border-box;
                text-align: center;
                position: relative;
                z-index: 10;
            }
            
            .afx-terms { 
                font-family: 'Courier New', monospace; 
                background: linear-gradient(135deg, rgba(20,20,25,0.4), rgba(5,5,10,0.2)); 
                color: #fff; padding: 1.5em; border-radius: 12px; line-height: 1.6; 
                border: 1px solid rgba(255,255,255,0.05); overflow-y: auto; 
                flex-shrink: 1; text-align: left; 
            }
            
            .afx-terms h3 { 
                margin-top: 0; text-align: center; color: #ff6b6b; 
                text-shadow: 0 2px 10px rgba(255,50,50,0.8); 
            }
            
            .afx-btn { 
                margin: 1.5rem auto 0; padding: 0.8rem 2rem; font-size: 1.1rem; 
                font-weight: bold; color: #fff; border-radius: 8px; 
                border: 1px solid rgba(255,255,255,0.4); backdrop-filter: blur(5px); 
                transition: 0.3s; width: fit-content; flex-shrink: 0; 
            }
            
            .afx-btn:disabled { background: rgba(100,100,100,0.5); cursor: not-allowed; }
            .afx-btn:not(:disabled) { background: rgba(40,167,69,0.85); cursor: pointer; }
            .afx-btn:not(:disabled):hover { background: #33cc77; transform: scale(0.95); }
            
            .afx-audio-ctrl { 
                position: absolute; top: 1.5rem; right: 1.5rem; display: flex; 
                gap: 12px; color: #fff; font-family: 'Courier New', monospace; 
                font-weight: bold; background: rgba(0,0,0,0.4); padding: 0.5rem 1rem; 
                border-radius: 30px; border: 1px solid rgba(255,255,255,0.1); 
                z-index: 20000; align-items: center;
            }
            
            .afx-toggle { position: relative; width: 40px; height: 20px; }
            .afx-toggle input { opacity: 0; width: 0; height: 0; }
            
            .afx-slider { 
                position: absolute; cursor: pointer; top: 0; left: 0; right: 0; 
                bottom: 0; background: rgba(255,255,255,0.3); border-radius: 20px; transition: 0.4s; 
            }
            
            .afx-slider:before { 
                position: absolute; content: ""; height: 14px; width: 14px; 
                left: 3px; bottom: 3px; background: white; border-radius: 50%; transition: 0.4s; 
            }
            
            .afx-toggle input:checked + .afx-slider { background: #ff3c3c; }
            .afx-toggle input:checked + .afx-slider:before { transform: translateX(20px); }
            
            /* Responsive tweaks */
            @media screen and (max-width: 768px) {
                .afx-dialog { padding: 1.5rem; }
                .afx-audio-ctrl { top: 1rem; right: 1rem; font-size: 0.9rem; }
            }
            @media screen and (max-width: 480px) {
                .afx-dialog { padding: 1rem; }
            }
        `,document.head.appendChild(o)}static injectUI(o,l){let e=document.createElement("div");e.id="ankifx-overlay";let t=o.sources.map(a=>`<li>${a}</li>`).join(""),r="";o.audioSrc&&(r=`
                <div class="afx-audio-ctrl">
                    <label class="afx-toggle"><input type="checkbox" id="afx-audio-toggle"><span class="afx-slider"></span></label>
                    <span id="afx-bgm-status">\u{1F507} BGM: OFF</span>
                    <audio id="afx-bgm" loop><source src="${o.audioSrc}" type="audio/mpeg"></audio>
                </div>
            `),e.innerHTML=`
            ${r}
            <div class="afx-dialog">
                <div class="afx-terms">
                    <h3>${o.courseName}</h3>
                    <p>${o.termsText}</p>
                    <p><strong>Sources:</strong></p>
                    <ul>${t}</ul>
                </div>
                <button id="afx-consent-btn" class="afx-btn" disabled>I AGREE</button>
            </div>
        `,document.body.appendChild(e);let i=document.getElementById("afx-consent-btn"),s=l.countdown||0;if(s>0){i.textContent=`I AGREE (${s})`;let a=setInterval(()=>{s--,i.textContent=`I AGREE (${s})`,s<=0&&(clearInterval(a),i.textContent="I AGREE (Let me study)",i.disabled=!1)},1e3)}else i.textContent="I AGREE (Let me study)",i.disabled=!1;i.addEventListener("click",()=>{if(!i.disabled){e.style.display="none",C();let a=document.getElementById("afx-bgm");a&&a.pause()}});let x=document.getElementById("afx-audio-toggle");if(x){let a=document.getElementById("afx-bgm"),d=document.getElementById("afx-bgm-status");a.volume=.5,x.addEventListener("change",g=>{g.target.checked?a.play().then(()=>{d.textContent="\u{1F50A} BGM: ON",d.style.color="#ff6b6b"}).catch(()=>{g.target.checked=!1}):(a.pause(),d.textContent="\u{1F507} BGM: OFF",d.style.color="#fff")})}return e}static startEffect(o,l,e){(localStorage.getItem("ankifx_preferred_effect")||o.defaultEffect||"cracktro")==="cracktro"&&E(l,o.marquee,e)}};window.AnkiFX=m;})();
