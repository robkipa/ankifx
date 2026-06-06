var __ankifx_script_src=(document.currentScript&&document.currentScript.src)||"";
(()=>{var Ci=[],ze=null,Hi=60,Xi=1.5,Gi={id:"aurora",name:"Aurora",run:ir,stop:rr,drawOverlay:or,onResize:(i,t)=>{let e=getComputedStyle(document.documentElement),o=parseInt(e.getPropertyValue("--io-header"))||0,n=t-o;if(Ce=i/8,Fe=n/8,ze){let l=Hi/8,c=Math.ceil(Ce/l),r=Math.ceil(Fe/(l*Xi));ze.w=c,ze.h=r,ze.build()}ee&&(ee.style.width=Ce+"px",ee.style.height=Fe+"px",ee.style.position="absolute",ee.style.top=o+"px",ee.style.left="0",ee.style.transform="scale(8)",ee.style.transformOrigin="top left")},marqueeFont:{color:"#E0FFFF",shadowColor:"rgba(0,128,128,0.8)",shadowBlur:10}},ft=null,Ce,Fe,ee=null,er=0,ct=0,it={x:-1e3,y:-1e3},Lt=class{constructor(t,e){this.x=t||0,this.y=e||0}setAngle(t){let e=this.getLength()||1;this.x=Math.cos(t)*e,this.y=Math.sin(t)*e}setLength(t){let e=Math.atan2(this.y,this.x);this.x=Math.cos(e)*t,this.y=Math.sin(e)*t}getLength(){return Math.sqrt(this.x*this.x+this.y*this.y)}addTo(t){this.x+=t.x,this.y+=t.y}},$i=(()=>{let i=new Uint8Array(512),t=new Uint8Array(256).map(()=>Math.random()*256);for(let n=0;n<512;n++)i[n]=t[n&255];let e=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]];function o(n,l,c,r){return n[0]*l+n[1]*c+n[2]*r}return{simplex3:(n,l,c)=>{let r,a,d,u,s=.3333333333333333,h=1/6,b=(n+l+c)*s,m=Math.floor(n+b),f=Math.floor(l+b),g=Math.floor(c+b),p=(m+f+g)*h,x=n-m+p,y=l-f+p,w=c-g+p,k,P,v,E,C,A;x>=y?y>=w?(k=1,P=0,v=0,E=1,C=1,A=0):x>=w?(k=1,P=0,v=0,E=1,C=0,A=1):(k=0,P=0,v=1,E=1,C=0,A=1):y<w?(k=0,P=0,v=1,E=0,C=1,A=1):x<w?(k=0,P=1,v=0,E=0,C=1,A=1):(k=0,P=1,v=0,E=1,C=1,A=0);let q=x-k+h,U=y-P+h,F=w-v+h,N=x-E+2*h,X=y-C+2*h,G=w-A+2*h,V=x-1+3*h,Q=y-1+3*h,K=w-1+3*h,M=m&255,_=f&255,H=g&255,te=.6-x*x-y*y-w*w;te<0?r=0:(te*=te,r=te*te*o(e[i[M+i[_+i[H]]]%12],x,y,w));let ue=.6-q*q-U*U-F*F;ue<0?a=0:(ue*=ue,a=ue*ue*o(e[i[M+k+i[_+P+i[H+v]]]%12],q,U,F));let pe=.6-N*N-X*X-G*G;pe<0?d=0:(pe*=pe,d=pe*pe*o(e[i[M+E+i[_+C+i[H+A]]]%12],N,X,G));let de=.6-V*V-Q*Q-K*K;return de<0?u=0:(de*=de,u=de*de*o(e[i[M+1+i[_+1+i[H+1]]]%12],V,Q,K)),32*(r+a+d+u)}}})(),Fi=class{constructor(t,e,o={}){this.settings={frequency:.1,...o},this.w=t,this.h=e,this.time=0,this.build()}build(){this.cols=Math.ceil(this.w),this.rows=Math.ceil(this.h),this.field=new Array(this.cols);for(let t=0;t<this.cols;t++){this.field[t]=new Array(this.rows);for(let e=0;e<this.rows;e++)this.field[t][e]=new Lt(0,0)}}update(t){this.time+=t;let e=this.time*this.settings.frequency/1e3;for(let o=0;o<this.field.length;o++)for(let n=0;n<this.field[o].length;n++){let l=$i.simplex3(o/20,n/20,e)*Math.PI*2,c=$i.simplex3(o/10+4e4,n/10+4e4,e);this.field[o][n].setAngle(l),this.field[o][n].setLength(c),typeof this.manipulateVector=="function"&&this.manipulateVector(this.field[o][n],o,n),typeof this.onDraw=="function"&&this.onDraw(this.field[o][n],o,n)}}};function tr(){Ci=[];let i=150;for(let t=0;t<i;t++)Ci.push({x:Math.random(),y:Math.random(),size:.5+Math.random()*1.3,opacity:.15+Math.random()*.75,blinkSpeed:.001+Math.random()*.002,blinkOffset:Math.random()*Math.PI*2})}function ot(i){i.touches&&i.touches[0]?(it.x=i.touches[0].clientX,it.y=i.touches[0].clientY):(it.x=i.clientX,it.y=i.clientY)}function ir(i,t){let e=i.ctx2d;ee=i.canvas2D,ee.classList.add("afx-aurora-active");let o=i.topInset||0,n=i.visibleHeight||i.height;Ce=i.width/8,Fe=n/8,ee.width=Ce*i.dpr,ee.height=Fe*i.dpr,e.setTransform(1,0,0,1,0,0),e.scale(i.dpr,i.dpr),ee.style.width=Ce+"px",ee.style.height=Fe+"px",ee.style.position="absolute",ee.style.top=o+"px",ee.style.left="0",ee.style.transform="scale(8)",ee.style.transformOrigin="top left",tr();let l=Hi/8,c=Math.ceil(Ce/l),r=Math.ceil(Fe/(l*Xi));ze=new Fi(c,r,{frequency:.1});let a={x:Ce/c,y:Fe/r},d=255/r;ze.onDraw=(s,h,b)=>{let m=s.getLength()*Math.abs(s.x),f=s.getLength()*Math.abs(s.y),g=Math.round(-20*m+80*f+(50-.6*b*d)),p=Math.round(180*m+20*f-60+.4*b*d),x=Math.round(50*m+30*f+(40-.5*b*d)+.5*b*d);e.fillStyle=`rgba(${g}, ${p}, ${x}, 0.8)`,e.fillRect(h*a.x,b*a.y,a.x+.5,a.y+.5)},ze.manipulateVector=(s,h,b)=>{let m={x:h*a.x+.5*a.x,y:b*a.y+.5*a.y},f=it.x/8,g=it.y/8,p=new Lt((f-m.x)/Ce,(g-m.y)/Fe);s.addTo(p),s.getLength()>1&&s.setLength(1)},er=0,ct=0,window.addEventListener("mousemove",ot),window.addEventListener("touchstart",ot),window.addEventListener("touchmove",ot);function u(s){ct||(ct=s);let h=s-ct;ct=s,e.fillStyle="#020b1a",e.fillRect(0,0,Ce,Fe),ze.update(h),ft=requestAnimationFrame(u)}ft=requestAnimationFrame(u)}function or(i,t,e,o){let n=getComputedStyle(document.documentElement),l=parseInt(n.getPropertyValue("--io-header"))||0,c=e-l;i.fillStyle="#ffffff",Ci.forEach(r=>{let a=(Math.sin(o*r.blinkSpeed+r.blinkOffset)+1)/2;i.globalAlpha=r.opacity*a,i.beginPath();let d=l+r.y*c;i.arc(r.x*t,d,r.size,0,Math.PI*2),i.fill()}),i.globalAlpha=1}function rr(){ft&&(cancelAnimationFrame(ft),ft=null),window.removeEventListener("mousemove",ot),window.removeEventListener("touchstart",ot),window.removeEventListener("touchmove",ot),ee&&(ee.classList.remove("afx-aurora-active"),ee.style.cssText="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;",ee=null);let i=window.AnkiFX;i&&typeof i.handleResize=="function"&&i.handleResize()}var Rt=null,Xe,zt,xe=null,ar=200,dt=[],Vi=null,ut="all",Te=(i,t)=>{if(!window.AnkiFX_Config?.debug)return;let e=t.map(o=>{if(o===null)return"null";if(o===void 0)return"undefined";if(typeof o=="object")try{return JSON.stringify(o)}catch{return String(o)}return String(o)}).join(" ");dt.push({type:i,message:e,timestamp:new Date().toLocaleTimeString()}),dt.length>ar&&dt.shift(),Vi&&Vi()};if(typeof window<"u"&&!window.__console_intercepted__){let i=console.log&&console.log.bind(console)||(()=>{}),t=console.warn&&console.warn.bind(console)||(()=>{}),e=console.error&&console.error.bind(console)||(()=>{}),o=console.info&&console.info.bind(console)||(()=>{}),n=console.debug&&console.debug.bind(console)||(()=>{});console.log=(...l)=>{i(...l),Te("log",l)},console.warn=(...l)=>{t(...l),Te("warn",l)},console.error=(...l)=>{e(...l),Te("error",l)},console.info=(...l)=>{o(...l),Te("info",l)},console.debug=(...l)=>{n(...l),Te("debug",l)},window.addEventListener("error",l=>{if(!window.AnkiFX_Config?.debug)return;let c=l.message;if(l.error){let r=l.error.name||"Error",a=l.error.message||l.message||"",d=l.error.stack||"";d&&!d.includes(a)?c=`${r}: ${a}
${d}`:c=d||`${r}: ${a}`}Te("error",[c])}),window.addEventListener("unhandledrejection",l=>{window.AnkiFX_Config?.debug&&Te("error",[`Unhandled Promise Rejection: ${l.reason}`])}),window.__console_intercepted__=!0}var Wi={id:"debug",name:"DEBUG",run:nr,stop:lr,onResize:(i,t)=>{Xe=i,zt=t},marqueeFont:{color:"#00ff00",shadowColor:"rgba(0,0,0,0.8)",shadowBlur:5},controls:[{type:"button",id:"copy-logs-btn",label:"\u{1F4CB} COPY LOGS",onClick:()=>{sr()}},{type:"button",id:"clear-storage-btn",label:"\u{1F9F9} CLEAR STORAGE",onClick:()=>{confirm("Clear ALL AnkiFX local storage?")&&(localStorage.clear(),location.reload())}}]};function nr(i,t){xe&&(xe.remove(),xe=null);let e=i.dpr||1;Xe=i.width,zt=i.height,xe=document.createElement("div"),xe.className="afx-debug-container";let o=document.createElement("div");o.className="afx-debug-columns",xe.appendChild(o);let n=document.createElement("div");n.className="afx-debug-left-col",o.appendChild(n);let l=document.createElement("div");l.className="afx-debug-right-col",o.appendChild(l);let c=document.createElement("div");c.className="afx-debug-panel diagnostics",c.innerHTML="<h3>AnkiFX Version</h3>";let r=document.createElement("div");r.className="afx-debug-content",c.appendChild(r),n.appendChild(c);let a=document.createElement("div");a.className="afx-debug-panel viewport-info",a.innerHTML="<h3>Viewport & Layout</h3>";let d=document.createElement("pre");d.className="afx-debug-content",a.appendChild(d),n.appendChild(a);let u=document.createElement("div");u.className="afx-debug-panel logs",u.innerHTML="<h3>Chronological Loader Logs</h3>";let s=document.createElement("div");s.className="afx-debug-content",u.appendChild(s),l.appendChild(u);let h=document.createElement("div");h.className="afx-debug-panel localstorage-viewer",h.innerHTML="<h3>LocalStorage</h3>";let b=document.createElement("div");b.className="afx-debug-content",h.appendChild(b),l.appendChild(h);let m=document.createElement("div");m.className="afx-debug-panel console-logs",m.innerHTML=`
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255, 255, 255, 0.15); padding-bottom: 4px; margin-bottom: 10px; flex-wrap: wrap; gap: 8px;">
            <h3 style="margin: 0; border: none; padding: 0; color: #ff5555;">Console Logs</h3>
            <div style="display: flex; gap: 6px; align-items: center;">
                <button class="afx-console-filter-btn active" data-filter="all" style="background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.25); color: #fff; font-size: 10px; padding: 2px 6px; border-radius: 4px; cursor: pointer; font-family: monospace;">ALL</button>
                <button class="afx-console-filter-btn" data-filter="log" style="background: rgba(255,255,255,0.05); border: 1px solid transparent; color: #888; font-size: 10px; padding: 2px 6px; border-radius: 4px; cursor: pointer; font-family: monospace;">LOG</button>
                <button class="afx-console-filter-btn" data-filter="warn" style="background: rgba(255,255,255,0.05); border: 1px solid transparent; color: #888; font-size: 10px; padding: 2px 6px; border-radius: 4px; cursor: pointer; font-family: monospace;">WARN</button>
                <button class="afx-console-filter-btn" data-filter="error" style="background: rgba(255,255,255,0.05); border: 1px solid transparent; color: #888; font-size: 10px; padding: 2px 6px; border-radius: 4px; cursor: pointer; font-family: monospace;">ERROR</button>
                <button id="afx-clear-console-btn" style="background: rgba(255, 85, 85, 0.2); border: 1px solid rgba(255, 85, 85, 0.4); color: #ff5555; font-size: 10px; font-weight: bold; padding: 2px 6px; border-radius: 4px; cursor: pointer; margin-left: 10px; font-family: monospace;">CLEAR</button>
            </div>
        </div>
        <div id="afx-console-log-list" class="afx-debug-content" style="max-height: 250px; overflow-y: auto; font-family: monospace; margin-bottom: 8px;"></div>
        <div style="display: flex; gap: 8px; border-top: 1px solid rgba(255,255,255,0.15); padding-top: 8px; align-items: center;">
            <span style="color: #00ffff; font-weight: bold; font-family: monospace;">&gt;</span>
            <input type="text" id="afx-console-input" placeholder="Execute JS (e.g. window.location.href)" style="flex: 1; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.2); color: #fff; font-family: monospace; font-size: 11px; padding: 4px 8px; border-radius: 4px; outline: none; box-sizing: border-box;">
            <button id="afx-console-exec-btn" style="background: #28a745; color: #fff; border: none; font-size: 10px; font-weight: bold; padding: 4px 10px; border-radius: 4px; cursor: pointer; font-family: monospace;">EXEC</button>
        </div>
    `,xe.appendChild(m);let f=document.createElement("div");f.style.height="calc(var(--bottom-inset, 0px) + var(--afx-dock-height, 0px) + 20px)",f.style.flexShrink="0",f.style.pointerEvents="none",xe.appendChild(f);let g=m.querySelectorAll(".afx-console-filter-btn");g.forEach(M=>{M.addEventListener("click",_=>{_.stopPropagation(),g.forEach(H=>{H.classList.remove("active"),H.style.background="rgba(255,255,255,0.05)",H.style.borderColor="transparent",H.style.color="#888"}),M.classList.add("active"),M.style.background="rgba(255,255,255,0.15)",M.style.borderColor="rgba(255,255,255,0.25)",M.style.color="#fff",ut=M.getAttribute("data-filter")})});let p=m.querySelector("#afx-clear-console-btn");p&&p.addEventListener("click",M=>{M.stopPropagation(),dt.length=0});let x=m.querySelector("#afx-console-input"),y=m.querySelector("#afx-console-exec-btn"),w=()=>{if(!x)return;let M=x.value.trim();if(M){Te("log",[`> ${M}`]);try{let _=(0,eval)(M);Te("info",["=>",_])}catch(_){Te("error",[_.stack||_.message||_])}x.value="",x.focus()}};y&&x&&(["keydown","keyup","keypress"].forEach(M=>{x.addEventListener(M,_=>{_.stopPropagation()})}),x.addEventListener("keydown",M=>{M.key==="Enter"&&(M.preventDefault(),w())}),y.addEventListener("click",M=>{M.stopPropagation(),w()})),(document.getElementById("ankifx-overlay")||document.body).appendChild(xe);let P=document.getElementById("ankifx-background")||document.body,v={topLeft:document.createElement("div"),topRight:document.createElement("div"),bottomLeft:document.createElement("div"),bottomRight:document.createElement("div")};v.topLeft.className="afx-debug-corner top-left",v.topRight.className="afx-debug-corner top-right",v.bottomLeft.className="afx-debug-corner bottom-left",v.bottomRight.className="afx-debug-corner bottom-right",v.bottomLeft.style.bottom="auto",v.bottomRight.style.bottom="auto",Object.values(v).forEach(M=>P.appendChild(M));let E=document.createElement("div");E.className="afx-debug-line visible-bottom";let C=document.createElement("span");C.className="afx-debug-line-label",C.textContent="--- VISIBLE DOCUMENT BOTTOM ---",E.appendChild(C),P.appendChild(E);let A=0,q=0,U=0,F="",N="",X="",G="",V="",Q="";function K(M){M===void 0&&(M=performance.now()),A||(A=M),q++,M-A>=1e3&&(U=q,q=0,A=M);let _=i.ctx2d;_.clearRect(0,0,Xe,zt),_.fillStyle="#050508",_.fillRect(0,0,Xe,zt);let H=getComputedStyle(document.documentElement),te=H.getPropertyValue("--io-header")||"N/A",ue=parseInt(H.getPropertyValue("--io-header"))||0,pe=H.getPropertyValue("--top-inset")||"N/A",de=H.getPropertyValue("--bottom-inset")||"N/A",S=document.getElementById("ankifx-background"),I=S?S.getBoundingClientRect().height:"N/A",W=window.innerWidth>window.innerHeight,R=document.documentElement.clientHeight+ue,J=[`window:               ${window.innerWidth}x${window.innerHeight}`,`screen:               ${screen.width}x${screen.height}`,`doc:                  ${document.documentElement.clientWidth}x${document.documentElement.clientHeight}`,`orient:               ${window.orientation||"N/A"}`,`dpr (native|engine):  (${window.devicePixelRatio}|${e})`,`--io-header:          ${te}`,`--top-inset:          ${pe}`,`--bottom-inset:       ${de}`,`--afx-viewport-height: calc(100dvh + ${ue}px) = ${I}px`,`isLandscape:          ${W}`].join(`
`);J!==F&&(d.textContent=J,F=J);let he=window.AnkiFX_Eval_History||[],we=JSON.stringify(he),Pe=[`Version:  ${window.AnkiFX?.version||"1.0.0-dev"}`,`Source:   ${window.AnkiFX?.source||"unknown"}`,`Built:    ${window.AnkiFX?.buildDate||"development"}`].join(`
`),ge=Pe+"_"+we;if(ge!==N){r.innerHTML="";let j=document.createElement("pre");j.style.margin="0 0 10px 0",j.style.fontFamily="inherit",j.style.fontSize="inherit",j.textContent=Pe,r.appendChild(j);let z=document.createElement("div");z.style.borderTop="1px dashed rgba(255,255,255,0.15)",z.style.margin="10px 0",r.appendChild(z);let L=document.createElement("div");L.textContent="EVALUATION HISTORY:",L.style.fontWeight="bold",L.style.color="#00ffff",L.style.marginBottom="6px",L.style.fontSize="11px",r.appendChild(L);let $=document.createElement("div");if(he.length===0){let B=document.createElement("div");B.textContent="(No evaluation history captured)",B.style.color="#888",B.style.fontStyle="italic",$.appendChild(B)}else he.slice(-3).forEach((B,le)=>{let fe=document.createElement("div");fe.textContent=`[${le+1}] ${B.source} (${B.version}) @ ${B.time} - ${B.status}`,fe.style.color=B.status==="active"?"#55ff55":"#ffaa55",fe.style.fontSize="11px",$.appendChild(fe)});r.appendChild($),N=ge}let be=window.AnkiFX_Loader_Logs||[],ke=JSON.stringify(be);if(ke!==X){if(s.innerHTML="",be.length===0){let j=document.createElement("div");j.textContent="(No logs captured by template loader)",j.style.color="#888",j.style.fontStyle="italic",s.appendChild(j)}else{let j={success:{color:"#55ff55",badge:"\u2713"},error:{color:"#ff5555",badge:"\u2717"},warn:{color:"#ffaa55",badge:"!"},pending:{color:"#888888",badge:"\u2026"},info:{color:"#dddddd",badge:"\xB7"}};be.forEach((z,L)=>{let $=z&&typeof z=="object",B=$?z.msg:String(z),le=j[$?z.level:"info"]||j.info,fe=document.createElement("div");fe.style.cssText="display: flex; gap: 6px; align-items: baseline; font-size: 11px; margin-bottom: 3px; padding-bottom: 2px; border-bottom: 1px solid rgba(255,255,255,0.04);";let Le=document.createElement("span");Le.textContent=`[${String(L+1).padStart(2,"0")}]`,Le.style.cssText="color: #555; flex-shrink: 0; font-size: 10px;";let st=document.createElement("span");st.textContent=le.badge,st.style.cssText=`color: ${le.color}; flex-shrink: 0; font-weight: bold; width: 10px;`;let Re=document.createElement("span");Re.textContent=B,Re.style.cssText=`color: ${le.color}; word-break: break-word;`,fe.appendChild(Le),fe.appendChild(st),fe.appendChild(Re),s.appendChild(fe)})}X=ke}let ve={};for(let j=0;j<localStorage.length;j++){let z=localStorage.key(j);ve[z]=localStorage.getItem(z)}let It=JSON.stringify(ve);if(It!==Q){b.innerHTML="";let j=Object.keys(ve).sort();if(j.length===0){let z=document.createElement("div");z.textContent="(LocalStorage is empty)",z.style.color="#888",z.style.fontStyle="italic",z.style.fontSize="11px",b.appendChild(z)}else j.forEach(z=>{let L=document.createElement("div");L.style.cssText="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 2px;";let $=document.createElement("span");$.textContent=z,$.style.color="#ffaa55",$.style.wordBreak="break-all",$.style.marginRight="8px";let B=document.createElement("span");B.textContent=ve[z],B.style.color="#00ffff",B.style.wordBreak="break-all",B.style.textAlign="right",L.appendChild($),L.appendChild(B),b.appendChild(L)});Q=It}let $e=dt.filter(j=>ut==="all"?!0:j.type===ut),et=ut+"_"+JSON.stringify($e);if(et!==V){let j=document.getElementById("afx-console-log-list");if(j)if(j.innerHTML="",$e.length===0){let z=document.createElement("div");z.textContent=`(No logs in category: ${ut})`,z.style.color="#888",z.style.fontStyle="italic",z.style.fontSize="11px",j.appendChild(z)}else $e.forEach(z=>{let L=document.createElement("div");L.style.marginBottom="4px",L.style.fontSize="11px",L.style.borderBottom="1px solid rgba(255,255,255,0.03)",L.style.paddingBottom="2px";let $=document.createElement("span");$.textContent=`[${z.timestamp}] `,$.style.color="#888",L.appendChild($);let B=document.createElement("span");B.textContent=z.message,z.type==="error"?B.style.color="#ff5555":z.type==="warn"?B.style.color="#ffaa55":z.type==="info"||z.type==="debug"?B.style.color="#00ffff":B.style.color="#ffffff",L.appendChild(B),j.appendChild(L)}),j.scrollTop=j.scrollHeight;V=et}let He=`${Xe}x${R}`;He!==G&&(v.topLeft.textContent="(0,0)",v.topRight.textContent=`(${Xe},0)`,v.bottomLeft.textContent=`(0,${R})`,v.bottomRight.textContent=`(${Xe},${R})`,v.bottomLeft.style.top=`${R-18}px`,v.bottomRight.style.top=`${R-18}px`,G=He),E.style.top=`${R}px`,Rt=requestAnimationFrame(K)}K()}function lr(){Rt&&(cancelAnimationFrame(Rt),Rt=null),xe&&(xe.remove(),xe=null),document.querySelectorAll(".afx-debug-corner, .afx-debug-line").forEach(i=>i.remove())}function sr(){let i=document.querySelector(".afx-debug-container");if(!i)return;let t=`=== ANKIFX DEBUG LOGS ===

`;i.querySelectorAll(".afx-debug-panel").forEach(n=>{let l=n.querySelector("h3")?.textContent||"",c=n.querySelector(".afx-debug-content");c&&(t+=`--- ${l.toUpperCase()} ---
`,t+=c.innerText||c.textContent||"",t+=`

`)}),(()=>{try{let n=document.createElement("textarea");n.value=t.trim(),n.style.position="fixed",n.style.top="0",n.style.left="0",n.style.opacity="0",n.style.pointerEvents="none",document.body.appendChild(n),n.focus(),n.select();let l=document.execCommand("copy");if(document.body.removeChild(n),l)return Promise.resolve()}catch{}return navigator.clipboard&&typeof navigator.clipboard.writeText=="function"?navigator.clipboard.writeText(t.trim()):Promise.reject(new Error("No copy method succeeded or is available"))})().then(()=>{let n=document.getElementById("afx-control-copy-logs-btn");if(n){let l=n.textContent;n.textContent="\u2705 COPIED!",setTimeout(()=>{n.textContent=l},1500)}}).catch(n=>{let l=document.getElementById("afx-control-copy-logs-btn");if(l){let c=l.textContent;l.textContent="\u274C ERROR",setTimeout(()=>{l.textContent=c},1500)}})}var ht=null,oe,Me,Ee={id:"ecg",name:"ECG Monitor",run:cr,stop:fr,onResize:(i,t)=>{oe=i,Me=t},marqueeFont:{color:"#FF1A1A",shadowColor:"#CC0000",shadowBlur:15}};function cr(i,t){let e=i.ctx2d;oe=i.width,Me=i.height;let o=document.getElementById("afx-top-group-right"),n=document.getElementById("afx-ecg-panel");!n&&o&&(n=document.createElement("div"),n.id="afx-ecg-panel",o.insertBefore(n,o.firstChild));let l=localStorage.getItem("ankifx_ecg_rhythm")||"sinus";Ee.controls=[{type:"button",id:"ecg-trigger",label:l==="sinus"?"\u26A1 TRIGGER ARRHYTHMIA":"\u{1F49A} RESTORE SINUS",onClick:()=>{let S=localStorage.getItem("ankifx_ecg_rhythm")||"sinus",I;if(S==="sinus"){let W=["first_degree","mobitz_1","mobitz_2","third_degree","st_elevation","afib","a_flutter","torsades"];I=W[Math.floor(Math.random()*W.length)]}else I="sinus";localStorage.setItem("ankifx_ecg_rhythm",I),localStorage.setItem("ankifx_ecg_trigger_time",Date.now())}}];let c=200,r=40,a=120,d=25,u=5,s=new Float32Array(4096),h=0,b=0,m=0,f=0,g=0,p=0,x=0,y=100,w=.6,k=72,P=0,v="sinus",E=25+Math.random()*15,C=0,A=["first_degree","mobitz_1","mobitz_2","third_degree","st_elevation","afib","a_flutter","torsades"],q=0;function U(){h<oe&&(h=oe)}let F=(S,I,W,R)=>R*Math.exp(-((S-I)**2)/(2*W**2));function N(S){return F(S,.15,.03,.12)}function X(S){return F(S,.03,.03,.12)}function G(S,I){let W=I%4;return W===0?F(S,.17,.03,.12):W===1?F(S,.1,.03,.12):W===2?F(S,.03,.03,.12):F(S,.15,.03,.12)}function V(S){return F(S,.08,.03,.12)}function Q(S){return .035*Math.sin(S*Math.PI*40)+.015*Math.sin(S*Math.PI*96)+.008*Math.sin(S*Math.PI*176)}function K(S){return .085*(S*4%1-.5)}function M(S,I){let W=Math.sin(S*Math.PI*2)*.58+Math.sin(S*Math.PI*4)*.16,R=Math.sin(I*1.2);return W*R}function _(S,I=!1){let W=0;return W+=F(S,.33,.008,-.08),W+=F(S,.36,.012,1),W+=F(S,.39,.008,-.12),I&&(W+=F(S,.46,.07,.38)),W+=F(S,.56,.04,.22),W}function H(S,I,W){let R=S%1,J=Math.floor(S);return I==="sinus"?N(R)+_(R,!1):I==="first_degree"?X(R)+_(R,!1):I==="mobitz_1"?J%4===3?G(R,J):G(R,J)+_(R,!1):I==="mobitz_2"?J%3===2?V(R):V(R)+_(R,!1):I==="st_elevation"?N(R)+_(R,!0):I==="afib"?Q(R)+_(R,!1):I==="a_flutter"?K(R)+_(R,!1):I==="torsades"?M(R,W):0}function te(S,I){let W=S%1,R=I%1,J=F(W,.15,.03,.12),he=F(R,.33,.008,-.08)+F(R,.36,.012,1)+F(R,.39,.008,-.12)+F(R,.56,.04,.22);return J+he}function ue(){e.strokeStyle="rgba(60, 0, 0, 0.15)",e.lineWidth=.5,e.beginPath();for(let S=0;S<oe;S+=u)e.moveTo(S,0),e.lineTo(S,Me);for(let S=0;S<Me;S+=u)e.moveTo(0,S),e.lineTo(oe,S);e.stroke(),e.strokeStyle="rgba(80, 0, 0, 0.3)",e.lineWidth=1,e.beginPath();for(let S=0;S<oe;S+=d)e.moveTo(S,0),e.lineTo(S,Me);for(let S=0;S<Me;S+=d)e.moveTo(0,S),e.lineTo(oe,S);e.stroke()}function pe(){if(!n)return;let S=.5+P*.5;n.style.opacity=S;let I="SINUS RHYTHM";v==="first_degree"?I="1\xB0 AV BLOCK":v==="mobitz_1"?I="2\xB0 AV (MOBITZ 1)":v==="mobitz_2"?I="2\xB0 AV (MOBITZ 2)":v==="third_degree"?I="3\xB0 AV BLOCK":v==="st_elevation"?I="ST ELEVATION":v==="afib"?I="ATRIAL FIBRILLATION":v==="a_flutter"?I="ATRIAL FLUTTER":v==="torsades"&&(I="TORSADES DE POINTES"),n.innerHTML=`
            <div class="afx-ecg-bpm">\u2665 ${k} BPM</div>
            <div class="afx-ecg-rhythm">${I}</div>
        `}function de(S){f||(f=S);let I=Math.min((S-f)/1e3,.05);f=S,m+=I,U();let W=localStorage.getItem("ankifx_ecg_rhythm")||"sinus",R=parseInt(localStorage.getItem("ankifx_ecg_trigger_time")||"0");if(R>C){if(C=R,v=W,E=m+25+Math.random()*15,v!=="sinus"){let L=A.indexOf(v);L!==-1&&(q=(L+1)%A.length)}v==="afib"&&(y=70+Math.floor(Math.random()*60),w=60/y),Ee.controls&&Ee.controls[0]&&(Ee.controls[0].label=v==="sinus"?"\u26A1 TRIGGER ARRHYTHMIA":"\u{1F49A} RESTORE SINUS",AnkiFX.renderEffectControls(Ee))}m>=E&&(v==="sinus"?(v=A[q],q=(q+1)%A.length):v="sinus",localStorage.setItem("ankifx_ecg_rhythm",v),E=m+25+Math.random()*15,v==="afib"&&(y=70+Math.floor(Math.random()*60),w=60/y),Ee.controls&&Ee.controls[0]&&(Ee.controls[0].label=v==="sinus"?"\u26A1 TRIGGER ARRHYTHMIA":"\u{1F49A} RESTORE SINUS",AnkiFX.renderEffectControls(Ee)));let J=72;v==="third_degree"?J=35:v==="mobitz_1"||v==="mobitz_2"?J=68:v==="afib"?J=y:v==="a_flutter"?J=75:v==="torsades"&&(J=220);let he=v==="afib"?w:60/J,we=g,Pe=p,ge=x;if(v==="third_degree"?(p+=I/(60/88),x+=I/(60/J)):g+=I/he,v!=="third_degree"){let L=Math.floor(we);Math.floor(g)>L&&v==="afib"&&(y=70+Math.floor(Math.random()*65),w=60/y)}if(v==="third_degree")Math.floor(ge-.36)<Math.floor(x-.36)&&(P=1,k=J+Math.floor(Math.random()*3)-1);else if(Math.floor(we-.36)<Math.floor(g-.36)){let L=Math.floor(g-.36),$=!1;v==="mobitz_1"?$=L%4===3:v==="mobitz_2"&&($=L%3===2),$||(P=1,k=Math.floor(J),v!=="torsades"&&v!=="a_flutter"&&(k+=Math.floor(Math.random()*5)-2))}P=Math.max(0,P-I*4);let be=c*I,ke=b+be,ve=Math.floor(b),It=Math.floor(ke);for(let L=ve;L<=It;L++){let $=L%oe,B=(L-b)/be;if(v==="third_degree"){let le=Pe+(p-Pe)*B,fe=ge+(x-ge)*B;s[$]=te(le,fe)}else{let le=we+(g-we)*B;s[$]=H(le,v,m)}}b=ke,b>=oe&&(b-=oe),e.fillStyle="#000000",e.fillRect(0,0,oe,Me),ue();let $e=Me*.55,et=Me*.35,He=Math.floor(b)%oe,j=4;e.save(),e.lineCap="round",e.lineJoin="round";for(let L=0;L<3;L++){L===0?(e.lineWidth=15,e.strokeStyle="rgb(200, 0, 0)"):L===1?(e.lineWidth=7,e.strokeStyle="rgb(255, 15, 15)"):(e.lineWidth=2.4,e.strokeStyle="rgb(255, 175, 175)");for(let $=0;$<oe;$+=j){let B=He-$;if(B<0&&(B+=oe),B>oe-r)continue;let le=1,fe=oe-r-a;if(B>fe&&(le=1-(B-fe)/a,le=Math.max(0,le)),le<=0)continue;let Le=0;B<12&&(Le=1-B/12),L===0?e.globalAlpha=le*(.07+Le*.13):L===1?e.globalAlpha=le*(.28+Le*.32):e.globalAlpha=le*(.85+Le*.15),e.beginPath();let st=$e-s[$]*et;e.moveTo($,st);let Re=Math.min($+j,oe);for(let tt=$+1;tt<Re;tt++){let Qo=$e-s[tt]*et;e.lineTo(tt,Qo)}if(Re<oe){let tt=$e-s[Re]*et;e.lineTo(Re,tt)}e.stroke()}}e.globalAlpha=1,e.restore(),e.save();let z=e.createLinearGradient(He-3,0,He+3,0);z.addColorStop(0,"rgba(255, 0, 0, 0)"),z.addColorStop(.5,"rgba(255, 50, 50, 0.4)"),z.addColorStop(1,"rgba(255, 0, 0, 0)"),e.fillStyle=z,e.fillRect(He-3,0,6,Me),e.restore(),pe(),ht=requestAnimationFrame(de)}ht=requestAnimationFrame(de)}function fr(){ht&&(cancelAnimationFrame(ht),ht=null);let i=document.getElementById("afx-ecg-panel");i&&i.remove()}var pt=null,Ti,Mi,Yi={id:"fire",name:"Doom Fire",run:dr,stop:hr,onResize:(i,t)=>{Ti=i,Mi=t},preferredTrack:{title:"Doom 3 BFG Edition",trackTitle:"DOOM E1M1"},marqueeFont:{color:"#ffffff",shadowColor:"rgba(0,0,0,0.8)",shadowBlur:5}},ur=[[7,7,7],[31,7,7],[47,15,7],[71,15,7],[87,23,7],[103,31,7],[119,31,7],[143,39,7],[159,47,7],[175,63,7],[191,71,7],[199,71,7],[223,79,7],[223,87,7],[223,87,7],[215,95,7],[215,95,7],[215,103,15],[207,111,15],[207,119,15],[207,127,15],[207,135,23],[199,135,23],[199,143,23],[199,151,31],[191,159,31],[191,159,31],[191,167,39],[191,167,39],[191,175,47],[183,175,47],[183,183,47],[183,183,55],[207,207,111],[223,223,159],[239,239,199],[255,255,255]];function dr(i,t){let e=i.ctx2d;Ti=i.width,Mi=i.height;let o=320,n=168,l=new Uint8Array(o*n),c=e.createImageData(o,n),r=c.data,a=document.createElement("canvas");a.width=o,a.height=n;let d=a.getContext("2d");function u(){l.fill(0);for(let f=0;f<o;f++)l[(n-1)*o+f]=36}function s(f){let g=l[f];if(g===0)l[f-o]=0;else{let p=Math.floor(Math.random()*3),x=f-p+1;l[x-o]=g-(p&1)}}function h(){for(let f=0;f<o;f++)for(let g=1;g<n;g++)s(g*o+f)}function b(){for(let f=0;f<l.length;f++){let g=l[f],p=ur[g],x=f*4;r[x]=p[0],r[x+1]=p[1],r[x+2]=p[2],r[x+3]=255}}u();function m(){h(),b(),d.putImageData(c,0,0),e.save(),e.imageSmoothingEnabled=!1,e.drawImage(a,0,0,Ti,Mi),e.restore(),pt=requestAnimationFrame(m)}pt=requestAnimationFrame(m)}function hr(){pt&&(cancelAnimationFrame(pt),pt=null)}var bt=null,mt,gt,Ki={id:"geometry",name:"Geometry",run:pr,stop:mr,onResize:(i,t)=>{mt=i,gt=t},marqueeFont:{colorFn:(i,t)=>`hsl(${(i*120+t*4)%360}, 100%, 55%)`,shadowColor:"inherit",shadowBlur:15}};function pr(i,t){let e=i.ctx2d;mt=i.width,gt=i.height;let o=0;function n(){o+=.012,e.globalCompositeOperation="source-over",e.fillStyle="rgba(2, 2, 5, 0.3)",e.fillRect(0,0,mt,gt),e.globalCompositeOperation="lighter";let l=mt/2,c=gt/2,r=Math.max(mt,gt)*.85;for(let a=0;a<35;a++){let d=o+a*.05,u=(Math.sin(d*.8)*.5+.5)*r+a*12;e.save(),e.translate(l,c),e.rotate(Math.sin(o*.3)*Math.PI+a*.06),e.scale(Math.sin(o*.5+a*.1)*.4+.8,Math.cos(o*.4+a*.1)*.4+.8),e.beginPath();for(let h=0;h<=8;h++){let b=h/8*Math.PI*2,m=Math.cos(b)*u,f=Math.sin(b)*u;h===0?e.moveTo(m,f):e.lineTo(m,f)}let s=(o*50+a*10)%360;e.strokeStyle=`hsla(${s}, 95%, 65%, 0.6)`,e.lineWidth=4,e.stroke(),e.restore()}e.globalCompositeOperation="source-over",bt=requestAnimationFrame(n)}bt=requestAnimationFrame(n)}function mr(){bt&&(cancelAnimationFrame(bt),bt=null)}var Ot=null;function Zi(i){Ot=i}var gr=["#c3e4ff","#6ec3f4","#eae2ff","#b9beff"];function Ji(i){return[(i>>16&255)/255,(i>>8&255)/255,(255&i)/255]}var Ai=class{constructor(t,e,o,n){let l=this;l.canvas=t,l.gl=e,l.meshes=[],l.debug=()=>{};let c=l.gl;Object.defineProperties(l,{Material:{enumerable:!1,value:class{constructor(a,d,u={}){let s=this;function h(f,g){let p=c.createShader(f);return c.shaderSource(p,g),c.compileShader(p),c.getShaderParameter(p,c.COMPILE_STATUS)||console.error("[Gradient/WebGL] Shader compile error:",c.getShaderInfoLog(p)),p}function b(f,g){return Object.entries(f).map(([p,x])=>x.getDeclaration(p,g)).join(`
`)}s.uniforms=u,s.uniformInstances=[];let m=`
              precision highp float;
            `;s.vertexSource=`
              ${m}
              attribute vec4 position;
              attribute vec2 uv;
              attribute vec2 uvNorm;
              ${b(l.commonUniforms,"vertex")}
              ${b(u,"vertex")}
              ${a}
            `,s.Source=`
              ${m}
              ${b(l.commonUniforms,"fragment")}
              ${b(u,"fragment")}
              ${d}
            `,s.vertexShader=h(c.VERTEX_SHADER,s.vertexSource),s.fragmentShader=h(c.FRAGMENT_SHADER,s.Source),s.program=c.createProgram(),c.attachShader(s.program,s.vertexShader),c.attachShader(s.program,s.fragmentShader),c.linkProgram(s.program),c.getProgramParameter(s.program,c.LINK_STATUS)||console.error("[Gradient/WebGL] Program link error:",c.getProgramInfoLog(s.program)),c.useProgram(s.program),s.attachUniforms(void 0,l.commonUniforms),s.attachUniforms(void 0,s.uniforms)}attachUniforms(a,d){let u=this;a===void 0?Object.entries(d).forEach(([s,h])=>{u.attachUniforms(s,h)}):d.type==="array"?d.value.forEach((s,h)=>u.attachUniforms(`${a}[${h}]`,s)):d.type==="struct"?Object.entries(d.value).forEach(([s,h])=>u.attachUniforms(`${a}.${s}`,h)):u.uniformInstances.push({uniform:d,location:c.getUniformLocation(u.program,a)})}}},Uniform:{enumerable:!1,value:class{constructor(a){this.type="float",Object.assign(this,a),this.typeFn={float:"1f",int:"1i",vec2:"2fv",vec3:"3fv",vec4:"4fv",mat4:"Matrix4fv"}[this.type]||"1f",this.update()}update(a){this.value!==void 0&&c[`uniform${this.typeFn}`](a,this.typeFn.substring(0,6)==="Matrix"?this.transpose:this.value,this.typeFn.substring(0,6)==="Matrix"?this.value:null)}getDeclaration(a,d,u){let s=this;if(s.excludeFrom!==d){if(s.type==="array")return s.value[0].getDeclaration(a,d,s.value.length)+`
const int ${a}_length = ${s.value.length};`;if(s.type==="struct"){let h=a.replace("u_","");return h=h.charAt(0).toUpperCase()+h.slice(1),`uniform struct ${h} 
{
`+Object.entries(s.value).map(([b,m])=>m.getDeclaration(b,d).replace(/^uniform/,"")).join("")+`
} ${a}${u>0?`[${u}]`:""};`}return`uniform ${s.type} ${a}${u>0?`[${u}]`:""};`}}}},PlaneGeometry:{enumerable:!1,value:class{constructor(a,d,u,s,h){c.createBuffer(),this.attributes={position:new l.Attribute({target:c.ARRAY_BUFFER,size:3}),uv:new l.Attribute({target:c.ARRAY_BUFFER,size:2}),uvNorm:new l.Attribute({target:c.ARRAY_BUFFER,size:2}),index:new l.Attribute({target:c.ELEMENT_ARRAY_BUFFER,size:3,type:c.UNSIGNED_SHORT})},this.setTopology(u,s),this.setSize(a,d,h)}setTopology(a=1,d=1){let u=this;u.xSegCount=a,u.ySegCount=d,u.vertexCount=(u.xSegCount+1)*(u.ySegCount+1),u.quadCount=u.xSegCount*u.ySegCount*2,u.attributes.uv.values=new Float32Array(2*u.vertexCount),u.attributes.uvNorm.values=new Float32Array(2*u.vertexCount),u.attributes.index.values=new Uint16Array(3*u.quadCount);for(let s=0;s<=u.ySegCount;s++)for(let h=0;h<=u.xSegCount;h++){let b=s*(u.xSegCount+1)+h;if(u.attributes.uv.values[2*b]=h/u.xSegCount,u.attributes.uv.values[2*b+1]=1-s/u.ySegCount,u.attributes.uvNorm.values[2*b]=h/u.xSegCount*2-1,u.attributes.uvNorm.values[2*b+1]=1-s/u.ySegCount*2,h<u.xSegCount&&s<u.ySegCount){let m=s*u.xSegCount+h;u.attributes.index.values[6*m]=b,u.attributes.index.values[6*m+1]=b+1+u.xSegCount,u.attributes.index.values[6*m+2]=b+1,u.attributes.index.values[6*m+3]=b+1,u.attributes.index.values[6*m+4]=b+1+u.xSegCount,u.attributes.index.values[6*m+5]=b+2+u.xSegCount}}u.attributes.uv.update(),u.attributes.uvNorm.update(),u.attributes.index.update()}setSize(a=1,d=1,u="xz"){let s=this;s.width=a,s.height=d,s.orientation=u,(!s.attributes.position.values||s.attributes.position.values.length!==3*s.vertexCount)&&(s.attributes.position.values=new Float32Array(3*s.vertexCount));let h=a/-2,b=d/-2,m=a/s.xSegCount,f=d/s.ySegCount;for(let g=0;g<=s.ySegCount;g++){let p=b+g*f;for(let x=0;x<=s.xSegCount;x++){let y=h+x*m,w=g*(s.xSegCount+1)+x;s.attributes.position.values[3*w+"xyz".indexOf(u[0])]=y,s.attributes.position.values[3*w+"xyz".indexOf(u[1])]=-p}}s.attributes.position.update()}}},Mesh:{enumerable:!1,value:class{constructor(a,d){let u=this;u.geometry=a,u.material=d,u.wireframe=!1,u.attributeInstances=[],Object.entries(u.geometry.attributes).forEach(([s,h])=>{u.attributeInstances.push({attribute:h,location:h.attach(s,u.material.program)})}),l.meshes.push(u)}draw(){c.useProgram(this.material.program),this.material.uniformInstances.forEach(({uniform:a,location:d})=>a.update(d)),this.attributeInstances.forEach(({attribute:a,location:d})=>a.use(d)),c.drawElements(this.wireframe?c.LINES:c.TRIANGLES,this.geometry.attributes.index.values.length,c.UNSIGNED_SHORT,0)}remove(){l.meshes=l.meshes.filter(a=>a!==this)}}},Attribute:{enumerable:!1,value:class{constructor(a){this.type=c.FLOAT,this.normalized=!1,this.buffer=c.createBuffer(),Object.assign(this,a),this.update()}update(){this.values!==void 0&&(c.bindBuffer(this.target,this.buffer),c.bufferData(this.target,this.values,c.STATIC_DRAW))}attach(a,d){let u=c.getAttribLocation(d,a);return this.target===c.ARRAY_BUFFER&&(c.enableVertexAttribArray(u),c.vertexAttribPointer(u,this.size,this.type,this.normalized,0,0)),u}use(a){c.bindBuffer(this.target,this.buffer),this.target===c.ARRAY_BUFFER&&(c.enableVertexAttribArray(a),c.vertexAttribPointer(a,this.size,this.type,this.normalized,0,0))}}}});let r=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];l.commonUniforms={projectionMatrix:new l.Uniform({type:"mat4",value:r}),modelViewMatrix:new l.Uniform({type:"mat4",value:r}),resolution:new l.Uniform({type:"vec2",value:[1,1]}),aspectRatio:new l.Uniform({type:"float",value:1})},o&&n&&this.setSize(o,n)}setSize(t=640,e=480,o=1){this.width=t,this.height=e,this.gl.viewport(0,0,t*o,e*o),this.commonUniforms.resolution.value=[t,e],this.commonUniforms.aspectRatio.value=t/e}setOrthographicCamera(t=0,e=0,o=0,n=-2e3,l=2e3){this.commonUniforms.projectionMatrix.value=[2/this.width,0,0,0,0,2/this.height,0,0,0,0,2/(n-l),0,t,e,o,1]}render(){this.gl.clearColor(0,0,0,0),this.gl.clearDepth(1),this.meshes.forEach(t=>t.draw())}cleanup(){let t=this.gl;this.meshes.forEach(e=>{e.attributeInstances&&e.attributeInstances.forEach(({location:o})=>{typeof o=="number"&&o>=0&&t.disableVertexAttribArray(o)}),e.material&&e.material.program&&t.deleteProgram(e.material.program),e.geometry&&e.geometry.attributes&&Object.values(e.geometry.attributes).forEach(o=>{o.buffer&&t.deleteBuffer(o.buffer)})}),this.meshes=[]}},Ut=class{constructor(t,e,o,n){this.canvas=t,this.gl=e,this.width=o,this.height=n,this.angle=0,this.conf={presetName:"",wireframe:!1,density:[.06,.16],zoom:1,rotation:0,playing:!0},this.t=1253106,this.last=0,this.amp=320,this.seed=5,this.freqX=14e-5,this.freqY=29e-5,this.activeColors=[1,1,1,1],this.shaderFiles={vertex:`
                varying vec3 v_color;
                void main() {
                  float time = u_time * u_global.noiseSpeed;
                  vec2 noiseCoord = resolution * uvNorm * u_global.noiseFreq;
                  vec2 st = 1. - uvNorm.xy;

                  // Tilting the plane
                  float tilt = resolution.y / 2.0 * uvNorm.y;
                  float incline = resolution.x * uvNorm.x / 2.0 * u_vertDeform.incline;
                  float offset = resolution.x / 2.0 * u_vertDeform.incline * mix(u_vertDeform.offsetBottom, u_vertDeform.offsetTop, uv.y);

                  // Vertex noise
                  float noise = snoise(vec3(
                    noiseCoord.x * u_vertDeform.noiseFreq.x + time * u_vertDeform.noiseFlow,
                    noiseCoord.y * u_vertDeform.noiseFreq.y,
                    time * u_vertDeform.noiseSpeed + u_vertDeform.noiseSeed
                  )) * u_vertDeform.noiseAmp;

                  // Fade noise to zero at edges
                  noise *= 1.0 - pow(abs(uvNorm.y), 2.0);
                  noise = max(0.0, noise);

                  vec3 pos = vec3(
                    position.x,
                    position.y + tilt + incline + noise - offset,
                    position.z
                  );

                  // Vertex color
                  if (u_active_colors[0] == 1.) {
                    v_color = u_baseColor;
                  }

                  for (int i = 0; i < u_waveLayers_length; i++) {
                    if (u_active_colors[i + 1] == 1.) {
                      WaveLayers layer = u_waveLayers[i];
                      float noiseVal = smoothstep(
                        layer.noiseFloor,
                        layer.noiseCeil,
                        snoise(vec3(
                          noiseCoord.x * layer.noiseFreq.x + time * layer.noiseFlow,
                          noiseCoord.y * layer.noiseFreq.y,
                          time * layer.noiseSpeed + layer.noiseSeed
                        )) / 2.0 + 0.5
                      );
                      v_color = blendNormal(v_color, layer.color, pow(noiseVal, 4.));
                    }
                  }

                  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                }
            `,noise:`
                vec3 mod289(vec3 x) {
                  return x - floor(x * (1.0 / 289.0)) * 289.0;
                }
                vec4 mod289(vec4 x) {
                  return x - floor(x * (1.0 / 289.0)) * 289.0;
                }
                vec4 permute(vec4 x) {
                    return mod289(((x*34.0)+1.0)*x);
                }
                vec4 taylorInvSqrt(vec4 r) {
                  return 1.79284291400159 - 0.85373472095314 * r;
                }
                float snoise(vec3 v) {
                  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
                  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

                  vec3 i  = floor(v + dot(v, C.yyy) );
                  vec3 x0 =   v - i + dot(i, C.xxx) ;

                  vec3 g = step(x0.yzx, x0.xyz);
                  vec3 l = 1.0 - g;
                  vec3 i1 = min( g.xyz, l.zxy );
                  vec3 i2 = max( g.xyz, l.zxy );

                  vec3 x1 = x0 - i1 + C.xxx;
                  vec3 x2 = x0 - i2 + C.yyy;
                  vec3 x3 = x0 - D.yyy;

                  i = mod289(i);
                  vec4 p = permute( permute( permute(
                            i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                          + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
                          + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

                  float n_ = 0.142857142857;
                  vec3  ns = n_ * D.wyz - D.xzx;

                  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

                  vec4 x_ = floor(j * ns.z);
                  vec4 y_ = floor(j - 7.0 * x_ );

                  vec4 x = x_ *ns.x + ns.yyyy;
                  vec4 y = y_ *ns.x + ns.yyyy;
                  vec4 h = 1.0 - abs(x) - abs(y);

                  vec4 b0 = vec4( x.xy, y.xy );
                  vec4 b1 = vec4( x.zw, y.zw );

                  vec4 s0 = floor(b0)*2.0 + 1.0;
                  vec4 s1 = floor(b1)*2.0 + 1.0;
                  vec4 sh = -step(h, vec4(0.0));

                  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
                  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

                  vec3 p0 = vec3(a0.xy,h.x);
                  vec3 p1 = vec3(a0.zw,h.y);
                  vec3 p2 = vec3(a1.xy,h.z);
                  vec3 p3 = vec3(a1.zw,h.w);

                  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
                  p0 *= norm.x;
                  p1 *= norm.y;
                  p2 *= norm.z;
                  p3 *= norm.w;

                  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
                  m = m * m;
                  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
                }
            `,blend:`
                vec3 blendNormal(vec3 base, vec3 blend) {
                    return blend;
                }
                vec3 blendNormal(vec3 base, vec3 blend, float opacity) {
                    return (blendNormal(base, blend) * opacity + base * (1.0 - opacity));
                }
            `,fragment:`
                varying vec3 v_color;
                void main() {
                  vec3 color = v_color;
                  if (u_darken_top == 1.0) {
                    vec2 st = gl_FragCoord.xy / resolution.xy;
                    color.g -= pow(st.y + sin(-12.0) * st.x, u_shadow_power) * 0.4;
                  }
                  gl_FragColor = vec4(color, 1.0);
                }
            `},this.initGradientColors(),this.minigl=new Ai(t,e,o,n),this.initMesh(),this.resize(),this.updateThemeAwareText()}initGradientColors(){this.sectionColors=gr.map(t=>Ji(parseInt(t.substring(1),16)))}initMaterial(){this.uniforms={u_time:new this.minigl.Uniform({value:0}),u_shadow_power:new this.minigl.Uniform({value:5}),u_darken_top:new this.minigl.Uniform({value:0}),u_active_colors:new this.minigl.Uniform({value:this.activeColors,type:"vec4"}),u_global:new this.minigl.Uniform({value:{noiseFreq:new this.minigl.Uniform({value:[this.freqX,this.freqY],type:"vec2"}),noiseSpeed:new this.minigl.Uniform({value:5e-6})},type:"struct"}),u_vertDeform:new this.minigl.Uniform({value:{incline:new this.minigl.Uniform({value:Math.sin(this.angle)/Math.cos(this.angle)}),offsetTop:new this.minigl.Uniform({value:-.5}),offsetBottom:new this.minigl.Uniform({value:-.5}),noiseFreq:new this.minigl.Uniform({value:[3,4],type:"vec2"}),noiseAmp:new this.minigl.Uniform({value:this.amp}),noiseSpeed:new this.minigl.Uniform({value:10}),noiseFlow:new this.minigl.Uniform({value:3}),noiseSeed:new this.minigl.Uniform({value:this.seed})},type:"struct",excludeFrom:"fragment"}),u_baseColor:new this.minigl.Uniform({value:this.sectionColors[0],type:"vec3",excludeFrom:"fragment"}),u_waveLayers:new this.minigl.Uniform({value:[],excludeFrom:"fragment",type:"array"})};for(let t=1;t<this.sectionColors.length;t+=1)this.uniforms.u_waveLayers.value.push(new this.minigl.Uniform({value:{color:new this.minigl.Uniform({value:this.sectionColors[t],type:"vec3"}),noiseFreq:new this.minigl.Uniform({value:[2+t/this.sectionColors.length,3+t/this.sectionColors.length],type:"vec2"}),noiseSpeed:new this.minigl.Uniform({value:11+.3*t}),noiseFlow:new this.minigl.Uniform({value:6.5+.3*t}),noiseSeed:new this.minigl.Uniform({value:this.seed+10*t}),noiseFloor:new this.minigl.Uniform({value:.1}),noiseCeil:new this.minigl.Uniform({value:.63+.07*t})},type:"struct"}));return this.vertexShader=[this.shaderFiles.noise,this.shaderFiles.blend,this.shaderFiles.vertex].join(`

`),new this.minigl.Material(this.vertexShader,this.shaderFiles.fragment,this.uniforms)}initMesh(){this.material=this.initMaterial(),this.geometry=new this.minigl.PlaneGeometry,this.mesh=new this.minigl.Mesh(this.geometry,this.material)}resize(){let t=Math.min(window.devicePixelRatio||1,1.5);this.minigl.setSize(this.width,this.height,t),this.minigl.setOrthographicCamera(),this.xSegCount=Math.ceil(this.width*this.conf.density[0]),this.ySegCount=Math.ceil(this.height*this.conf.density[1]),this.mesh.geometry.setTopology(this.xSegCount,this.ySegCount),this.mesh.geometry.setSize(this.width,this.height),this.mesh.material.uniforms.u_shadow_power.value=this.width<600?5:6}animate=t=>{if(!this.conf.playing)return;this.last===0&&(this.last=t);let e=Math.min(t-this.last,1e3/15);this.last=t,this.t+=e,this.mesh.material.uniforms.u_time.value=this.t,this.minigl.render(),this.animationId=requestAnimationFrame(this.animate)};updateThemeAwareText(){if(!this.sectionColors||this.sectionColors.length===0)return;let t=0;this.sectionColors.forEach(l=>{let c=l[0],r=l[1],a=l[2],d=.299*c+.587*r+.114*a;t+=d});let e=t/this.sectionColors.length,o=e>.6?"#111111":"#ffffff",n=e>.6?"0 1px 2px rgba(255, 255, 255, 0.8)":"0 1px 3px rgba(0, 0, 0, 0.9), 0 2px 10px rgba(0, 0, 0, 0.6)";document.documentElement.style.setProperty("--afx-body-color",o),document.documentElement.style.setProperty("--afx-text-shadow",n),Ot&&(Ot.marqueeFont={colorFn:(l,c)=>{if(!this.sectionColors||this.sectionColors.length===0)return"#ffffff";let r=(l*1.5+c*.25)%this.sectionColors.length,a=Math.floor(r),d=(a+1)%this.sectionColors.length,u=r-a,s=this.sectionColors[a],h=this.sectionColors[d],b=s[0]*(1-u)+h[0]*u,m=s[1]*(1-u)+h[1]*u,f=s[2]*(1-u)+h[2]*u,g=e>.6?.45:1;return`rgb(${Math.round(b*g*255)}, ${Math.round(m*g*255)}, ${Math.round(f*g*255)})`},shadowColor:e>.6?"rgba(0, 0, 0, 0.25)":"inherit",shadowBlur:16},window.AnkiFX&&window.AnkiFX.marquee&&window.AnkiFX.marquee.updateStyles(Ot.marqueeFont))}randomizeColors(){let t=()=>"#"+Math.floor(Math.random()*16777215).toString(16).padStart(6,"0"),e=[t(),t(),t(),t()];if(this.sectionColors=e.map(o=>Ji(parseInt(o.substring(1),16))),this.uniforms&&this.uniforms.u_baseColor&&this.uniforms.u_waveLayers&&this.uniforms.u_waveLayers.value){this.uniforms.u_baseColor.value=this.sectionColors[0];for(let o=0;o<this.uniforms.u_waveLayers.value.length;o++){let n=this.uniforms.u_waveLayers.value[o];n&&n.value&&n.value.color&&(n.value.color.value=this.sectionColors[o+1]||this.sectionColors[0])}}this.updateThemeAwareText()}destroy(){this.conf.playing=!1,this.animationId&&cancelAnimationFrame(this.animationId),this.minigl&&this.minigl.cleanup()}};var se=null,Di={id:"gradient",name:"Gradient",controls:[{type:"button",id:"gradient-randomize",label:"\u{1F3A8} RANDOMIZE",onClick:()=>{se&&se.randomizeColors()}}],run:(i,t)=>{se&&se.destroy(),se=new Ut(i.canvasGL,i.gl,i.width,i.height),se.conf.playing=!0,se.last=0,se.animationId=requestAnimationFrame(se.animate)},stop:()=>{se&&(se.destroy(),se=null),document.documentElement.style.removeProperty("--afx-body-color"),document.documentElement.style.removeProperty("--afx-text-shadow")},onResize:(i,t,e)=>{se&&(se.width=i,se.height=t,se.resize())},marqueeFont:{color:"#E6E6FA",shadowColor:"rgba(230, 230, 250, 0.6)",shadowBlur:8}};Zi(Di);function Bt(i,t,e){function o(d,u){let s=i.createShader(d);return i.shaderSource(s,u),i.compileShader(s),i.getShaderParameter(s,i.COMPILE_STATUS)?s:(console.error("[AnkiFX/WebGL] Shader compile error:",i.getShaderInfoLog(s)),i.deleteShader(s),null)}let n=o(i.VERTEX_SHADER,t),l=o(i.FRAGMENT_SHADER,e);if(!n||!l)return n&&i.deleteShader(n),l&&i.deleteShader(l),null;let c=i.createProgram();if(i.attachShader(c,n),i.attachShader(c,l),i.linkProgram(c),i.detachShader(c,n),i.detachShader(c,l),i.deleteShader(n),i.deleteShader(l),!i.getProgramParameter(c,i.LINK_STATUS))return console.error("[AnkiFX/WebGL] Program link error:",i.getProgramInfoLog(c)),i.deleteProgram(c),null;i.useProgram(c);let r=i.createBuffer();i.bindBuffer(i.ARRAY_BUFFER,r),i.bufferData(i.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),i.STATIC_DRAW);let a=i.getAttribLocation(c,"position");return i.enableVertexAttribArray(a),i.vertexAttribPointer(a,2,i.FLOAT,!1,0,0),{program:c,buffer:r}}var Nt=null,Ge,Oe,xt,Ve,jt=null,$t=null,me={id:"julia",name:"Julia Set",run:br,stop:vr,onResize:(i,t,e)=>{Ge=i,Oe=t,Ve&&xt&&Ve.uniform2f(xt,i*e,t*e)},preferredTrack:{title:"Acoustica Power Bundle 4",trackTitle:"AiR"},presets:[{name:"Black Hole",cRe:-.8,cIm:.156,zoomDepth:8,targetX:-.086441,targetY:-.239323},{name:"Electric Lightning",cRe:.285,cIm:.013,zoomDepth:6,targetX:-.106662,targetY:.656613},{name:"Golden Dragon",cRe:-.4,cIm:.6,zoomDepth:9,targetX:-.042175,targetY:-.036744},{name:"Filigree",cRe:-.70176,cIm:-.3842,zoomDepth:10.5,targetX:-.096904,targetY:-.656621},{name:"Fractal Storm",cRe:-.7269,cIm:.1889,zoomDepth:10.5,targetX:-.237086,targetY:.547981},{name:"Seahorse Spiral",cRe:-.74543,cIm:.11301,zoomDepth:7.5,targetX:-.529406,targetY:.072863}],marqueeFont:{color:"#FFF",outline:"#000"}},Ht=null,Xt=null,qt={x:0,y:0},Qi=parseInt(localStorage.getItem("ankifx_julia_preset_index")||"0",10),vt=me.presets[Qi]||me.presets[0],O={presetIndex:Qi,cRe:vt.cRe,cIm:vt.cIm,zoomDepth:vt.zoomDepth,targetX:vt.targetX,targetY:vt.targetY,speed:parseFloat(localStorage.getItem("ankifx_julia_speed"))||.15};function br(i,t={}){Ve=i.gl;let e=i.gl,o=i.ctx2d;Ge=i.width,Oe=i.height;let n=i.dpr,r=Bt(e,`
        attribute vec2 position;
        void main() { gl_Position = vec4(position, 0.0, 1.0); }
    `,`
        precision highp float;
        uniform vec2 u_resolution;
        uniform float u_time;
        uniform float u_speed;
        uniform vec2 u_c; 
        uniform float u_zoomDepth;
        uniform vec2 u_target;

        vec3 palette(float t) {
            vec3 a = vec3(0.5, 0.5, 0.5);
            vec3 b = vec3(0.5, 0.5, 0.5);
            vec3 c = vec3(1.0, 0.7, 0.4);
            vec3 d = vec3(0.0, 0.15, 0.20);
            return a + b * cos(6.28318 * (c * t + d));
        }

        float easeInOutCubic(float x) {
            return x < 0.5 ? 4.0 * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 3.0) / 2.0;
        }

        void main() {
            vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
            float cycle = mod(u_time * u_speed / max(u_zoomDepth, 1.0), 2.0);
            float progress = cycle > 1.0 ? 2.0 - cycle : cycle;
            float easedProgress = easeInOutCubic(progress);
            
            float zoom = exp(easedProgress * u_zoomDepth);
            float scale = 2.2 / zoom;
            vec2 z = u_target + uv * scale;

            float angle = easedProgress * 3.14159 * 0.5;
            mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
            z = u_target + rot * (z - u_target);

            float iter = 0.0;
            float maxIter = clamp(200.0 + 60.0 * log(zoom), 200.0, 500.0);

            for(float i = 0.0; i < 500.0; i++) {
                if (i >= maxIter) break;
                z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + u_c;
                if(dot(z, z) > 16.0) break; 
                iter++;
            }

            vec3 col = vec3(0.0);
            if(iter < maxIter - 1.0) {
                float smoothIter = iter + 1.0 - log(log(dot(z, z))) / log(2.0);
                float colorMap = fract(smoothIter * 0.03 - u_time * 0.1);
                col = palette(colorMap);
            }

            vec2 normUv = gl_FragCoord.xy / u_resolution.xy;
            float vignette = clamp(1.0 - length(normUv - 0.5) * 1.2, 0.0, 1.0);
            vignette = smoothstep(0.0, 1.0, vignette);
            col *= mix(0.3, 1.0, vignette);

            gl_FragColor = vec4(col, 1.0);
        }
    `);if(!r)return;let a=r.program;jt=a,$t=r.buffer;let d=e.getUniformLocation(a,"u_time"),u=e.getUniformLocation(a,"u_speed");xt=e.getUniformLocation(a,"u_resolution");let s=e.getUniformLocation(a,"u_c"),h=e.getUniformLocation(a,"u_zoomDepth"),b=e.getUniformLocation(a,"u_target");e.uniform2f(xt,Ge*n,Oe*n);let m=null,f=null,g=Ge<480,p=parseInt(localStorage.getItem("ankifx_julia_preset_index")||"0",10);O.presetIndex=p;let x=me.presets[p]||me.presets[0];O.cRe=t.cRe!==void 0?t.cRe:x.cRe,O.cIm=t.cIm!==void 0?t.cIm:x.cIm,O.zoomDepth=t.zoomDepth!==void 0?t.zoomDepth:x.zoomDepth,O.targetX=t.targetX!==void 0?t.targetX:x.targetX,O.targetY=t.targetY!==void 0?t.targetY:x.targetY;let y={type:"select",id:"julia-preset",label:"PRESET",options:me.presets.map((P,v)=>({value:v,text:(g?"\u{1F4A0} ":"[ Preset: ")+P.name+(g?"":" ]")})),value:O.presetIndex,onChange:P=>{let v=parseInt(P);localStorage.setItem("ankifx_julia_preset_index",v),O.presetIndex=v;let E=me.presets[v];E&&(Object.assign(t,E),O.cRe=E.cRe,O.cIm=E.cIm,O.zoomDepth=E.zoomDepth,O.targetX=E.targetX,O.targetY=E.targetY,t.debug&&(AnkiFX.setControlValue("julia-cRe",E.cRe),AnkiFX.setControlValue("julia-cIm",E.cIm),AnkiFX.setControlValue("julia-zoomDepth",E.zoomDepth),AnkiFX.setControlValue("julia-targetX",E.targetX),AnkiFX.setControlValue("julia-targetY",E.targetY)),me.stop(),i.ctx2d&&i.ctx2d.clearRect(0,0,Ge,Oe),AnkiFX.startEffect(t,document.getElementById("ankifx-background"),t.marqueePosition,"julia"))}};if(t.debug?me.controls=[]:me.controls=[y],t.debug){me.controls.push({type:"slider",id:"julia-cRe",label:"C-RE",min:-1.5,max:1,step:.001,value:O.cRe,onChange:C=>{O.cRe=C}},{type:"slider",id:"julia-cIm",label:"C-IM",min:-1,max:1,step:.001,value:O.cIm,onChange:C=>{O.cIm=C}},{type:"slider",id:"julia-zoomDepth",label:"ZOOM",min:2,max:25,step:.1,value:O.zoomDepth,onChange:C=>{O.zoomDepth=C}},{type:"slider",id:"julia-targetX",label:"T-X",min:-2,max:2,step:1e-4,value:O.targetX,onChange:C=>{O.targetX=C}},{type:"slider",id:"julia-targetY",label:"T-Y",min:-2,max:2,step:1e-4,value:O.targetY,onChange:C=>{O.targetY=C}},{type:"slider",id:"julia-speed",label:"SPD",min:.005,max:.3,step:.005,value:O.speed,onChange:C=>{O.speed=C,localStorage.setItem("ankifx_julia_speed",C)}}),me.controls.push(y);let P=document.getElementById("afx-effect-controls-container");P&&(m=document.createElement("div"),m.id="afx-julia-debug-info",m.className="afx-control-row julia-debug-el",m.style.cssText="height: 20px !important; margin-bottom: 2px; pointer-events: none; justify-content: flex-end; opacity: 0.8; font-size: 11px !important; color: #ff00ff; border: none; background: transparent;",m.textContent="HOVER TO SEE TARGET COORDS",P.prepend(m)),f=(C,A,q)=>{let U=q*O.speed/Math.max(O.zoomDepth,1)%2,F=U>1?2-U:U,N=F<.5?4*Math.pow(F,3):1-Math.pow(-2*F+2,3)/2,G=2.2/Math.exp(N*O.zoomDepth),V=N*Math.PI*.5,Q=(C-Ge/2)/Oe,K=(Oe/2-A)/Oe,M=Math.cos(V),_=Math.sin(V),H=(M*Q+_*K)*G,te=(-_*Q+M*K)*G;return{tx:O.targetX+H,ty:O.targetY+te}};let v=C=>{if(C.target.closest("#afx-bottom-dock")||C.target.closest(".afx-dialog"))return;let A=performance.now()*.001-w,{tx:q,ty:U}=f(C.clientX,C.clientY,A);O.targetX=q,O.targetY=U,AnkiFX.setControlValue("julia-targetX",q),AnkiFX.setControlValue("julia-targetY",U)};window.addEventListener("mousedown",v),Ht=v;let E=C=>{qt.x=C.clientX,qt.y=C.clientY};window.addEventListener("mousemove",E),Xt=E}let w=performance.now()*.001;function k(){let P=performance.now()*.001-w;if(e.uniform1f(d,P),e.uniform1f(u,O.speed),e.uniform2f(s,O.cRe,O.cIm),e.uniform1f(h,O.zoomDepth),e.uniform2f(b,O.targetX,O.targetY),e.drawArrays(e.TRIANGLE_STRIP,0,4),o.clearRect(0,0,Ge,Oe),m&&f){let v=performance.now()*.001-w,{tx:E,ty:C}=f(qt.x,qt.y,v);m.textContent=`TARGET X: ${E.toFixed(6)}, Y: ${C.toFixed(6)}`}Nt=requestAnimationFrame(k)}k()}function vr(){Nt&&(cancelAnimationFrame(Nt),Nt=null),Ht&&(window.removeEventListener("mousedown",Ht),Ht=null),Xt&&(window.removeEventListener("mousemove",Xt),Xt=null),document.querySelectorAll(".julia-debug-el").forEach(i=>i.remove()),Ve&&(jt&&Ve.deleteProgram(jt),$t&&Ve.deleteBuffer($t),jt=null,$t=null),Ve=null,xt=null}var yt=null,rt=0,Be=0,D=null,Z=null,Ue=[],Gt=0,wt=null,ae={x:-1e3,y:-1e3,dx:0,dy:0,down:!1},to=null,io={id:"lavalamp",name:"Lava Lamp",run:kr,stop:Cr,onResize:Er,marqueeFont:{color:"#ffccaa",shadowColor:"rgba(255, 100, 0, 0.8)",shadowBlur:10}},Ie=6,Vt=class{constructor(t,e,o,n){this.pos={x:t,y:e},this.vel={x:0,y:-(Math.random()*.6+.3)},this.radius=o;let l=e/n;this.temperature=.15+l*.3+Math.random()*.15,this.buoyancy=0,this.noiseOffset=Math.random()*1e3,this.smoothSpeedY=0}update(t,e,o){this.pos.y>o*.8?this.temperature+=.05*t:this.pos.y>o*.6?this.temperature+=.02*t:this.pos.y<o*.2?this.temperature-=.04*t:this.pos.y<o*.4&&(this.temperature-=.015*t),this.temperature=Math.max(0,Math.min(1,this.temperature)),this.buoyancy=this.temperature*4-2,this.vel.y-=this.buoyancy*10*t;let n=Math.sin(this.noiseOffset+Gt*2e-4)*.1;this.vel.x+=n*t*.3;let l=1-Math.min(Math.abs(this.buoyancy)/.8,1),c=(e*.5-this.pos.x)*.003*l;this.vel.x+=c*t,this.pos.x<this.radius&&(this.vel.x+=(this.radius-this.pos.x)*2*t),this.pos.x>e-this.radius&&(this.vel.x-=(this.pos.x-(e-this.radius))*2*t);let r=-this.radius*.5;this.pos.y<r&&(this.vel.y+=(r-this.pos.y)*8*t);let a=o+this.radius*.5;this.pos.y>a&&(this.vel.y-=(this.pos.y-a)*8*t);let d=Math.pow(.97,t*60);this.vel.x*=d;let s=Math.abs(this.buoyancy)>.8,h=Math.pow(s?.994:.975,t*60);this.vel.y*=h;let b=Math.max(0,(this.pos.y-o*.82)/(o*.18)),m=Math.max(0,(o*.18-this.pos.y)/(o*.18)),f=Math.pow(.88,t*60*(b+m));if(this.vel.x*=f,ae.down){let g=this.pos.x-ae.x,p=this.pos.y-ae.y,x=Math.sqrt(g*g+p*p);if(x<200){let y=(200-x)/200;this.vel.x+=ae.dx*y*1.5,this.vel.y+=ae.dy*y*8}}this.smoothSpeedY+=(Math.abs(this.vel.y)-this.smoothSpeedY)*(1-Math.pow(.05,t)),this.pos.x+=this.vel.x*t,this.pos.y+=this.vel.y*t}},xr=`
    attribute vec2 aPosition;
    varying vec2 vUv;
    void main() {
        vUv = aPosition * 0.5 + 0.5;
        // Match canvas 2D coordinates (Y=0 is top)
        vUv.y = 1.0 - vUv.y;
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }
`,yr=`
    precision highp float;
    varying vec2 vUv;
    
    uniform vec2 uResolution;
    uniform float uTime;
    
    uniform vec4 uBlobs[${Ie}]; // x, y, radius, stretch
    uniform float uBlobTemp[${Ie}]; // temperature
    
    // Polynomial smooth minimum
    float smin(float a, float b, float k) {
        float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
        return mix(b, a, h) - k * h * (1.0 - h);
    }
    
    float map(vec2 p) {
        float d = 10000.0;
        for (int i = 0; i < ${Ie}; i++) {
            float stretchY = max(uBlobs[i].w, 0.85);
            vec2 lp = p - uBlobs[i].xy;
            // Squash coordinate space: compress Y by stretchY, expand X to preserve area
            // This deforms the metric, not the SDF, so gradients stay well-behaved
            lp.x *= sqrt(stretchY);
            lp.y /= sqrt(stretchY);
            float blob = length(lp) - uBlobs[i].z;
            d = smin(d, blob, 60.0);
        }
        
        // Base merging constraint
        float floorDist = uResolution.y - p.y;
        d = smin(d, floorDist - 35.0, 120.0);
        
        return d;
    }
    
    vec3 calcNormal(vec2 p, float d) {
        vec2 e = vec2(1.0, 0.0);
        vec3 n = vec3(
            map(p + e.xy) - d,
            map(p + e.yx) - d,
            4.0 - min(0.0, d) * 0.5 // Flatten the center to remove sharp 'nipples'
        );
        return normalize(n);
    }
    
    void main() {
        vec2 p = vUv * uResolution;
        float d = map(p);
        
        // Background gradient
        vec3 bg = mix(vec3(0.08, 0.01, 0.0), vec3(0.2, 0.04, 0.0), vUv.y);
        
        // Lava Palette
        vec3 lavaBase = vec3(0.8, 0.15, 0.0);
        vec3 lavaHot = vec3(1.0, 0.6, 0.1);
        
        // Continuous soft subsurface glow around blobs
        float glow = exp(-max(0.0, d) * 0.02);
        vec3 glowBg = bg + vec3(0.95, 0.35, 0.0) * glow * 0.45;
        
        // Soft edge anti-aliasing
        float alpha = smoothstep(3.0, -3.0, d);
        
        if (d > 3.0) {
            gl_FragColor = vec4(glowBg, 1.0);
            return;
        }
        
        vec3 n = calcNormal(p, d);
        
        // Lighting setup
        vec3 lightDir = normalize(vec3(0.0, 1.0, 0.5)); // Warm base light
        vec3 viewDir = normalize(vec3(0.0, 0.0, 1.0));
        
        float diff = max(dot(n, lightDir), 0.0);
        
        vec3 halfDir = normalize(lightDir + viewDir);
        float spec = pow(max(dot(n, halfDir), 0.0), 32.0);
        
        // Thickness-based translucency inside the lava (d < 0)
        float thickness = abs(d);
        float translucency = exp(-thickness * 0.008);
        
        // Glowing orange-white inside thin filaments/necks, deep red in bodies
        vec3 dynamicLavaBase = mix(vec3(0.6, 0.05, 0.0), vec3(1.0, 0.55, 0.05), translucency);
        
        // Color mapping
        vec3 col = mix(dynamicLavaBase, lavaHot, diff);
        col += vec3(1.0, 0.9, 0.6) * spec * 0.7; // Highlights
        
        // Ambient rim light
        float rim = 1.0 - max(dot(n, viewDir), 0.0);
        col += vec3(0.9, 0.2, 0.0) * pow(rim, 3.0) * 0.8;
        
        // Blend lava directly with the glowing background (no black borders!)
        vec3 finalCol = mix(glowBg, col, alpha);
        
        gl_FragColor = vec4(finalCol, 1.0);
    }
`;function eo(i,t){let e=D.createShader(i);return D.shaderSource(e,t),D.compileShader(e),D.getShaderParameter(e,D.COMPILE_STATUS)?e:(console.error("[LavaLamp/WebGL] Shader compile error:",D.getShaderInfoLog(e)),D.deleteShader(e),null)}function wr(){let i=eo(D.VERTEX_SHADER,xr),t=eo(D.FRAGMENT_SHADER,yr);if(Z=D.createProgram(),D.attachShader(Z,i),D.attachShader(Z,t),D.linkProgram(Z),!D.getProgramParameter(Z,D.LINK_STATUS))return console.error("[LavaLamp/WebGL] Program link error:",D.getProgramInfoLog(Z)),!1;D.useProgram(Z),wt=D.createBuffer(),D.bindBuffer(D.ARRAY_BUFFER,wt);let e=new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]);D.bufferData(D.ARRAY_BUFFER,e,D.STATIC_DRAW);let o=D.getAttribLocation(Z,"aPosition");return D.enableVertexAttribArray(o),D.vertexAttribPointer(o,2,D.FLOAT,!1,0,0),Z.uResolution=D.getUniformLocation(Z,"uResolution"),Z.uTime=D.getUniformLocation(Z,"uTime"),Z.uBlobs=D.getUniformLocation(Z,"uBlobs"),Z.uBlobTemp=D.getUniformLocation(Z,"uBlobTemp"),!0}function kr(i,t){if(D=i.gl,to=i.canvasGL,rt=i.width,Be=i.height,!D){console.error("[LavaLamp] WebGL context required \u2014 cannot run effect.");return}if(!wr())return;Ue=[];let e=0;for(;Ue.length<Ie&&e<200;){e++;let o=70+Math.random()*60,n=o+Math.random()*(rt-o*2),l=o+Math.random()*(Be-o*2),c=!1;for(let r of Ue){let a=r.pos.x-n,d=r.pos.y-l;if(Math.sqrt(a*a+d*d)<r.radius+o+10){c=!0;break}}c||Ue.push(new Vt(n,l,o,Be))}for(;Ue.length<Ie;){let o=70+Math.random()*60,n=o+Math.random()*(rt-o*2),l=o+Math.random()*(Be-o*2);Ue.push(new Vt(n,l,o,Be))}Gt=performance.now(),Sr(),yt=requestAnimationFrame(oo)}function Er(i,t,e){rt=i,Be=t,D&&D.viewport(0,0,i*e,t*e)}function oo(i){let t=Math.min((i-Gt)/1e3,.05);Gt=i;let e=new Float32Array(Ie*4),o=new Float32Array(Ie);for(let n=0;n<Ie;n++)Ue[n].update(t,rt,Be);for(let n=0;n<Ie;n++){let l=Ue[n],c=Math.max(.85,1+Math.min(l.smoothSpeedY*.028,.7)*(.4+l.temperature*.6));e[n*4+0]=l.pos.x,e[n*4+1]=l.pos.y,e[n*4+2]=l.radius,e[n*4+3]=c,o[n]=l.temperature}D.useProgram(Z),D.uniform2f(Z.uResolution,rt,Be),D.uniform1f(Z.uTime,i*.001),D.uniform4fv(Z.uBlobs,e),D.uniform1fv(Z.uBlobTemp,o),D.drawArrays(D.TRIANGLES,0,6),ae.dx=0,ae.dy=0,yt=requestAnimationFrame(oo)}function kt(i){let t=to.getBoundingClientRect(),e=i.touches?i.touches[0]:i,o=e.clientX-t.left,n=e.clientY-t.top;if(ae.down&&i.type!=="mousedown"&&i.type!=="touchstart"){let l=o-ae.x,c=n-ae.y;Math.abs(l)<150&&Math.abs(c)<150&&(ae.dx=l,ae.dy=c)}ae.x=o,ae.y=n}function Wt(i){ae.dx=0,ae.dy=0,ae.down=!0,kt(i)}function Yt(){ae.down=!1}function Sr(){window.addEventListener("mousedown",Wt),window.addEventListener("mousemove",kt),window.addEventListener("mouseup",Yt),window.addEventListener("touchstart",Wt,{passive:!0}),window.addEventListener("touchmove",kt,{passive:!0}),window.addEventListener("touchend",Yt)}function Pr(){window.removeEventListener("mousedown",Wt),window.removeEventListener("mousemove",kt),window.removeEventListener("mouseup",Yt),window.removeEventListener("touchstart",Wt),window.removeEventListener("touchmove",kt),window.removeEventListener("touchend",Yt)}function Cr(){yt&&(cancelAnimationFrame(yt),yt=null),Pr(),D&&(D.clearColor(0,0,0,0),D.clear(D.COLOR_BUFFER_BIT),Z&&D.deleteProgram(Z),wt&&D.deleteBuffer(wt),Z=null,wt=null)}var Jt=null,Et,We,St,Ye,Zt=null,Qt=null,ii={id:"mandelbrot",name:"Mandelbrot",run:Fr,stop:Tr,onResize:(i,t,e)=>{Et=i,We=t,Ye&&St&&Ye.uniform2f(St,i*e,t*e)},preferredTrack:{title:"Acoustica Power Bundle 4",trackTitle:"AiR"},marqueeFont:{color:"#FFF",outline:"#000"}},ei=null,ti=null,Kt={x:0,y:0},re={targetX:-.743643887037151,targetY:.13182590420533,zoomDepth:11,speed:parseFloat(localStorage.getItem("ankifx_mandelbrot_speed"))||.15};function Fr(i,t={}){Ye=i.gl;let e=i.gl,o=i.ctx2d;Et=i.width,We=i.height;let n=i.dpr,r=Bt(e,`
        attribute vec2 position;
        void main() { gl_Position = vec4(position, 0.0, 1.0); }
    `,`
        precision highp float;
        uniform vec2 u_resolution;
        uniform float u_time;
        uniform float u_speed;
        uniform float u_zoomDepth;
        uniform vec2 u_target;

        vec3 palette(float t) {
            vec3 a = vec3(0.5, 0.5, 0.5);
            vec3 b = vec3(0.5, 0.5, 0.5);
            vec3 c = vec3(1.0, 0.7, 0.4);
            vec3 d = vec3(0.0, 0.15, 0.20);
            return a + b * cos(6.28318 * (c * t + d));
        }

        float easeInOutCubic(float x) {
            return x < 0.5 ? 4.0 * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 3.0) / 2.0;
        }

        void main() {
            vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
            float cycle = mod(u_time * u_speed / max(u_zoomDepth, 1.0), 2.0);
            float progress = cycle > 1.0 ? 2.0 - cycle : cycle;
            float easedProgress = easeInOutCubic(progress);
            
            float zoom = exp(easedProgress * u_zoomDepth);
            vec2 c = u_target + uv * (2.5 / zoom);
            vec2 z = vec2(0.0);
            float iter = 0.0;
            
            float maxIter = clamp(150.0 + 65.0 * log(zoom), 150.0, 500.0);
            const float ABSOLUTE_MAX = 500.0;

            for(float i = 0.0; i < ABSOLUTE_MAX; i++) {
                if (i >= maxIter) break;
                z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
                if(dot(z, z) > 16.0) break; 
                iter++;
            }

            vec3 col = vec3(0.0);
            if(iter < maxIter - 1.0) {
                float smoothIter = iter - log2(max(1.0, log2(dot(z, z)))) + 3.0;
                float colorMap = fract(smoothIter * 0.03 - u_time * 0.2);
                col = palette(colorMap);
            }

            vec2 normUv = gl_FragCoord.xy / u_resolution.xy;
            float vignette = clamp(1.0 - length(normUv - 0.5) * 1.2, 0.0, 1.0);
            vignette = smoothstep(0.0, 1.0, vignette);
            col *= mix(0.2, 1.0, vignette);

            gl_FragColor = vec4(col, 1.0);
        }
    `);if(!r)return;let a=r.program;Zt=a,Qt=r.buffer;let d=e.getUniformLocation(a,"u_time"),u=e.getUniformLocation(a,"u_speed"),s=e.getUniformLocation(a,"u_zoomDepth"),h=e.getUniformLocation(a,"u_target");St=e.getUniformLocation(a,"u_resolution"),e.uniform2f(St,Et*n,We*n);let b=null,m=null;if(t.debug){ii.controls=[{type:"slider",id:"mandelbrot-zoomDepth",label:"ZOOM",min:2,max:25,step:.1,value:re.zoomDepth,onChange:w=>{re.zoomDepth=w}},{type:"slider",id:"mandelbrot-targetX",label:"T-X",min:-2.5,max:1,step:1e-4,value:re.targetX,onChange:w=>{re.targetX=w}},{type:"slider",id:"mandelbrot-targetY",label:"T-Y",min:-1.5,max:1.5,step:1e-4,value:re.targetY,onChange:w=>{re.targetY=w}},{type:"slider",id:"mandelbrot-speed",label:"SPD",min:.005,max:.3,step:.005,value:re.speed,onChange:w=>{re.speed=w,localStorage.setItem("ankifx_mandelbrot_speed",w)}}];let p=document.getElementById("afx-effect-controls-container");p&&(b=document.createElement("div"),b.id="afx-mandelbrot-debug-info",b.className="afx-control-row mandelbrot-debug-el",b.style.cssText="height: 20px !important; margin-bottom: 2px; pointer-events: none; justify-content: flex-end; opacity: 0.8; font-size: 11px !important; color: #ff00ff; border: none; background: transparent;",b.textContent="HOVER TO SEE TARGET COORDS",p.prepend(b)),m=(w,k,P)=>{let v=P*re.speed/Math.max(re.zoomDepth,1)%2,E=v>1?2-v:v,C=E<.5?4*Math.pow(E,3):1-Math.pow(-2*E+2,3)/2,A=Math.exp(C*re.zoomDepth),q=(w-Et/2)/We,U=(We/2-k)/We;return{tx:re.targetX+q*(2.5/A),ty:re.targetY+U*(2.5/A)}};let x=w=>{if(w.target.closest("#afx-bottom-dock")||w.target.closest(".afx-dialog"))return;let k=performance.now()*.001-f,{tx:P,ty:v}=m(w.clientX,w.clientY,k);re.targetX=P,re.targetY=v,AnkiFX.setControlValue("mandelbrot-targetX",P),AnkiFX.setControlValue("mandelbrot-targetY",v)};window.addEventListener("mousedown",x),ei=x;let y=w=>{Kt.x=w.clientX,Kt.y=w.clientY};window.addEventListener("mousemove",y),ti=y}else ii.controls=[];let f=performance.now()*.001;function g(){let p=performance.now()*.001-f;if(e.uniform1f(d,p),e.uniform1f(u,re.speed),e.uniform1f(s,re.zoomDepth),e.uniform2f(h,re.targetX,re.targetY),e.drawArrays(e.TRIANGLE_STRIP,0,4),o.clearRect(0,0,Et,We),b&&m){let x=performance.now()*.001-f,{tx:y,ty:w}=m(Kt.x,Kt.y,x);b.textContent=`TARGET X: ${y.toFixed(6)}, Y: ${w.toFixed(6)}`}Jt=requestAnimationFrame(g)}g()}function Tr(){Jt&&(cancelAnimationFrame(Jt),Jt=null),ei&&(window.removeEventListener("mousedown",ei),ei=null),ti&&(window.removeEventListener("mousemove",ti),ti=null),document.querySelectorAll(".mandelbrot-debug-el").forEach(i=>i.remove()),Ye&&(Zt&&Ye.deleteProgram(Zt),Qt&&Ye.deleteBuffer(Qt),Zt=null,Qt=null),Ye=null,St=null}var Pt=null,ai,oi,ri=16,qe=[];function ro(){let i=Math.floor(ai/ri);qe=[];for(let t=0;t<i;t++)qe[t]=Math.random()*-100}var ao={id:"matrix",name:"Matrix",run:Mr,stop:Ar,onResize:(i,t)=>{ai=i,oi=t,ro()},preferredTrack:{trackTitle:"nightfall"},marqueeFont:{color:"#0F0",shadowColor:"#0F0",shadowBlur:10}};function Mr(i,t){let e=i.ctx2d;ai=i.width,oi=i.height,ro();let o="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*]*";function n(){e.fillStyle="rgba(0, 0, 0, 0.1)",e.fillRect(0,0,ai,oi),e.fillStyle="#0F0",e.font=ri+"px monospace";for(let l=0;l<qe.length;l++)if(qe[l]>0||Math.random()>.95){let c=o.charAt(Math.floor(Math.random()*o.length)),r=qe[l]*ri;e.fillText(c,l*ri,r),r>oi&&Math.random()>.975&&(qe[l]=0),qe[l]++}else qe[l]+=.5;Pt=requestAnimationFrame(n)}Pt=requestAnimationFrame(n)}function Ar(){Pt&&(cancelAnimationFrame(Pt),Pt=null)}var no={id:"none",name:"None",run:Dr,stop:_r,marqueeFont:{color:"#ffffff",shadowColor:"rgba(0,0,0,0.8)",shadowBlur:5}};function Dr(i,t){i.ctx2d.clearRect(0,0,i.width,i.height)}function _r(){}var Ct=null,ne,Ae,lo={id:"starfield",name:"Starfield",run:Ir,stop:Lr,onResize:(i,t)=>{ne=i,Ae=t},preferredTrack:{trackTitle:"star wars title"},marqueeFont:{color:"#FFE81F",shadowColor:"#FFE81F",shadowBlur:20,outline:"#000"}};function Ir(i,t){let e=i.ctx2d;ne=i.width,Ae=i.height;let o=[],n=8e3,l=new Uint8Array(512),c=new Uint8Array(256).map(()=>Math.random()*256);for(let g=0;g<512;g++)l[g]=c[g&255];let r=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]];function a(g,p,x,y){return g[0]*p+g[1]*x+g[2]*y}function d(g,p,x){let y,w,k,P,v=.3333333333333333,E=1/6,C=(g+p+x)*v,A=Math.floor(g+C),q=Math.floor(p+C),U=Math.floor(x+C),F=(A+q+U)*E,N=g-A+F,X=p-q+F,G=x-U+F,V,Q,K,M,_,H;N>=X?X>=G?(V=1,Q=0,K=0,M=1,_=1,H=0):N>=G?(V=1,Q=0,K=0,M=1,_=0,H=1):(V=0,Q=0,K=1,M=1,_=0,H=1):X<G?(V=0,Q=0,K=1,M=0,_=1,H=1):N<G?(V=0,Q=1,K=0,M=0,_=1,H=1):(V=0,Q=1,K=0,M=1,_=1,H=0);let te=N-V+E,ue=X-Q+E,pe=G-K+E,de=N-M+2*E,S=X-_+2*E,I=G-H+2*E,W=N-1+3*E,R=X-1+3*E,J=G-1+3*E,he=A&255,we=q&255,Pe=U&255,ge=.6-N*N-X*X-G*G;ge<0?y=0:(ge*=ge,y=ge*ge*a(r[l[he+l[we+l[Pe]]]%12],N,X,G));let be=.6-te*te-ue*ue-pe*pe;be<0?w=0:(be*=be,w=be*be*a(r[l[he+V+l[we+Q+l[Pe+K]]]%12],te,ue,pe));let ke=.6-de*de-S*S-I*I;ke<0?k=0:(ke*=ke,k=ke*ke*a(r[l[he+M+l[we+_+l[Pe+H]]]%12],de,S,I));let ve=.6-W*W-R*R-J*J;return ve<0?P=0:(ve*=ve,P=ve*ve*a(r[l[he+1+l[we+1+l[Pe+1]]]%12],W,R,J)),32*(y+w+k+P)}function u(g,p,x,y=3){let w=0,k=.5;for(let P=0;P<y;P++)w+=d(g,p,x)*k,g*=2,p*=2,x*=2,k*=.5;return w}class s{constructor(){this.active=!1,this.nextSpawn=Date.now()+2e3}reset(){let p=Math.random()*Math.PI*2,x=.2+Math.random()*.4;this.x=Math.cos(p)*ne*x,this.y=Math.sin(p)*Ae*x,this.z=ne,this.sizeBase=80+Math.random()*120,this.speed=.8,this.active=!0,this.type=1+Math.floor(Math.random()*2);let y=[{name:"ice",baseH:190+Math.random()*40,sat:60,l:70},{name:"inferno",baseH:Math.random()*40,sat:80,l:60},{name:"toxic",baseH:80+Math.random()*40,sat:70,l:60},{name:"ethereal",baseH:260+Math.random()*40,sat:60,l:75},{name:"classic",baseH:30+Math.random()*20,sat:50,l:80}],w=y[Math.floor(Math.random()*y.length)];this.generateGasGiantTexture(w),this.type===2&&(this.rings=Array.from({length:4},(k,P)=>({r1:1.6+P*.2,opacity:.2+Math.random()*.4})))}hslToRgb(p,x,y){p/=360,x/=100,y/=100;let w,k,P;if(x===0)w=k=P=y;else{let v=y<.5?y*(1+x):y+x-y*x,E=2*y-v,C=A=>(A<0&&(A+=1),A>1&&(A-=1),A<1/6?E+(v-E)*6*A:A<1/2?v:A<2/3?E+(v-E)*(2/3-A)*6:E);w=C(p+1/3),k=C(p),P=C(p-1/3)}return{r:w*255,g:k*255,b:P*255}}generateGasGiantTexture(p){let x=document.createElement("canvas");x.width=x.height=256;let y=x.getContext("2d"),w=y.createImageData(256,256),k=p.baseH,P=this.hslToRgb(k,p.sat,p.l),v=this.hslToRgb((k+20)%360,p.sat+10,p.l-10),E=this.hslToRgb((k-40+360)%360,p.sat+20,p.l-15),C=this.hslToRgb((k+60)%360,p.sat-20,p.l+10),A=(U,F,N)=>({r:U.r+(F.r-U.r)*N,g:U.g+(F.g-U.g)*N,b:U.b+(F.b-U.b)*N}),q=Math.random()*1e3;for(let U=0;U<256;U++)for(let F=0;F<256;F++){let N=U/256*10,X=F/256*10,G=Math.abs(u(0,N*.4,q,3)),V=N+u(X*.5,N*.5,q)*G*4,Q=X+u(N*.5,X*.5,q+50)*G*2,K=(u(0,V*.8,q+100,4)+1)/2,M=(u(Q*.1,V*1.5,q+200,2)+1)/2,_=A(v,P,K);K>.7&&(_=A(_,C,(K-.7)*2)),M>.6&&(_=A(_,E,(M-.6)*1.5));let H=1+u(Q,V,q+300,2)*.2,te=(U*256+F)*4;w.data[te]=Math.min(255,_.r*H),w.data[te+1]=Math.min(255,_.g*H),w.data[te+2]=Math.min(255,_.b*H),w.data[te+3]=255}y.putImageData(w,0,0),this.textureCanvas=x}update(){if(!this.active){Date.now()>this.nextSpawn&&this.reset();return}this.z-=this.speed,this.z<=0&&(this.active=!1,this.nextSpawn=Date.now())}draw(p){if(!this.active)return;let x=ne/2/this.z,y=this.x*x+ne/2,w=this.y*x+Ae/2,k=(1-this.z/ne)*this.sizeBase;if(y<-k*3||y>ne+k*3||w<-k*3||w>Ae+k*3)return;p.save(),p.translate(y,w),this.type===2&&(this.drawRings(p,k,!0),p.globalAlpha=1);let P=p.createRadialGradient(0,0,k*.9,0,0,k*1.5);P.addColorStop(0,"rgba(255, 255, 255, 0.15)"),P.addColorStop(1,"rgba(0,0,0,0)"),p.fillStyle=P,p.beginPath(),p.arc(0,0,k*1.5,0,Math.PI*2),p.fill(),p.save(),p.beginPath(),p.arc(0,0,k,0,Math.PI*2),p.clip(),p.globalAlpha=1,p.drawImage(this.textureCanvas,-k,-k,k*2,k*2);let v=p.createRadialGradient(-k*.5,-k*.5,k*.1,0,0,k);v.addColorStop(0,"rgba(255, 255, 255, 0.25)"),v.addColorStop(.5,"rgba(0, 0, 0, 0)"),v.addColorStop(1,"rgba(0, 0, 0, 0.4)"),p.fillStyle=v,p.fillRect(-k,-k,k*2,k*2),p.restore();let E=p.createRadialGradient(0,0,k*.7,0,0,k);E.addColorStop(1,"rgba(255,255,255,0.4)"),E.addColorStop(.8,"rgba(255,255,255,0)"),p.fillStyle=E,p.beginPath(),p.arc(0,0,k,0,Math.PI*2),p.fill(),this.type===2&&(this.drawRings(p,k,!1),p.globalAlpha=1),p.restore()}drawRings(p,x,y){p.save();let w=Math.PI/8;for(let k of this.rings)p.globalAlpha=k.opacity,p.strokeStyle="#E6E6FA",p.lineWidth=x*.15,p.beginPath(),p.ellipse(0,0,k.r1*x,k.r1*.3*x,w,0,Math.PI*2),p.stroke();p.restore()}}let h=new s,b=["#FFFFFF","#FFE4B5","#E0FFFF","#FFF0F5","#F0F8FF"];for(let g=0;g<n;g++)o.push({x:(Math.random()-.5)*ne*4,y:(Math.random()-.5)*Ae*4,z:Math.random()*ne,color:b[Math.floor(Math.random()*b.length)],sizeBase:2+Math.random()*2.5});let m=0;function f(){e.fillStyle="rgba(5, 5, 12, 1)",e.fillRect(0,0,ne,Ae);let g=ne/2,p=Ae/2;m+=.01,h.update(),h.draw(e);for(let x=0;x<n;x++){let y=o[x],w=y.z;if(y.z-=4,y.z<=0){y.x=(Math.random()-.5)*ne*4,y.y=(Math.random()-.5)*Ae*4,y.z=ne;continue}let k=ne/2/y.z,P=y.x*k+g,v=y.y*k+p;if(P>=0&&P<=ne&&v>=0&&v<=Ae){let E=1-y.z/ne,C=E*y.sizeBase;if(E<.3){e.globalAlpha=E*2,e.fillStyle=y.color,e.fillRect(P,v,Math.max(1,C),Math.max(1,C));continue}e.globalAlpha=E,e.fillStyle=y.color,e.strokeStyle=y.color;let A=ne/2/w,q=y.x*A+g,U=y.y*A+p;e.lineWidth=C,e.beginPath(),e.moveTo(q,U),e.lineTo(P,v),e.stroke(),e.beginPath(),e.arc(P,v,C/2,0,Math.PI*2),e.fill(),E>.8&&(e.globalAlpha=(E-.8)*3,e.beginPath(),e.arc(P,v,C*2.5,0,Math.PI*2),e.fill())}}e.globalAlpha=1,Ct=requestAnimationFrame(f)}Ct=requestAnimationFrame(f)}function Lr(){Ct&&(cancelAnimationFrame(Ct),Ct=null)}var Ft=null,Ke,Tt,ni=0,li=0,Se=null;function co(){if(Ke===void 0||Tt===void 0)return;let i=Math.max(100,li),t=Math.max(14,Math.floor(Ke/25)),e=Math.floor(Ke/t),o=Math.floor(i/t);Se=new Ii(e,o,t)}var fo={id:"tetris",name:"Tetris",run:Rr,stop:zr,onResize:(i,t)=>{Ke=i,Tt=t;let e=getComputedStyle(document.documentElement);ni=parseInt(e.getPropertyValue("--io-header"))||0,li=t-ni,co()},preferredTrack:{title:"WinTask 3",trackTitle:"Whoopees Tetris"},marqueeFont:{color:"#f0f0f0",shadowColor:"#a000f0",shadowBlur:12,outline:"#000"}},uo={I:{shapes:[[[1,1,1,1]],[[1],[1],[1],[1]]],color:"#00f0f0"},O:{shapes:[[[1,1],[1,1]]],color:"#f0f000"},T:{shapes:[[[0,1,0],[1,1,1]],[[1,0],[1,1],[1,0]],[[1,1,1],[0,1,0]],[[0,1],[1,1],[0,1]]],color:"#a000f0"},S:{shapes:[[[0,1,1],[1,1,0]],[[1,0],[1,1],[0,1]]],color:"#00f000"},Z:{shapes:[[[1,1,0],[0,1,1]],[[0,1],[1,1],[1,0]]],color:"#f00000"},J:{shapes:[[[1,0,0],[1,1,1]],[[1,1],[1,0],[1,0]],[[1,1,1],[0,0,1]],[[0,1],[0,1],[1,1]]],color:"#0000f0"},L:{shapes:[[[0,0,1],[1,1,1]],[[1,0],[1,0],[1,1]],[[1,1,1],[1,0,0]],[[1,1],[0,1],[0,1]]],color:"#f0a000"}},so=Object.keys(uo),_i=class{constructor(t,e,o){this.x=t,this.y=e,this.color=o,this.vx=(Math.random()-.5)*12,this.vy=(Math.random()-.7)*14,this.gravity=.45,this.life=1,this.decay=.012+Math.random()*.018,this.size=1+Math.random()*2.5}update(){this.vx*=.985,this.vy+=this.gravity,this.x+=this.vx,this.y+=this.vy,this.life-=this.decay}draw(t){t.globalAlpha=Math.max(0,this.life),t.fillStyle=this.color,t.fillRect(this.x,this.y,this.size,this.size)}},Ii=class{constructor(t,e,o){this.cols=t,this.rows=e,this.cellSize=o,this.board=Array.from({length:e},()=>Array(t).fill(null)),this.particles=[],this.exploding=!1,this.explodeTimer=0,this.EXPLODE_DURATION=120,this.level=1,this.linesTotal=0,this.dropCounter=0,this.moveCounter=0,this._spawnPiece()}_randomPiece(){let t=so[Math.floor(Math.random()*so.length)],e=uo[t],o=Math.floor(Math.random()*e.shapes.length);return{shape:e.shapes[o],color:e.color,key:t,rotIdx:o,def:e}}_spawnPiece(){let t=this._randomPiece();this.current={...t,x:Math.floor((this.cols-t.shape[0].length)/2),y:0},this._selectTarget()}_fits(t,e,o){for(let n=0;n<t.length;n++)for(let l=0;l<t[n].length;l++){if(!t[n][l])continue;let c=e+l,r=o+n;if(c<0||c>=this.cols||r>=this.rows||r>=0&&this.board[r][c]!==null)return!1}return!0}_lock(){let{shape:t,x:e,y:o,color:n}=this.current;for(let l=0;l<t.length;l++)for(let c=0;c<t[l].length;c++){if(!t[l][c])continue;let r=o+l,a=e+c;r>=0&&r<this.rows&&a>=0&&a<this.cols&&(this.board[r][a]=n)}this._clearRows()}_clearRows(){let t=0;for(let e=this.rows-1;e>=0;e--)this.board[e].every(o=>o!==null)&&(this.board.splice(e,1),this.board.unshift(Array(this.cols).fill(null)),t++,e++);return t>0&&(this.linesTotal+=t,this.level=Math.floor(this.linesTotal/10)+1),t}_choosePlacement(){let{def:t}=this.current,e=-1/0,o=this.current.x,n=this.current.rotIdx;for(let l=0;l<t.shapes.length;l++){let c=t.shapes[l],r=c[0].length;for(let a=0;a<=this.cols-r;a++){let d=0;for(;this._fits(c,a,d+1);)d++;if(!this._fits(c,a,d))continue;let u=this._getHeuristicScore(c,a,d);u>e&&(e=u,o=a,n=l)}}return{x:o,rotIdx:n}}_getHeuristicScore(t,e,o){let n=this.board.map(u=>[...u]);for(let u=0;u<t.length;u++)for(let s=0;s<t[u].length;s++){if(!t[u][s])continue;let h=o+u,b=e+s;h>=0&&h<this.rows&&(n[h][b]="X")}let l=0;for(let u=0;u<this.rows;u++)n[u].every(s=>s!==null)&&l++;let c=Array(this.cols).fill(0),r=0;for(let u=0;u<this.cols;u++)for(let s=0;s<this.rows;s++)if(n[s][u]!==null){c[u]=this.rows-s,r+=c[u];break}let a=0;for(let u=0;u<this.cols;u++){let s=!1;for(let h=0;h<this.rows;h++)n[h][u]!==null?s=!0:s&&a++}let d=0;for(let u=0;u<this.cols-1;u++)d+=Math.abs(c[u]-c[u+1]);return r*-.51+l*.76+a*-.35+d*-.18+Math.random()*.1}_isBoardFull(){for(let t=0;t<3;t++)if(this.board[t].some(e=>e!==null))return!0;return!1}_explodeBoard(t,e){for(let o=0;o<this.rows;o++)for(let n=0;n<this.cols;n++)if(this.board[o][n]){let l=t+n*this.cellSize+this.cellSize/2,c=e+o*this.cellSize+this.cellSize/2,r=4+Math.floor(Math.random()*4);for(let a=0;a<r;a++)this.particles.push(new _i(l,c,this.board[o][n]))}}_reset(){this.board=Array.from({length:this.rows},()=>Array(this.cols).fill(null)),this.exploding=!1,this.explodeTimer=0,this.particles=[],this._spawnPiece()}_selectTarget(){let{x:t,rotIdx:e}=this._choosePlacement(),o=this.current.def;this.current.rotIdx=e,this.current.shape=o.shapes[e],this.current.targetX=t,this.current.y=0,this.current.x=Math.floor((this.cols-this.current.shape[0].length)/2)}step(t,e){if(this.exploding){this.explodeTimer++,this.particles=this.particles.filter(l=>l.life>0),this.particles.forEach(l=>l.update()),this.explodeTimer>=this.EXPLODE_DURATION&&this._reset();return}this.moveCounter++,this.moveCounter>=2&&(this.moveCounter=0,this.current.x<this.current.targetX?this._fits(this.current.shape,this.current.x+1,this.current.y)&&this.current.x++:this.current.x>this.current.targetX&&this._fits(this.current.shape,this.current.x-1,this.current.y)&&this.current.x--);let o=this.current.x===this.current.targetX,n=Math.max(4,40-(this.level-1)*3);o&&(n=1),this.dropCounter++,this.dropCounter>=n&&(this.dropCounter=0,this._fits(this.current.shape,this.current.x,this.current.y+1)?this.current.y++:(this._lock(),this._isBoardFull()?(this._explodeBoard(t,e),this.exploding=!0,this.explodeTimer=0):this._spawnPiece()))}draw(t,e,o){let n=this.cellSize,l={};for(let c=0;c<this.rows;c++)for(let r=0;r<this.cols;r++){let a=this.board[c][r];a&&(l[a]||(l[a]=[]),l[a].push({px:e+r*n,py:o+c*n,alpha:this.exploding?Math.max(0,1-this.explodeTimer/40):1}))}if(!this.exploding&&this.current){let{shape:c,x:r,y:a,color:d}=this.current;if(d){l[d]||(l[d]=[]);for(let u=0;u<c.length;u++)for(let s=0;s<c[u].length;s++)c[u][s]&&l[d].push({px:e+(r+s)*n,py:o+(a+u)*n,alpha:1})}}for(let c in l){let r=l[c];t.fillStyle=c,r.forEach(a=>{t.globalAlpha=a.alpha,t.fillRect(a.px+1,a.py+1,n-2,n-2)})}t.globalAlpha=1,t.strokeStyle="rgba(255, 255, 255, 0.35)",t.lineWidth=1.5,t.beginPath();for(let c in l)l[c].forEach(r=>{t.globalAlpha=r.alpha;let a=r.px,d=r.py;t.moveTo(a+1,d+n-2),t.lineTo(a+1,d+1),t.lineTo(a+n-2,d+1)});t.stroke(),t.strokeStyle="rgba(0, 0, 0, 0.45)",t.beginPath();for(let c in l)l[c].forEach(r=>{t.globalAlpha=r.alpha;let a=r.px,d=r.py;t.moveTo(a+1,d+n-1),t.lineTo(a+n-1,d+n-1),t.lineTo(a+n-1,d+1)});t.stroke(),t.globalAlpha=1,t.save(),this.particles.forEach(c=>c.draw(t)),t.restore(),t.globalAlpha=1}};function Rr(i,t){let e=i.ctx2d;Ke=i.width,Tt=i.height,ni=i.topInset||0,li=i.visibleHeight||Tt,co();function o(){if(e.fillStyle="rgba(8, 6, 18, 0.92)",e.fillRect(0,0,Ke,Tt),e.strokeStyle="rgba(255,255,255,0.04)",e.lineWidth=.5,Se){let n=Se.cellSize,l=Math.floor((Ke-Se.cols*n)/2),c=ni+(li-Se.rows*n);e.beginPath();for(let r=0;r<=Se.cols;r++)e.moveTo(l+r*n,c),e.lineTo(l+r*n,c+Se.rows*n);for(let r=0;r<=Se.rows;r++)e.moveTo(l,c+r*n),e.lineTo(l+Se.cols*n,c+r*n);e.stroke(),Se.step(l,c),Se.draw(e,l,c)}Ft=requestAnimationFrame(o)}Ft=requestAnimationFrame(o)}function zr(){Ft&&(cancelAnimationFrame(Ft),Ft=null)}var ie={aurora:Gi,debug:Wi,ecg:Ee,fire:Yi,geometry:Ki,gradient:Di,julia:me,lavalamp:io,mandelbrot:ii,matrix:ao,none:no,starfield:lo,tetris:fo};var si=class{constructor(t="",e="bottom",o={}){this.text=t,this.position=e,this.applyStyles(o),this.time=0,this.textX=0,this.initialized=!1,this.baseCharWidth=15,this.baseFontSize=24,this.baseVelocity=2.8,this.baseBounce=12,this.fontFamily='"Courier New", monospace',this.fontWeight="bold",this.enabled=!0}applyStyles(t={}){this.color=t.color||"#FFF",this.outline=t.outline||null,this.shadowColor=t.shadowColor||null,this.shadowBlur=t.shadowBlur||0,this.colorFn=t.colorFn||null}updateStyles(t={}){this.applyStyles(t)}setText(t){this.text=t}setPosition(t){this.position=t}render(t,e,o){if(!this.enabled)return;this.initialized||(this.textX=e,this.initialized=!0);let n=e<480?.65:e<768?.8:1,l=Math.max(12,Math.floor(this.baseFontSize*n)),c=this.baseBounce*n,r=this.baseCharWidth*n,a=this.baseVelocity*n;if(this.time+=.012,!this.text)return;let d=this.text.length*r;this.textX-=a,this.textX<-(d+e*1.1)&&(this.textX=e),t.font=`${this.fontWeight} ${l}px ${this.fontFamily}`,t.lineJoin="round",this.outline&&(t.lineWidth=4,t.strokeStyle=this.outline);let u=50*n,s=32*n,h=this.position==="bottom"?o-s:u;for(let b=0;b<this.text.length;b++){let m=this.text[b],f=this.textX+b*r;if(f>-40&&f<e+40){let g=h+Math.sin(this.time*4+b*.1)*c;t.fillStyle=this.colorFn?this.colorFn(this.time,b):this.color,this.shadowColor?(t.shadowColor=this.shadowColor==="inherit"?t.fillStyle:this.shadowColor,t.shadowBlur=this.shadowBlur):t.shadowBlur=0,this.outline&&t.strokeText(m,f,g),t.fillText(m,f,g),this.shadowColor&&(t.shadowBlur=0)}}}};var ho=`:root {
    --afx-bg-color: rgba(10, 10, 15, 0.25);
    --afx-text-color: #f0f0f0;
    --afx-accent: #ff00ff;
    --afx-viewport-height: 100dvh;
    --afx-terms-font-size: 1rem;
    --afx-dialog-h3-size: 1.4rem;
    --afx-picker-font-size: 13px;
    --afx-btn-font-size: 15px;
    --afx-body-bg: #000;
    --afx-body-color: #fff;
    --afx-text-shadow: 0 1px 3px rgba(0, 0, 0, 0.9), 0 2px 10px rgba(0, 0, 0, 0.6);
    --afx-none-bg: var(--afx-bg-color, black);
    --afx-mono-font: SFMono-Regular, Consolas, "Liberation Mono", Menlo, Monaco, monospace;
}

/* --- THEME REACTIVITY --- */
/* None effect: Reactive Light/Dark switching */
html.afx-effect-none {
    --afx-body-bg: #f5f5f5;
    --afx-body-color: #000000;
    --afx-text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
}

/* Detect Anki Night Mode / System Dark Preference */
html.afx-effect-none.nightMode,
html.afx-effect-none.night_mode,
.nightMode html.afx-effect-none,
.night_mode html.afx-effect-none,
body.nightMode .afx-effect-none,
body.night_mode .afx-effect-none {
    --afx-body-bg: #2c2c2c;
    --afx-body-color: #ffffff;
    --afx-text-shadow: 0 1px 3px rgba(0, 0, 0, 0.9), 0 2px 10px rgba(0, 0, 0, 0.6);
}

/* Hide canvases when NO effect is selected to allow CSS background to show */
html.afx-effect-none #afx-shared-gl,
html.afx-effect-none #afx-shared-2d {
    display: none !important;
}

@media (prefers-color-scheme: dark) {
    html.afx-effect-none {
        --afx-body-bg: #2c2c2c;
        --afx-body-color: #ffffff;
    }
}

/* --- Aurora Visual Polish: Low-Res Smoothing --- */
#afx-shared-2d.afx-aurora-active {
    filter: blur(8px) contrast(1.2);
}

html,
body {
    margin: 0 !important;
    padding: 0;
    width: 100% !important;
    height: var(--afx-viewport-height) !important;
    min-height: var(--afx-viewport-height) !important;
    overflow: hidden !important;
    background-color: var(--afx-body-bg, #000) !important;
    color: var(--afx-body-color, #fff) !important;
    position: relative !important;
}

.card {
    margin: 0 !important;
    padding: 0;
    width: 100% !important;
    height: var(--afx-viewport-height) !important;
    overflow: hidden !important;
    background: transparent !important;
    box-shadow: none !important;
    position: relative !important;
    color: var(--afx-body-color, #fff) !important;
}

#qa {
    position: relative !important;
    z-index: 5 !important;
    width: 100% !important;
    height: 100% !important;
    margin: 0 !important;
    padding: 0;
    padding-bottom: calc(var(--bottom-inset, 0px) + var(--afx-dock-height, 0px)) !important;
    overflow-y: auto !important;
    -webkit-overflow-scrolling: touch !important;
}

/* After agreement, elevate #qa above canvases */
html.afx-agreed #qa {
    position: relative !important;
    z-index: 10 !important;
}

body>*,
#content,
#container,
#outer,
#top-bar,
#bottom-bar {
    padding-bottom: 0 !important;
    margin-bottom: 0 !important;
}

#ankifx-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: var(--afx-viewport-height);
    z-index: 1;
    pointer-events: none;
    background-color: var(--afx-none-bg, var(--afx-bg-color, black));
    touch-action: none;
}

#ankifx-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(var(--afx-viewport-height) - var(--bottom-inset, 0px));
    z-index: 100;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.25);
    transition: background 0.5s ease, opacity 0.5s ease;
    padding: 1rem;
    box-sizing: border-box;
    color: #fff;
}

/* --- GLOBAL VISIBILITY RULES --- */
#afx-btn-back,
#afx-btn-skip,
#afx-bottom-dock {
    display: none !important;
}

/* Back/Skip only visible when music is playing */
#ankifx-overlay:not(.afx-music-playing) #afx-btn-back,
#ankifx-overlay:not(.afx-music-playing) #afx-btn-skip {
    display: none !important;
}

/* Nav buttons only visible if agreed AND music is ON */
.afx-agreed-state.afx-bgm-active #afx-btn-back,
.afx-agreed-state.afx-bgm-active #afx-btn-skip {
    display: flex !important;
}

/* --- AGREED STATE: SHOW CONTROLS --- */
.afx-agreed-state {
    background: transparent !important;
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
    pointer-events: none !important;
}

.afx-agreed-state .afx-dialog {
    display: none !important;
}

/* Reveal corner controls only after agreement */
.afx-agreed-state #afx-bottom-dock {
    display: flex !important;
}

/* Top dock container structure */
#afx-top-dock {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    display: none !important;
    justify-content: space-between;
    align-items: center;
    padding: 20px 20px 0 20px;
    pointer-events: none;
    z-index: 10001;
    box-sizing: border-box;
}

.afx-agreed-state #afx-top-dock {
    display: flex !important;
}

.afx-top-group-left,
.afx-top-group-right {
    display: flex;
    align-items: center;
    gap: 12px;
    pointer-events: auto;
}

#afx-btn-back,
#afx-btn-skip {
    pointer-events: auto !important;
    position: static !important;
}

#afx-bottom-dock {
    position: fixed;
    left: 0;
    right: 0;
    bottom: var(--bottom-inset, 0px);
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 0 20px 10px 20px;
    pointer-events: none;
    z-index: 10001;
    box-sizing: border-box;
}

.afx-control-group-left,
.afx-control-group-right {
    display: flex;
    flex-direction: column;
    gap: 8px;
    pointer-events: auto;
}

.afx-control-group-left {
    align-items: flex-start;
}

.afx-control-group-right {
    align-items: flex-end;
}

#afx-effect-controls-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: flex-end;
}

/* Base control row styles */
#afx-effect-selector-container,
.afx-control-row {
    background: rgba(0, 0, 0, 0.7);
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    overflow: hidden;
    height: 32px !important;
    box-sizing: border-box !important;
    display: flex;
    align-items: center;
    padding: 0 10px !important;
}

#afx-effect-selector-container,
.afx-control-group-right .afx-control-row {
    width: 260px !important;
    max-width: calc(100vw - 40px) !important;
}

/* Unified Control Components */
.afx-action-btn {
    background: transparent;
    color: #fff;
    border: none;
    width: 100%;
    height: 100%;
    cursor: pointer;
    text-transform: uppercase;
    font-family: var(--afx-mono-font) !important;
    font-size: var(--afx-picker-font-size) !important;
    font-weight: bold !important;
    padding: 0 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.afx-select {
    background: transparent;
    color: white;
    border: none;
    padding: 0 !important;
    margin: 0 !important;
    font-family: var(--afx-mono-font);
    font-weight: bold;
    cursor: pointer;
    outline: none;
    appearance: auto;
    width: 100%;
    height: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.afx-select option {
    background: #1a1a1a !important;
    color: #ffffff !important;
    padding: 12px !important;
    font-family: var(--afx-mono-font) !important;
}

.afx-range-slider {
    flex: 1;
    accent-color: #00ffff;
    cursor: pointer;
    margin: 0 10px;
}

.afx-slider-label {
    font-size: 10px !important;
    color: #00ffff;
    font-family: var(--afx-mono-font);
    white-space: nowrap;
}

.afx-slider-val-text {
    font-size: 10px !important;
    color: #00ffff;
    font-family: var(--afx-mono-font);
    text-align: right;
}

@media (max-width: 768px) {
    #afx-top-dock {
        padding: calc(10px + env(safe-area-inset-top)) calc(10px + env(safe-area-inset-right)) 0 calc(10px + env(safe-area-inset-left)) !important;
    }
}

.afx-dialog {
    background: rgba(25, 25, 30, 0.96);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 24px;
    padding: 0;
    max-width: 850px;
    width: 92%;
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.8);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    position: relative;
    height: 70dvh;
    max-height: 85%;
    overflow: hidden !important;
    pointer-events: auto !important;
}

.afx-terms {
    font-family: var(--afx-mono-font);
    background: rgba(0, 0, 0, 0.4);
    padding: 1.5rem;
    border-radius: 24px 24px 0 0;
    margin-bottom: 0;
    width: 100%;
    flex: 1;
    overflow-y: auto;
    line-height: 1.8;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    font-size: var(--afx-terms-font-size);
    color: #ccc;
    box-sizing: border-box;
}

.afx-terms h3 {
    font-size: var(--afx-dialog-h3-size);
    margin: 0 0 15px 0;
}

.afx-action-row {
    padding: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
}

.afx-btn,
.afx-playback-btn,
.afx-select,
.afx-sub-picker,
.afx-control-row {
    font-family: var(--afx-mono-font) !important;
    font-size: var(--afx-picker-font-size) !important;
    font-weight: bold !important;
}

.afx-btn {
    padding: 10px 30px;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: var(--afx-btn-font-size) !important;
}

.afx-btn:disabled {
    background: #444;
    color: #888;
    cursor: not-allowed;
}

.afx-btn:not(:disabled) {
    background: #28a745;
    color: white;
    box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
}

.afx-btn:not(:disabled):hover {
    transform: scale(1.05);
    background: #2fb34d;
}

.afx-control-row {
    width: fit-content;
    height: 28px;
    box-sizing: border-box;
    padding: 0 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    color: white;
}

.afx-playback-btn {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.2s;
}

.afx-toggle {
    position: relative;
    width: 28px;
    height: 15px;
}

.afx-toggle input {
    opacity: 0;
    width: 0;
    height: 0;
}

.afx-slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #444;
    border-radius: 20px;
    transition: 0.4s;
}

.afx-slider:before {
    position: absolute;
    content: "";
    height: 11px;
    width: 11px;
    left: 2px;
    bottom: 2px;
    background: white;
    border-radius: 50%;
    transition: 0.4s;
}

input:checked+.afx-slider {
    background: #28a745;
}

input:checked+.afx-slider:before {
    transform: translateX(13px);
}

/* Hide card content container during active DEBUG effect to avoid jumble */
html.afx-effect-debug #qa {
    display: none !important;
}

/* --- Native Anki Card Elements (Flag & Mark) --- */
#_flag,
#_mark {
    position: static !important;
    display: inline-flex !important;
    align-items: center;
    justify-content: center;
    pointer-events: auto !important;
    cursor: pointer !important;
    font-size: 24px !important;
    line-height: 1 !important;
    transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease !important;
    user-select: none !important;
    -webkit-user-select: none !important;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5) !important;
    margin: 0 !important;
    padding: 0 !important;
}

/* Explicitly support hidden attribute and unflagged style to override display: inline-flex */
#_flag[hidden],
#_mark[hidden],
#_flag[style*="var(--flag-0)"] {
    display: none !important;
}

#_flag:hover,
#_mark:hover {
    transform: scale(1.25) !important;
}

/* Satisfying interactive click/toggle shrink feedback */
#_flag:active,
#_mark:active {
    transform: scale(0.8) !important;
    opacity: 0.6 !important;
}

/* Satisfying pop-in activation transition when shown */
#_flag:not([hidden]):not([style*="var(--flag-0)"]),
#_mark:not([hidden]) {
    animation: afx-pop-in 0.28s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes afx-pop-in {
    0% {
        transform: scale(0);
        opacity: 0;
    }
    75% {
        transform: scale(1.2);
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}

/* ECG Status Panel inside Top Right Group */
#afx-ecg-panel {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    color: #ff1a1a;
    font-family: var(--afx-mono-font);
    font-weight: 900 !important;
    line-height: 1.2;
    text-shadow: 0 0 8px rgba(255, 26, 26, 0.6), 0 2px 4px rgba(0, 0, 0, 0.9) !important;
    transition: opacity 0.2s ease;
}

#afx-ecg-panel .afx-ecg-bpm {
    font-size: 1.35rem;
    font-weight: 900 !important;
}

#afx-ecg-panel .afx-ecg-rhythm {
    font-size: 0.9rem;
    font-weight: 900 !important;
    opacity: 0.95;
    white-space: nowrap;
}

@media (max-width: 480px) {
    #afx-ecg-panel .afx-ecg-bpm {
        font-size: 1.1rem;
    }
    #afx-ecg-panel .afx-ecg-rhythm {
        font-size: 0.8rem;
    }
}

/* Shared engine canvases (no inline layout CSS in engine.js) */
.afx-shared-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

.afx-shared-marquee-canvas {
    z-index: 5;
}

#afx-global-fps.afx-global-fps {
    color: #0f0;
    font-family: monospace;
    font-size: 14px;
    font-weight: bold;
    text-shadow: 1px 1px 2px #000;
    pointer-events: none;
}

.afx-deck-author {
    margin: -10px 0 15px 0;
    opacity: 0.7;
    font-size: 0.9rem;
}

.afx-effect-selector-container.afx-control-row {
    padding: 0;
}

/* --- BGM status color reactivity (no inline styles) --- */
#afx-bgm-status {
    color: #fff;
    transition: color 0.2s ease;
}

.afx-bgm-active #afx-bgm-status {
    color: #ff6b6b;
}

/* --- DEBUG EFFECT DOM PANEL AND METRICS --- */
html.afx-effect-debug #ankifx-background {
    pointer-events: auto !important;
    touch-action: auto !important;
}

.afx-debug-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    box-sizing: border-box;
    overflow-y: auto !important;
    padding: 70px 20px 0 20px;
    display: flex;
    flex-direction: column;
}

html.afx-effect-debug .afx-debug-container {
    pointer-events: auto !important;
    touch-action: auto !important;
    -webkit-overflow-scrolling: touch !important;
}

.afx-debug-container,
.afx-debug-container * {
    user-select: text !important;
    -webkit-user-select: text !important;
}

.afx-debug-columns {
    display: flex;
    width: 100%;
    gap: 20px;
}

.afx-debug-left-col,
.afx-debug-right-col {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.afx-debug-panel {
    background: rgba(10, 10, 15, 0.88);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.7);
    pointer-events: auto;
    font-family: var(--afx-mono-font);
}

.afx-debug-panel h3 {
    font-size: 13px;
    font-weight: bold;
    margin: 0 0 10px 0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
    padding-bottom: 4px;
    color: #00ff00; /* Unified header font color */
    text-align: center;
}

.afx-debug-content {
    margin: 0;
    padding: 0;
    font-size: 12px;
    line-height: 1.5;
    color: #ffffff;
    white-space: pre-wrap;
    word-break: break-all;
    text-align: left;
}

.afx-debug-panel ::selection {
    background: rgba(0, 255, 255, 0.3);
    color: #ffffff;
}

/* Corner markers */
.afx-debug-corner {
    position: absolute;
    font-family: var(--afx-mono-font);
    font-size: 11px;
    font-weight: bold;
    color: #ff00ff;
    text-shadow: 1px 1px 2px #000;
    pointer-events: none;
    z-index: 5;
}

.afx-debug-corner.top-left { top: 5px; left: 5px; }
.afx-debug-corner.top-right { top: 5px; right: 5px; }
.afx-debug-corner.bottom-left { bottom: 5px; left: 5px; }
.afx-debug-corner.bottom-right { bottom: 5px; right: 5px; }

/* Visual Layout Boundary Lines */
.afx-debug-line {
    position: absolute;
    left: 0;
    width: 100%;
    height: 0;
    z-index: 5;
    pointer-events: none;
    box-sizing: border-box;
}

.afx-debug-line.visible-bottom {
    border-top: 3px dashed #00ffff;
}

.afx-debug-line-label {
    position: absolute;
    font-family: var(--afx-mono-font);
    font-size: 13px;
    font-weight: bold;
    transform: translateX(-50%);
    left: 50%;
    white-space: nowrap;
    text-shadow: 1px 1px 2px #000;
}

.afx-debug-line.visible-bottom .afx-debug-line-label {
    color: #00ffff;
    bottom: 8px;
}

@media (max-width: 768px), (orientation: portrait) {
    .afx-debug-columns {
        flex-direction: column;
        gap: 16px;
    }
}

/* Color overrides removed for unified headers styling */

.afx-debug-panel.console-logs {
    margin-top: 16px;
}`;function po(){return/iPad|iPhone|iPod/.test(navigator.userAgent)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1}function Li(){return Math.min(window.devicePixelRatio||1,1.5)}function ci(){return Math.min(window.devicePixelRatio||1,2)}function fi(i,t){let e=Li();return i==="mandelbrot"||i==="julia"?e:t}function De(){let i=getComputedStyle(document.documentElement);return{ioHeader:parseInt(i.getPropertyValue("--io-header"))||0,topInset:parseInt(i.getPropertyValue("--top-inset"))||0,bottomInset:parseInt(i.getPropertyValue("--bottom-inset"))||0}}function at(){return localStorage.getItem("ankifx_marquee_enabled")!=="false"}function Mt(){return(window.innerWidth||document.documentElement.clientWidth||800)<480}var Ur={deckTitle:"AnkiFX Deck",deckAuthor:"Anonymous",termsText:null,sources:[],marquee:"ANKIFX ENGINE INITIALIZED ...",defaultEffect:"geometry",debug:!1,countdown:30,marqueePosition:"top"};function mo(i={}){let t={...Ur,...window.AnkiFX_Config||{},...i};Array.isArray(t.sources)||(t.sources=[]);let e=parseInt(t.countdown,10);return t.countdown=isNaN(e)?30:Math.max(0,e),t.isConfigFileError=t.termsText!==void 0&&t.termsText!==null&&(typeof t.termsText!="string"||typeof t.termsText=="string"&&t.termsText.trim()===""||t.termsText==="No terms provided."),t}function go(i){let t=window.AnkiFX_Config?.defaultEffect,e;return t?(e=t,localStorage.setItem("ankifx_preferred_effect",e)):e=localStorage.getItem("ankifx_preferred_effect")||i.defaultEffect||"geometry",ie[e]||(console.warn(`[AnkiFX] Unknown effect "${e}" \u2014 falling back to "${i.defaultEffect||"geometry"}".`),e=i.defaultEffect||"geometry",ie[e]||(e=Object.keys(ie)[0]||"geometry"),localStorage.setItem("ankifx_preferred_effect",e)),e}function bo(i,t){let e=document.getElementById("ankifx-overlay");if(!e||!e.classList.contains("afx-agreed-state"))return!1;i.sharedGL||(i.sharedGL=document.getElementById("afx-shared-gl")),i.shared2D||(i.shared2D=document.getElementById("afx-shared-2d")),i.sharedMarquee||(i.sharedMarquee=document.getElementById("afx-shared-marquee")),i.sharedGL&&!i.glContext&&(i.glContext=i.sharedGL.getContext("webgl",{alpha:!1,antialias:!1})),i.shared2D&&!i.ctx2D&&(i.ctx2D=i.shared2D.getContext("2d")),i.sharedMarquee&&!i.ctxMarquee&&(i.ctxMarquee=i.sharedMarquee.getContext("2d"));let o=document.getElementById("ankifx-background");if(o){let l=o.getBoundingClientRect();i.width=l.width;let c=De();i.height=document.documentElement.clientHeight+c.ioHeader,i.dpr=ci()}if(!i.currentEffectId){let l=Array.from(document.documentElement.classList).find(c=>c.startsWith("afx-effect-"));l&&(i.currentEffectId=l.replace("afx-effect-",""))}i.defaultMarqueeText=t.marquee,i.marquee&&(i.marquee.setText(t.marquee),i.marquee.setPosition(t.marqueePosition));let n=document.getElementById("afx-deck-title");return n&&(n.textContent=t.deckTitle),!0}function At(i){let t=document.getElementById("afx-effect-controls-container");t&&(t.innerHTML="",!(!i||!i.controls||i.controls.length===0)&&i.controls.forEach(e=>{let o=document.createElement("div");if(o.className="afx-control-row",o.id=`afx-control-container-${e.id}`,e.type==="toggle")o.innerHTML=`
                    <label class="afx-toggle">
                        <input type="checkbox" id="afx-control-${e.id}" ${e.value?"checked":""}>
                        <span class="afx-slider"></span>
                    </label>
                    <span id="afx-control-label-${e.id}">${e.label}</span>
                `,o.querySelector("input").addEventListener("change",l=>{e.onChange&&e.onChange(l.target.checked)});else if(e.type==="slider"){o.classList.add("afx-slider-row");let n=e.step||1,l=n.toString().includes(".")?n.toString().split(".")[1].length:0;o.innerHTML=`
                    <span class="afx-slider-label">${e.label}:</span>
                    <input type="range" id="afx-control-${e.id}" class="afx-range-slider" min="${e.min}" max="${e.max}" step="${n}" value="${e.value}">
                    <span id="afx-control-val-${e.id}" class="afx-slider-val-text">${e.value.toFixed(l)}</span>
                `;let c=o.querySelector("input"),r=o.querySelector(".afx-slider-val-text");c.addEventListener("input",a=>{let d=parseFloat(a.target.value);r.innerText=d.toFixed(l),e.onChange&&e.onChange(d)})}else if(e.type==="button")o.style.padding="0",o.innerHTML=`
                    <button id="afx-control-${e.id}" class="afx-action-btn">
                        ${e.label}
                    </button>
                `,o.querySelector("button").addEventListener("click",l=>{l.stopPropagation(),e.onClick&&e.onClick()});else if(e.type==="select"){o.style.padding="0";let n=(e.options||[]).map(c=>{let r=typeof c=="object"?c.value:c,a=typeof c=="object"?c.text:c,d=r==e.value?"selected":"";return`<option value="${r}" ${d}>${a}</option>`}).join("");o.innerHTML=`
                    <select id="afx-control-${e.id}" class="afx-select">
                        ${n}
                    </select>
                `,o.querySelector("select").addEventListener("change",c=>{e.onChange&&e.onChange(c.target.value)})}t.appendChild(o)}))}function vo(i,t){let e=document.getElementById(`afx-control-${i}`);e&&(e.type==="checkbox"?e.checked=!!t:e.value=t);let o=document.getElementById(`afx-control-val-${i}`);if(o){let n=e?e.step:"",l=n&&n.includes(".")?n.split(".")[1].length:0;o.innerText=typeof t=="number"?t.toFixed(l||(t%1===0?0:4)):t}}function Dt(i,t,e,o,n){n==="debug"?e.classList.add("afx-debug-active"):e.classList.remove("afx-debug-active");let l=document.documentElement;Array.from(l.classList).forEach(r=>{r.startsWith("afx-effect-")&&l.classList.remove(r)}),l.classList.add(`afx-effect-${n}`),i.currentEffectId=n;let c=ie[n];if(c){let r=De(),a=fi(n,i.dpr),d={gl:i.glContext,ctx2d:i.ctx2D,canvasGL:i.sharedGL,canvas2D:i.shared2D,width:i.width,height:i.height,dpr:a,topInset:r.ioHeader,visibleWidth:i.width,visibleHeight:i.height-r.ioHeader,visibleBounds:{top:r.ioHeader,bottom:i.height}};i.marquee&&i.marquee.updateStyles(c.marqueeFont||{}),c.run(d,t),At(c),i.marquee&&(i.marquee.enabled=at())}else i.marquee&&i.marquee.updateStyles({}),At(null)}function Ne(i){let t=document.getElementById("ankifx-background");if(!t||!i.sharedGL||!i.shared2D||!i.sharedMarquee)return;let o=De().ioHeader;document.documentElement.style.setProperty("--afx-viewport-height",`calc(100dvh + ${o}px)`);let n=t.getBoundingClientRect();i.width=n.width,i.height=document.documentElement.clientHeight+o,i.dpr=ci();let l=Li();if(i.sharedGL.width=i.width*l,i.sharedGL.height=i.height*l,i.sharedGL.style.width=i.width+"px",i.sharedGL.style.height=i.height+"px",i.shared2D.width=i.width*i.dpr,i.shared2D.height=i.height*i.dpr,i.shared2D.style.width=i.width+"px",i.shared2D.style.height=i.height+"px",i.sharedMarquee.width=i.width*i.dpr,i.sharedMarquee.height=i.height*i.dpr,i.sharedMarquee.style.width=i.width+"px",i.sharedMarquee.style.height=i.height+"px",i.glContext&&i.glContext.viewport(0,0,i.sharedGL.width,i.sharedGL.height),i.ctx2D&&(i.ctx2D.setTransform(1,0,0,1,0,0),i.ctx2D.scale(i.dpr,i.dpr)),i.ctxMarquee&&(i.ctxMarquee.setTransform(1,0,0,1,0,0),i.ctxMarquee.scale(i.dpr,i.dpr)),i.currentEffectId&&ie[i.currentEffectId]?.onResize){let c=fi(i.currentEffectId,i.dpr);ie[i.currentEffectId].onResize(i.width,i.height,c)}}function xo(i){let e=De().ioHeader,o=window.innerHeight,n=document.documentElement.clientHeight,l=setInterval(()=>{let c=De(),r=window.innerHeight,a=document.documentElement.clientHeight;(c.ioHeader!==e||r!==o||a!==n)&&(e=c.ioHeader,o=r,n=a,Ne(i))},50);setTimeout(()=>clearInterval(l),2e3)}function yo(i){i._layoutHandler&&(window.removeEventListener("orientationchange",i._layoutHandler),window.removeEventListener("resize",i._layoutHandler)),i._resizeTimeout&&clearTimeout(i._resizeTimeout),i._resizeInterval&&clearInterval(i._resizeInterval),i._layoutHandler=()=>{i._resizeTimeout&&clearTimeout(i._resizeTimeout),i._resizeInterval&&clearInterval(i._resizeInterval),Ne(i),i._resizeTimeout=setTimeout(()=>{Ne(i)},100);let t=0,e=i.width,o=i.height;i._resizeInterval=setInterval(()=>{if(t+=100,t>=1500){clearInterval(i._resizeInterval);return}let n=De(),l=document.getElementById("ankifx-background"),c=l?l.getBoundingClientRect():null,r=c?c.width:window.innerWidth,a=document.documentElement.clientHeight+n.ioHeader;(r!==e||a!==o)&&(e=r,o=a,Ne(i))},100)},window.addEventListener("orientationchange",i._layoutHandler),window.addEventListener("resize",i._layoutHandler)}function wo(i){let t=document.getElementById("afx-bottom-dock");t&&(i.dockObserver=new ResizeObserver(()=>{let e=t.getBoundingClientRect();document.documentElement.style.setProperty("--afx-dock-height",`${e.height}px`)}),i.dockObserver.observe(t))}function ko(i){i.observer||(i.observer=new MutationObserver(()=>{setTimeout(()=>{let t=document.getElementById("qa");(t?!!t.querySelector(".ankifx-card"):!1)?ui():typeof i=="object"&&window.AnkiFX&&window.AnkiFX.destroy()},20)}),i.observer.observe(document.documentElement,{childList:!0,subtree:!0}))}function ui(){let i=document.getElementById("_flag"),t=document.getElementById("_mark"),e=document.getElementById("afx-top-group-left"),o=document.getElementById("afx-top-group-right"),n=document.getElementById("afx-btn-skip");if(t&&e){let l=document.getElementById("afx-global-fps");l&&t.nextSibling!==l?e.insertBefore(t,l):!l&&t.parentElement!==e&&e.appendChild(t)}i&&o&&i.parentElement!==o&&o.insertBefore(i,n)}function Ri(i){if(i.marqueeInterval)return;let t=0,e=0,o=n=>{if(n===void 0&&(n=performance.now()),t||(t=n),e++,n-t>=1e3){let l=document.getElementById("afx-global-fps");l&&(l.textContent=`FPS: ${e}`),e=0,t=n}if(i.marquee&&i.ctxMarquee){if(i.ctxMarquee.clearRect(0,0,i.width,i.height),i.currentEffectId&&ie[i.currentEffectId]?.drawOverlay)try{ie[i.currentEffectId].drawOverlay(i.ctxMarquee,i.width,i.height,n)}catch(l){console.error("[AnkiFX] drawOverlay error: "+l.message)}i.marquee.render(i.ctxMarquee,i.width,i.height)}i.marqueeInterval=requestAnimationFrame(o)};i.marqueeInterval=requestAnimationFrame(o)}function Eo(i,t,e,o){let n=t.countdown;if((t.debug||t.isConfigFileError)&&(n=0),n>0){o.textContent=`( ${n} )`;let l=setInterval(()=>{n--,o.textContent=`( ${n} )`,n<=0&&(clearInterval(l),o.textContent="I AGREE",o.disabled=!1)},1e3)}else o.textContent="I AGREE",o.disabled=!1;o.addEventListener("click",l=>{l.stopPropagation(),o.disabled||window.AnkiFX.agree(e,t.deckTitle)})}window.neoart=Object.create(null);function zi(i,t){var e=Object.create(null,{endian:{value:1,writable:!0},length:{value:0,writable:!0},index:{value:0,writable:!0},buffer:{value:null,writable:!0},view:{value:null,writable:!0},bytesAvailable:{get:function(){return this.length-this.index}},position:{get:function(){return this.index},set:function(o){o<0?o=0:o>this.length&&(o=this.length),this.index=o}},clear:{value:function(){this.buffer=new ArrayBuffer,this.view=null,this.index=this.length=0}},readAt:{value:function(o){return this.view.getUint8(o)}},readByte:{value:function(){return this.view.getInt8(this.index++)}},readShort:{value:function(){var o=this.view.getInt16(this.index,this.endian);return this.index+=2,o}},readInt:{value:function(){var o=this.view.getInt32(this.index,this.endian);return this.index+=4,o}},readUbyte:{value:function(){return this.view.getUint8(this.index++)}},readUshort:{value:function(){var o=this.view.getUint16(this.index,this.endian);return this.index+=2,o}},readUint:{value:function(){var o=this.view.getUint32(this.index,this.endian);return this.index+=4,o}},readBytes:{value:function(o,n,l){var c=o.view,r=this.index,a=this.view;for((l+=r)>this.length&&(l=this.length);r<l;++r)c.setUint8(n++,a.getUint8(r));this.index=r}},readString:{value:function(o){var n=this.index,l=this.view,c="";for((o+=n)>this.length&&(o=this.length);n<o;++n)c+=String.fromCharCode(l.getUint8(n));return this.index=o,c}},writeAt:{value:function(o,n){this.view.setUint8(o,n)}},writeByte:{value:function(o){this.view.setInt8(this.index++,o)}},writeShort:{value:function(o){this.view.setInt16(this.index,o),this.index+=2}},writeInt:{value:function(o){this.view.setInt32(this.index,o),this.index+=4}}});return e.buffer=i,e.view=new DataView(i),e.length=i.byteLength,Object.seal(e)}function So(){return Object.create(null,{l:{value:0,writable:!0},r:{value:0,writable:!0},next:{value:null,writable:!0}})}function di(){return Object.create(null,{player:{value:null,writable:!0},channels:{value:[],writable:!0},buffer:{value:[],writable:!0},samplesTick:{value:0,writable:!0},samplesLeft:{value:0,writable:!0},remains:{value:0,writable:!0},completed:{value:0,writable:!0},bufferSize:{get:function(){return this.buffer.length},set:function(i){var t,e=this.buffer.length||0;if(!(i===e||i<512)&&(this.buffer.length=i,i>e))for(this.buffer[e]=So(),t=++e;t<i;++t)this.buffer[t]=this.buffer[t-1].next=So()}},complete:{get:function(){return this.completed},set:function(i){this.completed=i^this.player.loopSong}},reset:{value:function(){var i=this.channels[0],t=this.buffer[0];for(this.samplesLeft=0,this.remains=0,this.completed=0;i;)i.initialize(),i=i.next;for(;t;)t.l=t.r=0,t=t.next}},restore:{configurable:!0,value:function(){}}})}function Br(){var i=null;return typeof AudioContext<"u"?i=new AudioContext:alert("Web Audio API does not appear to be supported. Use Chrome, Safari or Firefox"),i}function hi(){var i=Object.create(null,{context:{value:null,writable:!0},node:{value:null,writable:!0},analyser:{value:null,writable:!0},analyse:{value:0,writable:!0},endian:{value:0,writable:!0},sampleRate:{value:0,writable:!0},playSong:{value:0,writable:!0},lastSong:{value:0,writable:!0},version:{value:0,writable:!0},title:{value:"",writable:!0},channels:{value:0,writable:!0},loopSong:{value:0,writable:!0},speed:{value:0,writable:!0},tempo:{value:0,writable:!0},mixer:{value:null,writable:!0},tick:{value:0,writable:!0},paused:{value:0,writable:!0},callback:{value:null,writable:!0},quality:{configurable:!0,set:function(t){this.callback=t?this.mixer.accurate.bind(this.mixer):this.mixer.fast.bind(this.mixer)}},toggle:{value:function(t){this.mixer.channels[t].mute^=1}},setup:{configurable:!0,value:function(){}},load:{value:function(t){return this.version=0,this.playSong=0,this.lastSong=0,this.mixer.restore(),t.view||(t=zi(t)),t.position=0,t.readUint()===67324752&&window.neoart.Unzip,t.endian=this.endian,t.position=0,this.loader(t),this.version&&this.setup(),this.version}},play:{value:function(){var t,e;this.version&&(this.paused?this.paused=0:(this.initialize(),typeof this.context.createJavaScriptNode=="function"?this.node=this.context.createJavaScriptNode(this.mixer.bufferSize):this.node=this.context.createScriptProcessor(this.mixer.bufferSize),this.analyser=this.context.createAnalyser(),this.node.connect(this.analyser),this.node.onaudioprocess=this.callback),this.analyse&&window.neoart.Flectrum?(e=window.neoart.analyserNode=this.context.createAnalyser(),this.node.connect(e),e.connect(this.context.destination)):this.node.connect(this.context.destination),t=document.createEvent("Event"),t.initEvent("flodPlay",!0,!1),document.dispatchEvent(t))}},pause:{value:function(){if(this.node){this.node.disconnect(),this.paused=1;var t=document.createEvent("Event");t.initEvent("flodPause",!0,!1),document.dispatchEvent(t)}}},stop:{value:function(){if(this.node){this.node.disconnect(),this.node.onaudioprocess=this.node=null,this.paused=0,this.restore&&this.restore();var t=document.createEvent("Event");t.initEvent("flodStop",!0,!1),document.dispatchEvent(t)}}},reset:{value:function(){this.tick=0,this.mixer.initialize(),this.mixer.samplesTick=this.sampleRate*2.5/this.tempo>>0}}});return window.neoart.audioContext||(window.neoart.audioContext=Br()),i.context=window.neoart.audioContext,i.sampleRate=i.context.sampleRate,i}function pi(i){var t=Object.create(null,{next:{value:null,writable:!0},mute:{value:0,writable:!0},panning:{value:0,writable:!0},delay:{value:0,writable:!0},pointer:{value:0,writable:!0},length:{value:0,writable:!0},audena:{value:0,writable:!0},audcnt:{value:0,writable:!0},audloc:{value:0,writable:!0},audper:{value:0,writable:!0},audvol:{value:0,writable:!0},timer:{value:0,writable:!0},level:{value:0,writable:!0},ldata:{value:0,writable:!0},rdata:{value:0,writable:!0},enabled:{get:function(){return this.audena},set:function(e){e!==this.audena&&(this.audena=e,this.audloc=this.pointer,this.audcnt=this.pointer+this.length,this.timer=1,e&&(this.delay+=2))}},period:{set:function(e){e<0?e=0:e>65535&&(e=65535),this.audper=e}},volume:{set:function(e){e<0?e=0:e>64&&(e=64),this.audvol=e}},resetData:{value:function(){this.ldata=0,this.rdata=0}},initialize:{value:function(){this.audena=0,this.audcnt=0,this.audloc=0,this.audper=50,this.audvol=0,this.timer=0,this.ldata=0,this.rdata=0,this.delay=0,this.pointer=0,this.length=0}}});return t.panning=t.level=(++i&2)===0?-1:1,Object.seal(t)}function qr(){return Object.create(null,{active:{value:0,writable:!0},forced:{value:-1,writable:!0},l0:{value:0,writable:!0},l1:{value:0,writable:!0},l2:{value:0,writable:!0},l3:{value:0,writable:!0},l4:{value:0,writable:!0},r0:{value:0,writable:!0},r1:{value:0,writable:!0},r2:{value:0,writable:!0},r3:{value:0,writable:!0},r4:{value:0,writable:!0},initialize:{value:function(){this.l0=this.l1=this.l2=this.l3=this.l4=0,this.r0=this.r1=this.r2=this.r3=this.r4=0}},process:{value:function(i,t){var e=.52133458435322,o=.4860348337215757,n=.9314955486749749,l=1-o;i===0&&(this.l0=o*t.l+l*this.l0,this.r0=o*t.r+l*this.r0,l=1-n,t.l=this.l1=n*this.l0+l*this.l1,t.r=this.r1=n*this.r0+l*this.r1),(this.active|this.forced)>0&&(l=1-e,this.l2=e*t.l+l*this.l2,this.r2=e*t.r+l*this.r2,this.l3=e*this.l2+l*this.l3,this.r3=e*this.r2+l*this.r3,t.l=this.l4=e*this.l3+l*this.l4,t.r=this.r4=e*this.r3+l*this.r4),t.l>1?t.l=1:t.l<-1&&(t.l=-1),t.r>1?t.r=1:t.r<-1&&(t.r=-1)}}})}function mi(){return Object.create(null,{note:{value:0,writable:!0},sample:{value:0,writable:!0},effect:{value:0,writable:!0},param:{value:0,writable:!0}})}function _t(){return Object.create(null,{name:{value:"",writable:!0},length:{value:0,writable:!0},loop:{value:0,writable:!0},repeat:{value:0,writable:!0},volume:{value:0,writable:!0},pointer:{value:0,writable:!0},loopPtr:{value:0,writable:!0}})}function Oi(){var i=di();return Object.defineProperties(i,{filter:{value:null,writable:!0},model:{value:1,writable:!0},memory:{value:[],writable:!0},loopPtr:{value:0,writable:!0},loopLen:{value:4,writable:!0},clock:{value:0,writable:!0},master:{value:0,writable:!0},ready:{value:0,writable:!0},volume:{set:function(t){t>0?(t>64&&(t=64),this.master=t/64*.00390625):this.master=0}},initialize:{value:function(){var t=this.memory.length,e=t+this.loopLen;if(this.reset(),this.filter.initialize(),!this.ready)for(this.ready=1,this.loopPtr=t;t<e;++t)this.memory[t]=0}},restore:{value:function(){this.ready=0,this.memory.length=0}},store:{value:function(t,e,o){var n,l,c=t.position,r=this.memory.length,a;for(o&&(t.position=o),a=t.position+e,a>=t.length&&(n=a-t.length,e=t.length-t.position),l=r,e+=r;l<e;++l)this.memory[l]=t.readByte();for(e+=n;l<e;++l)this.memory[l]=0;return o&&(t.position=c),r}},fast:{value:function(t){var e,o,n,l=this.memory,c,r=0,a,d=0,u,s,h,b=this.bufferSize,m,f,g;if(this.completed){if(!this.remains){this.player.stop();return}b=this.remains}for(;r<b;){for(this.samplesLeft||(this.player.process(),this.samplesLeft=this.samplesTick,this.completed&&(b=r+this.samplesTick,b>this.bufferSize&&(this.remains=b-this.bufferSize,b=this.bufferSize))),f=this.samplesLeft,r+f>=b&&(f=b-r),a=d+f,e=this.channels[0];e;){if(h=this.buffer[d],e.audena&&e.audper>60)for(m=e.audper/this.clock,g=e.audvol*this.master,c=g*(1-e.level),s=g*(1+e.level),o=d;o<a;++o)e.delay?e.delay--:--e.timer<1&&(e.mute||(g=l[e.audloc]*.0078125,e.ldata=g*c,e.rdata=g*s),e.audloc++,e.timer+=m,e.audloc>=e.audcnt&&(e.audloc=e.pointer,e.audcnt=e.pointer+e.length)),h.l+=e.ldata,h.r+=e.rdata,h=h.next;else for(o=d;o<a;++o)h.l+=e.ldata,h.r+=e.rdata,h=h.next;e=e.next}d=a,r+=f,this.samplesLeft-=f}for(g=this.model,l=this.filter,h=this.buffer[0],n=t.outputBuffer.getChannelData(0),u=t.outputBuffer.getChannelData(1),o=0;o<b;++o)l.process(g,h),n[o]=h.l,u[o]=h.r,h.l=h.r=0,h=h.next}}}),i.channels[0]=pi(0),i.channels[0].next=i.channels[1]=pi(1),i.channels[1].next=i.channels[2]=pi(2),i.channels[2].next=i.channels[3]=pi(3),i.bufferSize=8192,i.filter=qr(),i.master=.00390625,Object.seal(i)}function gi(i){var t=hi();return Object.defineProperties(t,{quality:{set:function(e){this.callback=this.mixer.fast.bind(this.mixer)}},stereo:{set:function(e){var o=this.mixer.channels[0];for(e<0?e=0:e>1&&(e=1);o;)o.level=e*o.panning,o=o.next}},volume:{set:function(e){e<0?e=0:e>1&&(e=1),this.mixer.master=e*.00390625}},frequency:{value:function(e){e?(this.mixer.clock=3579545/this.sampleRate,this.mixer.samplesTick=735):(this.mixer.clock=3546895/this.sampleRate,this.mixer.samplesTick=882)}}}),t.mixer=i||Oi(),t.mixer.player=t,t.frequency(0),t.channels=4,t.endian=0,t.quality=0,t.speed=6,t.tempo=125,t}function Po(){return Object.create(null,{next:{value:null,writable:!0},mute:{value:0,writable:!0},enabled:{value:0,writable:!0},sample:{value:null,writable:!0},length:{value:0,writable:!0},index:{value:0,writable:!0},pointer:{value:0,writable:!0},delta:{value:0,writable:!0},fraction:{value:0,writable:!0},speed:{value:0,writable:!0},dir:{value:0,writable:!0},oldSample:{value:null,writable:!0},oldLength:{value:0,writable:!0},oldPointer:{value:0,writable:!0},oldFraction:{value:0,writable:!0},oldSpeed:{value:0,writable:!0},oldDir:{value:0,writable:!0},volume:{value:0,writable:!0},lvol:{value:0,writable:!0},rvol:{value:0,writable:!0},panning:{value:128,writable:!0},lpan:{value:.5,writable:!0},rpan:{value:.5,writable:!0},ldata:{value:0,writable:!0},rdata:{value:0,writable:!0},mixCounter:{value:0,writable:!0},lmixRampU:{value:0,writable:!0},lmixDeltaU:{value:0,writable:!0},rmixRampU:{value:0,writable:!0},rmixDeltaU:{value:0,writable:!0},lmixRampD:{value:0,writable:!0},lmixDeltaD:{value:0,writable:!0},rmixRampD:{value:0,writable:!0},rmixDeltaD:{value:0,writable:!0},volCounter:{value:0,writable:!0},lvolDelta:{value:0,writable:!0},rvolDelta:{value:0,writable:!0},panCounter:{value:0,writable:!0},lpanDelta:{value:0,writable:!0},rpanDelta:{value:0,writable:!0},initialize:{value:function(){this.enabled=0,this.sample=null,this.length=0,this.index=0,this.pointer=0,this.delta=0,this.fraction=0,this.speed=0,this.dir=0,this.oldSample=null,this.oldLength=0,this.oldPointer=0,this.oldFraction=0,this.oldSpeed=0,this.oldDir=0,this.volume=0,this.lvol=0,this.rvol=0,this.panning=128,this.lpan=.5,this.rpan=.5,this.ldata=0,this.rdata=0,this.mixCounter=0,this.lmixRampU=0,this.lmixDeltaU=0,this.rmixRampU=0,this.rmixDeltaU=0,this.lmixRampD=0,this.lmixDeltaD=0,this.rmixRampD=0,this.rmixDeltaD=0,this.volCounter=0,this.lvolDelta=0,this.rvolDelta=0,this.panCounter=0,this.lpanDelta=0,this.rpanDelta=0}}})}function Co(){return Object.create(null,{name:{value:"",writable:!0},bits:{value:8,writable:!0},volume:{value:0,writable:!0},length:{value:0,writable:!0},data:{value:[],writable:!0},loopMode:{value:0,writable:!0},loopStart:{value:0,writable:!0},loopLen:{value:0,writable:!0},store:{value:function(i){var t=0,e,o=this.length,n,l,c,r;if(this.loopLen||(this.loopMode=0),n=i.position,this.loopMode?(o=this.loopStart+this.loopLen,this.data=new Float32Array(o+1)):this.data=new Float32Array(this.length+1),this.bits===8)for(c=n+o,c>i.length&&(o=i.length-n),e=0;e<o;e++)r=i.readByte()+t,r<-128?r+=256:r>127&&(r-=256),this.data[e]=r*.0078125,t=r;else for(c=n+(o<<1),c>i.length&&(o=i.length-n>>1),e=0;e<o;e++)r=i.readShort()+t,r<-32768?r+=65536:r>32767&&(r-=65536),this.data[e]=r*3051758e-11,t=r;if(c=n+this.length,this.loopMode?(this.length=this.loopStart+this.loopLen,this.loopMode===1?this.data[o]=this.data[this.loopStart]:this.data[o]=this.data[o-1]):this.data[this.length]=0,o!==this.length)for(l=this.data[o-1],e=o;e<this.length;e++)this.data[e]=l;c<i.length?i.position=c:i.position=i.length-1}}})}function Nr(){var i=di();return Object.defineProperties(i,{setup:{value:function(t){var e=1;for(this.channels.length=t,this.channels[0]=Po();e<t;++e)this.channels[e]=this.channels[e-1].next=Po()}},initialize:{value:function(){this.reset()}},fast:{value:function(t){var e,o,n,l,c=0,r,a=0,d,u,s,h=this.bufferSize,b,m;if(this.completed){if(!this.remains){this.player.stop();return}h=this.remains}for(;c<h;){for(this.samplesLeft||(this.player.process(),this.player.fast(),this.samplesLeft=this.samplesTick,this.completed&&(h=c+this.samplesTick,h>this.bufferSize&&(this.remains=h-this.bufferSize,h=this.bufferSize))),b=this.samplesLeft,c+b>=h&&(b=h-c),r=a+b,e=this.channels[0];e;){if(!e.enabled){e=e.next;continue}for(u=e.sample,o=u.data,s=this.buffer[a],l=a;l<r;++l){if(e.index!==e.pointer){if(e.index>=e.length)if(u.loopMode)e.pointer=u.loopStart+(e.index-e.length),e.length=u.length,u.loopMode===2&&(e.dir?e.dir=0:e.dir=u.length+u.loopStart-1);else{e.enabled=0;break}else e.pointer=e.index;e.mute?(e.ldata=0,e.rdata=0):(e.dir?m=o[e.dir-e.pointer]:m=o[e.pointer],e.ldata=m*e.lvol,e.rdata=m*e.rvol)}e.index=e.pointer+e.delta,(e.fraction+=e.speed)>=1&&(e.index++,e.fraction--),s.l+=e.ldata,s.r+=e.rdata,s=s.next}e=e.next}a=r,c+=b,this.samplesLeft-=b}for(s=this.buffer[0],n=t.outputBuffer.getChannelData(0),d=t.outputBuffer.getChannelData(1),l=0;l<h;++l)s.l>1?s.l=1:s.l<-1&&(s.l=-1),s.r>1?s.r=1:s.r<-1&&(s.r=-1),n[l]=s.l,d[l]=s.r,s.l=s.r=0,s=s.next}},accurate:{value:function(t){var e,o,n,l,c,r,a=0,d,u=0,s,h,b,m,f,g=this.bufferSize,p,x;if(this.completed){if(!this.remains){this.player.stop();return}g=this.remains}for(;a<g;){for(this.samplesLeft||(this.player.process(),this.player.accurate(),this.samplesLeft=this.samplesTick,this.completed&&(g=a+this.samplesTick,g>this.bufferSize&&(this.remains=g-this.bufferSize,g=this.bufferSize))),p=this.samplesLeft,a+p>=g&&(p=g-a),d=u+p,e=this.channels[0];e;){if(!e.enabled){e=e.next;continue}for(b=e.sample,o=b.data,m=e.oldSample,m&&(n=m.data),f=this.buffer[u],r=u;r<d;++r){if(x=e.mute?0:o[e.pointer],x+=(o[e.pointer+e.dir]-x)*e.fraction,(e.fraction+=e.speed)>=1&&(c=e.fraction>>0,e.fraction-=c,e.dir>0?(e.pointer+=c,e.pointer>e.length&&(e.fraction+=e.pointer-e.length,e.pointer=e.length)):(e.pointer-=c,e.pointer<e.length&&(e.fraction+=e.length-e.pointer,e.pointer=e.length))),e.mixCounter?(m?(s=e.mute?0:n[e.oldPointer],s+=(n[e.oldPointer+e.oldDir]-s)*e.oldFraction,(e.oldFraction+=e.oldSpeed)>1&&(c=e.oldFraction>>0,e.oldFraction-=c,e.oldDir>0?(e.oldPointer+=c,e.oldPointer>e.oldLength&&(e.oldFraction+=e.oldPointer-e.oldLength,e.oldPointer=e.oldLength)):(e.oldPointer-=c,e.oldPointer<e.oldLength&&(e.oldFraction+=e.oldLength-e.oldPointer,e.oldPointer=e.oldLength))),f.l+=x*e.lmixRampU+s*e.lmixRampD,f.r+=x*e.rmixRampU+s*e.rmixRampD,e.lmixRampD-=e.lmixDeltaD,e.rmixRampD-=e.rmixDeltaD):(f.l+=x*e.lmixRampU,f.r+=x*e.rmixRampU),e.lmixRampU+=e.lmixDeltaU,e.rmixRampU+=e.rmixDeltaU,e.mixCounter--,e.oldPointer===e.oldLength&&(m.loopMode?m.loopMode===1?(e.oldPointer=m.loopStart,e.oldLength=m.length):e.oldDir>0?(e.oldPointer=m.length-1,e.oldLength=m.loopStart,e.oldDir=-1):(e.oldFraction-=1,e.oldPointer=m.loopStart,e.oldLength=m.length,e.oldDir=1):(m=null,e.oldPointer=0))):(f.l+=x*e.lvol,f.r+=x*e.rvol,e.volCounter?(e.lvol+=e.lvolDelta,e.rvol+=e.rvolDelta,e.volCounter--):e.panCounter&&(e.lpan+=e.lpanDelta,e.rpan+=e.rpanDelta,e.panCounter--,e.lvol=e.volume*e.lpan,e.rvol=e.volume*e.rpan)),e.pointer===e.length)if(b.loopMode)b.loopMode===1?(e.pointer=b.loopStart,e.length=b.length):e.dir>0?(e.pointer=b.length-1,e.length=b.loopStart,e.dir=-1):(e.fraction-=1,e.pointer=b.loopStart,e.length=b.length,e.dir=1);else{e.enabled=0;break}f=f.next}e=e.next}u=d,a+=p,this.samplesLeft-=p}for(f=this.buffer[0],l=t.outputBuffer.getChannelData(0),h=t.outputBuffer.getChannelData(1),r=0;r<g;++r)f.l>1?f.l=1:f.l<-1&&(f.l=-1),f.r>1?f.r=1:f.r<-1&&(f.r=-1),l[r]=f.l,h[r]=f.r,f.l=f.r=0,f=f.next}}}),i.bufferSize=8192,Object.seal(i)}function Fo(i){var t=hi();return Object.defineProperties(t,{track:{value:null,writable:!0},length:{value:0,writable:!0},restart:{value:0,writable:!0},timer:{value:0,writable:!0},master:{value:0,writable:!0},volume:{set:function(e){e<0?e=0:e>1&&(e=1),this.master=e*64}},setup:{configurable:!1,value:function(){this.mixer.setup(this.channels)}}}),t.mixer=i||Nr(),t.mixer.player=t,t.endian=1,t.quality=1,t}function jr(i){var t=Object.create(null,{index:{value:i,writable:!0},next:{value:null,writable:!0},flags:{value:0,writable:!0},delay:{value:0,writable:!0},channel:{value:null,writable:!0},patternLoop:{value:0,writable:!0},patternLoopRow:{value:0,writable:!0},playing:{value:null,writable:!0},note:{value:0,writable:!0},keyoff:{value:0,writable:!0},period:{value:0,writable:!0},finetune:{value:0,writable:!0},arpDelta:{value:0,writable:!0},vibDelta:{value:0,writable:!0},instrument:{value:null,writable:!0},autoVibratoPos:{value:0,writable:!0},autoSweep:{value:0,writable:!0},autoSweepPos:{value:0,writable:!0},sample:{value:null,writable:!0},sampleOffset:{value:0,writable:!0},volume:{value:0,writable:!0},volEnabled:{value:0,writable:!0},volEnvelope:{value:null,writable:!0},volDelta:{value:0,writable:!0},volSlide:{value:0,writable:!0},volSlideMaster:{value:0,writable:!0},fineSlideU:{value:0,writable:!0},fineSlideD:{value:0,writable:!0},fadeEnabled:{value:0,writable:!0},fadeDelta:{value:0,writable:!0},fadeVolume:{value:0,writable:!0},panning:{value:0,writable:!0},panEnabled:{value:0,writable:!0},panEnvelope:{value:null,writable:!0},panSlide:{value:0,writable:!0},portaU:{value:0,writable:!0},portaD:{value:0,writable:!0},finePortaU:{value:0,writable:!0},finePortaD:{value:0,writable:!0},xtraPortaU:{value:0,writable:!0},xtraPortaD:{value:0,writable:!0},portaPeriod:{value:0,writable:!0},portaSpeed:{value:0,writable:!0},glissando:{value:0,writable:!0},glissPeriod:{value:0,writable:!0},vibratoPos:{value:0,writable:!0},vibratoSpeed:{value:0,writable:!0},vibratoDepth:{value:0,writable:!0},vibratoReset:{value:0,writable:!0},tremoloPos:{value:0,writable:!0},tremoloSpeed:{value:0,writable:!0},tremoloDepth:{value:0,writable:!0},waveControl:{value:0,writable:!0},tremorPos:{value:0,writable:!0},tremorOn:{value:0,writable:!0},tremorOff:{value:0,writable:!0},tremorVolume:{value:0,writable:!0},retrigx:{value:0,writable:!0},retrigy:{value:0,writable:!0},rowCurrent:{value:null,writable:!0},reset:{value:function(){this.volume=this.sample.volume,this.panning=this.sample.panning,this.finetune=this.sample.finetune>>3<<2,this.keyoff=0,this.volDelta=0,this.fadeEnabled=0,this.fadeDelta=0,this.rowCurrent=null,this.fadeVolume=65536,this.autoVibratoPos=0,this.autoSweep=1,this.autoSweepPos=0,this.vibDelta=0,this.vibratoReset=0,(this.waveControl&15)<4&&(this.vibratoPos=0),this.waveControl>>4<4&&(this.tremoloPos=0)}},autoVibrato:{value:function(){var e;switch(this.autoVibratoPos=this.autoVibratoPos+this.playing.vibratoSpeed&255,this.playing.vibratoType){case 0:e=Wr[this.autoVibratoPos];break;case 1:this.autoVibratoPos<128?e=-64:e=64;break;case 2:e=(64+(this.autoVibratoPos>>1)&127)-64;break;case 3:e=(64-(this.autoVibratoPos>>1)&127)-64;break;default:break}return e*=this.playing.vibratoDepth,this.autoSweep&&(this.playing.vibratoSweep?this.autoSweepPos>this.playing.vibratoSweep?(this.autoSweepPos&2&&(e*=this.autoSweepPos/this.playing.vibratoSweep),this.autoSweep=0):e*=++this.autoSweepPos/this.playing.vibratoSweep:this.autoSweep=0),this.flags|=ce,e>>6}},tonePortamento:{value:function(){this.glissPeriod||(this.glissPeriod=this.period),this.period<this.portaPeriod?(this.glissPeriod+=this.portaSpeed<<2,this.glissando?this.period=Math.round(this.glissPeriod/64)<<6:this.period=this.glissPeriod,this.period>=this.portaPeriod&&(this.period=this.portaPeriod,this.glissPeriod=this.portaPeriod=0)):this.period>this.portaPeriod&&(this.glissPeriod-=this.portaSpeed<<2,this.glissando?this.period=Math.round(this.glissPeriod/64)<<6:this.period=this.glissPeriod,this.period<=this.portaPeriod&&(this.period=this.portaPeriod,this.glissPeriod=this.portaPeriod=0)),this.flags|=ce}},tremolo:{value:function(){var e=255,o=this.tremoloPos&31;switch(this.waveControl>>4&3){case 0:e=Lo[o];break;case 1:e=o<<3;break;default:break}this.volDelta=e*this.tremoloDepth>>6,this.tremoloPos>31&&(this.volDelta=-this.volDelta),this.tremoloPos=this.tremoloPos+this.tremoloSpeed&63,this.flags|=Y}},tremor:{value:function(){this.tremorPos===this.tremorOn?(this.tremorVolume=this.volume,this.volume=0,this.flags|=Y):(this.tremorPos=0,this.volume=this.tremorVolume,this.flags|=Y),this.tremorPos++}},vibrato:{value:function(){var e=255,o=this.vibratoPos&31;switch(this.waveControl&3){case 0:e=Lo[o];break;case 1:e=o<<3,this.vibratoPos>31&&(e=255-e);break;default:break}this.vibDelta=e*this.vibratoDepth>>7,this.vibratoPos>31&&(this.vibDelta=-this.vibDelta),this.vibratoPos=this.vibratoPos+this.vibratoSpeed&63,this.flags|=ce}}});return t.volEnvelope=To(),t.panEnvelope=To(),Object.seal(t)}function vi(){return Object.create(null,{points:{value:[],writable:!0},total:{value:0,writable:!0},sustain:{value:0,writable:!0},loopStart:{value:0,writable:!0},loopEnd:{value:0,writable:!0},flags:{value:0,writable:!0}})}function To(){return Object.create(null,{value:{value:0,writable:!0},position:{value:0,writable:!0},frame:{value:0,writable:!0},delta:{value:0,writable:!0},fraction:{value:0,writable:!0},stopped:{value:0,writable:!0},reset:{value:function(){this.value=0,this.position=0,this.frame=0,this.delta=0,this.fraction=0,this.stopped=0}}})}function Mo(){var i=Object.create(null,{name:{value:"",writable:!0},samples:{value:[],writable:!0},noteSamples:{value:null,writable:!0},fadeout:{value:0,writable:!0},volData:{value:null,writable:!0},volEnabled:{value:0,writable:!0},panData:{value:null,writable:!0},panEnabled:{value:0,writable:!0},vibratoType:{value:0,writable:!0},vibratoSweep:{value:0,writable:!0},vibratoSpeed:{value:0,writable:!0},vibratoDepth:{value:0,writable:!0}});return i.noteSamples=new Uint8Array(96),i.volData=vi(),i.panData=vi(),Object.seal(i)}function Ao(i,t){var e=Object.create(null,{rows:{value:[],writable:!0},length:{value:0,writable:!0},size:{value:0,writable:!0}});return e.rows.length=e.size=i*t,e.length=i,Object.seal(e)}function bi(i,t){var e=Object.create(null,{frame:{value:0,writable:!0},value:{value:0,writable:!0}});return e.frame=i||0,e.value=t||0,Object.seal(e)}function Ui(){return Object.create(null,{note:{value:0,writable:!0},instrument:{value:0,writable:!0},volume:{value:0,writable:!0},effect:{value:0,writable:!0},param:{value:0,writable:!0}})}function Do(){var i=Co();return Object.defineProperties(i,{finetune:{value:0,writable:!0},panning:{value:0,writable:!0},relative:{value:0,writable:!0}}),Object.seal(i)}function $r(i){var t=Fo(i);return Object.defineProperties(t,{id:{value:"F2Player"},patterns:{value:[],writable:!0},instruments:{value:[],writable:!0},voices:{value:[],writable:!0},linear:{value:0,writable:!0},complete:{value:0,writable:!0},order:{value:0,writable:!0},position:{value:0,writable:!0},nextOrder:{value:0,writable:!0},nextPosition:{value:0,writable:!0},pattern:{value:null,writable:!0},patternDelay:{value:0,writable:!0},patternOffset:{value:0,writable:!0},timer:{value:0,writable:!0},rowCurrent:{value:0,writable:!0},initialize:{value:function(){var e=0,o;for(this.reset(),this.timer=this.speed,this.order=0,this.position=0,this.nextOrder=-1,this.nextPosition=-1,this.patternDelay=0,this.patternOffset=0,this.complete=0,this.master=64,this.voices.length=this.channels;e<this.channels;++e)o=jr(e),o.channel=this.mixer.channels[e],o.playing=this.instruments[0],o.sample=o.playing.samples[0],this.voices[e]=o,e&&(this.voices[e-1].next=o)}},loader:{value:function(e){var o,n,l,c,r,a,d,u,s,h,b=22,m,f,g,p;if(!(e.length<360)){if(e.position=17,this.title=e.readString(20),e.position++,l=e.readString(20),l==="FastTracker v2.00   "||l==="FastTracker v 2.00  ")this.version=1;else if(l==="Sk@le Tracker")b=2,this.version=2;else if(l==="MadTracker 2.0")this.version=3;else if(l==="MilkyTracker        ")this.version=4;else if(l==="DigiBooster Pro 2.18")this.version=5;else if(l.indexOf("OpenMPT")!==-1)this.version=6;else return;for(e.readUshort(),o=e.readUint(),this.length=e.readUshort(),this.restart=e.readUshort(),this.channels=e.readUshort(),p=f=e.readUshort(),this.instruments=[],this.instruments.length=e.readUshort()+1,this.linear=e.readUshort(),this.speed=e.readUshort(),this.tempo=e.readUshort(),this.track=new Uint8Array(this.length),n=0;n<this.length;++n)d=e.readUbyte(),d>=p&&(f=d+1),this.track[n]=d;if(this.patterns=[],this.patterns.length=f,f!==p){for(s=Ao(64,this.channels),d=s.size,n=0;n<d;++n)s.rows[n]=Ui();this.patterns[--f]=s}for(e.position=h=o+60,u=p,n=0;n<u;++n){if(o=e.readUint(),e.position++,s=Ao(e.readUshort(),this.channels),f=s.size,p=e.readUshort(),e.position=h+o,a=e.position+p,p)for(d=0;d<f;++d)m=Ui(),p=e.readUbyte(),p&128?(p&1&&(m.note=e.readUbyte()),p&2&&(m.instrument=e.readUbyte()),p&4&&(m.volume=e.readUbyte()),p&8&&(m.effect=e.readUbyte()),p&16&&(m.param=e.readUbyte())):(m.note=p,m.instrument=e.readUbyte(),m.volume=e.readUbyte(),m.effect=e.readUbyte(),m.param=e.readUbyte()),m.note!==Bi&&m.note>96&&(m.note=0),s.rows[d]=m;else for(d=0;d<f;++d)s.rows[d]=Ui();this.patterns[n]=s,h=e.position,h!==a&&(h=e.position=a)}for(a=e.position,u=this.instruments.length,n=1;n<u&&(c=e.readUint(),!(e.position+c>=e.length));++n){if(r=Mo(),r.name=e.readString(22),e.position++,p=e.readUshort(),p>16&&(p=16),o=e.readUint(),b===2&&o!==64&&(o=64),p){for(r.samples=[],r.samples.length=p,d=0;d<96;++d)r.noteSamples[d]=e.readUbyte();for(d=0;d<12;++d)r.volData.points[d]=bi(e.readUshort(),e.readUshort());for(d=0;d<12;++d)r.panData.points[d]=bi(e.readUshort(),e.readUshort());for(r.volData.total=e.readUbyte(),r.panData.total=e.readUbyte(),r.volData.sustain=e.readUbyte(),r.volData.loopStart=e.readUbyte(),r.volData.loopEnd=e.readUbyte(),r.panData.sustain=e.readUbyte(),r.panData.loopStart=e.readUbyte(),r.panData.loopEnd=e.readUbyte(),r.volData.flags=e.readUbyte(),r.panData.flags=e.readUbyte(),r.volData.flags&_o&&(r.volEnabled=1),r.panData.flags&_o&&(r.panEnabled=1),r.vibratoType=e.readUbyte(),r.vibratoSweep=e.readUbyte(),r.vibratoDepth=e.readUbyte(),r.vibratoSpeed=e.readUbyte(),r.fadeout=e.readUshort()<<1,e.position+=b,h=e.position,this.instruments[n]=r,d=0;d<p;++d)g=Do(),g.length=e.readUint(),g.loopStart=e.readUint(),g.loopLen=e.readUint(),g.volume=e.readUbyte(),g.finetune=e.readByte(),g.loopMode=e.readUbyte(),g.panning=e.readUbyte(),g.relative=e.readByte(),e.position++,g.name=e.readString(22),r.samples[d]=g,e.position=h+=o;for(d=0;d<p;++d)g=r.samples[d],g.length&&(h=e.position+g.length,g.loopMode&16&&(g.bits=16,g.loopMode^=16,g.length>>=1,g.loopStart>>=1,g.loopLen>>=1),g.loopLen||(g.loopMode=0),g.store(e),g.loopMode&&(g.length=g.loopStart+g.loopLen),e.position=h)}else e.position=a+c;if(a=e.position,a>=e.length)break}for(r=Mo(),r.volData=vi(),r.panData=vi(),r.samples=[],n=0;n<12;++n)r.volData.points[n]=bi(),r.panData.points[n]=bi();for(g=Do(),g.length=220,g.data=new Float32Array(220),n=0;n<220;++n)g.data[n]=0;r.samples[0]=g,this.instruments[0]=r}}},process:{value:function(){var e,o,n,l,c,r,a,d,u,s,h,b,m,f=this.voices[0];if(this.tick)for(;f;){if(s=this.pattern.rows[this.position+f.index],f.delay)if((s.param&15)===this.tick)f.flags=f.delay,f.delay=0;else{f=f.next;continue}if(s.volume)switch(a=s.volume>>4,d=s.volume&15,a){case 6:f.volume-=d,f.volume<0&&(f.volume=0),f.flags|=Y;break;case 7:f.volume+=d,f.volume>64&&(f.volume=64),f.flags|=Y;break;case 11:f.vibrato();break;case 13:f.panning-=d,f.panning<0&&(f.panning=0),f.flags|=ye;break;case 14:f.panning+=d,f.panning>255&&(f.panning=255),f.flags|=ye;break;case 15:f.portaPeriod&&f.tonePortamento();break;default:break}switch(a=s.param>>4,d=s.param&15,s.effect){case 0:if(!s.param)break;m=(this.tick-this.timer)%3,m<0&&(m+=3),this.tick===2&&this.timer===18&&(m=0),m?m===1?this.linear?f.arpDelta=-(d<<6):(m=this.amiga(f.note+d,f.finetune),f.arpDelta=m-f.period):this.linear?f.arpDelta=-(a<<6):(m=this.amiga(f.note+a,f.finetune),f.arpDelta=m-f.period):f.arpDelta=0,f.flags|=ce;break;case 1:f.period-=f.portaU,f.period<0&&(f.period=0),f.flags|=ce;break;case 2:f.period+=f.portaD,f.period>9212&&(f.period=9212),f.flags|=ce;break;case 3:f.portaPeriod&&f.tonePortamento();break;case 4:a&&(f.vibratoSpeed=a),d&&(f.vibratoDepth=d<<2),f.vibrato();break;case 5:b=1,f.portaPeriod&&f.tonePortamento();break;case 6:b=1,f.vibrato();break;case 7:f.tremolo();break;case 10:b=1;break;case 14:switch(a){case 9:this.tick%d===0&&(f.volEnvelope.reset(),f.panEnvelope.reset(),f.flags|=Y|ye|nt);break;case 12:this.tick===d&&(f.volume=0,f.flags|=Y);break;default:break}break;case 17:a=f.volSlideMaster>>4,d=f.volSlideMaster&15,a?(this.master+=a,this.master>64&&(this.master=64),f.flags|=Y):d&&(this.master-=d,this.master<0&&(this.master=0),f.flags|=Y);break;case 20:this.tick===s.param&&(f.fadeEnabled=1,f.keyoff=1);break;case 24:a=f.panSlide>>4,d=f.panSlide&15,a?(f.panning+=a,f.panning>255&&(f.panning=255),f.flags|=ye):d&&(f.panning-=d,f.panning<0&&(f.panning=0),f.flags|=ye);break;case 27:if(e=this.tick,s.volume||e++,e%f.retrigy)break;(!s.volume||s.volume>80)&&f.retrigx&&this.retrig(f),f.flags|=nt;break;case 29:f.tremor();break;default:break}b&&(a=f.volSlide>>4,d=f.volSlide&15,b=0,a?(f.volume+=a,f.flags|=Y):d&&(f.volume-=d,f.flags|=Y)),f=f.next}else for(this.nextOrder>=0&&(this.order=this.nextOrder),this.nextPosition>=0&&(this.position=this.nextPosition),this.nextOrder=this.nextPosition=-1,this.pattern=this.patterns[this.track[this.order]];f;){if(this.rowCurrent=this.position+f.index,s=this.pattern.rows[this.rowCurrent],e=s.volume>>4,u=s.effect===3||s.effect===5||e===15,a=s.param>>4,f.keyoff=0,f.arpDelta&&(f.arpDelta=0,f.flags|=ce),s.instrument?(f.instrument=s.instrument<this.instruments.length?this.instruments[s.instrument]:null,f.volEnvelope.reset(),f.panEnvelope.reset(),f.flags|=Y|ye|Je):(s.note===Bi||s.effect===20&&!s.param)&&(f.fadeEnabled=1,f.keyoff=1),s.note&&s.note!==Bi?f.instrument?(n=f.instrument,m=s.note-1,h=n.samples[n.noteSamples[m]],m+=h.relative,m>=Gr&&m<=Vr&&(u||(f.note=m,f.sample=h,s.instrument?(f.volEnabled=n.volEnabled,f.panEnabled=n.panEnabled,f.flags|=Hr):f.flags|=ce|nt),s.instrument?(f.reset(),f.fadeDelta=n.fadeout):f.finetune=h.finetune>>3<<2,s.effect===14&&a===5&&(f.finetune=(s.param&15)-8<<3),this.linear?m=(120-m<<6)-f.finetune:m=this.amiga(m,f.finetune),u?f.portaPeriod=m:(f.period=m,f.glissPeriod=0))):(f.volume=0,f.flags=Y|Je):f.vibratoReset&&s.effect!==4&&s.effect!==6&&(f.vibDelta=0,f.vibratoReset=0,f.flags|=ce),s.volume)if(s.volume>=16&&s.volume<=80)f.volume=s.volume-16,f.flags|=Y|Je;else switch(d=s.volume&15,e){case 6:f.volume-=d,f.volume<0&&(f.volume=0),f.flags|=Y;break;case 7:f.volume+=d,f.volume>64&&(f.volume=64),f.flags|=Y;break;case 10:d&&(f.vibratoSpeed=d);break;case 11:d&&(f.vibratoDepth=d<<2);break;case 12:f.panning=d<<4,f.flags|=ye;break;case 15:d&&(f.portaSpeed=d<<4);break;default:break}if(s.effect)switch(d=s.param&15,s.effect){case 1:s.param&&(f.portaU=s.param<<2);break;case 2:s.param&&(f.portaD=s.param<<2);break;case 3:s.param&&e!==15&&(f.portaSpeed=s.param);break;case 4:f.vibratoReset=1;break;case 5:s.param&&(f.volSlide=s.param);break;case 6:s.param&&(f.volSlide=s.param),f.vibratoReset=1;break;case 7:a&&(f.tremoloSpeed=a),d&&(f.tremoloDepth=d);break;case 8:f.panning=s.param,f.flags|=ye;break;case 9:s.param&&(f.sampleOffset=s.param<<8),f.sampleOffset>=f.sample.length&&(f.volume=0,f.sampleOffset=0,f.flags&=~(ce|nt),f.flags|=Y|Je);break;case 10:s.param&&(f.volSlide=s.param);break;case 11:this.nextOrder=s.param,this.nextOrder>=this.length?this.complete=1:this.nextPosition=0,c=1,this.patternOffset=0;break;case 12:f.volume=s.param,f.flags|=Y|Je;break;case 13:this.nextPosition=(a*10+d)*this.channels,this.patternOffset=0,c||(this.nextOrder=this.order+1,this.nextOrder>=this.length&&(this.complete=1,this.nextPosition=-1));break;case 14:switch(a){case 1:d&&(f.finePortaU=d<<2),f.period-=f.finePortaU,f.flags|=ce;break;case 2:d&&(f.finePortaD=d<<2),f.period+=f.finePortaD,f.flags|=ce;break;case 3:f.glissando=d;break;case 4:f.waveControl=f.waveControl&240|d;break;case 6:d?(f.patternLoop?f.patternLoop--:f.patternLoop=d,f.patternLoop&&(this.nextPosition=f.patternLoopRow)):f.patternLoopRow=this.patternOffset=this.position;break;case 7:f.waveControl=f.waveControl&15|d<<4;break;case 10:d&&(f.fineSlideU=d),f.volume+=f.fineSlideU,f.flags|=Y;break;case 11:d&&(f.fineSlideD=d),f.volume-=f.fineSlideD,f.flags|=Y;break;case 13:f.delay=f.flags,f.flags=0;break;case 14:this.patternDelay=d*this.timer;break;default:break}break;case 15:if(!s.param)break;s.param<32?this.timer=s.param:this.mixer.samplesTick=this.sampleRate*2.5/s.param>>0;break;case 16:this.master=s.param,this.master>64&&(this.master=64),f.flags|=Y;break;case 17:s.param&&(f.volSlideMaster=s.param);break;case 21:if(!f.instrument||!f.instrument.volEnabled)break;for(n=f.instrument,m=s.param,a=n.volData.total,l=0;l<a&&!(m<n.volData.points[l].frame);l++);f.volEnvelope.position=--l,a--,n.volData.flags&Io&&l===n.volData.loopEnd&&(l=f.volEnvelope.position=n.volData.loopStart,m=n.volData.points[l].frame,f.volEnvelope.frame=m),l>=a?(f.volEnvelope.value=n.volData.points[a].value,f.volEnvelope.stopped=1):(f.volEnvelope.stopped=0,f.volEnvelope.frame=m,m>n.volData.points[l].frame&&f.volEnvelope.position++,o=n.volData.points[l],r=n.volData.points[++l],m=r.frame-o.frame,f.volEnvelope.delta=(m?(r.value-o.value<<8)/m>>0:0)||0,f.volEnvelope.fraction=o.value<<8);break;case 24:s.param&&(f.panSlide=s.param);break;case 27:if(a&&(f.retrigx=a),d&&(f.retrigy=d),!s.volume&&f.retrigy){if(e=this.tick+1,e%f.retrigy)break;s.volume>80&&f.retrigx&&this.retrig(f)}break;case 29:s.param&&(f.tremorOn=++a,f.tremorOff=++d+a);break;case 33:a===1?(d&&(f.xtraPortaU=d),f.period-=f.xtraPortaU,f.flags|=ce):a===2&&(d&&(f.xtraPortaD=d),f.period+=f.xtraPortaD,f.flags|=ce);break;default:break}f=f.next}++this.tick>=this.timer+this.patternDelay&&(this.patternDelay=this.tick=0,this.nextPosition<0&&(this.nextPosition=this.position+this.channels,(this.nextPosition>=this.pattern.size||this.complete)&&(this.nextOrder=this.order+1,this.nextPosition=this.patternOffset,this.nextOrder>=this.length&&(this.nextOrder=this.restart,this.mixer.complete=1))))}},fast:{value:function(){for(var e,o,n,l,c,r=this.voices[0],a;r;)e=r.channel,n=r.flags,r.flags=0,n&nt&&(e.index=r.sampleOffset,e.pointer=-1,e.dir=0,e.fraction=0,e.sample=r.sample,e.length=r.sample.length,e.enabled=e.sample.data?1:0,r.playing=r.instrument,r.sampleOffset=0),l=r.playing,o=l.vibratoSpeed?r.autoVibrato():0,a=r.volume+r.volDelta,l.volEnabled?(r.volEnabled&&!r.volEnvelope.stopped&&this.envelope(r,r.volEnvelope,l.volData),a=a*r.volEnvelope.value>>6,n|=Y,r.fadeEnabled&&(r.fadeVolume-=r.fadeDelta,r.fadeVolume<0?(a=0,r.fadeVolume=0,r.fadeEnabled=0,r.volEnvelope.value=0,r.volEnvelope.stopped=1,r.panEnvelope.stopped=1):a=a*r.fadeVolume>>16)):r.keyoff&&(a=0,n|=Y),c=r.panning,l.panEnabled&&(r.panEnabled&&!r.panEnvelope.stopped&&this.envelope(r,r.panEnvelope,l.panData),c=r.panEnvelope.value<<2,n|=ye,c<0?c=0:c>255&&(c=255)),n&Y&&(a<0?a=0:a>64&&(a=64),e.volume=Ro[a*this.master>>6],e.lvol=e.volume*e.lpan,e.rvol=e.volume*e.rpan),n&ye&&(e.panning=c,e.lpan=lt[256-c],e.rpan=lt[c],e.lvol=e.volume*e.lpan,e.rvol=e.volume*e.rpan),n&ce&&(o+=r.period+r.arpDelta+r.vibDelta,this.linear?e.speed=(548077568*Math.pow(2,(4608-o)/768)/this.sampleRate>>0)/65536:e.speed=(65536*(14317456/o)/this.sampleRate>>0)/65536,e.delta=e.speed>>0,e.speed-=e.delta),r=r.next}},accurate:{value:function(){for(var e,o,n,l,c,r,a,d,u,s=this.voices[0],h;s;){if(e=s.channel,n=s.flags,s.flags=0,n&nt&&(e.sample&&(n|=Je,e.mixCounter=220,e.oldSample=null,e.oldPointer=-1,e.enabled&&(e.oldDir=e.dir,e.oldFraction=e.fraction,e.oldSpeed=e.speed,e.oldSample=e.sample,e.oldPointer=e.pointer,e.oldLength=e.length,e.lmixRampD=e.lvol,e.lmixDeltaD=e.lvol/220,e.rmixRampD=e.rvol,e.rmixDeltaD=e.rvol/220)),e.dir=1,e.fraction=0,e.sample=s.sample,e.pointer=s.sampleOffset,e.length=s.sample.length,e.enabled=e.sample.data?1:0,s.playing=s.instrument,s.sampleOffset=0),l=s.playing,o=l.vibratoSpeed?s.autoVibrato():0,h=s.volume+s.volDelta,l.volEnabled?(s.volEnabled&&!s.volEnvelope.stopped&&this.envelope(s,s.volEnvelope,l.volData),h=h*s.volEnvelope.value>>6,n|=Y,s.fadeEnabled&&(s.fadeVolume-=s.fadeDelta,s.fadeVolume<0?(h=0,s.fadeVolume=0,s.fadeEnabled=0,s.volEnvelope.value=0,s.volEnvelope.stopped=1,s.panEnvelope.stopped=1):h=h*s.fadeVolume>>16)):s.keyoff&&(h=0,n|=Y),a=s.panning,l.panEnabled&&(s.panEnabled&&!s.panEnvelope.stopped&&this.envelope(s,s.panEnvelope,l.panData),a=s.panEnvelope.value<<2,n|=ye,a<0?a=0:a>255&&(a=255)),!e.enabled){e.volCounter=0,e.panCounter=0,s=s.next;continue}n&Y&&(h<0?h=0:h>64&&(h=64),h=Ro[h*this.master>>6],r=h*lt[256-a],u=h*lt[a],h!==e.volume&&!e.mixCounter?(e.volCounter=n&Je?220:this.mixer.samplesTick,e.lvolDelta=(r-e.lvol)/e.volCounter,e.rvolDelta=(u-e.rvol)/e.volCounter):(e.lvol=r,e.rvol=u),e.volume=h),n&ye&&(c=lt[256-a],d=lt[a],a!==e.panning&&!e.mixCounter&&!e.volCounter?(e.panCounter=this.mixer.samplesTick,e.lpanDelta=(c-e.lpan)/e.panCounter,e.rpanDelta=(d-e.rpan)/e.panCounter):(e.lpan=c,e.rpan=d),e.panning=a),n&ce&&(o+=s.period+s.arpDelta+s.vibDelta,this.linear?e.speed=(548077568*Math.pow(2,(4608-o)/768)/this.sampleRate>>0)/65536:e.speed=(65536*(14317456/o)/this.sampleRate>>0)/65536),e.mixCounter&&(e.lmixRampU=0,e.lmixDeltaU=e.lvol/220,e.rmixRampU=0,e.rmixDeltaU=e.rvol/220),s=s.next}}},envelope:{value:function(e,o,n){var l=o.position,c=n.points[l],r;if(o.frame===c.frame){if(n.flags&Io&&l===n.loopEnd&&(l=o.position=n.loopStart,c=n.points[l],o.frame=c.frame),l===n.total-1){o.value=c.value,o.stopped=1;return}if(n.flags&Xr&&l===n.sustain&&!e.fadeEnabled){o.value=c.value;return}o.position++,r=n.points[o.position],o.delta=(r.value-c.value<<8)/(r.frame-c.frame)>>0||0,o.fraction=c.value<<8}else o.fraction+=o.delta;o.value=o.fraction>>8,o.frame++}},amiga:{value:function(e,o){var n=0,l=qi[++e];return o<0?n=(qi[--e]-l)/64:o>0&&(n=(l-qi[++e])/64),l-n*o>>0}},retrig:{value:function(e){switch(e.retrigx){case 1:e.volume--;break;case 2:e.volume++;break;case 3:e.volume-=4;break;case 4:e.volume-=8;break;case 5:e.volume-=16;break;case 6:e.volume=(e.volume<<1)/3;break;case 7:e.volume>>=1;break;case 8:e.volume=e.sample.volume;break;case 9:e.volume++;break;case 10:e.volume+=2;break;case 11:e.volume+=4;break;case 12:e.volume+=8;break;case 13:e.volume+=16;break;case 14:e.volume=e.volume*3>>1;break;case 15:e.volume<<=1;break;default:break}e.volume<0?e.volume=0:e.volume>64&&(e.volume=64),e.flags|=Y}}}),Object.seal(t)}var ce=1,Y=2,ye=4,nt=8,Hr=15,Je=32,_o=1,Xr=2,Io=4,Gr=0,Vr=118,Bi=97,Wr=[0,-2,-3,-5,-6,-8,-9,-11,-12,-14,-16,-17,-19,-20,-22,-23,-24,-26,-27,-29,-30,-32,-33,-34,-36,-37,-38,-39,-41,-42,-43,-44,-45,-46,-47,-48,-49,-50,-51,-52,-53,-54,-55,-56,-56,-57,-58,-59,-59,-60,-60,-61,-61,-62,-62,-62,-63,-63,-63,-64,-64,-64,-64,-64,-64,-64,-64,-64,-64,-64,-63,-63,-63,-62,-62,-62,-61,-61,-60,-60,-59,-59,-58,-57,-56,-56,-55,-54,-53,-52,-51,-50,-49,-48,-47,-46,-45,-44,-43,-42,-41,-39,-38,-37,-36,-34,-33,-32,-30,-29,-27,-26,-24,-23,-22,-20,-19,-17,-16,-14,-12,-11,-9,-8,-6,-5,-3,-2,0,2,3,5,6,8,9,11,12,14,16,17,19,20,22,23,24,26,27,29,30,32,33,34,36,37,38,39,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,56,57,58,59,59,60,60,61,61,62,62,62,63,63,63,64,64,64,64,64,64,64,64,64,64,64,63,63,63,62,62,62,61,61,60,60,59,59,58,57,56,56,55,54,53,52,51,50,49,48,47,46,45,44,43,42,41,39,38,37,36,34,33,32,30,29,27,26,24,23,22,20,19,17,16,14,12,11,9,8,6,5,3,2],Lo=[0,24,49,74,97,120,141,161,180,197,212,224,235,244,250,253,255,253,250,244,235,224,212,197,180,161,141,120,97,74,49,24],lt=[0,.04417,.062489,.076523,.088371,.098821,.108239,.116927,.124977,.132572,.139741,.146576,.153077,.159335,.16535,.171152,.176772,.18221,.187496,.19263,.197643,.202503,.207273,.211951,.216477,.220943,.225348,.229631,.233854,.237985,.242056,.246066,.249985,.253873,.25767,.261437,.265144,.268819,.272404,.275989,.279482,.282976,.286409,.289781,.293153,.296464,.299714,.302965,.306185,.309344,.312473,.315602,.318671,.321708,.324746,.327754,.3307,.333647,.336563,.339449,.342305,.345161,.347986,.350781,.353545,.356279,.359013,.361717,.364421,.367094,.369737,.37238,.374992,.377574,.380157,.382708,.38526,.387782,.390303,.392794,.395285,.397746,.400176,.402606,.405037,.407437,.409836,.412206,.414576,.416915,.419254,.421563,.423841,.42618,.428458,.430737,.432985,.435263,.437481,.439729,.441916,.444134,.446321,.448508,.450665,.452852,.455009,.457136,.459262,.461389,.463485,.465611,.467708,.469773,.471839,.473935,.47597,.478036,.480072,.482077,.484112,.486117,.488122,.490127,.492101,.494106,.496051,.498025,.5,.501944,.503888,.505802,.507746,.50966,.511574,.513488,.515371,.517255,.519138,.521022,.522905,.524758,.526611,.528465,.530318,.53214,.533993,.535816,.537639,.539462,.541254,.543046,.544839,.546631,.548423,.550216,.551978,.553739,.555501,.557263,.558995,.560757,.562489,.56422,.565952,.567683,.569384,.571116,.572817,.574518,.57622,.57789,.579592,.581262,.582964,.584634,.586305,.587946,.589617,.591257,.592928,.594568,.596209,.597849,.599459,.6011,.60271,.60435,.60596,.60757,.60915,.61076,.61237,.61395,.61556,.617139,.618719,.620268,.621848,.623428,.624977,.626557,.628106,.629655,.631205,.632754,.634303,.635822,.637372,.63889,.64044,.641959,.643478,.644966,.646485,.648004,.649523,.651012,.6525,.653989,.655477,.656966,.658454,.659943,.661431,.66289,.664378,.665836,.667294,.668783,.670241,.671699,.673127,.674585,.676043,.677471,.678929,.680357,.681785,.683213,.684641,.686068,.687496,.688894,.690321,.691749,.693147,.694574,.695972,.697369,.698767,.700164,.701561,.702928,.704326,.705723,.70711],Ro=[0,.005863,.013701,.021569,.029406,.037244,.045082,.052919,.060757,.068625,.076463,.0843,.092138,.099976,.107844,.115681,.123519,.131357,.139194,.147032,.1549,.162738,.170575,.178413,.186251,.194119,.201956,.209794,.217632,.225469,.233307,.241175,.249013,.25685,.264688,.272526,.280394,.288231,.296069,.303907,.311744,.319582,.32745,.335288,.343125,.350963,.3588,.366669,.374506,.382344,.390182,.398019,.405857,.413725,.421563,.4294,.437238,.445076,.452944,.460781,.468619,.476457,.484294,.492132,.5],qi=[29024,27392,25856,24384,23040,21696,20480,19328,18240,17216,16256,15360,14512,13696,12928,12192,11520,10848,10240,9664,9120,8608,8128,7680,7256,6848,6464,6096,5760,5424,5120,4832,4560,4304,4064,3840,3628,3424,3232,3048,2880,2712,2560,2416,2280,2152,2032,1920,1814,1712,1616,1524,1440,1356,1280,1208,1140,1076,1016,960,907,856,808,762,720,678,640,604,570,538,508,480,453,428,404,381,360,339,320,302,285,269,254,240,227,214,202,190,180,169,160,151,142,134,127,120,113,107,101,95,90,85,80,75,71,67,63,60,57,53,50,48,45,42,40,38,36,34,32,30,28],zo=$r;function xi(i){return Object.create(null,{index:{value:i,writable:!0},next:{value:null,writable:!0},channel:{value:null,writable:!0},sample:{value:null,writable:!0},enabled:{value:0,writable:!0},period:{value:0,writable:!0},effect:{value:0,writable:!0},param:{value:0,writable:!0},volume:{value:0,writable:!0},portaDir:{value:0,writable:!0},portaPeriod:{value:0,writable:!0},portaSpeed:{value:0,writable:!0},vibratoPos:{value:0,writable:!0},vibratoSpeed:{value:0,writable:!0},initialize:{value:function(){this.channel=null,this.sample=null,this.enabled=0,this.period=0,this.effect=0,this.param=0,this.volume=0,this.portaDir=0,this.portaPeriod=0,this.portaSpeed=0,this.vibratoPos=0,this.vibratoSpeed=0}}})}function Yr(i){var t=gi(i);return Object.defineProperties(t,{id:{value:"MKPlayer"},track:{value:null,writable:!0},patterns:{value:[],writable:!0},samples:{value:[],writable:!0},length:{value:0,writable:!0},restart:{value:0,writable:!0},voices:{value:[],writable:!0},trackPos:{value:0,writable:!0},patternPos:{value:0,writable:!0},jumpFlag:{value:0,writable:!0},vibratoDepth:{value:0,writable:!0},restartSave:{value:0,writable:!0},force:{set:function(e){e<Ni?e=Ni:e>Ze&&(e=Ze),this.version=e,e===Ze?this.vibratoDepth=6:this.vibratoDepth=7,e===Oo?(this.restartSave=this.restart,this.restart=0):(this.restart=this.restartSave,this.restartSave=0)}},initialize:{value:function(){var e=this.voices[0];for(this.reset(),this.force=this.version,this.speed=6,this.trackPos=0,this.patternPos=0,this.jumpFlag=0;e;)e.initialize(),e.channel=this.mixer.channels[e.index],e.sample=this.samples[0],e=e.next}},loader:{value:function(e){var o=0,n,l,c,r,a,d=0,u;if(!(e.length<2106)&&(e.position=1080,l=e.readString(4),!(l!=="M.K."&&l!=="FLT4"))){for(e.position=0,this.title=e.readString(20),this.version=Ni,e.position+=22,n=1;n<32;++n){if(u=e.readUshort(),!u){this.samples[n]=null,e.position+=28;continue}a=_t(),e.position-=24,a.name=e.readString(22),a.length=u<<1,e.position+=3,a.volume=e.readUbyte(),a.loop=e.readUshort()<<1,a.repeat=e.readUshort()<<1,e.position+=22,a.pointer=d,d+=a.length,this.samples[n]=a,a.length>32768&&(this.version=Kr)}for(e.position=950,this.length=e.readUbyte(),u=e.readUbyte(),this.restart=u<this.length?u:0,n=0;n<128;++n)u=e.readUbyte()<<8,this.track[n]=u,u>o&&(o=u);for(e.position=1084,o+=256,this.patterns.length=o,n=0;n<o;++n)if(r=mi(),u=e.readUint(),r.note=u>>16&4095,r.effect=u>>8&15,r.sample=u>>24&240|u>>12&15,r.param=u&255,this.patterns[n]=r,(r.sample>31||!this.samples[r.sample])&&(r.sample=0),(r.effect===3||r.effect===4)&&(this.version=Oo),(r.effect===5||r.effect===6)&&(this.version=Ze),r.effect>6&&r.effect<10){this.version=0;return}for(this.mixer.store(e,d),n=1;n<32;++n)if(a=this.samples[n],!!a)for(a.name.indexOf("2.0")>-1&&(this.version=Ze),a.loop?(a.loopPtr=a.pointer+a.loop,a.length=a.loop+a.repeat):(a.loopPtr=this.mixer.memory.length,a.repeat=2),d=a.pointer+4,c=a.pointer;c<d;++c)this.mixer.memory[c]=0;a=_t(),a.pointer=a.loopPtr=this.mixer.memory.length,a.length=a.repeat=2,this.samples[0]=a,this.version<Ze&&this.restart!==127&&(this.version=Jr)}}},process:{value:function(){var e,o,n,l,c,r,a,d,u,s=this.voices[0];if(this.tick)for(;s;){if(e=s.channel,!s.effect&&!s.param){e.period=s.period,s=s.next;continue}switch(s.effect){case 0:if(u=this.tick%3,!u){e.period=s.period,s=s.next;continue}for(u===1?u=s.param>>4:u=s.param&15,c=s.period&4095,n=37-u,o=0;o<n;++o)if(c>=Uo[o]){e.period=Uo[o+u];break}break;case 1:s.period-=s.param,s.period<113&&(s.period=113),e.period=s.period;break;case 2:s.period+=s.param,s.period>856&&(s.period=856),e.period=s.period;break;case 3:case 5:s.effect===5?d=1:s.param&&(s.portaSpeed=s.param,s.param=0),s.portaPeriod&&(s.portaDir?(s.period-=s.portaSpeed,s.period<=s.portaPeriod&&(s.period=s.portaPeriod,s.portaPeriod=0)):(s.period+=s.portaSpeed,s.period>=s.portaPeriod&&(s.period=s.portaPeriod,s.portaPeriod=0))),e.period=s.period;break;case 4:case 6:s.effect===6?d=1:s.param&&(s.vibratoSpeed=s.param),u=s.vibratoPos>>2&31,u=(s.vibratoSpeed&15)*Zr[u]>>this.vibratoDepth,s.vibratoPos>127?e.period=s.period-u:e.period=s.period+u,u=s.vibratoSpeed>>2&60,s.vibratoPos=s.vibratoPos+u&255;break;case 10:d=1;break;default:break}d&&(u=s.param>>4,d=0,u?s.volume+=u:s.volume-=s.param&15,s.volume<0?s.volume=0:s.volume>64&&(s.volume=64),e.volume=s.volume),s=s.next}else for(l=this.track[this.trackPos]+this.patternPos;s;){switch(e=s.channel,s.enabled=0,r=this.patterns[l+s.index],s.effect=r.effect,s.param=r.param,r.sample?(a=s.sample=this.samples[r.sample],e.volume=s.volume=a.volume):a=s.sample,r.note&&(s.effect===3||s.effect===5?r.note<s.period?(s.portaDir=1,s.portaPeriod=r.note):r.note>s.period?(s.portaDir=0,s.portaPeriod=r.note):s.portaPeriod=0:(s.enabled=1,s.vibratoPos=0,e.enabled=0,e.pointer=a.pointer,e.length=a.length,e.period=s.period=r.note)),s.effect){case 11:this.trackPos=s.param-1,this.jumpFlag^=1;break;case 12:e.volume=s.param,this.version===Ze&&(s.volume=s.param);break;case 13:this.jumpFlag^=1;break;case 14:this.mixer.filter.active=s.param^1;break;case 15:u=s.param,u<1?u=1:u>31&&(u=31),this.speed=u,this.tick=0;break;default:break}s.enabled&&(e.enabled=1),e.pointer=a.loopPtr,e.length=a.repeat,s=s.next}++this.tick===this.speed&&(this.tick=0,this.patternPos+=4,(this.patternPos===256||this.jumpFlag)&&(this.patternPos=this.jumpFlag=0,this.trackPos=++this.trackPos&127,this.trackPos===this.length&&(this.trackPos=this.restart,this.mixer.complete=1)))}}}),t.voices[0]=xi(0),t.voices[0].next=t.voices[1]=xi(1),t.voices[1].next=t.voices[2]=xi(2),t.voices[2].next=t.voices[3]=xi(3),t.track=new Uint16Array(128),Object.seal(t)}var Ni=1,Kr=2,Oo=3,Jr=4,Ze=5,Uo=[856,808,762,720,678,640,604,570,538,508,480,453,428,404,381,360,339,320,302,285,269,254,240,226,214,202,190,180,170,160,151,143,135,127,120,113,0],Zr=[0,24,49,74,97,120,141,161,180,197,212,224,235,244,250,253,255,253,250,244,235,224,212,197,180,161,141,120,97,74,49,24],Bo=Yr;function yi(i){return Object.create(null,{index:{value:i,writable:!0},next:{value:null,writable:!0},channel:{value:null,writable:!0},sample:{value:null,writable:!0},enabled:{value:0,writable:!0},loopCtr:{value:0,writable:!0},loopPos:{value:0,writable:!0},step:{value:0,writable:!0},period:{value:0,writable:!0},effect:{value:0,writable:!0},param:{value:0,writable:!0},volume:{value:0,writable:!0},pointer:{value:0,writable:!0},length:{value:0,writable:!0},loopPtr:{value:0,writable:!0},repeat:{value:0,writable:!0},finetune:{value:0,writable:!0},offset:{value:0,writable:!0},portaDir:{value:0,writable:!0},portaPeriod:{value:0,writable:!0},portaSpeed:{value:0,writable:!0},glissando:{value:0,writable:!0},tremoloParam:{value:0,writable:!0},tremoloPos:{value:0,writable:!0},tremoloWave:{value:0,writable:!0},vibratoParam:{value:0,writable:!0},vibratoPos:{value:0,writable:!0},vibratoWave:{value:0,writable:!0},funkPos:{value:0,writable:!0},funkSpeed:{value:0,writable:!0},funkWave:{value:0,writable:!0},initialize:{value:function(){this.channel=null,this.sample=null,this.enabled=0,this.loopCtr=0,this.loopPos=0,this.step=0,this.period=0,this.effect=0,this.param=0,this.volume=0,this.pointer=0,this.length=0,this.loopPtr=0,this.repeat=0,this.finetune=0,this.offset=0,this.portaDir=0,this.portaPeriod=0,this.portaSpeed=0,this.glissando=0,this.tremoloParam=0,this.tremoloPos=0,this.tremoloWave=0,this.vibratoParam=0,this.vibratoPos=0,this.vibratoWave=0,this.funkPos=0,this.funkSpeed=0,this.funkWave=0}}})}function Qr(){var i=mi();return Object.defineProperties(i,{step:{value:0,writable:!0}}),Object.seal(i)}function qo(){var i=_t();return Object.defineProperties(i,{finetune:{value:0,writable:!0},realLen:{value:0,writable:!0}}),Object.seal(i)}function ea(i){var t=gi(i);return Object.defineProperties(t,{id:{value:"PTPlayer"},track:{value:null,writable:!0},patterns:{value:[],writable:!0},samples:{value:[],writable:!0},length:{value:0,writable:!0},voices:{value:[],writable:!0},trackPos:{value:0,writable:!0},patternPos:{value:0,writable:!0},patternBreak:{value:0,writable:!0},patternDelay:{value:0,writable:!0},breakPos:{value:0,writable:!0},jumpFlag:{value:0,writable:!0},vibratoDepth:{value:0,writable:!0},force:{set:function(e){e<wi?e=wi:e>ji&&(e=ji),this.version=e,e<No?this.vibratoDepth=6:this.vibratoDepth=7}},initialize:{value:function(){var e=this.voices[0];for(this.tempo=125,this.speed=6,this.trackPos=0,this.patternPos=0,this.patternBreak=0,this.patternDelay=0,this.breakPos=0,this.jumpFlag=0,this.reset(),this.force=this.version;e;)e.initialize(),e.channel=this.mixer.channels[e.index],e.sample=this.samples[0],e=e.next}},loader:{value:function(e){var o=0,n,l,c,r,a,d=0,u;if(!(e.length<2106)&&(e.position=1080,l=e.readString(4),!(l!=="M.K."&&l!=="M!K!"))){for(e.position=0,this.title=e.readString(20),this.version=wi,e.position+=22,n=1;n<32;++n){if(u=e.readUshort(),!u){this.samples[n]=null,e.position+=28;continue}a=qo(),e.position-=24,a.name=e.readString(22),a.length=a.realLen=u<<1,e.position+=2,a.finetune=e.readUbyte()*37,a.volume=e.readUbyte(),a.loop=e.readUshort()<<1,a.repeat=e.readUshort()<<1,e.position+=22,a.pointer=d,d+=a.length,this.samples[n]=a}for(e.position=950,this.length=e.readUbyte(),e.position++,n=0;n<128;++n)u=e.readUbyte()<<8,this.track[n]=u,u>o&&(o=u);for(e.position=1084,o+=256,this.patterns.length=o,n=0;n<o;++n)r=Qr(),r.step=u=e.readUint(),r.note=u>>16&4095,r.effect=u>>8&15,r.sample=u>>24&240|u>>12&15,r.param=u&255,this.patterns[n]=r,(r.sample>31||!this.samples[r.sample])&&(r.sample=0),r.effect===15&&r.param>31&&(this.version=No),r.effect===8&&(this.version=ji);for(this.mixer.store(e,d),n=1;n<32;++n)if(a=this.samples[n],!!a)for(a.loop||a.repeat>4?(a.loopPtr=a.pointer+a.loop,a.length=a.loop+a.repeat):(a.loopPtr=this.mixer.memory.length,a.repeat=2),d=a.pointer+2,c=a.pointer;c<d;++c)this.mixer.memory[c]=0;a=qo(),a.pointer=a.loopPtr=this.mixer.memory.length,a.length=a.repeat=2,this.samples[0]=a}}},process:{value:function(){var e,o,n,l,c,r,a=this.voices[0];if(this.tick)this.effects();else if(this.patternDelay)this.effects();else{for(n=this.track[this.trackPos]+this.patternPos;a;){if(e=a.channel,a.enabled=0,a.step||(e.period=a.period),l=this.patterns[n+a.index],a.step=l.step,a.effect=l.effect,a.param=l.param,l.sample?(c=a.sample=this.samples[l.sample],a.pointer=c.pointer,a.length=c.length,a.loopPtr=a.funkWave=c.loopPtr,a.repeat=c.repeat,a.finetune=c.finetune,e.volume=a.volume=c.volume):c=a.sample,l.note)if((a.step&4080)===3664)a.finetune=(a.param&15)*37;else if(a.effect===3||a.effect===5)if(l.note===a.period)a.portaPeriod=0;else{for(o=a.finetune,r=o+37;o<r&&!(l.note>=je[o]);++o);o===r&&r--,o>0&&(r=a.finetune/37>>0&8,r&&o--),a.portaPeriod=je[o],a.portaDir=l.note>a.portaPeriod?0:1}else a.effect===9&&this.moreEffects(a);else{this.moreEffects(a),a=a.next;continue}for(o=0;o<37&&!(l.note>=je[o]);++o);if(a.period=je[a.finetune+o],(a.step&4080)===3792){a.funkSpeed&&this.updateFunk(a),this.extended(a),a=a.next;continue}a.vibratoWave<4&&(a.vibratoPos=0),a.tremoloWave<4&&(a.tremoloPos=0),e.enabled=0,e.pointer=a.pointer,e.length=a.length,e.period=a.period,a.enabled=1,this.moreEffects(a),a=a.next}for(a=this.voices[0];a;)e=a.channel,a.enabled&&(e.enabled=1),e.pointer=a.loopPtr,e.length=a.repeat,a=a.next}++this.tick===this.speed&&(this.tick=0,this.patternPos+=4,this.patternDelay&&--this.patternDelay&&(this.patternPos-=4),this.patternBreak&&(this.patternBreak=0,this.patternPos=this.breakPos,this.breakPos=0),(this.patternPos===256||this.jumpFlag)&&(this.patternPos=this.breakPos,this.breakPos=0,this.jumpFlag=0,++this.trackPos===this.length&&(this.trackPos=0,this.mixer.complete=1)))}},effects:{value:function(){for(var e,o,n,l,c,r=this.voices[0],a;r;){if(e=r.channel,r.funkSpeed&&this.updateFunk(r),(r.step&4095)===0){e.period=r.period,r=r.next;continue}switch(r.effect){case 0:if(c=this.tick%3,!c){e.period=r.period,r=r.next;continue}for(c===1?c=r.param>>4:c=r.param&15,o=r.finetune,n=o+37;o<n;++o)if(r.period>=je[o]){e.period=je[o+c];break}break;case 1:r.period-=r.param,r.period<113&&(r.period=113),e.period=r.period;break;case 2:r.period+=r.param,r.period>856&&(r.period=856),e.period=r.period;break;case 3:case 5:if(r.effect===5?l=1:(r.portaSpeed=r.param,r.param=0),r.portaPeriod)if(r.portaDir?(r.period-=r.portaSpeed,r.period<=r.portaPeriod&&(r.period=r.portaPeriod,r.portaPeriod=0)):(r.period+=r.portaSpeed,r.period>=r.portaPeriod&&(r.period=r.portaPeriod,r.portaPeriod=0)),r.glissando){for(o=r.finetune,c=o+37;o<c&&!(r.period>=je[o]);++o);o===c&&o--,e.period=je[o]}else e.period=r.period;break;case 4:case 6:r.effect===6?l=1:r.param&&(c=r.param&15,c&&(r.vibratoParam=r.vibratoParam&240|c),c=r.param&240,c&&(r.vibratoParam=r.vibratoParam&15|c)),n=r.vibratoPos>>2&31,a=r.vibratoWave&3,a?(c=255,n<<=3,a===1&&(r.vibratoPos>127?c-=n:c=n)):c=jo[n],c=(r.vibratoParam&15)*c>>this.vibratoDepth,r.vibratoPos>127?e.period=r.period-c:e.period=r.period+c,c=r.vibratoParam>>2&60,r.vibratoPos=r.vibratoPos+c&255;break;case 7:e.period=r.period,r.param&&(c=r.param&15,c&&(r.tremoloParam=r.tremoloParam&240|c),c=r.param&240,c&&(r.tremoloParam=r.tremoloParam&15|c)),n=r.tremoloPos>>2&31,a=r.tremoloWave&3,a?(c=255,n<<=3,a===1&&(r.tremoloPos>127?c-=n:c=n)):c=jo[n],c=(r.tremoloParam&15)*c>>6,r.tremoloPos>127?e.volume=r.volume-c:e.volume=r.volume+c,c=r.tremoloParam>>2&60,r.tremoloPos=r.tremoloPos+c&255;break;case 10:l=1;break;case 14:this.extended(r);break;default:break}l&&(l=0,c=r.param>>4,c?r.volume+=c:r.volume-=r.param&15,r.volume<0?r.volume=0:r.volume>64&&(r.volume=64),e.volume=r.volume),r=r.next}}},moreEffects:{value:function(e){var o=e.channel,n;switch(e.funkSpeed&&this.updateFunk(e),e.effect){case 9:e.param&&(e.offset=e.param),n=e.offset<<8,n>=e.length?e.length=2:(e.pointer+=n,e.length-=n);break;case 11:this.trackPos=e.param-1,this.breakPos=0,this.jumpFlag=1;break;case 12:e.volume=e.param,e.volume>64&&(e.volume=64),o.volume=e.volume;break;case 13:this.breakPos=(e.param>>4)*10+(e.param&15),this.breakPos>63?this.breakPos=0:this.breakPos<<=2,this.jumpFlag=1;break;case 14:this.extended(e);break;case 15:if(!e.param)return;e.param<32?this.speed=e.param:this.mixer.samplesTick=this.sampleRate*2.5/e.param>>0,this.tick=0;break;default:break}}},extended:{value:function(e){var o=e.channel,n=e.param>>4,l,c,r,a=e.param&15;switch(n){case 0:this.mixer.filter.active=a;break;case 1:if(this.tick)return;e.period-=a,e.period<113&&(e.period=113),o.period=e.period;break;case 2:if(this.tick)return;e.period+=a,e.period>856&&(e.period=856),o.period=e.period;break;case 3:e.glissando=a;break;case 4:e.vibratoWave=a;break;case 5:e.finetune=a*37;break;case 6:if(this.tick)return;a?(e.loopCtr?e.loopCtr--:e.loopCtr=a,e.loopCtr&&(this.breakPos=e.loopPos<<2,this.patternBreak=1)):e.loopPos=this.patternPos>>2;break;case 7:e.tremoloWave=a;break;case 8:for(c=e.length-2,r=this.mixer.memory,l=e.loopPtr;l<c;)r[l]=(r[l]+r[++l])*.5;r[++l]=(r[l]+r[0])*.5;break;case 9:if(this.tick||!a||!e.period||this.tick%a)return;o.enabled=0,o.pointer=e.pointer,o.length=e.length,o.delay=30,o.enabled=1,o.pointer=e.loopPtr,o.length=e.repeat,o.period=e.period;break;case 10:if(this.tick)return;e.volume+=a,e.volume>64&&(e.volume=64),o.volume=e.volume;break;case 11:if(this.tick)return;e.volume-=a,e.volume<0&&(e.volume=0),o.volume=e.volume;break;case 12:this.tick===a&&(o.volume=e.volume=0);break;case 13:if(this.tick!==a||!e.period)return;o.enabled=0,o.pointer=e.pointer,o.length=e.length,o.delay=30,o.enabled=1,o.pointer=e.loopPtr,o.length=e.repeat,o.period=e.period;break;case 14:if(this.tick||this.patternDelay)return;this.patternDelay=++a;break;case 15:if(this.tick)return;e.funkSpeed=a,a&&this.updateFunk(e);break;default:break}}},updateFunk:{value:function(e){var o=e.channel,n,l,c=ta[e.funkSpeed];e.funkPos+=c,!(e.funkPos<128)&&(e.funkPos=0,this.version===wi?(n=e.pointer+e.sample.realLen-e.repeat,l=e.funkWave+e.repeat,l>n&&(l=e.loopPtr,o.length=e.repeat),o.pointer=e.funkWave=l):(n=e.loopPtr+e.repeat,l=e.funkWave+1,l>=n&&(l=e.loopPtr),this.mixer.memory[l]=-this.mixer.memory[l]))}}}),t.voices[0]=yi(0),t.voices[0].next=t.voices[1]=yi(1),t.voices[1].next=t.voices[2]=yi(2),t.voices[2].next=t.voices[3]=yi(3),t.track=new Uint16Array(128),Object.seal(t)}var wi=1,No=2,ji=3,je=[856,808,762,720,678,640,604,570,538,508,480,453,428,404,381,360,339,320,302,285,269,254,240,226,214,202,190,180,170,160,151,143,135,127,120,113,0,850,802,757,715,674,637,601,567,535,505,477,450,425,401,379,357,337,318,300,284,268,253,239,225,213,201,189,179,169,159,150,142,134,126,119,113,0,844,796,752,709,670,632,597,563,532,502,474,447,422,398,376,355,335,316,298,282,266,251,237,224,211,199,188,177,167,158,149,141,133,125,118,112,0,838,791,746,704,665,628,592,559,528,498,470,444,419,395,373,352,332,314,296,280,264,249,235,222,209,198,187,176,166,157,148,140,132,125,118,111,0,832,785,741,699,660,623,588,555,524,495,467,441,416,392,370,350,330,312,294,278,262,247,233,220,208,196,185,175,165,156,147,139,131,124,117,110,0,826,779,736,694,655,619,584,551,520,491,463,437,413,390,368,347,328,309,292,276,260,245,232,219,206,195,184,174,164,155,146,138,130,123,116,109,0,820,774,730,689,651,614,580,547,516,487,460,434,410,387,365,345,325,307,290,274,258,244,230,217,205,193,183,172,163,154,145,137,129,122,115,109,0,814,768,725,684,646,610,575,543,513,484,457,431,407,384,363,342,323,305,288,272,256,242,228,216,204,192,181,171,161,152,144,136,128,121,114,108,0,907,856,808,762,720,678,640,604,570,538,508,480,453,428,404,381,360,339,320,302,285,269,254,240,226,214,202,190,180,170,160,151,143,135,127,120,0,900,850,802,757,715,675,636,601,567,535,505,477,450,425,401,379,357,337,318,300,284,268,253,238,225,212,200,189,179,169,159,150,142,134,126,119,0,894,844,796,752,709,670,632,597,563,532,502,474,447,422,398,376,355,335,316,298,282,266,251,237,223,211,199,188,177,167,158,149,141,133,125,118,0,887,838,791,746,704,665,628,592,559,528,498,470,444,419,395,373,352,332,314,296,280,264,249,235,222,209,198,187,176,166,157,148,140,132,125,118,0,881,832,785,741,699,660,623,588,555,524,494,467,441,416,392,370,350,330,312,294,278,262,247,233,220,208,196,185,175,165,156,147,139,131,123,117,0,875,826,779,736,694,655,619,584,551,520,491,463,437,413,390,368,347,328,309,292,276,260,245,232,219,206,195,184,174,164,155,146,138,130,123,116,0,868,820,774,730,689,651,614,580,547,516,487,460,434,410,387,365,345,325,307,290,274,258,244,230,217,205,193,183,172,163,154,145,137,129,122,115,0,862,814,768,725,684,646,610,575,543,513,484,457,431,407,384,363,342,323,305,288,272,256,242,228,216,203,192,181,171,161,152,144,136,128,121,114,0],jo=[0,24,49,74,97,120,141,161,180,197,212,224,235,244,250,253,255,253,250,244,235,224,212,197,180,161,141,120,97,74,49,24],ta=[0,5,6,7,8,10,11,13,16,19,22,26,32,43,64,128],$o=ea;function ia(){var i=Object.create(null,{player:{value:null,writable:!0},index:{value:0,writable:!0},amiga:{value:null,writable:!0},mixer:{value:null,writable:!0},tracker:{get:function(){return this.player?Ho[this.index+this.player.version]:Ho[0]}},load:{value:function(t){var e,o;if(t.view||(t=zi(t)),t.endian=1,t.position=0,t.readUint()===67324752&&window.neoart.Unzip,!t)return null;if(this.player&&this.player.id!=="STPlayer"&&(this.player.load(t),this.player.version))return this.player;if(t.length>336&&(t.position=38,e=t.readString(20),(e==="FastTracker v2.00   "||e==="FastTracker v 2.00  "||e==="Sk@le Tracker"||e==="MadTracker 2.0"||e==="MilkyTracker        "||e==="DigiBooster Pro 2.18"||e.indexOf("OpenMPT")!==-1)&&(this.player=zo(this.mixer),this.player.load(t),this.player.version)))return this.index=ua,this.player;if(t.endian=0,t.length>2105){if(t.position=1080,e=t.readString(4),e==="M.K."||e==="FLT4"){if(this.player=Bo(this.amiga),this.player.load(t),this.player.version)return this.index=ra,this.player}else if(e==="FEST"&&(this.player=window.neoart.HMPlayer(this.amiga),this.player.load(t),this.player.version))return this.index=na,this.player}return t.length>2105&&(t.position=1080,e=t.readString(4),(e==="M.K."||e==="M!K!")&&(this.player=$o(this.amiga),this.player.load(t),this.player.version))?(this.index=aa,this.player):t.length>5220&&(this.player=window.neoart.S1Player(this.amiga),this.player.load(t),this.player.version)?(this.index=la,this.player):(t.position=0,o=t.readUshort(),t.position=0,e=t.readString(4),(e==="COSO"||o===24576||o===24578||o===24590||o===24598)&&(this.player=window.neoart.JHPlayer(this.amiga),this.player.load(t),this.player.version)?(this.index=ca,this.player):(t.position=0,o=t.readUshort(),this.player=window.neoart.DWPlayer(this.amiga),this.player.load(t),this.player.version?(this.index=sa,this.player):(t.position=0,o=t.readUshort(),o===24576&&(this.player=window.neoart.RHPlayer(this.amiga),this.player.load(t),this.player.version)?(this.index=fa,this.player):t.length>1625&&(this.player=window.neoart.STPlayer(this.amiga),this.player.load(t),this.player.version)?(this.index=oa,this.player):(t.clear(),this.index=0,this.player=null))))}}});return i.amiga=Oi(),Object.seal(i)}var oa=0,ra=4,aa=9,na=12,la=26,sa=28,ca=30,fa=32,ua=33,Ho=["Unknown Format","Ultimate SoundTracker","D.O.C. SoundTracker 9","Master SoundTracker","D.O.C. SoundTracker 2.0/2.2","SoundTracker 2.3","SoundTracker 2.4","NoiseTracker 1.0","NoiseTracker 1.1","NoiseTracker 2.0","ProTracker 1.0","ProTracker 1.1/2.1","ProTracker 1.2/2.0","His Master's NoiseTracker","SoundFX 1.0/1.7","SoundFX 1.8","SoundFX 1.945","SoundFX 1.994/2.0","BP SoundMon V1","BP SoundMon V2","BP SoundMon V3","Delta Music 1.0","Delta Music 2.0","Digital Mugician","Digital Mugician 7 Voices","Future Composer 1.0/1.3","Future Composer 1.4","SidMon 1.0","SidMon 2.0","David Whittaker","FredEd","Jochen Hippel","Jochen Hippel COSO","Rob Hubbard","FastTracker II","Sk@leTracker","MadTracker 2.0","MilkyTracker","DigiBooster Pro 2.18","OpenMPT"],da=ia(),Xo=da;var ki=class{constructor(t={}){this.baseRawUrl="https://raw.githubusercontent.com/michioxd/keygen-music/master/",this.indexUrl=this.baseRawUrl+"index.json",this.trackList=[],this.history=[],this.maxHistory=50,this.historyCursor=-1,this.currentPlayer=null,this.isPlaying=!1,this.pollInterval=null,this._opId=0,this.onTrackChange=t.onTrackChange||(()=>{}),this.onError=t.onError||(()=>{}),this.hasFetchedIndex=!1,this.currentTrack=null}async init(){if(!this.hasFetchedIndex)try{let t=await fetch(this.indexUrl);if(!t.ok)throw new Error("Network response was not ok");let e=await t.json(),o=["xm","mod","s3m","it"];this.trackList=e.filter(n=>n.fileExtension&&o.includes(n.fileExtension.toLowerCase())),this.hasFetchedIndex=!0}catch(t){throw console.warn("[Jukebox] Offline or failed to fetch track index:",t.message),this.trackList=[],this.onError("NO INTERNET OR BLOCKED ... TRY AGAIN?"),t}}async playNext(t=null){this.stop();let e=++this._opId;try{if(!this.hasFetchedIndex&&(await this.init(),e!==this._opId))return;if(this.trackList.length===0){console.warn("[Jukebox] Track list is empty \u2014 no tracks to play.");return}let o=null;if(t&&typeof t=="object"){let{title:n,trackTitle:l,artist:c}=t,r=this.trackList.filter(a=>{let d=!c||a.artist&&a.artist.toLowerCase()===c.toLowerCase(),u=!n||a.title&&a.title.toLowerCase()===n.toLowerCase(),s=!l||a.trackTitle&&a.trackTitle.toLowerCase()===l.toLowerCase();return d&&u&&s});r.length===0?console.warn("[Jukebox] No matches for target object \u2014 playing random:",t):r.length>1&&console.warn(`[Jukebox] ${r.length} ambiguous matches for target object \u2014 using first. Refine your search:`,r),o=r[0]||null}else if(t&&typeof t=="string"){let n=this.trackList.filter(l=>l.title&&l.title.toLowerCase()===t.toLowerCase());n.length===0?console.warn("[Jukebox] No matches for target title string \u2014 playing random:",t):n.length>1&&console.warn(`[Jukebox] ${n.length} ambiguous matches for title string \u2014 using first:`,n),o=n[0]||null}if(!o&&!t&&this.historyCursor<this.history.length-1)this.historyCursor++,o=this.trackList[this.history[this.historyCursor]];else if(!o){let n=this.trackList.filter((r,a)=>!this.history.includes(a));n.length===0&&(this.history=[],this.historyCursor=-1);let l=n.length>0?n:this.trackList;o=l[Math.floor(Math.random()*l.length)];let c=this.trackList.indexOf(o);this.historyCursor<this.history.length-1&&(this.history=this.history.slice(0,this.historyCursor+1)),this.history.push(c),this.history.length>this.maxHistory&&this.history.shift(),this.historyCursor=this.history.length-1}await this._playTrack(o,e)}catch(o){console.warn("[Jukebox] Track fetch failed \u2014 network issue?",o.message),this.onError("NO INTERNET OR BLOCKED ... TRY AGAIN?")}}async playPrevious(){if(this.historyCursor>0){this.stop();let t=++this._opId;this.historyCursor--;let e=this.trackList[this.history[this.historyCursor]];try{await this._playTrack(e,t)}catch(o){console.warn("[Jukebox] Previous track fetch failed:",o.message),this.onError("NO INTERNET OR BLOCKED ... TRY AGAIN?")}}}async _playTrack(t,e){let o=t.path.split("/").map(a=>encodeURIComponent(a)).join("/"),n=this.baseRawUrl+o,l=await fetch(n);if(!l.ok)throw new Error("Failed to fetch audio file");if(e!==this._opId)return;let c=await l.arrayBuffer();if(e!==this._opId)return;let r=null;try{r=Xo.load(c)}catch(a){console.warn(`[Jukebox] Unsupported format for "${t.title}" \u2014 skipping:`,a.message),e===this._opId&&setTimeout(()=>this.playNext(),100);return}e===this._opId&&(this.currentPlayer=r,this.currentPlayer?(this.currentTrack=t,typeof this.currentPlayer.loopSong<"u"&&(this.currentPlayer.loopSong=1),this.currentPlayer.play(),this.isPlaying=!0,this.onTrackChange(t),this.setupCompletionPolling()):setTimeout(()=>this.playNext(),100))}setupCompletionPolling(){this.pollInterval&&clearInterval(this.pollInterval),this.pollInterval=setInterval(()=>{if(!this.currentPlayer)return this.stopPolling();let t=!1;this.currentPlayer.amiga&&this.currentPlayer.amiga.playing===!1&&(t=!0),this.currentPlayer.mixer&&this.currentPlayer.mixer.playing===!1&&(t=!0),this.currentPlayer.stopped&&(t=!0),this.currentPlayer.playing===!1&&(t=!0),t&&this.playNext()},1e3)}stopPolling(){this.pollInterval&&(clearInterval(this.pollInterval),this.pollInterval=null)}stop(){if(this._opId++,this.stopPolling(),this.isPlaying=!1,this.currentPlayer){try{this.currentPlayer.stop()}catch{}this.currentPlayer=null}}};function Go(i,t,e){let o=document.getElementById("afx-audio-toggle");if(!o)return;let n=document.getElementById("afx-bgm-status");o.checked&&e.classList.add("afx-music-playing"),i.jukebox=new ki({onTrackChange:r=>{let a=`NOW PLAYING: ${r.artist} - ${r.title} - ${r.trackTitle}`;t.marquee=a,i.marquee&&i.marquee.setText(a)},onError:r=>{t.marquee=r,i.marquee&&i.marquee.setText(r)}}),o.addEventListener("change",r=>{let a=r.target.checked,d=Mt();if(a){e.classList.add("afx-bgm-active"),e.classList.add("afx-music-playing"),n.innerHTML=d?"\u{1F50A}":"\u{1F50A} BGM: ON";let u=window.AudioContext||window.webkitAudioContext;u&&(window.neoart=window.neoart||{},window.neoart.audioContext||(window.neoart.audioContext=new u)),window.neoart.audioContext&&window.neoart.audioContext.state==="suspended"&&window.neoart.audioContext.resume();let s=localStorage.getItem("ankifx_preferred_effect")||t.defaultEffect||"geometry",h=t.trackTitle||i.EFFECT_SONG_MAP[s]||null;i.jukebox.playNext(h)}else e.classList.remove("afx-bgm-active"),e.classList.remove("afx-music-playing"),n.innerHTML=d?"\u{1F507}":"\u{1F507} BGM: OFF",i.jukebox.stop(),t.marquee=i.defaultMarqueeText,i.marquee&&i.marquee.setText(i.defaultMarqueeText)});let l=document.getElementById("afx-btn-back"),c=document.getElementById("afx-btn-skip");l&&l.addEventListener("click",r=>{r.stopPropagation(),i.jukebox&&i.jukebox.isPlaying&&i.jukebox.playPrevious()}),c&&c.addEventListener("click",r=>{r.stopPropagation(),i.jukebox&&i.jukebox.isPlaying&&i.jukebox.playNext()})}function Vo(i,t,e,o){let n=document.getElementById("afx-effect-selector");n&&n.addEventListener("change",l=>{let c=l.target.value;if(localStorage.setItem("ankifx_preferred_effect",c),Object.values(ie).forEach(r=>r.stop()),i.ctx2D&&i.ctx2D.clearRect(0,0,i.width,i.height),i.glContext&&(i.glContext.clearColor(0,0,0,0),i.glContext.clear(i.glContext.COLOR_BUFFER_BIT)),t.defaultEffect=c,c==="debug"?e.classList.add("afx-debug-active"):e.classList.remove("afx-debug-active"),Dt(i,t,o,t.marqueePosition,c),i.jukebox&&i.jukebox.isPlaying){let r=t.trackTitle||i.EFFECT_SONG_MAP[c]||null,a=i.jukebox.currentTrack,d=!1;r&&(typeof r=="string"?d=!a||a.title.toLowerCase()!==r.toLowerCase():d=!a||r.title&&a.title.toLowerCase()!==r.title.toLowerCase()||r.trackTitle&&a.trackTitle.toLowerCase()!==r.trackTitle.toLowerCase()||r.artist&&(a.artist||"").toLowerCase()!==r.artist.toLowerCase()),d&&i.jukebox.playNext(r)}})}function Wo(i,t,e){let o=document.createElement("div");o.id="ankifx-overlay",t.debug&&o.classList.add("afx-debug-active");let n=window.innerWidth||document.documentElement.clientWidth||800,l=n<480?.65:n<768?.8:1,c=Math.max(55,Math.ceil(85*l));po()&&(t.marqueePosition==="top"?o.style.paddingTop=`calc(1rem + ${c}px)`:o.style.paddingBottom=`calc(1rem + ${c}px)`);let r=at(),a=Mt(),d=a?"\u{1F4DC} ":"\u{1F4DC} TEXT: ",u=a?"":" BGM: ",s=a?d.trim():r?`${d}ON`:`${d}OFF`,h=a?"\u{1F507}":`\u{1F507}${u}OFF`,b=a?"\u{1F3A8} ":"[ Effect: ",m=a?"":" ]",f=Object.values(ie).filter(F=>F.id!=="debug"||t.debug).map(F=>`
            <option value="${F.id}" ${e===F.id?"selected":""}>
                ${b}${F.name}${m}
            </option>
        `).join(""),g=`
        <div id="afx-bottom-dock">
            <div class="afx-control-group-left">
                <div class="afx-control-row">
                    <label class="afx-toggle"><input type="checkbox" id="afx-text-toggle" ${r?"checked":""}><span class="afx-slider"></span></label>
                    <span id="afx-text-status">${s}</span>
                </div>
                <div id="afx-bgm-container" class="afx-control-row">
                    <label class="afx-toggle"><input type="checkbox" id="afx-audio-toggle"><span class="afx-slider"></span></label>
                    <span id="afx-bgm-status">${h}</span>
                </div>
            </div>
            <div class="afx-control-group-right">
                <div id="afx-effect-controls-container"></div>
                <div id="afx-effect-selector-container" class="afx-control-row afx-effect-selector-container">
                    <select id="afx-effect-selector" class="afx-select">
                        ${f}
                    </select>
                </div>
            </div>
        </div>
    `,p=!1;try{p=localStorage.getItem(`ankifx_agreed_${t.deckTitle}`)==="true"}catch{}let x=t.termsText&&typeof t.termsText=="string"&&t.termsText.trim()!==""&&!p;x&&(o.innerHTML=`
            <div class="afx-dialog">
                <div class="afx-terms">
                    <h3>${t.deckTitle}</h3>
                    ${t.deckAuthor?`<h4 class="afx-deck-author">by ${t.deckAuthor}</h4>`:""}
                    ${t.termsText}
                </div>
                <div class="afx-action-row">
                    <button id="afx-consent-btn" class="afx-btn" disabled>I AGREE</button>
                </div>
            </div>
        `);let y=document.createElement("div");for(y.innerHTML=g;y.firstChild;)o.appendChild(y.firstChild);let w=document.createElement("div");w.id="ankifx-background",document.body.appendChild(w),i.sharedGL=document.createElement("canvas"),i.sharedGL.id="afx-shared-gl",i.sharedGL.className="afx-shared-canvas",w.appendChild(i.sharedGL),i.shared2D=document.createElement("canvas"),i.shared2D.id="afx-shared-2d",i.shared2D.className="afx-shared-canvas",w.appendChild(i.shared2D),i.sharedMarquee=document.createElement("canvas"),i.sharedMarquee.id="afx-shared-marquee",i.sharedMarquee.className="afx-shared-canvas afx-shared-marquee-canvas",w.appendChild(i.sharedMarquee),i.glContext=i.sharedGL.getContext("webgl",{alpha:!1,antialias:!1}),i.ctx2D=i.shared2D.getContext("2d"),i.ctxMarquee=i.sharedMarquee.getContext("2d"),document.body.appendChild(o);let k=document.createElement("div");k.id="afx-top-dock";let P=document.createElement("div");P.className="afx-top-group-left",P.id="afx-top-group-left";let v=document.createElement("div");v.className="afx-top-group-right",v.id="afx-top-group-right";let E=document.createElement("button");E.id="afx-btn-back",E.className="afx-playback-btn",E.textContent="\u23EE\uFE0F";let C=document.createElement("button");if(C.id="afx-btn-skip",C.className="afx-playback-btn",C.textContent="\u23ED\uFE0F",P.appendChild(E),v.appendChild(C),t.debug){let F=document.createElement("div");F.id="afx-global-fps",F.className="afx-global-fps",F.textContent="FPS: --",P.appendChild(F)}k.appendChild(P),k.appendChild(v),o.appendChild(k);let A=F=>{let N=o.classList.contains("afx-agreed-state"),X=F.target.closest("button, input, select, .afx-slider, .afx-toggle, .afx-playback-btn, select option");N?X&&F.stopPropagation():F.stopPropagation()};["touchstart","touchend","mousedown","mouseup","pointerdown","pointerup","click"].forEach(F=>{o.addEventListener(F,A,{passive:!1})});let q=document.getElementById("afx-consent-btn");x&&q?Eo(i,t,o,q):window.AnkiFX.agree(o,t.deckTitle),Go(i,t,o);let U=document.getElementById("afx-text-toggle");if(U){let F=document.getElementById("afx-text-status");U.addEventListener("change",N=>{let X=N.target.checked,G=Mt();localStorage.setItem("ankifx_marquee_enabled",X);let V=G?"\u{1F4DC} ":"\u{1F4DC} TEXT: ";F.textContent=G?V.trim():X?`${V}ON`:`${V}OFF`,i.marquee&&(i.marquee.enabled=X)})}return Vo(i,t,o,w),{overlay:o,background:w}}var Yo=["ankifx-overlay","ankifx-background","afx-btn-back","afx-btn-skip","afx-bottom-dock","afx-top-dock"],T={marquee:null,jukebox:null,sharedGL:null,shared2D:null,sharedMarquee:null,glContext:null,ctx2D:null,ctxMarquee:null,currentEffectId:null,dpr:1,width:0,height:0,marqueeInterval:null,defaultMarqueeText:null,EFFECT_SONG_MAP:{},_layoutHandler:null,_resizeTimeout:null,_resizeInterval:null,observer:null,dockObserver:null,initialized:!1};function ha(i={}){console.log(`[AnkiFX] Init \u2192 v${_e.version} (${_e.source})`);let t=mo(i);if(document.getElementById("ankifx-overlay")&&bo(T,t)){T.initialized=!0;return}document.documentElement.classList.remove("afx-scroll-lock"),document.documentElement.classList.remove("afx-agreed"),Yo.forEach(n=>{let l=document.getElementById(n);l&&l.remove()}),T.defaultMarqueeText=t.marquee,T.EFFECT_SONG_MAP={},Object.entries(ie).forEach(([n,l])=>{l&&l.preferredTrack&&(T.EFFECT_SONG_MAP[n]=l.preferredTrack)}),Ko();let e=go(t),{background:o}=Wo(T,t,e);wo(T),yo(T),Ne(T),xo(T),T.marquee?(T.marquee.setText(t.marquee),T.marquee.setPosition(t.marqueePosition)):(T.marquee=new si(t.marquee,t.marqueePosition),Ri(T)),Dt(T,t,o,t.marqueePosition,e),T.marquee&&(T.marquee.enabled=at()),T.initialized=!0,ko(T),ui()}function Ko(){if(document.getElementById("ankifx-styles"))return;let i=document.createElement("style");i.id="ankifx-styles",i.textContent=ho,document.head.appendChild(i)}function pa(i,t){if(i.classList.add("afx-agreed-state"),document.documentElement.classList.add("afx-agreed"),document.documentElement.classList.remove("afx-scroll-lock"),t)try{localStorage.setItem(`ankifx_agreed_${t}`,"true")}catch{}ui()}function ma(){T.currentEffectId&&ie[T.currentEffectId]?.stop&&ie[T.currentEffectId].stop(),T.jukebox&&(T.jukebox.stop(),T.jukebox=null),T.marqueeInterval&&(cancelAnimationFrame(T.marqueeInterval),T.marqueeInterval=null),T.marquee=null;let i=document.getElementById("_flag"),t=document.getElementById("_mark");i&&document.body.appendChild(i),t&&document.body.appendChild(t),Yo.forEach(o=>{let n=document.getElementById(o);n&&n.remove()});let e=document.getElementById("ankifx-styles");e&&e.remove(),document.documentElement.style.removeProperty("--afx-viewport-height"),document.documentElement.style.removeProperty("--afx-dock-height"),document.documentElement.classList.remove("afx-scroll-lock"),document.documentElement.classList.remove("afx-agreed"),Array.from(document.documentElement.classList).forEach(o=>{o.startsWith("afx-effect-")&&document.documentElement.classList.remove(o)}),window.AnkiFX_Config=null,T.observer&&(T.observer.disconnect(),T.observer=null),T.dockObserver&&(T.dockObserver.disconnect(),T.dockObserver=null),T._layoutHandler&&(window.removeEventListener("orientationchange",T._layoutHandler),window.removeEventListener("resize",T._layoutHandler),T._layoutHandler=null),T._resizeTimeout&&(clearTimeout(T._resizeTimeout),T._resizeTimeout=null),T._resizeInterval&&(clearInterval(T._resizeInterval),T._resizeInterval=null),T.currentEffectId=null,T.initialized=!1,console.log("[AnkiFX] Destroyed.")}var Ei="local";try{let i=typeof __ankifx_script_src=="string"?__ankifx_script_src:"";if(!i){let e=(new Error().stack||"").match(/(https?:\/\/[^\s)\n:]+|file:\/\/[^\s)\n:]+)/g);if(e&&e.length>0){for(let o=0;o<e.length;o++)if(e[o].includes("ankifx")){i=e[o];break}}}i&&(i.includes("cdn.jsdelivr.net")||i.includes("github")||i.includes("rawgit")||i.includes("githack")?Ei="remote":Ei="local")}catch{Ei="detection-failed"}var ga="1.0.0-8497f46",ba="2026-06-06T14:53:34.336Z",va=Ei,_e={init:ha,destroy:ma,agree:pa,injectCSS:Ko,handleResize:()=>Ne(T),startEffect:(i,t,e,o)=>Dt(T,i,t,e,o),startMarqueeLoop:()=>Ri(T),renderEffectControls:At,setControlValue:vo,get version(){return ga},get buildDate(){return ba},get source(){return va},get marquee(){return T.marquee},set marquee(i){T.marquee=i},get jukebox(){return T.jukebox},set jukebox(i){T.jukebox=i},get currentEffectId(){return T.currentEffectId},get defaultMarqueeText(){return T.defaultMarqueeText},get EFFECT_SONG_MAP(){return T.EFFECT_SONG_MAP},get initialized(){return!!T.initialized}};window.AnkiFX_Eval_History=window.AnkiFX_Eval_History||[];var Qe=window.AnkiFX,Si=_e.version,Pi=Qe&&Qe.version,xa=Qe&&Qe.initialized,Jo=!1,Zo="",ya=!Qe||wa(Si,Pi);if(ya)if(xa){console.info(`[AnkiFX] Newer engine version v${Si} (${_e.source}) loaded late. Upgrading and replacing active engine v${Pi} (${Qe.source})...`);try{Qe.destroy()}catch(i){console.error(`[AnkiFX] Error destroying old engine: ${i.message}`)}window.AnkiFX=_e;try{window.AnkiFX.init(window.AnkiFX_Config)}catch(i){console.error(`[AnkiFX] Error initializing upgraded engine: ${i.message}`)}}else window.AnkiFX=_e;else Jo=!0,Zo=`ignored (older or equal version: active=${Pi}, incoming=${Si})`,console.info(`[AnkiFX] Incoming engine v${Si} is not newer than active engine v${Pi}. Ignoring.`);window.AnkiFX_Eval_History.push({source:_e.source,version:_e.version,buildDate:_e.buildDate,time:new Date().toLocaleTimeString(),status:Jo?Zo:"active"});function wa(i,t){let e=l=>String(l).split("-")[0],o=e(i).split(".").map(Number),n=e(t).split(".").map(Number);for(let l=0;l<3;l++){if((o[l]||0)>(n[l]||0))return!0;if((o[l]||0)<(n[l]||0))return!1}return!1}})();
