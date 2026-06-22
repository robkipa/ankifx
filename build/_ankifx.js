var __ankifx_script_src=(document.currentScript&&document.currentScript.src)||"";
(()=>{var Gt=[],Je=null,oo=60,ro=1.5,no={id:"aurora",name:"Aurora",run:Fr,stop:Tr,drawOverlay:Pr,onResize:(i,t,e)=>{let o=document.documentElement,r=o?getComputedStyle(o):null;if(dt=r&&parseInt(r.getPropertyValue("--io-header"))||0,Et=t-dt,Re=i/8,Oe=Et/8,Je){let a=oo/8,s=Math.ceil(Re/a),n=Math.ceil(Oe/(a*ro));Je.w=s,Je.h=n,Je.build()}if(Z){let a=e||window.devicePixelRatio||1;Z.width=Re*a,Z.height=Oe*a;let s=Z.getContext("2d");s&&(s.setTransform(1,0,0,1,0,0),s.scale(a,a)),Z.style.width=Re+"px",Z.style.height=Oe+"px",Z.style.position="absolute",Z.style.top=dt+"px",Z.style.left="0",Z.style.transform="scale(8)",Z.style.transformOrigin="top left"}},marqueeFont:{color:"#E0FFFF",shadowColor:"rgba(0,128,128,0.8)",shadowBlur:10}},kt=null,Re,Oe,Z=null,Ar=0,wt=0,ht={x:-1e3,y:-1e3},dt=0,Et=0,$t=class{constructor(t,e){this.x=t||0,this.y=e||0}setAngle(t){let e=this.getLength()||1;this.x=Math.cos(t)*e,this.y=Math.sin(t)*e}setLength(t){let e=Math.atan2(this.y,this.x);this.x=Math.cos(e)*t,this.y=Math.sin(e)*t}getLength(){return Math.sqrt(this.x*this.x+this.y*this.y)}addTo(t){this.x+=t.x,this.y+=t.y}},io=(()=>{let i=new Uint8Array(512),t=new Uint8Array(256).map(()=>Math.random()*256);for(let r=0;r<512;r++)i[r]=t[r&255];let e=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]];function o(r,a,s,n){return r[0]*a+r[1]*s+r[2]*n}return{simplex3:(r,a,s)=>{let n,l,u,h,c=.3333333333333333,d=1/6,m=(r+a+s)*c,p=Math.floor(r+m),f=Math.floor(a+m),g=Math.floor(s+m),w=(p+f+g)*d,_=r-p+w,j=a-f+w,R=s-g+w,P,v,k,E,x,y;_>=j?j>=R?(P=1,v=0,k=0,E=1,x=1,y=0):_>=R?(P=1,v=0,k=0,E=1,x=0,y=1):(P=0,v=0,k=1,E=1,x=0,y=1):j<R?(P=0,v=0,k=1,E=0,x=1,y=1):_<R?(P=0,v=1,k=0,E=0,x=1,y=1):(P=0,v=1,k=0,E=1,x=1,y=0);let M=_-P+d,T=j-v+d,A=R-k+d,O=_-E+2*d,C=j-x+2*d,I=R-y+2*d,B=_-1+3*d,z=j-1+3*d,D=R-1+3*d,F=p&255,X=f&255,J=g&255,$=.6-_*_-j*j-R*R;$<0?n=0:($*=$,n=$*$*o(e[i[F+i[X+i[J]]]%12],_,j,R));let re=.6-M*M-T*T-A*A;re<0?l=0:(re*=re,l=re*re*o(e[i[F+P+i[X+v+i[J+k]]]%12],M,T,A));let ne=.6-O*O-C*C-I*I;ne<0?u=0:(ne*=ne,u=ne*ne*o(e[i[F+E+i[X+x+i[J+y]]]%12],O,C,I));let Q=.6-B*B-z*z-D*D;return Q<0?h=0:(Q*=Q,h=Q*Q*o(e[i[F+1+i[X+1+i[J+1]]]%12],B,z,D)),32*(n+l+u+h)}}})(),Ri=class{constructor(t,e,o={}){this.settings={frequency:.1,...o},this.w=t,this.h=e,this.time=0,this.build()}build(){this.cols=Math.ceil(this.w),this.rows=Math.ceil(this.h),this.field=new Array(this.cols);for(let t=0;t<this.cols;t++){this.field[t]=new Array(this.rows);for(let e=0;e<this.rows;e++)this.field[t][e]=new $t(0,0)}}update(t){this.time+=t;let e=this.time*this.settings.frequency/1e3;for(let o=0;o<this.field.length;o++)for(let r=0;r<this.field[o].length;r++){let a=io.simplex3(o/20,r/20,e)*Math.PI*2,s=io.simplex3(o/10+4e4,r/10+4e4,e);this.field[o][r].setAngle(a),this.field[o][r].setLength(s),typeof this.manipulateVector=="function"&&this.manipulateVector(this.field[o][r],o,r),typeof this.onDraw=="function"&&this.onDraw(this.field[o][r],o,r)}}};function Cr(){Gt=[];let i=150;for(let t=0;t<i;t++)Gt.push({x:Math.random(),y:Math.random(),size:.5+Math.random()*1.3,opacity:.15+Math.random()*.75,blinkSpeed:.001+Math.random()*.002,blinkOffset:Math.random()*Math.PI*2})}function pt(i){i.touches&&i.touches[0]?(ht.x=i.touches[0].clientX,ht.y=i.touches[0].clientY):(ht.x=i.clientX,ht.y=i.clientY)}function Fr(i,t){let e=i.ctx2d;Z=i.canvas2D,Z.classList.add("afx-aurora-active"),dt=i.topInset||0,Et=i.visibleHeight||i.height,Re=i.width/8,Oe=Et/8,Z.width=Re*i.dpr,Z.height=Oe*i.dpr,e.setTransform(1,0,0,1,0,0),e.scale(i.dpr,i.dpr),Z.style.width=Re+"px",Z.style.height=Oe+"px",Z.style.position="absolute",Z.style.top=dt+"px",Z.style.left="0",Z.style.transform="scale(8)",Z.style.transformOrigin="top left",Cr();let o=oo/8,r=Math.ceil(Re/o),a=Math.ceil(Oe/(o*ro));Je=new Ri(r,a,{frequency:.1});let s={x:Re/r,y:Oe/a},n=255/a;Je.onDraw=(u,h,c)=>{let d=u.getLength()*Math.abs(u.x),m=u.getLength()*Math.abs(u.y),p=Math.round(-20*d+80*m+(50-.6*c*n)),f=Math.round(180*d+20*m-60+.4*c*n),g=Math.round(50*d+30*m+(40-.5*c*n)+.5*c*n);e.fillStyle=`rgba(${p}, ${f}, ${g}, 0.8)`,e.fillRect(h*s.x,c*s.y,s.x+.5,s.y+.5)},Je.manipulateVector=(u,h,c)=>{let d={x:h*s.x+.5*s.x,y:c*s.y+.5*s.y},m=ht.x/8,p=ht.y/8,f=new $t((m-d.x)/Re,(p-d.y)/Oe);u.addTo(f),u.getLength()>1&&u.setLength(1)},Ar=0,wt=0,window.addEventListener("mousemove",pt),window.addEventListener("touchstart",pt),window.addEventListener("touchmove",pt);function l(u){wt||(wt=u);let h=u-wt;wt=u,e.fillStyle="#020b1a",e.fillRect(0,0,Re,Oe),Je.update(h),kt=requestAnimationFrame(l)}kt=requestAnimationFrame(l)}function Pr(i,t,e,o){let r=dt,a=Et||e;i.fillStyle="#ffffff",Gt.forEach(s=>{let n=(Math.sin(o*s.blinkSpeed+s.blinkOffset)+1)/2;i.globalAlpha=s.opacity*n,i.beginPath();let l=r+s.y*a;i.arc(s.x*t,l,s.size,0,Math.PI*2),i.fill()}),i.globalAlpha=1}function Tr(){kt&&(cancelAnimationFrame(kt),kt=null),window.removeEventListener("mousemove",pt),window.removeEventListener("touchstart",pt),window.removeEventListener("touchmove",pt),Z&&(Z.classList.remove("afx-aurora-active"),Z.style.cssText="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;",Z=null),Gt=[],Je=null;let i=window.AnkiFX;i&&typeof i.handleResize=="function"&&i.handleResize()}function ao(){return/iPad|iPhone|iPod/.test(navigator.userAgent)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1}function Oi(){return Math.min(window.devicePixelRatio||1,1.5)}function Vt(){return Math.min(window.devicePixelRatio||1,2)}function Wt(i,t){let e=Oi();return i==="mandelbrot"||i==="julia"?e:t}function He(){let i=document.documentElement,t=i?getComputedStyle(i):null;return{ioHeader:t&&parseInt(t.getPropertyValue("--io-header"))||0,topInset:t&&parseInt(t.getPropertyValue("--top-inset"))||0,bottomInset:t&&parseInt(t.getPropertyValue("--bottom-inset"))||0}}function mt(){return localStorage.getItem("ankifx_marquee_enabled")!=="false"}function so(){return localStorage.getItem("ankifx_card_enabled")!=="false"}function gt(){return(window.innerWidth||document.documentElement.clientWidth||800)<480}function Ze(i){return i&&!i.classList.contains("tappable")&&i.classList.add("tappable"),i}function lo(i){return i?!!i.closest(".tappable, button, input, select, textarea, a, summary, video, audio"):!1}var Yt=null,St,Kt,Se=null,Mr=200,fo=[];try{let i=sessionStorage.getItem("ankifx_captured_logs");i&&(fo=JSON.parse(i))}catch{}window.AnkiFX_Captured_Logs=window.AnkiFX_Captured_Logs||fo;var co=null,_t="all",ke={ioHeaderHeight:null,topInset:null,bottomInset:null,viewportHeight:null,visibleHeight:0,isLandscape:!1};function uo(){let i=document.documentElement,t=i?getComputedStyle(i):null,e=(r,a)=>{if(!r)return null;let s=r.getPropertyValue(a);if(!s||s.trim()==="")return null;let n=parseInt(s,10);return isNaN(n)?null:n};ke.ioHeaderHeight=e(t,"--io-header"),ke.topInset=e(t,"--top-inset"),ke.bottomInset=e(t,"--bottom-inset");let o=document.getElementById("ankifx-background");ke.viewportHeight=o?Math.round(o.getBoundingClientRect().height):null,ke.isLandscape=window.innerWidth>window.innerHeight,ke.visibleHeight=(i?i.clientHeight:window.innerHeight)+(ke.ioHeaderHeight||0)}var Xe=(i,t)=>{let e=t.map(o=>{if(o===null)return"null";if(o===void 0)return"undefined";if(typeof o=="object")try{return JSON.stringify(o)}catch{return String(o)}return String(o)}).join(" ");window.AnkiFX_Captured_Logs.push({type:i,message:e,timestamp:new Date().toLocaleTimeString()}),window.AnkiFX_Captured_Logs.length>Mr&&window.AnkiFX_Captured_Logs.shift();try{sessionStorage.setItem("ankifx_captured_logs",JSON.stringify(window.AnkiFX_Captured_Logs))}catch{}co&&co()};if(typeof window<"u"&&!window.__console_intercepted__){let i=console.log&&console.log.bind(console)||(()=>{}),t=console.warn&&console.warn.bind(console)||(()=>{}),e=console.error&&console.error.bind(console)||(()=>{}),o=console.info&&console.info.bind(console)||(()=>{}),r=console.debug&&console.debug.bind(console)||(()=>{});console.log=(...a)=>{i(...a),Xe("log",a)},console.warn=(...a)=>{t(...a),Xe("warn",a)},console.error=(...a)=>{e(...a),Xe("error",a)},console.info=(...a)=>{o(...a),Xe("info",a)},console.debug=(...a)=>{r(...a),Xe("debug",a)},window.addEventListener("error",a=>{let s=a.message;if(a.error){let n=a.error.name||"Error",l=a.error.message||a.message||"",u=a.error.stack||"";u&&!u.includes(l)?s=`${n}: ${l}
${u}`:s=u||`${n}: ${l}`}Xe("error",[s])}),window.addEventListener("unhandledrejection",a=>{Xe("error",[`Unhandled Promise Rejection: ${a.reason}`])}),window.__console_intercepted__=!0}var ho={id:"debug",name:"DEBUG",run:Ir,stop:Lr,onResize:(i,t)=>{St=i,Kt=t,uo()},marqueeFont:{color:"#00ff00",shadowColor:"rgba(0,0,0,0.8)",shadowBlur:5},controls:[{type:"button",id:"copy-logs-btn",label:"\u{1F4CB} COPY LOGS",onClick:()=>{Dr()}},{type:"button",id:"clear-storage-btn",label:"\u{1F9F9} CLEAR STORAGE",onClick:()=>{if(confirm("Clear ALL AnkiFX local storage?")){localStorage.clear();try{sessionStorage.removeItem("ankifx_captured_logs"),sessionStorage.removeItem("ankifx_loader_logs"),sessionStorage.removeItem("ankifx_eval_history")}catch{}location.reload()}}}]};function Ir(i,t){Se&&(Se.remove(),Se=null);let e=i.dpr||1;St=i.width,Kt=i.height,uo(),Se=document.createElement("div"),Se.className="afx-debug-container",Ze(Se);let o=document.createElement("div");o.className="afx-debug-columns",Se.appendChild(o);let r=document.createElement("div");r.className="afx-debug-left-col",o.appendChild(r);let a=document.createElement("div");a.className="afx-debug-right-col",o.appendChild(a);let s=document.createElement("div");s.className="afx-debug-panel diagnostics",s.innerHTML="<h3>AnkiFX Version</h3>";let n=document.createElement("div");n.className="afx-debug-content",s.appendChild(n),r.appendChild(s);let l=document.createElement("div");l.className="afx-debug-panel viewport-info",l.innerHTML="<h3>Viewport & Layout</h3>";let u=document.createElement("pre");u.className="afx-debug-content",l.appendChild(u),r.appendChild(l);let h=document.createElement("div");h.className="afx-debug-panel logs",h.innerHTML="<h3>Chronological Loader Logs</h3>";let c=document.createElement("div");c.className="afx-debug-content",h.appendChild(c),a.appendChild(h);let d=document.createElement("div");d.className="afx-debug-panel localstorage-viewer",d.innerHTML="<h3>LocalStorage</h3>";let m=document.createElement("div");m.className="afx-debug-content",d.appendChild(m),a.appendChild(d);let p=document.createElement("div");p.className="afx-debug-panel console-logs",p.innerHTML=`
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
    `,Se.appendChild(p);let f=document.createElement("div");f.style.height="calc(var(--bottom-inset, 0px) + var(--afx-dock-height, 0px) + 20px)",f.style.flexShrink="0",f.style.pointerEvents="none",Se.appendChild(f);let g=p.querySelectorAll(".afx-console-filter-btn");g.forEach(F=>{F.addEventListener("click",X=>{g.forEach(J=>{J.classList.remove("active"),J.style.background="rgba(255,255,255,0.05)",J.style.borderColor="transparent",J.style.color="#888"}),F.classList.add("active"),F.style.background="rgba(255,255,255,0.15)",F.style.borderColor="rgba(255,255,255,0.25)",F.style.color="#fff",_t=F.getAttribute("data-filter")})});let w=p.querySelector("#afx-clear-console-btn");w&&w.addEventListener("click",F=>{window.AnkiFX_Captured_Logs.length=0;try{sessionStorage.removeItem("ankifx_captured_logs")}catch{}});let _=p.querySelector("#afx-console-input"),j=p.querySelector("#afx-console-exec-btn"),R=()=>{if(!_)return;let F=_.value.trim();if(F){Xe("log",[`> ${F}`]);try{let X=(0,eval)(F);Xe("info",["=>",X])}catch(X){Xe("error",[X.stack||X.message||X])}_.value="",_.focus()}};j&&_&&(["keydown","keyup","keypress"].forEach(F=>{_.addEventListener(F,X=>{X.stopPropagation()})}),_.addEventListener("keydown",F=>{F.key==="Enter"&&(F.preventDefault(),R())}),j.addEventListener("click",F=>{R()})),(document.getElementById("ankifx-overlay")||document.body).appendChild(Se);let v=document.getElementById("ankifx-background")||document.body,k={topLeft:document.createElement("div"),topRight:document.createElement("div"),bottomLeft:document.createElement("div"),bottomRight:document.createElement("div")};k.topLeft.className="afx-debug-corner top-left",k.topRight.className="afx-debug-corner top-right",k.bottomLeft.className="afx-debug-corner bottom-left",k.bottomRight.className="afx-debug-corner bottom-right",k.bottomLeft.style.bottom="auto",k.bottomRight.style.bottom="auto",Object.values(k).forEach(F=>v.appendChild(F));let E=document.createElement("div");E.className="afx-debug-line visible-bottom";let x=document.createElement("span");x.className="afx-debug-line-label",x.textContent="--- VISIBLE DOCUMENT BOTTOM ---",E.appendChild(x),v.appendChild(E);let y=0,M=0,T=0,A="",O="",C="",I="",B="",z="";function D(F){F===void 0&&(F=performance.now()),y||(y=F),M++,F-y>=1e3&&(T=M,M=0,y=F);let X=i.ctx2d;X.clearRect(0,0,St,Kt),X.fillStyle="#050508",X.fillRect(0,0,St,Kt);let J=ke.visibleHeight,$=U=>U!==null?`${U}px`:"N/A",re=$(ke.ioHeaderHeight),ne=$(ke.topInset),Q=$(ke.bottomInset),ue=$(ke.viewportHeight),_e=ke.ioHeaderHeight||0,Ke=[`window:               ${window.innerWidth}x${window.innerHeight}`,`screen:               ${screen.width}x${screen.height}`,`doc:                  ${document.documentElement.clientWidth}x${document.documentElement.clientHeight}`,`orient:               ${window.orientation||"N/A"}`,`dpr (native|engine):  (${window.devicePixelRatio}|${e})`,`--io-header:          ${re}`,`--top-inset:          ${ne}`,`--bottom-inset:       ${Q}`,`--afx-viewport-height: calc(100dvh + ${_e}px) = ${ue}`,`isLandscape:          ${ke.isLandscape}`].join(`
`);Ke!==A&&(u.textContent=Ke,A=Ke);let Ne=window.AnkiFX_Eval_History||[],S=JSON.stringify(Ne),L=[`Version:  ${window.AnkiFX?.version||"1.0.0-dev"}`,`Source:   ${window.AnkiFX?.source||"unknown"}`,`Built:    ${window.AnkiFX?.buildDate||"development"}`].join(`
`),V=L+"_"+S;if(V!==O){n.innerHTML="";let U=document.createElement("pre");U.style.margin="0 0 10px 0",U.style.fontFamily="inherit",U.style.fontSize="inherit",U.textContent=L,n.appendChild(U);let N=document.createElement("div");N.style.borderTop="1px dashed rgba(255,255,255,0.15)",N.style.margin="10px 0",n.appendChild(N);let te=document.createElement("div");te.textContent="EVALUATION HISTORY:",te.style.fontWeight="bold",te.style.color="#00ffff",te.style.marginBottom="6px",te.style.fontSize="11px",n.appendChild(te);let ae=document.createElement("div");if(Ne.length===0){let Y=document.createElement("div");Y.textContent="(No evaluation history captured)",Y.style.color="#888",Y.style.fontStyle="italic",ae.appendChild(Y)}else Ne.slice(-3).forEach((Y,je)=>{let W=document.createElement("div");W.textContent=`[${je+1}] ${Y.source} (${Y.version}) @ ${Y.time} - ${Y.status}`,W.style.color=Y.status==="active"?"#55ff55":"#ffaa55",W.style.fontSize="11px",ae.appendChild(W)});n.appendChild(ae),O=V}let H=window.AnkiFX_Loader_Logs||[],oe=JSON.stringify(H);if(oe!==C){if(c.innerHTML="",H.length===0){let U=document.createElement("div");U.textContent="(No logs captured by template loader)",U.style.color="#888",U.style.fontStyle="italic",c.appendChild(U)}else{let U={success:{color:"#55ff55",badge:"\u2713"},error:{color:"#ff5555",badge:"\u2717"},warn:{color:"#ffaa55",badge:"!"},pending:{color:"#888888",badge:"\u2026"},info:{color:"#dddddd",badge:"\xB7"}};H.forEach((N,te)=>{let ae=N&&typeof N=="object",Y=ae?N.msg:String(N),je=U[ae?N.level:"info"]||U.info,W=document.createElement("div");W.style.cssText="display: flex; gap: 6px; align-items: baseline; font-size: 11px; margin-bottom: 3px; padding-bottom: 2px; border-bottom: 1px solid rgba(255,255,255,0.04);";let se=document.createElement("span");se.textContent=`[${String(te+1).padStart(2,"0")}]`,se.style.cssText="color: #555; flex-shrink: 0; font-size: 10px;";let me=document.createElement("span");me.textContent=je.badge,me.style.cssText=`color: ${je.color}; flex-shrink: 0; font-weight: bold; width: 10px;`;let ge=document.createElement("span");ge.textContent=Y,ge.style.cssText=`color: ${je.color}; word-break: break-word;`,W.appendChild(se),W.appendChild(me),W.appendChild(ge),c.appendChild(W)})}C=oe}let ye={};for(let U=0;U<localStorage.length;U++){let N=localStorage.key(U);ye[N]=localStorage.getItem(N)}let Te=JSON.stringify(ye);if(Te!==z){m.innerHTML="";let U=Object.keys(ye).sort();if(U.length===0){let N=document.createElement("div");N.textContent="(LocalStorage is empty)",N.style.color="#888",N.style.fontStyle="italic",N.style.fontSize="11px",m.appendChild(N)}else U.forEach(N=>{let te=document.createElement("div");te.style.cssText="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 2px;";let ae=document.createElement("span");ae.textContent=N,ae.style.color="#ffaa55",ae.style.wordBreak="break-all",ae.style.marginRight="8px";let Y=document.createElement("span");Y.textContent=ye[N],Y.style.color="#00ffff",Y.style.wordBreak="break-all",Y.style.textAlign="right",te.appendChild(ae),te.appendChild(Y),m.appendChild(te)});z=Te}let Le=window.AnkiFX_Captured_Logs.filter(U=>_t==="all"?!0:U.type===_t),De=_t+"_"+JSON.stringify(Le);if(De!==B){let U=document.getElementById("afx-console-log-list");if(U)if(U.innerHTML="",Le.length===0){let N=document.createElement("div");N.textContent=`(No logs in category: ${_t})`,N.style.color="#888",N.style.fontStyle="italic",N.style.fontSize="11px",U.appendChild(N)}else Le.forEach(N=>{let te=document.createElement("div");te.style.marginBottom="4px",te.style.fontSize="11px",te.style.borderBottom="1px solid rgba(255,255,255,0.03)",te.style.paddingBottom="2px";let ae=document.createElement("span");ae.textContent=`[${N.timestamp}] `,ae.style.color="#888",te.appendChild(ae);let Y=document.createElement("span");Y.textContent=N.message,N.type==="error"?Y.style.color="#ff5555":N.type==="warn"?Y.style.color="#ffaa55":N.type==="info"||N.type==="debug"?Y.style.color="#00ffff":Y.style.color="#ffffff",te.appendChild(Y),U.appendChild(te)}),U.scrollTop=U.scrollHeight;B=De}let Me=Math.round(St),we=Math.round(J),qe=`${Me}x${we}`;qe!==I&&(k.topLeft.textContent="(0,0)",k.topRight.textContent=`(${Me},0)`,k.bottomLeft.textContent=`(0,${we})`,k.bottomRight.textContent=`(${Me},${we})`,k.bottomLeft.style.top=`${we-18}px`,k.bottomRight.style.top=`${we-18}px`,I=qe),E.style.top=`${J}px`,Yt=requestAnimationFrame(D)}D()}function Lr(){Yt&&(cancelAnimationFrame(Yt),Yt=null),Se&&(Se.remove(),Se=null),document.querySelectorAll(".afx-debug-corner, .afx-debug-line").forEach(i=>i.remove())}function Dr(){let i=document.querySelector(".afx-debug-container");if(!i)return;let t=`=== ANKIFX DEBUG LOGS ===

`;i.querySelectorAll(".afx-debug-panel").forEach(r=>{let a=r.querySelector("h3")?.textContent||"",s=r.querySelector(".afx-debug-content");s&&(t+=`--- ${a.toUpperCase()} ---
`,t+=s.innerText||s.textContent||"",t+=`

`)}),(()=>{try{let r=document.createElement("textarea");r.value=t.trim(),r.style.position="fixed",r.style.top="0",r.style.left="0",r.style.opacity="0",r.style.pointerEvents="none",document.body.appendChild(r),r.focus(),r.select();let a=document.execCommand("copy");if(document.body.removeChild(r),a)return Promise.resolve()}catch{}return navigator.clipboard&&typeof navigator.clipboard.writeText=="function"?navigator.clipboard.writeText(t.trim()):Promise.reject(new Error("No copy method succeeded or is available"))})().then(()=>{let r=document.getElementById("afx-control-copy-logs-btn");if(r){let a=r.textContent;r.textContent="\u2705 COPIED!",setTimeout(()=>{r.textContent=a},1500)}}).catch(r=>{let a=document.getElementById("afx-control-copy-logs-btn");if(a){let s=a.textContent;a.textContent="\u274C ERROR",setTimeout(()=>{a.textContent=s},1500)}})}var At=null,le,Ge,Be={id:"ecg",name:"ECG Monitor",run:Rr,stop:Or,onResize:(i,t)=>{le=i,Ge=t},marqueeFont:{color:"#FF1A1A",shadowColor:"#CC0000",shadowBlur:15}};function Rr(i,t){let e=i.ctx2d;le=i.width,Ge=i.height;let o=document.getElementById("afx-top-group-right"),r=document.getElementById("afx-ecg-panel");!r&&o&&(r=document.createElement("div"),r.id="afx-ecg-panel",o.insertBefore(r,o.firstChild)),r&&!r.querySelector(".afx-ecg-bpm-val")&&(r.innerHTML=`
            <div class="afx-ecg-bpm">\u2665 <span class="afx-ecg-bpm-val">--</span> BPM</div>
            <div class="afx-ecg-rhythm">--</div>
        `);let a=r?r.querySelector(".afx-ecg-bpm-val"):null,s=r?r.querySelector(".afx-ecg-rhythm"):null,n=localStorage.getItem("ankifx_ecg_rhythm")||"sinus";Be.controls=[{type:"button",id:"ecg-trigger",label:n==="sinus"?"\u26A1 TRIGGER ARRHYTHMIA":"\u{1F49A} RESTORE SINUS",onClick:()=>{let S=localStorage.getItem("ankifx_ecg_rhythm")||"sinus",L;if(S==="sinus"){let V=["first_degree","mobitz_1","mobitz_2","third_degree","st_elevation","afib","a_flutter","torsades"];L=V[Math.floor(Math.random()*V.length)]}else L="sinus";localStorage.setItem("ankifx_ecg_rhythm",L),localStorage.setItem("ankifx_ecg_trigger_time",Date.now())}}];let l=200,u=40,h=120,c=25,d=5,m=new Float32Array(4096),p=0,f=0,g=0,w=0,_=0,j=0,R=0,P=100,v=.6,k=72,E=0,x="sinus",y=25+Math.random()*15,M=0,T=["first_degree","mobitz_1","mobitz_2","third_degree","st_elevation","afib","a_flutter","torsades"],A=0;function O(){p<le&&(p=le)}let C=(S,L,V,H)=>H*Math.exp(-((S-L)**2)/(2*V**2));function I(S){return C(S,.15,.03,.12)}function B(S){return C(S,.03,.03,.12)}function z(S,L){let V=L%4;return V===0?C(S,.17,.03,.12):V===1?C(S,.1,.03,.12):V===2?C(S,.03,.03,.12):C(S,.15,.03,.12)}function D(S){return C(S,.08,.03,.12)}function F(S){return .035*Math.sin(S*Math.PI*40)+.015*Math.sin(S*Math.PI*96)+.008*Math.sin(S*Math.PI*176)}function X(S){return .085*(S*4%1-.5)}function J(S,L){let V=Math.sin(S*Math.PI*2)*.58+Math.sin(S*Math.PI*4)*.16,H=Math.sin(L*1.2);return V*H}function $(S,L=!1){let V=0;return V+=C(S,.33,.008,-.08),V+=C(S,.36,.012,1),V+=C(S,.39,.008,-.12),L&&(V+=C(S,.46,.07,.38)),V+=C(S,.56,.04,.22),V}function re(S,L,V){let H=S%1,oe=Math.floor(S);return L==="sinus"?I(H)+$(H,!1):L==="first_degree"?B(H)+$(H,!1):L==="mobitz_1"?oe%4===3?z(H,oe):z(H,oe)+$(H,!1):L==="mobitz_2"?oe%3===2?D(H):D(H)+$(H,!1):L==="st_elevation"?I(H)+$(H,!0):L==="afib"?F(H)+$(H,!1):L==="a_flutter"?X(H)+$(H,!1):L==="torsades"?J(H,V):0}function ne(S,L){let V=S%1,H=L%1,oe=C(V,.15,.03,.12),ye=C(H,.33,.008,-.08)+C(H,.36,.012,1)+C(H,.39,.008,-.12)+C(H,.56,.04,.22);return oe+ye}function Q(){e.strokeStyle="rgba(60, 0, 0, 0.15)",e.lineWidth=.5,e.beginPath();for(let S=0;S<le;S+=d)e.moveTo(S,0),e.lineTo(S,Ge);for(let S=0;S<Ge;S+=d)e.moveTo(0,S),e.lineTo(le,S);e.stroke(),e.strokeStyle="rgba(80, 0, 0, 0.3)",e.lineWidth=1,e.beginPath();for(let S=0;S<le;S+=c)e.moveTo(S,0),e.lineTo(S,Ge);for(let S=0;S<Ge;S+=c)e.moveTo(0,S),e.lineTo(le,S);e.stroke()}let ue=-1,_e="";function Ke(){if(!r)return;let S=.5+E*.5;r.style.opacity=S;let L="SINUS RHYTHM";x==="first_degree"?L="1\xB0 AV BLOCK":x==="mobitz_1"?L="2\xB0 AV (MOBITZ 1)":x==="mobitz_2"?L="2\xB0 AV (MOBITZ 2)":x==="third_degree"?L="3\xB0 AV BLOCK":x==="st_elevation"?L="ST ELEVATION":x==="afib"?L="ATRIAL FIBRILLATION":x==="a_flutter"?L="ATRIAL FLUTTER":x==="torsades"&&(L="TORSADES DE POINTES"),a&&k!==ue&&(a.textContent=k,ue=k),s&&L!==_e&&(s.textContent=L,_e=L)}function Ne(S){w||(w=S);let L=Math.min((S-w)/1e3,.05);w=S,g+=L,O();let V=localStorage.getItem("ankifx_ecg_rhythm")||"sinus",H=parseInt(localStorage.getItem("ankifx_ecg_trigger_time")||"0");if(H>M){if(M=H,x=V,y=g+25+Math.random()*15,x!=="sinus"){let W=T.indexOf(x);W!==-1&&(A=(W+1)%T.length)}x==="afib"&&(P=70+Math.floor(Math.random()*60),v=60/P),Be.controls&&Be.controls[0]&&(Be.controls[0].label=x==="sinus"?"\u26A1 TRIGGER ARRHYTHMIA":"\u{1F49A} RESTORE SINUS",AnkiFX.renderEffectControls(Be))}g>=y&&(x==="sinus"?(x=T[A],A=(A+1)%T.length):x="sinus",localStorage.setItem("ankifx_ecg_rhythm",x),y=g+25+Math.random()*15,x==="afib"&&(P=70+Math.floor(Math.random()*60),v=60/P),Be.controls&&Be.controls[0]&&(Be.controls[0].label=x==="sinus"?"\u26A1 TRIGGER ARRHYTHMIA":"\u{1F49A} RESTORE SINUS",AnkiFX.renderEffectControls(Be)));let oe=72;x==="third_degree"?oe=35:x==="mobitz_1"||x==="mobitz_2"?oe=68:x==="afib"?oe=P:x==="a_flutter"?oe=75:x==="torsades"&&(oe=220);let ye=x==="afib"?v:60/oe,Te=_,Le=j,De=R;if(x==="third_degree"?(j+=L/(60/88),R+=L/(60/oe)):_+=L/ye,x!=="third_degree"){let W=Math.floor(Te);Math.floor(_)>W&&x==="afib"&&(P=70+Math.floor(Math.random()*65),v=60/P)}if(x==="third_degree")Math.floor(De-.36)<Math.floor(R-.36)&&(E=1,k=oe+Math.floor(Math.random()*3)-1);else if(Math.floor(Te-.36)<Math.floor(_-.36)){let W=Math.floor(_-.36),se=!1;x==="mobitz_1"?se=W%4===3:x==="mobitz_2"&&(se=W%3===2),se||(E=1,k=Math.floor(oe),x!=="torsades"&&x!=="a_flutter"&&(k+=Math.floor(Math.random()*5)-2))}E=Math.max(0,E-L*4);let Me=l*L,we=f+Me,qe=Math.floor(f),U=Math.floor(we);for(let W=qe;W<=U;W++){let se=W%le,me=(W-f)/Me;if(x==="third_degree"){let ge=Le+(j-Le)*me,jt=De+(R-De)*me;m[se]=ne(ge,jt)}else{let ge=Te+(_-Te)*me;m[se]=re(ge,x,g)}}f=we,f>=le&&(f-=le),e.fillStyle="#000000",e.fillRect(0,0,le,Ge),Q();let N=Ge*.55,te=Ge*.35,ae=Math.floor(f)%le,Y=4;e.save(),e.lineCap="round",e.lineJoin="round";for(let W=0;W<3;W++){W===0?(e.lineWidth=15,e.strokeStyle="rgb(200, 0, 0)"):W===1?(e.lineWidth=7,e.strokeStyle="rgb(255, 15, 15)"):(e.lineWidth=2.4,e.strokeStyle="rgb(255, 175, 175)");for(let se=0;se<le;se+=Y){let me=ae-se;if(me<0&&(me+=le),me>le-u)continue;let ge=1,jt=le-u-h;if(me>jt&&(ge=1-(me-jt)/h,ge=Math.max(0,ge)),ge<=0)continue;let Ht=0;me<12&&(Ht=1-me/12),W===0?e.globalAlpha=ge*(.07+Ht*.13):W===1?e.globalAlpha=ge*(.28+Ht*.32):e.globalAlpha=ge*(.85+Ht*.15),e.beginPath();let _r=N-m[se]*te;e.moveTo(se,_r);let Xt=Math.min(se+Y,le);for(let ut=se+1;ut<Xt;ut++){let Sr=N-m[ut]*te;e.lineTo(ut,Sr)}if(Xt<le){let ut=N-m[Xt]*te;e.lineTo(Xt,ut)}e.stroke()}}e.globalAlpha=1,e.restore(),e.save();let je=e.createLinearGradient(ae-3,0,ae+3,0);je.addColorStop(0,"rgba(255, 0, 0, 0)"),je.addColorStop(.5,"rgba(255, 50, 50, 0.4)"),je.addColorStop(1,"rgba(255, 0, 0, 0)"),e.fillStyle=je,e.fillRect(ae-3,0,6,Ge),e.restore(),Ke(),At=requestAnimationFrame(Ne)}At=requestAnimationFrame(Ne)}function Or(){At&&(cancelAnimationFrame(At),At=null);let i=document.getElementById("afx-ecg-panel");i&&i.remove()}var Ct=null,Bi,zi,po={id:"fire",name:"Doom Fire",run:zr,stop:Ur,onResize:(i,t)=>{Bi=i,zi=t},preferredTrack:{title:"Doom 3 BFG Edition",trackTitle:"DOOM E1M1"},marqueeFont:{color:"#ffffff",shadowColor:"rgba(0,0,0,0.8)",shadowBlur:5}},Br=[[7,7,7],[31,7,7],[47,15,7],[71,15,7],[87,23,7],[103,31,7],[119,31,7],[143,39,7],[159,47,7],[175,63,7],[191,71,7],[199,71,7],[223,79,7],[223,87,7],[223,87,7],[215,95,7],[215,95,7],[215,103,15],[207,111,15],[207,119,15],[207,127,15],[207,135,23],[199,135,23],[199,143,23],[199,151,31],[191,159,31],[191,159,31],[191,167,39],[191,167,39],[191,175,47],[183,175,47],[183,183,47],[183,183,55],[207,207,111],[223,223,159],[239,239,199],[255,255,255]];function zr(i,t){let e=i.ctx2d;Bi=i.width,zi=i.height;let o=320,r=168,a=new Uint8Array(o*r),s=e.createImageData(o,r),n=s.data,l=document.createElement("canvas");l.width=o,l.height=r;let u=l.getContext("2d");function h(){a.fill(0);for(let f=0;f<o;f++)a[(r-1)*o+f]=36}function c(f){let g=a[f];if(g===0)a[f-o]=0;else{let w=Math.floor(Math.random()*3),_=f-w+1;a[_-o]=g-(w&1)}}function d(){for(let f=0;f<o;f++)for(let g=1;g<r;g++)c(g*o+f)}function m(){for(let f=0;f<a.length;f++){let g=a[f],w=Br[g],_=f*4;n[_]=w[0],n[_+1]=w[1],n[_+2]=w[2],n[_+3]=255}}h();function p(){d(),m(),u.putImageData(s,0,0),e.save(),e.imageSmoothingEnabled=!1,e.drawImage(l,0,0,Bi,zi),e.restore(),Ct=requestAnimationFrame(p)}Ct=requestAnimationFrame(p)}function Ur(){Ct&&(cancelAnimationFrame(Ct),Ct=null)}var Tt=null,Ft,Pt,mo={id:"geometry",name:"Geometry",run:Nr,stop:qr,onResize:(i,t)=>{Ft=i,Pt=t},marqueeFont:{colorFn:(i,t)=>`hsl(${(i*120+t*4)%360}, 100%, 55%)`,shadowColor:"inherit",shadowBlur:15}};function Nr(i,t){let e=i.ctx2d;Ft=i.width,Pt=i.height;let o=0;function r(){o+=.012,e.globalCompositeOperation="source-over",e.fillStyle="rgba(2, 2, 5, 0.3)",e.fillRect(0,0,Ft,Pt),e.globalCompositeOperation="lighter";let a=Ft/2,s=Pt/2,n=Math.max(Ft,Pt)*.85;for(let l=0;l<35;l++){let u=o+l*.05,h=(Math.sin(u*.8)*.5+.5)*n+l*12;e.save(),e.translate(a,s),e.rotate(Math.sin(o*.3)*Math.PI+l*.06),e.scale(Math.sin(o*.5+l*.1)*.4+.8,Math.cos(o*.4+l*.1)*.4+.8),e.beginPath();for(let d=0;d<=8;d++){let m=d/8*Math.PI*2,p=Math.cos(m)*h,f=Math.sin(m)*h;d===0?e.moveTo(p,f):e.lineTo(p,f)}let c=(o*50+l*10)%360;e.strokeStyle=`hsla(${c}, 95%, 65%, 0.6)`,e.lineWidth=4,e.stroke(),e.restore()}e.globalCompositeOperation="source-over",Tt=requestAnimationFrame(r)}Tt=requestAnimationFrame(r)}function qr(){Tt&&(cancelAnimationFrame(Tt),Tt=null)}var Jt=null;function bo(i){Jt=i}var jr=["#c3e4ff","#6ec3f4","#eae2ff","#b9beff"];function go(i){return[(i>>16&255)/255,(i>>8&255)/255,(255&i)/255]}var Qt=class{constructor(t,e,o,r){let a=this;a.canvas=t,a.gl=e,a.meshes=[],a.debug=()=>{};let s=a.gl;Object.defineProperties(a,{Material:{enumerable:!1,value:class{constructor(l,u,h={}){let c=this;function d(f,g){let w=s.createShader(f);return s.shaderSource(w,g),s.compileShader(w),s.getShaderParameter(w,s.COMPILE_STATUS)||console.error("[Gradient/WebGL] Shader compile error:",s.getShaderInfoLog(w)),w}function m(f,g){return Object.entries(f).map(([w,_])=>_.getDeclaration(w,g)).join(`
`)}c.uniforms=h,c.uniformInstances=[];let p=`
              precision highp float;
            `;c.vertexSource=`
              ${p}
              attribute vec4 position;
              attribute vec2 uv;
              attribute vec2 uvNorm;
              ${m(a.commonUniforms,"vertex")}
              ${m(h,"vertex")}
              ${l}
            `,c.Source=`
              ${p}
              ${m(a.commonUniforms,"fragment")}
              ${m(h,"fragment")}
              ${u}
            `,c.vertexShader=d(s.VERTEX_SHADER,c.vertexSource),c.fragmentShader=d(s.FRAGMENT_SHADER,c.Source),c.program=s.createProgram(),s.attachShader(c.program,c.vertexShader),s.attachShader(c.program,c.fragmentShader),s.linkProgram(c.program),c.vertexShader&&(s.detachShader(c.program,c.vertexShader),s.deleteShader(c.vertexShader)),c.fragmentShader&&(s.detachShader(c.program,c.fragmentShader),s.deleteShader(c.fragmentShader)),s.getProgramParameter(c.program,s.LINK_STATUS)||console.error("[Gradient/WebGL] Program link error:",s.getProgramInfoLog(c.program)),s.useProgram(c.program),c.attachUniforms(void 0,a.commonUniforms),c.attachUniforms(void 0,c.uniforms)}attachUniforms(l,u){let h=this;l===void 0?Object.entries(u).forEach(([c,d])=>{h.attachUniforms(c,d)}):u.type==="array"?u.value.forEach((c,d)=>h.attachUniforms(`${l}[${d}]`,c)):u.type==="struct"?Object.entries(u.value).forEach(([c,d])=>h.attachUniforms(`${l}.${c}`,d)):h.uniformInstances.push({uniform:u,location:s.getUniformLocation(h.program,l)})}}},Uniform:{enumerable:!1,value:class{constructor(l){this.type="float",Object.assign(this,l),this.typeFn={float:"1f",int:"1i",vec2:"2fv",vec3:"3fv",vec4:"4fv",mat4:"Matrix4fv"}[this.type]||"1f",this.update()}update(l){this.value!==void 0&&s[`uniform${this.typeFn}`](l,this.typeFn.substring(0,6)==="Matrix"?this.transpose:this.value,this.typeFn.substring(0,6)==="Matrix"?this.value:null)}getDeclaration(l,u,h){let c=this;if(c.excludeFrom!==u){if(c.type==="array")return c.value[0].getDeclaration(l,u,c.value.length)+`
const int ${l}_length = ${c.value.length};`;if(c.type==="struct"){let d=l.replace("u_","");return d=d.charAt(0).toUpperCase()+d.slice(1),`uniform struct ${d} 
{
`+Object.entries(c.value).map(([m,p])=>p.getDeclaration(m,u).replace(/^uniform/,"")).join("")+`
} ${l}${h>0?`[${h}]`:""};`}return`uniform ${c.type} ${l}${h>0?`[${h}]`:""};`}}}},PlaneGeometry:{enumerable:!1,value:class{constructor(l,u,h,c,d){s.createBuffer(),this.attributes={position:new a.Attribute({target:s.ARRAY_BUFFER,size:3}),uv:new a.Attribute({target:s.ARRAY_BUFFER,size:2}),uvNorm:new a.Attribute({target:s.ARRAY_BUFFER,size:2}),index:new a.Attribute({target:s.ELEMENT_ARRAY_BUFFER,size:3,type:s.UNSIGNED_SHORT})},this.setTopology(h,c),this.setSize(l,u,d)}setTopology(l=1,u=1){let h=this;h.xSegCount=l,h.ySegCount=u,h.vertexCount=(h.xSegCount+1)*(h.ySegCount+1),h.quadCount=h.xSegCount*h.ySegCount*2,h.attributes.uv.values=new Float32Array(2*h.vertexCount),h.attributes.uvNorm.values=new Float32Array(2*h.vertexCount),h.attributes.index.values=new Uint16Array(3*h.quadCount);for(let c=0;c<=h.ySegCount;c++)for(let d=0;d<=h.xSegCount;d++){let m=c*(h.xSegCount+1)+d;if(h.attributes.uv.values[2*m]=d/h.xSegCount,h.attributes.uv.values[2*m+1]=1-c/h.ySegCount,h.attributes.uvNorm.values[2*m]=d/h.xSegCount*2-1,h.attributes.uvNorm.values[2*m+1]=1-c/h.ySegCount*2,d<h.xSegCount&&c<h.ySegCount){let p=c*h.xSegCount+d;h.attributes.index.values[6*p]=m,h.attributes.index.values[6*p+1]=m+1+h.xSegCount,h.attributes.index.values[6*p+2]=m+1,h.attributes.index.values[6*p+3]=m+1,h.attributes.index.values[6*p+4]=m+1+h.xSegCount,h.attributes.index.values[6*p+5]=m+2+h.xSegCount}}h.attributes.uv.update(),h.attributes.uvNorm.update(),h.attributes.index.update()}setSize(l=1,u=1,h="xz"){let c=this;c.width=l,c.height=u,c.orientation=h,(!c.attributes.position.values||c.attributes.position.values.length!==3*c.vertexCount)&&(c.attributes.position.values=new Float32Array(3*c.vertexCount));let d=l/-2,m=u/-2,p=l/c.xSegCount,f=u/c.ySegCount;for(let g=0;g<=c.ySegCount;g++){let w=m+g*f;for(let _=0;_<=c.xSegCount;_++){let j=d+_*p,R=g*(c.xSegCount+1)+_;c.attributes.position.values[3*R+"xyz".indexOf(h[0])]=j,c.attributes.position.values[3*R+"xyz".indexOf(h[1])]=-w}}c.attributes.position.update()}}},Mesh:{enumerable:!1,value:class{constructor(l,u){let h=this;h.geometry=l,h.material=u,h.wireframe=!1,h.attributeInstances=[],Object.entries(h.geometry.attributes).forEach(([c,d])=>{h.attributeInstances.push({attribute:d,location:d.attach(c,h.material.program)})}),a.meshes.push(h)}draw(){s.useProgram(this.material.program),this.material.uniformInstances.forEach(({uniform:l,location:u})=>l.update(u)),this.attributeInstances.forEach(({attribute:l,location:u})=>l.use(u)),s.drawElements(this.wireframe?s.LINES:s.TRIANGLES,this.geometry.attributes.index.values.length,s.UNSIGNED_SHORT,0)}remove(){a.meshes=a.meshes.filter(l=>l!==this)}}},Attribute:{enumerable:!1,value:class{constructor(l){this.type=s.FLOAT,this.normalized=!1,this.buffer=s.createBuffer(),Object.assign(this,l),this.update()}update(){this.values!==void 0&&(s.bindBuffer(this.target,this.buffer),s.bufferData(this.target,this.values,s.STATIC_DRAW))}attach(l,u){let h=s.getAttribLocation(u,l);return this.target===s.ARRAY_BUFFER&&(s.enableVertexAttribArray(h),s.vertexAttribPointer(h,this.size,this.type,this.normalized,0,0)),h}use(l){s.bindBuffer(this.target,this.buffer),this.target===s.ARRAY_BUFFER&&(s.enableVertexAttribArray(l),s.vertexAttribPointer(l,this.size,this.type,this.normalized,0,0))}}}});let n=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];a.commonUniforms={projectionMatrix:new a.Uniform({type:"mat4",value:n}),modelViewMatrix:new a.Uniform({type:"mat4",value:n}),resolution:new a.Uniform({type:"vec2",value:[1,1]}),aspectRatio:new a.Uniform({type:"float",value:1})},o&&r&&this.setSize(o,r)}setSize(t=640,e=480,o=1){this.width=t,this.height=e,this.gl.viewport(0,0,t*o,e*o),this.commonUniforms.resolution.value=[t,e],this.commonUniforms.aspectRatio.value=t/e}setOrthographicCamera(t=0,e=0,o=0,r=-2e3,a=2e3){this.commonUniforms.projectionMatrix.value=[2/this.width,0,0,0,0,2/this.height,0,0,0,0,2/(r-a),0,t,e,o,1]}render(){this.gl.clearColor(0,0,0,0),this.gl.clearDepth(1),this.meshes.forEach(t=>t.draw())}cleanup(){let t=this.gl;this.meshes.forEach(e=>{e.attributeInstances&&e.attributeInstances.forEach(({location:o})=>{typeof o=="number"&&o>=0&&t.disableVertexAttribArray(o)}),e.material&&e.material.program&&t.deleteProgram(e.material.program),e.geometry&&e.geometry.attributes&&Object.values(e.geometry.attributes).forEach(o=>{o.buffer&&t.deleteBuffer(o.buffer)})}),this.meshes=[]}},Zt=class{constructor(t,e,o,r){this.canvas=t,this.gl=e,this.width=o,this.height=r,this.angle=0,this.conf={presetName:"",wireframe:!1,density:[.06,.16],zoom:1,rotation:0,playing:!0},this.t=1253106,this.last=0,this.amp=320,this.seed=5,this.freqX=14e-5,this.freqY=29e-5,this.activeColors=[1,1,1,1],this.shaderFiles={vertex:`
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
            `},this.initGradientColors(),this.minigl=new Qt(t,e,o,r),this.initMesh(),this.resize(),this.updateThemeAwareText()}initGradientColors(){this.sectionColors=jr.map(t=>go(parseInt(t.substring(1),16)))}initMaterial(){this.uniforms={u_time:new this.minigl.Uniform({value:0}),u_shadow_power:new this.minigl.Uniform({value:5}),u_darken_top:new this.minigl.Uniform({value:0}),u_active_colors:new this.minigl.Uniform({value:this.activeColors,type:"vec4"}),u_global:new this.minigl.Uniform({value:{noiseFreq:new this.minigl.Uniform({value:[this.freqX,this.freqY],type:"vec2"}),noiseSpeed:new this.minigl.Uniform({value:5e-6})},type:"struct"}),u_vertDeform:new this.minigl.Uniform({value:{incline:new this.minigl.Uniform({value:Math.sin(this.angle)/Math.cos(this.angle)}),offsetTop:new this.minigl.Uniform({value:-.5}),offsetBottom:new this.minigl.Uniform({value:-.5}),noiseFreq:new this.minigl.Uniform({value:[3,4],type:"vec2"}),noiseAmp:new this.minigl.Uniform({value:this.amp}),noiseSpeed:new this.minigl.Uniform({value:10}),noiseFlow:new this.minigl.Uniform({value:3}),noiseSeed:new this.minigl.Uniform({value:this.seed})},type:"struct",excludeFrom:"fragment"}),u_baseColor:new this.minigl.Uniform({value:this.sectionColors[0],type:"vec3",excludeFrom:"fragment"}),u_waveLayers:new this.minigl.Uniform({value:[],excludeFrom:"fragment",type:"array"})};for(let t=1;t<this.sectionColors.length;t+=1)this.uniforms.u_waveLayers.value.push(new this.minigl.Uniform({value:{color:new this.minigl.Uniform({value:this.sectionColors[t],type:"vec3"}),noiseFreq:new this.minigl.Uniform({value:[2+t/this.sectionColors.length,3+t/this.sectionColors.length],type:"vec2"}),noiseSpeed:new this.minigl.Uniform({value:11+.3*t}),noiseFlow:new this.minigl.Uniform({value:6.5+.3*t}),noiseSeed:new this.minigl.Uniform({value:this.seed+10*t}),noiseFloor:new this.minigl.Uniform({value:.1}),noiseCeil:new this.minigl.Uniform({value:.63+.07*t})},type:"struct"}));return this.vertexShader=[this.shaderFiles.noise,this.shaderFiles.blend,this.shaderFiles.vertex].join(`

`),new this.minigl.Material(this.vertexShader,this.shaderFiles.fragment,this.uniforms)}initMesh(){this.material=this.initMaterial(),this.geometry=new this.minigl.PlaneGeometry,this.mesh=new this.minigl.Mesh(this.geometry,this.material)}resize(){let t=Math.min(window.devicePixelRatio||1,1.5);this.minigl.setSize(this.width,this.height,t),this.minigl.setOrthographicCamera(),this.xSegCount=Math.ceil(this.width*this.conf.density[0]),this.ySegCount=Math.ceil(this.height*this.conf.density[1]),this.mesh.geometry.setTopology(this.xSegCount,this.ySegCount),this.mesh.geometry.setSize(this.width,this.height),this.mesh.material.uniforms.u_shadow_power.value=this.width<600?5:6}animate=t=>{if(!this.conf.playing)return;this.last===0&&(this.last=t);let e=Math.min(t-this.last,1e3/15);this.last=t,this.t+=e,this.mesh.material.uniforms.u_time.value=this.t,this.minigl.render(),this.animationId=requestAnimationFrame(this.animate)};updateThemeAwareText(){if(!this.sectionColors||this.sectionColors.length===0)return;let t=0;this.sectionColors.forEach(a=>{let s=a[0],n=a[1],l=a[2],u=.299*s+.587*n+.114*l;t+=u});let e=t/this.sectionColors.length,o=e>.6?"#111111":"#ffffff",r=e>.6?"0 1px 2px rgba(255, 255, 255, 0.8)":"0 1px 3px rgba(0, 0, 0, 0.9), 0 2px 10px rgba(0, 0, 0, 0.6)";document.documentElement.style.setProperty("--afx-body-color",o),document.documentElement.style.setProperty("--afx-text-shadow",r),Jt&&(Jt.marqueeFont={colorFn:(a,s)=>{if(!this.sectionColors||this.sectionColors.length===0)return"#ffffff";let n=(a*1.5+s*.25)%this.sectionColors.length,l=Math.floor(n),u=(l+1)%this.sectionColors.length,h=n-l,c=this.sectionColors[l],d=this.sectionColors[u],m=c[0]*(1-h)+d[0]*h,p=c[1]*(1-h)+d[1]*h,f=c[2]*(1-h)+d[2]*h,g=e>.6?.45:1;return`rgb(${Math.round(m*g*255)}, ${Math.round(p*g*255)}, ${Math.round(f*g*255)})`},shadowColor:e>.6?"rgba(0, 0, 0, 0.25)":"inherit",shadowBlur:16},window.AnkiFX&&window.AnkiFX.marquee&&window.AnkiFX.marquee.updateStyles(Jt.marqueeFont))}randomizeColors(){let t=()=>"#"+Math.floor(Math.random()*16777215).toString(16).padStart(6,"0"),e=[t(),t(),t(),t()];if(this.sectionColors=e.map(o=>go(parseInt(o.substring(1),16))),this.uniforms&&this.uniforms.u_baseColor&&this.uniforms.u_waveLayers&&this.uniforms.u_waveLayers.value){this.uniforms.u_baseColor.value=this.sectionColors[0];for(let o=0;o<this.uniforms.u_waveLayers.value.length;o++){let r=this.uniforms.u_waveLayers.value[o];r&&r.value&&r.value.color&&(r.value.color.value=this.sectionColors[o+1]||this.sectionColors[0])}}this.updateThemeAwareText()}destroy(){this.conf.playing=!1,this.animationId&&(cancelAnimationFrame(this.animationId),this.animationId=null),this.minigl&&this.minigl.cleanup()}onContextLost(){this.conf.playing=!1,this.animationId&&(cancelAnimationFrame(this.animationId),this.animationId=null),this.minigl&&(this.minigl.gl=null,this.minigl.meshes=[])}onContextRestored(t){this.gl=t,this.minigl=new Qt(this.canvas,t,this.width,this.height),this.initMesh(),this.resize(),this.updateThemeAwareText(),this.conf.playing=!0,this.last=0,this.animationId=requestAnimationFrame(this.animate)}};var ei=class{constructor(t,e){this.contexts=t,this.config=e,this.gradient=null,this.destroyed=!1}init(t){this.destroyed||(this.gradient=new Zt(this.contexts.canvasGL,t,this.contexts.width,this.contexts.height),this.gradient.conf.playing=!0,this.gradient.last=0,this.gradient.animationId=requestAnimationFrame(this.gradient.animate))}render(){}resize(t,e,o){this.gradient&&(this.gradient.width=t,this.gradient.height=e,this.gradient.resize())}destroy(){this.destroyed||(this.destroyed=!0,this.gradient&&(this.gradient.destroy(),this.gradient=null),document.documentElement.style.removeProperty("--afx-body-color"),document.documentElement.style.removeProperty("--afx-text-shadow"))}onContextLost(){this.gradient&&this.gradient.onContextLost()}onContextRestored(t){this.destroyed||this.gradient&&this.gradient.onContextRestored(t)}},Ee=null,Ui={id:"gradient",name:"Gradient",isWebGL:!0,controls:[{type:"button",id:"gradient-randomize",label:"\u{1F3A8} RANDOMIZE",onClick:()=>{Ee&&Ee.gradient&&Ee.gradient.randomizeColors()}}],createInstance(i,t){return Ee=new ei(i,t),Ee},run:(i,t)=>{Ee&&Ee.destroy(),Ee=new ei(i,t),Ee.init(i.gl)},stop:()=>{Ee&&(Ee.destroy(),Ee=null)},onResize:(i,t,e)=>{Ee&&Ee.resize(i,t,e)},marqueeFont:{color:"#E6E6FA",shadowColor:"rgba(230, 230, 250, 0.6)",shadowBlur:8}};bo(Ui);function Ni(i){if(typeof i.getShaderPrecisionFormat=="function")try{let t=i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT);if(t&&t.precision>0)return"highp"}catch{}return"mediump"}function ze(i,t,e){function o(d,m){let p=i.createShader(d);return i.shaderSource(p,m),i.compileShader(p),i.getShaderParameter(p,i.COMPILE_STATUS)?p:(console.error("[AnkiFX/WebGL] Shader compile error:",i.getShaderInfoLog(p)),i.deleteShader(p),null)}let r=o(i.VERTEX_SHADER,t),a=e.replace(/\bprecision\s+(highp|mediump|lowp)\s+float\s*;/gim,""),n=`precision ${Ni(i)} float;
`+a,l=o(i.FRAGMENT_SHADER,n);if(!r||!l)return r&&i.deleteShader(r),l&&i.deleteShader(l),null;let u=i.createProgram();if(i.attachShader(u,r),i.attachShader(u,l),i.linkProgram(u),i.detachShader(u,r),i.detachShader(u,l),i.deleteShader(r),i.deleteShader(l),!i.getProgramParameter(u,i.LINK_STATUS))return console.error("[AnkiFX/WebGL] Program link error:",i.getProgramInfoLog(u)),i.deleteProgram(u),null;i.useProgram(u);let h=i.createBuffer();i.bindBuffer(i.ARRAY_BUFFER,h),i.bufferData(i.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),i.STATIC_DRAW);let c=i.getAttribLocation(u,"position");return i.enableVertexAttribArray(c),i.vertexAttribPointer(c,2,i.FLOAT,!1,0,0),{program:u,buffer:h}}var $e={id:"julia",name:"Julia Set",isWebGL:!0,createInstance(i,t){return Ae=new ti(i,t),Ae},run:Gr,stop:$r,onResize:(i,t,e)=>{Ae&&Ae.resize(i,t,e)},preferredTrack:{title:"Acoustica Power Bundle 4",trackTitle:"AiR"},presets:[{name:"Black Hole",cRe:-.8,cIm:.156,zoomDepth:8,targetX:-.086441,targetY:-.239323},{name:"Electric Lightning",cRe:.285,cIm:.013,zoomDepth:6,targetX:-.106662,targetY:.656613},{name:"Golden Dragon",cRe:-.4,cIm:.6,zoomDepth:9,targetX:-.042175,targetY:-.036744},{name:"Filigree",cRe:-.70176,cIm:-.3842,zoomDepth:10.5,targetX:-.096904,targetY:-.656621},{name:"Fractal Storm",cRe:-.7269,cIm:.1889,zoomDepth:10.5,targetX:-.237086,targetY:.547981},{name:"Seahorse Spiral",cRe:-.74543,cIm:.11301,zoomDepth:7.5,targetX:-.529406,targetY:.072863}],marqueeFont:{color:"#FFF",outline:"#000"}},q={presetIndex:0,cRe:-.8,cIm:.156,zoomDepth:8,targetX:-.086441,targetY:-.239323,speed:parseFloat(localStorage.getItem("ankifx_julia_speed"))||.15},Hr=`
    attribute vec2 position;
    void main() { gl_Position = vec4(position, 0.0, 1.0); }
`,Xr=`
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
`,ti=class{constructor(t,e){this.contexts=t,this.config=e,this.destroyed=!1,this.gl=null,this.activeProgram=null,this.activeBuffer=null,this.resLoc=null,this.timeLoc=null,this.speedLoc=null,this.cLoc=null,this.zoomDepthLoc=null,this.targetLoc=null,this.currentW=t.width,this.currentH=t.height,this.dpr=t.dpr,this.debugInfoEl=null,this.getCoordsAt=null,this.currentMouseListener=null,this.currentMouseMoveListener=null,this.mousePos={x:0,y:0},this.startTime=performance.now()*.001,this.animationId=null}init(t){this.gl=t;let e=ze(t,Hr,Xr);if(!e)throw new Error("[Julia] Shader program compilation failed");this.activeProgram=e.program,this.activeBuffer=e.buffer,this.timeLoc=t.getUniformLocation(this.activeProgram,"u_time"),this.speedLoc=t.getUniformLocation(this.activeProgram,"u_speed"),this.resLoc=t.getUniformLocation(this.activeProgram,"u_resolution"),this.cLoc=t.getUniformLocation(this.activeProgram,"u_c"),this.zoomDepthLoc=t.getUniformLocation(this.activeProgram,"u_zoomDepth"),this.targetLoc=t.getUniformLocation(this.activeProgram,"u_target"),t.uniform2f(this.resLoc,this.currentW*this.dpr,this.currentH*this.dpr);let o=this.currentW<480,r=parseInt(localStorage.getItem("ankifx_julia_preset_index")||"0",10);q.presetIndex=r;let a=$e.presets[r]||$e.presets[0];q.cRe=this.config.cRe!==void 0?this.config.cRe:a.cRe,q.cIm=this.config.cIm!==void 0?this.config.cIm:a.cIm,q.zoomDepth=this.config.zoomDepth!==void 0?this.config.zoomDepth:a.zoomDepth,q.targetX=this.config.targetX!==void 0?this.config.targetX:a.targetX,q.targetY=this.config.targetY!==void 0?this.config.targetY:a.targetY;let s={type:"select",id:"julia-preset",label:"PRESET",options:$e.presets.map((n,l)=>({value:l,text:(o?"\u{1F4A0} ":"[ Preset: ")+n.name+(o?"":" ]")})),value:q.presetIndex,onChange:n=>{let l=parseInt(n);localStorage.setItem("ankifx_julia_preset_index",l),q.presetIndex=l;let u=$e.presets[l];u&&(Object.assign(this.config,u),q.cRe=u.cRe,q.cIm=u.cIm,q.zoomDepth=u.zoomDepth,q.targetX=u.targetX,q.targetY=u.targetY,this.config.debug&&typeof AnkiFX<"u"&&(AnkiFX.setControlValue("julia-cRe",u.cRe),AnkiFX.setControlValue("julia-cIm",u.cIm),AnkiFX.setControlValue("julia-zoomDepth",u.zoomDepth),AnkiFX.setControlValue("julia-targetX",u.targetX),AnkiFX.setControlValue("julia-targetY",u.targetY)),this.destroy(),this.contexts.ctx2d&&this.contexts.ctx2d.clearRect(0,0,this.currentW,this.currentH),typeof AnkiFX<"u"&&AnkiFX.startEffect&&AnkiFX.startEffect(this.config,document.getElementById("ankifx-background"),this.config.marqueePosition,"julia"))}};if(this.config.debug?$e.controls=[]:$e.controls=[s],this.config.debug){$e.controls.push({type:"slider",id:"julia-cRe",label:"C-RE",min:-1.5,max:1,step:.001,value:q.cRe,onChange:h=>{q.cRe=h}},{type:"slider",id:"julia-cIm",label:"C-IM",min:-1,max:1,step:.001,value:q.cIm,onChange:h=>{q.cIm=h}},{type:"slider",id:"julia-zoomDepth",label:"ZOOM",min:2,max:25,step:.1,value:q.zoomDepth,onChange:h=>{q.zoomDepth=h}},{type:"slider",id:"julia-targetX",label:"T-X",min:-2,max:2,step:1e-4,value:q.targetX,onChange:h=>{q.targetX=h}},{type:"slider",id:"julia-targetY",label:"T-Y",min:-2,max:2,step:1e-4,value:q.targetY,onChange:h=>{q.targetY=h}},{type:"slider",id:"julia-speed",label:"SPD",min:.005,max:.3,step:.005,value:q.speed,onChange:h=>{q.speed=h,localStorage.setItem("ankifx_julia_speed",h)}}),$e.controls.push(s);let n=document.getElementById("afx-effect-controls-container");n&&(this.debugInfoEl=document.createElement("div"),this.debugInfoEl.id="afx-julia-debug-info",this.debugInfoEl.className="afx-control-row julia-debug-el",this.debugInfoEl.style.cssText="height: 20px !important; margin-bottom: 2px; pointer-events: none; justify-content: flex-end; opacity: 0.8; font-size: 11px !important; color: #ff00ff; border: none; background: transparent;",this.debugInfoEl.textContent="HOVER TO SEE TARGET COORDS",n.prepend(this.debugInfoEl)),this.getCoordsAt=(h,c,d)=>{let m=d*q.speed/Math.max(q.zoomDepth,1)%2,p=m>1?2-m:m,f=p<.5?4*Math.pow(p,3):1-Math.pow(-2*p+2,3)/2,w=2.2/Math.exp(f*q.zoomDepth),_=f*Math.PI*.5,j=(h-this.currentW/2)/this.currentH,R=(this.currentH/2-c)/this.currentH,P=Math.cos(_),v=Math.sin(_),k=(P*j+v*R)*w,E=(-v*j+P*R)*w;return{tx:q.targetX+k,ty:q.targetY+E}};let l=h=>{if(h.target.closest("#afx-bottom-dock")||h.target.closest(".afx-dialog"))return;let c=performance.now()*.001-this.startTime,{tx:d,ty:m}=this.getCoordsAt(h.clientX,h.clientY,c);q.targetX=d,q.targetY=m,typeof AnkiFX<"u"&&AnkiFX.setControlValue&&(AnkiFX.setControlValue("julia-targetX",d),AnkiFX.setControlValue("julia-targetY",m))};window.addEventListener("mousedown",l),this.currentMouseListener=l;let u=h=>{this.mousePos.x=h.clientX,this.mousePos.y=h.clientY};window.addEventListener("mousemove",u),this.currentMouseMoveListener=u}this.animationId=requestAnimationFrame(this.loop)}loop=()=>{if(!this.destroyed&&!(typeof window<"u"&&window.AnkiFX&&window.AnkiFX.currentEffectId!=="julia")){if(window.AnkiFX&&window.AnkiFX.isContextLost){this.animationId=requestAnimationFrame(this.loop);return}try{this.render(),this.animationId=requestAnimationFrame(this.loop)}catch(t){console.error("[AnkiFX/Julia] Render execution crash:",t),window.AnkiFX&&typeof window.AnkiFX.onRenderFailure=="function"&&window.AnkiFX.onRenderFailure(t)}}};render(){let t=this.gl,e=this.contexts.ctx2d;if(!t||this.destroyed)return;let o=performance.now()*.001-this.startTime;if(t.uniform1f(this.timeLoc,o),t.uniform1f(this.speedLoc,q.speed),t.uniform2f(this.cLoc,q.cRe,q.cIm),t.uniform1f(this.zoomDepthLoc,q.zoomDepth),t.uniform2f(this.targetLoc,q.targetX,q.targetY),t.drawArrays(t.TRIANGLE_STRIP,0,4),e&&e.clearRect(0,0,this.currentW,this.currentH),this.debugInfoEl&&this.getCoordsAt){let r=performance.now()*.001-this.startTime,{tx:a,ty:s}=this.getCoordsAt(this.mousePos.x,this.mousePos.y,r);this.debugInfoEl.textContent=`TARGET X: ${a.toFixed(6)}, Y: ${s.toFixed(6)}`}}resize(t,e,o){this.currentW=t,this.currentH=e,this.dpr=o,this.gl&&this.resLoc&&this.gl.uniform2f(this.resLoc,t*o,e*o)}destroy(){if(this.destroyed)return;this.destroyed=!0,Ae===this&&(Ae=null),this.animationId&&(cancelAnimationFrame(this.animationId),this.animationId=null),this.currentMouseListener&&(window.removeEventListener("mousedown",this.currentMouseListener),this.currentMouseListener=null),this.currentMouseMoveListener&&(window.removeEventListener("mousemove",this.currentMouseMoveListener),this.currentMouseMoveListener=null),document.querySelectorAll(".julia-debug-el").forEach(e=>e.remove());let t=this.gl;if(t)try{this.activeProgram&&t.deleteProgram(this.activeProgram),this.activeBuffer&&t.deleteBuffer(this.activeBuffer)}catch(e){console.error("[AnkiFX/Julia] Error deleting GPU state:",e)}this.gl=null,this.activeProgram=null,this.activeBuffer=null,this.resLoc=null}onContextLost(){this.gl=null,this.activeProgram=null,this.activeBuffer=null}onContextRestored(t){this.gl=t,this.init(t)}},Ae=null;function Gr(i,t={}){Ae&&Ae.destroy(),Ae=new ti(i,t),Ae.init(i.gl)}function $r(){Ae&&(Ae.destroy(),Ae=null)}var Qe=6,ii=class{constructor(t,e,o,r){this.pos={x:t,y:e},this.vel={x:0,y:-(Math.random()*.6+.3)},this.radius=o;let a=e/r;this.temperature=.15+a*.3+Math.random()*.15,this.buoyancy=0,this.noiseOffset=Math.random()*1e3,this.smoothSpeedY=0}update(t,e,o,r,a){this.pos.y>o*.8?this.temperature+=.05*t:this.pos.y>o*.6?this.temperature+=.02*t:this.pos.y<o*.2?this.temperature-=.04*t:this.pos.y<o*.4&&(this.temperature-=.015*t),this.temperature=Math.max(0,Math.min(1,this.temperature)),this.buoyancy=this.temperature*4-2,this.vel.y-=this.buoyancy*10*t;let s=Math.sin(this.noiseOffset+r*2e-4)*.1;this.vel.x+=s*t*.3;let n=1-Math.min(Math.abs(this.buoyancy)/.8,1),l=(e*.5-this.pos.x)*.003*n;this.vel.x+=l*t,this.pos.x<this.radius&&(this.vel.x+=(this.radius-this.pos.x)*2*t),this.pos.x>e-this.radius&&(this.vel.x-=(this.pos.x-(e-this.radius))*2*t);let u=-this.radius*.5;this.pos.y<u&&(this.vel.y+=(u-this.pos.y)*8*t);let h=o+this.radius*.5;this.pos.y>h&&(this.vel.y-=(this.pos.y-h)*8*t);let c=Math.pow(.97,t*60);this.vel.x*=c;let m=Math.abs(this.buoyancy)>.8,p=Math.pow(m?.994:.975,t*60);this.vel.y*=p;let f=Math.max(0,(this.pos.y-o*.82)/(o*.18)),g=Math.max(0,(o*.18-this.pos.y)/(o*.18)),w=Math.pow(.88,t*60*(f+g));if(this.vel.x*=w,this.smoothSpeedY+=(Math.abs(this.vel.y)-this.smoothSpeedY)*(1-Math.pow(.05,t)),a&&a.down){let _=this.pos.x-a.x,j=this.pos.y-a.y,R=Math.sqrt(_*_+j*j);if(R<200){let P=(200-R)/200;this.vel.x+=a.dx*P*1.5,this.vel.y+=a.dy*P*8}}this.pos.x+=this.vel.x*t,this.pos.y+=this.vel.y*t}},Vr=`
    attribute vec2 aPosition;
    varying vec2 vUv;
    void main() {
        vUv = aPosition * 0.5 + 0.5;
        vUv.y = 1.0 - vUv.y;
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }
`,Wr=`
    precision highp float;
    varying vec2 vUv;
    
    uniform vec2 uResolution;
    uniform float uTime;
    
    uniform vec4 uBlobs[${Qe}];
    uniform float uBlobTemp[${Qe}];
    
    float smin(float a, float b, float k) {
        float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
        return mix(b, a, h) - k * h * (1.0 - h);
    }
    
    float map(vec2 p) {
        float d = 10000.0;
        for (int i = 0; i < ${Qe}; i++) {
            float stretchY = max(uBlobs[i].w, 0.85);
            vec2 lp = p - uBlobs[i].xy;
            lp.x *= sqrt(stretchY);
            lp.y /= sqrt(stretchY);
            float blob = length(lp) - uBlobs[i].z;
            d = smin(d, blob, 60.0);
        }
        
        float floorDist = uResolution.y - p.y;
        d = smin(d, floorDist - 35.0, 120.0);
        
        return d;
    }
    
    vec3 calcNormal(vec2 p, float d) {
        vec2 e = vec2(1.0, 0.0);
        vec3 n = vec3(
            map(p + e.xy) - d,
            map(p + e.yx) - d,
            4.0 - min(0.0, d) * 0.5
        );
        return normalize(n);
    }
    
    void main() {
        vec2 p = vUv * uResolution;
        float d = map(p);
        
        vec3 bg = mix(vec3(0.08, 0.01, 0.0), vec3(0.2, 0.04, 0.0), vUv.y);
        float glow = exp(-max(0.0, d) * 0.02);
        vec3 glowBg = bg + vec3(0.95, 0.35, 0.0) * glow * 0.45;
        vec3 lavaHot = vec3(1.0, 0.6, 0.1);
        
        float alpha = smoothstep(3.0, -3.0, d);
        
        if (d > 3.0) {
            gl_FragColor = vec4(glowBg, 1.0);
            return;
        }
        
        vec3 n = calcNormal(p, d);
        vec3 lightDir = normalize(vec3(0.0, 1.0, 0.5));
        vec3 viewDir = normalize(vec3(0.0, 0.0, 1.0));
        
        float diff = max(dot(n, lightDir), 0.0);
        vec3 halfDir = normalize(lightDir + viewDir);
        float spec = pow(max(dot(n, halfDir), 0.0), 32.0);
        
        float thickness = abs(d);
        float translucency = exp(-thickness * 0.008);
        vec3 dynamicLavaBase = mix(vec3(0.6, 0.05, 0.0), vec3(1.0, 0.55, 0.05), translucency);
        
        vec3 col = mix(dynamicLavaBase, lavaHot, diff);
        col += vec3(1.0, 0.9, 0.6) * spec * 0.7;
        
        float rim = 1.0 - max(dot(n, viewDir), 0.0);
        col += vec3(0.9, 0.2, 0.0) * pow(rim, 3.0) * 0.8;
        
        vec3 finalCol = mix(glowBg, col, alpha);
        gl_FragColor = vec4(finalCol, 1.0);
    }
`,oi=class{constructor(t,e){this.contexts=t,this.config=e,this.destroyed=!1,this.gl=null,this.program=null,this.positionBuffer=null,this.blobs=[],this.lastTime=0,this.currentW=t.width,this.currentH=t.height,this.canvasEl=t.canvasGL,this.mouse={x:-1e3,y:-1e3,dx:0,dy:0,down:!1},this.animationId=null,this.blobData=new Float32Array(Qe*4),this.tempData=new Float32Array(Qe)}compileShader(t,e){let o=this.gl,r=o.createShader(t);return o.shaderSource(r,e),o.compileShader(r),o.getShaderParameter(r,o.COMPILE_STATUS)?r:(console.error("[LavaLamp/WebGL] Shader compile error:",o.getShaderInfoLog(r)),o.deleteShader(r),null)}init(t){this.gl=t;let e=this.compileShader(t.VERTEX_SHADER,Vr),o=Wr.replace(/\bprecision\s+(highp|mediump|lowp)\s+float\s*;/gim,""),a=`precision ${Ni(t)} float;
`+o,s=this.compileShader(t.FRAGMENT_SHADER,a);if(!e||!s)return;if(this.program=t.createProgram(),t.attachShader(this.program,e),t.attachShader(this.program,s),t.linkProgram(this.program),t.detachShader(this.program,e),t.detachShader(this.program,s),t.deleteShader(e),t.deleteShader(s),!t.getProgramParameter(this.program,t.LINK_STATUS)){console.error("[LavaLamp/WebGL] Program link error:",t.getProgramInfoLog(this.program)),t.deleteProgram(this.program);return}t.useProgram(this.program),this.positionBuffer=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,this.positionBuffer);let n=new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]);t.bufferData(t.ARRAY_BUFFER,n,t.STATIC_DRAW);let l=t.getAttribLocation(this.program,"aPosition");t.enableVertexAttribArray(l),t.vertexAttribPointer(l,2,t.FLOAT,!1,0,0),this.program.uResolution=t.getUniformLocation(this.program,"uResolution"),this.program.uTime=t.getUniformLocation(this.program,"uTime"),this.program.uBlobs=t.getUniformLocation(this.program,"uBlobs"),this.program.uBlobTemp=t.getUniformLocation(this.program,"uBlobTemp"),this.blobs=[];let u=0;for(;this.blobs.length<Qe&&u<200;){u++;let h=70+Math.random()*60,c=h+Math.random()*(this.currentW-h*2),d=h+Math.random()*(this.currentH-h*2),m=!1;for(let p of this.blobs){let f=p.pos.x-c,g=p.pos.y-d;if(Math.sqrt(f*f+g*g)<p.radius+h+10){m=!0;break}}m||this.blobs.push(new ii(c,d,h,this.currentH))}for(;this.blobs.length<Qe;){let h=70+Math.random()*60,c=h+Math.random()*(this.currentW-h*2),d=h+Math.random()*(this.currentH-h*2);this.blobs.push(new ii(c,d,h,this.currentH))}this.lastTime=performance.now(),this.bindEvents(),this.animationId=requestAnimationFrame(this.loop)}loop=t=>{if(!this.destroyed&&!(typeof window<"u"&&window.AnkiFX&&window.AnkiFX.currentEffectId!=="lavalamp")){if(window.AnkiFX&&window.AnkiFX.isContextLost){this.animationId=requestAnimationFrame(this.loop);return}try{this.render(t),this.animationId=requestAnimationFrame(this.loop)}catch(e){console.error("[AnkiFX/Lavalamp] Render loop execution crash:",e),window.AnkiFX&&typeof window.AnkiFX.onRenderFailure=="function"&&window.AnkiFX.onRenderFailure(e)}}};render(t){let e=this.gl;if(!e||this.destroyed)return;let o=Math.min((t-this.lastTime)/1e3,.05);this.lastTime=t;for(let r=0;r<Qe;r++)this.blobs[r].update(o,this.currentW,this.currentH,t,this.mouse);for(let r=0;r<Qe;r++){let a=this.blobs[r],s=Math.max(.85,1+Math.min(a.smoothSpeedY*.028,.7)*(.4+a.temperature*.6));this.blobData[r*4+0]=a.pos.x,this.blobData[r*4+1]=a.pos.y,this.blobData[r*4+2]=a.radius,this.blobData[r*4+3]=s,this.tempData[r]=a.temperature}e.useProgram(this.program),e.uniform2f(this.program.uResolution,this.currentW,this.currentH),e.uniform1f(this.program.uTime,t*.001),e.uniform4fv(this.program.uBlobs,this.blobData),e.uniform1fv(this.program.uBlobTemp,this.tempData),e.drawArrays(e.TRIANGLES,0,6),this.mouse.dx=0,this.mouse.dy=0}resize(t,e,o){this.currentW=t,this.currentH=e,this.gl&&this.gl.viewport(0,0,t*o,e*o)}handlePointer=t=>{if(!this.canvasEl)return;let e=this.canvasEl.getBoundingClientRect(),o=t.touches?t.touches[0]:t,r=o.clientX-e.left,a=o.clientY-e.top;if(this.mouse.down&&t.type!=="mousedown"&&t.type!=="touchstart"){let s=r-this.mouse.x,n=a-this.mouse.y;Math.abs(s)<150&&Math.abs(n)<150&&(this.mouse.dx=s,this.mouse.dy=n)}this.mouse.x=r,this.mouse.y=a};handleDown=t=>{this.mouse.dx=0,this.mouse.dy=0,this.mouse.down=!0,this.handlePointer(t)};handleUp=()=>{this.mouse.down=!1};bindEvents(){window.addEventListener("mousedown",this.handleDown),window.addEventListener("mousemove",this.handlePointer),window.addEventListener("mouseup",this.handleUp),window.addEventListener("touchstart",this.handleDown,{passive:!0}),window.addEventListener("touchmove",this.handlePointer,{passive:!0}),window.addEventListener("touchend",this.handleUp)}unbindEvents(){window.removeEventListener("mousedown",this.handleDown),window.removeEventListener("mousemove",this.handlePointer),window.removeEventListener("mouseup",this.handleUp),window.removeEventListener("touchstart",this.handleDown),window.removeEventListener("touchmove",this.handlePointer),window.removeEventListener("touchend",this.handleUp)}destroy(){if(this.destroyed)return;this.destroyed=!0,Ce===this&&(Ce=null),this.animationId&&(cancelAnimationFrame(this.animationId),this.animationId=null),this.unbindEvents();let t=this.gl;if(t)try{t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),this.program&&t.deleteProgram(this.program),this.positionBuffer&&t.deleteBuffer(this.positionBuffer)}catch(e){console.error("[AnkiFX/Lavalamp] Error deleting GPU state:",e)}this.gl=null,this.program=null,this.positionBuffer=null}onContextLost(){this.gl=null,this.program=null,this.positionBuffer=null}onContextRestored(t){this.gl=t,this.init(t)}},Ce=null;function Yr(i,t){Ce&&Ce.destroy(),Ce=new oi(i,t),Ce.init(i.gl)}function Kr(){Ce&&(Ce.destroy(),Ce=null)}var vo={id:"lavalamp",name:"Lava Lamp",isWebGL:!0,createInstance(i,t){return Ce=new oi(i,t),Ce},run:Yr,stop:Kr,onResize:(i,t,e)=>{Ce&&Ce.resize(i,t,e)},marqueeFont:{color:"#ffccaa",shadowColor:"rgba(255, 100, 0, 0.8)",shadowBlur:10}};var ri={id:"mandelbrot",name:"Mandelbrot",isWebGL:!0,createInstance(i,t){return Fe=new ni(i,t),Fe},run:Zr,stop:en,onResize:(i,t,e)=>{Fe&&Fe.resize(i,t,e)},preferredTrack:{title:"Acoustica Power Bundle 4",trackTitle:"AiR"},marqueeFont:{color:"#FFF",outline:"#000"}},ce={targetX:-.743643887037151,targetY:.13182590420533,zoomDepth:11,speed:parseFloat(localStorage.getItem("ankifx_mandelbrot_speed"))||.15},Jr=`
    attribute vec2 position;
    void main() { gl_Position = vec4(position, 0.0, 1.0); }
`,Qr=`
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
`,ni=class{constructor(t,e){this.contexts=t,this.config=e,this.destroyed=!1,this.gl=null,this.activeProgram=null,this.activeBuffer=null,this.resLoc=null,this.timeLoc=null,this.speedLoc=null,this.zoomDepthLoc=null,this.targetLoc=null,this.currentW=t.width,this.currentH=t.height,this.dpr=t.dpr,this.debugInfoEl=null,this.getCoordsAt=null,this.currentMouseListener=null,this.currentMouseMoveListener=null,this.mousePos={x:0,y:0},this.startTime=performance.now()*.001,this.animationId=null}init(t){this.gl=t;let e=ze(t,Jr,Qr);if(!e)throw new Error("[Mandelbrot] Shader program compilation failed");if(this.activeProgram=e.program,this.activeBuffer=e.buffer,this.timeLoc=t.getUniformLocation(this.activeProgram,"u_time"),this.speedLoc=t.getUniformLocation(this.activeProgram,"u_speed"),this.zoomDepthLoc=t.getUniformLocation(this.activeProgram,"u_zoomDepth"),this.targetLoc=t.getUniformLocation(this.activeProgram,"u_target"),this.resLoc=t.getUniformLocation(this.activeProgram,"u_resolution"),t.uniform2f(this.resLoc,this.currentW*this.dpr,this.currentH*this.dpr),this.config.debug){ri.controls=[{type:"slider",id:"mandelbrot-zoomDepth",label:"ZOOM",min:2,max:25,step:.1,value:ce.zoomDepth,onChange:s=>{ce.zoomDepth=s}},{type:"slider",id:"mandelbrot-targetX",label:"T-X",min:-2.5,max:1,step:1e-4,value:ce.targetX,onChange:s=>{ce.targetX=s}},{type:"slider",id:"mandelbrot-targetY",label:"T-Y",min:-1.5,max:1.5,step:1e-4,value:ce.targetY,onChange:s=>{ce.targetY=s}},{type:"slider",id:"mandelbrot-speed",label:"SPD",min:.005,max:.3,step:.005,value:ce.speed,onChange:s=>{ce.speed=s,localStorage.setItem("ankifx_mandelbrot_speed",s)}}];let o=document.getElementById("afx-effect-controls-container");o&&(this.debugInfoEl=document.createElement("div"),this.debugInfoEl.id="afx-mandelbrot-debug-info",this.debugInfoEl.className="afx-control-row mandelbrot-debug-el",this.debugInfoEl.style.cssText="height: 20px !important; margin-bottom: 2px; pointer-events: none; justify-content: flex-end; opacity: 0.8; font-size: 11px !important; color: #ff00ff; border: none; background: transparent;",this.debugInfoEl.textContent="HOVER TO SEE TARGET COORDS",o.prepend(this.debugInfoEl)),this.getCoordsAt=(s,n,l)=>{let u=l*ce.speed/Math.max(ce.zoomDepth,1)%2,h=u>1?2-u:u,c=h<.5?4*Math.pow(h,3):1-Math.pow(-2*h+2,3)/2,d=Math.exp(c*ce.zoomDepth),m=(s-this.currentW/2)/this.currentH,p=(this.currentH/2-n)/this.currentH;return{tx:ce.targetX+m*(2.5/d),ty:ce.targetY+p*(2.5/d)}};let r=s=>{if(s.target.closest("#afx-bottom-dock")||s.target.closest(".afx-dialog"))return;let n=performance.now()*.001-this.startTime,{tx:l,ty:u}=this.getCoordsAt(s.clientX,s.clientY,n);ce.targetX=l,ce.targetY=u,typeof AnkiFX<"u"&&AnkiFX.setControlValue&&(AnkiFX.setControlValue("mandelbrot-targetX",l),AnkiFX.setControlValue("mandelbrot-targetY",u))};window.addEventListener("mousedown",r),this.currentMouseListener=r;let a=s=>{this.mousePos.x=s.clientX,this.mousePos.y=s.clientY};window.addEventListener("mousemove",a),this.currentMouseMoveListener=a}else ri.controls=[];this.animationId=requestAnimationFrame(this.loop)}loop=()=>{if(!this.destroyed&&!(typeof window<"u"&&window.AnkiFX&&window.AnkiFX.currentEffectId!=="mandelbrot")){if(window.AnkiFX&&window.AnkiFX.isContextLost){this.animationId=requestAnimationFrame(this.loop);return}try{this.render(),this.animationId=requestAnimationFrame(this.loop)}catch(t){console.error("[AnkiFX/Mandelbrot] Render execution crash:",t),window.AnkiFX&&typeof window.AnkiFX.onRenderFailure=="function"&&window.AnkiFX.onRenderFailure(t)}}};render(){let t=this.gl,e=this.contexts.ctx2d;if(!t||this.destroyed)return;let o=performance.now()*.001-this.startTime;if(t.uniform1f(this.timeLoc,o),t.uniform1f(this.speedLoc,ce.speed),t.uniform1f(this.zoomDepthLoc,ce.zoomDepth),t.uniform2f(this.targetLoc,ce.targetX,ce.targetY),t.drawArrays(t.TRIANGLE_STRIP,0,4),e&&e.clearRect(0,0,this.currentW,this.currentH),this.debugInfoEl&&this.getCoordsAt){let r=performance.now()*.001-this.startTime,{tx:a,ty:s}=this.getCoordsAt(this.mousePos.x,this.mousePos.y,r);this.debugInfoEl.textContent=`TARGET X: ${a.toFixed(6)}, Y: ${s.toFixed(6)}`}}resize(t,e,o){this.currentW=t,this.currentH=e,this.dpr=o,this.gl&&this.resLoc&&this.gl.uniform2f(this.resLoc,t*o,e*o)}destroy(){if(this.destroyed)return;this.destroyed=!0,Fe===this&&(Fe=null),this.animationId&&(cancelAnimationFrame(this.animationId),this.animationId=null),this.currentMouseListener&&(window.removeEventListener("mousedown",this.currentMouseListener),this.currentMouseListener=null),this.currentMouseMoveListener&&(window.removeEventListener("mousemove",this.currentMouseMoveListener),this.currentMouseMoveListener=null),document.querySelectorAll(".mandelbrot-debug-el").forEach(e=>e.remove());let t=this.gl;if(t)try{this.activeProgram&&t.deleteProgram(this.activeProgram),this.activeBuffer&&t.deleteBuffer(this.activeBuffer)}catch(e){console.error("[AnkiFX/Mandelbrot] Error deleting GPU state:",e)}this.gl=null,this.activeProgram=null,this.activeBuffer=null,this.resLoc=null}onContextLost(){this.gl=null,this.activeProgram=null,this.activeBuffer=null}onContextRestored(t){this.gl=t,this.init(t)}},Fe=null;function Zr(i,t={}){Fe&&Fe.destroy(),Fe=new ni(i,t),Fe.init(i.gl)}function en(){Fe&&(Fe.destroy(),Fe=null)}var Mt=null,li,ai,si=16,et=[];function xo(){let i=Math.floor(li/si);et=[];for(let t=0;t<i;t++)et[t]=Math.random()*-100}var yo={id:"matrix",name:"Matrix",run:tn,stop:on,onResize:(i,t)=>{li=i,ai=t,xo()},preferredTrack:{trackTitle:"nightfall"},marqueeFont:{color:"#0F0",shadowColor:"#0F0",shadowBlur:10}};function tn(i,t){let e=i.ctx2d;li=i.width,ai=i.height,xo();let o="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*]*";function r(){e.fillStyle="rgba(0, 0, 0, 0.1)",e.fillRect(0,0,li,ai),e.fillStyle="#0F0",e.font=si+"px monospace";for(let a=0;a<et.length;a++)if(et[a]>0||Math.random()>.95){let s=o.charAt(Math.floor(Math.random()*o.length)),n=et[a]*si;e.fillText(s,a*si,n),n>ai&&Math.random()>.975&&(et[a]=0),et[a]++}else et[a]+=.5;Mt=requestAnimationFrame(r)}Mt=requestAnimationFrame(r)}function on(){Mt&&(cancelAnimationFrame(Mt),Mt=null)}var wo={id:"none",name:"None",run:rn,stop:nn,marqueeFont:{color:"#ffffff",shadowColor:"rgba(0,0,0,0.8)",shadowBlur:5}};function rn(i,t){i.ctx2d.clearRect(0,0,i.width,i.height)}function nn(){}var ci=1.6180339887,qi=Math.PI,It=Math.PI*2,an=Math.PI*.5,G=360,ko=9,ji=0,Hi=1,he=2,de=3,rt=4,nt=5,Lt=6,Dt=7,fi=8,ui=9,hi=10,di=11,pi=12,sn=13,ln=14,cn=15,fn=1/240,un={unity:.28,flow:.18},hn={unity:.95,flow:.85},dn={unity:.04,flow:.07},Eo={unity:[],flow:[]},_o=[{h:220,s:85,l:52},{h:174,s:78,l:44},{h:235,s:70,l:38},{h:42,s:92,l:56}],be=["unity","flow"],ee=parseInt(localStorage.getItem("ankifx_quantum_mode")||"0",10);(isNaN(ee)||ee<0||ee>=be.length)&&(ee=0);var Xi=ee,bt=`
attribute vec2 position;
varying vec2 v_uv;
void main() {
    v_uv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
}
`,pn=`
precision mediump float;
uniform sampler2D u_tex;
uniform float u_decay;
varying vec2 v_uv;
void main() {
    float r = length(v_uv * 2.0 - 1.0);
    float d = 0.97 - 0.09 * smoothstep(0.4, 1.0, r);
    float tex = texture2D(u_tex, v_uv).r;
    gl_FragColor = vec4(tex * d * (u_decay / 0.97), 0.0, 0.0, 1.0);
}
`,mn=`
attribute vec2 a_pos;
attribute float a_amp;
uniform vec2 u_resolution;
uniform float u_mirrorX;
varying float v_amp;
void main() {
    vec2 pos = a_pos;
    if (u_mirrorX > 0.5) pos.x = u_resolution.x - pos.x;
    vec2 uv = pos / u_resolution;
    gl_Position = vec4(uv.x * 2.0 - 1.0, uv.y * 2.0 - 1.0, 0.0, 1.0);
    gl_PointSize = 2.0;
    v_amp = a_amp;
}
`,gn=`
precision mediump float;
varying float v_amp;
uniform float u_amount;
void main() {
    gl_FragColor = vec4(u_amount * v_amp, 0.0, 0.0, 1.0);
}
`,bn=`
attribute vec3 a_geom;
attribute vec2 a_pos;
attribute float a_rot;
attribute float a_kap;
attribute float a_len;
attribute float a_alpha;
attribute float a_sym;
attribute float a_hue;
attribute float a_amp;

uniform vec2 u_resolution;
uniform sampler2D u_memoryTex;
uniform float u_time;
uniform float u_mode;
uniform float u_isMemoryLayer;
uniform float u_mirrorX;

varying vec3 v_color;
varying float v_alpha;

vec3 hsv2rgb(float h, float s, float l) {
    float h_norm = h / 360.0;
    vec3 rgb = clamp(abs(mod(h_norm * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    return l + s * (rgb - 0.5) * (1.0 - abs(2.0 * l - 1.0));
}

void main() {
    v_color = vec3(0.0);
    v_alpha = 0.0;
    
    vec2 res = max(u_resolution, vec2(1.0));
    vec2 uv = a_pos / res;
    float m = texture2D(u_memoryTex, vec2(uv.x, uv.y)).r;

    float len = a_len;
    float alpha = a_alpha;
    float sym = a_sym;
    float rot = a_rot;
    float kap = a_kap;
    float hue = a_hue;
    float amp = a_amp;

    bool isActive = true;

    if (u_isMemoryLayer > 0.5) {
        if (m < 0.25) {
            isActive = false;
        } else {
            vec2 nxny = (uv - 0.5) * 2.0;
            float r = length(nxny);
            float theta = atan(nxny.y, nxny.x);
            float w1 = sin(r * 4.0 - u_time * 0.40);
            float w2 = cos(theta * 3.0 + u_time * 0.24);
            float w3 = sin(r * 2.2 + theta * 2.0 - u_time * 0.31);

            rot = theta + 1.5707963 + w1 * w2 * 0.6 + w3 * 0.2;
            kap = (w1 * 0.5 + 0.5) * 0.4;
            hue = 45.0 + 175.0 * (0.5 - 0.5 * cos(u_time * 0.033 + r * 0.4));
            amp = 0.5 + 0.25 * w1 + 0.25 * w2;
            
            sym = floor(4.0 + m * 8.0);
            len = 30.0 * 0.35 * m;
            alpha = (m - 0.25) / 0.75 * 0.35;
        }
    } else {
        if (u_mode < 0.5) {
            len += m * 10.0;
            alpha *= (1.0 + 1.5 * m);
        } else {
            alpha *= (1.0 + m);
        }
    }

    if (alpha < 0.005) {
        isActive = false;
    }

    float k = a_geom.x;
    float isInner = a_geom.y;
    float t = a_geom.z;

    float symFloor = floor(sym);
    float symFrac = fract(sym);

    float activeAlpha = alpha;
    float armAngle = rot + k * (6.28318530718 / max(1.0, symFloor));
    float lengthScale = 1.0;

    if (abs(k - symFloor) < 0.01) {
        if (symFrac > 0.01) {
            float fracStep = 6.28318530718 / max(1.0, sym);
            armAngle = rot + symFloor * fracStep;
            activeAlpha *= symFrac;
        } else {
            isActive = false;
        }
    } else if (k > symFloor + 0.01) {
        isActive = false;
    }

    if (isInner > 0.5) {
        armAngle += 3.14159265359 / max(1.0, abs(k - symFloor) < 0.01 ? sym : symFloor);
        lengthScale = 0.45;
        activeAlpha *= 0.4;
    }

    if (!isActive) {
        gl_Position = vec4(-2.0, -2.0, -2.0, 1.0);
        return;
    }

    float signKap = sign(kap);
    if (abs(signKap) < 0.01) signKap = 1.0;
    float perpAngle = armAngle + signKap * 1.57079632679;

    float cosA = cos(armAngle);
    float sinA = sin(armAngle);

    vec2 pos = vec2(0.0);
    float absKap = abs(kap);

    if (absKap < 0.001) {
        float dx = cosA * len * lengthScale * 0.5;
        float dy = sinA * len * lengthScale * 0.5;
        pos = a_pos + vec2(dx, dy) * (t - 0.5) * 2.0;
    } else {
        float radius = 1.0 / max(0.001, absKap);
        float halfAngle = min(2.66896259092, (len * lengthScale / radius) * 0.5);
        
        float perpCos = signKap == 1.0 ? -sinA : sinA;
        float perpSin = signKap == 1.0 ? cosA : -cosA;
        
        vec2 cx_arc = a_pos + vec2(perpCos, perpSin) * radius;
        
        float startAngle = perpAngle + 3.14159265359 - halfAngle * signKap;
        float endAngle = perpAngle + 3.14159265359 + halfAngle * signKap;
        
        float currentAngle = mix(startAngle, endAngle, t);
        pos = cx_arc + vec2(cos(currentAngle), sin(currentAngle)) * radius;
    }

    if (u_mirrorX > 0.5) {
        pos.x = res.x - pos.x;
    }
    gl_Position = vec4((pos.x / res.x) * 2.0 - 1.0, 1.0 - (pos.y / res.y) * 2.0, 0.0, 1.0);
    
    float normHue = clamp((hue - 45.0) / 175.0, 0.0, 1.0);
    vec3 c1 = vec3(220.0, 0.85, 0.52);
    vec3 c2 = vec3(174.0, 0.78, 0.44);
    vec3 c3 = vec3(235.0, 0.70, 0.38);
    vec3 c4 = vec3(42.0, 0.92, 0.56);
    
    float p = fract(normHue);
    float tf = p * 4.0;
    float idx = floor(tf);
    float fractT = fract(tf);
    
    vec3 colA = c1, colB = c2;
    if (idx < 0.5) { colA = c1; colB = c2; }
    else if (idx < 1.5) { colA = c2; colB = c3; }
    else if (idx < 2.5) { colA = c3; colB = c4; }
    else { colA = c4; colB = c1; }
    
    float hDiff = colB.x - colA.x;
    if (hDiff > 180.0) colB.x -= 360.0;
    else if (hDiff < -180.0) colB.x += 360.0;
    
    float outH = mod(colA.x + hDiff * fractT, 360.0);
    float outS = clamp(colA.y + (colB.y - colA.y) * fractT + (amp - 0.5) * 0.16, 0.0, 1.0);
    float outL = clamp(colA.z + (colB.z - colA.z) * fractT + (amp - 0.5) * 0.16, 0.0, 1.0);
    
    v_color = hsv2rgb(outH, outS, outL);
    v_alpha = activeAlpha;
}
`,vn=`
precision mediump float;
varying vec3 v_color;
varying float v_alpha;
void main() {
    gl_FragColor = vec4(v_color * v_alpha, v_alpha);
}
`,xn=`
attribute vec2 a_pos;
attribute float a_alpha;
uniform vec2 u_resolution;
uniform vec4 u_color;
varying vec4 v_color;
void main() {
    gl_Position = vec4((a_pos.x / u_resolution.x) * 2.0 - 1.0, 1.0 - (a_pos.y / u_resolution.y) * 2.0, 0.0, 1.0);
    v_color = u_color;
    if (a_alpha < 0.005) {
        v_color.a = 0.0;
    }
}
`,yn=`
precision mediump float;
varying vec4 v_color;
void main() {
    gl_FragColor = vec4(v_color.rgb * v_color.a, v_color.a);
}
`,wn=`
precision mediump float;
uniform sampler2D u_tex;
uniform float u_alpha;
uniform float u_isUnity;
uniform vec3 u_centerColor;
varying vec2 v_uv;

void main() {
    float m = texture2D(u_tex, vec2(v_uv.x, 1.0 - v_uv.y)).r;
    if (m < 0.005) {
        gl_FragColor = vec4(0.0);
        return;
    }
    vec3 col = u_centerColor;
    if (u_isUnity > 0.5 && m > 0.3) {
        float t = (m - 0.3) * 2.0;
        float ct = clamp(t * t * (3.0 - 2.0 * t), 0.0, 1.0);
        col = mix(u_centerColor, vec3(240.0/255.0, 180.0/255.0, 60.0/255.0), ct);
    }
    gl_FragColor = vec4(col * m * u_alpha, m * u_alpha);
}
`,kn=`
precision mediump float;
uniform vec2 u_resolution;
uniform vec3 u_color;
uniform float u_radius;
uniform float u_alphaBase;
varying vec2 v_uv;
void main() {
    vec2 px = v_uv * u_resolution;
    vec2 center = u_resolution * 0.5;
    float dist = length(px - center);
    if (dist > u_radius * 2.0) discard;
    float t = clamp(1.0 - dist / (u_radius * 2.0), 0.0, 1.0);
    float alpha = u_alphaBase * t;
    gl_FragColor = vec4(u_color * alpha, alpha);
}
`,En=`
precision mediump float;
uniform sampler2D u_tex;
uniform float u_fade;
varying vec2 v_uv;
void main() {
    vec4 tex = texture2D(u_tex, v_uv);
    vec4 fadeCol = vec4(2.0/255.0, 2.0/255.0, 8.0/255.0, u_fade);
    gl_FragColor = mix(tex, fadeCol, u_fade);
}
`,_n=`
precision mediump float;
uniform sampler2D u_tex;
varying vec2 v_uv;
void main() {
    gl_FragColor = texture2D(u_tex, v_uv);
}
`,Sn=`
precision mediump float;
uniform vec2 u_resolution;
varying vec2 v_uv;
void main() {
    vec2 px = v_uv * u_resolution;
    vec2 center = u_resolution * 0.5;
    float maxR = max(u_resolution.x, u_resolution.y) * 0.85 * 0.9;
    float dist = length(px - center);
    float t = clamp(dist / maxR, 0.0, 1.0);
    
    vec4 col0 = vec4(2.0/255.0, 3.0/255.0, 12.0/255.0, 0.35);
    vec4 col5 = vec4(0.0);
    vec4 col1 = vec4(2.0/255.0, 3.0/255.0, 12.0/255.0, 0.15);
    
    vec4 outCol;
    if (t < 0.5) {
        float mixT = t / 0.5;
        outCol = mix(col0, col5, mixT);
    } else {
        float mixT = (t - 0.5) / 0.5;
        outCol = mix(col5, col1, mixT);
    }
    gl_FragColor = vec4(outCol.rgb * outCol.a, outCol.a);
}
`,gi=class{constructor(t,e){this.contexts=t,this.config=e,this.destroyed=!1,this.gl=null,this.ext=null,this.progEntity=null,this.progChord=null,this.progStamp=null,this.decayObj=null,this.compositeObj=null,this.glowObj=null,this.fadeObj=null,this.copyObj=null,this.vignetteObj=null,this.progDecay=null,this.progComposite=null,this.progGlow=null,this.progFade=null,this.progCopy=null,this.progVignette=null,this.instanceBuffer=null,this.entityGeomVBO=null,this.chordIBO=null,this.memoryGridVBO=null,this.fboA=null,this.fboB=null,this.screenFboA=null,this.screenFboB=null,this.mW=0,this.mH=0,this.geomCount=0,this.memoryGridCount=0,this.currentW=t.width,this.currentH=t.height,this.dpr=t.dpr,this.fbosNeedClear=!0,this.time=0,this.wasFlowActive=!0,this.activeAttributes=new Uint8Array(16),this.activeDivisors=new Int32Array(16).fill(-1),this.gridCols=18,this.gridRows=20,this.entities=new Float32Array(G*16),this.eSeedR=new Float32Array(G),this.eSeedTheta=new Float32Array(G),this.entityGridMap=new Int32Array(G);for(let o=0;o<G;o++)this.entityGridMap[o]=o;this.instanceData=new Float32Array(G*ko),this.entitiesInit=!1,this.firstFrame=!0,this.transition=1,this.transitionSmooth=1,this.CHORD_PAIRS=[],this.chordCount=0,this.memoryGridData=null,this.animationId=null,this.f_angle=0,this.f_curvature=0,this.f_huePhase=0,this.f_amplitude=0,this.crgb={r:0,g:0,b:0}}init(t){if(this.gl=t,this.ext=t.getExtension("ANGLE_instanced_arrays"),!this.ext)throw console.error("[AnkiFX/Quantum] ANGLE_instanced_arrays missing!"),new Error("ANGLE_instanced_arrays extension not supported");this.progEntity=this.createProgram(bn,vn,"ENTITY"),this.progChord=this.createProgram(xn,yn,"CHORD"),this.progStamp=this.createProgram(mn,gn,"STAMP"),this.decayObj=ze(t,bt,pn),this.progDecay=this.decayObj.program,this.compositeObj=ze(t,bt,wn),this.progComposite=this.compositeObj.program,this.glowObj=ze(t,bt,kn),this.progGlow=this.glowObj.program,this.fadeObj=ze(t,bt,En),this.progFade=this.fadeObj.program,this.copyObj=ze(t,bt,_n),this.progCopy=this.copyObj.program,this.vignetteObj=ze(t,bt,Sn),this.progVignette=this.vignetteObj.program,this.cacheProgram(this.progEntity,["u_resolution","u_time","u_mode","u_memoryTex","u_isMemoryLayer","u_mirrorX"],["a_geom","a_pos","a_rot","a_kap","a_len","a_alpha","a_sym","a_hue","a_amp"]),this.cacheProgram(this.progChord,["u_color","u_resolution"],["a_pos","a_alpha"]),this.cacheProgram(this.progStamp,["u_resolution","u_mirrorX","u_amount"],["a_pos","a_amp"]),this.cacheProgram(this.progDecay,["u_tex","u_decay"],["position"]),this.cacheProgram(this.progComposite,["u_tex","u_alpha","u_isUnity","u_centerColor"],["position"]),this.cacheProgram(this.progGlow,["u_resolution","u_color","u_radius","u_alphaBase"],["position"]),this.cacheProgram(this.progFade,["u_tex","u_fade"],["position"]),this.cacheProgram(this.progCopy,["u_tex"],["position"]),this.cacheProgram(this.progVignette,["u_resolution"],["position"]),this.instanceBuffer=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,this.instanceBuffer),t.bufferData(t.ARRAY_BUFFER,this.instanceData.byteLength,t.DYNAMIC_DRAW),this.chordIBO=t.createBuffer(),this.entityGeomVBO=t.createBuffer();let e=14,o=16,r=new Float32Array(e*2*o*2*3),a=0;for(let s=0;s<e;s++)for(let n=0;n<2;n++)for(let l=0;l<o;l++){let u=l/o,h=(l+1)/o;r[a++]=s,r[a++]=n,r[a++]=u,r[a++]=s,r[a++]=n,r[a++]=h}this.geomCount=r.length/3,t.bindBuffer(t.ARRAY_BUFFER,this.entityGeomVBO),t.bufferData(t.ARRAY_BUFFER,r,t.STATIC_DRAW),this.activeAttributes.fill(0),this.activeDivisors.fill(-1),this.resizeFBOs(t),this.resizeScreenFBOs(t),this.updateMemoryGrid(t),this.initEntities(),this.animationId=requestAnimationFrame(this.loop)}loop=t=>{if(!this.destroyed&&!(typeof window<"u"&&window.AnkiFX&&window.AnkiFX.currentEffectId!=="quantum")){if(window.AnkiFX&&window.AnkiFX.isContextLost){this.animationId=requestAnimationFrame(this.loop);return}try{this.render(),this.animationId=requestAnimationFrame(this.loop)}catch(e){console.error("[AnkiFX/Quantum] Render loop execution crash:",e),window.AnkiFX&&typeof window.AnkiFX.onRenderFailure=="function"&&window.AnkiFX.onRenderFailure(e)}}};resize(t,e,o){this.currentW=t,this.currentH=e,this.dpr=o,this.updateGridDimensions(),this.gl&&(this.resizeFBOs(this.gl),this.resizeScreenFBOs(this.gl),this.updateMemoryGrid(this.gl))}compileShader(t,e,o="shader",r="shader"){let a=this.gl,s=a.createShader(t);if(a.shaderSource(s,e),a.compileShader(s),!a.getShaderParameter(s,a.COMPILE_STATUS)){let n=a.getShaderInfoLog(s);return console.error(`${o} ${r} compile error:
`,n),a.deleteShader(s),null}return s}createProgram(t,e,o="shader"){let r=this.gl,a=this.compileShader(r.VERTEX_SHADER,t,o,"vertex");if(!a)throw new Error(`${o}: vertex shader failed to compile`);let s=this.compileShader(r.FRAGMENT_SHADER,e,o,"fragment");if(!s)throw r.deleteShader(a),new Error(`${o}: fragment shader failed to compile`);let n=r.createProgram();return r.attachShader(n,a),r.attachShader(n,s),r.linkProgram(n),r.detachShader(n,a),r.detachShader(n,s),r.deleteShader(a),r.deleteShader(s),r.getProgramParameter(n,r.LINK_STATUS)?n:(console.error(`${o} link error:`),console.error(r.getProgramInfoLog(n)),r.deleteProgram(n),null)}createFBO(t,e){let o=this.gl,r=o.createTexture();o.bindTexture(o.TEXTURE_2D,r),o.texImage2D(o.TEXTURE_2D,0,o.RGBA,t,e,0,o.RGBA,o.UNSIGNED_BYTE,null),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE);let a=o.createFramebuffer();return o.bindFramebuffer(o.FRAMEBUFFER,a),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,r,0),{tex:r,fbo:a,w:t,h:e}}getGridDimensions(t,e){let o=18,r=20,a=1/0,s=t/e;for(let n=1;n<=G;n++)if(G%n===0){let l=G/n,u=Math.abs(n/l-s);u<a&&(a=u,r=l)}return o=G/r,{cols:o,rows:r}}buildUnityGridChords(t,e){let o=[];for(let r=0;r<e;r++)for(let a=0;a<t;a++){let s=r*t+a;a+1<t&&o.push(s,r*t+(a+1)),r+1<e&&o.push(s,(r+1)*t+a),a+1<t&&r+1<e&&o.push(s,(r+1)*t+(a+1)),a-1>=0&&r+1<e&&o.push(s,(r+1)*t+(a-1))}return o}updateGridDimensions(){let t=this.currentW||400,e=this.currentH||800,{cols:o,rows:r}=this.getGridDimensions(t,e);this.gridCols=o,this.gridRows=r,Eo.unity=this.buildUnityGridChords(this.gridCols,this.gridRows),be[ee]==="unity"&&(this.updateUnityChordsMapping(),this.chordCount=this.CHORD_PAIRS.length,this.updateChordIBO())}updateChordIBO(){!this.gl||!this.chordIBO||(this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,this.chordIBO),this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(this.CHORD_PAIRS),this.gl.DYNAMIC_DRAW))}evaluateF_from_r_theta(t,e,o){let r=Math.sin(t*4-o*.4),a=Math.cos(e*3+o*.24),s=Math.sin(t*2.2+e*2-o*.31);this.f_angle=e+an+r*a*.6+s*.2,this.f_curvature=r*.5+.5,this.f_huePhase=45+175*(.5-.5*Math.cos(o*.033+t*.4)),this.f_amplitude=.5+.25*r+.25*a}evaluateF(t,e,o){let r=Math.sqrt(t*t+e*e),a=Math.atan2(e,t);this.evaluateF_from_r_theta(r,a,o)}initEntities(){if(!this.entitiesInit){for(let t=0;t<G;t++){let e=t/G,o=It*e,r=It*(t*ci%1),a=Math.cos(o)*Math.cos(r),s=Math.sin(o)*Math.sin(r),n=t*16;this.entities[n+ji]=a,this.entities[n+Hi]=s,this.entities[n+he]=a,this.entities[n+de]=s,this.entities[n+rt]=0,this.entities[n+nt]=0,this.entities[n+Lt]=0,this.entities[n+Dt]=0,this.entities[n+fi]=0,this.entities[n+ui]=0,this.entities[n+hi]=12,this.entities[n+di]=0,this.entities[n+pi]=1,this.entities[n+sn]=1,this.entities[n+ln]=0,this.entities[n+cn]=.5,this.eSeedR[t]=Math.sqrt(a*a+s*s),this.eSeedTheta[t]=Math.atan2(s,a)}this.updateGridDimensions(),this.entitiesInit=!0,this.firstFrame=!0;for(let t=0;t<G;t++)this.entityGridMap[t]=t;be[ee]==="unity"?(this.updateUnityChordsMapping(),this.chordCount=this.CHORD_PAIRS.length):(this.CHORD_PAIRS=[],this.chordCount=0),this.updateChordIBO()}}matchEntitiesToGrid(){let t=[],e=this.currentW||400,o=this.currentH||800;for(let l=0;l<this.gridRows;l++)for(let u=0;u<this.gridCols;u++){let h=(u+.5)*(e/this.gridCols),c=(l+.5)*(o/this.gridRows);t.push({x:h,y:c,idx:l*this.gridCols+u})}let r=[];for(let l=0;l<G;l++){let u=l*16,h=this.entities[u+rt],c=this.entities[u+nt];for(let d=0;d<G;d++){let m=t[d],p=h-m.x,f=c-m.y,g=p*p+f*f;r.push({entityIdx:l,gridIdx:m.idx,distSq:g})}}r.sort((l,u)=>l.distSq-u.distSq);let a=new Uint8Array(G),s=new Uint8Array(G),n=0;for(let l=0;l<r.length;l++){let{entityIdx:u,gridIdx:h}=r[l];if(!a[u]&&!s[h]&&(this.entityGridMap[u]=h,a[u]=1,s[h]=1,n++,n===G))break}}updateUnityChordsMapping(){let t=new Int32Array(G);for(let r=0;r<G;r++)t[this.entityGridMap[r]]=r;let e=Eo.unity,o=[];for(let r=0;r<e.length;r+=2){let a=e[r],s=e[r+1];o.push(t[a],t[s])}this.CHORD_PAIRS=o}matchEntitiesToFlowOrbits(){let t=[];for(let s=0;s<G;s++){let n=s*16,l=this.entities[n+ji],u=this.entities[n+Hi],h=(l*.5+.5)*this.currentW,c=(u*.5+.5)*this.currentH;t.push({x:h,y:c,idx:s})}let e=[];for(let s=0;s<G;s++){let n=s*16,l=this.entities[n+rt],u=this.entities[n+nt];for(let h=0;h<G;h++){let c=t[h],d=l-c.x,m=u-c.y,p=d*d+m*m;e.push({entityIdx:s,flowIdx:c.idx,distSq:p})}}e.sort((s,n)=>s.distSq-n.distSq);let o=new Uint8Array(G),r=new Uint8Array(G),a=0;for(let s=0;s<e.length;s++){let{entityIdx:n,flowIdx:l}=e[s];if(!o[n]&&!r[l]){let u=n*16;if(this.entities[u+he]=this.entities[l*16+ji],this.entities[u+de]=this.entities[l*16+Hi],o[n]=1,r[l]=1,a++,a===G)break}}}cycleMode(){this.fbosNeedClear=!0,Xi=ee,ee=(ee+1)%be.length,this.transition=0,be[ee]==="unity"?(this.matchEntitiesToGrid(),this.updateUnityChordsMapping()):this.CHORD_PAIRS=[],this.updateChordIBO(),be[ee]==="flow"&&this.matchEntitiesToFlowOrbits(),localStorage.setItem("ankifx_quantum_mode",ee),Rt.controls?.[0]&&(Rt.controls[0].label=So(ee),typeof AnkiFX<"u"&&AnkiFX.renderEffectControls&&AnkiFX.renderEffectControls(Rt))}resizeFBOs(t){let o=Math.floor(this.currentW/4),r=Math.floor(this.currentH/4);(o!==this.mW||r!==this.mH)&&(this.mW=o,this.mH=r,this.fboA&&t.deleteFramebuffer(this.fboA.fbo),this.fboB&&t.deleteFramebuffer(this.fboB.fbo),this.fboA&&t.deleteTexture(this.fboA.tex),this.fboB&&t.deleteTexture(this.fboB.tex),this.fboA=this.createFBO(this.mW,this.mH),this.fboB=this.createFBO(this.mW,this.mH))}resizeScreenFBOs(t){let e=t.canvas.width,o=t.canvas.height;(!this.screenFboA||this.screenFboA.w!==e||this.screenFboA.h!==o)&&(this.screenFboA&&t.deleteFramebuffer(this.screenFboA.fbo),this.screenFboB&&t.deleteFramebuffer(this.screenFboB.fbo),this.screenFboA&&t.deleteTexture(this.screenFboA.tex),this.screenFboB&&t.deleteTexture(this.screenFboB.tex),this.screenFboA=this.createFBO(e,o),this.screenFboB=this.createFBO(e,o))}updateMemoryGrid(t){let o=Math.floor(this.currentW/30),r=Math.floor(this.currentH/30),a=o*r;(!this.memoryGridData||this.memoryGridData.length<a*2)&&(this.memoryGridData=new Float32Array(a*2));for(let s=0;s<a;s++){let n=s%o,l=Math.floor(s/o);this.memoryGridData[s*2]=(n+.5)*30,this.memoryGridData[s*2+1]=(l+.5)*30}this.memoryGridVBO||(this.memoryGridVBO=t.createBuffer()),t.bindBuffer(t.ARRAY_BUFFER,this.memoryGridVBO),t.bufferData(t.ARRAY_BUFFER,this.memoryGridData.subarray(0,a*2),t.STATIC_DRAW),this.memoryGridCount=a}clearFBOsDirect(t){if(!t)return;t.disable(t.SCISSOR_TEST),t.clearColor(0,0,0,0);let e=[this.fboA,this.fboB,this.screenFboA,this.screenFboB];for(let o=0;o<e.length;o++){let r=e[o];r&&r.fbo&&(t.bindFramebuffer(t.FRAMEBUFFER,r.fbo),t.clear(t.COLOR_BUFFER_BIT))}}updatePaletteColorRgb(t,e){let a=(Math.min(1,Math.max(0,(t-45)/175))%1+1)%1*4,s=Math.floor(a)%4,n=(s+1)%4,l=a-Math.floor(a),u=_o[s],h=_o[n],c=u.h,d=h.h,m=d-c;m>180?d-=360:m<-180&&(d+=360);let p=((c+(d-c)*l)%360+360)%360,f=u.s+(h.s-u.s)*l+(e-.5)*16,g=u.l+(h.l-u.l)*l+(e-.5)*16,w=Math.min(100,Math.max(0,f))/100,_=Math.min(100,Math.max(0,g))/100,j=p/30,R=w*Math.min(_,1-_),P=j%12;this.crgb.r=_-R*Math.max(-1,Math.min(P-3,9-P,1));let v=(8+j)%12;this.crgb.g=_-R*Math.max(-1,Math.min(v-3,9-v,1));let k=(4+j)%12;this.crgb.b=_-R*Math.max(-1,Math.min(k-3,9-k,1))}cacheProgram(t,e,o){if(!t)return;let r=this.gl;t.uniforms={};for(let a=0;a<e.length;a++){let s=e[a];t.uniforms[s]=r.getUniformLocation(t,s)}t.attribs={};for(let a=0;a<o.length;a++){let s=o[a];t.attribs[s]=r.getAttribLocation(t,s)}}setupAttrib(t,e,o,r,a){if(t<0)return;let s=this.gl;this.activeAttributes[t]===0&&(s.enableVertexAttribArray(t),this.activeAttributes[t]=1),s.vertexAttribPointer(t,e,s.FLOAT,!1,o,r),this.activeDivisors[t]!==a&&(this.ext.vertexAttribDivisorANGLE(t,a),this.activeDivisors[t]=a)}setupQuadAttributes(t,e){let o=this.gl;o.bindBuffer(o.ARRAY_BUFFER,e);let r=t.attribs.position;r>=0&&this.setupAttrib(r,2,8,0,0);for(let a=0;a<16;a++)a!==r&&this.activeAttributes[a]===1&&(o.disableVertexAttribArray(a),this.activeAttributes[a]=0,this.activeDivisors[a]!==0&&(this.ext.vertexAttribDivisorANGLE(a,0),this.activeDivisors[a]=0))}setupStampAttributes(){let t=this.gl;t.bindBuffer(t.ARRAY_BUFFER,this.instanceBuffer);let e=this.progStamp.attribs.a_pos,o=this.progStamp.attribs.a_amp;e>=0&&this.setupAttrib(e,2,36,0,0),o>=0&&this.setupAttrib(o,1,36,32,0);for(let r=0;r<16;r++)r!==e&&r!==o&&this.activeAttributes[r]===1&&(t.disableVertexAttribArray(r),this.activeAttributes[r]=0,this.activeDivisors[r]!==0&&(this.ext.vertexAttribDivisorANGLE(r,0),this.activeDivisors[r]=0))}setupChordAttributes(){let t=this.gl;t.bindBuffer(t.ARRAY_BUFFER,this.instanceBuffer);let e=this.progChord.attribs.a_pos,o=this.progChord.attribs.a_alpha;e>=0&&this.setupAttrib(e,2,36,0,0),o>=0&&this.setupAttrib(o,1,36,20,0);for(let r=0;r<16;r++)r!==e&&r!==o&&this.activeAttributes[r]===1&&(t.disableVertexAttribArray(r),this.activeAttributes[r]=0,this.activeDivisors[r]!==0&&(this.ext.vertexAttribDivisorANGLE(r,0),this.activeDivisors[r]=0))}setupEntityAttributes(t){let e=this.gl;e.bindBuffer(e.ARRAY_BUFFER,this.entityGeomVBO);let o=this.progEntity.attribs.a_geom;o>=0&&this.setupAttrib(o,3,12,0,0);let r=this.progEntity.attribs.a_pos,a=this.progEntity.attribs.a_rot,s=this.progEntity.attribs.a_kap,n=this.progEntity.attribs.a_len,l=this.progEntity.attribs.a_alpha,u=this.progEntity.attribs.a_sym,h=this.progEntity.attribs.a_hue,c=this.progEntity.attribs.a_amp;if(t){e.bindBuffer(e.ARRAY_BUFFER,this.memoryGridVBO),r>=0&&this.setupAttrib(r,2,8,0,0);for(let d=0;d<16;d++)d!==o&&d!==r&&this.activeAttributes[d]===1&&(e.disableVertexAttribArray(d),this.activeAttributes[d]=0,this.activeDivisors[d]!==0&&(this.ext.vertexAttribDivisorANGLE(d,0),this.activeDivisors[d]=0))}else{e.bindBuffer(e.ARRAY_BUFFER,this.instanceBuffer),r>=0&&this.setupAttrib(r,2,36,0,1),a>=0&&this.setupAttrib(a,1,36,8,1),s>=0&&this.setupAttrib(s,1,36,12,1),n>=0&&this.setupAttrib(n,1,36,16,1),l>=0&&this.setupAttrib(l,1,36,20,1),u>=0&&this.setupAttrib(u,1,36,24,1),h>=0&&this.setupAttrib(h,1,36,28,1),c>=0&&this.setupAttrib(c,1,36,32,1);for(let d=0;d<16;d++)d!==o&&d!==r&&d!==a&&d!==s&&d!==n&&d!==l&&d!==u&&d!==h&&d!==c&&this.activeAttributes[d]===1&&(e.disableVertexAttribArray(d),this.activeAttributes[d]=0,this.activeDivisors[d]!==0&&(this.ext.vertexAttribDivisorANGLE(d,0),this.activeDivisors[d]=0))}}render(){let t=this.gl;if(!t||this.destroyed)return;this.time+=.012,this.transition<1&&(this.transition=Math.min(1,this.transition+fn)),this.transitionSmooth=this.transition*this.transition*(3-2*this.transition),this.evaluateF_from_r_theta(0,0,this.time);let e=this.f_huePhase,o=this.f_amplitude,r=be[ee]==="flow"||this.transition<1&&be[Xi]==="flow",a=this.transitionSmooth;for(let h=0;h<G;h++){let c=h*16,d=0,m=0,p=0,f=0,g=0,w=0,_=0,j=0,R=0,P=0,v=0,k=0,E=0,x=0;if(this.transition<1){if(ee===0){this.evaluateF_from_r_theta(this.eSeedR[h],this.eSeedTheta[h],this.time);let T=this.entityGridMap[h],A=T%this.gridCols,O=Math.floor(T/this.gridCols);d=(A+.5)*(this.currentW/this.gridCols),m=(O+.5)*(this.currentH/this.gridRows),p=this.f_curvature*qi*.6+this.f_angle*.12,f=26,g=(this.f_curvature-.5)*.3,_=8,w=.52*Math.max(.35,this.f_amplitude)*.4}else{let T=this.entities[c+he],A=this.entities[c+de],O=Math.sqrt(T*T+A*A),C=Math.atan2(A,T);this.evaluateF_from_r_theta(O,C,this.time);let I=.28*mi(.05,.25,O),B=C+ci/Math.max(.15,O)*I,z=.0012+this.f_amplitude*.0018;if(this.entities[c+he]+=(Math.cos(this.f_angle)*(1-I)+Math.cos(B)*I)*z,this.entities[c+de]+=(Math.sin(this.f_angle)*(1-I)+Math.sin(B)*I)*z,Math.abs(this.entities[c+he])>1.1||Math.abs(this.entities[c+de])>1.1){let D=Math.sqrt(Math.random()),F=Math.random()*It;this.entities[c+he]=Math.cos(F)*D,this.entities[c+de]=Math.sin(F)*D}d=(this.entities[c+he]*.5+.5)*this.currentW,m=(this.entities[c+de]*.5+.5)*this.currentH,p=this.f_angle,f=80+this.f_amplitude*40,g=(this.f_curvature-.5)*3.5,_=6,w=.28*.5}if(Xi===0){this.evaluateF_from_r_theta(this.eSeedR[h],this.eSeedTheta[h],this.time);let T=this.entityGridMap[h],A=T%this.gridCols,O=Math.floor(T/this.gridCols);j=(A+.5)*(this.currentW/this.gridCols),R=(O+.5)*(this.currentH/this.gridRows),P=this.f_curvature*qi*.6+this.f_angle*.12,v=26,k=(this.f_curvature-.5)*.3,x=8,E=.52*Math.max(.35,this.f_amplitude)*.4}else{let T=this.entities[c+he],A=this.entities[c+de],O=Math.sqrt(T*T+A*A),C=Math.atan2(A,T);if(this.evaluateF_from_r_theta(O,C,this.time),ee===0){let I=.28*mi(.05,.25,O),B=C+ci/Math.max(.15,O)*I,z=.0012+this.f_amplitude*.0018;if(this.entities[c+he]+=(Math.cos(this.f_angle)*(1-I)+Math.cos(B)*I)*z,this.entities[c+de]+=(Math.sin(this.f_angle)*(1-I)+Math.sin(B)*I)*z,Math.abs(this.entities[c+he])>1.1||Math.abs(this.entities[c+de])>1.1){let D=Math.sqrt(Math.random()),F=Math.random()*It;this.entities[c+he]=Math.cos(F)*D,this.entities[c+de]=Math.sin(F)*D}}j=(this.entities[c+he]*.5+.5)*this.currentW,R=(this.entities[c+de]*.5+.5)*this.currentH,P=this.f_angle,v=80+this.f_amplitude*40,k=(this.f_curvature-.5)*3.5,x=6,E=.28*.5}let M=p-P;M=Math.atan2(Math.sin(M),Math.cos(M)),this.entities[c+Lt]=j+(d-j)*a,this.entities[c+Dt]=R+(m-R)*a,this.entities[c+ui]=P+M*a,this.entities[c+hi]=v+(f-v)*a,this.entities[c+di]=k+(g-k)*a,this.entities[c+fi]=E+(w-E)*a,this.entities[c+pi]=x+(_-x)*a}else{if(ee===0){this.evaluateF_from_r_theta(this.eSeedR[h],this.eSeedTheta[h],this.time);let M=this.entityGridMap[h],T=M%this.gridCols,A=Math.floor(M/this.gridCols);d=(T+.5)*(this.currentW/this.gridCols),m=(A+.5)*(this.currentH/this.gridRows),p=this.f_curvature*qi*.6+this.f_angle*.12,f=26,g=(this.f_curvature-.5)*.3,_=8,w=.52*Math.max(.35,this.f_amplitude)*.4}else{let M=this.entities[c+he],T=this.entities[c+de],A=Math.sqrt(M*M+T*T),O=Math.atan2(T,M);this.evaluateF_from_r_theta(A,O,this.time);let C=.28*mi(.05,.25,A),I=O+ci/Math.max(.15,A)*C,B=.0012+this.f_amplitude*.0018;if(this.entities[c+he]+=(Math.cos(this.f_angle)*(1-C)+Math.cos(I)*C)*B,this.entities[c+de]+=(Math.sin(this.f_angle)*(1-C)+Math.sin(I)*C)*B,Math.abs(this.entities[c+he])>1.1||Math.abs(this.entities[c+de])>1.1){let z=Math.sqrt(Math.random()),D=Math.random()*It;this.entities[c+he]=Math.cos(D)*z,this.entities[c+de]=Math.sin(D)*z}d=(this.entities[c+he]*.5+.5)*this.currentW,m=(this.entities[c+de]*.5+.5)*this.currentH,p=this.f_angle,f=80+this.f_amplitude*40,g=(this.f_curvature-.5)*3.5,_=6,w=.28*.5}this.entities[c+Lt]=d,this.entities[c+Dt]=m,this.entities[c+ui]=p,this.entities[c+hi]=f,this.entities[c+di]=g,this.entities[c+fi]=w,this.entities[c+pi]=_}this.firstFrame?(this.entities[c+rt]=this.entities[c+Lt],this.entities[c+nt]=this.entities[c+Dt]):(this.entities[c+rt]+=(this.entities[c+Lt]-this.entities[c+rt])*.08,this.entities[c+nt]+=(this.entities[c+Dt]-this.entities[c+nt])*.08);let y=h*ko;this.instanceData[y+0]=this.entities[c+rt],this.instanceData[y+1]=this.entities[c+nt],this.instanceData[y+2]=this.entities[c+ui],this.instanceData[y+3]=this.entities[c+di],this.instanceData[y+4]=this.entities[c+hi],this.instanceData[y+5]=this.entities[c+fi],this.instanceData[y+6]=this.entities[c+pi],this.instanceData[y+7]=this.f_huePhase,this.instanceData[y+8]=this.f_amplitude}this.firstFrame=!1,t.bindBuffer(t.ARRAY_BUFFER,this.instanceBuffer),t.bufferSubData(t.ARRAY_BUFFER,0,this.instanceData),r?this.chordCount!==0&&(this.CHORD_PAIRS=[],this.chordCount=0,this.updateChordIBO()):be[ee]==="unity"&&(this.chordCount===0||this.wasFlowActive)&&(this.fbosNeedClear=!0,this.updateUnityChordsMapping(),this.chordCount=this.CHORD_PAIRS.length,this.updateChordIBO()),this.wasFlowActive=r,this.fbosNeedClear&&(this.clearFBOsDirect(t),this.fbosNeedClear=!1),t.bindFramebuffer(t.FRAMEBUFFER,this.fboB.fbo),t.viewport(0,0,this.mW,this.mH),t.disable(t.BLEND),t.useProgram(this.progDecay),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,this.fboA.tex),t.uniform1i(this.progDecay.uniforms.u_tex,0),t.uniform1f(this.progDecay.uniforms.u_decay,hn[be[ee]]),this.setupQuadAttributes(this.progDecay,this.decayObj.buffer),t.drawArrays(t.TRIANGLE_STRIP,0,4),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE),t.useProgram(this.progStamp),t.uniform2f(this.progStamp.uniforms.u_resolution,this.currentW,this.currentH),t.uniform1f(this.progStamp.uniforms.u_mirrorX,0),t.uniform1f(this.progStamp.uniforms.u_amount,.004),this.setupStampAttributes(),t.drawArrays(t.POINTS,0,G),r&&(t.uniform1f(this.progStamp.uniforms.u_mirrorX,1),t.uniform1f(this.progStamp.uniforms.u_amount,.002),t.drawArrays(t.POINTS,0,G)),t.disable(t.BLEND);let s=this.fboA;this.fboA=this.fboB,this.fboB=s,t.bindFramebuffer(t.FRAMEBUFFER,this.screenFboB.fbo),t.viewport(0,0,this.screenFboB.w,this.screenFboB.h),t.useProgram(this.progFade),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,this.screenFboA.tex),t.uniform1i(this.progFade.uniforms.u_tex,0),t.uniform1f(this.progFade.uniforms.u_fade,dn[be[ee]]),this.setupQuadAttributes(this.progFade,this.fadeObj.buffer),t.drawArrays(t.TRIANGLE_STRIP,0,4),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE);let n=t.canvas.width/this.currentW;t.useProgram(this.progGlow),t.uniform2f(this.progGlow.uniforms.u_resolution,t.canvas.width,t.canvas.height),this.updatePaletteColorRgb(e,o),t.uniform3f(this.progGlow.uniforms.u_color,this.crgb.r,this.crgb.g,this.crgb.b);let l=(18+8*o)*(.97+o*.06);if(t.uniform1f(this.progGlow.uniforms.u_radius,l*n),t.uniform1f(this.progGlow.uniforms.u_alphaBase,.08*o),this.setupQuadAttributes(this.progGlow,this.glowObj.buffer),t.drawArrays(t.TRIANGLE_STRIP,0,4),be[ee]==="unity"&&this.chordCount>0){t.useProgram(this.progChord);let h=mi(.9,1,this.transition),c=(.06+.04*o)*h;t.uniform4f(this.progChord.uniforms.u_color,this.crgb.r,this.crgb.g,this.crgb.b,c),t.uniform2f(this.progChord.uniforms.u_resolution,this.currentW,this.currentH),this.setupChordAttributes(),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,this.chordIBO),t.drawElements(t.LINES,this.chordCount,t.UNSIGNED_SHORT,0)}t.useProgram(this.progEntity),t.uniform2f(this.progEntity.uniforms.u_resolution,this.currentW,this.currentH),t.uniform1f(this.progEntity.uniforms.u_time,this.time),t.uniform1f(this.progEntity.uniforms.u_mode,ee),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,this.fboA.tex),t.uniform1i(this.progEntity.uniforms.u_memoryTex,0),this.setupEntityAttributes(!1),t.uniform1f(this.progEntity.uniforms.u_isMemoryLayer,0),t.uniform1f(this.progEntity.uniforms.u_mirrorX,0),this.ext.drawArraysInstancedANGLE(t.LINES,0,this.geomCount,G),r&&(t.uniform1f(this.progEntity.uniforms.u_mirrorX,1),this.ext.drawArraysInstancedANGLE(t.LINES,0,this.geomCount,G)),t.uniform1f(this.progEntity.uniforms.u_isMemoryLayer,1),t.uniform1f(this.progEntity.uniforms.u_mirrorX,0),this.setupEntityAttributes(!0),this.ext.drawArraysInstancedANGLE(t.LINES,0,this.geomCount,this.memoryGridCount),t.useProgram(this.progComposite),t.uniform1f(this.progComposite.uniforms.u_alpha,un[be[ee]]),t.uniform1f(this.progComposite.uniforms.u_isUnity,be[ee]==="unity"?1:0),t.uniform3f(this.progComposite.uniforms.u_centerColor,this.crgb.r,this.crgb.g,this.crgb.b),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,this.fboA.tex),this.setupQuadAttributes(this.progComposite,this.compositeObj.buffer),t.drawArrays(t.TRIANGLE_STRIP,0,4);let u=this.screenFboA;this.screenFboA=this.screenFboB,this.screenFboB=u,t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,t.canvas.width,t.canvas.height),t.disable(t.BLEND),t.useProgram(this.progCopy),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,this.screenFboA.tex),this.setupQuadAttributes(this.progCopy,this.copyObj.buffer),t.drawArrays(t.TRIANGLE_STRIP,0,4),t.enable(t.BLEND),t.blendFunc(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA),t.useProgram(this.progVignette),t.uniform2f(this.progVignette.uniforms.u_resolution,t.canvas.width,t.canvas.height),this.setupQuadAttributes(this.progVignette,this.vignetteObj.buffer),t.drawArrays(t.TRIANGLE_STRIP,0,4)}destroy(){if(this.destroyed)return;this.destroyed=!0,ve===this&&(ve=null),this.animationId&&(cancelAnimationFrame(this.animationId),this.animationId=null);let t=this.gl;if(t)try{this.instanceBuffer&&t.deleteBuffer(this.instanceBuffer),this.entityGeomVBO&&t.deleteBuffer(this.entityGeomVBO),this.chordIBO&&t.deleteBuffer(this.chordIBO),this.memoryGridVBO&&t.deleteBuffer(this.memoryGridVBO),this.decayObj&&this.decayObj.buffer&&t.deleteBuffer(this.decayObj.buffer),this.compositeObj&&this.compositeObj.buffer&&t.deleteBuffer(this.compositeObj.buffer),this.glowObj&&this.glowObj.buffer&&t.deleteBuffer(this.glowObj.buffer),this.fadeObj&&this.fadeObj.buffer&&t.deleteBuffer(this.fadeObj.buffer),this.copyObj&&this.copyObj.buffer&&t.deleteBuffer(this.copyObj.buffer),this.vignetteObj&&this.vignetteObj.buffer&&t.deleteBuffer(this.vignetteObj.buffer),this.fboA&&(t.deleteFramebuffer(this.fboA.fbo),t.deleteTexture(this.fboA.tex)),this.fboB&&(t.deleteFramebuffer(this.fboB.fbo),t.deleteTexture(this.fboB.tex)),this.screenFboA&&(t.deleteFramebuffer(this.screenFboA.fbo),t.deleteTexture(this.screenFboA.tex)),this.screenFboB&&(t.deleteFramebuffer(this.screenFboB.fbo),t.deleteTexture(this.screenFboB.tex)),this.progEntity&&t.deleteProgram(this.progEntity),this.progChord&&t.deleteProgram(this.progChord),this.progStamp&&t.deleteProgram(this.progStamp),this.progDecay&&t.deleteProgram(this.progDecay),this.progComposite&&t.deleteProgram(this.progComposite),this.progGlow&&t.deleteProgram(this.progGlow),this.progFade&&t.deleteProgram(this.progFade),this.progCopy&&t.deleteProgram(this.progCopy),this.progVignette&&t.deleteProgram(this.progVignette)}catch(e){console.error("[AnkiFX/Quantum] Error releasing GPU resources in destroy:",e)}this.gl=null,this.ext=null,this.progEntity=null,this.progChord=null,this.progStamp=null,this.decayObj=null,this.compositeObj=null,this.glowObj=null,this.fadeObj=null,this.copyObj=null,this.vignetteObj=null,this.progDecay=null,this.progComposite=null,this.progGlow=null,this.progFade=null,this.progCopy=null,this.progVignette=null,this.instanceBuffer=null,this.entityGeomVBO=null,this.chordIBO=null,this.memoryGridVBO=null,this.fboA=null,this.fboB=null,this.screenFboA=null,this.screenFboB=null}onContextLost(){this.gl=null,this.ext=null,this.progEntity=null,this.progChord=null,this.progStamp=null,this.decayObj=null,this.compositeObj=null,this.glowObj=null,this.fadeObj=null,this.copyObj=null,this.vignetteObj=null,this.progDecay=null,this.progComposite=null,this.progGlow=null,this.progFade=null,this.progCopy=null,this.progVignette=null,this.instanceBuffer=null,this.entityGeomVBO=null,this.chordIBO=null,this.memoryGridVBO=null,this.fboA=null,this.fboB=null,this.screenFboA=null,this.screenFboB=null}onContextRestored(t){this.gl=t,this.init(t)}},ve=null;function An(i,t){ve&&ve.destroy(),ve=new gi(i,t),ve.init(i.gl)}function Cn(){ve&&(ve.destroy(),ve=null)}var Rt={id:"quantum",name:"Quantum",isWebGL:!0,createInstance(i,t){return ve=new gi(i,t),ve},run:An,stop:Cn,onResize:(i,t,e)=>{ve&&ve.resize(i,t,e)},controls:[{type:"button",id:"quantum-mode-switch",label:So(ee),onClick:()=>{ve&&ve.cycleMode()}}],marqueeFont:{colorFn:(i,t)=>{let r=Math.sin(0-i*.016*.4),a=Math.cos(0+i*.016*.24),s=Math.sin(0*2.2+0-i*.016*.31),n=45+175*(.5-.5*Math.cos(i*.016*.033+0*.4)),l=.5+.25*r+.25*a;return`hsl(${((n-45)/175+t*.02)%1*360}, ${70+l*30}%, 60%)`},shadowColor:"rgba(255, 215, 0, 0.35)",shadowBlur:14}};function So(i){switch(be[i]){case"unity":return"\u{1F441}\uFE0F UNITY MODE";case"flow":return"\u{1F30A} FLOW MODE";default:return"\u{1F441}\uFE0F MODE"}}function mi(i,t,e){let o=Math.min(1,Math.max(0,(e-i)/(t-i)));return o*o*(3-2*o)}var Ot=null,fe,Ve,at={id:"starfield",name:"Starfield",run:Fn,stop:Pn,onResize:(i,t)=>{fe=i,Ve=t},preferredTrack:{trackTitle:"star wars title"},marqueeFont:{color:"#FFE81F",shadowColor:"#FFE81F",shadowBlur:20,outline:"#000"}};function Fn(i,t){let e=i.ctx2d;fe=i.width,Ve=i.height;let o=localStorage.getItem("ankifx_starfield_planets")!=="false";at.controls=[{type:"button",id:"starfield-planet-toggle",label:o?"\u{1FA90} DISABLE PLANET":"\u{1FA90} ENABLE PLANET",onClick:()=>{o=!o,localStorage.setItem("ankifx_starfield_planets",o),at.controls&&at.controls[0]&&(at.controls[0].label=o?"\u{1FA90} DISABLE PLANET":"\u{1FA90} ENABLE PLANET",AnkiFX.renderEffectControls(at))}}];let r=[],a=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1,s=3500,n=navigator.hardwareConcurrency;typeof n=="number"&&n>0&&!isNaN(n)&&(a?n<=4?s=1500:n<=8?s=3500:s=5e3:n<=4?s=4e3:s=8e3);let l=Math.min(8e3,Math.max(1e3,s)),u=new Uint8Array(512),h=new Uint8Array(256).map(()=>Math.random()*256);for(let P=0;P<512;P++)u[P]=h[P&255];let c=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]];function d(P,v,k,E){return P[0]*v+P[1]*k+P[2]*E}function m(P,v,k){let E,x,y,M,T=.3333333333333333,A=1/6,O=(P+v+k)*T,C=Math.floor(P+O),I=Math.floor(v+O),B=Math.floor(k+O),z=(C+I+B)*A,D=P-C+z,F=v-I+z,X=k-B+z,J,$,re,ne,Q,ue;D>=F?F>=X?(J=1,$=0,re=0,ne=1,Q=1,ue=0):D>=X?(J=1,$=0,re=0,ne=1,Q=0,ue=1):(J=0,$=0,re=1,ne=1,Q=0,ue=1):F<X?(J=0,$=0,re=1,ne=0,Q=1,ue=1):D<X?(J=0,$=1,re=0,ne=0,Q=1,ue=1):(J=0,$=1,re=0,ne=1,Q=1,ue=0);let _e=D-J+A,Ke=F-$+A,Ne=X-re+A,S=D-ne+2*A,L=F-Q+2*A,V=X-ue+2*A,H=D-1+3*A,oe=F-1+3*A,ye=X-1+3*A,Te=C&255,Le=I&255,De=B&255,Me=.6-D*D-F*F-X*X;Me<0?E=0:(Me*=Me,E=Me*Me*d(c[u[Te+u[Le+u[De]]]%12],D,F,X));let we=.6-_e*_e-Ke*Ke-Ne*Ne;we<0?x=0:(we*=we,x=we*we*d(c[u[Te+J+u[Le+$+u[De+re]]]%12],_e,Ke,Ne));let qe=.6-S*S-L*L-V*V;qe<0?y=0:(qe*=qe,y=qe*qe*d(c[u[Te+ne+u[Le+Q+u[De+ue]]]%12],S,L,V));let U=.6-H*H-oe*oe-ye*ye;return U<0?M=0:(U*=U,M=U*U*d(c[u[Te+1+u[Le+1+u[De+1]]]%12],H,oe,ye)),32*(E+x+y+M)}function p(P,v,k,E=3){let x=0,y=.5;for(let M=0;M<E;M++)x+=m(P,v,k)*y,P*=2,v*=2,k*=2,y*=.5;return x}let f={};class g{constructor(){this.active=!1,this.nextSpawn=Date.now()+2e3}reset(){let v=Math.random()*Math.PI*2,k=.2+Math.random()*.4;this.x=Math.cos(v)*fe*k,this.y=Math.sin(v)*Ve*k,this.z=fe,this.sizeBase=80+Math.random()*120,this.speed=.8,this.active=!0,this.type=1+Math.floor(Math.random()*2);let E=[{name:"ice",baseH:190+Math.random()*40,sat:60,l:70},{name:"inferno",baseH:Math.random()*40,sat:80,l:60},{name:"toxic",baseH:80+Math.random()*40,sat:70,l:60},{name:"ethereal",baseH:260+Math.random()*40,sat:60,l:75},{name:"classic",baseH:30+Math.random()*20,sat:50,l:80}],x=E[Math.floor(Math.random()*E.length)];f[x.name]?this.textureCanvas=f[x.name]:(this.generateGasGiantTexture(x),f[x.name]=this.textureCanvas),this.type===2&&(this.rings=Array.from({length:4},(y,M)=>({r1:1.6+M*.2,opacity:.2+Math.random()*.4})))}hslToRgb(v,k,E){v/=360,k/=100,E/=100;let x,y,M;if(k===0)x=y=M=E;else{let T=E<.5?E*(1+k):E+k-E*k,A=2*E-T,O=C=>(C<0&&(C+=1),C>1&&(C-=1),C<1/6?A+(T-A)*6*C:C<1/2?T:C<2/3?A+(T-A)*(2/3-C)*6:A);x=O(v+1/3),y=O(v),M=O(v-1/3)}return{r:x*255,g:y*255,b:M*255}}generateGasGiantTexture(v){let k=document.createElement("canvas");k.width=k.height=128;let E=k.getContext("2d"),x=E.createImageData(128,128),y=v.baseH,M=this.hslToRgb(y,v.sat,v.l),T=this.hslToRgb((y+20)%360,v.sat+10,v.l-10),A=this.hslToRgb((y-40+360)%360,v.sat+20,v.l-15),O=this.hslToRgb((y+60)%360,v.sat-20,v.l+10),C=(B,z,D)=>({r:B.r+(z.r-B.r)*D,g:B.g+(z.g-B.g)*D,b:B.b+(z.b-B.b)*D}),I=Math.random()*1e3;for(let B=0;B<128;B++)for(let z=0;z<128;z++){let D=B/128*10,F=z/128*10,X=Math.abs(p(0,D*.4,I,3)),J=D+p(F*.5,D*.5,I)*X*4,$=F+p(D*.5,F*.5,I+50)*X*2,re=(p(0,J*.8,I+100,4)+1)/2,ne=(p($*.1,J*1.5,I+200,2)+1)/2,Q=C(T,M,re);re>.7&&(Q=C(Q,O,(re-.7)*2)),ne>.6&&(Q=C(Q,A,(ne-.6)*1.5));let ue=1+p($,J,I+300,2)*.2,_e=(B*128+z)*4;x.data[_e]=Math.min(255,Q.r*ue),x.data[_e+1]=Math.min(255,Q.g*ue),x.data[_e+2]=Math.min(255,Q.b*ue),x.data[_e+3]=255}E.putImageData(x,0,0),this.textureCanvas=k}update(){if(!this.active){Date.now()>this.nextSpawn&&this.reset();return}this.z-=this.speed,this.z<=0&&(this.active=!1,this.nextSpawn=Date.now())}draw(v){if(!this.active)return;let k=fe/2/this.z,E=this.x*k+fe/2,x=this.y*k+Ve/2,y=(1-this.z/fe)*this.sizeBase;if(E<-y*3||E>fe+y*3||x<-y*3||x>Ve+y*3)return;v.save(),v.translate(E,x),this.type===2&&(this.drawRings(v,y,!0),v.globalAlpha=1);let M=v.createRadialGradient(0,0,y*.9,0,0,y*1.5);M.addColorStop(0,"rgba(255, 255, 255, 0.15)"),M.addColorStop(1,"rgba(0,0,0,0)"),v.fillStyle=M,v.beginPath(),v.arc(0,0,y*1.5,0,Math.PI*2),v.fill(),v.save(),v.beginPath(),v.arc(0,0,y,0,Math.PI*2),v.clip(),v.globalAlpha=1,v.drawImage(this.textureCanvas,-y,-y,y*2,y*2);let T=v.createRadialGradient(-y*.5,-y*.5,y*.1,0,0,y);T.addColorStop(0,"rgba(255, 255, 255, 0.25)"),T.addColorStop(.5,"rgba(0, 0, 0, 0)"),T.addColorStop(1,"rgba(0, 0, 0, 0.4)"),v.fillStyle=T,v.fillRect(-y,-y,y*2,y*2),v.restore();let A=v.createRadialGradient(0,0,y*.7,0,0,y);A.addColorStop(1,"rgba(255,255,255,0.4)"),A.addColorStop(.8,"rgba(255,255,255,0)"),v.fillStyle=A,v.beginPath(),v.arc(0,0,y,0,Math.PI*2),v.fill(),this.type===2&&(this.drawRings(v,y,!1),v.globalAlpha=1),v.restore()}drawRings(v,k,E){v.save();let x=Math.PI/8;for(let y of this.rings)v.globalAlpha=y.opacity,v.strokeStyle="#E6E6FA",v.lineWidth=k*.15,v.beginPath(),v.ellipse(0,0,y.r1*k,y.r1*.3*k,x,0,Math.PI*2),v.stroke();v.restore()}}let w=new g,_=["#FFFFFF","#FFE4B5","#E0FFFF","#FFF0F5","#F0F8FF"];for(let P=0;P<l;P++)r.push({x:(Math.random()-.5)*fe*4,y:(Math.random()-.5)*Ve*4,z:Math.random()*fe,color:_[Math.floor(Math.random()*_.length)],sizeBase:2+Math.random()*2.5});let j=0;function R(){e.fillStyle="rgba(5, 5, 12, 1)",e.fillRect(0,0,fe,Ve);let P=fe/2,v=Ve/2;j+=.01,o?(w.update(),w.draw(e)):w.active=!1;for(let k=0;k<l;k++){let E=r[k],x=E.z;if(E.z-=4,E.z<=0){E.x=(Math.random()-.5)*fe*4,E.y=(Math.random()-.5)*Ve*4,E.z=fe;continue}let y=fe/2/E.z,M=E.x*y+P,T=E.y*y+v;if(M>=0&&M<=fe&&T>=0&&T<=Ve){let A=1-E.z/fe,O=A*E.sizeBase;if(A<.3){e.globalAlpha=A*2,e.fillStyle=E.color,e.fillRect(M,T,Math.max(1,O),Math.max(1,O));continue}e.globalAlpha=A,e.fillStyle=E.color,e.strokeStyle=E.color;let C=fe/2/x,I=E.x*C+P,B=E.y*C+v;e.lineWidth=O,e.beginPath(),e.moveTo(I,B),e.lineTo(M,T),e.stroke(),e.beginPath(),e.arc(M,T,O/2,0,Math.PI*2),e.fill(),A>.8&&(e.globalAlpha=(A-.8)*3,e.beginPath(),e.arc(M,T,O*2.5,0,Math.PI*2),e.fill())}}e.globalAlpha=1,Ot=requestAnimationFrame(R)}Ot=requestAnimationFrame(R)}function Pn(){Ot&&(cancelAnimationFrame(Ot),Ot=null)}var Bt=null,st,zt,bi=0,vi=0,Ue=null;function Co(){if(st===void 0||zt===void 0)return;let i=Math.max(100,vi),t=Math.max(14,Math.floor(st/25)),e=Math.floor(st/t),o=Math.floor(i/t);Ue=new $i(e,o,t)}var Fo={id:"tetris",name:"Tetris",run:Tn,stop:Mn,onResize:(i,t)=>{st=i,zt=t;let e=document.documentElement,o=e?getComputedStyle(e):null;bi=o&&parseInt(o.getPropertyValue("--io-header"))||0,vi=t-bi,Co()},preferredTrack:{title:"WinTask 3",trackTitle:"Whoopees Tetris"},marqueeFont:{color:"#f0f0f0",shadowColor:"#a000f0",shadowBlur:12,outline:"#000"}},Po={I:{shapes:[[[1,1,1,1]],[[1],[1],[1],[1]]],color:"#00f0f0"},O:{shapes:[[[1,1],[1,1]]],color:"#f0f000"},T:{shapes:[[[0,1,0],[1,1,1]],[[1,0],[1,1],[1,0]],[[1,1,1],[0,1,0]],[[0,1],[1,1],[0,1]]],color:"#a000f0"},S:{shapes:[[[0,1,1],[1,1,0]],[[1,0],[1,1],[0,1]]],color:"#00f000"},Z:{shapes:[[[1,1,0],[0,1,1]],[[0,1],[1,1],[1,0]]],color:"#f00000"},J:{shapes:[[[1,0,0],[1,1,1]],[[1,1],[1,0],[1,0]],[[1,1,1],[0,0,1]],[[0,1],[0,1],[1,1]]],color:"#0000f0"},L:{shapes:[[[0,0,1],[1,1,1]],[[1,0],[1,0],[1,1]],[[1,1,1],[1,0,0]],[[1,1],[0,1],[0,1]]],color:"#f0a000"}},Ao=Object.keys(Po),Gi=class{constructor(t,e,o){this.x=t,this.y=e,this.color=o,this.vx=(Math.random()-.5)*12,this.vy=(Math.random()-.7)*14,this.gravity=.45,this.life=1,this.decay=.012+Math.random()*.018,this.size=1+Math.random()*2.5}update(){this.vx*=.985,this.vy+=this.gravity,this.x+=this.vx,this.y+=this.vy,this.life-=this.decay}draw(t){t.globalAlpha=Math.max(0,this.life),t.fillStyle=this.color,t.fillRect(this.x,this.y,this.size,this.size)}},$i=class{constructor(t,e,o){this.cols=t,this.rows=e,this.cellSize=o,this.board=Array.from({length:e},()=>Array(t).fill(null)),this.particles=[],this.exploding=!1,this.explodeTimer=0,this.EXPLODE_DURATION=120,this.level=1,this.linesTotal=0,this.dropCounter=0,this.moveCounter=0,this._spawnPiece()}_randomPiece(){let t=Ao[Math.floor(Math.random()*Ao.length)],e=Po[t],o=Math.floor(Math.random()*e.shapes.length);return{shape:e.shapes[o],color:e.color,key:t,rotIdx:o,def:e}}_spawnPiece(){let t=this._randomPiece();this.current={...t,x:Math.floor((this.cols-t.shape[0].length)/2),y:0},this._selectTarget()}_fits(t,e,o){for(let r=0;r<t.length;r++)for(let a=0;a<t[r].length;a++){if(!t[r][a])continue;let s=e+a,n=o+r;if(s<0||s>=this.cols||n>=this.rows||n>=0&&this.board[n][s]!==null)return!1}return!0}_lock(){let{shape:t,x:e,y:o,color:r}=this.current;for(let a=0;a<t.length;a++)for(let s=0;s<t[a].length;s++){if(!t[a][s])continue;let n=o+a,l=e+s;n>=0&&n<this.rows&&l>=0&&l<this.cols&&(this.board[n][l]=r)}this._clearRows()}_clearRows(){let t=0;for(let e=this.rows-1;e>=0;e--)this.board[e].every(o=>o!==null)&&(this.board.splice(e,1),this.board.unshift(Array(this.cols).fill(null)),t++,e++);return t>0&&(this.linesTotal+=t,this.level=Math.floor(this.linesTotal/10)+1),t}_choosePlacement(){let{def:t}=this.current,e=-1/0,o=this.current.x,r=this.current.rotIdx;for(let a=0;a<t.shapes.length;a++){let s=t.shapes[a],n=s[0].length;for(let l=0;l<=this.cols-n;l++){let u=0;for(;this._fits(s,l,u+1);)u++;if(!this._fits(s,l,u))continue;let h=this._getHeuristicScore(s,l,u);h>e&&(e=h,o=l,r=a)}}return{x:o,rotIdx:r}}_getHeuristicScore(t,e,o){let r=this.board.map(h=>[...h]);for(let h=0;h<t.length;h++)for(let c=0;c<t[h].length;c++){if(!t[h][c])continue;let d=o+h,m=e+c;d>=0&&d<this.rows&&(r[d][m]="X")}let a=0;for(let h=0;h<this.rows;h++)r[h].every(c=>c!==null)&&a++;let s=Array(this.cols).fill(0),n=0;for(let h=0;h<this.cols;h++)for(let c=0;c<this.rows;c++)if(r[c][h]!==null){s[h]=this.rows-c,n+=s[h];break}let l=0;for(let h=0;h<this.cols;h++){let c=!1;for(let d=0;d<this.rows;d++)r[d][h]!==null?c=!0:c&&l++}let u=0;for(let h=0;h<this.cols-1;h++)u+=Math.abs(s[h]-s[h+1]);return n*-.51+a*.76+l*-.35+u*-.18+Math.random()*.1}_isBoardFull(){for(let t=0;t<3;t++)if(this.board[t].some(e=>e!==null))return!0;return!1}_explodeBoard(t,e){for(let o=0;o<this.rows;o++)for(let r=0;r<this.cols;r++)if(this.board[o][r]){let a=t+r*this.cellSize+this.cellSize/2,s=e+o*this.cellSize+this.cellSize/2,n=4+Math.floor(Math.random()*4);for(let l=0;l<n;l++)this.particles.push(new Gi(a,s,this.board[o][r]))}}_reset(){this.board=Array.from({length:this.rows},()=>Array(this.cols).fill(null)),this.exploding=!1,this.explodeTimer=0,this.particles=[],this._spawnPiece()}_selectTarget(){let{x:t,rotIdx:e}=this._choosePlacement(),o=this.current.def;this.current.rotIdx=e,this.current.shape=o.shapes[e],this.current.targetX=t,this.current.y=0,this.current.x=Math.floor((this.cols-this.current.shape[0].length)/2)}step(t,e){if(this.exploding){this.explodeTimer++,this.particles=this.particles.filter(a=>a.life>0),this.particles.forEach(a=>a.update()),this.explodeTimer>=this.EXPLODE_DURATION&&this._reset();return}this.moveCounter++,this.moveCounter>=2&&(this.moveCounter=0,this.current.x<this.current.targetX?this._fits(this.current.shape,this.current.x+1,this.current.y)&&this.current.x++:this.current.x>this.current.targetX&&this._fits(this.current.shape,this.current.x-1,this.current.y)&&this.current.x--);let o=this.current.x===this.current.targetX,r=Math.max(4,40-(this.level-1)*3);o&&(r=1),this.dropCounter++,this.dropCounter>=r&&(this.dropCounter=0,this._fits(this.current.shape,this.current.x,this.current.y+1)?this.current.y++:(this._lock(),this._isBoardFull()?(this._explodeBoard(t,e),this.exploding=!0,this.explodeTimer=0):this._spawnPiece()))}draw(t,e,o){let r=this.cellSize,a={};for(let s=0;s<this.rows;s++)for(let n=0;n<this.cols;n++){let l=this.board[s][n];l&&(a[l]||(a[l]=[]),a[l].push({px:e+n*r,py:o+s*r,alpha:this.exploding?Math.max(0,1-this.explodeTimer/40):1}))}if(!this.exploding&&this.current){let{shape:s,x:n,y:l,color:u}=this.current;if(u){a[u]||(a[u]=[]);for(let h=0;h<s.length;h++)for(let c=0;c<s[h].length;c++)s[h][c]&&a[u].push({px:e+(n+c)*r,py:o+(l+h)*r,alpha:1})}}for(let s in a){let n=a[s];t.fillStyle=s,n.forEach(l=>{t.globalAlpha=l.alpha,t.fillRect(l.px+1,l.py+1,r-2,r-2)})}t.globalAlpha=1,t.strokeStyle="rgba(255, 255, 255, 0.35)",t.lineWidth=1.5,t.beginPath();for(let s in a)a[s].forEach(n=>{t.globalAlpha=n.alpha;let l=n.px,u=n.py;t.moveTo(l+1,u+r-2),t.lineTo(l+1,u+1),t.lineTo(l+r-2,u+1)});t.stroke(),t.strokeStyle="rgba(0, 0, 0, 0.45)",t.beginPath();for(let s in a)a[s].forEach(n=>{t.globalAlpha=n.alpha;let l=n.px,u=n.py;t.moveTo(l+1,u+r-1),t.lineTo(l+r-1,u+r-1),t.lineTo(l+r-1,u+1)});t.stroke(),t.globalAlpha=1,t.save(),this.particles.forEach(s=>s.draw(t)),t.restore(),t.globalAlpha=1}};function Tn(i,t){let e=i.ctx2d;st=i.width,zt=i.height,bi=i.topInset||0,vi=i.visibleHeight||zt,Co();function o(){if(e.fillStyle="rgba(8, 6, 18, 0.92)",e.fillRect(0,0,st,zt),e.strokeStyle="rgba(255,255,255,0.04)",e.lineWidth=.5,Ue){let r=Ue.cellSize,a=Math.floor((st-Ue.cols*r)/2),s=bi+(vi-Ue.rows*r);e.beginPath();for(let n=0;n<=Ue.cols;n++)e.moveTo(a+n*r,s),e.lineTo(a+n*r,s+Ue.rows*r);for(let n=0;n<=Ue.rows;n++)e.moveTo(a,s+n*r),e.lineTo(a+Ue.cols*r,s+n*r);e.stroke(),Ue.step(a,s),Ue.draw(e,a,s)}Bt=requestAnimationFrame(o)}Bt=requestAnimationFrame(o)}function Mn(){Bt&&(cancelAnimationFrame(Bt),Bt=null)}var ie={aurora:no,debug:ho,ecg:Be,fire:po,geometry:mo,gradient:Ui,julia:$e,lavalamp:vo,mandelbrot:ri,matrix:yo,none:wo,quantum:Rt,starfield:at,tetris:Fo};var xi=class{constructor(t="",e="bottom",o={}){this.text=t,this.position=e,this.applyStyles(o),this.time=0,this.textX=0,this.initialized=!1,this.baseCharWidth=15,this.baseFontSize=24,this.baseVelocity=2.8,this.baseBounce=12,this.fontFamily='"Courier New", monospace',this.fontWeight="bold",this.enabled=!0}applyStyles(t={}){this.color=t.color||"#FFF",this.outline=t.outline||null,this.shadowColor=t.shadowColor||null,this.shadowBlur=t.shadowBlur||0,this.colorFn=t.colorFn||null}updateStyles(t={}){this.applyStyles(t)}setText(t){this.text=t}setPosition(t){this.position=t}render(t,e,o){if(!this.enabled)return;this.initialized||(this.textX=e,this.initialized=!0);let r=e<480?.65:e<768?.8:1,a=Math.max(12,Math.floor(this.baseFontSize*r)),s=this.baseBounce*r,n=this.baseCharWidth*r,l=this.baseVelocity*r;if(this.time+=.012,!this.text)return;let u=this.text.length*n;this.textX-=l,this.textX<-(u+e*1.1)&&(this.textX=e),t.font=`${this.fontWeight} ${a}px ${this.fontFamily}`,t.lineJoin="round",this.outline&&(t.lineWidth=4,t.strokeStyle=this.outline);let h=this.shadowColor&&this.shadowColor!=="inherit";h?(t.shadowColor=this.shadowColor,t.shadowBlur=this.shadowBlur):this.shadowColor||(t.shadowBlur=0);let c=50*r,d=32*r,m=this.position==="bottom"?o-d:c;for(let p=0;p<this.text.length;p++){let f=this.text[p],g=this.textX+p*n;if(g>-40&&g<e+40){let w=m+Math.sin(this.time*4+p*.1)*s;t.fillStyle=this.colorFn?this.colorFn(this.time,p):this.color,this.shadowColor==="inherit"&&(t.shadowColor=t.fillStyle,t.shadowBlur=this.shadowBlur),this.outline&&t.strokeText(f,g,w),t.fillText(f,g,w),this.shadowColor==="inherit"&&(t.shadowBlur=0)}}h&&(t.shadowBlur=0)}};var To=`:root {
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
.afx-agreed-state.afx-music-active #afx-btn-back,
.afx-agreed-state.afx-music-active #afx-btn-skip {
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

/* --- AnkiDroid Scroll Fix --- */
html.afx-ankidroid,
html.afx-ankidroid body {
    overflow: auto !important;
    height: auto !important;
    min-height: 100% !important;
}

html.afx-ankidroid .card {
    overflow: visible !important;
    height: auto !important;
}

html.afx-ankidroid #qa {
    overflow-y: visible !important;
    height: auto !important;
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
    --button-gradient-start: transparent !important;
    --button-gradient-end: transparent !important;
    appearance: none !important;
    -webkit-appearance: none !important;
    background: transparent !important;
    color: #fff !important;
    border: none !important;
    outline: none !important;
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
    transition: all 0.2s ease;
}

.afx-action-btn:hover {
    --button-gradient-start: rgba(255, 255, 255, 0.08) !important;
    --button-gradient-end: rgba(255, 255, 255, 0.08) !important;
    appearance: none !important;
    -webkit-appearance: none !important;
    color: var(--afx-accent, #ff00ff) !important;
    background: rgba(255, 255, 255, 0.08) !important;
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

/* --- Music status color reactivity (no inline styles) --- */
#afx-music-status {
    color: #fff;
    transition: color 0.2s ease;
}

.afx-music-active #afx-music-status {
    color: #ff6b6b;
}

/* --- Card Visibility Toggle Styles --- */
.afx-card-hidden .afx-mcq-card,
.afx-card-hidden .afx-mcq-back,
.afx-card-hidden .anki-card-container {
    display: none !important;
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
}

/* --- Legacy Template Migration Toast --- */
.afx-legacy-toast-container {
    position: fixed;
    top: 16px;
    left: 50%;
    transform: translate(-50%, -20px);
    width: 90%;
    max-width: 520px;
    background: rgba(18, 14, 24, 0.95);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 0, 255, 0.35);
    border-radius: 12px;
    padding: 14px 20px !important;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.05);
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    opacity: 0;
    pointer-events: auto;
    transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    z-index: 999999;
}

.afx-legacy-toast-container.afx-legacy-visible {
    opacity: 1;
    transform: translate(-50%, 0);
}

.afx-legacy-toast-content {
    flex: 1;
    color: #e5e5e7;
    font-size: 12px;
    line-height: 1.5;
    text-align: left;
}

.afx-legacy-toast-title {
    font-weight: 600;
    color: #ff33ff;
    margin: 0 0 4px 0;
    text-transform: uppercase;
    font-size: 11px;
    letter-spacing: 0.8px;
}

.afx-legacy-toast-link {
    color: #00f3ff;
    text-decoration: underline;
    cursor: pointer;
    font-weight: 500;
    word-break: break-all;
}

.afx-legacy-toast-link:hover {
    color: #33f7ff;
}

.afx-legacy-toast-close {
    background: transparent;
    border: none;
    color: rgba(255, 255, 255, 0.5);
    font-size: 20px;
    cursor: pointer;
    padding: 0 4px;
    line-height: 1;
    margin-top: -2px;
    transition: color 0.2s ease, transform 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.afx-legacy-toast-close:hover {
    color: #ffffff;
    transform: scale(1.1);
}

/* --- Template Update Notice --- */
.afx-update-notice {
    background: rgba(30, 20, 35, 0.95);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 0, 255, 0.4);
    border-radius: 12px;
    padding: 12px 18px;
    width: 100%;
    box-shadow: 0 10px 30px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    opacity: 0;
    pointer-events: auto;
    transition: opacity 0.38s ease, transform 0.38s ease;
    box-sizing: border-box;
    transform: translateY(-20px);
    font-family: SFMono-Regular, Consolas, Menlo, monospace;
    margin: 10px 0;
}

.afx-update-notice.afx-visible {
    opacity: 1;
    transform: translateY(0);
}

.afx-update-notice-content {
    flex: 1;
    color: #f0f0f0;
    font-size: 11px;
    line-height: 1.5;
    text-align: left;
}

.afx-update-notice-title {
    font-weight: bold;
    color: #ff00ff;
    margin: 0 0 2px 0;
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: 0.5px;
}

.afx-update-notice-link {
    color: #00ffff;
    text-decoration: underline;
    cursor: pointer;
    font-weight: bold;
}

.afx-update-notice-close {
    background: transparent;
    border: none;
    color: rgba(255,255,255,0.6);
    font-size: 18px;
    cursor: pointer;
    padding: 4px;
    line-height: 1;
    transition: color 0.2s, transform 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
}

.afx-update-notice-close:hover {
    color: #fff;
    transform: scale(1.15);
}`;var Ln={deckTitle:"AnkiFX Deck",deckAuthor:"Anonymous",termsText:null,sources:[],marquee:"ANKIFX ENGINE INITIALIZED ...",defaultEffect:"geometry",debug:!1,countdown:30,marqueePosition:"top"};function Mo(i={}){let t={...Ln,...window.AnkiFX_Config||{},...i};Array.isArray(t.sources)||(t.sources=[]);let e=parseInt(t.countdown,10);return t.countdown=isNaN(e)?30:Math.max(0,e),t.isConfigFileError=t.termsText!==void 0&&t.termsText!==null&&(typeof t.termsText!="string"||typeof t.termsText=="string"&&t.termsText.trim()===""||t.termsText==="No terms provided."),t}function Io(i){let t=window.AnkiFX_Config?.defaultEffect,e;return t?(e=t,localStorage.setItem("ankifx_preferred_effect",e)):e=localStorage.getItem("ankifx_preferred_effect")||i.defaultEffect||"geometry",ie[e]||(console.warn(`[AnkiFX] Unknown effect "${e}" \u2014 falling back to "${i.defaultEffect||"geometry"}".`),e=i.defaultEffect||"geometry",ie[e]||(e=Object.keys(ie)[0]||"geometry"),localStorage.setItem("ankifx_preferred_effect",e)),e}function Lo(i,t){let e=document.getElementById("ankifx-overlay");if(!e||!e.classList.contains("afx-agreed-state"))return!1;i.sharedGL||(i.sharedGL=document.getElementById("afx-shared-gl")),i.shared2D||(i.shared2D=document.getElementById("afx-shared-2d")),i.sharedMarquee||(i.sharedMarquee=document.getElementById("afx-shared-marquee")),i.sharedGL&&!i.glContext&&(i.glContext=i.sharedGL.getContext("webgl",{alpha:!1,antialias:!1})),i.shared2D&&!i.ctx2D&&(i.ctx2D=i.shared2D.getContext("2d")),i.sharedMarquee&&!i.ctxMarquee&&(i.ctxMarquee=i.sharedMarquee.getContext("2d"));let o=document.getElementById("ankifx-background");if(o){let a=o.getBoundingClientRect();i.width=a.width;let s=He();i.height=document.documentElement.clientHeight+s.ioHeader,i.dpr=Vt()}if(!i.currentEffectId){let a=Array.from(document.documentElement.classList).find(s=>s.startsWith("afx-effect-"));a&&(i.currentEffectId=a.replace("afx-effect-",""))}i.defaultMarqueeText=t.marquee,i.marquee&&(i.marquee.setText(t.marquee),i.marquee.setPosition(t.marqueePosition));let r=document.getElementById("afx-deck-title");return r&&(r.textContent=t.deckTitle),!0}function Ut(i){let t=document.getElementById("afx-effect-controls-container");t&&(t.innerHTML="",!(!i||!i.controls||i.controls.length===0)&&i.controls.forEach(e=>{let o=document.createElement("div");if(o.className="afx-control-row",o.id=`afx-control-container-${e.id}`,e.type==="toggle")o.innerHTML=`
                    <label class="afx-toggle">
                        <input type="checkbox" id="afx-control-${e.id}" ${e.value?"checked":""}>
                        <span class="afx-slider"></span>
                    </label>
                    <span id="afx-control-label-${e.id}">${e.label}</span>
                `,o.querySelector("input").addEventListener("change",a=>{e.onChange&&e.onChange(a.target.checked)});else if(e.type==="slider"){o.classList.add("afx-slider-row");let r=e.step||1,a=r.toString().includes(".")?r.toString().split(".")[1].length:0;o.innerHTML=`
                    <span class="afx-slider-label">${e.label}:</span>
                    <input type="range" id="afx-control-${e.id}" class="afx-range-slider" min="${e.min}" max="${e.max}" step="${r}" value="${e.value}">
                    <span id="afx-control-val-${e.id}" class="afx-slider-val-text">${e.value.toFixed(a)}</span>
                `;let s=o.querySelector("input"),n=o.querySelector(".afx-slider-val-text");s.addEventListener("input",l=>{let u=parseFloat(l.target.value);n.innerText=u.toFixed(a),e.onChange&&e.onChange(u)})}else if(e.type==="button")o.style.padding="0",o.innerHTML=`
                    <button id="afx-control-${e.id}" class="afx-action-btn">
                        ${e.label}
                    </button>
                `,o.querySelector("button").addEventListener("click",a=>{e.onClick&&e.onClick()});else if(e.type==="select"){o.style.padding="0";let r=(e.options||[]).map(s=>{let n=typeof s=="object"?s.value:s,l=typeof s=="object"?s.text:s,u=n==e.value?"selected":"";return`<option value="${n}" ${u}>${l}</option>`}).join("");o.innerHTML=`
                    <select id="afx-control-${e.id}" class="afx-select">
                        ${r}
                    </select>
                `,o.querySelector("select").addEventListener("change",s=>{e.onChange&&e.onChange(s.target.value)})}t.appendChild(o)}))}function Do(i,t){let e=document.getElementById(`afx-control-${i}`);e&&(e.type==="checkbox"?e.checked=!!t:e.value=t);let o=document.getElementById(`afx-control-val-${i}`);if(o){let r=e?e.step:"",a=r&&r.includes(".")?r.split(".")[1].length:0;o.innerText=typeof t=="number"?t.toFixed(a||(t%1===0?0:4)):t}}function tt(i,t,e,o,r){r==="debug"?e.classList.add("afx-debug-active"):e.classList.remove("afx-debug-active");let a=document.documentElement;if(Array.from(a.classList).forEach(n=>{n.startsWith("afx-effect-")&&a.classList.remove(n)}),a.classList.add(`afx-effect-${r}`),i.effectInstance){if(typeof i.effectInstance.destroy=="function")try{i.effectInstance.destroy()}catch(n){console.error("[AnkiFX] Error destroying previous active effect instance:",n)}i.effectInstance=null}Object.values(ie).forEach(n=>{if(n.id!==r&&typeof n.stop=="function")try{n.stop()}catch{}}),i.currentEffectId=r;let s=ie[r];if(s){let n=He(),l=Wt(r,i.dpr),u={gl:i.glContext,ctx2d:i.ctx2D,canvasGL:i.sharedGL,canvas2D:i.shared2D,width:i.width,height:i.height,dpr:l,topInset:n.ioHeader,visibleWidth:i.width,visibleHeight:i.height-n.ioHeader,visibleBounds:{top:n.ioHeader,bottom:i.height}};if(i.marquee&&i.marquee.updateStyles(s.marqueeFont||{}),s.isWebGL){try{typeof s.createInstance=="function"?i.effectInstance=s.createInstance(u,t):i.effectInstance=s}catch(d){console.error(`[AnkiFX] Error instantiating WebGL effect ${r}:`,d),tt(i,t,e,o,"none");return}let h=["init","render","destroy","onContextLost","onContextRestored"],c=!0;for(let d of h)if(!i.effectInstance||typeof i.effectInstance[d]!="function"){console.error(`[AnkiFX] WebGL Effect contract validation failed for ${s.id}: missing or invalid ${d}`),c=!1;break}if(!c){if(i.effectInstance&&typeof i.effectInstance.destroy=="function")try{i.effectInstance.destroy()}catch{}i.effectInstance=null,tt(i,t,e,o,"none");return}try{i.effectInstance.init(i.glContext)}catch(d){if(console.error(`[AnkiFX] Error initializing WebGL effect ${r}:`,d),i.effectInstance&&typeof i.effectInstance.destroy=="function")try{i.effectInstance.destroy()}catch{}i.effectInstance=null,tt(i,t,e,o,"none");return}}else s.run(u,t);Ut(s),i.marquee&&(i.marquee.enabled=mt())}else i.marquee&&i.marquee.updateStyles({}),Ut(null)}function it(i){let t=document.getElementById("ankifx-background");if(!t||!i.sharedGL||!i.shared2D||!i.sharedMarquee)return;let o=He().ioHeader;document.documentElement.style.setProperty("--afx-viewport-height",`calc(100dvh + ${o}px)`);let r=t.getBoundingClientRect();i.width=r.width,i.height=document.documentElement.clientHeight+o,i.dpr=Vt();let a=Oi();if(i.sharedGL.width=i.width*a,i.sharedGL.height=i.height*a,i.sharedGL.style.width=i.width+"px",i.sharedGL.style.height=i.height+"px",i.shared2D.width=i.width*i.dpr,i.shared2D.height=i.height*i.dpr,i.shared2D.style.width=i.width+"px",i.shared2D.style.height=i.height+"px",i.sharedMarquee.width=i.width*i.dpr,i.sharedMarquee.height=i.height*i.dpr,i.sharedMarquee.style.width=i.width+"px",i.sharedMarquee.style.height=i.height+"px",i.glContext&&i.glContext.viewport(0,0,i.sharedGL.width,i.sharedGL.height),i.ctx2D&&(i.ctx2D.setTransform(1,0,0,1,0,0),i.ctx2D.scale(i.dpr,i.dpr)),i.ctxMarquee&&(i.ctxMarquee.setTransform(1,0,0,1,0,0),i.ctxMarquee.scale(i.dpr,i.dpr)),i.currentEffectId&&ie[i.currentEffectId]?.onResize){let s=Wt(i.currentEffectId,i.dpr);ie[i.currentEffectId].onResize(i.width,i.height,s)}}function Ro(i){let e=He().ioHeader,o=window.innerHeight,r=document.documentElement.clientHeight,a=setInterval(()=>{let s=He(),n=window.innerHeight,l=document.documentElement.clientHeight;(s.ioHeader!==e||n!==o||l!==r)&&(e=s.ioHeader,o=n,r=l,it(i))},50);setTimeout(()=>clearInterval(a),2e3)}function Oo(i){i._layoutHandler&&(window.removeEventListener("orientationchange",i._layoutHandler),window.removeEventListener("resize",i._layoutHandler)),i._resizeTimeout&&clearTimeout(i._resizeTimeout),i._resizeInterval&&clearInterval(i._resizeInterval),i._layoutHandler=()=>{i._resizeTimeout&&clearTimeout(i._resizeTimeout),i._resizeInterval&&clearInterval(i._resizeInterval),it(i),i._resizeTimeout=setTimeout(()=>{it(i)},100);let t=0,e=i.width,o=i.height;i._resizeInterval=setInterval(()=>{if(t+=100,t>=1500){clearInterval(i._resizeInterval);return}let r=He(),a=document.getElementById("ankifx-background"),s=a?a.getBoundingClientRect():null,n=s?s.width:window.innerWidth,l=document.documentElement.clientHeight+r.ioHeader;(n!==e||l!==o)&&(e=n,o=l,it(i))},100)},window.addEventListener("orientationchange",i._layoutHandler),window.addEventListener("resize",i._layoutHandler)}function Bo(i){let t=document.getElementById("afx-bottom-dock");t&&(i.dockObserver=new ResizeObserver(()=>{let e=t.getBoundingClientRect();document.documentElement.style.setProperty("--afx-dock-height",`${e.height}px`)}),i.dockObserver.observe(t))}function zo(i){i.observer||(i._observerTimeout=null,i.observer=new MutationObserver(()=>{i._observerTimeout&&clearTimeout(i._observerTimeout),i._observerTimeout=setTimeout(()=>{i._observerTimeout=null;let t=document.getElementById("qa");(t?!!t.querySelector(".ankifx-card"):!1)?yi(i):typeof i=="object"&&window.AnkiFX&&window.AnkiFX.destroy()},20)}),i.observer.observe(document.documentElement,{childList:!0,subtree:!0}))}function yi(i){let t=i&&i.observer;t&&i.observer.disconnect();let e=document.getElementById("_flag"),o=document.getElementById("_mark"),r=document.getElementById("afx-top-group-left"),a=document.getElementById("afx-top-group-right"),s=document.getElementById("afx-btn-skip");if(o&&r){let n=document.getElementById("afx-global-fps");n&&o.nextSibling!==n?r.insertBefore(o,n):!n&&o.parentElement!==r&&r.appendChild(o)}e&&a&&e.parentElement!==a&&a.insertBefore(e,s),t&&i.observer.observe(document.documentElement,{childList:!0,subtree:!0})}function Vi(i){if(i.marqueeInterval)return;let t=0,e=0,o=r=>{if(r===void 0&&(r=performance.now()),t||(t=r),e++,r-t>=1e3){let a=document.getElementById("afx-global-fps");a&&(a.textContent=`FPS: ${e}`),e=0,t=r}if(i.marquee&&i.ctxMarquee){if(i.ctxMarquee.clearRect(0,0,i.width,i.height),i.currentEffectId&&ie[i.currentEffectId]?.drawOverlay)try{ie[i.currentEffectId].drawOverlay(i.ctxMarquee,i.width,i.height,r)}catch(a){console.error("[AnkiFX] drawOverlay error: "+a.message)}i.marquee.render(i.ctxMarquee,i.width,i.height)}i.marqueeInterval=requestAnimationFrame(o)};i.marqueeInterval=requestAnimationFrame(o)}function Uo(i,t,e,o){let r=t.countdown;if((t.debug||t.isConfigFileError)&&(r=0),r>0){o.textContent=`( ${r} )`;let a=setInterval(()=>{r--,o.textContent=`( ${r} )`,r<=0&&(clearInterval(a),o.textContent="I AGREE",o.disabled=!1)},1e3)}else o.textContent="I AGREE",o.disabled=!1;o.addEventListener("click",a=>{o.disabled||window.AnkiFX.agree(e,t.deckTitle)})}window.neoart=Object.create(null);function Wi(i,t){var e=Object.create(null,{endian:{value:1,writable:!0},length:{value:0,writable:!0},index:{value:0,writable:!0},buffer:{value:null,writable:!0},view:{value:null,writable:!0},bytesAvailable:{get:function(){return this.length-this.index}},position:{get:function(){return this.index},set:function(o){o<0?o=0:o>this.length&&(o=this.length),this.index=o}},clear:{value:function(){this.buffer=new ArrayBuffer,this.view=null,this.index=this.length=0}},readAt:{value:function(o){return this.view.getUint8(o)}},readByte:{value:function(){return this.view.getInt8(this.index++)}},readShort:{value:function(){var o=this.view.getInt16(this.index,this.endian);return this.index+=2,o}},readInt:{value:function(){var o=this.view.getInt32(this.index,this.endian);return this.index+=4,o}},readUbyte:{value:function(){return this.view.getUint8(this.index++)}},readUshort:{value:function(){var o=this.view.getUint16(this.index,this.endian);return this.index+=2,o}},readUint:{value:function(){var o=this.view.getUint32(this.index,this.endian);return this.index+=4,o}},readBytes:{value:function(o,r,a){var s=o.view,n=this.index,l=this.view;for((a+=n)>this.length&&(a=this.length);n<a;++n)s.setUint8(r++,l.getUint8(n));this.index=n}},readString:{value:function(o){var r=this.index,a=this.view,s="";for((o+=r)>this.length&&(o=this.length);r<o;++r)s+=String.fromCharCode(a.getUint8(r));return this.index=o,s}},writeAt:{value:function(o,r){this.view.setUint8(o,r)}},writeByte:{value:function(o){this.view.setInt8(this.index++,o)}},writeShort:{value:function(o){this.view.setInt16(this.index,o),this.index+=2}},writeInt:{value:function(o){this.view.setInt32(this.index,o),this.index+=4}}});return e.buffer=i,e.view=new DataView(i),e.length=i.byteLength,Object.seal(e)}function No(){return Object.create(null,{l:{value:0,writable:!0},r:{value:0,writable:!0},next:{value:null,writable:!0}})}function wi(){return Object.create(null,{player:{value:null,writable:!0},channels:{value:[],writable:!0},buffer:{value:[],writable:!0},samplesTick:{value:0,writable:!0},samplesLeft:{value:0,writable:!0},remains:{value:0,writable:!0},completed:{value:0,writable:!0},bufferSize:{get:function(){return this.buffer.length},set:function(i){var t,e=this.buffer.length||0;if(!(i===e||i<512)&&(this.buffer.length=i,i>e))for(this.buffer[e]=No(),t=++e;t<i;++t)this.buffer[t]=this.buffer[t-1].next=No()}},complete:{get:function(){return this.completed},set:function(i){this.completed=i^this.player.loopSong}},reset:{value:function(){var i=this.channels[0],t=this.buffer[0];for(this.samplesLeft=0,this.remains=0,this.completed=0;i;)i.initialize(),i=i.next;for(;t;)t.l=t.r=0,t=t.next}},restore:{configurable:!0,value:function(){}}})}function Dn(){var i=null;return typeof AudioContext<"u"?i=new AudioContext:alert("Web Audio API does not appear to be supported. Use Chrome, Safari or Firefox"),i}function ki(){var i=Object.create(null,{context:{value:null,writable:!0},node:{value:null,writable:!0},analyser:{value:null,writable:!0},analyse:{value:0,writable:!0},endian:{value:0,writable:!0},sampleRate:{value:0,writable:!0},playSong:{value:0,writable:!0},lastSong:{value:0,writable:!0},version:{value:0,writable:!0},title:{value:"",writable:!0},channels:{value:0,writable:!0},loopSong:{value:0,writable:!0},speed:{value:0,writable:!0},tempo:{value:0,writable:!0},mixer:{value:null,writable:!0},tick:{value:0,writable:!0},paused:{value:0,writable:!0},callback:{value:null,writable:!0},quality:{configurable:!0,set:function(t){this.callback=t?this.mixer.accurate.bind(this.mixer):this.mixer.fast.bind(this.mixer)}},toggle:{value:function(t){this.mixer.channels[t].mute^=1}},setup:{configurable:!0,value:function(){}},load:{value:function(t){return this.version=0,this.playSong=0,this.lastSong=0,this.mixer.restore(),t.view||(t=Wi(t)),t.position=0,t.readUint()===67324752&&window.neoart.Unzip,t.endian=this.endian,t.position=0,this.loader(t),this.version&&this.setup(),this.version}},play:{value:function(){var t,e;this.version&&(this.paused?this.paused=0:(this.initialize(),typeof this.context.createJavaScriptNode=="function"?this.node=this.context.createJavaScriptNode(this.mixer.bufferSize):this.node=this.context.createScriptProcessor(this.mixer.bufferSize),this.analyser=this.context.createAnalyser(),this.node.connect(this.analyser),this.node.onaudioprocess=this.callback),this.analyse&&window.neoart.Flectrum?(e=window.neoart.analyserNode=this.context.createAnalyser(),this.node.connect(e),e.connect(this.context.destination)):this.node.connect(this.context.destination),t=document.createEvent("Event"),t.initEvent("flodPlay",!0,!1),document.dispatchEvent(t))}},pause:{value:function(){if(this.node){this.node.disconnect(),this.paused=1;var t=document.createEvent("Event");t.initEvent("flodPause",!0,!1),document.dispatchEvent(t)}}},stop:{value:function(){if(this.node){this.node.disconnect(),this.node.onaudioprocess=this.node=null,this.paused=0,this.restore&&this.restore();var t=document.createEvent("Event");t.initEvent("flodStop",!0,!1),document.dispatchEvent(t)}}},reset:{value:function(){this.tick=0,this.mixer.initialize(),this.mixer.samplesTick=this.sampleRate*2.5/this.tempo>>0}}});return window.neoart.audioContext||(window.neoart.audioContext=Dn()),i.context=window.neoart.audioContext,i.sampleRate=i.context.sampleRate,i}function Ei(i){var t=Object.create(null,{next:{value:null,writable:!0},mute:{value:0,writable:!0},panning:{value:0,writable:!0},delay:{value:0,writable:!0},pointer:{value:0,writable:!0},length:{value:0,writable:!0},audena:{value:0,writable:!0},audcnt:{value:0,writable:!0},audloc:{value:0,writable:!0},audper:{value:0,writable:!0},audvol:{value:0,writable:!0},timer:{value:0,writable:!0},level:{value:0,writable:!0},ldata:{value:0,writable:!0},rdata:{value:0,writable:!0},enabled:{get:function(){return this.audena},set:function(e){e!==this.audena&&(this.audena=e,this.audloc=this.pointer,this.audcnt=this.pointer+this.length,this.timer=1,e&&(this.delay+=2))}},period:{set:function(e){e<0?e=0:e>65535&&(e=65535),this.audper=e}},volume:{set:function(e){e<0?e=0:e>64&&(e=64),this.audvol=e}},resetData:{value:function(){this.ldata=0,this.rdata=0}},initialize:{value:function(){this.audena=0,this.audcnt=0,this.audloc=0,this.audper=50,this.audvol=0,this.timer=0,this.ldata=0,this.rdata=0,this.delay=0,this.pointer=0,this.length=0}}});return t.panning=t.level=(++i&2)===0?-1:1,Object.seal(t)}function Rn(){return Object.create(null,{active:{value:0,writable:!0},forced:{value:-1,writable:!0},l0:{value:0,writable:!0},l1:{value:0,writable:!0},l2:{value:0,writable:!0},l3:{value:0,writable:!0},l4:{value:0,writable:!0},r0:{value:0,writable:!0},r1:{value:0,writable:!0},r2:{value:0,writable:!0},r3:{value:0,writable:!0},r4:{value:0,writable:!0},initialize:{value:function(){this.l0=this.l1=this.l2=this.l3=this.l4=0,this.r0=this.r1=this.r2=this.r3=this.r4=0}},process:{value:function(i,t){var e=.52133458435322,o=.4860348337215757,r=.9314955486749749,a=1-o;i===0&&(this.l0=o*t.l+a*this.l0,this.r0=o*t.r+a*this.r0,a=1-r,t.l=this.l1=r*this.l0+a*this.l1,t.r=this.r1=r*this.r0+a*this.r1),(this.active|this.forced)>0&&(a=1-e,this.l2=e*t.l+a*this.l2,this.r2=e*t.r+a*this.r2,this.l3=e*this.l2+a*this.l3,this.r3=e*this.r2+a*this.r3,t.l=this.l4=e*this.l3+a*this.l4,t.r=this.r4=e*this.r3+a*this.r4),t.l>1?t.l=1:t.l<-1&&(t.l=-1),t.r>1?t.r=1:t.r<-1&&(t.r=-1)}}})}function _i(){return Object.create(null,{note:{value:0,writable:!0},sample:{value:0,writable:!0},effect:{value:0,writable:!0},param:{value:0,writable:!0}})}function Nt(){return Object.create(null,{name:{value:"",writable:!0},length:{value:0,writable:!0},loop:{value:0,writable:!0},repeat:{value:0,writable:!0},volume:{value:0,writable:!0},pointer:{value:0,writable:!0},loopPtr:{value:0,writable:!0}})}function Yi(){var i=wi();return Object.defineProperties(i,{filter:{value:null,writable:!0},model:{value:1,writable:!0},memory:{value:[],writable:!0},loopPtr:{value:0,writable:!0},loopLen:{value:4,writable:!0},clock:{value:0,writable:!0},master:{value:0,writable:!0},ready:{value:0,writable:!0},volume:{set:function(t){t>0?(t>64&&(t=64),this.master=t/64*.00390625):this.master=0}},initialize:{value:function(){var t=this.memory.length,e=t+this.loopLen;if(this.reset(),this.filter.initialize(),!this.ready)for(this.ready=1,this.loopPtr=t;t<e;++t)this.memory[t]=0}},restore:{value:function(){this.ready=0,this.memory.length=0}},store:{value:function(t,e,o){var r,a,s=t.position,n=this.memory.length,l;for(o&&(t.position=o),l=t.position+e,l>=t.length&&(r=l-t.length,e=t.length-t.position),a=n,e+=n;a<e;++a)this.memory[a]=t.readByte();for(e+=r;a<e;++a)this.memory[a]=0;return o&&(t.position=s),n}},fast:{value:function(t){var e,o,r,a=this.memory,s,n=0,l,u=0,h,c,d,m=this.bufferSize,p,f,g;if(this.completed){if(!this.remains){this.player.stop();return}m=this.remains}for(;n<m;){for(this.samplesLeft||(this.player.process(),this.samplesLeft=this.samplesTick,this.completed&&(m=n+this.samplesTick,m>this.bufferSize&&(this.remains=m-this.bufferSize,m=this.bufferSize))),f=this.samplesLeft,n+f>=m&&(f=m-n),l=u+f,e=this.channels[0];e;){if(d=this.buffer[u],e.audena&&e.audper>60)for(p=e.audper/this.clock,g=e.audvol*this.master,s=g*(1-e.level),c=g*(1+e.level),o=u;o<l;++o)e.delay?e.delay--:--e.timer<1&&(e.mute||(g=a[e.audloc]*.0078125,e.ldata=g*s,e.rdata=g*c),e.audloc++,e.timer+=p,e.audloc>=e.audcnt&&(e.audloc=e.pointer,e.audcnt=e.pointer+e.length)),d.l+=e.ldata,d.r+=e.rdata,d=d.next;else for(o=u;o<l;++o)d.l+=e.ldata,d.r+=e.rdata,d=d.next;e=e.next}u=l,n+=f,this.samplesLeft-=f}for(g=this.model,a=this.filter,d=this.buffer[0],r=t.outputBuffer.getChannelData(0),h=t.outputBuffer.getChannelData(1),o=0;o<m;++o)a.process(g,d),r[o]=d.l,h[o]=d.r,d.l=d.r=0,d=d.next}}}),i.channels[0]=Ei(0),i.channels[0].next=i.channels[1]=Ei(1),i.channels[1].next=i.channels[2]=Ei(2),i.channels[2].next=i.channels[3]=Ei(3),i.bufferSize=8192,i.filter=Rn(),i.master=.00390625,Object.seal(i)}function Si(i){var t=ki();return Object.defineProperties(t,{quality:{set:function(e){this.callback=this.mixer.fast.bind(this.mixer)}},stereo:{set:function(e){var o=this.mixer.channels[0];for(e<0?e=0:e>1&&(e=1);o;)o.level=e*o.panning,o=o.next}},volume:{set:function(e){e<0?e=0:e>1&&(e=1),this.mixer.master=e*.00390625}},frequency:{value:function(e){e?(this.mixer.clock=3579545/this.sampleRate,this.mixer.samplesTick=735):(this.mixer.clock=3546895/this.sampleRate,this.mixer.samplesTick=882)}}}),t.mixer=i||Yi(),t.mixer.player=t,t.frequency(0),t.channels=4,t.endian=0,t.quality=0,t.speed=6,t.tempo=125,t}function qo(){return Object.create(null,{next:{value:null,writable:!0},mute:{value:0,writable:!0},enabled:{value:0,writable:!0},sample:{value:null,writable:!0},length:{value:0,writable:!0},index:{value:0,writable:!0},pointer:{value:0,writable:!0},delta:{value:0,writable:!0},fraction:{value:0,writable:!0},speed:{value:0,writable:!0},dir:{value:0,writable:!0},oldSample:{value:null,writable:!0},oldLength:{value:0,writable:!0},oldPointer:{value:0,writable:!0},oldFraction:{value:0,writable:!0},oldSpeed:{value:0,writable:!0},oldDir:{value:0,writable:!0},volume:{value:0,writable:!0},lvol:{value:0,writable:!0},rvol:{value:0,writable:!0},panning:{value:128,writable:!0},lpan:{value:.5,writable:!0},rpan:{value:.5,writable:!0},ldata:{value:0,writable:!0},rdata:{value:0,writable:!0},mixCounter:{value:0,writable:!0},lmixRampU:{value:0,writable:!0},lmixDeltaU:{value:0,writable:!0},rmixRampU:{value:0,writable:!0},rmixDeltaU:{value:0,writable:!0},lmixRampD:{value:0,writable:!0},lmixDeltaD:{value:0,writable:!0},rmixRampD:{value:0,writable:!0},rmixDeltaD:{value:0,writable:!0},volCounter:{value:0,writable:!0},lvolDelta:{value:0,writable:!0},rvolDelta:{value:0,writable:!0},panCounter:{value:0,writable:!0},lpanDelta:{value:0,writable:!0},rpanDelta:{value:0,writable:!0},initialize:{value:function(){this.enabled=0,this.sample=null,this.length=0,this.index=0,this.pointer=0,this.delta=0,this.fraction=0,this.speed=0,this.dir=0,this.oldSample=null,this.oldLength=0,this.oldPointer=0,this.oldFraction=0,this.oldSpeed=0,this.oldDir=0,this.volume=0,this.lvol=0,this.rvol=0,this.panning=128,this.lpan=.5,this.rpan=.5,this.ldata=0,this.rdata=0,this.mixCounter=0,this.lmixRampU=0,this.lmixDeltaU=0,this.rmixRampU=0,this.rmixDeltaU=0,this.lmixRampD=0,this.lmixDeltaD=0,this.rmixRampD=0,this.rmixDeltaD=0,this.volCounter=0,this.lvolDelta=0,this.rvolDelta=0,this.panCounter=0,this.lpanDelta=0,this.rpanDelta=0}}})}function jo(){return Object.create(null,{name:{value:"",writable:!0},bits:{value:8,writable:!0},volume:{value:0,writable:!0},length:{value:0,writable:!0},data:{value:[],writable:!0},loopMode:{value:0,writable:!0},loopStart:{value:0,writable:!0},loopLen:{value:0,writable:!0},store:{value:function(i){var t=0,e,o=this.length,r,a,s,n;if(this.loopLen||(this.loopMode=0),r=i.position,this.loopMode?(o=this.loopStart+this.loopLen,this.data=new Float32Array(o+1)):this.data=new Float32Array(this.length+1),this.bits===8)for(s=r+o,s>i.length&&(o=i.length-r),e=0;e<o;e++)n=i.readByte()+t,n<-128?n+=256:n>127&&(n-=256),this.data[e]=n*.0078125,t=n;else for(s=r+(o<<1),s>i.length&&(o=i.length-r>>1),e=0;e<o;e++)n=i.readShort()+t,n<-32768?n+=65536:n>32767&&(n-=65536),this.data[e]=n*3051758e-11,t=n;if(s=r+this.length,this.loopMode?(this.length=this.loopStart+this.loopLen,this.loopMode===1?this.data[o]=this.data[this.loopStart]:this.data[o]=this.data[o-1]):this.data[this.length]=0,o!==this.length)for(a=this.data[o-1],e=o;e<this.length;e++)this.data[e]=a;s<i.length?i.position=s:i.position=i.length-1}}})}function On(){var i=wi();return Object.defineProperties(i,{setup:{value:function(t){var e=1;for(this.channels.length=t,this.channels[0]=qo();e<t;++e)this.channels[e]=this.channels[e-1].next=qo()}},initialize:{value:function(){this.reset()}},fast:{value:function(t){var e,o,r,a,s=0,n,l=0,u,h,c,d=this.bufferSize,m,p;if(this.completed){if(!this.remains){this.player.stop();return}d=this.remains}for(;s<d;){for(this.samplesLeft||(this.player.process(),this.player.fast(),this.samplesLeft=this.samplesTick,this.completed&&(d=s+this.samplesTick,d>this.bufferSize&&(this.remains=d-this.bufferSize,d=this.bufferSize))),m=this.samplesLeft,s+m>=d&&(m=d-s),n=l+m,e=this.channels[0];e;){if(!e.enabled){e=e.next;continue}for(h=e.sample,o=h.data,c=this.buffer[l],a=l;a<n;++a){if(e.index!==e.pointer){if(e.index>=e.length)if(h.loopMode)e.pointer=h.loopStart+(e.index-e.length),e.length=h.length,h.loopMode===2&&(e.dir?e.dir=0:e.dir=h.length+h.loopStart-1);else{e.enabled=0;break}else e.pointer=e.index;e.mute?(e.ldata=0,e.rdata=0):(e.dir?p=o[e.dir-e.pointer]:p=o[e.pointer],e.ldata=p*e.lvol,e.rdata=p*e.rvol)}e.index=e.pointer+e.delta,(e.fraction+=e.speed)>=1&&(e.index++,e.fraction--),c.l+=e.ldata,c.r+=e.rdata,c=c.next}e=e.next}l=n,s+=m,this.samplesLeft-=m}for(c=this.buffer[0],r=t.outputBuffer.getChannelData(0),u=t.outputBuffer.getChannelData(1),a=0;a<d;++a)c.l>1?c.l=1:c.l<-1&&(c.l=-1),c.r>1?c.r=1:c.r<-1&&(c.r=-1),r[a]=c.l,u[a]=c.r,c.l=c.r=0,c=c.next}},accurate:{value:function(t){var e,o,r,a,s,n,l=0,u,h=0,c,d,m,p,f,g=this.bufferSize,w,_;if(this.completed){if(!this.remains){this.player.stop();return}g=this.remains}for(;l<g;){for(this.samplesLeft||(this.player.process(),this.player.accurate(),this.samplesLeft=this.samplesTick,this.completed&&(g=l+this.samplesTick,g>this.bufferSize&&(this.remains=g-this.bufferSize,g=this.bufferSize))),w=this.samplesLeft,l+w>=g&&(w=g-l),u=h+w,e=this.channels[0];e;){if(!e.enabled){e=e.next;continue}for(m=e.sample,o=m.data,p=e.oldSample,p&&(r=p.data),f=this.buffer[h],n=h;n<u;++n){if(_=e.mute?0:o[e.pointer],_+=(o[e.pointer+e.dir]-_)*e.fraction,(e.fraction+=e.speed)>=1&&(s=e.fraction>>0,e.fraction-=s,e.dir>0?(e.pointer+=s,e.pointer>e.length&&(e.fraction+=e.pointer-e.length,e.pointer=e.length)):(e.pointer-=s,e.pointer<e.length&&(e.fraction+=e.length-e.pointer,e.pointer=e.length))),e.mixCounter?(p?(c=e.mute?0:r[e.oldPointer],c+=(r[e.oldPointer+e.oldDir]-c)*e.oldFraction,(e.oldFraction+=e.oldSpeed)>1&&(s=e.oldFraction>>0,e.oldFraction-=s,e.oldDir>0?(e.oldPointer+=s,e.oldPointer>e.oldLength&&(e.oldFraction+=e.oldPointer-e.oldLength,e.oldPointer=e.oldLength)):(e.oldPointer-=s,e.oldPointer<e.oldLength&&(e.oldFraction+=e.oldLength-e.oldPointer,e.oldPointer=e.oldLength))),f.l+=_*e.lmixRampU+c*e.lmixRampD,f.r+=_*e.rmixRampU+c*e.rmixRampD,e.lmixRampD-=e.lmixDeltaD,e.rmixRampD-=e.rmixDeltaD):(f.l+=_*e.lmixRampU,f.r+=_*e.rmixRampU),e.lmixRampU+=e.lmixDeltaU,e.rmixRampU+=e.rmixDeltaU,e.mixCounter--,e.oldPointer===e.oldLength&&(p.loopMode?p.loopMode===1?(e.oldPointer=p.loopStart,e.oldLength=p.length):e.oldDir>0?(e.oldPointer=p.length-1,e.oldLength=p.loopStart,e.oldDir=-1):(e.oldFraction-=1,e.oldPointer=p.loopStart,e.oldLength=p.length,e.oldDir=1):(p=null,e.oldPointer=0))):(f.l+=_*e.lvol,f.r+=_*e.rvol,e.volCounter?(e.lvol+=e.lvolDelta,e.rvol+=e.rvolDelta,e.volCounter--):e.panCounter&&(e.lpan+=e.lpanDelta,e.rpan+=e.rpanDelta,e.panCounter--,e.lvol=e.volume*e.lpan,e.rvol=e.volume*e.rpan)),e.pointer===e.length)if(m.loopMode)m.loopMode===1?(e.pointer=m.loopStart,e.length=m.length):e.dir>0?(e.pointer=m.length-1,e.length=m.loopStart,e.dir=-1):(e.fraction-=1,e.pointer=m.loopStart,e.length=m.length,e.dir=1);else{e.enabled=0;break}f=f.next}e=e.next}h=u,l+=w,this.samplesLeft-=w}for(f=this.buffer[0],a=t.outputBuffer.getChannelData(0),d=t.outputBuffer.getChannelData(1),n=0;n<g;++n)f.l>1?f.l=1:f.l<-1&&(f.l=-1),f.r>1?f.r=1:f.r<-1&&(f.r=-1),a[n]=f.l,d[n]=f.r,f.l=f.r=0,f=f.next}}}),i.bufferSize=8192,Object.seal(i)}function Ho(i){var t=ki();return Object.defineProperties(t,{track:{value:null,writable:!0},length:{value:0,writable:!0},restart:{value:0,writable:!0},timer:{value:0,writable:!0},master:{value:0,writable:!0},volume:{set:function(e){e<0?e=0:e>1&&(e=1),this.master=e*64}},setup:{configurable:!1,value:function(){this.mixer.setup(this.channels)}}}),t.mixer=i||On(),t.mixer.player=t,t.endian=1,t.quality=1,t}function Bn(i){var t=Object.create(null,{index:{value:i,writable:!0},next:{value:null,writable:!0},flags:{value:0,writable:!0},delay:{value:0,writable:!0},channel:{value:null,writable:!0},patternLoop:{value:0,writable:!0},patternLoopRow:{value:0,writable:!0},playing:{value:null,writable:!0},note:{value:0,writable:!0},keyoff:{value:0,writable:!0},period:{value:0,writable:!0},finetune:{value:0,writable:!0},arpDelta:{value:0,writable:!0},vibDelta:{value:0,writable:!0},instrument:{value:null,writable:!0},autoVibratoPos:{value:0,writable:!0},autoSweep:{value:0,writable:!0},autoSweepPos:{value:0,writable:!0},sample:{value:null,writable:!0},sampleOffset:{value:0,writable:!0},volume:{value:0,writable:!0},volEnabled:{value:0,writable:!0},volEnvelope:{value:null,writable:!0},volDelta:{value:0,writable:!0},volSlide:{value:0,writable:!0},volSlideMaster:{value:0,writable:!0},fineSlideU:{value:0,writable:!0},fineSlideD:{value:0,writable:!0},fadeEnabled:{value:0,writable:!0},fadeDelta:{value:0,writable:!0},fadeVolume:{value:0,writable:!0},panning:{value:0,writable:!0},panEnabled:{value:0,writable:!0},panEnvelope:{value:null,writable:!0},panSlide:{value:0,writable:!0},portaU:{value:0,writable:!0},portaD:{value:0,writable:!0},finePortaU:{value:0,writable:!0},finePortaD:{value:0,writable:!0},xtraPortaU:{value:0,writable:!0},xtraPortaD:{value:0,writable:!0},portaPeriod:{value:0,writable:!0},portaSpeed:{value:0,writable:!0},glissando:{value:0,writable:!0},glissPeriod:{value:0,writable:!0},vibratoPos:{value:0,writable:!0},vibratoSpeed:{value:0,writable:!0},vibratoDepth:{value:0,writable:!0},vibratoReset:{value:0,writable:!0},tremoloPos:{value:0,writable:!0},tremoloSpeed:{value:0,writable:!0},tremoloDepth:{value:0,writable:!0},waveControl:{value:0,writable:!0},tremorPos:{value:0,writable:!0},tremorOn:{value:0,writable:!0},tremorOff:{value:0,writable:!0},tremorVolume:{value:0,writable:!0},retrigx:{value:0,writable:!0},retrigy:{value:0,writable:!0},rowCurrent:{value:null,writable:!0},reset:{value:function(){this.volume=this.sample.volume,this.panning=this.sample.panning,this.finetune=this.sample.finetune>>3<<2,this.keyoff=0,this.volDelta=0,this.fadeEnabled=0,this.fadeDelta=0,this.rowCurrent=null,this.fadeVolume=65536,this.autoVibratoPos=0,this.autoSweep=1,this.autoSweepPos=0,this.vibDelta=0,this.vibratoReset=0,(this.waveControl&15)<4&&(this.vibratoPos=0),this.waveControl>>4<4&&(this.tremoloPos=0)}},autoVibrato:{value:function(){var e;switch(this.autoVibratoPos=this.autoVibratoPos+this.playing.vibratoSpeed&255,this.playing.vibratoType){case 0:e=Hn[this.autoVibratoPos];break;case 1:this.autoVibratoPos<128?e=-64:e=64;break;case 2:e=(64+(this.autoVibratoPos>>1)&127)-64;break;case 3:e=(64-(this.autoVibratoPos>>1)&127)-64;break;default:break}return e*=this.playing.vibratoDepth,this.autoSweep&&(this.playing.vibratoSweep?this.autoSweepPos>this.playing.vibratoSweep?(this.autoSweepPos&2&&(e*=this.autoSweepPos/this.playing.vibratoSweep),this.autoSweep=0):e*=++this.autoSweepPos/this.playing.vibratoSweep:this.autoSweep=0),this.flags|=pe,e>>6}},tonePortamento:{value:function(){this.glissPeriod||(this.glissPeriod=this.period),this.period<this.portaPeriod?(this.glissPeriod+=this.portaSpeed<<2,this.glissando?this.period=Math.round(this.glissPeriod/64)<<6:this.period=this.glissPeriod,this.period>=this.portaPeriod&&(this.period=this.portaPeriod,this.glissPeriod=this.portaPeriod=0)):this.period>this.portaPeriod&&(this.glissPeriod-=this.portaSpeed<<2,this.glissando?this.period=Math.round(this.glissPeriod/64)<<6:this.period=this.glissPeriod,this.period<=this.portaPeriod&&(this.period=this.portaPeriod,this.glissPeriod=this.portaPeriod=0)),this.flags|=pe}},tremolo:{value:function(){var e=255,o=this.tremoloPos&31;switch(this.waveControl>>4&3){case 0:e=Ko[o];break;case 1:e=o<<3;break;default:break}this.volDelta=e*this.tremoloDepth>>6,this.tremoloPos>31&&(this.volDelta=-this.volDelta),this.tremoloPos=this.tremoloPos+this.tremoloSpeed&63,this.flags|=K}},tremor:{value:function(){this.tremorPos===this.tremorOn?(this.tremorVolume=this.volume,this.volume=0,this.flags|=K):(this.tremorPos=0,this.volume=this.tremorVolume,this.flags|=K),this.tremorPos++}},vibrato:{value:function(){var e=255,o=this.vibratoPos&31;switch(this.waveControl&3){case 0:e=Ko[o];break;case 1:e=o<<3,this.vibratoPos>31&&(e=255-e);break;default:break}this.vibDelta=e*this.vibratoDepth>>7,this.vibratoPos>31&&(this.vibDelta=-this.vibDelta),this.vibratoPos=this.vibratoPos+this.vibratoSpeed&63,this.flags|=pe}}});return t.volEnvelope=Xo(),t.panEnvelope=Xo(),Object.seal(t)}function Ci(){return Object.create(null,{points:{value:[],writable:!0},total:{value:0,writable:!0},sustain:{value:0,writable:!0},loopStart:{value:0,writable:!0},loopEnd:{value:0,writable:!0},flags:{value:0,writable:!0}})}function Xo(){return Object.create(null,{value:{value:0,writable:!0},position:{value:0,writable:!0},frame:{value:0,writable:!0},delta:{value:0,writable:!0},fraction:{value:0,writable:!0},stopped:{value:0,writable:!0},reset:{value:function(){this.value=0,this.position=0,this.frame=0,this.delta=0,this.fraction=0,this.stopped=0}}})}function Go(){var i=Object.create(null,{name:{value:"",writable:!0},samples:{value:[],writable:!0},noteSamples:{value:null,writable:!0},fadeout:{value:0,writable:!0},volData:{value:null,writable:!0},volEnabled:{value:0,writable:!0},panData:{value:null,writable:!0},panEnabled:{value:0,writable:!0},vibratoType:{value:0,writable:!0},vibratoSweep:{value:0,writable:!0},vibratoSpeed:{value:0,writable:!0},vibratoDepth:{value:0,writable:!0}});return i.noteSamples=new Uint8Array(96),i.volData=Ci(),i.panData=Ci(),Object.seal(i)}function $o(i,t){var e=Object.create(null,{rows:{value:[],writable:!0},length:{value:0,writable:!0},size:{value:0,writable:!0}});return e.rows.length=e.size=i*t,e.length=i,Object.seal(e)}function Ai(i,t){var e=Object.create(null,{frame:{value:0,writable:!0},value:{value:0,writable:!0}});return e.frame=i||0,e.value=t||0,Object.seal(e)}function Ki(){return Object.create(null,{note:{value:0,writable:!0},instrument:{value:0,writable:!0},volume:{value:0,writable:!0},effect:{value:0,writable:!0},param:{value:0,writable:!0}})}function Vo(){var i=jo();return Object.defineProperties(i,{finetune:{value:0,writable:!0},panning:{value:0,writable:!0},relative:{value:0,writable:!0}}),Object.seal(i)}function zn(i){var t=Ho(i);return Object.defineProperties(t,{id:{value:"F2Player"},patterns:{value:[],writable:!0},instruments:{value:[],writable:!0},voices:{value:[],writable:!0},linear:{value:0,writable:!0},complete:{value:0,writable:!0},order:{value:0,writable:!0},position:{value:0,writable:!0},nextOrder:{value:0,writable:!0},nextPosition:{value:0,writable:!0},pattern:{value:null,writable:!0},patternDelay:{value:0,writable:!0},patternOffset:{value:0,writable:!0},timer:{value:0,writable:!0},rowCurrent:{value:0,writable:!0},initialize:{value:function(){var e=0,o;for(this.reset(),this.timer=this.speed,this.order=0,this.position=0,this.nextOrder=-1,this.nextPosition=-1,this.patternDelay=0,this.patternOffset=0,this.complete=0,this.master=64,this.voices.length=this.channels;e<this.channels;++e)o=Bn(e),o.channel=this.mixer.channels[e],o.playing=this.instruments[0],o.sample=o.playing.samples[0],this.voices[e]=o,e&&(this.voices[e-1].next=o)}},loader:{value:function(e){var o,r,a,s,n,l,u,h,c,d,m=22,p,f,g,w;if(!(e.length<360)){if(e.position=17,this.title=e.readString(20),e.position++,a=e.readString(20),a==="FastTracker v2.00   "||a==="FastTracker v 2.00  ")this.version=1;else if(a==="Sk@le Tracker")m=2,this.version=2;else if(a==="MadTracker 2.0")this.version=3;else if(a==="MilkyTracker        ")this.version=4;else if(a==="DigiBooster Pro 2.18")this.version=5;else if(a.indexOf("OpenMPT")!==-1)this.version=6;else return;for(e.readUshort(),o=e.readUint(),this.length=e.readUshort(),this.restart=e.readUshort(),this.channels=e.readUshort(),w=f=e.readUshort(),this.instruments=[],this.instruments.length=e.readUshort()+1,this.linear=e.readUshort(),this.speed=e.readUshort(),this.tempo=e.readUshort(),this.track=new Uint8Array(this.length),r=0;r<this.length;++r)u=e.readUbyte(),u>=w&&(f=u+1),this.track[r]=u;if(this.patterns=[],this.patterns.length=f,f!==w){for(c=$o(64,this.channels),u=c.size,r=0;r<u;++r)c.rows[r]=Ki();this.patterns[--f]=c}for(e.position=d=o+60,h=w,r=0;r<h;++r){if(o=e.readUint(),e.position++,c=$o(e.readUshort(),this.channels),f=c.size,w=e.readUshort(),e.position=d+o,l=e.position+w,w)for(u=0;u<f;++u)p=Ki(),w=e.readUbyte(),w&128?(w&1&&(p.note=e.readUbyte()),w&2&&(p.instrument=e.readUbyte()),w&4&&(p.volume=e.readUbyte()),w&8&&(p.effect=e.readUbyte()),w&16&&(p.param=e.readUbyte())):(p.note=w,p.instrument=e.readUbyte(),p.volume=e.readUbyte(),p.effect=e.readUbyte(),p.param=e.readUbyte()),p.note!==Ji&&p.note>96&&(p.note=0),c.rows[u]=p;else for(u=0;u<f;++u)c.rows[u]=Ki();this.patterns[r]=c,d=e.position,d!==l&&(d=e.position=l)}for(l=e.position,h=this.instruments.length,r=1;r<h&&(s=e.readUint(),!(e.position+s>=e.length));++r){if(n=Go(),n.name=e.readString(22),e.position++,w=e.readUshort(),w>16&&(w=16),o=e.readUint(),m===2&&o!==64&&(o=64),w){for(n.samples=[],n.samples.length=w,u=0;u<96;++u)n.noteSamples[u]=e.readUbyte();for(u=0;u<12;++u)n.volData.points[u]=Ai(e.readUshort(),e.readUshort());for(u=0;u<12;++u)n.panData.points[u]=Ai(e.readUshort(),e.readUshort());for(n.volData.total=e.readUbyte(),n.panData.total=e.readUbyte(),n.volData.sustain=e.readUbyte(),n.volData.loopStart=e.readUbyte(),n.volData.loopEnd=e.readUbyte(),n.panData.sustain=e.readUbyte(),n.panData.loopStart=e.readUbyte(),n.panData.loopEnd=e.readUbyte(),n.volData.flags=e.readUbyte(),n.panData.flags=e.readUbyte(),n.volData.flags&Wo&&(n.volEnabled=1),n.panData.flags&Wo&&(n.panEnabled=1),n.vibratoType=e.readUbyte(),n.vibratoSweep=e.readUbyte(),n.vibratoDepth=e.readUbyte(),n.vibratoSpeed=e.readUbyte(),n.fadeout=e.readUshort()<<1,e.position+=m,d=e.position,this.instruments[r]=n,u=0;u<w;++u)g=Vo(),g.length=e.readUint(),g.loopStart=e.readUint(),g.loopLen=e.readUint(),g.volume=e.readUbyte(),g.finetune=e.readByte(),g.loopMode=e.readUbyte(),g.panning=e.readUbyte(),g.relative=e.readByte(),e.position++,g.name=e.readString(22),n.samples[u]=g,e.position=d+=o;for(u=0;u<w;++u)g=n.samples[u],g.length&&(d=e.position+g.length,g.loopMode&16&&(g.bits=16,g.loopMode^=16,g.length>>=1,g.loopStart>>=1,g.loopLen>>=1),g.loopLen||(g.loopMode=0),g.store(e),g.loopMode&&(g.length=g.loopStart+g.loopLen),e.position=d)}else e.position=l+s;if(l=e.position,l>=e.length)break}for(n=Go(),n.volData=Ci(),n.panData=Ci(),n.samples=[],r=0;r<12;++r)n.volData.points[r]=Ai(),n.panData.points[r]=Ai();for(g=Vo(),g.length=220,g.data=new Float32Array(220),r=0;r<220;++r)g.data[r]=0;n.samples[0]=g,this.instruments[0]=n}}},process:{value:function(){var e,o,r,a,s,n,l,u,h,c,d,m,p,f=this.voices[0];if(this.tick)for(;f;){if(c=this.pattern.rows[this.position+f.index],f.delay)if((c.param&15)===this.tick)f.flags=f.delay,f.delay=0;else{f=f.next;continue}if(c.volume)switch(l=c.volume>>4,u=c.volume&15,l){case 6:f.volume-=u,f.volume<0&&(f.volume=0),f.flags|=K;break;case 7:f.volume+=u,f.volume>64&&(f.volume=64),f.flags|=K;break;case 11:f.vibrato();break;case 13:f.panning-=u,f.panning<0&&(f.panning=0),f.flags|=Ie;break;case 14:f.panning+=u,f.panning>255&&(f.panning=255),f.flags|=Ie;break;case 15:f.portaPeriod&&f.tonePortamento();break;default:break}switch(l=c.param>>4,u=c.param&15,c.effect){case 0:if(!c.param)break;p=(this.tick-this.timer)%3,p<0&&(p+=3),this.tick===2&&this.timer===18&&(p=0),p?p===1?this.linear?f.arpDelta=-(u<<6):(p=this.amiga(f.note+u,f.finetune),f.arpDelta=p-f.period):this.linear?f.arpDelta=-(l<<6):(p=this.amiga(f.note+l,f.finetune),f.arpDelta=p-f.period):f.arpDelta=0,f.flags|=pe;break;case 1:f.period-=f.portaU,f.period<0&&(f.period=0),f.flags|=pe;break;case 2:f.period+=f.portaD,f.period>9212&&(f.period=9212),f.flags|=pe;break;case 3:f.portaPeriod&&f.tonePortamento();break;case 4:l&&(f.vibratoSpeed=l),u&&(f.vibratoDepth=u<<2),f.vibrato();break;case 5:m=1,f.portaPeriod&&f.tonePortamento();break;case 6:m=1,f.vibrato();break;case 7:f.tremolo();break;case 10:m=1;break;case 14:switch(l){case 9:this.tick%u===0&&(f.volEnvelope.reset(),f.panEnvelope.reset(),f.flags|=K|Ie|vt);break;case 12:this.tick===u&&(f.volume=0,f.flags|=K);break;default:break}break;case 17:l=f.volSlideMaster>>4,u=f.volSlideMaster&15,l?(this.master+=l,this.master>64&&(this.master=64),f.flags|=K):u&&(this.master-=u,this.master<0&&(this.master=0),f.flags|=K);break;case 20:this.tick===c.param&&(f.fadeEnabled=1,f.keyoff=1);break;case 24:l=f.panSlide>>4,u=f.panSlide&15,l?(f.panning+=l,f.panning>255&&(f.panning=255),f.flags|=Ie):u&&(f.panning-=u,f.panning<0&&(f.panning=0),f.flags|=Ie);break;case 27:if(e=this.tick,c.volume||e++,e%f.retrigy)break;(!c.volume||c.volume>80)&&f.retrigx&&this.retrig(f),f.flags|=vt;break;case 29:f.tremor();break;default:break}m&&(l=f.volSlide>>4,u=f.volSlide&15,m=0,l?(f.volume+=l,f.flags|=K):u&&(f.volume-=u,f.flags|=K)),f=f.next}else for(this.nextOrder>=0&&(this.order=this.nextOrder),this.nextPosition>=0&&(this.position=this.nextPosition),this.nextOrder=this.nextPosition=-1,this.pattern=this.patterns[this.track[this.order]];f;){if(this.rowCurrent=this.position+f.index,c=this.pattern.rows[this.rowCurrent],e=c.volume>>4,h=c.effect===3||c.effect===5||e===15,l=c.param>>4,f.keyoff=0,f.arpDelta&&(f.arpDelta=0,f.flags|=pe),c.instrument?(f.instrument=c.instrument<this.instruments.length?this.instruments[c.instrument]:null,f.volEnvelope.reset(),f.panEnvelope.reset(),f.flags|=K|Ie|lt):(c.note===Ji||c.effect===20&&!c.param)&&(f.fadeEnabled=1,f.keyoff=1),c.note&&c.note!==Ji?f.instrument?(r=f.instrument,p=c.note-1,d=r.samples[r.noteSamples[p]],p+=d.relative,p>=qn&&p<=jn&&(h||(f.note=p,f.sample=d,c.instrument?(f.volEnabled=r.volEnabled,f.panEnabled=r.panEnabled,f.flags|=Un):f.flags|=pe|vt),c.instrument?(f.reset(),f.fadeDelta=r.fadeout):f.finetune=d.finetune>>3<<2,c.effect===14&&l===5&&(f.finetune=(c.param&15)-8<<3),this.linear?p=(120-p<<6)-f.finetune:p=this.amiga(p,f.finetune),h?f.portaPeriod=p:(f.period=p,f.glissPeriod=0))):(f.volume=0,f.flags=K|lt):f.vibratoReset&&c.effect!==4&&c.effect!==6&&(f.vibDelta=0,f.vibratoReset=0,f.flags|=pe),c.volume)if(c.volume>=16&&c.volume<=80)f.volume=c.volume-16,f.flags|=K|lt;else switch(u=c.volume&15,e){case 6:f.volume-=u,f.volume<0&&(f.volume=0),f.flags|=K;break;case 7:f.volume+=u,f.volume>64&&(f.volume=64),f.flags|=K;break;case 10:u&&(f.vibratoSpeed=u);break;case 11:u&&(f.vibratoDepth=u<<2);break;case 12:f.panning=u<<4,f.flags|=Ie;break;case 15:u&&(f.portaSpeed=u<<4);break;default:break}if(c.effect)switch(u=c.param&15,c.effect){case 1:c.param&&(f.portaU=c.param<<2);break;case 2:c.param&&(f.portaD=c.param<<2);break;case 3:c.param&&e!==15&&(f.portaSpeed=c.param);break;case 4:f.vibratoReset=1;break;case 5:c.param&&(f.volSlide=c.param);break;case 6:c.param&&(f.volSlide=c.param),f.vibratoReset=1;break;case 7:l&&(f.tremoloSpeed=l),u&&(f.tremoloDepth=u);break;case 8:f.panning=c.param,f.flags|=Ie;break;case 9:c.param&&(f.sampleOffset=c.param<<8),f.sampleOffset>=f.sample.length&&(f.volume=0,f.sampleOffset=0,f.flags&=~(pe|vt),f.flags|=K|lt);break;case 10:c.param&&(f.volSlide=c.param);break;case 11:this.nextOrder=c.param,this.nextOrder>=this.length?this.complete=1:this.nextPosition=0,s=1,this.patternOffset=0;break;case 12:f.volume=c.param,f.flags|=K|lt;break;case 13:this.nextPosition=(l*10+u)*this.channels,this.patternOffset=0,s||(this.nextOrder=this.order+1,this.nextOrder>=this.length&&(this.complete=1,this.nextPosition=-1));break;case 14:switch(l){case 1:u&&(f.finePortaU=u<<2),f.period-=f.finePortaU,f.flags|=pe;break;case 2:u&&(f.finePortaD=u<<2),f.period+=f.finePortaD,f.flags|=pe;break;case 3:f.glissando=u;break;case 4:f.waveControl=f.waveControl&240|u;break;case 6:u?(f.patternLoop?f.patternLoop--:f.patternLoop=u,f.patternLoop&&(this.nextPosition=f.patternLoopRow)):f.patternLoopRow=this.patternOffset=this.position;break;case 7:f.waveControl=f.waveControl&15|u<<4;break;case 10:u&&(f.fineSlideU=u),f.volume+=f.fineSlideU,f.flags|=K;break;case 11:u&&(f.fineSlideD=u),f.volume-=f.fineSlideD,f.flags|=K;break;case 13:f.delay=f.flags,f.flags=0;break;case 14:this.patternDelay=u*this.timer;break;default:break}break;case 15:if(!c.param)break;c.param<32?this.timer=c.param:this.mixer.samplesTick=this.sampleRate*2.5/c.param>>0;break;case 16:this.master=c.param,this.master>64&&(this.master=64),f.flags|=K;break;case 17:c.param&&(f.volSlideMaster=c.param);break;case 21:if(!f.instrument||!f.instrument.volEnabled)break;for(r=f.instrument,p=c.param,l=r.volData.total,a=0;a<l&&!(p<r.volData.points[a].frame);a++);f.volEnvelope.position=--a,l--,r.volData.flags&Yo&&a===r.volData.loopEnd&&(a=f.volEnvelope.position=r.volData.loopStart,p=r.volData.points[a].frame,f.volEnvelope.frame=p),a>=l?(f.volEnvelope.value=r.volData.points[l].value,f.volEnvelope.stopped=1):(f.volEnvelope.stopped=0,f.volEnvelope.frame=p,p>r.volData.points[a].frame&&f.volEnvelope.position++,o=r.volData.points[a],n=r.volData.points[++a],p=n.frame-o.frame,f.volEnvelope.delta=(p?(n.value-o.value<<8)/p>>0:0)||0,f.volEnvelope.fraction=o.value<<8);break;case 24:c.param&&(f.panSlide=c.param);break;case 27:if(l&&(f.retrigx=l),u&&(f.retrigy=u),!c.volume&&f.retrigy){if(e=this.tick+1,e%f.retrigy)break;c.volume>80&&f.retrigx&&this.retrig(f)}break;case 29:c.param&&(f.tremorOn=++l,f.tremorOff=++u+l);break;case 33:l===1?(u&&(f.xtraPortaU=u),f.period-=f.xtraPortaU,f.flags|=pe):l===2&&(u&&(f.xtraPortaD=u),f.period+=f.xtraPortaD,f.flags|=pe);break;default:break}f=f.next}++this.tick>=this.timer+this.patternDelay&&(this.patternDelay=this.tick=0,this.nextPosition<0&&(this.nextPosition=this.position+this.channels,(this.nextPosition>=this.pattern.size||this.complete)&&(this.nextOrder=this.order+1,this.nextPosition=this.patternOffset,this.nextOrder>=this.length&&(this.nextOrder=this.restart,this.mixer.complete=1))))}},fast:{value:function(){for(var e,o,r,a,s,n=this.voices[0],l;n;)e=n.channel,r=n.flags,n.flags=0,r&vt&&(e.index=n.sampleOffset,e.pointer=-1,e.dir=0,e.fraction=0,e.sample=n.sample,e.length=n.sample.length,e.enabled=e.sample.data?1:0,n.playing=n.instrument,n.sampleOffset=0),a=n.playing,o=a.vibratoSpeed?n.autoVibrato():0,l=n.volume+n.volDelta,a.volEnabled?(n.volEnabled&&!n.volEnvelope.stopped&&this.envelope(n,n.volEnvelope,a.volData),l=l*n.volEnvelope.value>>6,r|=K,n.fadeEnabled&&(n.fadeVolume-=n.fadeDelta,n.fadeVolume<0?(l=0,n.fadeVolume=0,n.fadeEnabled=0,n.volEnvelope.value=0,n.volEnvelope.stopped=1,n.panEnvelope.stopped=1):l=l*n.fadeVolume>>16)):n.keyoff&&(l=0,r|=K),s=n.panning,a.panEnabled&&(n.panEnabled&&!n.panEnvelope.stopped&&this.envelope(n,n.panEnvelope,a.panData),s=n.panEnvelope.value<<2,r|=Ie,s<0?s=0:s>255&&(s=255)),r&K&&(l<0?l=0:l>64&&(l=64),e.volume=Jo[l*this.master>>6],e.lvol=e.volume*e.lpan,e.rvol=e.volume*e.rpan),r&Ie&&(e.panning=s,e.lpan=xt[256-s],e.rpan=xt[s],e.lvol=e.volume*e.lpan,e.rvol=e.volume*e.rpan),r&pe&&(o+=n.period+n.arpDelta+n.vibDelta,this.linear?e.speed=(548077568*Math.pow(2,(4608-o)/768)/this.sampleRate>>0)/65536:e.speed=(65536*(14317456/o)/this.sampleRate>>0)/65536,e.delta=e.speed>>0,e.speed-=e.delta),n=n.next}},accurate:{value:function(){for(var e,o,r,a,s,n,l,u,h,c=this.voices[0],d;c;){if(e=c.channel,r=c.flags,c.flags=0,r&vt&&(e.sample&&(r|=lt,e.mixCounter=220,e.oldSample=null,e.oldPointer=-1,e.enabled&&(e.oldDir=e.dir,e.oldFraction=e.fraction,e.oldSpeed=e.speed,e.oldSample=e.sample,e.oldPointer=e.pointer,e.oldLength=e.length,e.lmixRampD=e.lvol,e.lmixDeltaD=e.lvol/220,e.rmixRampD=e.rvol,e.rmixDeltaD=e.rvol/220)),e.dir=1,e.fraction=0,e.sample=c.sample,e.pointer=c.sampleOffset,e.length=c.sample.length,e.enabled=e.sample.data?1:0,c.playing=c.instrument,c.sampleOffset=0),a=c.playing,o=a.vibratoSpeed?c.autoVibrato():0,d=c.volume+c.volDelta,a.volEnabled?(c.volEnabled&&!c.volEnvelope.stopped&&this.envelope(c,c.volEnvelope,a.volData),d=d*c.volEnvelope.value>>6,r|=K,c.fadeEnabled&&(c.fadeVolume-=c.fadeDelta,c.fadeVolume<0?(d=0,c.fadeVolume=0,c.fadeEnabled=0,c.volEnvelope.value=0,c.volEnvelope.stopped=1,c.panEnvelope.stopped=1):d=d*c.fadeVolume>>16)):c.keyoff&&(d=0,r|=K),l=c.panning,a.panEnabled&&(c.panEnabled&&!c.panEnvelope.stopped&&this.envelope(c,c.panEnvelope,a.panData),l=c.panEnvelope.value<<2,r|=Ie,l<0?l=0:l>255&&(l=255)),!e.enabled){e.volCounter=0,e.panCounter=0,c=c.next;continue}r&K&&(d<0?d=0:d>64&&(d=64),d=Jo[d*this.master>>6],n=d*xt[256-l],h=d*xt[l],d!==e.volume&&!e.mixCounter?(e.volCounter=r&lt?220:this.mixer.samplesTick,e.lvolDelta=(n-e.lvol)/e.volCounter,e.rvolDelta=(h-e.rvol)/e.volCounter):(e.lvol=n,e.rvol=h),e.volume=d),r&Ie&&(s=xt[256-l],u=xt[l],l!==e.panning&&!e.mixCounter&&!e.volCounter?(e.panCounter=this.mixer.samplesTick,e.lpanDelta=(s-e.lpan)/e.panCounter,e.rpanDelta=(u-e.rpan)/e.panCounter):(e.lpan=s,e.rpan=u),e.panning=l),r&pe&&(o+=c.period+c.arpDelta+c.vibDelta,this.linear?e.speed=(548077568*Math.pow(2,(4608-o)/768)/this.sampleRate>>0)/65536:e.speed=(65536*(14317456/o)/this.sampleRate>>0)/65536),e.mixCounter&&(e.lmixRampU=0,e.lmixDeltaU=e.lvol/220,e.rmixRampU=0,e.rmixDeltaU=e.rvol/220),c=c.next}}},envelope:{value:function(e,o,r){var a=o.position,s=r.points[a],n;if(o.frame===s.frame){if(r.flags&Yo&&a===r.loopEnd&&(a=o.position=r.loopStart,s=r.points[a],o.frame=s.frame),a===r.total-1){o.value=s.value,o.stopped=1;return}if(r.flags&Nn&&a===r.sustain&&!e.fadeEnabled){o.value=s.value;return}o.position++,n=r.points[o.position],o.delta=(n.value-s.value<<8)/(n.frame-s.frame)>>0||0,o.fraction=s.value<<8}else o.fraction+=o.delta;o.value=o.fraction>>8,o.frame++}},amiga:{value:function(e,o){var r=0,a=Qi[++e];return o<0?r=(Qi[--e]-a)/64:o>0&&(r=(a-Qi[++e])/64),a-r*o>>0}},retrig:{value:function(e){switch(e.retrigx){case 1:e.volume--;break;case 2:e.volume++;break;case 3:e.volume-=4;break;case 4:e.volume-=8;break;case 5:e.volume-=16;break;case 6:e.volume=(e.volume<<1)/3;break;case 7:e.volume>>=1;break;case 8:e.volume=e.sample.volume;break;case 9:e.volume++;break;case 10:e.volume+=2;break;case 11:e.volume+=4;break;case 12:e.volume+=8;break;case 13:e.volume+=16;break;case 14:e.volume=e.volume*3>>1;break;case 15:e.volume<<=1;break;default:break}e.volume<0?e.volume=0:e.volume>64&&(e.volume=64),e.flags|=K}}}),Object.seal(t)}var pe=1,K=2,Ie=4,vt=8,Un=15,lt=32,Wo=1,Nn=2,Yo=4,qn=0,jn=118,Ji=97,Hn=[0,-2,-3,-5,-6,-8,-9,-11,-12,-14,-16,-17,-19,-20,-22,-23,-24,-26,-27,-29,-30,-32,-33,-34,-36,-37,-38,-39,-41,-42,-43,-44,-45,-46,-47,-48,-49,-50,-51,-52,-53,-54,-55,-56,-56,-57,-58,-59,-59,-60,-60,-61,-61,-62,-62,-62,-63,-63,-63,-64,-64,-64,-64,-64,-64,-64,-64,-64,-64,-64,-63,-63,-63,-62,-62,-62,-61,-61,-60,-60,-59,-59,-58,-57,-56,-56,-55,-54,-53,-52,-51,-50,-49,-48,-47,-46,-45,-44,-43,-42,-41,-39,-38,-37,-36,-34,-33,-32,-30,-29,-27,-26,-24,-23,-22,-20,-19,-17,-16,-14,-12,-11,-9,-8,-6,-5,-3,-2,0,2,3,5,6,8,9,11,12,14,16,17,19,20,22,23,24,26,27,29,30,32,33,34,36,37,38,39,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,56,57,58,59,59,60,60,61,61,62,62,62,63,63,63,64,64,64,64,64,64,64,64,64,64,64,63,63,63,62,62,62,61,61,60,60,59,59,58,57,56,56,55,54,53,52,51,50,49,48,47,46,45,44,43,42,41,39,38,37,36,34,33,32,30,29,27,26,24,23,22,20,19,17,16,14,12,11,9,8,6,5,3,2],Ko=[0,24,49,74,97,120,141,161,180,197,212,224,235,244,250,253,255,253,250,244,235,224,212,197,180,161,141,120,97,74,49,24],xt=[0,.04417,.062489,.076523,.088371,.098821,.108239,.116927,.124977,.132572,.139741,.146576,.153077,.159335,.16535,.171152,.176772,.18221,.187496,.19263,.197643,.202503,.207273,.211951,.216477,.220943,.225348,.229631,.233854,.237985,.242056,.246066,.249985,.253873,.25767,.261437,.265144,.268819,.272404,.275989,.279482,.282976,.286409,.289781,.293153,.296464,.299714,.302965,.306185,.309344,.312473,.315602,.318671,.321708,.324746,.327754,.3307,.333647,.336563,.339449,.342305,.345161,.347986,.350781,.353545,.356279,.359013,.361717,.364421,.367094,.369737,.37238,.374992,.377574,.380157,.382708,.38526,.387782,.390303,.392794,.395285,.397746,.400176,.402606,.405037,.407437,.409836,.412206,.414576,.416915,.419254,.421563,.423841,.42618,.428458,.430737,.432985,.435263,.437481,.439729,.441916,.444134,.446321,.448508,.450665,.452852,.455009,.457136,.459262,.461389,.463485,.465611,.467708,.469773,.471839,.473935,.47597,.478036,.480072,.482077,.484112,.486117,.488122,.490127,.492101,.494106,.496051,.498025,.5,.501944,.503888,.505802,.507746,.50966,.511574,.513488,.515371,.517255,.519138,.521022,.522905,.524758,.526611,.528465,.530318,.53214,.533993,.535816,.537639,.539462,.541254,.543046,.544839,.546631,.548423,.550216,.551978,.553739,.555501,.557263,.558995,.560757,.562489,.56422,.565952,.567683,.569384,.571116,.572817,.574518,.57622,.57789,.579592,.581262,.582964,.584634,.586305,.587946,.589617,.591257,.592928,.594568,.596209,.597849,.599459,.6011,.60271,.60435,.60596,.60757,.60915,.61076,.61237,.61395,.61556,.617139,.618719,.620268,.621848,.623428,.624977,.626557,.628106,.629655,.631205,.632754,.634303,.635822,.637372,.63889,.64044,.641959,.643478,.644966,.646485,.648004,.649523,.651012,.6525,.653989,.655477,.656966,.658454,.659943,.661431,.66289,.664378,.665836,.667294,.668783,.670241,.671699,.673127,.674585,.676043,.677471,.678929,.680357,.681785,.683213,.684641,.686068,.687496,.688894,.690321,.691749,.693147,.694574,.695972,.697369,.698767,.700164,.701561,.702928,.704326,.705723,.70711],Jo=[0,.005863,.013701,.021569,.029406,.037244,.045082,.052919,.060757,.068625,.076463,.0843,.092138,.099976,.107844,.115681,.123519,.131357,.139194,.147032,.1549,.162738,.170575,.178413,.186251,.194119,.201956,.209794,.217632,.225469,.233307,.241175,.249013,.25685,.264688,.272526,.280394,.288231,.296069,.303907,.311744,.319582,.32745,.335288,.343125,.350963,.3588,.366669,.374506,.382344,.390182,.398019,.405857,.413725,.421563,.4294,.437238,.445076,.452944,.460781,.468619,.476457,.484294,.492132,.5],Qi=[29024,27392,25856,24384,23040,21696,20480,19328,18240,17216,16256,15360,14512,13696,12928,12192,11520,10848,10240,9664,9120,8608,8128,7680,7256,6848,6464,6096,5760,5424,5120,4832,4560,4304,4064,3840,3628,3424,3232,3048,2880,2712,2560,2416,2280,2152,2032,1920,1814,1712,1616,1524,1440,1356,1280,1208,1140,1076,1016,960,907,856,808,762,720,678,640,604,570,538,508,480,453,428,404,381,360,339,320,302,285,269,254,240,227,214,202,190,180,169,160,151,142,134,127,120,113,107,101,95,90,85,80,75,71,67,63,60,57,53,50,48,45,42,40,38,36,34,32,30,28],Qo=zn;function Fi(i){return Object.create(null,{index:{value:i,writable:!0},next:{value:null,writable:!0},channel:{value:null,writable:!0},sample:{value:null,writable:!0},enabled:{value:0,writable:!0},period:{value:0,writable:!0},effect:{value:0,writable:!0},param:{value:0,writable:!0},volume:{value:0,writable:!0},portaDir:{value:0,writable:!0},portaPeriod:{value:0,writable:!0},portaSpeed:{value:0,writable:!0},vibratoPos:{value:0,writable:!0},vibratoSpeed:{value:0,writable:!0},initialize:{value:function(){this.channel=null,this.sample=null,this.enabled=0,this.period=0,this.effect=0,this.param=0,this.volume=0,this.portaDir=0,this.portaPeriod=0,this.portaSpeed=0,this.vibratoPos=0,this.vibratoSpeed=0}}})}function Xn(i){var t=Si(i);return Object.defineProperties(t,{id:{value:"MKPlayer"},track:{value:null,writable:!0},patterns:{value:[],writable:!0},samples:{value:[],writable:!0},length:{value:0,writable:!0},restart:{value:0,writable:!0},voices:{value:[],writable:!0},trackPos:{value:0,writable:!0},patternPos:{value:0,writable:!0},jumpFlag:{value:0,writable:!0},vibratoDepth:{value:0,writable:!0},restartSave:{value:0,writable:!0},force:{set:function(e){e<Zi?e=Zi:e>ct&&(e=ct),this.version=e,e===ct?this.vibratoDepth=6:this.vibratoDepth=7,e===Zo?(this.restartSave=this.restart,this.restart=0):(this.restart=this.restartSave,this.restartSave=0)}},initialize:{value:function(){var e=this.voices[0];for(this.reset(),this.force=this.version,this.speed=6,this.trackPos=0,this.patternPos=0,this.jumpFlag=0;e;)e.initialize(),e.channel=this.mixer.channels[e.index],e.sample=this.samples[0],e=e.next}},loader:{value:function(e){var o=0,r,a,s,n,l,u=0,h;if(!(e.length<2106)&&(e.position=1080,a=e.readString(4),!(a!=="M.K."&&a!=="FLT4"))){for(e.position=0,this.title=e.readString(20),this.version=Zi,e.position+=22,r=1;r<32;++r){if(h=e.readUshort(),!h){this.samples[r]=null,e.position+=28;continue}l=Nt(),e.position-=24,l.name=e.readString(22),l.length=h<<1,e.position+=3,l.volume=e.readUbyte(),l.loop=e.readUshort()<<1,l.repeat=e.readUshort()<<1,e.position+=22,l.pointer=u,u+=l.length,this.samples[r]=l,l.length>32768&&(this.version=Gn)}for(e.position=950,this.length=e.readUbyte(),h=e.readUbyte(),this.restart=h<this.length?h:0,r=0;r<128;++r)h=e.readUbyte()<<8,this.track[r]=h,h>o&&(o=h);for(e.position=1084,o+=256,this.patterns.length=o,r=0;r<o;++r)if(n=_i(),h=e.readUint(),n.note=h>>16&4095,n.effect=h>>8&15,n.sample=h>>24&240|h>>12&15,n.param=h&255,this.patterns[r]=n,(n.sample>31||!this.samples[n.sample])&&(n.sample=0),(n.effect===3||n.effect===4)&&(this.version=Zo),(n.effect===5||n.effect===6)&&(this.version=ct),n.effect>6&&n.effect<10){this.version=0;return}for(this.mixer.store(e,u),r=1;r<32;++r)if(l=this.samples[r],!!l)for(l.name.indexOf("2.0")>-1&&(this.version=ct),l.loop?(l.loopPtr=l.pointer+l.loop,l.length=l.loop+l.repeat):(l.loopPtr=this.mixer.memory.length,l.repeat=2),u=l.pointer+4,s=l.pointer;s<u;++s)this.mixer.memory[s]=0;l=Nt(),l.pointer=l.loopPtr=this.mixer.memory.length,l.length=l.repeat=2,this.samples[0]=l,this.version<ct&&this.restart!==127&&(this.version=$n)}}},process:{value:function(){var e,o,r,a,s,n,l,u,h,c=this.voices[0];if(this.tick)for(;c;){if(e=c.channel,!c.effect&&!c.param){e.period=c.period,c=c.next;continue}switch(c.effect){case 0:if(h=this.tick%3,!h){e.period=c.period,c=c.next;continue}for(h===1?h=c.param>>4:h=c.param&15,s=c.period&4095,r=37-h,o=0;o<r;++o)if(s>=er[o]){e.period=er[o+h];break}break;case 1:c.period-=c.param,c.period<113&&(c.period=113),e.period=c.period;break;case 2:c.period+=c.param,c.period>856&&(c.period=856),e.period=c.period;break;case 3:case 5:c.effect===5?u=1:c.param&&(c.portaSpeed=c.param,c.param=0),c.portaPeriod&&(c.portaDir?(c.period-=c.portaSpeed,c.period<=c.portaPeriod&&(c.period=c.portaPeriod,c.portaPeriod=0)):(c.period+=c.portaSpeed,c.period>=c.portaPeriod&&(c.period=c.portaPeriod,c.portaPeriod=0))),e.period=c.period;break;case 4:case 6:c.effect===6?u=1:c.param&&(c.vibratoSpeed=c.param),h=c.vibratoPos>>2&31,h=(c.vibratoSpeed&15)*Vn[h]>>this.vibratoDepth,c.vibratoPos>127?e.period=c.period-h:e.period=c.period+h,h=c.vibratoSpeed>>2&60,c.vibratoPos=c.vibratoPos+h&255;break;case 10:u=1;break;default:break}u&&(h=c.param>>4,u=0,h?c.volume+=h:c.volume-=c.param&15,c.volume<0?c.volume=0:c.volume>64&&(c.volume=64),e.volume=c.volume),c=c.next}else for(a=this.track[this.trackPos]+this.patternPos;c;){switch(e=c.channel,c.enabled=0,n=this.patterns[a+c.index],c.effect=n.effect,c.param=n.param,n.sample?(l=c.sample=this.samples[n.sample],e.volume=c.volume=l.volume):l=c.sample,n.note&&(c.effect===3||c.effect===5?n.note<c.period?(c.portaDir=1,c.portaPeriod=n.note):n.note>c.period?(c.portaDir=0,c.portaPeriod=n.note):c.portaPeriod=0:(c.enabled=1,c.vibratoPos=0,e.enabled=0,e.pointer=l.pointer,e.length=l.length,e.period=c.period=n.note)),c.effect){case 11:this.trackPos=c.param-1,this.jumpFlag^=1;break;case 12:e.volume=c.param,this.version===ct&&(c.volume=c.param);break;case 13:this.jumpFlag^=1;break;case 14:this.mixer.filter.active=c.param^1;break;case 15:h=c.param,h<1?h=1:h>31&&(h=31),this.speed=h,this.tick=0;break;default:break}c.enabled&&(e.enabled=1),e.pointer=l.loopPtr,e.length=l.repeat,c=c.next}++this.tick===this.speed&&(this.tick=0,this.patternPos+=4,(this.patternPos===256||this.jumpFlag)&&(this.patternPos=this.jumpFlag=0,this.trackPos=++this.trackPos&127,this.trackPos===this.length&&(this.trackPos=this.restart,this.mixer.complete=1)))}}}),t.voices[0]=Fi(0),t.voices[0].next=t.voices[1]=Fi(1),t.voices[1].next=t.voices[2]=Fi(2),t.voices[2].next=t.voices[3]=Fi(3),t.track=new Uint16Array(128),Object.seal(t)}var Zi=1,Gn=2,Zo=3,$n=4,ct=5,er=[856,808,762,720,678,640,604,570,538,508,480,453,428,404,381,360,339,320,302,285,269,254,240,226,214,202,190,180,170,160,151,143,135,127,120,113,0],Vn=[0,24,49,74,97,120,141,161,180,197,212,224,235,244,250,253,255,253,250,244,235,224,212,197,180,161,141,120,97,74,49,24],tr=Xn;function Pi(i){return Object.create(null,{index:{value:i,writable:!0},next:{value:null,writable:!0},channel:{value:null,writable:!0},sample:{value:null,writable:!0},enabled:{value:0,writable:!0},loopCtr:{value:0,writable:!0},loopPos:{value:0,writable:!0},step:{value:0,writable:!0},period:{value:0,writable:!0},effect:{value:0,writable:!0},param:{value:0,writable:!0},volume:{value:0,writable:!0},pointer:{value:0,writable:!0},length:{value:0,writable:!0},loopPtr:{value:0,writable:!0},repeat:{value:0,writable:!0},finetune:{value:0,writable:!0},offset:{value:0,writable:!0},portaDir:{value:0,writable:!0},portaPeriod:{value:0,writable:!0},portaSpeed:{value:0,writable:!0},glissando:{value:0,writable:!0},tremoloParam:{value:0,writable:!0},tremoloPos:{value:0,writable:!0},tremoloWave:{value:0,writable:!0},vibratoParam:{value:0,writable:!0},vibratoPos:{value:0,writable:!0},vibratoWave:{value:0,writable:!0},funkPos:{value:0,writable:!0},funkSpeed:{value:0,writable:!0},funkWave:{value:0,writable:!0},initialize:{value:function(){this.channel=null,this.sample=null,this.enabled=0,this.loopCtr=0,this.loopPos=0,this.step=0,this.period=0,this.effect=0,this.param=0,this.volume=0,this.pointer=0,this.length=0,this.loopPtr=0,this.repeat=0,this.finetune=0,this.offset=0,this.portaDir=0,this.portaPeriod=0,this.portaSpeed=0,this.glissando=0,this.tremoloParam=0,this.tremoloPos=0,this.tremoloWave=0,this.vibratoParam=0,this.vibratoPos=0,this.vibratoWave=0,this.funkPos=0,this.funkSpeed=0,this.funkWave=0}}})}function Wn(){var i=_i();return Object.defineProperties(i,{step:{value:0,writable:!0}}),Object.seal(i)}function ir(){var i=Nt();return Object.defineProperties(i,{finetune:{value:0,writable:!0},realLen:{value:0,writable:!0}}),Object.seal(i)}function Yn(i){var t=Si(i);return Object.defineProperties(t,{id:{value:"PTPlayer"},track:{value:null,writable:!0},patterns:{value:[],writable:!0},samples:{value:[],writable:!0},length:{value:0,writable:!0},voices:{value:[],writable:!0},trackPos:{value:0,writable:!0},patternPos:{value:0,writable:!0},patternBreak:{value:0,writable:!0},patternDelay:{value:0,writable:!0},breakPos:{value:0,writable:!0},jumpFlag:{value:0,writable:!0},vibratoDepth:{value:0,writable:!0},force:{set:function(e){e<Ti?e=Ti:e>eo&&(e=eo),this.version=e,e<or?this.vibratoDepth=6:this.vibratoDepth=7}},initialize:{value:function(){var e=this.voices[0];for(this.tempo=125,this.speed=6,this.trackPos=0,this.patternPos=0,this.patternBreak=0,this.patternDelay=0,this.breakPos=0,this.jumpFlag=0,this.reset(),this.force=this.version;e;)e.initialize(),e.channel=this.mixer.channels[e.index],e.sample=this.samples[0],e=e.next}},loader:{value:function(e){var o=0,r,a,s,n,l,u=0,h;if(!(e.length<2106)&&(e.position=1080,a=e.readString(4),!(a!=="M.K."&&a!=="M!K!"))){for(e.position=0,this.title=e.readString(20),this.version=Ti,e.position+=22,r=1;r<32;++r){if(h=e.readUshort(),!h){this.samples[r]=null,e.position+=28;continue}l=ir(),e.position-=24,l.name=e.readString(22),l.length=l.realLen=h<<1,e.position+=2,l.finetune=e.readUbyte()*37,l.volume=e.readUbyte(),l.loop=e.readUshort()<<1,l.repeat=e.readUshort()<<1,e.position+=22,l.pointer=u,u+=l.length,this.samples[r]=l}for(e.position=950,this.length=e.readUbyte(),e.position++,r=0;r<128;++r)h=e.readUbyte()<<8,this.track[r]=h,h>o&&(o=h);for(e.position=1084,o+=256,this.patterns.length=o,r=0;r<o;++r)n=Wn(),n.step=h=e.readUint(),n.note=h>>16&4095,n.effect=h>>8&15,n.sample=h>>24&240|h>>12&15,n.param=h&255,this.patterns[r]=n,(n.sample>31||!this.samples[n.sample])&&(n.sample=0),n.effect===15&&n.param>31&&(this.version=or),n.effect===8&&(this.version=eo);for(this.mixer.store(e,u),r=1;r<32;++r)if(l=this.samples[r],!!l)for(l.loop||l.repeat>4?(l.loopPtr=l.pointer+l.loop,l.length=l.loop+l.repeat):(l.loopPtr=this.mixer.memory.length,l.repeat=2),u=l.pointer+2,s=l.pointer;s<u;++s)this.mixer.memory[s]=0;l=ir(),l.pointer=l.loopPtr=this.mixer.memory.length,l.length=l.repeat=2,this.samples[0]=l}}},process:{value:function(){var e,o,r,a,s,n,l=this.voices[0];if(this.tick)this.effects();else if(this.patternDelay)this.effects();else{for(r=this.track[this.trackPos]+this.patternPos;l;){if(e=l.channel,l.enabled=0,l.step||(e.period=l.period),a=this.patterns[r+l.index],l.step=a.step,l.effect=a.effect,l.param=a.param,a.sample?(s=l.sample=this.samples[a.sample],l.pointer=s.pointer,l.length=s.length,l.loopPtr=l.funkWave=s.loopPtr,l.repeat=s.repeat,l.finetune=s.finetune,e.volume=l.volume=s.volume):s=l.sample,a.note)if((l.step&4080)===3664)l.finetune=(l.param&15)*37;else if(l.effect===3||l.effect===5)if(a.note===l.period)l.portaPeriod=0;else{for(o=l.finetune,n=o+37;o<n&&!(a.note>=ot[o]);++o);o===n&&n--,o>0&&(n=l.finetune/37>>0&8,n&&o--),l.portaPeriod=ot[o],l.portaDir=a.note>l.portaPeriod?0:1}else l.effect===9&&this.moreEffects(l);else{this.moreEffects(l),l=l.next;continue}for(o=0;o<37&&!(a.note>=ot[o]);++o);if(l.period=ot[l.finetune+o],(l.step&4080)===3792){l.funkSpeed&&this.updateFunk(l),this.extended(l),l=l.next;continue}l.vibratoWave<4&&(l.vibratoPos=0),l.tremoloWave<4&&(l.tremoloPos=0),e.enabled=0,e.pointer=l.pointer,e.length=l.length,e.period=l.period,l.enabled=1,this.moreEffects(l),l=l.next}for(l=this.voices[0];l;)e=l.channel,l.enabled&&(e.enabled=1),e.pointer=l.loopPtr,e.length=l.repeat,l=l.next}++this.tick===this.speed&&(this.tick=0,this.patternPos+=4,this.patternDelay&&--this.patternDelay&&(this.patternPos-=4),this.patternBreak&&(this.patternBreak=0,this.patternPos=this.breakPos,this.breakPos=0),(this.patternPos===256||this.jumpFlag)&&(this.patternPos=this.breakPos,this.breakPos=0,this.jumpFlag=0,++this.trackPos===this.length&&(this.trackPos=0,this.mixer.complete=1)))}},effects:{value:function(){for(var e,o,r,a,s,n=this.voices[0],l;n;){if(e=n.channel,n.funkSpeed&&this.updateFunk(n),(n.step&4095)===0){e.period=n.period,n=n.next;continue}switch(n.effect){case 0:if(s=this.tick%3,!s){e.period=n.period,n=n.next;continue}for(s===1?s=n.param>>4:s=n.param&15,o=n.finetune,r=o+37;o<r;++o)if(n.period>=ot[o]){e.period=ot[o+s];break}break;case 1:n.period-=n.param,n.period<113&&(n.period=113),e.period=n.period;break;case 2:n.period+=n.param,n.period>856&&(n.period=856),e.period=n.period;break;case 3:case 5:if(n.effect===5?a=1:(n.portaSpeed=n.param,n.param=0),n.portaPeriod)if(n.portaDir?(n.period-=n.portaSpeed,n.period<=n.portaPeriod&&(n.period=n.portaPeriod,n.portaPeriod=0)):(n.period+=n.portaSpeed,n.period>=n.portaPeriod&&(n.period=n.portaPeriod,n.portaPeriod=0)),n.glissando){for(o=n.finetune,s=o+37;o<s&&!(n.period>=ot[o]);++o);o===s&&o--,e.period=ot[o]}else e.period=n.period;break;case 4:case 6:n.effect===6?a=1:n.param&&(s=n.param&15,s&&(n.vibratoParam=n.vibratoParam&240|s),s=n.param&240,s&&(n.vibratoParam=n.vibratoParam&15|s)),r=n.vibratoPos>>2&31,l=n.vibratoWave&3,l?(s=255,r<<=3,l===1&&(n.vibratoPos>127?s-=r:s=r)):s=rr[r],s=(n.vibratoParam&15)*s>>this.vibratoDepth,n.vibratoPos>127?e.period=n.period-s:e.period=n.period+s,s=n.vibratoParam>>2&60,n.vibratoPos=n.vibratoPos+s&255;break;case 7:e.period=n.period,n.param&&(s=n.param&15,s&&(n.tremoloParam=n.tremoloParam&240|s),s=n.param&240,s&&(n.tremoloParam=n.tremoloParam&15|s)),r=n.tremoloPos>>2&31,l=n.tremoloWave&3,l?(s=255,r<<=3,l===1&&(n.tremoloPos>127?s-=r:s=r)):s=rr[r],s=(n.tremoloParam&15)*s>>6,n.tremoloPos>127?e.volume=n.volume-s:e.volume=n.volume+s,s=n.tremoloParam>>2&60,n.tremoloPos=n.tremoloPos+s&255;break;case 10:a=1;break;case 14:this.extended(n);break;default:break}a&&(a=0,s=n.param>>4,s?n.volume+=s:n.volume-=n.param&15,n.volume<0?n.volume=0:n.volume>64&&(n.volume=64),e.volume=n.volume),n=n.next}}},moreEffects:{value:function(e){var o=e.channel,r;switch(e.funkSpeed&&this.updateFunk(e),e.effect){case 9:e.param&&(e.offset=e.param),r=e.offset<<8,r>=e.length?e.length=2:(e.pointer+=r,e.length-=r);break;case 11:this.trackPos=e.param-1,this.breakPos=0,this.jumpFlag=1;break;case 12:e.volume=e.param,e.volume>64&&(e.volume=64),o.volume=e.volume;break;case 13:this.breakPos=(e.param>>4)*10+(e.param&15),this.breakPos>63?this.breakPos=0:this.breakPos<<=2,this.jumpFlag=1;break;case 14:this.extended(e);break;case 15:if(!e.param)return;e.param<32?this.speed=e.param:this.mixer.samplesTick=this.sampleRate*2.5/e.param>>0,this.tick=0;break;default:break}}},extended:{value:function(e){var o=e.channel,r=e.param>>4,a,s,n,l=e.param&15;switch(r){case 0:this.mixer.filter.active=l;break;case 1:if(this.tick)return;e.period-=l,e.period<113&&(e.period=113),o.period=e.period;break;case 2:if(this.tick)return;e.period+=l,e.period>856&&(e.period=856),o.period=e.period;break;case 3:e.glissando=l;break;case 4:e.vibratoWave=l;break;case 5:e.finetune=l*37;break;case 6:if(this.tick)return;l?(e.loopCtr?e.loopCtr--:e.loopCtr=l,e.loopCtr&&(this.breakPos=e.loopPos<<2,this.patternBreak=1)):e.loopPos=this.patternPos>>2;break;case 7:e.tremoloWave=l;break;case 8:for(s=e.length-2,n=this.mixer.memory,a=e.loopPtr;a<s;)n[a]=(n[a]+n[++a])*.5;n[++a]=(n[a]+n[0])*.5;break;case 9:if(this.tick||!l||!e.period||this.tick%l)return;o.enabled=0,o.pointer=e.pointer,o.length=e.length,o.delay=30,o.enabled=1,o.pointer=e.loopPtr,o.length=e.repeat,o.period=e.period;break;case 10:if(this.tick)return;e.volume+=l,e.volume>64&&(e.volume=64),o.volume=e.volume;break;case 11:if(this.tick)return;e.volume-=l,e.volume<0&&(e.volume=0),o.volume=e.volume;break;case 12:this.tick===l&&(o.volume=e.volume=0);break;case 13:if(this.tick!==l||!e.period)return;o.enabled=0,o.pointer=e.pointer,o.length=e.length,o.delay=30,o.enabled=1,o.pointer=e.loopPtr,o.length=e.repeat,o.period=e.period;break;case 14:if(this.tick||this.patternDelay)return;this.patternDelay=++l;break;case 15:if(this.tick)return;e.funkSpeed=l,l&&this.updateFunk(e);break;default:break}}},updateFunk:{value:function(e){var o=e.channel,r,a,s=Kn[e.funkSpeed];e.funkPos+=s,!(e.funkPos<128)&&(e.funkPos=0,this.version===Ti?(r=e.pointer+e.sample.realLen-e.repeat,a=e.funkWave+e.repeat,a>r&&(a=e.loopPtr,o.length=e.repeat),o.pointer=e.funkWave=a):(r=e.loopPtr+e.repeat,a=e.funkWave+1,a>=r&&(a=e.loopPtr),this.mixer.memory[a]=-this.mixer.memory[a]))}}}),t.voices[0]=Pi(0),t.voices[0].next=t.voices[1]=Pi(1),t.voices[1].next=t.voices[2]=Pi(2),t.voices[2].next=t.voices[3]=Pi(3),t.track=new Uint16Array(128),Object.seal(t)}var Ti=1,or=2,eo=3,ot=[856,808,762,720,678,640,604,570,538,508,480,453,428,404,381,360,339,320,302,285,269,254,240,226,214,202,190,180,170,160,151,143,135,127,120,113,0,850,802,757,715,674,637,601,567,535,505,477,450,425,401,379,357,337,318,300,284,268,253,239,225,213,201,189,179,169,159,150,142,134,126,119,113,0,844,796,752,709,670,632,597,563,532,502,474,447,422,398,376,355,335,316,298,282,266,251,237,224,211,199,188,177,167,158,149,141,133,125,118,112,0,838,791,746,704,665,628,592,559,528,498,470,444,419,395,373,352,332,314,296,280,264,249,235,222,209,198,187,176,166,157,148,140,132,125,118,111,0,832,785,741,699,660,623,588,555,524,495,467,441,416,392,370,350,330,312,294,278,262,247,233,220,208,196,185,175,165,156,147,139,131,124,117,110,0,826,779,736,694,655,619,584,551,520,491,463,437,413,390,368,347,328,309,292,276,260,245,232,219,206,195,184,174,164,155,146,138,130,123,116,109,0,820,774,730,689,651,614,580,547,516,487,460,434,410,387,365,345,325,307,290,274,258,244,230,217,205,193,183,172,163,154,145,137,129,122,115,109,0,814,768,725,684,646,610,575,543,513,484,457,431,407,384,363,342,323,305,288,272,256,242,228,216,204,192,181,171,161,152,144,136,128,121,114,108,0,907,856,808,762,720,678,640,604,570,538,508,480,453,428,404,381,360,339,320,302,285,269,254,240,226,214,202,190,180,170,160,151,143,135,127,120,0,900,850,802,757,715,675,636,601,567,535,505,477,450,425,401,379,357,337,318,300,284,268,253,238,225,212,200,189,179,169,159,150,142,134,126,119,0,894,844,796,752,709,670,632,597,563,532,502,474,447,422,398,376,355,335,316,298,282,266,251,237,223,211,199,188,177,167,158,149,141,133,125,118,0,887,838,791,746,704,665,628,592,559,528,498,470,444,419,395,373,352,332,314,296,280,264,249,235,222,209,198,187,176,166,157,148,140,132,125,118,0,881,832,785,741,699,660,623,588,555,524,494,467,441,416,392,370,350,330,312,294,278,262,247,233,220,208,196,185,175,165,156,147,139,131,123,117,0,875,826,779,736,694,655,619,584,551,520,491,463,437,413,390,368,347,328,309,292,276,260,245,232,219,206,195,184,174,164,155,146,138,130,123,116,0,868,820,774,730,689,651,614,580,547,516,487,460,434,410,387,365,345,325,307,290,274,258,244,230,217,205,193,183,172,163,154,145,137,129,122,115,0,862,814,768,725,684,646,610,575,543,513,484,457,431,407,384,363,342,323,305,288,272,256,242,228,216,203,192,181,171,161,152,144,136,128,121,114,0],rr=[0,24,49,74,97,120,141,161,180,197,212,224,235,244,250,253,255,253,250,244,235,224,212,197,180,161,141,120,97,74,49,24],Kn=[0,5,6,7,8,10,11,13,16,19,22,26,32,43,64,128],nr=Yn;function Jn(){var i=Object.create(null,{player:{value:null,writable:!0},index:{value:0,writable:!0},amiga:{value:null,writable:!0},mixer:{value:null,writable:!0},tracker:{get:function(){return this.player?ar[this.index+this.player.version]:ar[0]}},load:{value:function(t){var e,o;if(t.view||(t=Wi(t)),t.endian=1,t.position=0,t.readUint()===67324752&&window.neoart.Unzip,!t)return null;if(this.player&&this.player.id!=="STPlayer"&&(this.player.load(t),this.player.version))return this.player;if(t.length>336&&(t.position=38,e=t.readString(20),(e==="FastTracker v2.00   "||e==="FastTracker v 2.00  "||e==="Sk@le Tracker"||e==="MadTracker 2.0"||e==="MilkyTracker        "||e==="DigiBooster Pro 2.18"||e.indexOf("OpenMPT")!==-1)&&(this.player=Qo(this.mixer),this.player.load(t),this.player.version)))return this.index=aa,this.player;if(t.endian=0,t.length>2105){if(t.position=1080,e=t.readString(4),e==="M.K."||e==="FLT4"){if(this.player=tr(this.amiga),this.player.load(t),this.player.version)return this.index=Zn,this.player}else if(e==="FEST"&&(this.player=window.neoart.HMPlayer(this.amiga),this.player.load(t),this.player.version))return this.index=ta,this.player}return t.length>2105&&(t.position=1080,e=t.readString(4),(e==="M.K."||e==="M!K!")&&(this.player=nr(this.amiga),this.player.load(t),this.player.version))?(this.index=ea,this.player):t.length>5220&&(this.player=window.neoart.S1Player(this.amiga),this.player.load(t),this.player.version)?(this.index=ia,this.player):(t.position=0,o=t.readUshort(),t.position=0,e=t.readString(4),(e==="COSO"||o===24576||o===24578||o===24590||o===24598)&&(this.player=window.neoart.JHPlayer(this.amiga),this.player.load(t),this.player.version)?(this.index=ra,this.player):(t.position=0,o=t.readUshort(),this.player=window.neoart.DWPlayer(this.amiga),this.player.load(t),this.player.version?(this.index=oa,this.player):(t.position=0,o=t.readUshort(),o===24576&&(this.player=window.neoart.RHPlayer(this.amiga),this.player.load(t),this.player.version)?(this.index=na,this.player):t.length>1625&&(this.player=window.neoart.STPlayer(this.amiga),this.player.load(t),this.player.version)?(this.index=Qn,this.player):(t.clear(),this.index=0,this.player=null))))}}});return i.amiga=Yi(),Object.seal(i)}var Qn=0,Zn=4,ea=9,ta=12,ia=26,oa=28,ra=30,na=32,aa=33,ar=["Unknown Format","Ultimate SoundTracker","D.O.C. SoundTracker 9","Master SoundTracker","D.O.C. SoundTracker 2.0/2.2","SoundTracker 2.3","SoundTracker 2.4","NoiseTracker 1.0","NoiseTracker 1.1","NoiseTracker 2.0","ProTracker 1.0","ProTracker 1.1/2.1","ProTracker 1.2/2.0","His Master's NoiseTracker","SoundFX 1.0/1.7","SoundFX 1.8","SoundFX 1.945","SoundFX 1.994/2.0","BP SoundMon V1","BP SoundMon V2","BP SoundMon V3","Delta Music 1.0","Delta Music 2.0","Digital Mugician","Digital Mugician 7 Voices","Future Composer 1.0/1.3","Future Composer 1.4","SidMon 1.0","SidMon 2.0","David Whittaker","FredEd","Jochen Hippel","Jochen Hippel COSO","Rob Hubbard","FastTracker II","Sk@leTracker","MadTracker 2.0","MilkyTracker","DigiBooster Pro 2.18","OpenMPT"],sa=Jn(),sr=sa;var Mi=class{constructor(t={}){this.baseRawUrl="https://raw.githubusercontent.com/michioxd/keygen-music/master/",this.indexUrl=this.baseRawUrl+"index.json",this.trackList=[],this.history=[],this.maxHistory=50,this.historyCursor=-1,this.currentPlayer=null,this.isPlaying=!1,this.pollInterval=null,this._opId=0,this.onTrackChange=t.onTrackChange||(()=>{}),this.onError=t.onError||(()=>{}),this.hasFetchedIndex=!1,this.currentTrack=null}async init(){if(!this.hasFetchedIndex)try{let t=await fetch(this.indexUrl);if(!t.ok)throw new Error("Network response was not ok");let e=await t.json(),o=["xm","mod","s3m","it"];this.trackList=e.filter(r=>r.fileExtension&&o.includes(r.fileExtension.toLowerCase())),this.hasFetchedIndex=!0}catch(t){throw console.warn("[Jukebox] Offline or failed to fetch track index:",t.message),this.trackList=[],this.onError("NO INTERNET OR BLOCKED ... TRY AGAIN?"),t}}async playNext(t=null){this.stop();let e=++this._opId;try{if(!this.hasFetchedIndex&&(await this.init(),e!==this._opId))return;if(this.trackList.length===0){console.warn("[Jukebox] Track list is empty \u2014 no tracks to play.");return}let o=null;if(t&&typeof t=="object"){let{title:r,trackTitle:a,artist:s}=t,n=this.trackList.filter(l=>{let u=!s||l.artist&&l.artist.toLowerCase()===s.toLowerCase(),h=!r||l.title&&l.title.toLowerCase()===r.toLowerCase(),c=!a||l.trackTitle&&l.trackTitle.toLowerCase()===a.toLowerCase();return u&&h&&c});n.length===0?console.warn("[Jukebox] No matches for target object \u2014 playing random:",t):n.length>1&&console.warn(`[Jukebox] ${n.length} ambiguous matches for target object \u2014 using first. Refine your search:`,n),o=n[0]||null}else if(t&&typeof t=="string"){let r=this.trackList.filter(a=>a.title&&a.title.toLowerCase()===t.toLowerCase());r.length===0?console.warn("[Jukebox] No matches for target title string \u2014 playing random:",t):r.length>1&&console.warn(`[Jukebox] ${r.length} ambiguous matches for title string \u2014 using first:`,r),o=r[0]||null}if(!o&&!t&&this.historyCursor<this.history.length-1)this.historyCursor++,o=this.trackList[this.history[this.historyCursor]];else if(!o){let r=this.trackList.filter((n,l)=>!this.history.includes(l));r.length===0&&(this.history=[],this.historyCursor=-1);let a=r.length>0?r:this.trackList;o=a[Math.floor(Math.random()*a.length)];let s=this.trackList.indexOf(o);this.historyCursor<this.history.length-1&&(this.history=this.history.slice(0,this.historyCursor+1)),this.history.push(s),this.history.length>this.maxHistory&&this.history.shift(),this.historyCursor=this.history.length-1}await this._playTrack(o,e)}catch(o){console.warn("[Jukebox] Track fetch failed \u2014 network issue?",o.message),this.onError("NO INTERNET OR BLOCKED ... TRY AGAIN?")}}async playPrevious(){if(this.historyCursor>0){this.stop();let t=++this._opId;this.historyCursor--;let e=this.trackList[this.history[this.historyCursor]];try{await this._playTrack(e,t)}catch(o){console.warn("[Jukebox] Previous track fetch failed:",o.message),this.onError("NO INTERNET OR BLOCKED ... TRY AGAIN?")}}}async _playTrack(t,e){let o=t.path.split("/").map(l=>encodeURIComponent(l)).join("/"),r=this.baseRawUrl+o,a=await fetch(r);if(!a.ok)throw new Error("Failed to fetch audio file");if(e!==this._opId)return;let s=await a.arrayBuffer();if(e!==this._opId)return;let n=null;try{n=sr.load(s)}catch(l){console.warn(`[Jukebox] Unsupported format for "${t.title}" \u2014 skipping:`,l.message),e===this._opId&&setTimeout(()=>this.playNext(),100);return}e===this._opId&&(this.currentPlayer=n,this.currentPlayer?(this.currentTrack=t,typeof this.currentPlayer.loopSong<"u"&&(this.currentPlayer.loopSong=1),this.currentPlayer.play(),this.isPlaying=!0,this.onTrackChange(t),this.setupCompletionPolling()):setTimeout(()=>this.playNext(),100))}setupCompletionPolling(){this.pollInterval&&clearInterval(this.pollInterval),this.pollInterval=setInterval(()=>{if(!this.currentPlayer)return this.stopPolling();let t=!1;this.currentPlayer.amiga&&this.currentPlayer.amiga.playing===!1&&(t=!0),this.currentPlayer.mixer&&this.currentPlayer.mixer.playing===!1&&(t=!0),this.currentPlayer.stopped&&(t=!0),this.currentPlayer.playing===!1&&(t=!0),t&&this.playNext()},1e3)}stopPolling(){this.pollInterval&&(clearInterval(this.pollInterval),this.pollInterval=null)}stop(){if(this._opId++,this.stopPolling(),this.isPlaying=!1,this.currentPlayer){try{this.currentPlayer.stop()}catch{}this.currentPlayer=null}}};function lr(i,t,e){let o=document.getElementById("afx-audio-toggle");if(!o)return;let r=document.getElementById("afx-music-status");if(o.checked&&e.classList.add("afx-music-playing"),i.jukebox)try{i.jukebox.stop()}catch(n){console.warn("[AnkiFX] Error stopping old jukebox:",n.message)}i.jukebox=new Mi({onTrackChange:n=>{let l=`NOW PLAYING: ${n.artist} - ${n.title} - ${n.trackTitle}`;t.marquee=l,i.marquee&&i.marquee.setText(l)},onError:n=>{t.marquee=n,i.marquee&&i.marquee.setText(n)}}),o.addEventListener("change",n=>{let l=n.target.checked,u=gt();if(l){e.classList.add("afx-music-active"),e.classList.add("afx-music-playing"),r.innerHTML=u?"\u{1F50A}":"\u{1F50A} MUSIC: ON";let h=window.AudioContext||window.webkitAudioContext;h&&(window.neoart=window.neoart||{},window.neoart.audioContext||(window.neoart.audioContext=new h)),window.neoart.audioContext&&window.neoart.audioContext.state==="suspended"&&window.neoart.audioContext.resume();let c=localStorage.getItem("ankifx_preferred_effect")||t.defaultEffect||"geometry",d=t.trackTitle||i.EFFECT_SONG_MAP[c]||null;i.jukebox.playNext(d)}else e.classList.remove("afx-music-active"),e.classList.remove("afx-music-playing"),r.innerHTML=u?"\u{1F507}":"\u{1F507} MUSIC: OFF",i.jukebox.stop(),t.marquee=i.defaultMarqueeText,i.marquee&&i.marquee.setText(i.defaultMarqueeText)});let a=document.getElementById("afx-btn-back"),s=document.getElementById("afx-btn-skip");a&&a.addEventListener("click",n=>{i.jukebox&&i.jukebox.isPlaying&&i.jukebox.playPrevious()}),s&&s.addEventListener("click",n=>{i.jukebox&&i.jukebox.isPlaying&&i.jukebox.playNext()})}function cr(i,t,e,o){let r=document.getElementById("afx-effect-selector");r&&r.addEventListener("change",a=>{let s=a.target.value;if(localStorage.setItem("ankifx_preferred_effect",s),Object.values(ie).forEach(n=>n.stop()),i.ctx2D&&i.ctx2D.clearRect(0,0,i.width,i.height),i.glContext&&(i.glContext.clearColor(0,0,0,0),i.glContext.clear(i.glContext.COLOR_BUFFER_BIT)),t.defaultEffect=s,s==="debug"?e.classList.add("afx-debug-active"):e.classList.remove("afx-debug-active"),tt(i,t,o,t.marqueePosition,s),i.jukebox&&i.jukebox.isPlaying){let n=t.trackTitle||i.EFFECT_SONG_MAP[s]||null,l=i.jukebox.currentTrack,u=!1;n&&(typeof n=="string"?u=!l||l.title.toLowerCase()!==n.toLowerCase():u=!l||n.title&&l.title.toLowerCase()!==n.title.toLowerCase()||n.trackTitle&&l.trackTitle.toLowerCase()!==n.trackTitle.toLowerCase()||n.artist&&(l.artist||"").toLowerCase()!==n.artist.toLowerCase()),u&&i.jukebox.playNext(n)}})}function fr(i,t,e){let o=document.createElement("div");o.id="ankifx-overlay",Ze(o),t.debug&&o.classList.add("afx-debug-active");let r=window.innerWidth||document.documentElement.clientWidth||800,a=r<480?.65:r<768?.8:1,s=Math.max(55,Math.ceil(85*a));ao()&&(t.marqueePosition==="top"?o.style.paddingTop=`calc(1rem + ${s}px)`:o.style.paddingBottom=`calc(1rem + ${s}px)`);let n=mt(),l=so(),u=gt(),h=u?"\u{1F4DC} ":"\u{1F4DC} TEXT: ",c=u?"":" MUSIC: ",d=u?"\u{1F3B4} ":"\u{1F3B4} CARD: ",m=u?h.trim():n?`${h}ON`:`${h}OFF`,p=u?"\u{1F507}":`\u{1F507}${c}OFF`,f=u?d.trim():l?`${d}ON`:`${d}OFF`,g=u?"\u{1F3A8} ":"[ Effect: ",w=u?"":" ]",_=Object.values(ie).filter(I=>I.id!=="debug"||t.debug).map(I=>`
            <option value="${I.id}" ${e===I.id?"selected":""}>
                ${g}${I.name}${w}
            </option>
        `).join(""),j=`
        <div id="afx-bottom-dock" class="tappable">
            <div class="afx-control-group-left">
                <div class="afx-control-row">
                    <label class="afx-toggle"><input type="checkbox" id="afx-text-toggle" ${n?"checked":""}><span class="afx-slider"></span></label>
                    <span id="afx-text-status">${m}</span>
                </div>
                <div id="afx-music-container" class="afx-control-row">
                    <label class="afx-toggle"><input type="checkbox" id="afx-audio-toggle"><span class="afx-slider"></span></label>
                    <span id="afx-music-status">${p}</span>
                </div>
                <div id="afx-card-container" class="afx-control-row">
                    <label class="afx-toggle"><input type="checkbox" id="afx-card-toggle" ${l?"checked":""}><span class="afx-slider"></span></label>
                    <span id="afx-card-status">${f}</span>
                </div>
            </div>

            <div class="afx-control-group-right">
                <div id="afx-effect-controls-container"></div>
                <div id="afx-effect-selector-container" class="afx-control-row afx-effect-selector-container">
                    <select id="afx-effect-selector" class="afx-select">
                        ${_}
                    </select>
                </div>
            </div>
        </div>
    `,R=!1;try{R=localStorage.getItem(`ankifx_agreed_${t.deckTitle}`)==="true"}catch{}let P=t.termsText&&typeof t.termsText=="string"&&t.termsText.trim()!==""&&!R;P&&(o.innerHTML=`
            <div class="afx-dialog tappable">
                <div class="afx-terms">
                    <h3>${t.deckTitle}</h3>
                    ${t.deckAuthor?`<h4 class="afx-deck-author">by ${t.deckAuthor}</h4>`:""}
                    ${t.termsText}
                </div>
                <div class="afx-action-row">
                    <button id="afx-consent-btn" class="afx-btn" disabled>I AGREE</button>
                </div>
            </div>
        `);let v=document.createElement("div");for(v.innerHTML=j;v.firstChild;)o.appendChild(v.firstChild);let k=document.createElement("div");k.id="ankifx-background",document.body.appendChild(k),i.sharedGL=document.createElement("canvas"),i.sharedGL.id="afx-shared-gl",i.sharedGL.className="afx-shared-canvas",k.appendChild(i.sharedGL),i.shared2D=document.createElement("canvas"),i.shared2D.id="afx-shared-2d",i.shared2D.className="afx-shared-canvas",k.appendChild(i.shared2D),i.sharedMarquee=document.createElement("canvas"),i.sharedMarquee.id="afx-shared-marquee",i.sharedMarquee.className="afx-shared-canvas afx-shared-marquee-canvas",k.appendChild(i.sharedMarquee),i.glContext=i.sharedGL.getContext("webgl",{alpha:!1,antialias:!1}),i.ctx2D=i.shared2D.getContext("2d"),i.ctxMarquee=i.sharedMarquee.getContext("2d"),document.body.appendChild(o);let E=document.createElement("div");E.id="afx-top-dock",Ze(E);let x=document.createElement("div");x.className="afx-top-group-left",x.id="afx-top-group-left";let y=document.createElement("div");y.className="afx-top-group-right",y.id="afx-top-group-right";let M=document.createElement("button");M.id="afx-btn-back",M.className="afx-playback-btn",M.textContent="\u23EE\uFE0F";let T=document.createElement("button");if(T.id="afx-btn-skip",T.className="afx-playback-btn",T.textContent="\u23ED\uFE0F",x.appendChild(M),y.appendChild(T),t.debug){let I=document.createElement("div");I.id="afx-global-fps",I.className="afx-global-fps",I.textContent="FPS: --",x.appendChild(I)}E.appendChild(x),E.appendChild(y),o.appendChild(E);let A=document.getElementById("afx-consent-btn");P&&A?Uo(i,t,o,A):window.AnkiFX.agree(o,t.deckTitle),lr(i,t,o);let O=document.getElementById("afx-text-toggle");if(O){let I=document.getElementById("afx-text-status");O.addEventListener("change",B=>{let z=B.target.checked,D=gt();localStorage.setItem("ankifx_marquee_enabled",z);let F=D?"\u{1F4DC} ":"\u{1F4DC} TEXT: ";I.textContent=D?F.trim():z?`${F}ON`:`${F}OFF`,i.marquee&&(i.marquee.enabled=z)})}let C=document.getElementById("afx-card-toggle");if(C){let I=document.getElementById("afx-card-status"),B=z=>{let D=gt(),F=D?"\u{1F3B4} ":"\u{1F3B4} CARD: ";I.textContent=D?F.trim():z?`${F}ON`:`${F}OFF`,document.documentElement.classList.toggle("afx-card-hidden",!z)};B(l),C.addEventListener("change",z=>{let D=z.target.checked;localStorage.setItem("ankifx_card_enabled",D),B(D)})}return cr(i,t,o,k),{overlay:o,background:k}}var hr=["ankifx-overlay","ankifx-background","afx-btn-back","afx-btn-skip","afx-bottom-dock","afx-top-dock"],b={marquee:null,jukebox:null,sharedGL:null,shared2D:null,sharedMarquee:null,glContext:null,ctx2D:null,ctxMarquee:null,currentEffectId:null,dpr:1,width:0,height:0,marqueeInterval:null,defaultMarqueeText:null,EFFECT_SONG_MAP:{},_layoutHandler:null,_resizeTimeout:null,_resizeInterval:null,observer:null,dockObserver:null,initialized:!1,effectInstance:null,isContextLost:!1,_globalClickListener:null};function dr(i){i.preventDefault(),console.warn("[AnkiFX] WebGL Context Lost detected!"),b.isContextLost=!0;let t=b.currentEffectId;if(t&&ie[t]&&ie[t].isWebGL&&b.effectInstance&&typeof b.effectInstance.onContextLost=="function")try{b.effectInstance.onContextLost()}catch(o){console.error("[AnkiFX] Error in active effect onContextLost:",o)}}function pr(){console.log("[AnkiFX] WebGL Context Restored. Re-initializing pipeline..."),b.isContextLost=!1,b.sharedGL&&(b.glContext=b.sharedGL.getContext("webgl",{alpha:!1,antialias:!1}));let i=b.currentEffectId;if(i&&ie[i]&&ie[i].isWebGL&&b.effectInstance&&typeof b.effectInstance.onContextRestored=="function")try{b.effectInstance.onContextRestored(b.glContext)}catch(e){console.error("[AnkiFX] Error in active effect onContextRestored:",e)}}function la(i={}){console.log(`[AnkiFX] Init \u2192 v${Pe.version} (${Pe.source})`);let t=Mo(i);if(document.getElementById("ankifx-overlay")&&Lo(b,t)){b.initialized=!0,ur(),(window.requestIdleCallback||function(s){setTimeout(s,0)})(()=>{to()});return}document.documentElement.classList.remove("afx-scroll-lock"),document.documentElement.classList.remove("afx-agreed"),document.documentElement.classList.remove("afx-ankidroid"),/Android/i.test(navigator.userAgent)&&document.documentElement.classList.add("afx-ankidroid"),hr.forEach(a=>{let s=document.getElementById(a);s&&s.remove()}),b.defaultMarqueeText=t.marquee,b.EFFECT_SONG_MAP={},Object.entries(ie).forEach(([a,s])=>{s&&s.preferredTrack&&(b.EFFECT_SONG_MAP[a]=s.preferredTrack)}),mr();let e=Io(t),{background:o}=fr(b,t,e);b.sharedGL&&typeof b.sharedGL.addEventListener=="function"&&(b.sharedGL.addEventListener("webglcontextlost",dr,!1),b.sharedGL.addEventListener("webglcontextrestored",pr,!1)),Bo(b),Oo(b),it(b),Ro(b),b.marquee?(b.marquee.setText(t.marquee),b.marquee.setPosition(t.marqueePosition)):(b.marquee=new xi(t.marquee,t.marqueePosition),Vi(b)),tt(b,t,o,t.marqueePosition,e),b.marquee&&(b.marquee.enabled=mt()),b.initialized=!0,zo(b),yi(b),b._globalClickListener=a=>{lo(a.target)&&a.stopPropagation()},typeof document.addEventListener=="function"&&document.addEventListener("click",b._globalClickListener),ur(),(window.requestIdleCallback||function(a){setTimeout(a,0)})(()=>{to()})}function mr(){if(document.getElementById("ankifx-styles"))return;let i=document.createElement("style");i.id="ankifx-styles",i.textContent=To,document.head.appendChild(i)}function ca(i,t){if(i.classList.add("afx-agreed-state"),document.documentElement.classList.add("afx-agreed"),document.documentElement.classList.remove("afx-scroll-lock"),t)try{localStorage.setItem(`ankifx_agreed_${t}`,"true")}catch{}yi(b)}function fa(){if(b.sharedGL&&typeof b.sharedGL.removeEventListener=="function"&&(b.sharedGL.removeEventListener("webglcontextlost",dr),b.sharedGL.removeEventListener("webglcontextrestored",pr)),b.effectInstance){if(typeof b.effectInstance.destroy=="function")try{b.effectInstance.destroy()}catch(a){console.error("[AnkiFX] Error destroying active effect instance during engine teardown:",a)}b.effectInstance=null}b.currentEffectId&&ie[b.currentEffectId]?.stop&&ie[b.currentEffectId].stop(),b.jukebox&&(b.jukebox.stop(),b.jukebox=null),b.marqueeInterval&&(cancelAnimationFrame(b.marqueeInterval),b.marqueeInterval=null),b.marquee=null;let i=document.getElementById("_flag"),t=document.getElementById("_mark");i&&document.body.appendChild(i),t&&document.body.appendChild(t),hr.forEach(a=>{let s=document.getElementById(a);s&&s.remove()});let e=document.getElementById("ankifx-styles");if(e&&e.remove(),document.documentElement.style.removeProperty("--afx-viewport-height"),document.documentElement.style.removeProperty("--afx-dock-height"),document.documentElement.classList.remove("afx-scroll-lock"),document.documentElement.classList.remove("afx-agreed"),document.documentElement.classList.remove("afx-ankidroid"),Array.from(document.documentElement.classList).forEach(a=>{a.startsWith("afx-effect-")&&document.documentElement.classList.remove(a)}),window.AnkiFX_Config=null,b._observerTimeout&&(clearTimeout(b._observerTimeout),b._observerTimeout=null),b.observer&&(b.observer.disconnect(),b.observer=null),b.dockObserver&&(b.dockObserver.disconnect(),b.dockObserver=null),b._globalClickListener&&(typeof document.removeEventListener=="function"&&document.removeEventListener("click",b._globalClickListener),b._globalClickListener=null),b._layoutHandler&&(window.removeEventListener("orientationchange",b._layoutHandler),window.removeEventListener("resize",b._layoutHandler),b._layoutHandler=null),b._resizeTimeout&&(clearTimeout(b._resizeTimeout),b._resizeTimeout=null),b._resizeInterval&&(clearInterval(b._resizeInterval),b._resizeInterval=null),b.glContext){if(typeof b.glContext.getExtension=="function"){let a=b.glContext.getExtension("WEBGL_lose_context");a&&a.loseContext()}b.glContext=null}b.sharedGL=null,b.shared2D=null,b.sharedMarquee=null,b.ctx2D=null,b.ctxMarquee=null,b.currentEffectId=null,b.initialized=!1,ft&&(window.removeEventListener("ankifx:template-status",ft),ft=null),Ii=null;let o=document.getElementById("afx-legacy-toast");o&&o.remove();let r=document.getElementById("afx-update-notice");r&&r.remove(),console.log("[AnkiFX] Destroyed.")}var gr={};function ua(i){try{if(typeof sessionStorage<"u")return sessionStorage.getItem(i)}catch{}return null}function ha(i,t){try{if(typeof sessionStorage<"u")return sessionStorage.setItem(i,t),!0}catch{}return!1}function da(i){let t=`afx_legacy_toast_${i}`,e=ua(t);return e!==null?e==="true":!!gr[t]}function pa(i){let t=`afx_legacy_toast_${i}`;ha(t,"true")||(gr[t]=!0)}function to(){if(!window.AnkiFX||!window.AnkiFX.initialized)return;let i=document.getElementById("ankifx-template-meta"),t=!1,e="unknown";if(!i)t=!0;else{let o=i.getAttribute("data-template-name"),r=i.getAttribute("data-template-version");o?e=o.trim():t=!0,(!r||r.trim()==="")&&(t=!0)}t&&br(e)}var Ii=null,ft=null;function qt(i){return i?String(i).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"):""}function ur(){ft&&window.removeEventListener("ankifx:template-status",ft),Ii=null;let i=t=>{if(!t||!t.isNewer||Ii)return;let e=document.getElementById("afx-update-banner-root");if(!e||e.children.length>0||document.getElementById("afx-update-notice"))return;Ii="outdated";let o=`afx_dismiss_${t.name}_${t.local}`;if((()=>{try{if(sessionStorage.getItem(o)==="true")return!0}catch{}try{if(localStorage.getItem(o)==="true")return!0}catch{}return!1})())return;let a=()=>{try{sessionStorage.setItem(o,"true")}catch{}try{localStorage.setItem(o,"true")}catch{}},s=document.createElement("div");s.id="afx-update-notice",s.className="afx-update-notice",Ze(s);let n=t.changelog?` (${qt(t.changelog)})`:"";s.innerHTML=`
            <div class="afx-update-notice-content">
                <div class="afx-update-notice-title">Template Update Available</div>
                <div>
                    Card template is v${qt(t.local)}. Latest is v${qt(t.remote)}${n}.<br>
                    Please visit <a class="afx-update-notice-link" href="${qt(t.targetUrl)}" target="_blank">${qt(t.displayUrl)}</a> and copy the latest template.
                </div>
            </div>
            <button class="afx-update-notice-close" title="Dismiss">&times;</button>
        `,s.querySelector(".afx-update-notice-close").addEventListener("click",u=>{s.classList.remove("afx-visible"),a(),setTimeout(()=>s.remove(),400)}),requestAnimationFrame(()=>{e.appendChild(s),requestAnimationFrame(()=>{s.classList.add("afx-visible")})})};ft=t=>{i(t.detail)},window.addEventListener("ankifx:template-status",ft),window.dispatchEvent(new CustomEvent("ankifx:request-template-status"))}function br(i="unknown"){if(da(i)||document.getElementById("afx-legacy-toast"))return;let t=document.createElement("div");t.id="afx-legacy-toast",t.className="afx-legacy-toast-container",Ze(t),t.innerHTML=`
        <div class="afx-legacy-toast-content">
            <div class="afx-legacy-toast-title">Legacy Template Detected</div>
            <div>
                An update is required for full AnkiFX compatibility.<br>
                Please see the <a class="afx-legacy-toast-link" href="https://github.com/robkipa/ankifx/blob/main/docs/template-migration-guide.md" target="_blank">Template Update Guide</a> for step-by-step instructions.
            </div>
        </div>
        <button class="afx-legacy-toast-close" title="Dismiss">&times;</button>
    `,t.querySelector(".afx-legacy-toast-close").addEventListener("click",o=>{t.classList.remove("afx-legacy-visible"),pa(i),setTimeout(()=>{t.remove()},400)}),document.body.appendChild(t),requestAnimationFrame(()=>{requestAnimationFrame(()=>{t.classList.add("afx-legacy-visible")})})}var Li="local";try{let i=typeof __ankifx_script_src=="string"?__ankifx_script_src:"";if(!i){let e=(new Error().stack||"").match(/(https?:\/\/[^\s)\n:]+|file:\/\/[^\s)\n:]+)/g);if(e&&e.length>0){for(let o=0;o<e.length;o++)if(e[o].includes("ankifx")){i=e[o];break}}}i&&(i.includes("cdn.jsdelivr.net")||i.includes("github")||i.includes("rawgit")||i.includes("githack")?Li="remote":Li="local")}catch{Li="detection-failed"}var ma="1.0.1-edee9f5+",ga="2026-06-22T17:14:56.823Z",ba=Li,Pe={init:la,destroy:fa,agree:ca,injectCSS:mr,handleResize:()=>it(b),startEffect:(i,t,e,o)=>tt(b,i,t,e,o),startMarqueeLoop:()=>Vi(b),renderEffectControls:Ut,setControlValue:Do,detectLegacyTemplate:to,showLegacyMigrationToast:br,get version(){return ma},get buildDate(){return ga},get source(){return ba},get marquee(){return b.marquee},set marquee(i){b.marquee=i},get jukebox(){return b.jukebox},set jukebox(i){b.jukebox=i},get currentEffectId(){return b.currentEffectId},get defaultMarqueeText(){return b.defaultMarqueeText},get EFFECT_SONG_MAP(){return b.EFFECT_SONG_MAP},get initialized(){return!!b.initialized}};function vr(i){if(!i)return{parts:[0,0,0],isPre:!1,preType:3,preNumber:0};let t=String(i).replace(/^v/,""),e=t.indexOf("+");e!==-1&&(t=t.substring(0,e));let o=t.indexOf("-"),r=o!==-1,a=r?t.substring(0,o):t,s=r?t.substring(o+1).toLowerCase():"",n=a.split(".").map(h=>{let c=parseInt(h,10);return isNaN(c)?0:c}),l=3,u=0;if(r&&(s.indexOf("alpha")!==-1?l=0:s.indexOf("beta")!==-1?l=1:s.indexOf("rc")!==-1&&(l=2),l<3)){let h=s.match(/\d+/);h&&(u=parseInt(h[0],10))}return{parts:[n[0]||0,n[1]||0,n[2]||0],isPre:r,preType:l,preNumber:u}}function Di(i,t){let e=vr(i),o=vr(t);for(let r=0;r<3;r++){if(e.parts[r]>o.parts[r])return!0;if(e.parts[r]<o.parts[r])return!1}return e.isPre!==o.isPre?!e.isPre:e.preType>o.preType?!0:e.preType<o.preType?!1:e.preNumber>o.preNumber}function xr(i,t){if(!i||!t||i==="development"||t==="development")return!1;try{return new Date(i).getTime()>new Date(t).getTime()}catch{return!1}}var yr=[];try{let i=sessionStorage.getItem("ankifx_eval_history");i&&(yr=JSON.parse(i))}catch{}window.AnkiFX_Eval_History=window.AnkiFX_Eval_History||yr;var wr=[];try{let i=sessionStorage.getItem("ankifx_loader_logs");i&&(wr=JSON.parse(i))}catch{}window.AnkiFX_Loader_Logs=window.AnkiFX_Loader_Logs||wr;var yt=i=>{window.AnkiFX_Loader_Logs.push(i);try{sessionStorage.setItem("ankifx_loader_logs",JSON.stringify(window.AnkiFX_Loader_Logs))}catch{}},xe=window.AnkiFX,We=Pe.version,Ye=xe&&xe.version,va=xe&&xe.initialized,kr=!1,Er="",xa=!xe||Di(We,Ye),ya=xe&&!Di(We,Ye)&&!Di(Ye,We),wa=ya&&xr(Pe.buildDate,xe&&xe.buildDate),ka=xa||wa;if(ka)if(va){console.info(`[Loader] Newer engine version v${We} (${Pe.source}) loaded late. Upgrading and replacing active engine v${Ye} (${xe.source})...`),yt({msg:`[Loader] Late takeover triggered: Upgrading active engine from v${Ye} to v${We}...`,level:"info"});let i=window.AnkiFX_Config;try{xe.destroy(),yt({msg:`[Loader] Active engine v${Ye} destroyed successfully.`,level:"success"})}catch(t){console.error(`[Loader] Error destroying old engine: ${t.message}`),yt({msg:`[Loader] Error destroying active engine: ${t.message}`,level:"error"})}i&&(window.AnkiFX_Config=i),window.AnkiFX=Pe;try{window.AnkiFX.init(window.AnkiFX_Config),yt({msg:`[Loader] Upgraded AnkiFX engine to v${We} successfully.`,level:"success"})}catch(t){console.error(`[Loader] Error initializing upgraded engine: ${t.message}`),yt({msg:`[Loader] Upgraded AnkiFX engine initialization failed: ${t.message}`,level:"error"})}}else xe&&(console.info(`[Loader] Newer engine version v${We} (${Pe.source}) replacing uninitialized engine v${Ye} (${xe.source}).`),yt({msg:`[Loader] Pre-init takeover: Replacing local v${Ye} with remote v${We}...`,level:"info"})),window.AnkiFX=Pe;else{kr=!0;let i=xe&&xe.buildDate?xe.buildDate:"unknown",t=Pe.buildDate||"unknown";Er=`ignored (older or equal version and build: active=${Ye}@${i}, incoming=${We}@${t})`,console.info(`[Loader] Incoming engine v${We} (built ${t}) is not newer than active engine v${Ye} (built ${i}). Ignoring.`)}window.AnkiFX_Eval_History.push({source:Pe.source,version:Pe.version,buildDate:Pe.buildDate,time:new Date().toLocaleTimeString(),status:kr?Er:"active"});try{sessionStorage.setItem("ankifx_eval_history",JSON.stringify(window.AnkiFX_Eval_History))}catch{}})();
