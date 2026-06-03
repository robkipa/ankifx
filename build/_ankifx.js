var __ankifx_script_src=(document.currentScript&&document.currentScript.src)||"";
(()=>{var ti=[],Te=null,yi=60,wi=1.5,ki={id:"aurora",name:"Aurora",run:ma,stop:va,drawOverlay:ga,onResize:(f,t)=>{let e=getComputedStyle(document.documentElement),i=parseInt(e.getPropertyValue("--io-header"))||0,o=t-i;if(xe=f/8,be=o/8,Te){let l=yi/8,u=Math.ceil(xe/l),r=Math.ceil(be/(l*wi));Te.w=u,Te.h=r,Te.build()}Y&&(Y.style.width=xe+"px",Y.style.height=be+"px",Y.style.position="absolute",Y.style.top=i+"px",Y.style.left="0",Y.style.transform="scale(8)",Y.style.transformOrigin="top left")},marqueeFont:{color:"#E0FFFF",shadowColor:"rgba(0,128,128,0.8)",shadowBlur:10}},Ge=null,xe,be,Y=null,da=0,Ve=0,Ne={x:-1e3,y:-1e3},vt=class{constructor(t,e){this.x=t||0,this.y=e||0}setAngle(t){let e=this.getLength()||1;this.x=Math.cos(t)*e,this.y=Math.sin(t)*e}setLength(t){let e=Math.atan2(this.y,this.x);this.x=Math.cos(e)*t,this.y=Math.sin(e)*t}getLength(){return Math.sqrt(this.x*this.x+this.y*this.y)}addTo(t){this.x+=t.x,this.y+=t.y}},bi=(()=>{let f=new Uint8Array(512),t=new Uint8Array(256).map(()=>Math.random()*256);for(let o=0;o<512;o++)f[o]=t[o&255];let e=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]];function i(o,l,u,r){return o[0]*l+o[1]*u+o[2]*r}return{simplex3:(o,l,u)=>{let r,a,c,h,n=.3333333333333333,d=1/6,v=(o+l+u)*n,p=Math.floor(o+v),s=Math.floor(l+v),g=Math.floor(u+v),m=(p+s+g)*d,b=o-p+m,y=l-s+m,P=u-g+m,x,F,w,k,C,S;b>=y?y>=P?(x=1,F=0,w=0,k=1,C=1,S=0):b>=P?(x=1,F=0,w=0,k=1,C=0,S=1):(x=0,F=0,w=1,k=1,C=0,S=1):y<P?(x=0,F=0,w=1,k=0,C=1,S=1):b<P?(x=0,F=1,w=0,k=0,C=1,S=1):(x=0,F=1,w=0,k=1,C=1,S=0);let B=b-x+d,O=y-F+d,I=P-w+d,_=b-k+2*d,G=y-C+2*d,q=P-S+2*d,$=b-1+3*d,R=y-1+3*d,N=P-1+3*d,T=p&255,A=s&255,U=g&255,L=.6-b*b-y*y-P*P;L<0?r=0:(L*=L,r=L*L*i(e[f[T+f[A+f[U]]]%12],b,y,P));let K=.6-B*B-O*O-I*I;K<0?a=0:(K*=K,a=K*K*i(e[f[T+x+f[A+F+f[U+w]]]%12],B,O,I));let ae=.6-_*_-G*G-q*q;ae<0?c=0:(ae*=ae,c=ae*ae*i(e[f[T+k+f[A+C+f[U+S]]]%12],_,G,q));let fe=.6-$*$-R*R-N*N;return fe<0?h=0:(fe*=fe,h=fe*fe*i(e[f[T+1+f[A+1+f[U+1]]]%12],$,R,N)),32*(r+a+c+h)}}})(),ii=class{constructor(t,e,i={}){this.settings={frequency:.1,...i},this.w=t,this.h=e,this.time=0,this.build()}build(){this.cols=Math.ceil(this.w),this.rows=Math.ceil(this.h),this.field=new Array(this.cols);for(let t=0;t<this.cols;t++){this.field[t]=new Array(this.rows);for(let e=0;e<this.rows;e++)this.field[t][e]=new vt(0,0)}}update(t){this.time+=t;let e=this.time*this.settings.frequency/1e3;for(let i=0;i<this.field.length;i++)for(let o=0;o<this.field[i].length;o++){let l=bi.simplex3(i/20,o/20,e)*Math.PI*2,u=bi.simplex3(i/10+4e4,o/10+4e4,e);this.field[i][o].setAngle(l),this.field[i][o].setLength(u),typeof this.manipulateVector=="function"&&this.manipulateVector(this.field[i][o],i,o),typeof this.onDraw=="function"&&this.onDraw(this.field[i][o],i,o)}}};function pa(){ti=[];let f=150;for(let t=0;t<f;t++)ti.push({x:Math.random(),y:Math.random(),size:.5+Math.random()*1.3,opacity:.15+Math.random()*.75,blinkSpeed:.001+Math.random()*.002,blinkOffset:Math.random()*Math.PI*2})}function je(f){f.touches&&f.touches[0]?(Ne.x=f.touches[0].clientX,Ne.y=f.touches[0].clientY):(Ne.x=f.clientX,Ne.y=f.clientY)}function ma(f,t){let e=f.ctx2d;Y=f.canvas2D,Y.classList.add("afx-aurora-active");let i=f.topInset||0,o=f.visibleHeight||f.height;xe=f.width/8,be=o/8,Y.width=xe*f.dpr,Y.height=be*f.dpr,e.setTransform(1,0,0,1,0,0),e.scale(f.dpr,f.dpr),Y.style.width=xe+"px",Y.style.height=be+"px",Y.style.position="absolute",Y.style.top=i+"px",Y.style.left="0",Y.style.transform="scale(8)",Y.style.transformOrigin="top left",pa();let l=yi/8,u=Math.ceil(xe/l),r=Math.ceil(be/(l*wi));Te=new ii(u,r,{frequency:.1});let a={x:xe/u,y:be/r},c=255/r;Te.onDraw=(n,d,v)=>{let p=n.getLength()*Math.abs(n.x),s=n.getLength()*Math.abs(n.y),g=Math.round(-20*p+80*s+(50-.6*v*c)),m=Math.round(180*p+20*s-60+.4*v*c),b=Math.round(50*p+30*s+(40-.5*v*c)+.5*v*c);e.fillStyle=`rgba(${g}, ${m}, ${b}, 0.8)`,e.fillRect(d*a.x,v*a.y,a.x+.5,a.y+.5)},Te.manipulateVector=(n,d,v)=>{let p={x:d*a.x+.5*a.x,y:v*a.y+.5*a.y},s=Ne.x/8,g=Ne.y/8,m=new vt((s-p.x)/xe,(g-p.y)/be);n.addTo(m),n.getLength()>1&&n.setLength(1)},da=0,Ve=0,window.addEventListener("mousemove",je),window.addEventListener("touchstart",je),window.addEventListener("touchmove",je);function h(n){Ve||(Ve=n);let d=n-Ve;Ve=n,e.fillStyle="#020b1a",e.fillRect(0,0,xe,be),Te.update(d),Ge=requestAnimationFrame(h)}Ge=requestAnimationFrame(h)}function ga(f,t,e,i){let o=getComputedStyle(document.documentElement),l=parseInt(o.getPropertyValue("--io-header"))||0,u=e-l;f.fillStyle="#ffffff",ti.forEach(r=>{let a=(Math.sin(i*r.blinkSpeed+r.blinkOffset)+1)/2;f.globalAlpha=r.opacity*a,f.beginPath();let c=l+r.y*u;f.arc(r.x*t,c,r.size,0,Math.PI*2),f.fill()}),f.globalAlpha=1}function va(){Ge&&(cancelAnimationFrame(Ge),Ge=null),window.removeEventListener("mousemove",je),window.removeEventListener("touchstart",je),window.removeEventListener("touchmove",je),Y&&(Y.classList.remove("afx-aurora-active"),Y.style.cssText="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;",Y=null);let f=window.AnkiFX;f&&typeof f.handleResize=="function"&&f.handleResize()}var xt=null,le,pe,Si={id:"debug",name:"DEBUG",run:xa,stop:ba,onResize:(f,t)=>{le=f,pe=t},marqueeFont:{color:"#00ff00",shadowColor:"rgba(0,0,0,0.8)",shadowBlur:5}};function xa(f,t){let e=f.ctx2d;le=f.width,pe=f.height;let i=f.dpr||1,o=0,l=0,u=0;function r(a){a===void 0&&(a=performance.now()),o||(o=a),l++,a-o>=1e3&&(u=l,l=0,o=a),e.fillStyle="#000",e.fillRect(0,0,le,pe),e.fillStyle="#fff",e.font="bold 13px monospace",[`FPS: ${u}`,`window: ${window.innerWidth}x${window.innerHeight}`,`screen: ${screen.width}x${screen.height}`,`dpr (native): ${window.devicePixelRatio}`,`dpr (engine): ${i}`,`doc: ${document.documentElement.clientWidth}x${document.documentElement.clientHeight}`,`orient: ${window.orientation||"N/A"}`].forEach((R,N)=>{e.fillText(R,20,60+N*18)}),e.fillStyle="#ff55ff",e.font="bold 13px monospace",e.fillText("--- TUNER & LAYOUT METRICS ---",360,60),e.fillStyle="#fff",e.font="12px monospace";let h=getComputedStyle(document.documentElement),n=h.getPropertyValue("--io-header")||"N/A",d=h.getPropertyValue("--tuner-height")||"N/A",v=document.documentElement.style.getPropertyValue("--tuner-height")||"N/A",p=window.AnkiFX?window.AnkiFX.tunerOffset:"N/A",s=window.AnkiFX?window.AnkiFX.tunerAutoUpdate:"N/A",g=document.getElementById("ankifx-background"),m=g?g.getBoundingClientRect().height:"N/A",b=g?g.getBoundingClientRect().width:"N/A",y=document.getElementById("ankifx-overlay"),P=y?y.getBoundingClientRect().height:"N/A",x=document.getElementById("qa"),F=x?x.getBoundingClientRect().height:"N/A",w=document.querySelector(".card"),k=w?w.getBoundingClientRect().height:"N/A",C=window.innerWidth>window.innerHeight,S=h.getPropertyValue("--top-inset")||"N/A",B=h.getPropertyValue("--bottom-inset")||"N/A",O=h.getPropertyValue("--afx-bottom-offset")||"N/A",I=parseInt(h.getPropertyValue("--io-header"))||0,_=document.documentElement.clientHeight+I;[`--io-header:           ${n}`,`--top-inset:           ${S}`,`--bottom-inset:        ${B}`,`--tuner-height (comp): ${d}`,`--tuner-height (in):   ${v}`,`tunerOffset:           ${p}`,`tunerAutoUpdate:       ${s}`,`isLandscape:           ${C}`,`--afx-bottom-offset:   ${O}`,`bg-size:               ${b}x${m}`,`overlay-h:             ${P}`,`qa-h:                  ${F}`,`card-h:                ${k}`,`visibleBounds:         0 to ${_}px`].forEach((R,N)=>{e.fillText(R,360,80+N*16)}),e.fillStyle="#0f0",e.font="bold 13px monospace",e.fillText("--- AnkiFX DIAGNOSTICS ---",20,195),e.fillStyle="#fff",e.font="12px monospace",e.fillText(`Version:  ${window.AnkiFX?.version||"1.0.0-dev"}`,20,215),e.fillText(`Source:   ${window.AnkiFX?.source||"unknown"}`,20,230),e.fillText(`Built:    ${window.AnkiFX?.buildDate||"development"}`,20,245),e.fillStyle="#0ff",e.font="bold 13px monospace",e.fillText("--- ENGINE EVALUATION HISTORY ---",20,265);let q=window.AnkiFX_Eval_History||[];q.length===0?(e.fillStyle="#888",e.font="italic 12px monospace",e.fillText("(No evaluation history captured)",20,282)):(e.font="11px monospace",q.slice(-3).forEach((R,N)=>{e.fillStyle=R.status==="active"?"#55ff55":"#ffaa55",e.fillText(`[${N+1}] ${R.source} (${R.version}) @ ${R.time} - ${R.status}`,20,282+N*15)})),e.fillStyle="#0ff",e.font="bold 13px monospace",e.fillText("--- CHRONOLOGICAL LOADER LOGS ---",20,335);let $=window.AnkiFX_Loader_Logs||[];$.length===0?(e.fillStyle="#888",e.font="italic 12px monospace",e.fillText("(No logs captured by template loader)",20,355)):(e.font="11px monospace",$.slice(-12).forEach((R,N)=>{let T=R.includes("fail")||R.includes("Error")||R.includes("offline")||R.includes("warn");e.fillStyle=T?"#ff5555":"#55ff55",e.fillText(`[${N+1}] ${R}`,20,355+N*16)})),e.fillStyle="#f0f",e.font="bold 12px monospace",e.fillText("(0,0)",5,15),e.fillText(`(${le},0)`,le-65,15),e.fillText(`(0,${pe})`,5,pe-5),e.fillText(`(${le},${pe})`,le-65,pe-5),e.strokeStyle="#0ff",e.lineWidth=3,e.setLineDash([5,5]),e.beginPath(),e.moveTo(0,_-2),e.lineTo(le,_-2),e.stroke(),e.setLineDash([]),e.fillStyle="#0ff",e.font="bold 14px monospace",e.textAlign="center",e.fillText("--- VISIBLE DOCUMENT BOTTOM ---",le/2,_-8),e.textAlign="left",e.strokeStyle="#f00",e.lineWidth=4,e.beginPath(),e.moveTo(0,pe-2),e.lineTo(le,pe-2),e.stroke(),e.fillStyle="#f00",e.font="bold 18px monospace",e.textAlign="center",e.fillText("--- CANVAS BOTTOM ---",le/2,pe-10),e.textAlign="left",e.beginPath(),e.moveTo(le-2,0),e.lineTo(le-2,pe),e.stroke(),xt=requestAnimationFrame(r)}r()}function ba(){xt&&(cancelAnimationFrame(xt),xt=null)}var We=null,Q,ye,me={id:"ecg",name:"ECG Monitor",run:ya,stop:wa,onResize:(f,t)=>{Q=f,ye=t},marqueeFont:{color:"#FF1A1A",shadowColor:"#CC0000",shadowBlur:15}};function ya(f,t){let e=f.ctx2d;Q=f.width,ye=f.height;let i=document.getElementById("afx-top-group-right"),o=document.getElementById("afx-ecg-panel");!o&&i&&(o=document.createElement("div"),o.id="afx-ecg-panel",i.insertBefore(o,i.firstChild));let l=localStorage.getItem("ankifx_ecg_rhythm")||"sinus";me.controls=[{type:"button",id:"ecg-trigger",label:l==="sinus"?"\u26A1 TRIGGER ARRHYTHMIA":"\u{1F49A} RESTORE SINUS",onClick:()=>{let E=localStorage.getItem("ankifx_ecg_rhythm")||"sinus",M;if(E==="sinus"){let X=["first_degree","mobitz_1","mobitz_2","third_degree","st_elevation","afib","a_flutter","torsades"];M=X[Math.floor(Math.random()*X.length)]}else M="sinus";localStorage.setItem("ankifx_ecg_rhythm",M),localStorage.setItem("ankifx_ecg_trigger_time",Date.now())}}];let u=200,r=40,a=120,c=25,h=5,n=new Float32Array(4096),d=0,v=0,p=0,s=0,g=0,m=0,b=0,y=100,P=.6,x=72,F=0,w="sinus",k=25+Math.random()*15,C=0,S=["first_degree","mobitz_1","mobitz_2","third_degree","st_elevation","afib","a_flutter","torsades"],B=0;function O(){d<Q&&(d=Q)}let I=(E,M,X,j)=>j*Math.exp(-((E-M)**2)/(2*X**2));function _(E){return I(E,.15,.03,.12)}function G(E){return I(E,.03,.03,.12)}function q(E,M){let X=M%4;return X===0?I(E,.17,.03,.12):X===1?I(E,.1,.03,.12):X===2?I(E,.03,.03,.12):I(E,.15,.03,.12)}function $(E){return I(E,.08,.03,.12)}function R(E){return .035*Math.sin(E*Math.PI*40)+.015*Math.sin(E*Math.PI*96)+.008*Math.sin(E*Math.PI*176)}function N(E){return .085*(E*4%1-.5)}function T(E,M){let X=Math.sin(E*Math.PI*2)*.58+Math.sin(E*Math.PI*4)*.16,j=Math.sin(M*1.2);return X*j}function A(E,M=!1){let X=0;return X+=I(E,.33,.008,-.08),X+=I(E,.36,.012,1),X+=I(E,.39,.008,-.12),M&&(X+=I(E,.46,.07,.38)),X+=I(E,.56,.04,.22),X}function U(E,M,X){let j=E%1,J=Math.floor(E);return M==="sinus"?_(j)+A(j,!1):M==="first_degree"?G(j)+A(j,!1):M==="mobitz_1"?J%4===3?q(j,J):q(j,J)+A(j,!1):M==="mobitz_2"?J%3===2?$(j):$(j)+A(j,!1):M==="st_elevation"?_(j)+A(j,!0):M==="afib"?R(j)+A(j,!1):M==="a_flutter"?N(j)+A(j,!1):M==="torsades"?T(j,X):0}function L(E,M){let X=E%1,j=M%1,J=I(X,.15,.03,.12),ve=I(j,.33,.008,-.08)+I(j,.36,.012,1)+I(j,.39,.008,-.12)+I(j,.56,.04,.22);return J+ve}function K(){e.strokeStyle="rgba(60, 0, 0, 0.15)",e.lineWidth=.5,e.beginPath();for(let E=0;E<Q;E+=h)e.moveTo(E,0),e.lineTo(E,ye);for(let E=0;E<ye;E+=h)e.moveTo(0,E),e.lineTo(Q,E);e.stroke(),e.strokeStyle="rgba(80, 0, 0, 0.3)",e.lineWidth=1,e.beginPath();for(let E=0;E<Q;E+=c)e.moveTo(E,0),e.lineTo(E,ye);for(let E=0;E<ye;E+=c)e.moveTo(0,E),e.lineTo(Q,E);e.stroke()}function ae(){if(!o)return;let E=.5+F*.5;o.style.opacity=E;let M="SINUS RHYTHM";w==="first_degree"?M="1\xB0 AV BLOCK":w==="mobitz_1"?M="2\xB0 AV (MOBITZ 1)":w==="mobitz_2"?M="2\xB0 AV (MOBITZ 2)":w==="third_degree"?M="3\xB0 AV BLOCK":w==="st_elevation"?M="ST ELEVATION":w==="afib"?M="ATRIAL FIBRILLATION":w==="a_flutter"?M="ATRIAL FLUTTER":w==="torsades"&&(M="TORSADES DE POINTES"),o.innerHTML=`
            <div class="afx-ecg-bpm">\u2665 ${x} BPM</div>
            <div class="afx-ecg-rhythm">${M}</div>
        `}function fe(E){s||(s=E);let M=Math.min((E-s)/1e3,.05);s=E,p+=M,O();let X=localStorage.getItem("ankifx_ecg_rhythm")||"sinus",j=parseInt(localStorage.getItem("ankifx_ecg_trigger_time")||"0");if(j>C){if(C=j,w=X,k=p+25+Math.random()*15,w!=="sinus"){let Z=S.indexOf(w);Z!==-1&&(B=(Z+1)%S.length)}w==="afib"&&(y=70+Math.floor(Math.random()*60),P=60/y),me.controls&&me.controls[0]&&(me.controls[0].label=w==="sinus"?"\u26A1 TRIGGER ARRHYTHMIA":"\u{1F49A} RESTORE SINUS",AnkiFX.renderEffectControls(me))}p>=k&&(w==="sinus"?(w=S[B],B=(B+1)%S.length):w="sinus",localStorage.setItem("ankifx_ecg_rhythm",w),k=p+25+Math.random()*15,w==="afib"&&(y=70+Math.floor(Math.random()*60),P=60/y),me.controls&&me.controls[0]&&(me.controls[0].label=w==="sinus"?"\u26A1 TRIGGER ARRHYTHMIA":"\u{1F49A} RESTORE SINUS",AnkiFX.renderEffectControls(me)));let J=72;w==="third_degree"?J=35:w==="mobitz_1"||w==="mobitz_2"?J=68:w==="afib"?J=y:w==="a_flutter"?J=75:w==="torsades"&&(J=220);let ve=w==="afib"?P:60/J,ke=g,_e=m,Se=b;if(w==="third_degree"?(m+=M/(60/88),b+=M/(60/J)):g+=M/ve,w!=="third_degree"){let Z=Math.floor(ke);Math.floor(g)>Z&&w==="afib"&&(y=70+Math.floor(Math.random()*65),P=60/y)}if(w==="third_degree")Math.floor(Se-.36)<Math.floor(b-.36)&&(F=1,x=J+Math.floor(Math.random()*3)-1);else if(Math.floor(ke-.36)<Math.floor(g-.36)){let Z=Math.floor(g-.36),se=!1;w==="mobitz_1"?se=Z%4===3:w==="mobitz_2"&&(se=Z%3===2),se||(F=1,x=Math.floor(J),w!=="torsades"&&w!=="a_flutter"&&(x+=Math.floor(Math.random()*5)-2))}F=Math.max(0,F-M*4);let Ee=u*M,Ce=v+Ee,Re=Math.floor(v),fa=Math.floor(Ce);for(let Z=Re;Z<=fa;Z++){let se=Z%Q,ce=(Z-v)/Ee;if(w==="third_degree"){let de=_e+(m-_e)*ce,pt=Se+(b-Se)*ce;n[se]=L(de,pt)}else{let de=ke+(g-ke)*ce;n[se]=U(de,w,p)}}v=Ce,v>=Q&&(v-=Q),e.fillStyle="#000000",e.fillRect(0,0,Q,ye),K();let Qt=ye*.55,ei=ye*.35,ct=Math.floor(v)%Q,xi=4;e.save(),e.lineCap="round",e.lineJoin="round";for(let Z=0;Z<3;Z++){Z===0?(e.lineWidth=15,e.strokeStyle="rgb(200, 0, 0)"):Z===1?(e.lineWidth=7,e.strokeStyle="rgb(255, 15, 15)"):(e.lineWidth=2.4,e.strokeStyle="rgb(255, 175, 175)");for(let se=0;se<Q;se+=xi){let ce=ct-se;if(ce<0&&(ce+=Q),ce>Q-r)continue;let de=1,pt=Q-r-a;if(ce>pt&&(de=1-(ce-pt)/a,de=Math.max(0,de)),de<=0)continue;let mt=0;ce<12&&(mt=1-ce/12),Z===0?e.globalAlpha=de*(.07+mt*.13):Z===1?e.globalAlpha=de*(.28+mt*.32):e.globalAlpha=de*(.85+mt*.15),e.beginPath();let ha=Qt-n[se]*ei;e.moveTo(se,ha);let gt=Math.min(se+xi,Q);for(let qe=se+1;qe<gt;qe++){let ca=Qt-n[qe]*ei;e.lineTo(qe,ca)}if(gt<Q){let qe=Qt-n[gt]*ei;e.lineTo(gt,qe)}e.stroke()}}e.globalAlpha=1,e.restore(),e.save();let dt=e.createLinearGradient(ct-3,0,ct+3,0);dt.addColorStop(0,"rgba(255, 0, 0, 0)"),dt.addColorStop(.5,"rgba(255, 50, 50, 0.4)"),dt.addColorStop(1,"rgba(255, 0, 0, 0)"),e.fillStyle=dt,e.fillRect(ct-3,0,6,ye),e.restore(),ae(),We=requestAnimationFrame(fe)}We=requestAnimationFrame(fe)}function wa(){We&&(cancelAnimationFrame(We),We=null);let f=document.getElementById("afx-ecg-panel");f&&f.remove()}var Ye=null,ai,ri,Pi={id:"fire",name:"Doom Fire",run:Sa,stop:Pa,onResize:(f,t)=>{ai=f,ri=t},preferredTrack:{title:"Doom 3 BFG Edition",trackTitle:"DOOM E1M1"},marqueeFont:{color:"#ffffff",shadowColor:"rgba(0,0,0,0.8)",shadowBlur:5}},ka=[[7,7,7],[31,7,7],[47,15,7],[71,15,7],[87,23,7],[103,31,7],[119,31,7],[143,39,7],[159,47,7],[175,63,7],[191,71,7],[199,71,7],[223,79,7],[223,87,7],[223,87,7],[215,95,7],[215,95,7],[215,103,15],[207,111,15],[207,119,15],[207,127,15],[207,135,23],[199,135,23],[199,143,23],[199,151,31],[191,159,31],[191,159,31],[191,167,39],[191,167,39],[191,175,47],[183,175,47],[183,183,47],[183,183,55],[207,207,111],[223,223,159],[239,239,199],[255,255,255]];function Sa(f,t){let e=f.ctx2d;ai=f.width,ri=f.height;let i=320,o=168,l=new Uint8Array(i*o),u=e.createImageData(i,o),r=u.data,a=document.createElement("canvas");a.width=i,a.height=o;let c=a.getContext("2d");function h(){l.fill(0);for(let s=0;s<i;s++)l[(o-1)*i+s]=36}function n(s){let g=l[s];if(g===0)l[s-i]=0;else{let m=Math.floor(Math.random()*3),b=s-m+1;l[b-i]=g-(m&1)}}function d(){for(let s=0;s<i;s++)for(let g=1;g<o;g++)n(g*i+s)}function v(){for(let s=0;s<l.length;s++){let g=l[s],m=ka[g],b=s*4;r[b]=m[0],r[b+1]=m[1],r[b+2]=m[2],r[b+3]=255}}h();function p(){d(),v(),c.putImageData(u,0,0),e.save(),e.imageSmoothingEnabled=!1,e.drawImage(a,0,0,ai,ri),e.restore(),Ye=requestAnimationFrame(p)}Ye=requestAnimationFrame(p)}function Pa(){Ye&&(cancelAnimationFrame(Ye),Ye=null)}var Ze=null,Ke,Je,Ei={id:"geometry",name:"Geometry",run:Ea,stop:Ca,onResize:(f,t)=>{Ke=f,Je=t},marqueeFont:{colorFn:(f,t)=>`hsl(${(f*120+t*4)%360}, 100%, 55%)`,shadowColor:"inherit",shadowBlur:15}};function Ea(f,t){let e=f.ctx2d;Ke=f.width,Je=f.height;let i=0;function o(){i+=.012,e.globalCompositeOperation="source-over",e.fillStyle="rgba(2, 2, 5, 0.3)",e.fillRect(0,0,Ke,Je),e.globalCompositeOperation="lighter";let l=Ke/2,u=Je/2,r=Math.max(Ke,Je)*.85;for(let a=0;a<35;a++){let c=i+a*.05,h=(Math.sin(c*.8)*.5+.5)*r+a*12;e.save(),e.translate(l,u),e.rotate(Math.sin(i*.3)*Math.PI+a*.06),e.scale(Math.sin(i*.5+a*.1)*.4+.8,Math.cos(i*.4+a*.1)*.4+.8),e.beginPath();for(let d=0;d<=8;d++){let v=d/8*Math.PI*2,p=Math.cos(v)*h,s=Math.sin(v)*h;d===0?e.moveTo(p,s):e.lineTo(p,s)}let n=(i*50+a*10)%360;e.strokeStyle=`hsla(${n}, 95%, 65%, 0.6)`,e.lineWidth=4,e.stroke(),e.restore()}e.globalCompositeOperation="source-over",Ze=requestAnimationFrame(o)}Ze=requestAnimationFrame(o)}function Ca(){Ze&&(cancelAnimationFrame(Ze),Ze=null)}var Ta=["#c3e4ff","#6ec3f4","#eae2ff","#b9beff"];function Ci(f){return[(f>>16&255)/255,(f>>8&255)/255,(255&f)/255]}var oi=class{constructor(t,e,i,o){let l=this;l.canvas=t,l.gl=e,l.meshes=[],l.debug=()=>{};let u=l.gl;Object.defineProperties(l,{Material:{enumerable:!1,value:class{constructor(a,c,h={}){let n=this;function d(s,g){let m=u.createShader(s);return u.shaderSource(m,g),u.compileShader(m),u.getShaderParameter(m,u.COMPILE_STATUS)||console.error("Shader compilation error:",u.getShaderInfoLog(m)),m}function v(s,g){return Object.entries(s).map(([m,b])=>b.getDeclaration(m,g)).join(`
`)}n.uniforms=h,n.uniformInstances=[];let p=`
              precision highp float;
            `;n.vertexSource=`
              ${p}
              attribute vec4 position;
              attribute vec2 uv;
              attribute vec2 uvNorm;
              ${v(l.commonUniforms,"vertex")}
              ${v(h,"vertex")}
              ${a}
            `,n.Source=`
              ${p}
              ${v(l.commonUniforms,"fragment")}
              ${v(h,"fragment")}
              ${c}
            `,n.vertexShader=d(u.VERTEX_SHADER,n.vertexSource),n.fragmentShader=d(u.FRAGMENT_SHADER,n.Source),n.program=u.createProgram(),u.attachShader(n.program,n.vertexShader),u.attachShader(n.program,n.fragmentShader),u.linkProgram(n.program),u.getProgramParameter(n.program,u.LINK_STATUS)||console.error("Program link error:",u.getProgramInfoLog(n.program)),u.useProgram(n.program),n.attachUniforms(void 0,l.commonUniforms),n.attachUniforms(void 0,n.uniforms)}attachUniforms(a,c){let h=this;a===void 0?Object.entries(c).forEach(([n,d])=>{h.attachUniforms(n,d)}):c.type==="array"?c.value.forEach((n,d)=>h.attachUniforms(`${a}[${d}]`,n)):c.type==="struct"?Object.entries(c.value).forEach(([n,d])=>h.attachUniforms(`${a}.${n}`,d)):h.uniformInstances.push({uniform:c,location:u.getUniformLocation(h.program,a)})}}},Uniform:{enumerable:!1,value:class{constructor(a){this.type="float",Object.assign(this,a),this.typeFn={float:"1f",int:"1i",vec2:"2fv",vec3:"3fv",vec4:"4fv",mat4:"Matrix4fv"}[this.type]||"1f",this.update()}update(a){this.value!==void 0&&u[`uniform${this.typeFn}`](a,this.typeFn.substring(0,6)==="Matrix"?this.transpose:this.value,this.typeFn.substring(0,6)==="Matrix"?this.value:null)}getDeclaration(a,c,h){let n=this;if(n.excludeFrom!==c){if(n.type==="array")return n.value[0].getDeclaration(a,c,n.value.length)+`
const int ${a}_length = ${n.value.length};`;if(n.type==="struct"){let d=a.replace("u_","");return d=d.charAt(0).toUpperCase()+d.slice(1),`uniform struct ${d} 
{
`+Object.entries(n.value).map(([v,p])=>p.getDeclaration(v,c).replace(/^uniform/,"")).join("")+`
} ${a}${h>0?`[${h}]`:""};`}return`uniform ${n.type} ${a}${h>0?`[${h}]`:""};`}}}},PlaneGeometry:{enumerable:!1,value:class{constructor(a,c,h,n,d){u.createBuffer(),this.attributes={position:new l.Attribute({target:u.ARRAY_BUFFER,size:3}),uv:new l.Attribute({target:u.ARRAY_BUFFER,size:2}),uvNorm:new l.Attribute({target:u.ARRAY_BUFFER,size:2}),index:new l.Attribute({target:u.ELEMENT_ARRAY_BUFFER,size:3,type:u.UNSIGNED_SHORT})},this.setTopology(h,n),this.setSize(a,c,d)}setTopology(a=1,c=1){let h=this;h.xSegCount=a,h.ySegCount=c,h.vertexCount=(h.xSegCount+1)*(h.ySegCount+1),h.quadCount=h.xSegCount*h.ySegCount*2,h.attributes.uv.values=new Float32Array(2*h.vertexCount),h.attributes.uvNorm.values=new Float32Array(2*h.vertexCount),h.attributes.index.values=new Uint16Array(3*h.quadCount);for(let n=0;n<=h.ySegCount;n++)for(let d=0;d<=h.xSegCount;d++){let v=n*(h.xSegCount+1)+d;if(h.attributes.uv.values[2*v]=d/h.xSegCount,h.attributes.uv.values[2*v+1]=1-n/h.ySegCount,h.attributes.uvNorm.values[2*v]=d/h.xSegCount*2-1,h.attributes.uvNorm.values[2*v+1]=1-n/h.ySegCount*2,d<h.xSegCount&&n<h.ySegCount){let p=n*h.xSegCount+d;h.attributes.index.values[6*p]=v,h.attributes.index.values[6*p+1]=v+1+h.xSegCount,h.attributes.index.values[6*p+2]=v+1,h.attributes.index.values[6*p+3]=v+1,h.attributes.index.values[6*p+4]=v+1+h.xSegCount,h.attributes.index.values[6*p+5]=v+2+h.xSegCount}}h.attributes.uv.update(),h.attributes.uvNorm.update(),h.attributes.index.update()}setSize(a=1,c=1,h="xz"){let n=this;n.width=a,n.height=c,n.orientation=h,(!n.attributes.position.values||n.attributes.position.values.length!==3*n.vertexCount)&&(n.attributes.position.values=new Float32Array(3*n.vertexCount));let d=a/-2,v=c/-2,p=a/n.xSegCount,s=c/n.ySegCount;for(let g=0;g<=n.ySegCount;g++){let m=v+g*s;for(let b=0;b<=n.xSegCount;b++){let y=d+b*p,P=g*(n.xSegCount+1)+b;n.attributes.position.values[3*P+"xyz".indexOf(h[0])]=y,n.attributes.position.values[3*P+"xyz".indexOf(h[1])]=-m}}n.attributes.position.update()}}},Mesh:{enumerable:!1,value:class{constructor(a,c){let h=this;h.geometry=a,h.material=c,h.wireframe=!1,h.attributeInstances=[],Object.entries(h.geometry.attributes).forEach(([n,d])=>{h.attributeInstances.push({attribute:d,location:d.attach(n,h.material.program)})}),l.meshes.push(h)}draw(){u.useProgram(this.material.program),this.material.uniformInstances.forEach(({uniform:a,location:c})=>a.update(c)),this.attributeInstances.forEach(({attribute:a,location:c})=>a.use(c)),u.drawElements(this.wireframe?u.LINES:u.TRIANGLES,this.geometry.attributes.index.values.length,u.UNSIGNED_SHORT,0)}remove(){l.meshes=l.meshes.filter(a=>a!==this)}}},Attribute:{enumerable:!1,value:class{constructor(a){this.type=u.FLOAT,this.normalized=!1,this.buffer=u.createBuffer(),Object.assign(this,a),this.update()}update(){this.values!==void 0&&(u.bindBuffer(this.target,this.buffer),u.bufferData(this.target,this.values,u.STATIC_DRAW))}attach(a,c){let h=u.getAttribLocation(c,a);return this.target===u.ARRAY_BUFFER&&(u.enableVertexAttribArray(h),u.vertexAttribPointer(h,this.size,this.type,this.normalized,0,0)),h}use(a){u.bindBuffer(this.target,this.buffer),this.target===u.ARRAY_BUFFER&&(u.enableVertexAttribArray(a),u.vertexAttribPointer(a,this.size,this.type,this.normalized,0,0))}}}});let r=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];l.commonUniforms={projectionMatrix:new l.Uniform({type:"mat4",value:r}),modelViewMatrix:new l.Uniform({type:"mat4",value:r}),resolution:new l.Uniform({type:"vec2",value:[1,1]}),aspectRatio:new l.Uniform({type:"float",value:1})},i&&o&&this.setSize(i,o)}setSize(t=640,e=480,i=1){this.width=t,this.height=e,this.gl.viewport(0,0,t*i,e*i),this.commonUniforms.resolution.value=[t,e],this.commonUniforms.aspectRatio.value=t/e}setOrthographicCamera(t=0,e=0,i=0,o=-2e3,l=2e3){this.commonUniforms.projectionMatrix.value=[2/this.width,0,0,0,0,2/this.height,0,0,0,0,2/(o-l),0,t,e,i,1]}render(){this.gl.clearColor(0,0,0,0),this.gl.clearDepth(1),this.meshes.forEach(t=>t.draw())}cleanup(){let t=this.gl;this.meshes.forEach(e=>{e.attributeInstances&&e.attributeInstances.forEach(({location:i})=>{typeof i=="number"&&i>=0&&t.disableVertexAttribArray(i)}),e.material&&e.material.program&&t.deleteProgram(e.material.program),e.geometry&&e.geometry.attributes&&Object.values(e.geometry.attributes).forEach(i=>{i.buffer&&t.deleteBuffer(i.buffer)})}),this.meshes=[]}},ni=class{constructor(t,e,i,o){this.canvas=t,this.gl=e,this.width=i,this.height=o,this.angle=0,this.conf={presetName:"",wireframe:!1,density:[.06,.16],zoom:1,rotation:0,playing:!0},this.t=1253106,this.last=0,this.amp=320,this.seed=5,this.freqX=14e-5,this.freqY=29e-5,this.activeColors=[1,1,1,1],this.shaderFiles={vertex:`
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
            `},this.initGradientColors(),this.minigl=new oi(t,e,i,o),this.initMesh(),this.resize(),this.updateThemeAwareText()}initGradientColors(){this.sectionColors=Ta.map(t=>Ci(parseInt(t.substring(1),16)))}initMaterial(){this.uniforms={u_time:new this.minigl.Uniform({value:0}),u_shadow_power:new this.minigl.Uniform({value:5}),u_darken_top:new this.minigl.Uniform({value:0}),u_active_colors:new this.minigl.Uniform({value:this.activeColors,type:"vec4"}),u_global:new this.minigl.Uniform({value:{noiseFreq:new this.minigl.Uniform({value:[this.freqX,this.freqY],type:"vec2"}),noiseSpeed:new this.minigl.Uniform({value:5e-6})},type:"struct"}),u_vertDeform:new this.minigl.Uniform({value:{incline:new this.minigl.Uniform({value:Math.sin(this.angle)/Math.cos(this.angle)}),offsetTop:new this.minigl.Uniform({value:-.5}),offsetBottom:new this.minigl.Uniform({value:-.5}),noiseFreq:new this.minigl.Uniform({value:[3,4],type:"vec2"}),noiseAmp:new this.minigl.Uniform({value:this.amp}),noiseSpeed:new this.minigl.Uniform({value:10}),noiseFlow:new this.minigl.Uniform({value:3}),noiseSeed:new this.minigl.Uniform({value:this.seed})},type:"struct",excludeFrom:"fragment"}),u_baseColor:new this.minigl.Uniform({value:this.sectionColors[0],type:"vec3",excludeFrom:"fragment"}),u_waveLayers:new this.minigl.Uniform({value:[],excludeFrom:"fragment",type:"array"})};for(let t=1;t<this.sectionColors.length;t+=1)this.uniforms.u_waveLayers.value.push(new this.minigl.Uniform({value:{color:new this.minigl.Uniform({value:this.sectionColors[t],type:"vec3"}),noiseFreq:new this.minigl.Uniform({value:[2+t/this.sectionColors.length,3+t/this.sectionColors.length],type:"vec2"}),noiseSpeed:new this.minigl.Uniform({value:11+.3*t}),noiseFlow:new this.minigl.Uniform({value:6.5+.3*t}),noiseSeed:new this.minigl.Uniform({value:this.seed+10*t}),noiseFloor:new this.minigl.Uniform({value:.1}),noiseCeil:new this.minigl.Uniform({value:.63+.07*t})},type:"struct"}));return this.vertexShader=[this.shaderFiles.noise,this.shaderFiles.blend,this.shaderFiles.vertex].join(`

`),new this.minigl.Material(this.vertexShader,this.shaderFiles.fragment,this.uniforms)}initMesh(){this.material=this.initMaterial(),this.geometry=new this.minigl.PlaneGeometry,this.mesh=new this.minigl.Mesh(this.geometry,this.material)}resize(){let t=Math.min(window.devicePixelRatio||1,1.5);this.minigl.setSize(this.width,this.height,t),this.minigl.setOrthographicCamera(),this.xSegCount=Math.ceil(this.width*this.conf.density[0]),this.ySegCount=Math.ceil(this.height*this.conf.density[1]),this.mesh.geometry.setTopology(this.xSegCount,this.ySegCount),this.mesh.geometry.setSize(this.width,this.height),this.mesh.material.uniforms.u_shadow_power.value=this.width<600?5:6}animate=t=>{if(!this.conf.playing)return;this.last===0&&(this.last=t);let e=Math.min(t-this.last,1e3/15);this.last=t,this.t+=e,this.mesh.material.uniforms.u_time.value=this.t,this.minigl.render(),this.animationId=requestAnimationFrame(this.animate)};updateThemeAwareText(){if(!this.sectionColors||this.sectionColors.length===0)return;let t=0;this.sectionColors.forEach(l=>{let u=l[0],r=l[1],a=l[2],c=.299*u+.587*r+.114*a;t+=c});let e=t/this.sectionColors.length,i=e>.6?"#111111":"#ffffff",o=e>.6?"0 1px 2px rgba(255, 255, 255, 0.8)":"0 1px 3px rgba(0, 0, 0, 0.9), 0 2px 10px rgba(0, 0, 0, 0.6)";document.documentElement.style.setProperty("--afx-body-color",i),document.documentElement.style.setProperty("--afx-text-shadow",o),bt.marqueeFont={colorFn:(l,u)=>{if(!this.sectionColors||this.sectionColors.length===0)return"#ffffff";let r=(l*1.5+u*.25)%this.sectionColors.length,a=Math.floor(r),c=(a+1)%this.sectionColors.length,h=r-a,n=this.sectionColors[a],d=this.sectionColors[c],v=n[0]*(1-h)+d[0]*h,p=n[1]*(1-h)+d[1]*h,s=n[2]*(1-h)+d[2]*h,g=e>.6?.45:1;return`rgb(${Math.round(v*g*255)}, ${Math.round(p*g*255)}, ${Math.round(s*g*255)})`},shadowColor:e>.6?"rgba(0, 0, 0, 0.25)":"inherit",shadowBlur:16},window.AnkiFX&&window.AnkiFX.marquee&&window.AnkiFX.marquee.updateStyles(bt.marqueeFont)}randomizeColors(){let t=()=>"#"+Math.floor(Math.random()*16777215).toString(16).padStart(6,"0"),e=[t(),t(),t(),t()];if(this.sectionColors=e.map(i=>Ci(parseInt(i.substring(1),16))),this.uniforms&&this.uniforms.u_baseColor&&this.uniforms.u_waveLayers&&this.uniforms.u_waveLayers.value){this.uniforms.u_baseColor.value=this.sectionColors[0];for(let i=0;i<this.uniforms.u_waveLayers.value.length;i++){let o=this.uniforms.u_waveLayers.value[i];o&&o.value&&o.value.color&&(o.value.color.value=this.sectionColors[i+1]||this.sectionColors[0])}}this.updateThemeAwareText()}destroy(){this.conf.playing=!1,this.animationId&&cancelAnimationFrame(this.animationId),this.minigl&&this.minigl.cleanup()}},oe=null,bt={id:"gradient",name:"Gradient",controls:[{type:"button",id:"gradient-randomize",label:"\u{1F3A8} RANDOMIZE",onClick:()=>{oe&&oe.randomizeColors()}}],run:(f,t)=>{oe&&oe.destroy(),oe=new ni(f.canvasGL,f.gl,f.width,f.height),oe.conf.playing=!0,oe.last=0,oe.animationId=requestAnimationFrame(oe.animate)},stop:()=>{oe&&(oe.destroy(),oe=null),document.documentElement.style.removeProperty("--afx-body-color"),document.documentElement.style.removeProperty("--afx-text-shadow")},onResize:(f,t,e)=>{oe&&(oe.width=f,oe.height=t,oe.resize())},marqueeFont:{color:"#E6E6FA",shadowColor:"rgba(230, 230, 250, 0.6)",shadowBlur:8}};var wt=null,Le,Ae,et,Pt,ue={id:"julia",name:"Julia Set",run:Aa,stop:Fa,onResize:(f,t,e)=>{Le=f,Ae=t,Pt&&et&&Pt.uniform2f(et,f*e,t*e)},preferredTrack:{title:"Acoustica Power Bundle 4",trackTitle:"AiR"},presets:[{name:"Black Hole",cRe:-.8,cIm:.156,zoomDepth:8,targetX:-.086441,targetY:-.239323},{name:"Electric Lightning",cRe:.285,cIm:.013,zoomDepth:6,targetX:-.106662,targetY:.656613},{name:"Golden Dragon",cRe:-.4,cIm:.6,zoomDepth:9,targetX:-.042175,targetY:-.036744},{name:"Filigree",cRe:-.70176,cIm:-.3842,zoomDepth:10.5,targetX:-.096904,targetY:-.656621},{name:"Fractal Storm",cRe:-.7269,cIm:.1889,zoomDepth:10.5,targetX:-.237086,targetY:.547981},{name:"Seahorse Spiral",cRe:-.74543,cIm:.11301,zoomDepth:7.5,targetX:-.529406,targetY:.072863}],marqueeFont:{color:"#FFF",outline:"#000"}},kt=null,St=null,yt={x:0,y:0},Ti=parseInt(localStorage.getItem("ankifx_julia_preset_index")||"0",10),Qe=ue.presets[Ti]||ue.presets[0],z={presetIndex:Ti,cRe:Qe.cRe,cIm:Qe.cIm,zoomDepth:Qe.zoomDepth,targetX:Qe.targetX,targetY:Qe.targetY,speed:parseFloat(localStorage.getItem("ankifx_julia_speed"))||.15};function Aa(f,t={}){Pt=f.gl;let e=f.gl,i=f.ctx2d;Le=f.width,Ae=f.height;let o=f.dpr,l=`
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
    `;function r(w,k){let C=e.createShader(w);return e.shaderSource(C,k),e.compileShader(C),C}let a=e.createProgram();e.attachShader(a,r(e.VERTEX_SHADER,l)),e.attachShader(a,r(e.FRAGMENT_SHADER,u)),e.linkProgram(a),e.useProgram(a),e.bindBuffer(e.ARRAY_BUFFER,e.createBuffer()),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),e.STATIC_DRAW);let c=e.getAttribLocation(a,"position");e.enableVertexAttribArray(c),e.vertexAttribPointer(c,2,e.FLOAT,!1,0,0);let h=e.getUniformLocation(a,"u_time"),n=e.getUniformLocation(a,"u_speed");et=e.getUniformLocation(a,"u_resolution");let d=e.getUniformLocation(a,"u_c"),v=e.getUniformLocation(a,"u_zoomDepth"),p=e.getUniformLocation(a,"u_target");e.uniform2f(et,Le*o,Ae*o);let s=null,g=null,m=Le<480,b=parseInt(localStorage.getItem("ankifx_julia_preset_index")||"0",10);z.presetIndex=b;let y=ue.presets[b]||ue.presets[0];z.cRe=t.cRe!==void 0?t.cRe:y.cRe,z.cIm=t.cIm!==void 0?t.cIm:y.cIm,z.zoomDepth=t.zoomDepth!==void 0?t.zoomDepth:y.zoomDepth,z.targetX=t.targetX!==void 0?t.targetX:y.targetX,z.targetY=t.targetY!==void 0?t.targetY:y.targetY;let P={type:"select",id:"julia-preset",label:"PRESET",options:ue.presets.map((w,k)=>({value:k,text:(m?"\u{1F4A0} ":"[ Preset: ")+w.name+(m?"":" ]")})),value:z.presetIndex,onChange:w=>{let k=parseInt(w);localStorage.setItem("ankifx_julia_preset_index",k),z.presetIndex=k;let C=ue.presets[k];C&&(Object.assign(t,C),z.cRe=C.cRe,z.cIm=C.cIm,z.zoomDepth=C.zoomDepth,z.targetX=C.targetX,z.targetY=C.targetY,t.debug&&(AnkiFX.setControlValue("julia-cRe",C.cRe),AnkiFX.setControlValue("julia-cIm",C.cIm),AnkiFX.setControlValue("julia-zoomDepth",C.zoomDepth),AnkiFX.setControlValue("julia-targetX",C.targetX),AnkiFX.setControlValue("julia-targetY",C.targetY)),ue.stop(),f.ctx2d&&f.ctx2d.clearRect(0,0,Le,Ae),AnkiFX.startEffect(t,document.getElementById("ankifx-background"),t.marqueePosition,"julia"))}};if(t.debug?ue.controls=[]:ue.controls=[P],t.debug){ue.controls.push({type:"slider",id:"julia-cRe",label:"C-RE",min:-1.5,max:1,step:.001,value:z.cRe,onChange:S=>{z.cRe=S}},{type:"slider",id:"julia-cIm",label:"C-IM",min:-1,max:1,step:.001,value:z.cIm,onChange:S=>{z.cIm=S}},{type:"slider",id:"julia-zoomDepth",label:"ZOOM",min:2,max:25,step:.1,value:z.zoomDepth,onChange:S=>{z.zoomDepth=S}},{type:"slider",id:"julia-targetX",label:"T-X",min:-2,max:2,step:1e-4,value:z.targetX,onChange:S=>{z.targetX=S}},{type:"slider",id:"julia-targetY",label:"T-Y",min:-2,max:2,step:1e-4,value:z.targetY,onChange:S=>{z.targetY=S}},{type:"slider",id:"julia-speed",label:"SPD",min:.005,max:.3,step:.005,value:z.speed,onChange:S=>{z.speed=S,localStorage.setItem("ankifx_julia_speed",S)}}),ue.controls.push(P);let w=document.getElementById("afx-effect-controls-container");w&&(s=document.createElement("div"),s.id="afx-julia-debug-info",s.className="afx-control-row julia-debug-el",s.style.cssText="height: 20px !important; margin-bottom: 2px; pointer-events: none; justify-content: flex-end; opacity: 0.8; font-size: 11px !important; color: #ff00ff; border: none; background: transparent;",s.textContent="HOVER TO SEE TARGET COORDS",w.prepend(s)),g=(S,B,O)=>{let I=O*z.speed/Math.max(z.zoomDepth,1)%2,_=I>1?2-I:I,G=_<.5?4*Math.pow(_,3):1-Math.pow(-2*_+2,3)/2,$=2.2/Math.exp(G*z.zoomDepth),R=G*Math.PI*.5,N=(S-Le/2)/Ae,T=(Ae/2-B)/Ae,A=Math.cos(R),U=Math.sin(R),L=(A*N+U*T)*$,K=(-U*N+A*T)*$;return{tx:z.targetX+L,ty:z.targetY+K}};let k=S=>{if(S.target.closest("#afx-bottom-dock")||S.target.closest(".afx-dialog"))return;let B=performance.now()*.001-x,{tx:O,ty:I}=g(S.clientX,S.clientY,B);z.targetX=O,z.targetY=I,AnkiFX.setControlValue("julia-targetX",O),AnkiFX.setControlValue("julia-targetY",I)};window.addEventListener("mousedown",k),kt=k;let C=S=>{yt.x=S.clientX,yt.y=S.clientY};window.addEventListener("mousemove",C),St=C}let x=performance.now()*.001;function F(){let w=performance.now()*.001-x;if(e.uniform1f(h,w),e.uniform1f(n,z.speed),e.uniform2f(d,z.cRe,z.cIm),e.uniform1f(v,z.zoomDepth),e.uniform2f(p,z.targetX,z.targetY),e.drawArrays(e.TRIANGLE_STRIP,0,4),i.clearRect(0,0,Le,Ae),s&&g){let k=performance.now()*.001-x,{tx:C,ty:S}=g(yt.x,yt.y,k);s.textContent=`TARGET X: ${C.toFixed(6)}, Y: ${S.toFixed(6)}`}wt=requestAnimationFrame(F)}F()}function Fa(){wt&&(cancelAnimationFrame(wt),wt=null),kt&&(window.removeEventListener("mousedown",kt),kt=null),St&&(window.removeEventListener("mousemove",St),St=null),document.querySelectorAll(".julia-debug-el").forEach(f=>f.remove()),Pt=null,et=null}var tt=null,$e=0,Ie=0,D=null,W=null,Fe=[],Et=0,it=null,te={x:-1e3,y:-1e3,dx:0,dy:0,down:!1},Fi=null,Ii={id:"lavalamp",name:"Lava Lamp",run:_a,stop:Oa,onResize:Ra,marqueeFont:{color:"#ffccaa",shadowColor:"rgba(255, 100, 0, 0.8)",shadowBlur:10}},Pe=6,Ct=class{constructor(t,e,i,o){this.pos={x:t,y:e},this.vel={x:0,y:-(Math.random()*.6+.3)},this.radius=i;let l=e/o;this.temperature=.15+l*.3+Math.random()*.15,this.buoyancy=0,this.noiseOffset=Math.random()*1e3,this.smoothSpeedY=0}update(t,e,i){this.pos.y>i*.8?this.temperature+=.05*t:this.pos.y>i*.6?this.temperature+=.02*t:this.pos.y<i*.2?this.temperature-=.04*t:this.pos.y<i*.4&&(this.temperature-=.015*t),this.temperature=Math.max(0,Math.min(1,this.temperature)),this.buoyancy=this.temperature*4-2,this.vel.y-=this.buoyancy*10*t;let o=Math.sin(this.noiseOffset+Et*2e-4)*.1;this.vel.x+=o*t*.3;let l=1-Math.min(Math.abs(this.buoyancy)/.8,1),u=(e*.5-this.pos.x)*.003*l;this.vel.x+=u*t,this.pos.x<this.radius&&(this.vel.x+=(this.radius-this.pos.x)*2*t),this.pos.x>e-this.radius&&(this.vel.x-=(this.pos.x-(e-this.radius))*2*t);let r=-this.radius*.5;this.pos.y<r&&(this.vel.y+=(r-this.pos.y)*8*t);let a=i+this.radius*.5;this.pos.y>a&&(this.vel.y-=(this.pos.y-a)*8*t);let c=Math.pow(.97,t*60);this.vel.x*=c;let n=Math.abs(this.buoyancy)>.8,d=Math.pow(n?.994:.975,t*60);this.vel.y*=d;let v=Math.max(0,(this.pos.y-i*.82)/(i*.18)),p=Math.max(0,(i*.18-this.pos.y)/(i*.18)),s=Math.pow(.88,t*60*(v+p));if(this.vel.x*=s,te.down){let g=this.pos.x-te.x,m=this.pos.y-te.y,b=Math.sqrt(g*g+m*m);if(b<200){let y=(200-b)/200;this.vel.x+=te.dx*y*1.5,this.vel.y+=te.dy*y*8}}this.smoothSpeedY+=(Math.abs(this.vel.y)-this.smoothSpeedY)*(1-Math.pow(.05,t)),this.pos.x+=this.vel.x*t,this.pos.y+=this.vel.y*t}},Ia=`
    attribute vec2 aPosition;
    varying vec2 vUv;
    void main() {
        vUv = aPosition * 0.5 + 0.5;
        // Match canvas 2D coordinates (Y=0 is top)
        vUv.y = 1.0 - vUv.y;
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }
`,Da=`
    precision highp float;
    varying vec2 vUv;
    
    uniform vec2 uResolution;
    uniform float uTime;
    
    uniform vec4 uBlobs[${Pe}]; // x, y, radius, stretch
    uniform float uBlobTemp[${Pe}]; // temperature
    
    // Polynomial smooth minimum
    float smin(float a, float b, float k) {
        float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
        return mix(b, a, h) - k * h * (1.0 - h);
    }
    
    float map(vec2 p) {
        float d = 10000.0;
        for (int i = 0; i < ${Pe}; i++) {
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
`;function Ai(f,t){let e=D.createShader(f);return D.shaderSource(e,t),D.compileShader(e),D.getShaderParameter(e,D.COMPILE_STATUS)?e:(console.error("Shader compile error:",D.getShaderInfoLog(e)),D.deleteShader(e),null)}function Ma(){let f=Ai(D.VERTEX_SHADER,Ia),t=Ai(D.FRAGMENT_SHADER,Da);if(W=D.createProgram(),D.attachShader(W,f),D.attachShader(W,t),D.linkProgram(W),!D.getProgramParameter(W,D.LINK_STATUS))return console.error("Program link error:",D.getProgramInfoLog(W)),!1;D.useProgram(W),it=D.createBuffer(),D.bindBuffer(D.ARRAY_BUFFER,it);let e=new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]);D.bufferData(D.ARRAY_BUFFER,e,D.STATIC_DRAW);let i=D.getAttribLocation(W,"aPosition");return D.enableVertexAttribArray(i),D.vertexAttribPointer(i,2,D.FLOAT,!1,0,0),W.uResolution=D.getUniformLocation(W,"uResolution"),W.uTime=D.getUniformLocation(W,"uTime"),W.uBlobs=D.getUniformLocation(W,"uBlobs"),W.uBlobTemp=D.getUniformLocation(W,"uBlobTemp"),!0}function _a(f,t){if(D=f.gl,Fi=f.canvasGL,$e=f.width,Ie=f.height,!D){console.error("WebGL context required for Lava Lamp");return}if(!Ma())return;Fe=[];let e=0;for(;Fe.length<Pe&&e<200;){e++;let i=70+Math.random()*60,o=i+Math.random()*($e-i*2),l=i+Math.random()*(Ie-i*2),u=!1;for(let r of Fe){let a=r.pos.x-o,c=r.pos.y-l;if(Math.sqrt(a*a+c*c)<r.radius+i+10){u=!0;break}}u||Fe.push(new Ct(o,l,i,Ie))}for(;Fe.length<Pe;){let i=70+Math.random()*60,o=i+Math.random()*($e-i*2),l=i+Math.random()*(Ie-i*2);Fe.push(new Ct(o,l,i,Ie))}Et=performance.now(),La(),tt=requestAnimationFrame(Di)}function Ra(f,t,e){$e=f,Ie=t,D&&D.viewport(0,0,f*e,t*e)}function Di(f){let t=Math.min((f-Et)/1e3,.05);Et=f;let e=new Float32Array(Pe*4),i=new Float32Array(Pe);for(let o=0;o<Pe;o++)Fe[o].update(t,$e,Ie);for(let o=0;o<Pe;o++){let l=Fe[o],u=Math.max(.85,1+Math.min(l.smoothSpeedY*.028,.7)*(.4+l.temperature*.6));e[o*4+0]=l.pos.x,e[o*4+1]=l.pos.y,e[o*4+2]=l.radius,e[o*4+3]=u,i[o]=l.temperature}D.useProgram(W),D.uniform2f(W.uResolution,$e,Ie),D.uniform1f(W.uTime,f*.001),D.uniform4fv(W.uBlobs,e),D.uniform1fv(W.uBlobTemp,i),D.drawArrays(D.TRIANGLES,0,6),te.dx=0,te.dy=0,tt=requestAnimationFrame(Di)}function at(f){let t=Fi.getBoundingClientRect(),e=f.touches?f.touches[0]:f,i=e.clientX-t.left,o=e.clientY-t.top;if(te.down&&f.type!=="mousedown"&&f.type!=="touchstart"){let l=i-te.x,u=o-te.y;Math.abs(l)<150&&Math.abs(u)<150&&(te.dx=l,te.dy=u)}te.x=i,te.y=o}function Tt(f){te.dx=0,te.dy=0,te.down=!0,at(f)}function At(){te.down=!1}function La(){window.addEventListener("mousedown",Tt),window.addEventListener("mousemove",at),window.addEventListener("mouseup",At),window.addEventListener("touchstart",Tt,{passive:!0}),window.addEventListener("touchmove",at,{passive:!0}),window.addEventListener("touchend",At)}function za(){window.removeEventListener("mousedown",Tt),window.removeEventListener("mousemove",at),window.removeEventListener("mouseup",At),window.removeEventListener("touchstart",Tt),window.removeEventListener("touchmove",at),window.removeEventListener("touchend",At)}function Oa(){tt&&(cancelAnimationFrame(tt),tt=null),za(),D&&(D.clearColor(0,0,0,0),D.clear(D.COLOR_BUFFER_BIT),W&&D.deleteProgram(W),it&&D.deleteBuffer(it),W=null,it=null)}var It=null,rt,ze,ot,_t,Rt={id:"mandelbrot",name:"Mandelbrot",run:Ua,stop:Ba,onResize:(f,t,e)=>{rt=f,ze=t,_t&&ot&&_t.uniform2f(ot,f*e,t*e)},preferredTrack:{title:"Acoustica Power Bundle 4",trackTitle:"AiR"},marqueeFont:{color:"#FFF",outline:"#000"}},Dt=null,Mt=null,Ft={x:0,y:0},ee={targetX:-.743643887037151,targetY:.13182590420533,zoomDepth:11,speed:parseFloat(localStorage.getItem("ankifx_mandelbrot_speed"))||.15};function Ua(f,t={}){_t=f.gl;let e=f.gl,i=f.ctx2d;rt=f.width,ze=f.height;let o=f.dpr,l=`
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
    `;function r(b,y){let P=e.createShader(b);return e.shaderSource(P,y),e.compileShader(P),P}let a=e.createProgram();e.attachShader(a,r(e.VERTEX_SHADER,l)),e.attachShader(a,r(e.FRAGMENT_SHADER,u)),e.linkProgram(a),e.useProgram(a),e.bindBuffer(e.ARRAY_BUFFER,e.createBuffer()),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),e.STATIC_DRAW);let c=e.getAttribLocation(a,"position");e.enableVertexAttribArray(c),e.vertexAttribPointer(c,2,e.FLOAT,!1,0,0);let h=e.getUniformLocation(a,"u_time"),n=e.getUniformLocation(a,"u_speed"),d=e.getUniformLocation(a,"u_zoomDepth"),v=e.getUniformLocation(a,"u_target");ot=e.getUniformLocation(a,"u_resolution"),e.uniform2f(ot,rt*o,ze*o);let p=null,s=null;if(t.debug){Rt.controls=[{type:"slider",id:"mandelbrot-zoomDepth",label:"ZOOM",min:2,max:25,step:.1,value:ee.zoomDepth,onChange:x=>{ee.zoomDepth=x}},{type:"slider",id:"mandelbrot-targetX",label:"T-X",min:-2.5,max:1,step:1e-4,value:ee.targetX,onChange:x=>{ee.targetX=x}},{type:"slider",id:"mandelbrot-targetY",label:"T-Y",min:-1.5,max:1.5,step:1e-4,value:ee.targetY,onChange:x=>{ee.targetY=x}},{type:"slider",id:"mandelbrot-speed",label:"SPD",min:.005,max:.3,step:.005,value:ee.speed,onChange:x=>{ee.speed=x,localStorage.setItem("ankifx_mandelbrot_speed",x)}}];let b=document.getElementById("afx-effect-controls-container");b&&(p=document.createElement("div"),p.id="afx-mandelbrot-debug-info",p.className="afx-control-row mandelbrot-debug-el",p.style.cssText="height: 20px !important; margin-bottom: 2px; pointer-events: none; justify-content: flex-end; opacity: 0.8; font-size: 11px !important; color: #ff00ff; border: none; background: transparent;",p.textContent="HOVER TO SEE TARGET COORDS",b.prepend(p)),s=(x,F,w)=>{let k=w*ee.speed/Math.max(ee.zoomDepth,1)%2,C=k>1?2-k:k,S=C<.5?4*Math.pow(C,3):1-Math.pow(-2*C+2,3)/2,B=Math.exp(S*ee.zoomDepth),O=(x-rt/2)/ze,I=(ze/2-F)/ze;return{tx:ee.targetX+O*(2.5/B),ty:ee.targetY+I*(2.5/B)}};let y=x=>{if(x.target.closest("#afx-bottom-dock")||x.target.closest(".afx-dialog"))return;let F=performance.now()*.001-g,{tx:w,ty:k}=s(x.clientX,x.clientY,F);ee.targetX=w,ee.targetY=k,AnkiFX.setControlValue("mandelbrot-targetX",w),AnkiFX.setControlValue("mandelbrot-targetY",k)};window.addEventListener("mousedown",y),Dt=y;let P=x=>{Ft.x=x.clientX,Ft.y=x.clientY};window.addEventListener("mousemove",P),Mt=P}else Rt.controls=[];let g=performance.now()*.001;function m(){let b=performance.now()*.001-g;if(e.uniform1f(h,b),e.uniform1f(n,ee.speed),e.uniform1f(d,ee.zoomDepth),e.uniform2f(v,ee.targetX,ee.targetY),e.drawArrays(e.TRIANGLE_STRIP,0,4),i.clearRect(0,0,rt,ze),p&&s){let y=performance.now()*.001-g,{tx:P,ty:x}=s(Ft.x,Ft.y,y);p.textContent=`TARGET X: ${P.toFixed(6)}, Y: ${x.toFixed(6)}`}It=requestAnimationFrame(m)}m()}function Ba(){It&&(cancelAnimationFrame(It),It=null),Dt&&(window.removeEventListener("mousedown",Dt),Dt=null),Mt&&(window.removeEventListener("mousemove",Mt),Mt=null),document.querySelectorAll(".mandelbrot-debug-el").forEach(f=>f.remove()),_t=null,ot=null}var nt=null,Ot,Lt,zt=16,De=[];function Mi(){let f=Math.floor(Ot/zt);De=[];for(let t=0;t<f;t++)De[t]=Math.random()*-100}var _i={id:"matrix",name:"Matrix",run:qa,stop:Na,onResize:(f,t)=>{Ot=f,Lt=t,Mi()},preferredTrack:{trackTitle:"nightfall"},marqueeFont:{color:"#0F0",shadowColor:"#0F0",shadowBlur:10}};function qa(f,t){let e=f.ctx2d;Ot=f.width,Lt=f.height,Mi();let i="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*]*";function o(){e.fillStyle="rgba(0, 0, 0, 0.1)",e.fillRect(0,0,Ot,Lt),e.fillStyle="#0F0",e.font=zt+"px monospace";for(let l=0;l<De.length;l++)if(De[l]>0||Math.random()>.95){let u=i.charAt(Math.floor(Math.random()*i.length)),r=De[l]*zt;e.fillText(u,l*zt,r),r>Lt&&Math.random()>.975&&(De[l]=0),De[l]++}else De[l]+=.5;nt=requestAnimationFrame(o)}nt=requestAnimationFrame(o)}function Na(){nt&&(cancelAnimationFrame(nt),nt=null)}var st=null,si,li,Ri={id:"none",name:"None",run:ja,stop:$a,onResize:(f,t)=>{si=f,li=t},marqueeFont:{color:"#ffffff",shadowColor:"rgba(0,0,0,0.8)",shadowBlur:5}};function ja(f,t){let e=f.ctx2d;si=f.width,li=f.height;function i(){e.clearRect(0,0,si,li),st=requestAnimationFrame(i)}st=requestAnimationFrame(i)}function $a(){st&&(cancelAnimationFrame(st),st=null)}var lt=null,ie,we,Li={id:"starfield",name:"Starfield",run:Ha,stop:Xa,onResize:(f,t)=>{ie=f,we=t},preferredTrack:{trackTitle:"star wars title"},marqueeFont:{color:"#FFE81F",shadowColor:"#FFE81F",shadowBlur:20,outline:"#000"}};function Ha(f,t){let e=f.ctx2d;ie=f.width,we=f.height;let i=[],o=8e3,l=new Uint8Array(512),u=new Uint8Array(256).map(()=>Math.random()*256);for(let g=0;g<512;g++)l[g]=u[g&255];let r=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]];function a(g,m,b,y){return g[0]*m+g[1]*b+g[2]*y}function c(g,m,b){let y,P,x,F,w=.3333333333333333,k=1/6,C=(g+m+b)*w,S=Math.floor(g+C),B=Math.floor(m+C),O=Math.floor(b+C),I=(S+B+O)*k,_=g-S+I,G=m-B+I,q=b-O+I,$,R,N,T,A,U;_>=G?G>=q?($=1,R=0,N=0,T=1,A=1,U=0):_>=q?($=1,R=0,N=0,T=1,A=0,U=1):($=0,R=0,N=1,T=1,A=0,U=1):G<q?($=0,R=0,N=1,T=0,A=1,U=1):_<q?($=0,R=1,N=0,T=0,A=1,U=1):($=0,R=1,N=0,T=1,A=1,U=0);let L=_-$+k,K=G-R+k,ae=q-N+k,fe=_-T+2*k,E=G-A+2*k,M=q-U+2*k,X=_-1+3*k,j=G-1+3*k,J=q-1+3*k,ve=S&255,ke=B&255,_e=O&255,Se=.6-_*_-G*G-q*q;Se<0?y=0:(Se*=Se,y=Se*Se*a(r[l[ve+l[ke+l[_e]]]%12],_,G,q));let Ee=.6-L*L-K*K-ae*ae;Ee<0?P=0:(Ee*=Ee,P=Ee*Ee*a(r[l[ve+$+l[ke+R+l[_e+N]]]%12],L,K,ae));let Ce=.6-fe*fe-E*E-M*M;Ce<0?x=0:(Ce*=Ce,x=Ce*Ce*a(r[l[ve+T+l[ke+A+l[_e+U]]]%12],fe,E,M));let Re=.6-X*X-j*j-J*J;return Re<0?F=0:(Re*=Re,F=Re*Re*a(r[l[ve+1+l[ke+1+l[_e+1]]]%12],X,j,J)),32*(y+P+x+F)}function h(g,m,b,y=3){let P=0,x=.5;for(let F=0;F<y;F++)P+=c(g,m,b)*x,g*=2,m*=2,b*=2,x*=.5;return P}class n{constructor(){this.active=!1,this.nextSpawn=Date.now()+2e3}reset(){let m=Math.random()*Math.PI*2,b=.2+Math.random()*.4;this.x=Math.cos(m)*ie*b,this.y=Math.sin(m)*we*b,this.z=ie,this.sizeBase=80+Math.random()*120,this.speed=.8,this.active=!0,this.type=1+Math.floor(Math.random()*2);let y=[{name:"ice",baseH:190+Math.random()*40,sat:60,l:70},{name:"inferno",baseH:Math.random()*40,sat:80,l:60},{name:"toxic",baseH:80+Math.random()*40,sat:70,l:60},{name:"ethereal",baseH:260+Math.random()*40,sat:60,l:75},{name:"classic",baseH:30+Math.random()*20,sat:50,l:80}],P=y[Math.floor(Math.random()*y.length)];this.generateGasGiantTexture(P),this.type===2&&(this.rings=Array.from({length:4},(x,F)=>({r1:1.6+F*.2,opacity:.2+Math.random()*.4})))}hslToRgb(m,b,y){m/=360,b/=100,y/=100;let P,x,F;if(b===0)P=x=F=y;else{let w=y<.5?y*(1+b):y+b-y*b,k=2*y-w,C=S=>(S<0&&(S+=1),S>1&&(S-=1),S<1/6?k+(w-k)*6*S:S<1/2?w:S<2/3?k+(w-k)*(2/3-S)*6:k);P=C(m+1/3),x=C(m),F=C(m-1/3)}return{r:P*255,g:x*255,b:F*255}}generateGasGiantTexture(m){let b=document.createElement("canvas");b.width=b.height=256;let y=b.getContext("2d"),P=y.createImageData(256,256),x=m.baseH,F=this.hslToRgb(x,m.sat,m.l),w=this.hslToRgb((x+20)%360,m.sat+10,m.l-10),k=this.hslToRgb((x-40+360)%360,m.sat+20,m.l-15),C=this.hslToRgb((x+60)%360,m.sat-20,m.l+10),S=(O,I,_)=>({r:O.r+(I.r-O.r)*_,g:O.g+(I.g-O.g)*_,b:O.b+(I.b-O.b)*_}),B=Math.random()*1e3;for(let O=0;O<256;O++)for(let I=0;I<256;I++){let _=O/256*10,G=I/256*10,q=Math.abs(h(0,_*.4,B,3)),$=_+h(G*.5,_*.5,B)*q*4,R=G+h(_*.5,G*.5,B+50)*q*2,N=(h(0,$*.8,B+100,4)+1)/2,T=(h(R*.1,$*1.5,B+200,2)+1)/2,A=S(w,F,N);N>.7&&(A=S(A,C,(N-.7)*2)),T>.6&&(A=S(A,k,(T-.6)*1.5));let U=1+h(R,$,B+300,2)*.2,L=(O*256+I)*4;P.data[L]=Math.min(255,A.r*U),P.data[L+1]=Math.min(255,A.g*U),P.data[L+2]=Math.min(255,A.b*U),P.data[L+3]=255}y.putImageData(P,0,0),this.textureCanvas=b}update(){if(!this.active){Date.now()>this.nextSpawn&&this.reset();return}this.z-=this.speed,this.z<=0&&(this.active=!1,this.nextSpawn=Date.now())}draw(m){if(!this.active)return;let b=ie/2/this.z,y=this.x*b+ie/2,P=this.y*b+we/2,x=(1-this.z/ie)*this.sizeBase;if(y<-x*3||y>ie+x*3||P<-x*3||P>we+x*3)return;m.save(),m.translate(y,P),this.type===2&&(this.drawRings(m,x,!0),m.globalAlpha=1);let F=m.createRadialGradient(0,0,x*.9,0,0,x*1.5);F.addColorStop(0,"rgba(255, 255, 255, 0.15)"),F.addColorStop(1,"rgba(0,0,0,0)"),m.fillStyle=F,m.beginPath(),m.arc(0,0,x*1.5,0,Math.PI*2),m.fill(),m.save(),m.beginPath(),m.arc(0,0,x,0,Math.PI*2),m.clip(),m.globalAlpha=1,m.drawImage(this.textureCanvas,-x,-x,x*2,x*2);let w=m.createRadialGradient(-x*.5,-x*.5,x*.1,0,0,x);w.addColorStop(0,"rgba(255, 255, 255, 0.25)"),w.addColorStop(.5,"rgba(0, 0, 0, 0)"),w.addColorStop(1,"rgba(0, 0, 0, 0.4)"),m.fillStyle=w,m.fillRect(-x,-x,x*2,x*2),m.restore();let k=m.createRadialGradient(0,0,x*.7,0,0,x);k.addColorStop(1,"rgba(255,255,255,0.4)"),k.addColorStop(.8,"rgba(255,255,255,0)"),m.fillStyle=k,m.beginPath(),m.arc(0,0,x,0,Math.PI*2),m.fill(),this.type===2&&(this.drawRings(m,x,!1),m.globalAlpha=1),m.restore()}drawRings(m,b,y){m.save();let P=Math.PI/8;for(let x of this.rings)m.globalAlpha=x.opacity,m.strokeStyle="#E6E6FA",m.lineWidth=b*.15,m.beginPath(),m.ellipse(0,0,x.r1*b,x.r1*.3*b,P,0,Math.PI*2),m.stroke();m.restore()}}let d=new n,v=["#FFFFFF","#FFE4B5","#E0FFFF","#FFF0F5","#F0F8FF"];for(let g=0;g<o;g++)i.push({x:(Math.random()-.5)*ie*4,y:(Math.random()-.5)*we*4,z:Math.random()*ie,color:v[Math.floor(Math.random()*v.length)],sizeBase:2+Math.random()*2.5});let p=0;function s(){e.fillStyle="rgba(5, 5, 12, 1)",e.fillRect(0,0,ie,we);let g=ie/2,m=we/2;p+=.01,d.update(),d.draw(e);for(let b=0;b<o;b++){let y=i[b],P=y.z;if(y.z-=4,y.z<=0){y.x=(Math.random()-.5)*ie*4,y.y=(Math.random()-.5)*we*4,y.z=ie;continue}let x=ie/2/y.z,F=y.x*x+g,w=y.y*x+m;if(F>=0&&F<=ie&&w>=0&&w<=we){let k=1-y.z/ie,C=k*y.sizeBase;if(k<.3){e.globalAlpha=k*2,e.fillStyle=y.color,e.fillRect(F,w,Math.max(1,C),Math.max(1,C));continue}e.globalAlpha=k,e.fillStyle=y.color,e.strokeStyle=y.color;let S=ie/2/P,B=y.x*S+g,O=y.y*S+m;e.lineWidth=C,e.beginPath(),e.moveTo(B,O),e.lineTo(F,w),e.stroke(),e.beginPath(),e.arc(F,w,C/2,0,Math.PI*2),e.fill(),k>.8&&(e.globalAlpha=(k-.8)*3,e.beginPath(),e.arc(F,w,C*2.5,0,Math.PI*2),e.fill())}}e.globalAlpha=1,lt=requestAnimationFrame(s)}lt=requestAnimationFrame(s)}function Xa(){lt&&(cancelAnimationFrame(lt),lt=null)}var ut=null,Oe,ft,Ut=0,Bt=0,ge=null;function Oi(){if(Oe===void 0||ft===void 0)return;let f=Math.max(100,Bt),t=Math.max(14,Math.floor(Oe/25)),e=Math.floor(Oe/t),i=Math.floor(f/t);ge=new fi(e,i,t)}var Ui={id:"tetris",name:"Tetris",run:Va,stop:Ga,onResize:(f,t)=>{Oe=f,ft=t;let e=getComputedStyle(document.documentElement);Ut=parseInt(e.getPropertyValue("--io-header"))||0,Bt=t-Ut,Oi()},preferredTrack:{title:"WinTask 3",trackTitle:"Whoopees Tetris"},marqueeFont:{color:"#f0f0f0",shadowColor:"#a000f0",shadowBlur:12,outline:"#000"}},Bi={I:{shapes:[[[1,1,1,1]],[[1],[1],[1],[1]]],color:"#00f0f0"},O:{shapes:[[[1,1],[1,1]]],color:"#f0f000"},T:{shapes:[[[0,1,0],[1,1,1]],[[1,0],[1,1],[1,0]],[[1,1,1],[0,1,0]],[[0,1],[1,1],[0,1]]],color:"#a000f0"},S:{shapes:[[[0,1,1],[1,1,0]],[[1,0],[1,1],[0,1]]],color:"#00f000"},Z:{shapes:[[[1,1,0],[0,1,1]],[[0,1],[1,1],[1,0]]],color:"#f00000"},J:{shapes:[[[1,0,0],[1,1,1]],[[1,1],[1,0],[1,0]],[[1,1,1],[0,0,1]],[[0,1],[0,1],[1,1]]],color:"#0000f0"},L:{shapes:[[[0,0,1],[1,1,1]],[[1,0],[1,0],[1,1]],[[1,1,1],[1,0,0]],[[1,1],[0,1],[0,1]]],color:"#f0a000"}},zi=Object.keys(Bi),ui=class{constructor(t,e,i){this.x=t,this.y=e,this.color=i,this.vx=(Math.random()-.5)*12,this.vy=(Math.random()-.7)*14,this.gravity=.45,this.life=1,this.decay=.012+Math.random()*.018,this.size=1+Math.random()*2.5}update(){this.vx*=.985,this.vy+=this.gravity,this.x+=this.vx,this.y+=this.vy,this.life-=this.decay}draw(t){t.globalAlpha=Math.max(0,this.life),t.fillStyle=this.color,t.fillRect(this.x,this.y,this.size,this.size)}},fi=class{constructor(t,e,i){this.cols=t,this.rows=e,this.cellSize=i,this.board=Array.from({length:e},()=>Array(t).fill(null)),this.particles=[],this.exploding=!1,this.explodeTimer=0,this.EXPLODE_DURATION=120,this.level=1,this.linesTotal=0,this.dropCounter=0,this.moveCounter=0,this._spawnPiece()}_randomPiece(){let t=zi[Math.floor(Math.random()*zi.length)],e=Bi[t],i=Math.floor(Math.random()*e.shapes.length);return{shape:e.shapes[i],color:e.color,key:t,rotIdx:i,def:e}}_spawnPiece(){let t=this._randomPiece();this.current={...t,x:Math.floor((this.cols-t.shape[0].length)/2),y:0},this._selectTarget()}_fits(t,e,i){for(let o=0;o<t.length;o++)for(let l=0;l<t[o].length;l++){if(!t[o][l])continue;let u=e+l,r=i+o;if(u<0||u>=this.cols||r>=this.rows||r>=0&&this.board[r][u]!==null)return!1}return!0}_lock(){let{shape:t,x:e,y:i,color:o}=this.current;for(let l=0;l<t.length;l++)for(let u=0;u<t[l].length;u++){if(!t[l][u])continue;let r=i+l,a=e+u;r>=0&&r<this.rows&&a>=0&&a<this.cols&&(this.board[r][a]=o)}this._clearRows()}_clearRows(){let t=0;for(let e=this.rows-1;e>=0;e--)this.board[e].every(i=>i!==null)&&(this.board.splice(e,1),this.board.unshift(Array(this.cols).fill(null)),t++,e++);return t>0&&(this.linesTotal+=t,this.level=Math.floor(this.linesTotal/10)+1),t}_choosePlacement(){let{def:t}=this.current,e=-1/0,i=this.current.x,o=this.current.rotIdx;for(let l=0;l<t.shapes.length;l++){let u=t.shapes[l],r=u[0].length;for(let a=0;a<=this.cols-r;a++){let c=0;for(;this._fits(u,a,c+1);)c++;if(!this._fits(u,a,c))continue;let h=this._getHeuristicScore(u,a,c);h>e&&(e=h,i=a,o=l)}}return{x:i,rotIdx:o}}_getHeuristicScore(t,e,i){let o=this.board.map(h=>[...h]);for(let h=0;h<t.length;h++)for(let n=0;n<t[h].length;n++){if(!t[h][n])continue;let d=i+h,v=e+n;d>=0&&d<this.rows&&(o[d][v]="X")}let l=0;for(let h=0;h<this.rows;h++)o[h].every(n=>n!==null)&&l++;let u=Array(this.cols).fill(0),r=0;for(let h=0;h<this.cols;h++)for(let n=0;n<this.rows;n++)if(o[n][h]!==null){u[h]=this.rows-n,r+=u[h];break}let a=0;for(let h=0;h<this.cols;h++){let n=!1;for(let d=0;d<this.rows;d++)o[d][h]!==null?n=!0:n&&a++}let c=0;for(let h=0;h<this.cols-1;h++)c+=Math.abs(u[h]-u[h+1]);return r*-.51+l*.76+a*-.35+c*-.18+Math.random()*.1}_isBoardFull(){for(let t=0;t<3;t++)if(this.board[t].some(e=>e!==null))return!0;return!1}_explodeBoard(t,e){for(let i=0;i<this.rows;i++)for(let o=0;o<this.cols;o++)if(this.board[i][o]){let l=t+o*this.cellSize+this.cellSize/2,u=e+i*this.cellSize+this.cellSize/2,r=4+Math.floor(Math.random()*4);for(let a=0;a<r;a++)this.particles.push(new ui(l,u,this.board[i][o]))}}_reset(){this.board=Array.from({length:this.rows},()=>Array(this.cols).fill(null)),this.exploding=!1,this.explodeTimer=0,this.particles=[],this._spawnPiece()}_selectTarget(){let{x:t,rotIdx:e}=this._choosePlacement(),i=this.current.def;this.current.rotIdx=e,this.current.shape=i.shapes[e],this.current.targetX=t,this.current.y=0,this.current.x=Math.floor((this.cols-this.current.shape[0].length)/2)}step(t,e){if(this.exploding){this.explodeTimer++,this.particles=this.particles.filter(l=>l.life>0),this.particles.forEach(l=>l.update()),this.explodeTimer>=this.EXPLODE_DURATION&&this._reset();return}this.moveCounter++,this.moveCounter>=2&&(this.moveCounter=0,this.current.x<this.current.targetX?this._fits(this.current.shape,this.current.x+1,this.current.y)&&this.current.x++:this.current.x>this.current.targetX&&this._fits(this.current.shape,this.current.x-1,this.current.y)&&this.current.x--);let i=this.current.x===this.current.targetX,o=Math.max(4,40-(this.level-1)*3);i&&(o=1),this.dropCounter++,this.dropCounter>=o&&(this.dropCounter=0,this._fits(this.current.shape,this.current.x,this.current.y+1)?this.current.y++:(this._lock(),this._isBoardFull()?(this._explodeBoard(t,e),this.exploding=!0,this.explodeTimer=0):this._spawnPiece()))}draw(t,e,i){let o=this.cellSize,l={};for(let u=0;u<this.rows;u++)for(let r=0;r<this.cols;r++){let a=this.board[u][r];a&&(l[a]||(l[a]=[]),l[a].push({px:e+r*o,py:i+u*o,alpha:this.exploding?Math.max(0,1-this.explodeTimer/40):1}))}if(!this.exploding&&this.current){let{shape:u,x:r,y:a,color:c}=this.current;if(c){l[c]||(l[c]=[]);for(let h=0;h<u.length;h++)for(let n=0;n<u[h].length;n++)u[h][n]&&l[c].push({px:e+(r+n)*o,py:i+(a+h)*o,alpha:1})}}for(let u in l){let r=l[u];t.fillStyle=u,r.forEach(a=>{t.globalAlpha=a.alpha,t.fillRect(a.px+1,a.py+1,o-2,o-2)})}t.globalAlpha=1,t.strokeStyle="rgba(255, 255, 255, 0.35)",t.lineWidth=1.5,t.beginPath();for(let u in l)l[u].forEach(r=>{t.globalAlpha=r.alpha;let a=r.px,c=r.py;t.moveTo(a+1,c+o-2),t.lineTo(a+1,c+1),t.lineTo(a+o-2,c+1)});t.stroke(),t.strokeStyle="rgba(0, 0, 0, 0.45)",t.beginPath();for(let u in l)l[u].forEach(r=>{t.globalAlpha=r.alpha;let a=r.px,c=r.py;t.moveTo(a+1,c+o-1),t.lineTo(a+o-1,c+o-1),t.lineTo(a+o-1,c+1)});t.stroke(),t.globalAlpha=1,t.save(),this.particles.forEach(u=>u.draw(t)),t.restore(),t.globalAlpha=1}};function Va(f,t){let e=f.ctx2d;Oe=f.width,ft=f.height,Ut=f.topInset||0,Bt=f.visibleHeight||ft,Oi();function i(){if(e.fillStyle="rgba(8, 6, 18, 0.92)",e.fillRect(0,0,Oe,ft),e.strokeStyle="rgba(255,255,255,0.04)",e.lineWidth=.5,ge){let o=ge.cellSize,l=Math.floor((Oe-ge.cols*o)/2),u=Ut+(Bt-ge.rows*o);e.beginPath();for(let r=0;r<=ge.cols;r++)e.moveTo(l+r*o,u),e.lineTo(l+r*o,u+ge.rows*o);for(let r=0;r<=ge.rows;r++)e.moveTo(l,u+r*o),e.lineTo(l+ge.cols*o,u+r*o);e.stroke(),ge.step(l,u),ge.draw(e,l,u)}ut=requestAnimationFrame(i)}ut=requestAnimationFrame(i)}function Ga(){ut&&(cancelAnimationFrame(ut),ut=null)}var re={aurora:ki,debug:Si,ecg:me,fire:Pi,geometry:Ei,gradient:bt,julia:ue,lavalamp:Ii,mandelbrot:Rt,matrix:_i,none:Ri,starfield:Li,tetris:Ui};var qt=class{constructor(t="",e="bottom",i={}){this.text=t,this.position=e,this.applyStyles(i),this.time=0,this.textX=0,this.initialized=!1,this.baseCharWidth=15,this.baseFontSize=24,this.baseVelocity=2.8,this.baseBounce=12,this.fontFamily='"Courier New", monospace',this.fontWeight="bold",this.enabled=!0}applyStyles(t={}){this.color=t.color||"#FFF",this.outline=t.outline||null,this.shadowColor=t.shadowColor||null,this.shadowBlur=t.shadowBlur||0,this.colorFn=t.colorFn||null}updateStyles(t={}){this.applyStyles(t)}setText(t){this.text=t}setPosition(t){this.position=t}render(t,e,i){if(!this.enabled)return;this.initialized||(this.textX=e,this.initialized=!0);let o=e<480?.65:e<768?.8:1,l=Math.max(12,Math.floor(this.baseFontSize*o)),u=this.baseBounce*o,r=this.baseCharWidth*o,a=this.baseVelocity*o;if(this.time+=.012,!this.text)return;let c=this.text.length*r;this.textX-=a,this.textX<-(c+e*1.1)&&(this.textX=e),t.font=`${this.fontWeight} ${l}px ${this.fontFamily}`,t.lineJoin="round",this.outline&&(t.lineWidth=4,t.strokeStyle=this.outline);let h=50*o,n=32*o,d=this.position==="bottom"?i-n:h;for(let v=0;v<this.text.length;v++){let p=this.text[v],s=this.textX+v*r;if(s>-40&&s<e+40){let g=d+Math.sin(this.time*4+v*.1)*u;t.fillStyle=this.colorFn?this.colorFn(this.time,v):this.color,this.shadowColor?(t.shadowColor=this.shadowColor==="inherit"?t.fillStyle:this.shadowColor,t.shadowBlur=this.shadowBlur):t.shadowBlur=0,this.outline&&t.strokeText(p,s,g),t.fillText(p,s,g),this.shadowColor&&(t.shadowBlur=0)}}}};window.neoart=Object.create(null);function hi(f,t){var e=Object.create(null,{endian:{value:1,writable:!0},length:{value:0,writable:!0},index:{value:0,writable:!0},buffer:{value:null,writable:!0},view:{value:null,writable:!0},bytesAvailable:{get:function(){return this.length-this.index}},position:{get:function(){return this.index},set:function(i){i<0?i=0:i>this.length&&(i=this.length),this.index=i}},clear:{value:function(){this.buffer=new ArrayBuffer,this.view=null,this.index=this.length=0}},readAt:{value:function(i){return this.view.getUint8(i)}},readByte:{value:function(){return this.view.getInt8(this.index++)}},readShort:{value:function(){var i=this.view.getInt16(this.index,this.endian);return this.index+=2,i}},readInt:{value:function(){var i=this.view.getInt32(this.index,this.endian);return this.index+=4,i}},readUbyte:{value:function(){return this.view.getUint8(this.index++)}},readUshort:{value:function(){var i=this.view.getUint16(this.index,this.endian);return this.index+=2,i}},readUint:{value:function(){var i=this.view.getUint32(this.index,this.endian);return this.index+=4,i}},readBytes:{value:function(i,o,l){var u=i.view,r=this.index,a=this.view;for((l+=r)>this.length&&(l=this.length);r<l;++r)u.setUint8(o++,a.getUint8(r));this.index=r}},readString:{value:function(i){var o=this.index,l=this.view,u="";for((i+=o)>this.length&&(i=this.length);o<i;++o)u+=String.fromCharCode(l.getUint8(o));return this.index=i,u}},writeAt:{value:function(i,o){this.view.setUint8(i,o)}},writeByte:{value:function(i){this.view.setInt8(this.index++,i)}},writeShort:{value:function(i){this.view.setInt16(this.index,i),this.index+=2}},writeInt:{value:function(i){this.view.setInt32(this.index,i),this.index+=4}}});return e.buffer=f,e.view=new DataView(f),e.length=f.byteLength,Object.seal(e)}function qi(){return Object.create(null,{l:{value:0,writable:!0},r:{value:0,writable:!0},next:{value:null,writable:!0}})}function Nt(){return Object.create(null,{player:{value:null,writable:!0},channels:{value:[],writable:!0},buffer:{value:[],writable:!0},samplesTick:{value:0,writable:!0},samplesLeft:{value:0,writable:!0},remains:{value:0,writable:!0},completed:{value:0,writable:!0},bufferSize:{get:function(){return this.buffer.length},set:function(f){var t,e=this.buffer.length||0;if(!(f===e||f<512)&&(this.buffer.length=f,f>e))for(this.buffer[e]=qi(),t=++e;t<f;++t)this.buffer[t]=this.buffer[t-1].next=qi()}},complete:{get:function(){return this.completed},set:function(f){this.completed=f^this.player.loopSong}},reset:{value:function(){var f=this.channels[0],t=this.buffer[0];for(this.samplesLeft=0,this.remains=0,this.completed=0;f;)f.initialize(),f=f.next;for(;t;)t.l=t.r=0,t=t.next}},restore:{configurable:!0,value:function(){}}})}function Wa(){var f=null;return typeof AudioContext<"u"?f=new AudioContext:alert("Web Audio API does not appear to be supported. Use Chrome, Safari or Firefox"),f}function jt(){var f=Object.create(null,{context:{value:null,writable:!0},node:{value:null,writable:!0},analyser:{value:null,writable:!0},analyse:{value:0,writable:!0},endian:{value:0,writable:!0},sampleRate:{value:0,writable:!0},playSong:{value:0,writable:!0},lastSong:{value:0,writable:!0},version:{value:0,writable:!0},title:{value:"",writable:!0},channels:{value:0,writable:!0},loopSong:{value:0,writable:!0},speed:{value:0,writable:!0},tempo:{value:0,writable:!0},mixer:{value:null,writable:!0},tick:{value:0,writable:!0},paused:{value:0,writable:!0},callback:{value:null,writable:!0},quality:{configurable:!0,set:function(t){this.callback=t?this.mixer.accurate.bind(this.mixer):this.mixer.fast.bind(this.mixer)}},toggle:{value:function(t){this.mixer.channels[t].mute^=1}},setup:{configurable:!0,value:function(){}},load:{value:function(t){return this.version=0,this.playSong=0,this.lastSong=0,this.mixer.restore(),t.view||(t=hi(t)),t.position=0,t.readUint()===67324752&&window.neoart.Unzip,t.endian=this.endian,t.position=0,this.loader(t),this.version&&this.setup(),this.version}},play:{value:function(){var t,e;this.version&&(this.paused?this.paused=0:(this.initialize(),typeof this.context.createJavaScriptNode=="function"?this.node=this.context.createJavaScriptNode(this.mixer.bufferSize):this.node=this.context.createScriptProcessor(this.mixer.bufferSize),this.analyser=this.context.createAnalyser(),this.node.connect(this.analyser),this.node.onaudioprocess=this.callback),this.analyse&&window.neoart.Flectrum?(e=window.neoart.analyserNode=this.context.createAnalyser(),this.node.connect(e),e.connect(this.context.destination)):this.node.connect(this.context.destination),t=document.createEvent("Event"),t.initEvent("flodPlay",!0,!1),document.dispatchEvent(t))}},pause:{value:function(){if(this.node){this.node.disconnect(),this.paused=1;var t=document.createEvent("Event");t.initEvent("flodPause",!0,!1),document.dispatchEvent(t)}}},stop:{value:function(){if(this.node){this.node.disconnect(),this.node.onaudioprocess=this.node=null,this.paused=0,this.restore&&this.restore();var t=document.createEvent("Event");t.initEvent("flodStop",!0,!1),document.dispatchEvent(t)}}},reset:{value:function(){this.tick=0,this.mixer.initialize(),this.mixer.samplesTick=this.sampleRate*2.5/this.tempo>>0}}});return window.neoart.audioContext||(window.neoart.audioContext=Wa()),f.context=window.neoart.audioContext,f.sampleRate=f.context.sampleRate,f}function $t(f){var t=Object.create(null,{next:{value:null,writable:!0},mute:{value:0,writable:!0},panning:{value:0,writable:!0},delay:{value:0,writable:!0},pointer:{value:0,writable:!0},length:{value:0,writable:!0},audena:{value:0,writable:!0},audcnt:{value:0,writable:!0},audloc:{value:0,writable:!0},audper:{value:0,writable:!0},audvol:{value:0,writable:!0},timer:{value:0,writable:!0},level:{value:0,writable:!0},ldata:{value:0,writable:!0},rdata:{value:0,writable:!0},enabled:{get:function(){return this.audena},set:function(e){e!==this.audena&&(this.audena=e,this.audloc=this.pointer,this.audcnt=this.pointer+this.length,this.timer=1,e&&(this.delay+=2))}},period:{set:function(e){e<0?e=0:e>65535&&(e=65535),this.audper=e}},volume:{set:function(e){e<0?e=0:e>64&&(e=64),this.audvol=e}},resetData:{value:function(){this.ldata=0,this.rdata=0}},initialize:{value:function(){this.audena=0,this.audcnt=0,this.audloc=0,this.audper=50,this.audvol=0,this.timer=0,this.ldata=0,this.rdata=0,this.delay=0,this.pointer=0,this.length=0}}});return t.panning=t.level=(++f&2)===0?-1:1,Object.seal(t)}function Ya(){return Object.create(null,{active:{value:0,writable:!0},forced:{value:-1,writable:!0},l0:{value:0,writable:!0},l1:{value:0,writable:!0},l2:{value:0,writable:!0},l3:{value:0,writable:!0},l4:{value:0,writable:!0},r0:{value:0,writable:!0},r1:{value:0,writable:!0},r2:{value:0,writable:!0},r3:{value:0,writable:!0},r4:{value:0,writable:!0},initialize:{value:function(){this.l0=this.l1=this.l2=this.l3=this.l4=0,this.r0=this.r1=this.r2=this.r3=this.r4=0}},process:{value:function(f,t){var e=.52133458435322,i=.4860348337215757,o=.9314955486749749,l=1-i;f===0&&(this.l0=i*t.l+l*this.l0,this.r0=i*t.r+l*this.r0,l=1-o,t.l=this.l1=o*this.l0+l*this.l1,t.r=this.r1=o*this.r0+l*this.r1),(this.active|this.forced)>0&&(l=1-e,this.l2=e*t.l+l*this.l2,this.r2=e*t.r+l*this.r2,this.l3=e*this.l2+l*this.l3,this.r3=e*this.r2+l*this.r3,t.l=this.l4=e*this.l3+l*this.l4,t.r=this.r4=e*this.r3+l*this.r4),t.l>1?t.l=1:t.l<-1&&(t.l=-1),t.r>1?t.r=1:t.r<-1&&(t.r=-1)}}})}function Ht(){return Object.create(null,{note:{value:0,writable:!0},sample:{value:0,writable:!0},effect:{value:0,writable:!0},param:{value:0,writable:!0}})}function ht(){return Object.create(null,{name:{value:"",writable:!0},length:{value:0,writable:!0},loop:{value:0,writable:!0},repeat:{value:0,writable:!0},volume:{value:0,writable:!0},pointer:{value:0,writable:!0},loopPtr:{value:0,writable:!0}})}function ci(){var f=Nt();return Object.defineProperties(f,{filter:{value:null,writable:!0},model:{value:1,writable:!0},memory:{value:[],writable:!0},loopPtr:{value:0,writable:!0},loopLen:{value:4,writable:!0},clock:{value:0,writable:!0},master:{value:0,writable:!0},ready:{value:0,writable:!0},volume:{set:function(t){t>0?(t>64&&(t=64),this.master=t/64*.00390625):this.master=0}},initialize:{value:function(){var t=this.memory.length,e=t+this.loopLen;if(this.reset(),this.filter.initialize(),!this.ready)for(this.ready=1,this.loopPtr=t;t<e;++t)this.memory[t]=0}},restore:{value:function(){this.ready=0,this.memory.length=0}},store:{value:function(t,e,i){var o,l,u=t.position,r=this.memory.length,a;for(i&&(t.position=i),a=t.position+e,a>=t.length&&(o=a-t.length,e=t.length-t.position),l=r,e+=r;l<e;++l)this.memory[l]=t.readByte();for(e+=o;l<e;++l)this.memory[l]=0;return i&&(t.position=u),r}},fast:{value:function(t){var e,i,o,l=this.memory,u,r=0,a,c=0,h,n,d,v=this.bufferSize,p,s,g;if(this.completed){if(!this.remains){this.player.stop();return}v=this.remains}for(;r<v;){for(this.samplesLeft||(this.player.process(),this.samplesLeft=this.samplesTick,this.completed&&(v=r+this.samplesTick,v>this.bufferSize&&(this.remains=v-this.bufferSize,v=this.bufferSize))),s=this.samplesLeft,r+s>=v&&(s=v-r),a=c+s,e=this.channels[0];e;){if(d=this.buffer[c],e.audena&&e.audper>60)for(p=e.audper/this.clock,g=e.audvol*this.master,u=g*(1-e.level),n=g*(1+e.level),i=c;i<a;++i)e.delay?e.delay--:--e.timer<1&&(e.mute||(g=l[e.audloc]*.0078125,e.ldata=g*u,e.rdata=g*n),e.audloc++,e.timer+=p,e.audloc>=e.audcnt&&(e.audloc=e.pointer,e.audcnt=e.pointer+e.length)),d.l+=e.ldata,d.r+=e.rdata,d=d.next;else for(i=c;i<a;++i)d.l+=e.ldata,d.r+=e.rdata,d=d.next;e=e.next}c=a,r+=s,this.samplesLeft-=s}for(g=this.model,l=this.filter,d=this.buffer[0],o=t.outputBuffer.getChannelData(0),h=t.outputBuffer.getChannelData(1),i=0;i<v;++i)l.process(g,d),o[i]=d.l,h[i]=d.r,d.l=d.r=0,d=d.next}}}),f.channels[0]=$t(0),f.channels[0].next=f.channels[1]=$t(1),f.channels[1].next=f.channels[2]=$t(2),f.channels[2].next=f.channels[3]=$t(3),f.bufferSize=8192,f.filter=Ya(),f.master=.00390625,Object.seal(f)}function Xt(f){var t=jt();return Object.defineProperties(t,{quality:{set:function(e){this.callback=this.mixer.fast.bind(this.mixer)}},stereo:{set:function(e){var i=this.mixer.channels[0];for(e<0?e=0:e>1&&(e=1);i;)i.level=e*i.panning,i=i.next}},volume:{set:function(e){e<0?e=0:e>1&&(e=1),this.mixer.master=e*.00390625}},frequency:{value:function(e){e?(this.mixer.clock=3579545/this.sampleRate,this.mixer.samplesTick=735):(this.mixer.clock=3546895/this.sampleRate,this.mixer.samplesTick=882)}}}),t.mixer=f||ci(),t.mixer.player=t,t.frequency(0),t.channels=4,t.endian=0,t.quality=0,t.speed=6,t.tempo=125,t}function Ni(){return Object.create(null,{next:{value:null,writable:!0},mute:{value:0,writable:!0},enabled:{value:0,writable:!0},sample:{value:null,writable:!0},length:{value:0,writable:!0},index:{value:0,writable:!0},pointer:{value:0,writable:!0},delta:{value:0,writable:!0},fraction:{value:0,writable:!0},speed:{value:0,writable:!0},dir:{value:0,writable:!0},oldSample:{value:null,writable:!0},oldLength:{value:0,writable:!0},oldPointer:{value:0,writable:!0},oldFraction:{value:0,writable:!0},oldSpeed:{value:0,writable:!0},oldDir:{value:0,writable:!0},volume:{value:0,writable:!0},lvol:{value:0,writable:!0},rvol:{value:0,writable:!0},panning:{value:128,writable:!0},lpan:{value:.5,writable:!0},rpan:{value:.5,writable:!0},ldata:{value:0,writable:!0},rdata:{value:0,writable:!0},mixCounter:{value:0,writable:!0},lmixRampU:{value:0,writable:!0},lmixDeltaU:{value:0,writable:!0},rmixRampU:{value:0,writable:!0},rmixDeltaU:{value:0,writable:!0},lmixRampD:{value:0,writable:!0},lmixDeltaD:{value:0,writable:!0},rmixRampD:{value:0,writable:!0},rmixDeltaD:{value:0,writable:!0},volCounter:{value:0,writable:!0},lvolDelta:{value:0,writable:!0},rvolDelta:{value:0,writable:!0},panCounter:{value:0,writable:!0},lpanDelta:{value:0,writable:!0},rpanDelta:{value:0,writable:!0},initialize:{value:function(){this.enabled=0,this.sample=null,this.length=0,this.index=0,this.pointer=0,this.delta=0,this.fraction=0,this.speed=0,this.dir=0,this.oldSample=null,this.oldLength=0,this.oldPointer=0,this.oldFraction=0,this.oldSpeed=0,this.oldDir=0,this.volume=0,this.lvol=0,this.rvol=0,this.panning=128,this.lpan=.5,this.rpan=.5,this.ldata=0,this.rdata=0,this.mixCounter=0,this.lmixRampU=0,this.lmixDeltaU=0,this.rmixRampU=0,this.rmixDeltaU=0,this.lmixRampD=0,this.lmixDeltaD=0,this.rmixRampD=0,this.rmixDeltaD=0,this.volCounter=0,this.lvolDelta=0,this.rvolDelta=0,this.panCounter=0,this.lpanDelta=0,this.rpanDelta=0}}})}function ji(){return Object.create(null,{name:{value:"",writable:!0},bits:{value:8,writable:!0},volume:{value:0,writable:!0},length:{value:0,writable:!0},data:{value:[],writable:!0},loopMode:{value:0,writable:!0},loopStart:{value:0,writable:!0},loopLen:{value:0,writable:!0},store:{value:function(f){var t=0,e,i=this.length,o,l,u,r;if(this.loopLen||(this.loopMode=0),o=f.position,this.loopMode?(i=this.loopStart+this.loopLen,this.data=new Float32Array(i+1)):this.data=new Float32Array(this.length+1),this.bits===8)for(u=o+i,u>f.length&&(i=f.length-o),e=0;e<i;e++)r=f.readByte()+t,r<-128?r+=256:r>127&&(r-=256),this.data[e]=r*.0078125,t=r;else for(u=o+(i<<1),u>f.length&&(i=f.length-o>>1),e=0;e<i;e++)r=f.readShort()+t,r<-32768?r+=65536:r>32767&&(r-=65536),this.data[e]=r*3051758e-11,t=r;if(u=o+this.length,this.loopMode?(this.length=this.loopStart+this.loopLen,this.loopMode===1?this.data[i]=this.data[this.loopStart]:this.data[i]=this.data[i-1]):this.data[this.length]=0,i!==this.length)for(l=this.data[i-1],e=i;e<this.length;e++)this.data[e]=l;u<f.length?f.position=u:f.position=f.length-1}}})}function Ka(){var f=Nt();return Object.defineProperties(f,{setup:{value:function(t){var e=1;for(this.channels.length=t,this.channels[0]=Ni();e<t;++e)this.channels[e]=this.channels[e-1].next=Ni()}},initialize:{value:function(){this.reset()}},fast:{value:function(t){var e,i,o,l,u=0,r,a=0,c,h,n,d=this.bufferSize,v,p;if(this.completed){if(!this.remains){this.player.stop();return}d=this.remains}for(;u<d;){for(this.samplesLeft||(this.player.process(),this.player.fast(),this.samplesLeft=this.samplesTick,this.completed&&(d=u+this.samplesTick,d>this.bufferSize&&(this.remains=d-this.bufferSize,d=this.bufferSize))),v=this.samplesLeft,u+v>=d&&(v=d-u),r=a+v,e=this.channels[0];e;){if(!e.enabled){e=e.next;continue}for(h=e.sample,i=h.data,n=this.buffer[a],l=a;l<r;++l){if(e.index!==e.pointer){if(e.index>=e.length)if(h.loopMode)e.pointer=h.loopStart+(e.index-e.length),e.length=h.length,h.loopMode===2&&(e.dir?e.dir=0:e.dir=h.length+h.loopStart-1);else{e.enabled=0;break}else e.pointer=e.index;e.mute?(e.ldata=0,e.rdata=0):(e.dir?p=i[e.dir-e.pointer]:p=i[e.pointer],e.ldata=p*e.lvol,e.rdata=p*e.rvol)}e.index=e.pointer+e.delta,(e.fraction+=e.speed)>=1&&(e.index++,e.fraction--),n.l+=e.ldata,n.r+=e.rdata,n=n.next}e=e.next}a=r,u+=v,this.samplesLeft-=v}for(n=this.buffer[0],o=t.outputBuffer.getChannelData(0),c=t.outputBuffer.getChannelData(1),l=0;l<d;++l)n.l>1?n.l=1:n.l<-1&&(n.l=-1),n.r>1?n.r=1:n.r<-1&&(n.r=-1),o[l]=n.l,c[l]=n.r,n.l=n.r=0,n=n.next}},accurate:{value:function(t){var e,i,o,l,u,r,a=0,c,h=0,n,d,v,p,s,g=this.bufferSize,m,b;if(this.completed){if(!this.remains){this.player.stop();return}g=this.remains}for(;a<g;){for(this.samplesLeft||(this.player.process(),this.player.accurate(),this.samplesLeft=this.samplesTick,this.completed&&(g=a+this.samplesTick,g>this.bufferSize&&(this.remains=g-this.bufferSize,g=this.bufferSize))),m=this.samplesLeft,a+m>=g&&(m=g-a),c=h+m,e=this.channels[0];e;){if(!e.enabled){e=e.next;continue}for(v=e.sample,i=v.data,p=e.oldSample,p&&(o=p.data),s=this.buffer[h],r=h;r<c;++r){if(b=e.mute?0:i[e.pointer],b+=(i[e.pointer+e.dir]-b)*e.fraction,(e.fraction+=e.speed)>=1&&(u=e.fraction>>0,e.fraction-=u,e.dir>0?(e.pointer+=u,e.pointer>e.length&&(e.fraction+=e.pointer-e.length,e.pointer=e.length)):(e.pointer-=u,e.pointer<e.length&&(e.fraction+=e.length-e.pointer,e.pointer=e.length))),e.mixCounter?(p?(n=e.mute?0:o[e.oldPointer],n+=(o[e.oldPointer+e.oldDir]-n)*e.oldFraction,(e.oldFraction+=e.oldSpeed)>1&&(u=e.oldFraction>>0,e.oldFraction-=u,e.oldDir>0?(e.oldPointer+=u,e.oldPointer>e.oldLength&&(e.oldFraction+=e.oldPointer-e.oldLength,e.oldPointer=e.oldLength)):(e.oldPointer-=u,e.oldPointer<e.oldLength&&(e.oldFraction+=e.oldLength-e.oldPointer,e.oldPointer=e.oldLength))),s.l+=b*e.lmixRampU+n*e.lmixRampD,s.r+=b*e.rmixRampU+n*e.rmixRampD,e.lmixRampD-=e.lmixDeltaD,e.rmixRampD-=e.rmixDeltaD):(s.l+=b*e.lmixRampU,s.r+=b*e.rmixRampU),e.lmixRampU+=e.lmixDeltaU,e.rmixRampU+=e.rmixDeltaU,e.mixCounter--,e.oldPointer===e.oldLength&&(p.loopMode?p.loopMode===1?(e.oldPointer=p.loopStart,e.oldLength=p.length):e.oldDir>0?(e.oldPointer=p.length-1,e.oldLength=p.loopStart,e.oldDir=-1):(e.oldFraction-=1,e.oldPointer=p.loopStart,e.oldLength=p.length,e.oldDir=1):(p=null,e.oldPointer=0))):(s.l+=b*e.lvol,s.r+=b*e.rvol,e.volCounter?(e.lvol+=e.lvolDelta,e.rvol+=e.rvolDelta,e.volCounter--):e.panCounter&&(e.lpan+=e.lpanDelta,e.rpan+=e.rpanDelta,e.panCounter--,e.lvol=e.volume*e.lpan,e.rvol=e.volume*e.rpan)),e.pointer===e.length)if(v.loopMode)v.loopMode===1?(e.pointer=v.loopStart,e.length=v.length):e.dir>0?(e.pointer=v.length-1,e.length=v.loopStart,e.dir=-1):(e.fraction-=1,e.pointer=v.loopStart,e.length=v.length,e.dir=1);else{e.enabled=0;break}s=s.next}e=e.next}h=c,a+=m,this.samplesLeft-=m}for(s=this.buffer[0],l=t.outputBuffer.getChannelData(0),d=t.outputBuffer.getChannelData(1),r=0;r<g;++r)s.l>1?s.l=1:s.l<-1&&(s.l=-1),s.r>1?s.r=1:s.r<-1&&(s.r=-1),l[r]=s.l,d[r]=s.r,s.l=s.r=0,s=s.next}}}),f.bufferSize=8192,Object.seal(f)}function $i(f){var t=jt();return Object.defineProperties(t,{track:{value:null,writable:!0},length:{value:0,writable:!0},restart:{value:0,writable:!0},timer:{value:0,writable:!0},master:{value:0,writable:!0},volume:{set:function(e){e<0?e=0:e>1&&(e=1),this.master=e*64}},setup:{configurable:!1,value:function(){this.mixer.setup(this.channels)}}}),t.mixer=f||Ka(),t.mixer.player=t,t.endian=1,t.quality=1,t}function Ja(f){var t=Object.create(null,{index:{value:f,writable:!0},next:{value:null,writable:!0},flags:{value:0,writable:!0},delay:{value:0,writable:!0},channel:{value:null,writable:!0},patternLoop:{value:0,writable:!0},patternLoopRow:{value:0,writable:!0},playing:{value:null,writable:!0},note:{value:0,writable:!0},keyoff:{value:0,writable:!0},period:{value:0,writable:!0},finetune:{value:0,writable:!0},arpDelta:{value:0,writable:!0},vibDelta:{value:0,writable:!0},instrument:{value:null,writable:!0},autoVibratoPos:{value:0,writable:!0},autoSweep:{value:0,writable:!0},autoSweepPos:{value:0,writable:!0},sample:{value:null,writable:!0},sampleOffset:{value:0,writable:!0},volume:{value:0,writable:!0},volEnabled:{value:0,writable:!0},volEnvelope:{value:null,writable:!0},volDelta:{value:0,writable:!0},volSlide:{value:0,writable:!0},volSlideMaster:{value:0,writable:!0},fineSlideU:{value:0,writable:!0},fineSlideD:{value:0,writable:!0},fadeEnabled:{value:0,writable:!0},fadeDelta:{value:0,writable:!0},fadeVolume:{value:0,writable:!0},panning:{value:0,writable:!0},panEnabled:{value:0,writable:!0},panEnvelope:{value:null,writable:!0},panSlide:{value:0,writable:!0},portaU:{value:0,writable:!0},portaD:{value:0,writable:!0},finePortaU:{value:0,writable:!0},finePortaD:{value:0,writable:!0},xtraPortaU:{value:0,writable:!0},xtraPortaD:{value:0,writable:!0},portaPeriod:{value:0,writable:!0},portaSpeed:{value:0,writable:!0},glissando:{value:0,writable:!0},glissPeriod:{value:0,writable:!0},vibratoPos:{value:0,writable:!0},vibratoSpeed:{value:0,writable:!0},vibratoDepth:{value:0,writable:!0},vibratoReset:{value:0,writable:!0},tremoloPos:{value:0,writable:!0},tremoloSpeed:{value:0,writable:!0},tremoloDepth:{value:0,writable:!0},waveControl:{value:0,writable:!0},tremorPos:{value:0,writable:!0},tremorOn:{value:0,writable:!0},tremorOff:{value:0,writable:!0},tremorVolume:{value:0,writable:!0},retrigx:{value:0,writable:!0},retrigy:{value:0,writable:!0},rowCurrent:{value:null,writable:!0},reset:{value:function(){this.volume=this.sample.volume,this.panning=this.sample.panning,this.finetune=this.sample.finetune>>3<<2,this.keyoff=0,this.volDelta=0,this.fadeEnabled=0,this.fadeDelta=0,this.rowCurrent=null,this.fadeVolume=65536,this.autoVibratoPos=0,this.autoSweep=1,this.autoSweepPos=0,this.vibDelta=0,this.vibratoReset=0,(this.waveControl&15)<4&&(this.vibratoPos=0),this.waveControl>>4<4&&(this.tremoloPos=0)}},autoVibrato:{value:function(){var e;switch(this.autoVibratoPos=this.autoVibratoPos+this.playing.vibratoSpeed&255,this.playing.vibratoType){case 0:e=ar[this.autoVibratoPos];break;case 1:this.autoVibratoPos<128?e=-64:e=64;break;case 2:e=(64+(this.autoVibratoPos>>1)&127)-64;break;case 3:e=(64-(this.autoVibratoPos>>1)&127)-64;break;default:break}return e*=this.playing.vibratoDepth,this.autoSweep&&(this.playing.vibratoSweep?this.autoSweepPos>this.playing.vibratoSweep?(this.autoSweepPos&2&&(e*=this.autoSweepPos/this.playing.vibratoSweep),this.autoSweep=0):e*=++this.autoSweepPos/this.playing.vibratoSweep:this.autoSweep=0),this.flags|=ne,e>>6}},tonePortamento:{value:function(){this.glissPeriod||(this.glissPeriod=this.period),this.period<this.portaPeriod?(this.glissPeriod+=this.portaSpeed<<2,this.glissando?this.period=Math.round(this.glissPeriod/64)<<6:this.period=this.glissPeriod,this.period>=this.portaPeriod&&(this.period=this.portaPeriod,this.glissPeriod=this.portaPeriod=0)):this.period>this.portaPeriod&&(this.glissPeriod-=this.portaSpeed<<2,this.glissando?this.period=Math.round(this.glissPeriod/64)<<6:this.period=this.glissPeriod,this.period<=this.portaPeriod&&(this.period=this.portaPeriod,this.glissPeriod=this.portaPeriod=0)),this.flags|=ne}},tremolo:{value:function(){var e=255,i=this.tremoloPos&31;switch(this.waveControl>>4&3){case 0:e=Ki[i];break;case 1:e=i<<3;break;default:break}this.volDelta=e*this.tremoloDepth>>6,this.tremoloPos>31&&(this.volDelta=-this.volDelta),this.tremoloPos=this.tremoloPos+this.tremoloSpeed&63,this.flags|=H}},tremor:{value:function(){this.tremorPos===this.tremorOn?(this.tremorVolume=this.volume,this.volume=0,this.flags|=H):(this.tremorPos=0,this.volume=this.tremorVolume,this.flags|=H),this.tremorPos++}},vibrato:{value:function(){var e=255,i=this.vibratoPos&31;switch(this.waveControl&3){case 0:e=Ki[i];break;case 1:e=i<<3,this.vibratoPos>31&&(e=255-e);break;default:break}this.vibDelta=e*this.vibratoDepth>>7,this.vibratoPos>31&&(this.vibDelta=-this.vibDelta),this.vibratoPos=this.vibratoPos+this.vibratoSpeed&63,this.flags|=ne}}});return t.volEnvelope=Hi(),t.panEnvelope=Hi(),Object.seal(t)}function Gt(){return Object.create(null,{points:{value:[],writable:!0},total:{value:0,writable:!0},sustain:{value:0,writable:!0},loopStart:{value:0,writable:!0},loopEnd:{value:0,writable:!0},flags:{value:0,writable:!0}})}function Hi(){return Object.create(null,{value:{value:0,writable:!0},position:{value:0,writable:!0},frame:{value:0,writable:!0},delta:{value:0,writable:!0},fraction:{value:0,writable:!0},stopped:{value:0,writable:!0},reset:{value:function(){this.value=0,this.position=0,this.frame=0,this.delta=0,this.fraction=0,this.stopped=0}}})}function Xi(){var f=Object.create(null,{name:{value:"",writable:!0},samples:{value:[],writable:!0},noteSamples:{value:null,writable:!0},fadeout:{value:0,writable:!0},volData:{value:null,writable:!0},volEnabled:{value:0,writable:!0},panData:{value:null,writable:!0},panEnabled:{value:0,writable:!0},vibratoType:{value:0,writable:!0},vibratoSweep:{value:0,writable:!0},vibratoSpeed:{value:0,writable:!0},vibratoDepth:{value:0,writable:!0}});return f.noteSamples=new Uint8Array(96),f.volData=Gt(),f.panData=Gt(),Object.seal(f)}function Vi(f,t){var e=Object.create(null,{rows:{value:[],writable:!0},length:{value:0,writable:!0},size:{value:0,writable:!0}});return e.rows.length=e.size=f*t,e.length=f,Object.seal(e)}function Vt(f,t){var e=Object.create(null,{frame:{value:0,writable:!0},value:{value:0,writable:!0}});return e.frame=f||0,e.value=t||0,Object.seal(e)}function di(){return Object.create(null,{note:{value:0,writable:!0},instrument:{value:0,writable:!0},volume:{value:0,writable:!0},effect:{value:0,writable:!0},param:{value:0,writable:!0}})}function Gi(){var f=ji();return Object.defineProperties(f,{finetune:{value:0,writable:!0},panning:{value:0,writable:!0},relative:{value:0,writable:!0}}),Object.seal(f)}function Za(f){var t=$i(f);return Object.defineProperties(t,{id:{value:"F2Player"},patterns:{value:[],writable:!0},instruments:{value:[],writable:!0},voices:{value:[],writable:!0},linear:{value:0,writable:!0},complete:{value:0,writable:!0},order:{value:0,writable:!0},position:{value:0,writable:!0},nextOrder:{value:0,writable:!0},nextPosition:{value:0,writable:!0},pattern:{value:null,writable:!0},patternDelay:{value:0,writable:!0},patternOffset:{value:0,writable:!0},timer:{value:0,writable:!0},rowCurrent:{value:0,writable:!0},initialize:{value:function(){var e=0,i;for(this.reset(),this.timer=this.speed,this.order=0,this.position=0,this.nextOrder=-1,this.nextPosition=-1,this.patternDelay=0,this.patternOffset=0,this.complete=0,this.master=64,this.voices.length=this.channels;e<this.channels;++e)i=Ja(e),i.channel=this.mixer.channels[e],i.playing=this.instruments[0],i.sample=i.playing.samples[0],this.voices[e]=i,e&&(this.voices[e-1].next=i)}},loader:{value:function(e){var i,o,l,u,r,a,c,h,n,d,v=22,p,s,g,m;if(!(e.length<360)){if(e.position=17,this.title=e.readString(20),e.position++,l=e.readString(20),l==="FastTracker v2.00   "||l==="FastTracker v 2.00  ")this.version=1;else if(l==="Sk@le Tracker")v=2,this.version=2;else if(l==="MadTracker 2.0")this.version=3;else if(l==="MilkyTracker        ")this.version=4;else if(l==="DigiBooster Pro 2.18")this.version=5;else if(l.indexOf("OpenMPT")!==-1)this.version=6;else return;for(e.readUshort(),i=e.readUint(),this.length=e.readUshort(),this.restart=e.readUshort(),this.channels=e.readUshort(),m=s=e.readUshort(),this.instruments=[],this.instruments.length=e.readUshort()+1,this.linear=e.readUshort(),this.speed=e.readUshort(),this.tempo=e.readUshort(),this.track=new Uint8Array(this.length),o=0;o<this.length;++o)c=e.readUbyte(),c>=m&&(s=c+1),this.track[o]=c;if(this.patterns=[],this.patterns.length=s,s!==m){for(n=Vi(64,this.channels),c=n.size,o=0;o<c;++o)n.rows[o]=di();this.patterns[--s]=n}for(e.position=d=i+60,h=m,o=0;o<h;++o){if(i=e.readUint(),e.position++,n=Vi(e.readUshort(),this.channels),s=n.size,m=e.readUshort(),e.position=d+i,a=e.position+m,m)for(c=0;c<s;++c)p=di(),m=e.readUbyte(),m&128?(m&1&&(p.note=e.readUbyte()),m&2&&(p.instrument=e.readUbyte()),m&4&&(p.volume=e.readUbyte()),m&8&&(p.effect=e.readUbyte()),m&16&&(p.param=e.readUbyte())):(p.note=m,p.instrument=e.readUbyte(),p.volume=e.readUbyte(),p.effect=e.readUbyte(),p.param=e.readUbyte()),p.note!==pi&&p.note>96&&(p.note=0),n.rows[c]=p;else for(c=0;c<s;++c)n.rows[c]=di();this.patterns[o]=n,d=e.position,d!==a&&(d=e.position=a)}for(a=e.position,h=this.instruments.length,o=1;o<h&&(u=e.readUint(),!(e.position+u>=e.length));++o){if(r=Xi(),r.name=e.readString(22),e.position++,m=e.readUshort(),m>16&&(m=16),i=e.readUint(),v===2&&i!==64&&(i=64),m){for(r.samples=[],r.samples.length=m,c=0;c<96;++c)r.noteSamples[c]=e.readUbyte();for(c=0;c<12;++c)r.volData.points[c]=Vt(e.readUshort(),e.readUshort());for(c=0;c<12;++c)r.panData.points[c]=Vt(e.readUshort(),e.readUshort());for(r.volData.total=e.readUbyte(),r.panData.total=e.readUbyte(),r.volData.sustain=e.readUbyte(),r.volData.loopStart=e.readUbyte(),r.volData.loopEnd=e.readUbyte(),r.panData.sustain=e.readUbyte(),r.panData.loopStart=e.readUbyte(),r.panData.loopEnd=e.readUbyte(),r.volData.flags=e.readUbyte(),r.panData.flags=e.readUbyte(),r.volData.flags&Wi&&(r.volEnabled=1),r.panData.flags&Wi&&(r.panEnabled=1),r.vibratoType=e.readUbyte(),r.vibratoSweep=e.readUbyte(),r.vibratoDepth=e.readUbyte(),r.vibratoSpeed=e.readUbyte(),r.fadeout=e.readUshort()<<1,e.position+=v,d=e.position,this.instruments[o]=r,c=0;c<m;++c)g=Gi(),g.length=e.readUint(),g.loopStart=e.readUint(),g.loopLen=e.readUint(),g.volume=e.readUbyte(),g.finetune=e.readByte(),g.loopMode=e.readUbyte(),g.panning=e.readUbyte(),g.relative=e.readByte(),e.position++,g.name=e.readString(22),r.samples[c]=g,e.position=d+=i;for(c=0;c<m;++c)g=r.samples[c],g.length&&(d=e.position+g.length,g.loopMode&16&&(g.bits=16,g.loopMode^=16,g.length>>=1,g.loopStart>>=1,g.loopLen>>=1),g.loopLen||(g.loopMode=0),g.store(e),g.loopMode&&(g.length=g.loopStart+g.loopLen),e.position=d)}else e.position=a+u;if(a=e.position,a>=e.length)break}for(r=Xi(),r.volData=Gt(),r.panData=Gt(),r.samples=[],o=0;o<12;++o)r.volData.points[o]=Vt(),r.panData.points[o]=Vt();for(g=Gi(),g.length=220,g.data=new Float32Array(220),o=0;o<220;++o)g.data[o]=0;r.samples[0]=g,this.instruments[0]=r}}},process:{value:function(){var e,i,o,l,u,r,a,c,h,n,d,v,p,s=this.voices[0];if(this.tick)for(;s;){if(n=this.pattern.rows[this.position+s.index],s.delay)if((n.param&15)===this.tick)s.flags=s.delay,s.delay=0;else{s=s.next;continue}if(n.volume)switch(a=n.volume>>4,c=n.volume&15,a){case 6:s.volume-=c,s.volume<0&&(s.volume=0),s.flags|=H;break;case 7:s.volume+=c,s.volume>64&&(s.volume=64),s.flags|=H;break;case 11:s.vibrato();break;case 13:s.panning-=c,s.panning<0&&(s.panning=0),s.flags|=he;break;case 14:s.panning+=c,s.panning>255&&(s.panning=255),s.flags|=he;break;case 15:s.portaPeriod&&s.tonePortamento();break;default:break}switch(a=n.param>>4,c=n.param&15,n.effect){case 0:if(!n.param)break;p=(this.tick-this.timer)%3,p<0&&(p+=3),this.tick===2&&this.timer===18&&(p=0),p?p===1?this.linear?s.arpDelta=-(c<<6):(p=this.amiga(s.note+c,s.finetune),s.arpDelta=p-s.period):this.linear?s.arpDelta=-(a<<6):(p=this.amiga(s.note+a,s.finetune),s.arpDelta=p-s.period):s.arpDelta=0,s.flags|=ne;break;case 1:s.period-=s.portaU,s.period<0&&(s.period=0),s.flags|=ne;break;case 2:s.period+=s.portaD,s.period>9212&&(s.period=9212),s.flags|=ne;break;case 3:s.portaPeriod&&s.tonePortamento();break;case 4:a&&(s.vibratoSpeed=a),c&&(s.vibratoDepth=c<<2),s.vibrato();break;case 5:v=1,s.portaPeriod&&s.tonePortamento();break;case 6:v=1,s.vibrato();break;case 7:s.tremolo();break;case 10:v=1;break;case 14:switch(a){case 9:this.tick%c===0&&(s.volEnvelope.reset(),s.panEnvelope.reset(),s.flags|=H|he|He);break;case 12:this.tick===c&&(s.volume=0,s.flags|=H);break;default:break}break;case 17:a=s.volSlideMaster>>4,c=s.volSlideMaster&15,a?(this.master+=a,this.master>64&&(this.master=64),s.flags|=H):c&&(this.master-=c,this.master<0&&(this.master=0),s.flags|=H);break;case 20:this.tick===n.param&&(s.fadeEnabled=1,s.keyoff=1);break;case 24:a=s.panSlide>>4,c=s.panSlide&15,a?(s.panning+=a,s.panning>255&&(s.panning=255),s.flags|=he):c&&(s.panning-=c,s.panning<0&&(s.panning=0),s.flags|=he);break;case 27:if(e=this.tick,n.volume||e++,e%s.retrigy)break;(!n.volume||n.volume>80)&&s.retrigx&&this.retrig(s),s.flags|=He;break;case 29:s.tremor();break;default:break}v&&(a=s.volSlide>>4,c=s.volSlide&15,v=0,a?(s.volume+=a,s.flags|=H):c&&(s.volume-=c,s.flags|=H)),s=s.next}else for(this.nextOrder>=0&&(this.order=this.nextOrder),this.nextPosition>=0&&(this.position=this.nextPosition),this.nextOrder=this.nextPosition=-1,this.pattern=this.patterns[this.track[this.order]];s;){if(this.rowCurrent=this.position+s.index,n=this.pattern.rows[this.rowCurrent],e=n.volume>>4,h=n.effect===3||n.effect===5||e===15,a=n.param>>4,s.keyoff=0,s.arpDelta&&(s.arpDelta=0,s.flags|=ne),n.instrument?(s.instrument=n.instrument<this.instruments.length?this.instruments[n.instrument]:null,s.volEnvelope.reset(),s.panEnvelope.reset(),s.flags|=H|he|Ue):(n.note===pi||n.effect===20&&!n.param)&&(s.fadeEnabled=1,s.keyoff=1),n.note&&n.note!==pi?s.instrument?(o=s.instrument,p=n.note-1,d=o.samples[o.noteSamples[p]],p+=d.relative,p>=tr&&p<=ir&&(h||(s.note=p,s.sample=d,n.instrument?(s.volEnabled=o.volEnabled,s.panEnabled=o.panEnabled,s.flags|=Qa):s.flags|=ne|He),n.instrument?(s.reset(),s.fadeDelta=o.fadeout):s.finetune=d.finetune>>3<<2,n.effect===14&&a===5&&(s.finetune=(n.param&15)-8<<3),this.linear?p=(120-p<<6)-s.finetune:p=this.amiga(p,s.finetune),h?s.portaPeriod=p:(s.period=p,s.glissPeriod=0))):(s.volume=0,s.flags=H|Ue):s.vibratoReset&&n.effect!==4&&n.effect!==6&&(s.vibDelta=0,s.vibratoReset=0,s.flags|=ne),n.volume)if(n.volume>=16&&n.volume<=80)s.volume=n.volume-16,s.flags|=H|Ue;else switch(c=n.volume&15,e){case 6:s.volume-=c,s.volume<0&&(s.volume=0),s.flags|=H;break;case 7:s.volume+=c,s.volume>64&&(s.volume=64),s.flags|=H;break;case 10:c&&(s.vibratoSpeed=c);break;case 11:c&&(s.vibratoDepth=c<<2);break;case 12:s.panning=c<<4,s.flags|=he;break;case 15:c&&(s.portaSpeed=c<<4);break;default:break}if(n.effect)switch(c=n.param&15,n.effect){case 1:n.param&&(s.portaU=n.param<<2);break;case 2:n.param&&(s.portaD=n.param<<2);break;case 3:n.param&&e!==15&&(s.portaSpeed=n.param);break;case 4:s.vibratoReset=1;break;case 5:n.param&&(s.volSlide=n.param);break;case 6:n.param&&(s.volSlide=n.param),s.vibratoReset=1;break;case 7:a&&(s.tremoloSpeed=a),c&&(s.tremoloDepth=c);break;case 8:s.panning=n.param,s.flags|=he;break;case 9:n.param&&(s.sampleOffset=n.param<<8),s.sampleOffset>=s.sample.length&&(s.volume=0,s.sampleOffset=0,s.flags&=~(ne|He),s.flags|=H|Ue);break;case 10:n.param&&(s.volSlide=n.param);break;case 11:this.nextOrder=n.param,this.nextOrder>=this.length?this.complete=1:this.nextPosition=0,u=1,this.patternOffset=0;break;case 12:s.volume=n.param,s.flags|=H|Ue;break;case 13:this.nextPosition=(a*10+c)*this.channels,this.patternOffset=0,u||(this.nextOrder=this.order+1,this.nextOrder>=this.length&&(this.complete=1,this.nextPosition=-1));break;case 14:switch(a){case 1:c&&(s.finePortaU=c<<2),s.period-=s.finePortaU,s.flags|=ne;break;case 2:c&&(s.finePortaD=c<<2),s.period+=s.finePortaD,s.flags|=ne;break;case 3:s.glissando=c;break;case 4:s.waveControl=s.waveControl&240|c;break;case 6:c?(s.patternLoop?s.patternLoop--:s.patternLoop=c,s.patternLoop&&(this.nextPosition=s.patternLoopRow)):s.patternLoopRow=this.patternOffset=this.position;break;case 7:s.waveControl=s.waveControl&15|c<<4;break;case 10:c&&(s.fineSlideU=c),s.volume+=s.fineSlideU,s.flags|=H;break;case 11:c&&(s.fineSlideD=c),s.volume-=s.fineSlideD,s.flags|=H;break;case 13:s.delay=s.flags,s.flags=0;break;case 14:this.patternDelay=c*this.timer;break;default:break}break;case 15:if(!n.param)break;n.param<32?this.timer=n.param:this.mixer.samplesTick=this.sampleRate*2.5/n.param>>0;break;case 16:this.master=n.param,this.master>64&&(this.master=64),s.flags|=H;break;case 17:n.param&&(s.volSlideMaster=n.param);break;case 21:if(!s.instrument||!s.instrument.volEnabled)break;for(o=s.instrument,p=n.param,a=o.volData.total,l=0;l<a&&!(p<o.volData.points[l].frame);l++);s.volEnvelope.position=--l,a--,o.volData.flags&Yi&&l===o.volData.loopEnd&&(l=s.volEnvelope.position=o.volData.loopStart,p=o.volData.points[l].frame,s.volEnvelope.frame=p),l>=a?(s.volEnvelope.value=o.volData.points[a].value,s.volEnvelope.stopped=1):(s.volEnvelope.stopped=0,s.volEnvelope.frame=p,p>o.volData.points[l].frame&&s.volEnvelope.position++,i=o.volData.points[l],r=o.volData.points[++l],p=r.frame-i.frame,s.volEnvelope.delta=(p?(r.value-i.value<<8)/p>>0:0)||0,s.volEnvelope.fraction=i.value<<8);break;case 24:n.param&&(s.panSlide=n.param);break;case 27:if(a&&(s.retrigx=a),c&&(s.retrigy=c),!n.volume&&s.retrigy){if(e=this.tick+1,e%s.retrigy)break;n.volume>80&&s.retrigx&&this.retrig(s)}break;case 29:n.param&&(s.tremorOn=++a,s.tremorOff=++c+a);break;case 33:a===1?(c&&(s.xtraPortaU=c),s.period-=s.xtraPortaU,s.flags|=ne):a===2&&(c&&(s.xtraPortaD=c),s.period+=s.xtraPortaD,s.flags|=ne);break;default:break}s=s.next}++this.tick>=this.timer+this.patternDelay&&(this.patternDelay=this.tick=0,this.nextPosition<0&&(this.nextPosition=this.position+this.channels,(this.nextPosition>=this.pattern.size||this.complete)&&(this.nextOrder=this.order+1,this.nextPosition=this.patternOffset,this.nextOrder>=this.length&&(this.nextOrder=this.restart,this.mixer.complete=1))))}},fast:{value:function(){for(var e,i,o,l,u,r=this.voices[0],a;r;)e=r.channel,o=r.flags,r.flags=0,o&He&&(e.index=r.sampleOffset,e.pointer=-1,e.dir=0,e.fraction=0,e.sample=r.sample,e.length=r.sample.length,e.enabled=e.sample.data?1:0,r.playing=r.instrument,r.sampleOffset=0),l=r.playing,i=l.vibratoSpeed?r.autoVibrato():0,a=r.volume+r.volDelta,l.volEnabled?(r.volEnabled&&!r.volEnvelope.stopped&&this.envelope(r,r.volEnvelope,l.volData),a=a*r.volEnvelope.value>>6,o|=H,r.fadeEnabled&&(r.fadeVolume-=r.fadeDelta,r.fadeVolume<0?(a=0,r.fadeVolume=0,r.fadeEnabled=0,r.volEnvelope.value=0,r.volEnvelope.stopped=1,r.panEnvelope.stopped=1):a=a*r.fadeVolume>>16)):r.keyoff&&(a=0,o|=H),u=r.panning,l.panEnabled&&(r.panEnabled&&!r.panEnvelope.stopped&&this.envelope(r,r.panEnvelope,l.panData),u=r.panEnvelope.value<<2,o|=he,u<0?u=0:u>255&&(u=255)),o&H&&(a<0?a=0:a>64&&(a=64),e.volume=Ji[a*this.master>>6],e.lvol=e.volume*e.lpan,e.rvol=e.volume*e.rpan),o&he&&(e.panning=u,e.lpan=Xe[256-u],e.rpan=Xe[u],e.lvol=e.volume*e.lpan,e.rvol=e.volume*e.rpan),o&ne&&(i+=r.period+r.arpDelta+r.vibDelta,this.linear?e.speed=(548077568*Math.pow(2,(4608-i)/768)/this.sampleRate>>0)/65536:e.speed=(65536*(14317456/i)/this.sampleRate>>0)/65536,e.delta=e.speed>>0,e.speed-=e.delta),r=r.next}},accurate:{value:function(){for(var e,i,o,l,u,r,a,c,h,n=this.voices[0],d;n;){if(e=n.channel,o=n.flags,n.flags=0,o&He&&(e.sample&&(o|=Ue,e.mixCounter=220,e.oldSample=null,e.oldPointer=-1,e.enabled&&(e.oldDir=e.dir,e.oldFraction=e.fraction,e.oldSpeed=e.speed,e.oldSample=e.sample,e.oldPointer=e.pointer,e.oldLength=e.length,e.lmixRampD=e.lvol,e.lmixDeltaD=e.lvol/220,e.rmixRampD=e.rvol,e.rmixDeltaD=e.rvol/220)),e.dir=1,e.fraction=0,e.sample=n.sample,e.pointer=n.sampleOffset,e.length=n.sample.length,e.enabled=e.sample.data?1:0,n.playing=n.instrument,n.sampleOffset=0),l=n.playing,i=l.vibratoSpeed?n.autoVibrato():0,d=n.volume+n.volDelta,l.volEnabled?(n.volEnabled&&!n.volEnvelope.stopped&&this.envelope(n,n.volEnvelope,l.volData),d=d*n.volEnvelope.value>>6,o|=H,n.fadeEnabled&&(n.fadeVolume-=n.fadeDelta,n.fadeVolume<0?(d=0,n.fadeVolume=0,n.fadeEnabled=0,n.volEnvelope.value=0,n.volEnvelope.stopped=1,n.panEnvelope.stopped=1):d=d*n.fadeVolume>>16)):n.keyoff&&(d=0,o|=H),a=n.panning,l.panEnabled&&(n.panEnabled&&!n.panEnvelope.stopped&&this.envelope(n,n.panEnvelope,l.panData),a=n.panEnvelope.value<<2,o|=he,a<0?a=0:a>255&&(a=255)),!e.enabled){e.volCounter=0,e.panCounter=0,n=n.next;continue}o&H&&(d<0?d=0:d>64&&(d=64),d=Ji[d*this.master>>6],r=d*Xe[256-a],h=d*Xe[a],d!==e.volume&&!e.mixCounter?(e.volCounter=o&Ue?220:this.mixer.samplesTick,e.lvolDelta=(r-e.lvol)/e.volCounter,e.rvolDelta=(h-e.rvol)/e.volCounter):(e.lvol=r,e.rvol=h),e.volume=d),o&he&&(u=Xe[256-a],c=Xe[a],a!==e.panning&&!e.mixCounter&&!e.volCounter?(e.panCounter=this.mixer.samplesTick,e.lpanDelta=(u-e.lpan)/e.panCounter,e.rpanDelta=(c-e.rpan)/e.panCounter):(e.lpan=u,e.rpan=c),e.panning=a),o&ne&&(i+=n.period+n.arpDelta+n.vibDelta,this.linear?e.speed=(548077568*Math.pow(2,(4608-i)/768)/this.sampleRate>>0)/65536:e.speed=(65536*(14317456/i)/this.sampleRate>>0)/65536),e.mixCounter&&(e.lmixRampU=0,e.lmixDeltaU=e.lvol/220,e.rmixRampU=0,e.rmixDeltaU=e.rvol/220),n=n.next}}},envelope:{value:function(e,i,o){var l=i.position,u=o.points[l],r;if(i.frame===u.frame){if(o.flags&Yi&&l===o.loopEnd&&(l=i.position=o.loopStart,u=o.points[l],i.frame=u.frame),l===o.total-1){i.value=u.value,i.stopped=1;return}if(o.flags&er&&l===o.sustain&&!e.fadeEnabled){i.value=u.value;return}i.position++,r=o.points[i.position],i.delta=(r.value-u.value<<8)/(r.frame-u.frame)>>0||0,i.fraction=u.value<<8}else i.fraction+=i.delta;i.value=i.fraction>>8,i.frame++}},amiga:{value:function(e,i){var o=0,l=mi[++e];return i<0?o=(mi[--e]-l)/64:i>0&&(o=(l-mi[++e])/64),l-o*i>>0}},retrig:{value:function(e){switch(e.retrigx){case 1:e.volume--;break;case 2:e.volume++;break;case 3:e.volume-=4;break;case 4:e.volume-=8;break;case 5:e.volume-=16;break;case 6:e.volume=(e.volume<<1)/3;break;case 7:e.volume>>=1;break;case 8:e.volume=e.sample.volume;break;case 9:e.volume++;break;case 10:e.volume+=2;break;case 11:e.volume+=4;break;case 12:e.volume+=8;break;case 13:e.volume+=16;break;case 14:e.volume=e.volume*3>>1;break;case 15:e.volume<<=1;break;default:break}e.volume<0?e.volume=0:e.volume>64&&(e.volume=64),e.flags|=H}}}),Object.seal(t)}var ne=1,H=2,he=4,He=8,Qa=15,Ue=32,Wi=1,er=2,Yi=4,tr=0,ir=118,pi=97,ar=[0,-2,-3,-5,-6,-8,-9,-11,-12,-14,-16,-17,-19,-20,-22,-23,-24,-26,-27,-29,-30,-32,-33,-34,-36,-37,-38,-39,-41,-42,-43,-44,-45,-46,-47,-48,-49,-50,-51,-52,-53,-54,-55,-56,-56,-57,-58,-59,-59,-60,-60,-61,-61,-62,-62,-62,-63,-63,-63,-64,-64,-64,-64,-64,-64,-64,-64,-64,-64,-64,-63,-63,-63,-62,-62,-62,-61,-61,-60,-60,-59,-59,-58,-57,-56,-56,-55,-54,-53,-52,-51,-50,-49,-48,-47,-46,-45,-44,-43,-42,-41,-39,-38,-37,-36,-34,-33,-32,-30,-29,-27,-26,-24,-23,-22,-20,-19,-17,-16,-14,-12,-11,-9,-8,-6,-5,-3,-2,0,2,3,5,6,8,9,11,12,14,16,17,19,20,22,23,24,26,27,29,30,32,33,34,36,37,38,39,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,56,57,58,59,59,60,60,61,61,62,62,62,63,63,63,64,64,64,64,64,64,64,64,64,64,64,63,63,63,62,62,62,61,61,60,60,59,59,58,57,56,56,55,54,53,52,51,50,49,48,47,46,45,44,43,42,41,39,38,37,36,34,33,32,30,29,27,26,24,23,22,20,19,17,16,14,12,11,9,8,6,5,3,2],Ki=[0,24,49,74,97,120,141,161,180,197,212,224,235,244,250,253,255,253,250,244,235,224,212,197,180,161,141,120,97,74,49,24],Xe=[0,.04417,.062489,.076523,.088371,.098821,.108239,.116927,.124977,.132572,.139741,.146576,.153077,.159335,.16535,.171152,.176772,.18221,.187496,.19263,.197643,.202503,.207273,.211951,.216477,.220943,.225348,.229631,.233854,.237985,.242056,.246066,.249985,.253873,.25767,.261437,.265144,.268819,.272404,.275989,.279482,.282976,.286409,.289781,.293153,.296464,.299714,.302965,.306185,.309344,.312473,.315602,.318671,.321708,.324746,.327754,.3307,.333647,.336563,.339449,.342305,.345161,.347986,.350781,.353545,.356279,.359013,.361717,.364421,.367094,.369737,.37238,.374992,.377574,.380157,.382708,.38526,.387782,.390303,.392794,.395285,.397746,.400176,.402606,.405037,.407437,.409836,.412206,.414576,.416915,.419254,.421563,.423841,.42618,.428458,.430737,.432985,.435263,.437481,.439729,.441916,.444134,.446321,.448508,.450665,.452852,.455009,.457136,.459262,.461389,.463485,.465611,.467708,.469773,.471839,.473935,.47597,.478036,.480072,.482077,.484112,.486117,.488122,.490127,.492101,.494106,.496051,.498025,.5,.501944,.503888,.505802,.507746,.50966,.511574,.513488,.515371,.517255,.519138,.521022,.522905,.524758,.526611,.528465,.530318,.53214,.533993,.535816,.537639,.539462,.541254,.543046,.544839,.546631,.548423,.550216,.551978,.553739,.555501,.557263,.558995,.560757,.562489,.56422,.565952,.567683,.569384,.571116,.572817,.574518,.57622,.57789,.579592,.581262,.582964,.584634,.586305,.587946,.589617,.591257,.592928,.594568,.596209,.597849,.599459,.6011,.60271,.60435,.60596,.60757,.60915,.61076,.61237,.61395,.61556,.617139,.618719,.620268,.621848,.623428,.624977,.626557,.628106,.629655,.631205,.632754,.634303,.635822,.637372,.63889,.64044,.641959,.643478,.644966,.646485,.648004,.649523,.651012,.6525,.653989,.655477,.656966,.658454,.659943,.661431,.66289,.664378,.665836,.667294,.668783,.670241,.671699,.673127,.674585,.676043,.677471,.678929,.680357,.681785,.683213,.684641,.686068,.687496,.688894,.690321,.691749,.693147,.694574,.695972,.697369,.698767,.700164,.701561,.702928,.704326,.705723,.70711],Ji=[0,.005863,.013701,.021569,.029406,.037244,.045082,.052919,.060757,.068625,.076463,.0843,.092138,.099976,.107844,.115681,.123519,.131357,.139194,.147032,.1549,.162738,.170575,.178413,.186251,.194119,.201956,.209794,.217632,.225469,.233307,.241175,.249013,.25685,.264688,.272526,.280394,.288231,.296069,.303907,.311744,.319582,.32745,.335288,.343125,.350963,.3588,.366669,.374506,.382344,.390182,.398019,.405857,.413725,.421563,.4294,.437238,.445076,.452944,.460781,.468619,.476457,.484294,.492132,.5],mi=[29024,27392,25856,24384,23040,21696,20480,19328,18240,17216,16256,15360,14512,13696,12928,12192,11520,10848,10240,9664,9120,8608,8128,7680,7256,6848,6464,6096,5760,5424,5120,4832,4560,4304,4064,3840,3628,3424,3232,3048,2880,2712,2560,2416,2280,2152,2032,1920,1814,1712,1616,1524,1440,1356,1280,1208,1140,1076,1016,960,907,856,808,762,720,678,640,604,570,538,508,480,453,428,404,381,360,339,320,302,285,269,254,240,227,214,202,190,180,169,160,151,142,134,127,120,113,107,101,95,90,85,80,75,71,67,63,60,57,53,50,48,45,42,40,38,36,34,32,30,28],Zi=Za;function Wt(f){return Object.create(null,{index:{value:f,writable:!0},next:{value:null,writable:!0},channel:{value:null,writable:!0},sample:{value:null,writable:!0},enabled:{value:0,writable:!0},period:{value:0,writable:!0},effect:{value:0,writable:!0},param:{value:0,writable:!0},volume:{value:0,writable:!0},portaDir:{value:0,writable:!0},portaPeriod:{value:0,writable:!0},portaSpeed:{value:0,writable:!0},vibratoPos:{value:0,writable:!0},vibratoSpeed:{value:0,writable:!0},initialize:{value:function(){this.channel=null,this.sample=null,this.enabled=0,this.period=0,this.effect=0,this.param=0,this.volume=0,this.portaDir=0,this.portaPeriod=0,this.portaSpeed=0,this.vibratoPos=0,this.vibratoSpeed=0}}})}function rr(f){var t=Xt(f);return Object.defineProperties(t,{id:{value:"MKPlayer"},track:{value:null,writable:!0},patterns:{value:[],writable:!0},samples:{value:[],writable:!0},length:{value:0,writable:!0},restart:{value:0,writable:!0},voices:{value:[],writable:!0},trackPos:{value:0,writable:!0},patternPos:{value:0,writable:!0},jumpFlag:{value:0,writable:!0},vibratoDepth:{value:0,writable:!0},restartSave:{value:0,writable:!0},force:{set:function(e){e<gi?e=gi:e>Be&&(e=Be),this.version=e,e===Be?this.vibratoDepth=6:this.vibratoDepth=7,e===Qi?(this.restartSave=this.restart,this.restart=0):(this.restart=this.restartSave,this.restartSave=0)}},initialize:{value:function(){var e=this.voices[0];for(this.reset(),this.force=this.version,this.speed=6,this.trackPos=0,this.patternPos=0,this.jumpFlag=0;e;)e.initialize(),e.channel=this.mixer.channels[e.index],e.sample=this.samples[0],e=e.next}},loader:{value:function(e){var i=0,o,l,u,r,a,c=0,h;if(!(e.length<2106)&&(e.position=1080,l=e.readString(4),!(l!=="M.K."&&l!=="FLT4"))){for(e.position=0,this.title=e.readString(20),this.version=gi,e.position+=22,o=1;o<32;++o){if(h=e.readUshort(),!h){this.samples[o]=null,e.position+=28;continue}a=ht(),e.position-=24,a.name=e.readString(22),a.length=h<<1,e.position+=3,a.volume=e.readUbyte(),a.loop=e.readUshort()<<1,a.repeat=e.readUshort()<<1,e.position+=22,a.pointer=c,c+=a.length,this.samples[o]=a,a.length>32768&&(this.version=or)}for(e.position=950,this.length=e.readUbyte(),h=e.readUbyte(),this.restart=h<this.length?h:0,o=0;o<128;++o)h=e.readUbyte()<<8,this.track[o]=h,h>i&&(i=h);for(e.position=1084,i+=256,this.patterns.length=i,o=0;o<i;++o)if(r=Ht(),h=e.readUint(),r.note=h>>16&4095,r.effect=h>>8&15,r.sample=h>>24&240|h>>12&15,r.param=h&255,this.patterns[o]=r,(r.sample>31||!this.samples[r.sample])&&(r.sample=0),(r.effect===3||r.effect===4)&&(this.version=Qi),(r.effect===5||r.effect===6)&&(this.version=Be),r.effect>6&&r.effect<10){this.version=0;return}for(this.mixer.store(e,c),o=1;o<32;++o)if(a=this.samples[o],!!a)for(a.name.indexOf("2.0")>-1&&(this.version=Be),a.loop?(a.loopPtr=a.pointer+a.loop,a.length=a.loop+a.repeat):(a.loopPtr=this.mixer.memory.length,a.repeat=2),c=a.pointer+4,u=a.pointer;u<c;++u)this.mixer.memory[u]=0;a=ht(),a.pointer=a.loopPtr=this.mixer.memory.length,a.length=a.repeat=2,this.samples[0]=a,this.version<Be&&this.restart!==127&&(this.version=nr)}}},process:{value:function(){var e,i,o,l,u,r,a,c,h,n=this.voices[0];if(this.tick)for(;n;){if(e=n.channel,!n.effect&&!n.param){e.period=n.period,n=n.next;continue}switch(n.effect){case 0:if(h=this.tick%3,!h){e.period=n.period,n=n.next;continue}for(h===1?h=n.param>>4:h=n.param&15,u=n.period&4095,o=37-h,i=0;i<o;++i)if(u>=ea[i]){e.period=ea[i+h];break}break;case 1:n.period-=n.param,n.period<113&&(n.period=113),e.period=n.period;break;case 2:n.period+=n.param,n.period>856&&(n.period=856),e.period=n.period;break;case 3:case 5:n.effect===5?c=1:n.param&&(n.portaSpeed=n.param,n.param=0),n.portaPeriod&&(n.portaDir?(n.period-=n.portaSpeed,n.period<=n.portaPeriod&&(n.period=n.portaPeriod,n.portaPeriod=0)):(n.period+=n.portaSpeed,n.period>=n.portaPeriod&&(n.period=n.portaPeriod,n.portaPeriod=0))),e.period=n.period;break;case 4:case 6:n.effect===6?c=1:n.param&&(n.vibratoSpeed=n.param),h=n.vibratoPos>>2&31,h=(n.vibratoSpeed&15)*sr[h]>>this.vibratoDepth,n.vibratoPos>127?e.period=n.period-h:e.period=n.period+h,h=n.vibratoSpeed>>2&60,n.vibratoPos=n.vibratoPos+h&255;break;case 10:c=1;break;default:break}c&&(h=n.param>>4,c=0,h?n.volume+=h:n.volume-=n.param&15,n.volume<0?n.volume=0:n.volume>64&&(n.volume=64),e.volume=n.volume),n=n.next}else for(l=this.track[this.trackPos]+this.patternPos;n;){switch(e=n.channel,n.enabled=0,r=this.patterns[l+n.index],n.effect=r.effect,n.param=r.param,r.sample?(a=n.sample=this.samples[r.sample],e.volume=n.volume=a.volume):a=n.sample,r.note&&(n.effect===3||n.effect===5?r.note<n.period?(n.portaDir=1,n.portaPeriod=r.note):r.note>n.period?(n.portaDir=0,n.portaPeriod=r.note):n.portaPeriod=0:(n.enabled=1,n.vibratoPos=0,e.enabled=0,e.pointer=a.pointer,e.length=a.length,e.period=n.period=r.note)),n.effect){case 11:this.trackPos=n.param-1,this.jumpFlag^=1;break;case 12:e.volume=n.param,this.version===Be&&(n.volume=n.param);break;case 13:this.jumpFlag^=1;break;case 14:this.mixer.filter.active=n.param^1;break;case 15:h=n.param,h<1?h=1:h>31&&(h=31),this.speed=h,this.tick=0;break;default:break}n.enabled&&(e.enabled=1),e.pointer=a.loopPtr,e.length=a.repeat,n=n.next}++this.tick===this.speed&&(this.tick=0,this.patternPos+=4,(this.patternPos===256||this.jumpFlag)&&(this.patternPos=this.jumpFlag=0,this.trackPos=++this.trackPos&127,this.trackPos===this.length&&(this.trackPos=this.restart,this.mixer.complete=1)))}}}),t.voices[0]=Wt(0),t.voices[0].next=t.voices[1]=Wt(1),t.voices[1].next=t.voices[2]=Wt(2),t.voices[2].next=t.voices[3]=Wt(3),t.track=new Uint16Array(128),Object.seal(t)}var gi=1,or=2,Qi=3,nr=4,Be=5,ea=[856,808,762,720,678,640,604,570,538,508,480,453,428,404,381,360,339,320,302,285,269,254,240,226,214,202,190,180,170,160,151,143,135,127,120,113,0],sr=[0,24,49,74,97,120,141,161,180,197,212,224,235,244,250,253,255,253,250,244,235,224,212,197,180,161,141,120,97,74,49,24],ta=rr;function Yt(f){return Object.create(null,{index:{value:f,writable:!0},next:{value:null,writable:!0},channel:{value:null,writable:!0},sample:{value:null,writable:!0},enabled:{value:0,writable:!0},loopCtr:{value:0,writable:!0},loopPos:{value:0,writable:!0},step:{value:0,writable:!0},period:{value:0,writable:!0},effect:{value:0,writable:!0},param:{value:0,writable:!0},volume:{value:0,writable:!0},pointer:{value:0,writable:!0},length:{value:0,writable:!0},loopPtr:{value:0,writable:!0},repeat:{value:0,writable:!0},finetune:{value:0,writable:!0},offset:{value:0,writable:!0},portaDir:{value:0,writable:!0},portaPeriod:{value:0,writable:!0},portaSpeed:{value:0,writable:!0},glissando:{value:0,writable:!0},tremoloParam:{value:0,writable:!0},tremoloPos:{value:0,writable:!0},tremoloWave:{value:0,writable:!0},vibratoParam:{value:0,writable:!0},vibratoPos:{value:0,writable:!0},vibratoWave:{value:0,writable:!0},funkPos:{value:0,writable:!0},funkSpeed:{value:0,writable:!0},funkWave:{value:0,writable:!0},initialize:{value:function(){this.channel=null,this.sample=null,this.enabled=0,this.loopCtr=0,this.loopPos=0,this.step=0,this.period=0,this.effect=0,this.param=0,this.volume=0,this.pointer=0,this.length=0,this.loopPtr=0,this.repeat=0,this.finetune=0,this.offset=0,this.portaDir=0,this.portaPeriod=0,this.portaSpeed=0,this.glissando=0,this.tremoloParam=0,this.tremoloPos=0,this.tremoloWave=0,this.vibratoParam=0,this.vibratoPos=0,this.vibratoWave=0,this.funkPos=0,this.funkSpeed=0,this.funkWave=0}}})}function lr(){var f=Ht();return Object.defineProperties(f,{step:{value:0,writable:!0}}),Object.seal(f)}function ia(){var f=ht();return Object.defineProperties(f,{finetune:{value:0,writable:!0},realLen:{value:0,writable:!0}}),Object.seal(f)}function ur(f){var t=Xt(f);return Object.defineProperties(t,{id:{value:"PTPlayer"},track:{value:null,writable:!0},patterns:{value:[],writable:!0},samples:{value:[],writable:!0},length:{value:0,writable:!0},voices:{value:[],writable:!0},trackPos:{value:0,writable:!0},patternPos:{value:0,writable:!0},patternBreak:{value:0,writable:!0},patternDelay:{value:0,writable:!0},breakPos:{value:0,writable:!0},jumpFlag:{value:0,writable:!0},vibratoDepth:{value:0,writable:!0},force:{set:function(e){e<Kt?e=Kt:e>vi&&(e=vi),this.version=e,e<aa?this.vibratoDepth=6:this.vibratoDepth=7}},initialize:{value:function(){var e=this.voices[0];for(this.tempo=125,this.speed=6,this.trackPos=0,this.patternPos=0,this.patternBreak=0,this.patternDelay=0,this.breakPos=0,this.jumpFlag=0,this.reset(),this.force=this.version;e;)e.initialize(),e.channel=this.mixer.channels[e.index],e.sample=this.samples[0],e=e.next}},loader:{value:function(e){var i=0,o,l,u,r,a,c=0,h;if(!(e.length<2106)&&(e.position=1080,l=e.readString(4),!(l!=="M.K."&&l!=="M!K!"))){for(e.position=0,this.title=e.readString(20),this.version=Kt,e.position+=22,o=1;o<32;++o){if(h=e.readUshort(),!h){this.samples[o]=null,e.position+=28;continue}a=ia(),e.position-=24,a.name=e.readString(22),a.length=a.realLen=h<<1,e.position+=2,a.finetune=e.readUbyte()*37,a.volume=e.readUbyte(),a.loop=e.readUshort()<<1,a.repeat=e.readUshort()<<1,e.position+=22,a.pointer=c,c+=a.length,this.samples[o]=a}for(e.position=950,this.length=e.readUbyte(),e.position++,o=0;o<128;++o)h=e.readUbyte()<<8,this.track[o]=h,h>i&&(i=h);for(e.position=1084,i+=256,this.patterns.length=i,o=0;o<i;++o)r=lr(),r.step=h=e.readUint(),r.note=h>>16&4095,r.effect=h>>8&15,r.sample=h>>24&240|h>>12&15,r.param=h&255,this.patterns[o]=r,(r.sample>31||!this.samples[r.sample])&&(r.sample=0),r.effect===15&&r.param>31&&(this.version=aa),r.effect===8&&(this.version=vi);for(this.mixer.store(e,c),o=1;o<32;++o)if(a=this.samples[o],!!a)for(a.loop||a.repeat>4?(a.loopPtr=a.pointer+a.loop,a.length=a.loop+a.repeat):(a.loopPtr=this.mixer.memory.length,a.repeat=2),c=a.pointer+2,u=a.pointer;u<c;++u)this.mixer.memory[u]=0;a=ia(),a.pointer=a.loopPtr=this.mixer.memory.length,a.length=a.repeat=2,this.samples[0]=a}}},process:{value:function(){var e,i,o,l,u,r,a=this.voices[0];if(this.tick)this.effects();else if(this.patternDelay)this.effects();else{for(o=this.track[this.trackPos]+this.patternPos;a;){if(e=a.channel,a.enabled=0,a.step||(e.period=a.period),l=this.patterns[o+a.index],a.step=l.step,a.effect=l.effect,a.param=l.param,l.sample?(u=a.sample=this.samples[l.sample],a.pointer=u.pointer,a.length=u.length,a.loopPtr=a.funkWave=u.loopPtr,a.repeat=u.repeat,a.finetune=u.finetune,e.volume=a.volume=u.volume):u=a.sample,l.note)if((a.step&4080)===3664)a.finetune=(a.param&15)*37;else if(a.effect===3||a.effect===5)if(l.note===a.period)a.portaPeriod=0;else{for(i=a.finetune,r=i+37;i<r&&!(l.note>=Me[i]);++i);i===r&&r--,i>0&&(r=a.finetune/37>>0&8,r&&i--),a.portaPeriod=Me[i],a.portaDir=l.note>a.portaPeriod?0:1}else a.effect===9&&this.moreEffects(a);else{this.moreEffects(a),a=a.next;continue}for(i=0;i<37&&!(l.note>=Me[i]);++i);if(a.period=Me[a.finetune+i],(a.step&4080)===3792){a.funkSpeed&&this.updateFunk(a),this.extended(a),a=a.next;continue}a.vibratoWave<4&&(a.vibratoPos=0),a.tremoloWave<4&&(a.tremoloPos=0),e.enabled=0,e.pointer=a.pointer,e.length=a.length,e.period=a.period,a.enabled=1,this.moreEffects(a),a=a.next}for(a=this.voices[0];a;)e=a.channel,a.enabled&&(e.enabled=1),e.pointer=a.loopPtr,e.length=a.repeat,a=a.next}++this.tick===this.speed&&(this.tick=0,this.patternPos+=4,this.patternDelay&&--this.patternDelay&&(this.patternPos-=4),this.patternBreak&&(this.patternBreak=0,this.patternPos=this.breakPos,this.breakPos=0),(this.patternPos===256||this.jumpFlag)&&(this.patternPos=this.breakPos,this.breakPos=0,this.jumpFlag=0,++this.trackPos===this.length&&(this.trackPos=0,this.mixer.complete=1)))}},effects:{value:function(){for(var e,i,o,l,u,r=this.voices[0],a;r;){if(e=r.channel,r.funkSpeed&&this.updateFunk(r),(r.step&4095)===0){e.period=r.period,r=r.next;continue}switch(r.effect){case 0:if(u=this.tick%3,!u){e.period=r.period,r=r.next;continue}for(u===1?u=r.param>>4:u=r.param&15,i=r.finetune,o=i+37;i<o;++i)if(r.period>=Me[i]){e.period=Me[i+u];break}break;case 1:r.period-=r.param,r.period<113&&(r.period=113),e.period=r.period;break;case 2:r.period+=r.param,r.period>856&&(r.period=856),e.period=r.period;break;case 3:case 5:if(r.effect===5?l=1:(r.portaSpeed=r.param,r.param=0),r.portaPeriod)if(r.portaDir?(r.period-=r.portaSpeed,r.period<=r.portaPeriod&&(r.period=r.portaPeriod,r.portaPeriod=0)):(r.period+=r.portaSpeed,r.period>=r.portaPeriod&&(r.period=r.portaPeriod,r.portaPeriod=0)),r.glissando){for(i=r.finetune,u=i+37;i<u&&!(r.period>=Me[i]);++i);i===u&&i--,e.period=Me[i]}else e.period=r.period;break;case 4:case 6:r.effect===6?l=1:r.param&&(u=r.param&15,u&&(r.vibratoParam=r.vibratoParam&240|u),u=r.param&240,u&&(r.vibratoParam=r.vibratoParam&15|u)),o=r.vibratoPos>>2&31,a=r.vibratoWave&3,a?(u=255,o<<=3,a===1&&(r.vibratoPos>127?u-=o:u=o)):u=ra[o],u=(r.vibratoParam&15)*u>>this.vibratoDepth,r.vibratoPos>127?e.period=r.period-u:e.period=r.period+u,u=r.vibratoParam>>2&60,r.vibratoPos=r.vibratoPos+u&255;break;case 7:e.period=r.period,r.param&&(u=r.param&15,u&&(r.tremoloParam=r.tremoloParam&240|u),u=r.param&240,u&&(r.tremoloParam=r.tremoloParam&15|u)),o=r.tremoloPos>>2&31,a=r.tremoloWave&3,a?(u=255,o<<=3,a===1&&(r.tremoloPos>127?u-=o:u=o)):u=ra[o],u=(r.tremoloParam&15)*u>>6,r.tremoloPos>127?e.volume=r.volume-u:e.volume=r.volume+u,u=r.tremoloParam>>2&60,r.tremoloPos=r.tremoloPos+u&255;break;case 10:l=1;break;case 14:this.extended(r);break;default:break}l&&(l=0,u=r.param>>4,u?r.volume+=u:r.volume-=r.param&15,r.volume<0?r.volume=0:r.volume>64&&(r.volume=64),e.volume=r.volume),r=r.next}}},moreEffects:{value:function(e){var i=e.channel,o;switch(e.funkSpeed&&this.updateFunk(e),e.effect){case 9:e.param&&(e.offset=e.param),o=e.offset<<8,o>=e.length?e.length=2:(e.pointer+=o,e.length-=o);break;case 11:this.trackPos=e.param-1,this.breakPos=0,this.jumpFlag=1;break;case 12:e.volume=e.param,e.volume>64&&(e.volume=64),i.volume=e.volume;break;case 13:this.breakPos=(e.param>>4)*10+(e.param&15),this.breakPos>63?this.breakPos=0:this.breakPos<<=2,this.jumpFlag=1;break;case 14:this.extended(e);break;case 15:if(!e.param)return;e.param<32?this.speed=e.param:this.mixer.samplesTick=this.sampleRate*2.5/e.param>>0,this.tick=0;break;default:break}}},extended:{value:function(e){var i=e.channel,o=e.param>>4,l,u,r,a=e.param&15;switch(o){case 0:this.mixer.filter.active=a;break;case 1:if(this.tick)return;e.period-=a,e.period<113&&(e.period=113),i.period=e.period;break;case 2:if(this.tick)return;e.period+=a,e.period>856&&(e.period=856),i.period=e.period;break;case 3:e.glissando=a;break;case 4:e.vibratoWave=a;break;case 5:e.finetune=a*37;break;case 6:if(this.tick)return;a?(e.loopCtr?e.loopCtr--:e.loopCtr=a,e.loopCtr&&(this.breakPos=e.loopPos<<2,this.patternBreak=1)):e.loopPos=this.patternPos>>2;break;case 7:e.tremoloWave=a;break;case 8:for(u=e.length-2,r=this.mixer.memory,l=e.loopPtr;l<u;)r[l]=(r[l]+r[++l])*.5;r[++l]=(r[l]+r[0])*.5;break;case 9:if(this.tick||!a||!e.period||this.tick%a)return;i.enabled=0,i.pointer=e.pointer,i.length=e.length,i.delay=30,i.enabled=1,i.pointer=e.loopPtr,i.length=e.repeat,i.period=e.period;break;case 10:if(this.tick)return;e.volume+=a,e.volume>64&&(e.volume=64),i.volume=e.volume;break;case 11:if(this.tick)return;e.volume-=a,e.volume<0&&(e.volume=0),i.volume=e.volume;break;case 12:this.tick===a&&(i.volume=e.volume=0);break;case 13:if(this.tick!==a||!e.period)return;i.enabled=0,i.pointer=e.pointer,i.length=e.length,i.delay=30,i.enabled=1,i.pointer=e.loopPtr,i.length=e.repeat,i.period=e.period;break;case 14:if(this.tick||this.patternDelay)return;this.patternDelay=++a;break;case 15:if(this.tick)return;e.funkSpeed=a,a&&this.updateFunk(e);break;default:break}}},updateFunk:{value:function(e){var i=e.channel,o,l,u=fr[e.funkSpeed];e.funkPos+=u,!(e.funkPos<128)&&(e.funkPos=0,this.version===Kt?(o=e.pointer+e.sample.realLen-e.repeat,l=e.funkWave+e.repeat,l>o&&(l=e.loopPtr,i.length=e.repeat),i.pointer=e.funkWave=l):(o=e.loopPtr+e.repeat,l=e.funkWave+1,l>=o&&(l=e.loopPtr),this.mixer.memory[l]=-this.mixer.memory[l]))}}}),t.voices[0]=Yt(0),t.voices[0].next=t.voices[1]=Yt(1),t.voices[1].next=t.voices[2]=Yt(2),t.voices[2].next=t.voices[3]=Yt(3),t.track=new Uint16Array(128),Object.seal(t)}var Kt=1,aa=2,vi=3,Me=[856,808,762,720,678,640,604,570,538,508,480,453,428,404,381,360,339,320,302,285,269,254,240,226,214,202,190,180,170,160,151,143,135,127,120,113,0,850,802,757,715,674,637,601,567,535,505,477,450,425,401,379,357,337,318,300,284,268,253,239,225,213,201,189,179,169,159,150,142,134,126,119,113,0,844,796,752,709,670,632,597,563,532,502,474,447,422,398,376,355,335,316,298,282,266,251,237,224,211,199,188,177,167,158,149,141,133,125,118,112,0,838,791,746,704,665,628,592,559,528,498,470,444,419,395,373,352,332,314,296,280,264,249,235,222,209,198,187,176,166,157,148,140,132,125,118,111,0,832,785,741,699,660,623,588,555,524,495,467,441,416,392,370,350,330,312,294,278,262,247,233,220,208,196,185,175,165,156,147,139,131,124,117,110,0,826,779,736,694,655,619,584,551,520,491,463,437,413,390,368,347,328,309,292,276,260,245,232,219,206,195,184,174,164,155,146,138,130,123,116,109,0,820,774,730,689,651,614,580,547,516,487,460,434,410,387,365,345,325,307,290,274,258,244,230,217,205,193,183,172,163,154,145,137,129,122,115,109,0,814,768,725,684,646,610,575,543,513,484,457,431,407,384,363,342,323,305,288,272,256,242,228,216,204,192,181,171,161,152,144,136,128,121,114,108,0,907,856,808,762,720,678,640,604,570,538,508,480,453,428,404,381,360,339,320,302,285,269,254,240,226,214,202,190,180,170,160,151,143,135,127,120,0,900,850,802,757,715,675,636,601,567,535,505,477,450,425,401,379,357,337,318,300,284,268,253,238,225,212,200,189,179,169,159,150,142,134,126,119,0,894,844,796,752,709,670,632,597,563,532,502,474,447,422,398,376,355,335,316,298,282,266,251,237,223,211,199,188,177,167,158,149,141,133,125,118,0,887,838,791,746,704,665,628,592,559,528,498,470,444,419,395,373,352,332,314,296,280,264,249,235,222,209,198,187,176,166,157,148,140,132,125,118,0,881,832,785,741,699,660,623,588,555,524,494,467,441,416,392,370,350,330,312,294,278,262,247,233,220,208,196,185,175,165,156,147,139,131,123,117,0,875,826,779,736,694,655,619,584,551,520,491,463,437,413,390,368,347,328,309,292,276,260,245,232,219,206,195,184,174,164,155,146,138,130,123,116,0,868,820,774,730,689,651,614,580,547,516,487,460,434,410,387,365,345,325,307,290,274,258,244,230,217,205,193,183,172,163,154,145,137,129,122,115,0,862,814,768,725,684,646,610,575,543,513,484,457,431,407,384,363,342,323,305,288,272,256,242,228,216,203,192,181,171,161,152,144,136,128,121,114,0],ra=[0,24,49,74,97,120,141,161,180,197,212,224,235,244,250,253,255,253,250,244,235,224,212,197,180,161,141,120,97,74,49,24],fr=[0,5,6,7,8,10,11,13,16,19,22,26,32,43,64,128],oa=ur;function hr(){var f=Object.create(null,{player:{value:null,writable:!0},index:{value:0,writable:!0},amiga:{value:null,writable:!0},mixer:{value:null,writable:!0},tracker:{get:function(){return this.player?na[this.index+this.player.version]:na[0]}},load:{value:function(t){var e,i;if(t.view||(t=hi(t)),t.endian=1,t.position=0,t.readUint()===67324752&&window.neoart.Unzip,!t)return null;if(this.player&&this.player.id!=="STPlayer"&&(this.player.load(t),this.player.version))return this.player;if(t.length>336&&(t.position=38,e=t.readString(20),(e==="FastTracker v2.00   "||e==="FastTracker v 2.00  "||e==="Sk@le Tracker"||e==="MadTracker 2.0"||e==="MilkyTracker        "||e==="DigiBooster Pro 2.18"||e.indexOf("OpenMPT")!==-1)&&(this.player=Zi(this.mixer),this.player.load(t),this.player.version)))return this.index=yr,this.player;if(t.endian=0,t.length>2105){if(t.position=1080,e=t.readString(4),e==="M.K."||e==="FLT4"){if(this.player=ta(this.amiga),this.player.load(t),this.player.version)return this.index=dr,this.player}else if(e==="FEST"&&(this.player=window.neoart.HMPlayer(this.amiga),this.player.load(t),this.player.version))return this.index=mr,this.player}return t.length>2105&&(t.position=1080,e=t.readString(4),(e==="M.K."||e==="M!K!")&&(this.player=oa(this.amiga),this.player.load(t),this.player.version))?(this.index=pr,this.player):t.length>5220&&(this.player=window.neoart.S1Player(this.amiga),this.player.load(t),this.player.version)?(this.index=gr,this.player):(t.position=0,i=t.readUshort(),t.position=0,e=t.readString(4),(e==="COSO"||i===24576||i===24578||i===24590||i===24598)&&(this.player=window.neoart.JHPlayer(this.amiga),this.player.load(t),this.player.version)?(this.index=xr,this.player):(t.position=0,i=t.readUshort(),this.player=window.neoart.DWPlayer(this.amiga),this.player.load(t),this.player.version?(this.index=vr,this.player):(t.position=0,i=t.readUshort(),i===24576&&(this.player=window.neoart.RHPlayer(this.amiga),this.player.load(t),this.player.version)?(this.index=br,this.player):t.length>1625&&(this.player=window.neoart.STPlayer(this.amiga),this.player.load(t),this.player.version)?(this.index=cr,this.player):(t.clear(),this.index=0,this.player=null))))}}});return f.amiga=ci(),Object.seal(f)}var cr=0,dr=4,pr=9,mr=12,gr=26,vr=28,xr=30,br=32,yr=33,na=["Unknown Format","Ultimate SoundTracker","D.O.C. SoundTracker 9","Master SoundTracker","D.O.C. SoundTracker 2.0/2.2","SoundTracker 2.3","SoundTracker 2.4","NoiseTracker 1.0","NoiseTracker 1.1","NoiseTracker 2.0","ProTracker 1.0","ProTracker 1.1/2.1","ProTracker 1.2/2.0","His Master's NoiseTracker","SoundFX 1.0/1.7","SoundFX 1.8","SoundFX 1.945","SoundFX 1.994/2.0","BP SoundMon V1","BP SoundMon V2","BP SoundMon V3","Delta Music 1.0","Delta Music 2.0","Digital Mugician","Digital Mugician 7 Voices","Future Composer 1.0/1.3","Future Composer 1.4","SidMon 1.0","SidMon 2.0","David Whittaker","FredEd","Jochen Hippel","Jochen Hippel COSO","Rob Hubbard","FastTracker II","Sk@leTracker","MadTracker 2.0","MilkyTracker","DigiBooster Pro 2.18","OpenMPT"],wr=hr(),sa=wr;var Jt=class{constructor(t={}){this.baseRawUrl="https://raw.githubusercontent.com/michioxd/keygen-music/master/",this.indexUrl=this.baseRawUrl+"index.json",this.trackList=[],this.history=[],this.maxHistory=50,this.historyCursor=-1,this.currentPlayer=null,this.isPlaying=!1,this.pollInterval=null,this._opId=0,this.onTrackChange=t.onTrackChange||(()=>{}),this.onError=t.onError||(()=>{}),this.hasFetchedIndex=!1,this.currentTrack=null}async init(){if(!this.hasFetchedIndex)try{let t=await fetch(this.indexUrl);if(!t.ok)throw new Error("Network response was not ok");let e=await t.json(),i=["xm","mod","s3m","it"];this.trackList=e.filter(o=>o.fileExtension&&i.includes(o.fileExtension.toLowerCase())),this.hasFetchedIndex=!0}catch(t){throw console.warn("Jukebox offline or failed to fetch index:",t),this.trackList=[],this.onError("NO INTERNET OR BLOCKED ... TRY AGAIN?"),t}}async playNext(t=null){let e=++this._opId;this.stop();try{if(!this.hasFetchedIndex&&(await this.init(),e!==this._opId))return;if(this.trackList.length===0){console.warn("No tracks available in Jukebox.");return}let i=null;if(t&&typeof t=="object"){let{title:o,trackTitle:l,artist:u}=t,r=this.trackList.filter(a=>{let c=!u||a.artist&&a.artist.toLowerCase()===u.toLowerCase(),h=!o||a.title&&a.title.toLowerCase()===o.toLowerCase(),n=!l||a.trackTitle&&a.trackTitle.toLowerCase()===l.toLowerCase();return c&&h&&n});r.length===0?console.warn("Jukebox: NO matches found for target object:",t):r.length>1&&console.warn(`Jukebox: ${r.length} matches found. Refine your search!`,r),i=r[0]||null}else if(t&&typeof t=="string"){let o=this.trackList.filter(l=>l.title&&l.title.toLowerCase()===t.toLowerCase());o.length===0?console.warn("Jukebox: NO matches found for target title string:",t):o.length>1&&console.warn(`Jukebox: ${o.length} matches found for title string.`,o),i=o[0]||null}if(!i&&!t&&this.historyCursor<this.history.length-1)this.historyCursor++,i=this.trackList[this.history[this.historyCursor]];else if(!i){let o=this.trackList.filter((r,a)=>!this.history.includes(a));o.length===0&&(this.history=[],this.historyCursor=-1);let l=o.length>0?o:this.trackList;i=l[Math.floor(Math.random()*l.length)];let u=this.trackList.indexOf(i);this.historyCursor<this.history.length-1&&(this.history=this.history.slice(0,this.historyCursor+1)),this.history.push(u),this.history.length>this.maxHistory&&this.history.shift(),this.historyCursor=this.history.length-1}await this._playTrack(i,e)}catch(i){console.warn("Jukebox track fetch failed:",i),this.onError("NO INTERNET OR BLOCKED ... TRY AGAIN?")}}async playPrevious(){if(this.historyCursor>0){let t=++this._opId;this.stop(),this.historyCursor--;let e=this.trackList[this.history[this.historyCursor]];try{await this._playTrack(e,t)}catch(i){console.warn("Jukebox track fetch failed:",i),this.onError("NO INTERNET OR BLOCKED ... TRY AGAIN?")}}}async _playTrack(t,e){let i=t.path.split("/").map(a=>encodeURIComponent(a)).join("/"),o=this.baseRawUrl+i,l=await fetch(o);if(!l.ok)throw new Error("Failed to fetch audio file");if(e!==this._opId)return;let u=await l.arrayBuffer();if(e!==this._opId)return;let r=null;try{r=sa.load(u)}catch(a){console.warn("Jukebox: unsupported format for track, skipping:",t.title,a.message),e===this._opId&&setTimeout(()=>this.playNext(),100);return}e===this._opId&&(this.currentPlayer=r,this.currentPlayer?(this.currentTrack=t,typeof this.currentPlayer.loopSong<"u"&&(this.currentPlayer.loopSong=1),this.currentPlayer.play(),this.isPlaying=!0,this.onTrackChange(t),this.setupCompletionPolling()):setTimeout(()=>this.playNext(),100))}setupCompletionPolling(){this.pollInterval&&clearInterval(this.pollInterval);let t=Date.now();this.pollInterval=setInterval(()=>{if(!this.currentPlayer)return this.stopPolling();let e=!1;this.currentPlayer.amiga&&this.currentPlayer.amiga.playing===!1&&(e=!0),this.currentPlayer.mixer&&this.currentPlayer.mixer.playing===!1&&(e=!0),this.currentPlayer.stopped&&(e=!0),this.currentPlayer.playing===!1&&(e=!0),e&&this.playNext()},1e3)}stopPolling(){this.pollInterval&&(clearInterval(this.pollInterval),this.pollInterval=null)}stop(){if(this.stopPolling(),this.isPlaying=!1,this.currentPlayer){try{this.currentPlayer.stop()}catch{}this.currentPlayer=null}}};var la=`:root {
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
    height: calc(var(--tuner-height) - var(--afx-bottom-offset, 0px));
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
}`;var V=class f{static init(t={}){console.log("AnkiFX: Initialized.");let e={deckTitle:"AnkiFX Deck",deckAuthor:"Anonymous",termsText:"No terms provided.",sources:[],marquee:"ANKIFX ENGINE INITIALIZED ...",defaultEffect:"geometry",debug:!1,countdown:30,marqueePosition:"top",...window.AnkiFX_Config||{},...t};Array.isArray(e.sources)||(e.sources=[]);let i=parseInt(e.countdown,10);e.countdown=isNaN(i)?30:Math.max(0,i),e.isConfigFileError=typeof e.termsText!="string"||e.termsText.trim()===""||e.termsText==="No terms provided.";let o=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);if(document.getElementById("ankifx-overlay")&&document.getElementById("ankifx-overlay").classList.contains("afx-agreed-state")){let d=document.getElementById("qa");d&&(d.style.position="relative",d.style.zIndex="10"),this.sharedGL||(this.sharedGL=document.getElementById("afx-shared-gl")),this.shared2D||(this.shared2D=document.getElementById("afx-shared-2d")),this.sharedMarquee||(this.sharedMarquee=document.getElementById("afx-shared-marquee")),this.sharedGL&&!this.glContext&&(this.glContext=this.sharedGL.getContext("webgl",{alpha:!1,antialias:!1})),this.shared2D&&!this.ctx2D&&(this.ctx2D=this.shared2D.getContext("2d")),this.sharedMarquee&&!this.ctxMarquee&&(this.ctxMarquee=this.sharedMarquee.getContext("2d"));let v=document.getElementById("ankifx-background");if(v){let s=v.getBoundingClientRect();this.width=s.width;let g=getComputedStyle(document.documentElement),m=parseInt(g.getPropertyValue("--io-header"))||0;this.height=document.documentElement.clientHeight+m,this.dpr=Math.min(window.devicePixelRatio||1,2)}if(!this.currentEffectId){let s=Array.from(document.documentElement.classList).find(g=>g.startsWith("afx-effect-"));s&&(this.currentEffectId=s.replace("afx-effect-",""))}this.defaultMarqueeText=e.marquee,this.marquee&&(this.marquee.setText(e.marquee),this.marquee.setPosition(e.marqueePosition));let p=document.getElementById("afx-deck-title");p&&(p.textContent=e.deckTitle);return}document.documentElement.classList.remove("afx-scroll-lock"),document.documentElement.classList.remove("afx-agreed"),["ankifx-overlay","ankifx-background","afx-tuner-ui","afx-btn-back","afx-btn-skip"].forEach(n=>{let d=document.getElementById(n);d&&d.remove()}),this.defaultMarqueeText=e.marquee,this.EFFECT_SONG_MAP={},Object.entries(re).forEach(([n,d])=>{d&&d.preferredTrack&&(this.EFFECT_SONG_MAP[n]=d.preferredTrack)}),this.injectCSS();let l=window.AnkiFX_Config?.defaultEffect,u;l?(u=l,localStorage.setItem("ankifx_preferred_effect",u)):u=localStorage.getItem("ankifx_preferred_effect")||e.defaultEffect||"geometry",re[u]||(console.warn(`AnkiFX: Stale or invalid activeEffect "${u}" detected. Falling back to default.`),u=e.defaultEffect||"geometry",re[u]||(u=Object.keys(re)[0]||"geometry"),localStorage.setItem("ankifx_preferred_effect",u));let{overlay:r,background:a}=this.injectUI(e,o,u),c=document.getElementById("afx-bottom-dock");c&&(this.dockObserver=new ResizeObserver(()=>{let n=c.getBoundingClientRect();document.documentElement.style.setProperty("--afx-dock-height",`${n.height}px`)}),this.dockObserver.observe(c)),this.initTuner(e.debug,u),this._layoutHandler&&(window.removeEventListener("orientationchange",this._layoutHandler),window.removeEventListener("resize",this._layoutHandler)),this._resizeTimeout&&clearTimeout(this._resizeTimeout),this._resizeInterval&&clearInterval(this._resizeInterval),this._layoutHandler=()=>{this._resizeTimeout&&clearTimeout(this._resizeTimeout),this._resizeInterval&&clearInterval(this._resizeInterval),this.handleResize(),this.updateTuner(),this._resizeTimeout=setTimeout(()=>{this.handleResize(),this.updateTuner()},100);let n=0,d=this.width,v=this.height,p=getComputedStyle(document.documentElement),s=parseInt(p.getPropertyValue("--io-header"))||0;this._resizeInterval=setInterval(()=>{if(n+=100,n>=1500){clearInterval(this._resizeInterval);return}let g=getComputedStyle(document.documentElement),m=parseInt(g.getPropertyValue("--io-header"))||0,b=document.getElementById("ankifx-background"),y=b?b.getBoundingClientRect():null,P=y?y.width:window.innerWidth,x=y?y.height:window.innerHeight;(P!==d||x!==v||m!==s)&&(d=P,v=x,s=m,this.tunerAutoUpdate&&(this.tunerOffset=0),this.handleResize(),this.updateTuner())},100)},window.addEventListener("orientationchange",this._layoutHandler),window.addEventListener("resize",this._layoutHandler),this.handleResize(),this.marquee?(this.marquee.setText(e.marquee),this.marquee.setPosition(e.marqueePosition)):(this.marquee=new qt(e.marquee,e.marqueePosition),this.startMarqueeLoop()),this.startEffect(e,a,e.marqueePosition,u);let h=localStorage.getItem("ankifx_marquee_enabled")!=="false";this.marquee&&(this.marquee.enabled=h),f.observer||(f.observer=new MutationObserver(()=>{setTimeout(()=>{let n=document.getElementById("qa");n&&n.querySelector(".ankifx-card")||f.destroy()},20)}),f.observer.observe(document.documentElement,{childList:!0,subtree:!0}))}static injectCSS(){if(document.getElementById("ankifx-styles"))return;let t=document.createElement("style");t.id="ankifx-styles",t.textContent=la,document.head.appendChild(t)}static initTuner(t,e){let i=localStorage.getItem("ankifx_tuner_offset"),o=getComputedStyle(document.documentElement),l=parseInt(o.getPropertyValue("--io-header"))||0,u=i!==null?parseInt(i):0;if(this.tunerOffset=u,this.tunerAutoUpdate=i===null,t&&!document.getElementById("afx-tuner-ui")){let n=document.createElement("div");n.id="afx-tuner-ui",e==="debug"&&n.classList.add("active"),n.innerHTML=`
                <div style="font-weight: bold; color: #ff00ff; margin-bottom: 5px;">VIEWPORT TUNER</div>
                <input type="range" id="afx-tuner-range" min="-300" max="300" value="${u}">
                <div style="margin: 5px 0 10px;">OFFSET: <span id="afx-tuner-offset-val" class="val">0</span>px</div>
                <div style="font-size: 10px; opacity: 0.7; margin-bottom: 5px; line-height: 1.4;">
                    IO-HEADER: <span id="afx-tuner-header-val">0</span>px<br>
                    TOTAL ADJ: <span id="afx-tuner-total-val" class="val">0</span>px
                </div>
            `;let d=document.querySelector("#afx-bottom-dock .afx-control-group-right"),v=document.getElementById("afx-effect-selector-container");d?v?d.insertBefore(n,v):d.appendChild(n):document.body.appendChild(n),["touchstart","touchend","mousedown","mouseup","pointerdown","pointerup","click"].forEach(s=>{n.addEventListener(s,g=>g.stopPropagation(),{passive:!1})});let p=document.getElementById("afx-tuner-range");p.oninput=()=>{this.tunerAutoUpdate=!1,this.tunerOffset=parseInt(p.value),localStorage.setItem("ankifx_tuner_offset",p.value),this.updateTuner()}}this.updateTuner();let r=l,a=window.innerHeight,c=document.documentElement.clientHeight,h=setInterval(()=>{let n=getComputedStyle(document.documentElement),d=parseInt(n.getPropertyValue("--io-header"))||0,v=window.innerHeight,p=document.documentElement.clientHeight;if(d!==r||v!==a||p!==c){if(r=d,a=v,c=p,this.tunerAutoUpdate){this.tunerOffset=0;let s=document.getElementById("afx-tuner-range");s&&(s.value=0)}this.updateTuner()}},50);setTimeout(()=>{clearInterval(h)},2e3)}static updateTuner(){let t=localStorage.getItem("ankifx_tuner_offset"),e=getComputedStyle(document.documentElement),i=parseInt(e.getPropertyValue("--io-header"))||0,o=this.tunerOffset!==void 0?this.tunerOffset:t!==null?parseInt(t):0,l=o+i,u=document.getElementById("afx-tuner-offset-val"),r=document.getElementById("afx-tuner-header-val"),a=document.getElementById("afx-tuner-total-val"),c=document.getElementById("afx-tuner-range");c&&(c.value=o),u&&(u.innerText=o>=0?`+${o}`:o),r&&(r.innerText=i),a&&(a.innerText=l>=0?`+${l}`:l),document.documentElement.style.setProperty("--tuner-height",`calc(100dvh + ${l}px)`);let h=window.innerHeight,n=document.documentElement.clientHeight,d=Math.max(0,h-n);if(document.documentElement.style.setProperty("--afx-bottom-offset",`${d}px`),this.handleResize(),this.currentEffectId&&re[this.currentEffectId]?.onResize){let v=Math.min(window.devicePixelRatio||1,1.5),p=this.currentEffectId==="mandelbrot"||this.currentEffectId==="julia"?v:this.dpr;re[this.currentEffectId].onResize(this.width,this.height,p)}}static handleResize(){let t=document.getElementById("ankifx-background");if(!t||!this.sharedGL||!this.shared2D||!this.sharedMarquee)return;let e=t.getBoundingClientRect();this.width=e.width;let i=getComputedStyle(document.documentElement),o=parseInt(i.getPropertyValue("--io-header"))||0;this.height=document.documentElement.clientHeight+o,this.dpr=Math.min(window.devicePixelRatio||1,2);let l=Math.min(window.devicePixelRatio||1,1.5);if(this.sharedGL.width=this.width*l,this.sharedGL.height=this.height*l,this.sharedGL.style.width=this.width+"px",this.sharedGL.style.height=this.height+"px",this.shared2D.width=this.width*this.dpr,this.shared2D.height=this.height*this.dpr,this.shared2D.style.width=this.width+"px",this.shared2D.style.height=this.height+"px",this.sharedMarquee.width=this.width*this.dpr,this.sharedMarquee.height=this.height*this.dpr,this.sharedMarquee.style.width=this.width+"px",this.sharedMarquee.style.height=this.height+"px",this.glContext&&this.glContext.viewport(0,0,this.sharedGL.width,this.sharedGL.height),this.ctx2D&&(this.ctx2D.setTransform(1,0,0,1,0,0),this.ctx2D.scale(this.dpr,this.dpr)),this.ctxMarquee&&(this.ctxMarquee.setTransform(1,0,0,1,0,0),this.ctxMarquee.scale(this.dpr,this.dpr)),this.currentEffectId&&re[this.currentEffectId]?.onResize){let u=this.currentEffectId==="mandelbrot"||this.currentEffectId==="julia"?l:this.dpr;re[this.currentEffectId].onResize(this.width,this.height,u)}}static injectUI(t,e,i){let o=document.createElement("div");o.id="ankifx-overlay",t.debug&&o.classList.add("afx-debug-active");let l=window.innerWidth||document.documentElement.clientWidth||800,u=l<480?.65:l<768?.8:1,r=Math.max(55,Math.ceil(85*u));(/iPad|iPhone|iPod/.test(navigator.userAgent)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1)&&(t.marqueePosition==="top"?o.style.paddingTop=`calc(1rem + ${r}px)`:o.style.paddingBottom=`calc(1rem + ${r}px)`);let c=localStorage.getItem("ankifx_marquee_enabled")!=="false",h=re.julia?.presets||[],n=l<480,d=n?"\u{1F4DC} ":"\u{1F4DC} TEXT: ",v=n?"":" BGM: ",p=n?d.trim():c?`${d}ON`:`${d}OFF`,s=n?"\u{1F507}":`\u{1F507}${v}OFF`,g=n?"\u{1F50A}":`\u{1F50A}${v}ON`,m=n?"\u{1F3A8} ":"[ Effect: ",b=n?"":" ]",y=Object.values(re).filter(T=>T.id!=="debug"||t.debug).map(T=>`
                <option value="${T.id}" ${i===T.id?"selected":""}>
                    ${m}${T.name}${b}
                </option>
            `).join(""),P=`
            <div id="afx-bottom-dock">
                <div class="afx-control-group-left">
                    <div class="afx-control-row">
                        <label class="afx-toggle"><input type="checkbox" id="afx-text-toggle" ${c?"checked":""}><span class="afx-slider"></span></label>
                        <span id="afx-text-status">${p}</span>
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
                            ${y}
                        </select>
                    </div>
                </div>
            </div>
        `,x=!1;try{x=localStorage.getItem(`ankifx_agreed_${t.deckTitle}`)==="true"}catch{}let F=t.termsText&&t.termsText.trim()!==""&&!x,w="";F&&(w=`
                <div class="afx-dialog">
                    <div class="afx-terms">
                        <h3>${t.deckTitle}</h3>
                        ${t.deckAuthor?`<h4 style="margin: -10px 0 15px 0; opacity: 0.7; font-size: 0.9rem;">by ${t.deckAuthor}</h4>`:""}
                        ${t.termsText}
                    </div>
                    <div class="afx-action-row">
                        <button id="afx-consent-btn" class="afx-btn" disabled>I AGREE</button>
                    </div>
                </div>
            `),o.innerHTML=w;let k=document.createElement("div");for(k.innerHTML=P;k.firstChild;)o.appendChild(k.firstChild);let C=document.createElement("div");C.id="ankifx-background",document.body.appendChild(C),this.sharedGL=document.createElement("canvas"),this.sharedGL.id="afx-shared-gl",this.sharedGL.style.cssText="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;",C.appendChild(this.sharedGL),this.shared2D=document.createElement("canvas"),this.shared2D.id="afx-shared-2d",this.shared2D.style.cssText="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;",C.appendChild(this.shared2D),this.sharedMarquee=document.createElement("canvas"),this.sharedMarquee.id="afx-shared-marquee",this.sharedMarquee.style.cssText="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 5;",C.appendChild(this.sharedMarquee),this.glContext=this.sharedGL.getContext("webgl",{alpha:!1,antialias:!1}),this.ctx2D=this.shared2D.getContext("2d"),this.ctxMarquee=this.sharedMarquee.getContext("2d"),document.body.appendChild(o);let S=document.createElement("div");S.id="afx-top-dock";let B=document.createElement("div");B.className="afx-top-group-left",B.id="afx-top-group-left";let O=document.createElement("div");O.className="afx-top-group-right",O.id="afx-top-group-right";let I=document.createElement("button");I.id="afx-btn-back",I.className="afx-playback-btn",I.textContent="\u23EE\uFE0F";let _=document.createElement("button");if(_.id="afx-btn-skip",_.className="afx-playback-btn",_.textContent="\u23ED\uFE0F",B.appendChild(I),O.appendChild(_),t.debug){let T=document.createElement("div");T.id="afx-global-fps",T.style.cssText="color: #0f0; font-family: monospace; font-size: 14px; font-weight: bold; text-shadow: 1px 1px 2px #000; pointer-events: none;",T.textContent="FPS: --",B.appendChild(T)}S.appendChild(B),S.appendChild(O),o.appendChild(S);let G=T=>{let A=o.classList.contains("afx-agreed-state"),U=T.target.closest("button, input, select, .afx-slider, .afx-toggle, .afx-playback-btn, select option");A?U&&T.stopPropagation():T.stopPropagation()};["touchstart","touchend","mousedown","mouseup","pointerdown","pointerup","click"].forEach(T=>{o.addEventListener(T,G,{passive:!1})});let q=document.getElementById("afx-consent-btn");if(F&&q){let T=t.countdown;if((t.debug||t.isConfigFileError)&&(T=0),T>0){q.textContent=`( ${T} )`;let A=setInterval(()=>{T--,q.textContent=`( ${T} )`,T<=0&&(clearInterval(A),q.textContent="I AGREE",q.disabled=!1)},1e3)}else q.textContent="I AGREE",q.disabled=!1;q.addEventListener("click",A=>{A.stopPropagation(),q.disabled||this.agree(o,t.deckTitle)})}else this.agree(o,t.deckTitle);let $=document.getElementById("afx-audio-toggle");if($){let T=document.getElementById("afx-bgm-status");$.checked&&o.classList.add("afx-music-playing"),f.jukebox=new Jt({onTrackChange:A=>{let U=`NOW PLAYING: ${A.artist} - ${A.title} - ${A.trackTitle}`;t.marquee=U,f.marquee&&f.marquee.setText(U)},onError:A=>{t.marquee=A,f.marquee&&f.marquee.setText(A)}}),$.addEventListener("change",A=>{if(A.target.checked){o.classList.add("afx-bgm-active"),o.classList.add("afx-music-playing"),T.innerHTML=n?"\u{1F50A}":"\u{1F50A} BGM: ON",T.style.color="#ff6b6b";let L=window.AudioContext||window.webkitAudioContext;L&&(window.neoart=window.neoart||{},window.neoart.audioContext||(window.neoart.audioContext=new L)),window.neoart.audioContext&&window.neoart.audioContext.state==="suspended"&&window.neoart.audioContext.resume();let K=localStorage.getItem("ankifx_preferred_effect")||t.defaultEffect||"geometry",ae=t.trackTitle||f.EFFECT_SONG_MAP[K]||null;f.jukebox.playNext(ae)}else o.classList.remove("afx-bgm-active"),o.classList.remove("afx-music-playing"),T.innerHTML=n?"\u{1F507}":"\u{1F507} BGM: OFF",T.style.color="#fff",f.jukebox.stop(),t.marquee=f.defaultMarqueeText,f.marquee&&f.marquee.setText(f.defaultMarqueeText)})}let R=document.getElementById("afx-text-toggle");if(R){let T=document.getElementById("afx-text-status");R.addEventListener("change",A=>{let U=A.target.checked;localStorage.setItem("ankifx_marquee_enabled",U);let L=n?"\u{1F4DC} ":"\u{1F4DC} TEXT: ";T.textContent=n?L.trim():U?`${L}ON`:`${L}OFF`,f.marquee&&(f.marquee.enabled=U)})}I.addEventListener("click",T=>{T.stopPropagation(),f.jukebox&&f.jukebox.playPrevious()}),_.addEventListener("click",T=>{T.stopPropagation(),f.jukebox&&f.jukebox.playNext()});let N=document.getElementById("afx-effect-selector");return N&&N.addEventListener("change",T=>{let A=T.target.value;localStorage.setItem("ankifx_preferred_effect",A),Object.values(re).forEach(L=>L.stop()),this.ctx2D&&this.ctx2D.clearRect(0,0,this.width,this.height),this.glContext&&(this.glContext.clearColor(0,0,0,0),this.glContext.clear(this.glContext.COLOR_BUFFER_BIT)),t.defaultEffect=A;let U=document.getElementById("afx-tuner-ui");if(A==="debug"?(o.classList.add("afx-debug-active"),U&&U.classList.add("active")):(o.classList.remove("afx-debug-active"),U&&U.classList.remove("active")),f.startEffect(t,C,t.marqueePosition,A),f.jukebox&&f.jukebox.isPlaying){let L=t.trackTitle||f.EFFECT_SONG_MAP[A]||null,K=f.jukebox.currentTrack,ae=!1;L&&(typeof L=="string"?ae=!K||K.title.toLowerCase()!==L.toLowerCase():ae=!K||L.title&&K.title.toLowerCase()!==L.title.toLowerCase()||L.trackTitle&&K.trackTitle.toLowerCase()!==L.trackTitle.toLowerCase()||L.artist&&(K.artist||"").toLowerCase()!==L.artist.toLowerCase()),ae&&f.jukebox.playNext(L)}}),{overlay:o,background:C}}static startEffect(t,e,i,o){o==="debug"?e.classList.add("afx-debug-active"):e.classList.remove("afx-debug-active");let l=document.documentElement;Array.from(l.classList).forEach(r=>{r.startsWith("afx-effect-")&&l.classList.remove(r)}),l.classList.add(`afx-effect-${o}`),this.currentEffectId=o;let u=re[o];if(u){let r=Math.min(window.devicePixelRatio||1,1.5),a=o==="mandelbrot"||o==="julia"?r:this.dpr,c=getComputedStyle(document.documentElement),h=parseInt(c.getPropertyValue("--io-header"))||0,n={gl:this.glContext,ctx2d:this.ctx2D,canvasGL:this.sharedGL,canvas2D:this.shared2D,width:this.width,height:this.height,dpr:a,topInset:h,visibleWidth:this.width,visibleHeight:this.height-h,visibleBounds:{top:h,bottom:this.height}};this.marquee&&this.marquee.updateStyles(u.marqueeFont||{}),u.run(n,t),this.renderEffectControls(u);let d=localStorage.getItem("ankifx_marquee_enabled")!=="false";this.marquee&&(this.marquee.enabled=d)}else this.marquee&&this.marquee.updateStyles({}),this.renderEffectControls(null)}static agree(t,e){if(t.classList.add("afx-agreed-state"),document.documentElement.classList.add("afx-agreed"),document.documentElement.classList.remove("afx-scroll-lock"),e)try{localStorage.setItem(`ankifx_agreed_${e}`,"true")}catch{}let i=document.getElementById("qa");i&&(i.style.position="relative",i.style.zIndex="10")}static destroy(){this.currentEffectId&&re[this.currentEffectId]?.stop&&re[this.currentEffectId].stop(),this.jukebox&&(this.jukebox.stop(),this.jukebox=null),this.marqueeInterval&&(cancelAnimationFrame(this.marqueeInterval),this.marqueeInterval=null),this.marquee&&(this.marquee=null);let t=document.getElementById("_flag"),e=document.getElementById("_mark");t&&document.body.appendChild(t),e&&document.body.appendChild(e),["ankifx-overlay","ankifx-background","afx-tuner-ui","afx-btn-back","afx-btn-skip","afx-bottom-dock","afx-top-dock"].forEach(l=>{let u=document.getElementById(l);u&&u.remove()});let i=document.getElementById("ankifx-styles");i&&i.remove(),document.documentElement.style.removeProperty("--tuner-height"),document.documentElement.style.removeProperty("--afx-dock-height");let o=document.getElementById("qa");o&&(o.style.position="",o.style.zIndex=""),document.documentElement.classList.remove("afx-scroll-lock"),document.documentElement.classList.remove("afx-agreed"),Array.from(document.documentElement.classList).forEach(l=>{l.startsWith("afx-effect-")&&document.documentElement.classList.remove(l)}),window.AnkiFX_Config=null,this.observer&&(this.observer.disconnect(),this.observer=null),this.dockObserver&&(this.dockObserver.disconnect(),this.dockObserver=null),console.log("AnkiFX: Destroyed.")}static startMarqueeLoop(){if(this.marqueeInterval)return;let t=0,e=0,i=o=>{if(o===void 0&&(o=performance.now()),t||(t=o),e++,o-t>=1e3){let h=document.getElementById("afx-global-fps");h&&(h.textContent=`FPS: ${e} | Engine DPR: ${this.dpr}`),e=0,t=o}let l=document.getElementById("_flag"),u=document.getElementById("_mark"),r=document.getElementById("afx-top-group-left"),a=document.getElementById("afx-top-group-right"),c=document.getElementById("afx-btn-skip");if(u&&r){let h=document.getElementById("afx-global-fps");h&&u.nextSibling!==h?r.insertBefore(u,h):!h&&u.parentElement!==r&&r.appendChild(u)}if(l&&a&&l.parentElement!==a&&a.insertBefore(l,c),this.marquee&&this.ctxMarquee){if(this.ctxMarquee.clearRect(0,0,this.width,this.height),this.currentEffectId&&re[this.currentEffectId]?.drawOverlay)try{re[this.currentEffectId].drawOverlay(this.ctxMarquee,this.width,this.height,o)}catch(h){console.error("AnkiFX overlay error:",h)}this.marquee.render(this.ctxMarquee,this.width,this.height)}this.marqueeInterval=requestAnimationFrame(i)};this.marqueeInterval=requestAnimationFrame(i)}static renderEffectControls(t){let e=document.getElementById("afx-effect-controls-container");e&&(e.innerHTML="",!(!t||!t.controls||t.controls.length===0)&&t.controls.forEach(i=>{let o=document.createElement("div");if(o.className="afx-control-row",o.id=`afx-control-container-${i.id}`,i.type==="toggle")o.innerHTML=`
                    <label class="afx-toggle">
                        <input type="checkbox" id="afx-control-${i.id}" ${i.value?"checked":""}>
                        <span class="afx-slider"></span>
                    </label>
                    <span id="afx-control-label-${i.id}">${i.label}</span>
                `,o.querySelector("input").addEventListener("change",u=>{i.onChange&&i.onChange(u.target.checked)});else if(i.type==="slider"){o.classList.add("afx-slider-row");let l=i.step||1,u=l.toString().includes(".")?l.toString().split(".")[1].length:0;o.innerHTML=`
                    <span class="afx-slider-label">${i.label}:</span>
                    <input type="range" id="afx-control-${i.id}" class="afx-range-slider" min="${i.min}" max="${i.max}" step="${l}" value="${i.value}">
                    <span id="afx-control-val-${i.id}" class="afx-slider-val-text">${i.value.toFixed(u)}</span>
                `;let r=o.querySelector("input"),a=o.querySelector(".afx-slider-val-text");r.addEventListener("input",c=>{let h=parseFloat(c.target.value);a.innerText=h.toFixed(u),i.onChange&&i.onChange(h)})}else if(i.type==="button")o.style.padding="0",o.innerHTML=`
                    <button id="afx-control-${i.id}" class="afx-action-btn">
                        ${i.label}
                    </button>
                `,o.querySelector("button").addEventListener("click",u=>{u.stopPropagation(),i.onClick&&i.onClick()});else if(i.type==="select"){o.style.padding="0";let l=(i.options||[]).map(r=>{let a=typeof r=="object"?r.value:r,c=typeof r=="object"?r.text:r,h=a==i.value?"selected":"";return`<option value="${a}" ${h}>${c}</option>`}).join("");o.innerHTML=`
                    <select id="afx-control-${i.id}" class="afx-select">
                        ${l}
                    </select>
                `,o.querySelector("select").addEventListener("change",r=>{i.onChange&&i.onChange(r.target.value)})}e.appendChild(o)}))}static setControlValue(t,e){let i=document.getElementById(`afx-control-${t}`);i&&(i.type==="checkbox"?i.checked=!!e:i.value=e);let o=document.getElementById(`afx-control-val-${t}`);if(o){let l=i?i.step:"",u=l&&l.includes(".")?l.split(".")[1].length:0;o.innerText=typeof e=="number"?e.toFixed(u||(e%1===0?0:4)):e}}};V.marquee=null;V.jukebox=null;V.defaultMarqueeText=null;V.sharedGL=null;V.shared2D=null;V.sharedMarquee=null;V.glContext=null;V.ctx2D=null;V.ctxMarquee=null;V.currentEffectId=null;V.dpr=1;V.width=0;V.height=0;V.marqueeInterval=null;V._layoutHandler=null;V.observer=null;var Zt="local";try{let f=typeof __ankifx_script_src=="string"?__ankifx_script_src:"";if(!f){let e=(new Error().stack||"").match(/(https?:\/\/[^\s)\n:]+|file:\/\/[^\s)\n:]+)/g);if(e&&e.length>0){for(let i=0;i<e.length;i++)if(e[i].includes("ankifx")){f=e[i];break}}}f&&(f.includes("cdn.jsdelivr.net")||f.includes("github")||f.includes("rawgit")||f.includes("githack")?Zt="remote":Zt="local")}catch{Zt="detection-failed"}V.version="1.0.0-7c94806";V.buildDate="6/3/2026, 4:58:58 PM";V.source=Zt;window.AnkiFX_Eval_History=window.AnkiFX_Eval_History||[];var ua=window.AnkiFX&&window.AnkiFX.source==="remote"&&V.source==="local";window.AnkiFX_Eval_History.push({source:V.source,version:V.version,buildDate:V.buildDate,time:new Date().toLocaleTimeString(),status:ua?"ignored (late local)":"active"});ua?console.warn(`[AnkiFX Loader] Late local engine evaluation ignored. A remote engine (Version: ${window.AnkiFX.version}) is already active.`):window.AnkiFX=V;})();
