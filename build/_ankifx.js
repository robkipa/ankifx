var __ankifx_script_src=(document.currentScript&&document.currentScript.src)||"";
(()=>{var ei=[],Ee=null,xi=60,wi=1.5,yi={id:"aurora",name:"Aurora",run:dr,stop:mr,drawOverlay:pr,onResize:(f,t)=>{let e=getComputedStyle(document.documentElement),i=parseInt(e.getPropertyValue("--io-header"))||0,n=t-i;if(me=f/8,ve=n/8,Ee){let l=xi/8,u=Math.ceil(me/l),a=Math.ceil(ve/(l*wi));Ee.w=u,Ee.h=a,Ee.build()}K&&(K.style.width=me+"px",K.style.height=ve+"px",K.style.position="absolute",K.style.top=i+"px",K.style.left="0",K.style.transform="scale(8)",K.style.transformOrigin="top left")},marqueeFont:{color:"#E0FFFF",shadowColor:"rgba(0,128,128,0.8)",shadowBlur:10}},Ge=null,me,ve,K=null,hr=0,Ve=0,Ne={x:-1e3,y:-1e3},gt=class{constructor(t,e){this.x=t||0,this.y=e||0}setAngle(t){let e=this.getLength()||1;this.x=Math.cos(t)*e,this.y=Math.sin(t)*e}setLength(t){let e=Math.atan2(this.y,this.x);this.x=Math.cos(e)*t,this.y=Math.sin(e)*t}getLength(){return Math.sqrt(this.x*this.x+this.y*this.y)}addTo(t){this.x+=t.x,this.y+=t.y}},bi=(()=>{let f=new Uint8Array(512),t=new Uint8Array(256).map(()=>Math.random()*256);for(let n=0;n<512;n++)f[n]=t[n&255];let e=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]];function i(n,l,u,a){return n[0]*l+n[1]*u+n[2]*a}return{simplex3:(n,l,u)=>{let a,r,c,h,o=.3333333333333333,d=1/6,b=(n+l+u)*o,m=Math.floor(n+b),s=Math.floor(l+b),v=Math.floor(u+b),p=(m+s+v)*d,x=n-m+p,w=l-s+p,E=u-v+p,g,F,A,S,T,P;x>=w?w>=E?(g=1,F=0,A=0,S=1,T=1,P=0):x>=E?(g=1,F=0,A=0,S=1,T=0,P=1):(g=0,F=0,A=1,S=1,T=0,P=1):w<E?(g=0,F=0,A=1,S=0,T=1,P=1):x<E?(g=0,F=1,A=0,S=0,T=1,P=1):(g=0,F=1,A=0,S=1,T=1,P=0);let M=x-g+d,L=w-F+d,B=E-A+d,R=x-S+2*d,$=w-T+2*d,G=E-P+2*d,X=x-1+3*d,k=w-1+3*d,C=E-1+3*d,z=m&255,I=s&255,q=v&255,W=.6-x*x-w*w-E*E;W<0?a=0:(W*=W,a=W*W*i(e[f[z+f[I+f[q]]]%12],x,w,E));let ne=.6-M*M-L*L-B*B;ne<0?r=0:(ne*=ne,r=ne*ne*i(e[f[z+g+f[I+F+f[q+A]]]%12],M,L,B));let y=.6-R*R-$*$-G*G;y<0?c=0:(y*=y,c=y*y*i(e[f[z+S+f[I+T+f[q+P]]]%12],R,$,G));let _=.6-X*X-k*k-C*C;return _<0?h=0:(_*=_,h=_*_*i(e[f[z+1+f[I+1+f[q+1]]]%12],X,k,C)),32*(a+r+c+h)}}})(),ti=class{constructor(t,e,i={}){this.settings={frequency:.1,...i},this.w=t,this.h=e,this.time=0,this.build()}build(){this.cols=Math.ceil(this.w),this.rows=Math.ceil(this.h),this.field=new Array(this.cols);for(let t=0;t<this.cols;t++){this.field[t]=new Array(this.rows);for(let e=0;e<this.rows;e++)this.field[t][e]=new gt(0,0)}}update(t){this.time+=t;let e=this.time*this.settings.frequency/1e3;for(let i=0;i<this.field.length;i++)for(let n=0;n<this.field[i].length;n++){let l=bi.simplex3(i/20,n/20,e)*Math.PI*2,u=bi.simplex3(i/10+4e4,n/10+4e4,e);this.field[i][n].setAngle(l),this.field[i][n].setLength(u),typeof this.manipulateVector=="function"&&this.manipulateVector(this.field[i][n],i,n),typeof this.onDraw=="function"&&this.onDraw(this.field[i][n],i,n)}}};function cr(){ei=[];let f=150;for(let t=0;t<f;t++)ei.push({x:Math.random(),y:Math.random(),size:.5+Math.random()*1.3,opacity:.15+Math.random()*.75,blinkSpeed:.001+Math.random()*.002,blinkOffset:Math.random()*Math.PI*2})}function je(f){f.touches&&f.touches[0]?(Ne.x=f.touches[0].clientX,Ne.y=f.touches[0].clientY):(Ne.x=f.clientX,Ne.y=f.clientY)}function dr(f,t){let e=f.ctx2d;K=f.canvas2D,K.classList.add("afx-aurora-active");let i=f.topInset||0,n=f.visibleHeight||f.height;me=f.width/8,ve=n/8,K.width=me*f.dpr,K.height=ve*f.dpr,e.setTransform(1,0,0,1,0,0),e.scale(f.dpr,f.dpr),K.style.width=me+"px",K.style.height=ve+"px",K.style.position="absolute",K.style.top=i+"px",K.style.left="0",K.style.transform="scale(8)",K.style.transformOrigin="top left",cr();let l=xi/8,u=Math.ceil(me/l),a=Math.ceil(ve/(l*wi));Ee=new ti(u,a,{frequency:.1});let r={x:me/u,y:ve/a},c=255/a;Ee.onDraw=(o,d,b)=>{let m=o.getLength()*Math.abs(o.x),s=o.getLength()*Math.abs(o.y),v=Math.round(-20*m+80*s+(50-.6*b*c)),p=Math.round(180*m+20*s-60+.4*b*c),x=Math.round(50*m+30*s+(40-.5*b*c)+.5*b*c);e.fillStyle=`rgba(${v}, ${p}, ${x}, 0.8)`,e.fillRect(d*r.x,b*r.y,r.x+.5,r.y+.5)},Ee.manipulateVector=(o,d,b)=>{let m={x:d*r.x+.5*r.x,y:b*r.y+.5*r.y},s=Ne.x/8,v=Ne.y/8,p=new gt((s-m.x)/me,(v-m.y)/ve);o.addTo(p),o.getLength()>1&&o.setLength(1)},hr=0,Ve=0,window.addEventListener("mousemove",je),window.addEventListener("touchstart",je),window.addEventListener("touchmove",je);function h(o){Ve||(Ve=o);let d=o-Ve;Ve=o,e.fillStyle="#020b1a",e.fillRect(0,0,me,ve),Ee.update(d),Ge=requestAnimationFrame(h)}Ge=requestAnimationFrame(h)}function pr(f,t,e,i){let n=getComputedStyle(document.documentElement),l=parseInt(n.getPropertyValue("--io-header"))||0,u=e-l;f.fillStyle="#ffffff",ei.forEach(a=>{let r=(Math.sin(i*a.blinkSpeed+a.blinkOffset)+1)/2;f.globalAlpha=a.opacity*r,f.beginPath();let c=l+a.y*u;f.arc(a.x*t,c,a.size,0,Math.PI*2),f.fill()}),f.globalAlpha=1}function mr(){Ge&&(cancelAnimationFrame(Ge),Ge=null),window.removeEventListener("mousemove",je),window.removeEventListener("touchstart",je),window.removeEventListener("touchmove",je),K&&(K.classList.remove("afx-aurora-active"),K.style.cssText="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;",K=null);let f=window.AnkiFX;f&&typeof f.handleResize=="function"&&f.handleResize()}var bt=null,se,ce,ki={id:"debug",name:"DEBUG",run:vr,stop:gr,onResize:(f,t)=>{se=f,ce=t},marqueeFont:{color:"#00ff00",shadowColor:"rgba(0,0,0,0.8)",shadowBlur:5}};function vr(f,t){let e=f.ctx2d;se=f.width,ce=f.height;let i=f.dpr||1,n=0,l=0,u=0;function a(r){r===void 0&&(r=performance.now()),n||(n=r),l++,r-n>=1e3&&(u=l,l=0,n=r),e.fillStyle="#000",e.fillRect(0,0,se,ce),e.fillStyle="#fff",e.font="bold 13px monospace",[`FPS: ${u}`,`window: ${window.innerWidth}x${window.innerHeight}`,`screen: ${screen.width}x${screen.height}`,`dpr (native): ${window.devicePixelRatio}`,`dpr (engine): ${i}`,`doc: ${document.documentElement.clientWidth}x${document.documentElement.clientHeight}`,`orient: ${window.orientation||"N/A"}`].forEach((k,C)=>{e.fillText(k,20,60+C*18)}),e.fillStyle="#ff55ff",e.font="bold 13px monospace",e.fillText("--- TUNER & LAYOUT METRICS ---",360,60),e.fillStyle="#fff",e.font="12px monospace";let h=getComputedStyle(document.documentElement),o=h.getPropertyValue("--io-header")||"N/A",d=h.getPropertyValue("--tuner-height")||"N/A",b=document.documentElement.style.getPropertyValue("--tuner-height")||"N/A",m=window.AnkiFX?window.AnkiFX.tunerOffset:"N/A",s=window.AnkiFX?window.AnkiFX.tunerAutoUpdate:"N/A",v=document.getElementById("ankifx-background"),p=v?v.getBoundingClientRect().height:"N/A",x=v?v.getBoundingClientRect().width:"N/A",w=document.getElementById("ankifx-overlay"),E=w?w.getBoundingClientRect().height:"N/A",g=document.getElementById("qa"),F=g?g.getBoundingClientRect().height:"N/A",A=document.querySelector(".card"),S=A?A.getBoundingClientRect().height:"N/A",T=window.innerWidth>window.innerHeight,P=h.getPropertyValue("--top-inset")||"N/A",M=h.getPropertyValue("--bottom-inset")||"N/A",L=h.getPropertyValue("--afx-bottom-offset")||"N/A",B=parseInt(h.getPropertyValue("--io-header"))||0,R=document.documentElement.clientHeight+B;[`--io-header:           ${o}`,`--top-inset:           ${P}`,`--bottom-inset:        ${M}`,`--tuner-height (comp): ${d}`,`--tuner-height (in):   ${b}`,`tunerOffset:           ${m}`,`tunerAutoUpdate:       ${s}`,`isLandscape:           ${T}`,`--afx-bottom-offset:   ${L}`,`bg-size:               ${x}x${p}`,`overlay-h:             ${E}`,`qa-h:                  ${F}`,`card-h:                ${S}`,`visibleBounds:         0 to ${R}px`].forEach((k,C)=>{e.fillText(k,360,80+C*16)}),e.fillStyle="#0f0",e.font="bold 13px monospace",e.fillText("--- AnkiFX DIAGNOSTICS ---",20,195),e.fillStyle="#fff",e.font="12px monospace",e.fillText(`Version:  ${window.AnkiFX?.version||"1.0.0-dev"}`,20,215),e.fillText(`Source:   ${window.AnkiFX?.source||"unknown"}`,20,230),e.fillText(`Built:    ${window.AnkiFX?.buildDate||"development"}`,20,245),e.fillStyle="#0ff",e.font="bold 13px monospace",e.fillText("--- ENGINE EVALUATION HISTORY ---",20,265);let G=window.AnkiFX_Eval_History||[];G.length===0?(e.fillStyle="#888",e.font="italic 12px monospace",e.fillText("(No evaluation history captured)",20,282)):(e.font="11px monospace",G.slice(-3).forEach((k,C)=>{e.fillStyle=k.status==="active"?"#55ff55":"#ffaa55",e.fillText(`[${C+1}] ${k.source} (${k.version}) @ ${k.time} - ${k.status}`,20,282+C*15)})),e.fillStyle="#0ff",e.font="bold 13px monospace",e.fillText("--- CHRONOLOGICAL LOADER LOGS ---",20,335);let X=window.AnkiFX_Loader_Logs||[];X.length===0?(e.fillStyle="#888",e.font="italic 12px monospace",e.fillText("(No logs captured by template loader)",20,355)):(e.font="11px monospace",X.slice(-12).forEach((k,C)=>{let z=k.includes("fail")||k.includes("Error")||k.includes("offline")||k.includes("warn");e.fillStyle=z?"#ff5555":"#55ff55",e.fillText(`[${C+1}] ${k}`,20,355+C*16)})),e.fillStyle="#f0f",e.font="bold 12px monospace",e.fillText("(0,0)",5,15),e.fillText(`(${se},0)`,se-65,15),e.fillText(`(0,${ce})`,5,ce-5),e.fillText(`(${se},${ce})`,se-65,ce-5),e.strokeStyle="#0ff",e.lineWidth=3,e.setLineDash([5,5]),e.beginPath(),e.moveTo(0,R-2),e.lineTo(se,R-2),e.stroke(),e.setLineDash([]),e.fillStyle="#0ff",e.font="bold 14px monospace",e.textAlign="center",e.fillText("--- VISIBLE DOCUMENT BOTTOM ---",se/2,R-8),e.textAlign="left",e.strokeStyle="#f00",e.lineWidth=4,e.beginPath(),e.moveTo(0,ce-2),e.lineTo(se,ce-2),e.stroke(),e.fillStyle="#f00",e.font="bold 18px monospace",e.textAlign="center",e.fillText("--- CANVAS BOTTOM ---",se/2,ce-10),e.textAlign="left",e.beginPath(),e.moveTo(se-2,0),e.lineTo(se-2,ce),e.stroke(),bt=requestAnimationFrame(a)}a()}function gr(){bt&&(cancelAnimationFrame(bt),bt=null)}var We=null,J,ge,de={id:"ecg",name:"ECG Monitor",run:br,stop:xr,onResize:(f,t)=>{J=f,ge=t},marqueeFont:{color:"#FF1A1A",shadowColor:"#CC0000",shadowBlur:15}};function br(f,t){let e=f.ctx2d;J=f.width,ge=f.height;let i=localStorage.getItem("ankifx_ecg_rhythm")||"sinus";de.controls=[{type:"button",id:"ecg-trigger",label:i==="sinus"?"\u26A1 TRIGGER ARRHYTHMIA":"\u{1F49A} RESTORE SINUS",onClick:()=>{let y=localStorage.getItem("ankifx_ecg_rhythm")||"sinus",_;if(y==="sinus"){let j=["first_degree","mobitz_1","mobitz_2","third_degree","st_elevation","afib","a_flutter","torsades"];_=j[Math.floor(Math.random()*j.length)]}else _="sinus";localStorage.setItem("ankifx_ecg_rhythm",_),localStorage.setItem("ankifx_ecg_trigger_time",Date.now())}}];let n=200,l=40,u=120,a=25,r=5,c=new Float32Array(4096),h=0,o=0,d=0,b=0,m=0,s=0,v=0,p=100,x=.6,w=72,E=0,g="sinus",F=25+Math.random()*15,A=0,S=["first_degree","mobitz_1","mobitz_2","third_degree","st_elevation","afib","a_flutter","torsades"],T=0;function P(){h<J&&(h=J)}let M=(y,_,j,U)=>U*Math.exp(-((y-_)**2)/(2*j**2));function L(y){return M(y,.15,.03,.12)}function B(y){return M(y,.03,.03,.12)}function R(y,_){let j=_%4;return j===0?M(y,.17,.03,.12):j===1?M(y,.1,.03,.12):j===2?M(y,.03,.03,.12):M(y,.15,.03,.12)}function $(y){return M(y,.08,.03,.12)}function G(y){return .035*Math.sin(y*Math.PI*40)+.015*Math.sin(y*Math.PI*96)+.008*Math.sin(y*Math.PI*176)}function X(y){return .085*(y*4%1-.5)}function k(y,_){let j=Math.sin(y*Math.PI*2)*.58+Math.sin(y*Math.PI*4)*.16,U=Math.sin(_*1.2);return j*U}function C(y,_=!1){let j=0;return j+=M(y,.33,.008,-.08),j+=M(y,.36,.012,1),j+=M(y,.39,.008,-.12),_&&(j+=M(y,.46,.07,.38)),j+=M(y,.56,.04,.22),j}function z(y,_,j){let U=y%1,N=Math.floor(y);return _==="sinus"?L(U)+C(U,!1):_==="first_degree"?B(U)+C(U,!1):_==="mobitz_1"?N%4===3?R(U,N):R(U,N)+C(U,!1):_==="mobitz_2"?N%3===2?$(U):$(U)+C(U,!1):_==="st_elevation"?L(U)+C(U,!0):_==="afib"?G(U)+C(U,!1):_==="a_flutter"?X(U)+C(U,!1):_==="torsades"?k(U,j):0}function I(y,_){let j=y%1,U=_%1,N=M(j,.15,.03,.12),xe=M(U,.33,.008,-.08)+M(U,.36,.012,1)+M(U,.39,.008,-.12)+M(U,.56,.04,.22);return N+xe}function q(){e.strokeStyle="rgba(60, 0, 0, 0.15)",e.lineWidth=.5,e.beginPath();for(let y=0;y<J;y+=r)e.moveTo(y,0),e.lineTo(y,ge);for(let y=0;y<ge;y+=r)e.moveTo(0,y),e.lineTo(J,y);e.stroke(),e.strokeStyle="rgba(80, 0, 0, 0.3)",e.lineWidth=1,e.beginPath();for(let y=0;y<J;y+=a)e.moveTo(y,0),e.lineTo(y,ge);for(let y=0;y<ge;y+=a)e.moveTo(0,y),e.lineTo(J,y);e.stroke()}function W(){let y=Math.max(16,Math.min(28,J*.04));e.save(),e.textAlign="right",e.textBaseline="top";let _=E*15,j=.5+E*.5;e.font=`bold ${y}px "Courier New", monospace`,e.fillStyle=`rgba(255, 26, 26, ${j})`,e.fillText(`\u2665 ${w} BPM`,J-15,15);let U=Math.max(11,Math.min(16,y*.6));e.font=`bold ${U}px "Courier New", monospace`,e.fillStyle="rgba(255, 26, 26, 0.7)";let N="SINUS RHYTHM";g==="first_degree"?N="1\xB0 AV BLOCK":g==="mobitz_1"?N="2\xB0 AV (MOBITZ 1)":g==="mobitz_2"?N="2\xB0 AV (MOBITZ 2)":g==="third_degree"?N="3\xB0 AV BLOCK":g==="st_elevation"?N="ST ELEVATION":g==="afib"?N="ATRIAL FIBRILLATION":g==="a_flutter"?N="ATRIAL FLUTTER":g==="torsades"&&(N="TORSADES DE POINTES"),e.fillText(N,J-15,15+y+4),e.restore()}function ne(y){b||(b=y);let _=Math.min((y-b)/1e3,.05);b=y,d+=_,P();let j=localStorage.getItem("ankifx_ecg_rhythm")||"sinus",U=parseInt(localStorage.getItem("ankifx_ecg_trigger_time")||"0");if(U>A){if(A=U,g=j,F=d+25+Math.random()*15,g!=="sinus"){let Z=S.indexOf(g);Z!==-1&&(T=(Z+1)%S.length)}g==="afib"&&(p=70+Math.floor(Math.random()*60),x=60/p),de.controls&&de.controls[0]&&(de.controls[0].label=g==="sinus"?"\u26A1 TRIGGER ARRHYTHMIA":"\u{1F49A} RESTORE SINUS",AnkiFX.renderEffectControls(de))}d>=F&&(g==="sinus"?(g=S[T],T=(T+1)%S.length):g="sinus",localStorage.setItem("ankifx_ecg_rhythm",g),F=d+25+Math.random()*15,g==="afib"&&(p=70+Math.floor(Math.random()*60),x=60/p),de.controls&&de.controls[0]&&(de.controls[0].label=g==="sinus"?"\u26A1 TRIGGER ARRHYTHMIA":"\u{1F49A} RESTORE SINUS",AnkiFX.renderEffectControls(de)));let N=72;g==="third_degree"?N=35:g==="mobitz_1"||g==="mobitz_2"?N=68:g==="afib"?N=p:g==="a_flutter"?N=75:g==="torsades"&&(N=220);let xe=g==="afib"?x:60/N,ke=m,De=s,Se=v;if(g==="third_degree"?(s+=_/(60/88),v+=_/(60/N)):m+=_/xe,g!=="third_degree"){let Z=Math.floor(ke);Math.floor(m)>Z&&g==="afib"&&(p=70+Math.floor(Math.random()*65),x=60/p)}if(g==="third_degree")Math.floor(Se-.36)<Math.floor(v-.36)&&(E=1,w=N+Math.floor(Math.random()*3)-1);else if(Math.floor(ke-.36)<Math.floor(m-.36)){let Z=Math.floor(m-.36),oe=!1;g==="mobitz_1"?oe=Z%4===3:g==="mobitz_2"&&(oe=Z%3===2),oe||(E=1,w=Math.floor(N),g!=="torsades"&&g!=="a_flutter"&&(w+=Math.floor(Math.random()*5)-2))}E=Math.max(0,E-_*4);let Ie=n*_,Pe=o+Ie,Re=Math.floor(o),_e=Math.floor(Pe);for(let Z=Re;Z<=_e;Z++){let oe=Z%J,fe=(Z-o)/Ie;if(g==="third_degree"){let he=De+(s-De)*fe,pt=Se+(v-Se)*fe;c[oe]=I(he,pt)}else{let he=ke+(m-ke)*fe;c[oe]=z(he,g,d)}}o=Pe,o>=J&&(o-=J),e.fillStyle="#000000",e.fillRect(0,0,J,ge),q();let we=ge*.55,Qt=ge*.35,ct=Math.floor(o)%J,gi=4;e.save(),e.lineCap="round",e.lineJoin="round";for(let Z=0;Z<3;Z++){Z===0?(e.lineWidth=15,e.strokeStyle="rgb(200, 0, 0)"):Z===1?(e.lineWidth=7,e.strokeStyle="rgb(255, 15, 15)"):(e.lineWidth=2.4,e.strokeStyle="rgb(255, 175, 175)");for(let oe=0;oe<J;oe+=gi){let fe=ct-oe;if(fe<0&&(fe+=J),fe>J-l)continue;let he=1,pt=J-l-u;if(fe>pt&&(he=1-(fe-pt)/u,he=Math.max(0,he)),he<=0)continue;let mt=0;fe<12&&(mt=1-fe/12),Z===0?e.globalAlpha=he*(.07+mt*.13):Z===1?e.globalAlpha=he*(.28+mt*.32):e.globalAlpha=he*(.85+mt*.15),e.beginPath();let ur=we-c[oe]*Qt;e.moveTo(oe,ur);let vt=Math.min(oe+gi,J);for(let qe=oe+1;qe<vt;qe++){let fr=we-c[qe]*Qt;e.lineTo(qe,fr)}if(vt<J){let qe=we-c[vt]*Qt;e.lineTo(vt,qe)}e.stroke()}}e.globalAlpha=1,e.restore(),e.save();let dt=e.createLinearGradient(ct-3,0,ct+3,0);dt.addColorStop(0,"rgba(255, 0, 0, 0)"),dt.addColorStop(.5,"rgba(255, 50, 50, 0.4)"),dt.addColorStop(1,"rgba(255, 0, 0, 0)"),e.fillStyle=dt,e.fillRect(ct-3,0,6,ge),e.restore(),W(),We=requestAnimationFrame(ne)}We=requestAnimationFrame(ne)}function xr(){We&&(cancelAnimationFrame(We),We=null)}var Ye=null,ii,ri,Si={id:"fire",name:"Doom Fire",run:yr,stop:kr,onResize:(f,t)=>{ii=f,ri=t},preferredTrack:{title:"Doom 3 BFG Edition",trackTitle:"DOOM E1M1"},marqueeFont:{color:"#ffffff",shadowColor:"rgba(0,0,0,0.8)",shadowBlur:5}},wr=[[7,7,7],[31,7,7],[47,15,7],[71,15,7],[87,23,7],[103,31,7],[119,31,7],[143,39,7],[159,47,7],[175,63,7],[191,71,7],[199,71,7],[223,79,7],[223,87,7],[223,87,7],[215,95,7],[215,95,7],[215,103,15],[207,111,15],[207,119,15],[207,127,15],[207,135,23],[199,135,23],[199,143,23],[199,151,31],[191,159,31],[191,159,31],[191,167,39],[191,167,39],[191,175,47],[183,175,47],[183,183,47],[183,183,55],[207,207,111],[223,223,159],[239,239,199],[255,255,255]];function yr(f,t){let e=f.ctx2d;ii=f.width,ri=f.height;let i=320,n=168,l=new Uint8Array(i*n),u=e.createImageData(i,n),a=u.data,r=document.createElement("canvas");r.width=i,r.height=n;let c=r.getContext("2d");function h(){l.fill(0);for(let s=0;s<i;s++)l[(n-1)*i+s]=36}function o(s){let v=l[s];if(v===0)l[s-i]=0;else{let p=Math.floor(Math.random()*3),x=s-p+1;l[x-i]=v-(p&1)}}function d(){for(let s=0;s<i;s++)for(let v=1;v<n;v++)o(v*i+s)}function b(){for(let s=0;s<l.length;s++){let v=l[s],p=wr[v],x=s*4;a[x]=p[0],a[x+1]=p[1],a[x+2]=p[2],a[x+3]=255}}h();function m(){d(),b(),c.putImageData(u,0,0),e.save(),e.imageSmoothingEnabled=!1,e.drawImage(r,0,0,ii,ri),e.restore(),Ye=requestAnimationFrame(m)}Ye=requestAnimationFrame(m)}function kr(){Ye&&(cancelAnimationFrame(Ye),Ye=null)}var Ze=null,Ke,Je,Pi={id:"geometry",name:"Geometry",run:Sr,stop:Pr,onResize:(f,t)=>{Ke=f,Je=t},marqueeFont:{colorFn:(f,t)=>`hsl(${(f*120+t*4)%360}, 100%, 55%)`,shadowColor:"inherit",shadowBlur:15}};function Sr(f,t){let e=f.ctx2d;Ke=f.width,Je=f.height;let i=0;function n(){i+=.012,e.globalCompositeOperation="source-over",e.fillStyle="rgba(2, 2, 5, 0.3)",e.fillRect(0,0,Ke,Je),e.globalCompositeOperation="lighter";let l=Ke/2,u=Je/2,a=Math.max(Ke,Je)*.85;for(let r=0;r<35;r++){let c=i+r*.05,h=(Math.sin(c*.8)*.5+.5)*a+r*12;e.save(),e.translate(l,u),e.rotate(Math.sin(i*.3)*Math.PI+r*.06),e.scale(Math.sin(i*.5+r*.1)*.4+.8,Math.cos(i*.4+r*.1)*.4+.8),e.beginPath();for(let d=0;d<=8;d++){let b=d/8*Math.PI*2,m=Math.cos(b)*h,s=Math.sin(b)*h;d===0?e.moveTo(m,s):e.lineTo(m,s)}let o=(i*50+r*10)%360;e.strokeStyle=`hsla(${o}, 95%, 65%, 0.6)`,e.lineWidth=4,e.stroke(),e.restore()}e.globalCompositeOperation="source-over",Ze=requestAnimationFrame(n)}Ze=requestAnimationFrame(n)}function Pr(){Ze&&(cancelAnimationFrame(Ze),Ze=null)}var Er=["#c3e4ff","#6ec3f4","#eae2ff","#b9beff"];function Ei(f){return[(f>>16&255)/255,(f>>8&255)/255,(255&f)/255]}var ai=class{constructor(t,e,i,n){let l=this;l.canvas=t,l.gl=e,l.meshes=[],l.debug=()=>{};let u=l.gl;Object.defineProperties(l,{Material:{enumerable:!1,value:class{constructor(r,c,h={}){let o=this;function d(s,v){let p=u.createShader(s);return u.shaderSource(p,v),u.compileShader(p),u.getShaderParameter(p,u.COMPILE_STATUS)||console.error("Shader compilation error:",u.getShaderInfoLog(p)),p}function b(s,v){return Object.entries(s).map(([p,x])=>x.getDeclaration(p,v)).join(`
`)}o.uniforms=h,o.uniformInstances=[];let m=`
              precision highp float;
            `;o.vertexSource=`
              ${m}
              attribute vec4 position;
              attribute vec2 uv;
              attribute vec2 uvNorm;
              ${b(l.commonUniforms,"vertex")}
              ${b(h,"vertex")}
              ${r}
            `,o.Source=`
              ${m}
              ${b(l.commonUniforms,"fragment")}
              ${b(h,"fragment")}
              ${c}
            `,o.vertexShader=d(u.VERTEX_SHADER,o.vertexSource),o.fragmentShader=d(u.FRAGMENT_SHADER,o.Source),o.program=u.createProgram(),u.attachShader(o.program,o.vertexShader),u.attachShader(o.program,o.fragmentShader),u.linkProgram(o.program),u.getProgramParameter(o.program,u.LINK_STATUS)||console.error("Program link error:",u.getProgramInfoLog(o.program)),u.useProgram(o.program),o.attachUniforms(void 0,l.commonUniforms),o.attachUniforms(void 0,o.uniforms)}attachUniforms(r,c){let h=this;r===void 0?Object.entries(c).forEach(([o,d])=>{h.attachUniforms(o,d)}):c.type==="array"?c.value.forEach((o,d)=>h.attachUniforms(`${r}[${d}]`,o)):c.type==="struct"?Object.entries(c.value).forEach(([o,d])=>h.attachUniforms(`${r}.${o}`,d)):h.uniformInstances.push({uniform:c,location:u.getUniformLocation(h.program,r)})}}},Uniform:{enumerable:!1,value:class{constructor(r){this.type="float",Object.assign(this,r),this.typeFn={float:"1f",int:"1i",vec2:"2fv",vec3:"3fv",vec4:"4fv",mat4:"Matrix4fv"}[this.type]||"1f",this.update()}update(r){this.value!==void 0&&u[`uniform${this.typeFn}`](r,this.typeFn.substring(0,6)==="Matrix"?this.transpose:this.value,this.typeFn.substring(0,6)==="Matrix"?this.value:null)}getDeclaration(r,c,h){let o=this;if(o.excludeFrom!==c){if(o.type==="array")return o.value[0].getDeclaration(r,c,o.value.length)+`
const int ${r}_length = ${o.value.length};`;if(o.type==="struct"){let d=r.replace("u_","");return d=d.charAt(0).toUpperCase()+d.slice(1),`uniform struct ${d} 
{
`+Object.entries(o.value).map(([b,m])=>m.getDeclaration(b,c).replace(/^uniform/,"")).join("")+`
} ${r}${h>0?`[${h}]`:""};`}return`uniform ${o.type} ${r}${h>0?`[${h}]`:""};`}}}},PlaneGeometry:{enumerable:!1,value:class{constructor(r,c,h,o,d){u.createBuffer(),this.attributes={position:new l.Attribute({target:u.ARRAY_BUFFER,size:3}),uv:new l.Attribute({target:u.ARRAY_BUFFER,size:2}),uvNorm:new l.Attribute({target:u.ARRAY_BUFFER,size:2}),index:new l.Attribute({target:u.ELEMENT_ARRAY_BUFFER,size:3,type:u.UNSIGNED_SHORT})},this.setTopology(h,o),this.setSize(r,c,d)}setTopology(r=1,c=1){let h=this;h.xSegCount=r,h.ySegCount=c,h.vertexCount=(h.xSegCount+1)*(h.ySegCount+1),h.quadCount=h.xSegCount*h.ySegCount*2,h.attributes.uv.values=new Float32Array(2*h.vertexCount),h.attributes.uvNorm.values=new Float32Array(2*h.vertexCount),h.attributes.index.values=new Uint16Array(3*h.quadCount);for(let o=0;o<=h.ySegCount;o++)for(let d=0;d<=h.xSegCount;d++){let b=o*(h.xSegCount+1)+d;if(h.attributes.uv.values[2*b]=d/h.xSegCount,h.attributes.uv.values[2*b+1]=1-o/h.ySegCount,h.attributes.uvNorm.values[2*b]=d/h.xSegCount*2-1,h.attributes.uvNorm.values[2*b+1]=1-o/h.ySegCount*2,d<h.xSegCount&&o<h.ySegCount){let m=o*h.xSegCount+d;h.attributes.index.values[6*m]=b,h.attributes.index.values[6*m+1]=b+1+h.xSegCount,h.attributes.index.values[6*m+2]=b+1,h.attributes.index.values[6*m+3]=b+1,h.attributes.index.values[6*m+4]=b+1+h.xSegCount,h.attributes.index.values[6*m+5]=b+2+h.xSegCount}}h.attributes.uv.update(),h.attributes.uvNorm.update(),h.attributes.index.update()}setSize(r=1,c=1,h="xz"){let o=this;o.width=r,o.height=c,o.orientation=h,(!o.attributes.position.values||o.attributes.position.values.length!==3*o.vertexCount)&&(o.attributes.position.values=new Float32Array(3*o.vertexCount));let d=r/-2,b=c/-2,m=r/o.xSegCount,s=c/o.ySegCount;for(let v=0;v<=o.ySegCount;v++){let p=b+v*s;for(let x=0;x<=o.xSegCount;x++){let w=d+x*m,E=v*(o.xSegCount+1)+x;o.attributes.position.values[3*E+"xyz".indexOf(h[0])]=w,o.attributes.position.values[3*E+"xyz".indexOf(h[1])]=-p}}o.attributes.position.update()}}},Mesh:{enumerable:!1,value:class{constructor(r,c){let h=this;h.geometry=r,h.material=c,h.wireframe=!1,h.attributeInstances=[],Object.entries(h.geometry.attributes).forEach(([o,d])=>{h.attributeInstances.push({attribute:d,location:d.attach(o,h.material.program)})}),l.meshes.push(h)}draw(){u.useProgram(this.material.program),this.material.uniformInstances.forEach(({uniform:r,location:c})=>r.update(c)),this.attributeInstances.forEach(({attribute:r,location:c})=>r.use(c)),u.drawElements(this.wireframe?u.LINES:u.TRIANGLES,this.geometry.attributes.index.values.length,u.UNSIGNED_SHORT,0)}remove(){l.meshes=l.meshes.filter(r=>r!==this)}}},Attribute:{enumerable:!1,value:class{constructor(r){this.type=u.FLOAT,this.normalized=!1,this.buffer=u.createBuffer(),Object.assign(this,r),this.update()}update(){this.values!==void 0&&(u.bindBuffer(this.target,this.buffer),u.bufferData(this.target,this.values,u.STATIC_DRAW))}attach(r,c){let h=u.getAttribLocation(c,r);return this.target===u.ARRAY_BUFFER&&(u.enableVertexAttribArray(h),u.vertexAttribPointer(h,this.size,this.type,this.normalized,0,0)),h}use(r){u.bindBuffer(this.target,this.buffer),this.target===u.ARRAY_BUFFER&&(u.enableVertexAttribArray(r),u.vertexAttribPointer(r,this.size,this.type,this.normalized,0,0))}}}});let a=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];l.commonUniforms={projectionMatrix:new l.Uniform({type:"mat4",value:a}),modelViewMatrix:new l.Uniform({type:"mat4",value:a}),resolution:new l.Uniform({type:"vec2",value:[1,1]}),aspectRatio:new l.Uniform({type:"float",value:1})},i&&n&&this.setSize(i,n)}setSize(t=640,e=480,i=1){this.width=t,this.height=e,this.gl.viewport(0,0,t*i,e*i),this.commonUniforms.resolution.value=[t,e],this.commonUniforms.aspectRatio.value=t/e}setOrthographicCamera(t=0,e=0,i=0,n=-2e3,l=2e3){this.commonUniforms.projectionMatrix.value=[2/this.width,0,0,0,0,2/this.height,0,0,0,0,2/(n-l),0,t,e,i,1]}render(){this.gl.clearColor(0,0,0,0),this.gl.clearDepth(1),this.meshes.forEach(t=>t.draw())}cleanup(){let t=this.gl;this.meshes.forEach(e=>{e.attributeInstances&&e.attributeInstances.forEach(({location:i})=>{typeof i=="number"&&i>=0&&t.disableVertexAttribArray(i)}),e.material&&e.material.program&&t.deleteProgram(e.material.program),e.geometry&&e.geometry.attributes&&Object.values(e.geometry.attributes).forEach(i=>{i.buffer&&t.deleteBuffer(i.buffer)})}),this.meshes=[]}},oi=class{constructor(t,e,i,n){this.canvas=t,this.gl=e,this.width=i,this.height=n,this.angle=0,this.conf={presetName:"",wireframe:!1,density:[.06,.16],zoom:1,rotation:0,playing:!0},this.t=1253106,this.last=0,this.amp=320,this.seed=5,this.freqX=14e-5,this.freqY=29e-5,this.activeColors=[1,1,1,1],this.shaderFiles={vertex:`
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
            `},this.initGradientColors(),this.minigl=new ai(t,e,i,n),this.initMesh(),this.resize(),this.updateThemeAwareText()}initGradientColors(){this.sectionColors=Er.map(t=>Ei(parseInt(t.substring(1),16)))}initMaterial(){this.uniforms={u_time:new this.minigl.Uniform({value:0}),u_shadow_power:new this.minigl.Uniform({value:5}),u_darken_top:new this.minigl.Uniform({value:0}),u_active_colors:new this.minigl.Uniform({value:this.activeColors,type:"vec4"}),u_global:new this.minigl.Uniform({value:{noiseFreq:new this.minigl.Uniform({value:[this.freqX,this.freqY],type:"vec2"}),noiseSpeed:new this.minigl.Uniform({value:5e-6})},type:"struct"}),u_vertDeform:new this.minigl.Uniform({value:{incline:new this.minigl.Uniform({value:Math.sin(this.angle)/Math.cos(this.angle)}),offsetTop:new this.minigl.Uniform({value:-.5}),offsetBottom:new this.minigl.Uniform({value:-.5}),noiseFreq:new this.minigl.Uniform({value:[3,4],type:"vec2"}),noiseAmp:new this.minigl.Uniform({value:this.amp}),noiseSpeed:new this.minigl.Uniform({value:10}),noiseFlow:new this.minigl.Uniform({value:3}),noiseSeed:new this.minigl.Uniform({value:this.seed})},type:"struct",excludeFrom:"fragment"}),u_baseColor:new this.minigl.Uniform({value:this.sectionColors[0],type:"vec3",excludeFrom:"fragment"}),u_waveLayers:new this.minigl.Uniform({value:[],excludeFrom:"fragment",type:"array"})};for(let t=1;t<this.sectionColors.length;t+=1)this.uniforms.u_waveLayers.value.push(new this.minigl.Uniform({value:{color:new this.minigl.Uniform({value:this.sectionColors[t],type:"vec3"}),noiseFreq:new this.minigl.Uniform({value:[2+t/this.sectionColors.length,3+t/this.sectionColors.length],type:"vec2"}),noiseSpeed:new this.minigl.Uniform({value:11+.3*t}),noiseFlow:new this.minigl.Uniform({value:6.5+.3*t}),noiseSeed:new this.minigl.Uniform({value:this.seed+10*t}),noiseFloor:new this.minigl.Uniform({value:.1}),noiseCeil:new this.minigl.Uniform({value:.63+.07*t})},type:"struct"}));return this.vertexShader=[this.shaderFiles.noise,this.shaderFiles.blend,this.shaderFiles.vertex].join(`

`),new this.minigl.Material(this.vertexShader,this.shaderFiles.fragment,this.uniforms)}initMesh(){this.material=this.initMaterial(),this.geometry=new this.minigl.PlaneGeometry,this.mesh=new this.minigl.Mesh(this.geometry,this.material)}resize(){let t=Math.min(window.devicePixelRatio||1,1.5);this.minigl.setSize(this.width,this.height,t),this.minigl.setOrthographicCamera(),this.xSegCount=Math.ceil(this.width*this.conf.density[0]),this.ySegCount=Math.ceil(this.height*this.conf.density[1]),this.mesh.geometry.setTopology(this.xSegCount,this.ySegCount),this.mesh.geometry.setSize(this.width,this.height),this.mesh.material.uniforms.u_shadow_power.value=this.width<600?5:6}animate=t=>{if(!this.conf.playing)return;this.last===0&&(this.last=t);let e=Math.min(t-this.last,1e3/15);this.last=t,this.t+=e,this.mesh.material.uniforms.u_time.value=this.t,this.minigl.render(),this.animationId=requestAnimationFrame(this.animate)};updateThemeAwareText(){if(!this.sectionColors||this.sectionColors.length===0)return;let t=0;this.sectionColors.forEach(l=>{let u=l[0],a=l[1],r=l[2],c=.299*u+.587*a+.114*r;t+=c});let e=t/this.sectionColors.length,i=e>.6?"#111111":"#ffffff",n=e>.6?"0 1px 2px rgba(255, 255, 255, 0.8)":"0 1px 3px rgba(0, 0, 0, 0.9), 0 2px 10px rgba(0, 0, 0, 0.6)";document.documentElement.style.setProperty("--afx-body-color",i),document.documentElement.style.setProperty("--afx-text-shadow",n),xt.marqueeFont={colorFn:(l,u)=>{if(!this.sectionColors||this.sectionColors.length===0)return"#ffffff";let a=(l*1.5+u*.25)%this.sectionColors.length,r=Math.floor(a),c=(r+1)%this.sectionColors.length,h=a-r,o=this.sectionColors[r],d=this.sectionColors[c],b=o[0]*(1-h)+d[0]*h,m=o[1]*(1-h)+d[1]*h,s=o[2]*(1-h)+d[2]*h,v=e>.6?.45:1;return`rgb(${Math.round(b*v*255)}, ${Math.round(m*v*255)}, ${Math.round(s*v*255)})`},shadowColor:e>.6?"rgba(0, 0, 0, 0.25)":"inherit",shadowBlur:16},window.AnkiFX&&window.AnkiFX.marquee&&window.AnkiFX.marquee.updateStyles(xt.marqueeFont)}randomizeColors(){let t=()=>"#"+Math.floor(Math.random()*16777215).toString(16).padStart(6,"0"),e=[t(),t(),t(),t()];if(this.sectionColors=e.map(i=>Ei(parseInt(i.substring(1),16))),this.uniforms&&this.uniforms.u_baseColor&&this.uniforms.u_waveLayers&&this.uniforms.u_waveLayers.value){this.uniforms.u_baseColor.value=this.sectionColors[0];for(let i=0;i<this.uniforms.u_waveLayers.value.length;i++){let n=this.uniforms.u_waveLayers.value[i];n&&n.value&&n.value.color&&(n.value.color.value=this.sectionColors[i+1]||this.sectionColors[0])}}this.updateThemeAwareText()}destroy(){this.conf.playing=!1,this.animationId&&cancelAnimationFrame(this.animationId),this.minigl&&this.minigl.cleanup()}},re=null,xt={id:"gradient",name:"Gradient",controls:[{type:"button",id:"gradient-randomize",label:"\u{1F3A8} RANDOMIZE",onClick:()=>{re&&re.randomizeColors()}}],run:(f,t)=>{re&&re.destroy(),re=new oi(f.canvasGL,f.gl,f.width,f.height),re.conf.playing=!0,re.last=0,re.animationId=requestAnimationFrame(re.animate)},stop:()=>{re&&(re.destroy(),re=null),document.documentElement.style.removeProperty("--afx-body-color"),document.documentElement.style.removeProperty("--afx-text-shadow")},onResize:(f,t,e)=>{re&&(re.width=f,re.height=t,re.resize())},marqueeFont:{color:"#E6E6FA",shadowColor:"rgba(230, 230, 250, 0.6)",shadowBlur:8}};var yt=null,Le,Ce,et,Pt,le={id:"julia",name:"Julia Set",run:Cr,stop:Tr,onResize:(f,t,e)=>{Le=f,Ce=t,Pt&&et&&Pt.uniform2f(et,f*e,t*e)},preferredTrack:{title:"Acoustica Power Bundle 4",trackTitle:"AiR"},presets:[{name:"Black Hole",cRe:-.8,cIm:.156,zoomDepth:8,targetX:-.086441,targetY:-.239323},{name:"Electric Lightning",cRe:.285,cIm:.013,zoomDepth:6,targetX:-.106662,targetY:.656613},{name:"Golden Dragon",cRe:-.4,cIm:.6,zoomDepth:9,targetX:-.042175,targetY:-.036744},{name:"Filigree",cRe:-.70176,cIm:-.3842,zoomDepth:10.5,targetX:-.096904,targetY:-.656621},{name:"Fractal Storm",cRe:-.7269,cIm:.1889,zoomDepth:10.5,targetX:-.237086,targetY:.547981},{name:"Seahorse Spiral",cRe:-.74543,cIm:.11301,zoomDepth:7.5,targetX:-.529406,targetY:.072863}],marqueeFont:{color:"#FFF",outline:"#000"}},kt=null,St=null,wt={x:0,y:0},Ci=parseInt(localStorage.getItem("ankifx_julia_preset_index")||"0",10),Qe=le.presets[Ci]||le.presets[0],O={presetIndex:Ci,cRe:Qe.cRe,cIm:Qe.cIm,zoomDepth:Qe.zoomDepth,targetX:Qe.targetX,targetY:Qe.targetY,speed:parseFloat(localStorage.getItem("ankifx_julia_speed"))||.15};function Cr(f,t={}){Pt=f.gl;let e=f.gl,i=f.ctx2d;Le=f.width,Ce=f.height;let n=f.dpr,l=`
        attribute vec2 position;
        void main() { gl_Position = vec4(position, 0.0, 1.0); }
    `,u=`
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
    `;function a(A,S){let T=e.createShader(A);return e.shaderSource(T,S),e.compileShader(T),T}let r=e.createProgram();e.attachShader(r,a(e.VERTEX_SHADER,l)),e.attachShader(r,a(e.FRAGMENT_SHADER,u)),e.linkProgram(r),e.useProgram(r),e.bindBuffer(e.ARRAY_BUFFER,e.createBuffer()),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),e.STATIC_DRAW);let c=e.getAttribLocation(r,"position");e.enableVertexAttribArray(c),e.vertexAttribPointer(c,2,e.FLOAT,!1,0,0);let h=e.getUniformLocation(r,"u_time"),o=e.getUniformLocation(r,"u_speed");et=e.getUniformLocation(r,"u_resolution");let d=e.getUniformLocation(r,"u_c"),b=e.getUniformLocation(r,"u_zoomDepth"),m=e.getUniformLocation(r,"u_target");e.uniform2f(et,Le*n,Ce*n);let s=null,v=null,p=Le<480,x=parseInt(localStorage.getItem("ankifx_julia_preset_index")||"0",10);O.presetIndex=x;let w=le.presets[x]||le.presets[0];O.cRe=t.cRe!==void 0?t.cRe:w.cRe,O.cIm=t.cIm!==void 0?t.cIm:w.cIm,O.zoomDepth=t.zoomDepth!==void 0?t.zoomDepth:w.zoomDepth,O.targetX=t.targetX!==void 0?t.targetX:w.targetX,O.targetY=t.targetY!==void 0?t.targetY:w.targetY;let E={type:"select",id:"julia-preset",label:"PRESET",options:le.presets.map((A,S)=>({value:S,text:(p?"\u{1F4A0} ":"[ Preset: ")+A.name+(p?"":" ]")})),value:O.presetIndex,onChange:A=>{let S=parseInt(A);localStorage.setItem("ankifx_julia_preset_index",S),O.presetIndex=S;let T=le.presets[S];T&&(Object.assign(t,T),O.cRe=T.cRe,O.cIm=T.cIm,O.zoomDepth=T.zoomDepth,O.targetX=T.targetX,O.targetY=T.targetY,t.debug&&(AnkiFX.setControlValue("julia-cRe",T.cRe),AnkiFX.setControlValue("julia-cIm",T.cIm),AnkiFX.setControlValue("julia-zoomDepth",T.zoomDepth),AnkiFX.setControlValue("julia-targetX",T.targetX),AnkiFX.setControlValue("julia-targetY",T.targetY)),le.stop(),f.ctx2d&&f.ctx2d.clearRect(0,0,Le,Ce),AnkiFX.startEffect(t,document.getElementById("ankifx-background"),t.marqueePosition,"julia"))}};if(t.debug?le.controls=[]:le.controls=[E],t.debug){le.controls.push({type:"slider",id:"julia-cRe",label:"C-RE",min:-1.5,max:1,step:.001,value:O.cRe,onChange:P=>{O.cRe=P}},{type:"slider",id:"julia-cIm",label:"C-IM",min:-1,max:1,step:.001,value:O.cIm,onChange:P=>{O.cIm=P}},{type:"slider",id:"julia-zoomDepth",label:"ZOOM",min:2,max:25,step:.1,value:O.zoomDepth,onChange:P=>{O.zoomDepth=P}},{type:"slider",id:"julia-targetX",label:"T-X",min:-2,max:2,step:1e-4,value:O.targetX,onChange:P=>{O.targetX=P}},{type:"slider",id:"julia-targetY",label:"T-Y",min:-2,max:2,step:1e-4,value:O.targetY,onChange:P=>{O.targetY=P}},{type:"slider",id:"julia-speed",label:"SPD",min:.005,max:.3,step:.005,value:O.speed,onChange:P=>{O.speed=P,localStorage.setItem("ankifx_julia_speed",P)}}),le.controls.push(E);let A=document.getElementById("afx-effect-controls-container");A&&(s=document.createElement("div"),s.id="afx-julia-debug-info",s.className="afx-control-row julia-debug-el",s.style.cssText="height: 20px !important; margin-bottom: 2px; pointer-events: none; justify-content: flex-end; opacity: 0.8; font-size: 11px !important; color: #ff00ff; border: none; background: transparent;",s.textContent="HOVER TO SEE TARGET COORDS",A.prepend(s)),v=(P,M,L)=>{let B=L*O.speed/Math.max(O.zoomDepth,1)%2,R=B>1?2-B:B,$=R<.5?4*Math.pow(R,3):1-Math.pow(-2*R+2,3)/2,X=2.2/Math.exp($*O.zoomDepth),k=$*Math.PI*.5,C=(P-Le/2)/Ce,z=(Ce/2-M)/Ce,I=Math.cos(k),q=Math.sin(k),W=(I*C+q*z)*X,ne=(-q*C+I*z)*X;return{tx:O.targetX+W,ty:O.targetY+ne}};let S=P=>{if(P.target.closest("#afx-controls-dock")||P.target.closest(".afx-dialog"))return;let M=performance.now()*.001-g,{tx:L,ty:B}=v(P.clientX,P.clientY,M);O.targetX=L,O.targetY=B,AnkiFX.setControlValue("julia-targetX",L),AnkiFX.setControlValue("julia-targetY",B)};window.addEventListener("mousedown",S),kt=S;let T=P=>{wt.x=P.clientX,wt.y=P.clientY};window.addEventListener("mousemove",T),St=T}let g=performance.now()*.001;function F(){let A=performance.now()*.001-g;if(e.uniform1f(h,A),e.uniform1f(o,O.speed),e.uniform2f(d,O.cRe,O.cIm),e.uniform1f(b,O.zoomDepth),e.uniform2f(m,O.targetX,O.targetY),e.drawArrays(e.TRIANGLE_STRIP,0,4),i.clearRect(0,0,Le,Ce),s&&v){let S=performance.now()*.001-g,{tx:T,ty:P}=v(wt.x,wt.y,S);s.textContent=`TARGET X: ${T.toFixed(6)}, Y: ${P.toFixed(6)}`}yt=requestAnimationFrame(F)}F()}function Tr(){yt&&(cancelAnimationFrame(yt),yt=null),kt&&(window.removeEventListener("mousedown",kt),kt=null),St&&(window.removeEventListener("mousemove",St),St=null),document.querySelectorAll(".julia-debug-el").forEach(f=>f.remove()),Pt=null,et=null}var tt=null,$e=0,Ae=0,D=null,Y=null,Te=[],Et=0,it=null,ee={x:-1e3,y:-1e3,dx:0,dy:0,down:!1},Ai=null,Fi={id:"lavalamp",name:"Lava Lamp",run:Dr,stop:Lr,onResize:Ir,marqueeFont:{color:"#ffccaa",shadowColor:"rgba(255, 100, 0, 0.8)",shadowBlur:10}},ye=6,Ct=class{constructor(t,e,i,n){this.pos={x:t,y:e},this.vel={x:0,y:-(Math.random()*.6+.3)},this.radius=i;let l=e/n;this.temperature=.15+l*.3+Math.random()*.15,this.buoyancy=0,this.noiseOffset=Math.random()*1e3,this.smoothSpeedY=0}update(t,e,i){this.pos.y>i*.8?this.temperature+=.05*t:this.pos.y>i*.6?this.temperature+=.02*t:this.pos.y<i*.2?this.temperature-=.04*t:this.pos.y<i*.4&&(this.temperature-=.015*t),this.temperature=Math.max(0,Math.min(1,this.temperature)),this.buoyancy=this.temperature*4-2,this.vel.y-=this.buoyancy*10*t;let n=Math.sin(this.noiseOffset+Et*2e-4)*.1;this.vel.x+=n*t*.3;let l=1-Math.min(Math.abs(this.buoyancy)/.8,1),u=(e*.5-this.pos.x)*.003*l;this.vel.x+=u*t,this.pos.x<this.radius&&(this.vel.x+=(this.radius-this.pos.x)*2*t),this.pos.x>e-this.radius&&(this.vel.x-=(this.pos.x-(e-this.radius))*2*t);let a=-this.radius*.5;this.pos.y<a&&(this.vel.y+=(a-this.pos.y)*8*t);let r=i+this.radius*.5;this.pos.y>r&&(this.vel.y-=(this.pos.y-r)*8*t);let c=Math.pow(.97,t*60);this.vel.x*=c;let o=Math.abs(this.buoyancy)>.8,d=Math.pow(o?.994:.975,t*60);this.vel.y*=d;let b=Math.max(0,(this.pos.y-i*.82)/(i*.18)),m=Math.max(0,(i*.18-this.pos.y)/(i*.18)),s=Math.pow(.88,t*60*(b+m));if(this.vel.x*=s,ee.down){let v=this.pos.x-ee.x,p=this.pos.y-ee.y,x=Math.sqrt(v*v+p*p);if(x<200){let w=(200-x)/200;this.vel.x+=ee.dx*w*1.5,this.vel.y+=ee.dy*w*8}}this.smoothSpeedY+=(Math.abs(this.vel.y)-this.smoothSpeedY)*(1-Math.pow(.05,t)),this.pos.x+=this.vel.x*t,this.pos.y+=this.vel.y*t}},Ar=`
    attribute vec2 aPosition;
    varying vec2 vUv;
    void main() {
        vUv = aPosition * 0.5 + 0.5;
        // Match canvas 2D coordinates (Y=0 is top)
        vUv.y = 1.0 - vUv.y;
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }
`,Fr=`
    precision highp float;
    varying vec2 vUv;
    
    uniform vec2 uResolution;
    uniform float uTime;
    
    uniform vec4 uBlobs[${ye}]; // x, y, radius, stretch
    uniform float uBlobTemp[${ye}]; // temperature
    
    // Polynomial smooth minimum
    float smin(float a, float b, float k) {
        float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
        return mix(b, a, h) - k * h * (1.0 - h);
    }
    
    float map(vec2 p) {
        float d = 10000.0;
        for (int i = 0; i < ${ye}; i++) {
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
`;function Ti(f,t){let e=D.createShader(f);return D.shaderSource(e,t),D.compileShader(e),D.getShaderParameter(e,D.COMPILE_STATUS)?e:(console.error("Shader compile error:",D.getShaderInfoLog(e)),D.deleteShader(e),null)}function Mr(){let f=Ti(D.VERTEX_SHADER,Ar),t=Ti(D.FRAGMENT_SHADER,Fr);if(Y=D.createProgram(),D.attachShader(Y,f),D.attachShader(Y,t),D.linkProgram(Y),!D.getProgramParameter(Y,D.LINK_STATUS))return console.error("Program link error:",D.getProgramInfoLog(Y)),!1;D.useProgram(Y),it=D.createBuffer(),D.bindBuffer(D.ARRAY_BUFFER,it);let e=new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]);D.bufferData(D.ARRAY_BUFFER,e,D.STATIC_DRAW);let i=D.getAttribLocation(Y,"aPosition");return D.enableVertexAttribArray(i),D.vertexAttribPointer(i,2,D.FLOAT,!1,0,0),Y.uResolution=D.getUniformLocation(Y,"uResolution"),Y.uTime=D.getUniformLocation(Y,"uTime"),Y.uBlobs=D.getUniformLocation(Y,"uBlobs"),Y.uBlobTemp=D.getUniformLocation(Y,"uBlobTemp"),!0}function Dr(f,t){if(D=f.gl,Ai=f.canvasGL,$e=f.width,Ae=f.height,!D){console.error("WebGL context required for Lava Lamp");return}if(!Mr())return;Te=[];let e=0;for(;Te.length<ye&&e<200;){e++;let i=70+Math.random()*60,n=i+Math.random()*($e-i*2),l=i+Math.random()*(Ae-i*2),u=!1;for(let a of Te){let r=a.pos.x-n,c=a.pos.y-l;if(Math.sqrt(r*r+c*c)<a.radius+i+10){u=!0;break}}u||Te.push(new Ct(n,l,i,Ae))}for(;Te.length<ye;){let i=70+Math.random()*60,n=i+Math.random()*($e-i*2),l=i+Math.random()*(Ae-i*2);Te.push(new Ct(n,l,i,Ae))}Et=performance.now(),Rr(),tt=requestAnimationFrame(Mi)}function Ir(f,t,e){$e=f,Ae=t,D&&D.viewport(0,0,f*e,t*e)}function Mi(f){let t=Math.min((f-Et)/1e3,.05);Et=f;let e=new Float32Array(ye*4),i=new Float32Array(ye);for(let n=0;n<ye;n++)Te[n].update(t,$e,Ae);for(let n=0;n<ye;n++){let l=Te[n],u=Math.max(.85,1+Math.min(l.smoothSpeedY*.028,.7)*(.4+l.temperature*.6));e[n*4+0]=l.pos.x,e[n*4+1]=l.pos.y,e[n*4+2]=l.radius,e[n*4+3]=u,i[n]=l.temperature}D.useProgram(Y),D.uniform2f(Y.uResolution,$e,Ae),D.uniform1f(Y.uTime,f*.001),D.uniform4fv(Y.uBlobs,e),D.uniform1fv(Y.uBlobTemp,i),D.drawArrays(D.TRIANGLES,0,6),ee.dx=0,ee.dy=0,tt=requestAnimationFrame(Mi)}function rt(f){let t=Ai.getBoundingClientRect(),e=f.touches?f.touches[0]:f,i=e.clientX-t.left,n=e.clientY-t.top;if(ee.down&&f.type!=="mousedown"&&f.type!=="touchstart"){let l=i-ee.x,u=n-ee.y;Math.abs(l)<150&&Math.abs(u)<150&&(ee.dx=l,ee.dy=u)}ee.x=i,ee.y=n}function Tt(f){ee.dx=0,ee.dy=0,ee.down=!0,rt(f)}function At(){ee.down=!1}function Rr(){window.addEventListener("mousedown",Tt),window.addEventListener("mousemove",rt),window.addEventListener("mouseup",At),window.addEventListener("touchstart",Tt,{passive:!0}),window.addEventListener("touchmove",rt,{passive:!0}),window.addEventListener("touchend",At)}function _r(){window.removeEventListener("mousedown",Tt),window.removeEventListener("mousemove",rt),window.removeEventListener("mouseup",At),window.removeEventListener("touchstart",Tt),window.removeEventListener("touchmove",rt),window.removeEventListener("touchend",At)}function Lr(){tt&&(cancelAnimationFrame(tt),tt=null),_r(),D&&(D.clearColor(0,0,0,0),D.clear(D.COLOR_BUFFER_BIT),Y&&D.deleteProgram(Y),it&&D.deleteBuffer(it),Y=null,it=null)}var Mt=null,at,ze,ot,Rt,_t={id:"mandelbrot",name:"Mandelbrot",run:zr,stop:Or,onResize:(f,t,e)=>{at=f,ze=t,Rt&&ot&&Rt.uniform2f(ot,f*e,t*e)},preferredTrack:{title:"Acoustica Power Bundle 4",trackTitle:"AiR"},marqueeFont:{color:"#FFF",outline:"#000"}},Dt=null,It=null,Ft={x:0,y:0},Q={targetX:-.743643887037151,targetY:.13182590420533,zoomDepth:11,speed:parseFloat(localStorage.getItem("ankifx_mandelbrot_speed"))||.15};function zr(f,t={}){Rt=f.gl;let e=f.gl,i=f.ctx2d;at=f.width,ze=f.height;let n=f.dpr,l=`
        attribute vec2 position;
        void main() { gl_Position = vec4(position, 0.0, 1.0); }
    `,u=`
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
    `;function a(x,w){let E=e.createShader(x);return e.shaderSource(E,w),e.compileShader(E),E}let r=e.createProgram();e.attachShader(r,a(e.VERTEX_SHADER,l)),e.attachShader(r,a(e.FRAGMENT_SHADER,u)),e.linkProgram(r),e.useProgram(r),e.bindBuffer(e.ARRAY_BUFFER,e.createBuffer()),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),e.STATIC_DRAW);let c=e.getAttribLocation(r,"position");e.enableVertexAttribArray(c),e.vertexAttribPointer(c,2,e.FLOAT,!1,0,0);let h=e.getUniformLocation(r,"u_time"),o=e.getUniformLocation(r,"u_speed"),d=e.getUniformLocation(r,"u_zoomDepth"),b=e.getUniformLocation(r,"u_target");ot=e.getUniformLocation(r,"u_resolution"),e.uniform2f(ot,at*n,ze*n);let m=null,s=null;if(t.debug){_t.controls=[{type:"slider",id:"mandelbrot-zoomDepth",label:"ZOOM",min:2,max:25,step:.1,value:Q.zoomDepth,onChange:g=>{Q.zoomDepth=g}},{type:"slider",id:"mandelbrot-targetX",label:"T-X",min:-2.5,max:1,step:1e-4,value:Q.targetX,onChange:g=>{Q.targetX=g}},{type:"slider",id:"mandelbrot-targetY",label:"T-Y",min:-1.5,max:1.5,step:1e-4,value:Q.targetY,onChange:g=>{Q.targetY=g}},{type:"slider",id:"mandelbrot-speed",label:"SPD",min:.005,max:.3,step:.005,value:Q.speed,onChange:g=>{Q.speed=g,localStorage.setItem("ankifx_mandelbrot_speed",g)}}];let x=document.getElementById("afx-effect-controls-container");x&&(m=document.createElement("div"),m.id="afx-mandelbrot-debug-info",m.className="afx-control-row mandelbrot-debug-el",m.style.cssText="height: 20px !important; margin-bottom: 2px; pointer-events: none; justify-content: flex-end; opacity: 0.8; font-size: 11px !important; color: #ff00ff; border: none; background: transparent;",m.textContent="HOVER TO SEE TARGET COORDS",x.prepend(m)),s=(g,F,A)=>{let S=A*Q.speed/Math.max(Q.zoomDepth,1)%2,T=S>1?2-S:S,P=T<.5?4*Math.pow(T,3):1-Math.pow(-2*T+2,3)/2,M=Math.exp(P*Q.zoomDepth),L=(g-at/2)/ze,B=(ze/2-F)/ze;return{tx:Q.targetX+L*(2.5/M),ty:Q.targetY+B*(2.5/M)}};let w=g=>{if(g.target.closest("#afx-controls-dock")||g.target.closest(".afx-dialog"))return;let F=performance.now()*.001-v,{tx:A,ty:S}=s(g.clientX,g.clientY,F);Q.targetX=A,Q.targetY=S,AnkiFX.setControlValue("mandelbrot-targetX",A),AnkiFX.setControlValue("mandelbrot-targetY",S)};window.addEventListener("mousedown",w),Dt=w;let E=g=>{Ft.x=g.clientX,Ft.y=g.clientY};window.addEventListener("mousemove",E),It=E}else _t.controls=[];let v=performance.now()*.001;function p(){let x=performance.now()*.001-v;if(e.uniform1f(h,x),e.uniform1f(o,Q.speed),e.uniform1f(d,Q.zoomDepth),e.uniform2f(b,Q.targetX,Q.targetY),e.drawArrays(e.TRIANGLE_STRIP,0,4),i.clearRect(0,0,at,ze),m&&s){let w=performance.now()*.001-v,{tx:E,ty:g}=s(Ft.x,Ft.y,w);m.textContent=`TARGET X: ${E.toFixed(6)}, Y: ${g.toFixed(6)}`}Mt=requestAnimationFrame(p)}p()}function Or(){Mt&&(cancelAnimationFrame(Mt),Mt=null),Dt&&(window.removeEventListener("mousedown",Dt),Dt=null),It&&(window.removeEventListener("mousemove",It),It=null),document.querySelectorAll(".mandelbrot-debug-el").forEach(f=>f.remove()),Rt=null,ot=null}var nt=null,Ot,Lt,zt=16,Fe=[];function Di(){let f=Math.floor(Ot/zt);Fe=[];for(let t=0;t<f;t++)Fe[t]=Math.random()*-100}var Ii={id:"matrix",name:"Matrix",run:Ur,stop:Br,onResize:(f,t)=>{Ot=f,Lt=t,Di()},preferredTrack:{trackTitle:"nightfall"},marqueeFont:{color:"#0F0",shadowColor:"#0F0",shadowBlur:10}};function Ur(f,t){let e=f.ctx2d;Ot=f.width,Lt=f.height,Di();let i="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*]*";function n(){e.fillStyle="rgba(0, 0, 0, 0.1)",e.fillRect(0,0,Ot,Lt),e.fillStyle="#0F0",e.font=zt+"px monospace";for(let l=0;l<Fe.length;l++)if(Fe[l]>0||Math.random()>.95){let u=i.charAt(Math.floor(Math.random()*i.length)),a=Fe[l]*zt;e.fillText(u,l*zt,a),a>Lt&&Math.random()>.975&&(Fe[l]=0),Fe[l]++}else Fe[l]+=.5;nt=requestAnimationFrame(n)}nt=requestAnimationFrame(n)}function Br(){nt&&(cancelAnimationFrame(nt),nt=null)}var st=null,ni,si,Ri={id:"none",name:"None",run:qr,stop:Nr,onResize:(f,t)=>{ni=f,si=t},marqueeFont:{color:"#ffffff",shadowColor:"rgba(0,0,0,0.8)",shadowBlur:5}};function qr(f,t){let e=f.ctx2d;ni=f.width,si=f.height;function i(){e.clearRect(0,0,ni,si),st=requestAnimationFrame(i)}st=requestAnimationFrame(i)}function Nr(){st&&(cancelAnimationFrame(st),st=null)}var lt=null,te,be,_i={id:"starfield",name:"Starfield",run:jr,stop:$r,onResize:(f,t)=>{te=f,be=t},preferredTrack:{trackTitle:"star wars title"},marqueeFont:{color:"#FFE81F",shadowColor:"#FFE81F",shadowBlur:20,outline:"#000"}};function jr(f,t){let e=f.ctx2d;te=f.width,be=f.height;let i=[],n=8e3,l=new Uint8Array(512),u=new Uint8Array(256).map(()=>Math.random()*256);for(let v=0;v<512;v++)l[v]=u[v&255];let a=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]];function r(v,p,x,w){return v[0]*p+v[1]*x+v[2]*w}function c(v,p,x){let w,E,g,F,A=.3333333333333333,S=1/6,T=(v+p+x)*A,P=Math.floor(v+T),M=Math.floor(p+T),L=Math.floor(x+T),B=(P+M+L)*S,R=v-P+B,$=p-M+B,G=x-L+B,X,k,C,z,I,q;R>=$?$>=G?(X=1,k=0,C=0,z=1,I=1,q=0):R>=G?(X=1,k=0,C=0,z=1,I=0,q=1):(X=0,k=0,C=1,z=1,I=0,q=1):$<G?(X=0,k=0,C=1,z=0,I=1,q=1):R<G?(X=0,k=1,C=0,z=0,I=1,q=1):(X=0,k=1,C=0,z=1,I=1,q=0);let W=R-X+S,ne=$-k+S,y=G-C+S,_=R-z+2*S,j=$-I+2*S,U=G-q+2*S,N=R-1+3*S,xe=$-1+3*S,ke=G-1+3*S,De=P&255,Se=M&255,Ie=L&255,Pe=.6-R*R-$*$-G*G;Pe<0?w=0:(Pe*=Pe,w=Pe*Pe*r(a[l[De+l[Se+l[Ie]]]%12],R,$,G));let Re=.6-W*W-ne*ne-y*y;Re<0?E=0:(Re*=Re,E=Re*Re*r(a[l[De+X+l[Se+k+l[Ie+C]]]%12],W,ne,y));let _e=.6-_*_-j*j-U*U;_e<0?g=0:(_e*=_e,g=_e*_e*r(a[l[De+z+l[Se+I+l[Ie+q]]]%12],_,j,U));let we=.6-N*N-xe*xe-ke*ke;return we<0?F=0:(we*=we,F=we*we*r(a[l[De+1+l[Se+1+l[Ie+1]]]%12],N,xe,ke)),32*(w+E+g+F)}function h(v,p,x,w=3){let E=0,g=.5;for(let F=0;F<w;F++)E+=c(v,p,x)*g,v*=2,p*=2,x*=2,g*=.5;return E}class o{constructor(){this.active=!1,this.nextSpawn=Date.now()+2e3}reset(){let p=Math.random()*Math.PI*2,x=.2+Math.random()*.4;this.x=Math.cos(p)*te*x,this.y=Math.sin(p)*be*x,this.z=te,this.sizeBase=80+Math.random()*120,this.speed=.8,this.active=!0,this.type=1+Math.floor(Math.random()*2);let w=[{name:"ice",baseH:190+Math.random()*40,sat:60,l:70},{name:"inferno",baseH:Math.random()*40,sat:80,l:60},{name:"toxic",baseH:80+Math.random()*40,sat:70,l:60},{name:"ethereal",baseH:260+Math.random()*40,sat:60,l:75},{name:"classic",baseH:30+Math.random()*20,sat:50,l:80}],E=w[Math.floor(Math.random()*w.length)];this.generateGasGiantTexture(E),this.type===2&&(this.rings=Array.from({length:4},(g,F)=>({r1:1.6+F*.2,opacity:.2+Math.random()*.4})))}hslToRgb(p,x,w){p/=360,x/=100,w/=100;let E,g,F;if(x===0)E=g=F=w;else{let A=w<.5?w*(1+x):w+x-w*x,S=2*w-A,T=P=>(P<0&&(P+=1),P>1&&(P-=1),P<1/6?S+(A-S)*6*P:P<1/2?A:P<2/3?S+(A-S)*(2/3-P)*6:S);E=T(p+1/3),g=T(p),F=T(p-1/3)}return{r:E*255,g:g*255,b:F*255}}generateGasGiantTexture(p){let x=document.createElement("canvas");x.width=x.height=256;let w=x.getContext("2d"),E=w.createImageData(256,256),g=p.baseH,F=this.hslToRgb(g,p.sat,p.l),A=this.hslToRgb((g+20)%360,p.sat+10,p.l-10),S=this.hslToRgb((g-40+360)%360,p.sat+20,p.l-15),T=this.hslToRgb((g+60)%360,p.sat-20,p.l+10),P=(L,B,R)=>({r:L.r+(B.r-L.r)*R,g:L.g+(B.g-L.g)*R,b:L.b+(B.b-L.b)*R}),M=Math.random()*1e3;for(let L=0;L<256;L++)for(let B=0;B<256;B++){let R=L/256*10,$=B/256*10,G=Math.abs(h(0,R*.4,M,3)),X=R+h($*.5,R*.5,M)*G*4,k=$+h(R*.5,$*.5,M+50)*G*2,C=(h(0,X*.8,M+100,4)+1)/2,z=(h(k*.1,X*1.5,M+200,2)+1)/2,I=P(A,F,C);C>.7&&(I=P(I,T,(C-.7)*2)),z>.6&&(I=P(I,S,(z-.6)*1.5));let q=1+h(k,X,M+300,2)*.2,W=(L*256+B)*4;E.data[W]=Math.min(255,I.r*q),E.data[W+1]=Math.min(255,I.g*q),E.data[W+2]=Math.min(255,I.b*q),E.data[W+3]=255}w.putImageData(E,0,0),this.textureCanvas=x}update(){if(!this.active){Date.now()>this.nextSpawn&&this.reset();return}this.z-=this.speed,this.z<=0&&(this.active=!1,this.nextSpawn=Date.now())}draw(p){if(!this.active)return;let x=te/2/this.z,w=this.x*x+te/2,E=this.y*x+be/2,g=(1-this.z/te)*this.sizeBase;if(w<-g*3||w>te+g*3||E<-g*3||E>be+g*3)return;p.save(),p.translate(w,E),this.type===2&&(this.drawRings(p,g,!0),p.globalAlpha=1);let F=p.createRadialGradient(0,0,g*.9,0,0,g*1.5);F.addColorStop(0,"rgba(255, 255, 255, 0.15)"),F.addColorStop(1,"rgba(0,0,0,0)"),p.fillStyle=F,p.beginPath(),p.arc(0,0,g*1.5,0,Math.PI*2),p.fill(),p.save(),p.beginPath(),p.arc(0,0,g,0,Math.PI*2),p.clip(),p.globalAlpha=1,p.drawImage(this.textureCanvas,-g,-g,g*2,g*2);let A=p.createRadialGradient(-g*.5,-g*.5,g*.1,0,0,g);A.addColorStop(0,"rgba(255, 255, 255, 0.25)"),A.addColorStop(.5,"rgba(0, 0, 0, 0)"),A.addColorStop(1,"rgba(0, 0, 0, 0.4)"),p.fillStyle=A,p.fillRect(-g,-g,g*2,g*2),p.restore();let S=p.createRadialGradient(0,0,g*.7,0,0,g);S.addColorStop(1,"rgba(255,255,255,0.4)"),S.addColorStop(.8,"rgba(255,255,255,0)"),p.fillStyle=S,p.beginPath(),p.arc(0,0,g,0,Math.PI*2),p.fill(),this.type===2&&(this.drawRings(p,g,!1),p.globalAlpha=1),p.restore()}drawRings(p,x,w){p.save();let E=Math.PI/8;for(let g of this.rings)p.globalAlpha=g.opacity,p.strokeStyle="#E6E6FA",p.lineWidth=x*.15,p.beginPath(),p.ellipse(0,0,g.r1*x,g.r1*.3*x,E,0,Math.PI*2),p.stroke();p.restore()}}let d=new o,b=["#FFFFFF","#FFE4B5","#E0FFFF","#FFF0F5","#F0F8FF"];for(let v=0;v<n;v++)i.push({x:(Math.random()-.5)*te*4,y:(Math.random()-.5)*be*4,z:Math.random()*te,color:b[Math.floor(Math.random()*b.length)],sizeBase:2+Math.random()*2.5});let m=0;function s(){e.fillStyle="rgba(5, 5, 12, 1)",e.fillRect(0,0,te,be);let v=te/2,p=be/2;m+=.01,d.update(),d.draw(e);for(let x=0;x<n;x++){let w=i[x],E=w.z;if(w.z-=4,w.z<=0){w.x=(Math.random()-.5)*te*4,w.y=(Math.random()-.5)*be*4,w.z=te;continue}let g=te/2/w.z,F=w.x*g+v,A=w.y*g+p;if(F>=0&&F<=te&&A>=0&&A<=be){let S=1-w.z/te,T=S*w.sizeBase;if(S<.3){e.globalAlpha=S*2,e.fillStyle=w.color,e.fillRect(F,A,Math.max(1,T),Math.max(1,T));continue}e.globalAlpha=S,e.fillStyle=w.color,e.strokeStyle=w.color;let P=te/2/E,M=w.x*P+v,L=w.y*P+p;e.lineWidth=T,e.beginPath(),e.moveTo(M,L),e.lineTo(F,A),e.stroke(),e.beginPath(),e.arc(F,A,T/2,0,Math.PI*2),e.fill(),S>.8&&(e.globalAlpha=(S-.8)*3,e.beginPath(),e.arc(F,A,T*2.5,0,Math.PI*2),e.fill())}}e.globalAlpha=1,lt=requestAnimationFrame(s)}lt=requestAnimationFrame(s)}function $r(){lt&&(cancelAnimationFrame(lt),lt=null)}var ut=null,Oe,ft,Ut=0,Bt=0,pe=null;function zi(){if(Oe===void 0||ft===void 0)return;let f=Math.max(100,Bt),t=Math.max(14,Math.floor(Oe/25)),e=Math.floor(Oe/t),i=Math.floor(f/t);pe=new ui(e,i,t)}var Oi={id:"tetris",name:"Tetris",run:Hr,stop:Xr,onResize:(f,t)=>{Oe=f,ft=t;let e=getComputedStyle(document.documentElement);Ut=parseInt(e.getPropertyValue("--io-header"))||0,Bt=t-Ut,zi()},preferredTrack:{title:"WinTask 3",trackTitle:"Whoopees Tetris"},marqueeFont:{color:"#f0f0f0",shadowColor:"#a000f0",shadowBlur:12,outline:"#000"}},Ui={I:{shapes:[[[1,1,1,1]],[[1],[1],[1],[1]]],color:"#00f0f0"},O:{shapes:[[[1,1],[1,1]]],color:"#f0f000"},T:{shapes:[[[0,1,0],[1,1,1]],[[1,0],[1,1],[1,0]],[[1,1,1],[0,1,0]],[[0,1],[1,1],[0,1]]],color:"#a000f0"},S:{shapes:[[[0,1,1],[1,1,0]],[[1,0],[1,1],[0,1]]],color:"#00f000"},Z:{shapes:[[[1,1,0],[0,1,1]],[[0,1],[1,1],[1,0]]],color:"#f00000"},J:{shapes:[[[1,0,0],[1,1,1]],[[1,1],[1,0],[1,0]],[[1,1,1],[0,0,1]],[[0,1],[0,1],[1,1]]],color:"#0000f0"},L:{shapes:[[[0,0,1],[1,1,1]],[[1,0],[1,0],[1,1]],[[1,1,1],[1,0,0]],[[1,1],[0,1],[0,1]]],color:"#f0a000"}},Li=Object.keys(Ui),li=class{constructor(t,e,i){this.x=t,this.y=e,this.color=i,this.vx=(Math.random()-.5)*12,this.vy=(Math.random()-.7)*14,this.gravity=.45,this.life=1,this.decay=.012+Math.random()*.018,this.size=1+Math.random()*2.5}update(){this.vx*=.985,this.vy+=this.gravity,this.x+=this.vx,this.y+=this.vy,this.life-=this.decay}draw(t){t.globalAlpha=Math.max(0,this.life),t.fillStyle=this.color,t.fillRect(this.x,this.y,this.size,this.size)}},ui=class{constructor(t,e,i){this.cols=t,this.rows=e,this.cellSize=i,this.board=Array.from({length:e},()=>Array(t).fill(null)),this.particles=[],this.exploding=!1,this.explodeTimer=0,this.EXPLODE_DURATION=120,this.level=1,this.linesTotal=0,this.dropCounter=0,this.moveCounter=0,this._spawnPiece()}_randomPiece(){let t=Li[Math.floor(Math.random()*Li.length)],e=Ui[t],i=Math.floor(Math.random()*e.shapes.length);return{shape:e.shapes[i],color:e.color,key:t,rotIdx:i,def:e}}_spawnPiece(){let t=this._randomPiece();this.current={...t,x:Math.floor((this.cols-t.shape[0].length)/2),y:0},this._selectTarget()}_fits(t,e,i){for(let n=0;n<t.length;n++)for(let l=0;l<t[n].length;l++){if(!t[n][l])continue;let u=e+l,a=i+n;if(u<0||u>=this.cols||a>=this.rows||a>=0&&this.board[a][u]!==null)return!1}return!0}_lock(){let{shape:t,x:e,y:i,color:n}=this.current;for(let l=0;l<t.length;l++)for(let u=0;u<t[l].length;u++){if(!t[l][u])continue;let a=i+l,r=e+u;a>=0&&a<this.rows&&r>=0&&r<this.cols&&(this.board[a][r]=n)}this._clearRows()}_clearRows(){let t=0;for(let e=this.rows-1;e>=0;e--)this.board[e].every(i=>i!==null)&&(this.board.splice(e,1),this.board.unshift(Array(this.cols).fill(null)),t++,e++);return t>0&&(this.linesTotal+=t,this.level=Math.floor(this.linesTotal/10)+1),t}_choosePlacement(){let{def:t}=this.current,e=-1/0,i=this.current.x,n=this.current.rotIdx;for(let l=0;l<t.shapes.length;l++){let u=t.shapes[l],a=u[0].length;for(let r=0;r<=this.cols-a;r++){let c=0;for(;this._fits(u,r,c+1);)c++;if(!this._fits(u,r,c))continue;let h=this._getHeuristicScore(u,r,c);h>e&&(e=h,i=r,n=l)}}return{x:i,rotIdx:n}}_getHeuristicScore(t,e,i){let n=this.board.map(h=>[...h]);for(let h=0;h<t.length;h++)for(let o=0;o<t[h].length;o++){if(!t[h][o])continue;let d=i+h,b=e+o;d>=0&&d<this.rows&&(n[d][b]="X")}let l=0;for(let h=0;h<this.rows;h++)n[h].every(o=>o!==null)&&l++;let u=Array(this.cols).fill(0),a=0;for(let h=0;h<this.cols;h++)for(let o=0;o<this.rows;o++)if(n[o][h]!==null){u[h]=this.rows-o,a+=u[h];break}let r=0;for(let h=0;h<this.cols;h++){let o=!1;for(let d=0;d<this.rows;d++)n[d][h]!==null?o=!0:o&&r++}let c=0;for(let h=0;h<this.cols-1;h++)c+=Math.abs(u[h]-u[h+1]);return a*-.51+l*.76+r*-.35+c*-.18+Math.random()*.1}_isBoardFull(){for(let t=0;t<3;t++)if(this.board[t].some(e=>e!==null))return!0;return!1}_explodeBoard(t,e){for(let i=0;i<this.rows;i++)for(let n=0;n<this.cols;n++)if(this.board[i][n]){let l=t+n*this.cellSize+this.cellSize/2,u=e+i*this.cellSize+this.cellSize/2,a=4+Math.floor(Math.random()*4);for(let r=0;r<a;r++)this.particles.push(new li(l,u,this.board[i][n]))}}_reset(){this.board=Array.from({length:this.rows},()=>Array(this.cols).fill(null)),this.exploding=!1,this.explodeTimer=0,this.particles=[],this._spawnPiece()}_selectTarget(){let{x:t,rotIdx:e}=this._choosePlacement(),i=this.current.def;this.current.rotIdx=e,this.current.shape=i.shapes[e],this.current.targetX=t,this.current.y=0,this.current.x=Math.floor((this.cols-this.current.shape[0].length)/2)}step(t,e){if(this.exploding){this.explodeTimer++,this.particles=this.particles.filter(l=>l.life>0),this.particles.forEach(l=>l.update()),this.explodeTimer>=this.EXPLODE_DURATION&&this._reset();return}this.moveCounter++,this.moveCounter>=2&&(this.moveCounter=0,this.current.x<this.current.targetX?this._fits(this.current.shape,this.current.x+1,this.current.y)&&this.current.x++:this.current.x>this.current.targetX&&this._fits(this.current.shape,this.current.x-1,this.current.y)&&this.current.x--);let i=this.current.x===this.current.targetX,n=Math.max(4,40-(this.level-1)*3);i&&(n=1),this.dropCounter++,this.dropCounter>=n&&(this.dropCounter=0,this._fits(this.current.shape,this.current.x,this.current.y+1)?this.current.y++:(this._lock(),this._isBoardFull()?(this._explodeBoard(t,e),this.exploding=!0,this.explodeTimer=0):this._spawnPiece()))}draw(t,e,i){let n=this.cellSize,l={};for(let u=0;u<this.rows;u++)for(let a=0;a<this.cols;a++){let r=this.board[u][a];r&&(l[r]||(l[r]=[]),l[r].push({px:e+a*n,py:i+u*n,alpha:this.exploding?Math.max(0,1-this.explodeTimer/40):1}))}if(!this.exploding&&this.current){let{shape:u,x:a,y:r,color:c}=this.current;if(c){l[c]||(l[c]=[]);for(let h=0;h<u.length;h++)for(let o=0;o<u[h].length;o++)u[h][o]&&l[c].push({px:e+(a+o)*n,py:i+(r+h)*n,alpha:1})}}for(let u in l){let a=l[u];t.fillStyle=u,a.forEach(r=>{t.globalAlpha=r.alpha,t.fillRect(r.px+1,r.py+1,n-2,n-2)})}t.globalAlpha=1,t.strokeStyle="rgba(255, 255, 255, 0.35)",t.lineWidth=1.5,t.beginPath();for(let u in l)l[u].forEach(a=>{t.globalAlpha=a.alpha;let r=a.px,c=a.py;t.moveTo(r+1,c+n-2),t.lineTo(r+1,c+1),t.lineTo(r+n-2,c+1)});t.stroke(),t.strokeStyle="rgba(0, 0, 0, 0.45)",t.beginPath();for(let u in l)l[u].forEach(a=>{t.globalAlpha=a.alpha;let r=a.px,c=a.py;t.moveTo(r+1,c+n-1),t.lineTo(r+n-1,c+n-1),t.lineTo(r+n-1,c+1)});t.stroke(),t.globalAlpha=1,t.save(),this.particles.forEach(u=>u.draw(t)),t.restore(),t.globalAlpha=1}};function Hr(f,t){let e=f.ctx2d;Oe=f.width,ft=f.height,Ut=f.topInset||0,Bt=f.visibleHeight||ft,zi();function i(){if(e.fillStyle="rgba(8, 6, 18, 0.92)",e.fillRect(0,0,Oe,ft),e.strokeStyle="rgba(255,255,255,0.04)",e.lineWidth=.5,pe){let n=pe.cellSize,l=Math.floor((Oe-pe.cols*n)/2),u=Ut+(Bt-pe.rows*n);e.beginPath();for(let a=0;a<=pe.cols;a++)e.moveTo(l+a*n,u),e.lineTo(l+a*n,u+pe.rows*n);for(let a=0;a<=pe.rows;a++)e.moveTo(l,u+a*n),e.lineTo(l+pe.cols*n,u+a*n);e.stroke(),pe.step(l,u),pe.draw(e,l,u)}ut=requestAnimationFrame(i)}ut=requestAnimationFrame(i)}function Xr(){ut&&(cancelAnimationFrame(ut),ut=null)}var ie={aurora:yi,debug:ki,ecg:de,fire:Si,geometry:Pi,gradient:xt,julia:le,lavalamp:Fi,mandelbrot:_t,matrix:Ii,none:Ri,starfield:_i,tetris:Oi};var qt=class{constructor(t="",e="bottom",i={}){this.text=t,this.position=e,this.applyStyles(i),this.time=0,this.textX=0,this.initialized=!1,this.baseCharWidth=15,this.baseFontSize=24,this.baseVelocity=2.8,this.baseBounce=12,this.fontFamily='"Courier New", monospace',this.fontWeight="bold",this.enabled=!0}applyStyles(t={}){this.color=t.color||"#FFF",this.outline=t.outline||null,this.shadowColor=t.shadowColor||null,this.shadowBlur=t.shadowBlur||0,this.colorFn=t.colorFn||null}updateStyles(t={}){this.applyStyles(t)}setText(t){this.text=t}setPosition(t){this.position=t}render(t,e,i){if(!this.enabled)return;this.initialized||(this.textX=e,this.initialized=!0);let n=e<480?.65:e<768?.8:1,l=Math.max(12,Math.floor(this.baseFontSize*n)),u=this.baseBounce*n,a=this.baseCharWidth*n,r=this.baseVelocity*n;if(this.time+=.012,!this.text)return;let c=this.text.length*a;this.textX-=r,this.textX<-(c+e*1.1)&&(this.textX=e),t.font=`${this.fontWeight} ${l}px ${this.fontFamily}`,t.lineJoin="round",this.outline&&(t.lineWidth=4,t.strokeStyle=this.outline);let h=50*n,o=32*n,d=this.position==="bottom"?i-o:h;for(let b=0;b<this.text.length;b++){let m=this.text[b],s=this.textX+b*a;if(s>-40&&s<e+40){let v=d+Math.sin(this.time*4+b*.1)*u;t.fillStyle=this.colorFn?this.colorFn(this.time,b):this.color,this.shadowColor?(t.shadowColor=this.shadowColor==="inherit"?t.fillStyle:this.shadowColor,t.shadowBlur=this.shadowBlur):t.shadowBlur=0,this.outline&&t.strokeText(m,s,v),t.fillText(m,s,v),this.shadowColor&&(t.shadowBlur=0)}}}};window.neoart=Object.create(null);function fi(f,t){var e=Object.create(null,{endian:{value:1,writable:!0},length:{value:0,writable:!0},index:{value:0,writable:!0},buffer:{value:null,writable:!0},view:{value:null,writable:!0},bytesAvailable:{get:function(){return this.length-this.index}},position:{get:function(){return this.index},set:function(i){i<0?i=0:i>this.length&&(i=this.length),this.index=i}},clear:{value:function(){this.buffer=new ArrayBuffer,this.view=null,this.index=this.length=0}},readAt:{value:function(i){return this.view.getUint8(i)}},readByte:{value:function(){return this.view.getInt8(this.index++)}},readShort:{value:function(){var i=this.view.getInt16(this.index,this.endian);return this.index+=2,i}},readInt:{value:function(){var i=this.view.getInt32(this.index,this.endian);return this.index+=4,i}},readUbyte:{value:function(){return this.view.getUint8(this.index++)}},readUshort:{value:function(){var i=this.view.getUint16(this.index,this.endian);return this.index+=2,i}},readUint:{value:function(){var i=this.view.getUint32(this.index,this.endian);return this.index+=4,i}},readBytes:{value:function(i,n,l){var u=i.view,a=this.index,r=this.view;for((l+=a)>this.length&&(l=this.length);a<l;++a)u.setUint8(n++,r.getUint8(a));this.index=a}},readString:{value:function(i){var n=this.index,l=this.view,u="";for((i+=n)>this.length&&(i=this.length);n<i;++n)u+=String.fromCharCode(l.getUint8(n));return this.index=i,u}},writeAt:{value:function(i,n){this.view.setUint8(i,n)}},writeByte:{value:function(i){this.view.setInt8(this.index++,i)}},writeShort:{value:function(i){this.view.setInt16(this.index,i),this.index+=2}},writeInt:{value:function(i){this.view.setInt32(this.index,i),this.index+=4}}});return e.buffer=f,e.view=new DataView(f),e.length=f.byteLength,Object.seal(e)}function Bi(){return Object.create(null,{l:{value:0,writable:!0},r:{value:0,writable:!0},next:{value:null,writable:!0}})}function Nt(){return Object.create(null,{player:{value:null,writable:!0},channels:{value:[],writable:!0},buffer:{value:[],writable:!0},samplesTick:{value:0,writable:!0},samplesLeft:{value:0,writable:!0},remains:{value:0,writable:!0},completed:{value:0,writable:!0},bufferSize:{get:function(){return this.buffer.length},set:function(f){var t,e=this.buffer.length||0;if(!(f===e||f<512)&&(this.buffer.length=f,f>e))for(this.buffer[e]=Bi(),t=++e;t<f;++t)this.buffer[t]=this.buffer[t-1].next=Bi()}},complete:{get:function(){return this.completed},set:function(f){this.completed=f^this.player.loopSong}},reset:{value:function(){var f=this.channels[0],t=this.buffer[0];for(this.samplesLeft=0,this.remains=0,this.completed=0;f;)f.initialize(),f=f.next;for(;t;)t.l=t.r=0,t=t.next}},restore:{configurable:!0,value:function(){}}})}function Vr(){var f=null;return typeof AudioContext<"u"?f=new AudioContext:alert("Web Audio API does not appear to be supported. Use Chrome, Safari or Firefox"),f}function jt(){var f=Object.create(null,{context:{value:null,writable:!0},node:{value:null,writable:!0},analyser:{value:null,writable:!0},analyse:{value:0,writable:!0},endian:{value:0,writable:!0},sampleRate:{value:0,writable:!0},playSong:{value:0,writable:!0},lastSong:{value:0,writable:!0},version:{value:0,writable:!0},title:{value:"",writable:!0},channels:{value:0,writable:!0},loopSong:{value:0,writable:!0},speed:{value:0,writable:!0},tempo:{value:0,writable:!0},mixer:{value:null,writable:!0},tick:{value:0,writable:!0},paused:{value:0,writable:!0},callback:{value:null,writable:!0},quality:{configurable:!0,set:function(t){this.callback=t?this.mixer.accurate.bind(this.mixer):this.mixer.fast.bind(this.mixer)}},toggle:{value:function(t){this.mixer.channels[t].mute^=1}},setup:{configurable:!0,value:function(){}},load:{value:function(t){return this.version=0,this.playSong=0,this.lastSong=0,this.mixer.restore(),t.view||(t=fi(t)),t.position=0,t.readUint()===67324752&&window.neoart.Unzip,t.endian=this.endian,t.position=0,this.loader(t),this.version&&this.setup(),this.version}},play:{value:function(){var t,e;this.version&&(this.paused?this.paused=0:(this.initialize(),typeof this.context.createJavaScriptNode=="function"?this.node=this.context.createJavaScriptNode(this.mixer.bufferSize):this.node=this.context.createScriptProcessor(this.mixer.bufferSize),this.analyser=this.context.createAnalyser(),this.node.connect(this.analyser),this.node.onaudioprocess=this.callback),this.analyse&&window.neoart.Flectrum?(e=window.neoart.analyserNode=this.context.createAnalyser(),this.node.connect(e),e.connect(this.context.destination)):this.node.connect(this.context.destination),t=document.createEvent("Event"),t.initEvent("flodPlay",!0,!1),document.dispatchEvent(t))}},pause:{value:function(){if(this.node){this.node.disconnect(),this.paused=1;var t=document.createEvent("Event");t.initEvent("flodPause",!0,!1),document.dispatchEvent(t)}}},stop:{value:function(){if(this.node){this.node.disconnect(),this.node.onaudioprocess=this.node=null,this.paused=0,this.restore&&this.restore();var t=document.createEvent("Event");t.initEvent("flodStop",!0,!1),document.dispatchEvent(t)}}},reset:{value:function(){this.tick=0,this.mixer.initialize(),this.mixer.samplesTick=this.sampleRate*2.5/this.tempo>>0}}});return window.neoart.audioContext||(window.neoart.audioContext=Vr()),f.context=window.neoart.audioContext,f.sampleRate=f.context.sampleRate,f}function $t(f){var t=Object.create(null,{next:{value:null,writable:!0},mute:{value:0,writable:!0},panning:{value:0,writable:!0},delay:{value:0,writable:!0},pointer:{value:0,writable:!0},length:{value:0,writable:!0},audena:{value:0,writable:!0},audcnt:{value:0,writable:!0},audloc:{value:0,writable:!0},audper:{value:0,writable:!0},audvol:{value:0,writable:!0},timer:{value:0,writable:!0},level:{value:0,writable:!0},ldata:{value:0,writable:!0},rdata:{value:0,writable:!0},enabled:{get:function(){return this.audena},set:function(e){e!==this.audena&&(this.audena=e,this.audloc=this.pointer,this.audcnt=this.pointer+this.length,this.timer=1,e&&(this.delay+=2))}},period:{set:function(e){e<0?e=0:e>65535&&(e=65535),this.audper=e}},volume:{set:function(e){e<0?e=0:e>64&&(e=64),this.audvol=e}},resetData:{value:function(){this.ldata=0,this.rdata=0}},initialize:{value:function(){this.audena=0,this.audcnt=0,this.audloc=0,this.audper=50,this.audvol=0,this.timer=0,this.ldata=0,this.rdata=0,this.delay=0,this.pointer=0,this.length=0}}});return t.panning=t.level=(++f&2)===0?-1:1,Object.seal(t)}function Gr(){return Object.create(null,{active:{value:0,writable:!0},forced:{value:-1,writable:!0},l0:{value:0,writable:!0},l1:{value:0,writable:!0},l2:{value:0,writable:!0},l3:{value:0,writable:!0},l4:{value:0,writable:!0},r0:{value:0,writable:!0},r1:{value:0,writable:!0},r2:{value:0,writable:!0},r3:{value:0,writable:!0},r4:{value:0,writable:!0},initialize:{value:function(){this.l0=this.l1=this.l2=this.l3=this.l4=0,this.r0=this.r1=this.r2=this.r3=this.r4=0}},process:{value:function(f,t){var e=.52133458435322,i=.4860348337215757,n=.9314955486749749,l=1-i;f===0&&(this.l0=i*t.l+l*this.l0,this.r0=i*t.r+l*this.r0,l=1-n,t.l=this.l1=n*this.l0+l*this.l1,t.r=this.r1=n*this.r0+l*this.r1),(this.active|this.forced)>0&&(l=1-e,this.l2=e*t.l+l*this.l2,this.r2=e*t.r+l*this.r2,this.l3=e*this.l2+l*this.l3,this.r3=e*this.r2+l*this.r3,t.l=this.l4=e*this.l3+l*this.l4,t.r=this.r4=e*this.r3+l*this.r4),t.l>1?t.l=1:t.l<-1&&(t.l=-1),t.r>1?t.r=1:t.r<-1&&(t.r=-1)}}})}function Ht(){return Object.create(null,{note:{value:0,writable:!0},sample:{value:0,writable:!0},effect:{value:0,writable:!0},param:{value:0,writable:!0}})}function ht(){return Object.create(null,{name:{value:"",writable:!0},length:{value:0,writable:!0},loop:{value:0,writable:!0},repeat:{value:0,writable:!0},volume:{value:0,writable:!0},pointer:{value:0,writable:!0},loopPtr:{value:0,writable:!0}})}function hi(){var f=Nt();return Object.defineProperties(f,{filter:{value:null,writable:!0},model:{value:1,writable:!0},memory:{value:[],writable:!0},loopPtr:{value:0,writable:!0},loopLen:{value:4,writable:!0},clock:{value:0,writable:!0},master:{value:0,writable:!0},ready:{value:0,writable:!0},volume:{set:function(t){t>0?(t>64&&(t=64),this.master=t/64*.00390625):this.master=0}},initialize:{value:function(){var t=this.memory.length,e=t+this.loopLen;if(this.reset(),this.filter.initialize(),!this.ready)for(this.ready=1,this.loopPtr=t;t<e;++t)this.memory[t]=0}},restore:{value:function(){this.ready=0,this.memory.length=0}},store:{value:function(t,e,i){var n,l,u=t.position,a=this.memory.length,r;for(i&&(t.position=i),r=t.position+e,r>=t.length&&(n=r-t.length,e=t.length-t.position),l=a,e+=a;l<e;++l)this.memory[l]=t.readByte();for(e+=n;l<e;++l)this.memory[l]=0;return i&&(t.position=u),a}},fast:{value:function(t){var e,i,n,l=this.memory,u,a=0,r,c=0,h,o,d,b=this.bufferSize,m,s,v;if(this.completed){if(!this.remains){this.player.stop();return}b=this.remains}for(;a<b;){for(this.samplesLeft||(this.player.process(),this.samplesLeft=this.samplesTick,this.completed&&(b=a+this.samplesTick,b>this.bufferSize&&(this.remains=b-this.bufferSize,b=this.bufferSize))),s=this.samplesLeft,a+s>=b&&(s=b-a),r=c+s,e=this.channels[0];e;){if(d=this.buffer[c],e.audena&&e.audper>60)for(m=e.audper/this.clock,v=e.audvol*this.master,u=v*(1-e.level),o=v*(1+e.level),i=c;i<r;++i)e.delay?e.delay--:--e.timer<1&&(e.mute||(v=l[e.audloc]*.0078125,e.ldata=v*u,e.rdata=v*o),e.audloc++,e.timer+=m,e.audloc>=e.audcnt&&(e.audloc=e.pointer,e.audcnt=e.pointer+e.length)),d.l+=e.ldata,d.r+=e.rdata,d=d.next;else for(i=c;i<r;++i)d.l+=e.ldata,d.r+=e.rdata,d=d.next;e=e.next}c=r,a+=s,this.samplesLeft-=s}for(v=this.model,l=this.filter,d=this.buffer[0],n=t.outputBuffer.getChannelData(0),h=t.outputBuffer.getChannelData(1),i=0;i<b;++i)l.process(v,d),n[i]=d.l,h[i]=d.r,d.l=d.r=0,d=d.next}}}),f.channels[0]=$t(0),f.channels[0].next=f.channels[1]=$t(1),f.channels[1].next=f.channels[2]=$t(2),f.channels[2].next=f.channels[3]=$t(3),f.bufferSize=8192,f.filter=Gr(),f.master=.00390625,Object.seal(f)}function Xt(f){var t=jt();return Object.defineProperties(t,{quality:{set:function(e){this.callback=this.mixer.fast.bind(this.mixer)}},stereo:{set:function(e){var i=this.mixer.channels[0];for(e<0?e=0:e>1&&(e=1);i;)i.level=e*i.panning,i=i.next}},volume:{set:function(e){e<0?e=0:e>1&&(e=1),this.mixer.master=e*.00390625}},frequency:{value:function(e){e?(this.mixer.clock=3579545/this.sampleRate,this.mixer.samplesTick=735):(this.mixer.clock=3546895/this.sampleRate,this.mixer.samplesTick=882)}}}),t.mixer=f||hi(),t.mixer.player=t,t.frequency(0),t.channels=4,t.endian=0,t.quality=0,t.speed=6,t.tempo=125,t}function qi(){return Object.create(null,{next:{value:null,writable:!0},mute:{value:0,writable:!0},enabled:{value:0,writable:!0},sample:{value:null,writable:!0},length:{value:0,writable:!0},index:{value:0,writable:!0},pointer:{value:0,writable:!0},delta:{value:0,writable:!0},fraction:{value:0,writable:!0},speed:{value:0,writable:!0},dir:{value:0,writable:!0},oldSample:{value:null,writable:!0},oldLength:{value:0,writable:!0},oldPointer:{value:0,writable:!0},oldFraction:{value:0,writable:!0},oldSpeed:{value:0,writable:!0},oldDir:{value:0,writable:!0},volume:{value:0,writable:!0},lvol:{value:0,writable:!0},rvol:{value:0,writable:!0},panning:{value:128,writable:!0},lpan:{value:.5,writable:!0},rpan:{value:.5,writable:!0},ldata:{value:0,writable:!0},rdata:{value:0,writable:!0},mixCounter:{value:0,writable:!0},lmixRampU:{value:0,writable:!0},lmixDeltaU:{value:0,writable:!0},rmixRampU:{value:0,writable:!0},rmixDeltaU:{value:0,writable:!0},lmixRampD:{value:0,writable:!0},lmixDeltaD:{value:0,writable:!0},rmixRampD:{value:0,writable:!0},rmixDeltaD:{value:0,writable:!0},volCounter:{value:0,writable:!0},lvolDelta:{value:0,writable:!0},rvolDelta:{value:0,writable:!0},panCounter:{value:0,writable:!0},lpanDelta:{value:0,writable:!0},rpanDelta:{value:0,writable:!0},initialize:{value:function(){this.enabled=0,this.sample=null,this.length=0,this.index=0,this.pointer=0,this.delta=0,this.fraction=0,this.speed=0,this.dir=0,this.oldSample=null,this.oldLength=0,this.oldPointer=0,this.oldFraction=0,this.oldSpeed=0,this.oldDir=0,this.volume=0,this.lvol=0,this.rvol=0,this.panning=128,this.lpan=.5,this.rpan=.5,this.ldata=0,this.rdata=0,this.mixCounter=0,this.lmixRampU=0,this.lmixDeltaU=0,this.rmixRampU=0,this.rmixDeltaU=0,this.lmixRampD=0,this.lmixDeltaD=0,this.rmixRampD=0,this.rmixDeltaD=0,this.volCounter=0,this.lvolDelta=0,this.rvolDelta=0,this.panCounter=0,this.lpanDelta=0,this.rpanDelta=0}}})}function Ni(){return Object.create(null,{name:{value:"",writable:!0},bits:{value:8,writable:!0},volume:{value:0,writable:!0},length:{value:0,writable:!0},data:{value:[],writable:!0},loopMode:{value:0,writable:!0},loopStart:{value:0,writable:!0},loopLen:{value:0,writable:!0},store:{value:function(f){var t=0,e,i=this.length,n,l,u,a;if(this.loopLen||(this.loopMode=0),n=f.position,this.loopMode?(i=this.loopStart+this.loopLen,this.data=new Float32Array(i+1)):this.data=new Float32Array(this.length+1),this.bits===8)for(u=n+i,u>f.length&&(i=f.length-n),e=0;e<i;e++)a=f.readByte()+t,a<-128?a+=256:a>127&&(a-=256),this.data[e]=a*.0078125,t=a;else for(u=n+(i<<1),u>f.length&&(i=f.length-n>>1),e=0;e<i;e++)a=f.readShort()+t,a<-32768?a+=65536:a>32767&&(a-=65536),this.data[e]=a*3051758e-11,t=a;if(u=n+this.length,this.loopMode?(this.length=this.loopStart+this.loopLen,this.loopMode===1?this.data[i]=this.data[this.loopStart]:this.data[i]=this.data[i-1]):this.data[this.length]=0,i!==this.length)for(l=this.data[i-1],e=i;e<this.length;e++)this.data[e]=l;u<f.length?f.position=u:f.position=f.length-1}}})}function Wr(){var f=Nt();return Object.defineProperties(f,{setup:{value:function(t){var e=1;for(this.channels.length=t,this.channels[0]=qi();e<t;++e)this.channels[e]=this.channels[e-1].next=qi()}},initialize:{value:function(){this.reset()}},fast:{value:function(t){var e,i,n,l,u=0,a,r=0,c,h,o,d=this.bufferSize,b,m;if(this.completed){if(!this.remains){this.player.stop();return}d=this.remains}for(;u<d;){for(this.samplesLeft||(this.player.process(),this.player.fast(),this.samplesLeft=this.samplesTick,this.completed&&(d=u+this.samplesTick,d>this.bufferSize&&(this.remains=d-this.bufferSize,d=this.bufferSize))),b=this.samplesLeft,u+b>=d&&(b=d-u),a=r+b,e=this.channels[0];e;){if(!e.enabled){e=e.next;continue}for(h=e.sample,i=h.data,o=this.buffer[r],l=r;l<a;++l){if(e.index!==e.pointer){if(e.index>=e.length)if(h.loopMode)e.pointer=h.loopStart+(e.index-e.length),e.length=h.length,h.loopMode===2&&(e.dir?e.dir=0:e.dir=h.length+h.loopStart-1);else{e.enabled=0;break}else e.pointer=e.index;e.mute?(e.ldata=0,e.rdata=0):(e.dir?m=i[e.dir-e.pointer]:m=i[e.pointer],e.ldata=m*e.lvol,e.rdata=m*e.rvol)}e.index=e.pointer+e.delta,(e.fraction+=e.speed)>=1&&(e.index++,e.fraction--),o.l+=e.ldata,o.r+=e.rdata,o=o.next}e=e.next}r=a,u+=b,this.samplesLeft-=b}for(o=this.buffer[0],n=t.outputBuffer.getChannelData(0),c=t.outputBuffer.getChannelData(1),l=0;l<d;++l)o.l>1?o.l=1:o.l<-1&&(o.l=-1),o.r>1?o.r=1:o.r<-1&&(o.r=-1),n[l]=o.l,c[l]=o.r,o.l=o.r=0,o=o.next}},accurate:{value:function(t){var e,i,n,l,u,a,r=0,c,h=0,o,d,b,m,s,v=this.bufferSize,p,x;if(this.completed){if(!this.remains){this.player.stop();return}v=this.remains}for(;r<v;){for(this.samplesLeft||(this.player.process(),this.player.accurate(),this.samplesLeft=this.samplesTick,this.completed&&(v=r+this.samplesTick,v>this.bufferSize&&(this.remains=v-this.bufferSize,v=this.bufferSize))),p=this.samplesLeft,r+p>=v&&(p=v-r),c=h+p,e=this.channels[0];e;){if(!e.enabled){e=e.next;continue}for(b=e.sample,i=b.data,m=e.oldSample,m&&(n=m.data),s=this.buffer[h],a=h;a<c;++a){if(x=e.mute?0:i[e.pointer],x+=(i[e.pointer+e.dir]-x)*e.fraction,(e.fraction+=e.speed)>=1&&(u=e.fraction>>0,e.fraction-=u,e.dir>0?(e.pointer+=u,e.pointer>e.length&&(e.fraction+=e.pointer-e.length,e.pointer=e.length)):(e.pointer-=u,e.pointer<e.length&&(e.fraction+=e.length-e.pointer,e.pointer=e.length))),e.mixCounter?(m?(o=e.mute?0:n[e.oldPointer],o+=(n[e.oldPointer+e.oldDir]-o)*e.oldFraction,(e.oldFraction+=e.oldSpeed)>1&&(u=e.oldFraction>>0,e.oldFraction-=u,e.oldDir>0?(e.oldPointer+=u,e.oldPointer>e.oldLength&&(e.oldFraction+=e.oldPointer-e.oldLength,e.oldPointer=e.oldLength)):(e.oldPointer-=u,e.oldPointer<e.oldLength&&(e.oldFraction+=e.oldLength-e.oldPointer,e.oldPointer=e.oldLength))),s.l+=x*e.lmixRampU+o*e.lmixRampD,s.r+=x*e.rmixRampU+o*e.rmixRampD,e.lmixRampD-=e.lmixDeltaD,e.rmixRampD-=e.rmixDeltaD):(s.l+=x*e.lmixRampU,s.r+=x*e.rmixRampU),e.lmixRampU+=e.lmixDeltaU,e.rmixRampU+=e.rmixDeltaU,e.mixCounter--,e.oldPointer===e.oldLength&&(m.loopMode?m.loopMode===1?(e.oldPointer=m.loopStart,e.oldLength=m.length):e.oldDir>0?(e.oldPointer=m.length-1,e.oldLength=m.loopStart,e.oldDir=-1):(e.oldFraction-=1,e.oldPointer=m.loopStart,e.oldLength=m.length,e.oldDir=1):(m=null,e.oldPointer=0))):(s.l+=x*e.lvol,s.r+=x*e.rvol,e.volCounter?(e.lvol+=e.lvolDelta,e.rvol+=e.rvolDelta,e.volCounter--):e.panCounter&&(e.lpan+=e.lpanDelta,e.rpan+=e.rpanDelta,e.panCounter--,e.lvol=e.volume*e.lpan,e.rvol=e.volume*e.rpan)),e.pointer===e.length)if(b.loopMode)b.loopMode===1?(e.pointer=b.loopStart,e.length=b.length):e.dir>0?(e.pointer=b.length-1,e.length=b.loopStart,e.dir=-1):(e.fraction-=1,e.pointer=b.loopStart,e.length=b.length,e.dir=1);else{e.enabled=0;break}s=s.next}e=e.next}h=c,r+=p,this.samplesLeft-=p}for(s=this.buffer[0],l=t.outputBuffer.getChannelData(0),d=t.outputBuffer.getChannelData(1),a=0;a<v;++a)s.l>1?s.l=1:s.l<-1&&(s.l=-1),s.r>1?s.r=1:s.r<-1&&(s.r=-1),l[a]=s.l,d[a]=s.r,s.l=s.r=0,s=s.next}}}),f.bufferSize=8192,Object.seal(f)}function ji(f){var t=jt();return Object.defineProperties(t,{track:{value:null,writable:!0},length:{value:0,writable:!0},restart:{value:0,writable:!0},timer:{value:0,writable:!0},master:{value:0,writable:!0},volume:{set:function(e){e<0?e=0:e>1&&(e=1),this.master=e*64}},setup:{configurable:!1,value:function(){this.mixer.setup(this.channels)}}}),t.mixer=f||Wr(),t.mixer.player=t,t.endian=1,t.quality=1,t}function Yr(f){var t=Object.create(null,{index:{value:f,writable:!0},next:{value:null,writable:!0},flags:{value:0,writable:!0},delay:{value:0,writable:!0},channel:{value:null,writable:!0},patternLoop:{value:0,writable:!0},patternLoopRow:{value:0,writable:!0},playing:{value:null,writable:!0},note:{value:0,writable:!0},keyoff:{value:0,writable:!0},period:{value:0,writable:!0},finetune:{value:0,writable:!0},arpDelta:{value:0,writable:!0},vibDelta:{value:0,writable:!0},instrument:{value:null,writable:!0},autoVibratoPos:{value:0,writable:!0},autoSweep:{value:0,writable:!0},autoSweepPos:{value:0,writable:!0},sample:{value:null,writable:!0},sampleOffset:{value:0,writable:!0},volume:{value:0,writable:!0},volEnabled:{value:0,writable:!0},volEnvelope:{value:null,writable:!0},volDelta:{value:0,writable:!0},volSlide:{value:0,writable:!0},volSlideMaster:{value:0,writable:!0},fineSlideU:{value:0,writable:!0},fineSlideD:{value:0,writable:!0},fadeEnabled:{value:0,writable:!0},fadeDelta:{value:0,writable:!0},fadeVolume:{value:0,writable:!0},panning:{value:0,writable:!0},panEnabled:{value:0,writable:!0},panEnvelope:{value:null,writable:!0},panSlide:{value:0,writable:!0},portaU:{value:0,writable:!0},portaD:{value:0,writable:!0},finePortaU:{value:0,writable:!0},finePortaD:{value:0,writable:!0},xtraPortaU:{value:0,writable:!0},xtraPortaD:{value:0,writable:!0},portaPeriod:{value:0,writable:!0},portaSpeed:{value:0,writable:!0},glissando:{value:0,writable:!0},glissPeriod:{value:0,writable:!0},vibratoPos:{value:0,writable:!0},vibratoSpeed:{value:0,writable:!0},vibratoDepth:{value:0,writable:!0},vibratoReset:{value:0,writable:!0},tremoloPos:{value:0,writable:!0},tremoloSpeed:{value:0,writable:!0},tremoloDepth:{value:0,writable:!0},waveControl:{value:0,writable:!0},tremorPos:{value:0,writable:!0},tremorOn:{value:0,writable:!0},tremorOff:{value:0,writable:!0},tremorVolume:{value:0,writable:!0},retrigx:{value:0,writable:!0},retrigy:{value:0,writable:!0},rowCurrent:{value:null,writable:!0},reset:{value:function(){this.volume=this.sample.volume,this.panning=this.sample.panning,this.finetune=this.sample.finetune>>3<<2,this.keyoff=0,this.volDelta=0,this.fadeEnabled=0,this.fadeDelta=0,this.rowCurrent=null,this.fadeVolume=65536,this.autoVibratoPos=0,this.autoSweep=1,this.autoSweepPos=0,this.vibDelta=0,this.vibratoReset=0,(this.waveControl&15)<4&&(this.vibratoPos=0),this.waveControl>>4<4&&(this.tremoloPos=0)}},autoVibrato:{value:function(){var e;switch(this.autoVibratoPos=this.autoVibratoPos+this.playing.vibratoSpeed&255,this.playing.vibratoType){case 0:e=ta[this.autoVibratoPos];break;case 1:this.autoVibratoPos<128?e=-64:e=64;break;case 2:e=(64+(this.autoVibratoPos>>1)&127)-64;break;case 3:e=(64-(this.autoVibratoPos>>1)&127)-64;break;default:break}return e*=this.playing.vibratoDepth,this.autoSweep&&(this.playing.vibratoSweep?this.autoSweepPos>this.playing.vibratoSweep?(this.autoSweepPos&2&&(e*=this.autoSweepPos/this.playing.vibratoSweep),this.autoSweep=0):e*=++this.autoSweepPos/this.playing.vibratoSweep:this.autoSweep=0),this.flags|=ae,e>>6}},tonePortamento:{value:function(){this.glissPeriod||(this.glissPeriod=this.period),this.period<this.portaPeriod?(this.glissPeriod+=this.portaSpeed<<2,this.glissando?this.period=Math.round(this.glissPeriod/64)<<6:this.period=this.glissPeriod,this.period>=this.portaPeriod&&(this.period=this.portaPeriod,this.glissPeriod=this.portaPeriod=0)):this.period>this.portaPeriod&&(this.glissPeriod-=this.portaSpeed<<2,this.glissando?this.period=Math.round(this.glissPeriod/64)<<6:this.period=this.glissPeriod,this.period<=this.portaPeriod&&(this.period=this.portaPeriod,this.glissPeriod=this.portaPeriod=0)),this.flags|=ae}},tremolo:{value:function(){var e=255,i=this.tremoloPos&31;switch(this.waveControl>>4&3){case 0:e=Yi[i];break;case 1:e=i<<3;break;default:break}this.volDelta=e*this.tremoloDepth>>6,this.tremoloPos>31&&(this.volDelta=-this.volDelta),this.tremoloPos=this.tremoloPos+this.tremoloSpeed&63,this.flags|=H}},tremor:{value:function(){this.tremorPos===this.tremorOn?(this.tremorVolume=this.volume,this.volume=0,this.flags|=H):(this.tremorPos=0,this.volume=this.tremorVolume,this.flags|=H),this.tremorPos++}},vibrato:{value:function(){var e=255,i=this.vibratoPos&31;switch(this.waveControl&3){case 0:e=Yi[i];break;case 1:e=i<<3,this.vibratoPos>31&&(e=255-e);break;default:break}this.vibDelta=e*this.vibratoDepth>>7,this.vibratoPos>31&&(this.vibDelta=-this.vibDelta),this.vibratoPos=this.vibratoPos+this.vibratoSpeed&63,this.flags|=ae}}});return t.volEnvelope=$i(),t.panEnvelope=$i(),Object.seal(t)}function Gt(){return Object.create(null,{points:{value:[],writable:!0},total:{value:0,writable:!0},sustain:{value:0,writable:!0},loopStart:{value:0,writable:!0},loopEnd:{value:0,writable:!0},flags:{value:0,writable:!0}})}function $i(){return Object.create(null,{value:{value:0,writable:!0},position:{value:0,writable:!0},frame:{value:0,writable:!0},delta:{value:0,writable:!0},fraction:{value:0,writable:!0},stopped:{value:0,writable:!0},reset:{value:function(){this.value=0,this.position=0,this.frame=0,this.delta=0,this.fraction=0,this.stopped=0}}})}function Hi(){var f=Object.create(null,{name:{value:"",writable:!0},samples:{value:[],writable:!0},noteSamples:{value:null,writable:!0},fadeout:{value:0,writable:!0},volData:{value:null,writable:!0},volEnabled:{value:0,writable:!0},panData:{value:null,writable:!0},panEnabled:{value:0,writable:!0},vibratoType:{value:0,writable:!0},vibratoSweep:{value:0,writable:!0},vibratoSpeed:{value:0,writable:!0},vibratoDepth:{value:0,writable:!0}});return f.noteSamples=new Uint8Array(96),f.volData=Gt(),f.panData=Gt(),Object.seal(f)}function Xi(f,t){var e=Object.create(null,{rows:{value:[],writable:!0},length:{value:0,writable:!0},size:{value:0,writable:!0}});return e.rows.length=e.size=f*t,e.length=f,Object.seal(e)}function Vt(f,t){var e=Object.create(null,{frame:{value:0,writable:!0},value:{value:0,writable:!0}});return e.frame=f||0,e.value=t||0,Object.seal(e)}function ci(){return Object.create(null,{note:{value:0,writable:!0},instrument:{value:0,writable:!0},volume:{value:0,writable:!0},effect:{value:0,writable:!0},param:{value:0,writable:!0}})}function Vi(){var f=Ni();return Object.defineProperties(f,{finetune:{value:0,writable:!0},panning:{value:0,writable:!0},relative:{value:0,writable:!0}}),Object.seal(f)}function Kr(f){var t=ji(f);return Object.defineProperties(t,{id:{value:"F2Player"},patterns:{value:[],writable:!0},instruments:{value:[],writable:!0},voices:{value:[],writable:!0},linear:{value:0,writable:!0},complete:{value:0,writable:!0},order:{value:0,writable:!0},position:{value:0,writable:!0},nextOrder:{value:0,writable:!0},nextPosition:{value:0,writable:!0},pattern:{value:null,writable:!0},patternDelay:{value:0,writable:!0},patternOffset:{value:0,writable:!0},timer:{value:0,writable:!0},rowCurrent:{value:0,writable:!0},initialize:{value:function(){var e=0,i;for(this.reset(),this.timer=this.speed,this.order=0,this.position=0,this.nextOrder=-1,this.nextPosition=-1,this.patternDelay=0,this.patternOffset=0,this.complete=0,this.master=64,this.voices.length=this.channels;e<this.channels;++e)i=Yr(e),i.channel=this.mixer.channels[e],i.playing=this.instruments[0],i.sample=i.playing.samples[0],this.voices[e]=i,e&&(this.voices[e-1].next=i)}},loader:{value:function(e){var i,n,l,u,a,r,c,h,o,d,b=22,m,s,v,p;if(!(e.length<360)){if(e.position=17,this.title=e.readString(20),e.position++,l=e.readString(20),l==="FastTracker v2.00   "||l==="FastTracker v 2.00  ")this.version=1;else if(l==="Sk@le Tracker")b=2,this.version=2;else if(l==="MadTracker 2.0")this.version=3;else if(l==="MilkyTracker        ")this.version=4;else if(l==="DigiBooster Pro 2.18")this.version=5;else if(l.indexOf("OpenMPT")!==-1)this.version=6;else return;for(e.readUshort(),i=e.readUint(),this.length=e.readUshort(),this.restart=e.readUshort(),this.channels=e.readUshort(),p=s=e.readUshort(),this.instruments=[],this.instruments.length=e.readUshort()+1,this.linear=e.readUshort(),this.speed=e.readUshort(),this.tempo=e.readUshort(),this.track=new Uint8Array(this.length),n=0;n<this.length;++n)c=e.readUbyte(),c>=p&&(s=c+1),this.track[n]=c;if(this.patterns=[],this.patterns.length=s,s!==p){for(o=Xi(64,this.channels),c=o.size,n=0;n<c;++n)o.rows[n]=ci();this.patterns[--s]=o}for(e.position=d=i+60,h=p,n=0;n<h;++n){if(i=e.readUint(),e.position++,o=Xi(e.readUshort(),this.channels),s=o.size,p=e.readUshort(),e.position=d+i,r=e.position+p,p)for(c=0;c<s;++c)m=ci(),p=e.readUbyte(),p&128?(p&1&&(m.note=e.readUbyte()),p&2&&(m.instrument=e.readUbyte()),p&4&&(m.volume=e.readUbyte()),p&8&&(m.effect=e.readUbyte()),p&16&&(m.param=e.readUbyte())):(m.note=p,m.instrument=e.readUbyte(),m.volume=e.readUbyte(),m.effect=e.readUbyte(),m.param=e.readUbyte()),m.note!==di&&m.note>96&&(m.note=0),o.rows[c]=m;else for(c=0;c<s;++c)o.rows[c]=ci();this.patterns[n]=o,d=e.position,d!==r&&(d=e.position=r)}for(r=e.position,h=this.instruments.length,n=1;n<h&&(u=e.readUint(),!(e.position+u>=e.length));++n){if(a=Hi(),a.name=e.readString(22),e.position++,p=e.readUshort(),p>16&&(p=16),i=e.readUint(),b===2&&i!==64&&(i=64),p){for(a.samples=[],a.samples.length=p,c=0;c<96;++c)a.noteSamples[c]=e.readUbyte();for(c=0;c<12;++c)a.volData.points[c]=Vt(e.readUshort(),e.readUshort());for(c=0;c<12;++c)a.panData.points[c]=Vt(e.readUshort(),e.readUshort());for(a.volData.total=e.readUbyte(),a.panData.total=e.readUbyte(),a.volData.sustain=e.readUbyte(),a.volData.loopStart=e.readUbyte(),a.volData.loopEnd=e.readUbyte(),a.panData.sustain=e.readUbyte(),a.panData.loopStart=e.readUbyte(),a.panData.loopEnd=e.readUbyte(),a.volData.flags=e.readUbyte(),a.panData.flags=e.readUbyte(),a.volData.flags&Gi&&(a.volEnabled=1),a.panData.flags&Gi&&(a.panEnabled=1),a.vibratoType=e.readUbyte(),a.vibratoSweep=e.readUbyte(),a.vibratoDepth=e.readUbyte(),a.vibratoSpeed=e.readUbyte(),a.fadeout=e.readUshort()<<1,e.position+=b,d=e.position,this.instruments[n]=a,c=0;c<p;++c)v=Vi(),v.length=e.readUint(),v.loopStart=e.readUint(),v.loopLen=e.readUint(),v.volume=e.readUbyte(),v.finetune=e.readByte(),v.loopMode=e.readUbyte(),v.panning=e.readUbyte(),v.relative=e.readByte(),e.position++,v.name=e.readString(22),a.samples[c]=v,e.position=d+=i;for(c=0;c<p;++c)v=a.samples[c],v.length&&(d=e.position+v.length,v.loopMode&16&&(v.bits=16,v.loopMode^=16,v.length>>=1,v.loopStart>>=1,v.loopLen>>=1),v.loopLen||(v.loopMode=0),v.store(e),v.loopMode&&(v.length=v.loopStart+v.loopLen),e.position=d)}else e.position=r+u;if(r=e.position,r>=e.length)break}for(a=Hi(),a.volData=Gt(),a.panData=Gt(),a.samples=[],n=0;n<12;++n)a.volData.points[n]=Vt(),a.panData.points[n]=Vt();for(v=Vi(),v.length=220,v.data=new Float32Array(220),n=0;n<220;++n)v.data[n]=0;a.samples[0]=v,this.instruments[0]=a}}},process:{value:function(){var e,i,n,l,u,a,r,c,h,o,d,b,m,s=this.voices[0];if(this.tick)for(;s;){if(o=this.pattern.rows[this.position+s.index],s.delay)if((o.param&15)===this.tick)s.flags=s.delay,s.delay=0;else{s=s.next;continue}if(o.volume)switch(r=o.volume>>4,c=o.volume&15,r){case 6:s.volume-=c,s.volume<0&&(s.volume=0),s.flags|=H;break;case 7:s.volume+=c,s.volume>64&&(s.volume=64),s.flags|=H;break;case 11:s.vibrato();break;case 13:s.panning-=c,s.panning<0&&(s.panning=0),s.flags|=ue;break;case 14:s.panning+=c,s.panning>255&&(s.panning=255),s.flags|=ue;break;case 15:s.portaPeriod&&s.tonePortamento();break;default:break}switch(r=o.param>>4,c=o.param&15,o.effect){case 0:if(!o.param)break;m=(this.tick-this.timer)%3,m<0&&(m+=3),this.tick===2&&this.timer===18&&(m=0),m?m===1?this.linear?s.arpDelta=-(c<<6):(m=this.amiga(s.note+c,s.finetune),s.arpDelta=m-s.period):this.linear?s.arpDelta=-(r<<6):(m=this.amiga(s.note+r,s.finetune),s.arpDelta=m-s.period):s.arpDelta=0,s.flags|=ae;break;case 1:s.period-=s.portaU,s.period<0&&(s.period=0),s.flags|=ae;break;case 2:s.period+=s.portaD,s.period>9212&&(s.period=9212),s.flags|=ae;break;case 3:s.portaPeriod&&s.tonePortamento();break;case 4:r&&(s.vibratoSpeed=r),c&&(s.vibratoDepth=c<<2),s.vibrato();break;case 5:b=1,s.portaPeriod&&s.tonePortamento();break;case 6:b=1,s.vibrato();break;case 7:s.tremolo();break;case 10:b=1;break;case 14:switch(r){case 9:this.tick%c===0&&(s.volEnvelope.reset(),s.panEnvelope.reset(),s.flags|=H|ue|He);break;case 12:this.tick===c&&(s.volume=0,s.flags|=H);break;default:break}break;case 17:r=s.volSlideMaster>>4,c=s.volSlideMaster&15,r?(this.master+=r,this.master>64&&(this.master=64),s.flags|=H):c&&(this.master-=c,this.master<0&&(this.master=0),s.flags|=H);break;case 20:this.tick===o.param&&(s.fadeEnabled=1,s.keyoff=1);break;case 24:r=s.panSlide>>4,c=s.panSlide&15,r?(s.panning+=r,s.panning>255&&(s.panning=255),s.flags|=ue):c&&(s.panning-=c,s.panning<0&&(s.panning=0),s.flags|=ue);break;case 27:if(e=this.tick,o.volume||e++,e%s.retrigy)break;(!o.volume||o.volume>80)&&s.retrigx&&this.retrig(s),s.flags|=He;break;case 29:s.tremor();break;default:break}b&&(r=s.volSlide>>4,c=s.volSlide&15,b=0,r?(s.volume+=r,s.flags|=H):c&&(s.volume-=c,s.flags|=H)),s=s.next}else for(this.nextOrder>=0&&(this.order=this.nextOrder),this.nextPosition>=0&&(this.position=this.nextPosition),this.nextOrder=this.nextPosition=-1,this.pattern=this.patterns[this.track[this.order]];s;){if(this.rowCurrent=this.position+s.index,o=this.pattern.rows[this.rowCurrent],e=o.volume>>4,h=o.effect===3||o.effect===5||e===15,r=o.param>>4,s.keyoff=0,s.arpDelta&&(s.arpDelta=0,s.flags|=ae),o.instrument?(s.instrument=o.instrument<this.instruments.length?this.instruments[o.instrument]:null,s.volEnvelope.reset(),s.panEnvelope.reset(),s.flags|=H|ue|Ue):(o.note===di||o.effect===20&&!o.param)&&(s.fadeEnabled=1,s.keyoff=1),o.note&&o.note!==di?s.instrument?(n=s.instrument,m=o.note-1,d=n.samples[n.noteSamples[m]],m+=d.relative,m>=Qr&&m<=ea&&(h||(s.note=m,s.sample=d,o.instrument?(s.volEnabled=n.volEnabled,s.panEnabled=n.panEnabled,s.flags|=Jr):s.flags|=ae|He),o.instrument?(s.reset(),s.fadeDelta=n.fadeout):s.finetune=d.finetune>>3<<2,o.effect===14&&r===5&&(s.finetune=(o.param&15)-8<<3),this.linear?m=(120-m<<6)-s.finetune:m=this.amiga(m,s.finetune),h?s.portaPeriod=m:(s.period=m,s.glissPeriod=0))):(s.volume=0,s.flags=H|Ue):s.vibratoReset&&o.effect!==4&&o.effect!==6&&(s.vibDelta=0,s.vibratoReset=0,s.flags|=ae),o.volume)if(o.volume>=16&&o.volume<=80)s.volume=o.volume-16,s.flags|=H|Ue;else switch(c=o.volume&15,e){case 6:s.volume-=c,s.volume<0&&(s.volume=0),s.flags|=H;break;case 7:s.volume+=c,s.volume>64&&(s.volume=64),s.flags|=H;break;case 10:c&&(s.vibratoSpeed=c);break;case 11:c&&(s.vibratoDepth=c<<2);break;case 12:s.panning=c<<4,s.flags|=ue;break;case 15:c&&(s.portaSpeed=c<<4);break;default:break}if(o.effect)switch(c=o.param&15,o.effect){case 1:o.param&&(s.portaU=o.param<<2);break;case 2:o.param&&(s.portaD=o.param<<2);break;case 3:o.param&&e!==15&&(s.portaSpeed=o.param);break;case 4:s.vibratoReset=1;break;case 5:o.param&&(s.volSlide=o.param);break;case 6:o.param&&(s.volSlide=o.param),s.vibratoReset=1;break;case 7:r&&(s.tremoloSpeed=r),c&&(s.tremoloDepth=c);break;case 8:s.panning=o.param,s.flags|=ue;break;case 9:o.param&&(s.sampleOffset=o.param<<8),s.sampleOffset>=s.sample.length&&(s.volume=0,s.sampleOffset=0,s.flags&=~(ae|He),s.flags|=H|Ue);break;case 10:o.param&&(s.volSlide=o.param);break;case 11:this.nextOrder=o.param,this.nextOrder>=this.length?this.complete=1:this.nextPosition=0,u=1,this.patternOffset=0;break;case 12:s.volume=o.param,s.flags|=H|Ue;break;case 13:this.nextPosition=(r*10+c)*this.channels,this.patternOffset=0,u||(this.nextOrder=this.order+1,this.nextOrder>=this.length&&(this.complete=1,this.nextPosition=-1));break;case 14:switch(r){case 1:c&&(s.finePortaU=c<<2),s.period-=s.finePortaU,s.flags|=ae;break;case 2:c&&(s.finePortaD=c<<2),s.period+=s.finePortaD,s.flags|=ae;break;case 3:s.glissando=c;break;case 4:s.waveControl=s.waveControl&240|c;break;case 6:c?(s.patternLoop?s.patternLoop--:s.patternLoop=c,s.patternLoop&&(this.nextPosition=s.patternLoopRow)):s.patternLoopRow=this.patternOffset=this.position;break;case 7:s.waveControl=s.waveControl&15|c<<4;break;case 10:c&&(s.fineSlideU=c),s.volume+=s.fineSlideU,s.flags|=H;break;case 11:c&&(s.fineSlideD=c),s.volume-=s.fineSlideD,s.flags|=H;break;case 13:s.delay=s.flags,s.flags=0;break;case 14:this.patternDelay=c*this.timer;break;default:break}break;case 15:if(!o.param)break;o.param<32?this.timer=o.param:this.mixer.samplesTick=this.sampleRate*2.5/o.param>>0;break;case 16:this.master=o.param,this.master>64&&(this.master=64),s.flags|=H;break;case 17:o.param&&(s.volSlideMaster=o.param);break;case 21:if(!s.instrument||!s.instrument.volEnabled)break;for(n=s.instrument,m=o.param,r=n.volData.total,l=0;l<r&&!(m<n.volData.points[l].frame);l++);s.volEnvelope.position=--l,r--,n.volData.flags&Wi&&l===n.volData.loopEnd&&(l=s.volEnvelope.position=n.volData.loopStart,m=n.volData.points[l].frame,s.volEnvelope.frame=m),l>=r?(s.volEnvelope.value=n.volData.points[r].value,s.volEnvelope.stopped=1):(s.volEnvelope.stopped=0,s.volEnvelope.frame=m,m>n.volData.points[l].frame&&s.volEnvelope.position++,i=n.volData.points[l],a=n.volData.points[++l],m=a.frame-i.frame,s.volEnvelope.delta=(m?(a.value-i.value<<8)/m>>0:0)||0,s.volEnvelope.fraction=i.value<<8);break;case 24:o.param&&(s.panSlide=o.param);break;case 27:if(r&&(s.retrigx=r),c&&(s.retrigy=c),!o.volume&&s.retrigy){if(e=this.tick+1,e%s.retrigy)break;o.volume>80&&s.retrigx&&this.retrig(s)}break;case 29:o.param&&(s.tremorOn=++r,s.tremorOff=++c+r);break;case 33:r===1?(c&&(s.xtraPortaU=c),s.period-=s.xtraPortaU,s.flags|=ae):r===2&&(c&&(s.xtraPortaD=c),s.period+=s.xtraPortaD,s.flags|=ae);break;default:break}s=s.next}++this.tick>=this.timer+this.patternDelay&&(this.patternDelay=this.tick=0,this.nextPosition<0&&(this.nextPosition=this.position+this.channels,(this.nextPosition>=this.pattern.size||this.complete)&&(this.nextOrder=this.order+1,this.nextPosition=this.patternOffset,this.nextOrder>=this.length&&(this.nextOrder=this.restart,this.mixer.complete=1))))}},fast:{value:function(){for(var e,i,n,l,u,a=this.voices[0],r;a;)e=a.channel,n=a.flags,a.flags=0,n&He&&(e.index=a.sampleOffset,e.pointer=-1,e.dir=0,e.fraction=0,e.sample=a.sample,e.length=a.sample.length,e.enabled=e.sample.data?1:0,a.playing=a.instrument,a.sampleOffset=0),l=a.playing,i=l.vibratoSpeed?a.autoVibrato():0,r=a.volume+a.volDelta,l.volEnabled?(a.volEnabled&&!a.volEnvelope.stopped&&this.envelope(a,a.volEnvelope,l.volData),r=r*a.volEnvelope.value>>6,n|=H,a.fadeEnabled&&(a.fadeVolume-=a.fadeDelta,a.fadeVolume<0?(r=0,a.fadeVolume=0,a.fadeEnabled=0,a.volEnvelope.value=0,a.volEnvelope.stopped=1,a.panEnvelope.stopped=1):r=r*a.fadeVolume>>16)):a.keyoff&&(r=0,n|=H),u=a.panning,l.panEnabled&&(a.panEnabled&&!a.panEnvelope.stopped&&this.envelope(a,a.panEnvelope,l.panData),u=a.panEnvelope.value<<2,n|=ue,u<0?u=0:u>255&&(u=255)),n&H&&(r<0?r=0:r>64&&(r=64),e.volume=Ki[r*this.master>>6],e.lvol=e.volume*e.lpan,e.rvol=e.volume*e.rpan),n&ue&&(e.panning=u,e.lpan=Xe[256-u],e.rpan=Xe[u],e.lvol=e.volume*e.lpan,e.rvol=e.volume*e.rpan),n&ae&&(i+=a.period+a.arpDelta+a.vibDelta,this.linear?e.speed=(548077568*Math.pow(2,(4608-i)/768)/this.sampleRate>>0)/65536:e.speed=(65536*(14317456/i)/this.sampleRate>>0)/65536,e.delta=e.speed>>0,e.speed-=e.delta),a=a.next}},accurate:{value:function(){for(var e,i,n,l,u,a,r,c,h,o=this.voices[0],d;o;){if(e=o.channel,n=o.flags,o.flags=0,n&He&&(e.sample&&(n|=Ue,e.mixCounter=220,e.oldSample=null,e.oldPointer=-1,e.enabled&&(e.oldDir=e.dir,e.oldFraction=e.fraction,e.oldSpeed=e.speed,e.oldSample=e.sample,e.oldPointer=e.pointer,e.oldLength=e.length,e.lmixRampD=e.lvol,e.lmixDeltaD=e.lvol/220,e.rmixRampD=e.rvol,e.rmixDeltaD=e.rvol/220)),e.dir=1,e.fraction=0,e.sample=o.sample,e.pointer=o.sampleOffset,e.length=o.sample.length,e.enabled=e.sample.data?1:0,o.playing=o.instrument,o.sampleOffset=0),l=o.playing,i=l.vibratoSpeed?o.autoVibrato():0,d=o.volume+o.volDelta,l.volEnabled?(o.volEnabled&&!o.volEnvelope.stopped&&this.envelope(o,o.volEnvelope,l.volData),d=d*o.volEnvelope.value>>6,n|=H,o.fadeEnabled&&(o.fadeVolume-=o.fadeDelta,o.fadeVolume<0?(d=0,o.fadeVolume=0,o.fadeEnabled=0,o.volEnvelope.value=0,o.volEnvelope.stopped=1,o.panEnvelope.stopped=1):d=d*o.fadeVolume>>16)):o.keyoff&&(d=0,n|=H),r=o.panning,l.panEnabled&&(o.panEnabled&&!o.panEnvelope.stopped&&this.envelope(o,o.panEnvelope,l.panData),r=o.panEnvelope.value<<2,n|=ue,r<0?r=0:r>255&&(r=255)),!e.enabled){e.volCounter=0,e.panCounter=0,o=o.next;continue}n&H&&(d<0?d=0:d>64&&(d=64),d=Ki[d*this.master>>6],a=d*Xe[256-r],h=d*Xe[r],d!==e.volume&&!e.mixCounter?(e.volCounter=n&Ue?220:this.mixer.samplesTick,e.lvolDelta=(a-e.lvol)/e.volCounter,e.rvolDelta=(h-e.rvol)/e.volCounter):(e.lvol=a,e.rvol=h),e.volume=d),n&ue&&(u=Xe[256-r],c=Xe[r],r!==e.panning&&!e.mixCounter&&!e.volCounter?(e.panCounter=this.mixer.samplesTick,e.lpanDelta=(u-e.lpan)/e.panCounter,e.rpanDelta=(c-e.rpan)/e.panCounter):(e.lpan=u,e.rpan=c),e.panning=r),n&ae&&(i+=o.period+o.arpDelta+o.vibDelta,this.linear?e.speed=(548077568*Math.pow(2,(4608-i)/768)/this.sampleRate>>0)/65536:e.speed=(65536*(14317456/i)/this.sampleRate>>0)/65536),e.mixCounter&&(e.lmixRampU=0,e.lmixDeltaU=e.lvol/220,e.rmixRampU=0,e.rmixDeltaU=e.rvol/220),o=o.next}}},envelope:{value:function(e,i,n){var l=i.position,u=n.points[l],a;if(i.frame===u.frame){if(n.flags&Wi&&l===n.loopEnd&&(l=i.position=n.loopStart,u=n.points[l],i.frame=u.frame),l===n.total-1){i.value=u.value,i.stopped=1;return}if(n.flags&Zr&&l===n.sustain&&!e.fadeEnabled){i.value=u.value;return}i.position++,a=n.points[i.position],i.delta=(a.value-u.value<<8)/(a.frame-u.frame)>>0||0,i.fraction=u.value<<8}else i.fraction+=i.delta;i.value=i.fraction>>8,i.frame++}},amiga:{value:function(e,i){var n=0,l=pi[++e];return i<0?n=(pi[--e]-l)/64:i>0&&(n=(l-pi[++e])/64),l-n*i>>0}},retrig:{value:function(e){switch(e.retrigx){case 1:e.volume--;break;case 2:e.volume++;break;case 3:e.volume-=4;break;case 4:e.volume-=8;break;case 5:e.volume-=16;break;case 6:e.volume=(e.volume<<1)/3;break;case 7:e.volume>>=1;break;case 8:e.volume=e.sample.volume;break;case 9:e.volume++;break;case 10:e.volume+=2;break;case 11:e.volume+=4;break;case 12:e.volume+=8;break;case 13:e.volume+=16;break;case 14:e.volume=e.volume*3>>1;break;case 15:e.volume<<=1;break;default:break}e.volume<0?e.volume=0:e.volume>64&&(e.volume=64),e.flags|=H}}}),Object.seal(t)}var ae=1,H=2,ue=4,He=8,Jr=15,Ue=32,Gi=1,Zr=2,Wi=4,Qr=0,ea=118,di=97,ta=[0,-2,-3,-5,-6,-8,-9,-11,-12,-14,-16,-17,-19,-20,-22,-23,-24,-26,-27,-29,-30,-32,-33,-34,-36,-37,-38,-39,-41,-42,-43,-44,-45,-46,-47,-48,-49,-50,-51,-52,-53,-54,-55,-56,-56,-57,-58,-59,-59,-60,-60,-61,-61,-62,-62,-62,-63,-63,-63,-64,-64,-64,-64,-64,-64,-64,-64,-64,-64,-64,-63,-63,-63,-62,-62,-62,-61,-61,-60,-60,-59,-59,-58,-57,-56,-56,-55,-54,-53,-52,-51,-50,-49,-48,-47,-46,-45,-44,-43,-42,-41,-39,-38,-37,-36,-34,-33,-32,-30,-29,-27,-26,-24,-23,-22,-20,-19,-17,-16,-14,-12,-11,-9,-8,-6,-5,-3,-2,0,2,3,5,6,8,9,11,12,14,16,17,19,20,22,23,24,26,27,29,30,32,33,34,36,37,38,39,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,56,57,58,59,59,60,60,61,61,62,62,62,63,63,63,64,64,64,64,64,64,64,64,64,64,64,63,63,63,62,62,62,61,61,60,60,59,59,58,57,56,56,55,54,53,52,51,50,49,48,47,46,45,44,43,42,41,39,38,37,36,34,33,32,30,29,27,26,24,23,22,20,19,17,16,14,12,11,9,8,6,5,3,2],Yi=[0,24,49,74,97,120,141,161,180,197,212,224,235,244,250,253,255,253,250,244,235,224,212,197,180,161,141,120,97,74,49,24],Xe=[0,.04417,.062489,.076523,.088371,.098821,.108239,.116927,.124977,.132572,.139741,.146576,.153077,.159335,.16535,.171152,.176772,.18221,.187496,.19263,.197643,.202503,.207273,.211951,.216477,.220943,.225348,.229631,.233854,.237985,.242056,.246066,.249985,.253873,.25767,.261437,.265144,.268819,.272404,.275989,.279482,.282976,.286409,.289781,.293153,.296464,.299714,.302965,.306185,.309344,.312473,.315602,.318671,.321708,.324746,.327754,.3307,.333647,.336563,.339449,.342305,.345161,.347986,.350781,.353545,.356279,.359013,.361717,.364421,.367094,.369737,.37238,.374992,.377574,.380157,.382708,.38526,.387782,.390303,.392794,.395285,.397746,.400176,.402606,.405037,.407437,.409836,.412206,.414576,.416915,.419254,.421563,.423841,.42618,.428458,.430737,.432985,.435263,.437481,.439729,.441916,.444134,.446321,.448508,.450665,.452852,.455009,.457136,.459262,.461389,.463485,.465611,.467708,.469773,.471839,.473935,.47597,.478036,.480072,.482077,.484112,.486117,.488122,.490127,.492101,.494106,.496051,.498025,.5,.501944,.503888,.505802,.507746,.50966,.511574,.513488,.515371,.517255,.519138,.521022,.522905,.524758,.526611,.528465,.530318,.53214,.533993,.535816,.537639,.539462,.541254,.543046,.544839,.546631,.548423,.550216,.551978,.553739,.555501,.557263,.558995,.560757,.562489,.56422,.565952,.567683,.569384,.571116,.572817,.574518,.57622,.57789,.579592,.581262,.582964,.584634,.586305,.587946,.589617,.591257,.592928,.594568,.596209,.597849,.599459,.6011,.60271,.60435,.60596,.60757,.60915,.61076,.61237,.61395,.61556,.617139,.618719,.620268,.621848,.623428,.624977,.626557,.628106,.629655,.631205,.632754,.634303,.635822,.637372,.63889,.64044,.641959,.643478,.644966,.646485,.648004,.649523,.651012,.6525,.653989,.655477,.656966,.658454,.659943,.661431,.66289,.664378,.665836,.667294,.668783,.670241,.671699,.673127,.674585,.676043,.677471,.678929,.680357,.681785,.683213,.684641,.686068,.687496,.688894,.690321,.691749,.693147,.694574,.695972,.697369,.698767,.700164,.701561,.702928,.704326,.705723,.70711],Ki=[0,.005863,.013701,.021569,.029406,.037244,.045082,.052919,.060757,.068625,.076463,.0843,.092138,.099976,.107844,.115681,.123519,.131357,.139194,.147032,.1549,.162738,.170575,.178413,.186251,.194119,.201956,.209794,.217632,.225469,.233307,.241175,.249013,.25685,.264688,.272526,.280394,.288231,.296069,.303907,.311744,.319582,.32745,.335288,.343125,.350963,.3588,.366669,.374506,.382344,.390182,.398019,.405857,.413725,.421563,.4294,.437238,.445076,.452944,.460781,.468619,.476457,.484294,.492132,.5],pi=[29024,27392,25856,24384,23040,21696,20480,19328,18240,17216,16256,15360,14512,13696,12928,12192,11520,10848,10240,9664,9120,8608,8128,7680,7256,6848,6464,6096,5760,5424,5120,4832,4560,4304,4064,3840,3628,3424,3232,3048,2880,2712,2560,2416,2280,2152,2032,1920,1814,1712,1616,1524,1440,1356,1280,1208,1140,1076,1016,960,907,856,808,762,720,678,640,604,570,538,508,480,453,428,404,381,360,339,320,302,285,269,254,240,227,214,202,190,180,169,160,151,142,134,127,120,113,107,101,95,90,85,80,75,71,67,63,60,57,53,50,48,45,42,40,38,36,34,32,30,28],Ji=Kr;function Wt(f){return Object.create(null,{index:{value:f,writable:!0},next:{value:null,writable:!0},channel:{value:null,writable:!0},sample:{value:null,writable:!0},enabled:{value:0,writable:!0},period:{value:0,writable:!0},effect:{value:0,writable:!0},param:{value:0,writable:!0},volume:{value:0,writable:!0},portaDir:{value:0,writable:!0},portaPeriod:{value:0,writable:!0},portaSpeed:{value:0,writable:!0},vibratoPos:{value:0,writable:!0},vibratoSpeed:{value:0,writable:!0},initialize:{value:function(){this.channel=null,this.sample=null,this.enabled=0,this.period=0,this.effect=0,this.param=0,this.volume=0,this.portaDir=0,this.portaPeriod=0,this.portaSpeed=0,this.vibratoPos=0,this.vibratoSpeed=0}}})}function ia(f){var t=Xt(f);return Object.defineProperties(t,{id:{value:"MKPlayer"},track:{value:null,writable:!0},patterns:{value:[],writable:!0},samples:{value:[],writable:!0},length:{value:0,writable:!0},restart:{value:0,writable:!0},voices:{value:[],writable:!0},trackPos:{value:0,writable:!0},patternPos:{value:0,writable:!0},jumpFlag:{value:0,writable:!0},vibratoDepth:{value:0,writable:!0},restartSave:{value:0,writable:!0},force:{set:function(e){e<mi?e=mi:e>Be&&(e=Be),this.version=e,e===Be?this.vibratoDepth=6:this.vibratoDepth=7,e===Zi?(this.restartSave=this.restart,this.restart=0):(this.restart=this.restartSave,this.restartSave=0)}},initialize:{value:function(){var e=this.voices[0];for(this.reset(),this.force=this.version,this.speed=6,this.trackPos=0,this.patternPos=0,this.jumpFlag=0;e;)e.initialize(),e.channel=this.mixer.channels[e.index],e.sample=this.samples[0],e=e.next}},loader:{value:function(e){var i=0,n,l,u,a,r,c=0,h;if(!(e.length<2106)&&(e.position=1080,l=e.readString(4),!(l!=="M.K."&&l!=="FLT4"))){for(e.position=0,this.title=e.readString(20),this.version=mi,e.position+=22,n=1;n<32;++n){if(h=e.readUshort(),!h){this.samples[n]=null,e.position+=28;continue}r=ht(),e.position-=24,r.name=e.readString(22),r.length=h<<1,e.position+=3,r.volume=e.readUbyte(),r.loop=e.readUshort()<<1,r.repeat=e.readUshort()<<1,e.position+=22,r.pointer=c,c+=r.length,this.samples[n]=r,r.length>32768&&(this.version=ra)}for(e.position=950,this.length=e.readUbyte(),h=e.readUbyte(),this.restart=h<this.length?h:0,n=0;n<128;++n)h=e.readUbyte()<<8,this.track[n]=h,h>i&&(i=h);for(e.position=1084,i+=256,this.patterns.length=i,n=0;n<i;++n)if(a=Ht(),h=e.readUint(),a.note=h>>16&4095,a.effect=h>>8&15,a.sample=h>>24&240|h>>12&15,a.param=h&255,this.patterns[n]=a,(a.sample>31||!this.samples[a.sample])&&(a.sample=0),(a.effect===3||a.effect===4)&&(this.version=Zi),(a.effect===5||a.effect===6)&&(this.version=Be),a.effect>6&&a.effect<10){this.version=0;return}for(this.mixer.store(e,c),n=1;n<32;++n)if(r=this.samples[n],!!r)for(r.name.indexOf("2.0")>-1&&(this.version=Be),r.loop?(r.loopPtr=r.pointer+r.loop,r.length=r.loop+r.repeat):(r.loopPtr=this.mixer.memory.length,r.repeat=2),c=r.pointer+4,u=r.pointer;u<c;++u)this.mixer.memory[u]=0;r=ht(),r.pointer=r.loopPtr=this.mixer.memory.length,r.length=r.repeat=2,this.samples[0]=r,this.version<Be&&this.restart!==127&&(this.version=aa)}}},process:{value:function(){var e,i,n,l,u,a,r,c,h,o=this.voices[0];if(this.tick)for(;o;){if(e=o.channel,!o.effect&&!o.param){e.period=o.period,o=o.next;continue}switch(o.effect){case 0:if(h=this.tick%3,!h){e.period=o.period,o=o.next;continue}for(h===1?h=o.param>>4:h=o.param&15,u=o.period&4095,n=37-h,i=0;i<n;++i)if(u>=Qi[i]){e.period=Qi[i+h];break}break;case 1:o.period-=o.param,o.period<113&&(o.period=113),e.period=o.period;break;case 2:o.period+=o.param,o.period>856&&(o.period=856),e.period=o.period;break;case 3:case 5:o.effect===5?c=1:o.param&&(o.portaSpeed=o.param,o.param=0),o.portaPeriod&&(o.portaDir?(o.period-=o.portaSpeed,o.period<=o.portaPeriod&&(o.period=o.portaPeriod,o.portaPeriod=0)):(o.period+=o.portaSpeed,o.period>=o.portaPeriod&&(o.period=o.portaPeriod,o.portaPeriod=0))),e.period=o.period;break;case 4:case 6:o.effect===6?c=1:o.param&&(o.vibratoSpeed=o.param),h=o.vibratoPos>>2&31,h=(o.vibratoSpeed&15)*oa[h]>>this.vibratoDepth,o.vibratoPos>127?e.period=o.period-h:e.period=o.period+h,h=o.vibratoSpeed>>2&60,o.vibratoPos=o.vibratoPos+h&255;break;case 10:c=1;break;default:break}c&&(h=o.param>>4,c=0,h?o.volume+=h:o.volume-=o.param&15,o.volume<0?o.volume=0:o.volume>64&&(o.volume=64),e.volume=o.volume),o=o.next}else for(l=this.track[this.trackPos]+this.patternPos;o;){switch(e=o.channel,o.enabled=0,a=this.patterns[l+o.index],o.effect=a.effect,o.param=a.param,a.sample?(r=o.sample=this.samples[a.sample],e.volume=o.volume=r.volume):r=o.sample,a.note&&(o.effect===3||o.effect===5?a.note<o.period?(o.portaDir=1,o.portaPeriod=a.note):a.note>o.period?(o.portaDir=0,o.portaPeriod=a.note):o.portaPeriod=0:(o.enabled=1,o.vibratoPos=0,e.enabled=0,e.pointer=r.pointer,e.length=r.length,e.period=o.period=a.note)),o.effect){case 11:this.trackPos=o.param-1,this.jumpFlag^=1;break;case 12:e.volume=o.param,this.version===Be&&(o.volume=o.param);break;case 13:this.jumpFlag^=1;break;case 14:this.mixer.filter.active=o.param^1;break;case 15:h=o.param,h<1?h=1:h>31&&(h=31),this.speed=h,this.tick=0;break;default:break}o.enabled&&(e.enabled=1),e.pointer=r.loopPtr,e.length=r.repeat,o=o.next}++this.tick===this.speed&&(this.tick=0,this.patternPos+=4,(this.patternPos===256||this.jumpFlag)&&(this.patternPos=this.jumpFlag=0,this.trackPos=++this.trackPos&127,this.trackPos===this.length&&(this.trackPos=this.restart,this.mixer.complete=1)))}}}),t.voices[0]=Wt(0),t.voices[0].next=t.voices[1]=Wt(1),t.voices[1].next=t.voices[2]=Wt(2),t.voices[2].next=t.voices[3]=Wt(3),t.track=new Uint16Array(128),Object.seal(t)}var mi=1,ra=2,Zi=3,aa=4,Be=5,Qi=[856,808,762,720,678,640,604,570,538,508,480,453,428,404,381,360,339,320,302,285,269,254,240,226,214,202,190,180,170,160,151,143,135,127,120,113,0],oa=[0,24,49,74,97,120,141,161,180,197,212,224,235,244,250,253,255,253,250,244,235,224,212,197,180,161,141,120,97,74,49,24],er=ia;function Yt(f){return Object.create(null,{index:{value:f,writable:!0},next:{value:null,writable:!0},channel:{value:null,writable:!0},sample:{value:null,writable:!0},enabled:{value:0,writable:!0},loopCtr:{value:0,writable:!0},loopPos:{value:0,writable:!0},step:{value:0,writable:!0},period:{value:0,writable:!0},effect:{value:0,writable:!0},param:{value:0,writable:!0},volume:{value:0,writable:!0},pointer:{value:0,writable:!0},length:{value:0,writable:!0},loopPtr:{value:0,writable:!0},repeat:{value:0,writable:!0},finetune:{value:0,writable:!0},offset:{value:0,writable:!0},portaDir:{value:0,writable:!0},portaPeriod:{value:0,writable:!0},portaSpeed:{value:0,writable:!0},glissando:{value:0,writable:!0},tremoloParam:{value:0,writable:!0},tremoloPos:{value:0,writable:!0},tremoloWave:{value:0,writable:!0},vibratoParam:{value:0,writable:!0},vibratoPos:{value:0,writable:!0},vibratoWave:{value:0,writable:!0},funkPos:{value:0,writable:!0},funkSpeed:{value:0,writable:!0},funkWave:{value:0,writable:!0},initialize:{value:function(){this.channel=null,this.sample=null,this.enabled=0,this.loopCtr=0,this.loopPos=0,this.step=0,this.period=0,this.effect=0,this.param=0,this.volume=0,this.pointer=0,this.length=0,this.loopPtr=0,this.repeat=0,this.finetune=0,this.offset=0,this.portaDir=0,this.portaPeriod=0,this.portaSpeed=0,this.glissando=0,this.tremoloParam=0,this.tremoloPos=0,this.tremoloWave=0,this.vibratoParam=0,this.vibratoPos=0,this.vibratoWave=0,this.funkPos=0,this.funkSpeed=0,this.funkWave=0}}})}function na(){var f=Ht();return Object.defineProperties(f,{step:{value:0,writable:!0}}),Object.seal(f)}function tr(){var f=ht();return Object.defineProperties(f,{finetune:{value:0,writable:!0},realLen:{value:0,writable:!0}}),Object.seal(f)}function sa(f){var t=Xt(f);return Object.defineProperties(t,{id:{value:"PTPlayer"},track:{value:null,writable:!0},patterns:{value:[],writable:!0},samples:{value:[],writable:!0},length:{value:0,writable:!0},voices:{value:[],writable:!0},trackPos:{value:0,writable:!0},patternPos:{value:0,writable:!0},patternBreak:{value:0,writable:!0},patternDelay:{value:0,writable:!0},breakPos:{value:0,writable:!0},jumpFlag:{value:0,writable:!0},vibratoDepth:{value:0,writable:!0},force:{set:function(e){e<Kt?e=Kt:e>vi&&(e=vi),this.version=e,e<ir?this.vibratoDepth=6:this.vibratoDepth=7}},initialize:{value:function(){var e=this.voices[0];for(this.tempo=125,this.speed=6,this.trackPos=0,this.patternPos=0,this.patternBreak=0,this.patternDelay=0,this.breakPos=0,this.jumpFlag=0,this.reset(),this.force=this.version;e;)e.initialize(),e.channel=this.mixer.channels[e.index],e.sample=this.samples[0],e=e.next}},loader:{value:function(e){var i=0,n,l,u,a,r,c=0,h;if(!(e.length<2106)&&(e.position=1080,l=e.readString(4),!(l!=="M.K."&&l!=="M!K!"))){for(e.position=0,this.title=e.readString(20),this.version=Kt,e.position+=22,n=1;n<32;++n){if(h=e.readUshort(),!h){this.samples[n]=null,e.position+=28;continue}r=tr(),e.position-=24,r.name=e.readString(22),r.length=r.realLen=h<<1,e.position+=2,r.finetune=e.readUbyte()*37,r.volume=e.readUbyte(),r.loop=e.readUshort()<<1,r.repeat=e.readUshort()<<1,e.position+=22,r.pointer=c,c+=r.length,this.samples[n]=r}for(e.position=950,this.length=e.readUbyte(),e.position++,n=0;n<128;++n)h=e.readUbyte()<<8,this.track[n]=h,h>i&&(i=h);for(e.position=1084,i+=256,this.patterns.length=i,n=0;n<i;++n)a=na(),a.step=h=e.readUint(),a.note=h>>16&4095,a.effect=h>>8&15,a.sample=h>>24&240|h>>12&15,a.param=h&255,this.patterns[n]=a,(a.sample>31||!this.samples[a.sample])&&(a.sample=0),a.effect===15&&a.param>31&&(this.version=ir),a.effect===8&&(this.version=vi);for(this.mixer.store(e,c),n=1;n<32;++n)if(r=this.samples[n],!!r)for(r.loop||r.repeat>4?(r.loopPtr=r.pointer+r.loop,r.length=r.loop+r.repeat):(r.loopPtr=this.mixer.memory.length,r.repeat=2),c=r.pointer+2,u=r.pointer;u<c;++u)this.mixer.memory[u]=0;r=tr(),r.pointer=r.loopPtr=this.mixer.memory.length,r.length=r.repeat=2,this.samples[0]=r}}},process:{value:function(){var e,i,n,l,u,a,r=this.voices[0];if(this.tick)this.effects();else if(this.patternDelay)this.effects();else{for(n=this.track[this.trackPos]+this.patternPos;r;){if(e=r.channel,r.enabled=0,r.step||(e.period=r.period),l=this.patterns[n+r.index],r.step=l.step,r.effect=l.effect,r.param=l.param,l.sample?(u=r.sample=this.samples[l.sample],r.pointer=u.pointer,r.length=u.length,r.loopPtr=r.funkWave=u.loopPtr,r.repeat=u.repeat,r.finetune=u.finetune,e.volume=r.volume=u.volume):u=r.sample,l.note)if((r.step&4080)===3664)r.finetune=(r.param&15)*37;else if(r.effect===3||r.effect===5)if(l.note===r.period)r.portaPeriod=0;else{for(i=r.finetune,a=i+37;i<a&&!(l.note>=Me[i]);++i);i===a&&a--,i>0&&(a=r.finetune/37>>0&8,a&&i--),r.portaPeriod=Me[i],r.portaDir=l.note>r.portaPeriod?0:1}else r.effect===9&&this.moreEffects(r);else{this.moreEffects(r),r=r.next;continue}for(i=0;i<37&&!(l.note>=Me[i]);++i);if(r.period=Me[r.finetune+i],(r.step&4080)===3792){r.funkSpeed&&this.updateFunk(r),this.extended(r),r=r.next;continue}r.vibratoWave<4&&(r.vibratoPos=0),r.tremoloWave<4&&(r.tremoloPos=0),e.enabled=0,e.pointer=r.pointer,e.length=r.length,e.period=r.period,r.enabled=1,this.moreEffects(r),r=r.next}for(r=this.voices[0];r;)e=r.channel,r.enabled&&(e.enabled=1),e.pointer=r.loopPtr,e.length=r.repeat,r=r.next}++this.tick===this.speed&&(this.tick=0,this.patternPos+=4,this.patternDelay&&--this.patternDelay&&(this.patternPos-=4),this.patternBreak&&(this.patternBreak=0,this.patternPos=this.breakPos,this.breakPos=0),(this.patternPos===256||this.jumpFlag)&&(this.patternPos=this.breakPos,this.breakPos=0,this.jumpFlag=0,++this.trackPos===this.length&&(this.trackPos=0,this.mixer.complete=1)))}},effects:{value:function(){for(var e,i,n,l,u,a=this.voices[0],r;a;){if(e=a.channel,a.funkSpeed&&this.updateFunk(a),(a.step&4095)===0){e.period=a.period,a=a.next;continue}switch(a.effect){case 0:if(u=this.tick%3,!u){e.period=a.period,a=a.next;continue}for(u===1?u=a.param>>4:u=a.param&15,i=a.finetune,n=i+37;i<n;++i)if(a.period>=Me[i]){e.period=Me[i+u];break}break;case 1:a.period-=a.param,a.period<113&&(a.period=113),e.period=a.period;break;case 2:a.period+=a.param,a.period>856&&(a.period=856),e.period=a.period;break;case 3:case 5:if(a.effect===5?l=1:(a.portaSpeed=a.param,a.param=0),a.portaPeriod)if(a.portaDir?(a.period-=a.portaSpeed,a.period<=a.portaPeriod&&(a.period=a.portaPeriod,a.portaPeriod=0)):(a.period+=a.portaSpeed,a.period>=a.portaPeriod&&(a.period=a.portaPeriod,a.portaPeriod=0)),a.glissando){for(i=a.finetune,u=i+37;i<u&&!(a.period>=Me[i]);++i);i===u&&i--,e.period=Me[i]}else e.period=a.period;break;case 4:case 6:a.effect===6?l=1:a.param&&(u=a.param&15,u&&(a.vibratoParam=a.vibratoParam&240|u),u=a.param&240,u&&(a.vibratoParam=a.vibratoParam&15|u)),n=a.vibratoPos>>2&31,r=a.vibratoWave&3,r?(u=255,n<<=3,r===1&&(a.vibratoPos>127?u-=n:u=n)):u=rr[n],u=(a.vibratoParam&15)*u>>this.vibratoDepth,a.vibratoPos>127?e.period=a.period-u:e.period=a.period+u,u=a.vibratoParam>>2&60,a.vibratoPos=a.vibratoPos+u&255;break;case 7:e.period=a.period,a.param&&(u=a.param&15,u&&(a.tremoloParam=a.tremoloParam&240|u),u=a.param&240,u&&(a.tremoloParam=a.tremoloParam&15|u)),n=a.tremoloPos>>2&31,r=a.tremoloWave&3,r?(u=255,n<<=3,r===1&&(a.tremoloPos>127?u-=n:u=n)):u=rr[n],u=(a.tremoloParam&15)*u>>6,a.tremoloPos>127?e.volume=a.volume-u:e.volume=a.volume+u,u=a.tremoloParam>>2&60,a.tremoloPos=a.tremoloPos+u&255;break;case 10:l=1;break;case 14:this.extended(a);break;default:break}l&&(l=0,u=a.param>>4,u?a.volume+=u:a.volume-=a.param&15,a.volume<0?a.volume=0:a.volume>64&&(a.volume=64),e.volume=a.volume),a=a.next}}},moreEffects:{value:function(e){var i=e.channel,n;switch(e.funkSpeed&&this.updateFunk(e),e.effect){case 9:e.param&&(e.offset=e.param),n=e.offset<<8,n>=e.length?e.length=2:(e.pointer+=n,e.length-=n);break;case 11:this.trackPos=e.param-1,this.breakPos=0,this.jumpFlag=1;break;case 12:e.volume=e.param,e.volume>64&&(e.volume=64),i.volume=e.volume;break;case 13:this.breakPos=(e.param>>4)*10+(e.param&15),this.breakPos>63?this.breakPos=0:this.breakPos<<=2,this.jumpFlag=1;break;case 14:this.extended(e);break;case 15:if(!e.param)return;e.param<32?this.speed=e.param:this.mixer.samplesTick=this.sampleRate*2.5/e.param>>0,this.tick=0;break;default:break}}},extended:{value:function(e){var i=e.channel,n=e.param>>4,l,u,a,r=e.param&15;switch(n){case 0:this.mixer.filter.active=r;break;case 1:if(this.tick)return;e.period-=r,e.period<113&&(e.period=113),i.period=e.period;break;case 2:if(this.tick)return;e.period+=r,e.period>856&&(e.period=856),i.period=e.period;break;case 3:e.glissando=r;break;case 4:e.vibratoWave=r;break;case 5:e.finetune=r*37;break;case 6:if(this.tick)return;r?(e.loopCtr?e.loopCtr--:e.loopCtr=r,e.loopCtr&&(this.breakPos=e.loopPos<<2,this.patternBreak=1)):e.loopPos=this.patternPos>>2;break;case 7:e.tremoloWave=r;break;case 8:for(u=e.length-2,a=this.mixer.memory,l=e.loopPtr;l<u;)a[l]=(a[l]+a[++l])*.5;a[++l]=(a[l]+a[0])*.5;break;case 9:if(this.tick||!r||!e.period||this.tick%r)return;i.enabled=0,i.pointer=e.pointer,i.length=e.length,i.delay=30,i.enabled=1,i.pointer=e.loopPtr,i.length=e.repeat,i.period=e.period;break;case 10:if(this.tick)return;e.volume+=r,e.volume>64&&(e.volume=64),i.volume=e.volume;break;case 11:if(this.tick)return;e.volume-=r,e.volume<0&&(e.volume=0),i.volume=e.volume;break;case 12:this.tick===r&&(i.volume=e.volume=0);break;case 13:if(this.tick!==r||!e.period)return;i.enabled=0,i.pointer=e.pointer,i.length=e.length,i.delay=30,i.enabled=1,i.pointer=e.loopPtr,i.length=e.repeat,i.period=e.period;break;case 14:if(this.tick||this.patternDelay)return;this.patternDelay=++r;break;case 15:if(this.tick)return;e.funkSpeed=r,r&&this.updateFunk(e);break;default:break}}},updateFunk:{value:function(e){var i=e.channel,n,l,u=la[e.funkSpeed];e.funkPos+=u,!(e.funkPos<128)&&(e.funkPos=0,this.version===Kt?(n=e.pointer+e.sample.realLen-e.repeat,l=e.funkWave+e.repeat,l>n&&(l=e.loopPtr,i.length=e.repeat),i.pointer=e.funkWave=l):(n=e.loopPtr+e.repeat,l=e.funkWave+1,l>=n&&(l=e.loopPtr),this.mixer.memory[l]=-this.mixer.memory[l]))}}}),t.voices[0]=Yt(0),t.voices[0].next=t.voices[1]=Yt(1),t.voices[1].next=t.voices[2]=Yt(2),t.voices[2].next=t.voices[3]=Yt(3),t.track=new Uint16Array(128),Object.seal(t)}var Kt=1,ir=2,vi=3,Me=[856,808,762,720,678,640,604,570,538,508,480,453,428,404,381,360,339,320,302,285,269,254,240,226,214,202,190,180,170,160,151,143,135,127,120,113,0,850,802,757,715,674,637,601,567,535,505,477,450,425,401,379,357,337,318,300,284,268,253,239,225,213,201,189,179,169,159,150,142,134,126,119,113,0,844,796,752,709,670,632,597,563,532,502,474,447,422,398,376,355,335,316,298,282,266,251,237,224,211,199,188,177,167,158,149,141,133,125,118,112,0,838,791,746,704,665,628,592,559,528,498,470,444,419,395,373,352,332,314,296,280,264,249,235,222,209,198,187,176,166,157,148,140,132,125,118,111,0,832,785,741,699,660,623,588,555,524,495,467,441,416,392,370,350,330,312,294,278,262,247,233,220,208,196,185,175,165,156,147,139,131,124,117,110,0,826,779,736,694,655,619,584,551,520,491,463,437,413,390,368,347,328,309,292,276,260,245,232,219,206,195,184,174,164,155,146,138,130,123,116,109,0,820,774,730,689,651,614,580,547,516,487,460,434,410,387,365,345,325,307,290,274,258,244,230,217,205,193,183,172,163,154,145,137,129,122,115,109,0,814,768,725,684,646,610,575,543,513,484,457,431,407,384,363,342,323,305,288,272,256,242,228,216,204,192,181,171,161,152,144,136,128,121,114,108,0,907,856,808,762,720,678,640,604,570,538,508,480,453,428,404,381,360,339,320,302,285,269,254,240,226,214,202,190,180,170,160,151,143,135,127,120,0,900,850,802,757,715,675,636,601,567,535,505,477,450,425,401,379,357,337,318,300,284,268,253,238,225,212,200,189,179,169,159,150,142,134,126,119,0,894,844,796,752,709,670,632,597,563,532,502,474,447,422,398,376,355,335,316,298,282,266,251,237,223,211,199,188,177,167,158,149,141,133,125,118,0,887,838,791,746,704,665,628,592,559,528,498,470,444,419,395,373,352,332,314,296,280,264,249,235,222,209,198,187,176,166,157,148,140,132,125,118,0,881,832,785,741,699,660,623,588,555,524,494,467,441,416,392,370,350,330,312,294,278,262,247,233,220,208,196,185,175,165,156,147,139,131,123,117,0,875,826,779,736,694,655,619,584,551,520,491,463,437,413,390,368,347,328,309,292,276,260,245,232,219,206,195,184,174,164,155,146,138,130,123,116,0,868,820,774,730,689,651,614,580,547,516,487,460,434,410,387,365,345,325,307,290,274,258,244,230,217,205,193,183,172,163,154,145,137,129,122,115,0,862,814,768,725,684,646,610,575,543,513,484,457,431,407,384,363,342,323,305,288,272,256,242,228,216,203,192,181,171,161,152,144,136,128,121,114,0],rr=[0,24,49,74,97,120,141,161,180,197,212,224,235,244,250,253,255,253,250,244,235,224,212,197,180,161,141,120,97,74,49,24],la=[0,5,6,7,8,10,11,13,16,19,22,26,32,43,64,128],ar=sa;function ua(){var f=Object.create(null,{player:{value:null,writable:!0},index:{value:0,writable:!0},amiga:{value:null,writable:!0},mixer:{value:null,writable:!0},tracker:{get:function(){return this.player?or[this.index+this.player.version]:or[0]}},load:{value:function(t){var e,i;if(t.view||(t=fi(t)),t.endian=1,t.position=0,t.readUint()===67324752&&window.neoart.Unzip,!t)return null;if(this.player&&this.player.id!=="STPlayer"&&(this.player.load(t),this.player.version))return this.player;if(t.length>336&&(t.position=38,e=t.readString(20),(e==="FastTracker v2.00   "||e==="FastTracker v 2.00  "||e==="Sk@le Tracker"||e==="MadTracker 2.0"||e==="MilkyTracker        "||e==="DigiBooster Pro 2.18"||e.indexOf("OpenMPT")!==-1)&&(this.player=Ji(this.mixer),this.player.load(t),this.player.version)))return this.index=ba,this.player;if(t.endian=0,t.length>2105){if(t.position=1080,e=t.readString(4),e==="M.K."||e==="FLT4"){if(this.player=er(this.amiga),this.player.load(t),this.player.version)return this.index=ha,this.player}else if(e==="FEST"&&(this.player=window.neoart.HMPlayer(this.amiga),this.player.load(t),this.player.version))return this.index=da,this.player}return t.length>2105&&(t.position=1080,e=t.readString(4),(e==="M.K."||e==="M!K!")&&(this.player=ar(this.amiga),this.player.load(t),this.player.version))?(this.index=ca,this.player):t.length>5220&&(this.player=window.neoart.S1Player(this.amiga),this.player.load(t),this.player.version)?(this.index=pa,this.player):(t.position=0,i=t.readUshort(),t.position=0,e=t.readString(4),(e==="COSO"||i===24576||i===24578||i===24590||i===24598)&&(this.player=window.neoart.JHPlayer(this.amiga),this.player.load(t),this.player.version)?(this.index=va,this.player):(t.position=0,i=t.readUshort(),this.player=window.neoart.DWPlayer(this.amiga),this.player.load(t),this.player.version?(this.index=ma,this.player):(t.position=0,i=t.readUshort(),i===24576&&(this.player=window.neoart.RHPlayer(this.amiga),this.player.load(t),this.player.version)?(this.index=ga,this.player):t.length>1625&&(this.player=window.neoart.STPlayer(this.amiga),this.player.load(t),this.player.version)?(this.index=fa,this.player):(t.clear(),this.index=0,this.player=null))))}}});return f.amiga=hi(),Object.seal(f)}var fa=0,ha=4,ca=9,da=12,pa=26,ma=28,va=30,ga=32,ba=33,or=["Unknown Format","Ultimate SoundTracker","D.O.C. SoundTracker 9","Master SoundTracker","D.O.C. SoundTracker 2.0/2.2","SoundTracker 2.3","SoundTracker 2.4","NoiseTracker 1.0","NoiseTracker 1.1","NoiseTracker 2.0","ProTracker 1.0","ProTracker 1.1/2.1","ProTracker 1.2/2.0","His Master's NoiseTracker","SoundFX 1.0/1.7","SoundFX 1.8","SoundFX 1.945","SoundFX 1.994/2.0","BP SoundMon V1","BP SoundMon V2","BP SoundMon V3","Delta Music 1.0","Delta Music 2.0","Digital Mugician","Digital Mugician 7 Voices","Future Composer 1.0/1.3","Future Composer 1.4","SidMon 1.0","SidMon 2.0","David Whittaker","FredEd","Jochen Hippel","Jochen Hippel COSO","Rob Hubbard","FastTracker II","Sk@leTracker","MadTracker 2.0","MilkyTracker","DigiBooster Pro 2.18","OpenMPT"],xa=ua(),nr=xa;var Jt=class{constructor(t={}){this.baseRawUrl="https://raw.githubusercontent.com/michioxd/keygen-music/master/",this.indexUrl=this.baseRawUrl+"index.json",this.trackList=[],this.history=[],this.maxHistory=50,this.historyCursor=-1,this.currentPlayer=null,this.isPlaying=!1,this.pollInterval=null,this._opId=0,this.onTrackChange=t.onTrackChange||(()=>{}),this.onError=t.onError||(()=>{}),this.hasFetchedIndex=!1,this.currentTrack=null}async init(){if(!this.hasFetchedIndex)try{let t=await fetch(this.indexUrl);if(!t.ok)throw new Error("Network response was not ok");let e=await t.json(),i=["xm","mod","s3m","it"];this.trackList=e.filter(n=>n.fileExtension&&i.includes(n.fileExtension.toLowerCase())),this.hasFetchedIndex=!0}catch(t){throw console.warn("Jukebox offline or failed to fetch index:",t),this.trackList=[],this.onError("NO INTERNET OR BLOCKED ... TRY AGAIN?"),t}}async playNext(t=null){let e=++this._opId;this.stop();try{if(!this.hasFetchedIndex&&(await this.init(),e!==this._opId))return;if(this.trackList.length===0){console.warn("No tracks available in Jukebox.");return}let i=null;if(t&&typeof t=="object"){let{title:n,trackTitle:l,artist:u}=t,a=this.trackList.filter(r=>{let c=!u||r.artist&&r.artist.toLowerCase()===u.toLowerCase(),h=!n||r.title&&r.title.toLowerCase()===n.toLowerCase(),o=!l||r.trackTitle&&r.trackTitle.toLowerCase()===l.toLowerCase();return c&&h&&o});a.length===0?console.warn("Jukebox: NO matches found for target object:",t):a.length>1&&console.warn(`Jukebox: ${a.length} matches found. Refine your search!`,a),i=a[0]||null}else if(t&&typeof t=="string"){let n=this.trackList.filter(l=>l.title&&l.title.toLowerCase()===t.toLowerCase());n.length===0?console.warn("Jukebox: NO matches found for target title string:",t):n.length>1&&console.warn(`Jukebox: ${n.length} matches found for title string.`,n),i=n[0]||null}if(!i&&!t&&this.historyCursor<this.history.length-1)this.historyCursor++,i=this.trackList[this.history[this.historyCursor]];else if(!i){let n=this.trackList.filter((a,r)=>!this.history.includes(r));n.length===0&&(this.history=[],this.historyCursor=-1);let l=n.length>0?n:this.trackList;i=l[Math.floor(Math.random()*l.length)];let u=this.trackList.indexOf(i);this.historyCursor<this.history.length-1&&(this.history=this.history.slice(0,this.historyCursor+1)),this.history.push(u),this.history.length>this.maxHistory&&this.history.shift(),this.historyCursor=this.history.length-1}await this._playTrack(i,e)}catch(i){console.warn("Jukebox track fetch failed:",i),this.onError("NO INTERNET OR BLOCKED ... TRY AGAIN?")}}async playPrevious(){if(this.historyCursor>0){let t=++this._opId;this.stop(),this.historyCursor--;let e=this.trackList[this.history[this.historyCursor]];try{await this._playTrack(e,t)}catch(i){console.warn("Jukebox track fetch failed:",i),this.onError("NO INTERNET OR BLOCKED ... TRY AGAIN?")}}}async _playTrack(t,e){let i=t.path.split("/").map(r=>encodeURIComponent(r)).join("/"),n=this.baseRawUrl+i,l=await fetch(n);if(!l.ok)throw new Error("Failed to fetch audio file");if(e!==this._opId)return;let u=await l.arrayBuffer();if(e!==this._opId)return;let a=null;try{a=nr.load(u)}catch(r){console.warn("Jukebox: unsupported format for track, skipping:",t.title,r.message),e===this._opId&&setTimeout(()=>this.playNext(),100);return}e===this._opId&&(this.currentPlayer=a,this.currentPlayer?(this.currentTrack=t,typeof this.currentPlayer.loopSong<"u"&&(this.currentPlayer.loopSong=1),this.currentPlayer.play(),this.isPlaying=!0,this.onTrackChange(t),this.setupCompletionPolling()):setTimeout(()=>this.playNext(),100))}setupCompletionPolling(){this.pollInterval&&clearInterval(this.pollInterval);let t=Date.now();this.pollInterval=setInterval(()=>{if(!this.currentPlayer)return this.stopPolling();let e=!1;this.currentPlayer.amiga&&this.currentPlayer.amiga.playing===!1&&(e=!0),this.currentPlayer.mixer&&this.currentPlayer.mixer.playing===!1&&(e=!0),this.currentPlayer.stopped&&(e=!0),this.currentPlayer.playing===!1&&(e=!0),e&&this.playNext()},1e3)}stopPolling(){this.pollInterval&&(clearInterval(this.pollInterval),this.pollInterval=null)}stop(){if(this.stopPolling(),this.isPlaying=!1,this.currentPlayer){try{this.currentPlayer.stop()}catch{}this.currentPlayer=null}}};var sr=`:root {
    --afx-bg-color: rgba(10, 10, 15, 0.25);
    --afx-text-color: #f0f0f0;
    --afx-accent: #ff00ff;
    --tuner-height: 100dvh;
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
    height: var(--tuner-height) !important;
    min-height: var(--tuner-height) !important;
    overflow: hidden !important;
    background-color: var(--afx-body-bg, #000) !important;
    color: var(--afx-body-color, #fff) !important;
    position: relative !important;
}

.card {
    margin: 0 !important;
    padding: 0;
    width: 100% !important;
    height: var(--tuner-height) !important;
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
    height: var(--tuner-height);
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
    height: var(--tuner-height);
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
#afx-controls-dock {
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
.afx-agreed-state #afx-controls-dock {
    display: flex !important;
}

/* Navigation buttons (top corners) */
#afx-btn-back,
#afx-btn-skip {
    pointer-events: auto !important;
    position: fixed !important;
    z-index: 10001 !important;
}

/* Precise Pinned Positioning */
#afx-btn-back {
    top: 20px;
    left: 20px;
}

#afx-btn-skip {
    top: 20px;
    right: 20px;
}

#afx-controls-dock {
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
    #afx-btn-back {
        top: calc(10px + env(safe-area-inset-top)) !important;
        left: calc(10px + env(safe-area-inset-left)) !important;
    }

    #afx-btn-skip {
        top: calc(10px + env(safe-area-inset-top)) !important;
        right: calc(10px + env(safe-area-inset-right)) !important;
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
    height: 75dvh;
    max-height: 90vh;
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
#afx-effect-selector,
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
    /* Disclaimer button stays slightly bigger */
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

#afx-effect-selector,
.afx-sub-picker {
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
}

#afx-effect-selector option,
.afx-sub-picker option {
    background: #1a1a1a !important;
    color: #ffffff !important;
    padding: 12px !important;
    font-family: 'Courier New', monospace !important;
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

#afx-tuner-ui {
    position: relative;
    z-index: 99999;
    background: rgba(10, 10, 15, 0.95);
    border: 1px solid var(--afx-accent);
    padding: 15px;
    border-radius: 15px;
    font-family: 'Courier New', monospace;
    color: white;
    display: none !important;
    width: 240px;
    box-shadow: 0 0 30px rgba(255, 0, 255, 0.2);
    pointer-events: auto !important;
    box-sizing: border-box;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

/* Only show tuner when BOTH active (debug effect selected) AND agreed (disclaimer accepted) */
html.afx-agreed #afx-tuner-ui.active {
    display: flex !important;
}

#afx-tuner-ui input {
    width: 100%;
    margin: 12px 0;
    accent-color: var(--afx-accent);
}

#afx-tuner-ui .val {
    font-weight: bold;
    color: var(--afx-accent);
}

#afx-tuner-ui .stat {
    font-size: 10px;
    opacity: 0.7;
    margin-top: 4px;
    display: block;
}`;var V=class f{static init(t={}){console.log("AnkiFX: Initialized.");let e={deckTitle:"AnkiFX Deck",deckAuthor:"Anonymous",termsText:"No terms provided.",sources:[],marquee:"ANKIFX ENGINE INITIALIZED ...",defaultEffect:"geometry",debug:!1,countdown:30,marqueePosition:"top",...window.AnkiFX_Config||{},...t};Array.isArray(e.sources)||(e.sources=[]);let i=parseInt(e.countdown,10);e.countdown=isNaN(i)?30:Math.max(0,i),e.isConfigFileError=typeof e.termsText!="string"||e.termsText.trim()===""||e.termsText==="No terms provided.";let n=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);if(document.getElementById("ankifx-overlay")&&document.getElementById("ankifx-overlay").classList.contains("afx-agreed-state")){let d=document.getElementById("qa");d&&(d.style.position="relative",d.style.zIndex="10"),this.sharedGL||(this.sharedGL=document.getElementById("afx-shared-gl")),this.shared2D||(this.shared2D=document.getElementById("afx-shared-2d")),this.sharedMarquee||(this.sharedMarquee=document.getElementById("afx-shared-marquee")),this.sharedGL&&!this.glContext&&(this.glContext=this.sharedGL.getContext("webgl",{alpha:!1,antialias:!1})),this.shared2D&&!this.ctx2D&&(this.ctx2D=this.shared2D.getContext("2d")),this.sharedMarquee&&!this.ctxMarquee&&(this.ctxMarquee=this.sharedMarquee.getContext("2d"));let b=document.getElementById("ankifx-background");if(b){let s=b.getBoundingClientRect();this.width=s.width;let v=getComputedStyle(document.documentElement),p=parseInt(v.getPropertyValue("--io-header"))||0;this.height=document.documentElement.clientHeight+p,this.dpr=Math.min(window.devicePixelRatio||1,2)}if(!this.currentEffectId){let s=Array.from(document.documentElement.classList).find(v=>v.startsWith("afx-effect-"));s&&(this.currentEffectId=s.replace("afx-effect-",""))}this.defaultMarqueeText=e.marquee,this.marquee&&(this.marquee.setText(e.marquee),this.marquee.setPosition(e.marqueePosition));let m=document.getElementById("afx-deck-title");m&&(m.textContent=e.deckTitle);return}document.documentElement.classList.remove("afx-scroll-lock"),document.documentElement.classList.remove("afx-agreed"),["ankifx-overlay","ankifx-background","afx-tuner-ui","afx-btn-back","afx-btn-skip"].forEach(o=>{let d=document.getElementById(o);d&&d.remove()}),this.defaultMarqueeText=e.marquee,this.EFFECT_SONG_MAP={},Object.entries(ie).forEach(([o,d])=>{d&&d.preferredTrack&&(this.EFFECT_SONG_MAP[o]=d.preferredTrack)}),this.injectCSS();let l=window.AnkiFX_Config?.defaultEffect,u;l?(u=l,localStorage.setItem("ankifx_preferred_effect",u)):u=localStorage.getItem("ankifx_preferred_effect")||e.defaultEffect||"geometry",ie[u]||(console.warn(`AnkiFX: Stale or invalid activeEffect "${u}" detected. Falling back to default.`),u=e.defaultEffect||"geometry",ie[u]||(u=Object.keys(ie)[0]||"geometry"),localStorage.setItem("ankifx_preferred_effect",u));let{overlay:a,background:r}=this.injectUI(e,n,u),c=document.getElementById("afx-controls-dock");c&&(this.dockObserver=new ResizeObserver(()=>{let o=c.getBoundingClientRect();document.documentElement.style.setProperty("--afx-dock-height",`${o.height}px`)}),this.dockObserver.observe(c)),this.initTuner(e.debug,u),this._layoutHandler&&(window.removeEventListener("orientationchange",this._layoutHandler),window.removeEventListener("resize",this._layoutHandler)),this._resizeTimeout&&clearTimeout(this._resizeTimeout),this._resizeInterval&&clearInterval(this._resizeInterval),this._layoutHandler=()=>{this._resizeTimeout&&clearTimeout(this._resizeTimeout),this._resizeInterval&&clearInterval(this._resizeInterval),this.handleResize(),this.updateTuner(),this._resizeTimeout=setTimeout(()=>{this.handleResize(),this.updateTuner()},100);let o=0,d=this.width,b=this.height,m=getComputedStyle(document.documentElement),s=parseInt(m.getPropertyValue("--io-header"))||0;this._resizeInterval=setInterval(()=>{if(o+=100,o>=1500){clearInterval(this._resizeInterval);return}let v=getComputedStyle(document.documentElement),p=parseInt(v.getPropertyValue("--io-header"))||0,x=document.getElementById("ankifx-background"),w=x?x.getBoundingClientRect():null,E=w?w.width:window.innerWidth,g=w?w.height:window.innerHeight;(E!==d||g!==b||p!==s)&&(d=E,b=g,s=p,this.tunerAutoUpdate&&(this.tunerOffset=0),this.handleResize(),this.updateTuner())},100)},window.addEventListener("orientationchange",this._layoutHandler),window.addEventListener("resize",this._layoutHandler),this.handleResize(),this.marquee?(this.marquee.setText(e.marquee),this.marquee.setPosition(e.marqueePosition)):(this.marquee=new qt(e.marquee,e.marqueePosition),this.startMarqueeLoop()),this.startEffect(e,r,e.marqueePosition,u);let h=localStorage.getItem("ankifx_marquee_enabled")!=="false";this.marquee&&(this.marquee.enabled=h),f.observer||(f.observer=new MutationObserver(()=>{setTimeout(()=>{let o=document.getElementById("qa");o&&o.querySelector(".ankifx-card")||f.destroy()},20)}),f.observer.observe(document.documentElement,{childList:!0,subtree:!0}))}static injectCSS(){if(document.getElementById("ankifx-styles"))return;let t=document.createElement("style");t.id="ankifx-styles",t.textContent=sr,document.head.appendChild(t)}static initTuner(t,e){let i=localStorage.getItem("ankifx_tuner_offset"),n=getComputedStyle(document.documentElement),l=parseInt(n.getPropertyValue("--io-header"))||0,u=i!==null?parseInt(i):0;if(this.tunerOffset=u,this.tunerAutoUpdate=i===null,t&&!document.getElementById("afx-tuner-ui")){let o=document.createElement("div");o.id="afx-tuner-ui",e==="debug"&&o.classList.add("active"),o.innerHTML=`
                <div style="font-weight: bold; color: #ff00ff; margin-bottom: 5px;">VIEWPORT TUNER</div>
                <input type="range" id="afx-tuner-range" min="-300" max="300" value="${u}">
                <div style="margin: 5px 0 10px;">OFFSET: <span id="afx-tuner-offset-val" class="val">0</span>px</div>
                <div style="font-size: 10px; opacity: 0.7; margin-bottom: 5px; line-height: 1.4;">
                    IO-HEADER: <span id="afx-tuner-header-val">0</span>px<br>
                    TOTAL ADJ: <span id="afx-tuner-total-val" class="val">0</span>px
                </div>
            `;let d=document.querySelector("#afx-controls-dock .afx-control-group-right"),b=document.getElementById("afx-effect-selector-container");d?b?d.insertBefore(o,b):d.appendChild(o):document.body.appendChild(o),["touchstart","touchend","mousedown","mouseup","pointerdown","pointerup","click"].forEach(s=>{o.addEventListener(s,v=>v.stopPropagation(),{passive:!1})});let m=document.getElementById("afx-tuner-range");m.oninput=()=>{this.tunerAutoUpdate=!1,this.tunerOffset=parseInt(m.value),localStorage.setItem("ankifx_tuner_offset",m.value),this.updateTuner()}}this.updateTuner();let a=l,r=window.innerHeight,c=document.documentElement.clientHeight,h=setInterval(()=>{let o=getComputedStyle(document.documentElement),d=parseInt(o.getPropertyValue("--io-header"))||0,b=window.innerHeight,m=document.documentElement.clientHeight;if(d!==a||b!==r||m!==c){if(a=d,r=b,c=m,this.tunerAutoUpdate){this.tunerOffset=0;let s=document.getElementById("afx-tuner-range");s&&(s.value=0)}this.updateTuner()}},50);setTimeout(()=>{clearInterval(h)},2e3)}static updateTuner(){let t=localStorage.getItem("ankifx_tuner_offset"),e=getComputedStyle(document.documentElement),i=parseInt(e.getPropertyValue("--io-header"))||0,n=this.tunerOffset!==void 0?this.tunerOffset:t!==null?parseInt(t):0,l=n+i,u=document.getElementById("afx-tuner-offset-val"),a=document.getElementById("afx-tuner-header-val"),r=document.getElementById("afx-tuner-total-val"),c=document.getElementById("afx-tuner-range");c&&(c.value=n),u&&(u.innerText=n>=0?`+${n}`:n),a&&(a.innerText=i),r&&(r.innerText=l>=0?`+${l}`:l),document.documentElement.style.setProperty("--tuner-height",`calc(100dvh + ${l}px)`);let h=window.innerHeight,o=document.documentElement.clientHeight,d=Math.max(0,h-o);if(document.documentElement.style.setProperty("--afx-bottom-offset",`${d}px`),this.handleResize(),this.currentEffectId&&ie[this.currentEffectId]?.onResize){let b=Math.min(window.devicePixelRatio||1,1.5),m=this.currentEffectId==="mandelbrot"||this.currentEffectId==="julia"?b:this.dpr;ie[this.currentEffectId].onResize(this.width,this.height,m)}}static handleResize(){let t=document.getElementById("ankifx-background");if(!t||!this.sharedGL||!this.shared2D||!this.sharedMarquee)return;let e=t.getBoundingClientRect();this.width=e.width;let i=getComputedStyle(document.documentElement),n=parseInt(i.getPropertyValue("--io-header"))||0;this.height=document.documentElement.clientHeight+n,this.dpr=Math.min(window.devicePixelRatio||1,2);let l=Math.min(window.devicePixelRatio||1,1.5);if(this.sharedGL.width=this.width*l,this.sharedGL.height=this.height*l,this.sharedGL.style.width=this.width+"px",this.sharedGL.style.height=this.height+"px",this.shared2D.width=this.width*this.dpr,this.shared2D.height=this.height*this.dpr,this.shared2D.style.width=this.width+"px",this.shared2D.style.height=this.height+"px",this.sharedMarquee.width=this.width*this.dpr,this.sharedMarquee.height=this.height*this.dpr,this.sharedMarquee.style.width=this.width+"px",this.sharedMarquee.style.height=this.height+"px",this.glContext&&this.glContext.viewport(0,0,this.sharedGL.width,this.sharedGL.height),this.ctx2D&&(this.ctx2D.setTransform(1,0,0,1,0,0),this.ctx2D.scale(this.dpr,this.dpr)),this.ctxMarquee&&(this.ctxMarquee.setTransform(1,0,0,1,0,0),this.ctxMarquee.scale(this.dpr,this.dpr)),this.currentEffectId&&ie[this.currentEffectId]?.onResize){let u=this.currentEffectId==="mandelbrot"||this.currentEffectId==="julia"?l:this.dpr;ie[this.currentEffectId].onResize(this.width,this.height,u)}}static injectUI(t,e,i){let n=document.createElement("div");n.id="ankifx-overlay",t.debug&&n.classList.add("afx-debug-active");let l=window.innerWidth||document.documentElement.clientWidth||800,u=l<480?.65:l<768?.8:1,a=Math.max(55,Math.ceil(85*u));(/iPad|iPhone|iPod/.test(navigator.userAgent)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1)&&(t.marqueePosition==="top"?n.style.paddingTop=`calc(1rem + ${a}px)`:n.style.paddingBottom=`calc(1rem + ${a}px)`);let c=localStorage.getItem("ankifx_marquee_enabled")!=="false",h=ie.julia?.presets||[],o=l<480,d=o?"\u{1F4DC} ":"\u{1F4DC} TEXT: ",b=o?"":" BGM: ",m=o?d.trim():c?`${d}ON`:`${d}OFF`,s=o?"\u{1F507}":`\u{1F507}${b}OFF`,v=o?"\u{1F50A}":`\u{1F50A}${b}ON`,p=o?"\u{1F3A8} ":"[ Effect: ",x=o?"":" ]",w=Object.values(ie).filter(k=>k.id!=="debug"||t.debug).map(k=>`
                <option value="${k.id}" ${i===k.id?"selected":""}>
                    ${p}${k.name}${x}
                </option>
            `).join(""),E=`
            <div id="afx-controls-dock">
                <div class="afx-control-group-left">
                    <div class="afx-control-row">
                        <label class="afx-toggle"><input type="checkbox" id="afx-text-toggle" ${c?"checked":""}><span class="afx-slider"></span></label>
                        <span id="afx-text-status">${m}</span>
                    </div>
                    <div id="afx-bgm-container" class="afx-control-row">
                        <label class="afx-toggle"><input type="checkbox" id="afx-audio-toggle"><span class="afx-slider"></span></label>
                        <span id="afx-bgm-status">${s}</span>
                    </div>
                </div>
                <div class="afx-control-group-right">
                    <div id="afx-effect-controls-container"></div>
                    <div id="afx-effect-selector-container" class="afx-control-row afx-effect-selector-container" style="padding: 0;">
                        <select id="afx-effect-selector" class="afx-select">
                            ${w}
                        </select>
                    </div>
                </div>
            </div>
        `,g=!1;try{g=sessionStorage.getItem(`ankifx_agreed_${t.deckTitle}`)==="true"}catch{}let F=t.termsText&&t.termsText.trim()!==""&&!g,A="";if(F){let k=t.sources.map(C=>`<li>${C}</li>`).join("");A=`
                <div class="afx-dialog">
                    <div class="afx-terms">
                        <h3>${t.deckTitle}</h3>
                        ${t.deckAuthor?`<h4 style="margin: -10px 0 15px 0; opacity: 0.7; font-size: 0.9rem;">by ${t.deckAuthor}</h4>`:""}
                        <p>${t.termsText}</p>
                        ${t.sources&&t.sources.length>0?`
                            <p><strong>Sources:</strong></p>
                            <ul>${k}</ul>
                        `:""}
                    </div>
                    <div class="afx-action-row">
                        <button id="afx-consent-btn" class="afx-btn" disabled>I AGREE</button>
                    </div>
                </div>
            `}let S="";t.debug&&(S=`
                <div id="afx-global-fps" style="position: absolute; top: 10px; left: 10px; color: #0f0; font-family: monospace; font-size: 14px; font-weight: bold; text-shadow: 1px 1px 2px #000; z-index: 9999; pointer-events: none;">
                     FPS: --
                </div>
            `),n.innerHTML=A+S;let T=document.createElement("div");for(T.innerHTML=E;T.firstChild;)n.appendChild(T.firstChild);let P=document.createElement("div");P.id="ankifx-background",document.body.appendChild(P),this.sharedGL=document.createElement("canvas"),this.sharedGL.id="afx-shared-gl",this.sharedGL.style.cssText="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;",P.appendChild(this.sharedGL),this.shared2D=document.createElement("canvas"),this.shared2D.id="afx-shared-2d",this.shared2D.style.cssText="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;",P.appendChild(this.shared2D),this.sharedMarquee=document.createElement("canvas"),this.sharedMarquee.id="afx-shared-marquee",this.sharedMarquee.style.cssText="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 5;",P.appendChild(this.sharedMarquee),this.glContext=this.sharedGL.getContext("webgl",{alpha:!1,antialias:!1}),this.ctx2D=this.shared2D.getContext("2d"),this.ctxMarquee=this.sharedMarquee.getContext("2d"),document.body.appendChild(n);let M=document.createElement("button");M.id="afx-btn-back",M.className="afx-playback-btn",M.textContent="\u23EE\uFE0F";let L=document.createElement("button");L.id="afx-btn-skip",L.className="afx-playback-btn",L.textContent="\u23ED\uFE0F",n.appendChild(M),n.appendChild(L);let B=k=>{let C=n.classList.contains("afx-agreed-state"),z=k.target.closest("button, input, select, .afx-slider, .afx-toggle, .afx-playback-btn, select option");C?z&&k.stopPropagation():k.stopPropagation()};["touchstart","touchend","mousedown","mouseup","pointerdown","pointerup","click"].forEach(k=>{n.addEventListener(k,B,{passive:!1})});let R=document.getElementById("afx-consent-btn");if(F&&R){let k=t.countdown;if((t.debug||t.isConfigFileError)&&(k=0),k>0){R.textContent=`( ${k} )`;let C=setInterval(()=>{k--,R.textContent=`( ${k} )`,k<=0&&(clearInterval(C),R.textContent="I AGREE",R.disabled=!1)},1e3)}else R.textContent="I AGREE",R.disabled=!1;R.addEventListener("click",C=>{C.stopPropagation(),R.disabled||this.agree(n,t.deckTitle)})}else this.agree(n,t.deckTitle);let $=document.getElementById("afx-audio-toggle");if($){let k=document.getElementById("afx-bgm-status");$.checked&&n.classList.add("afx-music-playing"),f.jukebox=new Jt({onTrackChange:C=>{let z=`NOW PLAYING: ${C.artist} - ${C.title} - ${C.trackTitle}`;t.marquee=z,f.marquee&&f.marquee.setText(z)},onError:C=>{t.marquee=C,f.marquee&&f.marquee.setText(C)}}),$.addEventListener("change",C=>{if(C.target.checked){n.classList.add("afx-bgm-active"),n.classList.add("afx-music-playing"),k.innerHTML=o?"\u{1F50A}":"\u{1F50A} BGM: ON",k.style.color="#ff6b6b";let I=window.AudioContext||window.webkitAudioContext;I&&(window.neoart=window.neoart||{},window.neoart.audioContext||(window.neoart.audioContext=new I)),window.neoart.audioContext&&window.neoart.audioContext.state==="suspended"&&window.neoart.audioContext.resume();let q=localStorage.getItem("ankifx_preferred_effect")||t.defaultEffect||"geometry",W=t.trackTitle||f.EFFECT_SONG_MAP[q]||null;f.jukebox.playNext(W)}else n.classList.remove("afx-bgm-active"),n.classList.remove("afx-music-playing"),k.innerHTML=o?"\u{1F507}":"\u{1F507} BGM: OFF",k.style.color="#fff",f.jukebox.stop(),t.marquee=f.defaultMarqueeText,f.marquee&&f.marquee.setText(f.defaultMarqueeText)})}let G=document.getElementById("afx-text-toggle");if(G){let k=document.getElementById("afx-text-status");G.addEventListener("change",C=>{let z=C.target.checked;localStorage.setItem("ankifx_marquee_enabled",z);let I=o?"\u{1F4DC} ":"\u{1F4DC} TEXT: ";k.textContent=o?I.trim():z?`${I}ON`:`${I}OFF`,f.marquee&&(f.marquee.enabled=z)})}M.addEventListener("click",k=>{k.stopPropagation(),f.jukebox&&f.jukebox.playPrevious()}),L.addEventListener("click",k=>{k.stopPropagation(),f.jukebox&&f.jukebox.playNext()});let X=document.getElementById("afx-effect-selector");return X&&X.addEventListener("change",k=>{let C=k.target.value;localStorage.setItem("ankifx_preferred_effect",C),Object.values(ie).forEach(I=>I.stop()),this.ctx2D&&this.ctx2D.clearRect(0,0,this.width,this.height),this.glContext&&(this.glContext.clearColor(0,0,0,0),this.glContext.clear(this.glContext.COLOR_BUFFER_BIT)),t.defaultEffect=C;let z=document.getElementById("afx-tuner-ui");if(C==="debug"?(n.classList.add("afx-debug-active"),z&&z.classList.add("active")):(n.classList.remove("afx-debug-active"),z&&z.classList.remove("active")),f.startEffect(t,P,t.marqueePosition,C),f.jukebox&&f.jukebox.isPlaying){let I=t.trackTitle||f.EFFECT_SONG_MAP[C]||null,q=f.jukebox.currentTrack,W=!1;I&&(typeof I=="string"?W=!q||q.title.toLowerCase()!==I.toLowerCase():W=!q||I.title&&q.title.toLowerCase()!==I.title.toLowerCase()||I.trackTitle&&q.trackTitle.toLowerCase()!==I.trackTitle.toLowerCase()||I.artist&&(q.artist||"").toLowerCase()!==I.artist.toLowerCase()),W&&f.jukebox.playNext(I)}}),{overlay:n,background:P}}static startEffect(t,e,i,n){n==="debug"?e.classList.add("afx-debug-active"):e.classList.remove("afx-debug-active");let l=ie[n];if(l){let u=Math.min(window.devicePixelRatio||1,1.5),a=n==="mandelbrot"||n==="julia"?u:this.dpr,r=getComputedStyle(document.documentElement),c=parseInt(r.getPropertyValue("--io-header"))||0,h={gl:this.glContext,ctx2d:this.ctx2D,canvasGL:this.sharedGL,canvas2D:this.shared2D,width:this.width,height:this.height,dpr:a,topInset:c,visibleWidth:this.width,visibleHeight:this.height-c,visibleBounds:{top:c,bottom:this.height}};this.currentEffectId=n;let o=document.documentElement;Array.from(o.classList).forEach(b=>{b.startsWith("afx-effect-")&&o.classList.remove(b)}),o.classList.add(`afx-effect-${n}`),this.marquee&&this.marquee.updateStyles(l.marqueeFont||{}),l.run(h,t),this.renderEffectControls(l);let d=localStorage.getItem("ankifx_marquee_enabled")!=="false";this.marquee&&(this.marquee.enabled=d)}}static agree(t,e){if(t.classList.add("afx-agreed-state"),document.documentElement.classList.add("afx-agreed"),document.documentElement.classList.remove("afx-scroll-lock"),e)try{sessionStorage.setItem(`ankifx_agreed_${e}`,"true")}catch{}let i=document.getElementById("qa");i&&(i.style.position="relative",i.style.zIndex="10")}static destroy(){this.currentEffectId&&ie[this.currentEffectId]?.stop&&ie[this.currentEffectId].stop(),this.jukebox&&(this.jukebox.stop(),this.jukebox=null),this.marqueeInterval&&(cancelAnimationFrame(this.marqueeInterval),this.marqueeInterval=null),this.marquee&&(this.marquee=null),["ankifx-overlay","ankifx-background","afx-tuner-ui","afx-btn-back","afx-btn-skip","afx-controls-dock"].forEach(i=>{let n=document.getElementById(i);n&&n.remove()});let t=document.getElementById("ankifx-styles");t&&t.remove(),document.documentElement.style.removeProperty("--tuner-height"),document.documentElement.style.removeProperty("--afx-dock-height");let e=document.getElementById("qa");e&&(e.style.position="",e.style.zIndex=""),document.documentElement.classList.remove("afx-scroll-lock"),document.documentElement.classList.remove("afx-agreed"),Array.from(document.documentElement.classList).forEach(i=>{i.startsWith("afx-effect-")&&document.documentElement.classList.remove(i)}),window.AnkiFX_Config=null,this.observer&&(this.observer.disconnect(),this.observer=null),this.dockObserver&&(this.dockObserver.disconnect(),this.dockObserver=null),console.log("AnkiFX: Destroyed.")}static startMarqueeLoop(){if(this.marqueeInterval)return;let t=0,e=0,i=n=>{if(n===void 0&&(n=performance.now()),t||(t=n),e++,n-t>=1e3){let l=document.getElementById("afx-global-fps");l&&(l.textContent=`FPS: ${e} | Engine DPR: ${this.dpr}`),e=0,t=n}if(this.marquee&&this.ctxMarquee){if(this.ctxMarquee.clearRect(0,0,this.width,this.height),this.currentEffectId&&ie[this.currentEffectId]?.drawOverlay)try{ie[this.currentEffectId].drawOverlay(this.ctxMarquee,this.width,this.height,n)}catch(l){console.error("AnkiFX overlay error:",l)}this.marquee.render(this.ctxMarquee,this.width,this.height)}this.marqueeInterval=requestAnimationFrame(i)};this.marqueeInterval=requestAnimationFrame(i)}static renderEffectControls(t){let e=document.getElementById("afx-effect-controls-container");e&&(e.innerHTML="",!(!t||!t.controls||t.controls.length===0)&&t.controls.forEach(i=>{let n=document.createElement("div");if(n.className="afx-control-row",n.id=`afx-control-container-${i.id}`,i.type==="toggle")n.innerHTML=`
                    <label class="afx-toggle">
                        <input type="checkbox" id="afx-control-${i.id}" ${i.value?"checked":""}>
                        <span class="afx-slider"></span>
                    </label>
                    <span id="afx-control-label-${i.id}">${i.label}</span>
                `,n.querySelector("input").addEventListener("change",u=>{i.onChange&&i.onChange(u.target.checked)});else if(i.type==="slider"){n.classList.add("afx-slider-row");let l=i.step||1,u=l.toString().includes(".")?l.toString().split(".")[1].length:0;n.innerHTML=`
                    <span class="afx-slider-label">${i.label}:</span>
                    <input type="range" id="afx-control-${i.id}" class="afx-range-slider" min="${i.min}" max="${i.max}" step="${l}" value="${i.value}">
                    <span id="afx-control-val-${i.id}" class="afx-slider-val-text">${i.value.toFixed(u)}</span>
                `;let a=n.querySelector("input"),r=n.querySelector(".afx-slider-val-text");a.addEventListener("input",c=>{let h=parseFloat(c.target.value);r.innerText=h.toFixed(u),i.onChange&&i.onChange(h)})}else if(i.type==="button")n.style.padding="0",n.innerHTML=`
                    <button id="afx-control-${i.id}" class="afx-action-btn">
                        ${i.label}
                    </button>
                `,n.querySelector("button").addEventListener("click",u=>{u.stopPropagation(),i.onClick&&i.onClick()});else if(i.type==="select"){n.style.padding="0";let l=(i.options||[]).map(a=>{let r=typeof a=="object"?a.value:a,c=typeof a=="object"?a.text:a,h=r==i.value?"selected":"";return`<option value="${r}" ${h}>${c}</option>`}).join("");n.innerHTML=`
                    <select id="afx-control-${i.id}" class="afx-select">
                        ${l}
                    </select>
                `,n.querySelector("select").addEventListener("change",a=>{i.onChange&&i.onChange(a.target.value)})}e.appendChild(n)}))}static setControlValue(t,e){let i=document.getElementById(`afx-control-${t}`);i&&(i.type==="checkbox"?i.checked=!!e:i.value=e);let n=document.getElementById(`afx-control-val-${t}`);if(n){let l=i?i.step:"",u=l&&l.includes(".")?l.split(".")[1].length:0;n.innerText=typeof e=="number"?e.toFixed(u||(e%1===0?0:4)):e}}};V.marquee=null;V.jukebox=null;V.defaultMarqueeText=null;V.sharedGL=null;V.shared2D=null;V.sharedMarquee=null;V.glContext=null;V.ctx2D=null;V.ctxMarquee=null;V.currentEffectId=null;V.dpr=1;V.width=0;V.height=0;V.marqueeInterval=null;V._layoutHandler=null;V.observer=null;var Zt="local";try{let f=typeof __ankifx_script_src=="string"?__ankifx_script_src:"";if(!f){let e=(new Error().stack||"").match(/(https?:\/\/[^\s)\n:]+|file:\/\/[^\s)\n:]+)/g);if(e&&e.length>0){for(let i=0;i<e.length;i++)if(e[i].includes("ankifx")){f=e[i];break}}}f&&(f.includes("cdn.jsdelivr.net")||f.includes("github")||f.includes("rawgit")||f.includes("githack")?Zt="remote":Zt="local")}catch{Zt="detection-failed"}V.version="1.0.0-77de8d4";V.buildDate="6/2/2026, 12:11:40 PM";V.source=Zt;window.AnkiFX_Eval_History=window.AnkiFX_Eval_History||[];var lr=window.AnkiFX&&window.AnkiFX.source==="remote"&&V.source==="local";window.AnkiFX_Eval_History.push({source:V.source,version:V.version,buildDate:V.buildDate,time:new Date().toLocaleTimeString(),status:lr?"ignored (late local)":"active"});lr?console.warn(`[AnkiFX Loader] Late local engine evaluation ignored. A remote engine (Version: ${window.AnkiFX.version}) is already active.`):window.AnkiFX=V;})();
