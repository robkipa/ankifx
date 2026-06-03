var __ankifx_script_src=(document.currentScript&&document.currentScript.src)||"";
(()=>{var vi=[],Re=null,Oi=60,Ui=1.5,Bi={id:"aurora",name:"Aurora",run:Wo,stop:Ko,drawOverlay:Yo,onResize:(i,t)=>{let e=getComputedStyle(document.documentElement),o=parseInt(e.getPropertyValue("--io-header"))||0,a=t-o;if(Pe=i/8,Fe=a/8,Re){let l=Oi/8,f=Math.ceil(Pe/l),r=Math.ceil(Fe/(l*Ui));Re.w=f,Re.h=r,Re.build()}ee&&(ee.style.width=Pe+"px",ee.style.height=Fe+"px",ee.style.position="absolute",ee.style.top=o+"px",ee.style.left="0",ee.style.transform="scale(8)",ee.style.transformOrigin="top left")},marqueeFont:{color:"#E0FFFF",shadowColor:"rgba(0,128,128,0.8)",shadowBlur:10}},lt=null,Pe,Fe,ee=null,Go=0,nt=0,Qe={x:-1e3,y:-1e3},Dt=class{constructor(t,e){this.x=t||0,this.y=e||0}setAngle(t){let e=this.getLength()||1;this.x=Math.cos(t)*e,this.y=Math.sin(t)*e}setLength(t){let e=Math.atan2(this.y,this.x);this.x=Math.cos(e)*t,this.y=Math.sin(e)*t}getLength(){return Math.sqrt(this.x*this.x+this.y*this.y)}addTo(t){this.x+=t.x,this.y+=t.y}},zi=(()=>{let i=new Uint8Array(512),t=new Uint8Array(256).map(()=>Math.random()*256);for(let a=0;a<512;a++)i[a]=t[a&255];let e=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]];function o(a,l,f,r){return a[0]*l+a[1]*f+a[2]*r}return{simplex3:(a,l,f)=>{let r,n,d,u,s=.3333333333333333,h=1/6,b=(a+l+f)*s,m=Math.floor(a+b),c=Math.floor(l+b),g=Math.floor(f+b),p=(m+c+g)*h,y=a-m+p,v=l-c+p,C=f-g+p,w,E,x,k,L,T;y>=v?v>=C?(w=1,E=0,x=0,k=1,L=1,T=0):y>=C?(w=1,E=0,x=0,k=1,L=0,T=1):(w=0,E=0,x=1,k=1,L=0,T=1):v<C?(w=0,E=0,x=1,k=0,L=1,T=1):y<C?(w=0,E=1,x=0,k=0,L=1,T=1):(w=0,E=1,x=0,k=1,L=1,T=0);let U=y-w+h,N=v-E+h,P=C-x+h,q=y-k+2*h,$=v-L+2*h,G=C-T+2*h,V=y-1+3*h,Q=v-1+3*h,K=C-1+3*h,M=m&255,_=c&255,X=g&255,re=.6-y*y-v*v-C*C;re<0?r=0:(re*=re,r=re*re*o(e[i[M+i[_+i[X]]]%12],y,v,C));let ue=.6-U*U-N*N-P*P;ue<0?n=0:(ue*=ue,n=ue*ue*o(e[i[M+w+i[_+E+i[X+x]]]%12],U,N,P));let pe=.6-q*q-$*$-G*G;pe<0?d=0:(pe*=pe,d=pe*pe*o(e[i[M+k+i[_+L+i[X+T]]]%12],q,$,G));let de=.6-V*V-Q*Q-K*K;return de<0?u=0:(de*=de,u=de*de*o(e[i[M+1+i[_+1+i[X+1]]]%12],V,Q,K)),32*(r+n+d+u)}}})(),yi=class{constructor(t,e,o={}){this.settings={frequency:.1,...o},this.w=t,this.h=e,this.time=0,this.build()}build(){this.cols=Math.ceil(this.w),this.rows=Math.ceil(this.h),this.field=new Array(this.cols);for(let t=0;t<this.cols;t++){this.field[t]=new Array(this.rows);for(let e=0;e<this.rows;e++)this.field[t][e]=new Dt(0,0)}}update(t){this.time+=t;let e=this.time*this.settings.frequency/1e3;for(let o=0;o<this.field.length;o++)for(let a=0;a<this.field[o].length;a++){let l=zi.simplex3(o/20,a/20,e)*Math.PI*2,f=zi.simplex3(o/10+4e4,a/10+4e4,e);this.field[o][a].setAngle(l),this.field[o][a].setLength(f),typeof this.manipulateVector=="function"&&this.manipulateVector(this.field[o][a],o,a),typeof this.onDraw=="function"&&this.onDraw(this.field[o][a],o,a)}}};function Vo(){vi=[];let i=150;for(let t=0;t<i;t++)vi.push({x:Math.random(),y:Math.random(),size:.5+Math.random()*1.3,opacity:.15+Math.random()*.75,blinkSpeed:.001+Math.random()*.002,blinkOffset:Math.random()*Math.PI*2})}function et(i){i.touches&&i.touches[0]?(Qe.x=i.touches[0].clientX,Qe.y=i.touches[0].clientY):(Qe.x=i.clientX,Qe.y=i.clientY)}function Wo(i,t){let e=i.ctx2d;ee=i.canvas2D,ee.classList.add("afx-aurora-active");let o=i.topInset||0,a=i.visibleHeight||i.height;Pe=i.width/8,Fe=a/8,ee.width=Pe*i.dpr,ee.height=Fe*i.dpr,e.setTransform(1,0,0,1,0,0),e.scale(i.dpr,i.dpr),ee.style.width=Pe+"px",ee.style.height=Fe+"px",ee.style.position="absolute",ee.style.top=o+"px",ee.style.left="0",ee.style.transform="scale(8)",ee.style.transformOrigin="top left",Vo();let l=Oi/8,f=Math.ceil(Pe/l),r=Math.ceil(Fe/(l*Ui));Re=new yi(f,r,{frequency:.1});let n={x:Pe/f,y:Fe/r},d=255/r;Re.onDraw=(s,h,b)=>{let m=s.getLength()*Math.abs(s.x),c=s.getLength()*Math.abs(s.y),g=Math.round(-20*m+80*c+(50-.6*b*d)),p=Math.round(180*m+20*c-60+.4*b*d),y=Math.round(50*m+30*c+(40-.5*b*d)+.5*b*d);e.fillStyle=`rgba(${g}, ${p}, ${y}, 0.8)`,e.fillRect(h*n.x,b*n.y,n.x+.5,n.y+.5)},Re.manipulateVector=(s,h,b)=>{let m={x:h*n.x+.5*n.x,y:b*n.y+.5*n.y},c=Qe.x/8,g=Qe.y/8,p=new Dt((c-m.x)/Pe,(g-m.y)/Fe);s.addTo(p),s.getLength()>1&&s.setLength(1)},Go=0,nt=0,window.addEventListener("mousemove",et),window.addEventListener("touchstart",et),window.addEventListener("touchmove",et);function u(s){nt||(nt=s);let h=s-nt;nt=s,e.fillStyle="#020b1a",e.fillRect(0,0,Pe,Fe),Re.update(h),lt=requestAnimationFrame(u)}lt=requestAnimationFrame(u)}function Yo(i,t,e,o){let a=getComputedStyle(document.documentElement),l=parseInt(a.getPropertyValue("--io-header"))||0,f=e-l;i.fillStyle="#ffffff",vi.forEach(r=>{let n=(Math.sin(o*r.blinkSpeed+r.blinkOffset)+1)/2;i.globalAlpha=r.opacity*n,i.beginPath();let d=l+r.y*f;i.arc(r.x*t,d,r.size,0,Math.PI*2),i.fill()}),i.globalAlpha=1}function Ko(){lt&&(cancelAnimationFrame(lt),lt=null),window.removeEventListener("mousemove",et),window.removeEventListener("touchstart",et),window.removeEventListener("touchmove",et),ee&&(ee.classList.remove("afx-aurora-active"),ee.style.cssText="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;",ee=null);let i=window.AnkiFX;i&&typeof i.handleResize=="function"&&i.handleResize()}var _t=null,Xe,Lt,ve=null,Jo=200,ct=[],qi=null,st="all",Me=(i,t)=>{if(!window.AnkiFX_Config?.debug)return;let e=t.map(o=>{if(o===null)return"null";if(o===void 0)return"undefined";if(typeof o=="object")try{return JSON.stringify(o)}catch{return String(o)}return String(o)}).join(" ");ct.push({type:i,message:e,timestamp:new Date().toLocaleTimeString()}),ct.length>Jo&&ct.shift(),qi&&qi()};if(typeof window<"u"&&!window.__console_intercepted__){let i=console.log&&console.log.bind(console)||(()=>{}),t=console.warn&&console.warn.bind(console)||(()=>{}),e=console.error&&console.error.bind(console)||(()=>{}),o=console.info&&console.info.bind(console)||(()=>{}),a=console.debug&&console.debug.bind(console)||(()=>{});console.log=(...l)=>{i(...l),Me("log",l)},console.warn=(...l)=>{t(...l),Me("warn",l)},console.error=(...l)=>{e(...l),Me("error",l)},console.info=(...l)=>{o(...l),Me("info",l)},console.debug=(...l)=>{a(...l),Me("debug",l)},window.addEventListener("error",l=>{if(!window.AnkiFX_Config?.debug)return;let f=l.message;if(l.error){let r=l.error.name||"Error",n=l.error.message||l.message||"",d=l.error.stack||"";d&&!d.includes(n)?f=`${r}: ${n}
${d}`:f=d||`${r}: ${n}`}Me("error",[f])}),window.addEventListener("unhandledrejection",l=>{window.AnkiFX_Config?.debug&&Me("error",[`Unhandled Promise Rejection: ${l.reason}`])}),window.__console_intercepted__=!0}var Ni={id:"debug",name:"DEBUG",run:Zo,stop:Qo,onResize:(i,t)=>{Xe=i,Lt=t},marqueeFont:{color:"#00ff00",shadowColor:"rgba(0,0,0,0.8)",shadowBlur:5},controls:[{type:"button",id:"copy-logs-btn",label:"\u{1F4CB} COPY LOGS",onClick:()=>{er()}},{type:"button",id:"clear-storage-btn",label:"\u{1F9F9} CLEAR STORAGE",onClick:()=>{confirm("Clear ALL AnkiFX local storage?")&&(localStorage.clear(),location.reload())}}]};function Zo(i,t){ve&&(ve.remove(),ve=null);let e=i.dpr||1;Xe=i.width,Lt=i.height,ve=document.createElement("div"),ve.className="afx-debug-container";let o=document.createElement("div");o.className="afx-debug-columns",ve.appendChild(o);let a=document.createElement("div");a.className="afx-debug-left-col",o.appendChild(a);let l=document.createElement("div");l.className="afx-debug-right-col",o.appendChild(l);let f=document.createElement("div");f.className="afx-debug-panel diagnostics",f.innerHTML="<h3>AnkiFX Version</h3>";let r=document.createElement("div");r.className="afx-debug-content",f.appendChild(r),a.appendChild(f);let n=document.createElement("div");n.className="afx-debug-panel viewport-info",n.innerHTML="<h3>Viewport & Layout</h3>";let d=document.createElement("pre");d.className="afx-debug-content",n.appendChild(d),a.appendChild(n);let u=document.createElement("div");u.className="afx-debug-panel logs",u.innerHTML="<h3>Chronological Loader Logs</h3>";let s=document.createElement("div");s.className="afx-debug-content",u.appendChild(s),l.appendChild(u);let h=document.createElement("div");h.className="afx-debug-panel localstorage-viewer",h.innerHTML="<h3>LocalStorage</h3>";let b=document.createElement("div");b.className="afx-debug-content",h.appendChild(b),l.appendChild(h);let m=document.createElement("div");m.className="afx-debug-panel console-logs",m.innerHTML=`
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
    `,ve.appendChild(m);let c=document.createElement("div");c.style.height="calc(var(--bottom-inset, 0px) + var(--afx-dock-height, 0px) + 20px)",c.style.flexShrink="0",c.style.pointerEvents="none",ve.appendChild(c);let g=m.querySelectorAll(".afx-console-filter-btn");g.forEach(M=>{M.addEventListener("click",_=>{_.stopPropagation(),g.forEach(X=>{X.classList.remove("active"),X.style.background="rgba(255,255,255,0.05)",X.style.borderColor="transparent",X.style.color="#888"}),M.classList.add("active"),M.style.background="rgba(255,255,255,0.15)",M.style.borderColor="rgba(255,255,255,0.25)",M.style.color="#fff",st=M.getAttribute("data-filter")})});let p=m.querySelector("#afx-clear-console-btn");p&&p.addEventListener("click",M=>{M.stopPropagation(),ct.length=0});let y=m.querySelector("#afx-console-input"),v=m.querySelector("#afx-console-exec-btn"),C=()=>{if(!y)return;let M=y.value.trim();if(M){Me("log",[`> ${M}`]);try{let _=(0,eval)(M);Me("info",["=>",_])}catch(_){Me("error",[_.stack||_.message||_])}y.value="",y.focus()}};v&&y&&(["keydown","keyup","keypress"].forEach(M=>{y.addEventListener(M,_=>{_.stopPropagation()})}),y.addEventListener("keydown",M=>{M.key==="Enter"&&(M.preventDefault(),C())}),v.addEventListener("click",M=>{M.stopPropagation(),C()})),(document.getElementById("ankifx-overlay")||document.body).appendChild(ve);let E=document.getElementById("ankifx-background")||document.body,x={topLeft:document.createElement("div"),topRight:document.createElement("div"),bottomLeft:document.createElement("div"),bottomRight:document.createElement("div")};x.topLeft.className="afx-debug-corner top-left",x.topRight.className="afx-debug-corner top-right",x.bottomLeft.className="afx-debug-corner bottom-left",x.bottomRight.className="afx-debug-corner bottom-right",x.bottomLeft.style.bottom="auto",x.bottomRight.style.bottom="auto",Object.values(x).forEach(M=>E.appendChild(M));let k=document.createElement("div");k.className="afx-debug-line visible-bottom";let L=document.createElement("span");L.className="afx-debug-line-label",L.textContent="--- VISIBLE DOCUMENT BOTTOM ---",k.appendChild(L),E.appendChild(k);let T=0,U=0,N=0,P="",q="",$="",G="",V="",Q="";function K(M){M===void 0&&(M=performance.now()),T||(T=M),U++,M-T>=1e3&&(N=U,U=0,T=M);let _=i.ctx2d;_.clearRect(0,0,Xe,Lt),_.fillStyle="#050508",_.fillRect(0,0,Xe,Lt);let X=getComputedStyle(document.documentElement),re=X.getPropertyValue("--io-header")||"N/A",ue=parseInt(X.getPropertyValue("--io-header"))||0,pe=X.getPropertyValue("--top-inset")||"N/A",de=X.getPropertyValue("--bottom-inset")||"N/A",S=document.getElementById("ankifx-background"),D=S?S.getBoundingClientRect().height:"N/A",W=window.innerWidth>window.innerHeight,R=document.documentElement.clientHeight+ue,J=[`window:               ${window.innerWidth}x${window.innerHeight}`,`screen:               ${screen.width}x${screen.height}`,`doc:                  ${document.documentElement.clientWidth}x${document.documentElement.clientHeight}`,`orient:               ${window.orientation||"N/A"}`,`dpr (native|engine):  (${window.devicePixelRatio}|${e})`,`--io-header:          ${re}`,`--top-inset:          ${pe}`,`--bottom-inset:       ${de}`,`--afx-viewport-height: calc(100dvh + ${ue}px) = ${D}px`,`isLandscape:          ${W}`].join(`
`);J!==P&&(d.textContent=J,P=J);let he=window.AnkiFX_Eval_History||[],we=JSON.stringify(he),Ce=[`Version:  ${window.AnkiFX?.version||"1.0.0-dev"}`,`Source:   ${window.AnkiFX?.source||"unknown"}`,`Built:    ${window.AnkiFX?.buildDate||"development"}`].join(`
`),ge=Ce+"_"+we;if(ge!==q){r.innerHTML="";let j=document.createElement("pre");j.style.margin="0 0 10px 0",j.style.fontFamily="inherit",j.style.fontSize="inherit",j.textContent=Ce,r.appendChild(j);let z=document.createElement("div");z.style.borderTop="1px dashed rgba(255,255,255,0.15)",z.style.margin="10px 0",r.appendChild(z);let I=document.createElement("div");I.textContent="EVALUATION HISTORY:",I.style.fontWeight="bold",I.style.color="#00ffff",I.style.marginBottom="6px",I.style.fontSize="11px",r.appendChild(I);let H=document.createElement("div");if(he.length===0){let B=document.createElement("div");B.textContent="(No evaluation history captured)",B.style.color="#888",B.style.fontStyle="italic",H.appendChild(B)}else he.slice(-3).forEach((B,le)=>{let fe=document.createElement("div");fe.textContent=`[${le+1}] ${B.source} (${B.version}) @ ${B.time} - ${B.status}`,fe.style.color=B.status==="active"?"#55ff55":"#ffaa55",fe.style.fontSize="11px",H.appendChild(fe)});r.appendChild(H),q=ge}let be=window.AnkiFX_Loader_Logs||[],ke=JSON.stringify(be);if(ke!==$){if(s.innerHTML="",be.length===0){let j=document.createElement("div");j.textContent="(No logs captured by template loader)",j.style.color="#888",j.style.fontStyle="italic",s.appendChild(j)}else{let j={success:{color:"#55ff55",badge:"\u2713"},error:{color:"#ff5555",badge:"\u2717"},warn:{color:"#ffaa55",badge:"!"},pending:{color:"#888888",badge:"\u2026"},info:{color:"#dddddd",badge:"\xB7"}};be.forEach((z,I)=>{let H=z&&typeof z=="object",B=H?z.msg:String(z),le=j[H?z.level:"info"]||j.info,fe=document.createElement("div");fe.style.cssText="display: flex; gap: 6px; align-items: baseline; font-size: 11px; margin-bottom: 3px; padding-bottom: 2px; border-bottom: 1px solid rgba(255,255,255,0.04);";let Le=document.createElement("span");Le.textContent=`[${String(I+1).padStart(2,"0")}]`,Le.style.cssText="color: #555; flex-shrink: 0; font-size: 10px;";let at=document.createElement("span");at.textContent=le.badge,at.style.cssText=`color: ${le.color}; flex-shrink: 0; font-weight: bold; width: 10px;`;let Ie=document.createElement("span");Ie.textContent=B,Ie.style.cssText=`color: ${le.color}; word-break: break-word;`,fe.appendChild(Le),fe.appendChild(at),fe.appendChild(Ie),s.appendChild(fe)})}$=ke}let xe={};for(let j=0;j<localStorage.length;j++){let z=localStorage.key(j);xe[z]=localStorage.getItem(z)}let At=JSON.stringify(xe);if(At!==Q){b.innerHTML="";let j=Object.keys(xe).sort();if(j.length===0){let z=document.createElement("div");z.textContent="(LocalStorage is empty)",z.style.color="#888",z.style.fontStyle="italic",z.style.fontSize="11px",b.appendChild(z)}else j.forEach(z=>{let I=document.createElement("div");I.style.cssText="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 2px;";let H=document.createElement("span");H.textContent=z,H.style.color="#ffaa55",H.style.wordBreak="break-all",H.style.marginRight="8px";let B=document.createElement("span");B.textContent=xe[z],B.style.color="#00ffff",B.style.wordBreak="break-all",B.style.textAlign="right",I.appendChild(H),I.appendChild(B),b.appendChild(I)});Q=At}let He=ct.filter(j=>st==="all"?!0:j.type===st),Je=st+"_"+JSON.stringify(He);if(Je!==V){let j=document.getElementById("afx-console-log-list");if(j)if(j.innerHTML="",He.length===0){let z=document.createElement("div");z.textContent=`(No logs in category: ${st})`,z.style.color="#888",z.style.fontStyle="italic",z.style.fontSize="11px",j.appendChild(z)}else He.forEach(z=>{let I=document.createElement("div");I.style.marginBottom="4px",I.style.fontSize="11px",I.style.borderBottom="1px solid rgba(255,255,255,0.03)",I.style.paddingBottom="2px";let H=document.createElement("span");H.textContent=`[${z.timestamp}] `,H.style.color="#888",I.appendChild(H);let B=document.createElement("span");B.textContent=z.message,z.type==="error"?B.style.color="#ff5555":z.type==="warn"?B.style.color="#ffaa55":z.type==="info"||z.type==="debug"?B.style.color="#00ffff":B.style.color="#ffffff",I.appendChild(B),j.appendChild(I)}),j.scrollTop=j.scrollHeight;V=Je}let $e=`${Xe}x${R}`;$e!==G&&(x.topLeft.textContent="(0,0)",x.topRight.textContent=`(${Xe},0)`,x.bottomLeft.textContent=`(0,${R})`,x.bottomRight.textContent=`(${Xe},${R})`,x.bottomLeft.style.top=`${R-18}px`,x.bottomRight.style.top=`${R-18}px`,G=$e),k.style.top=`${R}px`,_t=requestAnimationFrame(K)}K()}function Qo(){_t&&(cancelAnimationFrame(_t),_t=null),ve&&(ve.remove(),ve=null),document.querySelectorAll(".afx-debug-corner, .afx-debug-line").forEach(i=>i.remove())}function er(){let i=document.querySelector(".afx-debug-container");if(!i)return;let t=`=== ANKIFX DEBUG LOGS ===

`;i.querySelectorAll(".afx-debug-panel").forEach(a=>{let l=a.querySelector("h3")?.textContent||"",f=a.querySelector(".afx-debug-content");f&&(t+=`--- ${l.toUpperCase()} ---
`,t+=f.innerText||f.textContent||"",t+=`

`)}),(()=>{try{let a=document.createElement("textarea");a.value=t.trim(),a.style.position="fixed",a.style.top="0",a.style.left="0",a.style.opacity="0",a.style.pointerEvents="none",document.body.appendChild(a),a.focus(),a.select();let l=document.execCommand("copy");if(document.body.removeChild(a),l)return Promise.resolve()}catch{}return navigator.clipboard&&typeof navigator.clipboard.writeText=="function"?navigator.clipboard.writeText(t.trim()):Promise.reject(new Error("No copy method succeeded or is available"))})().then(()=>{let a=document.getElementById("afx-control-copy-logs-btn");if(a){let l=a.textContent;a.textContent="\u2705 COPIED!",setTimeout(()=>{a.textContent=l},1500)}}).catch(a=>{let l=document.getElementById("afx-control-copy-logs-btn");if(l){let f=l.textContent;l.textContent="\u274C ERROR",setTimeout(()=>{l.textContent=f},1500)}})}var ft=null,ie,Te,Ee={id:"ecg",name:"ECG Monitor",run:tr,stop:ir,onResize:(i,t)=>{ie=i,Te=t},marqueeFont:{color:"#FF1A1A",shadowColor:"#CC0000",shadowBlur:15}};function tr(i,t){let e=i.ctx2d;ie=i.width,Te=i.height;let o=document.getElementById("afx-top-group-right"),a=document.getElementById("afx-ecg-panel");!a&&o&&(a=document.createElement("div"),a.id="afx-ecg-panel",o.insertBefore(a,o.firstChild));let l=localStorage.getItem("ankifx_ecg_rhythm")||"sinus";Ee.controls=[{type:"button",id:"ecg-trigger",label:l==="sinus"?"\u26A1 TRIGGER ARRHYTHMIA":"\u{1F49A} RESTORE SINUS",onClick:()=>{let S=localStorage.getItem("ankifx_ecg_rhythm")||"sinus",D;if(S==="sinus"){let W=["first_degree","mobitz_1","mobitz_2","third_degree","st_elevation","afib","a_flutter","torsades"];D=W[Math.floor(Math.random()*W.length)]}else D="sinus";localStorage.setItem("ankifx_ecg_rhythm",D),localStorage.setItem("ankifx_ecg_trigger_time",Date.now())}}];let f=200,r=40,n=120,d=25,u=5,s=new Float32Array(4096),h=0,b=0,m=0,c=0,g=0,p=0,y=0,v=100,C=.6,w=72,E=0,x="sinus",k=25+Math.random()*15,L=0,T=["first_degree","mobitz_1","mobitz_2","third_degree","st_elevation","afib","a_flutter","torsades"],U=0;function N(){h<ie&&(h=ie)}let P=(S,D,W,R)=>R*Math.exp(-((S-D)**2)/(2*W**2));function q(S){return P(S,.15,.03,.12)}function $(S){return P(S,.03,.03,.12)}function G(S,D){let W=D%4;return W===0?P(S,.17,.03,.12):W===1?P(S,.1,.03,.12):W===2?P(S,.03,.03,.12):P(S,.15,.03,.12)}function V(S){return P(S,.08,.03,.12)}function Q(S){return .035*Math.sin(S*Math.PI*40)+.015*Math.sin(S*Math.PI*96)+.008*Math.sin(S*Math.PI*176)}function K(S){return .085*(S*4%1-.5)}function M(S,D){let W=Math.sin(S*Math.PI*2)*.58+Math.sin(S*Math.PI*4)*.16,R=Math.sin(D*1.2);return W*R}function _(S,D=!1){let W=0;return W+=P(S,.33,.008,-.08),W+=P(S,.36,.012,1),W+=P(S,.39,.008,-.12),D&&(W+=P(S,.46,.07,.38)),W+=P(S,.56,.04,.22),W}function X(S,D,W){let R=S%1,J=Math.floor(S);return D==="sinus"?q(R)+_(R,!1):D==="first_degree"?$(R)+_(R,!1):D==="mobitz_1"?J%4===3?G(R,J):G(R,J)+_(R,!1):D==="mobitz_2"?J%3===2?V(R):V(R)+_(R,!1):D==="st_elevation"?q(R)+_(R,!0):D==="afib"?Q(R)+_(R,!1):D==="a_flutter"?K(R)+_(R,!1):D==="torsades"?M(R,W):0}function re(S,D){let W=S%1,R=D%1,J=P(W,.15,.03,.12),he=P(R,.33,.008,-.08)+P(R,.36,.012,1)+P(R,.39,.008,-.12)+P(R,.56,.04,.22);return J+he}function ue(){e.strokeStyle="rgba(60, 0, 0, 0.15)",e.lineWidth=.5,e.beginPath();for(let S=0;S<ie;S+=u)e.moveTo(S,0),e.lineTo(S,Te);for(let S=0;S<Te;S+=u)e.moveTo(0,S),e.lineTo(ie,S);e.stroke(),e.strokeStyle="rgba(80, 0, 0, 0.3)",e.lineWidth=1,e.beginPath();for(let S=0;S<ie;S+=d)e.moveTo(S,0),e.lineTo(S,Te);for(let S=0;S<Te;S+=d)e.moveTo(0,S),e.lineTo(ie,S);e.stroke()}function pe(){if(!a)return;let S=.5+E*.5;a.style.opacity=S;let D="SINUS RHYTHM";x==="first_degree"?D="1\xB0 AV BLOCK":x==="mobitz_1"?D="2\xB0 AV (MOBITZ 1)":x==="mobitz_2"?D="2\xB0 AV (MOBITZ 2)":x==="third_degree"?D="3\xB0 AV BLOCK":x==="st_elevation"?D="ST ELEVATION":x==="afib"?D="ATRIAL FIBRILLATION":x==="a_flutter"?D="ATRIAL FLUTTER":x==="torsades"&&(D="TORSADES DE POINTES"),a.innerHTML=`
            <div class="afx-ecg-bpm">\u2665 ${w} BPM</div>
            <div class="afx-ecg-rhythm">${D}</div>
        `}function de(S){c||(c=S);let D=Math.min((S-c)/1e3,.05);c=S,m+=D,N();let W=localStorage.getItem("ankifx_ecg_rhythm")||"sinus",R=parseInt(localStorage.getItem("ankifx_ecg_trigger_time")||"0");if(R>L){if(L=R,x=W,k=m+25+Math.random()*15,x!=="sinus"){let I=T.indexOf(x);I!==-1&&(U=(I+1)%T.length)}x==="afib"&&(v=70+Math.floor(Math.random()*60),C=60/v),Ee.controls&&Ee.controls[0]&&(Ee.controls[0].label=x==="sinus"?"\u26A1 TRIGGER ARRHYTHMIA":"\u{1F49A} RESTORE SINUS",AnkiFX.renderEffectControls(Ee))}m>=k&&(x==="sinus"?(x=T[U],U=(U+1)%T.length):x="sinus",localStorage.setItem("ankifx_ecg_rhythm",x),k=m+25+Math.random()*15,x==="afib"&&(v=70+Math.floor(Math.random()*60),C=60/v),Ee.controls&&Ee.controls[0]&&(Ee.controls[0].label=x==="sinus"?"\u26A1 TRIGGER ARRHYTHMIA":"\u{1F49A} RESTORE SINUS",AnkiFX.renderEffectControls(Ee)));let J=72;x==="third_degree"?J=35:x==="mobitz_1"||x==="mobitz_2"?J=68:x==="afib"?J=v:x==="a_flutter"?J=75:x==="torsades"&&(J=220);let he=x==="afib"?C:60/J,we=g,Ce=p,ge=y;if(x==="third_degree"?(p+=D/(60/88),y+=D/(60/J)):g+=D/he,x!=="third_degree"){let I=Math.floor(we);Math.floor(g)>I&&x==="afib"&&(v=70+Math.floor(Math.random()*65),C=60/v)}if(x==="third_degree")Math.floor(ge-.36)<Math.floor(y-.36)&&(E=1,w=J+Math.floor(Math.random()*3)-1);else if(Math.floor(we-.36)<Math.floor(g-.36)){let I=Math.floor(g-.36),H=!1;x==="mobitz_1"?H=I%4===3:x==="mobitz_2"&&(H=I%3===2),H||(E=1,w=Math.floor(J),x!=="torsades"&&x!=="a_flutter"&&(w+=Math.floor(Math.random()*5)-2))}E=Math.max(0,E-D*4);let be=f*D,ke=b+be,xe=Math.floor(b),At=Math.floor(ke);for(let I=xe;I<=At;I++){let H=I%ie,B=(I-b)/be;if(x==="third_degree"){let le=Ce+(p-Ce)*B,fe=ge+(y-ge)*B;s[H]=re(le,fe)}else{let le=we+(g-we)*B;s[H]=X(le,x,m)}}b=ke,b>=ie&&(b-=ie),e.fillStyle="#000000",e.fillRect(0,0,ie,Te),ue();let He=Te*.55,Je=Te*.35,$e=Math.floor(b)%ie,j=4;e.save(),e.lineCap="round",e.lineJoin="round";for(let I=0;I<3;I++){I===0?(e.lineWidth=15,e.strokeStyle="rgb(200, 0, 0)"):I===1?(e.lineWidth=7,e.strokeStyle="rgb(255, 15, 15)"):(e.lineWidth=2.4,e.strokeStyle="rgb(255, 175, 175)");for(let H=0;H<ie;H+=j){let B=$e-H;if(B<0&&(B+=ie),B>ie-r)continue;let le=1,fe=ie-r-n;if(B>fe&&(le=1-(B-fe)/n,le=Math.max(0,le)),le<=0)continue;let Le=0;B<12&&(Le=1-B/12),I===0?e.globalAlpha=le*(.07+Le*.13):I===1?e.globalAlpha=le*(.28+Le*.32):e.globalAlpha=le*(.85+Le*.15),e.beginPath();let at=He-s[H]*Je;e.moveTo(H,at);let Ie=Math.min(H+j,ie);for(let Ze=H+1;Ze<Ie;Ze++){let Xo=He-s[Ze]*Je;e.lineTo(Ze,Xo)}if(Ie<ie){let Ze=He-s[Ie]*Je;e.lineTo(Ie,Ze)}e.stroke()}}e.globalAlpha=1,e.restore(),e.save();let z=e.createLinearGradient($e-3,0,$e+3,0);z.addColorStop(0,"rgba(255, 0, 0, 0)"),z.addColorStop(.5,"rgba(255, 50, 50, 0.4)"),z.addColorStop(1,"rgba(255, 0, 0, 0)"),e.fillStyle=z,e.fillRect($e-3,0,6,Te),e.restore(),pe(),ft=requestAnimationFrame(de)}ft=requestAnimationFrame(de)}function ir(){ft&&(cancelAnimationFrame(ft),ft=null);let i=document.getElementById("afx-ecg-panel");i&&i.remove()}var ut=null,wi,ki,ji={id:"fire",name:"Doom Fire",run:rr,stop:ar,onResize:(i,t)=>{wi=i,ki=t},preferredTrack:{title:"Doom 3 BFG Edition",trackTitle:"DOOM E1M1"},marqueeFont:{color:"#ffffff",shadowColor:"rgba(0,0,0,0.8)",shadowBlur:5}},or=[[7,7,7],[31,7,7],[47,15,7],[71,15,7],[87,23,7],[103,31,7],[119,31,7],[143,39,7],[159,47,7],[175,63,7],[191,71,7],[199,71,7],[223,79,7],[223,87,7],[223,87,7],[215,95,7],[215,95,7],[215,103,15],[207,111,15],[207,119,15],[207,127,15],[207,135,23],[199,135,23],[199,143,23],[199,151,31],[191,159,31],[191,159,31],[191,167,39],[191,167,39],[191,175,47],[183,175,47],[183,183,47],[183,183,55],[207,207,111],[223,223,159],[239,239,199],[255,255,255]];function rr(i,t){let e=i.ctx2d;wi=i.width,ki=i.height;let o=320,a=168,l=new Uint8Array(o*a),f=e.createImageData(o,a),r=f.data,n=document.createElement("canvas");n.width=o,n.height=a;let d=n.getContext("2d");function u(){l.fill(0);for(let c=0;c<o;c++)l[(a-1)*o+c]=36}function s(c){let g=l[c];if(g===0)l[c-o]=0;else{let p=Math.floor(Math.random()*3),y=c-p+1;l[y-o]=g-(p&1)}}function h(){for(let c=0;c<o;c++)for(let g=1;g<a;g++)s(g*o+c)}function b(){for(let c=0;c<l.length;c++){let g=l[c],p=or[g],y=c*4;r[y]=p[0],r[y+1]=p[1],r[y+2]=p[2],r[y+3]=255}}u();function m(){h(),b(),d.putImageData(f,0,0),e.save(),e.imageSmoothingEnabled=!1,e.drawImage(n,0,0,wi,ki),e.restore(),ut=requestAnimationFrame(m)}ut=requestAnimationFrame(m)}function ar(){ut&&(cancelAnimationFrame(ut),ut=null)}var pt=null,dt,ht,Hi={id:"geometry",name:"Geometry",run:nr,stop:lr,onResize:(i,t)=>{dt=i,ht=t},marqueeFont:{colorFn:(i,t)=>`hsl(${(i*120+t*4)%360}, 100%, 55%)`,shadowColor:"inherit",shadowBlur:15}};function nr(i,t){let e=i.ctx2d;dt=i.width,ht=i.height;let o=0;function a(){o+=.012,e.globalCompositeOperation="source-over",e.fillStyle="rgba(2, 2, 5, 0.3)",e.fillRect(0,0,dt,ht),e.globalCompositeOperation="lighter";let l=dt/2,f=ht/2,r=Math.max(dt,ht)*.85;for(let n=0;n<35;n++){let d=o+n*.05,u=(Math.sin(d*.8)*.5+.5)*r+n*12;e.save(),e.translate(l,f),e.rotate(Math.sin(o*.3)*Math.PI+n*.06),e.scale(Math.sin(o*.5+n*.1)*.4+.8,Math.cos(o*.4+n*.1)*.4+.8),e.beginPath();for(let h=0;h<=8;h++){let b=h/8*Math.PI*2,m=Math.cos(b)*u,c=Math.sin(b)*u;h===0?e.moveTo(m,c):e.lineTo(m,c)}let s=(o*50+n*10)%360;e.strokeStyle=`hsla(${s}, 95%, 65%, 0.6)`,e.lineWidth=4,e.stroke(),e.restore()}e.globalCompositeOperation="source-over",pt=requestAnimationFrame(a)}pt=requestAnimationFrame(a)}function lr(){pt&&(cancelAnimationFrame(pt),pt=null)}var It=null;function Xi(i){It=i}var sr=["#c3e4ff","#6ec3f4","#eae2ff","#b9beff"];function $i(i){return[(i>>16&255)/255,(i>>8&255)/255,(255&i)/255]}var Ei=class{constructor(t,e,o,a){let l=this;l.canvas=t,l.gl=e,l.meshes=[],l.debug=()=>{};let f=l.gl;Object.defineProperties(l,{Material:{enumerable:!1,value:class{constructor(n,d,u={}){let s=this;function h(c,g){let p=f.createShader(c);return f.shaderSource(p,g),f.compileShader(p),f.getShaderParameter(p,f.COMPILE_STATUS)||console.error("[Gradient/WebGL] Shader compile error:",f.getShaderInfoLog(p)),p}function b(c,g){return Object.entries(c).map(([p,y])=>y.getDeclaration(p,g)).join(`
`)}s.uniforms=u,s.uniformInstances=[];let m=`
              precision highp float;
            `;s.vertexSource=`
              ${m}
              attribute vec4 position;
              attribute vec2 uv;
              attribute vec2 uvNorm;
              ${b(l.commonUniforms,"vertex")}
              ${b(u,"vertex")}
              ${n}
            `,s.Source=`
              ${m}
              ${b(l.commonUniforms,"fragment")}
              ${b(u,"fragment")}
              ${d}
            `,s.vertexShader=h(f.VERTEX_SHADER,s.vertexSource),s.fragmentShader=h(f.FRAGMENT_SHADER,s.Source),s.program=f.createProgram(),f.attachShader(s.program,s.vertexShader),f.attachShader(s.program,s.fragmentShader),f.linkProgram(s.program),f.getProgramParameter(s.program,f.LINK_STATUS)||console.error("[Gradient/WebGL] Program link error:",f.getProgramInfoLog(s.program)),f.useProgram(s.program),s.attachUniforms(void 0,l.commonUniforms),s.attachUniforms(void 0,s.uniforms)}attachUniforms(n,d){let u=this;n===void 0?Object.entries(d).forEach(([s,h])=>{u.attachUniforms(s,h)}):d.type==="array"?d.value.forEach((s,h)=>u.attachUniforms(`${n}[${h}]`,s)):d.type==="struct"?Object.entries(d.value).forEach(([s,h])=>u.attachUniforms(`${n}.${s}`,h)):u.uniformInstances.push({uniform:d,location:f.getUniformLocation(u.program,n)})}}},Uniform:{enumerable:!1,value:class{constructor(n){this.type="float",Object.assign(this,n),this.typeFn={float:"1f",int:"1i",vec2:"2fv",vec3:"3fv",vec4:"4fv",mat4:"Matrix4fv"}[this.type]||"1f",this.update()}update(n){this.value!==void 0&&f[`uniform${this.typeFn}`](n,this.typeFn.substring(0,6)==="Matrix"?this.transpose:this.value,this.typeFn.substring(0,6)==="Matrix"?this.value:null)}getDeclaration(n,d,u){let s=this;if(s.excludeFrom!==d){if(s.type==="array")return s.value[0].getDeclaration(n,d,s.value.length)+`
const int ${n}_length = ${s.value.length};`;if(s.type==="struct"){let h=n.replace("u_","");return h=h.charAt(0).toUpperCase()+h.slice(1),`uniform struct ${h} 
{
`+Object.entries(s.value).map(([b,m])=>m.getDeclaration(b,d).replace(/^uniform/,"")).join("")+`
} ${n}${u>0?`[${u}]`:""};`}return`uniform ${s.type} ${n}${u>0?`[${u}]`:""};`}}}},PlaneGeometry:{enumerable:!1,value:class{constructor(n,d,u,s,h){f.createBuffer(),this.attributes={position:new l.Attribute({target:f.ARRAY_BUFFER,size:3}),uv:new l.Attribute({target:f.ARRAY_BUFFER,size:2}),uvNorm:new l.Attribute({target:f.ARRAY_BUFFER,size:2}),index:new l.Attribute({target:f.ELEMENT_ARRAY_BUFFER,size:3,type:f.UNSIGNED_SHORT})},this.setTopology(u,s),this.setSize(n,d,h)}setTopology(n=1,d=1){let u=this;u.xSegCount=n,u.ySegCount=d,u.vertexCount=(u.xSegCount+1)*(u.ySegCount+1),u.quadCount=u.xSegCount*u.ySegCount*2,u.attributes.uv.values=new Float32Array(2*u.vertexCount),u.attributes.uvNorm.values=new Float32Array(2*u.vertexCount),u.attributes.index.values=new Uint16Array(3*u.quadCount);for(let s=0;s<=u.ySegCount;s++)for(let h=0;h<=u.xSegCount;h++){let b=s*(u.xSegCount+1)+h;if(u.attributes.uv.values[2*b]=h/u.xSegCount,u.attributes.uv.values[2*b+1]=1-s/u.ySegCount,u.attributes.uvNorm.values[2*b]=h/u.xSegCount*2-1,u.attributes.uvNorm.values[2*b+1]=1-s/u.ySegCount*2,h<u.xSegCount&&s<u.ySegCount){let m=s*u.xSegCount+h;u.attributes.index.values[6*m]=b,u.attributes.index.values[6*m+1]=b+1+u.xSegCount,u.attributes.index.values[6*m+2]=b+1,u.attributes.index.values[6*m+3]=b+1,u.attributes.index.values[6*m+4]=b+1+u.xSegCount,u.attributes.index.values[6*m+5]=b+2+u.xSegCount}}u.attributes.uv.update(),u.attributes.uvNorm.update(),u.attributes.index.update()}setSize(n=1,d=1,u="xz"){let s=this;s.width=n,s.height=d,s.orientation=u,(!s.attributes.position.values||s.attributes.position.values.length!==3*s.vertexCount)&&(s.attributes.position.values=new Float32Array(3*s.vertexCount));let h=n/-2,b=d/-2,m=n/s.xSegCount,c=d/s.ySegCount;for(let g=0;g<=s.ySegCount;g++){let p=b+g*c;for(let y=0;y<=s.xSegCount;y++){let v=h+y*m,C=g*(s.xSegCount+1)+y;s.attributes.position.values[3*C+"xyz".indexOf(u[0])]=v,s.attributes.position.values[3*C+"xyz".indexOf(u[1])]=-p}}s.attributes.position.update()}}},Mesh:{enumerable:!1,value:class{constructor(n,d){let u=this;u.geometry=n,u.material=d,u.wireframe=!1,u.attributeInstances=[],Object.entries(u.geometry.attributes).forEach(([s,h])=>{u.attributeInstances.push({attribute:h,location:h.attach(s,u.material.program)})}),l.meshes.push(u)}draw(){f.useProgram(this.material.program),this.material.uniformInstances.forEach(({uniform:n,location:d})=>n.update(d)),this.attributeInstances.forEach(({attribute:n,location:d})=>n.use(d)),f.drawElements(this.wireframe?f.LINES:f.TRIANGLES,this.geometry.attributes.index.values.length,f.UNSIGNED_SHORT,0)}remove(){l.meshes=l.meshes.filter(n=>n!==this)}}},Attribute:{enumerable:!1,value:class{constructor(n){this.type=f.FLOAT,this.normalized=!1,this.buffer=f.createBuffer(),Object.assign(this,n),this.update()}update(){this.values!==void 0&&(f.bindBuffer(this.target,this.buffer),f.bufferData(this.target,this.values,f.STATIC_DRAW))}attach(n,d){let u=f.getAttribLocation(d,n);return this.target===f.ARRAY_BUFFER&&(f.enableVertexAttribArray(u),f.vertexAttribPointer(u,this.size,this.type,this.normalized,0,0)),u}use(n){f.bindBuffer(this.target,this.buffer),this.target===f.ARRAY_BUFFER&&(f.enableVertexAttribArray(n),f.vertexAttribPointer(n,this.size,this.type,this.normalized,0,0))}}}});let r=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];l.commonUniforms={projectionMatrix:new l.Uniform({type:"mat4",value:r}),modelViewMatrix:new l.Uniform({type:"mat4",value:r}),resolution:new l.Uniform({type:"vec2",value:[1,1]}),aspectRatio:new l.Uniform({type:"float",value:1})},o&&a&&this.setSize(o,a)}setSize(t=640,e=480,o=1){this.width=t,this.height=e,this.gl.viewport(0,0,t*o,e*o),this.commonUniforms.resolution.value=[t,e],this.commonUniforms.aspectRatio.value=t/e}setOrthographicCamera(t=0,e=0,o=0,a=-2e3,l=2e3){this.commonUniforms.projectionMatrix.value=[2/this.width,0,0,0,0,2/this.height,0,0,0,0,2/(a-l),0,t,e,o,1]}render(){this.gl.clearColor(0,0,0,0),this.gl.clearDepth(1),this.meshes.forEach(t=>t.draw())}cleanup(){let t=this.gl;this.meshes.forEach(e=>{e.attributeInstances&&e.attributeInstances.forEach(({location:o})=>{typeof o=="number"&&o>=0&&t.disableVertexAttribArray(o)}),e.material&&e.material.program&&t.deleteProgram(e.material.program),e.geometry&&e.geometry.attributes&&Object.values(e.geometry.attributes).forEach(o=>{o.buffer&&t.deleteBuffer(o.buffer)})}),this.meshes=[]}},Rt=class{constructor(t,e,o,a){this.canvas=t,this.gl=e,this.width=o,this.height=a,this.angle=0,this.conf={presetName:"",wireframe:!1,density:[.06,.16],zoom:1,rotation:0,playing:!0},this.t=1253106,this.last=0,this.amp=320,this.seed=5,this.freqX=14e-5,this.freqY=29e-5,this.activeColors=[1,1,1,1],this.shaderFiles={vertex:`
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
            `},this.initGradientColors(),this.minigl=new Ei(t,e,o,a),this.initMesh(),this.resize(),this.updateThemeAwareText()}initGradientColors(){this.sectionColors=sr.map(t=>$i(parseInt(t.substring(1),16)))}initMaterial(){this.uniforms={u_time:new this.minigl.Uniform({value:0}),u_shadow_power:new this.minigl.Uniform({value:5}),u_darken_top:new this.minigl.Uniform({value:0}),u_active_colors:new this.minigl.Uniform({value:this.activeColors,type:"vec4"}),u_global:new this.minigl.Uniform({value:{noiseFreq:new this.minigl.Uniform({value:[this.freqX,this.freqY],type:"vec2"}),noiseSpeed:new this.minigl.Uniform({value:5e-6})},type:"struct"}),u_vertDeform:new this.minigl.Uniform({value:{incline:new this.minigl.Uniform({value:Math.sin(this.angle)/Math.cos(this.angle)}),offsetTop:new this.minigl.Uniform({value:-.5}),offsetBottom:new this.minigl.Uniform({value:-.5}),noiseFreq:new this.minigl.Uniform({value:[3,4],type:"vec2"}),noiseAmp:new this.minigl.Uniform({value:this.amp}),noiseSpeed:new this.minigl.Uniform({value:10}),noiseFlow:new this.minigl.Uniform({value:3}),noiseSeed:new this.minigl.Uniform({value:this.seed})},type:"struct",excludeFrom:"fragment"}),u_baseColor:new this.minigl.Uniform({value:this.sectionColors[0],type:"vec3",excludeFrom:"fragment"}),u_waveLayers:new this.minigl.Uniform({value:[],excludeFrom:"fragment",type:"array"})};for(let t=1;t<this.sectionColors.length;t+=1)this.uniforms.u_waveLayers.value.push(new this.minigl.Uniform({value:{color:new this.minigl.Uniform({value:this.sectionColors[t],type:"vec3"}),noiseFreq:new this.minigl.Uniform({value:[2+t/this.sectionColors.length,3+t/this.sectionColors.length],type:"vec2"}),noiseSpeed:new this.minigl.Uniform({value:11+.3*t}),noiseFlow:new this.minigl.Uniform({value:6.5+.3*t}),noiseSeed:new this.minigl.Uniform({value:this.seed+10*t}),noiseFloor:new this.minigl.Uniform({value:.1}),noiseCeil:new this.minigl.Uniform({value:.63+.07*t})},type:"struct"}));return this.vertexShader=[this.shaderFiles.noise,this.shaderFiles.blend,this.shaderFiles.vertex].join(`

`),new this.minigl.Material(this.vertexShader,this.shaderFiles.fragment,this.uniforms)}initMesh(){this.material=this.initMaterial(),this.geometry=new this.minigl.PlaneGeometry,this.mesh=new this.minigl.Mesh(this.geometry,this.material)}resize(){let t=Math.min(window.devicePixelRatio||1,1.5);this.minigl.setSize(this.width,this.height,t),this.minigl.setOrthographicCamera(),this.xSegCount=Math.ceil(this.width*this.conf.density[0]),this.ySegCount=Math.ceil(this.height*this.conf.density[1]),this.mesh.geometry.setTopology(this.xSegCount,this.ySegCount),this.mesh.geometry.setSize(this.width,this.height),this.mesh.material.uniforms.u_shadow_power.value=this.width<600?5:6}animate=t=>{if(!this.conf.playing)return;this.last===0&&(this.last=t);let e=Math.min(t-this.last,1e3/15);this.last=t,this.t+=e,this.mesh.material.uniforms.u_time.value=this.t,this.minigl.render(),this.animationId=requestAnimationFrame(this.animate)};updateThemeAwareText(){if(!this.sectionColors||this.sectionColors.length===0)return;let t=0;this.sectionColors.forEach(l=>{let f=l[0],r=l[1],n=l[2],d=.299*f+.587*r+.114*n;t+=d});let e=t/this.sectionColors.length,o=e>.6?"#111111":"#ffffff",a=e>.6?"0 1px 2px rgba(255, 255, 255, 0.8)":"0 1px 3px rgba(0, 0, 0, 0.9), 0 2px 10px rgba(0, 0, 0, 0.6)";document.documentElement.style.setProperty("--afx-body-color",o),document.documentElement.style.setProperty("--afx-text-shadow",a),It&&(It.marqueeFont={colorFn:(l,f)=>{if(!this.sectionColors||this.sectionColors.length===0)return"#ffffff";let r=(l*1.5+f*.25)%this.sectionColors.length,n=Math.floor(r),d=(n+1)%this.sectionColors.length,u=r-n,s=this.sectionColors[n],h=this.sectionColors[d],b=s[0]*(1-u)+h[0]*u,m=s[1]*(1-u)+h[1]*u,c=s[2]*(1-u)+h[2]*u,g=e>.6?.45:1;return`rgb(${Math.round(b*g*255)}, ${Math.round(m*g*255)}, ${Math.round(c*g*255)})`},shadowColor:e>.6?"rgba(0, 0, 0, 0.25)":"inherit",shadowBlur:16},window.AnkiFX&&window.AnkiFX.marquee&&window.AnkiFX.marquee.updateStyles(It.marqueeFont))}randomizeColors(){let t=()=>"#"+Math.floor(Math.random()*16777215).toString(16).padStart(6,"0"),e=[t(),t(),t(),t()];if(this.sectionColors=e.map(o=>$i(parseInt(o.substring(1),16))),this.uniforms&&this.uniforms.u_baseColor&&this.uniforms.u_waveLayers&&this.uniforms.u_waveLayers.value){this.uniforms.u_baseColor.value=this.sectionColors[0];for(let o=0;o<this.uniforms.u_waveLayers.value.length;o++){let a=this.uniforms.u_waveLayers.value[o];a&&a.value&&a.value.color&&(a.value.color.value=this.sectionColors[o+1]||this.sectionColors[0])}}this.updateThemeAwareText()}destroy(){this.conf.playing=!1,this.animationId&&cancelAnimationFrame(this.animationId),this.minigl&&this.minigl.cleanup()}};var se=null,Si={id:"gradient",name:"Gradient",controls:[{type:"button",id:"gradient-randomize",label:"\u{1F3A8} RANDOMIZE",onClick:()=>{se&&se.randomizeColors()}}],run:(i,t)=>{se&&se.destroy(),se=new Rt(i.canvasGL,i.gl,i.width,i.height),se.conf.playing=!0,se.last=0,se.animationId=requestAnimationFrame(se.animate)},stop:()=>{se&&(se.destroy(),se=null),document.documentElement.style.removeProperty("--afx-body-color"),document.documentElement.style.removeProperty("--afx-text-shadow")},onResize:(i,t,e)=>{se&&(se.width=i,se.height=t,se.resize())},marqueeFont:{color:"#E6E6FA",shadowColor:"rgba(230, 230, 250, 0.6)",shadowBlur:8}};Xi(Si);function zt(i,t,e){function o(f,r){let n=i.createShader(f);return i.shaderSource(n,r),i.compileShader(n),i.getShaderParameter(n,i.COMPILE_STATUS)||console.error("[AnkiFX/WebGL] Shader compile error:",i.getShaderInfoLog(n)),n}let a=i.createProgram();i.attachShader(a,o(i.VERTEX_SHADER,t)),i.attachShader(a,o(i.FRAGMENT_SHADER,e)),i.linkProgram(a),i.getProgramParameter(a,i.LINK_STATUS)||console.error("[AnkiFX/WebGL] Program link error:",i.getProgramInfoLog(a)),i.useProgram(a),i.bindBuffer(i.ARRAY_BUFFER,i.createBuffer()),i.bufferData(i.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),i.STATIC_DRAW);let l=i.getAttribLocation(a,"position");return i.enableVertexAttribArray(l),i.vertexAttribPointer(l,2,i.FLOAT,!1,0,0),a}var Ut=null,Ge,ze,gt,Nt,me={id:"julia",name:"Julia Set",run:cr,stop:fr,onResize:(i,t,e)=>{Ge=i,ze=t,Nt&&gt&&Nt.uniform2f(gt,i*e,t*e)},preferredTrack:{title:"Acoustica Power Bundle 4",trackTitle:"AiR"},presets:[{name:"Black Hole",cRe:-.8,cIm:.156,zoomDepth:8,targetX:-.086441,targetY:-.239323},{name:"Electric Lightning",cRe:.285,cIm:.013,zoomDepth:6,targetX:-.106662,targetY:.656613},{name:"Golden Dragon",cRe:-.4,cIm:.6,zoomDepth:9,targetX:-.042175,targetY:-.036744},{name:"Filigree",cRe:-.70176,cIm:-.3842,zoomDepth:10.5,targetX:-.096904,targetY:-.656621},{name:"Fractal Storm",cRe:-.7269,cIm:.1889,zoomDepth:10.5,targetX:-.237086,targetY:.547981},{name:"Seahorse Spiral",cRe:-.74543,cIm:.11301,zoomDepth:7.5,targetX:-.529406,targetY:.072863}],marqueeFont:{color:"#FFF",outline:"#000"}},Bt=null,qt=null,Ot={x:0,y:0},Gi=parseInt(localStorage.getItem("ankifx_julia_preset_index")||"0",10),mt=me.presets[Gi]||me.presets[0],O={presetIndex:Gi,cRe:mt.cRe,cIm:mt.cIm,zoomDepth:mt.zoomDepth,targetX:mt.targetX,targetY:mt.targetY,speed:parseFloat(localStorage.getItem("ankifx_julia_speed"))||.15};function cr(i,t={}){Nt=i.gl;let e=i.gl,o=i.ctx2d;Ge=i.width,ze=i.height;let a=i.dpr,r=zt(e,`
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
    `),n=e.getUniformLocation(r,"u_time"),d=e.getUniformLocation(r,"u_speed");gt=e.getUniformLocation(r,"u_resolution");let u=e.getUniformLocation(r,"u_c"),s=e.getUniformLocation(r,"u_zoomDepth"),h=e.getUniformLocation(r,"u_target");e.uniform2f(gt,Ge*a,ze*a);let b=null,m=null,c=Ge<480,g=parseInt(localStorage.getItem("ankifx_julia_preset_index")||"0",10);O.presetIndex=g;let p=me.presets[g]||me.presets[0];O.cRe=t.cRe!==void 0?t.cRe:p.cRe,O.cIm=t.cIm!==void 0?t.cIm:p.cIm,O.zoomDepth=t.zoomDepth!==void 0?t.zoomDepth:p.zoomDepth,O.targetX=t.targetX!==void 0?t.targetX:p.targetX,O.targetY=t.targetY!==void 0?t.targetY:p.targetY;let y={type:"select",id:"julia-preset",label:"PRESET",options:me.presets.map((w,E)=>({value:E,text:(c?"\u{1F4A0} ":"[ Preset: ")+w.name+(c?"":" ]")})),value:O.presetIndex,onChange:w=>{let E=parseInt(w);localStorage.setItem("ankifx_julia_preset_index",E),O.presetIndex=E;let x=me.presets[E];x&&(Object.assign(t,x),O.cRe=x.cRe,O.cIm=x.cIm,O.zoomDepth=x.zoomDepth,O.targetX=x.targetX,O.targetY=x.targetY,t.debug&&(AnkiFX.setControlValue("julia-cRe",x.cRe),AnkiFX.setControlValue("julia-cIm",x.cIm),AnkiFX.setControlValue("julia-zoomDepth",x.zoomDepth),AnkiFX.setControlValue("julia-targetX",x.targetX),AnkiFX.setControlValue("julia-targetY",x.targetY)),me.stop(),i.ctx2d&&i.ctx2d.clearRect(0,0,Ge,ze),AnkiFX.startEffect(t,document.getElementById("ankifx-background"),t.marqueePosition,"julia"))}};if(t.debug?me.controls=[]:me.controls=[y],t.debug){me.controls.push({type:"slider",id:"julia-cRe",label:"C-RE",min:-1.5,max:1,step:.001,value:O.cRe,onChange:k=>{O.cRe=k}},{type:"slider",id:"julia-cIm",label:"C-IM",min:-1,max:1,step:.001,value:O.cIm,onChange:k=>{O.cIm=k}},{type:"slider",id:"julia-zoomDepth",label:"ZOOM",min:2,max:25,step:.1,value:O.zoomDepth,onChange:k=>{O.zoomDepth=k}},{type:"slider",id:"julia-targetX",label:"T-X",min:-2,max:2,step:1e-4,value:O.targetX,onChange:k=>{O.targetX=k}},{type:"slider",id:"julia-targetY",label:"T-Y",min:-2,max:2,step:1e-4,value:O.targetY,onChange:k=>{O.targetY=k}},{type:"slider",id:"julia-speed",label:"SPD",min:.005,max:.3,step:.005,value:O.speed,onChange:k=>{O.speed=k,localStorage.setItem("ankifx_julia_speed",k)}}),me.controls.push(y);let w=document.getElementById("afx-effect-controls-container");w&&(b=document.createElement("div"),b.id="afx-julia-debug-info",b.className="afx-control-row julia-debug-el",b.style.cssText="height: 20px !important; margin-bottom: 2px; pointer-events: none; justify-content: flex-end; opacity: 0.8; font-size: 11px !important; color: #ff00ff; border: none; background: transparent;",b.textContent="HOVER TO SEE TARGET COORDS",w.prepend(b)),m=(k,L,T)=>{let U=T*O.speed/Math.max(O.zoomDepth,1)%2,N=U>1?2-U:U,P=N<.5?4*Math.pow(N,3):1-Math.pow(-2*N+2,3)/2,$=2.2/Math.exp(P*O.zoomDepth),G=P*Math.PI*.5,V=(k-Ge/2)/ze,Q=(ze/2-L)/ze,K=Math.cos(G),M=Math.sin(G),_=(K*V+M*Q)*$,X=(-M*V+K*Q)*$;return{tx:O.targetX+_,ty:O.targetY+X}};let E=k=>{if(k.target.closest("#afx-bottom-dock")||k.target.closest(".afx-dialog"))return;let L=performance.now()*.001-v,{tx:T,ty:U}=m(k.clientX,k.clientY,L);O.targetX=T,O.targetY=U,AnkiFX.setControlValue("julia-targetX",T),AnkiFX.setControlValue("julia-targetY",U)};window.addEventListener("mousedown",E),Bt=E;let x=k=>{Ot.x=k.clientX,Ot.y=k.clientY};window.addEventListener("mousemove",x),qt=x}let v=performance.now()*.001;function C(){let w=performance.now()*.001-v;if(e.uniform1f(n,w),e.uniform1f(d,O.speed),e.uniform2f(u,O.cRe,O.cIm),e.uniform1f(s,O.zoomDepth),e.uniform2f(h,O.targetX,O.targetY),e.drawArrays(e.TRIANGLE_STRIP,0,4),o.clearRect(0,0,Ge,ze),b&&m){let E=performance.now()*.001-v,{tx:x,ty:k}=m(Ot.x,Ot.y,E);b.textContent=`TARGET X: ${x.toFixed(6)}, Y: ${k.toFixed(6)}`}Ut=requestAnimationFrame(C)}C()}function fr(){Ut&&(cancelAnimationFrame(Ut),Ut=null),Bt&&(window.removeEventListener("mousedown",Bt),Bt=null),qt&&(window.removeEventListener("mousemove",qt),qt=null),document.querySelectorAll(".julia-debug-el").forEach(i=>i.remove()),Nt=null,gt=null}var bt=null,tt=0,Ue=0,A=null,Z=null,Oe=[],jt=0,xt=null,ae={x:-1e3,y:-1e3,dx:0,dy:0,down:!1},Wi=null,Yi={id:"lavalamp",name:"Lava Lamp",run:pr,stop:xr,onResize:mr,marqueeFont:{color:"#ffccaa",shadowColor:"rgba(255, 100, 0, 0.8)",shadowBlur:10}},_e=6,Ht=class{constructor(t,e,o,a){this.pos={x:t,y:e},this.vel={x:0,y:-(Math.random()*.6+.3)},this.radius=o;let l=e/a;this.temperature=.15+l*.3+Math.random()*.15,this.buoyancy=0,this.noiseOffset=Math.random()*1e3,this.smoothSpeedY=0}update(t,e,o){this.pos.y>o*.8?this.temperature+=.05*t:this.pos.y>o*.6?this.temperature+=.02*t:this.pos.y<o*.2?this.temperature-=.04*t:this.pos.y<o*.4&&(this.temperature-=.015*t),this.temperature=Math.max(0,Math.min(1,this.temperature)),this.buoyancy=this.temperature*4-2,this.vel.y-=this.buoyancy*10*t;let a=Math.sin(this.noiseOffset+jt*2e-4)*.1;this.vel.x+=a*t*.3;let l=1-Math.min(Math.abs(this.buoyancy)/.8,1),f=(e*.5-this.pos.x)*.003*l;this.vel.x+=f*t,this.pos.x<this.radius&&(this.vel.x+=(this.radius-this.pos.x)*2*t),this.pos.x>e-this.radius&&(this.vel.x-=(this.pos.x-(e-this.radius))*2*t);let r=-this.radius*.5;this.pos.y<r&&(this.vel.y+=(r-this.pos.y)*8*t);let n=o+this.radius*.5;this.pos.y>n&&(this.vel.y-=(this.pos.y-n)*8*t);let d=Math.pow(.97,t*60);this.vel.x*=d;let s=Math.abs(this.buoyancy)>.8,h=Math.pow(s?.994:.975,t*60);this.vel.y*=h;let b=Math.max(0,(this.pos.y-o*.82)/(o*.18)),m=Math.max(0,(o*.18-this.pos.y)/(o*.18)),c=Math.pow(.88,t*60*(b+m));if(this.vel.x*=c,ae.down){let g=this.pos.x-ae.x,p=this.pos.y-ae.y,y=Math.sqrt(g*g+p*p);if(y<200){let v=(200-y)/200;this.vel.x+=ae.dx*v*1.5,this.vel.y+=ae.dy*v*8}}this.smoothSpeedY+=(Math.abs(this.vel.y)-this.smoothSpeedY)*(1-Math.pow(.05,t)),this.pos.x+=this.vel.x*t,this.pos.y+=this.vel.y*t}},ur=`
    attribute vec2 aPosition;
    varying vec2 vUv;
    void main() {
        vUv = aPosition * 0.5 + 0.5;
        // Match canvas 2D coordinates (Y=0 is top)
        vUv.y = 1.0 - vUv.y;
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }
`,dr=`
    precision highp float;
    varying vec2 vUv;
    
    uniform vec2 uResolution;
    uniform float uTime;
    
    uniform vec4 uBlobs[${_e}]; // x, y, radius, stretch
    uniform float uBlobTemp[${_e}]; // temperature
    
    // Polynomial smooth minimum
    float smin(float a, float b, float k) {
        float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
        return mix(b, a, h) - k * h * (1.0 - h);
    }
    
    float map(vec2 p) {
        float d = 10000.0;
        for (int i = 0; i < ${_e}; i++) {
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
`;function Vi(i,t){let e=A.createShader(i);return A.shaderSource(e,t),A.compileShader(e),A.getShaderParameter(e,A.COMPILE_STATUS)?e:(console.error("[LavaLamp/WebGL] Shader compile error:",A.getShaderInfoLog(e)),A.deleteShader(e),null)}function hr(){let i=Vi(A.VERTEX_SHADER,ur),t=Vi(A.FRAGMENT_SHADER,dr);if(Z=A.createProgram(),A.attachShader(Z,i),A.attachShader(Z,t),A.linkProgram(Z),!A.getProgramParameter(Z,A.LINK_STATUS))return console.error("[LavaLamp/WebGL] Program link error:",A.getProgramInfoLog(Z)),!1;A.useProgram(Z),xt=A.createBuffer(),A.bindBuffer(A.ARRAY_BUFFER,xt);let e=new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]);A.bufferData(A.ARRAY_BUFFER,e,A.STATIC_DRAW);let o=A.getAttribLocation(Z,"aPosition");return A.enableVertexAttribArray(o),A.vertexAttribPointer(o,2,A.FLOAT,!1,0,0),Z.uResolution=A.getUniformLocation(Z,"uResolution"),Z.uTime=A.getUniformLocation(Z,"uTime"),Z.uBlobs=A.getUniformLocation(Z,"uBlobs"),Z.uBlobTemp=A.getUniformLocation(Z,"uBlobTemp"),!0}function pr(i,t){if(A=i.gl,Wi=i.canvasGL,tt=i.width,Ue=i.height,!A){console.error("[LavaLamp] WebGL context required \u2014 cannot run effect.");return}if(!hr())return;Oe=[];let e=0;for(;Oe.length<_e&&e<200;){e++;let o=70+Math.random()*60,a=o+Math.random()*(tt-o*2),l=o+Math.random()*(Ue-o*2),f=!1;for(let r of Oe){let n=r.pos.x-a,d=r.pos.y-l;if(Math.sqrt(n*n+d*d)<r.radius+o+10){f=!0;break}}f||Oe.push(new Ht(a,l,o,Ue))}for(;Oe.length<_e;){let o=70+Math.random()*60,a=o+Math.random()*(tt-o*2),l=o+Math.random()*(Ue-o*2);Oe.push(new Ht(a,l,o,Ue))}jt=performance.now(),gr(),bt=requestAnimationFrame(Ki)}function mr(i,t,e){tt=i,Ue=t,A&&A.viewport(0,0,i*e,t*e)}function Ki(i){let t=Math.min((i-jt)/1e3,.05);jt=i;let e=new Float32Array(_e*4),o=new Float32Array(_e);for(let a=0;a<_e;a++)Oe[a].update(t,tt,Ue);for(let a=0;a<_e;a++){let l=Oe[a],f=Math.max(.85,1+Math.min(l.smoothSpeedY*.028,.7)*(.4+l.temperature*.6));e[a*4+0]=l.pos.x,e[a*4+1]=l.pos.y,e[a*4+2]=l.radius,e[a*4+3]=f,o[a]=l.temperature}A.useProgram(Z),A.uniform2f(Z.uResolution,tt,Ue),A.uniform1f(Z.uTime,i*.001),A.uniform4fv(Z.uBlobs,e),A.uniform1fv(Z.uBlobTemp,o),A.drawArrays(A.TRIANGLES,0,6),ae.dx=0,ae.dy=0,bt=requestAnimationFrame(Ki)}function vt(i){let t=Wi.getBoundingClientRect(),e=i.touches?i.touches[0]:i,o=e.clientX-t.left,a=e.clientY-t.top;if(ae.down&&i.type!=="mousedown"&&i.type!=="touchstart"){let l=o-ae.x,f=a-ae.y;Math.abs(l)<150&&Math.abs(f)<150&&(ae.dx=l,ae.dy=f)}ae.x=o,ae.y=a}function $t(i){ae.dx=0,ae.dy=0,ae.down=!0,vt(i)}function Xt(){ae.down=!1}function gr(){window.addEventListener("mousedown",$t),window.addEventListener("mousemove",vt),window.addEventListener("mouseup",Xt),window.addEventListener("touchstart",$t,{passive:!0}),window.addEventListener("touchmove",vt,{passive:!0}),window.addEventListener("touchend",Xt)}function br(){window.removeEventListener("mousedown",$t),window.removeEventListener("mousemove",vt),window.removeEventListener("mouseup",Xt),window.removeEventListener("touchstart",$t),window.removeEventListener("touchmove",vt),window.removeEventListener("touchend",Xt)}function xr(){bt&&(cancelAnimationFrame(bt),bt=null),br(),A&&(A.clearColor(0,0,0,0),A.clear(A.COLOR_BUFFER_BIT),Z&&A.deleteProgram(Z),xt&&A.deleteBuffer(xt),Z=null,xt=null)}var Vt=null,yt,Ve,wt,Kt,Jt={id:"mandelbrot",name:"Mandelbrot",run:vr,stop:yr,onResize:(i,t,e)=>{yt=i,Ve=t,Kt&&wt&&Kt.uniform2f(wt,i*e,t*e)},preferredTrack:{title:"Acoustica Power Bundle 4",trackTitle:"AiR"},marqueeFont:{color:"#FFF",outline:"#000"}},Wt=null,Yt=null,Gt={x:0,y:0},oe={targetX:-.743643887037151,targetY:.13182590420533,zoomDepth:11,speed:parseFloat(localStorage.getItem("ankifx_mandelbrot_speed"))||.15};function vr(i,t={}){Kt=i.gl;let e=i.gl,o=i.ctx2d;yt=i.width,Ve=i.height;let a=i.dpr,r=zt(e,`
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
    `),n=e.getUniformLocation(r,"u_time"),d=e.getUniformLocation(r,"u_speed"),u=e.getUniformLocation(r,"u_zoomDepth"),s=e.getUniformLocation(r,"u_target");wt=e.getUniformLocation(r,"u_resolution"),e.uniform2f(wt,yt*a,Ve*a);let h=null,b=null;if(t.debug){Jt.controls=[{type:"slider",id:"mandelbrot-zoomDepth",label:"ZOOM",min:2,max:25,step:.1,value:oe.zoomDepth,onChange:v=>{oe.zoomDepth=v}},{type:"slider",id:"mandelbrot-targetX",label:"T-X",min:-2.5,max:1,step:1e-4,value:oe.targetX,onChange:v=>{oe.targetX=v}},{type:"slider",id:"mandelbrot-targetY",label:"T-Y",min:-1.5,max:1.5,step:1e-4,value:oe.targetY,onChange:v=>{oe.targetY=v}},{type:"slider",id:"mandelbrot-speed",label:"SPD",min:.005,max:.3,step:.005,value:oe.speed,onChange:v=>{oe.speed=v,localStorage.setItem("ankifx_mandelbrot_speed",v)}}];let g=document.getElementById("afx-effect-controls-container");g&&(h=document.createElement("div"),h.id="afx-mandelbrot-debug-info",h.className="afx-control-row mandelbrot-debug-el",h.style.cssText="height: 20px !important; margin-bottom: 2px; pointer-events: none; justify-content: flex-end; opacity: 0.8; font-size: 11px !important; color: #ff00ff; border: none; background: transparent;",h.textContent="HOVER TO SEE TARGET COORDS",g.prepend(h)),b=(v,C,w)=>{let E=w*oe.speed/Math.max(oe.zoomDepth,1)%2,x=E>1?2-E:E,k=x<.5?4*Math.pow(x,3):1-Math.pow(-2*x+2,3)/2,L=Math.exp(k*oe.zoomDepth),T=(v-yt/2)/Ve,U=(Ve/2-C)/Ve;return{tx:oe.targetX+T*(2.5/L),ty:oe.targetY+U*(2.5/L)}};let p=v=>{if(v.target.closest("#afx-bottom-dock")||v.target.closest(".afx-dialog"))return;let C=performance.now()*.001-m,{tx:w,ty:E}=b(v.clientX,v.clientY,C);oe.targetX=w,oe.targetY=E,AnkiFX.setControlValue("mandelbrot-targetX",w),AnkiFX.setControlValue("mandelbrot-targetY",E)};window.addEventListener("mousedown",p),Wt=p;let y=v=>{Gt.x=v.clientX,Gt.y=v.clientY};window.addEventListener("mousemove",y),Yt=y}else Jt.controls=[];let m=performance.now()*.001;function c(){let g=performance.now()*.001-m;if(e.uniform1f(n,g),e.uniform1f(d,oe.speed),e.uniform1f(u,oe.zoomDepth),e.uniform2f(s,oe.targetX,oe.targetY),e.drawArrays(e.TRIANGLE_STRIP,0,4),o.clearRect(0,0,yt,Ve),h&&b){let p=performance.now()*.001-m,{tx:y,ty:v}=b(Gt.x,Gt.y,p);h.textContent=`TARGET X: ${y.toFixed(6)}, Y: ${v.toFixed(6)}`}Vt=requestAnimationFrame(c)}c()}function yr(){Vt&&(cancelAnimationFrame(Vt),Vt=null),Wt&&(window.removeEventListener("mousedown",Wt),Wt=null),Yt&&(window.removeEventListener("mousemove",Yt),Yt=null),document.querySelectorAll(".mandelbrot-debug-el").forEach(i=>i.remove()),Kt=null,wt=null}var kt=null,ei,Zt,Qt=16,Be=[];function Ji(){let i=Math.floor(ei/Qt);Be=[];for(let t=0;t<i;t++)Be[t]=Math.random()*-100}var Zi={id:"matrix",name:"Matrix",run:wr,stop:kr,onResize:(i,t)=>{ei=i,Zt=t,Ji()},preferredTrack:{trackTitle:"nightfall"},marqueeFont:{color:"#0F0",shadowColor:"#0F0",shadowBlur:10}};function wr(i,t){let e=i.ctx2d;ei=i.width,Zt=i.height,Ji();let o="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*]*";function a(){e.fillStyle="rgba(0, 0, 0, 0.1)",e.fillRect(0,0,ei,Zt),e.fillStyle="#0F0",e.font=Qt+"px monospace";for(let l=0;l<Be.length;l++)if(Be[l]>0||Math.random()>.95){let f=o.charAt(Math.floor(Math.random()*o.length)),r=Be[l]*Qt;e.fillText(f,l*Qt,r),r>Zt&&Math.random()>.975&&(Be[l]=0),Be[l]++}else Be[l]+=.5;kt=requestAnimationFrame(a)}kt=requestAnimationFrame(a)}function kr(){kt&&(cancelAnimationFrame(kt),kt=null)}var Qi={id:"none",name:"None",run:Er,stop:Sr,marqueeFont:{color:"#ffffff",shadowColor:"rgba(0,0,0,0.8)",shadowBlur:5}};function Er(i,t){i.ctx2d.clearRect(0,0,i.width,i.height)}function Sr(){}var Et=null,ne,Ae,eo={id:"starfield",name:"Starfield",run:Cr,stop:Pr,onResize:(i,t)=>{ne=i,Ae=t},preferredTrack:{trackTitle:"star wars title"},marqueeFont:{color:"#FFE81F",shadowColor:"#FFE81F",shadowBlur:20,outline:"#000"}};function Cr(i,t){let e=i.ctx2d;ne=i.width,Ae=i.height;let o=[],a=8e3,l=new Uint8Array(512),f=new Uint8Array(256).map(()=>Math.random()*256);for(let g=0;g<512;g++)l[g]=f[g&255];let r=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]];function n(g,p,y,v){return g[0]*p+g[1]*y+g[2]*v}function d(g,p,y){let v,C,w,E,x=.3333333333333333,k=1/6,L=(g+p+y)*x,T=Math.floor(g+L),U=Math.floor(p+L),N=Math.floor(y+L),P=(T+U+N)*k,q=g-T+P,$=p-U+P,G=y-N+P,V,Q,K,M,_,X;q>=$?$>=G?(V=1,Q=0,K=0,M=1,_=1,X=0):q>=G?(V=1,Q=0,K=0,M=1,_=0,X=1):(V=0,Q=0,K=1,M=1,_=0,X=1):$<G?(V=0,Q=0,K=1,M=0,_=1,X=1):q<G?(V=0,Q=1,K=0,M=0,_=1,X=1):(V=0,Q=1,K=0,M=1,_=1,X=0);let re=q-V+k,ue=$-Q+k,pe=G-K+k,de=q-M+2*k,S=$-_+2*k,D=G-X+2*k,W=q-1+3*k,R=$-1+3*k,J=G-1+3*k,he=T&255,we=U&255,Ce=N&255,ge=.6-q*q-$*$-G*G;ge<0?v=0:(ge*=ge,v=ge*ge*n(r[l[he+l[we+l[Ce]]]%12],q,$,G));let be=.6-re*re-ue*ue-pe*pe;be<0?C=0:(be*=be,C=be*be*n(r[l[he+V+l[we+Q+l[Ce+K]]]%12],re,ue,pe));let ke=.6-de*de-S*S-D*D;ke<0?w=0:(ke*=ke,w=ke*ke*n(r[l[he+M+l[we+_+l[Ce+X]]]%12],de,S,D));let xe=.6-W*W-R*R-J*J;return xe<0?E=0:(xe*=xe,E=xe*xe*n(r[l[he+1+l[we+1+l[Ce+1]]]%12],W,R,J)),32*(v+C+w+E)}function u(g,p,y,v=3){let C=0,w=.5;for(let E=0;E<v;E++)C+=d(g,p,y)*w,g*=2,p*=2,y*=2,w*=.5;return C}class s{constructor(){this.active=!1,this.nextSpawn=Date.now()+2e3}reset(){let p=Math.random()*Math.PI*2,y=.2+Math.random()*.4;this.x=Math.cos(p)*ne*y,this.y=Math.sin(p)*Ae*y,this.z=ne,this.sizeBase=80+Math.random()*120,this.speed=.8,this.active=!0,this.type=1+Math.floor(Math.random()*2);let v=[{name:"ice",baseH:190+Math.random()*40,sat:60,l:70},{name:"inferno",baseH:Math.random()*40,sat:80,l:60},{name:"toxic",baseH:80+Math.random()*40,sat:70,l:60},{name:"ethereal",baseH:260+Math.random()*40,sat:60,l:75},{name:"classic",baseH:30+Math.random()*20,sat:50,l:80}],C=v[Math.floor(Math.random()*v.length)];this.generateGasGiantTexture(C),this.type===2&&(this.rings=Array.from({length:4},(w,E)=>({r1:1.6+E*.2,opacity:.2+Math.random()*.4})))}hslToRgb(p,y,v){p/=360,y/=100,v/=100;let C,w,E;if(y===0)C=w=E=v;else{let x=v<.5?v*(1+y):v+y-v*y,k=2*v-x,L=T=>(T<0&&(T+=1),T>1&&(T-=1),T<1/6?k+(x-k)*6*T:T<1/2?x:T<2/3?k+(x-k)*(2/3-T)*6:k);C=L(p+1/3),w=L(p),E=L(p-1/3)}return{r:C*255,g:w*255,b:E*255}}generateGasGiantTexture(p){let y=document.createElement("canvas");y.width=y.height=256;let v=y.getContext("2d"),C=v.createImageData(256,256),w=p.baseH,E=this.hslToRgb(w,p.sat,p.l),x=this.hslToRgb((w+20)%360,p.sat+10,p.l-10),k=this.hslToRgb((w-40+360)%360,p.sat+20,p.l-15),L=this.hslToRgb((w+60)%360,p.sat-20,p.l+10),T=(N,P,q)=>({r:N.r+(P.r-N.r)*q,g:N.g+(P.g-N.g)*q,b:N.b+(P.b-N.b)*q}),U=Math.random()*1e3;for(let N=0;N<256;N++)for(let P=0;P<256;P++){let q=N/256*10,$=P/256*10,G=Math.abs(u(0,q*.4,U,3)),V=q+u($*.5,q*.5,U)*G*4,Q=$+u(q*.5,$*.5,U+50)*G*2,K=(u(0,V*.8,U+100,4)+1)/2,M=(u(Q*.1,V*1.5,U+200,2)+1)/2,_=T(x,E,K);K>.7&&(_=T(_,L,(K-.7)*2)),M>.6&&(_=T(_,k,(M-.6)*1.5));let X=1+u(Q,V,U+300,2)*.2,re=(N*256+P)*4;C.data[re]=Math.min(255,_.r*X),C.data[re+1]=Math.min(255,_.g*X),C.data[re+2]=Math.min(255,_.b*X),C.data[re+3]=255}v.putImageData(C,0,0),this.textureCanvas=y}update(){if(!this.active){Date.now()>this.nextSpawn&&this.reset();return}this.z-=this.speed,this.z<=0&&(this.active=!1,this.nextSpawn=Date.now())}draw(p){if(!this.active)return;let y=ne/2/this.z,v=this.x*y+ne/2,C=this.y*y+Ae/2,w=(1-this.z/ne)*this.sizeBase;if(v<-w*3||v>ne+w*3||C<-w*3||C>Ae+w*3)return;p.save(),p.translate(v,C),this.type===2&&(this.drawRings(p,w,!0),p.globalAlpha=1);let E=p.createRadialGradient(0,0,w*.9,0,0,w*1.5);E.addColorStop(0,"rgba(255, 255, 255, 0.15)"),E.addColorStop(1,"rgba(0,0,0,0)"),p.fillStyle=E,p.beginPath(),p.arc(0,0,w*1.5,0,Math.PI*2),p.fill(),p.save(),p.beginPath(),p.arc(0,0,w,0,Math.PI*2),p.clip(),p.globalAlpha=1,p.drawImage(this.textureCanvas,-w,-w,w*2,w*2);let x=p.createRadialGradient(-w*.5,-w*.5,w*.1,0,0,w);x.addColorStop(0,"rgba(255, 255, 255, 0.25)"),x.addColorStop(.5,"rgba(0, 0, 0, 0)"),x.addColorStop(1,"rgba(0, 0, 0, 0.4)"),p.fillStyle=x,p.fillRect(-w,-w,w*2,w*2),p.restore();let k=p.createRadialGradient(0,0,w*.7,0,0,w);k.addColorStop(1,"rgba(255,255,255,0.4)"),k.addColorStop(.8,"rgba(255,255,255,0)"),p.fillStyle=k,p.beginPath(),p.arc(0,0,w,0,Math.PI*2),p.fill(),this.type===2&&(this.drawRings(p,w,!1),p.globalAlpha=1),p.restore()}drawRings(p,y,v){p.save();let C=Math.PI/8;for(let w of this.rings)p.globalAlpha=w.opacity,p.strokeStyle="#E6E6FA",p.lineWidth=y*.15,p.beginPath(),p.ellipse(0,0,w.r1*y,w.r1*.3*y,C,0,Math.PI*2),p.stroke();p.restore()}}let h=new s,b=["#FFFFFF","#FFE4B5","#E0FFFF","#FFF0F5","#F0F8FF"];for(let g=0;g<a;g++)o.push({x:(Math.random()-.5)*ne*4,y:(Math.random()-.5)*Ae*4,z:Math.random()*ne,color:b[Math.floor(Math.random()*b.length)],sizeBase:2+Math.random()*2.5});let m=0;function c(){e.fillStyle="rgba(5, 5, 12, 1)",e.fillRect(0,0,ne,Ae);let g=ne/2,p=Ae/2;m+=.01,h.update(),h.draw(e);for(let y=0;y<a;y++){let v=o[y],C=v.z;if(v.z-=4,v.z<=0){v.x=(Math.random()-.5)*ne*4,v.y=(Math.random()-.5)*Ae*4,v.z=ne;continue}let w=ne/2/v.z,E=v.x*w+g,x=v.y*w+p;if(E>=0&&E<=ne&&x>=0&&x<=Ae){let k=1-v.z/ne,L=k*v.sizeBase;if(k<.3){e.globalAlpha=k*2,e.fillStyle=v.color,e.fillRect(E,x,Math.max(1,L),Math.max(1,L));continue}e.globalAlpha=k,e.fillStyle=v.color,e.strokeStyle=v.color;let T=ne/2/C,U=v.x*T+g,N=v.y*T+p;e.lineWidth=L,e.beginPath(),e.moveTo(U,N),e.lineTo(E,x),e.stroke(),e.beginPath(),e.arc(E,x,L/2,0,Math.PI*2),e.fill(),k>.8&&(e.globalAlpha=(k-.8)*3,e.beginPath(),e.arc(E,x,L*2.5,0,Math.PI*2),e.fill())}}e.globalAlpha=1,Et=requestAnimationFrame(c)}Et=requestAnimationFrame(c)}function Pr(){Et&&(cancelAnimationFrame(Et),Et=null)}var St=null,We,Ct,ti=0,ii=0,Se=null;function io(){if(We===void 0||Ct===void 0)return;let i=Math.max(100,ii),t=Math.max(14,Math.floor(We/25)),e=Math.floor(We/t),o=Math.floor(i/t);Se=new Pi(e,o,t)}var oo={id:"tetris",name:"Tetris",run:Fr,stop:Mr,onResize:(i,t)=>{We=i,Ct=t;let e=getComputedStyle(document.documentElement);ti=parseInt(e.getPropertyValue("--io-header"))||0,ii=t-ti,io()},preferredTrack:{title:"WinTask 3",trackTitle:"Whoopees Tetris"},marqueeFont:{color:"#f0f0f0",shadowColor:"#a000f0",shadowBlur:12,outline:"#000"}},ro={I:{shapes:[[[1,1,1,1]],[[1],[1],[1],[1]]],color:"#00f0f0"},O:{shapes:[[[1,1],[1,1]]],color:"#f0f000"},T:{shapes:[[[0,1,0],[1,1,1]],[[1,0],[1,1],[1,0]],[[1,1,1],[0,1,0]],[[0,1],[1,1],[0,1]]],color:"#a000f0"},S:{shapes:[[[0,1,1],[1,1,0]],[[1,0],[1,1],[0,1]]],color:"#00f000"},Z:{shapes:[[[1,1,0],[0,1,1]],[[0,1],[1,1],[1,0]]],color:"#f00000"},J:{shapes:[[[1,0,0],[1,1,1]],[[1,1],[1,0],[1,0]],[[1,1,1],[0,0,1]],[[0,1],[0,1],[1,1]]],color:"#0000f0"},L:{shapes:[[[0,0,1],[1,1,1]],[[1,0],[1,0],[1,1]],[[1,1,1],[1,0,0]],[[1,1],[0,1],[0,1]]],color:"#f0a000"}},to=Object.keys(ro),Ci=class{constructor(t,e,o){this.x=t,this.y=e,this.color=o,this.vx=(Math.random()-.5)*12,this.vy=(Math.random()-.7)*14,this.gravity=.45,this.life=1,this.decay=.012+Math.random()*.018,this.size=1+Math.random()*2.5}update(){this.vx*=.985,this.vy+=this.gravity,this.x+=this.vx,this.y+=this.vy,this.life-=this.decay}draw(t){t.globalAlpha=Math.max(0,this.life),t.fillStyle=this.color,t.fillRect(this.x,this.y,this.size,this.size)}},Pi=class{constructor(t,e,o){this.cols=t,this.rows=e,this.cellSize=o,this.board=Array.from({length:e},()=>Array(t).fill(null)),this.particles=[],this.exploding=!1,this.explodeTimer=0,this.EXPLODE_DURATION=120,this.level=1,this.linesTotal=0,this.dropCounter=0,this.moveCounter=0,this._spawnPiece()}_randomPiece(){let t=to[Math.floor(Math.random()*to.length)],e=ro[t],o=Math.floor(Math.random()*e.shapes.length);return{shape:e.shapes[o],color:e.color,key:t,rotIdx:o,def:e}}_spawnPiece(){let t=this._randomPiece();this.current={...t,x:Math.floor((this.cols-t.shape[0].length)/2),y:0},this._selectTarget()}_fits(t,e,o){for(let a=0;a<t.length;a++)for(let l=0;l<t[a].length;l++){if(!t[a][l])continue;let f=e+l,r=o+a;if(f<0||f>=this.cols||r>=this.rows||r>=0&&this.board[r][f]!==null)return!1}return!0}_lock(){let{shape:t,x:e,y:o,color:a}=this.current;for(let l=0;l<t.length;l++)for(let f=0;f<t[l].length;f++){if(!t[l][f])continue;let r=o+l,n=e+f;r>=0&&r<this.rows&&n>=0&&n<this.cols&&(this.board[r][n]=a)}this._clearRows()}_clearRows(){let t=0;for(let e=this.rows-1;e>=0;e--)this.board[e].every(o=>o!==null)&&(this.board.splice(e,1),this.board.unshift(Array(this.cols).fill(null)),t++,e++);return t>0&&(this.linesTotal+=t,this.level=Math.floor(this.linesTotal/10)+1),t}_choosePlacement(){let{def:t}=this.current,e=-1/0,o=this.current.x,a=this.current.rotIdx;for(let l=0;l<t.shapes.length;l++){let f=t.shapes[l],r=f[0].length;for(let n=0;n<=this.cols-r;n++){let d=0;for(;this._fits(f,n,d+1);)d++;if(!this._fits(f,n,d))continue;let u=this._getHeuristicScore(f,n,d);u>e&&(e=u,o=n,a=l)}}return{x:o,rotIdx:a}}_getHeuristicScore(t,e,o){let a=this.board.map(u=>[...u]);for(let u=0;u<t.length;u++)for(let s=0;s<t[u].length;s++){if(!t[u][s])continue;let h=o+u,b=e+s;h>=0&&h<this.rows&&(a[h][b]="X")}let l=0;for(let u=0;u<this.rows;u++)a[u].every(s=>s!==null)&&l++;let f=Array(this.cols).fill(0),r=0;for(let u=0;u<this.cols;u++)for(let s=0;s<this.rows;s++)if(a[s][u]!==null){f[u]=this.rows-s,r+=f[u];break}let n=0;for(let u=0;u<this.cols;u++){let s=!1;for(let h=0;h<this.rows;h++)a[h][u]!==null?s=!0:s&&n++}let d=0;for(let u=0;u<this.cols-1;u++)d+=Math.abs(f[u]-f[u+1]);return r*-.51+l*.76+n*-.35+d*-.18+Math.random()*.1}_isBoardFull(){for(let t=0;t<3;t++)if(this.board[t].some(e=>e!==null))return!0;return!1}_explodeBoard(t,e){for(let o=0;o<this.rows;o++)for(let a=0;a<this.cols;a++)if(this.board[o][a]){let l=t+a*this.cellSize+this.cellSize/2,f=e+o*this.cellSize+this.cellSize/2,r=4+Math.floor(Math.random()*4);for(let n=0;n<r;n++)this.particles.push(new Ci(l,f,this.board[o][a]))}}_reset(){this.board=Array.from({length:this.rows},()=>Array(this.cols).fill(null)),this.exploding=!1,this.explodeTimer=0,this.particles=[],this._spawnPiece()}_selectTarget(){let{x:t,rotIdx:e}=this._choosePlacement(),o=this.current.def;this.current.rotIdx=e,this.current.shape=o.shapes[e],this.current.targetX=t,this.current.y=0,this.current.x=Math.floor((this.cols-this.current.shape[0].length)/2)}step(t,e){if(this.exploding){this.explodeTimer++,this.particles=this.particles.filter(l=>l.life>0),this.particles.forEach(l=>l.update()),this.explodeTimer>=this.EXPLODE_DURATION&&this._reset();return}this.moveCounter++,this.moveCounter>=2&&(this.moveCounter=0,this.current.x<this.current.targetX?this._fits(this.current.shape,this.current.x+1,this.current.y)&&this.current.x++:this.current.x>this.current.targetX&&this._fits(this.current.shape,this.current.x-1,this.current.y)&&this.current.x--);let o=this.current.x===this.current.targetX,a=Math.max(4,40-(this.level-1)*3);o&&(a=1),this.dropCounter++,this.dropCounter>=a&&(this.dropCounter=0,this._fits(this.current.shape,this.current.x,this.current.y+1)?this.current.y++:(this._lock(),this._isBoardFull()?(this._explodeBoard(t,e),this.exploding=!0,this.explodeTimer=0):this._spawnPiece()))}draw(t,e,o){let a=this.cellSize,l={};for(let f=0;f<this.rows;f++)for(let r=0;r<this.cols;r++){let n=this.board[f][r];n&&(l[n]||(l[n]=[]),l[n].push({px:e+r*a,py:o+f*a,alpha:this.exploding?Math.max(0,1-this.explodeTimer/40):1}))}if(!this.exploding&&this.current){let{shape:f,x:r,y:n,color:d}=this.current;if(d){l[d]||(l[d]=[]);for(let u=0;u<f.length;u++)for(let s=0;s<f[u].length;s++)f[u][s]&&l[d].push({px:e+(r+s)*a,py:o+(n+u)*a,alpha:1})}}for(let f in l){let r=l[f];t.fillStyle=f,r.forEach(n=>{t.globalAlpha=n.alpha,t.fillRect(n.px+1,n.py+1,a-2,a-2)})}t.globalAlpha=1,t.strokeStyle="rgba(255, 255, 255, 0.35)",t.lineWidth=1.5,t.beginPath();for(let f in l)l[f].forEach(r=>{t.globalAlpha=r.alpha;let n=r.px,d=r.py;t.moveTo(n+1,d+a-2),t.lineTo(n+1,d+1),t.lineTo(n+a-2,d+1)});t.stroke(),t.strokeStyle="rgba(0, 0, 0, 0.45)",t.beginPath();for(let f in l)l[f].forEach(r=>{t.globalAlpha=r.alpha;let n=r.px,d=r.py;t.moveTo(n+1,d+a-1),t.lineTo(n+a-1,d+a-1),t.lineTo(n+a-1,d+1)});t.stroke(),t.globalAlpha=1,t.save(),this.particles.forEach(f=>f.draw(t)),t.restore(),t.globalAlpha=1}};function Fr(i,t){let e=i.ctx2d;We=i.width,Ct=i.height,ti=i.topInset||0,ii=i.visibleHeight||Ct,io();function o(){if(e.fillStyle="rgba(8, 6, 18, 0.92)",e.fillRect(0,0,We,Ct),e.strokeStyle="rgba(255,255,255,0.04)",e.lineWidth=.5,Se){let a=Se.cellSize,l=Math.floor((We-Se.cols*a)/2),f=ti+(ii-Se.rows*a);e.beginPath();for(let r=0;r<=Se.cols;r++)e.moveTo(l+r*a,f),e.lineTo(l+r*a,f+Se.rows*a);for(let r=0;r<=Se.rows;r++)e.moveTo(l,f+r*a),e.lineTo(l+Se.cols*a,f+r*a);e.stroke(),Se.step(l,f),Se.draw(e,l,f)}St=requestAnimationFrame(o)}St=requestAnimationFrame(o)}function Mr(){St&&(cancelAnimationFrame(St),St=null)}var te={aurora:Bi,debug:Ni,ecg:Ee,fire:ji,geometry:Hi,gradient:Si,julia:me,lavalamp:Yi,mandelbrot:Jt,matrix:Zi,none:Qi,starfield:eo,tetris:oo};var oi=class{constructor(t="",e="bottom",o={}){this.text=t,this.position=e,this.applyStyles(o),this.time=0,this.textX=0,this.initialized=!1,this.baseCharWidth=15,this.baseFontSize=24,this.baseVelocity=2.8,this.baseBounce=12,this.fontFamily='"Courier New", monospace',this.fontWeight="bold",this.enabled=!0}applyStyles(t={}){this.color=t.color||"#FFF",this.outline=t.outline||null,this.shadowColor=t.shadowColor||null,this.shadowBlur=t.shadowBlur||0,this.colorFn=t.colorFn||null}updateStyles(t={}){this.applyStyles(t)}setText(t){this.text=t}setPosition(t){this.position=t}render(t,e,o){if(!this.enabled)return;this.initialized||(this.textX=e,this.initialized=!0);let a=e<480?.65:e<768?.8:1,l=Math.max(12,Math.floor(this.baseFontSize*a)),f=this.baseBounce*a,r=this.baseCharWidth*a,n=this.baseVelocity*a;if(this.time+=.012,!this.text)return;let d=this.text.length*r;this.textX-=n,this.textX<-(d+e*1.1)&&(this.textX=e),t.font=`${this.fontWeight} ${l}px ${this.fontFamily}`,t.lineJoin="round",this.outline&&(t.lineWidth=4,t.strokeStyle=this.outline);let u=50*a,s=32*a,h=this.position==="bottom"?o-s:u;for(let b=0;b<this.text.length;b++){let m=this.text[b],c=this.textX+b*r;if(c>-40&&c<e+40){let g=h+Math.sin(this.time*4+b*.1)*f;t.fillStyle=this.colorFn?this.colorFn(this.time,b):this.color,this.shadowColor?(t.shadowColor=this.shadowColor==="inherit"?t.fillStyle:this.shadowColor,t.shadowBlur=this.shadowBlur):t.shadowBlur=0,this.outline&&t.strokeText(m,c,g),t.fillText(m,c,g),this.shadowColor&&(t.shadowBlur=0)}}}};var ao=`:root {
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
}`;function no(){return/iPad|iPhone|iPod/.test(navigator.userAgent)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1}function Fi(){return Math.min(window.devicePixelRatio||1,1.5)}function ri(){return Math.min(window.devicePixelRatio||1,2)}function ai(i,t){let e=Fi();return i==="mandelbrot"||i==="julia"?e:t}function De(){let i=getComputedStyle(document.documentElement);return{ioHeader:parseInt(i.getPropertyValue("--io-header"))||0,topInset:parseInt(i.getPropertyValue("--top-inset"))||0,bottomInset:parseInt(i.getPropertyValue("--bottom-inset"))||0}}function it(){return localStorage.getItem("ankifx_marquee_enabled")!=="false"}function Pt(){return(window.innerWidth||document.documentElement.clientWidth||800)<480}var Ar={deckTitle:"AnkiFX Deck",deckAuthor:"Anonymous",termsText:"No terms provided.",sources:[],marquee:"ANKIFX ENGINE INITIALIZED ...",defaultEffect:"geometry",debug:!1,countdown:30,marqueePosition:"top"};function lo(i={}){let t={...Ar,...window.AnkiFX_Config||{},...i};Array.isArray(t.sources)||(t.sources=[]);let e=parseInt(t.countdown,10);return t.countdown=isNaN(e)?30:Math.max(0,e),t.isConfigFileError=typeof t.termsText!="string"||t.termsText.trim()===""||t.termsText==="No terms provided.",t}function so(i){let t=window.AnkiFX_Config?.defaultEffect,e;return t?(e=t,localStorage.setItem("ankifx_preferred_effect",e)):e=localStorage.getItem("ankifx_preferred_effect")||i.defaultEffect||"geometry",te[e]||(console.warn(`[AnkiFX] Unknown effect "${e}" \u2014 falling back to "${i.defaultEffect||"geometry"}".`),e=i.defaultEffect||"geometry",te[e]||(e=Object.keys(te)[0]||"geometry"),localStorage.setItem("ankifx_preferred_effect",e)),e}function co(i,t){let e=document.getElementById("ankifx-overlay");if(!e||!e.classList.contains("afx-agreed-state"))return!1;i.sharedGL||(i.sharedGL=document.getElementById("afx-shared-gl")),i.shared2D||(i.shared2D=document.getElementById("afx-shared-2d")),i.sharedMarquee||(i.sharedMarquee=document.getElementById("afx-shared-marquee")),i.sharedGL&&!i.glContext&&(i.glContext=i.sharedGL.getContext("webgl",{alpha:!1,antialias:!1})),i.shared2D&&!i.ctx2D&&(i.ctx2D=i.shared2D.getContext("2d")),i.sharedMarquee&&!i.ctxMarquee&&(i.ctxMarquee=i.sharedMarquee.getContext("2d"));let o=document.getElementById("ankifx-background");if(o){let l=o.getBoundingClientRect();i.width=l.width;let f=De();i.height=document.documentElement.clientHeight+f.ioHeader,i.dpr=ri()}if(!i.currentEffectId){let l=Array.from(document.documentElement.classList).find(f=>f.startsWith("afx-effect-"));l&&(i.currentEffectId=l.replace("afx-effect-",""))}i.defaultMarqueeText=t.marquee,i.marquee&&(i.marquee.setText(t.marquee),i.marquee.setPosition(t.marqueePosition));let a=document.getElementById("afx-deck-title");return a&&(a.textContent=t.deckTitle),!0}function Ft(i){let t=document.getElementById("afx-effect-controls-container");t&&(t.innerHTML="",!(!i||!i.controls||i.controls.length===0)&&i.controls.forEach(e=>{let o=document.createElement("div");if(o.className="afx-control-row",o.id=`afx-control-container-${e.id}`,e.type==="toggle")o.innerHTML=`
                    <label class="afx-toggle">
                        <input type="checkbox" id="afx-control-${e.id}" ${e.value?"checked":""}>
                        <span class="afx-slider"></span>
                    </label>
                    <span id="afx-control-label-${e.id}">${e.label}</span>
                `,o.querySelector("input").addEventListener("change",l=>{e.onChange&&e.onChange(l.target.checked)});else if(e.type==="slider"){o.classList.add("afx-slider-row");let a=e.step||1,l=a.toString().includes(".")?a.toString().split(".")[1].length:0;o.innerHTML=`
                    <span class="afx-slider-label">${e.label}:</span>
                    <input type="range" id="afx-control-${e.id}" class="afx-range-slider" min="${e.min}" max="${e.max}" step="${a}" value="${e.value}">
                    <span id="afx-control-val-${e.id}" class="afx-slider-val-text">${e.value.toFixed(l)}</span>
                `;let f=o.querySelector("input"),r=o.querySelector(".afx-slider-val-text");f.addEventListener("input",n=>{let d=parseFloat(n.target.value);r.innerText=d.toFixed(l),e.onChange&&e.onChange(d)})}else if(e.type==="button")o.style.padding="0",o.innerHTML=`
                    <button id="afx-control-${e.id}" class="afx-action-btn">
                        ${e.label}
                    </button>
                `,o.querySelector("button").addEventListener("click",l=>{l.stopPropagation(),e.onClick&&e.onClick()});else if(e.type==="select"){o.style.padding="0";let a=(e.options||[]).map(f=>{let r=typeof f=="object"?f.value:f,n=typeof f=="object"?f.text:f,d=r==e.value?"selected":"";return`<option value="${r}" ${d}>${n}</option>`}).join("");o.innerHTML=`
                    <select id="afx-control-${e.id}" class="afx-select">
                        ${a}
                    </select>
                `,o.querySelector("select").addEventListener("change",f=>{e.onChange&&e.onChange(f.target.value)})}t.appendChild(o)}))}function fo(i,t){let e=document.getElementById(`afx-control-${i}`);e&&(e.type==="checkbox"?e.checked=!!t:e.value=t);let o=document.getElementById(`afx-control-val-${i}`);if(o){let a=e?e.step:"",l=a&&a.includes(".")?a.split(".")[1].length:0;o.innerText=typeof t=="number"?t.toFixed(l||(t%1===0?0:4)):t}}function Mt(i,t,e,o,a){a==="debug"?e.classList.add("afx-debug-active"):e.classList.remove("afx-debug-active");let l=document.documentElement;Array.from(l.classList).forEach(r=>{r.startsWith("afx-effect-")&&l.classList.remove(r)}),l.classList.add(`afx-effect-${a}`),i.currentEffectId=a;let f=te[a];if(f){let r=De(),n=ai(a,i.dpr),d={gl:i.glContext,ctx2d:i.ctx2D,canvasGL:i.sharedGL,canvas2D:i.shared2D,width:i.width,height:i.height,dpr:n,topInset:r.ioHeader,visibleWidth:i.width,visibleHeight:i.height-r.ioHeader,visibleBounds:{top:r.ioHeader,bottom:i.height}};i.marquee&&i.marquee.updateStyles(f.marqueeFont||{}),f.run(d,t),Ft(f),i.marquee&&(i.marquee.enabled=it())}else i.marquee&&i.marquee.updateStyles({}),Ft(null)}function qe(i){let t=document.getElementById("ankifx-background");if(!t||!i.sharedGL||!i.shared2D||!i.sharedMarquee)return;let o=De().ioHeader;document.documentElement.style.setProperty("--afx-viewport-height",`calc(100dvh + ${o}px)`);let a=t.getBoundingClientRect();i.width=a.width,i.height=document.documentElement.clientHeight+o,i.dpr=ri();let l=Fi();if(i.sharedGL.width=i.width*l,i.sharedGL.height=i.height*l,i.sharedGL.style.width=i.width+"px",i.sharedGL.style.height=i.height+"px",i.shared2D.width=i.width*i.dpr,i.shared2D.height=i.height*i.dpr,i.shared2D.style.width=i.width+"px",i.shared2D.style.height=i.height+"px",i.sharedMarquee.width=i.width*i.dpr,i.sharedMarquee.height=i.height*i.dpr,i.sharedMarquee.style.width=i.width+"px",i.sharedMarquee.style.height=i.height+"px",i.glContext&&i.glContext.viewport(0,0,i.sharedGL.width,i.sharedGL.height),i.ctx2D&&(i.ctx2D.setTransform(1,0,0,1,0,0),i.ctx2D.scale(i.dpr,i.dpr)),i.ctxMarquee&&(i.ctxMarquee.setTransform(1,0,0,1,0,0),i.ctxMarquee.scale(i.dpr,i.dpr)),i.currentEffectId&&te[i.currentEffectId]?.onResize){let f=ai(i.currentEffectId,i.dpr);te[i.currentEffectId].onResize(i.width,i.height,f)}}function uo(i){let e=De().ioHeader,o=window.innerHeight,a=document.documentElement.clientHeight,l=setInterval(()=>{let f=De(),r=window.innerHeight,n=document.documentElement.clientHeight;(f.ioHeader!==e||r!==o||n!==a)&&(e=f.ioHeader,o=r,a=n,qe(i))},50);setTimeout(()=>clearInterval(l),2e3)}function ho(i){i._layoutHandler&&(window.removeEventListener("orientationchange",i._layoutHandler),window.removeEventListener("resize",i._layoutHandler)),i._resizeTimeout&&clearTimeout(i._resizeTimeout),i._resizeInterval&&clearInterval(i._resizeInterval),i._layoutHandler=()=>{i._resizeTimeout&&clearTimeout(i._resizeTimeout),i._resizeInterval&&clearInterval(i._resizeInterval),qe(i),i._resizeTimeout=setTimeout(()=>{qe(i)},100);let t=0,e=i.width,o=i.height;i._resizeInterval=setInterval(()=>{if(t+=100,t>=1500){clearInterval(i._resizeInterval);return}let a=De(),l=document.getElementById("ankifx-background"),f=l?l.getBoundingClientRect():null,r=f?f.width:window.innerWidth,n=document.documentElement.clientHeight+a.ioHeader;(r!==e||n!==o)&&(e=r,o=n,qe(i))},100)},window.addEventListener("orientationchange",i._layoutHandler),window.addEventListener("resize",i._layoutHandler)}function po(i){let t=document.getElementById("afx-bottom-dock");t&&(i.dockObserver=new ResizeObserver(()=>{let e=t.getBoundingClientRect();document.documentElement.style.setProperty("--afx-dock-height",`${e.height}px`)}),i.dockObserver.observe(t))}function mo(i){i.observer||(i.observer=new MutationObserver(()=>{setTimeout(()=>{let t=document.getElementById("qa");(t?!!t.querySelector(".ankifx-card"):!1)?ni():typeof i=="object"&&window.AnkiFX&&window.AnkiFX.destroy()},20)}),i.observer.observe(document.documentElement,{childList:!0,subtree:!0}))}function ni(){let i=document.getElementById("_flag"),t=document.getElementById("_mark"),e=document.getElementById("afx-top-group-left"),o=document.getElementById("afx-top-group-right"),a=document.getElementById("afx-btn-skip");if(t&&e){let l=document.getElementById("afx-global-fps");l&&t.nextSibling!==l?e.insertBefore(t,l):!l&&t.parentElement!==e&&e.appendChild(t)}i&&o&&i.parentElement!==o&&o.insertBefore(i,a)}function Mi(i){if(i.marqueeInterval)return;let t=0,e=0,o=a=>{if(a===void 0&&(a=performance.now()),t||(t=a),e++,a-t>=1e3){let l=document.getElementById("afx-global-fps");l&&(l.textContent=`FPS: ${e}`),e=0,t=a}if(i.marquee&&i.ctxMarquee){if(i.ctxMarquee.clearRect(0,0,i.width,i.height),i.currentEffectId&&te[i.currentEffectId]?.drawOverlay)try{te[i.currentEffectId].drawOverlay(i.ctxMarquee,i.width,i.height,a)}catch(l){console.error("[AnkiFX] drawOverlay error:",l)}i.marquee.render(i.ctxMarquee,i.width,i.height)}i.marqueeInterval=requestAnimationFrame(o)};i.marqueeInterval=requestAnimationFrame(o)}function go(i,t,e,o){let a=t.countdown;if((t.debug||t.isConfigFileError)&&(a=0),a>0){o.textContent=`( ${a} )`;let l=setInterval(()=>{a--,o.textContent=`( ${a} )`,a<=0&&(clearInterval(l),o.textContent="I AGREE",o.disabled=!1)},1e3)}else o.textContent="I AGREE",o.disabled=!1;o.addEventListener("click",l=>{l.stopPropagation(),o.disabled||window.AnkiFX.agree(e,t.deckTitle)})}window.neoart=Object.create(null);function Ti(i,t){var e=Object.create(null,{endian:{value:1,writable:!0},length:{value:0,writable:!0},index:{value:0,writable:!0},buffer:{value:null,writable:!0},view:{value:null,writable:!0},bytesAvailable:{get:function(){return this.length-this.index}},position:{get:function(){return this.index},set:function(o){o<0?o=0:o>this.length&&(o=this.length),this.index=o}},clear:{value:function(){this.buffer=new ArrayBuffer,this.view=null,this.index=this.length=0}},readAt:{value:function(o){return this.view.getUint8(o)}},readByte:{value:function(){return this.view.getInt8(this.index++)}},readShort:{value:function(){var o=this.view.getInt16(this.index,this.endian);return this.index+=2,o}},readInt:{value:function(){var o=this.view.getInt32(this.index,this.endian);return this.index+=4,o}},readUbyte:{value:function(){return this.view.getUint8(this.index++)}},readUshort:{value:function(){var o=this.view.getUint16(this.index,this.endian);return this.index+=2,o}},readUint:{value:function(){var o=this.view.getUint32(this.index,this.endian);return this.index+=4,o}},readBytes:{value:function(o,a,l){var f=o.view,r=this.index,n=this.view;for((l+=r)>this.length&&(l=this.length);r<l;++r)f.setUint8(a++,n.getUint8(r));this.index=r}},readString:{value:function(o){var a=this.index,l=this.view,f="";for((o+=a)>this.length&&(o=this.length);a<o;++a)f+=String.fromCharCode(l.getUint8(a));return this.index=o,f}},writeAt:{value:function(o,a){this.view.setUint8(o,a)}},writeByte:{value:function(o){this.view.setInt8(this.index++,o)}},writeShort:{value:function(o){this.view.setInt16(this.index,o),this.index+=2}},writeInt:{value:function(o){this.view.setInt32(this.index,o),this.index+=4}}});return e.buffer=i,e.view=new DataView(i),e.length=i.byteLength,Object.seal(e)}function bo(){return Object.create(null,{l:{value:0,writable:!0},r:{value:0,writable:!0},next:{value:null,writable:!0}})}function li(){return Object.create(null,{player:{value:null,writable:!0},channels:{value:[],writable:!0},buffer:{value:[],writable:!0},samplesTick:{value:0,writable:!0},samplesLeft:{value:0,writable:!0},remains:{value:0,writable:!0},completed:{value:0,writable:!0},bufferSize:{get:function(){return this.buffer.length},set:function(i){var t,e=this.buffer.length||0;if(!(i===e||i<512)&&(this.buffer.length=i,i>e))for(this.buffer[e]=bo(),t=++e;t<i;++t)this.buffer[t]=this.buffer[t-1].next=bo()}},complete:{get:function(){return this.completed},set:function(i){this.completed=i^this.player.loopSong}},reset:{value:function(){var i=this.channels[0],t=this.buffer[0];for(this.samplesLeft=0,this.remains=0,this.completed=0;i;)i.initialize(),i=i.next;for(;t;)t.l=t.r=0,t=t.next}},restore:{configurable:!0,value:function(){}}})}function Dr(){var i=null;return typeof AudioContext<"u"?i=new AudioContext:alert("Web Audio API does not appear to be supported. Use Chrome, Safari or Firefox"),i}function si(){var i=Object.create(null,{context:{value:null,writable:!0},node:{value:null,writable:!0},analyser:{value:null,writable:!0},analyse:{value:0,writable:!0},endian:{value:0,writable:!0},sampleRate:{value:0,writable:!0},playSong:{value:0,writable:!0},lastSong:{value:0,writable:!0},version:{value:0,writable:!0},title:{value:"",writable:!0},channels:{value:0,writable:!0},loopSong:{value:0,writable:!0},speed:{value:0,writable:!0},tempo:{value:0,writable:!0},mixer:{value:null,writable:!0},tick:{value:0,writable:!0},paused:{value:0,writable:!0},callback:{value:null,writable:!0},quality:{configurable:!0,set:function(t){this.callback=t?this.mixer.accurate.bind(this.mixer):this.mixer.fast.bind(this.mixer)}},toggle:{value:function(t){this.mixer.channels[t].mute^=1}},setup:{configurable:!0,value:function(){}},load:{value:function(t){return this.version=0,this.playSong=0,this.lastSong=0,this.mixer.restore(),t.view||(t=Ti(t)),t.position=0,t.readUint()===67324752&&window.neoart.Unzip,t.endian=this.endian,t.position=0,this.loader(t),this.version&&this.setup(),this.version}},play:{value:function(){var t,e;this.version&&(this.paused?this.paused=0:(this.initialize(),typeof this.context.createJavaScriptNode=="function"?this.node=this.context.createJavaScriptNode(this.mixer.bufferSize):this.node=this.context.createScriptProcessor(this.mixer.bufferSize),this.analyser=this.context.createAnalyser(),this.node.connect(this.analyser),this.node.onaudioprocess=this.callback),this.analyse&&window.neoart.Flectrum?(e=window.neoart.analyserNode=this.context.createAnalyser(),this.node.connect(e),e.connect(this.context.destination)):this.node.connect(this.context.destination),t=document.createEvent("Event"),t.initEvent("flodPlay",!0,!1),document.dispatchEvent(t))}},pause:{value:function(){if(this.node){this.node.disconnect(),this.paused=1;var t=document.createEvent("Event");t.initEvent("flodPause",!0,!1),document.dispatchEvent(t)}}},stop:{value:function(){if(this.node){this.node.disconnect(),this.node.onaudioprocess=this.node=null,this.paused=0,this.restore&&this.restore();var t=document.createEvent("Event");t.initEvent("flodStop",!0,!1),document.dispatchEvent(t)}}},reset:{value:function(){this.tick=0,this.mixer.initialize(),this.mixer.samplesTick=this.sampleRate*2.5/this.tempo>>0}}});return window.neoart.audioContext||(window.neoart.audioContext=Dr()),i.context=window.neoart.audioContext,i.sampleRate=i.context.sampleRate,i}function ci(i){var t=Object.create(null,{next:{value:null,writable:!0},mute:{value:0,writable:!0},panning:{value:0,writable:!0},delay:{value:0,writable:!0},pointer:{value:0,writable:!0},length:{value:0,writable:!0},audena:{value:0,writable:!0},audcnt:{value:0,writable:!0},audloc:{value:0,writable:!0},audper:{value:0,writable:!0},audvol:{value:0,writable:!0},timer:{value:0,writable:!0},level:{value:0,writable:!0},ldata:{value:0,writable:!0},rdata:{value:0,writable:!0},enabled:{get:function(){return this.audena},set:function(e){e!==this.audena&&(this.audena=e,this.audloc=this.pointer,this.audcnt=this.pointer+this.length,this.timer=1,e&&(this.delay+=2))}},period:{set:function(e){e<0?e=0:e>65535&&(e=65535),this.audper=e}},volume:{set:function(e){e<0?e=0:e>64&&(e=64),this.audvol=e}},resetData:{value:function(){this.ldata=0,this.rdata=0}},initialize:{value:function(){this.audena=0,this.audcnt=0,this.audloc=0,this.audper=50,this.audvol=0,this.timer=0,this.ldata=0,this.rdata=0,this.delay=0,this.pointer=0,this.length=0}}});return t.panning=t.level=(++i&2)===0?-1:1,Object.seal(t)}function _r(){return Object.create(null,{active:{value:0,writable:!0},forced:{value:-1,writable:!0},l0:{value:0,writable:!0},l1:{value:0,writable:!0},l2:{value:0,writable:!0},l3:{value:0,writable:!0},l4:{value:0,writable:!0},r0:{value:0,writable:!0},r1:{value:0,writable:!0},r2:{value:0,writable:!0},r3:{value:0,writable:!0},r4:{value:0,writable:!0},initialize:{value:function(){this.l0=this.l1=this.l2=this.l3=this.l4=0,this.r0=this.r1=this.r2=this.r3=this.r4=0}},process:{value:function(i,t){var e=.52133458435322,o=.4860348337215757,a=.9314955486749749,l=1-o;i===0&&(this.l0=o*t.l+l*this.l0,this.r0=o*t.r+l*this.r0,l=1-a,t.l=this.l1=a*this.l0+l*this.l1,t.r=this.r1=a*this.r0+l*this.r1),(this.active|this.forced)>0&&(l=1-e,this.l2=e*t.l+l*this.l2,this.r2=e*t.r+l*this.r2,this.l3=e*this.l2+l*this.l3,this.r3=e*this.r2+l*this.r3,t.l=this.l4=e*this.l3+l*this.l4,t.r=this.r4=e*this.r3+l*this.r4),t.l>1?t.l=1:t.l<-1&&(t.l=-1),t.r>1?t.r=1:t.r<-1&&(t.r=-1)}}})}function fi(){return Object.create(null,{note:{value:0,writable:!0},sample:{value:0,writable:!0},effect:{value:0,writable:!0},param:{value:0,writable:!0}})}function Tt(){return Object.create(null,{name:{value:"",writable:!0},length:{value:0,writable:!0},loop:{value:0,writable:!0},repeat:{value:0,writable:!0},volume:{value:0,writable:!0},pointer:{value:0,writable:!0},loopPtr:{value:0,writable:!0}})}function Ai(){var i=li();return Object.defineProperties(i,{filter:{value:null,writable:!0},model:{value:1,writable:!0},memory:{value:[],writable:!0},loopPtr:{value:0,writable:!0},loopLen:{value:4,writable:!0},clock:{value:0,writable:!0},master:{value:0,writable:!0},ready:{value:0,writable:!0},volume:{set:function(t){t>0?(t>64&&(t=64),this.master=t/64*.00390625):this.master=0}},initialize:{value:function(){var t=this.memory.length,e=t+this.loopLen;if(this.reset(),this.filter.initialize(),!this.ready)for(this.ready=1,this.loopPtr=t;t<e;++t)this.memory[t]=0}},restore:{value:function(){this.ready=0,this.memory.length=0}},store:{value:function(t,e,o){var a,l,f=t.position,r=this.memory.length,n;for(o&&(t.position=o),n=t.position+e,n>=t.length&&(a=n-t.length,e=t.length-t.position),l=r,e+=r;l<e;++l)this.memory[l]=t.readByte();for(e+=a;l<e;++l)this.memory[l]=0;return o&&(t.position=f),r}},fast:{value:function(t){var e,o,a,l=this.memory,f,r=0,n,d=0,u,s,h,b=this.bufferSize,m,c,g;if(this.completed){if(!this.remains){this.player.stop();return}b=this.remains}for(;r<b;){for(this.samplesLeft||(this.player.process(),this.samplesLeft=this.samplesTick,this.completed&&(b=r+this.samplesTick,b>this.bufferSize&&(this.remains=b-this.bufferSize,b=this.bufferSize))),c=this.samplesLeft,r+c>=b&&(c=b-r),n=d+c,e=this.channels[0];e;){if(h=this.buffer[d],e.audena&&e.audper>60)for(m=e.audper/this.clock,g=e.audvol*this.master,f=g*(1-e.level),s=g*(1+e.level),o=d;o<n;++o)e.delay?e.delay--:--e.timer<1&&(e.mute||(g=l[e.audloc]*.0078125,e.ldata=g*f,e.rdata=g*s),e.audloc++,e.timer+=m,e.audloc>=e.audcnt&&(e.audloc=e.pointer,e.audcnt=e.pointer+e.length)),h.l+=e.ldata,h.r+=e.rdata,h=h.next;else for(o=d;o<n;++o)h.l+=e.ldata,h.r+=e.rdata,h=h.next;e=e.next}d=n,r+=c,this.samplesLeft-=c}for(g=this.model,l=this.filter,h=this.buffer[0],a=t.outputBuffer.getChannelData(0),u=t.outputBuffer.getChannelData(1),o=0;o<b;++o)l.process(g,h),a[o]=h.l,u[o]=h.r,h.l=h.r=0,h=h.next}}}),i.channels[0]=ci(0),i.channels[0].next=i.channels[1]=ci(1),i.channels[1].next=i.channels[2]=ci(2),i.channels[2].next=i.channels[3]=ci(3),i.bufferSize=8192,i.filter=_r(),i.master=.00390625,Object.seal(i)}function ui(i){var t=si();return Object.defineProperties(t,{quality:{set:function(e){this.callback=this.mixer.fast.bind(this.mixer)}},stereo:{set:function(e){var o=this.mixer.channels[0];for(e<0?e=0:e>1&&(e=1);o;)o.level=e*o.panning,o=o.next}},volume:{set:function(e){e<0?e=0:e>1&&(e=1),this.mixer.master=e*.00390625}},frequency:{value:function(e){e?(this.mixer.clock=3579545/this.sampleRate,this.mixer.samplesTick=735):(this.mixer.clock=3546895/this.sampleRate,this.mixer.samplesTick=882)}}}),t.mixer=i||Ai(),t.mixer.player=t,t.frequency(0),t.channels=4,t.endian=0,t.quality=0,t.speed=6,t.tempo=125,t}function xo(){return Object.create(null,{next:{value:null,writable:!0},mute:{value:0,writable:!0},enabled:{value:0,writable:!0},sample:{value:null,writable:!0},length:{value:0,writable:!0},index:{value:0,writable:!0},pointer:{value:0,writable:!0},delta:{value:0,writable:!0},fraction:{value:0,writable:!0},speed:{value:0,writable:!0},dir:{value:0,writable:!0},oldSample:{value:null,writable:!0},oldLength:{value:0,writable:!0},oldPointer:{value:0,writable:!0},oldFraction:{value:0,writable:!0},oldSpeed:{value:0,writable:!0},oldDir:{value:0,writable:!0},volume:{value:0,writable:!0},lvol:{value:0,writable:!0},rvol:{value:0,writable:!0},panning:{value:128,writable:!0},lpan:{value:.5,writable:!0},rpan:{value:.5,writable:!0},ldata:{value:0,writable:!0},rdata:{value:0,writable:!0},mixCounter:{value:0,writable:!0},lmixRampU:{value:0,writable:!0},lmixDeltaU:{value:0,writable:!0},rmixRampU:{value:0,writable:!0},rmixDeltaU:{value:0,writable:!0},lmixRampD:{value:0,writable:!0},lmixDeltaD:{value:0,writable:!0},rmixRampD:{value:0,writable:!0},rmixDeltaD:{value:0,writable:!0},volCounter:{value:0,writable:!0},lvolDelta:{value:0,writable:!0},rvolDelta:{value:0,writable:!0},panCounter:{value:0,writable:!0},lpanDelta:{value:0,writable:!0},rpanDelta:{value:0,writable:!0},initialize:{value:function(){this.enabled=0,this.sample=null,this.length=0,this.index=0,this.pointer=0,this.delta=0,this.fraction=0,this.speed=0,this.dir=0,this.oldSample=null,this.oldLength=0,this.oldPointer=0,this.oldFraction=0,this.oldSpeed=0,this.oldDir=0,this.volume=0,this.lvol=0,this.rvol=0,this.panning=128,this.lpan=.5,this.rpan=.5,this.ldata=0,this.rdata=0,this.mixCounter=0,this.lmixRampU=0,this.lmixDeltaU=0,this.rmixRampU=0,this.rmixDeltaU=0,this.lmixRampD=0,this.lmixDeltaD=0,this.rmixRampD=0,this.rmixDeltaD=0,this.volCounter=0,this.lvolDelta=0,this.rvolDelta=0,this.panCounter=0,this.lpanDelta=0,this.rpanDelta=0}}})}function vo(){return Object.create(null,{name:{value:"",writable:!0},bits:{value:8,writable:!0},volume:{value:0,writable:!0},length:{value:0,writable:!0},data:{value:[],writable:!0},loopMode:{value:0,writable:!0},loopStart:{value:0,writable:!0},loopLen:{value:0,writable:!0},store:{value:function(i){var t=0,e,o=this.length,a,l,f,r;if(this.loopLen||(this.loopMode=0),a=i.position,this.loopMode?(o=this.loopStart+this.loopLen,this.data=new Float32Array(o+1)):this.data=new Float32Array(this.length+1),this.bits===8)for(f=a+o,f>i.length&&(o=i.length-a),e=0;e<o;e++)r=i.readByte()+t,r<-128?r+=256:r>127&&(r-=256),this.data[e]=r*.0078125,t=r;else for(f=a+(o<<1),f>i.length&&(o=i.length-a>>1),e=0;e<o;e++)r=i.readShort()+t,r<-32768?r+=65536:r>32767&&(r-=65536),this.data[e]=r*3051758e-11,t=r;if(f=a+this.length,this.loopMode?(this.length=this.loopStart+this.loopLen,this.loopMode===1?this.data[o]=this.data[this.loopStart]:this.data[o]=this.data[o-1]):this.data[this.length]=0,o!==this.length)for(l=this.data[o-1],e=o;e<this.length;e++)this.data[e]=l;f<i.length?i.position=f:i.position=i.length-1}}})}function Lr(){var i=li();return Object.defineProperties(i,{setup:{value:function(t){var e=1;for(this.channels.length=t,this.channels[0]=xo();e<t;++e)this.channels[e]=this.channels[e-1].next=xo()}},initialize:{value:function(){this.reset()}},fast:{value:function(t){var e,o,a,l,f=0,r,n=0,d,u,s,h=this.bufferSize,b,m;if(this.completed){if(!this.remains){this.player.stop();return}h=this.remains}for(;f<h;){for(this.samplesLeft||(this.player.process(),this.player.fast(),this.samplesLeft=this.samplesTick,this.completed&&(h=f+this.samplesTick,h>this.bufferSize&&(this.remains=h-this.bufferSize,h=this.bufferSize))),b=this.samplesLeft,f+b>=h&&(b=h-f),r=n+b,e=this.channels[0];e;){if(!e.enabled){e=e.next;continue}for(u=e.sample,o=u.data,s=this.buffer[n],l=n;l<r;++l){if(e.index!==e.pointer){if(e.index>=e.length)if(u.loopMode)e.pointer=u.loopStart+(e.index-e.length),e.length=u.length,u.loopMode===2&&(e.dir?e.dir=0:e.dir=u.length+u.loopStart-1);else{e.enabled=0;break}else e.pointer=e.index;e.mute?(e.ldata=0,e.rdata=0):(e.dir?m=o[e.dir-e.pointer]:m=o[e.pointer],e.ldata=m*e.lvol,e.rdata=m*e.rvol)}e.index=e.pointer+e.delta,(e.fraction+=e.speed)>=1&&(e.index++,e.fraction--),s.l+=e.ldata,s.r+=e.rdata,s=s.next}e=e.next}n=r,f+=b,this.samplesLeft-=b}for(s=this.buffer[0],a=t.outputBuffer.getChannelData(0),d=t.outputBuffer.getChannelData(1),l=0;l<h;++l)s.l>1?s.l=1:s.l<-1&&(s.l=-1),s.r>1?s.r=1:s.r<-1&&(s.r=-1),a[l]=s.l,d[l]=s.r,s.l=s.r=0,s=s.next}},accurate:{value:function(t){var e,o,a,l,f,r,n=0,d,u=0,s,h,b,m,c,g=this.bufferSize,p,y;if(this.completed){if(!this.remains){this.player.stop();return}g=this.remains}for(;n<g;){for(this.samplesLeft||(this.player.process(),this.player.accurate(),this.samplesLeft=this.samplesTick,this.completed&&(g=n+this.samplesTick,g>this.bufferSize&&(this.remains=g-this.bufferSize,g=this.bufferSize))),p=this.samplesLeft,n+p>=g&&(p=g-n),d=u+p,e=this.channels[0];e;){if(!e.enabled){e=e.next;continue}for(b=e.sample,o=b.data,m=e.oldSample,m&&(a=m.data),c=this.buffer[u],r=u;r<d;++r){if(y=e.mute?0:o[e.pointer],y+=(o[e.pointer+e.dir]-y)*e.fraction,(e.fraction+=e.speed)>=1&&(f=e.fraction>>0,e.fraction-=f,e.dir>0?(e.pointer+=f,e.pointer>e.length&&(e.fraction+=e.pointer-e.length,e.pointer=e.length)):(e.pointer-=f,e.pointer<e.length&&(e.fraction+=e.length-e.pointer,e.pointer=e.length))),e.mixCounter?(m?(s=e.mute?0:a[e.oldPointer],s+=(a[e.oldPointer+e.oldDir]-s)*e.oldFraction,(e.oldFraction+=e.oldSpeed)>1&&(f=e.oldFraction>>0,e.oldFraction-=f,e.oldDir>0?(e.oldPointer+=f,e.oldPointer>e.oldLength&&(e.oldFraction+=e.oldPointer-e.oldLength,e.oldPointer=e.oldLength)):(e.oldPointer-=f,e.oldPointer<e.oldLength&&(e.oldFraction+=e.oldLength-e.oldPointer,e.oldPointer=e.oldLength))),c.l+=y*e.lmixRampU+s*e.lmixRampD,c.r+=y*e.rmixRampU+s*e.rmixRampD,e.lmixRampD-=e.lmixDeltaD,e.rmixRampD-=e.rmixDeltaD):(c.l+=y*e.lmixRampU,c.r+=y*e.rmixRampU),e.lmixRampU+=e.lmixDeltaU,e.rmixRampU+=e.rmixDeltaU,e.mixCounter--,e.oldPointer===e.oldLength&&(m.loopMode?m.loopMode===1?(e.oldPointer=m.loopStart,e.oldLength=m.length):e.oldDir>0?(e.oldPointer=m.length-1,e.oldLength=m.loopStart,e.oldDir=-1):(e.oldFraction-=1,e.oldPointer=m.loopStart,e.oldLength=m.length,e.oldDir=1):(m=null,e.oldPointer=0))):(c.l+=y*e.lvol,c.r+=y*e.rvol,e.volCounter?(e.lvol+=e.lvolDelta,e.rvol+=e.rvolDelta,e.volCounter--):e.panCounter&&(e.lpan+=e.lpanDelta,e.rpan+=e.rpanDelta,e.panCounter--,e.lvol=e.volume*e.lpan,e.rvol=e.volume*e.rpan)),e.pointer===e.length)if(b.loopMode)b.loopMode===1?(e.pointer=b.loopStart,e.length=b.length):e.dir>0?(e.pointer=b.length-1,e.length=b.loopStart,e.dir=-1):(e.fraction-=1,e.pointer=b.loopStart,e.length=b.length,e.dir=1);else{e.enabled=0;break}c=c.next}e=e.next}u=d,n+=p,this.samplesLeft-=p}for(c=this.buffer[0],l=t.outputBuffer.getChannelData(0),h=t.outputBuffer.getChannelData(1),r=0;r<g;++r)c.l>1?c.l=1:c.l<-1&&(c.l=-1),c.r>1?c.r=1:c.r<-1&&(c.r=-1),l[r]=c.l,h[r]=c.r,c.l=c.r=0,c=c.next}}}),i.bufferSize=8192,Object.seal(i)}function yo(i){var t=si();return Object.defineProperties(t,{track:{value:null,writable:!0},length:{value:0,writable:!0},restart:{value:0,writable:!0},timer:{value:0,writable:!0},master:{value:0,writable:!0},volume:{set:function(e){e<0?e=0:e>1&&(e=1),this.master=e*64}},setup:{configurable:!1,value:function(){this.mixer.setup(this.channels)}}}),t.mixer=i||Lr(),t.mixer.player=t,t.endian=1,t.quality=1,t}function Ir(i){var t=Object.create(null,{index:{value:i,writable:!0},next:{value:null,writable:!0},flags:{value:0,writable:!0},delay:{value:0,writable:!0},channel:{value:null,writable:!0},patternLoop:{value:0,writable:!0},patternLoopRow:{value:0,writable:!0},playing:{value:null,writable:!0},note:{value:0,writable:!0},keyoff:{value:0,writable:!0},period:{value:0,writable:!0},finetune:{value:0,writable:!0},arpDelta:{value:0,writable:!0},vibDelta:{value:0,writable:!0},instrument:{value:null,writable:!0},autoVibratoPos:{value:0,writable:!0},autoSweep:{value:0,writable:!0},autoSweepPos:{value:0,writable:!0},sample:{value:null,writable:!0},sampleOffset:{value:0,writable:!0},volume:{value:0,writable:!0},volEnabled:{value:0,writable:!0},volEnvelope:{value:null,writable:!0},volDelta:{value:0,writable:!0},volSlide:{value:0,writable:!0},volSlideMaster:{value:0,writable:!0},fineSlideU:{value:0,writable:!0},fineSlideD:{value:0,writable:!0},fadeEnabled:{value:0,writable:!0},fadeDelta:{value:0,writable:!0},fadeVolume:{value:0,writable:!0},panning:{value:0,writable:!0},panEnabled:{value:0,writable:!0},panEnvelope:{value:null,writable:!0},panSlide:{value:0,writable:!0},portaU:{value:0,writable:!0},portaD:{value:0,writable:!0},finePortaU:{value:0,writable:!0},finePortaD:{value:0,writable:!0},xtraPortaU:{value:0,writable:!0},xtraPortaD:{value:0,writable:!0},portaPeriod:{value:0,writable:!0},portaSpeed:{value:0,writable:!0},glissando:{value:0,writable:!0},glissPeriod:{value:0,writable:!0},vibratoPos:{value:0,writable:!0},vibratoSpeed:{value:0,writable:!0},vibratoDepth:{value:0,writable:!0},vibratoReset:{value:0,writable:!0},tremoloPos:{value:0,writable:!0},tremoloSpeed:{value:0,writable:!0},tremoloDepth:{value:0,writable:!0},waveControl:{value:0,writable:!0},tremorPos:{value:0,writable:!0},tremorOn:{value:0,writable:!0},tremorOff:{value:0,writable:!0},tremorVolume:{value:0,writable:!0},retrigx:{value:0,writable:!0},retrigy:{value:0,writable:!0},rowCurrent:{value:null,writable:!0},reset:{value:function(){this.volume=this.sample.volume,this.panning=this.sample.panning,this.finetune=this.sample.finetune>>3<<2,this.keyoff=0,this.volDelta=0,this.fadeEnabled=0,this.fadeDelta=0,this.rowCurrent=null,this.fadeVolume=65536,this.autoVibratoPos=0,this.autoSweep=1,this.autoSweepPos=0,this.vibDelta=0,this.vibratoReset=0,(this.waveControl&15)<4&&(this.vibratoPos=0),this.waveControl>>4<4&&(this.tremoloPos=0)}},autoVibrato:{value:function(){var e;switch(this.autoVibratoPos=this.autoVibratoPos+this.playing.vibratoSpeed&255,this.playing.vibratoType){case 0:e=qr[this.autoVibratoPos];break;case 1:this.autoVibratoPos<128?e=-64:e=64;break;case 2:e=(64+(this.autoVibratoPos>>1)&127)-64;break;case 3:e=(64-(this.autoVibratoPos>>1)&127)-64;break;default:break}return e*=this.playing.vibratoDepth,this.autoSweep&&(this.playing.vibratoSweep?this.autoSweepPos>this.playing.vibratoSweep?(this.autoSweepPos&2&&(e*=this.autoSweepPos/this.playing.vibratoSweep),this.autoSweep=0):e*=++this.autoSweepPos/this.playing.vibratoSweep:this.autoSweep=0),this.flags|=ce,e>>6}},tonePortamento:{value:function(){this.glissPeriod||(this.glissPeriod=this.period),this.period<this.portaPeriod?(this.glissPeriod+=this.portaSpeed<<2,this.glissando?this.period=Math.round(this.glissPeriod/64)<<6:this.period=this.glissPeriod,this.period>=this.portaPeriod&&(this.period=this.portaPeriod,this.glissPeriod=this.portaPeriod=0)):this.period>this.portaPeriod&&(this.glissPeriod-=this.portaSpeed<<2,this.glissando?this.period=Math.round(this.glissPeriod/64)<<6:this.period=this.glissPeriod,this.period<=this.portaPeriod&&(this.period=this.portaPeriod,this.glissPeriod=this.portaPeriod=0)),this.flags|=ce}},tremolo:{value:function(){var e=255,o=this.tremoloPos&31;switch(this.waveControl>>4&3){case 0:e=Fo[o];break;case 1:e=o<<3;break;default:break}this.volDelta=e*this.tremoloDepth>>6,this.tremoloPos>31&&(this.volDelta=-this.volDelta),this.tremoloPos=this.tremoloPos+this.tremoloSpeed&63,this.flags|=Y}},tremor:{value:function(){this.tremorPos===this.tremorOn?(this.tremorVolume=this.volume,this.volume=0,this.flags|=Y):(this.tremorPos=0,this.volume=this.tremorVolume,this.flags|=Y),this.tremorPos++}},vibrato:{value:function(){var e=255,o=this.vibratoPos&31;switch(this.waveControl&3){case 0:e=Fo[o];break;case 1:e=o<<3,this.vibratoPos>31&&(e=255-e);break;default:break}this.vibDelta=e*this.vibratoDepth>>7,this.vibratoPos>31&&(this.vibDelta=-this.vibDelta),this.vibratoPos=this.vibratoPos+this.vibratoSpeed&63,this.flags|=ce}}});return t.volEnvelope=wo(),t.panEnvelope=wo(),Object.seal(t)}function hi(){return Object.create(null,{points:{value:[],writable:!0},total:{value:0,writable:!0},sustain:{value:0,writable:!0},loopStart:{value:0,writable:!0},loopEnd:{value:0,writable:!0},flags:{value:0,writable:!0}})}function wo(){return Object.create(null,{value:{value:0,writable:!0},position:{value:0,writable:!0},frame:{value:0,writable:!0},delta:{value:0,writable:!0},fraction:{value:0,writable:!0},stopped:{value:0,writable:!0},reset:{value:function(){this.value=0,this.position=0,this.frame=0,this.delta=0,this.fraction=0,this.stopped=0}}})}function ko(){var i=Object.create(null,{name:{value:"",writable:!0},samples:{value:[],writable:!0},noteSamples:{value:null,writable:!0},fadeout:{value:0,writable:!0},volData:{value:null,writable:!0},volEnabled:{value:0,writable:!0},panData:{value:null,writable:!0},panEnabled:{value:0,writable:!0},vibratoType:{value:0,writable:!0},vibratoSweep:{value:0,writable:!0},vibratoSpeed:{value:0,writable:!0},vibratoDepth:{value:0,writable:!0}});return i.noteSamples=new Uint8Array(96),i.volData=hi(),i.panData=hi(),Object.seal(i)}function Eo(i,t){var e=Object.create(null,{rows:{value:[],writable:!0},length:{value:0,writable:!0},size:{value:0,writable:!0}});return e.rows.length=e.size=i*t,e.length=i,Object.seal(e)}function di(i,t){var e=Object.create(null,{frame:{value:0,writable:!0},value:{value:0,writable:!0}});return e.frame=i||0,e.value=t||0,Object.seal(e)}function Di(){return Object.create(null,{note:{value:0,writable:!0},instrument:{value:0,writable:!0},volume:{value:0,writable:!0},effect:{value:0,writable:!0},param:{value:0,writable:!0}})}function So(){var i=vo();return Object.defineProperties(i,{finetune:{value:0,writable:!0},panning:{value:0,writable:!0},relative:{value:0,writable:!0}}),Object.seal(i)}function Rr(i){var t=yo(i);return Object.defineProperties(t,{id:{value:"F2Player"},patterns:{value:[],writable:!0},instruments:{value:[],writable:!0},voices:{value:[],writable:!0},linear:{value:0,writable:!0},complete:{value:0,writable:!0},order:{value:0,writable:!0},position:{value:0,writable:!0},nextOrder:{value:0,writable:!0},nextPosition:{value:0,writable:!0},pattern:{value:null,writable:!0},patternDelay:{value:0,writable:!0},patternOffset:{value:0,writable:!0},timer:{value:0,writable:!0},rowCurrent:{value:0,writable:!0},initialize:{value:function(){var e=0,o;for(this.reset(),this.timer=this.speed,this.order=0,this.position=0,this.nextOrder=-1,this.nextPosition=-1,this.patternDelay=0,this.patternOffset=0,this.complete=0,this.master=64,this.voices.length=this.channels;e<this.channels;++e)o=Ir(e),o.channel=this.mixer.channels[e],o.playing=this.instruments[0],o.sample=o.playing.samples[0],this.voices[e]=o,e&&(this.voices[e-1].next=o)}},loader:{value:function(e){var o,a,l,f,r,n,d,u,s,h,b=22,m,c,g,p;if(!(e.length<360)){if(e.position=17,this.title=e.readString(20),e.position++,l=e.readString(20),l==="FastTracker v2.00   "||l==="FastTracker v 2.00  ")this.version=1;else if(l==="Sk@le Tracker")b=2,this.version=2;else if(l==="MadTracker 2.0")this.version=3;else if(l==="MilkyTracker        ")this.version=4;else if(l==="DigiBooster Pro 2.18")this.version=5;else if(l.indexOf("OpenMPT")!==-1)this.version=6;else return;for(e.readUshort(),o=e.readUint(),this.length=e.readUshort(),this.restart=e.readUshort(),this.channels=e.readUshort(),p=c=e.readUshort(),this.instruments=[],this.instruments.length=e.readUshort()+1,this.linear=e.readUshort(),this.speed=e.readUshort(),this.tempo=e.readUshort(),this.track=new Uint8Array(this.length),a=0;a<this.length;++a)d=e.readUbyte(),d>=p&&(c=d+1),this.track[a]=d;if(this.patterns=[],this.patterns.length=c,c!==p){for(s=Eo(64,this.channels),d=s.size,a=0;a<d;++a)s.rows[a]=Di();this.patterns[--c]=s}for(e.position=h=o+60,u=p,a=0;a<u;++a){if(o=e.readUint(),e.position++,s=Eo(e.readUshort(),this.channels),c=s.size,p=e.readUshort(),e.position=h+o,n=e.position+p,p)for(d=0;d<c;++d)m=Di(),p=e.readUbyte(),p&128?(p&1&&(m.note=e.readUbyte()),p&2&&(m.instrument=e.readUbyte()),p&4&&(m.volume=e.readUbyte()),p&8&&(m.effect=e.readUbyte()),p&16&&(m.param=e.readUbyte())):(m.note=p,m.instrument=e.readUbyte(),m.volume=e.readUbyte(),m.effect=e.readUbyte(),m.param=e.readUbyte()),m.note!==_i&&m.note>96&&(m.note=0),s.rows[d]=m;else for(d=0;d<c;++d)s.rows[d]=Di();this.patterns[a]=s,h=e.position,h!==n&&(h=e.position=n)}for(n=e.position,u=this.instruments.length,a=1;a<u&&(f=e.readUint(),!(e.position+f>=e.length));++a){if(r=ko(),r.name=e.readString(22),e.position++,p=e.readUshort(),p>16&&(p=16),o=e.readUint(),b===2&&o!==64&&(o=64),p){for(r.samples=[],r.samples.length=p,d=0;d<96;++d)r.noteSamples[d]=e.readUbyte();for(d=0;d<12;++d)r.volData.points[d]=di(e.readUshort(),e.readUshort());for(d=0;d<12;++d)r.panData.points[d]=di(e.readUshort(),e.readUshort());for(r.volData.total=e.readUbyte(),r.panData.total=e.readUbyte(),r.volData.sustain=e.readUbyte(),r.volData.loopStart=e.readUbyte(),r.volData.loopEnd=e.readUbyte(),r.panData.sustain=e.readUbyte(),r.panData.loopStart=e.readUbyte(),r.panData.loopEnd=e.readUbyte(),r.volData.flags=e.readUbyte(),r.panData.flags=e.readUbyte(),r.volData.flags&Co&&(r.volEnabled=1),r.panData.flags&Co&&(r.panEnabled=1),r.vibratoType=e.readUbyte(),r.vibratoSweep=e.readUbyte(),r.vibratoDepth=e.readUbyte(),r.vibratoSpeed=e.readUbyte(),r.fadeout=e.readUshort()<<1,e.position+=b,h=e.position,this.instruments[a]=r,d=0;d<p;++d)g=So(),g.length=e.readUint(),g.loopStart=e.readUint(),g.loopLen=e.readUint(),g.volume=e.readUbyte(),g.finetune=e.readByte(),g.loopMode=e.readUbyte(),g.panning=e.readUbyte(),g.relative=e.readByte(),e.position++,g.name=e.readString(22),r.samples[d]=g,e.position=h+=o;for(d=0;d<p;++d)g=r.samples[d],g.length&&(h=e.position+g.length,g.loopMode&16&&(g.bits=16,g.loopMode^=16,g.length>>=1,g.loopStart>>=1,g.loopLen>>=1),g.loopLen||(g.loopMode=0),g.store(e),g.loopMode&&(g.length=g.loopStart+g.loopLen),e.position=h)}else e.position=n+f;if(n=e.position,n>=e.length)break}for(r=ko(),r.volData=hi(),r.panData=hi(),r.samples=[],a=0;a<12;++a)r.volData.points[a]=di(),r.panData.points[a]=di();for(g=So(),g.length=220,g.data=new Float32Array(220),a=0;a<220;++a)g.data[a]=0;r.samples[0]=g,this.instruments[0]=r}}},process:{value:function(){var e,o,a,l,f,r,n,d,u,s,h,b,m,c=this.voices[0];if(this.tick)for(;c;){if(s=this.pattern.rows[this.position+c.index],c.delay)if((s.param&15)===this.tick)c.flags=c.delay,c.delay=0;else{c=c.next;continue}if(s.volume)switch(n=s.volume>>4,d=s.volume&15,n){case 6:c.volume-=d,c.volume<0&&(c.volume=0),c.flags|=Y;break;case 7:c.volume+=d,c.volume>64&&(c.volume=64),c.flags|=Y;break;case 11:c.vibrato();break;case 13:c.panning-=d,c.panning<0&&(c.panning=0),c.flags|=ye;break;case 14:c.panning+=d,c.panning>255&&(c.panning=255),c.flags|=ye;break;case 15:c.portaPeriod&&c.tonePortamento();break;default:break}switch(n=s.param>>4,d=s.param&15,s.effect){case 0:if(!s.param)break;m=(this.tick-this.timer)%3,m<0&&(m+=3),this.tick===2&&this.timer===18&&(m=0),m?m===1?this.linear?c.arpDelta=-(d<<6):(m=this.amiga(c.note+d,c.finetune),c.arpDelta=m-c.period):this.linear?c.arpDelta=-(n<<6):(m=this.amiga(c.note+n,c.finetune),c.arpDelta=m-c.period):c.arpDelta=0,c.flags|=ce;break;case 1:c.period-=c.portaU,c.period<0&&(c.period=0),c.flags|=ce;break;case 2:c.period+=c.portaD,c.period>9212&&(c.period=9212),c.flags|=ce;break;case 3:c.portaPeriod&&c.tonePortamento();break;case 4:n&&(c.vibratoSpeed=n),d&&(c.vibratoDepth=d<<2),c.vibrato();break;case 5:b=1,c.portaPeriod&&c.tonePortamento();break;case 6:b=1,c.vibrato();break;case 7:c.tremolo();break;case 10:b=1;break;case 14:switch(n){case 9:this.tick%d===0&&(c.volEnvelope.reset(),c.panEnvelope.reset(),c.flags|=Y|ye|ot);break;case 12:this.tick===d&&(c.volume=0,c.flags|=Y);break;default:break}break;case 17:n=c.volSlideMaster>>4,d=c.volSlideMaster&15,n?(this.master+=n,this.master>64&&(this.master=64),c.flags|=Y):d&&(this.master-=d,this.master<0&&(this.master=0),c.flags|=Y);break;case 20:this.tick===s.param&&(c.fadeEnabled=1,c.keyoff=1);break;case 24:n=c.panSlide>>4,d=c.panSlide&15,n?(c.panning+=n,c.panning>255&&(c.panning=255),c.flags|=ye):d&&(c.panning-=d,c.panning<0&&(c.panning=0),c.flags|=ye);break;case 27:if(e=this.tick,s.volume||e++,e%c.retrigy)break;(!s.volume||s.volume>80)&&c.retrigx&&this.retrig(c),c.flags|=ot;break;case 29:c.tremor();break;default:break}b&&(n=c.volSlide>>4,d=c.volSlide&15,b=0,n?(c.volume+=n,c.flags|=Y):d&&(c.volume-=d,c.flags|=Y)),c=c.next}else for(this.nextOrder>=0&&(this.order=this.nextOrder),this.nextPosition>=0&&(this.position=this.nextPosition),this.nextOrder=this.nextPosition=-1,this.pattern=this.patterns[this.track[this.order]];c;){if(this.rowCurrent=this.position+c.index,s=this.pattern.rows[this.rowCurrent],e=s.volume>>4,u=s.effect===3||s.effect===5||e===15,n=s.param>>4,c.keyoff=0,c.arpDelta&&(c.arpDelta=0,c.flags|=ce),s.instrument?(c.instrument=s.instrument<this.instruments.length?this.instruments[s.instrument]:null,c.volEnvelope.reset(),c.panEnvelope.reset(),c.flags|=Y|ye|Ye):(s.note===_i||s.effect===20&&!s.param)&&(c.fadeEnabled=1,c.keyoff=1),s.note&&s.note!==_i?c.instrument?(a=c.instrument,m=s.note-1,h=a.samples[a.noteSamples[m]],m+=h.relative,m>=Ur&&m<=Br&&(u||(c.note=m,c.sample=h,s.instrument?(c.volEnabled=a.volEnabled,c.panEnabled=a.panEnabled,c.flags|=zr):c.flags|=ce|ot),s.instrument?(c.reset(),c.fadeDelta=a.fadeout):c.finetune=h.finetune>>3<<2,s.effect===14&&n===5&&(c.finetune=(s.param&15)-8<<3),this.linear?m=(120-m<<6)-c.finetune:m=this.amiga(m,c.finetune),u?c.portaPeriod=m:(c.period=m,c.glissPeriod=0))):(c.volume=0,c.flags=Y|Ye):c.vibratoReset&&s.effect!==4&&s.effect!==6&&(c.vibDelta=0,c.vibratoReset=0,c.flags|=ce),s.volume)if(s.volume>=16&&s.volume<=80)c.volume=s.volume-16,c.flags|=Y|Ye;else switch(d=s.volume&15,e){case 6:c.volume-=d,c.volume<0&&(c.volume=0),c.flags|=Y;break;case 7:c.volume+=d,c.volume>64&&(c.volume=64),c.flags|=Y;break;case 10:d&&(c.vibratoSpeed=d);break;case 11:d&&(c.vibratoDepth=d<<2);break;case 12:c.panning=d<<4,c.flags|=ye;break;case 15:d&&(c.portaSpeed=d<<4);break;default:break}if(s.effect)switch(d=s.param&15,s.effect){case 1:s.param&&(c.portaU=s.param<<2);break;case 2:s.param&&(c.portaD=s.param<<2);break;case 3:s.param&&e!==15&&(c.portaSpeed=s.param);break;case 4:c.vibratoReset=1;break;case 5:s.param&&(c.volSlide=s.param);break;case 6:s.param&&(c.volSlide=s.param),c.vibratoReset=1;break;case 7:n&&(c.tremoloSpeed=n),d&&(c.tremoloDepth=d);break;case 8:c.panning=s.param,c.flags|=ye;break;case 9:s.param&&(c.sampleOffset=s.param<<8),c.sampleOffset>=c.sample.length&&(c.volume=0,c.sampleOffset=0,c.flags&=~(ce|ot),c.flags|=Y|Ye);break;case 10:s.param&&(c.volSlide=s.param);break;case 11:this.nextOrder=s.param,this.nextOrder>=this.length?this.complete=1:this.nextPosition=0,f=1,this.patternOffset=0;break;case 12:c.volume=s.param,c.flags|=Y|Ye;break;case 13:this.nextPosition=(n*10+d)*this.channels,this.patternOffset=0,f||(this.nextOrder=this.order+1,this.nextOrder>=this.length&&(this.complete=1,this.nextPosition=-1));break;case 14:switch(n){case 1:d&&(c.finePortaU=d<<2),c.period-=c.finePortaU,c.flags|=ce;break;case 2:d&&(c.finePortaD=d<<2),c.period+=c.finePortaD,c.flags|=ce;break;case 3:c.glissando=d;break;case 4:c.waveControl=c.waveControl&240|d;break;case 6:d?(c.patternLoop?c.patternLoop--:c.patternLoop=d,c.patternLoop&&(this.nextPosition=c.patternLoopRow)):c.patternLoopRow=this.patternOffset=this.position;break;case 7:c.waveControl=c.waveControl&15|d<<4;break;case 10:d&&(c.fineSlideU=d),c.volume+=c.fineSlideU,c.flags|=Y;break;case 11:d&&(c.fineSlideD=d),c.volume-=c.fineSlideD,c.flags|=Y;break;case 13:c.delay=c.flags,c.flags=0;break;case 14:this.patternDelay=d*this.timer;break;default:break}break;case 15:if(!s.param)break;s.param<32?this.timer=s.param:this.mixer.samplesTick=this.sampleRate*2.5/s.param>>0;break;case 16:this.master=s.param,this.master>64&&(this.master=64),c.flags|=Y;break;case 17:s.param&&(c.volSlideMaster=s.param);break;case 21:if(!c.instrument||!c.instrument.volEnabled)break;for(a=c.instrument,m=s.param,n=a.volData.total,l=0;l<n&&!(m<a.volData.points[l].frame);l++);c.volEnvelope.position=--l,n--,a.volData.flags&Po&&l===a.volData.loopEnd&&(l=c.volEnvelope.position=a.volData.loopStart,m=a.volData.points[l].frame,c.volEnvelope.frame=m),l>=n?(c.volEnvelope.value=a.volData.points[n].value,c.volEnvelope.stopped=1):(c.volEnvelope.stopped=0,c.volEnvelope.frame=m,m>a.volData.points[l].frame&&c.volEnvelope.position++,o=a.volData.points[l],r=a.volData.points[++l],m=r.frame-o.frame,c.volEnvelope.delta=(m?(r.value-o.value<<8)/m>>0:0)||0,c.volEnvelope.fraction=o.value<<8);break;case 24:s.param&&(c.panSlide=s.param);break;case 27:if(n&&(c.retrigx=n),d&&(c.retrigy=d),!s.volume&&c.retrigy){if(e=this.tick+1,e%c.retrigy)break;s.volume>80&&c.retrigx&&this.retrig(c)}break;case 29:s.param&&(c.tremorOn=++n,c.tremorOff=++d+n);break;case 33:n===1?(d&&(c.xtraPortaU=d),c.period-=c.xtraPortaU,c.flags|=ce):n===2&&(d&&(c.xtraPortaD=d),c.period+=c.xtraPortaD,c.flags|=ce);break;default:break}c=c.next}++this.tick>=this.timer+this.patternDelay&&(this.patternDelay=this.tick=0,this.nextPosition<0&&(this.nextPosition=this.position+this.channels,(this.nextPosition>=this.pattern.size||this.complete)&&(this.nextOrder=this.order+1,this.nextPosition=this.patternOffset,this.nextOrder>=this.length&&(this.nextOrder=this.restart,this.mixer.complete=1))))}},fast:{value:function(){for(var e,o,a,l,f,r=this.voices[0],n;r;)e=r.channel,a=r.flags,r.flags=0,a&ot&&(e.index=r.sampleOffset,e.pointer=-1,e.dir=0,e.fraction=0,e.sample=r.sample,e.length=r.sample.length,e.enabled=e.sample.data?1:0,r.playing=r.instrument,r.sampleOffset=0),l=r.playing,o=l.vibratoSpeed?r.autoVibrato():0,n=r.volume+r.volDelta,l.volEnabled?(r.volEnabled&&!r.volEnvelope.stopped&&this.envelope(r,r.volEnvelope,l.volData),n=n*r.volEnvelope.value>>6,a|=Y,r.fadeEnabled&&(r.fadeVolume-=r.fadeDelta,r.fadeVolume<0?(n=0,r.fadeVolume=0,r.fadeEnabled=0,r.volEnvelope.value=0,r.volEnvelope.stopped=1,r.panEnvelope.stopped=1):n=n*r.fadeVolume>>16)):r.keyoff&&(n=0,a|=Y),f=r.panning,l.panEnabled&&(r.panEnabled&&!r.panEnvelope.stopped&&this.envelope(r,r.panEnvelope,l.panData),f=r.panEnvelope.value<<2,a|=ye,f<0?f=0:f>255&&(f=255)),a&Y&&(n<0?n=0:n>64&&(n=64),e.volume=Mo[n*this.master>>6],e.lvol=e.volume*e.lpan,e.rvol=e.volume*e.rpan),a&ye&&(e.panning=f,e.lpan=rt[256-f],e.rpan=rt[f],e.lvol=e.volume*e.lpan,e.rvol=e.volume*e.rpan),a&ce&&(o+=r.period+r.arpDelta+r.vibDelta,this.linear?e.speed=(548077568*Math.pow(2,(4608-o)/768)/this.sampleRate>>0)/65536:e.speed=(65536*(14317456/o)/this.sampleRate>>0)/65536,e.delta=e.speed>>0,e.speed-=e.delta),r=r.next}},accurate:{value:function(){for(var e,o,a,l,f,r,n,d,u,s=this.voices[0],h;s;){if(e=s.channel,a=s.flags,s.flags=0,a&ot&&(e.sample&&(a|=Ye,e.mixCounter=220,e.oldSample=null,e.oldPointer=-1,e.enabled&&(e.oldDir=e.dir,e.oldFraction=e.fraction,e.oldSpeed=e.speed,e.oldSample=e.sample,e.oldPointer=e.pointer,e.oldLength=e.length,e.lmixRampD=e.lvol,e.lmixDeltaD=e.lvol/220,e.rmixRampD=e.rvol,e.rmixDeltaD=e.rvol/220)),e.dir=1,e.fraction=0,e.sample=s.sample,e.pointer=s.sampleOffset,e.length=s.sample.length,e.enabled=e.sample.data?1:0,s.playing=s.instrument,s.sampleOffset=0),l=s.playing,o=l.vibratoSpeed?s.autoVibrato():0,h=s.volume+s.volDelta,l.volEnabled?(s.volEnabled&&!s.volEnvelope.stopped&&this.envelope(s,s.volEnvelope,l.volData),h=h*s.volEnvelope.value>>6,a|=Y,s.fadeEnabled&&(s.fadeVolume-=s.fadeDelta,s.fadeVolume<0?(h=0,s.fadeVolume=0,s.fadeEnabled=0,s.volEnvelope.value=0,s.volEnvelope.stopped=1,s.panEnvelope.stopped=1):h=h*s.fadeVolume>>16)):s.keyoff&&(h=0,a|=Y),n=s.panning,l.panEnabled&&(s.panEnabled&&!s.panEnvelope.stopped&&this.envelope(s,s.panEnvelope,l.panData),n=s.panEnvelope.value<<2,a|=ye,n<0?n=0:n>255&&(n=255)),!e.enabled){e.volCounter=0,e.panCounter=0,s=s.next;continue}a&Y&&(h<0?h=0:h>64&&(h=64),h=Mo[h*this.master>>6],r=h*rt[256-n],u=h*rt[n],h!==e.volume&&!e.mixCounter?(e.volCounter=a&Ye?220:this.mixer.samplesTick,e.lvolDelta=(r-e.lvol)/e.volCounter,e.rvolDelta=(u-e.rvol)/e.volCounter):(e.lvol=r,e.rvol=u),e.volume=h),a&ye&&(f=rt[256-n],d=rt[n],n!==e.panning&&!e.mixCounter&&!e.volCounter?(e.panCounter=this.mixer.samplesTick,e.lpanDelta=(f-e.lpan)/e.panCounter,e.rpanDelta=(d-e.rpan)/e.panCounter):(e.lpan=f,e.rpan=d),e.panning=n),a&ce&&(o+=s.period+s.arpDelta+s.vibDelta,this.linear?e.speed=(548077568*Math.pow(2,(4608-o)/768)/this.sampleRate>>0)/65536:e.speed=(65536*(14317456/o)/this.sampleRate>>0)/65536),e.mixCounter&&(e.lmixRampU=0,e.lmixDeltaU=e.lvol/220,e.rmixRampU=0,e.rmixDeltaU=e.rvol/220),s=s.next}}},envelope:{value:function(e,o,a){var l=o.position,f=a.points[l],r;if(o.frame===f.frame){if(a.flags&Po&&l===a.loopEnd&&(l=o.position=a.loopStart,f=a.points[l],o.frame=f.frame),l===a.total-1){o.value=f.value,o.stopped=1;return}if(a.flags&Or&&l===a.sustain&&!e.fadeEnabled){o.value=f.value;return}o.position++,r=a.points[o.position],o.delta=(r.value-f.value<<8)/(r.frame-f.frame)>>0||0,o.fraction=f.value<<8}else o.fraction+=o.delta;o.value=o.fraction>>8,o.frame++}},amiga:{value:function(e,o){var a=0,l=Li[++e];return o<0?a=(Li[--e]-l)/64:o>0&&(a=(l-Li[++e])/64),l-a*o>>0}},retrig:{value:function(e){switch(e.retrigx){case 1:e.volume--;break;case 2:e.volume++;break;case 3:e.volume-=4;break;case 4:e.volume-=8;break;case 5:e.volume-=16;break;case 6:e.volume=(e.volume<<1)/3;break;case 7:e.volume>>=1;break;case 8:e.volume=e.sample.volume;break;case 9:e.volume++;break;case 10:e.volume+=2;break;case 11:e.volume+=4;break;case 12:e.volume+=8;break;case 13:e.volume+=16;break;case 14:e.volume=e.volume*3>>1;break;case 15:e.volume<<=1;break;default:break}e.volume<0?e.volume=0:e.volume>64&&(e.volume=64),e.flags|=Y}}}),Object.seal(t)}var ce=1,Y=2,ye=4,ot=8,zr=15,Ye=32,Co=1,Or=2,Po=4,Ur=0,Br=118,_i=97,qr=[0,-2,-3,-5,-6,-8,-9,-11,-12,-14,-16,-17,-19,-20,-22,-23,-24,-26,-27,-29,-30,-32,-33,-34,-36,-37,-38,-39,-41,-42,-43,-44,-45,-46,-47,-48,-49,-50,-51,-52,-53,-54,-55,-56,-56,-57,-58,-59,-59,-60,-60,-61,-61,-62,-62,-62,-63,-63,-63,-64,-64,-64,-64,-64,-64,-64,-64,-64,-64,-64,-63,-63,-63,-62,-62,-62,-61,-61,-60,-60,-59,-59,-58,-57,-56,-56,-55,-54,-53,-52,-51,-50,-49,-48,-47,-46,-45,-44,-43,-42,-41,-39,-38,-37,-36,-34,-33,-32,-30,-29,-27,-26,-24,-23,-22,-20,-19,-17,-16,-14,-12,-11,-9,-8,-6,-5,-3,-2,0,2,3,5,6,8,9,11,12,14,16,17,19,20,22,23,24,26,27,29,30,32,33,34,36,37,38,39,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,56,57,58,59,59,60,60,61,61,62,62,62,63,63,63,64,64,64,64,64,64,64,64,64,64,64,63,63,63,62,62,62,61,61,60,60,59,59,58,57,56,56,55,54,53,52,51,50,49,48,47,46,45,44,43,42,41,39,38,37,36,34,33,32,30,29,27,26,24,23,22,20,19,17,16,14,12,11,9,8,6,5,3,2],Fo=[0,24,49,74,97,120,141,161,180,197,212,224,235,244,250,253,255,253,250,244,235,224,212,197,180,161,141,120,97,74,49,24],rt=[0,.04417,.062489,.076523,.088371,.098821,.108239,.116927,.124977,.132572,.139741,.146576,.153077,.159335,.16535,.171152,.176772,.18221,.187496,.19263,.197643,.202503,.207273,.211951,.216477,.220943,.225348,.229631,.233854,.237985,.242056,.246066,.249985,.253873,.25767,.261437,.265144,.268819,.272404,.275989,.279482,.282976,.286409,.289781,.293153,.296464,.299714,.302965,.306185,.309344,.312473,.315602,.318671,.321708,.324746,.327754,.3307,.333647,.336563,.339449,.342305,.345161,.347986,.350781,.353545,.356279,.359013,.361717,.364421,.367094,.369737,.37238,.374992,.377574,.380157,.382708,.38526,.387782,.390303,.392794,.395285,.397746,.400176,.402606,.405037,.407437,.409836,.412206,.414576,.416915,.419254,.421563,.423841,.42618,.428458,.430737,.432985,.435263,.437481,.439729,.441916,.444134,.446321,.448508,.450665,.452852,.455009,.457136,.459262,.461389,.463485,.465611,.467708,.469773,.471839,.473935,.47597,.478036,.480072,.482077,.484112,.486117,.488122,.490127,.492101,.494106,.496051,.498025,.5,.501944,.503888,.505802,.507746,.50966,.511574,.513488,.515371,.517255,.519138,.521022,.522905,.524758,.526611,.528465,.530318,.53214,.533993,.535816,.537639,.539462,.541254,.543046,.544839,.546631,.548423,.550216,.551978,.553739,.555501,.557263,.558995,.560757,.562489,.56422,.565952,.567683,.569384,.571116,.572817,.574518,.57622,.57789,.579592,.581262,.582964,.584634,.586305,.587946,.589617,.591257,.592928,.594568,.596209,.597849,.599459,.6011,.60271,.60435,.60596,.60757,.60915,.61076,.61237,.61395,.61556,.617139,.618719,.620268,.621848,.623428,.624977,.626557,.628106,.629655,.631205,.632754,.634303,.635822,.637372,.63889,.64044,.641959,.643478,.644966,.646485,.648004,.649523,.651012,.6525,.653989,.655477,.656966,.658454,.659943,.661431,.66289,.664378,.665836,.667294,.668783,.670241,.671699,.673127,.674585,.676043,.677471,.678929,.680357,.681785,.683213,.684641,.686068,.687496,.688894,.690321,.691749,.693147,.694574,.695972,.697369,.698767,.700164,.701561,.702928,.704326,.705723,.70711],Mo=[0,.005863,.013701,.021569,.029406,.037244,.045082,.052919,.060757,.068625,.076463,.0843,.092138,.099976,.107844,.115681,.123519,.131357,.139194,.147032,.1549,.162738,.170575,.178413,.186251,.194119,.201956,.209794,.217632,.225469,.233307,.241175,.249013,.25685,.264688,.272526,.280394,.288231,.296069,.303907,.311744,.319582,.32745,.335288,.343125,.350963,.3588,.366669,.374506,.382344,.390182,.398019,.405857,.413725,.421563,.4294,.437238,.445076,.452944,.460781,.468619,.476457,.484294,.492132,.5],Li=[29024,27392,25856,24384,23040,21696,20480,19328,18240,17216,16256,15360,14512,13696,12928,12192,11520,10848,10240,9664,9120,8608,8128,7680,7256,6848,6464,6096,5760,5424,5120,4832,4560,4304,4064,3840,3628,3424,3232,3048,2880,2712,2560,2416,2280,2152,2032,1920,1814,1712,1616,1524,1440,1356,1280,1208,1140,1076,1016,960,907,856,808,762,720,678,640,604,570,538,508,480,453,428,404,381,360,339,320,302,285,269,254,240,227,214,202,190,180,169,160,151,142,134,127,120,113,107,101,95,90,85,80,75,71,67,63,60,57,53,50,48,45,42,40,38,36,34,32,30,28],To=Rr;function pi(i){return Object.create(null,{index:{value:i,writable:!0},next:{value:null,writable:!0},channel:{value:null,writable:!0},sample:{value:null,writable:!0},enabled:{value:0,writable:!0},period:{value:0,writable:!0},effect:{value:0,writable:!0},param:{value:0,writable:!0},volume:{value:0,writable:!0},portaDir:{value:0,writable:!0},portaPeriod:{value:0,writable:!0},portaSpeed:{value:0,writable:!0},vibratoPos:{value:0,writable:!0},vibratoSpeed:{value:0,writable:!0},initialize:{value:function(){this.channel=null,this.sample=null,this.enabled=0,this.period=0,this.effect=0,this.param=0,this.volume=0,this.portaDir=0,this.portaPeriod=0,this.portaSpeed=0,this.vibratoPos=0,this.vibratoSpeed=0}}})}function Nr(i){var t=ui(i);return Object.defineProperties(t,{id:{value:"MKPlayer"},track:{value:null,writable:!0},patterns:{value:[],writable:!0},samples:{value:[],writable:!0},length:{value:0,writable:!0},restart:{value:0,writable:!0},voices:{value:[],writable:!0},trackPos:{value:0,writable:!0},patternPos:{value:0,writable:!0},jumpFlag:{value:0,writable:!0},vibratoDepth:{value:0,writable:!0},restartSave:{value:0,writable:!0},force:{set:function(e){e<Ii?e=Ii:e>Ke&&(e=Ke),this.version=e,e===Ke?this.vibratoDepth=6:this.vibratoDepth=7,e===Ao?(this.restartSave=this.restart,this.restart=0):(this.restart=this.restartSave,this.restartSave=0)}},initialize:{value:function(){var e=this.voices[0];for(this.reset(),this.force=this.version,this.speed=6,this.trackPos=0,this.patternPos=0,this.jumpFlag=0;e;)e.initialize(),e.channel=this.mixer.channels[e.index],e.sample=this.samples[0],e=e.next}},loader:{value:function(e){var o=0,a,l,f,r,n,d=0,u;if(!(e.length<2106)&&(e.position=1080,l=e.readString(4),!(l!=="M.K."&&l!=="FLT4"))){for(e.position=0,this.title=e.readString(20),this.version=Ii,e.position+=22,a=1;a<32;++a){if(u=e.readUshort(),!u){this.samples[a]=null,e.position+=28;continue}n=Tt(),e.position-=24,n.name=e.readString(22),n.length=u<<1,e.position+=3,n.volume=e.readUbyte(),n.loop=e.readUshort()<<1,n.repeat=e.readUshort()<<1,e.position+=22,n.pointer=d,d+=n.length,this.samples[a]=n,n.length>32768&&(this.version=jr)}for(e.position=950,this.length=e.readUbyte(),u=e.readUbyte(),this.restart=u<this.length?u:0,a=0;a<128;++a)u=e.readUbyte()<<8,this.track[a]=u,u>o&&(o=u);for(e.position=1084,o+=256,this.patterns.length=o,a=0;a<o;++a)if(r=fi(),u=e.readUint(),r.note=u>>16&4095,r.effect=u>>8&15,r.sample=u>>24&240|u>>12&15,r.param=u&255,this.patterns[a]=r,(r.sample>31||!this.samples[r.sample])&&(r.sample=0),(r.effect===3||r.effect===4)&&(this.version=Ao),(r.effect===5||r.effect===6)&&(this.version=Ke),r.effect>6&&r.effect<10){this.version=0;return}for(this.mixer.store(e,d),a=1;a<32;++a)if(n=this.samples[a],!!n)for(n.name.indexOf("2.0")>-1&&(this.version=Ke),n.loop?(n.loopPtr=n.pointer+n.loop,n.length=n.loop+n.repeat):(n.loopPtr=this.mixer.memory.length,n.repeat=2),d=n.pointer+4,f=n.pointer;f<d;++f)this.mixer.memory[f]=0;n=Tt(),n.pointer=n.loopPtr=this.mixer.memory.length,n.length=n.repeat=2,this.samples[0]=n,this.version<Ke&&this.restart!==127&&(this.version=Hr)}}},process:{value:function(){var e,o,a,l,f,r,n,d,u,s=this.voices[0];if(this.tick)for(;s;){if(e=s.channel,!s.effect&&!s.param){e.period=s.period,s=s.next;continue}switch(s.effect){case 0:if(u=this.tick%3,!u){e.period=s.period,s=s.next;continue}for(u===1?u=s.param>>4:u=s.param&15,f=s.period&4095,a=37-u,o=0;o<a;++o)if(f>=Do[o]){e.period=Do[o+u];break}break;case 1:s.period-=s.param,s.period<113&&(s.period=113),e.period=s.period;break;case 2:s.period+=s.param,s.period>856&&(s.period=856),e.period=s.period;break;case 3:case 5:s.effect===5?d=1:s.param&&(s.portaSpeed=s.param,s.param=0),s.portaPeriod&&(s.portaDir?(s.period-=s.portaSpeed,s.period<=s.portaPeriod&&(s.period=s.portaPeriod,s.portaPeriod=0)):(s.period+=s.portaSpeed,s.period>=s.portaPeriod&&(s.period=s.portaPeriod,s.portaPeriod=0))),e.period=s.period;break;case 4:case 6:s.effect===6?d=1:s.param&&(s.vibratoSpeed=s.param),u=s.vibratoPos>>2&31,u=(s.vibratoSpeed&15)*$r[u]>>this.vibratoDepth,s.vibratoPos>127?e.period=s.period-u:e.period=s.period+u,u=s.vibratoSpeed>>2&60,s.vibratoPos=s.vibratoPos+u&255;break;case 10:d=1;break;default:break}d&&(u=s.param>>4,d=0,u?s.volume+=u:s.volume-=s.param&15,s.volume<0?s.volume=0:s.volume>64&&(s.volume=64),e.volume=s.volume),s=s.next}else for(l=this.track[this.trackPos]+this.patternPos;s;){switch(e=s.channel,s.enabled=0,r=this.patterns[l+s.index],s.effect=r.effect,s.param=r.param,r.sample?(n=s.sample=this.samples[r.sample],e.volume=s.volume=n.volume):n=s.sample,r.note&&(s.effect===3||s.effect===5?r.note<s.period?(s.portaDir=1,s.portaPeriod=r.note):r.note>s.period?(s.portaDir=0,s.portaPeriod=r.note):s.portaPeriod=0:(s.enabled=1,s.vibratoPos=0,e.enabled=0,e.pointer=n.pointer,e.length=n.length,e.period=s.period=r.note)),s.effect){case 11:this.trackPos=s.param-1,this.jumpFlag^=1;break;case 12:e.volume=s.param,this.version===Ke&&(s.volume=s.param);break;case 13:this.jumpFlag^=1;break;case 14:this.mixer.filter.active=s.param^1;break;case 15:u=s.param,u<1?u=1:u>31&&(u=31),this.speed=u,this.tick=0;break;default:break}s.enabled&&(e.enabled=1),e.pointer=n.loopPtr,e.length=n.repeat,s=s.next}++this.tick===this.speed&&(this.tick=0,this.patternPos+=4,(this.patternPos===256||this.jumpFlag)&&(this.patternPos=this.jumpFlag=0,this.trackPos=++this.trackPos&127,this.trackPos===this.length&&(this.trackPos=this.restart,this.mixer.complete=1)))}}}),t.voices[0]=pi(0),t.voices[0].next=t.voices[1]=pi(1),t.voices[1].next=t.voices[2]=pi(2),t.voices[2].next=t.voices[3]=pi(3),t.track=new Uint16Array(128),Object.seal(t)}var Ii=1,jr=2,Ao=3,Hr=4,Ke=5,Do=[856,808,762,720,678,640,604,570,538,508,480,453,428,404,381,360,339,320,302,285,269,254,240,226,214,202,190,180,170,160,151,143,135,127,120,113,0],$r=[0,24,49,74,97,120,141,161,180,197,212,224,235,244,250,253,255,253,250,244,235,224,212,197,180,161,141,120,97,74,49,24],_o=Nr;function mi(i){return Object.create(null,{index:{value:i,writable:!0},next:{value:null,writable:!0},channel:{value:null,writable:!0},sample:{value:null,writable:!0},enabled:{value:0,writable:!0},loopCtr:{value:0,writable:!0},loopPos:{value:0,writable:!0},step:{value:0,writable:!0},period:{value:0,writable:!0},effect:{value:0,writable:!0},param:{value:0,writable:!0},volume:{value:0,writable:!0},pointer:{value:0,writable:!0},length:{value:0,writable:!0},loopPtr:{value:0,writable:!0},repeat:{value:0,writable:!0},finetune:{value:0,writable:!0},offset:{value:0,writable:!0},portaDir:{value:0,writable:!0},portaPeriod:{value:0,writable:!0},portaSpeed:{value:0,writable:!0},glissando:{value:0,writable:!0},tremoloParam:{value:0,writable:!0},tremoloPos:{value:0,writable:!0},tremoloWave:{value:0,writable:!0},vibratoParam:{value:0,writable:!0},vibratoPos:{value:0,writable:!0},vibratoWave:{value:0,writable:!0},funkPos:{value:0,writable:!0},funkSpeed:{value:0,writable:!0},funkWave:{value:0,writable:!0},initialize:{value:function(){this.channel=null,this.sample=null,this.enabled=0,this.loopCtr=0,this.loopPos=0,this.step=0,this.period=0,this.effect=0,this.param=0,this.volume=0,this.pointer=0,this.length=0,this.loopPtr=0,this.repeat=0,this.finetune=0,this.offset=0,this.portaDir=0,this.portaPeriod=0,this.portaSpeed=0,this.glissando=0,this.tremoloParam=0,this.tremoloPos=0,this.tremoloWave=0,this.vibratoParam=0,this.vibratoPos=0,this.vibratoWave=0,this.funkPos=0,this.funkSpeed=0,this.funkWave=0}}})}function Xr(){var i=fi();return Object.defineProperties(i,{step:{value:0,writable:!0}}),Object.seal(i)}function Lo(){var i=Tt();return Object.defineProperties(i,{finetune:{value:0,writable:!0},realLen:{value:0,writable:!0}}),Object.seal(i)}function Gr(i){var t=ui(i);return Object.defineProperties(t,{id:{value:"PTPlayer"},track:{value:null,writable:!0},patterns:{value:[],writable:!0},samples:{value:[],writable:!0},length:{value:0,writable:!0},voices:{value:[],writable:!0},trackPos:{value:0,writable:!0},patternPos:{value:0,writable:!0},patternBreak:{value:0,writable:!0},patternDelay:{value:0,writable:!0},breakPos:{value:0,writable:!0},jumpFlag:{value:0,writable:!0},vibratoDepth:{value:0,writable:!0},force:{set:function(e){e<gi?e=gi:e>Ri&&(e=Ri),this.version=e,e<Io?this.vibratoDepth=6:this.vibratoDepth=7}},initialize:{value:function(){var e=this.voices[0];for(this.tempo=125,this.speed=6,this.trackPos=0,this.patternPos=0,this.patternBreak=0,this.patternDelay=0,this.breakPos=0,this.jumpFlag=0,this.reset(),this.force=this.version;e;)e.initialize(),e.channel=this.mixer.channels[e.index],e.sample=this.samples[0],e=e.next}},loader:{value:function(e){var o=0,a,l,f,r,n,d=0,u;if(!(e.length<2106)&&(e.position=1080,l=e.readString(4),!(l!=="M.K."&&l!=="M!K!"))){for(e.position=0,this.title=e.readString(20),this.version=gi,e.position+=22,a=1;a<32;++a){if(u=e.readUshort(),!u){this.samples[a]=null,e.position+=28;continue}n=Lo(),e.position-=24,n.name=e.readString(22),n.length=n.realLen=u<<1,e.position+=2,n.finetune=e.readUbyte()*37,n.volume=e.readUbyte(),n.loop=e.readUshort()<<1,n.repeat=e.readUshort()<<1,e.position+=22,n.pointer=d,d+=n.length,this.samples[a]=n}for(e.position=950,this.length=e.readUbyte(),e.position++,a=0;a<128;++a)u=e.readUbyte()<<8,this.track[a]=u,u>o&&(o=u);for(e.position=1084,o+=256,this.patterns.length=o,a=0;a<o;++a)r=Xr(),r.step=u=e.readUint(),r.note=u>>16&4095,r.effect=u>>8&15,r.sample=u>>24&240|u>>12&15,r.param=u&255,this.patterns[a]=r,(r.sample>31||!this.samples[r.sample])&&(r.sample=0),r.effect===15&&r.param>31&&(this.version=Io),r.effect===8&&(this.version=Ri);for(this.mixer.store(e,d),a=1;a<32;++a)if(n=this.samples[a],!!n)for(n.loop||n.repeat>4?(n.loopPtr=n.pointer+n.loop,n.length=n.loop+n.repeat):(n.loopPtr=this.mixer.memory.length,n.repeat=2),d=n.pointer+2,f=n.pointer;f<d;++f)this.mixer.memory[f]=0;n=Lo(),n.pointer=n.loopPtr=this.mixer.memory.length,n.length=n.repeat=2,this.samples[0]=n}}},process:{value:function(){var e,o,a,l,f,r,n=this.voices[0];if(this.tick)this.effects();else if(this.patternDelay)this.effects();else{for(a=this.track[this.trackPos]+this.patternPos;n;){if(e=n.channel,n.enabled=0,n.step||(e.period=n.period),l=this.patterns[a+n.index],n.step=l.step,n.effect=l.effect,n.param=l.param,l.sample?(f=n.sample=this.samples[l.sample],n.pointer=f.pointer,n.length=f.length,n.loopPtr=n.funkWave=f.loopPtr,n.repeat=f.repeat,n.finetune=f.finetune,e.volume=n.volume=f.volume):f=n.sample,l.note)if((n.step&4080)===3664)n.finetune=(n.param&15)*37;else if(n.effect===3||n.effect===5)if(l.note===n.period)n.portaPeriod=0;else{for(o=n.finetune,r=o+37;o<r&&!(l.note>=Ne[o]);++o);o===r&&r--,o>0&&(r=n.finetune/37>>0&8,r&&o--),n.portaPeriod=Ne[o],n.portaDir=l.note>n.portaPeriod?0:1}else n.effect===9&&this.moreEffects(n);else{this.moreEffects(n),n=n.next;continue}for(o=0;o<37&&!(l.note>=Ne[o]);++o);if(n.period=Ne[n.finetune+o],(n.step&4080)===3792){n.funkSpeed&&this.updateFunk(n),this.extended(n),n=n.next;continue}n.vibratoWave<4&&(n.vibratoPos=0),n.tremoloWave<4&&(n.tremoloPos=0),e.enabled=0,e.pointer=n.pointer,e.length=n.length,e.period=n.period,n.enabled=1,this.moreEffects(n),n=n.next}for(n=this.voices[0];n;)e=n.channel,n.enabled&&(e.enabled=1),e.pointer=n.loopPtr,e.length=n.repeat,n=n.next}++this.tick===this.speed&&(this.tick=0,this.patternPos+=4,this.patternDelay&&--this.patternDelay&&(this.patternPos-=4),this.patternBreak&&(this.patternBreak=0,this.patternPos=this.breakPos,this.breakPos=0),(this.patternPos===256||this.jumpFlag)&&(this.patternPos=this.breakPos,this.breakPos=0,this.jumpFlag=0,++this.trackPos===this.length&&(this.trackPos=0,this.mixer.complete=1)))}},effects:{value:function(){for(var e,o,a,l,f,r=this.voices[0],n;r;){if(e=r.channel,r.funkSpeed&&this.updateFunk(r),(r.step&4095)===0){e.period=r.period,r=r.next;continue}switch(r.effect){case 0:if(f=this.tick%3,!f){e.period=r.period,r=r.next;continue}for(f===1?f=r.param>>4:f=r.param&15,o=r.finetune,a=o+37;o<a;++o)if(r.period>=Ne[o]){e.period=Ne[o+f];break}break;case 1:r.period-=r.param,r.period<113&&(r.period=113),e.period=r.period;break;case 2:r.period+=r.param,r.period>856&&(r.period=856),e.period=r.period;break;case 3:case 5:if(r.effect===5?l=1:(r.portaSpeed=r.param,r.param=0),r.portaPeriod)if(r.portaDir?(r.period-=r.portaSpeed,r.period<=r.portaPeriod&&(r.period=r.portaPeriod,r.portaPeriod=0)):(r.period+=r.portaSpeed,r.period>=r.portaPeriod&&(r.period=r.portaPeriod,r.portaPeriod=0)),r.glissando){for(o=r.finetune,f=o+37;o<f&&!(r.period>=Ne[o]);++o);o===f&&o--,e.period=Ne[o]}else e.period=r.period;break;case 4:case 6:r.effect===6?l=1:r.param&&(f=r.param&15,f&&(r.vibratoParam=r.vibratoParam&240|f),f=r.param&240,f&&(r.vibratoParam=r.vibratoParam&15|f)),a=r.vibratoPos>>2&31,n=r.vibratoWave&3,n?(f=255,a<<=3,n===1&&(r.vibratoPos>127?f-=a:f=a)):f=Ro[a],f=(r.vibratoParam&15)*f>>this.vibratoDepth,r.vibratoPos>127?e.period=r.period-f:e.period=r.period+f,f=r.vibratoParam>>2&60,r.vibratoPos=r.vibratoPos+f&255;break;case 7:e.period=r.period,r.param&&(f=r.param&15,f&&(r.tremoloParam=r.tremoloParam&240|f),f=r.param&240,f&&(r.tremoloParam=r.tremoloParam&15|f)),a=r.tremoloPos>>2&31,n=r.tremoloWave&3,n?(f=255,a<<=3,n===1&&(r.tremoloPos>127?f-=a:f=a)):f=Ro[a],f=(r.tremoloParam&15)*f>>6,r.tremoloPos>127?e.volume=r.volume-f:e.volume=r.volume+f,f=r.tremoloParam>>2&60,r.tremoloPos=r.tremoloPos+f&255;break;case 10:l=1;break;case 14:this.extended(r);break;default:break}l&&(l=0,f=r.param>>4,f?r.volume+=f:r.volume-=r.param&15,r.volume<0?r.volume=0:r.volume>64&&(r.volume=64),e.volume=r.volume),r=r.next}}},moreEffects:{value:function(e){var o=e.channel,a;switch(e.funkSpeed&&this.updateFunk(e),e.effect){case 9:e.param&&(e.offset=e.param),a=e.offset<<8,a>=e.length?e.length=2:(e.pointer+=a,e.length-=a);break;case 11:this.trackPos=e.param-1,this.breakPos=0,this.jumpFlag=1;break;case 12:e.volume=e.param,e.volume>64&&(e.volume=64),o.volume=e.volume;break;case 13:this.breakPos=(e.param>>4)*10+(e.param&15),this.breakPos>63?this.breakPos=0:this.breakPos<<=2,this.jumpFlag=1;break;case 14:this.extended(e);break;case 15:if(!e.param)return;e.param<32?this.speed=e.param:this.mixer.samplesTick=this.sampleRate*2.5/e.param>>0,this.tick=0;break;default:break}}},extended:{value:function(e){var o=e.channel,a=e.param>>4,l,f,r,n=e.param&15;switch(a){case 0:this.mixer.filter.active=n;break;case 1:if(this.tick)return;e.period-=n,e.period<113&&(e.period=113),o.period=e.period;break;case 2:if(this.tick)return;e.period+=n,e.period>856&&(e.period=856),o.period=e.period;break;case 3:e.glissando=n;break;case 4:e.vibratoWave=n;break;case 5:e.finetune=n*37;break;case 6:if(this.tick)return;n?(e.loopCtr?e.loopCtr--:e.loopCtr=n,e.loopCtr&&(this.breakPos=e.loopPos<<2,this.patternBreak=1)):e.loopPos=this.patternPos>>2;break;case 7:e.tremoloWave=n;break;case 8:for(f=e.length-2,r=this.mixer.memory,l=e.loopPtr;l<f;)r[l]=(r[l]+r[++l])*.5;r[++l]=(r[l]+r[0])*.5;break;case 9:if(this.tick||!n||!e.period||this.tick%n)return;o.enabled=0,o.pointer=e.pointer,o.length=e.length,o.delay=30,o.enabled=1,o.pointer=e.loopPtr,o.length=e.repeat,o.period=e.period;break;case 10:if(this.tick)return;e.volume+=n,e.volume>64&&(e.volume=64),o.volume=e.volume;break;case 11:if(this.tick)return;e.volume-=n,e.volume<0&&(e.volume=0),o.volume=e.volume;break;case 12:this.tick===n&&(o.volume=e.volume=0);break;case 13:if(this.tick!==n||!e.period)return;o.enabled=0,o.pointer=e.pointer,o.length=e.length,o.delay=30,o.enabled=1,o.pointer=e.loopPtr,o.length=e.repeat,o.period=e.period;break;case 14:if(this.tick||this.patternDelay)return;this.patternDelay=++n;break;case 15:if(this.tick)return;e.funkSpeed=n,n&&this.updateFunk(e);break;default:break}}},updateFunk:{value:function(e){var o=e.channel,a,l,f=Vr[e.funkSpeed];e.funkPos+=f,!(e.funkPos<128)&&(e.funkPos=0,this.version===gi?(a=e.pointer+e.sample.realLen-e.repeat,l=e.funkWave+e.repeat,l>a&&(l=e.loopPtr,o.length=e.repeat),o.pointer=e.funkWave=l):(a=e.loopPtr+e.repeat,l=e.funkWave+1,l>=a&&(l=e.loopPtr),this.mixer.memory[l]=-this.mixer.memory[l]))}}}),t.voices[0]=mi(0),t.voices[0].next=t.voices[1]=mi(1),t.voices[1].next=t.voices[2]=mi(2),t.voices[2].next=t.voices[3]=mi(3),t.track=new Uint16Array(128),Object.seal(t)}var gi=1,Io=2,Ri=3,Ne=[856,808,762,720,678,640,604,570,538,508,480,453,428,404,381,360,339,320,302,285,269,254,240,226,214,202,190,180,170,160,151,143,135,127,120,113,0,850,802,757,715,674,637,601,567,535,505,477,450,425,401,379,357,337,318,300,284,268,253,239,225,213,201,189,179,169,159,150,142,134,126,119,113,0,844,796,752,709,670,632,597,563,532,502,474,447,422,398,376,355,335,316,298,282,266,251,237,224,211,199,188,177,167,158,149,141,133,125,118,112,0,838,791,746,704,665,628,592,559,528,498,470,444,419,395,373,352,332,314,296,280,264,249,235,222,209,198,187,176,166,157,148,140,132,125,118,111,0,832,785,741,699,660,623,588,555,524,495,467,441,416,392,370,350,330,312,294,278,262,247,233,220,208,196,185,175,165,156,147,139,131,124,117,110,0,826,779,736,694,655,619,584,551,520,491,463,437,413,390,368,347,328,309,292,276,260,245,232,219,206,195,184,174,164,155,146,138,130,123,116,109,0,820,774,730,689,651,614,580,547,516,487,460,434,410,387,365,345,325,307,290,274,258,244,230,217,205,193,183,172,163,154,145,137,129,122,115,109,0,814,768,725,684,646,610,575,543,513,484,457,431,407,384,363,342,323,305,288,272,256,242,228,216,204,192,181,171,161,152,144,136,128,121,114,108,0,907,856,808,762,720,678,640,604,570,538,508,480,453,428,404,381,360,339,320,302,285,269,254,240,226,214,202,190,180,170,160,151,143,135,127,120,0,900,850,802,757,715,675,636,601,567,535,505,477,450,425,401,379,357,337,318,300,284,268,253,238,225,212,200,189,179,169,159,150,142,134,126,119,0,894,844,796,752,709,670,632,597,563,532,502,474,447,422,398,376,355,335,316,298,282,266,251,237,223,211,199,188,177,167,158,149,141,133,125,118,0,887,838,791,746,704,665,628,592,559,528,498,470,444,419,395,373,352,332,314,296,280,264,249,235,222,209,198,187,176,166,157,148,140,132,125,118,0,881,832,785,741,699,660,623,588,555,524,494,467,441,416,392,370,350,330,312,294,278,262,247,233,220,208,196,185,175,165,156,147,139,131,123,117,0,875,826,779,736,694,655,619,584,551,520,491,463,437,413,390,368,347,328,309,292,276,260,245,232,219,206,195,184,174,164,155,146,138,130,123,116,0,868,820,774,730,689,651,614,580,547,516,487,460,434,410,387,365,345,325,307,290,274,258,244,230,217,205,193,183,172,163,154,145,137,129,122,115,0,862,814,768,725,684,646,610,575,543,513,484,457,431,407,384,363,342,323,305,288,272,256,242,228,216,203,192,181,171,161,152,144,136,128,121,114,0],Ro=[0,24,49,74,97,120,141,161,180,197,212,224,235,244,250,253,255,253,250,244,235,224,212,197,180,161,141,120,97,74,49,24],Vr=[0,5,6,7,8,10,11,13,16,19,22,26,32,43,64,128],zo=Gr;function Wr(){var i=Object.create(null,{player:{value:null,writable:!0},index:{value:0,writable:!0},amiga:{value:null,writable:!0},mixer:{value:null,writable:!0},tracker:{get:function(){return this.player?Oo[this.index+this.player.version]:Oo[0]}},load:{value:function(t){var e,o;if(t.view||(t=Ti(t)),t.endian=1,t.position=0,t.readUint()===67324752&&window.neoart.Unzip,!t)return null;if(this.player&&this.player.id!=="STPlayer"&&(this.player.load(t),this.player.version))return this.player;if(t.length>336&&(t.position=38,e=t.readString(20),(e==="FastTracker v2.00   "||e==="FastTracker v 2.00  "||e==="Sk@le Tracker"||e==="MadTracker 2.0"||e==="MilkyTracker        "||e==="DigiBooster Pro 2.18"||e.indexOf("OpenMPT")!==-1)&&(this.player=To(this.mixer),this.player.load(t),this.player.version)))return this.index=oa,this.player;if(t.endian=0,t.length>2105){if(t.position=1080,e=t.readString(4),e==="M.K."||e==="FLT4"){if(this.player=_o(this.amiga),this.player.load(t),this.player.version)return this.index=Kr,this.player}else if(e==="FEST"&&(this.player=window.neoart.HMPlayer(this.amiga),this.player.load(t),this.player.version))return this.index=Zr,this.player}return t.length>2105&&(t.position=1080,e=t.readString(4),(e==="M.K."||e==="M!K!")&&(this.player=zo(this.amiga),this.player.load(t),this.player.version))?(this.index=Jr,this.player):t.length>5220&&(this.player=window.neoart.S1Player(this.amiga),this.player.load(t),this.player.version)?(this.index=Qr,this.player):(t.position=0,o=t.readUshort(),t.position=0,e=t.readString(4),(e==="COSO"||o===24576||o===24578||o===24590||o===24598)&&(this.player=window.neoart.JHPlayer(this.amiga),this.player.load(t),this.player.version)?(this.index=ta,this.player):(t.position=0,o=t.readUshort(),this.player=window.neoart.DWPlayer(this.amiga),this.player.load(t),this.player.version?(this.index=ea,this.player):(t.position=0,o=t.readUshort(),o===24576&&(this.player=window.neoart.RHPlayer(this.amiga),this.player.load(t),this.player.version)?(this.index=ia,this.player):t.length>1625&&(this.player=window.neoart.STPlayer(this.amiga),this.player.load(t),this.player.version)?(this.index=Yr,this.player):(t.clear(),this.index=0,this.player=null))))}}});return i.amiga=Ai(),Object.seal(i)}var Yr=0,Kr=4,Jr=9,Zr=12,Qr=26,ea=28,ta=30,ia=32,oa=33,Oo=["Unknown Format","Ultimate SoundTracker","D.O.C. SoundTracker 9","Master SoundTracker","D.O.C. SoundTracker 2.0/2.2","SoundTracker 2.3","SoundTracker 2.4","NoiseTracker 1.0","NoiseTracker 1.1","NoiseTracker 2.0","ProTracker 1.0","ProTracker 1.1/2.1","ProTracker 1.2/2.0","His Master's NoiseTracker","SoundFX 1.0/1.7","SoundFX 1.8","SoundFX 1.945","SoundFX 1.994/2.0","BP SoundMon V1","BP SoundMon V2","BP SoundMon V3","Delta Music 1.0","Delta Music 2.0","Digital Mugician","Digital Mugician 7 Voices","Future Composer 1.0/1.3","Future Composer 1.4","SidMon 1.0","SidMon 2.0","David Whittaker","FredEd","Jochen Hippel","Jochen Hippel COSO","Rob Hubbard","FastTracker II","Sk@leTracker","MadTracker 2.0","MilkyTracker","DigiBooster Pro 2.18","OpenMPT"],ra=Wr(),Uo=ra;var bi=class{constructor(t={}){this.baseRawUrl="https://raw.githubusercontent.com/michioxd/keygen-music/master/",this.indexUrl=this.baseRawUrl+"index.json",this.trackList=[],this.history=[],this.maxHistory=50,this.historyCursor=-1,this.currentPlayer=null,this.isPlaying=!1,this.pollInterval=null,this._opId=0,this.onTrackChange=t.onTrackChange||(()=>{}),this.onError=t.onError||(()=>{}),this.hasFetchedIndex=!1,this.currentTrack=null}async init(){if(!this.hasFetchedIndex)try{let t=await fetch(this.indexUrl);if(!t.ok)throw new Error("Network response was not ok");let e=await t.json(),o=["xm","mod","s3m","it"];this.trackList=e.filter(a=>a.fileExtension&&o.includes(a.fileExtension.toLowerCase())),this.hasFetchedIndex=!0}catch(t){throw console.warn("[Jukebox] Offline or failed to fetch track index:",t.message),this.trackList=[],this.onError("NO INTERNET OR BLOCKED ... TRY AGAIN?"),t}}async playNext(t=null){let e=++this._opId;this.stop();try{if(!this.hasFetchedIndex&&(await this.init(),e!==this._opId))return;if(this.trackList.length===0){console.warn("[Jukebox] Track list is empty \u2014 no tracks to play.");return}let o=null;if(t&&typeof t=="object"){let{title:a,trackTitle:l,artist:f}=t,r=this.trackList.filter(n=>{let d=!f||n.artist&&n.artist.toLowerCase()===f.toLowerCase(),u=!a||n.title&&n.title.toLowerCase()===a.toLowerCase(),s=!l||n.trackTitle&&n.trackTitle.toLowerCase()===l.toLowerCase();return d&&u&&s});r.length===0?console.warn("[Jukebox] No matches for target object \u2014 playing random:",t):r.length>1&&console.warn(`[Jukebox] ${r.length} ambiguous matches for target object \u2014 using first. Refine your search:`,r),o=r[0]||null}else if(t&&typeof t=="string"){let a=this.trackList.filter(l=>l.title&&l.title.toLowerCase()===t.toLowerCase());a.length===0?console.warn("[Jukebox] No matches for target title string \u2014 playing random:",t):a.length>1&&console.warn(`[Jukebox] ${a.length} ambiguous matches for title string \u2014 using first:`,a),o=a[0]||null}if(!o&&!t&&this.historyCursor<this.history.length-1)this.historyCursor++,o=this.trackList[this.history[this.historyCursor]];else if(!o){let a=this.trackList.filter((r,n)=>!this.history.includes(n));a.length===0&&(this.history=[],this.historyCursor=-1);let l=a.length>0?a:this.trackList;o=l[Math.floor(Math.random()*l.length)];let f=this.trackList.indexOf(o);this.historyCursor<this.history.length-1&&(this.history=this.history.slice(0,this.historyCursor+1)),this.history.push(f),this.history.length>this.maxHistory&&this.history.shift(),this.historyCursor=this.history.length-1}await this._playTrack(o,e)}catch(o){console.warn("[Jukebox] Track fetch failed \u2014 network issue?",o.message),this.onError("NO INTERNET OR BLOCKED ... TRY AGAIN?")}}async playPrevious(){if(this.historyCursor>0){let t=++this._opId;this.stop(),this.historyCursor--;let e=this.trackList[this.history[this.historyCursor]];try{await this._playTrack(e,t)}catch(o){console.warn("[Jukebox] Previous track fetch failed:",o.message),this.onError("NO INTERNET OR BLOCKED ... TRY AGAIN?")}}}async _playTrack(t,e){let o=t.path.split("/").map(n=>encodeURIComponent(n)).join("/"),a=this.baseRawUrl+o,l=await fetch(a);if(!l.ok)throw new Error("Failed to fetch audio file");if(e!==this._opId)return;let f=await l.arrayBuffer();if(e!==this._opId)return;let r=null;try{r=Uo.load(f)}catch(n){console.warn(`[Jukebox] Unsupported format for "${t.title}" \u2014 skipping:`,n.message),e===this._opId&&setTimeout(()=>this.playNext(),100);return}e===this._opId&&(this.currentPlayer=r,this.currentPlayer?(this.currentTrack=t,typeof this.currentPlayer.loopSong<"u"&&(this.currentPlayer.loopSong=1),this.currentPlayer.play(),this.isPlaying=!0,this.onTrackChange(t),this.setupCompletionPolling()):setTimeout(()=>this.playNext(),100))}setupCompletionPolling(){this.pollInterval&&clearInterval(this.pollInterval),this.pollInterval=setInterval(()=>{if(!this.currentPlayer)return this.stopPolling();let t=!1;this.currentPlayer.amiga&&this.currentPlayer.amiga.playing===!1&&(t=!0),this.currentPlayer.mixer&&this.currentPlayer.mixer.playing===!1&&(t=!0),this.currentPlayer.stopped&&(t=!0),this.currentPlayer.playing===!1&&(t=!0),t&&this.playNext()},1e3)}stopPolling(){this.pollInterval&&(clearInterval(this.pollInterval),this.pollInterval=null)}stop(){if(this.stopPolling(),this.isPlaying=!1,this.currentPlayer){try{this.currentPlayer.stop()}catch{}this.currentPlayer=null}}};function Bo(i,t,e){let o=document.getElementById("afx-audio-toggle");if(!o)return;let a=document.getElementById("afx-bgm-status");o.checked&&e.classList.add("afx-music-playing"),i.jukebox=new bi({onTrackChange:r=>{let n=`NOW PLAYING: ${r.artist} - ${r.title} - ${r.trackTitle}`;t.marquee=n,i.marquee&&i.marquee.setText(n)},onError:r=>{t.marquee=r,i.marquee&&i.marquee.setText(r)}}),o.addEventListener("change",r=>{let n=r.target.checked,d=Pt();if(n){e.classList.add("afx-bgm-active"),e.classList.add("afx-music-playing"),a.innerHTML=d?"\u{1F50A}":"\u{1F50A} BGM: ON";let u=window.AudioContext||window.webkitAudioContext;u&&(window.neoart=window.neoart||{},window.neoart.audioContext||(window.neoart.audioContext=new u)),window.neoart.audioContext&&window.neoart.audioContext.state==="suspended"&&window.neoart.audioContext.resume();let s=localStorage.getItem("ankifx_preferred_effect")||t.defaultEffect||"geometry",h=t.trackTitle||i.EFFECT_SONG_MAP[s]||null;i.jukebox.playNext(h)}else e.classList.remove("afx-bgm-active"),e.classList.remove("afx-music-playing"),a.innerHTML=d?"\u{1F507}":"\u{1F507} BGM: OFF",i.jukebox.stop(),t.marquee=i.defaultMarqueeText,i.marquee&&i.marquee.setText(i.defaultMarqueeText)});let l=document.getElementById("afx-btn-back"),f=document.getElementById("afx-btn-skip");l&&l.addEventListener("click",r=>{r.stopPropagation(),i.jukebox&&i.jukebox.playPrevious()}),f&&f.addEventListener("click",r=>{r.stopPropagation(),i.jukebox&&i.jukebox.playNext()})}function qo(i,t,e,o){let a=document.getElementById("afx-effect-selector");a&&a.addEventListener("change",l=>{let f=l.target.value;if(localStorage.setItem("ankifx_preferred_effect",f),Object.values(te).forEach(r=>r.stop()),i.ctx2D&&i.ctx2D.clearRect(0,0,i.width,i.height),i.glContext&&(i.glContext.clearColor(0,0,0,0),i.glContext.clear(i.glContext.COLOR_BUFFER_BIT)),t.defaultEffect=f,f==="debug"?e.classList.add("afx-debug-active"):e.classList.remove("afx-debug-active"),Mt(i,t,o,t.marqueePosition,f),i.jukebox&&i.jukebox.isPlaying){let r=t.trackTitle||i.EFFECT_SONG_MAP[f]||null,n=i.jukebox.currentTrack,d=!1;r&&(typeof r=="string"?d=!n||n.title.toLowerCase()!==r.toLowerCase():d=!n||r.title&&n.title.toLowerCase()!==r.title.toLowerCase()||r.trackTitle&&n.trackTitle.toLowerCase()!==r.trackTitle.toLowerCase()||r.artist&&(n.artist||"").toLowerCase()!==r.artist.toLowerCase()),d&&i.jukebox.playNext(r)}})}function No(i,t,e){let o=document.createElement("div");o.id="ankifx-overlay",t.debug&&o.classList.add("afx-debug-active");let a=window.innerWidth||document.documentElement.clientWidth||800,l=a<480?.65:a<768?.8:1,f=Math.max(55,Math.ceil(85*l));no()&&(t.marqueePosition==="top"?o.style.paddingTop=`calc(1rem + ${f}px)`:o.style.paddingBottom=`calc(1rem + ${f}px)`);let r=it(),n=Pt(),d=n?"\u{1F4DC} ":"\u{1F4DC} TEXT: ",u=n?"":" BGM: ",s=n?d.trim():r?`${d}ON`:`${d}OFF`,h=n?"\u{1F507}":`\u{1F507}${u}OFF`,b=n?"\u{1F3A8} ":"[ Effect: ",m=n?"":" ]",c=Object.values(te).filter(P=>P.id!=="debug"||t.debug).map(P=>`
            <option value="${P.id}" ${e===P.id?"selected":""}>
                ${b}${P.name}${m}
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
                        ${c}
                    </select>
                </div>
            </div>
        </div>
    `,p=!1;try{p=localStorage.getItem(`ankifx_agreed_${t.deckTitle}`)==="true"}catch{}let y=t.termsText&&t.termsText.trim()!==""&&!p;y&&(o.innerHTML=`
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
        `);let v=document.createElement("div");for(v.innerHTML=g;v.firstChild;)o.appendChild(v.firstChild);let C=document.createElement("div");C.id="ankifx-background",document.body.appendChild(C),i.sharedGL=document.createElement("canvas"),i.sharedGL.id="afx-shared-gl",i.sharedGL.className="afx-shared-canvas",C.appendChild(i.sharedGL),i.shared2D=document.createElement("canvas"),i.shared2D.id="afx-shared-2d",i.shared2D.className="afx-shared-canvas",C.appendChild(i.shared2D),i.sharedMarquee=document.createElement("canvas"),i.sharedMarquee.id="afx-shared-marquee",i.sharedMarquee.className="afx-shared-canvas afx-shared-marquee-canvas",C.appendChild(i.sharedMarquee),i.glContext=i.sharedGL.getContext("webgl",{alpha:!1,antialias:!1}),i.ctx2D=i.shared2D.getContext("2d"),i.ctxMarquee=i.sharedMarquee.getContext("2d"),document.body.appendChild(o);let w=document.createElement("div");w.id="afx-top-dock";let E=document.createElement("div");E.className="afx-top-group-left",E.id="afx-top-group-left";let x=document.createElement("div");x.className="afx-top-group-right",x.id="afx-top-group-right";let k=document.createElement("button");k.id="afx-btn-back",k.className="afx-playback-btn",k.textContent="\u23EE\uFE0F";let L=document.createElement("button");if(L.id="afx-btn-skip",L.className="afx-playback-btn",L.textContent="\u23ED\uFE0F",E.appendChild(k),x.appendChild(L),t.debug){let P=document.createElement("div");P.id="afx-global-fps",P.className="afx-global-fps",P.textContent="FPS: --",E.appendChild(P)}w.appendChild(E),w.appendChild(x),o.appendChild(w);let T=P=>{let q=o.classList.contains("afx-agreed-state"),$=P.target.closest("button, input, select, .afx-slider, .afx-toggle, .afx-playback-btn, select option");q?$&&P.stopPropagation():P.stopPropagation()};["touchstart","touchend","mousedown","mouseup","pointerdown","pointerup","click"].forEach(P=>{o.addEventListener(P,T,{passive:!1})});let U=document.getElementById("afx-consent-btn");y&&U?go(i,t,o,U):window.AnkiFX.agree(o,t.deckTitle),Bo(i,t,o);let N=document.getElementById("afx-text-toggle");if(N){let P=document.getElementById("afx-text-status");N.addEventListener("change",q=>{let $=q.target.checked,G=Pt();localStorage.setItem("ankifx_marquee_enabled",$);let V=G?"\u{1F4DC} ":"\u{1F4DC} TEXT: ";P.textContent=G?V.trim():$?`${V}ON`:`${V}OFF`,i.marquee&&(i.marquee.enabled=$)})}return qo(i,t,o,C),{overlay:o,background:C}}var jo=["ankifx-overlay","ankifx-background","afx-btn-back","afx-btn-skip","afx-bottom-dock","afx-top-dock"],F={marquee:null,jukebox:null,sharedGL:null,shared2D:null,sharedMarquee:null,glContext:null,ctx2D:null,ctxMarquee:null,currentEffectId:null,dpr:1,width:0,height:0,marqueeInterval:null,defaultMarqueeText:null,EFFECT_SONG_MAP:{},_layoutHandler:null,_resizeTimeout:null,_resizeInterval:null,observer:null,dockObserver:null};function aa(i={}){console.log(`[AnkiFX] Init \u2192 v${je.version} (${je.source})`);let t=lo(i);if(document.getElementById("ankifx-overlay")&&co(F,t))return;document.documentElement.classList.remove("afx-scroll-lock"),document.documentElement.classList.remove("afx-agreed"),jo.forEach(a=>{let l=document.getElementById(a);l&&l.remove()}),F.defaultMarqueeText=t.marquee,F.EFFECT_SONG_MAP={},Object.entries(te).forEach(([a,l])=>{l&&l.preferredTrack&&(F.EFFECT_SONG_MAP[a]=l.preferredTrack)}),Ho();let e=so(t),{background:o}=No(F,t,e);po(F),ho(F),qe(F),uo(F),F.marquee?(F.marquee.setText(t.marquee),F.marquee.setPosition(t.marqueePosition)):(F.marquee=new oi(t.marquee,t.marqueePosition),Mi(F)),Mt(F,t,o,t.marqueePosition,e),F.marquee&&(F.marquee.enabled=it()),mo(F),ni()}function Ho(){if(document.getElementById("ankifx-styles"))return;let i=document.createElement("style");i.id="ankifx-styles",i.textContent=ao,document.head.appendChild(i)}function na(i,t){if(i.classList.add("afx-agreed-state"),document.documentElement.classList.add("afx-agreed"),document.documentElement.classList.remove("afx-scroll-lock"),t)try{localStorage.setItem(`ankifx_agreed_${t}`,"true")}catch{}ni()}function la(){F.currentEffectId&&te[F.currentEffectId]?.stop&&te[F.currentEffectId].stop(),F.jukebox&&(F.jukebox.stop(),F.jukebox=null),F.marqueeInterval&&(cancelAnimationFrame(F.marqueeInterval),F.marqueeInterval=null),F.marquee=null;let i=document.getElementById("_flag"),t=document.getElementById("_mark");i&&document.body.appendChild(i),t&&document.body.appendChild(t),jo.forEach(o=>{let a=document.getElementById(o);a&&a.remove()});let e=document.getElementById("ankifx-styles");e&&e.remove(),document.documentElement.style.removeProperty("--afx-viewport-height"),document.documentElement.style.removeProperty("--afx-dock-height"),document.documentElement.classList.remove("afx-scroll-lock"),document.documentElement.classList.remove("afx-agreed"),Array.from(document.documentElement.classList).forEach(o=>{o.startsWith("afx-effect-")&&document.documentElement.classList.remove(o)}),window.AnkiFX_Config=null,F.observer&&(F.observer.disconnect(),F.observer=null),F.dockObserver&&(F.dockObserver.disconnect(),F.dockObserver=null),F._layoutHandler&&(window.removeEventListener("orientationchange",F._layoutHandler),window.removeEventListener("resize",F._layoutHandler),F._layoutHandler=null),F._resizeTimeout&&(clearTimeout(F._resizeTimeout),F._resizeTimeout=null),F._resizeInterval&&(clearInterval(F._resizeInterval),F._resizeInterval=null),F.currentEffectId=null,console.log("[AnkiFX] Destroyed.")}var xi="local";try{let i=typeof __ankifx_script_src=="string"?__ankifx_script_src:"";if(!i){let e=(new Error().stack||"").match(/(https?:\/\/[^\s)\n:]+|file:\/\/[^\s)\n:]+)/g);if(e&&e.length>0){for(let o=0;o<e.length;o++)if(e[o].includes("ankifx")){i=e[o];break}}}i&&(i.includes("cdn.jsdelivr.net")||i.includes("github")||i.includes("rawgit")||i.includes("githack")?xi="remote":xi="local")}catch{xi="detection-failed"}var sa="1.0.0-fe663dc+",ca="2026-06-03T18:15:51.716Z",fa=xi,je={init:aa,destroy:la,agree:na,injectCSS:Ho,handleResize:()=>qe(F),startEffect:(i,t,e,o)=>Mt(F,i,t,e,o),startMarqueeLoop:()=>Mi(F),renderEffectControls:Ft,setControlValue:fo,get version(){return sa},get buildDate(){return ca},get source(){return fa},get marquee(){return F.marquee},set marquee(i){F.marquee=i},get jukebox(){return F.jukebox},set jukebox(i){F.jukebox=i},get currentEffectId(){return F.currentEffectId},get defaultMarqueeText(){return F.defaultMarqueeText},get EFFECT_SONG_MAP(){return F.EFFECT_SONG_MAP}};window.AnkiFX_Eval_History=window.AnkiFX_Eval_History||[];var $o=window.AnkiFX&&window.AnkiFX.source==="remote"&&je.source==="local";window.AnkiFX_Eval_History.push({source:je.source,version:je.version,buildDate:je.buildDate,time:new Date().toLocaleTimeString(),status:$o?"ignored (late local)":"active"});$o?console.warn(`[AnkiFX Loader] Late local engine evaluation ignored. A remote engine (Version: ${window.AnkiFX.version}) is already active.`):window.AnkiFX=je;})();
