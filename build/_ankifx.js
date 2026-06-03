var __ankifx_script_src=(document.currentScript&&document.currentScript.src)||"";
(()=>{var di=[],Fe=null,_i=60,Ii=1.5,Li={id:"aurora",name:"Aurora",run:Hr,stop:Xr,drawOverlay:$r,onResize:(i,t)=>{let e=getComputedStyle(document.documentElement),r=parseInt(e.getPropertyValue("--io-header"))||0,a=t-r;if(ve=i/8,be=a/8,Fe){let s=_i/8,f=Math.ceil(ve/s),o=Math.ceil(be/(s*Ii));Fe.w=f,Fe.h=o,Fe.build()}Y&&(Y.style.width=ve+"px",Y.style.height=be+"px",Y.style.position="absolute",Y.style.top=r+"px",Y.style.left="0",Y.style.transform="scale(8)",Y.style.transformOrigin="top left")},marqueeFont:{color:"#E0FFFF",shadowColor:"rgba(0,128,128,0.8)",shadowBlur:10}},Je=null,ve,be,Y=null,qr=0,Ke=0,He={x:-1e3,y:-1e3},Et=class{constructor(t,e){this.x=t||0,this.y=e||0}setAngle(t){let e=this.getLength()||1;this.x=Math.cos(t)*e,this.y=Math.sin(t)*e}setLength(t){let e=Math.atan2(this.y,this.x);this.x=Math.cos(e)*t,this.y=Math.sin(e)*t}getLength(){return Math.sqrt(this.x*this.x+this.y*this.y)}addTo(t){this.x+=t.x,this.y+=t.y}},Ai=(()=>{let i=new Uint8Array(512),t=new Uint8Array(256).map(()=>Math.random()*256);for(let a=0;a<512;a++)i[a]=t[a&255];let e=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]];function r(a,s,f,o){return a[0]*s+a[1]*f+a[2]*o}return{simplex3:(a,s,f)=>{let o,n,h,c,l=.3333333333333333,d=1/6,v=(a+s+f)*l,m=Math.floor(a+v),u=Math.floor(s+v),g=Math.floor(f+v),p=(m+u+g)*d,w=a-m+p,b=s-u+p,P=f-g+p,y,E,x,k,_,A;w>=b?b>=P?(y=1,E=0,x=0,k=1,_=1,A=0):w>=P?(y=1,E=0,x=0,k=1,_=0,A=1):(y=0,E=0,x=1,k=1,_=0,A=1):b<P?(y=0,E=0,x=1,k=0,_=1,A=1):w<P?(y=0,E=1,x=0,k=0,_=1,A=1):(y=0,E=1,x=0,k=1,_=1,A=0);let I=w-y+d,O=b-E+d,C=P-x+d,U=w-k+2*d,B=b-_+2*d,N=P-A+2*d,q=w-1+3*d,G=b-1+3*d,V=P-1+3*d,W=m&255,L=u&255,$=g&255,K=.6-w*w-b*b-P*P;K<0?o=0:(K*=K,o=K*K*r(e[i[W+i[L+i[$]]]%12],w,b,P));let ne=.6-I*I-O*O-C*C;ne<0?n=0:(ne*=ne,n=ne*ne*r(e[i[W+y+i[L+E+i[$+x]]]%12],I,O,C));let se=.6-U*U-B*B-N*N;se<0?h=0:(se*=se,h=se*se*r(e[i[W+k+i[L+_+i[$+A]]]%12],U,B,N));let re=.6-q*q-G*G-V*V;return re<0?c=0:(re*=re,c=re*re*r(e[i[W+1+i[L+1+i[$+1]]]%12],q,G,V)),32*(o+n+h+c)}}})(),pi=class{constructor(t,e,r={}){this.settings={frequency:.1,...r},this.w=t,this.h=e,this.time=0,this.build()}build(){this.cols=Math.ceil(this.w),this.rows=Math.ceil(this.h),this.field=new Array(this.cols);for(let t=0;t<this.cols;t++){this.field[t]=new Array(this.rows);for(let e=0;e<this.rows;e++)this.field[t][e]=new Et(0,0)}}update(t){this.time+=t;let e=this.time*this.settings.frequency/1e3;for(let r=0;r<this.field.length;r++)for(let a=0;a<this.field[r].length;a++){let s=Ai.simplex3(r/20,a/20,e)*Math.PI*2,f=Ai.simplex3(r/10+4e4,a/10+4e4,e);this.field[r][a].setAngle(s),this.field[r][a].setLength(f),typeof this.manipulateVector=="function"&&this.manipulateVector(this.field[r][a],r,a),typeof this.onDraw=="function"&&this.onDraw(this.field[r][a],r,a)}}};function jr(){di=[];let i=150;for(let t=0;t<i;t++)di.push({x:Math.random(),y:Math.random(),size:.5+Math.random()*1.3,opacity:.15+Math.random()*.75,blinkSpeed:.001+Math.random()*.002,blinkOffset:Math.random()*Math.PI*2})}function $e(i){i.touches&&i.touches[0]?(He.x=i.touches[0].clientX,He.y=i.touches[0].clientY):(He.x=i.clientX,He.y=i.clientY)}function Hr(i,t){let e=i.ctx2d;Y=i.canvas2D,Y.classList.add("afx-aurora-active");let r=i.topInset||0,a=i.visibleHeight||i.height;ve=i.width/8,be=a/8,Y.width=ve*i.dpr,Y.height=be*i.dpr,e.setTransform(1,0,0,1,0,0),e.scale(i.dpr,i.dpr),Y.style.width=ve+"px",Y.style.height=be+"px",Y.style.position="absolute",Y.style.top=r+"px",Y.style.left="0",Y.style.transform="scale(8)",Y.style.transformOrigin="top left",jr();let s=_i/8,f=Math.ceil(ve/s),o=Math.ceil(be/(s*Ii));Fe=new pi(f,o,{frequency:.1});let n={x:ve/f,y:be/o},h=255/o;Fe.onDraw=(l,d,v)=>{let m=l.getLength()*Math.abs(l.x),u=l.getLength()*Math.abs(l.y),g=Math.round(-20*m+80*u+(50-.6*v*h)),p=Math.round(180*m+20*u-60+.4*v*h),w=Math.round(50*m+30*u+(40-.5*v*h)+.5*v*h);e.fillStyle=`rgba(${g}, ${p}, ${w}, 0.8)`,e.fillRect(d*n.x,v*n.y,n.x+.5,n.y+.5)},Fe.manipulateVector=(l,d,v)=>{let m={x:d*n.x+.5*n.x,y:v*n.y+.5*n.y},u=He.x/8,g=He.y/8,p=new Et((u-m.x)/ve,(g-m.y)/be);l.addTo(p),l.getLength()>1&&l.setLength(1)},qr=0,Ke=0,window.addEventListener("mousemove",$e),window.addEventListener("touchstart",$e),window.addEventListener("touchmove",$e);function c(l){Ke||(Ke=l);let d=l-Ke;Ke=l,e.fillStyle="#020b1a",e.fillRect(0,0,ve,be),Fe.update(d),Je=requestAnimationFrame(c)}Je=requestAnimationFrame(c)}function $r(i,t,e,r){let a=getComputedStyle(document.documentElement),s=parseInt(a.getPropertyValue("--io-header"))||0,f=e-s;i.fillStyle="#ffffff",di.forEach(o=>{let n=(Math.sin(r*o.blinkSpeed+o.blinkOffset)+1)/2;i.globalAlpha=o.opacity*n,i.beginPath();let h=s+o.y*f;i.arc(o.x*t,h,o.size,0,Math.PI*2),i.fill()}),i.globalAlpha=1}function Xr(){Je&&(cancelAnimationFrame(Je),Je=null),window.removeEventListener("mousemove",$e),window.removeEventListener("touchstart",$e),window.removeEventListener("touchmove",$e),Y&&(Y.classList.remove("afx-aurora-active"),Y.style.cssText="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;",Y=null);let i=window.AnkiFX;i&&typeof i.handleResize=="function"&&i.handleResize()}var St=null,ze,Pt,ce=null,Ri={id:"debug",name:"DEBUG",run:Gr,stop:Vr,onResize:(i,t)=>{ze=i,Pt=t},marqueeFont:{color:"#00ff00",shadowColor:"rgba(0,0,0,0.8)",shadowBlur:5},controls:[{type:"button",id:"copy-logs-btn",label:"\u{1F4CB} COPY LOGS",onClick:()=>{Wr()}}]};function Gr(i,t){ce&&(ce.remove(),ce=null);let e=i.dpr||1;ze=i.width,Pt=i.height,ce=document.createElement("div"),ce.className="afx-debug-container";let r=document.createElement("div");r.className="afx-debug-columns",ce.appendChild(r);let a=document.createElement("div");a.className="afx-debug-left-col",r.appendChild(a);let s=document.createElement("div");s.className="afx-debug-right-col",r.appendChild(s);let f=document.createElement("div");f.className="afx-debug-panel viewport-info",f.innerHTML="<h3>Viewport & Layout</h3>";let o=document.createElement("pre");o.className="afx-debug-content",f.appendChild(o),a.appendChild(f);let n=document.createElement("div");n.className="afx-debug-panel diagnostics",n.innerHTML="<h3>AnkiFX Diagnostics</h3>";let h=document.createElement("pre");h.className="afx-debug-content",n.appendChild(h),a.appendChild(n);let c=document.createElement("div");c.className="afx-debug-panel history",c.innerHTML="<h3>Evaluation History</h3>";let l=document.createElement("div");l.className="afx-debug-content",c.appendChild(l),s.appendChild(c);let d=document.createElement("div");d.className="afx-debug-panel logs",d.innerHTML="<h3>Chronological Loader Logs</h3>";let v=document.createElement("div");v.className="afx-debug-content",d.appendChild(v),s.appendChild(d);let m={topLeft:document.createElement("div"),topRight:document.createElement("div"),bottomLeft:document.createElement("div"),bottomRight:document.createElement("div")};m.topLeft.className="afx-debug-corner top-left",m.topRight.className="afx-debug-corner top-right",m.bottomLeft.className="afx-debug-corner bottom-left",m.bottomRight.className="afx-debug-corner bottom-right",m.bottomLeft.style.bottom="auto",m.bottomRight.style.bottom="auto",Object.values(m).forEach(I=>ce.appendChild(I));let u=document.createElement("div");u.className="afx-debug-line visible-bottom";let g=document.createElement("span");g.className="afx-debug-line-label",g.textContent="--- VISIBLE DOCUMENT BOTTOM ---",u.appendChild(g),ce.appendChild(u),(i.canvas2D.parentElement||document.body).appendChild(ce);let w=0,b=0,P=0,y="",E="",x="",k="",_="";function A(I){I===void 0&&(I=performance.now()),w||(w=I),b++,I-w>=1e3&&(P=b,b=0,w=I);let O=i.ctx2d;O.clearRect(0,0,ze,Pt),O.fillStyle="#050508",O.fillRect(0,0,ze,Pt);let C=getComputedStyle(document.documentElement),U=C.getPropertyValue("--io-header")||"N/A",B=parseInt(C.getPropertyValue("--io-header"))||0,N=C.getPropertyValue("--top-inset")||"N/A",q=C.getPropertyValue("--bottom-inset")||"N/A",G=document.getElementById("ankifx-background"),V=G?G.getBoundingClientRect().height:"N/A",W=window.innerWidth>window.innerHeight,L=document.documentElement.clientHeight+B,$=[`window:               ${window.innerWidth}x${window.innerHeight}`,`screen:               ${screen.width}x${screen.height}`,`doc:                  ${document.documentElement.clientWidth}x${document.documentElement.clientHeight}`,`orient:               ${window.orientation||"N/A"}`,`dpr (native|engine):  (${window.devicePixelRatio}|${e})`,`--io-header:          ${U}`,`--top-inset:          ${N}`,`--bottom-inset:       ${q}`,`--afx-viewport-height: calc(100dvh + ${B}px) = ${V}px`,`isLandscape:          ${W}`].join(`
`);$!==y&&(o.textContent=$,y=$);let K=[`Version:  ${window.AnkiFX?.version||"1.0.0-dev"}`,`Source:   ${window.AnkiFX?.source||"unknown"}`,`Built:    ${window.AnkiFX?.buildDate||"development"}`].join(`
`);K!==E&&(h.textContent=K,E=K);let ne=window.AnkiFX_Eval_History||[],se=JSON.stringify(ne);if(se!==x){if(l.innerHTML="",ne.length===0){let M=document.createElement("div");M.textContent="(No evaluation history captured)",M.style.color="#888",M.style.fontStyle="italic",l.appendChild(M)}else ne.slice(-3).forEach((M,z)=>{let j=document.createElement("div");j.textContent=`[${z+1}] ${M.source} (${M.version}) @ ${M.time} - ${M.status}`,j.style.color=M.status==="active"?"#55ff55":"#ffaa55",l.appendChild(j)});x=se}let re=window.AnkiFX_Loader_Logs||[],S=JSON.stringify(re);if(S!==k){if(v.innerHTML="",re.length===0){let M=document.createElement("div");M.textContent="(No logs captured by template loader)",M.style.color="#888",M.style.fontStyle="italic",v.appendChild(M)}else re.slice(-12).forEach((M,z)=>{let j=document.createElement("div");j.textContent=`[${z+1}] ${M}`;let fe=M.includes("fail")||M.includes("Error")||M.includes("offline")||M.includes("warn");j.style.color=fe?"#ff5555":"#55ff55",v.appendChild(j)});k=S}let D=`${ze}x${L}`;D!==_&&(m.topLeft.textContent="(0,0)",m.topRight.textContent=`(${ze},0)`,m.bottomLeft.textContent=`(0,${L})`,m.bottomRight.textContent=`(${ze},${L})`,m.bottomLeft.style.top=`${L-18}px`,m.bottomRight.style.top=`${L-18}px`,_=D),u.style.top=`${L}px`,St=requestAnimationFrame(A)}A()}function Vr(){St&&(cancelAnimationFrame(St),St=null),ce&&(ce.remove(),ce=null)}function Wr(){let i=document.querySelector(".afx-debug-container");if(!i)return;let t=`=== ANKIFX DEBUG LOGS ===

`;i.querySelectorAll(".afx-debug-panel").forEach(a=>{let s=a.querySelector("h3")?.textContent||"",f=a.querySelector(".afx-debug-content");f&&(t+=`--- ${s.toUpperCase()} ---
`,t+=f.innerText||f.textContent||"",t+=`

`)}),(()=>{try{let a=document.createElement("textarea");a.value=t.trim(),a.style.position="fixed",a.style.top="0",a.style.left="0",a.style.opacity="0",a.style.pointerEvents="none",document.body.appendChild(a),a.focus(),a.select();let s=document.execCommand("copy");if(document.body.removeChild(a),s)return Promise.resolve()}catch{}return navigator.clipboard&&typeof navigator.clipboard.writeText=="function"?navigator.clipboard.writeText(t.trim()):Promise.reject(new Error("No copy method succeeded or is available"))})().then(()=>{let a=document.getElementById("afx-control-copy-logs-btn");if(a){let s=a.textContent;a.textContent="\u2705 COPIED!",setTimeout(()=>{a.textContent=s},1500)}}).catch(a=>{let s=document.getElementById("afx-control-copy-logs-btn");if(s){let f=s.textContent;s.textContent="\u274C ERROR",setTimeout(()=>{s.textContent=f},1500)}})}var Ze=null,Q,xe,me={id:"ecg",name:"ECG Monitor",run:Yr,stop:Kr,onResize:(i,t)=>{Q=i,xe=t},marqueeFont:{color:"#FF1A1A",shadowColor:"#CC0000",shadowBlur:15}};function Yr(i,t){let e=i.ctx2d;Q=i.width,xe=i.height;let r=document.getElementById("afx-top-group-right"),a=document.getElementById("afx-ecg-panel");!a&&r&&(a=document.createElement("div"),a.id="afx-ecg-panel",r.insertBefore(a,r.firstChild));let s=localStorage.getItem("ankifx_ecg_rhythm")||"sinus";me.controls=[{type:"button",id:"ecg-trigger",label:s==="sinus"?"\u26A1 TRIGGER ARRHYTHMIA":"\u{1F49A} RESTORE SINUS",onClick:()=>{let S=localStorage.getItem("ankifx_ecg_rhythm")||"sinus",D;if(S==="sinus"){let M=["first_degree","mobitz_1","mobitz_2","third_degree","st_elevation","afib","a_flutter","torsades"];D=M[Math.floor(Math.random()*M.length)]}else D="sinus";localStorage.setItem("ankifx_ecg_rhythm",D),localStorage.setItem("ankifx_ecg_trigger_time",Date.now())}}];let f=200,o=40,n=120,h=25,c=5,l=new Float32Array(4096),d=0,v=0,m=0,u=0,g=0,p=0,w=0,b=100,P=.6,y=72,E=0,x="sinus",k=25+Math.random()*15,_=0,A=["first_degree","mobitz_1","mobitz_2","third_degree","st_elevation","afib","a_flutter","torsades"],I=0;function O(){d<Q&&(d=Q)}let C=(S,D,M,z)=>z*Math.exp(-((S-D)**2)/(2*M**2));function U(S){return C(S,.15,.03,.12)}function B(S){return C(S,.03,.03,.12)}function N(S,D){let M=D%4;return M===0?C(S,.17,.03,.12):M===1?C(S,.1,.03,.12):M===2?C(S,.03,.03,.12):C(S,.15,.03,.12)}function q(S){return C(S,.08,.03,.12)}function G(S){return .035*Math.sin(S*Math.PI*40)+.015*Math.sin(S*Math.PI*96)+.008*Math.sin(S*Math.PI*176)}function V(S){return .085*(S*4%1-.5)}function W(S,D){let M=Math.sin(S*Math.PI*2)*.58+Math.sin(S*Math.PI*4)*.16,z=Math.sin(D*1.2);return M*z}function L(S,D=!1){let M=0;return M+=C(S,.33,.008,-.08),M+=C(S,.36,.012,1),M+=C(S,.39,.008,-.12),D&&(M+=C(S,.46,.07,.38)),M+=C(S,.56,.04,.22),M}function $(S,D,M){let z=S%1,j=Math.floor(S);return D==="sinus"?U(z)+L(z,!1):D==="first_degree"?B(z)+L(z,!1):D==="mobitz_1"?j%4===3?N(z,j):N(z,j)+L(z,!1):D==="mobitz_2"?j%3===2?q(z):q(z)+L(z,!1):D==="st_elevation"?U(z)+L(z,!0):D==="afib"?G(z)+L(z,!1):D==="a_flutter"?V(z)+L(z,!1):D==="torsades"?W(z,M):0}function K(S,D){let M=S%1,z=D%1,j=C(M,.15,.03,.12),fe=C(z,.33,.008,-.08)+C(z,.36,.012,1)+C(z,.39,.008,-.12)+C(z,.56,.04,.22);return j+fe}function ne(){e.strokeStyle="rgba(60, 0, 0, 0.15)",e.lineWidth=.5,e.beginPath();for(let S=0;S<Q;S+=c)e.moveTo(S,0),e.lineTo(S,xe);for(let S=0;S<xe;S+=c)e.moveTo(0,S),e.lineTo(Q,S);e.stroke(),e.strokeStyle="rgba(80, 0, 0, 0.3)",e.lineWidth=1,e.beginPath();for(let S=0;S<Q;S+=h)e.moveTo(S,0),e.lineTo(S,xe);for(let S=0;S<xe;S+=h)e.moveTo(0,S),e.lineTo(Q,S);e.stroke()}function se(){if(!a)return;let S=.5+E*.5;a.style.opacity=S;let D="SINUS RHYTHM";x==="first_degree"?D="1\xB0 AV BLOCK":x==="mobitz_1"?D="2\xB0 AV (MOBITZ 1)":x==="mobitz_2"?D="2\xB0 AV (MOBITZ 2)":x==="third_degree"?D="3\xB0 AV BLOCK":x==="st_elevation"?D="ST ELEVATION":x==="afib"?D="ATRIAL FIBRILLATION":x==="a_flutter"?D="ATRIAL FLUTTER":x==="torsades"&&(D="TORSADES DE POINTES"),a.innerHTML=`
            <div class="afx-ecg-bpm">\u2665 ${y} BPM</div>
            <div class="afx-ecg-rhythm">${D}</div>
        `}function re(S){u||(u=S);let D=Math.min((S-u)/1e3,.05);u=S,m+=D,O();let M=localStorage.getItem("ankifx_ecg_rhythm")||"sinus",z=parseInt(localStorage.getItem("ankifx_ecg_trigger_time")||"0");if(z>_){if(_=z,x=M,k=m+25+Math.random()*15,x!=="sinus"){let Z=A.indexOf(x);Z!==-1&&(I=(Z+1)%A.length)}x==="afib"&&(b=70+Math.floor(Math.random()*60),P=60/b),me.controls&&me.controls[0]&&(me.controls[0].label=x==="sinus"?"\u26A1 TRIGGER ARRHYTHMIA":"\u{1F49A} RESTORE SINUS",AnkiFX.renderEffectControls(me))}m>=k&&(x==="sinus"?(x=A[I],I=(I+1)%A.length):x="sinus",localStorage.setItem("ankifx_ecg_rhythm",x),k=m+25+Math.random()*15,x==="afib"&&(b=70+Math.floor(Math.random()*60),P=60/b),me.controls&&me.controls[0]&&(me.controls[0].label=x==="sinus"?"\u26A1 TRIGGER ARRHYTHMIA":"\u{1F49A} RESTORE SINUS",AnkiFX.renderEffectControls(me)));let j=72;x==="third_degree"?j=35:x==="mobitz_1"||x==="mobitz_2"?j=68:x==="afib"?j=b:x==="a_flutter"?j=75:x==="torsades"&&(j=220);let fe=x==="afib"?P:60/j,ke=g,Le=p,Ee=w;if(x==="third_degree"?(p+=D/(60/88),w+=D/(60/j)):g+=D/fe,x!=="third_degree"){let Z=Math.floor(ke);Math.floor(g)>Z&&x==="afib"&&(b=70+Math.floor(Math.random()*65),P=60/b)}if(x==="third_degree")Math.floor(Ee-.36)<Math.floor(w-.36)&&(E=1,y=j+Math.floor(Math.random()*3)-1);else if(Math.floor(ke-.36)<Math.floor(g-.36)){let Z=Math.floor(g-.36),le=!1;x==="mobitz_1"?le=Z%4===3:x==="mobitz_2"&&(le=Z%3===2),le||(E=1,y=Math.floor(j),x!=="torsades"&&x!=="a_flutter"&&(y+=Math.floor(Math.random()*5)-2))}E=Math.max(0,E-D*4);let Pe=f*D,Ce=v+Pe,Re=Math.floor(v),Ur=Math.floor(Ce);for(let Z=Re;Z<=Ur;Z++){let le=Z%Q,de=(Z-v)/Pe;if(x==="third_degree"){let pe=Le+(p-Le)*de,wt=Ee+(w-Ee)*de;l[le]=K(pe,wt)}else{let pe=ke+(g-ke)*de;l[le]=$(pe,x,m)}}v=Ce,v>=Q&&(v-=Q),e.fillStyle="#000000",e.fillRect(0,0,Q,xe),ne();let ci=xe*.55,hi=xe*.35,bt=Math.floor(v)%Q,Di=4;e.save(),e.lineCap="round",e.lineJoin="round";for(let Z=0;Z<3;Z++){Z===0?(e.lineWidth=15,e.strokeStyle="rgb(200, 0, 0)"):Z===1?(e.lineWidth=7,e.strokeStyle="rgb(255, 15, 15)"):(e.lineWidth=2.4,e.strokeStyle="rgb(255, 175, 175)");for(let le=0;le<Q;le+=Di){let de=bt-le;if(de<0&&(de+=Q),de>Q-o)continue;let pe=1,wt=Q-o-n;if(de>wt&&(pe=1-(de-wt)/n,pe=Math.max(0,pe)),pe<=0)continue;let yt=0;de<12&&(yt=1-de/12),Z===0?e.globalAlpha=pe*(.07+yt*.13):Z===1?e.globalAlpha=pe*(.28+yt*.32):e.globalAlpha=pe*(.85+yt*.15),e.beginPath();let Br=ci-l[le]*hi;e.moveTo(le,Br);let kt=Math.min(le+Di,Q);for(let je=le+1;je<kt;je++){let Nr=ci-l[je]*hi;e.lineTo(je,Nr)}if(kt<Q){let je=ci-l[kt]*hi;e.lineTo(kt,je)}e.stroke()}}e.globalAlpha=1,e.restore(),e.save();let xt=e.createLinearGradient(bt-3,0,bt+3,0);xt.addColorStop(0,"rgba(255, 0, 0, 0)"),xt.addColorStop(.5,"rgba(255, 50, 50, 0.4)"),xt.addColorStop(1,"rgba(255, 0, 0, 0)"),e.fillStyle=xt,e.fillRect(bt-3,0,6,xe),e.restore(),se(),Ze=requestAnimationFrame(re)}Ze=requestAnimationFrame(re)}function Kr(){Ze&&(cancelAnimationFrame(Ze),Ze=null);let i=document.getElementById("afx-ecg-panel");i&&i.remove()}var Qe=null,mi,gi,zi={id:"fire",name:"Doom Fire",run:Zr,stop:Qr,onResize:(i,t)=>{mi=i,gi=t},preferredTrack:{title:"Doom 3 BFG Edition",trackTitle:"DOOM E1M1"},marqueeFont:{color:"#ffffff",shadowColor:"rgba(0,0,0,0.8)",shadowBlur:5}},Jr=[[7,7,7],[31,7,7],[47,15,7],[71,15,7],[87,23,7],[103,31,7],[119,31,7],[143,39,7],[159,47,7],[175,63,7],[191,71,7],[199,71,7],[223,79,7],[223,87,7],[223,87,7],[215,95,7],[215,95,7],[215,103,15],[207,111,15],[207,119,15],[207,127,15],[207,135,23],[199,135,23],[199,143,23],[199,151,31],[191,159,31],[191,159,31],[191,167,39],[191,167,39],[191,175,47],[183,175,47],[183,183,47],[183,183,55],[207,207,111],[223,223,159],[239,239,199],[255,255,255]];function Zr(i,t){let e=i.ctx2d;mi=i.width,gi=i.height;let r=320,a=168,s=new Uint8Array(r*a),f=e.createImageData(r,a),o=f.data,n=document.createElement("canvas");n.width=r,n.height=a;let h=n.getContext("2d");function c(){s.fill(0);for(let u=0;u<r;u++)s[(a-1)*r+u]=36}function l(u){let g=s[u];if(g===0)s[u-r]=0;else{let p=Math.floor(Math.random()*3),w=u-p+1;s[w-r]=g-(p&1)}}function d(){for(let u=0;u<r;u++)for(let g=1;g<a;g++)l(g*r+u)}function v(){for(let u=0;u<s.length;u++){let g=s[u],p=Jr[g],w=u*4;o[w]=p[0],o[w+1]=p[1],o[w+2]=p[2],o[w+3]=255}}c();function m(){d(),v(),h.putImageData(f,0,0),e.save(),e.imageSmoothingEnabled=!1,e.drawImage(n,0,0,mi,gi),e.restore(),Qe=requestAnimationFrame(m)}Qe=requestAnimationFrame(m)}function Qr(){Qe&&(cancelAnimationFrame(Qe),Qe=null)}var it=null,et,tt,Oi={id:"geometry",name:"Geometry",run:eo,stop:to,onResize:(i,t)=>{et=i,tt=t},marqueeFont:{colorFn:(i,t)=>`hsl(${(i*120+t*4)%360}, 100%, 55%)`,shadowColor:"inherit",shadowBlur:15}};function eo(i,t){let e=i.ctx2d;et=i.width,tt=i.height;let r=0;function a(){r+=.012,e.globalCompositeOperation="source-over",e.fillStyle="rgba(2, 2, 5, 0.3)",e.fillRect(0,0,et,tt),e.globalCompositeOperation="lighter";let s=et/2,f=tt/2,o=Math.max(et,tt)*.85;for(let n=0;n<35;n++){let h=r+n*.05,c=(Math.sin(h*.8)*.5+.5)*o+n*12;e.save(),e.translate(s,f),e.rotate(Math.sin(r*.3)*Math.PI+n*.06),e.scale(Math.sin(r*.5+n*.1)*.4+.8,Math.cos(r*.4+n*.1)*.4+.8),e.beginPath();for(let d=0;d<=8;d++){let v=d/8*Math.PI*2,m=Math.cos(v)*c,u=Math.sin(v)*c;d===0?e.moveTo(m,u):e.lineTo(m,u)}let l=(r*50+n*10)%360;e.strokeStyle=`hsla(${l}, 95%, 65%, 0.6)`,e.lineWidth=4,e.stroke(),e.restore()}e.globalCompositeOperation="source-over",it=requestAnimationFrame(a)}it=requestAnimationFrame(a)}function to(){it&&(cancelAnimationFrame(it),it=null)}var Ct=null;function Bi(i){Ct=i}var io=["#c3e4ff","#6ec3f4","#eae2ff","#b9beff"];function Ui(i){return[(i>>16&255)/255,(i>>8&255)/255,(255&i)/255]}var vi=class{constructor(t,e,r,a){let s=this;s.canvas=t,s.gl=e,s.meshes=[],s.debug=()=>{};let f=s.gl;Object.defineProperties(s,{Material:{enumerable:!1,value:class{constructor(n,h,c={}){let l=this;function d(u,g){let p=f.createShader(u);return f.shaderSource(p,g),f.compileShader(p),f.getShaderParameter(p,f.COMPILE_STATUS)||console.error("Shader compilation error:",f.getShaderInfoLog(p)),p}function v(u,g){return Object.entries(u).map(([p,w])=>w.getDeclaration(p,g)).join(`
`)}l.uniforms=c,l.uniformInstances=[];let m=`
              precision highp float;
            `;l.vertexSource=`
              ${m}
              attribute vec4 position;
              attribute vec2 uv;
              attribute vec2 uvNorm;
              ${v(s.commonUniforms,"vertex")}
              ${v(c,"vertex")}
              ${n}
            `,l.Source=`
              ${m}
              ${v(s.commonUniforms,"fragment")}
              ${v(c,"fragment")}
              ${h}
            `,l.vertexShader=d(f.VERTEX_SHADER,l.vertexSource),l.fragmentShader=d(f.FRAGMENT_SHADER,l.Source),l.program=f.createProgram(),f.attachShader(l.program,l.vertexShader),f.attachShader(l.program,l.fragmentShader),f.linkProgram(l.program),f.getProgramParameter(l.program,f.LINK_STATUS)||console.error("Program link error:",f.getProgramInfoLog(l.program)),f.useProgram(l.program),l.attachUniforms(void 0,s.commonUniforms),l.attachUniforms(void 0,l.uniforms)}attachUniforms(n,h){let c=this;n===void 0?Object.entries(h).forEach(([l,d])=>{c.attachUniforms(l,d)}):h.type==="array"?h.value.forEach((l,d)=>c.attachUniforms(`${n}[${d}]`,l)):h.type==="struct"?Object.entries(h.value).forEach(([l,d])=>c.attachUniforms(`${n}.${l}`,d)):c.uniformInstances.push({uniform:h,location:f.getUniformLocation(c.program,n)})}}},Uniform:{enumerable:!1,value:class{constructor(n){this.type="float",Object.assign(this,n),this.typeFn={float:"1f",int:"1i",vec2:"2fv",vec3:"3fv",vec4:"4fv",mat4:"Matrix4fv"}[this.type]||"1f",this.update()}update(n){this.value!==void 0&&f[`uniform${this.typeFn}`](n,this.typeFn.substring(0,6)==="Matrix"?this.transpose:this.value,this.typeFn.substring(0,6)==="Matrix"?this.value:null)}getDeclaration(n,h,c){let l=this;if(l.excludeFrom!==h){if(l.type==="array")return l.value[0].getDeclaration(n,h,l.value.length)+`
const int ${n}_length = ${l.value.length};`;if(l.type==="struct"){let d=n.replace("u_","");return d=d.charAt(0).toUpperCase()+d.slice(1),`uniform struct ${d} 
{
`+Object.entries(l.value).map(([v,m])=>m.getDeclaration(v,h).replace(/^uniform/,"")).join("")+`
} ${n}${c>0?`[${c}]`:""};`}return`uniform ${l.type} ${n}${c>0?`[${c}]`:""};`}}}},PlaneGeometry:{enumerable:!1,value:class{constructor(n,h,c,l,d){f.createBuffer(),this.attributes={position:new s.Attribute({target:f.ARRAY_BUFFER,size:3}),uv:new s.Attribute({target:f.ARRAY_BUFFER,size:2}),uvNorm:new s.Attribute({target:f.ARRAY_BUFFER,size:2}),index:new s.Attribute({target:f.ELEMENT_ARRAY_BUFFER,size:3,type:f.UNSIGNED_SHORT})},this.setTopology(c,l),this.setSize(n,h,d)}setTopology(n=1,h=1){let c=this;c.xSegCount=n,c.ySegCount=h,c.vertexCount=(c.xSegCount+1)*(c.ySegCount+1),c.quadCount=c.xSegCount*c.ySegCount*2,c.attributes.uv.values=new Float32Array(2*c.vertexCount),c.attributes.uvNorm.values=new Float32Array(2*c.vertexCount),c.attributes.index.values=new Uint16Array(3*c.quadCount);for(let l=0;l<=c.ySegCount;l++)for(let d=0;d<=c.xSegCount;d++){let v=l*(c.xSegCount+1)+d;if(c.attributes.uv.values[2*v]=d/c.xSegCount,c.attributes.uv.values[2*v+1]=1-l/c.ySegCount,c.attributes.uvNorm.values[2*v]=d/c.xSegCount*2-1,c.attributes.uvNorm.values[2*v+1]=1-l/c.ySegCount*2,d<c.xSegCount&&l<c.ySegCount){let m=l*c.xSegCount+d;c.attributes.index.values[6*m]=v,c.attributes.index.values[6*m+1]=v+1+c.xSegCount,c.attributes.index.values[6*m+2]=v+1,c.attributes.index.values[6*m+3]=v+1,c.attributes.index.values[6*m+4]=v+1+c.xSegCount,c.attributes.index.values[6*m+5]=v+2+c.xSegCount}}c.attributes.uv.update(),c.attributes.uvNorm.update(),c.attributes.index.update()}setSize(n=1,h=1,c="xz"){let l=this;l.width=n,l.height=h,l.orientation=c,(!l.attributes.position.values||l.attributes.position.values.length!==3*l.vertexCount)&&(l.attributes.position.values=new Float32Array(3*l.vertexCount));let d=n/-2,v=h/-2,m=n/l.xSegCount,u=h/l.ySegCount;for(let g=0;g<=l.ySegCount;g++){let p=v+g*u;for(let w=0;w<=l.xSegCount;w++){let b=d+w*m,P=g*(l.xSegCount+1)+w;l.attributes.position.values[3*P+"xyz".indexOf(c[0])]=b,l.attributes.position.values[3*P+"xyz".indexOf(c[1])]=-p}}l.attributes.position.update()}}},Mesh:{enumerable:!1,value:class{constructor(n,h){let c=this;c.geometry=n,c.material=h,c.wireframe=!1,c.attributeInstances=[],Object.entries(c.geometry.attributes).forEach(([l,d])=>{c.attributeInstances.push({attribute:d,location:d.attach(l,c.material.program)})}),s.meshes.push(c)}draw(){f.useProgram(this.material.program),this.material.uniformInstances.forEach(({uniform:n,location:h})=>n.update(h)),this.attributeInstances.forEach(({attribute:n,location:h})=>n.use(h)),f.drawElements(this.wireframe?f.LINES:f.TRIANGLES,this.geometry.attributes.index.values.length,f.UNSIGNED_SHORT,0)}remove(){s.meshes=s.meshes.filter(n=>n!==this)}}},Attribute:{enumerable:!1,value:class{constructor(n){this.type=f.FLOAT,this.normalized=!1,this.buffer=f.createBuffer(),Object.assign(this,n),this.update()}update(){this.values!==void 0&&(f.bindBuffer(this.target,this.buffer),f.bufferData(this.target,this.values,f.STATIC_DRAW))}attach(n,h){let c=f.getAttribLocation(h,n);return this.target===f.ARRAY_BUFFER&&(f.enableVertexAttribArray(c),f.vertexAttribPointer(c,this.size,this.type,this.normalized,0,0)),c}use(n){f.bindBuffer(this.target,this.buffer),this.target===f.ARRAY_BUFFER&&(f.enableVertexAttribArray(n),f.vertexAttribPointer(n,this.size,this.type,this.normalized,0,0))}}}});let o=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];s.commonUniforms={projectionMatrix:new s.Uniform({type:"mat4",value:o}),modelViewMatrix:new s.Uniform({type:"mat4",value:o}),resolution:new s.Uniform({type:"vec2",value:[1,1]}),aspectRatio:new s.Uniform({type:"float",value:1})},r&&a&&this.setSize(r,a)}setSize(t=640,e=480,r=1){this.width=t,this.height=e,this.gl.viewport(0,0,t*r,e*r),this.commonUniforms.resolution.value=[t,e],this.commonUniforms.aspectRatio.value=t/e}setOrthographicCamera(t=0,e=0,r=0,a=-2e3,s=2e3){this.commonUniforms.projectionMatrix.value=[2/this.width,0,0,0,0,2/this.height,0,0,0,0,2/(a-s),0,t,e,r,1]}render(){this.gl.clearColor(0,0,0,0),this.gl.clearDepth(1),this.meshes.forEach(t=>t.draw())}cleanup(){let t=this.gl;this.meshes.forEach(e=>{e.attributeInstances&&e.attributeInstances.forEach(({location:r})=>{typeof r=="number"&&r>=0&&t.disableVertexAttribArray(r)}),e.material&&e.material.program&&t.deleteProgram(e.material.program),e.geometry&&e.geometry.attributes&&Object.values(e.geometry.attributes).forEach(r=>{r.buffer&&t.deleteBuffer(r.buffer)})}),this.meshes=[]}},Ft=class{constructor(t,e,r,a){this.canvas=t,this.gl=e,this.width=r,this.height=a,this.angle=0,this.conf={presetName:"",wireframe:!1,density:[.06,.16],zoom:1,rotation:0,playing:!0},this.t=1253106,this.last=0,this.amp=320,this.seed=5,this.freqX=14e-5,this.freqY=29e-5,this.activeColors=[1,1,1,1],this.shaderFiles={vertex:`
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
            `},this.initGradientColors(),this.minigl=new vi(t,e,r,a),this.initMesh(),this.resize(),this.updateThemeAwareText()}initGradientColors(){this.sectionColors=io.map(t=>Ui(parseInt(t.substring(1),16)))}initMaterial(){this.uniforms={u_time:new this.minigl.Uniform({value:0}),u_shadow_power:new this.minigl.Uniform({value:5}),u_darken_top:new this.minigl.Uniform({value:0}),u_active_colors:new this.minigl.Uniform({value:this.activeColors,type:"vec4"}),u_global:new this.minigl.Uniform({value:{noiseFreq:new this.minigl.Uniform({value:[this.freqX,this.freqY],type:"vec2"}),noiseSpeed:new this.minigl.Uniform({value:5e-6})},type:"struct"}),u_vertDeform:new this.minigl.Uniform({value:{incline:new this.minigl.Uniform({value:Math.sin(this.angle)/Math.cos(this.angle)}),offsetTop:new this.minigl.Uniform({value:-.5}),offsetBottom:new this.minigl.Uniform({value:-.5}),noiseFreq:new this.minigl.Uniform({value:[3,4],type:"vec2"}),noiseAmp:new this.minigl.Uniform({value:this.amp}),noiseSpeed:new this.minigl.Uniform({value:10}),noiseFlow:new this.minigl.Uniform({value:3}),noiseSeed:new this.minigl.Uniform({value:this.seed})},type:"struct",excludeFrom:"fragment"}),u_baseColor:new this.minigl.Uniform({value:this.sectionColors[0],type:"vec3",excludeFrom:"fragment"}),u_waveLayers:new this.minigl.Uniform({value:[],excludeFrom:"fragment",type:"array"})};for(let t=1;t<this.sectionColors.length;t+=1)this.uniforms.u_waveLayers.value.push(new this.minigl.Uniform({value:{color:new this.minigl.Uniform({value:this.sectionColors[t],type:"vec3"}),noiseFreq:new this.minigl.Uniform({value:[2+t/this.sectionColors.length,3+t/this.sectionColors.length],type:"vec2"}),noiseSpeed:new this.minigl.Uniform({value:11+.3*t}),noiseFlow:new this.minigl.Uniform({value:6.5+.3*t}),noiseSeed:new this.minigl.Uniform({value:this.seed+10*t}),noiseFloor:new this.minigl.Uniform({value:.1}),noiseCeil:new this.minigl.Uniform({value:.63+.07*t})},type:"struct"}));return this.vertexShader=[this.shaderFiles.noise,this.shaderFiles.blend,this.shaderFiles.vertex].join(`

`),new this.minigl.Material(this.vertexShader,this.shaderFiles.fragment,this.uniforms)}initMesh(){this.material=this.initMaterial(),this.geometry=new this.minigl.PlaneGeometry,this.mesh=new this.minigl.Mesh(this.geometry,this.material)}resize(){let t=Math.min(window.devicePixelRatio||1,1.5);this.minigl.setSize(this.width,this.height,t),this.minigl.setOrthographicCamera(),this.xSegCount=Math.ceil(this.width*this.conf.density[0]),this.ySegCount=Math.ceil(this.height*this.conf.density[1]),this.mesh.geometry.setTopology(this.xSegCount,this.ySegCount),this.mesh.geometry.setSize(this.width,this.height),this.mesh.material.uniforms.u_shadow_power.value=this.width<600?5:6}animate=t=>{if(!this.conf.playing)return;this.last===0&&(this.last=t);let e=Math.min(t-this.last,1e3/15);this.last=t,this.t+=e,this.mesh.material.uniforms.u_time.value=this.t,this.minigl.render(),this.animationId=requestAnimationFrame(this.animate)};updateThemeAwareText(){if(!this.sectionColors||this.sectionColors.length===0)return;let t=0;this.sectionColors.forEach(s=>{let f=s[0],o=s[1],n=s[2],h=.299*f+.587*o+.114*n;t+=h});let e=t/this.sectionColors.length,r=e>.6?"#111111":"#ffffff",a=e>.6?"0 1px 2px rgba(255, 255, 255, 0.8)":"0 1px 3px rgba(0, 0, 0, 0.9), 0 2px 10px rgba(0, 0, 0, 0.6)";document.documentElement.style.setProperty("--afx-body-color",r),document.documentElement.style.setProperty("--afx-text-shadow",a),Ct&&(Ct.marqueeFont={colorFn:(s,f)=>{if(!this.sectionColors||this.sectionColors.length===0)return"#ffffff";let o=(s*1.5+f*.25)%this.sectionColors.length,n=Math.floor(o),h=(n+1)%this.sectionColors.length,c=o-n,l=this.sectionColors[n],d=this.sectionColors[h],v=l[0]*(1-c)+d[0]*c,m=l[1]*(1-c)+d[1]*c,u=l[2]*(1-c)+d[2]*c,g=e>.6?.45:1;return`rgb(${Math.round(v*g*255)}, ${Math.round(m*g*255)}, ${Math.round(u*g*255)})`},shadowColor:e>.6?"rgba(0, 0, 0, 0.25)":"inherit",shadowBlur:16},window.AnkiFX&&window.AnkiFX.marquee&&window.AnkiFX.marquee.updateStyles(Ct.marqueeFont))}randomizeColors(){let t=()=>"#"+Math.floor(Math.random()*16777215).toString(16).padStart(6,"0"),e=[t(),t(),t(),t()];if(this.sectionColors=e.map(r=>Ui(parseInt(r.substring(1),16))),this.uniforms&&this.uniforms.u_baseColor&&this.uniforms.u_waveLayers&&this.uniforms.u_waveLayers.value){this.uniforms.u_baseColor.value=this.sectionColors[0];for(let r=0;r<this.uniforms.u_waveLayers.value.length;r++){let a=this.uniforms.u_waveLayers.value[r];a&&a.value&&a.value.color&&(a.value.color.value=this.sectionColors[r+1]||this.sectionColors[0])}}this.updateThemeAwareText()}destroy(){this.conf.playing=!1,this.animationId&&cancelAnimationFrame(this.animationId),this.minigl&&this.minigl.cleanup()}};var oe=null,bi={id:"gradient",name:"Gradient",controls:[{type:"button",id:"gradient-randomize",label:"\u{1F3A8} RANDOMIZE",onClick:()=>{oe&&oe.randomizeColors()}}],run:(i,t)=>{oe&&oe.destroy(),oe=new Ft(i.canvasGL,i.gl,i.width,i.height),oe.conf.playing=!0,oe.last=0,oe.animationId=requestAnimationFrame(oe.animate)},stop:()=>{oe&&(oe.destroy(),oe=null),document.documentElement.style.removeProperty("--afx-body-color"),document.documentElement.style.removeProperty("--afx-text-shadow")},onResize:(i,t,e)=>{oe&&(oe.width=i,oe.height=t,oe.resize())},marqueeFont:{color:"#E6E6FA",shadowColor:"rgba(230, 230, 250, 0.6)",shadowBlur:8}};Bi(bi);function Mt(i,t,e){function r(f,o){let n=i.createShader(f);return i.shaderSource(n,o),i.compileShader(n),i.getShaderParameter(n,i.COMPILE_STATUS)||console.error("AnkiFX shader compile:",i.getShaderInfoLog(n)),n}let a=i.createProgram();i.attachShader(a,r(i.VERTEX_SHADER,t)),i.attachShader(a,r(i.FRAGMENT_SHADER,e)),i.linkProgram(a),i.getProgramParameter(a,i.LINK_STATUS)||console.error("AnkiFX program link:",i.getProgramInfoLog(a)),i.useProgram(a),i.bindBuffer(i.ARRAY_BUFFER,i.createBuffer()),i.bufferData(i.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),i.STATIC_DRAW);let s=i.getAttribLocation(a,"position");return i.enableVertexAttribArray(s),i.vertexAttribPointer(s,2,i.FLOAT,!1,0,0),a}var Dt=null,Oe,Me,ot,It,ue={id:"julia",name:"Julia Set",run:ro,stop:oo,onResize:(i,t,e)=>{Oe=i,Me=t,It&&ot&&It.uniform2f(ot,i*e,t*e)},preferredTrack:{title:"Acoustica Power Bundle 4",trackTitle:"AiR"},presets:[{name:"Black Hole",cRe:-.8,cIm:.156,zoomDepth:8,targetX:-.086441,targetY:-.239323},{name:"Electric Lightning",cRe:.285,cIm:.013,zoomDepth:6,targetX:-.106662,targetY:.656613},{name:"Golden Dragon",cRe:-.4,cIm:.6,zoomDepth:9,targetX:-.042175,targetY:-.036744},{name:"Filigree",cRe:-.70176,cIm:-.3842,zoomDepth:10.5,targetX:-.096904,targetY:-.656621},{name:"Fractal Storm",cRe:-.7269,cIm:.1889,zoomDepth:10.5,targetX:-.237086,targetY:.547981},{name:"Seahorse Spiral",cRe:-.74543,cIm:.11301,zoomDepth:7.5,targetX:-.529406,targetY:.072863}],marqueeFont:{color:"#FFF",outline:"#000"}},At=null,_t=null,Tt={x:0,y:0},Ni=parseInt(localStorage.getItem("ankifx_julia_preset_index")||"0",10),rt=ue.presets[Ni]||ue.presets[0],R={presetIndex:Ni,cRe:rt.cRe,cIm:rt.cIm,zoomDepth:rt.zoomDepth,targetX:rt.targetX,targetY:rt.targetY,speed:parseFloat(localStorage.getItem("ankifx_julia_speed"))||.15};function ro(i,t={}){It=i.gl;let e=i.gl,r=i.ctx2d;Oe=i.width,Me=i.height;let a=i.dpr,o=Mt(e,`
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
    `),n=e.getUniformLocation(o,"u_time"),h=e.getUniformLocation(o,"u_speed");ot=e.getUniformLocation(o,"u_resolution");let c=e.getUniformLocation(o,"u_c"),l=e.getUniformLocation(o,"u_zoomDepth"),d=e.getUniformLocation(o,"u_target");e.uniform2f(ot,Oe*a,Me*a);let v=null,m=null,u=Oe<480,g=parseInt(localStorage.getItem("ankifx_julia_preset_index")||"0",10);R.presetIndex=g;let p=ue.presets[g]||ue.presets[0];R.cRe=t.cRe!==void 0?t.cRe:p.cRe,R.cIm=t.cIm!==void 0?t.cIm:p.cIm,R.zoomDepth=t.zoomDepth!==void 0?t.zoomDepth:p.zoomDepth,R.targetX=t.targetX!==void 0?t.targetX:p.targetX,R.targetY=t.targetY!==void 0?t.targetY:p.targetY;let w={type:"select",id:"julia-preset",label:"PRESET",options:ue.presets.map((y,E)=>({value:E,text:(u?"\u{1F4A0} ":"[ Preset: ")+y.name+(u?"":" ]")})),value:R.presetIndex,onChange:y=>{let E=parseInt(y);localStorage.setItem("ankifx_julia_preset_index",E),R.presetIndex=E;let x=ue.presets[E];x&&(Object.assign(t,x),R.cRe=x.cRe,R.cIm=x.cIm,R.zoomDepth=x.zoomDepth,R.targetX=x.targetX,R.targetY=x.targetY,t.debug&&(AnkiFX.setControlValue("julia-cRe",x.cRe),AnkiFX.setControlValue("julia-cIm",x.cIm),AnkiFX.setControlValue("julia-zoomDepth",x.zoomDepth),AnkiFX.setControlValue("julia-targetX",x.targetX),AnkiFX.setControlValue("julia-targetY",x.targetY)),ue.stop(),i.ctx2d&&i.ctx2d.clearRect(0,0,Oe,Me),AnkiFX.startEffect(t,document.getElementById("ankifx-background"),t.marqueePosition,"julia"))}};if(t.debug?ue.controls=[]:ue.controls=[w],t.debug){ue.controls.push({type:"slider",id:"julia-cRe",label:"C-RE",min:-1.5,max:1,step:.001,value:R.cRe,onChange:k=>{R.cRe=k}},{type:"slider",id:"julia-cIm",label:"C-IM",min:-1,max:1,step:.001,value:R.cIm,onChange:k=>{R.cIm=k}},{type:"slider",id:"julia-zoomDepth",label:"ZOOM",min:2,max:25,step:.1,value:R.zoomDepth,onChange:k=>{R.zoomDepth=k}},{type:"slider",id:"julia-targetX",label:"T-X",min:-2,max:2,step:1e-4,value:R.targetX,onChange:k=>{R.targetX=k}},{type:"slider",id:"julia-targetY",label:"T-Y",min:-2,max:2,step:1e-4,value:R.targetY,onChange:k=>{R.targetY=k}},{type:"slider",id:"julia-speed",label:"SPD",min:.005,max:.3,step:.005,value:R.speed,onChange:k=>{R.speed=k,localStorage.setItem("ankifx_julia_speed",k)}}),ue.controls.push(w);let y=document.getElementById("afx-effect-controls-container");y&&(v=document.createElement("div"),v.id="afx-julia-debug-info",v.className="afx-control-row julia-debug-el",v.style.cssText="height: 20px !important; margin-bottom: 2px; pointer-events: none; justify-content: flex-end; opacity: 0.8; font-size: 11px !important; color: #ff00ff; border: none; background: transparent;",v.textContent="HOVER TO SEE TARGET COORDS",y.prepend(v)),m=(k,_,A)=>{let I=A*R.speed/Math.max(R.zoomDepth,1)%2,O=I>1?2-I:I,C=O<.5?4*Math.pow(O,3):1-Math.pow(-2*O+2,3)/2,B=2.2/Math.exp(C*R.zoomDepth),N=C*Math.PI*.5,q=(k-Oe/2)/Me,G=(Me/2-_)/Me,V=Math.cos(N),W=Math.sin(N),L=(V*q+W*G)*B,$=(-W*q+V*G)*B;return{tx:R.targetX+L,ty:R.targetY+$}};let E=k=>{if(k.target.closest("#afx-bottom-dock")||k.target.closest(".afx-dialog"))return;let _=performance.now()*.001-b,{tx:A,ty:I}=m(k.clientX,k.clientY,_);R.targetX=A,R.targetY=I,AnkiFX.setControlValue("julia-targetX",A),AnkiFX.setControlValue("julia-targetY",I)};window.addEventListener("mousedown",E),At=E;let x=k=>{Tt.x=k.clientX,Tt.y=k.clientY};window.addEventListener("mousemove",x),_t=x}let b=performance.now()*.001;function P(){let y=performance.now()*.001-b;if(e.uniform1f(n,y),e.uniform1f(h,R.speed),e.uniform2f(c,R.cRe,R.cIm),e.uniform1f(l,R.zoomDepth),e.uniform2f(d,R.targetX,R.targetY),e.drawArrays(e.TRIANGLE_STRIP,0,4),r.clearRect(0,0,Oe,Me),v&&m){let E=performance.now()*.001-b,{tx:x,ty:k}=m(Tt.x,Tt.y,E);v.textContent=`TARGET X: ${x.toFixed(6)}, Y: ${k.toFixed(6)}`}Dt=requestAnimationFrame(P)}P()}function oo(){Dt&&(cancelAnimationFrame(Dt),Dt=null),At&&(window.removeEventListener("mousedown",At),At=null),_t&&(window.removeEventListener("mousemove",_t),_t=null),document.querySelectorAll(".julia-debug-el").forEach(i=>i.remove()),It=null,ot=null}var at=null,Xe=0,De=0,T=null,X=null,Te=[],Lt=0,nt=null,te={x:-1e3,y:-1e3,dx:0,dy:0,down:!1},ji=null,Hi={id:"lavalamp",name:"Lava Lamp",run:so,stop:ho,onResize:uo,marqueeFont:{color:"#ffccaa",shadowColor:"rgba(255, 100, 0, 0.8)",shadowBlur:10}},Se=6,Rt=class{constructor(t,e,r,a){this.pos={x:t,y:e},this.vel={x:0,y:-(Math.random()*.6+.3)},this.radius=r;let s=e/a;this.temperature=.15+s*.3+Math.random()*.15,this.buoyancy=0,this.noiseOffset=Math.random()*1e3,this.smoothSpeedY=0}update(t,e,r){this.pos.y>r*.8?this.temperature+=.05*t:this.pos.y>r*.6?this.temperature+=.02*t:this.pos.y<r*.2?this.temperature-=.04*t:this.pos.y<r*.4&&(this.temperature-=.015*t),this.temperature=Math.max(0,Math.min(1,this.temperature)),this.buoyancy=this.temperature*4-2,this.vel.y-=this.buoyancy*10*t;let a=Math.sin(this.noiseOffset+Lt*2e-4)*.1;this.vel.x+=a*t*.3;let s=1-Math.min(Math.abs(this.buoyancy)/.8,1),f=(e*.5-this.pos.x)*.003*s;this.vel.x+=f*t,this.pos.x<this.radius&&(this.vel.x+=(this.radius-this.pos.x)*2*t),this.pos.x>e-this.radius&&(this.vel.x-=(this.pos.x-(e-this.radius))*2*t);let o=-this.radius*.5;this.pos.y<o&&(this.vel.y+=(o-this.pos.y)*8*t);let n=r+this.radius*.5;this.pos.y>n&&(this.vel.y-=(this.pos.y-n)*8*t);let h=Math.pow(.97,t*60);this.vel.x*=h;let l=Math.abs(this.buoyancy)>.8,d=Math.pow(l?.994:.975,t*60);this.vel.y*=d;let v=Math.max(0,(this.pos.y-r*.82)/(r*.18)),m=Math.max(0,(r*.18-this.pos.y)/(r*.18)),u=Math.pow(.88,t*60*(v+m));if(this.vel.x*=u,te.down){let g=this.pos.x-te.x,p=this.pos.y-te.y,w=Math.sqrt(g*g+p*p);if(w<200){let b=(200-w)/200;this.vel.x+=te.dx*b*1.5,this.vel.y+=te.dy*b*8}}this.smoothSpeedY+=(Math.abs(this.vel.y)-this.smoothSpeedY)*(1-Math.pow(.05,t)),this.pos.x+=this.vel.x*t,this.pos.y+=this.vel.y*t}},ao=`
    attribute vec2 aPosition;
    varying vec2 vUv;
    void main() {
        vUv = aPosition * 0.5 + 0.5;
        // Match canvas 2D coordinates (Y=0 is top)
        vUv.y = 1.0 - vUv.y;
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }
`,no=`
    precision highp float;
    varying vec2 vUv;
    
    uniform vec2 uResolution;
    uniform float uTime;
    
    uniform vec4 uBlobs[${Se}]; // x, y, radius, stretch
    uniform float uBlobTemp[${Se}]; // temperature
    
    // Polynomial smooth minimum
    float smin(float a, float b, float k) {
        float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
        return mix(b, a, h) - k * h * (1.0 - h);
    }
    
    float map(vec2 p) {
        float d = 10000.0;
        for (int i = 0; i < ${Se}; i++) {
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
`;function qi(i,t){let e=T.createShader(i);return T.shaderSource(e,t),T.compileShader(e),T.getShaderParameter(e,T.COMPILE_STATUS)?e:(console.error("Shader compile error:",T.getShaderInfoLog(e)),T.deleteShader(e),null)}function lo(){let i=qi(T.VERTEX_SHADER,ao),t=qi(T.FRAGMENT_SHADER,no);if(X=T.createProgram(),T.attachShader(X,i),T.attachShader(X,t),T.linkProgram(X),!T.getProgramParameter(X,T.LINK_STATUS))return console.error("Program link error:",T.getProgramInfoLog(X)),!1;T.useProgram(X),nt=T.createBuffer(),T.bindBuffer(T.ARRAY_BUFFER,nt);let e=new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]);T.bufferData(T.ARRAY_BUFFER,e,T.STATIC_DRAW);let r=T.getAttribLocation(X,"aPosition");return T.enableVertexAttribArray(r),T.vertexAttribPointer(r,2,T.FLOAT,!1,0,0),X.uResolution=T.getUniformLocation(X,"uResolution"),X.uTime=T.getUniformLocation(X,"uTime"),X.uBlobs=T.getUniformLocation(X,"uBlobs"),X.uBlobTemp=T.getUniformLocation(X,"uBlobTemp"),!0}function so(i,t){if(T=i.gl,ji=i.canvasGL,Xe=i.width,De=i.height,!T){console.error("WebGL context required for Lava Lamp");return}if(!lo())return;Te=[];let e=0;for(;Te.length<Se&&e<200;){e++;let r=70+Math.random()*60,a=r+Math.random()*(Xe-r*2),s=r+Math.random()*(De-r*2),f=!1;for(let o of Te){let n=o.pos.x-a,h=o.pos.y-s;if(Math.sqrt(n*n+h*h)<o.radius+r+10){f=!0;break}}f||Te.push(new Rt(a,s,r,De))}for(;Te.length<Se;){let r=70+Math.random()*60,a=r+Math.random()*(Xe-r*2),s=r+Math.random()*(De-r*2);Te.push(new Rt(a,s,r,De))}Lt=performance.now(),fo(),at=requestAnimationFrame($i)}function uo(i,t,e){Xe=i,De=t,T&&T.viewport(0,0,i*e,t*e)}function $i(i){let t=Math.min((i-Lt)/1e3,.05);Lt=i;let e=new Float32Array(Se*4),r=new Float32Array(Se);for(let a=0;a<Se;a++)Te[a].update(t,Xe,De);for(let a=0;a<Se;a++){let s=Te[a],f=Math.max(.85,1+Math.min(s.smoothSpeedY*.028,.7)*(.4+s.temperature*.6));e[a*4+0]=s.pos.x,e[a*4+1]=s.pos.y,e[a*4+2]=s.radius,e[a*4+3]=f,r[a]=s.temperature}T.useProgram(X),T.uniform2f(X.uResolution,Xe,De),T.uniform1f(X.uTime,i*.001),T.uniform4fv(X.uBlobs,e),T.uniform1fv(X.uBlobTemp,r),T.drawArrays(T.TRIANGLES,0,6),te.dx=0,te.dy=0,at=requestAnimationFrame($i)}function lt(i){let t=ji.getBoundingClientRect(),e=i.touches?i.touches[0]:i,r=e.clientX-t.left,a=e.clientY-t.top;if(te.down&&i.type!=="mousedown"&&i.type!=="touchstart"){let s=r-te.x,f=a-te.y;Math.abs(s)<150&&Math.abs(f)<150&&(te.dx=s,te.dy=f)}te.x=r,te.y=a}function zt(i){te.dx=0,te.dy=0,te.down=!0,lt(i)}function Ot(){te.down=!1}function fo(){window.addEventListener("mousedown",zt),window.addEventListener("mousemove",lt),window.addEventListener("mouseup",Ot),window.addEventListener("touchstart",zt,{passive:!0}),window.addEventListener("touchmove",lt,{passive:!0}),window.addEventListener("touchend",Ot)}function co(){window.removeEventListener("mousedown",zt),window.removeEventListener("mousemove",lt),window.removeEventListener("mouseup",Ot),window.removeEventListener("touchstart",zt),window.removeEventListener("touchmove",lt),window.removeEventListener("touchend",Ot)}function ho(){at&&(cancelAnimationFrame(at),at=null),co(),T&&(T.clearColor(0,0,0,0),T.clear(T.COLOR_BUFFER_BIT),X&&T.deleteProgram(X),nt&&T.deleteBuffer(nt),X=null,nt=null)}var Bt=null,st,Ue,ut,jt,Ht={id:"mandelbrot",name:"Mandelbrot",run:po,stop:mo,onResize:(i,t,e)=>{st=i,Ue=t,jt&&ut&&jt.uniform2f(ut,i*e,t*e)},preferredTrack:{title:"Acoustica Power Bundle 4",trackTitle:"AiR"},marqueeFont:{color:"#FFF",outline:"#000"}},Nt=null,qt=null,Ut={x:0,y:0},ee={targetX:-.743643887037151,targetY:.13182590420533,zoomDepth:11,speed:parseFloat(localStorage.getItem("ankifx_mandelbrot_speed"))||.15};function po(i,t={}){jt=i.gl;let e=i.gl,r=i.ctx2d;st=i.width,Ue=i.height;let a=i.dpr,o=Mt(e,`
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
    `),n=e.getUniformLocation(o,"u_time"),h=e.getUniformLocation(o,"u_speed"),c=e.getUniformLocation(o,"u_zoomDepth"),l=e.getUniformLocation(o,"u_target");ut=e.getUniformLocation(o,"u_resolution"),e.uniform2f(ut,st*a,Ue*a);let d=null,v=null;if(t.debug){Ht.controls=[{type:"slider",id:"mandelbrot-zoomDepth",label:"ZOOM",min:2,max:25,step:.1,value:ee.zoomDepth,onChange:b=>{ee.zoomDepth=b}},{type:"slider",id:"mandelbrot-targetX",label:"T-X",min:-2.5,max:1,step:1e-4,value:ee.targetX,onChange:b=>{ee.targetX=b}},{type:"slider",id:"mandelbrot-targetY",label:"T-Y",min:-1.5,max:1.5,step:1e-4,value:ee.targetY,onChange:b=>{ee.targetY=b}},{type:"slider",id:"mandelbrot-speed",label:"SPD",min:.005,max:.3,step:.005,value:ee.speed,onChange:b=>{ee.speed=b,localStorage.setItem("ankifx_mandelbrot_speed",b)}}];let g=document.getElementById("afx-effect-controls-container");g&&(d=document.createElement("div"),d.id="afx-mandelbrot-debug-info",d.className="afx-control-row mandelbrot-debug-el",d.style.cssText="height: 20px !important; margin-bottom: 2px; pointer-events: none; justify-content: flex-end; opacity: 0.8; font-size: 11px !important; color: #ff00ff; border: none; background: transparent;",d.textContent="HOVER TO SEE TARGET COORDS",g.prepend(d)),v=(b,P,y)=>{let E=y*ee.speed/Math.max(ee.zoomDepth,1)%2,x=E>1?2-E:E,k=x<.5?4*Math.pow(x,3):1-Math.pow(-2*x+2,3)/2,_=Math.exp(k*ee.zoomDepth),A=(b-st/2)/Ue,I=(Ue/2-P)/Ue;return{tx:ee.targetX+A*(2.5/_),ty:ee.targetY+I*(2.5/_)}};let p=b=>{if(b.target.closest("#afx-bottom-dock")||b.target.closest(".afx-dialog"))return;let P=performance.now()*.001-m,{tx:y,ty:E}=v(b.clientX,b.clientY,P);ee.targetX=y,ee.targetY=E,AnkiFX.setControlValue("mandelbrot-targetX",y),AnkiFX.setControlValue("mandelbrot-targetY",E)};window.addEventListener("mousedown",p),Nt=p;let w=b=>{Ut.x=b.clientX,Ut.y=b.clientY};window.addEventListener("mousemove",w),qt=w}else Ht.controls=[];let m=performance.now()*.001;function u(){let g=performance.now()*.001-m;if(e.uniform1f(n,g),e.uniform1f(h,ee.speed),e.uniform1f(c,ee.zoomDepth),e.uniform2f(l,ee.targetX,ee.targetY),e.drawArrays(e.TRIANGLE_STRIP,0,4),r.clearRect(0,0,st,Ue),d&&v){let p=performance.now()*.001-m,{tx:w,ty:b}=v(Ut.x,Ut.y,p);d.textContent=`TARGET X: ${w.toFixed(6)}, Y: ${b.toFixed(6)}`}Bt=requestAnimationFrame(u)}u()}function mo(){Bt&&(cancelAnimationFrame(Bt),Bt=null),Nt&&(window.removeEventListener("mousedown",Nt),Nt=null),qt&&(window.removeEventListener("mousemove",qt),qt=null),document.querySelectorAll(".mandelbrot-debug-el").forEach(i=>i.remove()),jt=null,ut=null}var ft=null,Gt,$t,Xt=16,Ae=[];function Xi(){let i=Math.floor(Gt/Xt);Ae=[];for(let t=0;t<i;t++)Ae[t]=Math.random()*-100}var Gi={id:"matrix",name:"Matrix",run:go,stop:vo,onResize:(i,t)=>{Gt=i,$t=t,Xi()},preferredTrack:{trackTitle:"nightfall"},marqueeFont:{color:"#0F0",shadowColor:"#0F0",shadowBlur:10}};function go(i,t){let e=i.ctx2d;Gt=i.width,$t=i.height,Xi();let r="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*]*";function a(){e.fillStyle="rgba(0, 0, 0, 0.1)",e.fillRect(0,0,Gt,$t),e.fillStyle="#0F0",e.font=Xt+"px monospace";for(let s=0;s<Ae.length;s++)if(Ae[s]>0||Math.random()>.95){let f=r.charAt(Math.floor(Math.random()*r.length)),o=Ae[s]*Xt;e.fillText(f,s*Xt,o),o>$t&&Math.random()>.975&&(Ae[s]=0),Ae[s]++}else Ae[s]+=.5;ft=requestAnimationFrame(a)}ft=requestAnimationFrame(a)}function vo(){ft&&(cancelAnimationFrame(ft),ft=null)}var Vi={id:"none",name:"None",run:bo,stop:xo,marqueeFont:{color:"#ffffff",shadowColor:"rgba(0,0,0,0.8)",shadowBlur:5}};function bo(i,t){i.ctx2d.clearRect(0,0,i.width,i.height)}function xo(){}var ct=null,ie,we,Wi={id:"starfield",name:"Starfield",run:wo,stop:yo,onResize:(i,t)=>{ie=i,we=t},preferredTrack:{trackTitle:"star wars title"},marqueeFont:{color:"#FFE81F",shadowColor:"#FFE81F",shadowBlur:20,outline:"#000"}};function wo(i,t){let e=i.ctx2d;ie=i.width,we=i.height;let r=[],a=8e3,s=new Uint8Array(512),f=new Uint8Array(256).map(()=>Math.random()*256);for(let g=0;g<512;g++)s[g]=f[g&255];let o=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]];function n(g,p,w,b){return g[0]*p+g[1]*w+g[2]*b}function h(g,p,w){let b,P,y,E,x=.3333333333333333,k=1/6,_=(g+p+w)*x,A=Math.floor(g+_),I=Math.floor(p+_),O=Math.floor(w+_),C=(A+I+O)*k,U=g-A+C,B=p-I+C,N=w-O+C,q,G,V,W,L,$;U>=B?B>=N?(q=1,G=0,V=0,W=1,L=1,$=0):U>=N?(q=1,G=0,V=0,W=1,L=0,$=1):(q=0,G=0,V=1,W=1,L=0,$=1):B<N?(q=0,G=0,V=1,W=0,L=1,$=1):U<N?(q=0,G=1,V=0,W=0,L=1,$=1):(q=0,G=1,V=0,W=1,L=1,$=0);let K=U-q+k,ne=B-G+k,se=N-V+k,re=U-W+2*k,S=B-L+2*k,D=N-$+2*k,M=U-1+3*k,z=B-1+3*k,j=N-1+3*k,fe=A&255,ke=I&255,Le=O&255,Ee=.6-U*U-B*B-N*N;Ee<0?b=0:(Ee*=Ee,b=Ee*Ee*n(o[s[fe+s[ke+s[Le]]]%12],U,B,N));let Pe=.6-K*K-ne*ne-se*se;Pe<0?P=0:(Pe*=Pe,P=Pe*Pe*n(o[s[fe+q+s[ke+G+s[Le+V]]]%12],K,ne,se));let Ce=.6-re*re-S*S-D*D;Ce<0?y=0:(Ce*=Ce,y=Ce*Ce*n(o[s[fe+W+s[ke+L+s[Le+$]]]%12],re,S,D));let Re=.6-M*M-z*z-j*j;return Re<0?E=0:(Re*=Re,E=Re*Re*n(o[s[fe+1+s[ke+1+s[Le+1]]]%12],M,z,j)),32*(b+P+y+E)}function c(g,p,w,b=3){let P=0,y=.5;for(let E=0;E<b;E++)P+=h(g,p,w)*y,g*=2,p*=2,w*=2,y*=.5;return P}class l{constructor(){this.active=!1,this.nextSpawn=Date.now()+2e3}reset(){let p=Math.random()*Math.PI*2,w=.2+Math.random()*.4;this.x=Math.cos(p)*ie*w,this.y=Math.sin(p)*we*w,this.z=ie,this.sizeBase=80+Math.random()*120,this.speed=.8,this.active=!0,this.type=1+Math.floor(Math.random()*2);let b=[{name:"ice",baseH:190+Math.random()*40,sat:60,l:70},{name:"inferno",baseH:Math.random()*40,sat:80,l:60},{name:"toxic",baseH:80+Math.random()*40,sat:70,l:60},{name:"ethereal",baseH:260+Math.random()*40,sat:60,l:75},{name:"classic",baseH:30+Math.random()*20,sat:50,l:80}],P=b[Math.floor(Math.random()*b.length)];this.generateGasGiantTexture(P),this.type===2&&(this.rings=Array.from({length:4},(y,E)=>({r1:1.6+E*.2,opacity:.2+Math.random()*.4})))}hslToRgb(p,w,b){p/=360,w/=100,b/=100;let P,y,E;if(w===0)P=y=E=b;else{let x=b<.5?b*(1+w):b+w-b*w,k=2*b-x,_=A=>(A<0&&(A+=1),A>1&&(A-=1),A<1/6?k+(x-k)*6*A:A<1/2?x:A<2/3?k+(x-k)*(2/3-A)*6:k);P=_(p+1/3),y=_(p),E=_(p-1/3)}return{r:P*255,g:y*255,b:E*255}}generateGasGiantTexture(p){let w=document.createElement("canvas");w.width=w.height=256;let b=w.getContext("2d"),P=b.createImageData(256,256),y=p.baseH,E=this.hslToRgb(y,p.sat,p.l),x=this.hslToRgb((y+20)%360,p.sat+10,p.l-10),k=this.hslToRgb((y-40+360)%360,p.sat+20,p.l-15),_=this.hslToRgb((y+60)%360,p.sat-20,p.l+10),A=(O,C,U)=>({r:O.r+(C.r-O.r)*U,g:O.g+(C.g-O.g)*U,b:O.b+(C.b-O.b)*U}),I=Math.random()*1e3;for(let O=0;O<256;O++)for(let C=0;C<256;C++){let U=O/256*10,B=C/256*10,N=Math.abs(c(0,U*.4,I,3)),q=U+c(B*.5,U*.5,I)*N*4,G=B+c(U*.5,B*.5,I+50)*N*2,V=(c(0,q*.8,I+100,4)+1)/2,W=(c(G*.1,q*1.5,I+200,2)+1)/2,L=A(x,E,V);V>.7&&(L=A(L,_,(V-.7)*2)),W>.6&&(L=A(L,k,(W-.6)*1.5));let $=1+c(G,q,I+300,2)*.2,K=(O*256+C)*4;P.data[K]=Math.min(255,L.r*$),P.data[K+1]=Math.min(255,L.g*$),P.data[K+2]=Math.min(255,L.b*$),P.data[K+3]=255}b.putImageData(P,0,0),this.textureCanvas=w}update(){if(!this.active){Date.now()>this.nextSpawn&&this.reset();return}this.z-=this.speed,this.z<=0&&(this.active=!1,this.nextSpawn=Date.now())}draw(p){if(!this.active)return;let w=ie/2/this.z,b=this.x*w+ie/2,P=this.y*w+we/2,y=(1-this.z/ie)*this.sizeBase;if(b<-y*3||b>ie+y*3||P<-y*3||P>we+y*3)return;p.save(),p.translate(b,P),this.type===2&&(this.drawRings(p,y,!0),p.globalAlpha=1);let E=p.createRadialGradient(0,0,y*.9,0,0,y*1.5);E.addColorStop(0,"rgba(255, 255, 255, 0.15)"),E.addColorStop(1,"rgba(0,0,0,0)"),p.fillStyle=E,p.beginPath(),p.arc(0,0,y*1.5,0,Math.PI*2),p.fill(),p.save(),p.beginPath(),p.arc(0,0,y,0,Math.PI*2),p.clip(),p.globalAlpha=1,p.drawImage(this.textureCanvas,-y,-y,y*2,y*2);let x=p.createRadialGradient(-y*.5,-y*.5,y*.1,0,0,y);x.addColorStop(0,"rgba(255, 255, 255, 0.25)"),x.addColorStop(.5,"rgba(0, 0, 0, 0)"),x.addColorStop(1,"rgba(0, 0, 0, 0.4)"),p.fillStyle=x,p.fillRect(-y,-y,y*2,y*2),p.restore();let k=p.createRadialGradient(0,0,y*.7,0,0,y);k.addColorStop(1,"rgba(255,255,255,0.4)"),k.addColorStop(.8,"rgba(255,255,255,0)"),p.fillStyle=k,p.beginPath(),p.arc(0,0,y,0,Math.PI*2),p.fill(),this.type===2&&(this.drawRings(p,y,!1),p.globalAlpha=1),p.restore()}drawRings(p,w,b){p.save();let P=Math.PI/8;for(let y of this.rings)p.globalAlpha=y.opacity,p.strokeStyle="#E6E6FA",p.lineWidth=w*.15,p.beginPath(),p.ellipse(0,0,y.r1*w,y.r1*.3*w,P,0,Math.PI*2),p.stroke();p.restore()}}let d=new l,v=["#FFFFFF","#FFE4B5","#E0FFFF","#FFF0F5","#F0F8FF"];for(let g=0;g<a;g++)r.push({x:(Math.random()-.5)*ie*4,y:(Math.random()-.5)*we*4,z:Math.random()*ie,color:v[Math.floor(Math.random()*v.length)],sizeBase:2+Math.random()*2.5});let m=0;function u(){e.fillStyle="rgba(5, 5, 12, 1)",e.fillRect(0,0,ie,we);let g=ie/2,p=we/2;m+=.01,d.update(),d.draw(e);for(let w=0;w<a;w++){let b=r[w],P=b.z;if(b.z-=4,b.z<=0){b.x=(Math.random()-.5)*ie*4,b.y=(Math.random()-.5)*we*4,b.z=ie;continue}let y=ie/2/b.z,E=b.x*y+g,x=b.y*y+p;if(E>=0&&E<=ie&&x>=0&&x<=we){let k=1-b.z/ie,_=k*b.sizeBase;if(k<.3){e.globalAlpha=k*2,e.fillStyle=b.color,e.fillRect(E,x,Math.max(1,_),Math.max(1,_));continue}e.globalAlpha=k,e.fillStyle=b.color,e.strokeStyle=b.color;let A=ie/2/P,I=b.x*A+g,O=b.y*A+p;e.lineWidth=_,e.beginPath(),e.moveTo(I,O),e.lineTo(E,x),e.stroke(),e.beginPath(),e.arc(E,x,_/2,0,Math.PI*2),e.fill(),k>.8&&(e.globalAlpha=(k-.8)*3,e.beginPath(),e.arc(E,x,_*2.5,0,Math.PI*2),e.fill())}}e.globalAlpha=1,ct=requestAnimationFrame(u)}ct=requestAnimationFrame(u)}function yo(){ct&&(cancelAnimationFrame(ct),ct=null)}var ht=null,Be,dt,Vt=0,Wt=0,ge=null;function Ki(){if(Be===void 0||dt===void 0)return;let i=Math.max(100,Wt),t=Math.max(14,Math.floor(Be/25)),e=Math.floor(Be/t),r=Math.floor(i/t);ge=new wi(e,r,t)}var Ji={id:"tetris",name:"Tetris",run:ko,stop:Eo,onResize:(i,t)=>{Be=i,dt=t;let e=getComputedStyle(document.documentElement);Vt=parseInt(e.getPropertyValue("--io-header"))||0,Wt=t-Vt,Ki()},preferredTrack:{title:"WinTask 3",trackTitle:"Whoopees Tetris"},marqueeFont:{color:"#f0f0f0",shadowColor:"#a000f0",shadowBlur:12,outline:"#000"}},Zi={I:{shapes:[[[1,1,1,1]],[[1],[1],[1],[1]]],color:"#00f0f0"},O:{shapes:[[[1,1],[1,1]]],color:"#f0f000"},T:{shapes:[[[0,1,0],[1,1,1]],[[1,0],[1,1],[1,0]],[[1,1,1],[0,1,0]],[[0,1],[1,1],[0,1]]],color:"#a000f0"},S:{shapes:[[[0,1,1],[1,1,0]],[[1,0],[1,1],[0,1]]],color:"#00f000"},Z:{shapes:[[[1,1,0],[0,1,1]],[[0,1],[1,1],[1,0]]],color:"#f00000"},J:{shapes:[[[1,0,0],[1,1,1]],[[1,1],[1,0],[1,0]],[[1,1,1],[0,0,1]],[[0,1],[0,1],[1,1]]],color:"#0000f0"},L:{shapes:[[[0,0,1],[1,1,1]],[[1,0],[1,0],[1,1]],[[1,1,1],[1,0,0]],[[1,1],[0,1],[0,1]]],color:"#f0a000"}},Yi=Object.keys(Zi),xi=class{constructor(t,e,r){this.x=t,this.y=e,this.color=r,this.vx=(Math.random()-.5)*12,this.vy=(Math.random()-.7)*14,this.gravity=.45,this.life=1,this.decay=.012+Math.random()*.018,this.size=1+Math.random()*2.5}update(){this.vx*=.985,this.vy+=this.gravity,this.x+=this.vx,this.y+=this.vy,this.life-=this.decay}draw(t){t.globalAlpha=Math.max(0,this.life),t.fillStyle=this.color,t.fillRect(this.x,this.y,this.size,this.size)}},wi=class{constructor(t,e,r){this.cols=t,this.rows=e,this.cellSize=r,this.board=Array.from({length:e},()=>Array(t).fill(null)),this.particles=[],this.exploding=!1,this.explodeTimer=0,this.EXPLODE_DURATION=120,this.level=1,this.linesTotal=0,this.dropCounter=0,this.moveCounter=0,this._spawnPiece()}_randomPiece(){let t=Yi[Math.floor(Math.random()*Yi.length)],e=Zi[t],r=Math.floor(Math.random()*e.shapes.length);return{shape:e.shapes[r],color:e.color,key:t,rotIdx:r,def:e}}_spawnPiece(){let t=this._randomPiece();this.current={...t,x:Math.floor((this.cols-t.shape[0].length)/2),y:0},this._selectTarget()}_fits(t,e,r){for(let a=0;a<t.length;a++)for(let s=0;s<t[a].length;s++){if(!t[a][s])continue;let f=e+s,o=r+a;if(f<0||f>=this.cols||o>=this.rows||o>=0&&this.board[o][f]!==null)return!1}return!0}_lock(){let{shape:t,x:e,y:r,color:a}=this.current;for(let s=0;s<t.length;s++)for(let f=0;f<t[s].length;f++){if(!t[s][f])continue;let o=r+s,n=e+f;o>=0&&o<this.rows&&n>=0&&n<this.cols&&(this.board[o][n]=a)}this._clearRows()}_clearRows(){let t=0;for(let e=this.rows-1;e>=0;e--)this.board[e].every(r=>r!==null)&&(this.board.splice(e,1),this.board.unshift(Array(this.cols).fill(null)),t++,e++);return t>0&&(this.linesTotal+=t,this.level=Math.floor(this.linesTotal/10)+1),t}_choosePlacement(){let{def:t}=this.current,e=-1/0,r=this.current.x,a=this.current.rotIdx;for(let s=0;s<t.shapes.length;s++){let f=t.shapes[s],o=f[0].length;for(let n=0;n<=this.cols-o;n++){let h=0;for(;this._fits(f,n,h+1);)h++;if(!this._fits(f,n,h))continue;let c=this._getHeuristicScore(f,n,h);c>e&&(e=c,r=n,a=s)}}return{x:r,rotIdx:a}}_getHeuristicScore(t,e,r){let a=this.board.map(c=>[...c]);for(let c=0;c<t.length;c++)for(let l=0;l<t[c].length;l++){if(!t[c][l])continue;let d=r+c,v=e+l;d>=0&&d<this.rows&&(a[d][v]="X")}let s=0;for(let c=0;c<this.rows;c++)a[c].every(l=>l!==null)&&s++;let f=Array(this.cols).fill(0),o=0;for(let c=0;c<this.cols;c++)for(let l=0;l<this.rows;l++)if(a[l][c]!==null){f[c]=this.rows-l,o+=f[c];break}let n=0;for(let c=0;c<this.cols;c++){let l=!1;for(let d=0;d<this.rows;d++)a[d][c]!==null?l=!0:l&&n++}let h=0;for(let c=0;c<this.cols-1;c++)h+=Math.abs(f[c]-f[c+1]);return o*-.51+s*.76+n*-.35+h*-.18+Math.random()*.1}_isBoardFull(){for(let t=0;t<3;t++)if(this.board[t].some(e=>e!==null))return!0;return!1}_explodeBoard(t,e){for(let r=0;r<this.rows;r++)for(let a=0;a<this.cols;a++)if(this.board[r][a]){let s=t+a*this.cellSize+this.cellSize/2,f=e+r*this.cellSize+this.cellSize/2,o=4+Math.floor(Math.random()*4);for(let n=0;n<o;n++)this.particles.push(new xi(s,f,this.board[r][a]))}}_reset(){this.board=Array.from({length:this.rows},()=>Array(this.cols).fill(null)),this.exploding=!1,this.explodeTimer=0,this.particles=[],this._spawnPiece()}_selectTarget(){let{x:t,rotIdx:e}=this._choosePlacement(),r=this.current.def;this.current.rotIdx=e,this.current.shape=r.shapes[e],this.current.targetX=t,this.current.y=0,this.current.x=Math.floor((this.cols-this.current.shape[0].length)/2)}step(t,e){if(this.exploding){this.explodeTimer++,this.particles=this.particles.filter(s=>s.life>0),this.particles.forEach(s=>s.update()),this.explodeTimer>=this.EXPLODE_DURATION&&this._reset();return}this.moveCounter++,this.moveCounter>=2&&(this.moveCounter=0,this.current.x<this.current.targetX?this._fits(this.current.shape,this.current.x+1,this.current.y)&&this.current.x++:this.current.x>this.current.targetX&&this._fits(this.current.shape,this.current.x-1,this.current.y)&&this.current.x--);let r=this.current.x===this.current.targetX,a=Math.max(4,40-(this.level-1)*3);r&&(a=1),this.dropCounter++,this.dropCounter>=a&&(this.dropCounter=0,this._fits(this.current.shape,this.current.x,this.current.y+1)?this.current.y++:(this._lock(),this._isBoardFull()?(this._explodeBoard(t,e),this.exploding=!0,this.explodeTimer=0):this._spawnPiece()))}draw(t,e,r){let a=this.cellSize,s={};for(let f=0;f<this.rows;f++)for(let o=0;o<this.cols;o++){let n=this.board[f][o];n&&(s[n]||(s[n]=[]),s[n].push({px:e+o*a,py:r+f*a,alpha:this.exploding?Math.max(0,1-this.explodeTimer/40):1}))}if(!this.exploding&&this.current){let{shape:f,x:o,y:n,color:h}=this.current;if(h){s[h]||(s[h]=[]);for(let c=0;c<f.length;c++)for(let l=0;l<f[c].length;l++)f[c][l]&&s[h].push({px:e+(o+l)*a,py:r+(n+c)*a,alpha:1})}}for(let f in s){let o=s[f];t.fillStyle=f,o.forEach(n=>{t.globalAlpha=n.alpha,t.fillRect(n.px+1,n.py+1,a-2,a-2)})}t.globalAlpha=1,t.strokeStyle="rgba(255, 255, 255, 0.35)",t.lineWidth=1.5,t.beginPath();for(let f in s)s[f].forEach(o=>{t.globalAlpha=o.alpha;let n=o.px,h=o.py;t.moveTo(n+1,h+a-2),t.lineTo(n+1,h+1),t.lineTo(n+a-2,h+1)});t.stroke(),t.strokeStyle="rgba(0, 0, 0, 0.45)",t.beginPath();for(let f in s)s[f].forEach(o=>{t.globalAlpha=o.alpha;let n=o.px,h=o.py;t.moveTo(n+1,h+a-1),t.lineTo(n+a-1,h+a-1),t.lineTo(n+a-1,h+1)});t.stroke(),t.globalAlpha=1,t.save(),this.particles.forEach(f=>f.draw(t)),t.restore(),t.globalAlpha=1}};function ko(i,t){let e=i.ctx2d;Be=i.width,dt=i.height,Vt=i.topInset||0,Wt=i.visibleHeight||dt,Ki();function r(){if(e.fillStyle="rgba(8, 6, 18, 0.92)",e.fillRect(0,0,Be,dt),e.strokeStyle="rgba(255,255,255,0.04)",e.lineWidth=.5,ge){let a=ge.cellSize,s=Math.floor((Be-ge.cols*a)/2),f=Vt+(Wt-ge.rows*a);e.beginPath();for(let o=0;o<=ge.cols;o++)e.moveTo(s+o*a,f),e.lineTo(s+o*a,f+ge.rows*a);for(let o=0;o<=ge.rows;o++)e.moveTo(s,f+o*a),e.lineTo(s+ge.cols*a,f+o*a);e.stroke(),ge.step(s,f),ge.draw(e,s,f)}ht=requestAnimationFrame(r)}ht=requestAnimationFrame(r)}function Eo(){ht&&(cancelAnimationFrame(ht),ht=null)}var J={aurora:Li,debug:Ri,ecg:me,fire:zi,geometry:Oi,gradient:bi,julia:ue,lavalamp:Hi,mandelbrot:Ht,matrix:Gi,none:Vi,starfield:Wi,tetris:Ji};var Yt=class{constructor(t="",e="bottom",r={}){this.text=t,this.position=e,this.applyStyles(r),this.time=0,this.textX=0,this.initialized=!1,this.baseCharWidth=15,this.baseFontSize=24,this.baseVelocity=2.8,this.baseBounce=12,this.fontFamily='"Courier New", monospace',this.fontWeight="bold",this.enabled=!0}applyStyles(t={}){this.color=t.color||"#FFF",this.outline=t.outline||null,this.shadowColor=t.shadowColor||null,this.shadowBlur=t.shadowBlur||0,this.colorFn=t.colorFn||null}updateStyles(t={}){this.applyStyles(t)}setText(t){this.text=t}setPosition(t){this.position=t}render(t,e,r){if(!this.enabled)return;this.initialized||(this.textX=e,this.initialized=!0);let a=e<480?.65:e<768?.8:1,s=Math.max(12,Math.floor(this.baseFontSize*a)),f=this.baseBounce*a,o=this.baseCharWidth*a,n=this.baseVelocity*a;if(this.time+=.012,!this.text)return;let h=this.text.length*o;this.textX-=n,this.textX<-(h+e*1.1)&&(this.textX=e),t.font=`${this.fontWeight} ${s}px ${this.fontFamily}`,t.lineJoin="round",this.outline&&(t.lineWidth=4,t.strokeStyle=this.outline);let c=50*a,l=32*a,d=this.position==="bottom"?r-l:c;for(let v=0;v<this.text.length;v++){let m=this.text[v],u=this.textX+v*o;if(u>-40&&u<e+40){let g=d+Math.sin(this.time*4+v*.1)*f;t.fillStyle=this.colorFn?this.colorFn(this.time,v):this.color,this.shadowColor?(t.shadowColor=this.shadowColor==="inherit"?t.fillStyle:this.shadowColor,t.shadowBlur=this.shadowBlur):t.shadowBlur=0,this.outline&&t.strokeText(m,u,g),t.fillText(m,u,g),this.shadowColor&&(t.shadowBlur=0)}}}};var Qi=`:root {
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
    font-family: 'Courier New', Courier, monospace !important;
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
    font-family: 'Courier New', monospace;
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
    font-family: 'Courier New', monospace !important;
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
    font-family: 'Courier New', monospace;
    white-space: nowrap;
}

.afx-slider-val-text {
    font-size: 10px !important;
    color: #00ffff;
    font-family: 'Courier New', monospace;
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
    font-family: 'Courier New', monospace;
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
    font-family: 'Courier New', Courier, monospace !important;
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
    font-family: 'Courier New', Courier, monospace;
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
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: var(--afx-viewport-height) !important;
    max-height: var(--afx-viewport-height) !important;
    z-index: 10;
    box-sizing: border-box;
    overflow-y: auto !important;
    padding: 70px 20px calc(var(--bottom-inset, 0px) + var(--afx-dock-height, 0px) + 20px) 20px;
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
    font-family: 'Courier New', Courier, monospace;
}

.afx-debug-panel h3 {
    font-size: 13px;
    font-weight: bold;
    margin: 0 0 10px 0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
    padding-bottom: 4px;
}

.afx-debug-panel.viewport-info h3,
.afx-debug-panel.layout-metrics h3 {
    color: #ff55ff;
}

.afx-debug-panel.diagnostics h3 {
    color: #00ff00;
}

.afx-debug-panel.history h3,
.afx-debug-panel.logs h3 {
    color: #00ffff;
}

.afx-debug-content {
    margin: 0;
    padding: 0;
    font-size: 12px;
    line-height: 1.5;
    color: #ffffff;
    white-space: pre-wrap;
    word-break: break-all;
}

.afx-debug-panel ::selection {
    background: rgba(0, 255, 255, 0.3);
    color: #ffffff;
}

/* Corner markers */
.afx-debug-corner {
    position: absolute;
    font-family: 'Courier New', Courier, monospace;
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
    font-family: 'Courier New', Courier, monospace;
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
}`;function er(){return/iPad|iPhone|iPod/.test(navigator.userAgent)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1}function yi(){return Math.min(window.devicePixelRatio||1,1.5)}function Kt(){return Math.min(window.devicePixelRatio||1,2)}function Jt(i,t){let e=yi();return i==="mandelbrot"||i==="julia"?e:t}function ye(){let i=getComputedStyle(document.documentElement);return{ioHeader:parseInt(i.getPropertyValue("--io-header"))||0,topInset:parseInt(i.getPropertyValue("--top-inset"))||0,bottomInset:parseInt(i.getPropertyValue("--bottom-inset"))||0}}function Ge(){return localStorage.getItem("ankifx_marquee_enabled")!=="false"}function pt(){return(window.innerWidth||document.documentElement.clientWidth||800)<480}var Po={deckTitle:"AnkiFX Deck",deckAuthor:"Anonymous",termsText:"No terms provided.",sources:[],marquee:"ANKIFX ENGINE INITIALIZED ...",defaultEffect:"geometry",debug:!1,countdown:30,marqueePosition:"top"};function tr(i={}){let t={...Po,...window.AnkiFX_Config||{},...i};Array.isArray(t.sources)||(t.sources=[]);let e=parseInt(t.countdown,10);return t.countdown=isNaN(e)?30:Math.max(0,e),t.isConfigFileError=typeof t.termsText!="string"||t.termsText.trim()===""||t.termsText==="No terms provided.",t}function ir(i){let t=window.AnkiFX_Config?.defaultEffect,e;return t?(e=t,localStorage.setItem("ankifx_preferred_effect",e)):e=localStorage.getItem("ankifx_preferred_effect")||i.defaultEffect||"geometry",J[e]||(console.warn(`AnkiFX: Stale or invalid activeEffect "${e}" detected. Falling back to default.`),e=i.defaultEffect||"geometry",J[e]||(e=Object.keys(J)[0]||"geometry"),localStorage.setItem("ankifx_preferred_effect",e)),e}function rr(i,t){let e=document.getElementById("ankifx-overlay");if(!e||!e.classList.contains("afx-agreed-state"))return!1;i.sharedGL||(i.sharedGL=document.getElementById("afx-shared-gl")),i.shared2D||(i.shared2D=document.getElementById("afx-shared-2d")),i.sharedMarquee||(i.sharedMarquee=document.getElementById("afx-shared-marquee")),i.sharedGL&&!i.glContext&&(i.glContext=i.sharedGL.getContext("webgl",{alpha:!1,antialias:!1})),i.shared2D&&!i.ctx2D&&(i.ctx2D=i.shared2D.getContext("2d")),i.sharedMarquee&&!i.ctxMarquee&&(i.ctxMarquee=i.sharedMarquee.getContext("2d"));let r=document.getElementById("ankifx-background");if(r){let s=r.getBoundingClientRect();i.width=s.width;let f=ye();i.height=document.documentElement.clientHeight+f.ioHeader,i.dpr=Kt()}if(!i.currentEffectId){let s=Array.from(document.documentElement.classList).find(f=>f.startsWith("afx-effect-"));s&&(i.currentEffectId=s.replace("afx-effect-",""))}i.defaultMarqueeText=t.marquee,i.marquee&&(i.marquee.setText(t.marquee),i.marquee.setPosition(t.marqueePosition));let a=document.getElementById("afx-deck-title");return a&&(a.textContent=t.deckTitle),!0}function mt(i){let t=document.getElementById("afx-effect-controls-container");t&&(t.innerHTML="",!(!i||!i.controls||i.controls.length===0)&&i.controls.forEach(e=>{let r=document.createElement("div");if(r.className="afx-control-row",r.id=`afx-control-container-${e.id}`,e.type==="toggle")r.innerHTML=`
                    <label class="afx-toggle">
                        <input type="checkbox" id="afx-control-${e.id}" ${e.value?"checked":""}>
                        <span class="afx-slider"></span>
                    </label>
                    <span id="afx-control-label-${e.id}">${e.label}</span>
                `,r.querySelector("input").addEventListener("change",s=>{e.onChange&&e.onChange(s.target.checked)});else if(e.type==="slider"){r.classList.add("afx-slider-row");let a=e.step||1,s=a.toString().includes(".")?a.toString().split(".")[1].length:0;r.innerHTML=`
                    <span class="afx-slider-label">${e.label}:</span>
                    <input type="range" id="afx-control-${e.id}" class="afx-range-slider" min="${e.min}" max="${e.max}" step="${a}" value="${e.value}">
                    <span id="afx-control-val-${e.id}" class="afx-slider-val-text">${e.value.toFixed(s)}</span>
                `;let f=r.querySelector("input"),o=r.querySelector(".afx-slider-val-text");f.addEventListener("input",n=>{let h=parseFloat(n.target.value);o.innerText=h.toFixed(s),e.onChange&&e.onChange(h)})}else if(e.type==="button")r.style.padding="0",r.innerHTML=`
                    <button id="afx-control-${e.id}" class="afx-action-btn">
                        ${e.label}
                    </button>
                `,r.querySelector("button").addEventListener("click",s=>{s.stopPropagation(),e.onClick&&e.onClick()});else if(e.type==="select"){r.style.padding="0";let a=(e.options||[]).map(f=>{let o=typeof f=="object"?f.value:f,n=typeof f=="object"?f.text:f,h=o==e.value?"selected":"";return`<option value="${o}" ${h}>${n}</option>`}).join("");r.innerHTML=`
                    <select id="afx-control-${e.id}" class="afx-select">
                        ${a}
                    </select>
                `,r.querySelector("select").addEventListener("change",f=>{e.onChange&&e.onChange(f.target.value)})}t.appendChild(r)}))}function or(i,t){let e=document.getElementById(`afx-control-${i}`);e&&(e.type==="checkbox"?e.checked=!!t:e.value=t);let r=document.getElementById(`afx-control-val-${i}`);if(r){let a=e?e.step:"",s=a&&a.includes(".")?a.split(".")[1].length:0;r.innerText=typeof t=="number"?t.toFixed(s||(t%1===0?0:4)):t}}function gt(i,t,e,r,a){a==="debug"?e.classList.add("afx-debug-active"):e.classList.remove("afx-debug-active");let s=document.documentElement;Array.from(s.classList).forEach(o=>{o.startsWith("afx-effect-")&&s.classList.remove(o)}),s.classList.add(`afx-effect-${a}`),i.currentEffectId=a;let f=J[a];if(f){let o=ye(),n=Jt(a,i.dpr),h={gl:i.glContext,ctx2d:i.ctx2D,canvasGL:i.sharedGL,canvas2D:i.shared2D,width:i.width,height:i.height,dpr:n,topInset:o.ioHeader,visibleWidth:i.width,visibleHeight:i.height-o.ioHeader,visibleBounds:{top:o.ioHeader,bottom:i.height}};i.marquee&&i.marquee.updateStyles(f.marqueeFont||{}),f.run(h,t),mt(f),i.marquee&&(i.marquee.enabled=Ge())}else i.marquee&&i.marquee.updateStyles({}),mt(null)}function _e(i){let t=document.getElementById("ankifx-background");if(!t||!i.sharedGL||!i.shared2D||!i.sharedMarquee)return;let r=ye().ioHeader;document.documentElement.style.setProperty("--afx-viewport-height",`calc(100dvh + ${r}px)`);let a=t.getBoundingClientRect();i.width=a.width,i.height=document.documentElement.clientHeight+r,i.dpr=Kt();let s=yi();if(i.sharedGL.width=i.width*s,i.sharedGL.height=i.height*s,i.sharedGL.style.width=i.width+"px",i.sharedGL.style.height=i.height+"px",i.shared2D.width=i.width*i.dpr,i.shared2D.height=i.height*i.dpr,i.shared2D.style.width=i.width+"px",i.shared2D.style.height=i.height+"px",i.sharedMarquee.width=i.width*i.dpr,i.sharedMarquee.height=i.height*i.dpr,i.sharedMarquee.style.width=i.width+"px",i.sharedMarquee.style.height=i.height+"px",i.glContext&&i.glContext.viewport(0,0,i.sharedGL.width,i.sharedGL.height),i.ctx2D&&(i.ctx2D.setTransform(1,0,0,1,0,0),i.ctx2D.scale(i.dpr,i.dpr)),i.ctxMarquee&&(i.ctxMarquee.setTransform(1,0,0,1,0,0),i.ctxMarquee.scale(i.dpr,i.dpr)),i.currentEffectId&&J[i.currentEffectId]?.onResize){let f=Jt(i.currentEffectId,i.dpr);J[i.currentEffectId].onResize(i.width,i.height,f)}}function ar(i){let e=ye().ioHeader,r=window.innerHeight,a=document.documentElement.clientHeight,s=setInterval(()=>{let f=ye(),o=window.innerHeight,n=document.documentElement.clientHeight;(f.ioHeader!==e||o!==r||n!==a)&&(e=f.ioHeader,r=o,a=n,_e(i))},50);setTimeout(()=>clearInterval(s),2e3)}function nr(i){i._layoutHandler&&(window.removeEventListener("orientationchange",i._layoutHandler),window.removeEventListener("resize",i._layoutHandler)),i._resizeTimeout&&clearTimeout(i._resizeTimeout),i._resizeInterval&&clearInterval(i._resizeInterval),i._layoutHandler=()=>{i._resizeTimeout&&clearTimeout(i._resizeTimeout),i._resizeInterval&&clearInterval(i._resizeInterval),_e(i),i._resizeTimeout=setTimeout(()=>{_e(i)},100);let t=0,e=i.width,r=i.height;i._resizeInterval=setInterval(()=>{if(t+=100,t>=1500){clearInterval(i._resizeInterval);return}let a=ye(),s=document.getElementById("ankifx-background"),f=s?s.getBoundingClientRect():null,o=f?f.width:window.innerWidth,n=document.documentElement.clientHeight+a.ioHeader;(o!==e||n!==r)&&(e=o,r=n,_e(i))},100)},window.addEventListener("orientationchange",i._layoutHandler),window.addEventListener("resize",i._layoutHandler)}function lr(i){let t=document.getElementById("afx-bottom-dock");t&&(i.dockObserver=new ResizeObserver(()=>{let e=t.getBoundingClientRect();document.documentElement.style.setProperty("--afx-dock-height",`${e.height}px`)}),i.dockObserver.observe(t))}function sr(i){i.observer||(i.observer=new MutationObserver(()=>{setTimeout(()=>{let t=document.getElementById("qa");(t?!!t.querySelector(".ankifx-card"):!1)?Zt():typeof i=="object"&&window.AnkiFX&&window.AnkiFX.destroy()},20)}),i.observer.observe(document.documentElement,{childList:!0,subtree:!0}))}function Zt(){let i=document.getElementById("_flag"),t=document.getElementById("_mark"),e=document.getElementById("afx-top-group-left"),r=document.getElementById("afx-top-group-right"),a=document.getElementById("afx-btn-skip");if(t&&e){let s=document.getElementById("afx-global-fps");s&&t.nextSibling!==s?e.insertBefore(t,s):!s&&t.parentElement!==e&&e.appendChild(t)}i&&r&&i.parentElement!==r&&r.insertBefore(i,a)}function ki(i){if(i.marqueeInterval)return;let t=0,e=0,r=a=>{if(a===void 0&&(a=performance.now()),t||(t=a),e++,a-t>=1e3){let s=document.getElementById("afx-global-fps");s&&(s.textContent=`FPS: ${e}`),e=0,t=a}if(i.marquee&&i.ctxMarquee){if(i.ctxMarquee.clearRect(0,0,i.width,i.height),i.currentEffectId&&J[i.currentEffectId]?.drawOverlay)try{J[i.currentEffectId].drawOverlay(i.ctxMarquee,i.width,i.height,a)}catch(s){console.error("AnkiFX overlay error:",s)}i.marquee.render(i.ctxMarquee,i.width,i.height)}i.marqueeInterval=requestAnimationFrame(r)};i.marqueeInterval=requestAnimationFrame(r)}function ur(i,t,e,r){let a=t.countdown;if((t.debug||t.isConfigFileError)&&(a=0),a>0){r.textContent=`( ${a} )`;let s=setInterval(()=>{a--,r.textContent=`( ${a} )`,a<=0&&(clearInterval(s),r.textContent="I AGREE",r.disabled=!1)},1e3)}else r.textContent="I AGREE",r.disabled=!1;r.addEventListener("click",s=>{s.stopPropagation(),r.disabled||window.AnkiFX.agree(e,t.deckTitle)})}window.neoart=Object.create(null);function Ei(i,t){var e=Object.create(null,{endian:{value:1,writable:!0},length:{value:0,writable:!0},index:{value:0,writable:!0},buffer:{value:null,writable:!0},view:{value:null,writable:!0},bytesAvailable:{get:function(){return this.length-this.index}},position:{get:function(){return this.index},set:function(r){r<0?r=0:r>this.length&&(r=this.length),this.index=r}},clear:{value:function(){this.buffer=new ArrayBuffer,this.view=null,this.index=this.length=0}},readAt:{value:function(r){return this.view.getUint8(r)}},readByte:{value:function(){return this.view.getInt8(this.index++)}},readShort:{value:function(){var r=this.view.getInt16(this.index,this.endian);return this.index+=2,r}},readInt:{value:function(){var r=this.view.getInt32(this.index,this.endian);return this.index+=4,r}},readUbyte:{value:function(){return this.view.getUint8(this.index++)}},readUshort:{value:function(){var r=this.view.getUint16(this.index,this.endian);return this.index+=2,r}},readUint:{value:function(){var r=this.view.getUint32(this.index,this.endian);return this.index+=4,r}},readBytes:{value:function(r,a,s){var f=r.view,o=this.index,n=this.view;for((s+=o)>this.length&&(s=this.length);o<s;++o)f.setUint8(a++,n.getUint8(o));this.index=o}},readString:{value:function(r){var a=this.index,s=this.view,f="";for((r+=a)>this.length&&(r=this.length);a<r;++a)f+=String.fromCharCode(s.getUint8(a));return this.index=r,f}},writeAt:{value:function(r,a){this.view.setUint8(r,a)}},writeByte:{value:function(r){this.view.setInt8(this.index++,r)}},writeShort:{value:function(r){this.view.setInt16(this.index,r),this.index+=2}},writeInt:{value:function(r){this.view.setInt32(this.index,r),this.index+=4}}});return e.buffer=i,e.view=new DataView(i),e.length=i.byteLength,Object.seal(e)}function fr(){return Object.create(null,{l:{value:0,writable:!0},r:{value:0,writable:!0},next:{value:null,writable:!0}})}function Qt(){return Object.create(null,{player:{value:null,writable:!0},channels:{value:[],writable:!0},buffer:{value:[],writable:!0},samplesTick:{value:0,writable:!0},samplesLeft:{value:0,writable:!0},remains:{value:0,writable:!0},completed:{value:0,writable:!0},bufferSize:{get:function(){return this.buffer.length},set:function(i){var t,e=this.buffer.length||0;if(!(i===e||i<512)&&(this.buffer.length=i,i>e))for(this.buffer[e]=fr(),t=++e;t<i;++t)this.buffer[t]=this.buffer[t-1].next=fr()}},complete:{get:function(){return this.completed},set:function(i){this.completed=i^this.player.loopSong}},reset:{value:function(){var i=this.channels[0],t=this.buffer[0];for(this.samplesLeft=0,this.remains=0,this.completed=0;i;)i.initialize(),i=i.next;for(;t;)t.l=t.r=0,t=t.next}},restore:{configurable:!0,value:function(){}}})}function Co(){var i=null;return typeof AudioContext<"u"?i=new AudioContext:alert("Web Audio API does not appear to be supported. Use Chrome, Safari or Firefox"),i}function ei(){var i=Object.create(null,{context:{value:null,writable:!0},node:{value:null,writable:!0},analyser:{value:null,writable:!0},analyse:{value:0,writable:!0},endian:{value:0,writable:!0},sampleRate:{value:0,writable:!0},playSong:{value:0,writable:!0},lastSong:{value:0,writable:!0},version:{value:0,writable:!0},title:{value:"",writable:!0},channels:{value:0,writable:!0},loopSong:{value:0,writable:!0},speed:{value:0,writable:!0},tempo:{value:0,writable:!0},mixer:{value:null,writable:!0},tick:{value:0,writable:!0},paused:{value:0,writable:!0},callback:{value:null,writable:!0},quality:{configurable:!0,set:function(t){this.callback=t?this.mixer.accurate.bind(this.mixer):this.mixer.fast.bind(this.mixer)}},toggle:{value:function(t){this.mixer.channels[t].mute^=1}},setup:{configurable:!0,value:function(){}},load:{value:function(t){return this.version=0,this.playSong=0,this.lastSong=0,this.mixer.restore(),t.view||(t=Ei(t)),t.position=0,t.readUint()===67324752&&window.neoart.Unzip,t.endian=this.endian,t.position=0,this.loader(t),this.version&&this.setup(),this.version}},play:{value:function(){var t,e;this.version&&(this.paused?this.paused=0:(this.initialize(),typeof this.context.createJavaScriptNode=="function"?this.node=this.context.createJavaScriptNode(this.mixer.bufferSize):this.node=this.context.createScriptProcessor(this.mixer.bufferSize),this.analyser=this.context.createAnalyser(),this.node.connect(this.analyser),this.node.onaudioprocess=this.callback),this.analyse&&window.neoart.Flectrum?(e=window.neoart.analyserNode=this.context.createAnalyser(),this.node.connect(e),e.connect(this.context.destination)):this.node.connect(this.context.destination),t=document.createEvent("Event"),t.initEvent("flodPlay",!0,!1),document.dispatchEvent(t))}},pause:{value:function(){if(this.node){this.node.disconnect(),this.paused=1;var t=document.createEvent("Event");t.initEvent("flodPause",!0,!1),document.dispatchEvent(t)}}},stop:{value:function(){if(this.node){this.node.disconnect(),this.node.onaudioprocess=this.node=null,this.paused=0,this.restore&&this.restore();var t=document.createEvent("Event");t.initEvent("flodStop",!0,!1),document.dispatchEvent(t)}}},reset:{value:function(){this.tick=0,this.mixer.initialize(),this.mixer.samplesTick=this.sampleRate*2.5/this.tempo>>0}}});return window.neoart.audioContext||(window.neoart.audioContext=Co()),i.context=window.neoart.audioContext,i.sampleRate=i.context.sampleRate,i}function ti(i){var t=Object.create(null,{next:{value:null,writable:!0},mute:{value:0,writable:!0},panning:{value:0,writable:!0},delay:{value:0,writable:!0},pointer:{value:0,writable:!0},length:{value:0,writable:!0},audena:{value:0,writable:!0},audcnt:{value:0,writable:!0},audloc:{value:0,writable:!0},audper:{value:0,writable:!0},audvol:{value:0,writable:!0},timer:{value:0,writable:!0},level:{value:0,writable:!0},ldata:{value:0,writable:!0},rdata:{value:0,writable:!0},enabled:{get:function(){return this.audena},set:function(e){e!==this.audena&&(this.audena=e,this.audloc=this.pointer,this.audcnt=this.pointer+this.length,this.timer=1,e&&(this.delay+=2))}},period:{set:function(e){e<0?e=0:e>65535&&(e=65535),this.audper=e}},volume:{set:function(e){e<0?e=0:e>64&&(e=64),this.audvol=e}},resetData:{value:function(){this.ldata=0,this.rdata=0}},initialize:{value:function(){this.audena=0,this.audcnt=0,this.audloc=0,this.audper=50,this.audvol=0,this.timer=0,this.ldata=0,this.rdata=0,this.delay=0,this.pointer=0,this.length=0}}});return t.panning=t.level=(++i&2)===0?-1:1,Object.seal(t)}function Fo(){return Object.create(null,{active:{value:0,writable:!0},forced:{value:-1,writable:!0},l0:{value:0,writable:!0},l1:{value:0,writable:!0},l2:{value:0,writable:!0},l3:{value:0,writable:!0},l4:{value:0,writable:!0},r0:{value:0,writable:!0},r1:{value:0,writable:!0},r2:{value:0,writable:!0},r3:{value:0,writable:!0},r4:{value:0,writable:!0},initialize:{value:function(){this.l0=this.l1=this.l2=this.l3=this.l4=0,this.r0=this.r1=this.r2=this.r3=this.r4=0}},process:{value:function(i,t){var e=.52133458435322,r=.4860348337215757,a=.9314955486749749,s=1-r;i===0&&(this.l0=r*t.l+s*this.l0,this.r0=r*t.r+s*this.r0,s=1-a,t.l=this.l1=a*this.l0+s*this.l1,t.r=this.r1=a*this.r0+s*this.r1),(this.active|this.forced)>0&&(s=1-e,this.l2=e*t.l+s*this.l2,this.r2=e*t.r+s*this.r2,this.l3=e*this.l2+s*this.l3,this.r3=e*this.r2+s*this.r3,t.l=this.l4=e*this.l3+s*this.l4,t.r=this.r4=e*this.r3+s*this.r4),t.l>1?t.l=1:t.l<-1&&(t.l=-1),t.r>1?t.r=1:t.r<-1&&(t.r=-1)}}})}function ii(){return Object.create(null,{note:{value:0,writable:!0},sample:{value:0,writable:!0},effect:{value:0,writable:!0},param:{value:0,writable:!0}})}function vt(){return Object.create(null,{name:{value:"",writable:!0},length:{value:0,writable:!0},loop:{value:0,writable:!0},repeat:{value:0,writable:!0},volume:{value:0,writable:!0},pointer:{value:0,writable:!0},loopPtr:{value:0,writable:!0}})}function Si(){var i=Qt();return Object.defineProperties(i,{filter:{value:null,writable:!0},model:{value:1,writable:!0},memory:{value:[],writable:!0},loopPtr:{value:0,writable:!0},loopLen:{value:4,writable:!0},clock:{value:0,writable:!0},master:{value:0,writable:!0},ready:{value:0,writable:!0},volume:{set:function(t){t>0?(t>64&&(t=64),this.master=t/64*.00390625):this.master=0}},initialize:{value:function(){var t=this.memory.length,e=t+this.loopLen;if(this.reset(),this.filter.initialize(),!this.ready)for(this.ready=1,this.loopPtr=t;t<e;++t)this.memory[t]=0}},restore:{value:function(){this.ready=0,this.memory.length=0}},store:{value:function(t,e,r){var a,s,f=t.position,o=this.memory.length,n;for(r&&(t.position=r),n=t.position+e,n>=t.length&&(a=n-t.length,e=t.length-t.position),s=o,e+=o;s<e;++s)this.memory[s]=t.readByte();for(e+=a;s<e;++s)this.memory[s]=0;return r&&(t.position=f),o}},fast:{value:function(t){var e,r,a,s=this.memory,f,o=0,n,h=0,c,l,d,v=this.bufferSize,m,u,g;if(this.completed){if(!this.remains){this.player.stop();return}v=this.remains}for(;o<v;){for(this.samplesLeft||(this.player.process(),this.samplesLeft=this.samplesTick,this.completed&&(v=o+this.samplesTick,v>this.bufferSize&&(this.remains=v-this.bufferSize,v=this.bufferSize))),u=this.samplesLeft,o+u>=v&&(u=v-o),n=h+u,e=this.channels[0];e;){if(d=this.buffer[h],e.audena&&e.audper>60)for(m=e.audper/this.clock,g=e.audvol*this.master,f=g*(1-e.level),l=g*(1+e.level),r=h;r<n;++r)e.delay?e.delay--:--e.timer<1&&(e.mute||(g=s[e.audloc]*.0078125,e.ldata=g*f,e.rdata=g*l),e.audloc++,e.timer+=m,e.audloc>=e.audcnt&&(e.audloc=e.pointer,e.audcnt=e.pointer+e.length)),d.l+=e.ldata,d.r+=e.rdata,d=d.next;else for(r=h;r<n;++r)d.l+=e.ldata,d.r+=e.rdata,d=d.next;e=e.next}h=n,o+=u,this.samplesLeft-=u}for(g=this.model,s=this.filter,d=this.buffer[0],a=t.outputBuffer.getChannelData(0),c=t.outputBuffer.getChannelData(1),r=0;r<v;++r)s.process(g,d),a[r]=d.l,c[r]=d.r,d.l=d.r=0,d=d.next}}}),i.channels[0]=ti(0),i.channels[0].next=i.channels[1]=ti(1),i.channels[1].next=i.channels[2]=ti(2),i.channels[2].next=i.channels[3]=ti(3),i.bufferSize=8192,i.filter=Fo(),i.master=.00390625,Object.seal(i)}function ri(i){var t=ei();return Object.defineProperties(t,{quality:{set:function(e){this.callback=this.mixer.fast.bind(this.mixer)}},stereo:{set:function(e){var r=this.mixer.channels[0];for(e<0?e=0:e>1&&(e=1);r;)r.level=e*r.panning,r=r.next}},volume:{set:function(e){e<0?e=0:e>1&&(e=1),this.mixer.master=e*.00390625}},frequency:{value:function(e){e?(this.mixer.clock=3579545/this.sampleRate,this.mixer.samplesTick=735):(this.mixer.clock=3546895/this.sampleRate,this.mixer.samplesTick=882)}}}),t.mixer=i||Si(),t.mixer.player=t,t.frequency(0),t.channels=4,t.endian=0,t.quality=0,t.speed=6,t.tempo=125,t}function cr(){return Object.create(null,{next:{value:null,writable:!0},mute:{value:0,writable:!0},enabled:{value:0,writable:!0},sample:{value:null,writable:!0},length:{value:0,writable:!0},index:{value:0,writable:!0},pointer:{value:0,writable:!0},delta:{value:0,writable:!0},fraction:{value:0,writable:!0},speed:{value:0,writable:!0},dir:{value:0,writable:!0},oldSample:{value:null,writable:!0},oldLength:{value:0,writable:!0},oldPointer:{value:0,writable:!0},oldFraction:{value:0,writable:!0},oldSpeed:{value:0,writable:!0},oldDir:{value:0,writable:!0},volume:{value:0,writable:!0},lvol:{value:0,writable:!0},rvol:{value:0,writable:!0},panning:{value:128,writable:!0},lpan:{value:.5,writable:!0},rpan:{value:.5,writable:!0},ldata:{value:0,writable:!0},rdata:{value:0,writable:!0},mixCounter:{value:0,writable:!0},lmixRampU:{value:0,writable:!0},lmixDeltaU:{value:0,writable:!0},rmixRampU:{value:0,writable:!0},rmixDeltaU:{value:0,writable:!0},lmixRampD:{value:0,writable:!0},lmixDeltaD:{value:0,writable:!0},rmixRampD:{value:0,writable:!0},rmixDeltaD:{value:0,writable:!0},volCounter:{value:0,writable:!0},lvolDelta:{value:0,writable:!0},rvolDelta:{value:0,writable:!0},panCounter:{value:0,writable:!0},lpanDelta:{value:0,writable:!0},rpanDelta:{value:0,writable:!0},initialize:{value:function(){this.enabled=0,this.sample=null,this.length=0,this.index=0,this.pointer=0,this.delta=0,this.fraction=0,this.speed=0,this.dir=0,this.oldSample=null,this.oldLength=0,this.oldPointer=0,this.oldFraction=0,this.oldSpeed=0,this.oldDir=0,this.volume=0,this.lvol=0,this.rvol=0,this.panning=128,this.lpan=.5,this.rpan=.5,this.ldata=0,this.rdata=0,this.mixCounter=0,this.lmixRampU=0,this.lmixDeltaU=0,this.rmixRampU=0,this.rmixDeltaU=0,this.lmixRampD=0,this.lmixDeltaD=0,this.rmixRampD=0,this.rmixDeltaD=0,this.volCounter=0,this.lvolDelta=0,this.rvolDelta=0,this.panCounter=0,this.lpanDelta=0,this.rpanDelta=0}}})}function hr(){return Object.create(null,{name:{value:"",writable:!0},bits:{value:8,writable:!0},volume:{value:0,writable:!0},length:{value:0,writable:!0},data:{value:[],writable:!0},loopMode:{value:0,writable:!0},loopStart:{value:0,writable:!0},loopLen:{value:0,writable:!0},store:{value:function(i){var t=0,e,r=this.length,a,s,f,o;if(this.loopLen||(this.loopMode=0),a=i.position,this.loopMode?(r=this.loopStart+this.loopLen,this.data=new Float32Array(r+1)):this.data=new Float32Array(this.length+1),this.bits===8)for(f=a+r,f>i.length&&(r=i.length-a),e=0;e<r;e++)o=i.readByte()+t,o<-128?o+=256:o>127&&(o-=256),this.data[e]=o*.0078125,t=o;else for(f=a+(r<<1),f>i.length&&(r=i.length-a>>1),e=0;e<r;e++)o=i.readShort()+t,o<-32768?o+=65536:o>32767&&(o-=65536),this.data[e]=o*3051758e-11,t=o;if(f=a+this.length,this.loopMode?(this.length=this.loopStart+this.loopLen,this.loopMode===1?this.data[r]=this.data[this.loopStart]:this.data[r]=this.data[r-1]):this.data[this.length]=0,r!==this.length)for(s=this.data[r-1],e=r;e<this.length;e++)this.data[e]=s;f<i.length?i.position=f:i.position=i.length-1}}})}function Mo(){var i=Qt();return Object.defineProperties(i,{setup:{value:function(t){var e=1;for(this.channels.length=t,this.channels[0]=cr();e<t;++e)this.channels[e]=this.channels[e-1].next=cr()}},initialize:{value:function(){this.reset()}},fast:{value:function(t){var e,r,a,s,f=0,o,n=0,h,c,l,d=this.bufferSize,v,m;if(this.completed){if(!this.remains){this.player.stop();return}d=this.remains}for(;f<d;){for(this.samplesLeft||(this.player.process(),this.player.fast(),this.samplesLeft=this.samplesTick,this.completed&&(d=f+this.samplesTick,d>this.bufferSize&&(this.remains=d-this.bufferSize,d=this.bufferSize))),v=this.samplesLeft,f+v>=d&&(v=d-f),o=n+v,e=this.channels[0];e;){if(!e.enabled){e=e.next;continue}for(c=e.sample,r=c.data,l=this.buffer[n],s=n;s<o;++s){if(e.index!==e.pointer){if(e.index>=e.length)if(c.loopMode)e.pointer=c.loopStart+(e.index-e.length),e.length=c.length,c.loopMode===2&&(e.dir?e.dir=0:e.dir=c.length+c.loopStart-1);else{e.enabled=0;break}else e.pointer=e.index;e.mute?(e.ldata=0,e.rdata=0):(e.dir?m=r[e.dir-e.pointer]:m=r[e.pointer],e.ldata=m*e.lvol,e.rdata=m*e.rvol)}e.index=e.pointer+e.delta,(e.fraction+=e.speed)>=1&&(e.index++,e.fraction--),l.l+=e.ldata,l.r+=e.rdata,l=l.next}e=e.next}n=o,f+=v,this.samplesLeft-=v}for(l=this.buffer[0],a=t.outputBuffer.getChannelData(0),h=t.outputBuffer.getChannelData(1),s=0;s<d;++s)l.l>1?l.l=1:l.l<-1&&(l.l=-1),l.r>1?l.r=1:l.r<-1&&(l.r=-1),a[s]=l.l,h[s]=l.r,l.l=l.r=0,l=l.next}},accurate:{value:function(t){var e,r,a,s,f,o,n=0,h,c=0,l,d,v,m,u,g=this.bufferSize,p,w;if(this.completed){if(!this.remains){this.player.stop();return}g=this.remains}for(;n<g;){for(this.samplesLeft||(this.player.process(),this.player.accurate(),this.samplesLeft=this.samplesTick,this.completed&&(g=n+this.samplesTick,g>this.bufferSize&&(this.remains=g-this.bufferSize,g=this.bufferSize))),p=this.samplesLeft,n+p>=g&&(p=g-n),h=c+p,e=this.channels[0];e;){if(!e.enabled){e=e.next;continue}for(v=e.sample,r=v.data,m=e.oldSample,m&&(a=m.data),u=this.buffer[c],o=c;o<h;++o){if(w=e.mute?0:r[e.pointer],w+=(r[e.pointer+e.dir]-w)*e.fraction,(e.fraction+=e.speed)>=1&&(f=e.fraction>>0,e.fraction-=f,e.dir>0?(e.pointer+=f,e.pointer>e.length&&(e.fraction+=e.pointer-e.length,e.pointer=e.length)):(e.pointer-=f,e.pointer<e.length&&(e.fraction+=e.length-e.pointer,e.pointer=e.length))),e.mixCounter?(m?(l=e.mute?0:a[e.oldPointer],l+=(a[e.oldPointer+e.oldDir]-l)*e.oldFraction,(e.oldFraction+=e.oldSpeed)>1&&(f=e.oldFraction>>0,e.oldFraction-=f,e.oldDir>0?(e.oldPointer+=f,e.oldPointer>e.oldLength&&(e.oldFraction+=e.oldPointer-e.oldLength,e.oldPointer=e.oldLength)):(e.oldPointer-=f,e.oldPointer<e.oldLength&&(e.oldFraction+=e.oldLength-e.oldPointer,e.oldPointer=e.oldLength))),u.l+=w*e.lmixRampU+l*e.lmixRampD,u.r+=w*e.rmixRampU+l*e.rmixRampD,e.lmixRampD-=e.lmixDeltaD,e.rmixRampD-=e.rmixDeltaD):(u.l+=w*e.lmixRampU,u.r+=w*e.rmixRampU),e.lmixRampU+=e.lmixDeltaU,e.rmixRampU+=e.rmixDeltaU,e.mixCounter--,e.oldPointer===e.oldLength&&(m.loopMode?m.loopMode===1?(e.oldPointer=m.loopStart,e.oldLength=m.length):e.oldDir>0?(e.oldPointer=m.length-1,e.oldLength=m.loopStart,e.oldDir=-1):(e.oldFraction-=1,e.oldPointer=m.loopStart,e.oldLength=m.length,e.oldDir=1):(m=null,e.oldPointer=0))):(u.l+=w*e.lvol,u.r+=w*e.rvol,e.volCounter?(e.lvol+=e.lvolDelta,e.rvol+=e.rvolDelta,e.volCounter--):e.panCounter&&(e.lpan+=e.lpanDelta,e.rpan+=e.rpanDelta,e.panCounter--,e.lvol=e.volume*e.lpan,e.rvol=e.volume*e.rpan)),e.pointer===e.length)if(v.loopMode)v.loopMode===1?(e.pointer=v.loopStart,e.length=v.length):e.dir>0?(e.pointer=v.length-1,e.length=v.loopStart,e.dir=-1):(e.fraction-=1,e.pointer=v.loopStart,e.length=v.length,e.dir=1);else{e.enabled=0;break}u=u.next}e=e.next}c=h,n+=p,this.samplesLeft-=p}for(u=this.buffer[0],s=t.outputBuffer.getChannelData(0),d=t.outputBuffer.getChannelData(1),o=0;o<g;++o)u.l>1?u.l=1:u.l<-1&&(u.l=-1),u.r>1?u.r=1:u.r<-1&&(u.r=-1),s[o]=u.l,d[o]=u.r,u.l=u.r=0,u=u.next}}}),i.bufferSize=8192,Object.seal(i)}function dr(i){var t=ei();return Object.defineProperties(t,{track:{value:null,writable:!0},length:{value:0,writable:!0},restart:{value:0,writable:!0},timer:{value:0,writable:!0},master:{value:0,writable:!0},volume:{set:function(e){e<0?e=0:e>1&&(e=1),this.master=e*64}},setup:{configurable:!1,value:function(){this.mixer.setup(this.channels)}}}),t.mixer=i||Mo(),t.mixer.player=t,t.endian=1,t.quality=1,t}function To(i){var t=Object.create(null,{index:{value:i,writable:!0},next:{value:null,writable:!0},flags:{value:0,writable:!0},delay:{value:0,writable:!0},channel:{value:null,writable:!0},patternLoop:{value:0,writable:!0},patternLoopRow:{value:0,writable:!0},playing:{value:null,writable:!0},note:{value:0,writable:!0},keyoff:{value:0,writable:!0},period:{value:0,writable:!0},finetune:{value:0,writable:!0},arpDelta:{value:0,writable:!0},vibDelta:{value:0,writable:!0},instrument:{value:null,writable:!0},autoVibratoPos:{value:0,writable:!0},autoSweep:{value:0,writable:!0},autoSweepPos:{value:0,writable:!0},sample:{value:null,writable:!0},sampleOffset:{value:0,writable:!0},volume:{value:0,writable:!0},volEnabled:{value:0,writable:!0},volEnvelope:{value:null,writable:!0},volDelta:{value:0,writable:!0},volSlide:{value:0,writable:!0},volSlideMaster:{value:0,writable:!0},fineSlideU:{value:0,writable:!0},fineSlideD:{value:0,writable:!0},fadeEnabled:{value:0,writable:!0},fadeDelta:{value:0,writable:!0},fadeVolume:{value:0,writable:!0},panning:{value:0,writable:!0},panEnabled:{value:0,writable:!0},panEnvelope:{value:null,writable:!0},panSlide:{value:0,writable:!0},portaU:{value:0,writable:!0},portaD:{value:0,writable:!0},finePortaU:{value:0,writable:!0},finePortaD:{value:0,writable:!0},xtraPortaU:{value:0,writable:!0},xtraPortaD:{value:0,writable:!0},portaPeriod:{value:0,writable:!0},portaSpeed:{value:0,writable:!0},glissando:{value:0,writable:!0},glissPeriod:{value:0,writable:!0},vibratoPos:{value:0,writable:!0},vibratoSpeed:{value:0,writable:!0},vibratoDepth:{value:0,writable:!0},vibratoReset:{value:0,writable:!0},tremoloPos:{value:0,writable:!0},tremoloSpeed:{value:0,writable:!0},tremoloDepth:{value:0,writable:!0},waveControl:{value:0,writable:!0},tremorPos:{value:0,writable:!0},tremorOn:{value:0,writable:!0},tremorOff:{value:0,writable:!0},tremorVolume:{value:0,writable:!0},retrigx:{value:0,writable:!0},retrigy:{value:0,writable:!0},rowCurrent:{value:null,writable:!0},reset:{value:function(){this.volume=this.sample.volume,this.panning=this.sample.panning,this.finetune=this.sample.finetune>>3<<2,this.keyoff=0,this.volDelta=0,this.fadeEnabled=0,this.fadeDelta=0,this.rowCurrent=null,this.fadeVolume=65536,this.autoVibratoPos=0,this.autoSweep=1,this.autoSweepPos=0,this.vibDelta=0,this.vibratoReset=0,(this.waveControl&15)<4&&(this.vibratoPos=0),this.waveControl>>4<4&&(this.tremoloPos=0)}},autoVibrato:{value:function(){var e;switch(this.autoVibratoPos=this.autoVibratoPos+this.playing.vibratoSpeed&255,this.playing.vibratoType){case 0:e=Ro[this.autoVibratoPos];break;case 1:this.autoVibratoPos<128?e=-64:e=64;break;case 2:e=(64+(this.autoVibratoPos>>1)&127)-64;break;case 3:e=(64-(this.autoVibratoPos>>1)&127)-64;break;default:break}return e*=this.playing.vibratoDepth,this.autoSweep&&(this.playing.vibratoSweep?this.autoSweepPos>this.playing.vibratoSweep?(this.autoSweepPos&2&&(e*=this.autoSweepPos/this.playing.vibratoSweep),this.autoSweep=0):e*=++this.autoSweepPos/this.playing.vibratoSweep:this.autoSweep=0),this.flags|=ae,e>>6}},tonePortamento:{value:function(){this.glissPeriod||(this.glissPeriod=this.period),this.period<this.portaPeriod?(this.glissPeriod+=this.portaSpeed<<2,this.glissando?this.period=Math.round(this.glissPeriod/64)<<6:this.period=this.glissPeriod,this.period>=this.portaPeriod&&(this.period=this.portaPeriod,this.glissPeriod=this.portaPeriod=0)):this.period>this.portaPeriod&&(this.glissPeriod-=this.portaSpeed<<2,this.glissando?this.period=Math.round(this.glissPeriod/64)<<6:this.period=this.glissPeriod,this.period<=this.portaPeriod&&(this.period=this.portaPeriod,this.glissPeriod=this.portaPeriod=0)),this.flags|=ae}},tremolo:{value:function(){var e=255,r=this.tremoloPos&31;switch(this.waveControl>>4&3){case 0:e=wr[r];break;case 1:e=r<<3;break;default:break}this.volDelta=e*this.tremoloDepth>>6,this.tremoloPos>31&&(this.volDelta=-this.volDelta),this.tremoloPos=this.tremoloPos+this.tremoloSpeed&63,this.flags|=H}},tremor:{value:function(){this.tremorPos===this.tremorOn?(this.tremorVolume=this.volume,this.volume=0,this.flags|=H):(this.tremorPos=0,this.volume=this.tremorVolume,this.flags|=H),this.tremorPos++}},vibrato:{value:function(){var e=255,r=this.vibratoPos&31;switch(this.waveControl&3){case 0:e=wr[r];break;case 1:e=r<<3,this.vibratoPos>31&&(e=255-e);break;default:break}this.vibDelta=e*this.vibratoDepth>>7,this.vibratoPos>31&&(this.vibDelta=-this.vibDelta),this.vibratoPos=this.vibratoPos+this.vibratoSpeed&63,this.flags|=ae}}});return t.volEnvelope=pr(),t.panEnvelope=pr(),Object.seal(t)}function ai(){return Object.create(null,{points:{value:[],writable:!0},total:{value:0,writable:!0},sustain:{value:0,writable:!0},loopStart:{value:0,writable:!0},loopEnd:{value:0,writable:!0},flags:{value:0,writable:!0}})}function pr(){return Object.create(null,{value:{value:0,writable:!0},position:{value:0,writable:!0},frame:{value:0,writable:!0},delta:{value:0,writable:!0},fraction:{value:0,writable:!0},stopped:{value:0,writable:!0},reset:{value:function(){this.value=0,this.position=0,this.frame=0,this.delta=0,this.fraction=0,this.stopped=0}}})}function mr(){var i=Object.create(null,{name:{value:"",writable:!0},samples:{value:[],writable:!0},noteSamples:{value:null,writable:!0},fadeout:{value:0,writable:!0},volData:{value:null,writable:!0},volEnabled:{value:0,writable:!0},panData:{value:null,writable:!0},panEnabled:{value:0,writable:!0},vibratoType:{value:0,writable:!0},vibratoSweep:{value:0,writable:!0},vibratoSpeed:{value:0,writable:!0},vibratoDepth:{value:0,writable:!0}});return i.noteSamples=new Uint8Array(96),i.volData=ai(),i.panData=ai(),Object.seal(i)}function gr(i,t){var e=Object.create(null,{rows:{value:[],writable:!0},length:{value:0,writable:!0},size:{value:0,writable:!0}});return e.rows.length=e.size=i*t,e.length=i,Object.seal(e)}function oi(i,t){var e=Object.create(null,{frame:{value:0,writable:!0},value:{value:0,writable:!0}});return e.frame=i||0,e.value=t||0,Object.seal(e)}function Pi(){return Object.create(null,{note:{value:0,writable:!0},instrument:{value:0,writable:!0},volume:{value:0,writable:!0},effect:{value:0,writable:!0},param:{value:0,writable:!0}})}function vr(){var i=hr();return Object.defineProperties(i,{finetune:{value:0,writable:!0},panning:{value:0,writable:!0},relative:{value:0,writable:!0}}),Object.seal(i)}function Do(i){var t=dr(i);return Object.defineProperties(t,{id:{value:"F2Player"},patterns:{value:[],writable:!0},instruments:{value:[],writable:!0},voices:{value:[],writable:!0},linear:{value:0,writable:!0},complete:{value:0,writable:!0},order:{value:0,writable:!0},position:{value:0,writable:!0},nextOrder:{value:0,writable:!0},nextPosition:{value:0,writable:!0},pattern:{value:null,writable:!0},patternDelay:{value:0,writable:!0},patternOffset:{value:0,writable:!0},timer:{value:0,writable:!0},rowCurrent:{value:0,writable:!0},initialize:{value:function(){var e=0,r;for(this.reset(),this.timer=this.speed,this.order=0,this.position=0,this.nextOrder=-1,this.nextPosition=-1,this.patternDelay=0,this.patternOffset=0,this.complete=0,this.master=64,this.voices.length=this.channels;e<this.channels;++e)r=To(e),r.channel=this.mixer.channels[e],r.playing=this.instruments[0],r.sample=r.playing.samples[0],this.voices[e]=r,e&&(this.voices[e-1].next=r)}},loader:{value:function(e){var r,a,s,f,o,n,h,c,l,d,v=22,m,u,g,p;if(!(e.length<360)){if(e.position=17,this.title=e.readString(20),e.position++,s=e.readString(20),s==="FastTracker v2.00   "||s==="FastTracker v 2.00  ")this.version=1;else if(s==="Sk@le Tracker")v=2,this.version=2;else if(s==="MadTracker 2.0")this.version=3;else if(s==="MilkyTracker        ")this.version=4;else if(s==="DigiBooster Pro 2.18")this.version=5;else if(s.indexOf("OpenMPT")!==-1)this.version=6;else return;for(e.readUshort(),r=e.readUint(),this.length=e.readUshort(),this.restart=e.readUshort(),this.channels=e.readUshort(),p=u=e.readUshort(),this.instruments=[],this.instruments.length=e.readUshort()+1,this.linear=e.readUshort(),this.speed=e.readUshort(),this.tempo=e.readUshort(),this.track=new Uint8Array(this.length),a=0;a<this.length;++a)h=e.readUbyte(),h>=p&&(u=h+1),this.track[a]=h;if(this.patterns=[],this.patterns.length=u,u!==p){for(l=gr(64,this.channels),h=l.size,a=0;a<h;++a)l.rows[a]=Pi();this.patterns[--u]=l}for(e.position=d=r+60,c=p,a=0;a<c;++a){if(r=e.readUint(),e.position++,l=gr(e.readUshort(),this.channels),u=l.size,p=e.readUshort(),e.position=d+r,n=e.position+p,p)for(h=0;h<u;++h)m=Pi(),p=e.readUbyte(),p&128?(p&1&&(m.note=e.readUbyte()),p&2&&(m.instrument=e.readUbyte()),p&4&&(m.volume=e.readUbyte()),p&8&&(m.effect=e.readUbyte()),p&16&&(m.param=e.readUbyte())):(m.note=p,m.instrument=e.readUbyte(),m.volume=e.readUbyte(),m.effect=e.readUbyte(),m.param=e.readUbyte()),m.note!==Ci&&m.note>96&&(m.note=0),l.rows[h]=m;else for(h=0;h<u;++h)l.rows[h]=Pi();this.patterns[a]=l,d=e.position,d!==n&&(d=e.position=n)}for(n=e.position,c=this.instruments.length,a=1;a<c&&(f=e.readUint(),!(e.position+f>=e.length));++a){if(o=mr(),o.name=e.readString(22),e.position++,p=e.readUshort(),p>16&&(p=16),r=e.readUint(),v===2&&r!==64&&(r=64),p){for(o.samples=[],o.samples.length=p,h=0;h<96;++h)o.noteSamples[h]=e.readUbyte();for(h=0;h<12;++h)o.volData.points[h]=oi(e.readUshort(),e.readUshort());for(h=0;h<12;++h)o.panData.points[h]=oi(e.readUshort(),e.readUshort());for(o.volData.total=e.readUbyte(),o.panData.total=e.readUbyte(),o.volData.sustain=e.readUbyte(),o.volData.loopStart=e.readUbyte(),o.volData.loopEnd=e.readUbyte(),o.panData.sustain=e.readUbyte(),o.panData.loopStart=e.readUbyte(),o.panData.loopEnd=e.readUbyte(),o.volData.flags=e.readUbyte(),o.panData.flags=e.readUbyte(),o.volData.flags&br&&(o.volEnabled=1),o.panData.flags&br&&(o.panEnabled=1),o.vibratoType=e.readUbyte(),o.vibratoSweep=e.readUbyte(),o.vibratoDepth=e.readUbyte(),o.vibratoSpeed=e.readUbyte(),o.fadeout=e.readUshort()<<1,e.position+=v,d=e.position,this.instruments[a]=o,h=0;h<p;++h)g=vr(),g.length=e.readUint(),g.loopStart=e.readUint(),g.loopLen=e.readUint(),g.volume=e.readUbyte(),g.finetune=e.readByte(),g.loopMode=e.readUbyte(),g.panning=e.readUbyte(),g.relative=e.readByte(),e.position++,g.name=e.readString(22),o.samples[h]=g,e.position=d+=r;for(h=0;h<p;++h)g=o.samples[h],g.length&&(d=e.position+g.length,g.loopMode&16&&(g.bits=16,g.loopMode^=16,g.length>>=1,g.loopStart>>=1,g.loopLen>>=1),g.loopLen||(g.loopMode=0),g.store(e),g.loopMode&&(g.length=g.loopStart+g.loopLen),e.position=d)}else e.position=n+f;if(n=e.position,n>=e.length)break}for(o=mr(),o.volData=ai(),o.panData=ai(),o.samples=[],a=0;a<12;++a)o.volData.points[a]=oi(),o.panData.points[a]=oi();for(g=vr(),g.length=220,g.data=new Float32Array(220),a=0;a<220;++a)g.data[a]=0;o.samples[0]=g,this.instruments[0]=o}}},process:{value:function(){var e,r,a,s,f,o,n,h,c,l,d,v,m,u=this.voices[0];if(this.tick)for(;u;){if(l=this.pattern.rows[this.position+u.index],u.delay)if((l.param&15)===this.tick)u.flags=u.delay,u.delay=0;else{u=u.next;continue}if(l.volume)switch(n=l.volume>>4,h=l.volume&15,n){case 6:u.volume-=h,u.volume<0&&(u.volume=0),u.flags|=H;break;case 7:u.volume+=h,u.volume>64&&(u.volume=64),u.flags|=H;break;case 11:u.vibrato();break;case 13:u.panning-=h,u.panning<0&&(u.panning=0),u.flags|=he;break;case 14:u.panning+=h,u.panning>255&&(u.panning=255),u.flags|=he;break;case 15:u.portaPeriod&&u.tonePortamento();break;default:break}switch(n=l.param>>4,h=l.param&15,l.effect){case 0:if(!l.param)break;m=(this.tick-this.timer)%3,m<0&&(m+=3),this.tick===2&&this.timer===18&&(m=0),m?m===1?this.linear?u.arpDelta=-(h<<6):(m=this.amiga(u.note+h,u.finetune),u.arpDelta=m-u.period):this.linear?u.arpDelta=-(n<<6):(m=this.amiga(u.note+n,u.finetune),u.arpDelta=m-u.period):u.arpDelta=0,u.flags|=ae;break;case 1:u.period-=u.portaU,u.period<0&&(u.period=0),u.flags|=ae;break;case 2:u.period+=u.portaD,u.period>9212&&(u.period=9212),u.flags|=ae;break;case 3:u.portaPeriod&&u.tonePortamento();break;case 4:n&&(u.vibratoSpeed=n),h&&(u.vibratoDepth=h<<2),u.vibrato();break;case 5:v=1,u.portaPeriod&&u.tonePortamento();break;case 6:v=1,u.vibrato();break;case 7:u.tremolo();break;case 10:v=1;break;case 14:switch(n){case 9:this.tick%h===0&&(u.volEnvelope.reset(),u.panEnvelope.reset(),u.flags|=H|he|Ve);break;case 12:this.tick===h&&(u.volume=0,u.flags|=H);break;default:break}break;case 17:n=u.volSlideMaster>>4,h=u.volSlideMaster&15,n?(this.master+=n,this.master>64&&(this.master=64),u.flags|=H):h&&(this.master-=h,this.master<0&&(this.master=0),u.flags|=H);break;case 20:this.tick===l.param&&(u.fadeEnabled=1,u.keyoff=1);break;case 24:n=u.panSlide>>4,h=u.panSlide&15,n?(u.panning+=n,u.panning>255&&(u.panning=255),u.flags|=he):h&&(u.panning-=h,u.panning<0&&(u.panning=0),u.flags|=he);break;case 27:if(e=this.tick,l.volume||e++,e%u.retrigy)break;(!l.volume||l.volume>80)&&u.retrigx&&this.retrig(u),u.flags|=Ve;break;case 29:u.tremor();break;default:break}v&&(n=u.volSlide>>4,h=u.volSlide&15,v=0,n?(u.volume+=n,u.flags|=H):h&&(u.volume-=h,u.flags|=H)),u=u.next}else for(this.nextOrder>=0&&(this.order=this.nextOrder),this.nextPosition>=0&&(this.position=this.nextPosition),this.nextOrder=this.nextPosition=-1,this.pattern=this.patterns[this.track[this.order]];u;){if(this.rowCurrent=this.position+u.index,l=this.pattern.rows[this.rowCurrent],e=l.volume>>4,c=l.effect===3||l.effect===5||e===15,n=l.param>>4,u.keyoff=0,u.arpDelta&&(u.arpDelta=0,u.flags|=ae),l.instrument?(u.instrument=l.instrument<this.instruments.length?this.instruments[l.instrument]:null,u.volEnvelope.reset(),u.panEnvelope.reset(),u.flags|=H|he|Ne):(l.note===Ci||l.effect===20&&!l.param)&&(u.fadeEnabled=1,u.keyoff=1),l.note&&l.note!==Ci?u.instrument?(a=u.instrument,m=l.note-1,d=a.samples[a.noteSamples[m]],m+=d.relative,m>=Io&&m<=Lo&&(c||(u.note=m,u.sample=d,l.instrument?(u.volEnabled=a.volEnabled,u.panEnabled=a.panEnabled,u.flags|=Ao):u.flags|=ae|Ve),l.instrument?(u.reset(),u.fadeDelta=a.fadeout):u.finetune=d.finetune>>3<<2,l.effect===14&&n===5&&(u.finetune=(l.param&15)-8<<3),this.linear?m=(120-m<<6)-u.finetune:m=this.amiga(m,u.finetune),c?u.portaPeriod=m:(u.period=m,u.glissPeriod=0))):(u.volume=0,u.flags=H|Ne):u.vibratoReset&&l.effect!==4&&l.effect!==6&&(u.vibDelta=0,u.vibratoReset=0,u.flags|=ae),l.volume)if(l.volume>=16&&l.volume<=80)u.volume=l.volume-16,u.flags|=H|Ne;else switch(h=l.volume&15,e){case 6:u.volume-=h,u.volume<0&&(u.volume=0),u.flags|=H;break;case 7:u.volume+=h,u.volume>64&&(u.volume=64),u.flags|=H;break;case 10:h&&(u.vibratoSpeed=h);break;case 11:h&&(u.vibratoDepth=h<<2);break;case 12:u.panning=h<<4,u.flags|=he;break;case 15:h&&(u.portaSpeed=h<<4);break;default:break}if(l.effect)switch(h=l.param&15,l.effect){case 1:l.param&&(u.portaU=l.param<<2);break;case 2:l.param&&(u.portaD=l.param<<2);break;case 3:l.param&&e!==15&&(u.portaSpeed=l.param);break;case 4:u.vibratoReset=1;break;case 5:l.param&&(u.volSlide=l.param);break;case 6:l.param&&(u.volSlide=l.param),u.vibratoReset=1;break;case 7:n&&(u.tremoloSpeed=n),h&&(u.tremoloDepth=h);break;case 8:u.panning=l.param,u.flags|=he;break;case 9:l.param&&(u.sampleOffset=l.param<<8),u.sampleOffset>=u.sample.length&&(u.volume=0,u.sampleOffset=0,u.flags&=~(ae|Ve),u.flags|=H|Ne);break;case 10:l.param&&(u.volSlide=l.param);break;case 11:this.nextOrder=l.param,this.nextOrder>=this.length?this.complete=1:this.nextPosition=0,f=1,this.patternOffset=0;break;case 12:u.volume=l.param,u.flags|=H|Ne;break;case 13:this.nextPosition=(n*10+h)*this.channels,this.patternOffset=0,f||(this.nextOrder=this.order+1,this.nextOrder>=this.length&&(this.complete=1,this.nextPosition=-1));break;case 14:switch(n){case 1:h&&(u.finePortaU=h<<2),u.period-=u.finePortaU,u.flags|=ae;break;case 2:h&&(u.finePortaD=h<<2),u.period+=u.finePortaD,u.flags|=ae;break;case 3:u.glissando=h;break;case 4:u.waveControl=u.waveControl&240|h;break;case 6:h?(u.patternLoop?u.patternLoop--:u.patternLoop=h,u.patternLoop&&(this.nextPosition=u.patternLoopRow)):u.patternLoopRow=this.patternOffset=this.position;break;case 7:u.waveControl=u.waveControl&15|h<<4;break;case 10:h&&(u.fineSlideU=h),u.volume+=u.fineSlideU,u.flags|=H;break;case 11:h&&(u.fineSlideD=h),u.volume-=u.fineSlideD,u.flags|=H;break;case 13:u.delay=u.flags,u.flags=0;break;case 14:this.patternDelay=h*this.timer;break;default:break}break;case 15:if(!l.param)break;l.param<32?this.timer=l.param:this.mixer.samplesTick=this.sampleRate*2.5/l.param>>0;break;case 16:this.master=l.param,this.master>64&&(this.master=64),u.flags|=H;break;case 17:l.param&&(u.volSlideMaster=l.param);break;case 21:if(!u.instrument||!u.instrument.volEnabled)break;for(a=u.instrument,m=l.param,n=a.volData.total,s=0;s<n&&!(m<a.volData.points[s].frame);s++);u.volEnvelope.position=--s,n--,a.volData.flags&xr&&s===a.volData.loopEnd&&(s=u.volEnvelope.position=a.volData.loopStart,m=a.volData.points[s].frame,u.volEnvelope.frame=m),s>=n?(u.volEnvelope.value=a.volData.points[n].value,u.volEnvelope.stopped=1):(u.volEnvelope.stopped=0,u.volEnvelope.frame=m,m>a.volData.points[s].frame&&u.volEnvelope.position++,r=a.volData.points[s],o=a.volData.points[++s],m=o.frame-r.frame,u.volEnvelope.delta=(m?(o.value-r.value<<8)/m>>0:0)||0,u.volEnvelope.fraction=r.value<<8);break;case 24:l.param&&(u.panSlide=l.param);break;case 27:if(n&&(u.retrigx=n),h&&(u.retrigy=h),!l.volume&&u.retrigy){if(e=this.tick+1,e%u.retrigy)break;l.volume>80&&u.retrigx&&this.retrig(u)}break;case 29:l.param&&(u.tremorOn=++n,u.tremorOff=++h+n);break;case 33:n===1?(h&&(u.xtraPortaU=h),u.period-=u.xtraPortaU,u.flags|=ae):n===2&&(h&&(u.xtraPortaD=h),u.period+=u.xtraPortaD,u.flags|=ae);break;default:break}u=u.next}++this.tick>=this.timer+this.patternDelay&&(this.patternDelay=this.tick=0,this.nextPosition<0&&(this.nextPosition=this.position+this.channels,(this.nextPosition>=this.pattern.size||this.complete)&&(this.nextOrder=this.order+1,this.nextPosition=this.patternOffset,this.nextOrder>=this.length&&(this.nextOrder=this.restart,this.mixer.complete=1))))}},fast:{value:function(){for(var e,r,a,s,f,o=this.voices[0],n;o;)e=o.channel,a=o.flags,o.flags=0,a&Ve&&(e.index=o.sampleOffset,e.pointer=-1,e.dir=0,e.fraction=0,e.sample=o.sample,e.length=o.sample.length,e.enabled=e.sample.data?1:0,o.playing=o.instrument,o.sampleOffset=0),s=o.playing,r=s.vibratoSpeed?o.autoVibrato():0,n=o.volume+o.volDelta,s.volEnabled?(o.volEnabled&&!o.volEnvelope.stopped&&this.envelope(o,o.volEnvelope,s.volData),n=n*o.volEnvelope.value>>6,a|=H,o.fadeEnabled&&(o.fadeVolume-=o.fadeDelta,o.fadeVolume<0?(n=0,o.fadeVolume=0,o.fadeEnabled=0,o.volEnvelope.value=0,o.volEnvelope.stopped=1,o.panEnvelope.stopped=1):n=n*o.fadeVolume>>16)):o.keyoff&&(n=0,a|=H),f=o.panning,s.panEnabled&&(o.panEnabled&&!o.panEnvelope.stopped&&this.envelope(o,o.panEnvelope,s.panData),f=o.panEnvelope.value<<2,a|=he,f<0?f=0:f>255&&(f=255)),a&H&&(n<0?n=0:n>64&&(n=64),e.volume=yr[n*this.master>>6],e.lvol=e.volume*e.lpan,e.rvol=e.volume*e.rpan),a&he&&(e.panning=f,e.lpan=We[256-f],e.rpan=We[f],e.lvol=e.volume*e.lpan,e.rvol=e.volume*e.rpan),a&ae&&(r+=o.period+o.arpDelta+o.vibDelta,this.linear?e.speed=(548077568*Math.pow(2,(4608-r)/768)/this.sampleRate>>0)/65536:e.speed=(65536*(14317456/r)/this.sampleRate>>0)/65536,e.delta=e.speed>>0,e.speed-=e.delta),o=o.next}},accurate:{value:function(){for(var e,r,a,s,f,o,n,h,c,l=this.voices[0],d;l;){if(e=l.channel,a=l.flags,l.flags=0,a&Ve&&(e.sample&&(a|=Ne,e.mixCounter=220,e.oldSample=null,e.oldPointer=-1,e.enabled&&(e.oldDir=e.dir,e.oldFraction=e.fraction,e.oldSpeed=e.speed,e.oldSample=e.sample,e.oldPointer=e.pointer,e.oldLength=e.length,e.lmixRampD=e.lvol,e.lmixDeltaD=e.lvol/220,e.rmixRampD=e.rvol,e.rmixDeltaD=e.rvol/220)),e.dir=1,e.fraction=0,e.sample=l.sample,e.pointer=l.sampleOffset,e.length=l.sample.length,e.enabled=e.sample.data?1:0,l.playing=l.instrument,l.sampleOffset=0),s=l.playing,r=s.vibratoSpeed?l.autoVibrato():0,d=l.volume+l.volDelta,s.volEnabled?(l.volEnabled&&!l.volEnvelope.stopped&&this.envelope(l,l.volEnvelope,s.volData),d=d*l.volEnvelope.value>>6,a|=H,l.fadeEnabled&&(l.fadeVolume-=l.fadeDelta,l.fadeVolume<0?(d=0,l.fadeVolume=0,l.fadeEnabled=0,l.volEnvelope.value=0,l.volEnvelope.stopped=1,l.panEnvelope.stopped=1):d=d*l.fadeVolume>>16)):l.keyoff&&(d=0,a|=H),n=l.panning,s.panEnabled&&(l.panEnabled&&!l.panEnvelope.stopped&&this.envelope(l,l.panEnvelope,s.panData),n=l.panEnvelope.value<<2,a|=he,n<0?n=0:n>255&&(n=255)),!e.enabled){e.volCounter=0,e.panCounter=0,l=l.next;continue}a&H&&(d<0?d=0:d>64&&(d=64),d=yr[d*this.master>>6],o=d*We[256-n],c=d*We[n],d!==e.volume&&!e.mixCounter?(e.volCounter=a&Ne?220:this.mixer.samplesTick,e.lvolDelta=(o-e.lvol)/e.volCounter,e.rvolDelta=(c-e.rvol)/e.volCounter):(e.lvol=o,e.rvol=c),e.volume=d),a&he&&(f=We[256-n],h=We[n],n!==e.panning&&!e.mixCounter&&!e.volCounter?(e.panCounter=this.mixer.samplesTick,e.lpanDelta=(f-e.lpan)/e.panCounter,e.rpanDelta=(h-e.rpan)/e.panCounter):(e.lpan=f,e.rpan=h),e.panning=n),a&ae&&(r+=l.period+l.arpDelta+l.vibDelta,this.linear?e.speed=(548077568*Math.pow(2,(4608-r)/768)/this.sampleRate>>0)/65536:e.speed=(65536*(14317456/r)/this.sampleRate>>0)/65536),e.mixCounter&&(e.lmixRampU=0,e.lmixDeltaU=e.lvol/220,e.rmixRampU=0,e.rmixDeltaU=e.rvol/220),l=l.next}}},envelope:{value:function(e,r,a){var s=r.position,f=a.points[s],o;if(r.frame===f.frame){if(a.flags&xr&&s===a.loopEnd&&(s=r.position=a.loopStart,f=a.points[s],r.frame=f.frame),s===a.total-1){r.value=f.value,r.stopped=1;return}if(a.flags&_o&&s===a.sustain&&!e.fadeEnabled){r.value=f.value;return}r.position++,o=a.points[r.position],r.delta=(o.value-f.value<<8)/(o.frame-f.frame)>>0||0,r.fraction=f.value<<8}else r.fraction+=r.delta;r.value=r.fraction>>8,r.frame++}},amiga:{value:function(e,r){var a=0,s=Fi[++e];return r<0?a=(Fi[--e]-s)/64:r>0&&(a=(s-Fi[++e])/64),s-a*r>>0}},retrig:{value:function(e){switch(e.retrigx){case 1:e.volume--;break;case 2:e.volume++;break;case 3:e.volume-=4;break;case 4:e.volume-=8;break;case 5:e.volume-=16;break;case 6:e.volume=(e.volume<<1)/3;break;case 7:e.volume>>=1;break;case 8:e.volume=e.sample.volume;break;case 9:e.volume++;break;case 10:e.volume+=2;break;case 11:e.volume+=4;break;case 12:e.volume+=8;break;case 13:e.volume+=16;break;case 14:e.volume=e.volume*3>>1;break;case 15:e.volume<<=1;break;default:break}e.volume<0?e.volume=0:e.volume>64&&(e.volume=64),e.flags|=H}}}),Object.seal(t)}var ae=1,H=2,he=4,Ve=8,Ao=15,Ne=32,br=1,_o=2,xr=4,Io=0,Lo=118,Ci=97,Ro=[0,-2,-3,-5,-6,-8,-9,-11,-12,-14,-16,-17,-19,-20,-22,-23,-24,-26,-27,-29,-30,-32,-33,-34,-36,-37,-38,-39,-41,-42,-43,-44,-45,-46,-47,-48,-49,-50,-51,-52,-53,-54,-55,-56,-56,-57,-58,-59,-59,-60,-60,-61,-61,-62,-62,-62,-63,-63,-63,-64,-64,-64,-64,-64,-64,-64,-64,-64,-64,-64,-63,-63,-63,-62,-62,-62,-61,-61,-60,-60,-59,-59,-58,-57,-56,-56,-55,-54,-53,-52,-51,-50,-49,-48,-47,-46,-45,-44,-43,-42,-41,-39,-38,-37,-36,-34,-33,-32,-30,-29,-27,-26,-24,-23,-22,-20,-19,-17,-16,-14,-12,-11,-9,-8,-6,-5,-3,-2,0,2,3,5,6,8,9,11,12,14,16,17,19,20,22,23,24,26,27,29,30,32,33,34,36,37,38,39,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,56,57,58,59,59,60,60,61,61,62,62,62,63,63,63,64,64,64,64,64,64,64,64,64,64,64,63,63,63,62,62,62,61,61,60,60,59,59,58,57,56,56,55,54,53,52,51,50,49,48,47,46,45,44,43,42,41,39,38,37,36,34,33,32,30,29,27,26,24,23,22,20,19,17,16,14,12,11,9,8,6,5,3,2],wr=[0,24,49,74,97,120,141,161,180,197,212,224,235,244,250,253,255,253,250,244,235,224,212,197,180,161,141,120,97,74,49,24],We=[0,.04417,.062489,.076523,.088371,.098821,.108239,.116927,.124977,.132572,.139741,.146576,.153077,.159335,.16535,.171152,.176772,.18221,.187496,.19263,.197643,.202503,.207273,.211951,.216477,.220943,.225348,.229631,.233854,.237985,.242056,.246066,.249985,.253873,.25767,.261437,.265144,.268819,.272404,.275989,.279482,.282976,.286409,.289781,.293153,.296464,.299714,.302965,.306185,.309344,.312473,.315602,.318671,.321708,.324746,.327754,.3307,.333647,.336563,.339449,.342305,.345161,.347986,.350781,.353545,.356279,.359013,.361717,.364421,.367094,.369737,.37238,.374992,.377574,.380157,.382708,.38526,.387782,.390303,.392794,.395285,.397746,.400176,.402606,.405037,.407437,.409836,.412206,.414576,.416915,.419254,.421563,.423841,.42618,.428458,.430737,.432985,.435263,.437481,.439729,.441916,.444134,.446321,.448508,.450665,.452852,.455009,.457136,.459262,.461389,.463485,.465611,.467708,.469773,.471839,.473935,.47597,.478036,.480072,.482077,.484112,.486117,.488122,.490127,.492101,.494106,.496051,.498025,.5,.501944,.503888,.505802,.507746,.50966,.511574,.513488,.515371,.517255,.519138,.521022,.522905,.524758,.526611,.528465,.530318,.53214,.533993,.535816,.537639,.539462,.541254,.543046,.544839,.546631,.548423,.550216,.551978,.553739,.555501,.557263,.558995,.560757,.562489,.56422,.565952,.567683,.569384,.571116,.572817,.574518,.57622,.57789,.579592,.581262,.582964,.584634,.586305,.587946,.589617,.591257,.592928,.594568,.596209,.597849,.599459,.6011,.60271,.60435,.60596,.60757,.60915,.61076,.61237,.61395,.61556,.617139,.618719,.620268,.621848,.623428,.624977,.626557,.628106,.629655,.631205,.632754,.634303,.635822,.637372,.63889,.64044,.641959,.643478,.644966,.646485,.648004,.649523,.651012,.6525,.653989,.655477,.656966,.658454,.659943,.661431,.66289,.664378,.665836,.667294,.668783,.670241,.671699,.673127,.674585,.676043,.677471,.678929,.680357,.681785,.683213,.684641,.686068,.687496,.688894,.690321,.691749,.693147,.694574,.695972,.697369,.698767,.700164,.701561,.702928,.704326,.705723,.70711],yr=[0,.005863,.013701,.021569,.029406,.037244,.045082,.052919,.060757,.068625,.076463,.0843,.092138,.099976,.107844,.115681,.123519,.131357,.139194,.147032,.1549,.162738,.170575,.178413,.186251,.194119,.201956,.209794,.217632,.225469,.233307,.241175,.249013,.25685,.264688,.272526,.280394,.288231,.296069,.303907,.311744,.319582,.32745,.335288,.343125,.350963,.3588,.366669,.374506,.382344,.390182,.398019,.405857,.413725,.421563,.4294,.437238,.445076,.452944,.460781,.468619,.476457,.484294,.492132,.5],Fi=[29024,27392,25856,24384,23040,21696,20480,19328,18240,17216,16256,15360,14512,13696,12928,12192,11520,10848,10240,9664,9120,8608,8128,7680,7256,6848,6464,6096,5760,5424,5120,4832,4560,4304,4064,3840,3628,3424,3232,3048,2880,2712,2560,2416,2280,2152,2032,1920,1814,1712,1616,1524,1440,1356,1280,1208,1140,1076,1016,960,907,856,808,762,720,678,640,604,570,538,508,480,453,428,404,381,360,339,320,302,285,269,254,240,227,214,202,190,180,169,160,151,142,134,127,120,113,107,101,95,90,85,80,75,71,67,63,60,57,53,50,48,45,42,40,38,36,34,32,30,28],kr=Do;function ni(i){return Object.create(null,{index:{value:i,writable:!0},next:{value:null,writable:!0},channel:{value:null,writable:!0},sample:{value:null,writable:!0},enabled:{value:0,writable:!0},period:{value:0,writable:!0},effect:{value:0,writable:!0},param:{value:0,writable:!0},volume:{value:0,writable:!0},portaDir:{value:0,writable:!0},portaPeriod:{value:0,writable:!0},portaSpeed:{value:0,writable:!0},vibratoPos:{value:0,writable:!0},vibratoSpeed:{value:0,writable:!0},initialize:{value:function(){this.channel=null,this.sample=null,this.enabled=0,this.period=0,this.effect=0,this.param=0,this.volume=0,this.portaDir=0,this.portaPeriod=0,this.portaSpeed=0,this.vibratoPos=0,this.vibratoSpeed=0}}})}function zo(i){var t=ri(i);return Object.defineProperties(t,{id:{value:"MKPlayer"},track:{value:null,writable:!0},patterns:{value:[],writable:!0},samples:{value:[],writable:!0},length:{value:0,writable:!0},restart:{value:0,writable:!0},voices:{value:[],writable:!0},trackPos:{value:0,writable:!0},patternPos:{value:0,writable:!0},jumpFlag:{value:0,writable:!0},vibratoDepth:{value:0,writable:!0},restartSave:{value:0,writable:!0},force:{set:function(e){e<Mi?e=Mi:e>qe&&(e=qe),this.version=e,e===qe?this.vibratoDepth=6:this.vibratoDepth=7,e===Er?(this.restartSave=this.restart,this.restart=0):(this.restart=this.restartSave,this.restartSave=0)}},initialize:{value:function(){var e=this.voices[0];for(this.reset(),this.force=this.version,this.speed=6,this.trackPos=0,this.patternPos=0,this.jumpFlag=0;e;)e.initialize(),e.channel=this.mixer.channels[e.index],e.sample=this.samples[0],e=e.next}},loader:{value:function(e){var r=0,a,s,f,o,n,h=0,c;if(!(e.length<2106)&&(e.position=1080,s=e.readString(4),!(s!=="M.K."&&s!=="FLT4"))){for(e.position=0,this.title=e.readString(20),this.version=Mi,e.position+=22,a=1;a<32;++a){if(c=e.readUshort(),!c){this.samples[a]=null,e.position+=28;continue}n=vt(),e.position-=24,n.name=e.readString(22),n.length=c<<1,e.position+=3,n.volume=e.readUbyte(),n.loop=e.readUshort()<<1,n.repeat=e.readUshort()<<1,e.position+=22,n.pointer=h,h+=n.length,this.samples[a]=n,n.length>32768&&(this.version=Oo)}for(e.position=950,this.length=e.readUbyte(),c=e.readUbyte(),this.restart=c<this.length?c:0,a=0;a<128;++a)c=e.readUbyte()<<8,this.track[a]=c,c>r&&(r=c);for(e.position=1084,r+=256,this.patterns.length=r,a=0;a<r;++a)if(o=ii(),c=e.readUint(),o.note=c>>16&4095,o.effect=c>>8&15,o.sample=c>>24&240|c>>12&15,o.param=c&255,this.patterns[a]=o,(o.sample>31||!this.samples[o.sample])&&(o.sample=0),(o.effect===3||o.effect===4)&&(this.version=Er),(o.effect===5||o.effect===6)&&(this.version=qe),o.effect>6&&o.effect<10){this.version=0;return}for(this.mixer.store(e,h),a=1;a<32;++a)if(n=this.samples[a],!!n)for(n.name.indexOf("2.0")>-1&&(this.version=qe),n.loop?(n.loopPtr=n.pointer+n.loop,n.length=n.loop+n.repeat):(n.loopPtr=this.mixer.memory.length,n.repeat=2),h=n.pointer+4,f=n.pointer;f<h;++f)this.mixer.memory[f]=0;n=vt(),n.pointer=n.loopPtr=this.mixer.memory.length,n.length=n.repeat=2,this.samples[0]=n,this.version<qe&&this.restart!==127&&(this.version=Uo)}}},process:{value:function(){var e,r,a,s,f,o,n,h,c,l=this.voices[0];if(this.tick)for(;l;){if(e=l.channel,!l.effect&&!l.param){e.period=l.period,l=l.next;continue}switch(l.effect){case 0:if(c=this.tick%3,!c){e.period=l.period,l=l.next;continue}for(c===1?c=l.param>>4:c=l.param&15,f=l.period&4095,a=37-c,r=0;r<a;++r)if(f>=Sr[r]){e.period=Sr[r+c];break}break;case 1:l.period-=l.param,l.period<113&&(l.period=113),e.period=l.period;break;case 2:l.period+=l.param,l.period>856&&(l.period=856),e.period=l.period;break;case 3:case 5:l.effect===5?h=1:l.param&&(l.portaSpeed=l.param,l.param=0),l.portaPeriod&&(l.portaDir?(l.period-=l.portaSpeed,l.period<=l.portaPeriod&&(l.period=l.portaPeriod,l.portaPeriod=0)):(l.period+=l.portaSpeed,l.period>=l.portaPeriod&&(l.period=l.portaPeriod,l.portaPeriod=0))),e.period=l.period;break;case 4:case 6:l.effect===6?h=1:l.param&&(l.vibratoSpeed=l.param),c=l.vibratoPos>>2&31,c=(l.vibratoSpeed&15)*Bo[c]>>this.vibratoDepth,l.vibratoPos>127?e.period=l.period-c:e.period=l.period+c,c=l.vibratoSpeed>>2&60,l.vibratoPos=l.vibratoPos+c&255;break;case 10:h=1;break;default:break}h&&(c=l.param>>4,h=0,c?l.volume+=c:l.volume-=l.param&15,l.volume<0?l.volume=0:l.volume>64&&(l.volume=64),e.volume=l.volume),l=l.next}else for(s=this.track[this.trackPos]+this.patternPos;l;){switch(e=l.channel,l.enabled=0,o=this.patterns[s+l.index],l.effect=o.effect,l.param=o.param,o.sample?(n=l.sample=this.samples[o.sample],e.volume=l.volume=n.volume):n=l.sample,o.note&&(l.effect===3||l.effect===5?o.note<l.period?(l.portaDir=1,l.portaPeriod=o.note):o.note>l.period?(l.portaDir=0,l.portaPeriod=o.note):l.portaPeriod=0:(l.enabled=1,l.vibratoPos=0,e.enabled=0,e.pointer=n.pointer,e.length=n.length,e.period=l.period=o.note)),l.effect){case 11:this.trackPos=l.param-1,this.jumpFlag^=1;break;case 12:e.volume=l.param,this.version===qe&&(l.volume=l.param);break;case 13:this.jumpFlag^=1;break;case 14:this.mixer.filter.active=l.param^1;break;case 15:c=l.param,c<1?c=1:c>31&&(c=31),this.speed=c,this.tick=0;break;default:break}l.enabled&&(e.enabled=1),e.pointer=n.loopPtr,e.length=n.repeat,l=l.next}++this.tick===this.speed&&(this.tick=0,this.patternPos+=4,(this.patternPos===256||this.jumpFlag)&&(this.patternPos=this.jumpFlag=0,this.trackPos=++this.trackPos&127,this.trackPos===this.length&&(this.trackPos=this.restart,this.mixer.complete=1)))}}}),t.voices[0]=ni(0),t.voices[0].next=t.voices[1]=ni(1),t.voices[1].next=t.voices[2]=ni(2),t.voices[2].next=t.voices[3]=ni(3),t.track=new Uint16Array(128),Object.seal(t)}var Mi=1,Oo=2,Er=3,Uo=4,qe=5,Sr=[856,808,762,720,678,640,604,570,538,508,480,453,428,404,381,360,339,320,302,285,269,254,240,226,214,202,190,180,170,160,151,143,135,127,120,113,0],Bo=[0,24,49,74,97,120,141,161,180,197,212,224,235,244,250,253,255,253,250,244,235,224,212,197,180,161,141,120,97,74,49,24],Pr=zo;function li(i){return Object.create(null,{index:{value:i,writable:!0},next:{value:null,writable:!0},channel:{value:null,writable:!0},sample:{value:null,writable:!0},enabled:{value:0,writable:!0},loopCtr:{value:0,writable:!0},loopPos:{value:0,writable:!0},step:{value:0,writable:!0},period:{value:0,writable:!0},effect:{value:0,writable:!0},param:{value:0,writable:!0},volume:{value:0,writable:!0},pointer:{value:0,writable:!0},length:{value:0,writable:!0},loopPtr:{value:0,writable:!0},repeat:{value:0,writable:!0},finetune:{value:0,writable:!0},offset:{value:0,writable:!0},portaDir:{value:0,writable:!0},portaPeriod:{value:0,writable:!0},portaSpeed:{value:0,writable:!0},glissando:{value:0,writable:!0},tremoloParam:{value:0,writable:!0},tremoloPos:{value:0,writable:!0},tremoloWave:{value:0,writable:!0},vibratoParam:{value:0,writable:!0},vibratoPos:{value:0,writable:!0},vibratoWave:{value:0,writable:!0},funkPos:{value:0,writable:!0},funkSpeed:{value:0,writable:!0},funkWave:{value:0,writable:!0},initialize:{value:function(){this.channel=null,this.sample=null,this.enabled=0,this.loopCtr=0,this.loopPos=0,this.step=0,this.period=0,this.effect=0,this.param=0,this.volume=0,this.pointer=0,this.length=0,this.loopPtr=0,this.repeat=0,this.finetune=0,this.offset=0,this.portaDir=0,this.portaPeriod=0,this.portaSpeed=0,this.glissando=0,this.tremoloParam=0,this.tremoloPos=0,this.tremoloWave=0,this.vibratoParam=0,this.vibratoPos=0,this.vibratoWave=0,this.funkPos=0,this.funkSpeed=0,this.funkWave=0}}})}function No(){var i=ii();return Object.defineProperties(i,{step:{value:0,writable:!0}}),Object.seal(i)}function Cr(){var i=vt();return Object.defineProperties(i,{finetune:{value:0,writable:!0},realLen:{value:0,writable:!0}}),Object.seal(i)}function qo(i){var t=ri(i);return Object.defineProperties(t,{id:{value:"PTPlayer"},track:{value:null,writable:!0},patterns:{value:[],writable:!0},samples:{value:[],writable:!0},length:{value:0,writable:!0},voices:{value:[],writable:!0},trackPos:{value:0,writable:!0},patternPos:{value:0,writable:!0},patternBreak:{value:0,writable:!0},patternDelay:{value:0,writable:!0},breakPos:{value:0,writable:!0},jumpFlag:{value:0,writable:!0},vibratoDepth:{value:0,writable:!0},force:{set:function(e){e<si?e=si:e>Ti&&(e=Ti),this.version=e,e<Fr?this.vibratoDepth=6:this.vibratoDepth=7}},initialize:{value:function(){var e=this.voices[0];for(this.tempo=125,this.speed=6,this.trackPos=0,this.patternPos=0,this.patternBreak=0,this.patternDelay=0,this.breakPos=0,this.jumpFlag=0,this.reset(),this.force=this.version;e;)e.initialize(),e.channel=this.mixer.channels[e.index],e.sample=this.samples[0],e=e.next}},loader:{value:function(e){var r=0,a,s,f,o,n,h=0,c;if(!(e.length<2106)&&(e.position=1080,s=e.readString(4),!(s!=="M.K."&&s!=="M!K!"))){for(e.position=0,this.title=e.readString(20),this.version=si,e.position+=22,a=1;a<32;++a){if(c=e.readUshort(),!c){this.samples[a]=null,e.position+=28;continue}n=Cr(),e.position-=24,n.name=e.readString(22),n.length=n.realLen=c<<1,e.position+=2,n.finetune=e.readUbyte()*37,n.volume=e.readUbyte(),n.loop=e.readUshort()<<1,n.repeat=e.readUshort()<<1,e.position+=22,n.pointer=h,h+=n.length,this.samples[a]=n}for(e.position=950,this.length=e.readUbyte(),e.position++,a=0;a<128;++a)c=e.readUbyte()<<8,this.track[a]=c,c>r&&(r=c);for(e.position=1084,r+=256,this.patterns.length=r,a=0;a<r;++a)o=No(),o.step=c=e.readUint(),o.note=c>>16&4095,o.effect=c>>8&15,o.sample=c>>24&240|c>>12&15,o.param=c&255,this.patterns[a]=o,(o.sample>31||!this.samples[o.sample])&&(o.sample=0),o.effect===15&&o.param>31&&(this.version=Fr),o.effect===8&&(this.version=Ti);for(this.mixer.store(e,h),a=1;a<32;++a)if(n=this.samples[a],!!n)for(n.loop||n.repeat>4?(n.loopPtr=n.pointer+n.loop,n.length=n.loop+n.repeat):(n.loopPtr=this.mixer.memory.length,n.repeat=2),h=n.pointer+2,f=n.pointer;f<h;++f)this.mixer.memory[f]=0;n=Cr(),n.pointer=n.loopPtr=this.mixer.memory.length,n.length=n.repeat=2,this.samples[0]=n}}},process:{value:function(){var e,r,a,s,f,o,n=this.voices[0];if(this.tick)this.effects();else if(this.patternDelay)this.effects();else{for(a=this.track[this.trackPos]+this.patternPos;n;){if(e=n.channel,n.enabled=0,n.step||(e.period=n.period),s=this.patterns[a+n.index],n.step=s.step,n.effect=s.effect,n.param=s.param,s.sample?(f=n.sample=this.samples[s.sample],n.pointer=f.pointer,n.length=f.length,n.loopPtr=n.funkWave=f.loopPtr,n.repeat=f.repeat,n.finetune=f.finetune,e.volume=n.volume=f.volume):f=n.sample,s.note)if((n.step&4080)===3664)n.finetune=(n.param&15)*37;else if(n.effect===3||n.effect===5)if(s.note===n.period)n.portaPeriod=0;else{for(r=n.finetune,o=r+37;r<o&&!(s.note>=Ie[r]);++r);r===o&&o--,r>0&&(o=n.finetune/37>>0&8,o&&r--),n.portaPeriod=Ie[r],n.portaDir=s.note>n.portaPeriod?0:1}else n.effect===9&&this.moreEffects(n);else{this.moreEffects(n),n=n.next;continue}for(r=0;r<37&&!(s.note>=Ie[r]);++r);if(n.period=Ie[n.finetune+r],(n.step&4080)===3792){n.funkSpeed&&this.updateFunk(n),this.extended(n),n=n.next;continue}n.vibratoWave<4&&(n.vibratoPos=0),n.tremoloWave<4&&(n.tremoloPos=0),e.enabled=0,e.pointer=n.pointer,e.length=n.length,e.period=n.period,n.enabled=1,this.moreEffects(n),n=n.next}for(n=this.voices[0];n;)e=n.channel,n.enabled&&(e.enabled=1),e.pointer=n.loopPtr,e.length=n.repeat,n=n.next}++this.tick===this.speed&&(this.tick=0,this.patternPos+=4,this.patternDelay&&--this.patternDelay&&(this.patternPos-=4),this.patternBreak&&(this.patternBreak=0,this.patternPos=this.breakPos,this.breakPos=0),(this.patternPos===256||this.jumpFlag)&&(this.patternPos=this.breakPos,this.breakPos=0,this.jumpFlag=0,++this.trackPos===this.length&&(this.trackPos=0,this.mixer.complete=1)))}},effects:{value:function(){for(var e,r,a,s,f,o=this.voices[0],n;o;){if(e=o.channel,o.funkSpeed&&this.updateFunk(o),(o.step&4095)===0){e.period=o.period,o=o.next;continue}switch(o.effect){case 0:if(f=this.tick%3,!f){e.period=o.period,o=o.next;continue}for(f===1?f=o.param>>4:f=o.param&15,r=o.finetune,a=r+37;r<a;++r)if(o.period>=Ie[r]){e.period=Ie[r+f];break}break;case 1:o.period-=o.param,o.period<113&&(o.period=113),e.period=o.period;break;case 2:o.period+=o.param,o.period>856&&(o.period=856),e.period=o.period;break;case 3:case 5:if(o.effect===5?s=1:(o.portaSpeed=o.param,o.param=0),o.portaPeriod)if(o.portaDir?(o.period-=o.portaSpeed,o.period<=o.portaPeriod&&(o.period=o.portaPeriod,o.portaPeriod=0)):(o.period+=o.portaSpeed,o.period>=o.portaPeriod&&(o.period=o.portaPeriod,o.portaPeriod=0)),o.glissando){for(r=o.finetune,f=r+37;r<f&&!(o.period>=Ie[r]);++r);r===f&&r--,e.period=Ie[r]}else e.period=o.period;break;case 4:case 6:o.effect===6?s=1:o.param&&(f=o.param&15,f&&(o.vibratoParam=o.vibratoParam&240|f),f=o.param&240,f&&(o.vibratoParam=o.vibratoParam&15|f)),a=o.vibratoPos>>2&31,n=o.vibratoWave&3,n?(f=255,a<<=3,n===1&&(o.vibratoPos>127?f-=a:f=a)):f=Mr[a],f=(o.vibratoParam&15)*f>>this.vibratoDepth,o.vibratoPos>127?e.period=o.period-f:e.period=o.period+f,f=o.vibratoParam>>2&60,o.vibratoPos=o.vibratoPos+f&255;break;case 7:e.period=o.period,o.param&&(f=o.param&15,f&&(o.tremoloParam=o.tremoloParam&240|f),f=o.param&240,f&&(o.tremoloParam=o.tremoloParam&15|f)),a=o.tremoloPos>>2&31,n=o.tremoloWave&3,n?(f=255,a<<=3,n===1&&(o.tremoloPos>127?f-=a:f=a)):f=Mr[a],f=(o.tremoloParam&15)*f>>6,o.tremoloPos>127?e.volume=o.volume-f:e.volume=o.volume+f,f=o.tremoloParam>>2&60,o.tremoloPos=o.tremoloPos+f&255;break;case 10:s=1;break;case 14:this.extended(o);break;default:break}s&&(s=0,f=o.param>>4,f?o.volume+=f:o.volume-=o.param&15,o.volume<0?o.volume=0:o.volume>64&&(o.volume=64),e.volume=o.volume),o=o.next}}},moreEffects:{value:function(e){var r=e.channel,a;switch(e.funkSpeed&&this.updateFunk(e),e.effect){case 9:e.param&&(e.offset=e.param),a=e.offset<<8,a>=e.length?e.length=2:(e.pointer+=a,e.length-=a);break;case 11:this.trackPos=e.param-1,this.breakPos=0,this.jumpFlag=1;break;case 12:e.volume=e.param,e.volume>64&&(e.volume=64),r.volume=e.volume;break;case 13:this.breakPos=(e.param>>4)*10+(e.param&15),this.breakPos>63?this.breakPos=0:this.breakPos<<=2,this.jumpFlag=1;break;case 14:this.extended(e);break;case 15:if(!e.param)return;e.param<32?this.speed=e.param:this.mixer.samplesTick=this.sampleRate*2.5/e.param>>0,this.tick=0;break;default:break}}},extended:{value:function(e){var r=e.channel,a=e.param>>4,s,f,o,n=e.param&15;switch(a){case 0:this.mixer.filter.active=n;break;case 1:if(this.tick)return;e.period-=n,e.period<113&&(e.period=113),r.period=e.period;break;case 2:if(this.tick)return;e.period+=n,e.period>856&&(e.period=856),r.period=e.period;break;case 3:e.glissando=n;break;case 4:e.vibratoWave=n;break;case 5:e.finetune=n*37;break;case 6:if(this.tick)return;n?(e.loopCtr?e.loopCtr--:e.loopCtr=n,e.loopCtr&&(this.breakPos=e.loopPos<<2,this.patternBreak=1)):e.loopPos=this.patternPos>>2;break;case 7:e.tremoloWave=n;break;case 8:for(f=e.length-2,o=this.mixer.memory,s=e.loopPtr;s<f;)o[s]=(o[s]+o[++s])*.5;o[++s]=(o[s]+o[0])*.5;break;case 9:if(this.tick||!n||!e.period||this.tick%n)return;r.enabled=0,r.pointer=e.pointer,r.length=e.length,r.delay=30,r.enabled=1,r.pointer=e.loopPtr,r.length=e.repeat,r.period=e.period;break;case 10:if(this.tick)return;e.volume+=n,e.volume>64&&(e.volume=64),r.volume=e.volume;break;case 11:if(this.tick)return;e.volume-=n,e.volume<0&&(e.volume=0),r.volume=e.volume;break;case 12:this.tick===n&&(r.volume=e.volume=0);break;case 13:if(this.tick!==n||!e.period)return;r.enabled=0,r.pointer=e.pointer,r.length=e.length,r.delay=30,r.enabled=1,r.pointer=e.loopPtr,r.length=e.repeat,r.period=e.period;break;case 14:if(this.tick||this.patternDelay)return;this.patternDelay=++n;break;case 15:if(this.tick)return;e.funkSpeed=n,n&&this.updateFunk(e);break;default:break}}},updateFunk:{value:function(e){var r=e.channel,a,s,f=jo[e.funkSpeed];e.funkPos+=f,!(e.funkPos<128)&&(e.funkPos=0,this.version===si?(a=e.pointer+e.sample.realLen-e.repeat,s=e.funkWave+e.repeat,s>a&&(s=e.loopPtr,r.length=e.repeat),r.pointer=e.funkWave=s):(a=e.loopPtr+e.repeat,s=e.funkWave+1,s>=a&&(s=e.loopPtr),this.mixer.memory[s]=-this.mixer.memory[s]))}}}),t.voices[0]=li(0),t.voices[0].next=t.voices[1]=li(1),t.voices[1].next=t.voices[2]=li(2),t.voices[2].next=t.voices[3]=li(3),t.track=new Uint16Array(128),Object.seal(t)}var si=1,Fr=2,Ti=3,Ie=[856,808,762,720,678,640,604,570,538,508,480,453,428,404,381,360,339,320,302,285,269,254,240,226,214,202,190,180,170,160,151,143,135,127,120,113,0,850,802,757,715,674,637,601,567,535,505,477,450,425,401,379,357,337,318,300,284,268,253,239,225,213,201,189,179,169,159,150,142,134,126,119,113,0,844,796,752,709,670,632,597,563,532,502,474,447,422,398,376,355,335,316,298,282,266,251,237,224,211,199,188,177,167,158,149,141,133,125,118,112,0,838,791,746,704,665,628,592,559,528,498,470,444,419,395,373,352,332,314,296,280,264,249,235,222,209,198,187,176,166,157,148,140,132,125,118,111,0,832,785,741,699,660,623,588,555,524,495,467,441,416,392,370,350,330,312,294,278,262,247,233,220,208,196,185,175,165,156,147,139,131,124,117,110,0,826,779,736,694,655,619,584,551,520,491,463,437,413,390,368,347,328,309,292,276,260,245,232,219,206,195,184,174,164,155,146,138,130,123,116,109,0,820,774,730,689,651,614,580,547,516,487,460,434,410,387,365,345,325,307,290,274,258,244,230,217,205,193,183,172,163,154,145,137,129,122,115,109,0,814,768,725,684,646,610,575,543,513,484,457,431,407,384,363,342,323,305,288,272,256,242,228,216,204,192,181,171,161,152,144,136,128,121,114,108,0,907,856,808,762,720,678,640,604,570,538,508,480,453,428,404,381,360,339,320,302,285,269,254,240,226,214,202,190,180,170,160,151,143,135,127,120,0,900,850,802,757,715,675,636,601,567,535,505,477,450,425,401,379,357,337,318,300,284,268,253,238,225,212,200,189,179,169,159,150,142,134,126,119,0,894,844,796,752,709,670,632,597,563,532,502,474,447,422,398,376,355,335,316,298,282,266,251,237,223,211,199,188,177,167,158,149,141,133,125,118,0,887,838,791,746,704,665,628,592,559,528,498,470,444,419,395,373,352,332,314,296,280,264,249,235,222,209,198,187,176,166,157,148,140,132,125,118,0,881,832,785,741,699,660,623,588,555,524,494,467,441,416,392,370,350,330,312,294,278,262,247,233,220,208,196,185,175,165,156,147,139,131,123,117,0,875,826,779,736,694,655,619,584,551,520,491,463,437,413,390,368,347,328,309,292,276,260,245,232,219,206,195,184,174,164,155,146,138,130,123,116,0,868,820,774,730,689,651,614,580,547,516,487,460,434,410,387,365,345,325,307,290,274,258,244,230,217,205,193,183,172,163,154,145,137,129,122,115,0,862,814,768,725,684,646,610,575,543,513,484,457,431,407,384,363,342,323,305,288,272,256,242,228,216,203,192,181,171,161,152,144,136,128,121,114,0],Mr=[0,24,49,74,97,120,141,161,180,197,212,224,235,244,250,253,255,253,250,244,235,224,212,197,180,161,141,120,97,74,49,24],jo=[0,5,6,7,8,10,11,13,16,19,22,26,32,43,64,128],Tr=qo;function Ho(){var i=Object.create(null,{player:{value:null,writable:!0},index:{value:0,writable:!0},amiga:{value:null,writable:!0},mixer:{value:null,writable:!0},tracker:{get:function(){return this.player?Dr[this.index+this.player.version]:Dr[0]}},load:{value:function(t){var e,r;if(t.view||(t=Ei(t)),t.endian=1,t.position=0,t.readUint()===67324752&&window.neoart.Unzip,!t)return null;if(this.player&&this.player.id!=="STPlayer"&&(this.player.load(t),this.player.version))return this.player;if(t.length>336&&(t.position=38,e=t.readString(20),(e==="FastTracker v2.00   "||e==="FastTracker v 2.00  "||e==="Sk@le Tracker"||e==="MadTracker 2.0"||e==="MilkyTracker        "||e==="DigiBooster Pro 2.18"||e.indexOf("OpenMPT")!==-1)&&(this.player=kr(this.mixer),this.player.load(t),this.player.version)))return this.index=Zo,this.player;if(t.endian=0,t.length>2105){if(t.position=1080,e=t.readString(4),e==="M.K."||e==="FLT4"){if(this.player=Pr(this.amiga),this.player.load(t),this.player.version)return this.index=Xo,this.player}else if(e==="FEST"&&(this.player=window.neoart.HMPlayer(this.amiga),this.player.load(t),this.player.version))return this.index=Vo,this.player}return t.length>2105&&(t.position=1080,e=t.readString(4),(e==="M.K."||e==="M!K!")&&(this.player=Tr(this.amiga),this.player.load(t),this.player.version))?(this.index=Go,this.player):t.length>5220&&(this.player=window.neoart.S1Player(this.amiga),this.player.load(t),this.player.version)?(this.index=Wo,this.player):(t.position=0,r=t.readUshort(),t.position=0,e=t.readString(4),(e==="COSO"||r===24576||r===24578||r===24590||r===24598)&&(this.player=window.neoart.JHPlayer(this.amiga),this.player.load(t),this.player.version)?(this.index=Ko,this.player):(t.position=0,r=t.readUshort(),this.player=window.neoart.DWPlayer(this.amiga),this.player.load(t),this.player.version?(this.index=Yo,this.player):(t.position=0,r=t.readUshort(),r===24576&&(this.player=window.neoart.RHPlayer(this.amiga),this.player.load(t),this.player.version)?(this.index=Jo,this.player):t.length>1625&&(this.player=window.neoart.STPlayer(this.amiga),this.player.load(t),this.player.version)?(this.index=$o,this.player):(t.clear(),this.index=0,this.player=null))))}}});return i.amiga=Si(),Object.seal(i)}var $o=0,Xo=4,Go=9,Vo=12,Wo=26,Yo=28,Ko=30,Jo=32,Zo=33,Dr=["Unknown Format","Ultimate SoundTracker","D.O.C. SoundTracker 9","Master SoundTracker","D.O.C. SoundTracker 2.0/2.2","SoundTracker 2.3","SoundTracker 2.4","NoiseTracker 1.0","NoiseTracker 1.1","NoiseTracker 2.0","ProTracker 1.0","ProTracker 1.1/2.1","ProTracker 1.2/2.0","His Master's NoiseTracker","SoundFX 1.0/1.7","SoundFX 1.8","SoundFX 1.945","SoundFX 1.994/2.0","BP SoundMon V1","BP SoundMon V2","BP SoundMon V3","Delta Music 1.0","Delta Music 2.0","Digital Mugician","Digital Mugician 7 Voices","Future Composer 1.0/1.3","Future Composer 1.4","SidMon 1.0","SidMon 2.0","David Whittaker","FredEd","Jochen Hippel","Jochen Hippel COSO","Rob Hubbard","FastTracker II","Sk@leTracker","MadTracker 2.0","MilkyTracker","DigiBooster Pro 2.18","OpenMPT"],Qo=Ho(),Ar=Qo;var ui=class{constructor(t={}){this.baseRawUrl="https://raw.githubusercontent.com/michioxd/keygen-music/master/",this.indexUrl=this.baseRawUrl+"index.json",this.trackList=[],this.history=[],this.maxHistory=50,this.historyCursor=-1,this.currentPlayer=null,this.isPlaying=!1,this.pollInterval=null,this._opId=0,this.onTrackChange=t.onTrackChange||(()=>{}),this.onError=t.onError||(()=>{}),this.hasFetchedIndex=!1,this.currentTrack=null}async init(){if(!this.hasFetchedIndex)try{let t=await fetch(this.indexUrl);if(!t.ok)throw new Error("Network response was not ok");let e=await t.json(),r=["xm","mod","s3m","it"];this.trackList=e.filter(a=>a.fileExtension&&r.includes(a.fileExtension.toLowerCase())),this.hasFetchedIndex=!0}catch(t){throw console.warn("Jukebox offline or failed to fetch index:",t),this.trackList=[],this.onError("NO INTERNET OR BLOCKED ... TRY AGAIN?"),t}}async playNext(t=null){let e=++this._opId;this.stop();try{if(!this.hasFetchedIndex&&(await this.init(),e!==this._opId))return;if(this.trackList.length===0){console.warn("No tracks available in Jukebox.");return}let r=null;if(t&&typeof t=="object"){let{title:a,trackTitle:s,artist:f}=t,o=this.trackList.filter(n=>{let h=!f||n.artist&&n.artist.toLowerCase()===f.toLowerCase(),c=!a||n.title&&n.title.toLowerCase()===a.toLowerCase(),l=!s||n.trackTitle&&n.trackTitle.toLowerCase()===s.toLowerCase();return h&&c&&l});o.length===0?console.warn("Jukebox: NO matches found for target object:",t):o.length>1&&console.warn(`Jukebox: ${o.length} matches found. Refine your search!`,o),r=o[0]||null}else if(t&&typeof t=="string"){let a=this.trackList.filter(s=>s.title&&s.title.toLowerCase()===t.toLowerCase());a.length===0?console.warn("Jukebox: NO matches found for target title string:",t):a.length>1&&console.warn(`Jukebox: ${a.length} matches found for title string.`,a),r=a[0]||null}if(!r&&!t&&this.historyCursor<this.history.length-1)this.historyCursor++,r=this.trackList[this.history[this.historyCursor]];else if(!r){let a=this.trackList.filter((o,n)=>!this.history.includes(n));a.length===0&&(this.history=[],this.historyCursor=-1);let s=a.length>0?a:this.trackList;r=s[Math.floor(Math.random()*s.length)];let f=this.trackList.indexOf(r);this.historyCursor<this.history.length-1&&(this.history=this.history.slice(0,this.historyCursor+1)),this.history.push(f),this.history.length>this.maxHistory&&this.history.shift(),this.historyCursor=this.history.length-1}await this._playTrack(r,e)}catch(r){console.warn("Jukebox track fetch failed:",r),this.onError("NO INTERNET OR BLOCKED ... TRY AGAIN?")}}async playPrevious(){if(this.historyCursor>0){let t=++this._opId;this.stop(),this.historyCursor--;let e=this.trackList[this.history[this.historyCursor]];try{await this._playTrack(e,t)}catch(r){console.warn("Jukebox track fetch failed:",r),this.onError("NO INTERNET OR BLOCKED ... TRY AGAIN?")}}}async _playTrack(t,e){let r=t.path.split("/").map(n=>encodeURIComponent(n)).join("/"),a=this.baseRawUrl+r,s=await fetch(a);if(!s.ok)throw new Error("Failed to fetch audio file");if(e!==this._opId)return;let f=await s.arrayBuffer();if(e!==this._opId)return;let o=null;try{o=Ar.load(f)}catch(n){console.warn("Jukebox: unsupported format for track, skipping:",t.title,n.message),e===this._opId&&setTimeout(()=>this.playNext(),100);return}e===this._opId&&(this.currentPlayer=o,this.currentPlayer?(this.currentTrack=t,typeof this.currentPlayer.loopSong<"u"&&(this.currentPlayer.loopSong=1),this.currentPlayer.play(),this.isPlaying=!0,this.onTrackChange(t),this.setupCompletionPolling()):setTimeout(()=>this.playNext(),100))}setupCompletionPolling(){this.pollInterval&&clearInterval(this.pollInterval),this.pollInterval=setInterval(()=>{if(!this.currentPlayer)return this.stopPolling();let t=!1;this.currentPlayer.amiga&&this.currentPlayer.amiga.playing===!1&&(t=!0),this.currentPlayer.mixer&&this.currentPlayer.mixer.playing===!1&&(t=!0),this.currentPlayer.stopped&&(t=!0),this.currentPlayer.playing===!1&&(t=!0),t&&this.playNext()},1e3)}stopPolling(){this.pollInterval&&(clearInterval(this.pollInterval),this.pollInterval=null)}stop(){if(this.stopPolling(),this.isPlaying=!1,this.currentPlayer){try{this.currentPlayer.stop()}catch{}this.currentPlayer=null}}};function _r(i,t,e){let r=document.getElementById("afx-audio-toggle");if(!r)return;let a=document.getElementById("afx-bgm-status");r.checked&&e.classList.add("afx-music-playing"),i.jukebox=new ui({onTrackChange:o=>{let n=`NOW PLAYING: ${o.artist} - ${o.title} - ${o.trackTitle}`;t.marquee=n,i.marquee&&i.marquee.setText(n)},onError:o=>{t.marquee=o,i.marquee&&i.marquee.setText(o)}}),r.addEventListener("change",o=>{let n=o.target.checked,h=pt();if(n){e.classList.add("afx-bgm-active"),e.classList.add("afx-music-playing"),a.innerHTML=h?"\u{1F50A}":"\u{1F50A} BGM: ON";let c=window.AudioContext||window.webkitAudioContext;c&&(window.neoart=window.neoart||{},window.neoart.audioContext||(window.neoart.audioContext=new c)),window.neoart.audioContext&&window.neoart.audioContext.state==="suspended"&&window.neoart.audioContext.resume();let l=localStorage.getItem("ankifx_preferred_effect")||t.defaultEffect||"geometry",d=t.trackTitle||i.EFFECT_SONG_MAP[l]||null;i.jukebox.playNext(d)}else e.classList.remove("afx-bgm-active"),e.classList.remove("afx-music-playing"),a.innerHTML=h?"\u{1F507}":"\u{1F507} BGM: OFF",i.jukebox.stop(),t.marquee=i.defaultMarqueeText,i.marquee&&i.marquee.setText(i.defaultMarqueeText)});let s=document.getElementById("afx-btn-back"),f=document.getElementById("afx-btn-skip");s&&s.addEventListener("click",o=>{o.stopPropagation(),i.jukebox&&i.jukebox.playPrevious()}),f&&f.addEventListener("click",o=>{o.stopPropagation(),i.jukebox&&i.jukebox.playNext()})}function Ir(i,t,e,r){let a=document.getElementById("afx-effect-selector");a&&a.addEventListener("change",s=>{let f=s.target.value;if(localStorage.setItem("ankifx_preferred_effect",f),Object.values(J).forEach(o=>o.stop()),i.ctx2D&&i.ctx2D.clearRect(0,0,i.width,i.height),i.glContext&&(i.glContext.clearColor(0,0,0,0),i.glContext.clear(i.glContext.COLOR_BUFFER_BIT)),t.defaultEffect=f,f==="debug"?e.classList.add("afx-debug-active"):e.classList.remove("afx-debug-active"),gt(i,t,r,t.marqueePosition,f),i.jukebox&&i.jukebox.isPlaying){let o=t.trackTitle||i.EFFECT_SONG_MAP[f]||null,n=i.jukebox.currentTrack,h=!1;o&&(typeof o=="string"?h=!n||n.title.toLowerCase()!==o.toLowerCase():h=!n||o.title&&n.title.toLowerCase()!==o.title.toLowerCase()||o.trackTitle&&n.trackTitle.toLowerCase()!==o.trackTitle.toLowerCase()||o.artist&&(n.artist||"").toLowerCase()!==o.artist.toLowerCase()),h&&i.jukebox.playNext(o)}})}function Lr(i,t,e){let r=document.createElement("div");r.id="ankifx-overlay",t.debug&&r.classList.add("afx-debug-active");let a=window.innerWidth||document.documentElement.clientWidth||800,s=a<480?.65:a<768?.8:1,f=Math.max(55,Math.ceil(85*s));er()&&(t.marqueePosition==="top"?r.style.paddingTop=`calc(1rem + ${f}px)`:r.style.paddingBottom=`calc(1rem + ${f}px)`);let o=Ge(),n=pt(),h=n?"\u{1F4DC} ":"\u{1F4DC} TEXT: ",c=n?"":" BGM: ",l=n?h.trim():o?`${h}ON`:`${h}OFF`,d=n?"\u{1F507}":`\u{1F507}${c}OFF`,v=n?"\u{1F3A8} ":"[ Effect: ",m=n?"":" ]",u=Object.values(J).filter(C=>C.id!=="debug"||t.debug).map(C=>`
            <option value="${C.id}" ${e===C.id?"selected":""}>
                ${v}${C.name}${m}
            </option>
        `).join(""),g=`
        <div id="afx-bottom-dock">
            <div class="afx-control-group-left">
                <div class="afx-control-row">
                    <label class="afx-toggle"><input type="checkbox" id="afx-text-toggle" ${o?"checked":""}><span class="afx-slider"></span></label>
                    <span id="afx-text-status">${l}</span>
                </div>
                <div id="afx-bgm-container" class="afx-control-row">
                    <label class="afx-toggle"><input type="checkbox" id="afx-audio-toggle"><span class="afx-slider"></span></label>
                    <span id="afx-bgm-status">${d}</span>
                </div>
            </div>
            <div class="afx-control-group-right">
                <div id="afx-effect-controls-container"></div>
                <div id="afx-effect-selector-container" class="afx-control-row afx-effect-selector-container">
                    <select id="afx-effect-selector" class="afx-select">
                        ${u}
                    </select>
                </div>
            </div>
        </div>
    `,p=!1;try{p=localStorage.getItem(`ankifx_agreed_${t.deckTitle}`)==="true"}catch{}let w=t.termsText&&t.termsText.trim()!==""&&!p;w&&(r.innerHTML=`
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
        `);let b=document.createElement("div");for(b.innerHTML=g;b.firstChild;)r.appendChild(b.firstChild);let P=document.createElement("div");P.id="ankifx-background",document.body.appendChild(P),i.sharedGL=document.createElement("canvas"),i.sharedGL.id="afx-shared-gl",i.sharedGL.className="afx-shared-canvas",P.appendChild(i.sharedGL),i.shared2D=document.createElement("canvas"),i.shared2D.id="afx-shared-2d",i.shared2D.className="afx-shared-canvas",P.appendChild(i.shared2D),i.sharedMarquee=document.createElement("canvas"),i.sharedMarquee.id="afx-shared-marquee",i.sharedMarquee.className="afx-shared-canvas afx-shared-marquee-canvas",P.appendChild(i.sharedMarquee),i.glContext=i.sharedGL.getContext("webgl",{alpha:!1,antialias:!1}),i.ctx2D=i.shared2D.getContext("2d"),i.ctxMarquee=i.sharedMarquee.getContext("2d"),document.body.appendChild(r);let y=document.createElement("div");y.id="afx-top-dock";let E=document.createElement("div");E.className="afx-top-group-left",E.id="afx-top-group-left";let x=document.createElement("div");x.className="afx-top-group-right",x.id="afx-top-group-right";let k=document.createElement("button");k.id="afx-btn-back",k.className="afx-playback-btn",k.textContent="\u23EE\uFE0F";let _=document.createElement("button");if(_.id="afx-btn-skip",_.className="afx-playback-btn",_.textContent="\u23ED\uFE0F",E.appendChild(k),x.appendChild(_),t.debug){let C=document.createElement("div");C.id="afx-global-fps",C.className="afx-global-fps",C.textContent="FPS: --",E.appendChild(C)}y.appendChild(E),y.appendChild(x),r.appendChild(y);let A=C=>{let U=r.classList.contains("afx-agreed-state"),B=C.target.closest("button, input, select, .afx-slider, .afx-toggle, .afx-playback-btn, select option");U?B&&C.stopPropagation():C.stopPropagation()};["touchstart","touchend","mousedown","mouseup","pointerdown","pointerup","click"].forEach(C=>{r.addEventListener(C,A,{passive:!1})});let I=document.getElementById("afx-consent-btn");w&&I?ur(i,t,r,I):window.AnkiFX.agree(r,t.deckTitle),_r(i,t,r);let O=document.getElementById("afx-text-toggle");if(O){let C=document.getElementById("afx-text-status");O.addEventListener("change",U=>{let B=U.target.checked,N=pt();localStorage.setItem("ankifx_marquee_enabled",B);let q=N?"\u{1F4DC} ":"\u{1F4DC} TEXT: ";C.textContent=N?q.trim():B?`${q}ON`:`${q}OFF`,i.marquee&&(i.marquee.enabled=B)})}return Ir(i,t,r,P),{overlay:r,background:P}}var Rr=["ankifx-overlay","ankifx-background","afx-btn-back","afx-btn-skip","afx-bottom-dock","afx-top-dock"],F={marquee:null,jukebox:null,sharedGL:null,shared2D:null,sharedMarquee:null,glContext:null,ctx2D:null,ctxMarquee:null,currentEffectId:null,dpr:1,width:0,height:0,marqueeInterval:null,defaultMarqueeText:null,EFFECT_SONG_MAP:{},_layoutHandler:null,_resizeTimeout:null,_resizeInterval:null,observer:null,dockObserver:null};function ea(i={}){console.log("AnkiFX: Initialized.");let t=tr(i);if(document.getElementById("ankifx-overlay")&&rr(F,t))return;document.documentElement.classList.remove("afx-scroll-lock"),document.documentElement.classList.remove("afx-agreed"),Rr.forEach(a=>{let s=document.getElementById(a);s&&s.remove()}),F.defaultMarqueeText=t.marquee,F.EFFECT_SONG_MAP={},Object.entries(J).forEach(([a,s])=>{s&&s.preferredTrack&&(F.EFFECT_SONG_MAP[a]=s.preferredTrack)}),zr();let e=ir(t),{background:r}=Lr(F,t,e);lr(F),nr(F),_e(F),ar(F),F.marquee?(F.marquee.setText(t.marquee),F.marquee.setPosition(t.marqueePosition)):(F.marquee=new Yt(t.marquee,t.marqueePosition),ki(F)),gt(F,t,r,t.marqueePosition,e),F.marquee&&(F.marquee.enabled=Ge()),sr(F),Zt()}function zr(){if(document.getElementById("ankifx-styles"))return;let i=document.createElement("style");i.id="ankifx-styles",i.textContent=Qi,document.head.appendChild(i)}function ta(i,t){if(i.classList.add("afx-agreed-state"),document.documentElement.classList.add("afx-agreed"),document.documentElement.classList.remove("afx-scroll-lock"),t)try{localStorage.setItem(`ankifx_agreed_${t}`,"true")}catch{}Zt()}function ia(){F.currentEffectId&&J[F.currentEffectId]?.stop&&J[F.currentEffectId].stop(),F.jukebox&&(F.jukebox.stop(),F.jukebox=null),F.marqueeInterval&&(cancelAnimationFrame(F.marqueeInterval),F.marqueeInterval=null),F.marquee=null;let i=document.getElementById("_flag"),t=document.getElementById("_mark");i&&document.body.appendChild(i),t&&document.body.appendChild(t),Rr.forEach(r=>{let a=document.getElementById(r);a&&a.remove()});let e=document.getElementById("ankifx-styles");e&&e.remove(),document.documentElement.style.removeProperty("--afx-viewport-height"),document.documentElement.style.removeProperty("--afx-dock-height"),document.documentElement.classList.remove("afx-scroll-lock"),document.documentElement.classList.remove("afx-agreed"),Array.from(document.documentElement.classList).forEach(r=>{r.startsWith("afx-effect-")&&document.documentElement.classList.remove(r)}),window.AnkiFX_Config=null,F.observer&&(F.observer.disconnect(),F.observer=null),F.dockObserver&&(F.dockObserver.disconnect(),F.dockObserver=null),F._layoutHandler&&(window.removeEventListener("orientationchange",F._layoutHandler),window.removeEventListener("resize",F._layoutHandler),F._layoutHandler=null),F._resizeTimeout&&(clearTimeout(F._resizeTimeout),F._resizeTimeout=null),F._resizeInterval&&(clearInterval(F._resizeInterval),F._resizeInterval=null),F.currentEffectId=null,console.log("AnkiFX: Destroyed.")}var fi="local";try{let i=typeof __ankifx_script_src=="string"?__ankifx_script_src:"";if(!i){let e=(new Error().stack||"").match(/(https?:\/\/[^\s)\n:]+|file:\/\/[^\s)\n:]+)/g);if(e&&e.length>0){for(let r=0;r<e.length;r++)if(e[r].includes("ankifx")){i=e[r];break}}}i&&(i.includes("cdn.jsdelivr.net")||i.includes("github")||i.includes("rawgit")||i.includes("githack")?fi="remote":fi="local")}catch{fi="detection-failed"}var ra="1.0.0-8dbb6fb",oa="2026-06-03T15:36:52.438Z",aa=fi,Ye={init:ea,destroy:ia,agree:ta,injectCSS:zr,handleResize:()=>_e(F),startEffect:(i,t,e,r)=>gt(F,i,t,e,r),startMarqueeLoop:()=>ki(F),renderEffectControls:mt,setControlValue:or,get version(){return ra},get buildDate(){return oa},get source(){return aa},get marquee(){return F.marquee},set marquee(i){F.marquee=i},get jukebox(){return F.jukebox},set jukebox(i){F.jukebox=i},get currentEffectId(){return F.currentEffectId},get defaultMarqueeText(){return F.defaultMarqueeText},get EFFECT_SONG_MAP(){return F.EFFECT_SONG_MAP}};window.AnkiFX_Eval_History=window.AnkiFX_Eval_History||[];var Or=window.AnkiFX&&window.AnkiFX.source==="remote"&&Ye.source==="local";window.AnkiFX_Eval_History.push({source:Ye.source,version:Ye.version,buildDate:Ye.buildDate,time:new Date().toLocaleTimeString(),status:Or?"ignored (late local)":"active"});Or?console.warn(`[AnkiFX Loader] Late local engine evaluation ignored. A remote engine (Version: ${window.AnkiFX.version}) is already active.`):window.AnkiFX=Ye;})();
