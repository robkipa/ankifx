var __ankifx_script_src=(document.currentScript&&document.currentScript.src)||"";
(()=>{var zi=[],je=null,eo=60,to=1.5,io={id:"aurora",name:"Aurora",run:kr,stop:Er,drawOverlay:Sr,onResize:(i,t)=>{let e=document.documentElement,o=e?getComputedStyle(e):null;if(lt=o&&parseInt(o.getPropertyValue("--io-header"))||0,bt=t-lt,Me=i/8,Le=bt/8,je){let a=eo/8,s=Math.ceil(Me/a),c=Math.ceil(Le/(a*to));je.w=s,je.h=c,je.build()}te&&(te.style.width=Me+"px",te.style.height=Le+"px",te.style.position="absolute",te.style.top=lt+"px",te.style.left="0",te.style.transform="scale(8)",te.style.transformOrigin="top left")},marqueeFont:{color:"#E0FFFF",shadowColor:"rgba(0,128,128,0.8)",shadowBlur:10}},xt=null,Me,Le,te=null,yr=0,gt=0,st={x:-1e3,y:-1e3},lt=0,bt=0,Ht=class{constructor(t,e){this.x=t||0,this.y=e||0}setAngle(t){let e=this.getLength()||1;this.x=Math.cos(t)*e,this.y=Math.sin(t)*e}setLength(t){let e=Math.atan2(this.y,this.x);this.x=Math.cos(e)*t,this.y=Math.sin(e)*t}getLength(){return Math.sqrt(this.x*this.x+this.y*this.y)}addTo(t){this.x+=t.x,this.y+=t.y}},Qi=(()=>{let i=new Uint8Array(512),t=new Uint8Array(256).map(()=>Math.random()*256);for(let a=0;a<512;a++)i[a]=t[a&255];let e=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]];function o(a,s,c,r){return a[0]*s+a[1]*c+a[2]*r}return{simplex3:(a,s,c)=>{let r,n,d,u,l=.3333333333333333,h=1/6,x=(a+s+c)*l,p=Math.floor(a+x),f=Math.floor(s+x),b=Math.floor(c+x),v=(p+f+b)*h,m=a-p+v,E=s-f+v,y=c-b+v,T,w,k,C,g,I;m>=E?E>=y?(T=1,w=0,k=0,C=1,g=1,I=0):m>=y?(T=1,w=0,k=0,C=1,g=0,I=1):(T=0,w=0,k=1,C=1,g=0,I=1):E<y?(T=0,w=0,k=1,C=0,g=1,I=1):m<y?(T=0,w=1,k=0,C=0,g=1,I=1):(T=0,w=1,k=0,C=1,g=1,I=0);let D=m-T+h,q=E-w+h,F=y-k+h,V=m-C+2*h,M=E-g+2*h,H=y-I+2*h,X=m-1+3*h,K=E-1+3*h,J=y-1+3*h,L=p&255,U=f&255,O=b&255,j=.6-m*m-E*E-y*y;j<0?r=0:(j*=j,r=j*j*o(e[i[L+i[U+i[O]]]%12],m,E,y));let se=.6-D*D-q*q-F*F;se<0?n=0:(se*=se,n=se*se*o(e[i[L+T+i[U+w+i[O+k]]]%12],D,q,F));let pe=.6-V*V-M*M-H*H;pe<0?d=0:(pe*=pe,d=pe*pe*o(e[i[L+C+i[U+g+i[O+I]]]%12],V,M,H));let me=.6-X*X-K*K-J*J;return me<0?u=0:(me*=me,u=me*me*o(e[i[L+1+i[U+1+i[O+1]]]%12],X,K,J)),32*(r+n+d+u)}}})(),Ri=class{constructor(t,e,o={}){this.settings={frequency:.1,...o},this.w=t,this.h=e,this.time=0,this.build()}build(){this.cols=Math.ceil(this.w),this.rows=Math.ceil(this.h),this.field=new Array(this.cols);for(let t=0;t<this.cols;t++){this.field[t]=new Array(this.rows);for(let e=0;e<this.rows;e++)this.field[t][e]=new Ht(0,0)}}update(t){this.time+=t;let e=this.time*this.settings.frequency/1e3;for(let o=0;o<this.field.length;o++)for(let a=0;a<this.field[o].length;a++){let s=Qi.simplex3(o/20,a/20,e)*Math.PI*2,c=Qi.simplex3(o/10+4e4,a/10+4e4,e);this.field[o][a].setAngle(s),this.field[o][a].setLength(c),typeof this.manipulateVector=="function"&&this.manipulateVector(this.field[o][a],o,a),typeof this.onDraw=="function"&&this.onDraw(this.field[o][a],o,a)}}};function wr(){zi=[];let i=150;for(let t=0;t<i;t++)zi.push({x:Math.random(),y:Math.random(),size:.5+Math.random()*1.3,opacity:.15+Math.random()*.75,blinkSpeed:.001+Math.random()*.002,blinkOffset:Math.random()*Math.PI*2})}function ct(i){i.touches&&i.touches[0]?(st.x=i.touches[0].clientX,st.y=i.touches[0].clientY):(st.x=i.clientX,st.y=i.clientY)}function kr(i,t){let e=i.ctx2d;te=i.canvas2D,te.classList.add("afx-aurora-active"),lt=i.topInset||0,bt=i.visibleHeight||i.height,Me=i.width/8,Le=bt/8,te.width=Me*i.dpr,te.height=Le*i.dpr,e.setTransform(1,0,0,1,0,0),e.scale(i.dpr,i.dpr),te.style.width=Me+"px",te.style.height=Le+"px",te.style.position="absolute",te.style.top=lt+"px",te.style.left="0",te.style.transform="scale(8)",te.style.transformOrigin="top left",wr();let o=eo/8,a=Math.ceil(Me/o),s=Math.ceil(Le/(o*to));je=new Ri(a,s,{frequency:.1});let c={x:Me/a,y:Le/s},r=255/s;je.onDraw=(d,u,l)=>{let h=d.getLength()*Math.abs(d.x),x=d.getLength()*Math.abs(d.y),p=Math.round(-20*h+80*x+(50-.6*l*r)),f=Math.round(180*h+20*x-60+.4*l*r),b=Math.round(50*h+30*x+(40-.5*l*r)+.5*l*r);e.fillStyle=`rgba(${p}, ${f}, ${b}, 0.8)`,e.fillRect(u*c.x,l*c.y,c.x+.5,c.y+.5)},je.manipulateVector=(d,u,l)=>{let h={x:u*c.x+.5*c.x,y:l*c.y+.5*c.y},x=st.x/8,p=st.y/8,f=new Ht((x-h.x)/Me,(p-h.y)/Le);d.addTo(f),d.getLength()>1&&d.setLength(1)},yr=0,gt=0,window.addEventListener("mousemove",ct),window.addEventListener("touchstart",ct),window.addEventListener("touchmove",ct);function n(d){gt||(gt=d);let u=d-gt;gt=d,e.fillStyle="#020b1a",e.fillRect(0,0,Me,Le),je.update(u),xt=requestAnimationFrame(n)}xt=requestAnimationFrame(n)}function Sr(i,t,e,o){let a=lt,s=bt||e;i.fillStyle="#ffffff",zi.forEach(c=>{let r=(Math.sin(o*c.blinkSpeed+c.blinkOffset)+1)/2;i.globalAlpha=c.opacity*r,i.beginPath();let n=a+c.y*s;i.arc(c.x*t,n,c.size,0,Math.PI*2),i.fill()}),i.globalAlpha=1}function Er(){xt&&(cancelAnimationFrame(xt),xt=null),window.removeEventListener("mousemove",ct),window.removeEventListener("touchstart",ct),window.removeEventListener("touchmove",ct),te&&(te.classList.remove("afx-aurora-active"),te.style.cssText="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;",te=null);let i=window.AnkiFX;i&&typeof i.handleResize=="function"&&i.handleResize()}var Xt=null,Je,Gt,we=null,Cr=200,ro=[];try{let i=sessionStorage.getItem("ankifx_captured_logs");i&&(ro=JSON.parse(i))}catch{}window.AnkiFX_Captured_Logs=window.AnkiFX_Captured_Logs||ro;var oo=null,vt="all",he={ioHeaderHeight:null,topInset:null,bottomInset:null,viewportHeight:null,visibleHeight:0,isLandscape:!1};function ao(){let i=document.documentElement,t=i?getComputedStyle(i):null,e=(a,s)=>{if(!a)return null;let c=a.getPropertyValue(s);if(!c||c.trim()==="")return null;let r=parseInt(c,10);return isNaN(r)?null:r};he.ioHeaderHeight=e(t,"--io-header"),he.topInset=e(t,"--top-inset"),he.bottomInset=e(t,"--bottom-inset");let o=document.getElementById("ankifx-background");he.viewportHeight=o?Math.round(o.getBoundingClientRect().height):null,he.isLandscape=window.innerWidth>window.innerHeight,he.visibleHeight=(i?i.clientHeight:window.innerHeight)+(he.ioHeaderHeight||0)}var Ae=(i,t)=>{let e=t.map(o=>{if(o===null)return"null";if(o===void 0)return"undefined";if(typeof o=="object")try{return JSON.stringify(o)}catch{return String(o)}return String(o)}).join(" ");window.AnkiFX_Captured_Logs.push({type:i,message:e,timestamp:new Date().toLocaleTimeString()}),window.AnkiFX_Captured_Logs.length>Cr&&window.AnkiFX_Captured_Logs.shift();try{sessionStorage.setItem("ankifx_captured_logs",JSON.stringify(window.AnkiFX_Captured_Logs))}catch{}oo&&oo()};if(typeof window<"u"&&!window.__console_intercepted__){let i=console.log&&console.log.bind(console)||(()=>{}),t=console.warn&&console.warn.bind(console)||(()=>{}),e=console.error&&console.error.bind(console)||(()=>{}),o=console.info&&console.info.bind(console)||(()=>{}),a=console.debug&&console.debug.bind(console)||(()=>{});console.log=(...s)=>{i(...s),Ae("log",s)},console.warn=(...s)=>{t(...s),Ae("warn",s)},console.error=(...s)=>{e(...s),Ae("error",s)},console.info=(...s)=>{o(...s),Ae("info",s)},console.debug=(...s)=>{a(...s),Ae("debug",s)},window.addEventListener("error",s=>{let c=s.message;if(s.error){let r=s.error.name||"Error",n=s.error.message||s.message||"",d=s.error.stack||"";d&&!d.includes(n)?c=`${r}: ${n}
${d}`:c=d||`${r}: ${n}`}Ae("error",[c])}),window.addEventListener("unhandledrejection",s=>{Ae("error",[`Unhandled Promise Rejection: ${s.reason}`])}),window.__console_intercepted__=!0}var no={id:"debug",name:"DEBUG",run:Pr,stop:Tr,onResize:(i,t)=>{Je=i,Gt=t,ao()},marqueeFont:{color:"#00ff00",shadowColor:"rgba(0,0,0,0.8)",shadowBlur:5},controls:[{type:"button",id:"copy-logs-btn",label:"\u{1F4CB} COPY LOGS",onClick:()=>{_r()}},{type:"button",id:"clear-storage-btn",label:"\u{1F9F9} CLEAR STORAGE",onClick:()=>{if(confirm("Clear ALL AnkiFX local storage?")){localStorage.clear();try{sessionStorage.removeItem("ankifx_captured_logs"),sessionStorage.removeItem("ankifx_loader_logs"),sessionStorage.removeItem("ankifx_eval_history")}catch{}location.reload()}}}]};function Pr(i,t){we&&(we.remove(),we=null);let e=i.dpr||1;Je=i.width,Gt=i.height,ao(),we=document.createElement("div"),we.className="afx-debug-container";let o=document.createElement("div");o.className="afx-debug-columns",we.appendChild(o);let a=document.createElement("div");a.className="afx-debug-left-col",o.appendChild(a);let s=document.createElement("div");s.className="afx-debug-right-col",o.appendChild(s);let c=document.createElement("div");c.className="afx-debug-panel diagnostics",c.innerHTML="<h3>AnkiFX Version</h3>";let r=document.createElement("div");r.className="afx-debug-content",c.appendChild(r),a.appendChild(c);let n=document.createElement("div");n.className="afx-debug-panel viewport-info",n.innerHTML="<h3>Viewport & Layout</h3>";let d=document.createElement("pre");d.className="afx-debug-content",n.appendChild(d),a.appendChild(n);let u=document.createElement("div");u.className="afx-debug-panel logs",u.innerHTML="<h3>Chronological Loader Logs</h3>";let l=document.createElement("div");l.className="afx-debug-content",u.appendChild(l),s.appendChild(u);let h=document.createElement("div");h.className="afx-debug-panel localstorage-viewer",h.innerHTML="<h3>LocalStorage</h3>";let x=document.createElement("div");x.className="afx-debug-content",h.appendChild(x),s.appendChild(h);let p=document.createElement("div");p.className="afx-debug-panel console-logs",p.innerHTML=`
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
    `,we.appendChild(p);let f=document.createElement("div");f.style.height="calc(var(--bottom-inset, 0px) + var(--afx-dock-height, 0px) + 20px)",f.style.flexShrink="0",f.style.pointerEvents="none",we.appendChild(f);let b=p.querySelectorAll(".afx-console-filter-btn");b.forEach(L=>{L.addEventListener("click",U=>{U.stopPropagation(),b.forEach(O=>{O.classList.remove("active"),O.style.background="rgba(255,255,255,0.05)",O.style.borderColor="transparent",O.style.color="#888"}),L.classList.add("active"),L.style.background="rgba(255,255,255,0.15)",L.style.borderColor="rgba(255,255,255,0.25)",L.style.color="#fff",vt=L.getAttribute("data-filter")})});let v=p.querySelector("#afx-clear-console-btn");v&&v.addEventListener("click",L=>{L.stopPropagation(),window.AnkiFX_Captured_Logs.length=0;try{sessionStorage.removeItem("ankifx_captured_logs")}catch{}});let m=p.querySelector("#afx-console-input"),E=p.querySelector("#afx-console-exec-btn"),y=()=>{if(!m)return;let L=m.value.trim();if(L){Ae("log",[`> ${L}`]);try{let U=(0,eval)(L);Ae("info",["=>",U])}catch(U){Ae("error",[U.stack||U.message||U])}m.value="",m.focus()}};E&&m&&(["keydown","keyup","keypress"].forEach(L=>{m.addEventListener(L,U=>{U.stopPropagation()})}),m.addEventListener("keydown",L=>{L.key==="Enter"&&(L.preventDefault(),y())}),E.addEventListener("click",L=>{L.stopPropagation(),y()})),(document.getElementById("ankifx-overlay")||document.body).appendChild(we);let w=document.getElementById("ankifx-background")||document.body,k={topLeft:document.createElement("div"),topRight:document.createElement("div"),bottomLeft:document.createElement("div"),bottomRight:document.createElement("div")};k.topLeft.className="afx-debug-corner top-left",k.topRight.className="afx-debug-corner top-right",k.bottomLeft.className="afx-debug-corner bottom-left",k.bottomRight.className="afx-debug-corner bottom-right",k.bottomLeft.style.bottom="auto",k.bottomRight.style.bottom="auto",Object.values(k).forEach(L=>w.appendChild(L));let C=document.createElement("div");C.className="afx-debug-line visible-bottom";let g=document.createElement("span");g.className="afx-debug-line-label",g.textContent="--- VISIBLE DOCUMENT BOTTOM ---",C.appendChild(g),w.appendChild(C);let I=0,D=0,q=0,F="",V="",M="",H="",X="",K="";function J(L){L===void 0&&(L=performance.now()),I||(I=L),D++,L-I>=1e3&&(q=D,D=0,I=L);let U=i.ctx2d;U.clearRect(0,0,Je,Gt),U.fillStyle="#050508",U.fillRect(0,0,Je,Gt);let O=he.visibleHeight,j=N=>N!==null?`${N}px`:"N/A",se=j(he.ioHeaderHeight),pe=j(he.topInset),me=j(he.bottomInset),Be=j(he.viewportHeight),qe=he.ioHeaderHeight||0,Re=[`window:               ${window.innerWidth}x${window.innerHeight}`,`screen:               ${screen.width}x${screen.height}`,`doc:                  ${document.documentElement.clientWidth}x${document.documentElement.clientHeight}`,`orient:               ${window.orientation||"N/A"}`,`dpr (native|engine):  (${window.devicePixelRatio}|${e})`,`--io-header:          ${se}`,`--top-inset:          ${pe}`,`--bottom-inset:       ${me}`,`--afx-viewport-height: calc(100dvh + ${qe}px) = ${Be}`,`isLandscape:          ${he.isLandscape}`].join(`
`);Re!==F&&(d.textContent=Re,F=Re);let _e=window.AnkiFX_Eval_History||[],P=JSON.stringify(_e),A=[`Version:  ${window.AnkiFX?.version||"1.0.0-dev"}`,`Source:   ${window.AnkiFX?.source||"unknown"}`,`Built:    ${window.AnkiFX?.buildDate||"development"}`].join(`
`),$=A+"_"+P;if($!==V){r.innerHTML="";let N=document.createElement("pre");N.style.margin="0 0 10px 0",N.style.fontFamily="inherit",N.style.fontSize="inherit",N.textContent=A,r.appendChild(N);let B=document.createElement("div");B.style.borderTop="1px dashed rgba(255,255,255,0.15)",B.style.margin="10px 0",r.appendChild(B);let Q=document.createElement("div");Q.textContent="EVALUATION HISTORY:",Q.style.fontWeight="bold",Q.style.color="#00ffff",Q.style.marginBottom="6px",Q.style.fontSize="11px",r.appendChild(Q);let ie=document.createElement("div");if(_e.length===0){let G=document.createElement("div");G.textContent="(No evaluation history captured)",G.style.color="#888",G.style.fontStyle="italic",ie.appendChild(G)}else _e.slice(-3).forEach((G,Fe)=>{let xe=document.createElement("div");xe.textContent=`[${Fe+1}] ${G.source} (${G.version}) @ ${G.time} - ${G.status}`,xe.style.color=G.status==="active"?"#55ff55":"#ffaa55",xe.style.fontSize="11px",ie.appendChild(xe)});r.appendChild(ie),V=$}let z=window.AnkiFX_Loader_Logs||[],Z=JSON.stringify(z);if(Z!==M){if(l.innerHTML="",z.length===0){let N=document.createElement("div");N.textContent="(No logs captured by template loader)",N.style.color="#888",N.style.fontStyle="italic",l.appendChild(N)}else{let N={success:{color:"#55ff55",badge:"\u2713"},error:{color:"#ff5555",badge:"\u2717"},warn:{color:"#ffaa55",badge:"!"},pending:{color:"#888888",badge:"\u2026"},info:{color:"#dddddd",badge:"\xB7"}};z.forEach((B,Q)=>{let ie=B&&typeof B=="object",G=ie?B.msg:String(B),Fe=N[ie?B.level:"info"]||N.info,xe=document.createElement("div");xe.style.cssText="display: flex; gap: 6px; align-items: baseline; font-size: 11px; margin-bottom: 3px; padding-bottom: 2px; border-bottom: 1px solid rgba(255,255,255,0.04);";let Ne=document.createElement("span");Ne.textContent=`[${String(Q+1).padStart(2,"0")}]`,Ne.style.cssText="color: #555; flex-shrink: 0; font-size: 10px;";let ee=document.createElement("span");ee.textContent=Fe.badge,ee.style.cssText=`color: ${Fe.color}; flex-shrink: 0; font-weight: bold; width: 10px;`;let re=document.createElement("span");re.textContent=G,re.style.cssText=`color: ${Fe.color}; word-break: break-word;`,xe.appendChild(Ne),xe.appendChild(ee),xe.appendChild(re),l.appendChild(xe)})}M=Z}let fe={};for(let N=0;N<localStorage.length;N++){let B=localStorage.key(N);fe[B]=localStorage.getItem(B)}let ge=JSON.stringify(fe);if(ge!==K){x.innerHTML="";let N=Object.keys(fe).sort();if(N.length===0){let B=document.createElement("div");B.textContent="(LocalStorage is empty)",B.style.color="#888",B.style.fontStyle="italic",B.style.fontSize="11px",x.appendChild(B)}else N.forEach(B=>{let Q=document.createElement("div");Q.style.cssText="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 2px;";let ie=document.createElement("span");ie.textContent=B,ie.style.color="#ffaa55",ie.style.wordBreak="break-all",ie.style.marginRight="8px";let G=document.createElement("span");G.textContent=fe[B],G.style.color="#00ffff",G.style.wordBreak="break-all",G.style.textAlign="right",Q.appendChild(ie),Q.appendChild(G),x.appendChild(Q)});K=ge}let ve=window.AnkiFX_Captured_Logs.filter(N=>vt==="all"?!0:N.type===vt),ye=vt+"_"+JSON.stringify(ve);if(ye!==X){let N=document.getElementById("afx-console-log-list");if(N)if(N.innerHTML="",ve.length===0){let B=document.createElement("div");B.textContent=`(No logs in category: ${vt})`,B.style.color="#888",B.style.fontStyle="italic",B.style.fontSize="11px",N.appendChild(B)}else ve.forEach(B=>{let Q=document.createElement("div");Q.style.marginBottom="4px",Q.style.fontSize="11px",Q.style.borderBottom="1px solid rgba(255,255,255,0.03)",Q.style.paddingBottom="2px";let ie=document.createElement("span");ie.textContent=`[${B.timestamp}] `,ie.style.color="#888",Q.appendChild(ie);let G=document.createElement("span");G.textContent=B.message,B.type==="error"?G.style.color="#ff5555":B.type==="warn"?G.style.color="#ffaa55":B.type==="info"||B.type==="debug"?G.style.color="#00ffff":G.style.color="#ffffff",Q.appendChild(G),N.appendChild(Q)}),N.scrollTop=N.scrollHeight;X=ye}let mt=`${Je}x${O}`;mt!==H&&(k.topLeft.textContent="(0,0)",k.topRight.textContent=`(${Je},0)`,k.bottomLeft.textContent=`(0,${O})`,k.bottomRight.textContent=`(${Je},${O})`,k.bottomLeft.style.top=`${O-18}px`,k.bottomRight.style.top=`${O-18}px`,H=mt),C.style.top=`${O}px`,Xt=requestAnimationFrame(J)}J()}function Tr(){Xt&&(cancelAnimationFrame(Xt),Xt=null),we&&(we.remove(),we=null),document.querySelectorAll(".afx-debug-corner, .afx-debug-line").forEach(i=>i.remove())}function _r(){let i=document.querySelector(".afx-debug-container");if(!i)return;let t=`=== ANKIFX DEBUG LOGS ===

`;i.querySelectorAll(".afx-debug-panel").forEach(a=>{let s=a.querySelector("h3")?.textContent||"",c=a.querySelector(".afx-debug-content");c&&(t+=`--- ${s.toUpperCase()} ---
`,t+=c.innerText||c.textContent||"",t+=`

`)}),(()=>{try{let a=document.createElement("textarea");a.value=t.trim(),a.style.position="fixed",a.style.top="0",a.style.left="0",a.style.opacity="0",a.style.pointerEvents="none",document.body.appendChild(a),a.focus(),a.select();let s=document.execCommand("copy");if(document.body.removeChild(a),s)return Promise.resolve()}catch{}return navigator.clipboard&&typeof navigator.clipboard.writeText=="function"?navigator.clipboard.writeText(t.trim()):Promise.reject(new Error("No copy method succeeded or is available"))})().then(()=>{let a=document.getElementById("afx-control-copy-logs-btn");if(a){let s=a.textContent;a.textContent="\u2705 COPIED!",setTimeout(()=>{a.textContent=s},1500)}}).catch(a=>{let s=document.getElementById("afx-control-copy-logs-btn");if(s){let c=s.textContent;s.textContent="\u274C ERROR",setTimeout(()=>{s.textContent=c},1500)}})}var yt=null,ae,Ie,Ce={id:"ecg",name:"ECG Monitor",run:Fr,stop:Mr,onResize:(i,t)=>{ae=i,Ie=t},marqueeFont:{color:"#FF1A1A",shadowColor:"#CC0000",shadowBlur:15}};function Fr(i,t){let e=i.ctx2d;ae=i.width,Ie=i.height;let o=document.getElementById("afx-top-group-right"),a=document.getElementById("afx-ecg-panel");!a&&o&&(a=document.createElement("div"),a.id="afx-ecg-panel",o.insertBefore(a,o.firstChild)),a&&!a.querySelector(".afx-ecg-bpm-val")&&(a.innerHTML=`
            <div class="afx-ecg-bpm">\u2665 <span class="afx-ecg-bpm-val">--</span> BPM</div>
            <div class="afx-ecg-rhythm">--</div>
        `);let s=a?a.querySelector(".afx-ecg-bpm-val"):null,c=a?a.querySelector(".afx-ecg-rhythm"):null,r=localStorage.getItem("ankifx_ecg_rhythm")||"sinus";Ce.controls=[{type:"button",id:"ecg-trigger",label:r==="sinus"?"\u26A1 TRIGGER ARRHYTHMIA":"\u{1F49A} RESTORE SINUS",onClick:()=>{let P=localStorage.getItem("ankifx_ecg_rhythm")||"sinus",A;if(P==="sinus"){let $=["first_degree","mobitz_1","mobitz_2","third_degree","st_elevation","afib","a_flutter","torsades"];A=$[Math.floor(Math.random()*$.length)]}else A="sinus";localStorage.setItem("ankifx_ecg_rhythm",A),localStorage.setItem("ankifx_ecg_trigger_time",Date.now())}}];let n=200,d=40,u=120,l=25,h=5,x=new Float32Array(4096),p=0,f=0,b=0,v=0,m=0,E=0,y=0,T=100,w=.6,k=72,C=0,g="sinus",I=25+Math.random()*15,D=0,q=["first_degree","mobitz_1","mobitz_2","third_degree","st_elevation","afib","a_flutter","torsades"],F=0;function V(){p<ae&&(p=ae)}let M=(P,A,$,z)=>z*Math.exp(-((P-A)**2)/(2*$**2));function H(P){return M(P,.15,.03,.12)}function X(P){return M(P,.03,.03,.12)}function K(P,A){let $=A%4;return $===0?M(P,.17,.03,.12):$===1?M(P,.1,.03,.12):$===2?M(P,.03,.03,.12):M(P,.15,.03,.12)}function J(P){return M(P,.08,.03,.12)}function L(P){return .035*Math.sin(P*Math.PI*40)+.015*Math.sin(P*Math.PI*96)+.008*Math.sin(P*Math.PI*176)}function U(P){return .085*(P*4%1-.5)}function O(P,A){let $=Math.sin(P*Math.PI*2)*.58+Math.sin(P*Math.PI*4)*.16,z=Math.sin(A*1.2);return $*z}function j(P,A=!1){let $=0;return $+=M(P,.33,.008,-.08),$+=M(P,.36,.012,1),$+=M(P,.39,.008,-.12),A&&($+=M(P,.46,.07,.38)),$+=M(P,.56,.04,.22),$}function se(P,A,$){let z=P%1,Z=Math.floor(P);return A==="sinus"?H(z)+j(z,!1):A==="first_degree"?X(z)+j(z,!1):A==="mobitz_1"?Z%4===3?K(z,Z):K(z,Z)+j(z,!1):A==="mobitz_2"?Z%3===2?J(z):J(z)+j(z,!1):A==="st_elevation"?H(z)+j(z,!0):A==="afib"?L(z)+j(z,!1):A==="a_flutter"?U(z)+j(z,!1):A==="torsades"?O(z,$):0}function pe(P,A){let $=P%1,z=A%1,Z=M($,.15,.03,.12),fe=M(z,.33,.008,-.08)+M(z,.36,.012,1)+M(z,.39,.008,-.12)+M(z,.56,.04,.22);return Z+fe}function me(){e.strokeStyle="rgba(60, 0, 0, 0.15)",e.lineWidth=.5,e.beginPath();for(let P=0;P<ae;P+=h)e.moveTo(P,0),e.lineTo(P,Ie);for(let P=0;P<Ie;P+=h)e.moveTo(0,P),e.lineTo(ae,P);e.stroke(),e.strokeStyle="rgba(80, 0, 0, 0.3)",e.lineWidth=1,e.beginPath();for(let P=0;P<ae;P+=l)e.moveTo(P,0),e.lineTo(P,Ie);for(let P=0;P<Ie;P+=l)e.moveTo(0,P),e.lineTo(ae,P);e.stroke()}let Be=-1,qe="";function Re(){if(!a)return;let P=.5+C*.5;a.style.opacity=P;let A="SINUS RHYTHM";g==="first_degree"?A="1\xB0 AV BLOCK":g==="mobitz_1"?A="2\xB0 AV (MOBITZ 1)":g==="mobitz_2"?A="2\xB0 AV (MOBITZ 2)":g==="third_degree"?A="3\xB0 AV BLOCK":g==="st_elevation"?A="ST ELEVATION":g==="afib"?A="ATRIAL FIBRILLATION":g==="a_flutter"?A="ATRIAL FLUTTER":g==="torsades"&&(A="TORSADES DE POINTES"),s&&k!==Be&&(s.textContent=k,Be=k),c&&A!==qe&&(c.textContent=A,qe=A)}function _e(P){v||(v=P);let A=Math.min((P-v)/1e3,.05);v=P,b+=A,V();let $=localStorage.getItem("ankifx_ecg_rhythm")||"sinus",z=parseInt(localStorage.getItem("ankifx_ecg_trigger_time")||"0");if(z>D){if(D=z,g=$,I=b+25+Math.random()*15,g!=="sinus"){let ee=q.indexOf(g);ee!==-1&&(F=(ee+1)%q.length)}g==="afib"&&(T=70+Math.floor(Math.random()*60),w=60/T),Ce.controls&&Ce.controls[0]&&(Ce.controls[0].label=g==="sinus"?"\u26A1 TRIGGER ARRHYTHMIA":"\u{1F49A} RESTORE SINUS",AnkiFX.renderEffectControls(Ce))}b>=I&&(g==="sinus"?(g=q[F],F=(F+1)%q.length):g="sinus",localStorage.setItem("ankifx_ecg_rhythm",g),I=b+25+Math.random()*15,g==="afib"&&(T=70+Math.floor(Math.random()*60),w=60/T),Ce.controls&&Ce.controls[0]&&(Ce.controls[0].label=g==="sinus"?"\u26A1 TRIGGER ARRHYTHMIA":"\u{1F49A} RESTORE SINUS",AnkiFX.renderEffectControls(Ce)));let Z=72;g==="third_degree"?Z=35:g==="mobitz_1"||g==="mobitz_2"?Z=68:g==="afib"?Z=T:g==="a_flutter"?Z=75:g==="torsades"&&(Z=220);let fe=g==="afib"?w:60/Z,ge=m,ve=E,ye=y;if(g==="third_degree"?(E+=A/(60/88),y+=A/(60/Z)):m+=A/fe,g!=="third_degree"){let ee=Math.floor(ge);Math.floor(m)>ee&&g==="afib"&&(T=70+Math.floor(Math.random()*65),w=60/T)}if(g==="third_degree")Math.floor(ye-.36)<Math.floor(y-.36)&&(C=1,k=Z+Math.floor(Math.random()*3)-1);else if(Math.floor(ge-.36)<Math.floor(m-.36)){let ee=Math.floor(m-.36),re=!1;g==="mobitz_1"?re=ee%4===3:g==="mobitz_2"&&(re=ee%3===2),re||(C=1,k=Math.floor(Z),g!=="torsades"&&g!=="a_flutter"&&(k+=Math.floor(Math.random()*5)-2))}C=Math.max(0,C-A*4);let mt=n*A,N=f+mt,B=Math.floor(f),Q=Math.floor(N);for(let ee=B;ee<=Q;ee++){let re=ee%ae,Se=(ee-f)/mt;if(g==="third_degree"){let Ee=ve+(E-ve)*Se,Nt=ye+(y-ye)*Se;x[re]=pe(Ee,Nt)}else{let Ee=ge+(m-ge)*Se;x[re]=se(Ee,g,b)}}f=N,f>=ae&&(f-=ae),e.fillStyle="#000000",e.fillRect(0,0,ae,Ie),me();let ie=Ie*.55,G=Ie*.35,Fe=Math.floor(f)%ae,xe=4;e.save(),e.lineCap="round",e.lineJoin="round";for(let ee=0;ee<3;ee++){ee===0?(e.lineWidth=15,e.strokeStyle="rgb(200, 0, 0)"):ee===1?(e.lineWidth=7,e.strokeStyle="rgb(255, 15, 15)"):(e.lineWidth=2.4,e.strokeStyle="rgb(255, 175, 175)");for(let re=0;re<ae;re+=xe){let Se=Fe-re;if(Se<0&&(Se+=ae),Se>ae-d)continue;let Ee=1,Nt=ae-d-u;if(Se>Nt&&(Ee=1-(Se-Nt)/u,Ee=Math.max(0,Ee)),Ee<=0)continue;let jt=0;Se<12&&(jt=1-Se/12),ee===0?e.globalAlpha=Ee*(.07+jt*.13):ee===1?e.globalAlpha=Ee*(.28+jt*.32):e.globalAlpha=Ee*(.85+jt*.15),e.beginPath();let br=ie-x[re]*G;e.moveTo(re,br);let $t=Math.min(re+xe,ae);for(let nt=re+1;nt<$t;nt++){let vr=ie-x[nt]*G;e.lineTo(nt,vr)}if($t<ae){let nt=ie-x[$t]*G;e.lineTo($t,nt)}e.stroke()}}e.globalAlpha=1,e.restore(),e.save();let Ne=e.createLinearGradient(Fe-3,0,Fe+3,0);Ne.addColorStop(0,"rgba(255, 0, 0, 0)"),Ne.addColorStop(.5,"rgba(255, 50, 50, 0.4)"),Ne.addColorStop(1,"rgba(255, 0, 0, 0)"),e.fillStyle=Ne,e.fillRect(Fe-3,0,6,Ie),e.restore(),Re(),yt=requestAnimationFrame(_e)}yt=requestAnimationFrame(_e)}function Mr(){yt&&(cancelAnimationFrame(yt),yt=null);let i=document.getElementById("afx-ecg-panel");i&&i.remove()}var wt=null,Oi,Ui,so={id:"fire",name:"Doom Fire",run:Ar,stop:Ir,onResize:(i,t)=>{Oi=i,Ui=t},preferredTrack:{title:"Doom 3 BFG Edition",trackTitle:"DOOM E1M1"},marqueeFont:{color:"#ffffff",shadowColor:"rgba(0,0,0,0.8)",shadowBlur:5}},Lr=[[7,7,7],[31,7,7],[47,15,7],[71,15,7],[87,23,7],[103,31,7],[119,31,7],[143,39,7],[159,47,7],[175,63,7],[191,71,7],[199,71,7],[223,79,7],[223,87,7],[223,87,7],[215,95,7],[215,95,7],[215,103,15],[207,111,15],[207,119,15],[207,127,15],[207,135,23],[199,135,23],[199,143,23],[199,151,31],[191,159,31],[191,159,31],[191,167,39],[191,167,39],[191,175,47],[183,175,47],[183,183,47],[183,183,55],[207,207,111],[223,223,159],[239,239,199],[255,255,255]];function Ar(i,t){let e=i.ctx2d;Oi=i.width,Ui=i.height;let o=320,a=168,s=new Uint8Array(o*a),c=e.createImageData(o,a),r=c.data,n=document.createElement("canvas");n.width=o,n.height=a;let d=n.getContext("2d");function u(){s.fill(0);for(let f=0;f<o;f++)s[(a-1)*o+f]=36}function l(f){let b=s[f];if(b===0)s[f-o]=0;else{let v=Math.floor(Math.random()*3),m=f-v+1;s[m-o]=b-(v&1)}}function h(){for(let f=0;f<o;f++)for(let b=1;b<a;b++)l(b*o+f)}function x(){for(let f=0;f<s.length;f++){let b=s[f],v=Lr[b],m=f*4;r[m]=v[0],r[m+1]=v[1],r[m+2]=v[2],r[m+3]=255}}u();function p(){h(),x(),d.putImageData(c,0,0),e.save(),e.imageSmoothingEnabled=!1,e.drawImage(n,0,0,Oi,Ui),e.restore(),wt=requestAnimationFrame(p)}wt=requestAnimationFrame(p)}function Ir(){wt&&(cancelAnimationFrame(wt),wt=null)}var Et=null,kt,St,lo={id:"geometry",name:"Geometry",run:Dr,stop:zr,onResize:(i,t)=>{kt=i,St=t},marqueeFont:{colorFn:(i,t)=>`hsl(${(i*120+t*4)%360}, 100%, 55%)`,shadowColor:"inherit",shadowBlur:15}};function Dr(i,t){let e=i.ctx2d;kt=i.width,St=i.height;let o=0;function a(){o+=.012,e.globalCompositeOperation="source-over",e.fillStyle="rgba(2, 2, 5, 0.3)",e.fillRect(0,0,kt,St),e.globalCompositeOperation="lighter";let s=kt/2,c=St/2,r=Math.max(kt,St)*.85;for(let n=0;n<35;n++){let d=o+n*.05,u=(Math.sin(d*.8)*.5+.5)*r+n*12;e.save(),e.translate(s,c),e.rotate(Math.sin(o*.3)*Math.PI+n*.06),e.scale(Math.sin(o*.5+n*.1)*.4+.8,Math.cos(o*.4+n*.1)*.4+.8),e.beginPath();for(let h=0;h<=8;h++){let x=h/8*Math.PI*2,p=Math.cos(x)*u,f=Math.sin(x)*u;h===0?e.moveTo(p,f):e.lineTo(p,f)}let l=(o*50+n*10)%360;e.strokeStyle=`hsla(${l}, 95%, 65%, 0.6)`,e.lineWidth=4,e.stroke(),e.restore()}e.globalCompositeOperation="source-over",Et=requestAnimationFrame(a)}Et=requestAnimationFrame(a)}function zr(){Et&&(cancelAnimationFrame(Et),Et=null)}var Vt=null;function fo(i){Vt=i}var Rr=["#c3e4ff","#6ec3f4","#eae2ff","#b9beff"];function co(i){return[(i>>16&255)/255,(i>>8&255)/255,(255&i)/255]}var Bi=class{constructor(t,e,o,a){let s=this;s.canvas=t,s.gl=e,s.meshes=[],s.debug=()=>{};let c=s.gl;Object.defineProperties(s,{Material:{enumerable:!1,value:class{constructor(n,d,u={}){let l=this;function h(f,b){let v=c.createShader(f);return c.shaderSource(v,b),c.compileShader(v),c.getShaderParameter(v,c.COMPILE_STATUS)||console.error("[Gradient/WebGL] Shader compile error:",c.getShaderInfoLog(v)),v}function x(f,b){return Object.entries(f).map(([v,m])=>m.getDeclaration(v,b)).join(`
`)}l.uniforms=u,l.uniformInstances=[];let p=`
              precision highp float;
            `;l.vertexSource=`
              ${p}
              attribute vec4 position;
              attribute vec2 uv;
              attribute vec2 uvNorm;
              ${x(s.commonUniforms,"vertex")}
              ${x(u,"vertex")}
              ${n}
            `,l.Source=`
              ${p}
              ${x(s.commonUniforms,"fragment")}
              ${x(u,"fragment")}
              ${d}
            `,l.vertexShader=h(c.VERTEX_SHADER,l.vertexSource),l.fragmentShader=h(c.FRAGMENT_SHADER,l.Source),l.program=c.createProgram(),c.attachShader(l.program,l.vertexShader),c.attachShader(l.program,l.fragmentShader),c.linkProgram(l.program),l.vertexShader&&(c.detachShader(l.program,l.vertexShader),c.deleteShader(l.vertexShader)),l.fragmentShader&&(c.detachShader(l.program,l.fragmentShader),c.deleteShader(l.fragmentShader)),c.getProgramParameter(l.program,c.LINK_STATUS)||console.error("[Gradient/WebGL] Program link error:",c.getProgramInfoLog(l.program)),c.useProgram(l.program),l.attachUniforms(void 0,s.commonUniforms),l.attachUniforms(void 0,l.uniforms)}attachUniforms(n,d){let u=this;n===void 0?Object.entries(d).forEach(([l,h])=>{u.attachUniforms(l,h)}):d.type==="array"?d.value.forEach((l,h)=>u.attachUniforms(`${n}[${h}]`,l)):d.type==="struct"?Object.entries(d.value).forEach(([l,h])=>u.attachUniforms(`${n}.${l}`,h)):u.uniformInstances.push({uniform:d,location:c.getUniformLocation(u.program,n)})}}},Uniform:{enumerable:!1,value:class{constructor(n){this.type="float",Object.assign(this,n),this.typeFn={float:"1f",int:"1i",vec2:"2fv",vec3:"3fv",vec4:"4fv",mat4:"Matrix4fv"}[this.type]||"1f",this.update()}update(n){this.value!==void 0&&c[`uniform${this.typeFn}`](n,this.typeFn.substring(0,6)==="Matrix"?this.transpose:this.value,this.typeFn.substring(0,6)==="Matrix"?this.value:null)}getDeclaration(n,d,u){let l=this;if(l.excludeFrom!==d){if(l.type==="array")return l.value[0].getDeclaration(n,d,l.value.length)+`
const int ${n}_length = ${l.value.length};`;if(l.type==="struct"){let h=n.replace("u_","");return h=h.charAt(0).toUpperCase()+h.slice(1),`uniform struct ${h} 
{
`+Object.entries(l.value).map(([x,p])=>p.getDeclaration(x,d).replace(/^uniform/,"")).join("")+`
} ${n}${u>0?`[${u}]`:""};`}return`uniform ${l.type} ${n}${u>0?`[${u}]`:""};`}}}},PlaneGeometry:{enumerable:!1,value:class{constructor(n,d,u,l,h){c.createBuffer(),this.attributes={position:new s.Attribute({target:c.ARRAY_BUFFER,size:3}),uv:new s.Attribute({target:c.ARRAY_BUFFER,size:2}),uvNorm:new s.Attribute({target:c.ARRAY_BUFFER,size:2}),index:new s.Attribute({target:c.ELEMENT_ARRAY_BUFFER,size:3,type:c.UNSIGNED_SHORT})},this.setTopology(u,l),this.setSize(n,d,h)}setTopology(n=1,d=1){let u=this;u.xSegCount=n,u.ySegCount=d,u.vertexCount=(u.xSegCount+1)*(u.ySegCount+1),u.quadCount=u.xSegCount*u.ySegCount*2,u.attributes.uv.values=new Float32Array(2*u.vertexCount),u.attributes.uvNorm.values=new Float32Array(2*u.vertexCount),u.attributes.index.values=new Uint16Array(3*u.quadCount);for(let l=0;l<=u.ySegCount;l++)for(let h=0;h<=u.xSegCount;h++){let x=l*(u.xSegCount+1)+h;if(u.attributes.uv.values[2*x]=h/u.xSegCount,u.attributes.uv.values[2*x+1]=1-l/u.ySegCount,u.attributes.uvNorm.values[2*x]=h/u.xSegCount*2-1,u.attributes.uvNorm.values[2*x+1]=1-l/u.ySegCount*2,h<u.xSegCount&&l<u.ySegCount){let p=l*u.xSegCount+h;u.attributes.index.values[6*p]=x,u.attributes.index.values[6*p+1]=x+1+u.xSegCount,u.attributes.index.values[6*p+2]=x+1,u.attributes.index.values[6*p+3]=x+1,u.attributes.index.values[6*p+4]=x+1+u.xSegCount,u.attributes.index.values[6*p+5]=x+2+u.xSegCount}}u.attributes.uv.update(),u.attributes.uvNorm.update(),u.attributes.index.update()}setSize(n=1,d=1,u="xz"){let l=this;l.width=n,l.height=d,l.orientation=u,(!l.attributes.position.values||l.attributes.position.values.length!==3*l.vertexCount)&&(l.attributes.position.values=new Float32Array(3*l.vertexCount));let h=n/-2,x=d/-2,p=n/l.xSegCount,f=d/l.ySegCount;for(let b=0;b<=l.ySegCount;b++){let v=x+b*f;for(let m=0;m<=l.xSegCount;m++){let E=h+m*p,y=b*(l.xSegCount+1)+m;l.attributes.position.values[3*y+"xyz".indexOf(u[0])]=E,l.attributes.position.values[3*y+"xyz".indexOf(u[1])]=-v}}l.attributes.position.update()}}},Mesh:{enumerable:!1,value:class{constructor(n,d){let u=this;u.geometry=n,u.material=d,u.wireframe=!1,u.attributeInstances=[],Object.entries(u.geometry.attributes).forEach(([l,h])=>{u.attributeInstances.push({attribute:h,location:h.attach(l,u.material.program)})}),s.meshes.push(u)}draw(){c.useProgram(this.material.program),this.material.uniformInstances.forEach(({uniform:n,location:d})=>n.update(d)),this.attributeInstances.forEach(({attribute:n,location:d})=>n.use(d)),c.drawElements(this.wireframe?c.LINES:c.TRIANGLES,this.geometry.attributes.index.values.length,c.UNSIGNED_SHORT,0)}remove(){s.meshes=s.meshes.filter(n=>n!==this)}}},Attribute:{enumerable:!1,value:class{constructor(n){this.type=c.FLOAT,this.normalized=!1,this.buffer=c.createBuffer(),Object.assign(this,n),this.update()}update(){this.values!==void 0&&(c.bindBuffer(this.target,this.buffer),c.bufferData(this.target,this.values,c.STATIC_DRAW))}attach(n,d){let u=c.getAttribLocation(d,n);return this.target===c.ARRAY_BUFFER&&(c.enableVertexAttribArray(u),c.vertexAttribPointer(u,this.size,this.type,this.normalized,0,0)),u}use(n){c.bindBuffer(this.target,this.buffer),this.target===c.ARRAY_BUFFER&&(c.enableVertexAttribArray(n),c.vertexAttribPointer(n,this.size,this.type,this.normalized,0,0))}}}});let r=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];s.commonUniforms={projectionMatrix:new s.Uniform({type:"mat4",value:r}),modelViewMatrix:new s.Uniform({type:"mat4",value:r}),resolution:new s.Uniform({type:"vec2",value:[1,1]}),aspectRatio:new s.Uniform({type:"float",value:1})},o&&a&&this.setSize(o,a)}setSize(t=640,e=480,o=1){this.width=t,this.height=e,this.gl.viewport(0,0,t*o,e*o),this.commonUniforms.resolution.value=[t,e],this.commonUniforms.aspectRatio.value=t/e}setOrthographicCamera(t=0,e=0,o=0,a=-2e3,s=2e3){this.commonUniforms.projectionMatrix.value=[2/this.width,0,0,0,0,2/this.height,0,0,0,0,2/(a-s),0,t,e,o,1]}render(){this.gl.clearColor(0,0,0,0),this.gl.clearDepth(1),this.meshes.forEach(t=>t.draw())}cleanup(){let t=this.gl;this.meshes.forEach(e=>{e.attributeInstances&&e.attributeInstances.forEach(({location:o})=>{typeof o=="number"&&o>=0&&t.disableVertexAttribArray(o)}),e.material&&e.material.program&&t.deleteProgram(e.material.program),e.geometry&&e.geometry.attributes&&Object.values(e.geometry.attributes).forEach(o=>{o.buffer&&t.deleteBuffer(o.buffer)})}),this.meshes=[]}},Wt=class{constructor(t,e,o,a){this.canvas=t,this.gl=e,this.width=o,this.height=a,this.angle=0,this.conf={presetName:"",wireframe:!1,density:[.06,.16],zoom:1,rotation:0,playing:!0},this.t=1253106,this.last=0,this.amp=320,this.seed=5,this.freqX=14e-5,this.freqY=29e-5,this.activeColors=[1,1,1,1],this.shaderFiles={vertex:`
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
            `},this.initGradientColors(),this.minigl=new Bi(t,e,o,a),this.initMesh(),this.resize(),this.updateThemeAwareText()}initGradientColors(){this.sectionColors=Rr.map(t=>co(parseInt(t.substring(1),16)))}initMaterial(){this.uniforms={u_time:new this.minigl.Uniform({value:0}),u_shadow_power:new this.minigl.Uniform({value:5}),u_darken_top:new this.minigl.Uniform({value:0}),u_active_colors:new this.minigl.Uniform({value:this.activeColors,type:"vec4"}),u_global:new this.minigl.Uniform({value:{noiseFreq:new this.minigl.Uniform({value:[this.freqX,this.freqY],type:"vec2"}),noiseSpeed:new this.minigl.Uniform({value:5e-6})},type:"struct"}),u_vertDeform:new this.minigl.Uniform({value:{incline:new this.minigl.Uniform({value:Math.sin(this.angle)/Math.cos(this.angle)}),offsetTop:new this.minigl.Uniform({value:-.5}),offsetBottom:new this.minigl.Uniform({value:-.5}),noiseFreq:new this.minigl.Uniform({value:[3,4],type:"vec2"}),noiseAmp:new this.minigl.Uniform({value:this.amp}),noiseSpeed:new this.minigl.Uniform({value:10}),noiseFlow:new this.minigl.Uniform({value:3}),noiseSeed:new this.minigl.Uniform({value:this.seed})},type:"struct",excludeFrom:"fragment"}),u_baseColor:new this.minigl.Uniform({value:this.sectionColors[0],type:"vec3",excludeFrom:"fragment"}),u_waveLayers:new this.minigl.Uniform({value:[],excludeFrom:"fragment",type:"array"})};for(let t=1;t<this.sectionColors.length;t+=1)this.uniforms.u_waveLayers.value.push(new this.minigl.Uniform({value:{color:new this.minigl.Uniform({value:this.sectionColors[t],type:"vec3"}),noiseFreq:new this.minigl.Uniform({value:[2+t/this.sectionColors.length,3+t/this.sectionColors.length],type:"vec2"}),noiseSpeed:new this.minigl.Uniform({value:11+.3*t}),noiseFlow:new this.minigl.Uniform({value:6.5+.3*t}),noiseSeed:new this.minigl.Uniform({value:this.seed+10*t}),noiseFloor:new this.minigl.Uniform({value:.1}),noiseCeil:new this.minigl.Uniform({value:.63+.07*t})},type:"struct"}));return this.vertexShader=[this.shaderFiles.noise,this.shaderFiles.blend,this.shaderFiles.vertex].join(`

`),new this.minigl.Material(this.vertexShader,this.shaderFiles.fragment,this.uniforms)}initMesh(){this.material=this.initMaterial(),this.geometry=new this.minigl.PlaneGeometry,this.mesh=new this.minigl.Mesh(this.geometry,this.material)}resize(){let t=Math.min(window.devicePixelRatio||1,1.5);this.minigl.setSize(this.width,this.height,t),this.minigl.setOrthographicCamera(),this.xSegCount=Math.ceil(this.width*this.conf.density[0]),this.ySegCount=Math.ceil(this.height*this.conf.density[1]),this.mesh.geometry.setTopology(this.xSegCount,this.ySegCount),this.mesh.geometry.setSize(this.width,this.height),this.mesh.material.uniforms.u_shadow_power.value=this.width<600?5:6}animate=t=>{if(!this.conf.playing)return;this.last===0&&(this.last=t);let e=Math.min(t-this.last,1e3/15);this.last=t,this.t+=e,this.mesh.material.uniforms.u_time.value=this.t,this.minigl.render(),this.animationId=requestAnimationFrame(this.animate)};updateThemeAwareText(){if(!this.sectionColors||this.sectionColors.length===0)return;let t=0;this.sectionColors.forEach(s=>{let c=s[0],r=s[1],n=s[2],d=.299*c+.587*r+.114*n;t+=d});let e=t/this.sectionColors.length,o=e>.6?"#111111":"#ffffff",a=e>.6?"0 1px 2px rgba(255, 255, 255, 0.8)":"0 1px 3px rgba(0, 0, 0, 0.9), 0 2px 10px rgba(0, 0, 0, 0.6)";document.documentElement.style.setProperty("--afx-body-color",o),document.documentElement.style.setProperty("--afx-text-shadow",a),Vt&&(Vt.marqueeFont={colorFn:(s,c)=>{if(!this.sectionColors||this.sectionColors.length===0)return"#ffffff";let r=(s*1.5+c*.25)%this.sectionColors.length,n=Math.floor(r),d=(n+1)%this.sectionColors.length,u=r-n,l=this.sectionColors[n],h=this.sectionColors[d],x=l[0]*(1-u)+h[0]*u,p=l[1]*(1-u)+h[1]*u,f=l[2]*(1-u)+h[2]*u,b=e>.6?.45:1;return`rgb(${Math.round(x*b*255)}, ${Math.round(p*b*255)}, ${Math.round(f*b*255)})`},shadowColor:e>.6?"rgba(0, 0, 0, 0.25)":"inherit",shadowBlur:16},window.AnkiFX&&window.AnkiFX.marquee&&window.AnkiFX.marquee.updateStyles(Vt.marqueeFont))}randomizeColors(){let t=()=>"#"+Math.floor(Math.random()*16777215).toString(16).padStart(6,"0"),e=[t(),t(),t(),t()];if(this.sectionColors=e.map(o=>co(parseInt(o.substring(1),16))),this.uniforms&&this.uniforms.u_baseColor&&this.uniforms.u_waveLayers&&this.uniforms.u_waveLayers.value){this.uniforms.u_baseColor.value=this.sectionColors[0];for(let o=0;o<this.uniforms.u_waveLayers.value.length;o++){let a=this.uniforms.u_waveLayers.value[o];a&&a.value&&a.value.color&&(a.value.color.value=this.sectionColors[o+1]||this.sectionColors[0])}}this.updateThemeAwareText()}destroy(){this.conf.playing=!1,this.animationId&&cancelAnimationFrame(this.animationId),this.minigl&&this.minigl.cleanup()}};var ue=null,qi={id:"gradient",name:"Gradient",controls:[{type:"button",id:"gradient-randomize",label:"\u{1F3A8} RANDOMIZE",onClick:()=>{ue&&ue.randomizeColors()}}],run:(i,t)=>{ue&&ue.destroy(),ue=new Wt(i.canvasGL,i.gl,i.width,i.height),ue.conf.playing=!0,ue.last=0,ue.animationId=requestAnimationFrame(ue.animate)},stop:()=>{ue&&(ue.destroy(),ue=null),document.documentElement.style.removeProperty("--afx-body-color"),document.documentElement.style.removeProperty("--afx-text-shadow")},onResize:(i,t,e)=>{ue&&(ue.width=i,ue.height=t,ue.resize())},marqueeFont:{color:"#E6E6FA",shadowColor:"rgba(230, 230, 250, 0.6)",shadowBlur:8}};fo(qi);function Yt(i,t,e){function o(d,u){let l=i.createShader(d);return i.shaderSource(l,u),i.compileShader(l),i.getShaderParameter(l,i.COMPILE_STATUS)?l:(console.error("[AnkiFX/WebGL] Shader compile error:",i.getShaderInfoLog(l)),i.deleteShader(l),null)}let a=o(i.VERTEX_SHADER,t),s=o(i.FRAGMENT_SHADER,e);if(!a||!s)return a&&i.deleteShader(a),s&&i.deleteShader(s),null;let c=i.createProgram();if(i.attachShader(c,a),i.attachShader(c,s),i.linkProgram(c),i.detachShader(c,a),i.detachShader(c,s),i.deleteShader(a),i.deleteShader(s),!i.getProgramParameter(c,i.LINK_STATUS))return console.error("[AnkiFX/WebGL] Program link error:",i.getProgramInfoLog(c)),i.deleteProgram(c),null;i.useProgram(c);let r=i.createBuffer();i.bindBuffer(i.ARRAY_BUFFER,r),i.bufferData(i.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),i.STATIC_DRAW);let n=i.getAttribLocation(c,"position");return i.enableVertexAttribArray(n),i.vertexAttribPointer(n,2,i.FLOAT,!1,0,0),{program:c,buffer:r}}var Jt=null,Ze,$e,Pt,Qe,Zt=null,Qt=null,be={id:"julia",name:"Julia Set",run:Or,stop:Ur,onResize:(i,t,e)=>{Ze=i,$e=t,Qe&&Pt&&Qe.uniform2f(Pt,i*e,t*e)},preferredTrack:{title:"Acoustica Power Bundle 4",trackTitle:"AiR"},presets:[{name:"Black Hole",cRe:-.8,cIm:.156,zoomDepth:8,targetX:-.086441,targetY:-.239323},{name:"Electric Lightning",cRe:.285,cIm:.013,zoomDepth:6,targetX:-.106662,targetY:.656613},{name:"Golden Dragon",cRe:-.4,cIm:.6,zoomDepth:9,targetX:-.042175,targetY:-.036744},{name:"Filigree",cRe:-.70176,cIm:-.3842,zoomDepth:10.5,targetX:-.096904,targetY:-.656621},{name:"Fractal Storm",cRe:-.7269,cIm:.1889,zoomDepth:10.5,targetX:-.237086,targetY:.547981},{name:"Seahorse Spiral",cRe:-.74543,cIm:.11301,zoomDepth:7.5,targetX:-.529406,targetY:.072863}],marqueeFont:{color:"#FFF",outline:"#000"}},ei=null,ti=null,Kt={x:0,y:0},uo=parseInt(localStorage.getItem("ankifx_julia_preset_index")||"0",10),Ct=be.presets[uo]||be.presets[0],R={presetIndex:uo,cRe:Ct.cRe,cIm:Ct.cIm,zoomDepth:Ct.zoomDepth,targetX:Ct.targetX,targetY:Ct.targetY,speed:parseFloat(localStorage.getItem("ankifx_julia_speed"))||.15};function Or(i,t={}){Qe=i.gl;let e=i.gl,o=i.ctx2d;Ze=i.width,$e=i.height;let a=i.dpr,r=Yt(e,`
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
    `);if(!r)return;let n=r.program;Zt=n,Qt=r.buffer;let d=e.getUniformLocation(n,"u_time"),u=e.getUniformLocation(n,"u_speed");Pt=e.getUniformLocation(n,"u_resolution");let l=e.getUniformLocation(n,"u_c"),h=e.getUniformLocation(n,"u_zoomDepth"),x=e.getUniformLocation(n,"u_target");e.uniform2f(Pt,Ze*a,$e*a);let p=null,f=null,b=Ze<480,v=parseInt(localStorage.getItem("ankifx_julia_preset_index")||"0",10);R.presetIndex=v;let m=be.presets[v]||be.presets[0];R.cRe=t.cRe!==void 0?t.cRe:m.cRe,R.cIm=t.cIm!==void 0?t.cIm:m.cIm,R.zoomDepth=t.zoomDepth!==void 0?t.zoomDepth:m.zoomDepth,R.targetX=t.targetX!==void 0?t.targetX:m.targetX,R.targetY=t.targetY!==void 0?t.targetY:m.targetY;let E={type:"select",id:"julia-preset",label:"PRESET",options:be.presets.map((w,k)=>({value:k,text:(b?"\u{1F4A0} ":"[ Preset: ")+w.name+(b?"":" ]")})),value:R.presetIndex,onChange:w=>{let k=parseInt(w);localStorage.setItem("ankifx_julia_preset_index",k),R.presetIndex=k;let C=be.presets[k];C&&(Object.assign(t,C),R.cRe=C.cRe,R.cIm=C.cIm,R.zoomDepth=C.zoomDepth,R.targetX=C.targetX,R.targetY=C.targetY,t.debug&&(AnkiFX.setControlValue("julia-cRe",C.cRe),AnkiFX.setControlValue("julia-cIm",C.cIm),AnkiFX.setControlValue("julia-zoomDepth",C.zoomDepth),AnkiFX.setControlValue("julia-targetX",C.targetX),AnkiFX.setControlValue("julia-targetY",C.targetY)),be.stop(),i.ctx2d&&i.ctx2d.clearRect(0,0,Ze,$e),AnkiFX.startEffect(t,document.getElementById("ankifx-background"),t.marqueePosition,"julia"))}};if(t.debug?be.controls=[]:be.controls=[E],t.debug){be.controls.push({type:"slider",id:"julia-cRe",label:"C-RE",min:-1.5,max:1,step:.001,value:R.cRe,onChange:g=>{R.cRe=g}},{type:"slider",id:"julia-cIm",label:"C-IM",min:-1,max:1,step:.001,value:R.cIm,onChange:g=>{R.cIm=g}},{type:"slider",id:"julia-zoomDepth",label:"ZOOM",min:2,max:25,step:.1,value:R.zoomDepth,onChange:g=>{R.zoomDepth=g}},{type:"slider",id:"julia-targetX",label:"T-X",min:-2,max:2,step:1e-4,value:R.targetX,onChange:g=>{R.targetX=g}},{type:"slider",id:"julia-targetY",label:"T-Y",min:-2,max:2,step:1e-4,value:R.targetY,onChange:g=>{R.targetY=g}},{type:"slider",id:"julia-speed",label:"SPD",min:.005,max:.3,step:.005,value:R.speed,onChange:g=>{R.speed=g,localStorage.setItem("ankifx_julia_speed",g)}}),be.controls.push(E);let w=document.getElementById("afx-effect-controls-container");w&&(p=document.createElement("div"),p.id="afx-julia-debug-info",p.className="afx-control-row julia-debug-el",p.style.cssText="height: 20px !important; margin-bottom: 2px; pointer-events: none; justify-content: flex-end; opacity: 0.8; font-size: 11px !important; color: #ff00ff; border: none; background: transparent;",p.textContent="HOVER TO SEE TARGET COORDS",w.prepend(p)),f=(g,I,D)=>{let q=D*R.speed/Math.max(R.zoomDepth,1)%2,F=q>1?2-q:q,V=F<.5?4*Math.pow(F,3):1-Math.pow(-2*F+2,3)/2,H=2.2/Math.exp(V*R.zoomDepth),X=V*Math.PI*.5,K=(g-Ze/2)/$e,J=($e/2-I)/$e,L=Math.cos(X),U=Math.sin(X),O=(L*K+U*J)*H,j=(-U*K+L*J)*H;return{tx:R.targetX+O,ty:R.targetY+j}};let k=g=>{if(g.target.closest("#afx-bottom-dock")||g.target.closest(".afx-dialog"))return;let I=performance.now()*.001-y,{tx:D,ty:q}=f(g.clientX,g.clientY,I);R.targetX=D,R.targetY=q,AnkiFX.setControlValue("julia-targetX",D),AnkiFX.setControlValue("julia-targetY",q)};window.addEventListener("mousedown",k),ei=k;let C=g=>{Kt.x=g.clientX,Kt.y=g.clientY};window.addEventListener("mousemove",C),ti=C}let y=performance.now()*.001;function T(){let w=performance.now()*.001-y;if(e.uniform1f(d,w),e.uniform1f(u,R.speed),e.uniform2f(l,R.cRe,R.cIm),e.uniform1f(h,R.zoomDepth),e.uniform2f(x,R.targetX,R.targetY),e.drawArrays(e.TRIANGLE_STRIP,0,4),o.clearRect(0,0,Ze,$e),p&&f){let k=performance.now()*.001-y,{tx:C,ty:g}=f(Kt.x,Kt.y,k);p.textContent=`TARGET X: ${C.toFixed(6)}, Y: ${g.toFixed(6)}`}Jt=requestAnimationFrame(T)}T()}function Ur(){Jt&&(cancelAnimationFrame(Jt),Jt=null),ei&&(window.removeEventListener("mousedown",ei),ei=null),ti&&(window.removeEventListener("mousemove",ti),ti=null),document.querySelectorAll(".julia-debug-el").forEach(i=>i.remove()),Qe&&(Zt&&Qe.deleteProgram(Zt),Qt&&Qe.deleteBuffer(Qt),Zt=null,Qt=null),Qe=null,Pt=null}var Tt=null,ft=0,Xe=0,_=null,Y=null,He=[],ii=0,_t=null,le={x:-1e3,y:-1e3,dx:0,dy:0,down:!1},po=null,mo={id:"lavalamp",name:"Lava Lamp",run:jr,stop:Gr,onResize:$r,marqueeFont:{color:"#ffccaa",shadowColor:"rgba(255, 100, 0, 0.8)",shadowBlur:10}},Oe=6,oi=class{constructor(t,e,o,a){this.pos={x:t,y:e},this.vel={x:0,y:-(Math.random()*.6+.3)},this.radius=o;let s=e/a;this.temperature=.15+s*.3+Math.random()*.15,this.buoyancy=0,this.noiseOffset=Math.random()*1e3,this.smoothSpeedY=0}update(t,e,o){this.pos.y>o*.8?this.temperature+=.05*t:this.pos.y>o*.6?this.temperature+=.02*t:this.pos.y<o*.2?this.temperature-=.04*t:this.pos.y<o*.4&&(this.temperature-=.015*t),this.temperature=Math.max(0,Math.min(1,this.temperature)),this.buoyancy=this.temperature*4-2,this.vel.y-=this.buoyancy*10*t;let a=Math.sin(this.noiseOffset+ii*2e-4)*.1;this.vel.x+=a*t*.3;let s=1-Math.min(Math.abs(this.buoyancy)/.8,1),c=(e*.5-this.pos.x)*.003*s;this.vel.x+=c*t,this.pos.x<this.radius&&(this.vel.x+=(this.radius-this.pos.x)*2*t),this.pos.x>e-this.radius&&(this.vel.x-=(this.pos.x-(e-this.radius))*2*t);let r=-this.radius*.5;this.pos.y<r&&(this.vel.y+=(r-this.pos.y)*8*t);let n=o+this.radius*.5;this.pos.y>n&&(this.vel.y-=(this.pos.y-n)*8*t);let d=Math.pow(.97,t*60);this.vel.x*=d;let l=Math.abs(this.buoyancy)>.8,h=Math.pow(l?.994:.975,t*60);this.vel.y*=h;let x=Math.max(0,(this.pos.y-o*.82)/(o*.18)),p=Math.max(0,(o*.18-this.pos.y)/(o*.18)),f=Math.pow(.88,t*60*(x+p));if(this.vel.x*=f,le.down){let b=this.pos.x-le.x,v=this.pos.y-le.y,m=Math.sqrt(b*b+v*v);if(m<200){let E=(200-m)/200;this.vel.x+=le.dx*E*1.5,this.vel.y+=le.dy*E*8}}this.smoothSpeedY+=(Math.abs(this.vel.y)-this.smoothSpeedY)*(1-Math.pow(.05,t)),this.pos.x+=this.vel.x*t,this.pos.y+=this.vel.y*t}},Br=`
    attribute vec2 aPosition;
    varying vec2 vUv;
    void main() {
        vUv = aPosition * 0.5 + 0.5;
        // Match canvas 2D coordinates (Y=0 is top)
        vUv.y = 1.0 - vUv.y;
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }
`,qr=`
    precision highp float;
    varying vec2 vUv;
    
    uniform vec2 uResolution;
    uniform float uTime;
    
    uniform vec4 uBlobs[${Oe}]; // x, y, radius, stretch
    uniform float uBlobTemp[${Oe}]; // temperature
    
    // Polynomial smooth minimum
    float smin(float a, float b, float k) {
        float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
        return mix(b, a, h) - k * h * (1.0 - h);
    }
    
    float map(vec2 p) {
        float d = 10000.0;
        for (int i = 0; i < ${Oe}; i++) {
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
`;function ho(i,t){let e=_.createShader(i);return _.shaderSource(e,t),_.compileShader(e),_.getShaderParameter(e,_.COMPILE_STATUS)?e:(console.error("[LavaLamp/WebGL] Shader compile error:",_.getShaderInfoLog(e)),_.deleteShader(e),null)}function Nr(){let i=ho(_.VERTEX_SHADER,Br),t=ho(_.FRAGMENT_SHADER,qr);if(Y=_.createProgram(),_.attachShader(Y,i),_.attachShader(Y,t),_.linkProgram(Y),!_.getProgramParameter(Y,_.LINK_STATUS))return console.error("[LavaLamp/WebGL] Program link error:",_.getProgramInfoLog(Y)),_.deleteShader(i),_.deleteShader(t),!1;_.detachShader(Y,i),_.detachShader(Y,t),_.deleteShader(i),_.deleteShader(t),_.useProgram(Y),_t=_.createBuffer(),_.bindBuffer(_.ARRAY_BUFFER,_t);let e=new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]);_.bufferData(_.ARRAY_BUFFER,e,_.STATIC_DRAW);let o=_.getAttribLocation(Y,"aPosition");return _.enableVertexAttribArray(o),_.vertexAttribPointer(o,2,_.FLOAT,!1,0,0),Y.uResolution=_.getUniformLocation(Y,"uResolution"),Y.uTime=_.getUniformLocation(Y,"uTime"),Y.uBlobs=_.getUniformLocation(Y,"uBlobs"),Y.uBlobTemp=_.getUniformLocation(Y,"uBlobTemp"),!0}function jr(i,t){if(_=i.gl,po=i.canvasGL,ft=i.width,Xe=i.height,!_){console.error("[LavaLamp] WebGL context required \u2014 cannot run effect.");return}if(!Nr())return;He=[];let e=0;for(;He.length<Oe&&e<200;){e++;let o=70+Math.random()*60,a=o+Math.random()*(ft-o*2),s=o+Math.random()*(Xe-o*2),c=!1;for(let r of He){let n=r.pos.x-a,d=r.pos.y-s;if(Math.sqrt(n*n+d*d)<r.radius+o+10){c=!0;break}}c||He.push(new oi(a,s,o,Xe))}for(;He.length<Oe;){let o=70+Math.random()*60,a=o+Math.random()*(ft-o*2),s=o+Math.random()*(Xe-o*2);He.push(new oi(a,s,o,Xe))}ii=performance.now(),Hr(),Tt=requestAnimationFrame(go)}function $r(i,t,e){ft=i,Xe=t,_&&_.viewport(0,0,i*e,t*e)}function go(i){let t=Math.min((i-ii)/1e3,.05);ii=i;let e=new Float32Array(Oe*4),o=new Float32Array(Oe);for(let a=0;a<Oe;a++)He[a].update(t,ft,Xe);for(let a=0;a<Oe;a++){let s=He[a],c=Math.max(.85,1+Math.min(s.smoothSpeedY*.028,.7)*(.4+s.temperature*.6));e[a*4+0]=s.pos.x,e[a*4+1]=s.pos.y,e[a*4+2]=s.radius,e[a*4+3]=c,o[a]=s.temperature}_.useProgram(Y),_.uniform2f(Y.uResolution,ft,Xe),_.uniform1f(Y.uTime,i*.001),_.uniform4fv(Y.uBlobs,e),_.uniform1fv(Y.uBlobTemp,o),_.drawArrays(_.TRIANGLES,0,6),le.dx=0,le.dy=0,Tt=requestAnimationFrame(go)}function Ft(i){let t=po.getBoundingClientRect(),e=i.touches?i.touches[0]:i,o=e.clientX-t.left,a=e.clientY-t.top;if(le.down&&i.type!=="mousedown"&&i.type!=="touchstart"){let s=o-le.x,c=a-le.y;Math.abs(s)<150&&Math.abs(c)<150&&(le.dx=s,le.dy=c)}le.x=o,le.y=a}function ri(i){le.dx=0,le.dy=0,le.down=!0,Ft(i)}function ai(){le.down=!1}function Hr(){window.addEventListener("mousedown",ri),window.addEventListener("mousemove",Ft),window.addEventListener("mouseup",ai),window.addEventListener("touchstart",ri,{passive:!0}),window.addEventListener("touchmove",Ft,{passive:!0}),window.addEventListener("touchend",ai)}function Xr(){window.removeEventListener("mousedown",ri),window.removeEventListener("mousemove",Ft),window.removeEventListener("mouseup",ai),window.removeEventListener("touchstart",ri),window.removeEventListener("touchmove",Ft),window.removeEventListener("touchend",ai)}function Gr(){Tt&&(cancelAnimationFrame(Tt),Tt=null),Xr(),_&&(_.clearColor(0,0,0,0),_.clear(_.COLOR_BUFFER_BIT),Y&&_.deleteProgram(Y),_t&&_.deleteBuffer(_t),Y=null,_t=null)}var si=null,Mt,et,Lt,tt,li=null,ci=null,di={id:"mandelbrot",name:"Mandelbrot",run:Vr,stop:Wr,onResize:(i,t,e)=>{Mt=i,et=t,tt&&Lt&&tt.uniform2f(Lt,i*e,t*e)},preferredTrack:{title:"Acoustica Power Bundle 4",trackTitle:"AiR"},marqueeFont:{color:"#FFF",outline:"#000"}},fi=null,ui=null,ni={x:0,y:0},ne={targetX:-.743643887037151,targetY:.13182590420533,zoomDepth:11,speed:parseFloat(localStorage.getItem("ankifx_mandelbrot_speed"))||.15};function Vr(i,t={}){tt=i.gl;let e=i.gl,o=i.ctx2d;Mt=i.width,et=i.height;let a=i.dpr,r=Yt(e,`
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
    `);if(!r)return;let n=r.program;li=n,ci=r.buffer;let d=e.getUniformLocation(n,"u_time"),u=e.getUniformLocation(n,"u_speed"),l=e.getUniformLocation(n,"u_zoomDepth"),h=e.getUniformLocation(n,"u_target");Lt=e.getUniformLocation(n,"u_resolution"),e.uniform2f(Lt,Mt*a,et*a);let x=null,p=null;if(t.debug){di.controls=[{type:"slider",id:"mandelbrot-zoomDepth",label:"ZOOM",min:2,max:25,step:.1,value:ne.zoomDepth,onChange:y=>{ne.zoomDepth=y}},{type:"slider",id:"mandelbrot-targetX",label:"T-X",min:-2.5,max:1,step:1e-4,value:ne.targetX,onChange:y=>{ne.targetX=y}},{type:"slider",id:"mandelbrot-targetY",label:"T-Y",min:-1.5,max:1.5,step:1e-4,value:ne.targetY,onChange:y=>{ne.targetY=y}},{type:"slider",id:"mandelbrot-speed",label:"SPD",min:.005,max:.3,step:.005,value:ne.speed,onChange:y=>{ne.speed=y,localStorage.setItem("ankifx_mandelbrot_speed",y)}}];let v=document.getElementById("afx-effect-controls-container");v&&(x=document.createElement("div"),x.id="afx-mandelbrot-debug-info",x.className="afx-control-row mandelbrot-debug-el",x.style.cssText="height: 20px !important; margin-bottom: 2px; pointer-events: none; justify-content: flex-end; opacity: 0.8; font-size: 11px !important; color: #ff00ff; border: none; background: transparent;",x.textContent="HOVER TO SEE TARGET COORDS",v.prepend(x)),p=(y,T,w)=>{let k=w*ne.speed/Math.max(ne.zoomDepth,1)%2,C=k>1?2-k:k,g=C<.5?4*Math.pow(C,3):1-Math.pow(-2*C+2,3)/2,I=Math.exp(g*ne.zoomDepth),D=(y-Mt/2)/et,q=(et/2-T)/et;return{tx:ne.targetX+D*(2.5/I),ty:ne.targetY+q*(2.5/I)}};let m=y=>{if(y.target.closest("#afx-bottom-dock")||y.target.closest(".afx-dialog"))return;let T=performance.now()*.001-f,{tx:w,ty:k}=p(y.clientX,y.clientY,T);ne.targetX=w,ne.targetY=k,AnkiFX.setControlValue("mandelbrot-targetX",w),AnkiFX.setControlValue("mandelbrot-targetY",k)};window.addEventListener("mousedown",m),fi=m;let E=y=>{ni.x=y.clientX,ni.y=y.clientY};window.addEventListener("mousemove",E),ui=E}else di.controls=[];let f=performance.now()*.001;function b(){let v=performance.now()*.001-f;if(e.uniform1f(d,v),e.uniform1f(u,ne.speed),e.uniform1f(l,ne.zoomDepth),e.uniform2f(h,ne.targetX,ne.targetY),e.drawArrays(e.TRIANGLE_STRIP,0,4),o.clearRect(0,0,Mt,et),x&&p){let m=performance.now()*.001-f,{tx:E,ty:y}=p(ni.x,ni.y,m);x.textContent=`TARGET X: ${E.toFixed(6)}, Y: ${y.toFixed(6)}`}si=requestAnimationFrame(b)}b()}function Wr(){si&&(cancelAnimationFrame(si),si=null),fi&&(window.removeEventListener("mousedown",fi),fi=null),ui&&(window.removeEventListener("mousemove",ui),ui=null),document.querySelectorAll(".mandelbrot-debug-el").forEach(i=>i.remove()),tt&&(li&&tt.deleteProgram(li),ci&&tt.deleteBuffer(ci),li=null,ci=null),tt=null,Lt=null}var At=null,mi,hi,pi=16,Ge=[];function xo(){let i=Math.floor(mi/pi);Ge=[];for(let t=0;t<i;t++)Ge[t]=Math.random()*-100}var bo={id:"matrix",name:"Matrix",run:Yr,stop:Kr,onResize:(i,t)=>{mi=i,hi=t,xo()},preferredTrack:{trackTitle:"nightfall"},marqueeFont:{color:"#0F0",shadowColor:"#0F0",shadowBlur:10}};function Yr(i,t){let e=i.ctx2d;mi=i.width,hi=i.height,xo();let o="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*]*";function a(){e.fillStyle="rgba(0, 0, 0, 0.1)",e.fillRect(0,0,mi,hi),e.fillStyle="#0F0",e.font=pi+"px monospace";for(let s=0;s<Ge.length;s++)if(Ge[s]>0||Math.random()>.95){let c=o.charAt(Math.floor(Math.random()*o.length)),r=Ge[s]*pi;e.fillText(c,s*pi,r),r>hi&&Math.random()>.975&&(Ge[s]=0),Ge[s]++}else Ge[s]+=.5;At=requestAnimationFrame(a)}At=requestAnimationFrame(a)}function Kr(){At&&(cancelAnimationFrame(At),At=null)}var vo={id:"none",name:"None",run:Jr,stop:Zr,marqueeFont:{color:"#ffffff",shadowColor:"rgba(0,0,0,0.8)",shadowBlur:5}};function Jr(i,t){i.ctx2d.clearRect(0,0,i.width,i.height)}function Zr(){}var It=null,ce,De,yo={id:"starfield",name:"Starfield",run:Qr,stop:ea,onResize:(i,t)=>{ce=i,De=t},preferredTrack:{trackTitle:"star wars title"},marqueeFont:{color:"#FFE81F",shadowColor:"#FFE81F",shadowBlur:20,outline:"#000"}};function Qr(i,t){let e=i.ctx2d;ce=i.width,De=i.height;let o=[],a=8e3,s=new Uint8Array(512),c=new Uint8Array(256).map(()=>Math.random()*256);for(let v=0;v<512;v++)s[v]=c[v&255];let r=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]];function n(v,m,E,y){return v[0]*m+v[1]*E+v[2]*y}function d(v,m,E){let y,T,w,k,C=.3333333333333333,g=1/6,I=(v+m+E)*C,D=Math.floor(v+I),q=Math.floor(m+I),F=Math.floor(E+I),V=(D+q+F)*g,M=v-D+V,H=m-q+V,X=E-F+V,K,J,L,U,O,j;M>=H?H>=X?(K=1,J=0,L=0,U=1,O=1,j=0):M>=X?(K=1,J=0,L=0,U=1,O=0,j=1):(K=0,J=0,L=1,U=1,O=0,j=1):H<X?(K=0,J=0,L=1,U=0,O=1,j=1):M<X?(K=0,J=1,L=0,U=0,O=1,j=1):(K=0,J=1,L=0,U=1,O=1,j=0);let se=M-K+g,pe=H-J+g,me=X-L+g,Be=M-U+2*g,qe=H-O+2*g,Re=X-j+2*g,_e=M-1+3*g,P=H-1+3*g,A=X-1+3*g,$=D&255,z=q&255,Z=F&255,fe=.6-M*M-H*H-X*X;fe<0?y=0:(fe*=fe,y=fe*fe*n(r[s[$+s[z+s[Z]]]%12],M,H,X));let ge=.6-se*se-pe*pe-me*me;ge<0?T=0:(ge*=ge,T=ge*ge*n(r[s[$+K+s[z+J+s[Z+L]]]%12],se,pe,me));let ve=.6-Be*Be-qe*qe-Re*Re;ve<0?w=0:(ve*=ve,w=ve*ve*n(r[s[$+U+s[z+O+s[Z+j]]]%12],Be,qe,Re));let ye=.6-_e*_e-P*P-A*A;return ye<0?k=0:(ye*=ye,k=ye*ye*n(r[s[$+1+s[z+1+s[Z+1]]]%12],_e,P,A)),32*(y+T+w+k)}function u(v,m,E,y=3){let T=0,w=.5;for(let k=0;k<y;k++)T+=d(v,m,E)*w,v*=2,m*=2,E*=2,w*=.5;return T}let l={};class h{constructor(){this.active=!1,this.nextSpawn=Date.now()+2e3}reset(){let m=Math.random()*Math.PI*2,E=.2+Math.random()*.4;this.x=Math.cos(m)*ce*E,this.y=Math.sin(m)*De*E,this.z=ce,this.sizeBase=80+Math.random()*120,this.speed=.8,this.active=!0,this.type=1+Math.floor(Math.random()*2);let y=[{name:"ice",baseH:190+Math.random()*40,sat:60,l:70},{name:"inferno",baseH:Math.random()*40,sat:80,l:60},{name:"toxic",baseH:80+Math.random()*40,sat:70,l:60},{name:"ethereal",baseH:260+Math.random()*40,sat:60,l:75},{name:"classic",baseH:30+Math.random()*20,sat:50,l:80}],T=y[Math.floor(Math.random()*y.length)];l[T.name]?this.textureCanvas=l[T.name]:(this.generateGasGiantTexture(T),l[T.name]=this.textureCanvas),this.type===2&&(this.rings=Array.from({length:4},(w,k)=>({r1:1.6+k*.2,opacity:.2+Math.random()*.4})))}hslToRgb(m,E,y){m/=360,E/=100,y/=100;let T,w,k;if(E===0)T=w=k=y;else{let C=y<.5?y*(1+E):y+E-y*E,g=2*y-C,I=D=>(D<0&&(D+=1),D>1&&(D-=1),D<1/6?g+(C-g)*6*D:D<1/2?C:D<2/3?g+(C-g)*(2/3-D)*6:g);T=I(m+1/3),w=I(m),k=I(m-1/3)}return{r:T*255,g:w*255,b:k*255}}generateGasGiantTexture(m){let E=document.createElement("canvas");E.width=E.height=128;let y=E.getContext("2d"),T=y.createImageData(128,128),w=m.baseH,k=this.hslToRgb(w,m.sat,m.l),C=this.hslToRgb((w+20)%360,m.sat+10,m.l-10),g=this.hslToRgb((w-40+360)%360,m.sat+20,m.l-15),I=this.hslToRgb((w+60)%360,m.sat-20,m.l+10),D=(F,V,M)=>({r:F.r+(V.r-F.r)*M,g:F.g+(V.g-F.g)*M,b:F.b+(V.b-F.b)*M}),q=Math.random()*1e3;for(let F=0;F<128;F++)for(let V=0;V<128;V++){let M=F/128*10,H=V/128*10,X=Math.abs(u(0,M*.4,q,3)),K=M+u(H*.5,M*.5,q)*X*4,J=H+u(M*.5,H*.5,q+50)*X*2,L=(u(0,K*.8,q+100,4)+1)/2,U=(u(J*.1,K*1.5,q+200,2)+1)/2,O=D(C,k,L);L>.7&&(O=D(O,I,(L-.7)*2)),U>.6&&(O=D(O,g,(U-.6)*1.5));let j=1+u(J,K,q+300,2)*.2,se=(F*128+V)*4;T.data[se]=Math.min(255,O.r*j),T.data[se+1]=Math.min(255,O.g*j),T.data[se+2]=Math.min(255,O.b*j),T.data[se+3]=255}y.putImageData(T,0,0),this.textureCanvas=E}update(){if(!this.active){Date.now()>this.nextSpawn&&this.reset();return}this.z-=this.speed,this.z<=0&&(this.active=!1,this.nextSpawn=Date.now())}draw(m){if(!this.active)return;let E=ce/2/this.z,y=this.x*E+ce/2,T=this.y*E+De/2,w=(1-this.z/ce)*this.sizeBase;if(y<-w*3||y>ce+w*3||T<-w*3||T>De+w*3)return;m.save(),m.translate(y,T),this.type===2&&(this.drawRings(m,w,!0),m.globalAlpha=1);let k=m.createRadialGradient(0,0,w*.9,0,0,w*1.5);k.addColorStop(0,"rgba(255, 255, 255, 0.15)"),k.addColorStop(1,"rgba(0,0,0,0)"),m.fillStyle=k,m.beginPath(),m.arc(0,0,w*1.5,0,Math.PI*2),m.fill(),m.save(),m.beginPath(),m.arc(0,0,w,0,Math.PI*2),m.clip(),m.globalAlpha=1,m.drawImage(this.textureCanvas,-w,-w,w*2,w*2);let C=m.createRadialGradient(-w*.5,-w*.5,w*.1,0,0,w);C.addColorStop(0,"rgba(255, 255, 255, 0.25)"),C.addColorStop(.5,"rgba(0, 0, 0, 0)"),C.addColorStop(1,"rgba(0, 0, 0, 0.4)"),m.fillStyle=C,m.fillRect(-w,-w,w*2,w*2),m.restore();let g=m.createRadialGradient(0,0,w*.7,0,0,w);g.addColorStop(1,"rgba(255,255,255,0.4)"),g.addColorStop(.8,"rgba(255,255,255,0)"),m.fillStyle=g,m.beginPath(),m.arc(0,0,w,0,Math.PI*2),m.fill(),this.type===2&&(this.drawRings(m,w,!1),m.globalAlpha=1),m.restore()}drawRings(m,E,y){m.save();let T=Math.PI/8;for(let w of this.rings)m.globalAlpha=w.opacity,m.strokeStyle="#E6E6FA",m.lineWidth=E*.15,m.beginPath(),m.ellipse(0,0,w.r1*E,w.r1*.3*E,T,0,Math.PI*2),m.stroke();m.restore()}}let x=new h,p=["#FFFFFF","#FFE4B5","#E0FFFF","#FFF0F5","#F0F8FF"];for(let v=0;v<a;v++)o.push({x:(Math.random()-.5)*ce*4,y:(Math.random()-.5)*De*4,z:Math.random()*ce,color:p[Math.floor(Math.random()*p.length)],sizeBase:2+Math.random()*2.5});let f=0;function b(){e.fillStyle="rgba(5, 5, 12, 1)",e.fillRect(0,0,ce,De);let v=ce/2,m=De/2;f+=.01,x.update(),x.draw(e);for(let E=0;E<a;E++){let y=o[E],T=y.z;if(y.z-=4,y.z<=0){y.x=(Math.random()-.5)*ce*4,y.y=(Math.random()-.5)*De*4,y.z=ce;continue}let w=ce/2/y.z,k=y.x*w+v,C=y.y*w+m;if(k>=0&&k<=ce&&C>=0&&C<=De){let g=1-y.z/ce,I=g*y.sizeBase;if(g<.3){e.globalAlpha=g*2,e.fillStyle=y.color,e.fillRect(k,C,Math.max(1,I),Math.max(1,I));continue}e.globalAlpha=g,e.fillStyle=y.color,e.strokeStyle=y.color;let D=ce/2/T,q=y.x*D+v,F=y.y*D+m;e.lineWidth=I,e.beginPath(),e.moveTo(q,F),e.lineTo(k,C),e.stroke(),e.beginPath(),e.arc(k,C,I/2,0,Math.PI*2),e.fill(),g>.8&&(e.globalAlpha=(g-.8)*3,e.beginPath(),e.arc(k,C,I*2.5,0,Math.PI*2),e.fill())}}e.globalAlpha=1,It=requestAnimationFrame(b)}It=requestAnimationFrame(b)}function ea(){It&&(cancelAnimationFrame(It),It=null)}var Dt=null,it,zt,gi=0,xi=0,Pe=null;function ko(){if(it===void 0||zt===void 0)return;let i=Math.max(100,xi),t=Math.max(14,Math.floor(it/25)),e=Math.floor(it/t),o=Math.floor(i/t);Pe=new ji(e,o,t)}var So={id:"tetris",name:"Tetris",run:ta,stop:ia,onResize:(i,t)=>{it=i,zt=t;let e=document.documentElement,o=e?getComputedStyle(e):null;gi=o&&parseInt(o.getPropertyValue("--io-header"))||0,xi=t-gi,ko()},preferredTrack:{title:"WinTask 3",trackTitle:"Whoopees Tetris"},marqueeFont:{color:"#f0f0f0",shadowColor:"#a000f0",shadowBlur:12,outline:"#000"}},Eo={I:{shapes:[[[1,1,1,1]],[[1],[1],[1],[1]]],color:"#00f0f0"},O:{shapes:[[[1,1],[1,1]]],color:"#f0f000"},T:{shapes:[[[0,1,0],[1,1,1]],[[1,0],[1,1],[1,0]],[[1,1,1],[0,1,0]],[[0,1],[1,1],[0,1]]],color:"#a000f0"},S:{shapes:[[[0,1,1],[1,1,0]],[[1,0],[1,1],[0,1]]],color:"#00f000"},Z:{shapes:[[[1,1,0],[0,1,1]],[[0,1],[1,1],[1,0]]],color:"#f00000"},J:{shapes:[[[1,0,0],[1,1,1]],[[1,1],[1,0],[1,0]],[[1,1,1],[0,0,1]],[[0,1],[0,1],[1,1]]],color:"#0000f0"},L:{shapes:[[[0,0,1],[1,1,1]],[[1,0],[1,0],[1,1]],[[1,1,1],[1,0,0]],[[1,1],[0,1],[0,1]]],color:"#f0a000"}},wo=Object.keys(Eo),Ni=class{constructor(t,e,o){this.x=t,this.y=e,this.color=o,this.vx=(Math.random()-.5)*12,this.vy=(Math.random()-.7)*14,this.gravity=.45,this.life=1,this.decay=.012+Math.random()*.018,this.size=1+Math.random()*2.5}update(){this.vx*=.985,this.vy+=this.gravity,this.x+=this.vx,this.y+=this.vy,this.life-=this.decay}draw(t){t.globalAlpha=Math.max(0,this.life),t.fillStyle=this.color,t.fillRect(this.x,this.y,this.size,this.size)}},ji=class{constructor(t,e,o){this.cols=t,this.rows=e,this.cellSize=o,this.board=Array.from({length:e},()=>Array(t).fill(null)),this.particles=[],this.exploding=!1,this.explodeTimer=0,this.EXPLODE_DURATION=120,this.level=1,this.linesTotal=0,this.dropCounter=0,this.moveCounter=0,this._spawnPiece()}_randomPiece(){let t=wo[Math.floor(Math.random()*wo.length)],e=Eo[t],o=Math.floor(Math.random()*e.shapes.length);return{shape:e.shapes[o],color:e.color,key:t,rotIdx:o,def:e}}_spawnPiece(){let t=this._randomPiece();this.current={...t,x:Math.floor((this.cols-t.shape[0].length)/2),y:0},this._selectTarget()}_fits(t,e,o){for(let a=0;a<t.length;a++)for(let s=0;s<t[a].length;s++){if(!t[a][s])continue;let c=e+s,r=o+a;if(c<0||c>=this.cols||r>=this.rows||r>=0&&this.board[r][c]!==null)return!1}return!0}_lock(){let{shape:t,x:e,y:o,color:a}=this.current;for(let s=0;s<t.length;s++)for(let c=0;c<t[s].length;c++){if(!t[s][c])continue;let r=o+s,n=e+c;r>=0&&r<this.rows&&n>=0&&n<this.cols&&(this.board[r][n]=a)}this._clearRows()}_clearRows(){let t=0;for(let e=this.rows-1;e>=0;e--)this.board[e].every(o=>o!==null)&&(this.board.splice(e,1),this.board.unshift(Array(this.cols).fill(null)),t++,e++);return t>0&&(this.linesTotal+=t,this.level=Math.floor(this.linesTotal/10)+1),t}_choosePlacement(){let{def:t}=this.current,e=-1/0,o=this.current.x,a=this.current.rotIdx;for(let s=0;s<t.shapes.length;s++){let c=t.shapes[s],r=c[0].length;for(let n=0;n<=this.cols-r;n++){let d=0;for(;this._fits(c,n,d+1);)d++;if(!this._fits(c,n,d))continue;let u=this._getHeuristicScore(c,n,d);u>e&&(e=u,o=n,a=s)}}return{x:o,rotIdx:a}}_getHeuristicScore(t,e,o){let a=this.board.map(u=>[...u]);for(let u=0;u<t.length;u++)for(let l=0;l<t[u].length;l++){if(!t[u][l])continue;let h=o+u,x=e+l;h>=0&&h<this.rows&&(a[h][x]="X")}let s=0;for(let u=0;u<this.rows;u++)a[u].every(l=>l!==null)&&s++;let c=Array(this.cols).fill(0),r=0;for(let u=0;u<this.cols;u++)for(let l=0;l<this.rows;l++)if(a[l][u]!==null){c[u]=this.rows-l,r+=c[u];break}let n=0;for(let u=0;u<this.cols;u++){let l=!1;for(let h=0;h<this.rows;h++)a[h][u]!==null?l=!0:l&&n++}let d=0;for(let u=0;u<this.cols-1;u++)d+=Math.abs(c[u]-c[u+1]);return r*-.51+s*.76+n*-.35+d*-.18+Math.random()*.1}_isBoardFull(){for(let t=0;t<3;t++)if(this.board[t].some(e=>e!==null))return!0;return!1}_explodeBoard(t,e){for(let o=0;o<this.rows;o++)for(let a=0;a<this.cols;a++)if(this.board[o][a]){let s=t+a*this.cellSize+this.cellSize/2,c=e+o*this.cellSize+this.cellSize/2,r=4+Math.floor(Math.random()*4);for(let n=0;n<r;n++)this.particles.push(new Ni(s,c,this.board[o][a]))}}_reset(){this.board=Array.from({length:this.rows},()=>Array(this.cols).fill(null)),this.exploding=!1,this.explodeTimer=0,this.particles=[],this._spawnPiece()}_selectTarget(){let{x:t,rotIdx:e}=this._choosePlacement(),o=this.current.def;this.current.rotIdx=e,this.current.shape=o.shapes[e],this.current.targetX=t,this.current.y=0,this.current.x=Math.floor((this.cols-this.current.shape[0].length)/2)}step(t,e){if(this.exploding){this.explodeTimer++,this.particles=this.particles.filter(s=>s.life>0),this.particles.forEach(s=>s.update()),this.explodeTimer>=this.EXPLODE_DURATION&&this._reset();return}this.moveCounter++,this.moveCounter>=2&&(this.moveCounter=0,this.current.x<this.current.targetX?this._fits(this.current.shape,this.current.x+1,this.current.y)&&this.current.x++:this.current.x>this.current.targetX&&this._fits(this.current.shape,this.current.x-1,this.current.y)&&this.current.x--);let o=this.current.x===this.current.targetX,a=Math.max(4,40-(this.level-1)*3);o&&(a=1),this.dropCounter++,this.dropCounter>=a&&(this.dropCounter=0,this._fits(this.current.shape,this.current.x,this.current.y+1)?this.current.y++:(this._lock(),this._isBoardFull()?(this._explodeBoard(t,e),this.exploding=!0,this.explodeTimer=0):this._spawnPiece()))}draw(t,e,o){let a=this.cellSize,s={};for(let c=0;c<this.rows;c++)for(let r=0;r<this.cols;r++){let n=this.board[c][r];n&&(s[n]||(s[n]=[]),s[n].push({px:e+r*a,py:o+c*a,alpha:this.exploding?Math.max(0,1-this.explodeTimer/40):1}))}if(!this.exploding&&this.current){let{shape:c,x:r,y:n,color:d}=this.current;if(d){s[d]||(s[d]=[]);for(let u=0;u<c.length;u++)for(let l=0;l<c[u].length;l++)c[u][l]&&s[d].push({px:e+(r+l)*a,py:o+(n+u)*a,alpha:1})}}for(let c in s){let r=s[c];t.fillStyle=c,r.forEach(n=>{t.globalAlpha=n.alpha,t.fillRect(n.px+1,n.py+1,a-2,a-2)})}t.globalAlpha=1,t.strokeStyle="rgba(255, 255, 255, 0.35)",t.lineWidth=1.5,t.beginPath();for(let c in s)s[c].forEach(r=>{t.globalAlpha=r.alpha;let n=r.px,d=r.py;t.moveTo(n+1,d+a-2),t.lineTo(n+1,d+1),t.lineTo(n+a-2,d+1)});t.stroke(),t.strokeStyle="rgba(0, 0, 0, 0.45)",t.beginPath();for(let c in s)s[c].forEach(r=>{t.globalAlpha=r.alpha;let n=r.px,d=r.py;t.moveTo(n+1,d+a-1),t.lineTo(n+a-1,d+a-1),t.lineTo(n+a-1,d+1)});t.stroke(),t.globalAlpha=1,t.save(),this.particles.forEach(c=>c.draw(t)),t.restore(),t.globalAlpha=1}};function ta(i,t){let e=i.ctx2d;it=i.width,zt=i.height,gi=i.topInset||0,xi=i.visibleHeight||zt,ko();function o(){if(e.fillStyle="rgba(8, 6, 18, 0.92)",e.fillRect(0,0,it,zt),e.strokeStyle="rgba(255,255,255,0.04)",e.lineWidth=.5,Pe){let a=Pe.cellSize,s=Math.floor((it-Pe.cols*a)/2),c=gi+(xi-Pe.rows*a);e.beginPath();for(let r=0;r<=Pe.cols;r++)e.moveTo(s+r*a,c),e.lineTo(s+r*a,c+Pe.rows*a);for(let r=0;r<=Pe.rows;r++)e.moveTo(s,c+r*a),e.lineTo(s+Pe.cols*a,c+r*a);e.stroke(),Pe.step(s,c),Pe.draw(e,s,c)}Dt=requestAnimationFrame(o)}Dt=requestAnimationFrame(o)}function ia(){Dt&&(cancelAnimationFrame(Dt),Dt=null)}var oe={aurora:io,debug:no,ecg:Ce,fire:so,geometry:lo,gradient:qi,julia:be,lavalamp:mo,mandelbrot:di,matrix:bo,none:vo,starfield:yo,tetris:So};var bi=class{constructor(t="",e="bottom",o={}){this.text=t,this.position=e,this.applyStyles(o),this.time=0,this.textX=0,this.initialized=!1,this.baseCharWidth=15,this.baseFontSize=24,this.baseVelocity=2.8,this.baseBounce=12,this.fontFamily='"Courier New", monospace',this.fontWeight="bold",this.enabled=!0}applyStyles(t={}){this.color=t.color||"#FFF",this.outline=t.outline||null,this.shadowColor=t.shadowColor||null,this.shadowBlur=t.shadowBlur||0,this.colorFn=t.colorFn||null}updateStyles(t={}){this.applyStyles(t)}setText(t){this.text=t}setPosition(t){this.position=t}render(t,e,o){if(!this.enabled)return;this.initialized||(this.textX=e,this.initialized=!0);let a=e<480?.65:e<768?.8:1,s=Math.max(12,Math.floor(this.baseFontSize*a)),c=this.baseBounce*a,r=this.baseCharWidth*a,n=this.baseVelocity*a;if(this.time+=.012,!this.text)return;let d=this.text.length*r;this.textX-=n,this.textX<-(d+e*1.1)&&(this.textX=e),t.font=`${this.fontWeight} ${s}px ${this.fontFamily}`,t.lineJoin="round",this.outline&&(t.lineWidth=4,t.strokeStyle=this.outline);let u=this.shadowColor&&this.shadowColor!=="inherit";u?(t.shadowColor=this.shadowColor,t.shadowBlur=this.shadowBlur):this.shadowColor||(t.shadowBlur=0);let l=50*a,h=32*a,x=this.position==="bottom"?o-h:l;for(let p=0;p<this.text.length;p++){let f=this.text[p],b=this.textX+p*r;if(b>-40&&b<e+40){let v=x+Math.sin(this.time*4+p*.1)*c;t.fillStyle=this.colorFn?this.colorFn(this.time,p):this.color,this.shadowColor==="inherit"&&(t.shadowColor=t.fillStyle,t.shadowBlur=this.shadowBlur),this.outline&&t.strokeText(f,b,v),t.fillText(f,b,v),this.shadowColor==="inherit"&&(t.shadowBlur=0)}}u&&(t.shadowBlur=0)}};var Co=`:root {
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
}`;function Po(){return/iPad|iPhone|iPod/.test(navigator.userAgent)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1}function $i(){return Math.min(window.devicePixelRatio||1,1.5)}function vi(){return Math.min(window.devicePixelRatio||1,2)}function yi(i,t){let e=$i();return i==="mandelbrot"||i==="julia"?e:t}function ze(){let i=document.documentElement,t=i?getComputedStyle(i):null;return{ioHeader:t&&parseInt(t.getPropertyValue("--io-header"))||0,topInset:t&&parseInt(t.getPropertyValue("--top-inset"))||0,bottomInset:t&&parseInt(t.getPropertyValue("--bottom-inset"))||0}}function ut(){return localStorage.getItem("ankifx_marquee_enabled")!=="false"}function Rt(){return(window.innerWidth||document.documentElement.clientWidth||800)<480}var ra={deckTitle:"AnkiFX Deck",deckAuthor:"Anonymous",termsText:null,sources:[],marquee:"ANKIFX ENGINE INITIALIZED ...",defaultEffect:"geometry",debug:!1,countdown:30,marqueePosition:"top"};function To(i={}){let t={...ra,...window.AnkiFX_Config||{},...i};Array.isArray(t.sources)||(t.sources=[]);let e=parseInt(t.countdown,10);return t.countdown=isNaN(e)?30:Math.max(0,e),t.isConfigFileError=t.termsText!==void 0&&t.termsText!==null&&(typeof t.termsText!="string"||typeof t.termsText=="string"&&t.termsText.trim()===""||t.termsText==="No terms provided."),t}function _o(i){let t=window.AnkiFX_Config?.defaultEffect,e;return t?(e=t,localStorage.setItem("ankifx_preferred_effect",e)):e=localStorage.getItem("ankifx_preferred_effect")||i.defaultEffect||"geometry",oe[e]||(console.warn(`[AnkiFX] Unknown effect "${e}" \u2014 falling back to "${i.defaultEffect||"geometry"}".`),e=i.defaultEffect||"geometry",oe[e]||(e=Object.keys(oe)[0]||"geometry"),localStorage.setItem("ankifx_preferred_effect",e)),e}function Fo(i,t){let e=document.getElementById("ankifx-overlay");if(!e||!e.classList.contains("afx-agreed-state"))return!1;i.sharedGL||(i.sharedGL=document.getElementById("afx-shared-gl")),i.shared2D||(i.shared2D=document.getElementById("afx-shared-2d")),i.sharedMarquee||(i.sharedMarquee=document.getElementById("afx-shared-marquee")),i.sharedGL&&!i.glContext&&(i.glContext=i.sharedGL.getContext("webgl",{alpha:!1,antialias:!1})),i.shared2D&&!i.ctx2D&&(i.ctx2D=i.shared2D.getContext("2d")),i.sharedMarquee&&!i.ctxMarquee&&(i.ctxMarquee=i.sharedMarquee.getContext("2d"));let o=document.getElementById("ankifx-background");if(o){let s=o.getBoundingClientRect();i.width=s.width;let c=ze();i.height=document.documentElement.clientHeight+c.ioHeader,i.dpr=vi()}if(!i.currentEffectId){let s=Array.from(document.documentElement.classList).find(c=>c.startsWith("afx-effect-"));s&&(i.currentEffectId=s.replace("afx-effect-",""))}i.defaultMarqueeText=t.marquee,i.marquee&&(i.marquee.setText(t.marquee),i.marquee.setPosition(t.marqueePosition));let a=document.getElementById("afx-deck-title");return a&&(a.textContent=t.deckTitle),!0}function Ot(i){let t=document.getElementById("afx-effect-controls-container");t&&(t.innerHTML="",!(!i||!i.controls||i.controls.length===0)&&i.controls.forEach(e=>{let o=document.createElement("div");if(o.className="afx-control-row",o.id=`afx-control-container-${e.id}`,e.type==="toggle")o.innerHTML=`
                    <label class="afx-toggle">
                        <input type="checkbox" id="afx-control-${e.id}" ${e.value?"checked":""}>
                        <span class="afx-slider"></span>
                    </label>
                    <span id="afx-control-label-${e.id}">${e.label}</span>
                `,o.querySelector("input").addEventListener("change",s=>{e.onChange&&e.onChange(s.target.checked)});else if(e.type==="slider"){o.classList.add("afx-slider-row");let a=e.step||1,s=a.toString().includes(".")?a.toString().split(".")[1].length:0;o.innerHTML=`
                    <span class="afx-slider-label">${e.label}:</span>
                    <input type="range" id="afx-control-${e.id}" class="afx-range-slider" min="${e.min}" max="${e.max}" step="${a}" value="${e.value}">
                    <span id="afx-control-val-${e.id}" class="afx-slider-val-text">${e.value.toFixed(s)}</span>
                `;let c=o.querySelector("input"),r=o.querySelector(".afx-slider-val-text");c.addEventListener("input",n=>{let d=parseFloat(n.target.value);r.innerText=d.toFixed(s),e.onChange&&e.onChange(d)})}else if(e.type==="button")o.style.padding="0",o.innerHTML=`
                    <button id="afx-control-${e.id}" class="afx-action-btn">
                        ${e.label}
                    </button>
                `,o.querySelector("button").addEventListener("click",s=>{s.stopPropagation(),e.onClick&&e.onClick()});else if(e.type==="select"){o.style.padding="0";let a=(e.options||[]).map(c=>{let r=typeof c=="object"?c.value:c,n=typeof c=="object"?c.text:c,d=r==e.value?"selected":"";return`<option value="${r}" ${d}>${n}</option>`}).join("");o.innerHTML=`
                    <select id="afx-control-${e.id}" class="afx-select">
                        ${a}
                    </select>
                `,o.querySelector("select").addEventListener("change",c=>{e.onChange&&e.onChange(c.target.value)})}t.appendChild(o)}))}function Mo(i,t){let e=document.getElementById(`afx-control-${i}`);e&&(e.type==="checkbox"?e.checked=!!t:e.value=t);let o=document.getElementById(`afx-control-val-${i}`);if(o){let a=e?e.step:"",s=a&&a.includes(".")?a.split(".")[1].length:0;o.innerText=typeof t=="number"?t.toFixed(s||(t%1===0?0:4)):t}}function Ut(i,t,e,o,a){a==="debug"?e.classList.add("afx-debug-active"):e.classList.remove("afx-debug-active");let s=document.documentElement;Array.from(s.classList).forEach(r=>{r.startsWith("afx-effect-")&&s.classList.remove(r)}),s.classList.add(`afx-effect-${a}`),i.currentEffectId=a;let c=oe[a];if(c){let r=ze(),n=yi(a,i.dpr),d={gl:i.glContext,ctx2d:i.ctx2D,canvasGL:i.sharedGL,canvas2D:i.shared2D,width:i.width,height:i.height,dpr:n,topInset:r.ioHeader,visibleWidth:i.width,visibleHeight:i.height-r.ioHeader,visibleBounds:{top:r.ioHeader,bottom:i.height}};i.marquee&&i.marquee.updateStyles(c.marqueeFont||{}),c.run(d,t),Ot(c),i.marquee&&(i.marquee.enabled=ut())}else i.marquee&&i.marquee.updateStyles({}),Ot(null)}function Ve(i){let t=document.getElementById("ankifx-background");if(!t||!i.sharedGL||!i.shared2D||!i.sharedMarquee)return;let o=ze().ioHeader;document.documentElement.style.setProperty("--afx-viewport-height",`calc(100dvh + ${o}px)`);let a=t.getBoundingClientRect();i.width=a.width,i.height=document.documentElement.clientHeight+o,i.dpr=vi();let s=$i();if(i.sharedGL.width=i.width*s,i.sharedGL.height=i.height*s,i.sharedGL.style.width=i.width+"px",i.sharedGL.style.height=i.height+"px",i.shared2D.width=i.width*i.dpr,i.shared2D.height=i.height*i.dpr,i.shared2D.style.width=i.width+"px",i.shared2D.style.height=i.height+"px",i.sharedMarquee.width=i.width*i.dpr,i.sharedMarquee.height=i.height*i.dpr,i.sharedMarquee.style.width=i.width+"px",i.sharedMarquee.style.height=i.height+"px",i.glContext&&i.glContext.viewport(0,0,i.sharedGL.width,i.sharedGL.height),i.ctx2D&&(i.ctx2D.setTransform(1,0,0,1,0,0),i.ctx2D.scale(i.dpr,i.dpr)),i.ctxMarquee&&(i.ctxMarquee.setTransform(1,0,0,1,0,0),i.ctxMarquee.scale(i.dpr,i.dpr)),i.currentEffectId&&oe[i.currentEffectId]?.onResize){let c=yi(i.currentEffectId,i.dpr);oe[i.currentEffectId].onResize(i.width,i.height,c)}}function Lo(i){let e=ze().ioHeader,o=window.innerHeight,a=document.documentElement.clientHeight,s=setInterval(()=>{let c=ze(),r=window.innerHeight,n=document.documentElement.clientHeight;(c.ioHeader!==e||r!==o||n!==a)&&(e=c.ioHeader,o=r,a=n,Ve(i))},50);setTimeout(()=>clearInterval(s),2e3)}function Ao(i){i._layoutHandler&&(window.removeEventListener("orientationchange",i._layoutHandler),window.removeEventListener("resize",i._layoutHandler)),i._resizeTimeout&&clearTimeout(i._resizeTimeout),i._resizeInterval&&clearInterval(i._resizeInterval),i._layoutHandler=()=>{i._resizeTimeout&&clearTimeout(i._resizeTimeout),i._resizeInterval&&clearInterval(i._resizeInterval),Ve(i),i._resizeTimeout=setTimeout(()=>{Ve(i)},100);let t=0,e=i.width,o=i.height;i._resizeInterval=setInterval(()=>{if(t+=100,t>=1500){clearInterval(i._resizeInterval);return}let a=ze(),s=document.getElementById("ankifx-background"),c=s?s.getBoundingClientRect():null,r=c?c.width:window.innerWidth,n=document.documentElement.clientHeight+a.ioHeader;(r!==e||n!==o)&&(e=r,o=n,Ve(i))},100)},window.addEventListener("orientationchange",i._layoutHandler),window.addEventListener("resize",i._layoutHandler)}function Io(i){let t=document.getElementById("afx-bottom-dock");t&&(i.dockObserver=new ResizeObserver(()=>{let e=t.getBoundingClientRect();document.documentElement.style.setProperty("--afx-dock-height",`${e.height}px`)}),i.dockObserver.observe(t))}function Do(i){i.observer||(i._observerTimeout=null,i.observer=new MutationObserver(()=>{i._observerTimeout&&clearTimeout(i._observerTimeout),i._observerTimeout=setTimeout(()=>{i._observerTimeout=null;let t=document.getElementById("qa");(t?!!t.querySelector(".ankifx-card"):!1)?wi(i):typeof i=="object"&&window.AnkiFX&&window.AnkiFX.destroy()},20)}),i.observer.observe(document.documentElement,{childList:!0,subtree:!0}))}function wi(i){let t=i&&i.observer;t&&i.observer.disconnect();let e=document.getElementById("_flag"),o=document.getElementById("_mark"),a=document.getElementById("afx-top-group-left"),s=document.getElementById("afx-top-group-right"),c=document.getElementById("afx-btn-skip");if(o&&a){let r=document.getElementById("afx-global-fps");r&&o.nextSibling!==r?a.insertBefore(o,r):!r&&o.parentElement!==a&&a.appendChild(o)}e&&s&&e.parentElement!==s&&s.insertBefore(e,c),t&&i.observer.observe(document.documentElement,{childList:!0,subtree:!0})}function Hi(i){if(i.marqueeInterval)return;let t=0,e=0,o=a=>{if(a===void 0&&(a=performance.now()),t||(t=a),e++,a-t>=1e3){let s=document.getElementById("afx-global-fps");s&&(s.textContent=`FPS: ${e}`),e=0,t=a}if(i.marquee&&i.ctxMarquee){if(i.ctxMarquee.clearRect(0,0,i.width,i.height),i.currentEffectId&&oe[i.currentEffectId]?.drawOverlay)try{oe[i.currentEffectId].drawOverlay(i.ctxMarquee,i.width,i.height,a)}catch(s){console.error("[AnkiFX] drawOverlay error: "+s.message)}i.marquee.render(i.ctxMarquee,i.width,i.height)}i.marqueeInterval=requestAnimationFrame(o)};i.marqueeInterval=requestAnimationFrame(o)}function zo(i,t,e,o){let a=t.countdown;if((t.debug||t.isConfigFileError)&&(a=0),a>0){o.textContent=`( ${a} )`;let s=setInterval(()=>{a--,o.textContent=`( ${a} )`,a<=0&&(clearInterval(s),o.textContent="I AGREE",o.disabled=!1)},1e3)}else o.textContent="I AGREE",o.disabled=!1;o.addEventListener("click",s=>{s.stopPropagation(),o.disabled||window.AnkiFX.agree(e,t.deckTitle)})}window.neoart=Object.create(null);function Xi(i,t){var e=Object.create(null,{endian:{value:1,writable:!0},length:{value:0,writable:!0},index:{value:0,writable:!0},buffer:{value:null,writable:!0},view:{value:null,writable:!0},bytesAvailable:{get:function(){return this.length-this.index}},position:{get:function(){return this.index},set:function(o){o<0?o=0:o>this.length&&(o=this.length),this.index=o}},clear:{value:function(){this.buffer=new ArrayBuffer,this.view=null,this.index=this.length=0}},readAt:{value:function(o){return this.view.getUint8(o)}},readByte:{value:function(){return this.view.getInt8(this.index++)}},readShort:{value:function(){var o=this.view.getInt16(this.index,this.endian);return this.index+=2,o}},readInt:{value:function(){var o=this.view.getInt32(this.index,this.endian);return this.index+=4,o}},readUbyte:{value:function(){return this.view.getUint8(this.index++)}},readUshort:{value:function(){var o=this.view.getUint16(this.index,this.endian);return this.index+=2,o}},readUint:{value:function(){var o=this.view.getUint32(this.index,this.endian);return this.index+=4,o}},readBytes:{value:function(o,a,s){var c=o.view,r=this.index,n=this.view;for((s+=r)>this.length&&(s=this.length);r<s;++r)c.setUint8(a++,n.getUint8(r));this.index=r}},readString:{value:function(o){var a=this.index,s=this.view,c="";for((o+=a)>this.length&&(o=this.length);a<o;++a)c+=String.fromCharCode(s.getUint8(a));return this.index=o,c}},writeAt:{value:function(o,a){this.view.setUint8(o,a)}},writeByte:{value:function(o){this.view.setInt8(this.index++,o)}},writeShort:{value:function(o){this.view.setInt16(this.index,o),this.index+=2}},writeInt:{value:function(o){this.view.setInt32(this.index,o),this.index+=4}}});return e.buffer=i,e.view=new DataView(i),e.length=i.byteLength,Object.seal(e)}function Ro(){return Object.create(null,{l:{value:0,writable:!0},r:{value:0,writable:!0},next:{value:null,writable:!0}})}function ki(){return Object.create(null,{player:{value:null,writable:!0},channels:{value:[],writable:!0},buffer:{value:[],writable:!0},samplesTick:{value:0,writable:!0},samplesLeft:{value:0,writable:!0},remains:{value:0,writable:!0},completed:{value:0,writable:!0},bufferSize:{get:function(){return this.buffer.length},set:function(i){var t,e=this.buffer.length||0;if(!(i===e||i<512)&&(this.buffer.length=i,i>e))for(this.buffer[e]=Ro(),t=++e;t<i;++t)this.buffer[t]=this.buffer[t-1].next=Ro()}},complete:{get:function(){return this.completed},set:function(i){this.completed=i^this.player.loopSong}},reset:{value:function(){var i=this.channels[0],t=this.buffer[0];for(this.samplesLeft=0,this.remains=0,this.completed=0;i;)i.initialize(),i=i.next;for(;t;)t.l=t.r=0,t=t.next}},restore:{configurable:!0,value:function(){}}})}function aa(){var i=null;return typeof AudioContext<"u"?i=new AudioContext:alert("Web Audio API does not appear to be supported. Use Chrome, Safari or Firefox"),i}function Si(){var i=Object.create(null,{context:{value:null,writable:!0},node:{value:null,writable:!0},analyser:{value:null,writable:!0},analyse:{value:0,writable:!0},endian:{value:0,writable:!0},sampleRate:{value:0,writable:!0},playSong:{value:0,writable:!0},lastSong:{value:0,writable:!0},version:{value:0,writable:!0},title:{value:"",writable:!0},channels:{value:0,writable:!0},loopSong:{value:0,writable:!0},speed:{value:0,writable:!0},tempo:{value:0,writable:!0},mixer:{value:null,writable:!0},tick:{value:0,writable:!0},paused:{value:0,writable:!0},callback:{value:null,writable:!0},quality:{configurable:!0,set:function(t){this.callback=t?this.mixer.accurate.bind(this.mixer):this.mixer.fast.bind(this.mixer)}},toggle:{value:function(t){this.mixer.channels[t].mute^=1}},setup:{configurable:!0,value:function(){}},load:{value:function(t){return this.version=0,this.playSong=0,this.lastSong=0,this.mixer.restore(),t.view||(t=Xi(t)),t.position=0,t.readUint()===67324752&&window.neoart.Unzip,t.endian=this.endian,t.position=0,this.loader(t),this.version&&this.setup(),this.version}},play:{value:function(){var t,e;this.version&&(this.paused?this.paused=0:(this.initialize(),typeof this.context.createJavaScriptNode=="function"?this.node=this.context.createJavaScriptNode(this.mixer.bufferSize):this.node=this.context.createScriptProcessor(this.mixer.bufferSize),this.analyser=this.context.createAnalyser(),this.node.connect(this.analyser),this.node.onaudioprocess=this.callback),this.analyse&&window.neoart.Flectrum?(e=window.neoart.analyserNode=this.context.createAnalyser(),this.node.connect(e),e.connect(this.context.destination)):this.node.connect(this.context.destination),t=document.createEvent("Event"),t.initEvent("flodPlay",!0,!1),document.dispatchEvent(t))}},pause:{value:function(){if(this.node){this.node.disconnect(),this.paused=1;var t=document.createEvent("Event");t.initEvent("flodPause",!0,!1),document.dispatchEvent(t)}}},stop:{value:function(){if(this.node){this.node.disconnect(),this.node.onaudioprocess=this.node=null,this.paused=0,this.restore&&this.restore();var t=document.createEvent("Event");t.initEvent("flodStop",!0,!1),document.dispatchEvent(t)}}},reset:{value:function(){this.tick=0,this.mixer.initialize(),this.mixer.samplesTick=this.sampleRate*2.5/this.tempo>>0}}});return window.neoart.audioContext||(window.neoart.audioContext=aa()),i.context=window.neoart.audioContext,i.sampleRate=i.context.sampleRate,i}function Ei(i){var t=Object.create(null,{next:{value:null,writable:!0},mute:{value:0,writable:!0},panning:{value:0,writable:!0},delay:{value:0,writable:!0},pointer:{value:0,writable:!0},length:{value:0,writable:!0},audena:{value:0,writable:!0},audcnt:{value:0,writable:!0},audloc:{value:0,writable:!0},audper:{value:0,writable:!0},audvol:{value:0,writable:!0},timer:{value:0,writable:!0},level:{value:0,writable:!0},ldata:{value:0,writable:!0},rdata:{value:0,writable:!0},enabled:{get:function(){return this.audena},set:function(e){e!==this.audena&&(this.audena=e,this.audloc=this.pointer,this.audcnt=this.pointer+this.length,this.timer=1,e&&(this.delay+=2))}},period:{set:function(e){e<0?e=0:e>65535&&(e=65535),this.audper=e}},volume:{set:function(e){e<0?e=0:e>64&&(e=64),this.audvol=e}},resetData:{value:function(){this.ldata=0,this.rdata=0}},initialize:{value:function(){this.audena=0,this.audcnt=0,this.audloc=0,this.audper=50,this.audvol=0,this.timer=0,this.ldata=0,this.rdata=0,this.delay=0,this.pointer=0,this.length=0}}});return t.panning=t.level=(++i&2)===0?-1:1,Object.seal(t)}function na(){return Object.create(null,{active:{value:0,writable:!0},forced:{value:-1,writable:!0},l0:{value:0,writable:!0},l1:{value:0,writable:!0},l2:{value:0,writable:!0},l3:{value:0,writable:!0},l4:{value:0,writable:!0},r0:{value:0,writable:!0},r1:{value:0,writable:!0},r2:{value:0,writable:!0},r3:{value:0,writable:!0},r4:{value:0,writable:!0},initialize:{value:function(){this.l0=this.l1=this.l2=this.l3=this.l4=0,this.r0=this.r1=this.r2=this.r3=this.r4=0}},process:{value:function(i,t){var e=.52133458435322,o=.4860348337215757,a=.9314955486749749,s=1-o;i===0&&(this.l0=o*t.l+s*this.l0,this.r0=o*t.r+s*this.r0,s=1-a,t.l=this.l1=a*this.l0+s*this.l1,t.r=this.r1=a*this.r0+s*this.r1),(this.active|this.forced)>0&&(s=1-e,this.l2=e*t.l+s*this.l2,this.r2=e*t.r+s*this.r2,this.l3=e*this.l2+s*this.l3,this.r3=e*this.r2+s*this.r3,t.l=this.l4=e*this.l3+s*this.l4,t.r=this.r4=e*this.r3+s*this.r4),t.l>1?t.l=1:t.l<-1&&(t.l=-1),t.r>1?t.r=1:t.r<-1&&(t.r=-1)}}})}function Ci(){return Object.create(null,{note:{value:0,writable:!0},sample:{value:0,writable:!0},effect:{value:0,writable:!0},param:{value:0,writable:!0}})}function Bt(){return Object.create(null,{name:{value:"",writable:!0},length:{value:0,writable:!0},loop:{value:0,writable:!0},repeat:{value:0,writable:!0},volume:{value:0,writable:!0},pointer:{value:0,writable:!0},loopPtr:{value:0,writable:!0}})}function Gi(){var i=ki();return Object.defineProperties(i,{filter:{value:null,writable:!0},model:{value:1,writable:!0},memory:{value:[],writable:!0},loopPtr:{value:0,writable:!0},loopLen:{value:4,writable:!0},clock:{value:0,writable:!0},master:{value:0,writable:!0},ready:{value:0,writable:!0},volume:{set:function(t){t>0?(t>64&&(t=64),this.master=t/64*.00390625):this.master=0}},initialize:{value:function(){var t=this.memory.length,e=t+this.loopLen;if(this.reset(),this.filter.initialize(),!this.ready)for(this.ready=1,this.loopPtr=t;t<e;++t)this.memory[t]=0}},restore:{value:function(){this.ready=0,this.memory.length=0}},store:{value:function(t,e,o){var a,s,c=t.position,r=this.memory.length,n;for(o&&(t.position=o),n=t.position+e,n>=t.length&&(a=n-t.length,e=t.length-t.position),s=r,e+=r;s<e;++s)this.memory[s]=t.readByte();for(e+=a;s<e;++s)this.memory[s]=0;return o&&(t.position=c),r}},fast:{value:function(t){var e,o,a,s=this.memory,c,r=0,n,d=0,u,l,h,x=this.bufferSize,p,f,b;if(this.completed){if(!this.remains){this.player.stop();return}x=this.remains}for(;r<x;){for(this.samplesLeft||(this.player.process(),this.samplesLeft=this.samplesTick,this.completed&&(x=r+this.samplesTick,x>this.bufferSize&&(this.remains=x-this.bufferSize,x=this.bufferSize))),f=this.samplesLeft,r+f>=x&&(f=x-r),n=d+f,e=this.channels[0];e;){if(h=this.buffer[d],e.audena&&e.audper>60)for(p=e.audper/this.clock,b=e.audvol*this.master,c=b*(1-e.level),l=b*(1+e.level),o=d;o<n;++o)e.delay?e.delay--:--e.timer<1&&(e.mute||(b=s[e.audloc]*.0078125,e.ldata=b*c,e.rdata=b*l),e.audloc++,e.timer+=p,e.audloc>=e.audcnt&&(e.audloc=e.pointer,e.audcnt=e.pointer+e.length)),h.l+=e.ldata,h.r+=e.rdata,h=h.next;else for(o=d;o<n;++o)h.l+=e.ldata,h.r+=e.rdata,h=h.next;e=e.next}d=n,r+=f,this.samplesLeft-=f}for(b=this.model,s=this.filter,h=this.buffer[0],a=t.outputBuffer.getChannelData(0),u=t.outputBuffer.getChannelData(1),o=0;o<x;++o)s.process(b,h),a[o]=h.l,u[o]=h.r,h.l=h.r=0,h=h.next}}}),i.channels[0]=Ei(0),i.channels[0].next=i.channels[1]=Ei(1),i.channels[1].next=i.channels[2]=Ei(2),i.channels[2].next=i.channels[3]=Ei(3),i.bufferSize=8192,i.filter=na(),i.master=.00390625,Object.seal(i)}function Pi(i){var t=Si();return Object.defineProperties(t,{quality:{set:function(e){this.callback=this.mixer.fast.bind(this.mixer)}},stereo:{set:function(e){var o=this.mixer.channels[0];for(e<0?e=0:e>1&&(e=1);o;)o.level=e*o.panning,o=o.next}},volume:{set:function(e){e<0?e=0:e>1&&(e=1),this.mixer.master=e*.00390625}},frequency:{value:function(e){e?(this.mixer.clock=3579545/this.sampleRate,this.mixer.samplesTick=735):(this.mixer.clock=3546895/this.sampleRate,this.mixer.samplesTick=882)}}}),t.mixer=i||Gi(),t.mixer.player=t,t.frequency(0),t.channels=4,t.endian=0,t.quality=0,t.speed=6,t.tempo=125,t}function Oo(){return Object.create(null,{next:{value:null,writable:!0},mute:{value:0,writable:!0},enabled:{value:0,writable:!0},sample:{value:null,writable:!0},length:{value:0,writable:!0},index:{value:0,writable:!0},pointer:{value:0,writable:!0},delta:{value:0,writable:!0},fraction:{value:0,writable:!0},speed:{value:0,writable:!0},dir:{value:0,writable:!0},oldSample:{value:null,writable:!0},oldLength:{value:0,writable:!0},oldPointer:{value:0,writable:!0},oldFraction:{value:0,writable:!0},oldSpeed:{value:0,writable:!0},oldDir:{value:0,writable:!0},volume:{value:0,writable:!0},lvol:{value:0,writable:!0},rvol:{value:0,writable:!0},panning:{value:128,writable:!0},lpan:{value:.5,writable:!0},rpan:{value:.5,writable:!0},ldata:{value:0,writable:!0},rdata:{value:0,writable:!0},mixCounter:{value:0,writable:!0},lmixRampU:{value:0,writable:!0},lmixDeltaU:{value:0,writable:!0},rmixRampU:{value:0,writable:!0},rmixDeltaU:{value:0,writable:!0},lmixRampD:{value:0,writable:!0},lmixDeltaD:{value:0,writable:!0},rmixRampD:{value:0,writable:!0},rmixDeltaD:{value:0,writable:!0},volCounter:{value:0,writable:!0},lvolDelta:{value:0,writable:!0},rvolDelta:{value:0,writable:!0},panCounter:{value:0,writable:!0},lpanDelta:{value:0,writable:!0},rpanDelta:{value:0,writable:!0},initialize:{value:function(){this.enabled=0,this.sample=null,this.length=0,this.index=0,this.pointer=0,this.delta=0,this.fraction=0,this.speed=0,this.dir=0,this.oldSample=null,this.oldLength=0,this.oldPointer=0,this.oldFraction=0,this.oldSpeed=0,this.oldDir=0,this.volume=0,this.lvol=0,this.rvol=0,this.panning=128,this.lpan=.5,this.rpan=.5,this.ldata=0,this.rdata=0,this.mixCounter=0,this.lmixRampU=0,this.lmixDeltaU=0,this.rmixRampU=0,this.rmixDeltaU=0,this.lmixRampD=0,this.lmixDeltaD=0,this.rmixRampD=0,this.rmixDeltaD=0,this.volCounter=0,this.lvolDelta=0,this.rvolDelta=0,this.panCounter=0,this.lpanDelta=0,this.rpanDelta=0}}})}function Uo(){return Object.create(null,{name:{value:"",writable:!0},bits:{value:8,writable:!0},volume:{value:0,writable:!0},length:{value:0,writable:!0},data:{value:[],writable:!0},loopMode:{value:0,writable:!0},loopStart:{value:0,writable:!0},loopLen:{value:0,writable:!0},store:{value:function(i){var t=0,e,o=this.length,a,s,c,r;if(this.loopLen||(this.loopMode=0),a=i.position,this.loopMode?(o=this.loopStart+this.loopLen,this.data=new Float32Array(o+1)):this.data=new Float32Array(this.length+1),this.bits===8)for(c=a+o,c>i.length&&(o=i.length-a),e=0;e<o;e++)r=i.readByte()+t,r<-128?r+=256:r>127&&(r-=256),this.data[e]=r*.0078125,t=r;else for(c=a+(o<<1),c>i.length&&(o=i.length-a>>1),e=0;e<o;e++)r=i.readShort()+t,r<-32768?r+=65536:r>32767&&(r-=65536),this.data[e]=r*3051758e-11,t=r;if(c=a+this.length,this.loopMode?(this.length=this.loopStart+this.loopLen,this.loopMode===1?this.data[o]=this.data[this.loopStart]:this.data[o]=this.data[o-1]):this.data[this.length]=0,o!==this.length)for(s=this.data[o-1],e=o;e<this.length;e++)this.data[e]=s;c<i.length?i.position=c:i.position=i.length-1}}})}function sa(){var i=ki();return Object.defineProperties(i,{setup:{value:function(t){var e=1;for(this.channels.length=t,this.channels[0]=Oo();e<t;++e)this.channels[e]=this.channels[e-1].next=Oo()}},initialize:{value:function(){this.reset()}},fast:{value:function(t){var e,o,a,s,c=0,r,n=0,d,u,l,h=this.bufferSize,x,p;if(this.completed){if(!this.remains){this.player.stop();return}h=this.remains}for(;c<h;){for(this.samplesLeft||(this.player.process(),this.player.fast(),this.samplesLeft=this.samplesTick,this.completed&&(h=c+this.samplesTick,h>this.bufferSize&&(this.remains=h-this.bufferSize,h=this.bufferSize))),x=this.samplesLeft,c+x>=h&&(x=h-c),r=n+x,e=this.channels[0];e;){if(!e.enabled){e=e.next;continue}for(u=e.sample,o=u.data,l=this.buffer[n],s=n;s<r;++s){if(e.index!==e.pointer){if(e.index>=e.length)if(u.loopMode)e.pointer=u.loopStart+(e.index-e.length),e.length=u.length,u.loopMode===2&&(e.dir?e.dir=0:e.dir=u.length+u.loopStart-1);else{e.enabled=0;break}else e.pointer=e.index;e.mute?(e.ldata=0,e.rdata=0):(e.dir?p=o[e.dir-e.pointer]:p=o[e.pointer],e.ldata=p*e.lvol,e.rdata=p*e.rvol)}e.index=e.pointer+e.delta,(e.fraction+=e.speed)>=1&&(e.index++,e.fraction--),l.l+=e.ldata,l.r+=e.rdata,l=l.next}e=e.next}n=r,c+=x,this.samplesLeft-=x}for(l=this.buffer[0],a=t.outputBuffer.getChannelData(0),d=t.outputBuffer.getChannelData(1),s=0;s<h;++s)l.l>1?l.l=1:l.l<-1&&(l.l=-1),l.r>1?l.r=1:l.r<-1&&(l.r=-1),a[s]=l.l,d[s]=l.r,l.l=l.r=0,l=l.next}},accurate:{value:function(t){var e,o,a,s,c,r,n=0,d,u=0,l,h,x,p,f,b=this.bufferSize,v,m;if(this.completed){if(!this.remains){this.player.stop();return}b=this.remains}for(;n<b;){for(this.samplesLeft||(this.player.process(),this.player.accurate(),this.samplesLeft=this.samplesTick,this.completed&&(b=n+this.samplesTick,b>this.bufferSize&&(this.remains=b-this.bufferSize,b=this.bufferSize))),v=this.samplesLeft,n+v>=b&&(v=b-n),d=u+v,e=this.channels[0];e;){if(!e.enabled){e=e.next;continue}for(x=e.sample,o=x.data,p=e.oldSample,p&&(a=p.data),f=this.buffer[u],r=u;r<d;++r){if(m=e.mute?0:o[e.pointer],m+=(o[e.pointer+e.dir]-m)*e.fraction,(e.fraction+=e.speed)>=1&&(c=e.fraction>>0,e.fraction-=c,e.dir>0?(e.pointer+=c,e.pointer>e.length&&(e.fraction+=e.pointer-e.length,e.pointer=e.length)):(e.pointer-=c,e.pointer<e.length&&(e.fraction+=e.length-e.pointer,e.pointer=e.length))),e.mixCounter?(p?(l=e.mute?0:a[e.oldPointer],l+=(a[e.oldPointer+e.oldDir]-l)*e.oldFraction,(e.oldFraction+=e.oldSpeed)>1&&(c=e.oldFraction>>0,e.oldFraction-=c,e.oldDir>0?(e.oldPointer+=c,e.oldPointer>e.oldLength&&(e.oldFraction+=e.oldPointer-e.oldLength,e.oldPointer=e.oldLength)):(e.oldPointer-=c,e.oldPointer<e.oldLength&&(e.oldFraction+=e.oldLength-e.oldPointer,e.oldPointer=e.oldLength))),f.l+=m*e.lmixRampU+l*e.lmixRampD,f.r+=m*e.rmixRampU+l*e.rmixRampD,e.lmixRampD-=e.lmixDeltaD,e.rmixRampD-=e.rmixDeltaD):(f.l+=m*e.lmixRampU,f.r+=m*e.rmixRampU),e.lmixRampU+=e.lmixDeltaU,e.rmixRampU+=e.rmixDeltaU,e.mixCounter--,e.oldPointer===e.oldLength&&(p.loopMode?p.loopMode===1?(e.oldPointer=p.loopStart,e.oldLength=p.length):e.oldDir>0?(e.oldPointer=p.length-1,e.oldLength=p.loopStart,e.oldDir=-1):(e.oldFraction-=1,e.oldPointer=p.loopStart,e.oldLength=p.length,e.oldDir=1):(p=null,e.oldPointer=0))):(f.l+=m*e.lvol,f.r+=m*e.rvol,e.volCounter?(e.lvol+=e.lvolDelta,e.rvol+=e.rvolDelta,e.volCounter--):e.panCounter&&(e.lpan+=e.lpanDelta,e.rpan+=e.rpanDelta,e.panCounter--,e.lvol=e.volume*e.lpan,e.rvol=e.volume*e.rpan)),e.pointer===e.length)if(x.loopMode)x.loopMode===1?(e.pointer=x.loopStart,e.length=x.length):e.dir>0?(e.pointer=x.length-1,e.length=x.loopStart,e.dir=-1):(e.fraction-=1,e.pointer=x.loopStart,e.length=x.length,e.dir=1);else{e.enabled=0;break}f=f.next}e=e.next}u=d,n+=v,this.samplesLeft-=v}for(f=this.buffer[0],s=t.outputBuffer.getChannelData(0),h=t.outputBuffer.getChannelData(1),r=0;r<b;++r)f.l>1?f.l=1:f.l<-1&&(f.l=-1),f.r>1?f.r=1:f.r<-1&&(f.r=-1),s[r]=f.l,h[r]=f.r,f.l=f.r=0,f=f.next}}}),i.bufferSize=8192,Object.seal(i)}function Bo(i){var t=Si();return Object.defineProperties(t,{track:{value:null,writable:!0},length:{value:0,writable:!0},restart:{value:0,writable:!0},timer:{value:0,writable:!0},master:{value:0,writable:!0},volume:{set:function(e){e<0?e=0:e>1&&(e=1),this.master=e*64}},setup:{configurable:!1,value:function(){this.mixer.setup(this.channels)}}}),t.mixer=i||sa(),t.mixer.player=t,t.endian=1,t.quality=1,t}function la(i){var t=Object.create(null,{index:{value:i,writable:!0},next:{value:null,writable:!0},flags:{value:0,writable:!0},delay:{value:0,writable:!0},channel:{value:null,writable:!0},patternLoop:{value:0,writable:!0},patternLoopRow:{value:0,writable:!0},playing:{value:null,writable:!0},note:{value:0,writable:!0},keyoff:{value:0,writable:!0},period:{value:0,writable:!0},finetune:{value:0,writable:!0},arpDelta:{value:0,writable:!0},vibDelta:{value:0,writable:!0},instrument:{value:null,writable:!0},autoVibratoPos:{value:0,writable:!0},autoSweep:{value:0,writable:!0},autoSweepPos:{value:0,writable:!0},sample:{value:null,writable:!0},sampleOffset:{value:0,writable:!0},volume:{value:0,writable:!0},volEnabled:{value:0,writable:!0},volEnvelope:{value:null,writable:!0},volDelta:{value:0,writable:!0},volSlide:{value:0,writable:!0},volSlideMaster:{value:0,writable:!0},fineSlideU:{value:0,writable:!0},fineSlideD:{value:0,writable:!0},fadeEnabled:{value:0,writable:!0},fadeDelta:{value:0,writable:!0},fadeVolume:{value:0,writable:!0},panning:{value:0,writable:!0},panEnabled:{value:0,writable:!0},panEnvelope:{value:null,writable:!0},panSlide:{value:0,writable:!0},portaU:{value:0,writable:!0},portaD:{value:0,writable:!0},finePortaU:{value:0,writable:!0},finePortaD:{value:0,writable:!0},xtraPortaU:{value:0,writable:!0},xtraPortaD:{value:0,writable:!0},portaPeriod:{value:0,writable:!0},portaSpeed:{value:0,writable:!0},glissando:{value:0,writable:!0},glissPeriod:{value:0,writable:!0},vibratoPos:{value:0,writable:!0},vibratoSpeed:{value:0,writable:!0},vibratoDepth:{value:0,writable:!0},vibratoReset:{value:0,writable:!0},tremoloPos:{value:0,writable:!0},tremoloSpeed:{value:0,writable:!0},tremoloDepth:{value:0,writable:!0},waveControl:{value:0,writable:!0},tremorPos:{value:0,writable:!0},tremorOn:{value:0,writable:!0},tremorOff:{value:0,writable:!0},tremorVolume:{value:0,writable:!0},retrigx:{value:0,writable:!0},retrigy:{value:0,writable:!0},rowCurrent:{value:null,writable:!0},reset:{value:function(){this.volume=this.sample.volume,this.panning=this.sample.panning,this.finetune=this.sample.finetune>>3<<2,this.keyoff=0,this.volDelta=0,this.fadeEnabled=0,this.fadeDelta=0,this.rowCurrent=null,this.fadeVolume=65536,this.autoVibratoPos=0,this.autoSweep=1,this.autoSweepPos=0,this.vibDelta=0,this.vibratoReset=0,(this.waveControl&15)<4&&(this.vibratoPos=0),this.waveControl>>4<4&&(this.tremoloPos=0)}},autoVibrato:{value:function(){var e;switch(this.autoVibratoPos=this.autoVibratoPos+this.playing.vibratoSpeed&255,this.playing.vibratoType){case 0:e=pa[this.autoVibratoPos];break;case 1:this.autoVibratoPos<128?e=-64:e=64;break;case 2:e=(64+(this.autoVibratoPos>>1)&127)-64;break;case 3:e=(64-(this.autoVibratoPos>>1)&127)-64;break;default:break}return e*=this.playing.vibratoDepth,this.autoSweep&&(this.playing.vibratoSweep?this.autoSweepPos>this.playing.vibratoSweep?(this.autoSweepPos&2&&(e*=this.autoSweepPos/this.playing.vibratoSweep),this.autoSweep=0):e*=++this.autoSweepPos/this.playing.vibratoSweep:this.autoSweep=0),this.flags|=de,e>>6}},tonePortamento:{value:function(){this.glissPeriod||(this.glissPeriod=this.period),this.period<this.portaPeriod?(this.glissPeriod+=this.portaSpeed<<2,this.glissando?this.period=Math.round(this.glissPeriod/64)<<6:this.period=this.glissPeriod,this.period>=this.portaPeriod&&(this.period=this.portaPeriod,this.glissPeriod=this.portaPeriod=0)):this.period>this.portaPeriod&&(this.glissPeriod-=this.portaSpeed<<2,this.glissando?this.period=Math.round(this.glissPeriod/64)<<6:this.period=this.glissPeriod,this.period<=this.portaPeriod&&(this.period=this.portaPeriod,this.glissPeriod=this.portaPeriod=0)),this.flags|=de}},tremolo:{value:function(){var e=255,o=this.tremoloPos&31;switch(this.waveControl>>4&3){case 0:e=Go[o];break;case 1:e=o<<3;break;default:break}this.volDelta=e*this.tremoloDepth>>6,this.tremoloPos>31&&(this.volDelta=-this.volDelta),this.tremoloPos=this.tremoloPos+this.tremoloSpeed&63,this.flags|=W}},tremor:{value:function(){this.tremorPos===this.tremorOn?(this.tremorVolume=this.volume,this.volume=0,this.flags|=W):(this.tremorPos=0,this.volume=this.tremorVolume,this.flags|=W),this.tremorPos++}},vibrato:{value:function(){var e=255,o=this.vibratoPos&31;switch(this.waveControl&3){case 0:e=Go[o];break;case 1:e=o<<3,this.vibratoPos>31&&(e=255-e);break;default:break}this.vibDelta=e*this.vibratoDepth>>7,this.vibratoPos>31&&(this.vibDelta=-this.vibDelta),this.vibratoPos=this.vibratoPos+this.vibratoSpeed&63,this.flags|=de}}});return t.volEnvelope=qo(),t.panEnvelope=qo(),Object.seal(t)}function _i(){return Object.create(null,{points:{value:[],writable:!0},total:{value:0,writable:!0},sustain:{value:0,writable:!0},loopStart:{value:0,writable:!0},loopEnd:{value:0,writable:!0},flags:{value:0,writable:!0}})}function qo(){return Object.create(null,{value:{value:0,writable:!0},position:{value:0,writable:!0},frame:{value:0,writable:!0},delta:{value:0,writable:!0},fraction:{value:0,writable:!0},stopped:{value:0,writable:!0},reset:{value:function(){this.value=0,this.position=0,this.frame=0,this.delta=0,this.fraction=0,this.stopped=0}}})}function No(){var i=Object.create(null,{name:{value:"",writable:!0},samples:{value:[],writable:!0},noteSamples:{value:null,writable:!0},fadeout:{value:0,writable:!0},volData:{value:null,writable:!0},volEnabled:{value:0,writable:!0},panData:{value:null,writable:!0},panEnabled:{value:0,writable:!0},vibratoType:{value:0,writable:!0},vibratoSweep:{value:0,writable:!0},vibratoSpeed:{value:0,writable:!0},vibratoDepth:{value:0,writable:!0}});return i.noteSamples=new Uint8Array(96),i.volData=_i(),i.panData=_i(),Object.seal(i)}function jo(i,t){var e=Object.create(null,{rows:{value:[],writable:!0},length:{value:0,writable:!0},size:{value:0,writable:!0}});return e.rows.length=e.size=i*t,e.length=i,Object.seal(e)}function Ti(i,t){var e=Object.create(null,{frame:{value:0,writable:!0},value:{value:0,writable:!0}});return e.frame=i||0,e.value=t||0,Object.seal(e)}function Vi(){return Object.create(null,{note:{value:0,writable:!0},instrument:{value:0,writable:!0},volume:{value:0,writable:!0},effect:{value:0,writable:!0},param:{value:0,writable:!0}})}function $o(){var i=Uo();return Object.defineProperties(i,{finetune:{value:0,writable:!0},panning:{value:0,writable:!0},relative:{value:0,writable:!0}}),Object.seal(i)}function ca(i){var t=Bo(i);return Object.defineProperties(t,{id:{value:"F2Player"},patterns:{value:[],writable:!0},instruments:{value:[],writable:!0},voices:{value:[],writable:!0},linear:{value:0,writable:!0},complete:{value:0,writable:!0},order:{value:0,writable:!0},position:{value:0,writable:!0},nextOrder:{value:0,writable:!0},nextPosition:{value:0,writable:!0},pattern:{value:null,writable:!0},patternDelay:{value:0,writable:!0},patternOffset:{value:0,writable:!0},timer:{value:0,writable:!0},rowCurrent:{value:0,writable:!0},initialize:{value:function(){var e=0,o;for(this.reset(),this.timer=this.speed,this.order=0,this.position=0,this.nextOrder=-1,this.nextPosition=-1,this.patternDelay=0,this.patternOffset=0,this.complete=0,this.master=64,this.voices.length=this.channels;e<this.channels;++e)o=la(e),o.channel=this.mixer.channels[e],o.playing=this.instruments[0],o.sample=o.playing.samples[0],this.voices[e]=o,e&&(this.voices[e-1].next=o)}},loader:{value:function(e){var o,a,s,c,r,n,d,u,l,h,x=22,p,f,b,v;if(!(e.length<360)){if(e.position=17,this.title=e.readString(20),e.position++,s=e.readString(20),s==="FastTracker v2.00   "||s==="FastTracker v 2.00  ")this.version=1;else if(s==="Sk@le Tracker")x=2,this.version=2;else if(s==="MadTracker 2.0")this.version=3;else if(s==="MilkyTracker        ")this.version=4;else if(s==="DigiBooster Pro 2.18")this.version=5;else if(s.indexOf("OpenMPT")!==-1)this.version=6;else return;for(e.readUshort(),o=e.readUint(),this.length=e.readUshort(),this.restart=e.readUshort(),this.channels=e.readUshort(),v=f=e.readUshort(),this.instruments=[],this.instruments.length=e.readUshort()+1,this.linear=e.readUshort(),this.speed=e.readUshort(),this.tempo=e.readUshort(),this.track=new Uint8Array(this.length),a=0;a<this.length;++a)d=e.readUbyte(),d>=v&&(f=d+1),this.track[a]=d;if(this.patterns=[],this.patterns.length=f,f!==v){for(l=jo(64,this.channels),d=l.size,a=0;a<d;++a)l.rows[a]=Vi();this.patterns[--f]=l}for(e.position=h=o+60,u=v,a=0;a<u;++a){if(o=e.readUint(),e.position++,l=jo(e.readUshort(),this.channels),f=l.size,v=e.readUshort(),e.position=h+o,n=e.position+v,v)for(d=0;d<f;++d)p=Vi(),v=e.readUbyte(),v&128?(v&1&&(p.note=e.readUbyte()),v&2&&(p.instrument=e.readUbyte()),v&4&&(p.volume=e.readUbyte()),v&8&&(p.effect=e.readUbyte()),v&16&&(p.param=e.readUbyte())):(p.note=v,p.instrument=e.readUbyte(),p.volume=e.readUbyte(),p.effect=e.readUbyte(),p.param=e.readUbyte()),p.note!==Wi&&p.note>96&&(p.note=0),l.rows[d]=p;else for(d=0;d<f;++d)l.rows[d]=Vi();this.patterns[a]=l,h=e.position,h!==n&&(h=e.position=n)}for(n=e.position,u=this.instruments.length,a=1;a<u&&(c=e.readUint(),!(e.position+c>=e.length));++a){if(r=No(),r.name=e.readString(22),e.position++,v=e.readUshort(),v>16&&(v=16),o=e.readUint(),x===2&&o!==64&&(o=64),v){for(r.samples=[],r.samples.length=v,d=0;d<96;++d)r.noteSamples[d]=e.readUbyte();for(d=0;d<12;++d)r.volData.points[d]=Ti(e.readUshort(),e.readUshort());for(d=0;d<12;++d)r.panData.points[d]=Ti(e.readUshort(),e.readUshort());for(r.volData.total=e.readUbyte(),r.panData.total=e.readUbyte(),r.volData.sustain=e.readUbyte(),r.volData.loopStart=e.readUbyte(),r.volData.loopEnd=e.readUbyte(),r.panData.sustain=e.readUbyte(),r.panData.loopStart=e.readUbyte(),r.panData.loopEnd=e.readUbyte(),r.volData.flags=e.readUbyte(),r.panData.flags=e.readUbyte(),r.volData.flags&Ho&&(r.volEnabled=1),r.panData.flags&Ho&&(r.panEnabled=1),r.vibratoType=e.readUbyte(),r.vibratoSweep=e.readUbyte(),r.vibratoDepth=e.readUbyte(),r.vibratoSpeed=e.readUbyte(),r.fadeout=e.readUshort()<<1,e.position+=x,h=e.position,this.instruments[a]=r,d=0;d<v;++d)b=$o(),b.length=e.readUint(),b.loopStart=e.readUint(),b.loopLen=e.readUint(),b.volume=e.readUbyte(),b.finetune=e.readByte(),b.loopMode=e.readUbyte(),b.panning=e.readUbyte(),b.relative=e.readByte(),e.position++,b.name=e.readString(22),r.samples[d]=b,e.position=h+=o;for(d=0;d<v;++d)b=r.samples[d],b.length&&(h=e.position+b.length,b.loopMode&16&&(b.bits=16,b.loopMode^=16,b.length>>=1,b.loopStart>>=1,b.loopLen>>=1),b.loopLen||(b.loopMode=0),b.store(e),b.loopMode&&(b.length=b.loopStart+b.loopLen),e.position=h)}else e.position=n+c;if(n=e.position,n>=e.length)break}for(r=No(),r.volData=_i(),r.panData=_i(),r.samples=[],a=0;a<12;++a)r.volData.points[a]=Ti(),r.panData.points[a]=Ti();for(b=$o(),b.length=220,b.data=new Float32Array(220),a=0;a<220;++a)b.data[a]=0;r.samples[0]=b,this.instruments[0]=r}}},process:{value:function(){var e,o,a,s,c,r,n,d,u,l,h,x,p,f=this.voices[0];if(this.tick)for(;f;){if(l=this.pattern.rows[this.position+f.index],f.delay)if((l.param&15)===this.tick)f.flags=f.delay,f.delay=0;else{f=f.next;continue}if(l.volume)switch(n=l.volume>>4,d=l.volume&15,n){case 6:f.volume-=d,f.volume<0&&(f.volume=0),f.flags|=W;break;case 7:f.volume+=d,f.volume>64&&(f.volume=64),f.flags|=W;break;case 11:f.vibrato();break;case 13:f.panning-=d,f.panning<0&&(f.panning=0),f.flags|=ke;break;case 14:f.panning+=d,f.panning>255&&(f.panning=255),f.flags|=ke;break;case 15:f.portaPeriod&&f.tonePortamento();break;default:break}switch(n=l.param>>4,d=l.param&15,l.effect){case 0:if(!l.param)break;p=(this.tick-this.timer)%3,p<0&&(p+=3),this.tick===2&&this.timer===18&&(p=0),p?p===1?this.linear?f.arpDelta=-(d<<6):(p=this.amiga(f.note+d,f.finetune),f.arpDelta=p-f.period):this.linear?f.arpDelta=-(n<<6):(p=this.amiga(f.note+n,f.finetune),f.arpDelta=p-f.period):f.arpDelta=0,f.flags|=de;break;case 1:f.period-=f.portaU,f.period<0&&(f.period=0),f.flags|=de;break;case 2:f.period+=f.portaD,f.period>9212&&(f.period=9212),f.flags|=de;break;case 3:f.portaPeriod&&f.tonePortamento();break;case 4:n&&(f.vibratoSpeed=n),d&&(f.vibratoDepth=d<<2),f.vibrato();break;case 5:x=1,f.portaPeriod&&f.tonePortamento();break;case 6:x=1,f.vibrato();break;case 7:f.tremolo();break;case 10:x=1;break;case 14:switch(n){case 9:this.tick%d===0&&(f.volEnvelope.reset(),f.panEnvelope.reset(),f.flags|=W|ke|dt);break;case 12:this.tick===d&&(f.volume=0,f.flags|=W);break;default:break}break;case 17:n=f.volSlideMaster>>4,d=f.volSlideMaster&15,n?(this.master+=n,this.master>64&&(this.master=64),f.flags|=W):d&&(this.master-=d,this.master<0&&(this.master=0),f.flags|=W);break;case 20:this.tick===l.param&&(f.fadeEnabled=1,f.keyoff=1);break;case 24:n=f.panSlide>>4,d=f.panSlide&15,n?(f.panning+=n,f.panning>255&&(f.panning=255),f.flags|=ke):d&&(f.panning-=d,f.panning<0&&(f.panning=0),f.flags|=ke);break;case 27:if(e=this.tick,l.volume||e++,e%f.retrigy)break;(!l.volume||l.volume>80)&&f.retrigx&&this.retrig(f),f.flags|=dt;break;case 29:f.tremor();break;default:break}x&&(n=f.volSlide>>4,d=f.volSlide&15,x=0,n?(f.volume+=n,f.flags|=W):d&&(f.volume-=d,f.flags|=W)),f=f.next}else for(this.nextOrder>=0&&(this.order=this.nextOrder),this.nextPosition>=0&&(this.position=this.nextPosition),this.nextOrder=this.nextPosition=-1,this.pattern=this.patterns[this.track[this.order]];f;){if(this.rowCurrent=this.position+f.index,l=this.pattern.rows[this.rowCurrent],e=l.volume>>4,u=l.effect===3||l.effect===5||e===15,n=l.param>>4,f.keyoff=0,f.arpDelta&&(f.arpDelta=0,f.flags|=de),l.instrument?(f.instrument=l.instrument<this.instruments.length?this.instruments[l.instrument]:null,f.volEnvelope.reset(),f.panEnvelope.reset(),f.flags|=W|ke|ot):(l.note===Wi||l.effect===20&&!l.param)&&(f.fadeEnabled=1,f.keyoff=1),l.note&&l.note!==Wi?f.instrument?(a=f.instrument,p=l.note-1,h=a.samples[a.noteSamples[p]],p+=h.relative,p>=da&&p<=ha&&(u||(f.note=p,f.sample=h,l.instrument?(f.volEnabled=a.volEnabled,f.panEnabled=a.panEnabled,f.flags|=fa):f.flags|=de|dt),l.instrument?(f.reset(),f.fadeDelta=a.fadeout):f.finetune=h.finetune>>3<<2,l.effect===14&&n===5&&(f.finetune=(l.param&15)-8<<3),this.linear?p=(120-p<<6)-f.finetune:p=this.amiga(p,f.finetune),u?f.portaPeriod=p:(f.period=p,f.glissPeriod=0))):(f.volume=0,f.flags=W|ot):f.vibratoReset&&l.effect!==4&&l.effect!==6&&(f.vibDelta=0,f.vibratoReset=0,f.flags|=de),l.volume)if(l.volume>=16&&l.volume<=80)f.volume=l.volume-16,f.flags|=W|ot;else switch(d=l.volume&15,e){case 6:f.volume-=d,f.volume<0&&(f.volume=0),f.flags|=W;break;case 7:f.volume+=d,f.volume>64&&(f.volume=64),f.flags|=W;break;case 10:d&&(f.vibratoSpeed=d);break;case 11:d&&(f.vibratoDepth=d<<2);break;case 12:f.panning=d<<4,f.flags|=ke;break;case 15:d&&(f.portaSpeed=d<<4);break;default:break}if(l.effect)switch(d=l.param&15,l.effect){case 1:l.param&&(f.portaU=l.param<<2);break;case 2:l.param&&(f.portaD=l.param<<2);break;case 3:l.param&&e!==15&&(f.portaSpeed=l.param);break;case 4:f.vibratoReset=1;break;case 5:l.param&&(f.volSlide=l.param);break;case 6:l.param&&(f.volSlide=l.param),f.vibratoReset=1;break;case 7:n&&(f.tremoloSpeed=n),d&&(f.tremoloDepth=d);break;case 8:f.panning=l.param,f.flags|=ke;break;case 9:l.param&&(f.sampleOffset=l.param<<8),f.sampleOffset>=f.sample.length&&(f.volume=0,f.sampleOffset=0,f.flags&=~(de|dt),f.flags|=W|ot);break;case 10:l.param&&(f.volSlide=l.param);break;case 11:this.nextOrder=l.param,this.nextOrder>=this.length?this.complete=1:this.nextPosition=0,c=1,this.patternOffset=0;break;case 12:f.volume=l.param,f.flags|=W|ot;break;case 13:this.nextPosition=(n*10+d)*this.channels,this.patternOffset=0,c||(this.nextOrder=this.order+1,this.nextOrder>=this.length&&(this.complete=1,this.nextPosition=-1));break;case 14:switch(n){case 1:d&&(f.finePortaU=d<<2),f.period-=f.finePortaU,f.flags|=de;break;case 2:d&&(f.finePortaD=d<<2),f.period+=f.finePortaD,f.flags|=de;break;case 3:f.glissando=d;break;case 4:f.waveControl=f.waveControl&240|d;break;case 6:d?(f.patternLoop?f.patternLoop--:f.patternLoop=d,f.patternLoop&&(this.nextPosition=f.patternLoopRow)):f.patternLoopRow=this.patternOffset=this.position;break;case 7:f.waveControl=f.waveControl&15|d<<4;break;case 10:d&&(f.fineSlideU=d),f.volume+=f.fineSlideU,f.flags|=W;break;case 11:d&&(f.fineSlideD=d),f.volume-=f.fineSlideD,f.flags|=W;break;case 13:f.delay=f.flags,f.flags=0;break;case 14:this.patternDelay=d*this.timer;break;default:break}break;case 15:if(!l.param)break;l.param<32?this.timer=l.param:this.mixer.samplesTick=this.sampleRate*2.5/l.param>>0;break;case 16:this.master=l.param,this.master>64&&(this.master=64),f.flags|=W;break;case 17:l.param&&(f.volSlideMaster=l.param);break;case 21:if(!f.instrument||!f.instrument.volEnabled)break;for(a=f.instrument,p=l.param,n=a.volData.total,s=0;s<n&&!(p<a.volData.points[s].frame);s++);f.volEnvelope.position=--s,n--,a.volData.flags&Xo&&s===a.volData.loopEnd&&(s=f.volEnvelope.position=a.volData.loopStart,p=a.volData.points[s].frame,f.volEnvelope.frame=p),s>=n?(f.volEnvelope.value=a.volData.points[n].value,f.volEnvelope.stopped=1):(f.volEnvelope.stopped=0,f.volEnvelope.frame=p,p>a.volData.points[s].frame&&f.volEnvelope.position++,o=a.volData.points[s],r=a.volData.points[++s],p=r.frame-o.frame,f.volEnvelope.delta=(p?(r.value-o.value<<8)/p>>0:0)||0,f.volEnvelope.fraction=o.value<<8);break;case 24:l.param&&(f.panSlide=l.param);break;case 27:if(n&&(f.retrigx=n),d&&(f.retrigy=d),!l.volume&&f.retrigy){if(e=this.tick+1,e%f.retrigy)break;l.volume>80&&f.retrigx&&this.retrig(f)}break;case 29:l.param&&(f.tremorOn=++n,f.tremorOff=++d+n);break;case 33:n===1?(d&&(f.xtraPortaU=d),f.period-=f.xtraPortaU,f.flags|=de):n===2&&(d&&(f.xtraPortaD=d),f.period+=f.xtraPortaD,f.flags|=de);break;default:break}f=f.next}++this.tick>=this.timer+this.patternDelay&&(this.patternDelay=this.tick=0,this.nextPosition<0&&(this.nextPosition=this.position+this.channels,(this.nextPosition>=this.pattern.size||this.complete)&&(this.nextOrder=this.order+1,this.nextPosition=this.patternOffset,this.nextOrder>=this.length&&(this.nextOrder=this.restart,this.mixer.complete=1))))}},fast:{value:function(){for(var e,o,a,s,c,r=this.voices[0],n;r;)e=r.channel,a=r.flags,r.flags=0,a&dt&&(e.index=r.sampleOffset,e.pointer=-1,e.dir=0,e.fraction=0,e.sample=r.sample,e.length=r.sample.length,e.enabled=e.sample.data?1:0,r.playing=r.instrument,r.sampleOffset=0),s=r.playing,o=s.vibratoSpeed?r.autoVibrato():0,n=r.volume+r.volDelta,s.volEnabled?(r.volEnabled&&!r.volEnvelope.stopped&&this.envelope(r,r.volEnvelope,s.volData),n=n*r.volEnvelope.value>>6,a|=W,r.fadeEnabled&&(r.fadeVolume-=r.fadeDelta,r.fadeVolume<0?(n=0,r.fadeVolume=0,r.fadeEnabled=0,r.volEnvelope.value=0,r.volEnvelope.stopped=1,r.panEnvelope.stopped=1):n=n*r.fadeVolume>>16)):r.keyoff&&(n=0,a|=W),c=r.panning,s.panEnabled&&(r.panEnabled&&!r.panEnvelope.stopped&&this.envelope(r,r.panEnvelope,s.panData),c=r.panEnvelope.value<<2,a|=ke,c<0?c=0:c>255&&(c=255)),a&W&&(n<0?n=0:n>64&&(n=64),e.volume=Vo[n*this.master>>6],e.lvol=e.volume*e.lpan,e.rvol=e.volume*e.rpan),a&ke&&(e.panning=c,e.lpan=ht[256-c],e.rpan=ht[c],e.lvol=e.volume*e.lpan,e.rvol=e.volume*e.rpan),a&de&&(o+=r.period+r.arpDelta+r.vibDelta,this.linear?e.speed=(548077568*Math.pow(2,(4608-o)/768)/this.sampleRate>>0)/65536:e.speed=(65536*(14317456/o)/this.sampleRate>>0)/65536,e.delta=e.speed>>0,e.speed-=e.delta),r=r.next}},accurate:{value:function(){for(var e,o,a,s,c,r,n,d,u,l=this.voices[0],h;l;){if(e=l.channel,a=l.flags,l.flags=0,a&dt&&(e.sample&&(a|=ot,e.mixCounter=220,e.oldSample=null,e.oldPointer=-1,e.enabled&&(e.oldDir=e.dir,e.oldFraction=e.fraction,e.oldSpeed=e.speed,e.oldSample=e.sample,e.oldPointer=e.pointer,e.oldLength=e.length,e.lmixRampD=e.lvol,e.lmixDeltaD=e.lvol/220,e.rmixRampD=e.rvol,e.rmixDeltaD=e.rvol/220)),e.dir=1,e.fraction=0,e.sample=l.sample,e.pointer=l.sampleOffset,e.length=l.sample.length,e.enabled=e.sample.data?1:0,l.playing=l.instrument,l.sampleOffset=0),s=l.playing,o=s.vibratoSpeed?l.autoVibrato():0,h=l.volume+l.volDelta,s.volEnabled?(l.volEnabled&&!l.volEnvelope.stopped&&this.envelope(l,l.volEnvelope,s.volData),h=h*l.volEnvelope.value>>6,a|=W,l.fadeEnabled&&(l.fadeVolume-=l.fadeDelta,l.fadeVolume<0?(h=0,l.fadeVolume=0,l.fadeEnabled=0,l.volEnvelope.value=0,l.volEnvelope.stopped=1,l.panEnvelope.stopped=1):h=h*l.fadeVolume>>16)):l.keyoff&&(h=0,a|=W),n=l.panning,s.panEnabled&&(l.panEnabled&&!l.panEnvelope.stopped&&this.envelope(l,l.panEnvelope,s.panData),n=l.panEnvelope.value<<2,a|=ke,n<0?n=0:n>255&&(n=255)),!e.enabled){e.volCounter=0,e.panCounter=0,l=l.next;continue}a&W&&(h<0?h=0:h>64&&(h=64),h=Vo[h*this.master>>6],r=h*ht[256-n],u=h*ht[n],h!==e.volume&&!e.mixCounter?(e.volCounter=a&ot?220:this.mixer.samplesTick,e.lvolDelta=(r-e.lvol)/e.volCounter,e.rvolDelta=(u-e.rvol)/e.volCounter):(e.lvol=r,e.rvol=u),e.volume=h),a&ke&&(c=ht[256-n],d=ht[n],n!==e.panning&&!e.mixCounter&&!e.volCounter?(e.panCounter=this.mixer.samplesTick,e.lpanDelta=(c-e.lpan)/e.panCounter,e.rpanDelta=(d-e.rpan)/e.panCounter):(e.lpan=c,e.rpan=d),e.panning=n),a&de&&(o+=l.period+l.arpDelta+l.vibDelta,this.linear?e.speed=(548077568*Math.pow(2,(4608-o)/768)/this.sampleRate>>0)/65536:e.speed=(65536*(14317456/o)/this.sampleRate>>0)/65536),e.mixCounter&&(e.lmixRampU=0,e.lmixDeltaU=e.lvol/220,e.rmixRampU=0,e.rmixDeltaU=e.rvol/220),l=l.next}}},envelope:{value:function(e,o,a){var s=o.position,c=a.points[s],r;if(o.frame===c.frame){if(a.flags&Xo&&s===a.loopEnd&&(s=o.position=a.loopStart,c=a.points[s],o.frame=c.frame),s===a.total-1){o.value=c.value,o.stopped=1;return}if(a.flags&ua&&s===a.sustain&&!e.fadeEnabled){o.value=c.value;return}o.position++,r=a.points[o.position],o.delta=(r.value-c.value<<8)/(r.frame-c.frame)>>0||0,o.fraction=c.value<<8}else o.fraction+=o.delta;o.value=o.fraction>>8,o.frame++}},amiga:{value:function(e,o){var a=0,s=Yi[++e];return o<0?a=(Yi[--e]-s)/64:o>0&&(a=(s-Yi[++e])/64),s-a*o>>0}},retrig:{value:function(e){switch(e.retrigx){case 1:e.volume--;break;case 2:e.volume++;break;case 3:e.volume-=4;break;case 4:e.volume-=8;break;case 5:e.volume-=16;break;case 6:e.volume=(e.volume<<1)/3;break;case 7:e.volume>>=1;break;case 8:e.volume=e.sample.volume;break;case 9:e.volume++;break;case 10:e.volume+=2;break;case 11:e.volume+=4;break;case 12:e.volume+=8;break;case 13:e.volume+=16;break;case 14:e.volume=e.volume*3>>1;break;case 15:e.volume<<=1;break;default:break}e.volume<0?e.volume=0:e.volume>64&&(e.volume=64),e.flags|=W}}}),Object.seal(t)}var de=1,W=2,ke=4,dt=8,fa=15,ot=32,Ho=1,ua=2,Xo=4,da=0,ha=118,Wi=97,pa=[0,-2,-3,-5,-6,-8,-9,-11,-12,-14,-16,-17,-19,-20,-22,-23,-24,-26,-27,-29,-30,-32,-33,-34,-36,-37,-38,-39,-41,-42,-43,-44,-45,-46,-47,-48,-49,-50,-51,-52,-53,-54,-55,-56,-56,-57,-58,-59,-59,-60,-60,-61,-61,-62,-62,-62,-63,-63,-63,-64,-64,-64,-64,-64,-64,-64,-64,-64,-64,-64,-63,-63,-63,-62,-62,-62,-61,-61,-60,-60,-59,-59,-58,-57,-56,-56,-55,-54,-53,-52,-51,-50,-49,-48,-47,-46,-45,-44,-43,-42,-41,-39,-38,-37,-36,-34,-33,-32,-30,-29,-27,-26,-24,-23,-22,-20,-19,-17,-16,-14,-12,-11,-9,-8,-6,-5,-3,-2,0,2,3,5,6,8,9,11,12,14,16,17,19,20,22,23,24,26,27,29,30,32,33,34,36,37,38,39,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,56,57,58,59,59,60,60,61,61,62,62,62,63,63,63,64,64,64,64,64,64,64,64,64,64,64,63,63,63,62,62,62,61,61,60,60,59,59,58,57,56,56,55,54,53,52,51,50,49,48,47,46,45,44,43,42,41,39,38,37,36,34,33,32,30,29,27,26,24,23,22,20,19,17,16,14,12,11,9,8,6,5,3,2],Go=[0,24,49,74,97,120,141,161,180,197,212,224,235,244,250,253,255,253,250,244,235,224,212,197,180,161,141,120,97,74,49,24],ht=[0,.04417,.062489,.076523,.088371,.098821,.108239,.116927,.124977,.132572,.139741,.146576,.153077,.159335,.16535,.171152,.176772,.18221,.187496,.19263,.197643,.202503,.207273,.211951,.216477,.220943,.225348,.229631,.233854,.237985,.242056,.246066,.249985,.253873,.25767,.261437,.265144,.268819,.272404,.275989,.279482,.282976,.286409,.289781,.293153,.296464,.299714,.302965,.306185,.309344,.312473,.315602,.318671,.321708,.324746,.327754,.3307,.333647,.336563,.339449,.342305,.345161,.347986,.350781,.353545,.356279,.359013,.361717,.364421,.367094,.369737,.37238,.374992,.377574,.380157,.382708,.38526,.387782,.390303,.392794,.395285,.397746,.400176,.402606,.405037,.407437,.409836,.412206,.414576,.416915,.419254,.421563,.423841,.42618,.428458,.430737,.432985,.435263,.437481,.439729,.441916,.444134,.446321,.448508,.450665,.452852,.455009,.457136,.459262,.461389,.463485,.465611,.467708,.469773,.471839,.473935,.47597,.478036,.480072,.482077,.484112,.486117,.488122,.490127,.492101,.494106,.496051,.498025,.5,.501944,.503888,.505802,.507746,.50966,.511574,.513488,.515371,.517255,.519138,.521022,.522905,.524758,.526611,.528465,.530318,.53214,.533993,.535816,.537639,.539462,.541254,.543046,.544839,.546631,.548423,.550216,.551978,.553739,.555501,.557263,.558995,.560757,.562489,.56422,.565952,.567683,.569384,.571116,.572817,.574518,.57622,.57789,.579592,.581262,.582964,.584634,.586305,.587946,.589617,.591257,.592928,.594568,.596209,.597849,.599459,.6011,.60271,.60435,.60596,.60757,.60915,.61076,.61237,.61395,.61556,.617139,.618719,.620268,.621848,.623428,.624977,.626557,.628106,.629655,.631205,.632754,.634303,.635822,.637372,.63889,.64044,.641959,.643478,.644966,.646485,.648004,.649523,.651012,.6525,.653989,.655477,.656966,.658454,.659943,.661431,.66289,.664378,.665836,.667294,.668783,.670241,.671699,.673127,.674585,.676043,.677471,.678929,.680357,.681785,.683213,.684641,.686068,.687496,.688894,.690321,.691749,.693147,.694574,.695972,.697369,.698767,.700164,.701561,.702928,.704326,.705723,.70711],Vo=[0,.005863,.013701,.021569,.029406,.037244,.045082,.052919,.060757,.068625,.076463,.0843,.092138,.099976,.107844,.115681,.123519,.131357,.139194,.147032,.1549,.162738,.170575,.178413,.186251,.194119,.201956,.209794,.217632,.225469,.233307,.241175,.249013,.25685,.264688,.272526,.280394,.288231,.296069,.303907,.311744,.319582,.32745,.335288,.343125,.350963,.3588,.366669,.374506,.382344,.390182,.398019,.405857,.413725,.421563,.4294,.437238,.445076,.452944,.460781,.468619,.476457,.484294,.492132,.5],Yi=[29024,27392,25856,24384,23040,21696,20480,19328,18240,17216,16256,15360,14512,13696,12928,12192,11520,10848,10240,9664,9120,8608,8128,7680,7256,6848,6464,6096,5760,5424,5120,4832,4560,4304,4064,3840,3628,3424,3232,3048,2880,2712,2560,2416,2280,2152,2032,1920,1814,1712,1616,1524,1440,1356,1280,1208,1140,1076,1016,960,907,856,808,762,720,678,640,604,570,538,508,480,453,428,404,381,360,339,320,302,285,269,254,240,227,214,202,190,180,169,160,151,142,134,127,120,113,107,101,95,90,85,80,75,71,67,63,60,57,53,50,48,45,42,40,38,36,34,32,30,28],Wo=ca;function Fi(i){return Object.create(null,{index:{value:i,writable:!0},next:{value:null,writable:!0},channel:{value:null,writable:!0},sample:{value:null,writable:!0},enabled:{value:0,writable:!0},period:{value:0,writable:!0},effect:{value:0,writable:!0},param:{value:0,writable:!0},volume:{value:0,writable:!0},portaDir:{value:0,writable:!0},portaPeriod:{value:0,writable:!0},portaSpeed:{value:0,writable:!0},vibratoPos:{value:0,writable:!0},vibratoSpeed:{value:0,writable:!0},initialize:{value:function(){this.channel=null,this.sample=null,this.enabled=0,this.period=0,this.effect=0,this.param=0,this.volume=0,this.portaDir=0,this.portaPeriod=0,this.portaSpeed=0,this.vibratoPos=0,this.vibratoSpeed=0}}})}function ma(i){var t=Pi(i);return Object.defineProperties(t,{id:{value:"MKPlayer"},track:{value:null,writable:!0},patterns:{value:[],writable:!0},samples:{value:[],writable:!0},length:{value:0,writable:!0},restart:{value:0,writable:!0},voices:{value:[],writable:!0},trackPos:{value:0,writable:!0},patternPos:{value:0,writable:!0},jumpFlag:{value:0,writable:!0},vibratoDepth:{value:0,writable:!0},restartSave:{value:0,writable:!0},force:{set:function(e){e<Ki?e=Ki:e>rt&&(e=rt),this.version=e,e===rt?this.vibratoDepth=6:this.vibratoDepth=7,e===Yo?(this.restartSave=this.restart,this.restart=0):(this.restart=this.restartSave,this.restartSave=0)}},initialize:{value:function(){var e=this.voices[0];for(this.reset(),this.force=this.version,this.speed=6,this.trackPos=0,this.patternPos=0,this.jumpFlag=0;e;)e.initialize(),e.channel=this.mixer.channels[e.index],e.sample=this.samples[0],e=e.next}},loader:{value:function(e){var o=0,a,s,c,r,n,d=0,u;if(!(e.length<2106)&&(e.position=1080,s=e.readString(4),!(s!=="M.K."&&s!=="FLT4"))){for(e.position=0,this.title=e.readString(20),this.version=Ki,e.position+=22,a=1;a<32;++a){if(u=e.readUshort(),!u){this.samples[a]=null,e.position+=28;continue}n=Bt(),e.position-=24,n.name=e.readString(22),n.length=u<<1,e.position+=3,n.volume=e.readUbyte(),n.loop=e.readUshort()<<1,n.repeat=e.readUshort()<<1,e.position+=22,n.pointer=d,d+=n.length,this.samples[a]=n,n.length>32768&&(this.version=ga)}for(e.position=950,this.length=e.readUbyte(),u=e.readUbyte(),this.restart=u<this.length?u:0,a=0;a<128;++a)u=e.readUbyte()<<8,this.track[a]=u,u>o&&(o=u);for(e.position=1084,o+=256,this.patterns.length=o,a=0;a<o;++a)if(r=Ci(),u=e.readUint(),r.note=u>>16&4095,r.effect=u>>8&15,r.sample=u>>24&240|u>>12&15,r.param=u&255,this.patterns[a]=r,(r.sample>31||!this.samples[r.sample])&&(r.sample=0),(r.effect===3||r.effect===4)&&(this.version=Yo),(r.effect===5||r.effect===6)&&(this.version=rt),r.effect>6&&r.effect<10){this.version=0;return}for(this.mixer.store(e,d),a=1;a<32;++a)if(n=this.samples[a],!!n)for(n.name.indexOf("2.0")>-1&&(this.version=rt),n.loop?(n.loopPtr=n.pointer+n.loop,n.length=n.loop+n.repeat):(n.loopPtr=this.mixer.memory.length,n.repeat=2),d=n.pointer+4,c=n.pointer;c<d;++c)this.mixer.memory[c]=0;n=Bt(),n.pointer=n.loopPtr=this.mixer.memory.length,n.length=n.repeat=2,this.samples[0]=n,this.version<rt&&this.restart!==127&&(this.version=xa)}}},process:{value:function(){var e,o,a,s,c,r,n,d,u,l=this.voices[0];if(this.tick)for(;l;){if(e=l.channel,!l.effect&&!l.param){e.period=l.period,l=l.next;continue}switch(l.effect){case 0:if(u=this.tick%3,!u){e.period=l.period,l=l.next;continue}for(u===1?u=l.param>>4:u=l.param&15,c=l.period&4095,a=37-u,o=0;o<a;++o)if(c>=Ko[o]){e.period=Ko[o+u];break}break;case 1:l.period-=l.param,l.period<113&&(l.period=113),e.period=l.period;break;case 2:l.period+=l.param,l.period>856&&(l.period=856),e.period=l.period;break;case 3:case 5:l.effect===5?d=1:l.param&&(l.portaSpeed=l.param,l.param=0),l.portaPeriod&&(l.portaDir?(l.period-=l.portaSpeed,l.period<=l.portaPeriod&&(l.period=l.portaPeriod,l.portaPeriod=0)):(l.period+=l.portaSpeed,l.period>=l.portaPeriod&&(l.period=l.portaPeriod,l.portaPeriod=0))),e.period=l.period;break;case 4:case 6:l.effect===6?d=1:l.param&&(l.vibratoSpeed=l.param),u=l.vibratoPos>>2&31,u=(l.vibratoSpeed&15)*ba[u]>>this.vibratoDepth,l.vibratoPos>127?e.period=l.period-u:e.period=l.period+u,u=l.vibratoSpeed>>2&60,l.vibratoPos=l.vibratoPos+u&255;break;case 10:d=1;break;default:break}d&&(u=l.param>>4,d=0,u?l.volume+=u:l.volume-=l.param&15,l.volume<0?l.volume=0:l.volume>64&&(l.volume=64),e.volume=l.volume),l=l.next}else for(s=this.track[this.trackPos]+this.patternPos;l;){switch(e=l.channel,l.enabled=0,r=this.patterns[s+l.index],l.effect=r.effect,l.param=r.param,r.sample?(n=l.sample=this.samples[r.sample],e.volume=l.volume=n.volume):n=l.sample,r.note&&(l.effect===3||l.effect===5?r.note<l.period?(l.portaDir=1,l.portaPeriod=r.note):r.note>l.period?(l.portaDir=0,l.portaPeriod=r.note):l.portaPeriod=0:(l.enabled=1,l.vibratoPos=0,e.enabled=0,e.pointer=n.pointer,e.length=n.length,e.period=l.period=r.note)),l.effect){case 11:this.trackPos=l.param-1,this.jumpFlag^=1;break;case 12:e.volume=l.param,this.version===rt&&(l.volume=l.param);break;case 13:this.jumpFlag^=1;break;case 14:this.mixer.filter.active=l.param^1;break;case 15:u=l.param,u<1?u=1:u>31&&(u=31),this.speed=u,this.tick=0;break;default:break}l.enabled&&(e.enabled=1),e.pointer=n.loopPtr,e.length=n.repeat,l=l.next}++this.tick===this.speed&&(this.tick=0,this.patternPos+=4,(this.patternPos===256||this.jumpFlag)&&(this.patternPos=this.jumpFlag=0,this.trackPos=++this.trackPos&127,this.trackPos===this.length&&(this.trackPos=this.restart,this.mixer.complete=1)))}}}),t.voices[0]=Fi(0),t.voices[0].next=t.voices[1]=Fi(1),t.voices[1].next=t.voices[2]=Fi(2),t.voices[2].next=t.voices[3]=Fi(3),t.track=new Uint16Array(128),Object.seal(t)}var Ki=1,ga=2,Yo=3,xa=4,rt=5,Ko=[856,808,762,720,678,640,604,570,538,508,480,453,428,404,381,360,339,320,302,285,269,254,240,226,214,202,190,180,170,160,151,143,135,127,120,113,0],ba=[0,24,49,74,97,120,141,161,180,197,212,224,235,244,250,253,255,253,250,244,235,224,212,197,180,161,141,120,97,74,49,24],Jo=ma;function Mi(i){return Object.create(null,{index:{value:i,writable:!0},next:{value:null,writable:!0},channel:{value:null,writable:!0},sample:{value:null,writable:!0},enabled:{value:0,writable:!0},loopCtr:{value:0,writable:!0},loopPos:{value:0,writable:!0},step:{value:0,writable:!0},period:{value:0,writable:!0},effect:{value:0,writable:!0},param:{value:0,writable:!0},volume:{value:0,writable:!0},pointer:{value:0,writable:!0},length:{value:0,writable:!0},loopPtr:{value:0,writable:!0},repeat:{value:0,writable:!0},finetune:{value:0,writable:!0},offset:{value:0,writable:!0},portaDir:{value:0,writable:!0},portaPeriod:{value:0,writable:!0},portaSpeed:{value:0,writable:!0},glissando:{value:0,writable:!0},tremoloParam:{value:0,writable:!0},tremoloPos:{value:0,writable:!0},tremoloWave:{value:0,writable:!0},vibratoParam:{value:0,writable:!0},vibratoPos:{value:0,writable:!0},vibratoWave:{value:0,writable:!0},funkPos:{value:0,writable:!0},funkSpeed:{value:0,writable:!0},funkWave:{value:0,writable:!0},initialize:{value:function(){this.channel=null,this.sample=null,this.enabled=0,this.loopCtr=0,this.loopPos=0,this.step=0,this.period=0,this.effect=0,this.param=0,this.volume=0,this.pointer=0,this.length=0,this.loopPtr=0,this.repeat=0,this.finetune=0,this.offset=0,this.portaDir=0,this.portaPeriod=0,this.portaSpeed=0,this.glissando=0,this.tremoloParam=0,this.tremoloPos=0,this.tremoloWave=0,this.vibratoParam=0,this.vibratoPos=0,this.vibratoWave=0,this.funkPos=0,this.funkSpeed=0,this.funkWave=0}}})}function va(){var i=Ci();return Object.defineProperties(i,{step:{value:0,writable:!0}}),Object.seal(i)}function Zo(){var i=Bt();return Object.defineProperties(i,{finetune:{value:0,writable:!0},realLen:{value:0,writable:!0}}),Object.seal(i)}function ya(i){var t=Pi(i);return Object.defineProperties(t,{id:{value:"PTPlayer"},track:{value:null,writable:!0},patterns:{value:[],writable:!0},samples:{value:[],writable:!0},length:{value:0,writable:!0},voices:{value:[],writable:!0},trackPos:{value:0,writable:!0},patternPos:{value:0,writable:!0},patternBreak:{value:0,writable:!0},patternDelay:{value:0,writable:!0},breakPos:{value:0,writable:!0},jumpFlag:{value:0,writable:!0},vibratoDepth:{value:0,writable:!0},force:{set:function(e){e<Li?e=Li:e>Ji&&(e=Ji),this.version=e,e<Qo?this.vibratoDepth=6:this.vibratoDepth=7}},initialize:{value:function(){var e=this.voices[0];for(this.tempo=125,this.speed=6,this.trackPos=0,this.patternPos=0,this.patternBreak=0,this.patternDelay=0,this.breakPos=0,this.jumpFlag=0,this.reset(),this.force=this.version;e;)e.initialize(),e.channel=this.mixer.channels[e.index],e.sample=this.samples[0],e=e.next}},loader:{value:function(e){var o=0,a,s,c,r,n,d=0,u;if(!(e.length<2106)&&(e.position=1080,s=e.readString(4),!(s!=="M.K."&&s!=="M!K!"))){for(e.position=0,this.title=e.readString(20),this.version=Li,e.position+=22,a=1;a<32;++a){if(u=e.readUshort(),!u){this.samples[a]=null,e.position+=28;continue}n=Zo(),e.position-=24,n.name=e.readString(22),n.length=n.realLen=u<<1,e.position+=2,n.finetune=e.readUbyte()*37,n.volume=e.readUbyte(),n.loop=e.readUshort()<<1,n.repeat=e.readUshort()<<1,e.position+=22,n.pointer=d,d+=n.length,this.samples[a]=n}for(e.position=950,this.length=e.readUbyte(),e.position++,a=0;a<128;++a)u=e.readUbyte()<<8,this.track[a]=u,u>o&&(o=u);for(e.position=1084,o+=256,this.patterns.length=o,a=0;a<o;++a)r=va(),r.step=u=e.readUint(),r.note=u>>16&4095,r.effect=u>>8&15,r.sample=u>>24&240|u>>12&15,r.param=u&255,this.patterns[a]=r,(r.sample>31||!this.samples[r.sample])&&(r.sample=0),r.effect===15&&r.param>31&&(this.version=Qo),r.effect===8&&(this.version=Ji);for(this.mixer.store(e,d),a=1;a<32;++a)if(n=this.samples[a],!!n)for(n.loop||n.repeat>4?(n.loopPtr=n.pointer+n.loop,n.length=n.loop+n.repeat):(n.loopPtr=this.mixer.memory.length,n.repeat=2),d=n.pointer+2,c=n.pointer;c<d;++c)this.mixer.memory[c]=0;n=Zo(),n.pointer=n.loopPtr=this.mixer.memory.length,n.length=n.repeat=2,this.samples[0]=n}}},process:{value:function(){var e,o,a,s,c,r,n=this.voices[0];if(this.tick)this.effects();else if(this.patternDelay)this.effects();else{for(a=this.track[this.trackPos]+this.patternPos;n;){if(e=n.channel,n.enabled=0,n.step||(e.period=n.period),s=this.patterns[a+n.index],n.step=s.step,n.effect=s.effect,n.param=s.param,s.sample?(c=n.sample=this.samples[s.sample],n.pointer=c.pointer,n.length=c.length,n.loopPtr=n.funkWave=c.loopPtr,n.repeat=c.repeat,n.finetune=c.finetune,e.volume=n.volume=c.volume):c=n.sample,s.note)if((n.step&4080)===3664)n.finetune=(n.param&15)*37;else if(n.effect===3||n.effect===5)if(s.note===n.period)n.portaPeriod=0;else{for(o=n.finetune,r=o+37;o<r&&!(s.note>=We[o]);++o);o===r&&r--,o>0&&(r=n.finetune/37>>0&8,r&&o--),n.portaPeriod=We[o],n.portaDir=s.note>n.portaPeriod?0:1}else n.effect===9&&this.moreEffects(n);else{this.moreEffects(n),n=n.next;continue}for(o=0;o<37&&!(s.note>=We[o]);++o);if(n.period=We[n.finetune+o],(n.step&4080)===3792){n.funkSpeed&&this.updateFunk(n),this.extended(n),n=n.next;continue}n.vibratoWave<4&&(n.vibratoPos=0),n.tremoloWave<4&&(n.tremoloPos=0),e.enabled=0,e.pointer=n.pointer,e.length=n.length,e.period=n.period,n.enabled=1,this.moreEffects(n),n=n.next}for(n=this.voices[0];n;)e=n.channel,n.enabled&&(e.enabled=1),e.pointer=n.loopPtr,e.length=n.repeat,n=n.next}++this.tick===this.speed&&(this.tick=0,this.patternPos+=4,this.patternDelay&&--this.patternDelay&&(this.patternPos-=4),this.patternBreak&&(this.patternBreak=0,this.patternPos=this.breakPos,this.breakPos=0),(this.patternPos===256||this.jumpFlag)&&(this.patternPos=this.breakPos,this.breakPos=0,this.jumpFlag=0,++this.trackPos===this.length&&(this.trackPos=0,this.mixer.complete=1)))}},effects:{value:function(){for(var e,o,a,s,c,r=this.voices[0],n;r;){if(e=r.channel,r.funkSpeed&&this.updateFunk(r),(r.step&4095)===0){e.period=r.period,r=r.next;continue}switch(r.effect){case 0:if(c=this.tick%3,!c){e.period=r.period,r=r.next;continue}for(c===1?c=r.param>>4:c=r.param&15,o=r.finetune,a=o+37;o<a;++o)if(r.period>=We[o]){e.period=We[o+c];break}break;case 1:r.period-=r.param,r.period<113&&(r.period=113),e.period=r.period;break;case 2:r.period+=r.param,r.period>856&&(r.period=856),e.period=r.period;break;case 3:case 5:if(r.effect===5?s=1:(r.portaSpeed=r.param,r.param=0),r.portaPeriod)if(r.portaDir?(r.period-=r.portaSpeed,r.period<=r.portaPeriod&&(r.period=r.portaPeriod,r.portaPeriod=0)):(r.period+=r.portaSpeed,r.period>=r.portaPeriod&&(r.period=r.portaPeriod,r.portaPeriod=0)),r.glissando){for(o=r.finetune,c=o+37;o<c&&!(r.period>=We[o]);++o);o===c&&o--,e.period=We[o]}else e.period=r.period;break;case 4:case 6:r.effect===6?s=1:r.param&&(c=r.param&15,c&&(r.vibratoParam=r.vibratoParam&240|c),c=r.param&240,c&&(r.vibratoParam=r.vibratoParam&15|c)),a=r.vibratoPos>>2&31,n=r.vibratoWave&3,n?(c=255,a<<=3,n===1&&(r.vibratoPos>127?c-=a:c=a)):c=er[a],c=(r.vibratoParam&15)*c>>this.vibratoDepth,r.vibratoPos>127?e.period=r.period-c:e.period=r.period+c,c=r.vibratoParam>>2&60,r.vibratoPos=r.vibratoPos+c&255;break;case 7:e.period=r.period,r.param&&(c=r.param&15,c&&(r.tremoloParam=r.tremoloParam&240|c),c=r.param&240,c&&(r.tremoloParam=r.tremoloParam&15|c)),a=r.tremoloPos>>2&31,n=r.tremoloWave&3,n?(c=255,a<<=3,n===1&&(r.tremoloPos>127?c-=a:c=a)):c=er[a],c=(r.tremoloParam&15)*c>>6,r.tremoloPos>127?e.volume=r.volume-c:e.volume=r.volume+c,c=r.tremoloParam>>2&60,r.tremoloPos=r.tremoloPos+c&255;break;case 10:s=1;break;case 14:this.extended(r);break;default:break}s&&(s=0,c=r.param>>4,c?r.volume+=c:r.volume-=r.param&15,r.volume<0?r.volume=0:r.volume>64&&(r.volume=64),e.volume=r.volume),r=r.next}}},moreEffects:{value:function(e){var o=e.channel,a;switch(e.funkSpeed&&this.updateFunk(e),e.effect){case 9:e.param&&(e.offset=e.param),a=e.offset<<8,a>=e.length?e.length=2:(e.pointer+=a,e.length-=a);break;case 11:this.trackPos=e.param-1,this.breakPos=0,this.jumpFlag=1;break;case 12:e.volume=e.param,e.volume>64&&(e.volume=64),o.volume=e.volume;break;case 13:this.breakPos=(e.param>>4)*10+(e.param&15),this.breakPos>63?this.breakPos=0:this.breakPos<<=2,this.jumpFlag=1;break;case 14:this.extended(e);break;case 15:if(!e.param)return;e.param<32?this.speed=e.param:this.mixer.samplesTick=this.sampleRate*2.5/e.param>>0,this.tick=0;break;default:break}}},extended:{value:function(e){var o=e.channel,a=e.param>>4,s,c,r,n=e.param&15;switch(a){case 0:this.mixer.filter.active=n;break;case 1:if(this.tick)return;e.period-=n,e.period<113&&(e.period=113),o.period=e.period;break;case 2:if(this.tick)return;e.period+=n,e.period>856&&(e.period=856),o.period=e.period;break;case 3:e.glissando=n;break;case 4:e.vibratoWave=n;break;case 5:e.finetune=n*37;break;case 6:if(this.tick)return;n?(e.loopCtr?e.loopCtr--:e.loopCtr=n,e.loopCtr&&(this.breakPos=e.loopPos<<2,this.patternBreak=1)):e.loopPos=this.patternPos>>2;break;case 7:e.tremoloWave=n;break;case 8:for(c=e.length-2,r=this.mixer.memory,s=e.loopPtr;s<c;)r[s]=(r[s]+r[++s])*.5;r[++s]=(r[s]+r[0])*.5;break;case 9:if(this.tick||!n||!e.period||this.tick%n)return;o.enabled=0,o.pointer=e.pointer,o.length=e.length,o.delay=30,o.enabled=1,o.pointer=e.loopPtr,o.length=e.repeat,o.period=e.period;break;case 10:if(this.tick)return;e.volume+=n,e.volume>64&&(e.volume=64),o.volume=e.volume;break;case 11:if(this.tick)return;e.volume-=n,e.volume<0&&(e.volume=0),o.volume=e.volume;break;case 12:this.tick===n&&(o.volume=e.volume=0);break;case 13:if(this.tick!==n||!e.period)return;o.enabled=0,o.pointer=e.pointer,o.length=e.length,o.delay=30,o.enabled=1,o.pointer=e.loopPtr,o.length=e.repeat,o.period=e.period;break;case 14:if(this.tick||this.patternDelay)return;this.patternDelay=++n;break;case 15:if(this.tick)return;e.funkSpeed=n,n&&this.updateFunk(e);break;default:break}}},updateFunk:{value:function(e){var o=e.channel,a,s,c=wa[e.funkSpeed];e.funkPos+=c,!(e.funkPos<128)&&(e.funkPos=0,this.version===Li?(a=e.pointer+e.sample.realLen-e.repeat,s=e.funkWave+e.repeat,s>a&&(s=e.loopPtr,o.length=e.repeat),o.pointer=e.funkWave=s):(a=e.loopPtr+e.repeat,s=e.funkWave+1,s>=a&&(s=e.loopPtr),this.mixer.memory[s]=-this.mixer.memory[s]))}}}),t.voices[0]=Mi(0),t.voices[0].next=t.voices[1]=Mi(1),t.voices[1].next=t.voices[2]=Mi(2),t.voices[2].next=t.voices[3]=Mi(3),t.track=new Uint16Array(128),Object.seal(t)}var Li=1,Qo=2,Ji=3,We=[856,808,762,720,678,640,604,570,538,508,480,453,428,404,381,360,339,320,302,285,269,254,240,226,214,202,190,180,170,160,151,143,135,127,120,113,0,850,802,757,715,674,637,601,567,535,505,477,450,425,401,379,357,337,318,300,284,268,253,239,225,213,201,189,179,169,159,150,142,134,126,119,113,0,844,796,752,709,670,632,597,563,532,502,474,447,422,398,376,355,335,316,298,282,266,251,237,224,211,199,188,177,167,158,149,141,133,125,118,112,0,838,791,746,704,665,628,592,559,528,498,470,444,419,395,373,352,332,314,296,280,264,249,235,222,209,198,187,176,166,157,148,140,132,125,118,111,0,832,785,741,699,660,623,588,555,524,495,467,441,416,392,370,350,330,312,294,278,262,247,233,220,208,196,185,175,165,156,147,139,131,124,117,110,0,826,779,736,694,655,619,584,551,520,491,463,437,413,390,368,347,328,309,292,276,260,245,232,219,206,195,184,174,164,155,146,138,130,123,116,109,0,820,774,730,689,651,614,580,547,516,487,460,434,410,387,365,345,325,307,290,274,258,244,230,217,205,193,183,172,163,154,145,137,129,122,115,109,0,814,768,725,684,646,610,575,543,513,484,457,431,407,384,363,342,323,305,288,272,256,242,228,216,204,192,181,171,161,152,144,136,128,121,114,108,0,907,856,808,762,720,678,640,604,570,538,508,480,453,428,404,381,360,339,320,302,285,269,254,240,226,214,202,190,180,170,160,151,143,135,127,120,0,900,850,802,757,715,675,636,601,567,535,505,477,450,425,401,379,357,337,318,300,284,268,253,238,225,212,200,189,179,169,159,150,142,134,126,119,0,894,844,796,752,709,670,632,597,563,532,502,474,447,422,398,376,355,335,316,298,282,266,251,237,223,211,199,188,177,167,158,149,141,133,125,118,0,887,838,791,746,704,665,628,592,559,528,498,470,444,419,395,373,352,332,314,296,280,264,249,235,222,209,198,187,176,166,157,148,140,132,125,118,0,881,832,785,741,699,660,623,588,555,524,494,467,441,416,392,370,350,330,312,294,278,262,247,233,220,208,196,185,175,165,156,147,139,131,123,117,0,875,826,779,736,694,655,619,584,551,520,491,463,437,413,390,368,347,328,309,292,276,260,245,232,219,206,195,184,174,164,155,146,138,130,123,116,0,868,820,774,730,689,651,614,580,547,516,487,460,434,410,387,365,345,325,307,290,274,258,244,230,217,205,193,183,172,163,154,145,137,129,122,115,0,862,814,768,725,684,646,610,575,543,513,484,457,431,407,384,363,342,323,305,288,272,256,242,228,216,203,192,181,171,161,152,144,136,128,121,114,0],er=[0,24,49,74,97,120,141,161,180,197,212,224,235,244,250,253,255,253,250,244,235,224,212,197,180,161,141,120,97,74,49,24],wa=[0,5,6,7,8,10,11,13,16,19,22,26,32,43,64,128],tr=ya;function ka(){var i=Object.create(null,{player:{value:null,writable:!0},index:{value:0,writable:!0},amiga:{value:null,writable:!0},mixer:{value:null,writable:!0},tracker:{get:function(){return this.player?ir[this.index+this.player.version]:ir[0]}},load:{value:function(t){var e,o;if(t.view||(t=Xi(t)),t.endian=1,t.position=0,t.readUint()===67324752&&window.neoart.Unzip,!t)return null;if(this.player&&this.player.id!=="STPlayer"&&(this.player.load(t),this.player.version))return this.player;if(t.length>336&&(t.position=38,e=t.readString(20),(e==="FastTracker v2.00   "||e==="FastTracker v 2.00  "||e==="Sk@le Tracker"||e==="MadTracker 2.0"||e==="MilkyTracker        "||e==="DigiBooster Pro 2.18"||e.indexOf("OpenMPT")!==-1)&&(this.player=Wo(this.mixer),this.player.load(t),this.player.version)))return this.index=La,this.player;if(t.endian=0,t.length>2105){if(t.position=1080,e=t.readString(4),e==="M.K."||e==="FLT4"){if(this.player=Jo(this.amiga),this.player.load(t),this.player.version)return this.index=Ea,this.player}else if(e==="FEST"&&(this.player=window.neoart.HMPlayer(this.amiga),this.player.load(t),this.player.version))return this.index=Pa,this.player}return t.length>2105&&(t.position=1080,e=t.readString(4),(e==="M.K."||e==="M!K!")&&(this.player=tr(this.amiga),this.player.load(t),this.player.version))?(this.index=Ca,this.player):t.length>5220&&(this.player=window.neoart.S1Player(this.amiga),this.player.load(t),this.player.version)?(this.index=Ta,this.player):(t.position=0,o=t.readUshort(),t.position=0,e=t.readString(4),(e==="COSO"||o===24576||o===24578||o===24590||o===24598)&&(this.player=window.neoart.JHPlayer(this.amiga),this.player.load(t),this.player.version)?(this.index=Fa,this.player):(t.position=0,o=t.readUshort(),this.player=window.neoart.DWPlayer(this.amiga),this.player.load(t),this.player.version?(this.index=_a,this.player):(t.position=0,o=t.readUshort(),o===24576&&(this.player=window.neoart.RHPlayer(this.amiga),this.player.load(t),this.player.version)?(this.index=Ma,this.player):t.length>1625&&(this.player=window.neoart.STPlayer(this.amiga),this.player.load(t),this.player.version)?(this.index=Sa,this.player):(t.clear(),this.index=0,this.player=null))))}}});return i.amiga=Gi(),Object.seal(i)}var Sa=0,Ea=4,Ca=9,Pa=12,Ta=26,_a=28,Fa=30,Ma=32,La=33,ir=["Unknown Format","Ultimate SoundTracker","D.O.C. SoundTracker 9","Master SoundTracker","D.O.C. SoundTracker 2.0/2.2","SoundTracker 2.3","SoundTracker 2.4","NoiseTracker 1.0","NoiseTracker 1.1","NoiseTracker 2.0","ProTracker 1.0","ProTracker 1.1/2.1","ProTracker 1.2/2.0","His Master's NoiseTracker","SoundFX 1.0/1.7","SoundFX 1.8","SoundFX 1.945","SoundFX 1.994/2.0","BP SoundMon V1","BP SoundMon V2","BP SoundMon V3","Delta Music 1.0","Delta Music 2.0","Digital Mugician","Digital Mugician 7 Voices","Future Composer 1.0/1.3","Future Composer 1.4","SidMon 1.0","SidMon 2.0","David Whittaker","FredEd","Jochen Hippel","Jochen Hippel COSO","Rob Hubbard","FastTracker II","Sk@leTracker","MadTracker 2.0","MilkyTracker","DigiBooster Pro 2.18","OpenMPT"],Aa=ka(),or=Aa;var Ai=class{constructor(t={}){this.baseRawUrl="https://raw.githubusercontent.com/michioxd/keygen-music/master/",this.indexUrl=this.baseRawUrl+"index.json",this.trackList=[],this.history=[],this.maxHistory=50,this.historyCursor=-1,this.currentPlayer=null,this.isPlaying=!1,this.pollInterval=null,this._opId=0,this.onTrackChange=t.onTrackChange||(()=>{}),this.onError=t.onError||(()=>{}),this.hasFetchedIndex=!1,this.currentTrack=null}async init(){if(!this.hasFetchedIndex)try{let t=await fetch(this.indexUrl);if(!t.ok)throw new Error("Network response was not ok");let e=await t.json(),o=["xm","mod","s3m","it"];this.trackList=e.filter(a=>a.fileExtension&&o.includes(a.fileExtension.toLowerCase())),this.hasFetchedIndex=!0}catch(t){throw console.warn("[Jukebox] Offline or failed to fetch track index:",t.message),this.trackList=[],this.onError("NO INTERNET OR BLOCKED ... TRY AGAIN?"),t}}async playNext(t=null){this.stop();let e=++this._opId;try{if(!this.hasFetchedIndex&&(await this.init(),e!==this._opId))return;if(this.trackList.length===0){console.warn("[Jukebox] Track list is empty \u2014 no tracks to play.");return}let o=null;if(t&&typeof t=="object"){let{title:a,trackTitle:s,artist:c}=t,r=this.trackList.filter(n=>{let d=!c||n.artist&&n.artist.toLowerCase()===c.toLowerCase(),u=!a||n.title&&n.title.toLowerCase()===a.toLowerCase(),l=!s||n.trackTitle&&n.trackTitle.toLowerCase()===s.toLowerCase();return d&&u&&l});r.length===0?console.warn("[Jukebox] No matches for target object \u2014 playing random:",t):r.length>1&&console.warn(`[Jukebox] ${r.length} ambiguous matches for target object \u2014 using first. Refine your search:`,r),o=r[0]||null}else if(t&&typeof t=="string"){let a=this.trackList.filter(s=>s.title&&s.title.toLowerCase()===t.toLowerCase());a.length===0?console.warn("[Jukebox] No matches for target title string \u2014 playing random:",t):a.length>1&&console.warn(`[Jukebox] ${a.length} ambiguous matches for title string \u2014 using first:`,a),o=a[0]||null}if(!o&&!t&&this.historyCursor<this.history.length-1)this.historyCursor++,o=this.trackList[this.history[this.historyCursor]];else if(!o){let a=this.trackList.filter((r,n)=>!this.history.includes(n));a.length===0&&(this.history=[],this.historyCursor=-1);let s=a.length>0?a:this.trackList;o=s[Math.floor(Math.random()*s.length)];let c=this.trackList.indexOf(o);this.historyCursor<this.history.length-1&&(this.history=this.history.slice(0,this.historyCursor+1)),this.history.push(c),this.history.length>this.maxHistory&&this.history.shift(),this.historyCursor=this.history.length-1}await this._playTrack(o,e)}catch(o){console.warn("[Jukebox] Track fetch failed \u2014 network issue?",o.message),this.onError("NO INTERNET OR BLOCKED ... TRY AGAIN?")}}async playPrevious(){if(this.historyCursor>0){this.stop();let t=++this._opId;this.historyCursor--;let e=this.trackList[this.history[this.historyCursor]];try{await this._playTrack(e,t)}catch(o){console.warn("[Jukebox] Previous track fetch failed:",o.message),this.onError("NO INTERNET OR BLOCKED ... TRY AGAIN?")}}}async _playTrack(t,e){let o=t.path.split("/").map(n=>encodeURIComponent(n)).join("/"),a=this.baseRawUrl+o,s=await fetch(a);if(!s.ok)throw new Error("Failed to fetch audio file");if(e!==this._opId)return;let c=await s.arrayBuffer();if(e!==this._opId)return;let r=null;try{r=or.load(c)}catch(n){console.warn(`[Jukebox] Unsupported format for "${t.title}" \u2014 skipping:`,n.message),e===this._opId&&setTimeout(()=>this.playNext(),100);return}e===this._opId&&(this.currentPlayer=r,this.currentPlayer?(this.currentTrack=t,typeof this.currentPlayer.loopSong<"u"&&(this.currentPlayer.loopSong=1),this.currentPlayer.play(),this.isPlaying=!0,this.onTrackChange(t),this.setupCompletionPolling()):setTimeout(()=>this.playNext(),100))}setupCompletionPolling(){this.pollInterval&&clearInterval(this.pollInterval),this.pollInterval=setInterval(()=>{if(!this.currentPlayer)return this.stopPolling();let t=!1;this.currentPlayer.amiga&&this.currentPlayer.amiga.playing===!1&&(t=!0),this.currentPlayer.mixer&&this.currentPlayer.mixer.playing===!1&&(t=!0),this.currentPlayer.stopped&&(t=!0),this.currentPlayer.playing===!1&&(t=!0),t&&this.playNext()},1e3)}stopPolling(){this.pollInterval&&(clearInterval(this.pollInterval),this.pollInterval=null)}stop(){if(this._opId++,this.stopPolling(),this.isPlaying=!1,this.currentPlayer){try{this.currentPlayer.stop()}catch{}this.currentPlayer=null}}};function rr(i,t,e){let o=document.getElementById("afx-audio-toggle");if(!o)return;let a=document.getElementById("afx-bgm-status");if(o.checked&&e.classList.add("afx-music-playing"),i.jukebox)try{i.jukebox.stop()}catch(r){console.warn("[AnkiFX] Error stopping old jukebox:",r.message)}i.jukebox=new Ai({onTrackChange:r=>{let n=`NOW PLAYING: ${r.artist} - ${r.title} - ${r.trackTitle}`;t.marquee=n,i.marquee&&i.marquee.setText(n)},onError:r=>{t.marquee=r,i.marquee&&i.marquee.setText(r)}}),o.addEventListener("change",r=>{let n=r.target.checked,d=Rt();if(n){e.classList.add("afx-bgm-active"),e.classList.add("afx-music-playing"),a.innerHTML=d?"\u{1F50A}":"\u{1F50A} BGM: ON";let u=window.AudioContext||window.webkitAudioContext;u&&(window.neoart=window.neoart||{},window.neoart.audioContext||(window.neoart.audioContext=new u)),window.neoart.audioContext&&window.neoart.audioContext.state==="suspended"&&window.neoart.audioContext.resume();let l=localStorage.getItem("ankifx_preferred_effect")||t.defaultEffect||"geometry",h=t.trackTitle||i.EFFECT_SONG_MAP[l]||null;i.jukebox.playNext(h)}else e.classList.remove("afx-bgm-active"),e.classList.remove("afx-music-playing"),a.innerHTML=d?"\u{1F507}":"\u{1F507} BGM: OFF",i.jukebox.stop(),t.marquee=i.defaultMarqueeText,i.marquee&&i.marquee.setText(i.defaultMarqueeText)});let s=document.getElementById("afx-btn-back"),c=document.getElementById("afx-btn-skip");s&&s.addEventListener("click",r=>{r.stopPropagation(),i.jukebox&&i.jukebox.isPlaying&&i.jukebox.playPrevious()}),c&&c.addEventListener("click",r=>{r.stopPropagation(),i.jukebox&&i.jukebox.isPlaying&&i.jukebox.playNext()})}function ar(i,t,e,o){let a=document.getElementById("afx-effect-selector");a&&a.addEventListener("change",s=>{let c=s.target.value;if(localStorage.setItem("ankifx_preferred_effect",c),Object.values(oe).forEach(r=>r.stop()),i.ctx2D&&i.ctx2D.clearRect(0,0,i.width,i.height),i.glContext&&(i.glContext.clearColor(0,0,0,0),i.glContext.clear(i.glContext.COLOR_BUFFER_BIT)),t.defaultEffect=c,c==="debug"?e.classList.add("afx-debug-active"):e.classList.remove("afx-debug-active"),Ut(i,t,o,t.marqueePosition,c),i.jukebox&&i.jukebox.isPlaying){let r=t.trackTitle||i.EFFECT_SONG_MAP[c]||null,n=i.jukebox.currentTrack,d=!1;r&&(typeof r=="string"?d=!n||n.title.toLowerCase()!==r.toLowerCase():d=!n||r.title&&n.title.toLowerCase()!==r.title.toLowerCase()||r.trackTitle&&n.trackTitle.toLowerCase()!==r.trackTitle.toLowerCase()||r.artist&&(n.artist||"").toLowerCase()!==r.artist.toLowerCase()),d&&i.jukebox.playNext(r)}})}function nr(i,t,e){let o=document.createElement("div");o.id="ankifx-overlay",t.debug&&o.classList.add("afx-debug-active");let a=window.innerWidth||document.documentElement.clientWidth||800,s=a<480?.65:a<768?.8:1,c=Math.max(55,Math.ceil(85*s));Po()&&(t.marqueePosition==="top"?o.style.paddingTop=`calc(1rem + ${c}px)`:o.style.paddingBottom=`calc(1rem + ${c}px)`);let r=ut(),n=Rt(),d=n?"\u{1F4DC} ":"\u{1F4DC} TEXT: ",u=n?"":" BGM: ",l=n?d.trim():r?`${d}ON`:`${d}OFF`,h=n?"\u{1F507}":`\u{1F507}${u}OFF`,x=n?"\u{1F3A8} ":"[ Effect: ",p=n?"":" ]",f=Object.values(oe).filter(F=>F.id!=="debug"||t.debug).map(F=>`
            <option value="${F.id}" ${e===F.id?"selected":""}>
                ${x}${F.name}${p}
            </option>
        `).join(""),b=`
        <div id="afx-bottom-dock">
            <div class="afx-control-group-left">
                <div class="afx-control-row">
                    <label class="afx-toggle"><input type="checkbox" id="afx-text-toggle" ${r?"checked":""}><span class="afx-slider"></span></label>
                    <span id="afx-text-status">${l}</span>
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
    `,v=!1;try{v=localStorage.getItem(`ankifx_agreed_${t.deckTitle}`)==="true"}catch{}let m=t.termsText&&typeof t.termsText=="string"&&t.termsText.trim()!==""&&!v;m&&(o.innerHTML=`
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
        `);let E=document.createElement("div");for(E.innerHTML=b;E.firstChild;)o.appendChild(E.firstChild);let y=document.createElement("div");y.id="ankifx-background",document.body.appendChild(y),i.sharedGL=document.createElement("canvas"),i.sharedGL.id="afx-shared-gl",i.sharedGL.className="afx-shared-canvas",y.appendChild(i.sharedGL),i.shared2D=document.createElement("canvas"),i.shared2D.id="afx-shared-2d",i.shared2D.className="afx-shared-canvas",y.appendChild(i.shared2D),i.sharedMarquee=document.createElement("canvas"),i.sharedMarquee.id="afx-shared-marquee",i.sharedMarquee.className="afx-shared-canvas afx-shared-marquee-canvas",y.appendChild(i.sharedMarquee),i.glContext=i.sharedGL.getContext("webgl",{alpha:!1,antialias:!1}),i.ctx2D=i.shared2D.getContext("2d"),i.ctxMarquee=i.sharedMarquee.getContext("2d"),document.body.appendChild(o);let T=document.createElement("div");T.id="afx-top-dock";let w=document.createElement("div");w.className="afx-top-group-left",w.id="afx-top-group-left";let k=document.createElement("div");k.className="afx-top-group-right",k.id="afx-top-group-right";let C=document.createElement("button");C.id="afx-btn-back",C.className="afx-playback-btn",C.textContent="\u23EE\uFE0F";let g=document.createElement("button");if(g.id="afx-btn-skip",g.className="afx-playback-btn",g.textContent="\u23ED\uFE0F",w.appendChild(C),k.appendChild(g),t.debug){let F=document.createElement("div");F.id="afx-global-fps",F.className="afx-global-fps",F.textContent="FPS: --",w.appendChild(F)}T.appendChild(w),T.appendChild(k),o.appendChild(T);let I=F=>{let V=o.classList.contains("afx-agreed-state"),M=F.target.closest("button, input, select, .afx-slider, .afx-toggle, .afx-playback-btn, select option");V?M&&F.stopPropagation():F.stopPropagation()};["touchstart","touchend","mousedown","mouseup","pointerdown","pointerup","click"].forEach(F=>{o.addEventListener(F,I,{passive:!1})});let D=document.getElementById("afx-consent-btn");m&&D?zo(i,t,o,D):window.AnkiFX.agree(o,t.deckTitle),rr(i,t,o);let q=document.getElementById("afx-text-toggle");if(q){let F=document.getElementById("afx-text-status");q.addEventListener("change",V=>{let M=V.target.checked,H=Rt();localStorage.setItem("ankifx_marquee_enabled",M);let X=H?"\u{1F4DC} ":"\u{1F4DC} TEXT: ";F.textContent=H?X.trim():M?`${X}ON`:`${X}OFF`,i.marquee&&(i.marquee.enabled=M)})}return ar(i,t,o,y),{overlay:o,background:y}}var lr=["ankifx-overlay","ankifx-background","afx-btn-back","afx-btn-skip","afx-bottom-dock","afx-top-dock"],S={marquee:null,jukebox:null,sharedGL:null,shared2D:null,sharedMarquee:null,glContext:null,ctx2D:null,ctxMarquee:null,currentEffectId:null,dpr:1,width:0,height:0,marqueeInterval:null,defaultMarqueeText:null,EFFECT_SONG_MAP:{},_layoutHandler:null,_resizeTimeout:null,_resizeInterval:null,observer:null,dockObserver:null,initialized:!1};function Ia(i={}){console.log(`[AnkiFX] Init \u2192 v${Te.version} (${Te.source})`);let t=To(i);if(document.getElementById("ankifx-overlay")&&Fo(S,t)){S.initialized=!0,sr(),(window.requestIdleCallback||function(c){setTimeout(c,0)})(()=>{Zi()});return}document.documentElement.classList.remove("afx-scroll-lock"),document.documentElement.classList.remove("afx-agreed"),lr.forEach(s=>{let c=document.getElementById(s);c&&c.remove()}),S.defaultMarqueeText=t.marquee,S.EFFECT_SONG_MAP={},Object.entries(oe).forEach(([s,c])=>{c&&c.preferredTrack&&(S.EFFECT_SONG_MAP[s]=c.preferredTrack)}),cr();let e=_o(t),{background:o}=nr(S,t,e);Io(S),Ao(S),Ve(S),Lo(S),S.marquee?(S.marquee.setText(t.marquee),S.marquee.setPosition(t.marqueePosition)):(S.marquee=new bi(t.marquee,t.marqueePosition),Hi(S)),Ut(S,t,o,t.marqueePosition,e),S.marquee&&(S.marquee.enabled=ut()),S.initialized=!0,Do(S),wi(S),sr(),(window.requestIdleCallback||function(s){setTimeout(s,0)})(()=>{Zi()})}function cr(){if(document.getElementById("ankifx-styles"))return;let i=document.createElement("style");i.id="ankifx-styles",i.textContent=Co,document.head.appendChild(i)}function Da(i,t){if(i.classList.add("afx-agreed-state"),document.documentElement.classList.add("afx-agreed"),document.documentElement.classList.remove("afx-scroll-lock"),t)try{localStorage.setItem(`ankifx_agreed_${t}`,"true")}catch{}wi(S)}function za(){S.currentEffectId&&oe[S.currentEffectId]?.stop&&oe[S.currentEffectId].stop(),S.jukebox&&(S.jukebox.stop(),S.jukebox=null),S.marqueeInterval&&(cancelAnimationFrame(S.marqueeInterval),S.marqueeInterval=null),S.marquee=null;let i=document.getElementById("_flag"),t=document.getElementById("_mark");i&&document.body.appendChild(i),t&&document.body.appendChild(t),lr.forEach(s=>{let c=document.getElementById(s);c&&c.remove()});let e=document.getElementById("ankifx-styles");if(e&&e.remove(),document.documentElement.style.removeProperty("--afx-viewport-height"),document.documentElement.style.removeProperty("--afx-dock-height"),document.documentElement.classList.remove("afx-scroll-lock"),document.documentElement.classList.remove("afx-agreed"),Array.from(document.documentElement.classList).forEach(s=>{s.startsWith("afx-effect-")&&document.documentElement.classList.remove(s)}),window.AnkiFX_Config=null,S._observerTimeout&&(clearTimeout(S._observerTimeout),S._observerTimeout=null),S.observer&&(S.observer.disconnect(),S.observer=null),S.dockObserver&&(S.dockObserver.disconnect(),S.dockObserver=null),S._layoutHandler&&(window.removeEventListener("orientationchange",S._layoutHandler),window.removeEventListener("resize",S._layoutHandler),S._layoutHandler=null),S._resizeTimeout&&(clearTimeout(S._resizeTimeout),S._resizeTimeout=null),S._resizeInterval&&(clearInterval(S._resizeInterval),S._resizeInterval=null),S.glContext){if(typeof S.glContext.getExtension=="function"){let s=S.glContext.getExtension("WEBGL_lose_context");s&&s.loseContext()}S.glContext=null}S.sharedGL=null,S.shared2D=null,S.sharedMarquee=null,S.ctx2D=null,S.ctxMarquee=null,S.currentEffectId=null,S.initialized=!1,at&&(window.removeEventListener("ankifx:template-status",at),at=null),Ii=null;let o=document.getElementById("afx-legacy-toast");o&&o.remove();let a=document.getElementById("afx-update-notice");a&&a.remove(),console.log("[AnkiFX] Destroyed.")}var fr={};function Ra(i){try{if(typeof sessionStorage<"u")return sessionStorage.getItem(i)}catch{}return null}function Oa(i,t){try{if(typeof sessionStorage<"u")return sessionStorage.setItem(i,t),!0}catch{}return!1}function Ua(i){let t=`afx_legacy_toast_${i}`,e=Ra(t);return e!==null?e==="true":!!fr[t]}function Ba(i){let t=`afx_legacy_toast_${i}`;Oa(t,"true")||(fr[t]=!0)}function Zi(){if(!window.AnkiFX||!window.AnkiFX.initialized)return;let i=document.getElementById("ankifx-template-meta"),t=!1,e="unknown";if(!i)t=!0;else{let o=i.getAttribute("data-template-name"),a=i.getAttribute("data-template-version");o?e=o.trim():t=!0,(!a||a.trim()==="")&&(t=!0)}t&&ur(e)}var Ii=null,at=null;function qt(i){return i?String(i).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"):""}function sr(){at&&window.removeEventListener("ankifx:template-status",at),Ii=null;let i=t=>{if(!t||!t.isNewer||Ii)return;let e=document.getElementById("afx-update-banner-root");if(!e||e.children.length>0||document.getElementById("afx-update-notice"))return;Ii="outdated";let o=`afx_dismiss_${t.name}_${t.local}`;if((()=>{try{if(sessionStorage.getItem(o)==="true")return!0}catch{}try{if(localStorage.getItem(o)==="true")return!0}catch{}return!1})())return;let s=()=>{try{sessionStorage.setItem(o,"true")}catch{}try{localStorage.setItem(o,"true")}catch{}},c=document.createElement("div");c.id="afx-update-notice",c.className="afx-update-notice";let r=t.changelog?` (${qt(t.changelog)})`:"";c.innerHTML=`
            <div class="afx-update-notice-content">
                <div class="afx-update-notice-title">Template Update Available</div>
                <div>
                    Card template is v${qt(t.local)}. Latest is v${qt(t.remote)}${r}.<br>
                    Please visit <a class="afx-update-notice-link" href="${qt(t.targetUrl)}" target="_blank">${qt(t.displayUrl)}</a> and copy the latest template.
                </div>
            </div>
            <button class="afx-update-notice-close" title="Dismiss">&times;</button>
        `,c.querySelector(".afx-update-notice-close").addEventListener("click",l=>{l.stopPropagation(),c.classList.remove("afx-visible"),s(),setTimeout(()=>c.remove(),400)});let d=c.querySelector(".afx-update-notice-link");d&&d.addEventListener("click",l=>l.stopPropagation());let u=l=>l.stopPropagation();["touchstart","touchend","mousedown","mouseup","click"].forEach(l=>{c.addEventListener(l,u,{passive:!0})}),requestAnimationFrame(()=>{e.appendChild(c),requestAnimationFrame(()=>{c.classList.add("afx-visible")})})};at=t=>{i(t.detail)},window.addEventListener("ankifx:template-status",at),window.dispatchEvent(new CustomEvent("ankifx:request-template-status"))}function ur(i="unknown"){if(Ua(i)||document.getElementById("afx-legacy-toast"))return;let t=document.createElement("div");t.id="afx-legacy-toast",t.className="afx-legacy-toast-container",t.innerHTML=`
        <div class="afx-legacy-toast-content">
            <div class="afx-legacy-toast-title">Legacy Template Detected</div>
            <div>
                An update is required for full AnkiFX compatibility.<br>
                Please see the <a class="afx-legacy-toast-link" href="https://github.com/robkipa/ankifx/blob/main/docs/template-migration-guide.md" target="_blank">Template Update Guide</a> for step-by-step instructions.
            </div>
        </div>
        <button class="afx-legacy-toast-close" title="Dismiss">&times;</button>
    `,t.querySelector(".afx-legacy-toast-close").addEventListener("click",s=>{s.stopPropagation(),t.classList.remove("afx-legacy-visible"),Ba(i),setTimeout(()=>{t.remove()},400)});let o=t.querySelector(".afx-legacy-toast-link");o&&o.addEventListener("click",s=>{s.stopPropagation()});let a=s=>s.stopPropagation();["touchstart","touchend","mousedown","mouseup","click"].forEach(s=>{t.addEventListener(s,a,{passive:!0})}),document.body.appendChild(t),requestAnimationFrame(()=>{requestAnimationFrame(()=>{t.classList.add("afx-legacy-visible")})})}var Di="local";try{let i=typeof __ankifx_script_src=="string"?__ankifx_script_src:"";if(!i){let e=(new Error().stack||"").match(/(https?:\/\/[^\s)\n:]+|file:\/\/[^\s)\n:]+)/g);if(e&&e.length>0){for(let o=0;o<e.length;o++)if(e[o].includes("ankifx")){i=e[o];break}}}i&&(i.includes("cdn.jsdelivr.net")||i.includes("github")||i.includes("rawgit")||i.includes("githack")?Di="remote":Di="local")}catch{Di="detection-failed"}var qa="1.0.0-6d5b438",Na="2026-06-09T10:12:02.510Z",ja=Di,Te={init:Ia,destroy:za,agree:Da,injectCSS:cr,handleResize:()=>Ve(S),startEffect:(i,t,e,o)=>Ut(S,i,t,e,o),startMarqueeLoop:()=>Hi(S),renderEffectControls:Ot,setControlValue:Mo,detectLegacyTemplate:Zi,showLegacyMigrationToast:ur,get version(){return qa},get buildDate(){return Na},get source(){return ja},get marquee(){return S.marquee},set marquee(i){S.marquee=i},get jukebox(){return S.jukebox},set jukebox(i){S.jukebox=i},get currentEffectId(){return S.currentEffectId},get defaultMarqueeText(){return S.defaultMarqueeText},get EFFECT_SONG_MAP(){return S.EFFECT_SONG_MAP},get initialized(){return!!S.initialized}};function dr(i){if(!i)return{parts:[0,0,0],isPre:!1,preType:3,preNumber:0};let t=String(i).replace(/^v/,""),e=t.indexOf("+");e!==-1&&(t=t.substring(0,e));let o=t.indexOf("-"),a=o!==-1,s=a?t.substring(0,o):t,c=a?t.substring(o+1).toLowerCase():"",r=s.split(".").map(u=>{let l=parseInt(u,10);return isNaN(l)?0:l}),n=3,d=0;if(a){c.indexOf("alpha")!==-1?n=0:c.indexOf("beta")!==-1?n=1:c.indexOf("rc")!==-1&&(n=2);let u=c.match(/\d+/);u&&(d=parseInt(u[0],10))}return{parts:[r[0]||0,r[1]||0,r[2]||0],isPre:a,preType:n,preNumber:d}}function hr(i,t){let e=dr(i),o=dr(t);for(let a=0;a<3;a++){if(e.parts[a]>o.parts[a])return!0;if(e.parts[a]<o.parts[a])return!1}return e.preType>o.preType?!0:e.preType<o.preType?!1:e.preNumber>o.preNumber}var pr=[];try{let i=sessionStorage.getItem("ankifx_eval_history");i&&(pr=JSON.parse(i))}catch{}window.AnkiFX_Eval_History=window.AnkiFX_Eval_History||pr;var mr=[];try{let i=sessionStorage.getItem("ankifx_loader_logs");i&&(mr=JSON.parse(i))}catch{}window.AnkiFX_Loader_Logs=window.AnkiFX_Loader_Logs||mr;var pt=i=>{window.AnkiFX_Loader_Logs.push(i);try{sessionStorage.setItem("ankifx_loader_logs",JSON.stringify(window.AnkiFX_Loader_Logs))}catch{}},Ue=window.AnkiFX,Ye=Te.version,Ke=Ue&&Ue.version,$a=Ue&&Ue.initialized,gr=!1,xr="",Ha=!Ue||hr(Ye,Ke);if(Ha)if($a){console.info(`[Loader] Newer engine version v${Ye} (${Te.source}) loaded late. Upgrading and replacing active engine v${Ke} (${Ue.source})...`),pt({msg:`[Loader] Late takeover triggered: Upgrading active engine from v${Ke} to v${Ye}...`,level:"info"});let i=window.AnkiFX_Config;try{Ue.destroy(),pt({msg:`[Loader] Active engine v${Ke} destroyed successfully.`,level:"success"})}catch(t){console.error(`[Loader] Error destroying old engine: ${t.message}`),pt({msg:`[Loader] Error destroying active engine: ${t.message}`,level:"error"})}i&&(window.AnkiFX_Config=i),window.AnkiFX=Te;try{window.AnkiFX.init(window.AnkiFX_Config),pt({msg:`[Loader] Upgraded AnkiFX engine to v${Ye} successfully.`,level:"success"})}catch(t){console.error(`[Loader] Error initializing upgraded engine: ${t.message}`),pt({msg:`[Loader] Upgraded AnkiFX engine initialization failed: ${t.message}`,level:"error"})}}else Ue&&(console.info(`[Loader] Newer engine version v${Ye} (${Te.source}) replacing uninitialized engine v${Ke} (${Ue.source}).`),pt({msg:`[Loader] Pre-init takeover: Replacing local v${Ke} with remote v${Ye}...`,level:"info"})),window.AnkiFX=Te;else gr=!0,xr=`ignored (older or equal version: active=${Ke}, incoming=${Ye})`,console.info(`[Loader] Incoming engine v${Ye} is not newer than active engine v${Ke}. Ignoring.`);window.AnkiFX_Eval_History.push({source:Te.source,version:Te.version,buildDate:Te.buildDate,time:new Date().toLocaleTimeString(),status:gr?xr:"active"});try{sessionStorage.setItem("ankifx_eval_history",JSON.stringify(window.AnkiFX_Eval_History))}catch{}})();
