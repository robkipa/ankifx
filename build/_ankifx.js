var __ankifx_script_src=(document.currentScript&&document.currentScript.src)||"";
(()=>{var Lt=[],de=null,It=40,Yt=2,Kt={id:"aurora",name:"Aurora",run:qi,stop:ji,onResize:(u,t)=>{if(fe=u/8,he=t/8,de){let e=Math.ceil(fe/(It/8)),i=Math.ceil(he/(It*Yt/8));de.w=e,de.h=i,de.build()}},marqueeFont:{color:"#E0FFFF",shadowColor:"rgba(0,128,128,0.8)",shadowBlur:10}},ze=null,fe,he,xe=null,_i=0,Oe=0,Ee={x:-1e3,y:-1e3},et=class{constructor(t,e){this.x=t||0,this.y=e||0}setAngle(t){let e=this.getLength()||1;this.x=Math.cos(t)*e,this.y=Math.sin(t)*e}setLength(t){let e=Math.atan2(this.y,this.x);this.x=Math.cos(e)*t,this.y=Math.sin(e)*t}getLength(){return Math.sqrt(this.x*this.x+this.y*this.y)}addTo(t){this.x+=t.x,this.y+=t.y}},Wt=(()=>{let u=new Uint8Array(512),t=new Uint8Array(256).map(()=>Math.random()*256);for(let r=0;r<512;r++)u[r]=t[r&255];let e=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]];function i(r,s,f,a){return r[0]*s+r[1]*f+r[2]*a}return{simplex3:(r,s,f)=>{let a,o,h,c,n=.3333333333333333,d=1/6,x=(r+s+f)*n,m=Math.floor(r+x),l=Math.floor(s+x),v=Math.floor(f+x),p=(m+l+v)*d,g=r-m+p,w=s-l+p,P=f-v+p,b,y,E,k,T,S;g>=w?w>=P?(b=1,y=0,E=0,k=1,T=1,S=0):g>=P?(b=1,y=0,E=0,k=1,T=0,S=1):(b=0,y=0,E=1,k=1,T=0,S=1):w<P?(b=0,y=0,E=1,k=0,T=1,S=1):g<P?(b=0,y=1,E=0,k=0,T=1,S=1):(b=0,y=1,E=0,k=1,T=1,S=0);let A=g-b+d,M=w-y+d,L=P-E+d,I=g-k+2*d,_=w-T+2*d,U=P-S+2*d,C=g-1+3*d,O=w-1+3*d,j=P-1+3*d,G=m&255,z=l&255,H=v&255,J=.6-g*g-w*w-P*P;J<0?a=0:(J*=J,a=J*J*i(e[u[G+u[z+u[H]]]%12],g,w,P));let te=.6-A*A-M*M-L*L;te<0?o=0:(te*=te,o=te*te*i(e[u[G+b+u[z+y+u[H+E]]]%12],A,M,L));let ie=.6-I*I-_*_-U*U;ie<0?h=0:(ie*=ie,h=ie*ie*i(e[u[G+k+u[z+T+u[H+S]]]%12],I,_,U));let ae=.6-C*C-O*O-j*j;return ae<0?c=0:(ae*=ae,c=ae*ae*i(e[u[G+1+u[z+1+u[H+1]]]%12],C,O,j)),32*(a+o+h+c)}}})(),Rt=class{constructor(t,e,i={}){this.settings={frequency:.1,...i},this.w=t,this.h=e,this.time=0,this.build()}build(){this.cols=Math.ceil(this.w),this.rows=Math.ceil(this.h),this.field=new Array(this.cols);for(let t=0;t<this.cols;t++){this.field[t]=new Array(this.rows);for(let e=0;e<this.rows;e++)this.field[t][e]=new et(0,0)}}update(t){this.time+=t;let e=this.time*this.settings.frequency/1e3;for(let i=0;i<this.field.length;i++)for(let r=0;r<this.field[i].length;r++){let s=Wt.simplex3(i/20,r/20,e)*Math.PI*2,f=Wt.simplex3(i/10+4e4,r/10+4e4,e);this.field[i][r].setAngle(s),this.field[i][r].setLength(f),typeof this.manipulateVector=="function"&&this.manipulateVector(this.field[i][r],i,r),typeof this.onDraw=="function"&&this.onDraw(this.field[i][r],i,r)}}};function Bi(){Lt=[];let u=150;for(let t=0;t<u;t++)Lt.push({x:Math.random(),y:Math.random(),size:.5+Math.random()*1.5,opacity:.1+Math.random()*.8,blinkSpeed:.001+Math.random()*.002,blinkOffset:Math.random()*Math.PI*2})}function De(u){u.touches&&u.touches[0]?(Ee.x=u.touches[0].clientX,Ee.y=u.touches[0].clientY):(Ee.x=u.clientX,Ee.y=u.clientY)}function qi(u,t){let e=u.ctx2d;xe=u.canvas2D,xe.classList.add("afx-aurora-active"),fe=u.width/8,he=u.height/8,xe.width=fe*u.dpr,xe.height=he*u.dpr,e.setTransform(1,0,0,1,0,0),e.scale(u.dpr,u.dpr),Bi();let i=It/8,r=Math.ceil(fe/i),s=Math.ceil(he/(i*Yt));de=new Rt(r,s,{frequency:.1});let f={x:fe/r,y:he/s},a=255/s;de.onDraw=(h,c,n)=>{let d=h.getLength()*Math.abs(h.x),x=h.getLength()*Math.abs(h.y),m=Math.round(-20*d+80*x+(50-.6*n*a)),l=Math.round(180*d+20*x-60+.4*n*a),v=Math.round(50*d+30*x+(40-.5*n*a)+.5*n*a);e.fillStyle=`rgba(${m}, ${l}, ${v}, 0.8)`,e.fillRect(c*f.x,n*f.y,f.x+.5,f.y+.5)},de.manipulateVector=(h,c,n)=>{let d={x:c*f.x+.5*f.x,y:n*f.y+.5*f.y},x=Ee.x/8,m=Ee.y/8,l=new et((x-d.x)/fe,(m-d.y)/he);h.addTo(l),h.getLength()>1&&h.setLength(1)},_i=0,Oe=0,window.addEventListener("mousemove",De),window.addEventListener("touchstart",De),window.addEventListener("touchmove",De);function o(h){Oe||(Oe=h);let c=h-Oe;Oe=h,e.fillStyle="#020b1a",e.fillRect(0,0,fe,he),e.fillStyle="#ffffff",Lt.forEach(n=>{let d=(Math.sin(h*n.blinkSpeed+n.blinkOffset)+1)/2;e.globalAlpha=n.opacity*d,e.beginPath(),e.arc(n.x*fe,n.y*he,n.size,0,Math.PI*2),e.fill()}),e.globalAlpha=1,de.update(c),ze=requestAnimationFrame(o)}ze=requestAnimationFrame(o)}function ji(){ze&&(cancelAnimationFrame(ze),ze=null),window.removeEventListener("mousemove",De),window.removeEventListener("touchstart",De),window.removeEventListener("touchmove",De),xe&&(xe.classList.remove("afx-aurora-active"),xe=null);let u=window.AnkiFX;u&&typeof u.handleResize=="function"&&u.handleResize()}var tt=null,ne,le,Jt={id:"debug",name:"DEBUG",run:Ni,stop:$i,onResize:(u,t)=>{ne=u,le=t},marqueeFont:{color:"#00ff00",shadowColor:"rgba(0,0,0,0.8)",shadowBlur:5}};function Ni(u,t){let e=u.ctx2d;ne=u.width,le=u.height;let i=u.dpr||1,r=0,s=0,f=0;function a(o){o===void 0&&(o=performance.now()),r||(r=o),s++,o-r>=1e3&&(f=s,s=0,r=o),e.fillStyle="#000",e.fillRect(0,0,ne,le),e.fillStyle="#fff",e.font="bold 13px monospace",[`FPS: ${f}`,`window: ${window.innerWidth}x${window.innerHeight}`,`screen: ${screen.width}x${screen.height}`,`dpr (native): ${window.devicePixelRatio}`,`dpr (engine): ${i}`,`doc: ${document.documentElement.clientWidth}x${document.documentElement.clientHeight}`,`orient: ${window.orientation||"N/A"}`].forEach((d,x)=>{e.fillText(d,20,60+x*18)}),e.fillStyle="#0f0",e.font="bold 13px monospace",e.fillText("--- AnkiFX DIAGNOSTICS ---",20,195),e.fillStyle="#fff",e.font="12px monospace",e.fillText(`Version:  ${window.AnkiFX?.version||"1.0.0-dev"}`,20,215),e.fillText(`Source:   ${window.AnkiFX?.source||"unknown"}`,20,230),e.fillText(`Built:    ${window.AnkiFX?.buildDate||"development"}`,20,245),e.fillStyle="#0ff",e.font="bold 13px monospace",e.fillText("--- ENGINE EVALUATION HISTORY ---",20,265);let c=window.AnkiFX_Eval_History||[];c.length===0?(e.fillStyle="#888",e.font="italic 12px monospace",e.fillText("(No evaluation history captured)",20,282)):(e.font="11px monospace",c.slice(-3).forEach((d,x)=>{e.fillStyle=d.status==="active"?"#55ff55":"#ffaa55",e.fillText(`[${x+1}] ${d.source} (${d.version}) @ ${d.time} - ${d.status}`,20,282+x*15)})),e.fillStyle="#0ff",e.font="bold 13px monospace",e.fillText("--- CHRONOLOGICAL LOADER LOGS ---",20,335);let n=window.AnkiFX_Loader_Logs||[];n.length===0?(e.fillStyle="#888",e.font="italic 12px monospace",e.fillText("(No logs captured by template loader)",20,355)):(e.font="11px monospace",n.slice(-12).forEach((d,x)=>{let m=d.includes("fail")||d.includes("Error")||d.includes("offline")||d.includes("warn");e.fillStyle=m?"#ff5555":"#55ff55",e.fillText(`[${x+1}] ${d}`,20,355+x*16)})),e.fillStyle="#f0f",e.font="bold 12px monospace",e.fillText("(0,0)",5,15),e.fillText(`(${ne},0)`,ne-65,15),e.fillText(`(0,${le})`,5,le-5),e.fillText(`(${ne},${le})`,ne-65,le-5),e.strokeStyle="#f00",e.lineWidth=4,e.beginPath(),e.moveTo(0,le-2),e.lineTo(ne,le-2),e.stroke(),e.fillStyle="#f00",e.font="bold 18px monospace",e.textAlign="center",e.fillText("--- CANVAS BOTTOM ---",ne/2,le-10),e.textAlign="left",e.beginPath(),e.moveTo(ne-2,0),e.lineTo(ne-2,le),e.stroke(),tt=requestAnimationFrame(a)}a()}function $i(){tt&&(cancelAnimationFrame(tt),tt=null)}var Ue=null,Ot,zt,Zt={id:"fire",name:"Doom Fire",run:Hi,stop:Gi,onResize:(u,t)=>{Ot=u,zt=t},preferredTrack:{title:"Doom 3 BFG Edition",trackTitle:"DOOM E1M1"},marqueeFont:{color:"#ffffff",shadowColor:"rgba(0,0,0,0.8)",shadowBlur:5}},Xi=[[7,7,7],[31,7,7],[47,15,7],[71,15,7],[87,23,7],[103,31,7],[119,31,7],[143,39,7],[159,47,7],[175,63,7],[191,71,7],[199,71,7],[223,79,7],[223,87,7],[223,87,7],[215,95,7],[215,95,7],[215,103,15],[207,111,15],[207,119,15],[207,127,15],[207,135,23],[199,135,23],[199,143,23],[199,151,31],[191,159,31],[191,159,31],[191,167,39],[191,167,39],[191,175,47],[183,175,47],[183,183,47],[183,183,55],[207,207,111],[223,223,159],[239,239,199],[255,255,255]];function Hi(u,t){let e=u.ctx2d;Ot=u.width,zt=u.height;let i=320,r=168,s=new Uint8Array(i*r),f=e.createImageData(i,r),a=f.data,o=document.createElement("canvas");o.width=i,o.height=r;let h=o.getContext("2d");function c(){s.fill(0);for(let l=0;l<i;l++)s[(r-1)*i+l]=36}function n(l){let v=s[l];if(v===0)s[l-i]=0;else{let p=Math.floor(Math.random()*3),g=l-p+1;s[g-i]=v-(p&1)}}function d(){for(let l=0;l<i;l++)for(let v=1;v<r;v++)n(v*i+l)}function x(){for(let l=0;l<s.length;l++){let v=s[l],p=Xi[v],g=l*4;a[g]=p[0],a[g+1]=p[1],a[g+2]=p[2],a[g+3]=255}}c();function m(){d(),x(),h.putImageData(f,0,0),e.save(),e.imageSmoothingEnabled=!1,e.drawImage(o,0,0,Ot,zt),e.restore(),Ue=requestAnimationFrame(m)}Ue=requestAnimationFrame(m)}function Gi(){Ue&&(cancelAnimationFrame(Ue),Ue=null)}var qe=null,_e,Be,Qt={id:"geometry",name:"Geometry",run:Vi,stop:Wi,onResize:(u,t)=>{_e=u,Be=t},marqueeFont:{colorFn:(u,t)=>`hsl(${(u*120+t*4)%360}, 100%, 55%)`,shadowColor:"inherit",shadowBlur:15}};function Vi(u,t){let e=u.ctx2d;_e=u.width,Be=u.height;let i=0;function r(){i+=.012,e.globalCompositeOperation="source-over",e.fillStyle="rgba(2, 2, 5, 0.3)",e.fillRect(0,0,_e,Be),e.globalCompositeOperation="lighter";let s=_e/2,f=Be/2,a=Math.max(_e,Be)*.85;for(let o=0;o<35;o++){let h=i+o*.05,c=(Math.sin(h*.8)*.5+.5)*a+o*12;e.save(),e.translate(s,f),e.rotate(Math.sin(i*.3)*Math.PI+o*.06),e.scale(Math.sin(i*.5+o*.1)*.4+.8,Math.cos(i*.4+o*.1)*.4+.8),e.beginPath();for(let d=0;d<=8;d++){let x=d/8*Math.PI*2,m=Math.cos(x)*c,l=Math.sin(x)*c;d===0?e.moveTo(m,l):e.lineTo(m,l)}let n=(i*50+o*10)%360;e.strokeStyle=`hsla(${n}, 95%, 65%, 0.6)`,e.lineWidth=4,e.stroke(),e.restore()}e.globalCompositeOperation="source-over",qe=requestAnimationFrame(r)}qe=requestAnimationFrame(r)}function Wi(){qe&&(cancelAnimationFrame(qe),qe=null)}var at=null,je,ge,Ne,nt,ei={id:"julia",name:"Julia Set",run:Yi,stop:Ki,onResize:(u,t,e)=>{je=u,ge=t,nt&&Ne&&nt.uniform2f(Ne,u*e,t*e)},preferredTrack:{title:"Acoustica Power Bundle 4",trackTitle:"AiR"},presets:[{name:"Black Hole",cRe:-.8,cIm:.156,zoomDepth:8,targetX:-.086441,targetY:-.239323},{name:"Electric Lightning",cRe:.285,cIm:.013,zoomDepth:6,targetX:-.106662,targetY:.656613},{name:"Golden Dragon",cRe:-.4,cIm:.6,zoomDepth:9,targetX:-.042175,targetY:-.036744},{name:"Filigree",cRe:-.70176,cIm:-.3842,zoomDepth:10.5,targetX:-.096904,targetY:-.656621},{name:"Fractal Storm",cRe:-.7269,cIm:.1889,zoomDepth:10.5,targetX:-.237086,targetY:.547981},{name:"Seahorse Spiral",cRe:-.74543,cIm:.11301,zoomDepth:12,targetX:-.529406,targetY:.072863}],marqueeFont:{color:"#FFF",outline:"#000"}},rt=null,ot=null,it={x:0,y:0},N={cRe:-.8,cIm:.156,zoomDepth:10,targetX:-.527503,targetY:.075912,speed:parseFloat(localStorage.getItem("ankifx_julia_speed"))||.15};function Yi(u,t={}){nt=u.gl;let e=u.gl,i=u.ctx2d;je=u.width,ge=u.height;let r=u.dpr,s=`
        attribute vec2 position;
        void main() { gl_Position = vec4(position, 0.0, 1.0); }
    `,f=`
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
    `;function a(w,P){let b=e.createShader(w);return e.shaderSource(b,P),e.compileShader(b),b}let o=e.createProgram();e.attachShader(o,a(e.VERTEX_SHADER,s)),e.attachShader(o,a(e.FRAGMENT_SHADER,f)),e.linkProgram(o),e.useProgram(o),e.bindBuffer(e.ARRAY_BUFFER,e.createBuffer()),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),e.STATIC_DRAW);let h=e.getAttribLocation(o,"position");e.enableVertexAttribArray(h),e.vertexAttribPointer(h,2,e.FLOAT,!1,0,0);let c=e.getUniformLocation(o,"u_time"),n=e.getUniformLocation(o,"u_speed");Ne=e.getUniformLocation(o,"u_resolution");let d=e.getUniformLocation(o,"u_c"),x=e.getUniformLocation(o,"u_zoomDepth"),m=e.getUniformLocation(o,"u_target");e.uniform2f(Ne,je*r,ge*r);let l=null,v=null;if(t.debug){let w=document.getElementById("afx-controls-stack-right");if(w){l=document.createElement("div"),l.id="afx-julia-debug-info",l.className="afx-control-row julia-debug-el",l.style.cssText="height: 20px !important; margin-bottom: 2px; pointer-events: none; justify-content: flex-end; opacity: 0.8; font-size: 11px !important; color: #ff00ff;",l.textContent="HOVER TO SEE TARGET COORDS",w.prepend(l);let y=(E,k,T,S,A,M=3)=>{let L=document.createElement("div");L.className="afx-control-row julia-tuner-row julia-debug-el",L.style.cssText="height: 24px !important; margin-bottom: 2px; gap: 8px; justify-content: flex-end; font-size: 10px !important; color: #00ffff;";let I=N[k];L.innerHTML=`
                    <span>${E}:</span>
                    <input type="range" class="julia-slider" data-key="${k}" min="${T}" max="${S}" step="${A}" value="${I}" style="width: 70px; accent-color: #00ffff; cursor: pointer;">
                    <input type="number" class="julia-val" data-key="${k}" step="${A}" value="${I.toFixed(M)}" style="width: 70px; background: rgba(0,0,0,0.4); border: 1px solid #00ffff; color: #00ffff; font-size: 10px !important; padding: 2px 4px; border-radius: 3px; outline: none;">
                `;let _=L.querySelector(".julia-slider"),U=L.querySelector(".julia-val"),C=(O,j=!1)=>{N[k]=parseFloat(O),j||(U.value=N[k].toFixed(M)),_.value=N[k],k==="speed"&&localStorage.setItem("ankifx_julia_speed",N[k])};return _.oninput=O=>C(O.target.value),U.oninput=O=>C(O.target.value,!0),L};N.cRe=t.cRe!==void 0?t.cRe:-.8,N.cIm=t.cIm!==void 0?t.cIm:.156,N.zoomDepth=t.zoomDepth!==void 0?t.zoomDepth:10,N.targetX=t.targetX!==void 0?t.targetX:-.527503,N.targetY=t.targetY!==void 0?t.targetY:.075912,w.prepend(y("SPD","speed",.005,.3,.005,3)),w.prepend(y("T-Y","targetY",-2,2,1e-4,6)),w.prepend(y("T-X","targetX",-2,2,1e-4,6)),w.prepend(y("ZOOM","zoomDepth",2,25,.1,1)),w.prepend(y("C-IM","cIm",-1,1,.001,6)),w.prepend(y("C-RE","cRe",-1.5,1,.001,6))}v=(y,E,k)=>{let T=k*N.speed/Math.max(N.zoomDepth,1)%2,S=T>1?2-T:T,A=S<.5?4*Math.pow(S,3):1-Math.pow(-2*S+2,3)/2,L=2.2/Math.exp(A*N.zoomDepth),I=A*Math.PI*.5,_=(y-je/2)/ge,U=(ge/2-E)/ge,C=Math.cos(I),O=Math.sin(I),j=(C*_+O*U)*L,G=(-O*_+C*U)*L;return{tx:N.targetX+j,ty:N.targetY+G}};let P=y=>{if(y.target.closest(".afx-controls-stack")||y.target.closest(".afx-dialog")||y.target.closest(".afx-dual-control-stack"))return;let E=performance.now()*.001-p,{tx:k,ty:T}=v(y.clientX,y.clientY,E);N.targetX=k,N.targetY=T,["targetX","targetY"].forEach(S=>{let A=document.querySelector(`.julia-slider[data-key="${S}"]`),M=document.querySelector(`.julia-val[data-key="${S}"]`);A&&(A.value=N[S]),M&&(M.value=N[S].toFixed(6))})};window.addEventListener("mousedown",P),rt=P;let b=y=>{it.x=y.clientX,it.y=y.clientY};window.addEventListener("mousemove",b),ot=b}let p=performance.now()*.001;function g(){let w=performance.now()*.001-p;if(e.uniform1f(c,w),e.uniform1f(n,N.speed),e.uniform2f(d,N.cRe,N.cIm),e.uniform1f(x,N.zoomDepth),e.uniform2f(m,N.targetX,N.targetY),e.drawArrays(e.TRIANGLE_STRIP,0,4),i.clearRect(0,0,je,ge),l&&v){let P=performance.now()*.001-p,{tx:b,ty:y}=v(it.x,it.y,P);l.textContent=`TARGET X: ${b.toFixed(6)}, Y: ${y.toFixed(6)}`}at=requestAnimationFrame(g)}g()}function Ki(){at&&(cancelAnimationFrame(at),at=null),rt&&(window.removeEventListener("mousedown",rt),rt=null),ot&&(window.removeEventListener("mousemove",ot),ot=null),document.querySelectorAll(".julia-debug-el").forEach(u=>u.remove()),nt=null,Ne=null}var $e=null,Te=0,me=0,D=null,$=null,pe=[],lt=0,Xe=null,W={x:-1e3,y:-1e3,dx:0,dy:0,down:!1},ii=null,ai={id:"lavalamp",name:"Lava Lamp",run:ea,stop:ra,onResize:ta,marqueeFont:{color:"#ffccaa",shadowColor:"rgba(255, 100, 0, 0.8)",shadowBlur:10}},ce=6,st=class{constructor(t,e,i,r){this.pos={x:t,y:e},this.vel={x:0,y:-(Math.random()*.6+.3)},this.radius=i;let s=e/r;this.temperature=.15+s*.3+Math.random()*.15,this.buoyancy=0,this.noiseOffset=Math.random()*1e3,this.smoothSpeedY=0}update(t,e,i){this.pos.y>i*.8?this.temperature+=.05*t:this.pos.y>i*.6?this.temperature+=.02*t:this.pos.y<i*.2?this.temperature-=.04*t:this.pos.y<i*.4&&(this.temperature-=.015*t),this.temperature=Math.max(0,Math.min(1,this.temperature)),this.buoyancy=this.temperature*4-2,this.vel.y-=this.buoyancy*10*t;let r=Math.sin(this.noiseOffset+lt*2e-4)*.1;this.vel.x+=r*t*.3;let s=1-Math.min(Math.abs(this.buoyancy)/.8,1),f=(e*.5-this.pos.x)*.003*s;this.vel.x+=f*t,this.pos.x<this.radius&&(this.vel.x+=(this.radius-this.pos.x)*2*t),this.pos.x>e-this.radius&&(this.vel.x-=(this.pos.x-(e-this.radius))*2*t);let a=-this.radius*.5;this.pos.y<a&&(this.vel.y+=(a-this.pos.y)*8*t);let o=i+this.radius*.5;this.pos.y>o&&(this.vel.y-=(this.pos.y-o)*8*t);let h=Math.pow(.97,t*60);this.vel.x*=h;let n=Math.abs(this.buoyancy)>.8,d=Math.pow(n?.994:.975,t*60);this.vel.y*=d;let x=Math.max(0,(this.pos.y-i*.82)/(i*.18)),m=Math.max(0,(i*.18-this.pos.y)/(i*.18)),l=Math.pow(.88,t*60*(x+m));if(this.vel.x*=l,W.down){let v=this.pos.x-W.x,p=this.pos.y-W.y,g=Math.sqrt(v*v+p*p);if(g<200){let w=(200-g)/200;this.vel.x+=W.dx*w*1.5,this.vel.y+=W.dy*w*8}}this.smoothSpeedY+=(Math.abs(this.vel.y)-this.smoothSpeedY)*(1-Math.pow(.05,t)),this.pos.x+=this.vel.x*t,this.pos.y+=this.vel.y*t}},Ji=`
    attribute vec2 aPosition;
    varying vec2 vUv;
    void main() {
        vUv = aPosition * 0.5 + 0.5;
        // Match canvas 2D coordinates (Y=0 is top)
        vUv.y = 1.0 - vUv.y;
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }
`,Zi=`
    precision highp float;
    varying vec2 vUv;
    
    uniform vec2 uResolution;
    uniform float uTime;
    
    uniform vec4 uBlobs[${ce}]; // x, y, radius, stretch
    uniform float uBlobTemp[${ce}]; // temperature
    
    // Polynomial smooth minimum
    float smin(float a, float b, float k) {
        float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
        return mix(b, a, h) - k * h * (1.0 - h);
    }
    
    float map(vec2 p) {
        float d = 10000.0;
        for (int i = 0; i < ${ce}; i++) {
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
`;function ti(u,t){let e=D.createShader(u);return D.shaderSource(e,t),D.compileShader(e),D.getShaderParameter(e,D.COMPILE_STATUS)?e:(console.error("Shader compile error:",D.getShaderInfoLog(e)),D.deleteShader(e),null)}function Qi(){let u=ti(D.VERTEX_SHADER,Ji),t=ti(D.FRAGMENT_SHADER,Zi);if($=D.createProgram(),D.attachShader($,u),D.attachShader($,t),D.linkProgram($),!D.getProgramParameter($,D.LINK_STATUS))return console.error("Program link error:",D.getProgramInfoLog($)),!1;D.useProgram($),Xe=D.createBuffer(),D.bindBuffer(D.ARRAY_BUFFER,Xe);let e=new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]);D.bufferData(D.ARRAY_BUFFER,e,D.STATIC_DRAW);let i=D.getAttribLocation($,"aPosition");return D.enableVertexAttribArray(i),D.vertexAttribPointer(i,2,D.FLOAT,!1,0,0),$.uResolution=D.getUniformLocation($,"uResolution"),$.uTime=D.getUniformLocation($,"uTime"),$.uBlobs=D.getUniformLocation($,"uBlobs"),$.uBlobTemp=D.getUniformLocation($,"uBlobTemp"),!0}function ea(u,t){if(D=u.gl,ii=u.canvasGL,Te=u.width,me=u.height,!D){console.error("WebGL context required for Lava Lamp");return}if(!Qi())return;pe=[];let e=0;for(;pe.length<ce&&e<200;){e++;let i=70+Math.random()*60,r=i+Math.random()*(Te-i*2),s=i+Math.random()*(me-i*2),f=!1;for(let a of pe){let o=a.pos.x-r,h=a.pos.y-s;if(Math.sqrt(o*o+h*h)<a.radius+i+10){f=!0;break}}f||pe.push(new st(r,s,i,me))}for(;pe.length<ce;){let i=70+Math.random()*60,r=i+Math.random()*(Te-i*2),s=i+Math.random()*(me-i*2);pe.push(new st(r,s,i,me))}lt=performance.now(),ia(),$e=requestAnimationFrame(ri)}function ta(u,t,e){Te=u,me=t,D&&D.viewport(0,0,u*e,t*e)}function ri(u){let t=Math.min((u-lt)/1e3,.05);lt=u;let e=new Float32Array(ce*4),i=new Float32Array(ce);for(let r=0;r<ce;r++)pe[r].update(t,Te,me);for(let r=0;r<ce;r++){let s=pe[r],f=Math.max(.85,1+Math.min(s.smoothSpeedY*.028,.7)*(.4+s.temperature*.6));e[r*4+0]=s.pos.x,e[r*4+1]=s.pos.y,e[r*4+2]=s.radius,e[r*4+3]=f,i[r]=s.temperature}D.useProgram($),D.uniform2f($.uResolution,Te,me),D.uniform1f($.uTime,u*.001),D.uniform4fv($.uBlobs,e),D.uniform1fv($.uBlobTemp,i),D.drawArrays(D.TRIANGLES,0,6),W.dx=0,W.dy=0,$e=requestAnimationFrame(ri)}function He(u){let t=ii.getBoundingClientRect(),e=u.touches?u.touches[0]:u,i=e.clientX-t.left,r=e.clientY-t.top;if(W.down&&u.type!=="mousedown"&&u.type!=="touchstart"){let s=i-W.x,f=r-W.y;Math.abs(s)<150&&Math.abs(f)<150&&(W.dx=s,W.dy=f)}W.x=i,W.y=r}function ut(u){W.dx=0,W.dy=0,W.down=!0,He(u)}function ft(){W.down=!1}function ia(){window.addEventListener("mousedown",ut),window.addEventListener("mousemove",He),window.addEventListener("mouseup",ft),window.addEventListener("touchstart",ut,{passive:!0}),window.addEventListener("touchmove",He,{passive:!0}),window.addEventListener("touchend",ft)}function aa(){window.removeEventListener("mousedown",ut),window.removeEventListener("mousemove",He),window.removeEventListener("mouseup",ft),window.removeEventListener("touchstart",ut),window.removeEventListener("touchmove",He),window.removeEventListener("touchend",ft)}function ra(){$e&&(cancelAnimationFrame($e),$e=null),aa(),D&&(D.clearColor(0,0,0,0),D.clear(D.COLOR_BUFFER_BIT),$&&D.deleteProgram($),Xe&&D.deleteBuffer(Xe),$=null,Xe=null)}var ct=null,Ge,we,Ve,mt,oi={id:"mandelbrot",name:"Mandelbrot",run:oa,stop:na,onResize:(u,t,e)=>{Ge=u,we=t,mt&&Ve&&mt.uniform2f(Ve,u*e,t*e)},preferredTrack:{title:"Acoustica Power Bundle 4",trackTitle:"AiR"},marqueeFont:{color:"#FFF",outline:"#000"}},dt=null,pt=null,ht={x:0,y:0},Y={targetX:-.743643887037151,targetY:.13182590420533,zoomDepth:11,speed:parseFloat(localStorage.getItem("ankifx_mandelbrot_speed"))||.15};function oa(u,t={}){mt=u.gl;let e=u.gl,i=u.ctx2d;Ge=u.width,we=u.height;let r=u.dpr,s=`
        attribute vec2 position;
        void main() { gl_Position = vec4(position, 0.0, 1.0); }
    `,f=`
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
    `;function a(g,w){let P=e.createShader(g);return e.shaderSource(P,w),e.compileShader(P),P}let o=e.createProgram();e.attachShader(o,a(e.VERTEX_SHADER,s)),e.attachShader(o,a(e.FRAGMENT_SHADER,f)),e.linkProgram(o),e.useProgram(o),e.bindBuffer(e.ARRAY_BUFFER,e.createBuffer()),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),e.STATIC_DRAW);let h=e.getAttribLocation(o,"position");e.enableVertexAttribArray(h),e.vertexAttribPointer(h,2,e.FLOAT,!1,0,0);let c=e.getUniformLocation(o,"u_time"),n=e.getUniformLocation(o,"u_speed"),d=e.getUniformLocation(o,"u_zoomDepth"),x=e.getUniformLocation(o,"u_target");Ve=e.getUniformLocation(o,"u_resolution"),e.uniform2f(Ve,Ge*r,we*r);let m=null,l=null;if(t.debug){let g=document.getElementById("afx-controls-stack-right");if(g){m=document.createElement("div"),m.id="afx-mandelbrot-debug-info",m.className="afx-control-row mandelbrot-debug-el",m.style.cssText="height: 20px !important; margin-bottom: 2px; pointer-events: none; justify-content: flex-end; opacity: 0.8; font-size: 11px !important; color: #ff00ff;",m.textContent="HOVER TO SEE TARGET COORDS",g.prepend(m);let b=(y,E,k,T,S,A=3)=>{let M=document.createElement("div");M.className="afx-control-row mandelbrot-tuner-row mandelbrot-debug-el",M.style.cssText="height: 24px !important; margin-bottom: 2px; gap: 8px; justify-content: flex-end; font-size: 10px !important; color: #00ffff;";let L=Y[E];M.innerHTML=`
                    <span>${y}:</span>
                    <input type="range" class="mandelbrot-slider" data-key="${E}" min="${k}" max="${T}" step="${S}" value="${L}" style="width: 70px; accent-color: #00ffff; cursor: pointer;">
                    <input type="number" class="mandelbrot-val" data-key="${E}" step="${S}" value="${L.toFixed(A)}" style="width: 70px; background: rgba(0,0,0,0.4); border: 1px solid #00ffff; color: #00ffff; font-size: 10px !important; padding: 2px 4px; border-radius: 3px; outline: none;">
                `;let I=M.querySelector(".mandelbrot-slider"),_=M.querySelector(".mandelbrot-val"),U=(C,O=!1)=>{Y[E]=parseFloat(C),O||(_.value=Y[E].toFixed(A)),I.value=Y[E],E==="speed"&&localStorage.setItem("ankifx_mandelbrot_speed",Y[E])};return I.oninput=C=>U(C.target.value),_.oninput=C=>U(C.target.value,!0),M};g.prepend(b("SPD","speed",.005,.3,.005,3)),g.prepend(b("T-Y","targetY",-1.5,1.5,1e-4,6)),g.prepend(b("T-X","targetX",-2.5,1,1e-4,6)),g.prepend(b("ZOOM","zoomDepth",2,25,.1,1))}l=(b,y,E)=>{let k=E*Y.speed/Math.max(Y.zoomDepth,1)%2,T=k>1?2-k:k,S=T<.5?4*Math.pow(T,3):1-Math.pow(-2*T+2,3)/2,A=Math.exp(S*Y.zoomDepth),M=(b-Ge/2)/we,L=(we/2-y)/we;return{tx:Y.targetX+M*(2.5/A),ty:Y.targetY+L*(2.5/A)}};let w=b=>{if(b.target.closest(".afx-controls-stack")||b.target.closest(".afx-dialog")||b.target.closest(".afx-dual-control-stack"))return;let y=performance.now()*.001-v,{tx:E,ty:k}=l(b.clientX,b.clientY,y);Y.targetX=E,Y.targetY=k,["targetX","targetY"].forEach(T=>{let S=document.querySelector(`.mandelbrot-slider[data-key="${T}"]`),A=document.querySelector(`.mandelbrot-val[data-key="${T}"]`);S&&(S.value=Y[T]),A&&(A.value=Y[T].toFixed(6))})};window.addEventListener("mousedown",w),dt=w;let P=b=>{ht.x=b.clientX,ht.y=b.clientY};window.addEventListener("mousemove",P),pt=P}let v=performance.now()*.001;function p(){let g=performance.now()*.001-v;if(e.uniform1f(c,g),e.uniform1f(n,Y.speed),e.uniform1f(d,Y.zoomDepth),e.uniform2f(x,Y.targetX,Y.targetY),e.drawArrays(e.TRIANGLE_STRIP,0,4),i.clearRect(0,0,Ge,we),m&&l){let w=performance.now()*.001-v,{tx:P,ty:b}=l(ht.x,ht.y,w);m.textContent=`TARGET X: ${P.toFixed(6)}, Y: ${b.toFixed(6)}`}ct=requestAnimationFrame(p)}p()}function na(){ct&&(cancelAnimationFrame(ct),ct=null),dt&&(window.removeEventListener("mousedown",dt),dt=null),pt&&(window.removeEventListener("mousemove",pt),pt=null),document.querySelectorAll(".mandelbrot-debug-el").forEach(u=>u.remove()),mt=null,Ve=null}var We=null,xt,vt,bt=16,ve=[];function ni(){let u=Math.floor(xt/bt);ve=[];for(let t=0;t<u;t++)ve[t]=Math.random()*-100}var li={id:"matrix",name:"Matrix",run:la,stop:sa,onResize:(u,t)=>{xt=u,vt=t,ni()},preferredTrack:{trackTitle:"nightfall"},marqueeFont:{color:"#0F0",shadowColor:"#0F0",shadowBlur:10}};function la(u,t){let e=u.ctx2d;xt=u.width,vt=u.height,ni();let i="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*]*";function r(){e.fillStyle="rgba(0, 0, 0, 0.1)",e.fillRect(0,0,xt,vt),e.fillStyle="#0F0",e.font=bt+"px monospace";for(let s=0;s<ve.length;s++)if(ve[s]>0||Math.random()>.95){let f=i.charAt(Math.floor(Math.random()*i.length)),a=ve[s]*bt;e.fillText(f,s*bt,a),a>vt&&Math.random()>.975&&(ve[s]=0),ve[s]++}else ve[s]+=.5;We=requestAnimationFrame(r)}We=requestAnimationFrame(r)}function sa(){We&&(cancelAnimationFrame(We),We=null)}var Ye=null,Ut,_t,si={id:"none",name:"None",run:ua,stop:fa,onResize:(u,t)=>{Ut=u,_t=t},marqueeFont:{color:"#ffffff",shadowColor:"rgba(0,0,0,0.8)",shadowBlur:5}};function ua(u,t){let e=u.ctx2d;Ut=u.width,_t=u.height;function i(){e.clearRect(0,0,Ut,_t),Ye=requestAnimationFrame(i)}Ye=requestAnimationFrame(i)}function fa(){Ye&&(cancelAnimationFrame(Ye),Ye=null)}var Ke=null,K,ue,ui={id:"starfield",name:"Starfield",run:ha,stop:ca,onResize:(u,t)=>{K=u,ue=t},preferredTrack:{trackTitle:"star wars title"},marqueeFont:{color:"#FFE81F",shadowColor:"#FFE81F",shadowBlur:20,outline:"#000"}};function ha(u,t){let e=u.ctx2d;K=u.width,ue=u.height;let i=[],r=8e3,s=new Uint8Array(512),f=new Uint8Array(256).map(()=>Math.random()*256);for(let v=0;v<512;v++)s[v]=f[v&255];let a=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]];function o(v,p,g,w){return v[0]*p+v[1]*g+v[2]*w}function h(v,p,g){let w,P,b,y,E=.3333333333333333,k=1/6,T=(v+p+g)*E,S=Math.floor(v+T),A=Math.floor(p+T),M=Math.floor(g+T),L=(S+A+M)*k,I=v-S+L,_=p-A+L,U=g-M+L,C,O,j,G,z,H;I>=_?_>=U?(C=1,O=0,j=0,G=1,z=1,H=0):I>=U?(C=1,O=0,j=0,G=1,z=0,H=1):(C=0,O=0,j=1,G=1,z=0,H=1):_<U?(C=0,O=0,j=1,G=0,z=1,H=1):I<U?(C=0,O=1,j=0,G=0,z=1,H=1):(C=0,O=1,j=0,G=1,z=1,H=0);let J=I-C+k,te=_-O+k,ie=U-j+k,ae=I-G+2*k,Se=_-z+2*k,F=U-H+2*k,R=I-1+3*k,V=_-1+3*k,X=U-1+3*k,ee=S&255,se=A&255,Qe=M&255,Ae=.6-I*I-_*_-U*U;Ae<0?w=0:(Ae*=Ae,w=Ae*Ae*o(a[s[ee+s[se+s[Qe]]]%12],I,_,U));let Le=.6-J*J-te*te-ie*ie;Le<0?P=0:(Le*=Le,P=Le*Le*o(a[s[ee+C+s[se+O+s[Qe+j]]]%12],J,te,ie));let Ie=.6-ae*ae-Se*Se-F*F;Ie<0?b=0:(Ie*=Ie,b=Ie*Ie*o(a[s[ee+G+s[se+z+s[Qe+H]]]%12],ae,Se,F));let Re=.6-R*R-V*V-X*X;return Re<0?y=0:(Re*=Re,y=Re*Re*o(a[s[ee+1+s[se+1+s[Qe+1]]]%12],R,V,X)),32*(w+P+b+y)}function c(v,p,g,w=3){let P=0,b=.5;for(let y=0;y<w;y++)P+=h(v,p,g)*b,v*=2,p*=2,g*=2,b*=.5;return P}class n{constructor(){this.active=!1,this.nextSpawn=Date.now()+2e3}reset(){let p=Math.random()*Math.PI*2,g=.2+Math.random()*.4;this.x=Math.cos(p)*K*g,this.y=Math.sin(p)*ue*g,this.z=K,this.sizeBase=80+Math.random()*120,this.speed=.8,this.active=!0,this.type=1+Math.floor(Math.random()*2);let w=[{name:"ice",baseH:190+Math.random()*40,sat:60,l:70},{name:"inferno",baseH:Math.random()*40,sat:80,l:60},{name:"toxic",baseH:80+Math.random()*40,sat:70,l:60},{name:"ethereal",baseH:260+Math.random()*40,sat:60,l:75},{name:"classic",baseH:30+Math.random()*20,sat:50,l:80}],P=w[Math.floor(Math.random()*w.length)];this.generateGasGiantTexture(P),this.type===2&&(this.rings=Array.from({length:4},(b,y)=>({r1:1.6+y*.2,opacity:.2+Math.random()*.4})))}hslToRgb(p,g,w){p/=360,g/=100,w/=100;let P,b,y;if(g===0)P=b=y=w;else{let E=w<.5?w*(1+g):w+g-w*g,k=2*w-E,T=S=>(S<0&&(S+=1),S>1&&(S-=1),S<1/6?k+(E-k)*6*S:S<1/2?E:S<2/3?k+(E-k)*(2/3-S)*6:k);P=T(p+1/3),b=T(p),y=T(p-1/3)}return{r:P*255,g:b*255,b:y*255}}generateGasGiantTexture(p){let g=document.createElement("canvas");g.width=g.height=256;let w=g.getContext("2d"),P=w.createImageData(256,256),b=p.baseH,y=this.hslToRgb(b,p.sat,p.l),E=this.hslToRgb((b+20)%360,p.sat+10,p.l-10),k=this.hslToRgb((b-40+360)%360,p.sat+20,p.l-15),T=this.hslToRgb((b+60)%360,p.sat-20,p.l+10),S=(M,L,I)=>({r:M.r+(L.r-M.r)*I,g:M.g+(L.g-M.g)*I,b:M.b+(L.b-M.b)*I}),A=Math.random()*1e3;for(let M=0;M<256;M++)for(let L=0;L<256;L++){let I=M/256*10,_=L/256*10,U=Math.abs(c(0,I*.4,A,3)),C=I+c(_*.5,I*.5,A)*U*4,O=_+c(I*.5,_*.5,A+50)*U*2,j=(c(0,C*.8,A+100,4)+1)/2,G=(c(O*.1,C*1.5,A+200,2)+1)/2,z=S(E,y,j);j>.7&&(z=S(z,T,(j-.7)*2)),G>.6&&(z=S(z,k,(G-.6)*1.5));let H=1+c(O,C,A+300,2)*.2,J=(M*256+L)*4;P.data[J]=Math.min(255,z.r*H),P.data[J+1]=Math.min(255,z.g*H),P.data[J+2]=Math.min(255,z.b*H),P.data[J+3]=255}w.putImageData(P,0,0),this.textureCanvas=g}update(){if(!this.active){Date.now()>this.nextSpawn&&this.reset();return}this.z-=this.speed,this.z<=0&&(this.active=!1,this.nextSpawn=Date.now())}draw(p){if(!this.active)return;let g=K/2/this.z,w=this.x*g+K/2,P=this.y*g+ue/2,b=(1-this.z/K)*this.sizeBase;if(w<-b*3||w>K+b*3||P<-b*3||P>ue+b*3)return;p.save(),p.translate(w,P),this.type===2&&(this.drawRings(p,b,!0),p.globalAlpha=1);let y=p.createRadialGradient(0,0,b*.9,0,0,b*1.5);y.addColorStop(0,"rgba(255, 255, 255, 0.15)"),y.addColorStop(1,"rgba(0,0,0,0)"),p.fillStyle=y,p.beginPath(),p.arc(0,0,b*1.5,0,Math.PI*2),p.fill(),p.save(),p.beginPath(),p.arc(0,0,b,0,Math.PI*2),p.clip(),p.globalAlpha=1,p.drawImage(this.textureCanvas,-b,-b,b*2,b*2);let E=p.createRadialGradient(-b*.5,-b*.5,b*.1,0,0,b);E.addColorStop(0,"rgba(255, 255, 255, 0.25)"),E.addColorStop(.5,"rgba(0, 0, 0, 0)"),E.addColorStop(1,"rgba(0, 0, 0, 0.4)"),p.fillStyle=E,p.fillRect(-b,-b,b*2,b*2),p.restore();let k=p.createRadialGradient(0,0,b*.7,0,0,b);k.addColorStop(1,"rgba(255,255,255,0.4)"),k.addColorStop(.8,"rgba(255,255,255,0)"),p.fillStyle=k,p.beginPath(),p.arc(0,0,b,0,Math.PI*2),p.fill(),this.type===2&&(this.drawRings(p,b,!1),p.globalAlpha=1),p.restore()}drawRings(p,g,w){p.save();let P=Math.PI/8;for(let b of this.rings)p.globalAlpha=b.opacity,p.strokeStyle="#E6E6FA",p.lineWidth=g*.15,p.beginPath(),p.ellipse(0,0,b.r1*g,b.r1*.3*g,P,0,Math.PI*2),p.stroke();p.restore()}}let d=new n,x=["#FFFFFF","#FFE4B5","#E0FFFF","#FFF0F5","#F0F8FF"];for(let v=0;v<r;v++)i.push({x:(Math.random()-.5)*K*4,y:(Math.random()-.5)*ue*4,z:Math.random()*K,color:x[Math.floor(Math.random()*x.length)],sizeBase:2+Math.random()*2.5});let m=0;function l(){e.fillStyle="rgba(5, 5, 12, 1)",e.fillRect(0,0,K,ue);let v=K/2,p=ue/2;m+=.01,d.update(),d.draw(e);for(let g=0;g<r;g++){let w=i[g],P=w.z;if(w.z-=4,w.z<=0){w.x=(Math.random()-.5)*K*4,w.y=(Math.random()-.5)*ue*4,w.z=K;continue}let b=K/2/w.z,y=w.x*b+v,E=w.y*b+p;if(y>=0&&y<=K&&E>=0&&E<=ue){let k=1-w.z/K,T=k*w.sizeBase;if(k<.3){e.globalAlpha=k*2,e.fillStyle=w.color,e.fillRect(y,E,Math.max(1,T),Math.max(1,T));continue}e.globalAlpha=k,e.fillStyle=w.color,e.strokeStyle=w.color;let S=K/2/P,A=w.x*S+v,M=w.y*S+p;e.lineWidth=T,e.beginPath(),e.moveTo(A,M),e.lineTo(y,E),e.stroke(),e.beginPath(),e.arc(y,E,T/2,0,Math.PI*2),e.fill(),k>.8&&(e.globalAlpha=(k-.8)*3,e.beginPath(),e.arc(y,E,T*2.5,0,Math.PI*2),e.fill())}}e.globalAlpha=1,Ke=requestAnimationFrame(l)}Ke=requestAnimationFrame(l)}function ca(){Ke&&(cancelAnimationFrame(Ke),Ke=null)}var Je=null,ye,Fe,re=null;function hi(){if(ye===void 0||Fe===void 0)return;let u=Math.max(14,Math.floor(ye/25)),t=Math.floor(ye/u),e=Math.floor(Fe/u);re=new qt(t,e,u),re._selectTarget()}var ci={id:"tetris",name:"Tetris",run:da,stop:pa,onResize:(u,t)=>{ye=u,Fe=t,hi()},preferredTrack:{title:"WinTask 3",trackTitle:"Whoopees Tetris"},marqueeFont:{color:"#f0f0f0",shadowColor:"#a000f0",shadowBlur:12,outline:"#000"}},di={I:{shapes:[[[1,1,1,1]],[[1],[1],[1],[1]]],color:"#00f0f0"},O:{shapes:[[[1,1],[1,1]]],color:"#f0f000"},T:{shapes:[[[0,1,0],[1,1,1]],[[1,0],[1,1],[1,0]],[[1,1,1],[0,1,0]],[[0,1],[1,1],[0,1]]],color:"#a000f0"},S:{shapes:[[[0,1,1],[1,1,0]],[[1,0],[1,1],[0,1]]],color:"#00f000"},Z:{shapes:[[[1,1,0],[0,1,1]],[[0,1],[1,1],[1,0]]],color:"#f00000"},J:{shapes:[[[1,0,0],[1,1,1]],[[1,1],[1,0],[1,0]],[[1,1,1],[0,0,1]],[[0,1],[0,1],[1,1]]],color:"#0000f0"},L:{shapes:[[[0,0,1],[1,1,1]],[[1,0],[1,0],[1,1]],[[1,1,1],[1,0,0]],[[1,1],[0,1],[0,1]]],color:"#f0a000"}},fi=Object.keys(di),Bt=class{constructor(t,e,i){this.x=t,this.y=e,this.color=i,this.vx=(Math.random()-.5)*12,this.vy=(Math.random()-.7)*14,this.gravity=.45,this.life=1,this.decay=.012+Math.random()*.018,this.size=1+Math.random()*2.5}update(){this.vx*=.985,this.vy+=this.gravity,this.x+=this.vx,this.y+=this.vy,this.life-=this.decay}draw(t){t.globalAlpha=Math.max(0,this.life),t.fillStyle=this.color,t.fillRect(this.x,this.y,this.size,this.size)}},qt=class{constructor(t,e,i){this.cols=t,this.rows=e,this.cellSize=i,this.board=Array.from({length:e},()=>Array(t).fill(null)),this.particles=[],this.exploding=!1,this.explodeTimer=0,this.EXPLODE_DURATION=120,this.level=1,this.linesTotal=0,this.dropCounter=0,this.moveCounter=0,this._spawnPiece()}_randomPiece(){let t=fi[Math.floor(Math.random()*fi.length)],e=di[t],i=Math.floor(Math.random()*e.shapes.length);return{shape:e.shapes[i],color:e.color,key:t,rotIdx:i,def:e}}_spawnPiece(){let t=this._randomPiece();this.current={...t,x:Math.floor((this.cols-t.shape[0].length)/2),y:0}}_fits(t,e,i){for(let r=0;r<t.length;r++)for(let s=0;s<t[r].length;s++){if(!t[r][s])continue;let f=e+s,a=i+r;if(f<0||f>=this.cols||a>=this.rows||a>=0&&this.board[a][f]!==null)return!1}return!0}_lock(){let{shape:t,x:e,y:i,color:r}=this.current;for(let s=0;s<t.length;s++)for(let f=0;f<t[s].length;f++){if(!t[s][f])continue;let a=i+s,o=e+f;a>=0&&a<this.rows&&o>=0&&o<this.cols&&(this.board[a][o]=r)}this._clearRows()}_clearRows(){let t=0;for(let e=this.rows-1;e>=0;e--)this.board[e].every(i=>i!==null)&&(this.board.splice(e,1),this.board.unshift(Array(this.cols).fill(null)),t++,e++);return t>0&&(this.linesTotal+=t,this.level=Math.floor(this.linesTotal/10)+1),t}_choosePlacement(){let{def:t}=this.current,e=-1/0,i=this.current.x,r=this.current.rotIdx;for(let s=0;s<t.shapes.length;s++){let f=t.shapes[s],a=f[0].length;for(let o=0;o<=this.cols-a;o++){let h=0;for(;this._fits(f,o,h+1);)h++;if(!this._fits(f,o,h))continue;let c=this._getHeuristicScore(f,o,h);c>e&&(e=c,i=o,r=s)}}return{x:i,rotIdx:r}}_getHeuristicScore(t,e,i){let r=this.board.map(c=>[...c]);for(let c=0;c<t.length;c++)for(let n=0;n<t[c].length;n++){if(!t[c][n])continue;let d=i+c,x=e+n;d>=0&&d<this.rows&&(r[d][x]="X")}let s=0;for(let c=0;c<this.rows;c++)r[c].every(n=>n!==null)&&s++;let f=Array(this.cols).fill(0),a=0;for(let c=0;c<this.cols;c++)for(let n=0;n<this.rows;n++)if(r[n][c]!==null){f[c]=this.rows-n,a+=f[c];break}let o=0;for(let c=0;c<this.cols;c++){let n=!1;for(let d=0;d<this.rows;d++)r[d][c]!==null?n=!0:n&&o++}let h=0;for(let c=0;c<this.cols-1;c++)h+=Math.abs(f[c]-f[c+1]);return a*-.51+s*.76+o*-.35+h*-.18+Math.random()*.1}_isBoardFull(){for(let t=0;t<3;t++)if(this.board[t].some(e=>e!==null))return!0;return!1}_explodeBoard(t,e){for(let i=0;i<this.rows;i++)for(let r=0;r<this.cols;r++)if(this.board[i][r]){let s=t+r*this.cellSize+this.cellSize/2,f=e+i*this.cellSize+this.cellSize/2,a=4+Math.floor(Math.random()*4);for(let o=0;o<a;o++)this.particles.push(new Bt(s,f,this.board[i][r]))}}_reset(){this.board=Array.from({length:this.rows},()=>Array(this.cols).fill(null)),this.exploding=!1,this.explodeTimer=0,this.particles=[],this._spawnPiece(),this._selectTarget()}_selectTarget(){let{x:t,rotIdx:e}=this._choosePlacement(),i=this.current.def;this.current.rotIdx=e,this.current.shape=i.shapes[e],this.current.targetX=t,this.current.y=0,this.current.x=Math.floor((this.cols-this.current.shape[0].length)/2)}step(t,e){if(this.exploding){this.explodeTimer++,this.particles=this.particles.filter(s=>s.life>0),this.particles.forEach(s=>s.update()),this.explodeTimer>=this.EXPLODE_DURATION&&this._reset();return}!this.current.targetX&&this.current.targetX!==0&&this._selectTarget(),this.moveCounter++,this.moveCounter>=2&&(this.moveCounter=0,this.current.x<this.current.targetX?this._fits(this.current.shape,this.current.x+1,this.current.y)&&this.current.x++:this.current.x>this.current.targetX&&this._fits(this.current.shape,this.current.x-1,this.current.y)&&this.current.x--);let i=this.current.x===this.current.targetX,r=Math.max(4,40-(this.level-1)*3);i&&(r=1),this.dropCounter++,this.dropCounter>=r&&(this.dropCounter=0,this._fits(this.current.shape,this.current.x,this.current.y+1)?this.current.y++:(this._lock(),this._isBoardFull()?(this._explodeBoard(t,e),this.exploding=!0,this.explodeTimer=0):(this._spawnPiece(),this._selectTarget())))}draw(t,e,i){let r=this.cellSize;for(let s=0;s<this.rows;s++)for(let f=0;f<this.cols;f++){let a=this.board[s][f];a&&this._drawCell(t,e+f*r,i+s*r,r,a,this.exploding?Math.max(0,1-this.explodeTimer/40):1)}if(!this.exploding&&this.current){let{shape:s,x:f,y:a,color:o}=this.current;for(let h=0;h<s.length;h++)for(let c=0;c<s[h].length;c++)s[h][c]&&this._drawCell(t,e+(f+c)*r,i+(a+h)*r,r,o,1)}t.save(),this.particles.forEach(s=>s.draw(t)),t.restore(),t.globalAlpha=1}_drawCell(t,e,i,r,s,f){t.globalAlpha=f,t.fillStyle=s,t.fillRect(e+1,i+1,r-2,r-2),t.fillStyle="rgba(255,255,255,0.3)",t.fillRect(e+1,i+1,r-2,3),t.fillRect(e+1,i+1,3,r-2),t.fillStyle="rgba(0,0,0,0.4)",t.fillRect(e+1,i+r-4,r-2,3),t.fillRect(e+r-4,i+1,3,r-2),t.globalAlpha=1}};function da(u,t){let e=u.ctx2d;ye=u.width,Fe=u.height,hi();function i(){if(e.fillStyle="rgba(8, 6, 18, 0.92)",e.fillRect(0,0,ye,Fe),e.strokeStyle="rgba(255,255,255,0.04)",e.lineWidth=.5,re){let r=re.cellSize,s=Math.floor((ye-re.cols*r)/2),f=Math.floor((Fe-re.rows*r)/2);for(let a=0;a<=re.cols;a++)e.beginPath(),e.moveTo(s+a*r,f),e.lineTo(s+a*r,f+re.rows*r),e.stroke();for(let a=0;a<=re.rows;a++)e.beginPath(),e.moveTo(s,f+a*r),e.lineTo(s+re.cols*r,f+a*r),e.stroke();re.step(s,f),re.draw(e,s,f)}Je=requestAnimationFrame(i)}Je=requestAnimationFrame(i)}function pa(){Je&&(cancelAnimationFrame(Je),Je=null)}var Z={aurora:Kt,debug:Jt,fire:Zt,geometry:Qt,julia:ei,lavalamp:ai,mandelbrot:oi,matrix:li,none:si,starfield:ui,tetris:ci};var gt=class{constructor(t="",e="bottom",i={}){this.text=t,this.position=e,this.applyStyles(i),this.time=0,this.textX=0,this.initialized=!1,this.baseCharWidth=15,this.baseFontSize=24,this.baseVelocity=2.8,this.baseBounce=12,this.fontFamily='"Courier New", monospace',this.fontWeight="bold",this.enabled=!0}applyStyles(t={}){this.color=t.color||"#FFF",this.outline=t.outline||null,this.shadowColor=t.shadowColor||null,this.shadowBlur=t.shadowBlur||0,this.colorFn=t.colorFn||null}updateStyles(t={}){this.applyStyles(t)}setText(t){this.text=t}setPosition(t){this.position=t}render(t,e,i){if(!this.enabled)return;this.initialized||(this.textX=e,this.initialized=!0);let r=e<480?.65:e<768?.8:1,s=Math.max(12,Math.floor(this.baseFontSize*r)),f=this.baseBounce*r,a=this.baseCharWidth*r,o=this.baseVelocity*r;if(this.time+=.012,!this.text)return;let h=this.text.length*a;this.textX-=o,this.textX<-(h+e*1.1)&&(this.textX=e),t.font=`${this.fontWeight} ${s}px ${this.fontFamily}`,t.lineJoin="round",this.outline&&(t.lineWidth=4,t.strokeStyle=this.outline);let c=50*r,n=32*r,d=this.position==="bottom"?i-n:c;for(let x=0;x<this.text.length;x++){let m=this.text[x],l=this.textX+x*a;if(l>-40&&l<e+40){let v=d+Math.sin(this.time*4+x*.1)*f;t.fillStyle=this.colorFn?this.colorFn(this.time,x):this.color,this.shadowColor?(t.shadowColor=this.shadowColor==="inherit"?t.fillStyle:this.shadowColor,t.shadowBlur=this.shadowBlur):t.shadowBlur=0,this.outline&&t.strokeText(m,l,v),t.fillText(m,l,v),this.shadowColor&&(t.shadowBlur=0)}}}};window.neoart=Object.create(null);function jt(u,t){var e=Object.create(null,{endian:{value:1,writable:!0},length:{value:0,writable:!0},index:{value:0,writable:!0},buffer:{value:null,writable:!0},view:{value:null,writable:!0},bytesAvailable:{get:function(){return this.length-this.index}},position:{get:function(){return this.index},set:function(i){i<0?i=0:i>this.length&&(i=this.length),this.index=i}},clear:{value:function(){this.buffer=new ArrayBuffer,this.view=null,this.index=this.length=0}},readAt:{value:function(i){return this.view.getUint8(i)}},readByte:{value:function(){return this.view.getInt8(this.index++)}},readShort:{value:function(){var i=this.view.getInt16(this.index,this.endian);return this.index+=2,i}},readInt:{value:function(){var i=this.view.getInt32(this.index,this.endian);return this.index+=4,i}},readUbyte:{value:function(){return this.view.getUint8(this.index++)}},readUshort:{value:function(){var i=this.view.getUint16(this.index,this.endian);return this.index+=2,i}},readUint:{value:function(){var i=this.view.getUint32(this.index,this.endian);return this.index+=4,i}},readBytes:{value:function(i,r,s){var f=i.view,a=this.index,o=this.view;for((s+=a)>this.length&&(s=this.length);a<s;++a)f.setUint8(r++,o.getUint8(a));this.index=a}},readString:{value:function(i){var r=this.index,s=this.view,f="";for((i+=r)>this.length&&(i=this.length);r<i;++r)f+=String.fromCharCode(s.getUint8(r));return this.index=i,f}},writeAt:{value:function(i,r){this.view.setUint8(i,r)}},writeByte:{value:function(i){this.view.setInt8(this.index++,i)}},writeShort:{value:function(i){this.view.setInt16(this.index,i),this.index+=2}},writeInt:{value:function(i){this.view.setInt32(this.index,i),this.index+=4}}});return e.buffer=u,e.view=new DataView(u),e.length=u.byteLength,Object.seal(e)}function pi(){return Object.create(null,{l:{value:0,writable:!0},r:{value:0,writable:!0},next:{value:null,writable:!0}})}function wt(){return Object.create(null,{player:{value:null,writable:!0},channels:{value:[],writable:!0},buffer:{value:[],writable:!0},samplesTick:{value:0,writable:!0},samplesLeft:{value:0,writable:!0},remains:{value:0,writable:!0},completed:{value:0,writable:!0},bufferSize:{get:function(){return this.buffer.length},set:function(u){var t,e=this.buffer.length||0;if(!(u===e||u<512)&&(this.buffer.length=u,u>e))for(this.buffer[e]=pi(),t=++e;t<u;++t)this.buffer[t]=this.buffer[t-1].next=pi()}},complete:{get:function(){return this.completed},set:function(u){this.completed=u^this.player.loopSong}},reset:{value:function(){var u=this.channels[0],t=this.buffer[0];for(this.samplesLeft=0,this.remains=0,this.completed=0;u;)u.initialize(),u=u.next;for(;t;)t.l=t.r=0,t=t.next}},restore:{configurable:!0,value:function(){}}})}function ma(){var u=null;return typeof AudioContext<"u"?u=new AudioContext:alert("Web Audio API does not appear to be supported. Use Chrome, Safari or Firefox"),u}function yt(){var u=Object.create(null,{context:{value:null,writable:!0},node:{value:null,writable:!0},analyser:{value:null,writable:!0},analyse:{value:0,writable:!0},endian:{value:0,writable:!0},sampleRate:{value:0,writable:!0},playSong:{value:0,writable:!0},lastSong:{value:0,writable:!0},version:{value:0,writable:!0},title:{value:"",writable:!0},channels:{value:0,writable:!0},loopSong:{value:0,writable:!0},speed:{value:0,writable:!0},tempo:{value:0,writable:!0},mixer:{value:null,writable:!0},tick:{value:0,writable:!0},paused:{value:0,writable:!0},callback:{value:null,writable:!0},quality:{configurable:!0,set:function(t){this.callback=t?this.mixer.accurate.bind(this.mixer):this.mixer.fast.bind(this.mixer)}},toggle:{value:function(t){this.mixer.channels[t].mute^=1}},setup:{configurable:!0,value:function(){}},load:{value:function(t){return this.version=0,this.playSong=0,this.lastSong=0,this.mixer.restore(),t.view||(t=jt(t)),t.position=0,t.readUint()===67324752&&window.neoart.Unzip,t.endian=this.endian,t.position=0,this.loader(t),this.version&&this.setup(),this.version}},play:{value:function(){var t,e;this.version&&(this.paused?this.paused=0:(this.initialize(),typeof this.context.createJavaScriptNode=="function"?this.node=this.context.createJavaScriptNode(this.mixer.bufferSize):this.node=this.context.createScriptProcessor(this.mixer.bufferSize),this.analyser=this.context.createAnalyser(),this.node.connect(this.analyser),this.node.onaudioprocess=this.callback),this.analyse&&window.neoart.Flectrum?(e=window.neoart.analyserNode=this.context.createAnalyser(),this.node.connect(e),e.connect(this.context.destination)):this.node.connect(this.context.destination),t=document.createEvent("Event"),t.initEvent("flodPlay",!0,!1),document.dispatchEvent(t))}},pause:{value:function(){if(this.node){this.node.disconnect(),this.paused=1;var t=document.createEvent("Event");t.initEvent("flodPause",!0,!1),document.dispatchEvent(t)}}},stop:{value:function(){if(this.node){this.node.disconnect(),this.node.onaudioprocess=this.node=null,this.paused=0,this.restore&&this.restore();var t=document.createEvent("Event");t.initEvent("flodStop",!0,!1),document.dispatchEvent(t)}}},reset:{value:function(){this.tick=0,this.mixer.initialize(),this.mixer.samplesTick=this.sampleRate*2.5/this.tempo>>0}}});return window.neoart.audioContext||(window.neoart.audioContext=ma()),u.context=window.neoart.audioContext,u.sampleRate=u.context.sampleRate,u}function kt(u){var t=Object.create(null,{next:{value:null,writable:!0},mute:{value:0,writable:!0},panning:{value:0,writable:!0},delay:{value:0,writable:!0},pointer:{value:0,writable:!0},length:{value:0,writable:!0},audena:{value:0,writable:!0},audcnt:{value:0,writable:!0},audloc:{value:0,writable:!0},audper:{value:0,writable:!0},audvol:{value:0,writable:!0},timer:{value:0,writable:!0},level:{value:0,writable:!0},ldata:{value:0,writable:!0},rdata:{value:0,writable:!0},enabled:{get:function(){return this.audena},set:function(e){e!==this.audena&&(this.audena=e,this.audloc=this.pointer,this.audcnt=this.pointer+this.length,this.timer=1,e&&(this.delay+=2))}},period:{set:function(e){e<0?e=0:e>65535&&(e=65535),this.audper=e}},volume:{set:function(e){e<0?e=0:e>64&&(e=64),this.audvol=e}},resetData:{value:function(){this.ldata=0,this.rdata=0}},initialize:{value:function(){this.audena=0,this.audcnt=0,this.audloc=0,this.audper=50,this.audvol=0,this.timer=0,this.ldata=0,this.rdata=0,this.delay=0,this.pointer=0,this.length=0}}});return t.panning=t.level=(++u&2)===0?-1:1,Object.seal(t)}function va(){return Object.create(null,{active:{value:0,writable:!0},forced:{value:-1,writable:!0},l0:{value:0,writable:!0},l1:{value:0,writable:!0},l2:{value:0,writable:!0},l3:{value:0,writable:!0},l4:{value:0,writable:!0},r0:{value:0,writable:!0},r1:{value:0,writable:!0},r2:{value:0,writable:!0},r3:{value:0,writable:!0},r4:{value:0,writable:!0},initialize:{value:function(){this.l0=this.l1=this.l2=this.l3=this.l4=0,this.r0=this.r1=this.r2=this.r3=this.r4=0}},process:{value:function(u,t){var e=.52133458435322,i=.4860348337215757,r=.9314955486749749,s=1-i;u===0&&(this.l0=i*t.l+s*this.l0,this.r0=i*t.r+s*this.r0,s=1-r,t.l=this.l1=r*this.l0+s*this.l1,t.r=this.r1=r*this.r0+s*this.r1),(this.active|this.forced)>0&&(s=1-e,this.l2=e*t.l+s*this.l2,this.r2=e*t.r+s*this.r2,this.l3=e*this.l2+s*this.l3,this.r3=e*this.r2+s*this.r3,t.l=this.l4=e*this.l3+s*this.l4,t.r=this.r4=e*this.r3+s*this.r4),t.l>1?t.l=1:t.l<-1&&(t.l=-1),t.r>1?t.r=1:t.r<-1&&(t.r=-1)}}})}function Pt(){return Object.create(null,{note:{value:0,writable:!0},sample:{value:0,writable:!0},effect:{value:0,writable:!0},param:{value:0,writable:!0}})}function Ze(){return Object.create(null,{name:{value:"",writable:!0},length:{value:0,writable:!0},loop:{value:0,writable:!0},repeat:{value:0,writable:!0},volume:{value:0,writable:!0},pointer:{value:0,writable:!0},loopPtr:{value:0,writable:!0}})}function Nt(){var u=wt();return Object.defineProperties(u,{filter:{value:null,writable:!0},model:{value:1,writable:!0},memory:{value:[],writable:!0},loopPtr:{value:0,writable:!0},loopLen:{value:4,writable:!0},clock:{value:0,writable:!0},master:{value:0,writable:!0},ready:{value:0,writable:!0},volume:{set:function(t){t>0?(t>64&&(t=64),this.master=t/64*.00390625):this.master=0}},initialize:{value:function(){var t=this.memory.length,e=t+this.loopLen;if(this.reset(),this.filter.initialize(),!this.ready)for(this.ready=1,this.loopPtr=t;t<e;++t)this.memory[t]=0}},restore:{value:function(){this.ready=0,this.memory.length=0}},store:{value:function(t,e,i){var r,s,f=t.position,a=this.memory.length,o;for(i&&(t.position=i),o=t.position+e,o>=t.length&&(r=o-t.length,e=t.length-t.position),s=a,e+=a;s<e;++s)this.memory[s]=t.readByte();for(e+=r;s<e;++s)this.memory[s]=0;return i&&(t.position=f),a}},fast:{value:function(t){var e,i,r,s=this.memory,f,a=0,o,h=0,c,n,d,x=this.bufferSize,m,l,v;if(this.completed){if(!this.remains){this.player.stop();return}x=this.remains}for(;a<x;){for(this.samplesLeft||(this.player.process(),this.samplesLeft=this.samplesTick,this.completed&&(x=a+this.samplesTick,x>this.bufferSize&&(this.remains=x-this.bufferSize,x=this.bufferSize))),l=this.samplesLeft,a+l>=x&&(l=x-a),o=h+l,e=this.channels[0];e;){if(d=this.buffer[h],e.audena&&e.audper>60)for(m=e.audper/this.clock,v=e.audvol*this.master,f=v*(1-e.level),n=v*(1+e.level),i=h;i<o;++i)e.delay?e.delay--:--e.timer<1&&(e.mute||(v=s[e.audloc]*.0078125,e.ldata=v*f,e.rdata=v*n),e.audloc++,e.timer+=m,e.audloc>=e.audcnt&&(e.audloc=e.pointer,e.audcnt=e.pointer+e.length)),d.l+=e.ldata,d.r+=e.rdata,d=d.next;else for(i=h;i<o;++i)d.l+=e.ldata,d.r+=e.rdata,d=d.next;e=e.next}h=o,a+=l,this.samplesLeft-=l}for(v=this.model,s=this.filter,d=this.buffer[0],r=t.outputBuffer.getChannelData(0),c=t.outputBuffer.getChannelData(1),i=0;i<x;++i)s.process(v,d),r[i]=d.l,c[i]=d.r,d.l=d.r=0,d=d.next}}}),u.channels[0]=kt(0),u.channels[0].next=u.channels[1]=kt(1),u.channels[1].next=u.channels[2]=kt(2),u.channels[2].next=u.channels[3]=kt(3),u.bufferSize=8192,u.filter=va(),u.master=.00390625,Object.seal(u)}function St(u){var t=yt();return Object.defineProperties(t,{quality:{set:function(e){this.callback=this.mixer.fast.bind(this.mixer)}},stereo:{set:function(e){var i=this.mixer.channels[0];for(e<0?e=0:e>1&&(e=1);i;)i.level=e*i.panning,i=i.next}},volume:{set:function(e){e<0?e=0:e>1&&(e=1),this.mixer.master=e*.00390625}},frequency:{value:function(e){e?(this.mixer.clock=3579545/this.sampleRate,this.mixer.samplesTick=735):(this.mixer.clock=3546895/this.sampleRate,this.mixer.samplesTick=882)}}}),t.mixer=u||Nt(),t.mixer.player=t,t.frequency(0),t.channels=4,t.endian=0,t.quality=0,t.speed=6,t.tempo=125,t}function mi(){return Object.create(null,{next:{value:null,writable:!0},mute:{value:0,writable:!0},enabled:{value:0,writable:!0},sample:{value:null,writable:!0},length:{value:0,writable:!0},index:{value:0,writable:!0},pointer:{value:0,writable:!0},delta:{value:0,writable:!0},fraction:{value:0,writable:!0},speed:{value:0,writable:!0},dir:{value:0,writable:!0},oldSample:{value:null,writable:!0},oldLength:{value:0,writable:!0},oldPointer:{value:0,writable:!0},oldFraction:{value:0,writable:!0},oldSpeed:{value:0,writable:!0},oldDir:{value:0,writable:!0},volume:{value:0,writable:!0},lvol:{value:0,writable:!0},rvol:{value:0,writable:!0},panning:{value:128,writable:!0},lpan:{value:.5,writable:!0},rpan:{value:.5,writable:!0},ldata:{value:0,writable:!0},rdata:{value:0,writable:!0},mixCounter:{value:0,writable:!0},lmixRampU:{value:0,writable:!0},lmixDeltaU:{value:0,writable:!0},rmixRampU:{value:0,writable:!0},rmixDeltaU:{value:0,writable:!0},lmixRampD:{value:0,writable:!0},lmixDeltaD:{value:0,writable:!0},rmixRampD:{value:0,writable:!0},rmixDeltaD:{value:0,writable:!0},volCounter:{value:0,writable:!0},lvolDelta:{value:0,writable:!0},rvolDelta:{value:0,writable:!0},panCounter:{value:0,writable:!0},lpanDelta:{value:0,writable:!0},rpanDelta:{value:0,writable:!0},initialize:{value:function(){this.enabled=0,this.sample=null,this.length=0,this.index=0,this.pointer=0,this.delta=0,this.fraction=0,this.speed=0,this.dir=0,this.oldSample=null,this.oldLength=0,this.oldPointer=0,this.oldFraction=0,this.oldSpeed=0,this.oldDir=0,this.volume=0,this.lvol=0,this.rvol=0,this.panning=128,this.lpan=.5,this.rpan=.5,this.ldata=0,this.rdata=0,this.mixCounter=0,this.lmixRampU=0,this.lmixDeltaU=0,this.rmixRampU=0,this.rmixDeltaU=0,this.lmixRampD=0,this.lmixDeltaD=0,this.rmixRampD=0,this.rmixDeltaD=0,this.volCounter=0,this.lvolDelta=0,this.rvolDelta=0,this.panCounter=0,this.lpanDelta=0,this.rpanDelta=0}}})}function vi(){return Object.create(null,{name:{value:"",writable:!0},bits:{value:8,writable:!0},volume:{value:0,writable:!0},length:{value:0,writable:!0},data:{value:[],writable:!0},loopMode:{value:0,writable:!0},loopStart:{value:0,writable:!0},loopLen:{value:0,writable:!0},store:{value:function(u){var t=0,e,i=this.length,r,s,f,a;if(this.loopLen||(this.loopMode=0),r=u.position,this.loopMode?(i=this.loopStart+this.loopLen,this.data=new Float32Array(i+1)):this.data=new Float32Array(this.length+1),this.bits===8)for(f=r+i,f>u.length&&(i=u.length-r),e=0;e<i;e++)a=u.readByte()+t,a<-128?a+=256:a>127&&(a-=256),this.data[e]=a*.0078125,t=a;else for(f=r+(i<<1),f>u.length&&(i=u.length-r>>1),e=0;e<i;e++)a=u.readShort()+t,a<-32768?a+=65536:a>32767&&(a-=65536),this.data[e]=a*3051758e-11,t=a;if(f=r+this.length,this.loopMode?(this.length=this.loopStart+this.loopLen,this.loopMode===1?this.data[i]=this.data[this.loopStart]:this.data[i]=this.data[i-1]):this.data[this.length]=0,i!==this.length)for(s=this.data[i-1],e=i;e<this.length;e++)this.data[e]=s;f<u.length?u.position=f:u.position=u.length-1}}})}function ba(){var u=wt();return Object.defineProperties(u,{setup:{value:function(t){var e=1;for(this.channels.length=t,this.channels[0]=mi();e<t;++e)this.channels[e]=this.channels[e-1].next=mi()}},initialize:{value:function(){this.reset()}},fast:{value:function(t){var e,i,r,s,f=0,a,o=0,h,c,n,d=this.bufferSize,x,m;if(this.completed){if(!this.remains){this.player.stop();return}d=this.remains}for(;f<d;){for(this.samplesLeft||(this.player.process(),this.player.fast(),this.samplesLeft=this.samplesTick,this.completed&&(d=f+this.samplesTick,d>this.bufferSize&&(this.remains=d-this.bufferSize,d=this.bufferSize))),x=this.samplesLeft,f+x>=d&&(x=d-f),a=o+x,e=this.channels[0];e;){if(!e.enabled){e=e.next;continue}for(c=e.sample,i=c.data,n=this.buffer[o],s=o;s<a;++s){if(e.index!==e.pointer){if(e.index>=e.length)if(c.loopMode)e.pointer=c.loopStart+(e.index-e.length),e.length=c.length,c.loopMode===2&&(e.dir?e.dir=0:e.dir=c.length+c.loopStart-1);else{e.enabled=0;break}else e.pointer=e.index;e.mute?(e.ldata=0,e.rdata=0):(e.dir?m=i[e.dir-e.pointer]:m=i[e.pointer],e.ldata=m*e.lvol,e.rdata=m*e.rvol)}e.index=e.pointer+e.delta,(e.fraction+=e.speed)>=1&&(e.index++,e.fraction--),n.l+=e.ldata,n.r+=e.rdata,n=n.next}e=e.next}o=a,f+=x,this.samplesLeft-=x}for(n=this.buffer[0],r=t.outputBuffer.getChannelData(0),h=t.outputBuffer.getChannelData(1),s=0;s<d;++s)n.l>1?n.l=1:n.l<-1&&(n.l=-1),n.r>1?n.r=1:n.r<-1&&(n.r=-1),r[s]=n.l,h[s]=n.r,n.l=n.r=0,n=n.next}},accurate:{value:function(t){var e,i,r,s,f,a,o=0,h,c=0,n,d,x,m,l,v=this.bufferSize,p,g;if(this.completed){if(!this.remains){this.player.stop();return}v=this.remains}for(;o<v;){for(this.samplesLeft||(this.player.process(),this.player.accurate(),this.samplesLeft=this.samplesTick,this.completed&&(v=o+this.samplesTick,v>this.bufferSize&&(this.remains=v-this.bufferSize,v=this.bufferSize))),p=this.samplesLeft,o+p>=v&&(p=v-o),h=c+p,e=this.channels[0];e;){if(!e.enabled){e=e.next;continue}for(x=e.sample,i=x.data,m=e.oldSample,m&&(r=m.data),l=this.buffer[c],a=c;a<h;++a){if(g=e.mute?0:i[e.pointer],g+=(i[e.pointer+e.dir]-g)*e.fraction,(e.fraction+=e.speed)>=1&&(f=e.fraction>>0,e.fraction-=f,e.dir>0?(e.pointer+=f,e.pointer>e.length&&(e.fraction+=e.pointer-e.length,e.pointer=e.length)):(e.pointer-=f,e.pointer<e.length&&(e.fraction+=e.length-e.pointer,e.pointer=e.length))),e.mixCounter?(m?(n=e.mute?0:r[e.oldPointer],n+=(r[e.oldPointer+e.oldDir]-n)*e.oldFraction,(e.oldFraction+=e.oldSpeed)>1&&(f=e.oldFraction>>0,e.oldFraction-=f,e.oldDir>0?(e.oldPointer+=f,e.oldPointer>e.oldLength&&(e.oldFraction+=e.oldPointer-e.oldLength,e.oldPointer=e.oldLength)):(e.oldPointer-=f,e.oldPointer<e.oldLength&&(e.oldFraction+=e.oldLength-e.oldPointer,e.oldPointer=e.oldLength))),l.l+=g*e.lmixRampU+n*e.lmixRampD,l.r+=g*e.rmixRampU+n*e.rmixRampD,e.lmixRampD-=e.lmixDeltaD,e.rmixRampD-=e.rmixDeltaD):(l.l+=g*e.lmixRampU,l.r+=g*e.rmixRampU),e.lmixRampU+=e.lmixDeltaU,e.rmixRampU+=e.rmixDeltaU,e.mixCounter--,e.oldPointer===e.oldLength&&(m.loopMode?m.loopMode===1?(e.oldPointer=m.loopStart,e.oldLength=m.length):e.oldDir>0?(e.oldPointer=m.length-1,e.oldLength=m.loopStart,e.oldDir=-1):(e.oldFraction-=1,e.oldPointer=m.loopStart,e.oldLength=m.length,e.oldDir=1):(m=null,e.oldPointer=0))):(l.l+=g*e.lvol,l.r+=g*e.rvol,e.volCounter?(e.lvol+=e.lvolDelta,e.rvol+=e.rvolDelta,e.volCounter--):e.panCounter&&(e.lpan+=e.lpanDelta,e.rpan+=e.rpanDelta,e.panCounter--,e.lvol=e.volume*e.lpan,e.rvol=e.volume*e.rpan)),e.pointer===e.length)if(x.loopMode)x.loopMode===1?(e.pointer=x.loopStart,e.length=x.length):e.dir>0?(e.pointer=x.length-1,e.length=x.loopStart,e.dir=-1):(e.fraction-=1,e.pointer=x.loopStart,e.length=x.length,e.dir=1);else{e.enabled=0;break}l=l.next}e=e.next}c=h,o+=p,this.samplesLeft-=p}for(l=this.buffer[0],s=t.outputBuffer.getChannelData(0),d=t.outputBuffer.getChannelData(1),a=0;a<v;++a)l.l>1?l.l=1:l.l<-1&&(l.l=-1),l.r>1?l.r=1:l.r<-1&&(l.r=-1),s[a]=l.l,d[a]=l.r,l.l=l.r=0,l=l.next}}}),u.bufferSize=8192,Object.seal(u)}function bi(u){var t=yt();return Object.defineProperties(t,{track:{value:null,writable:!0},length:{value:0,writable:!0},restart:{value:0,writable:!0},timer:{value:0,writable:!0},master:{value:0,writable:!0},volume:{set:function(e){e<0?e=0:e>1&&(e=1),this.master=e*64}},setup:{configurable:!1,value:function(){this.mixer.setup(this.channels)}}}),t.mixer=u||ba(),t.mixer.player=t,t.endian=1,t.quality=1,t}function xa(u){var t=Object.create(null,{index:{value:u,writable:!0},next:{value:null,writable:!0},flags:{value:0,writable:!0},delay:{value:0,writable:!0},channel:{value:null,writable:!0},patternLoop:{value:0,writable:!0},patternLoopRow:{value:0,writable:!0},playing:{value:null,writable:!0},note:{value:0,writable:!0},keyoff:{value:0,writable:!0},period:{value:0,writable:!0},finetune:{value:0,writable:!0},arpDelta:{value:0,writable:!0},vibDelta:{value:0,writable:!0},instrument:{value:null,writable:!0},autoVibratoPos:{value:0,writable:!0},autoSweep:{value:0,writable:!0},autoSweepPos:{value:0,writable:!0},sample:{value:null,writable:!0},sampleOffset:{value:0,writable:!0},volume:{value:0,writable:!0},volEnabled:{value:0,writable:!0},volEnvelope:{value:null,writable:!0},volDelta:{value:0,writable:!0},volSlide:{value:0,writable:!0},volSlideMaster:{value:0,writable:!0},fineSlideU:{value:0,writable:!0},fineSlideD:{value:0,writable:!0},fadeEnabled:{value:0,writable:!0},fadeDelta:{value:0,writable:!0},fadeVolume:{value:0,writable:!0},panning:{value:0,writable:!0},panEnabled:{value:0,writable:!0},panEnvelope:{value:null,writable:!0},panSlide:{value:0,writable:!0},portaU:{value:0,writable:!0},portaD:{value:0,writable:!0},finePortaU:{value:0,writable:!0},finePortaD:{value:0,writable:!0},xtraPortaU:{value:0,writable:!0},xtraPortaD:{value:0,writable:!0},portaPeriod:{value:0,writable:!0},portaSpeed:{value:0,writable:!0},glissando:{value:0,writable:!0},glissPeriod:{value:0,writable:!0},vibratoPos:{value:0,writable:!0},vibratoSpeed:{value:0,writable:!0},vibratoDepth:{value:0,writable:!0},vibratoReset:{value:0,writable:!0},tremoloPos:{value:0,writable:!0},tremoloSpeed:{value:0,writable:!0},tremoloDepth:{value:0,writable:!0},waveControl:{value:0,writable:!0},tremorPos:{value:0,writable:!0},tremorOn:{value:0,writable:!0},tremorOff:{value:0,writable:!0},tremorVolume:{value:0,writable:!0},retrigx:{value:0,writable:!0},retrigy:{value:0,writable:!0},rowCurrent:{value:null,writable:!0},reset:{value:function(){this.volume=this.sample.volume,this.panning=this.sample.panning,this.finetune=this.sample.finetune>>3<<2,this.keyoff=0,this.volDelta=0,this.fadeEnabled=0,this.fadeDelta=0,this.rowCurrent=null,this.fadeVolume=65536,this.autoVibratoPos=0,this.autoSweep=1,this.autoSweepPos=0,this.vibDelta=0,this.vibratoReset=0,(this.waveControl&15)<4&&(this.vibratoPos=0),this.waveControl>>4<4&&(this.tremoloPos=0)}},autoVibrato:{value:function(){var e;switch(this.autoVibratoPos=this.autoVibratoPos+this.playing.vibratoSpeed&255,this.playing.vibratoType){case 0:e=Sa[this.autoVibratoPos];break;case 1:this.autoVibratoPos<128?e=-64:e=64;break;case 2:e=(64+(this.autoVibratoPos>>1)&127)-64;break;case 3:e=(64-(this.autoVibratoPos>>1)&127)-64;break;default:break}return e*=this.playing.vibratoDepth,this.autoSweep&&(this.playing.vibratoSweep?this.autoSweepPos>this.playing.vibratoSweep?(this.autoSweepPos&2&&(e*=this.autoSweepPos/this.playing.vibratoSweep),this.autoSweep=0):e*=++this.autoSweepPos/this.playing.vibratoSweep:this.autoSweep=0),this.flags|=Q,e>>6}},tonePortamento:{value:function(){this.glissPeriod||(this.glissPeriod=this.period),this.period<this.portaPeriod?(this.glissPeriod+=this.portaSpeed<<2,this.glissando?this.period=Math.round(this.glissPeriod/64)<<6:this.period=this.glissPeriod,this.period>=this.portaPeriod&&(this.period=this.portaPeriod,this.glissPeriod=this.portaPeriod=0)):this.period>this.portaPeriod&&(this.glissPeriod-=this.portaSpeed<<2,this.glissando?this.period=Math.round(this.glissPeriod/64)<<6:this.period=this.glissPeriod,this.period<=this.portaPeriod&&(this.period=this.portaPeriod,this.glissPeriod=this.portaPeriod=0)),this.flags|=Q}},tremolo:{value:function(){var e=255,i=this.tremoloPos&31;switch(this.waveControl>>4&3){case 0:e=Si[i];break;case 1:e=i<<3;break;default:break}this.volDelta=e*this.tremoloDepth>>6,this.tremoloPos>31&&(this.volDelta=-this.volDelta),this.tremoloPos=this.tremoloPos+this.tremoloSpeed&63,this.flags|=B}},tremor:{value:function(){this.tremorPos===this.tremorOn?(this.tremorVolume=this.volume,this.volume=0,this.flags|=B):(this.tremorPos=0,this.volume=this.tremorVolume,this.flags|=B),this.tremorPos++}},vibrato:{value:function(){var e=255,i=this.vibratoPos&31;switch(this.waveControl&3){case 0:e=Si[i];break;case 1:e=i<<3,this.vibratoPos>31&&(e=255-e);break;default:break}this.vibDelta=e*this.vibratoDepth>>7,this.vibratoPos>31&&(this.vibDelta=-this.vibDelta),this.vibratoPos=this.vibratoPos+this.vibratoSpeed&63,this.flags|=Q}}});return t.volEnvelope=xi(),t.panEnvelope=xi(),Object.seal(t)}function Dt(){return Object.create(null,{points:{value:[],writable:!0},total:{value:0,writable:!0},sustain:{value:0,writable:!0},loopStart:{value:0,writable:!0},loopEnd:{value:0,writable:!0},flags:{value:0,writable:!0}})}function xi(){return Object.create(null,{value:{value:0,writable:!0},position:{value:0,writable:!0},frame:{value:0,writable:!0},delta:{value:0,writable:!0},fraction:{value:0,writable:!0},stopped:{value:0,writable:!0},reset:{value:function(){this.value=0,this.position=0,this.frame=0,this.delta=0,this.fraction=0,this.stopped=0}}})}function gi(){var u=Object.create(null,{name:{value:"",writable:!0},samples:{value:[],writable:!0},noteSamples:{value:null,writable:!0},fadeout:{value:0,writable:!0},volData:{value:null,writable:!0},volEnabled:{value:0,writable:!0},panData:{value:null,writable:!0},panEnabled:{value:0,writable:!0},vibratoType:{value:0,writable:!0},vibratoSweep:{value:0,writable:!0},vibratoSpeed:{value:0,writable:!0},vibratoDepth:{value:0,writable:!0}});return u.noteSamples=new Uint8Array(96),u.volData=Dt(),u.panData=Dt(),Object.seal(u)}function wi(u,t){var e=Object.create(null,{rows:{value:[],writable:!0},length:{value:0,writable:!0},size:{value:0,writable:!0}});return e.rows.length=e.size=u*t,e.length=u,Object.seal(e)}function Et(u,t){var e=Object.create(null,{frame:{value:0,writable:!0},value:{value:0,writable:!0}});return e.frame=u||0,e.value=t||0,Object.seal(e)}function $t(){return Object.create(null,{note:{value:0,writable:!0},instrument:{value:0,writable:!0},volume:{value:0,writable:!0},effect:{value:0,writable:!0},param:{value:0,writable:!0}})}function yi(){var u=vi();return Object.defineProperties(u,{finetune:{value:0,writable:!0},panning:{value:0,writable:!0},relative:{value:0,writable:!0}}),Object.seal(u)}function ga(u){var t=bi(u);return Object.defineProperties(t,{id:{value:"F2Player"},patterns:{value:[],writable:!0},instruments:{value:[],writable:!0},voices:{value:[],writable:!0},linear:{value:0,writable:!0},complete:{value:0,writable:!0},order:{value:0,writable:!0},position:{value:0,writable:!0},nextOrder:{value:0,writable:!0},nextPosition:{value:0,writable:!0},pattern:{value:null,writable:!0},patternDelay:{value:0,writable:!0},patternOffset:{value:0,writable:!0},timer:{value:0,writable:!0},rowCurrent:{value:0,writable:!0},initialize:{value:function(){var e=0,i;for(this.reset(),this.timer=this.speed,this.order=0,this.position=0,this.nextOrder=-1,this.nextPosition=-1,this.patternDelay=0,this.patternOffset=0,this.complete=0,this.master=64,this.voices.length=this.channels;e<this.channels;++e)i=xa(e),i.channel=this.mixer.channels[e],i.playing=this.instruments[0],i.sample=i.playing.samples[0],this.voices[e]=i,e&&(this.voices[e-1].next=i)}},loader:{value:function(e){var i,r,s,f,a,o,h,c,n,d,x=22,m,l,v,p;if(!(e.length<360)){if(e.position=17,this.title=e.readString(20),e.position++,s=e.readString(20),s==="FastTracker v2.00   "||s==="FastTracker v 2.00  ")this.version=1;else if(s==="Sk@le Tracker")x=2,this.version=2;else if(s==="MadTracker 2.0")this.version=3;else if(s==="MilkyTracker        ")this.version=4;else if(s==="DigiBooster Pro 2.18")this.version=5;else if(s.indexOf("OpenMPT")!==-1)this.version=6;else return;for(e.readUshort(),i=e.readUint(),this.length=e.readUshort(),this.restart=e.readUshort(),this.channels=e.readUshort(),p=l=e.readUshort(),this.instruments=[],this.instruments.length=e.readUshort()+1,this.linear=e.readUshort(),this.speed=e.readUshort(),this.tempo=e.readUshort(),this.track=new Uint8Array(this.length),r=0;r<this.length;++r)h=e.readUbyte(),h>=p&&(l=h+1),this.track[r]=h;if(this.patterns=[],this.patterns.length=l,l!==p){for(n=wi(64,this.channels),h=n.size,r=0;r<h;++r)n.rows[r]=$t();this.patterns[--l]=n}for(e.position=d=i+60,c=p,r=0;r<c;++r){if(i=e.readUint(),e.position++,n=wi(e.readUshort(),this.channels),l=n.size,p=e.readUshort(),e.position=d+i,o=e.position+p,p)for(h=0;h<l;++h)m=$t(),p=e.readUbyte(),p&128?(p&1&&(m.note=e.readUbyte()),p&2&&(m.instrument=e.readUbyte()),p&4&&(m.volume=e.readUbyte()),p&8&&(m.effect=e.readUbyte()),p&16&&(m.param=e.readUbyte())):(m.note=p,m.instrument=e.readUbyte(),m.volume=e.readUbyte(),m.effect=e.readUbyte(),m.param=e.readUbyte()),m.note!==Xt&&m.note>96&&(m.note=0),n.rows[h]=m;else for(h=0;h<l;++h)n.rows[h]=$t();this.patterns[r]=n,d=e.position,d!==o&&(d=e.position=o)}for(o=e.position,c=this.instruments.length,r=1;r<c&&(f=e.readUint(),!(e.position+f>=e.length));++r){if(a=gi(),a.name=e.readString(22),e.position++,p=e.readUshort(),p>16&&(p=16),i=e.readUint(),x===2&&i!==64&&(i=64),p){for(a.samples=[],a.samples.length=p,h=0;h<96;++h)a.noteSamples[h]=e.readUbyte();for(h=0;h<12;++h)a.volData.points[h]=Et(e.readUshort(),e.readUshort());for(h=0;h<12;++h)a.panData.points[h]=Et(e.readUshort(),e.readUshort());for(a.volData.total=e.readUbyte(),a.panData.total=e.readUbyte(),a.volData.sustain=e.readUbyte(),a.volData.loopStart=e.readUbyte(),a.volData.loopEnd=e.readUbyte(),a.panData.sustain=e.readUbyte(),a.panData.loopStart=e.readUbyte(),a.panData.loopEnd=e.readUbyte(),a.volData.flags=e.readUbyte(),a.panData.flags=e.readUbyte(),a.volData.flags&ki&&(a.volEnabled=1),a.panData.flags&ki&&(a.panEnabled=1),a.vibratoType=e.readUbyte(),a.vibratoSweep=e.readUbyte(),a.vibratoDepth=e.readUbyte(),a.vibratoSpeed=e.readUbyte(),a.fadeout=e.readUshort()<<1,e.position+=x,d=e.position,this.instruments[r]=a,h=0;h<p;++h)v=yi(),v.length=e.readUint(),v.loopStart=e.readUint(),v.loopLen=e.readUint(),v.volume=e.readUbyte(),v.finetune=e.readByte(),v.loopMode=e.readUbyte(),v.panning=e.readUbyte(),v.relative=e.readByte(),e.position++,v.name=e.readString(22),a.samples[h]=v,e.position=d+=i;for(h=0;h<p;++h)v=a.samples[h],v.length&&(d=e.position+v.length,v.loopMode&16&&(v.bits=16,v.loopMode^=16,v.length>>=1,v.loopStart>>=1,v.loopLen>>=1),v.loopLen||(v.loopMode=0),v.store(e),v.loopMode&&(v.length=v.loopStart+v.loopLen),e.position=d)}else e.position=o+f;if(o=e.position,o>=e.length)break}for(a=gi(),a.volData=Dt(),a.panData=Dt(),a.samples=[],r=0;r<12;++r)a.volData.points[r]=Et(),a.panData.points[r]=Et();for(v=yi(),v.length=220,v.data=new Float32Array(220),r=0;r<220;++r)v.data[r]=0;a.samples[0]=v,this.instruments[0]=a}}},process:{value:function(){var e,i,r,s,f,a,o,h,c,n,d,x,m,l=this.voices[0];if(this.tick)for(;l;){if(n=this.pattern.rows[this.position+l.index],l.delay)if((n.param&15)===this.tick)l.flags=l.delay,l.delay=0;else{l=l.next;continue}if(n.volume)switch(o=n.volume>>4,h=n.volume&15,o){case 6:l.volume-=h,l.volume<0&&(l.volume=0),l.flags|=B;break;case 7:l.volume+=h,l.volume>64&&(l.volume=64),l.flags|=B;break;case 11:l.vibrato();break;case 13:l.panning-=h,l.panning<0&&(l.panning=0),l.flags|=oe;break;case 14:l.panning+=h,l.panning>255&&(l.panning=255),l.flags|=oe;break;case 15:l.portaPeriod&&l.tonePortamento();break;default:break}switch(o=n.param>>4,h=n.param&15,n.effect){case 0:if(!n.param)break;m=(this.tick-this.timer)%3,m<0&&(m+=3),this.tick===2&&this.timer===18&&(m=0),m?m===1?this.linear?l.arpDelta=-(h<<6):(m=this.amiga(l.note+h,l.finetune),l.arpDelta=m-l.period):this.linear?l.arpDelta=-(o<<6):(m=this.amiga(l.note+o,l.finetune),l.arpDelta=m-l.period):l.arpDelta=0,l.flags|=Q;break;case 1:l.period-=l.portaU,l.period<0&&(l.period=0),l.flags|=Q;break;case 2:l.period+=l.portaD,l.period>9212&&(l.period=9212),l.flags|=Q;break;case 3:l.portaPeriod&&l.tonePortamento();break;case 4:o&&(l.vibratoSpeed=o),h&&(l.vibratoDepth=h<<2),l.vibrato();break;case 5:x=1,l.portaPeriod&&l.tonePortamento();break;case 6:x=1,l.vibrato();break;case 7:l.tremolo();break;case 10:x=1;break;case 14:switch(o){case 9:this.tick%h===0&&(l.volEnvelope.reset(),l.panEnvelope.reset(),l.flags|=B|oe|Me);break;case 12:this.tick===h&&(l.volume=0,l.flags|=B);break;default:break}break;case 17:o=l.volSlideMaster>>4,h=l.volSlideMaster&15,o?(this.master+=o,this.master>64&&(this.master=64),l.flags|=B):h&&(this.master-=h,this.master<0&&(this.master=0),l.flags|=B);break;case 20:this.tick===n.param&&(l.fadeEnabled=1,l.keyoff=1);break;case 24:o=l.panSlide>>4,h=l.panSlide&15,o?(l.panning+=o,l.panning>255&&(l.panning=255),l.flags|=oe):h&&(l.panning-=h,l.panning<0&&(l.panning=0),l.flags|=oe);break;case 27:if(e=this.tick,n.volume||e++,e%l.retrigy)break;(!n.volume||n.volume>80)&&l.retrigx&&this.retrig(l),l.flags|=Me;break;case 29:l.tremor();break;default:break}x&&(o=l.volSlide>>4,h=l.volSlide&15,x=0,o?(l.volume+=o,l.flags|=B):h&&(l.volume-=h,l.flags|=B)),l=l.next}else for(this.nextOrder>=0&&(this.order=this.nextOrder),this.nextPosition>=0&&(this.position=this.nextPosition),this.nextOrder=this.nextPosition=-1,this.pattern=this.patterns[this.track[this.order]];l;){if(this.rowCurrent=this.position+l.index,n=this.pattern.rows[this.rowCurrent],e=n.volume>>4,c=n.effect===3||n.effect===5||e===15,o=n.param>>4,l.keyoff=0,l.arpDelta&&(l.arpDelta=0,l.flags|=Q),n.instrument?(l.instrument=n.instrument<this.instruments.length?this.instruments[n.instrument]:null,l.volEnvelope.reset(),l.panEnvelope.reset(),l.flags|=B|oe|ke):(n.note===Xt||n.effect===20&&!n.param)&&(l.fadeEnabled=1,l.keyoff=1),n.note&&n.note!==Xt?l.instrument?(r=l.instrument,m=n.note-1,d=r.samples[r.noteSamples[m]],m+=d.relative,m>=ka&&m<=Pa&&(c||(l.note=m,l.sample=d,n.instrument?(l.volEnabled=r.volEnabled,l.panEnabled=r.panEnabled,l.flags|=wa):l.flags|=Q|Me),n.instrument?(l.reset(),l.fadeDelta=r.fadeout):l.finetune=d.finetune>>3<<2,n.effect===14&&o===5&&(l.finetune=(n.param&15)-8<<3),this.linear?m=(120-m<<6)-l.finetune:m=this.amiga(m,l.finetune),c?l.portaPeriod=m:(l.period=m,l.glissPeriod=0))):(l.volume=0,l.flags=B|ke):l.vibratoReset&&n.effect!==4&&n.effect!==6&&(l.vibDelta=0,l.vibratoReset=0,l.flags|=Q),n.volume)if(n.volume>=16&&n.volume<=80)l.volume=n.volume-16,l.flags|=B|ke;else switch(h=n.volume&15,e){case 6:l.volume-=h,l.volume<0&&(l.volume=0),l.flags|=B;break;case 7:l.volume+=h,l.volume>64&&(l.volume=64),l.flags|=B;break;case 10:h&&(l.vibratoSpeed=h);break;case 11:h&&(l.vibratoDepth=h<<2);break;case 12:l.panning=h<<4,l.flags|=oe;break;case 15:h&&(l.portaSpeed=h<<4);break;default:break}if(n.effect)switch(h=n.param&15,n.effect){case 1:n.param&&(l.portaU=n.param<<2);break;case 2:n.param&&(l.portaD=n.param<<2);break;case 3:n.param&&e!==15&&(l.portaSpeed=n.param);break;case 4:l.vibratoReset=1;break;case 5:n.param&&(l.volSlide=n.param);break;case 6:n.param&&(l.volSlide=n.param),l.vibratoReset=1;break;case 7:o&&(l.tremoloSpeed=o),h&&(l.tremoloDepth=h);break;case 8:l.panning=n.param,l.flags|=oe;break;case 9:n.param&&(l.sampleOffset=n.param<<8),l.sampleOffset>=l.sample.length&&(l.volume=0,l.sampleOffset=0,l.flags&=~(Q|Me),l.flags|=B|ke);break;case 10:n.param&&(l.volSlide=n.param);break;case 11:this.nextOrder=n.param,this.nextOrder>=this.length?this.complete=1:this.nextPosition=0,f=1,this.patternOffset=0;break;case 12:l.volume=n.param,l.flags|=B|ke;break;case 13:this.nextPosition=(o*10+h)*this.channels,this.patternOffset=0,f||(this.nextOrder=this.order+1,this.nextOrder>=this.length&&(this.complete=1,this.nextPosition=-1));break;case 14:switch(o){case 1:h&&(l.finePortaU=h<<2),l.period-=l.finePortaU,l.flags|=Q;break;case 2:h&&(l.finePortaD=h<<2),l.period+=l.finePortaD,l.flags|=Q;break;case 3:l.glissando=h;break;case 4:l.waveControl=l.waveControl&240|h;break;case 6:h?(l.patternLoop?l.patternLoop--:l.patternLoop=h,l.patternLoop&&(this.nextPosition=l.patternLoopRow)):l.patternLoopRow=this.patternOffset=this.position;break;case 7:l.waveControl=l.waveControl&15|h<<4;break;case 10:h&&(l.fineSlideU=h),l.volume+=l.fineSlideU,l.flags|=B;break;case 11:h&&(l.fineSlideD=h),l.volume-=l.fineSlideD,l.flags|=B;break;case 13:l.delay=l.flags,l.flags=0;break;case 14:this.patternDelay=h*this.timer;break;default:break}break;case 15:if(!n.param)break;n.param<32?this.timer=n.param:this.mixer.samplesTick=this.sampleRate*2.5/n.param>>0;break;case 16:this.master=n.param,this.master>64&&(this.master=64),l.flags|=B;break;case 17:n.param&&(l.volSlideMaster=n.param);break;case 21:if(!l.instrument||!l.instrument.volEnabled)break;for(r=l.instrument,m=n.param,o=r.volData.total,s=0;s<o&&!(m<r.volData.points[s].frame);s++);l.volEnvelope.position=--s,o--,r.volData.flags&Pi&&s===r.volData.loopEnd&&(s=l.volEnvelope.position=r.volData.loopStart,m=r.volData.points[s].frame,l.volEnvelope.frame=m),s>=o?(l.volEnvelope.value=r.volData.points[o].value,l.volEnvelope.stopped=1):(l.volEnvelope.stopped=0,l.volEnvelope.frame=m,m>r.volData.points[s].frame&&l.volEnvelope.position++,i=r.volData.points[s],a=r.volData.points[++s],m=a.frame-i.frame,l.volEnvelope.delta=(m?(a.value-i.value<<8)/m>>0:0)||0,l.volEnvelope.fraction=i.value<<8);break;case 24:n.param&&(l.panSlide=n.param);break;case 27:if(o&&(l.retrigx=o),h&&(l.retrigy=h),!n.volume&&l.retrigy){if(e=this.tick+1,e%l.retrigy)break;n.volume>80&&l.retrigx&&this.retrig(l)}break;case 29:n.param&&(l.tremorOn=++o,l.tremorOff=++h+o);break;case 33:o===1?(h&&(l.xtraPortaU=h),l.period-=l.xtraPortaU,l.flags|=Q):o===2&&(h&&(l.xtraPortaD=h),l.period+=l.xtraPortaD,l.flags|=Q);break;default:break}l=l.next}++this.tick>=this.timer+this.patternDelay&&(this.patternDelay=this.tick=0,this.nextPosition<0&&(this.nextPosition=this.position+this.channels,(this.nextPosition>=this.pattern.size||this.complete)&&(this.nextOrder=this.order+1,this.nextPosition=this.patternOffset,this.nextOrder>=this.length&&(this.nextOrder=this.restart,this.mixer.complete=1))))}},fast:{value:function(){for(var e,i,r,s,f,a=this.voices[0],o;a;)e=a.channel,r=a.flags,a.flags=0,r&Me&&(e.index=a.sampleOffset,e.pointer=-1,e.dir=0,e.fraction=0,e.sample=a.sample,e.length=a.sample.length,e.enabled=e.sample.data?1:0,a.playing=a.instrument,a.sampleOffset=0),s=a.playing,i=s.vibratoSpeed?a.autoVibrato():0,o=a.volume+a.volDelta,s.volEnabled?(a.volEnabled&&!a.volEnvelope.stopped&&this.envelope(a,a.volEnvelope,s.volData),o=o*a.volEnvelope.value>>6,r|=B,a.fadeEnabled&&(a.fadeVolume-=a.fadeDelta,a.fadeVolume<0?(o=0,a.fadeVolume=0,a.fadeEnabled=0,a.volEnvelope.value=0,a.volEnvelope.stopped=1,a.panEnvelope.stopped=1):o=o*a.fadeVolume>>16)):a.keyoff&&(o=0,r|=B),f=a.panning,s.panEnabled&&(a.panEnabled&&!a.panEnvelope.stopped&&this.envelope(a,a.panEnvelope,s.panData),f=a.panEnvelope.value<<2,r|=oe,f<0?f=0:f>255&&(f=255)),r&B&&(o<0?o=0:o>64&&(o=64),e.volume=Ei[o*this.master>>6],e.lvol=e.volume*e.lpan,e.rvol=e.volume*e.rpan),r&oe&&(e.panning=f,e.lpan=Ce[256-f],e.rpan=Ce[f],e.lvol=e.volume*e.lpan,e.rvol=e.volume*e.rpan),r&Q&&(i+=a.period+a.arpDelta+a.vibDelta,this.linear?e.speed=(548077568*Math.pow(2,(4608-i)/768)/this.sampleRate>>0)/65536:e.speed=(65536*(14317456/i)/this.sampleRate>>0)/65536,e.delta=e.speed>>0,e.speed-=e.delta),a=a.next}},accurate:{value:function(){for(var e,i,r,s,f,a,o,h,c,n=this.voices[0],d;n;){if(e=n.channel,r=n.flags,n.flags=0,r&Me&&(e.sample&&(r|=ke,e.mixCounter=220,e.oldSample=null,e.oldPointer=-1,e.enabled&&(e.oldDir=e.dir,e.oldFraction=e.fraction,e.oldSpeed=e.speed,e.oldSample=e.sample,e.oldPointer=e.pointer,e.oldLength=e.length,e.lmixRampD=e.lvol,e.lmixDeltaD=e.lvol/220,e.rmixRampD=e.rvol,e.rmixDeltaD=e.rvol/220)),e.dir=1,e.fraction=0,e.sample=n.sample,e.pointer=n.sampleOffset,e.length=n.sample.length,e.enabled=e.sample.data?1:0,n.playing=n.instrument,n.sampleOffset=0),s=n.playing,i=s.vibratoSpeed?n.autoVibrato():0,d=n.volume+n.volDelta,s.volEnabled?(n.volEnabled&&!n.volEnvelope.stopped&&this.envelope(n,n.volEnvelope,s.volData),d=d*n.volEnvelope.value>>6,r|=B,n.fadeEnabled&&(n.fadeVolume-=n.fadeDelta,n.fadeVolume<0?(d=0,n.fadeVolume=0,n.fadeEnabled=0,n.volEnvelope.value=0,n.volEnvelope.stopped=1,n.panEnvelope.stopped=1):d=d*n.fadeVolume>>16)):n.keyoff&&(d=0,r|=B),o=n.panning,s.panEnabled&&(n.panEnabled&&!n.panEnvelope.stopped&&this.envelope(n,n.panEnvelope,s.panData),o=n.panEnvelope.value<<2,r|=oe,o<0?o=0:o>255&&(o=255)),!e.enabled){e.volCounter=0,e.panCounter=0,n=n.next;continue}r&B&&(d<0?d=0:d>64&&(d=64),d=Ei[d*this.master>>6],a=d*Ce[256-o],c=d*Ce[o],d!==e.volume&&!e.mixCounter?(e.volCounter=r&ke?220:this.mixer.samplesTick,e.lvolDelta=(a-e.lvol)/e.volCounter,e.rvolDelta=(c-e.rvol)/e.volCounter):(e.lvol=a,e.rvol=c),e.volume=d),r&oe&&(f=Ce[256-o],h=Ce[o],o!==e.panning&&!e.mixCounter&&!e.volCounter?(e.panCounter=this.mixer.samplesTick,e.lpanDelta=(f-e.lpan)/e.panCounter,e.rpanDelta=(h-e.rpan)/e.panCounter):(e.lpan=f,e.rpan=h),e.panning=o),r&Q&&(i+=n.period+n.arpDelta+n.vibDelta,this.linear?e.speed=(548077568*Math.pow(2,(4608-i)/768)/this.sampleRate>>0)/65536:e.speed=(65536*(14317456/i)/this.sampleRate>>0)/65536),e.mixCounter&&(e.lmixRampU=0,e.lmixDeltaU=e.lvol/220,e.rmixRampU=0,e.rmixDeltaU=e.rvol/220),n=n.next}}},envelope:{value:function(e,i,r){var s=i.position,f=r.points[s],a;if(i.frame===f.frame){if(r.flags&Pi&&s===r.loopEnd&&(s=i.position=r.loopStart,f=r.points[s],i.frame=f.frame),s===r.total-1){i.value=f.value,i.stopped=1;return}if(r.flags&ya&&s===r.sustain&&!e.fadeEnabled){i.value=f.value;return}i.position++,a=r.points[i.position],i.delta=(a.value-f.value<<8)/(a.frame-f.frame)>>0||0,i.fraction=f.value<<8}else i.fraction+=i.delta;i.value=i.fraction>>8,i.frame++}},amiga:{value:function(e,i){var r=0,s=Ht[++e];return i<0?r=(Ht[--e]-s)/64:i>0&&(r=(s-Ht[++e])/64),s-r*i>>0}},retrig:{value:function(e){switch(e.retrigx){case 1:e.volume--;break;case 2:e.volume++;break;case 3:e.volume-=4;break;case 4:e.volume-=8;break;case 5:e.volume-=16;break;case 6:e.volume=(e.volume<<1)/3;break;case 7:e.volume>>=1;break;case 8:e.volume=e.sample.volume;break;case 9:e.volume++;break;case 10:e.volume+=2;break;case 11:e.volume+=4;break;case 12:e.volume+=8;break;case 13:e.volume+=16;break;case 14:e.volume=e.volume*3>>1;break;case 15:e.volume<<=1;break;default:break}e.volume<0?e.volume=0:e.volume>64&&(e.volume=64),e.flags|=B}}}),Object.seal(t)}var Q=1,B=2,oe=4,Me=8,wa=15,ke=32,ki=1,ya=2,Pi=4,ka=0,Pa=118,Xt=97,Sa=[0,-2,-3,-5,-6,-8,-9,-11,-12,-14,-16,-17,-19,-20,-22,-23,-24,-26,-27,-29,-30,-32,-33,-34,-36,-37,-38,-39,-41,-42,-43,-44,-45,-46,-47,-48,-49,-50,-51,-52,-53,-54,-55,-56,-56,-57,-58,-59,-59,-60,-60,-61,-61,-62,-62,-62,-63,-63,-63,-64,-64,-64,-64,-64,-64,-64,-64,-64,-64,-64,-63,-63,-63,-62,-62,-62,-61,-61,-60,-60,-59,-59,-58,-57,-56,-56,-55,-54,-53,-52,-51,-50,-49,-48,-47,-46,-45,-44,-43,-42,-41,-39,-38,-37,-36,-34,-33,-32,-30,-29,-27,-26,-24,-23,-22,-20,-19,-17,-16,-14,-12,-11,-9,-8,-6,-5,-3,-2,0,2,3,5,6,8,9,11,12,14,16,17,19,20,22,23,24,26,27,29,30,32,33,34,36,37,38,39,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,56,57,58,59,59,60,60,61,61,62,62,62,63,63,63,64,64,64,64,64,64,64,64,64,64,64,63,63,63,62,62,62,61,61,60,60,59,59,58,57,56,56,55,54,53,52,51,50,49,48,47,46,45,44,43,42,41,39,38,37,36,34,33,32,30,29,27,26,24,23,22,20,19,17,16,14,12,11,9,8,6,5,3,2],Si=[0,24,49,74,97,120,141,161,180,197,212,224,235,244,250,253,255,253,250,244,235,224,212,197,180,161,141,120,97,74,49,24],Ce=[0,.04417,.062489,.076523,.088371,.098821,.108239,.116927,.124977,.132572,.139741,.146576,.153077,.159335,.16535,.171152,.176772,.18221,.187496,.19263,.197643,.202503,.207273,.211951,.216477,.220943,.225348,.229631,.233854,.237985,.242056,.246066,.249985,.253873,.25767,.261437,.265144,.268819,.272404,.275989,.279482,.282976,.286409,.289781,.293153,.296464,.299714,.302965,.306185,.309344,.312473,.315602,.318671,.321708,.324746,.327754,.3307,.333647,.336563,.339449,.342305,.345161,.347986,.350781,.353545,.356279,.359013,.361717,.364421,.367094,.369737,.37238,.374992,.377574,.380157,.382708,.38526,.387782,.390303,.392794,.395285,.397746,.400176,.402606,.405037,.407437,.409836,.412206,.414576,.416915,.419254,.421563,.423841,.42618,.428458,.430737,.432985,.435263,.437481,.439729,.441916,.444134,.446321,.448508,.450665,.452852,.455009,.457136,.459262,.461389,.463485,.465611,.467708,.469773,.471839,.473935,.47597,.478036,.480072,.482077,.484112,.486117,.488122,.490127,.492101,.494106,.496051,.498025,.5,.501944,.503888,.505802,.507746,.50966,.511574,.513488,.515371,.517255,.519138,.521022,.522905,.524758,.526611,.528465,.530318,.53214,.533993,.535816,.537639,.539462,.541254,.543046,.544839,.546631,.548423,.550216,.551978,.553739,.555501,.557263,.558995,.560757,.562489,.56422,.565952,.567683,.569384,.571116,.572817,.574518,.57622,.57789,.579592,.581262,.582964,.584634,.586305,.587946,.589617,.591257,.592928,.594568,.596209,.597849,.599459,.6011,.60271,.60435,.60596,.60757,.60915,.61076,.61237,.61395,.61556,.617139,.618719,.620268,.621848,.623428,.624977,.626557,.628106,.629655,.631205,.632754,.634303,.635822,.637372,.63889,.64044,.641959,.643478,.644966,.646485,.648004,.649523,.651012,.6525,.653989,.655477,.656966,.658454,.659943,.661431,.66289,.664378,.665836,.667294,.668783,.670241,.671699,.673127,.674585,.676043,.677471,.678929,.680357,.681785,.683213,.684641,.686068,.687496,.688894,.690321,.691749,.693147,.694574,.695972,.697369,.698767,.700164,.701561,.702928,.704326,.705723,.70711],Ei=[0,.005863,.013701,.021569,.029406,.037244,.045082,.052919,.060757,.068625,.076463,.0843,.092138,.099976,.107844,.115681,.123519,.131357,.139194,.147032,.1549,.162738,.170575,.178413,.186251,.194119,.201956,.209794,.217632,.225469,.233307,.241175,.249013,.25685,.264688,.272526,.280394,.288231,.296069,.303907,.311744,.319582,.32745,.335288,.343125,.350963,.3588,.366669,.374506,.382344,.390182,.398019,.405857,.413725,.421563,.4294,.437238,.445076,.452944,.460781,.468619,.476457,.484294,.492132,.5],Ht=[29024,27392,25856,24384,23040,21696,20480,19328,18240,17216,16256,15360,14512,13696,12928,12192,11520,10848,10240,9664,9120,8608,8128,7680,7256,6848,6464,6096,5760,5424,5120,4832,4560,4304,4064,3840,3628,3424,3232,3048,2880,2712,2560,2416,2280,2152,2032,1920,1814,1712,1616,1524,1440,1356,1280,1208,1140,1076,1016,960,907,856,808,762,720,678,640,604,570,538,508,480,453,428,404,381,360,339,320,302,285,269,254,240,227,214,202,190,180,169,160,151,142,134,127,120,113,107,101,95,90,85,80,75,71,67,63,60,57,53,50,48,45,42,40,38,36,34,32,30,28],Di=ga;function Tt(u){return Object.create(null,{index:{value:u,writable:!0},next:{value:null,writable:!0},channel:{value:null,writable:!0},sample:{value:null,writable:!0},enabled:{value:0,writable:!0},period:{value:0,writable:!0},effect:{value:0,writable:!0},param:{value:0,writable:!0},volume:{value:0,writable:!0},portaDir:{value:0,writable:!0},portaPeriod:{value:0,writable:!0},portaSpeed:{value:0,writable:!0},vibratoPos:{value:0,writable:!0},vibratoSpeed:{value:0,writable:!0},initialize:{value:function(){this.channel=null,this.sample=null,this.enabled=0,this.period=0,this.effect=0,this.param=0,this.volume=0,this.portaDir=0,this.portaPeriod=0,this.portaSpeed=0,this.vibratoPos=0,this.vibratoSpeed=0}}})}function Ea(u){var t=St(u);return Object.defineProperties(t,{id:{value:"MKPlayer"},track:{value:null,writable:!0},patterns:{value:[],writable:!0},samples:{value:[],writable:!0},length:{value:0,writable:!0},restart:{value:0,writable:!0},voices:{value:[],writable:!0},trackPos:{value:0,writable:!0},patternPos:{value:0,writable:!0},jumpFlag:{value:0,writable:!0},vibratoDepth:{value:0,writable:!0},restartSave:{value:0,writable:!0},force:{set:function(e){e<Gt?e=Gt:e>Pe&&(e=Pe),this.version=e,e===Pe?this.vibratoDepth=6:this.vibratoDepth=7,e===Ti?(this.restartSave=this.restart,this.restart=0):(this.restart=this.restartSave,this.restartSave=0)}},initialize:{value:function(){var e=this.voices[0];for(this.reset(),this.force=this.version,this.speed=6,this.trackPos=0,this.patternPos=0,this.jumpFlag=0;e;)e.initialize(),e.channel=this.mixer.channels[e.index],e.sample=this.samples[0],e=e.next}},loader:{value:function(e){var i=0,r,s,f,a,o,h=0,c;if(!(e.length<2106)&&(e.position=1080,s=e.readString(4),!(s!=="M.K."&&s!=="FLT4"))){for(e.position=0,this.title=e.readString(20),this.version=Gt,e.position+=22,r=1;r<32;++r){if(c=e.readUshort(),!c){this.samples[r]=null,e.position+=28;continue}o=Ze(),e.position-=24,o.name=e.readString(22),o.length=c<<1,e.position+=3,o.volume=e.readUbyte(),o.loop=e.readUshort()<<1,o.repeat=e.readUshort()<<1,e.position+=22,o.pointer=h,h+=o.length,this.samples[r]=o,o.length>32768&&(this.version=Da)}for(e.position=950,this.length=e.readUbyte(),c=e.readUbyte(),this.restart=c<this.length?c:0,r=0;r<128;++r)c=e.readUbyte()<<8,this.track[r]=c,c>i&&(i=c);for(e.position=1084,i+=256,this.patterns.length=i,r=0;r<i;++r)if(a=Pt(),c=e.readUint(),a.note=c>>16&4095,a.effect=c>>8&15,a.sample=c>>24&240|c>>12&15,a.param=c&255,this.patterns[r]=a,(a.sample>31||!this.samples[a.sample])&&(a.sample=0),(a.effect===3||a.effect===4)&&(this.version=Ti),(a.effect===5||a.effect===6)&&(this.version=Pe),a.effect>6&&a.effect<10){this.version=0;return}for(this.mixer.store(e,h),r=1;r<32;++r)if(o=this.samples[r],!!o)for(o.name.indexOf("2.0")>-1&&(this.version=Pe),o.loop?(o.loopPtr=o.pointer+o.loop,o.length=o.loop+o.repeat):(o.loopPtr=this.mixer.memory.length,o.repeat=2),h=o.pointer+4,f=o.pointer;f<h;++f)this.mixer.memory[f]=0;o=Ze(),o.pointer=o.loopPtr=this.mixer.memory.length,o.length=o.repeat=2,this.samples[0]=o,this.version<Pe&&this.restart!==127&&(this.version=Ta)}}},process:{value:function(){var e,i,r,s,f,a,o,h,c,n=this.voices[0];if(this.tick)for(;n;){if(e=n.channel,!n.effect&&!n.param){e.period=n.period,n=n.next;continue}switch(n.effect){case 0:if(c=this.tick%3,!c){e.period=n.period,n=n.next;continue}for(c===1?c=n.param>>4:c=n.param&15,f=n.period&4095,r=37-c,i=0;i<r;++i)if(f>=Fi[i]){e.period=Fi[i+c];break}break;case 1:n.period-=n.param,n.period<113&&(n.period=113),e.period=n.period;break;case 2:n.period+=n.param,n.period>856&&(n.period=856),e.period=n.period;break;case 3:case 5:n.effect===5?h=1:n.param&&(n.portaSpeed=n.param,n.param=0),n.portaPeriod&&(n.portaDir?(n.period-=n.portaSpeed,n.period<=n.portaPeriod&&(n.period=n.portaPeriod,n.portaPeriod=0)):(n.period+=n.portaSpeed,n.period>=n.portaPeriod&&(n.period=n.portaPeriod,n.portaPeriod=0))),e.period=n.period;break;case 4:case 6:n.effect===6?h=1:n.param&&(n.vibratoSpeed=n.param),c=n.vibratoPos>>2&31,c=(n.vibratoSpeed&15)*Fa[c]>>this.vibratoDepth,n.vibratoPos>127?e.period=n.period-c:e.period=n.period+c,c=n.vibratoSpeed>>2&60,n.vibratoPos=n.vibratoPos+c&255;break;case 10:h=1;break;default:break}h&&(c=n.param>>4,h=0,c?n.volume+=c:n.volume-=n.param&15,n.volume<0?n.volume=0:n.volume>64&&(n.volume=64),e.volume=n.volume),n=n.next}else for(s=this.track[this.trackPos]+this.patternPos;n;){switch(e=n.channel,n.enabled=0,a=this.patterns[s+n.index],n.effect=a.effect,n.param=a.param,a.sample?(o=n.sample=this.samples[a.sample],e.volume=n.volume=o.volume):o=n.sample,a.note&&(n.effect===3||n.effect===5?a.note<n.period?(n.portaDir=1,n.portaPeriod=a.note):a.note>n.period?(n.portaDir=0,n.portaPeriod=a.note):n.portaPeriod=0:(n.enabled=1,n.vibratoPos=0,e.enabled=0,e.pointer=o.pointer,e.length=o.length,e.period=n.period=a.note)),n.effect){case 11:this.trackPos=n.param-1,this.jumpFlag^=1;break;case 12:e.volume=n.param,this.version===Pe&&(n.volume=n.param);break;case 13:this.jumpFlag^=1;break;case 14:this.mixer.filter.active=n.param^1;break;case 15:c=n.param,c<1?c=1:c>31&&(c=31),this.speed=c,this.tick=0;break;default:break}n.enabled&&(e.enabled=1),e.pointer=o.loopPtr,e.length=o.repeat,n=n.next}++this.tick===this.speed&&(this.tick=0,this.patternPos+=4,(this.patternPos===256||this.jumpFlag)&&(this.patternPos=this.jumpFlag=0,this.trackPos=++this.trackPos&127,this.trackPos===this.length&&(this.trackPos=this.restart,this.mixer.complete=1)))}}}),t.voices[0]=Tt(0),t.voices[0].next=t.voices[1]=Tt(1),t.voices[1].next=t.voices[2]=Tt(2),t.voices[2].next=t.voices[3]=Tt(3),t.track=new Uint16Array(128),Object.seal(t)}var Gt=1,Da=2,Ti=3,Ta=4,Pe=5,Fi=[856,808,762,720,678,640,604,570,538,508,480,453,428,404,381,360,339,320,302,285,269,254,240,226,214,202,190,180,170,160,151,143,135,127,120,113,0],Fa=[0,24,49,74,97,120,141,161,180,197,212,224,235,244,250,253,255,253,250,244,235,224,212,197,180,161,141,120,97,74,49,24],Mi=Ea;function Ft(u){return Object.create(null,{index:{value:u,writable:!0},next:{value:null,writable:!0},channel:{value:null,writable:!0},sample:{value:null,writable:!0},enabled:{value:0,writable:!0},loopCtr:{value:0,writable:!0},loopPos:{value:0,writable:!0},step:{value:0,writable:!0},period:{value:0,writable:!0},effect:{value:0,writable:!0},param:{value:0,writable:!0},volume:{value:0,writable:!0},pointer:{value:0,writable:!0},length:{value:0,writable:!0},loopPtr:{value:0,writable:!0},repeat:{value:0,writable:!0},finetune:{value:0,writable:!0},offset:{value:0,writable:!0},portaDir:{value:0,writable:!0},portaPeriod:{value:0,writable:!0},portaSpeed:{value:0,writable:!0},glissando:{value:0,writable:!0},tremoloParam:{value:0,writable:!0},tremoloPos:{value:0,writable:!0},tremoloWave:{value:0,writable:!0},vibratoParam:{value:0,writable:!0},vibratoPos:{value:0,writable:!0},vibratoWave:{value:0,writable:!0},funkPos:{value:0,writable:!0},funkSpeed:{value:0,writable:!0},funkWave:{value:0,writable:!0},initialize:{value:function(){this.channel=null,this.sample=null,this.enabled=0,this.loopCtr=0,this.loopPos=0,this.step=0,this.period=0,this.effect=0,this.param=0,this.volume=0,this.pointer=0,this.length=0,this.loopPtr=0,this.repeat=0,this.finetune=0,this.offset=0,this.portaDir=0,this.portaPeriod=0,this.portaSpeed=0,this.glissando=0,this.tremoloParam=0,this.tremoloPos=0,this.tremoloWave=0,this.vibratoParam=0,this.vibratoPos=0,this.vibratoWave=0,this.funkPos=0,this.funkSpeed=0,this.funkWave=0}}})}function Ma(){var u=Pt();return Object.defineProperties(u,{step:{value:0,writable:!0}}),Object.seal(u)}function Ci(){var u=Ze();return Object.defineProperties(u,{finetune:{value:0,writable:!0},realLen:{value:0,writable:!0}}),Object.seal(u)}function Ca(u){var t=St(u);return Object.defineProperties(t,{id:{value:"PTPlayer"},track:{value:null,writable:!0},patterns:{value:[],writable:!0},samples:{value:[],writable:!0},length:{value:0,writable:!0},voices:{value:[],writable:!0},trackPos:{value:0,writable:!0},patternPos:{value:0,writable:!0},patternBreak:{value:0,writable:!0},patternDelay:{value:0,writable:!0},breakPos:{value:0,writable:!0},jumpFlag:{value:0,writable:!0},vibratoDepth:{value:0,writable:!0},force:{set:function(e){e<Mt?e=Mt:e>Vt&&(e=Vt),this.version=e,e<Ai?this.vibratoDepth=6:this.vibratoDepth=7}},initialize:{value:function(){var e=this.voices[0];for(this.tempo=125,this.speed=6,this.trackPos=0,this.patternPos=0,this.patternBreak=0,this.patternDelay=0,this.breakPos=0,this.jumpFlag=0,this.reset(),this.force=this.version;e;)e.initialize(),e.channel=this.mixer.channels[e.index],e.sample=this.samples[0],e=e.next}},loader:{value:function(e){var i=0,r,s,f,a,o,h=0,c;if(!(e.length<2106)&&(e.position=1080,s=e.readString(4),!(s!=="M.K."&&s!=="M!K!"))){for(e.position=0,this.title=e.readString(20),this.version=Mt,e.position+=22,r=1;r<32;++r){if(c=e.readUshort(),!c){this.samples[r]=null,e.position+=28;continue}o=Ci(),e.position-=24,o.name=e.readString(22),o.length=o.realLen=c<<1,e.position+=2,o.finetune=e.readUbyte()*37,o.volume=e.readUbyte(),o.loop=e.readUshort()<<1,o.repeat=e.readUshort()<<1,e.position+=22,o.pointer=h,h+=o.length,this.samples[r]=o}for(e.position=950,this.length=e.readUbyte(),e.position++,r=0;r<128;++r)c=e.readUbyte()<<8,this.track[r]=c,c>i&&(i=c);for(e.position=1084,i+=256,this.patterns.length=i,r=0;r<i;++r)a=Ma(),a.step=c=e.readUint(),a.note=c>>16&4095,a.effect=c>>8&15,a.sample=c>>24&240|c>>12&15,a.param=c&255,this.patterns[r]=a,(a.sample>31||!this.samples[a.sample])&&(a.sample=0),a.effect===15&&a.param>31&&(this.version=Ai),a.effect===8&&(this.version=Vt);for(this.mixer.store(e,h),r=1;r<32;++r)if(o=this.samples[r],!!o)for(o.loop||o.repeat>4?(o.loopPtr=o.pointer+o.loop,o.length=o.loop+o.repeat):(o.loopPtr=this.mixer.memory.length,o.repeat=2),h=o.pointer+2,f=o.pointer;f<h;++f)this.mixer.memory[f]=0;o=Ci(),o.pointer=o.loopPtr=this.mixer.memory.length,o.length=o.repeat=2,this.samples[0]=o}}},process:{value:function(){var e,i,r,s,f,a,o=this.voices[0];if(this.tick)this.effects();else if(this.patternDelay)this.effects();else{for(r=this.track[this.trackPos]+this.patternPos;o;){if(e=o.channel,o.enabled=0,o.step||(e.period=o.period),s=this.patterns[r+o.index],o.step=s.step,o.effect=s.effect,o.param=s.param,s.sample?(f=o.sample=this.samples[s.sample],o.pointer=f.pointer,o.length=f.length,o.loopPtr=o.funkWave=f.loopPtr,o.repeat=f.repeat,o.finetune=f.finetune,e.volume=o.volume=f.volume):f=o.sample,s.note)if((o.step&4080)===3664)o.finetune=(o.param&15)*37;else if(o.effect===3||o.effect===5)if(s.note===o.period)o.portaPeriod=0;else{for(i=o.finetune,a=i+37;i<a&&!(s.note>=be[i]);++i);i===a&&a--,i>0&&(a=o.finetune/37>>0&8,a&&i--),o.portaPeriod=be[i],o.portaDir=s.note>o.portaPeriod?0:1}else o.effect===9&&this.moreEffects(o);else{this.moreEffects(o),o=o.next;continue}for(i=0;i<37&&!(s.note>=be[i]);++i);if(o.period=be[o.finetune+i],(o.step&4080)===3792){o.funkSpeed&&this.updateFunk(o),this.extended(o),o=o.next;continue}o.vibratoWave<4&&(o.vibratoPos=0),o.tremoloWave<4&&(o.tremoloPos=0),e.enabled=0,e.pointer=o.pointer,e.length=o.length,e.period=o.period,o.enabled=1,this.moreEffects(o),o=o.next}for(o=this.voices[0];o;)e=o.channel,o.enabled&&(e.enabled=1),e.pointer=o.loopPtr,e.length=o.repeat,o=o.next}++this.tick===this.speed&&(this.tick=0,this.patternPos+=4,this.patternDelay&&--this.patternDelay&&(this.patternPos-=4),this.patternBreak&&(this.patternBreak=0,this.patternPos=this.breakPos,this.breakPos=0),(this.patternPos===256||this.jumpFlag)&&(this.patternPos=this.breakPos,this.breakPos=0,this.jumpFlag=0,++this.trackPos===this.length&&(this.trackPos=0,this.mixer.complete=1)))}},effects:{value:function(){for(var e,i,r,s,f,a=this.voices[0],o;a;){if(e=a.channel,a.funkSpeed&&this.updateFunk(a),(a.step&4095)===0){e.period=a.period,a=a.next;continue}switch(a.effect){case 0:if(f=this.tick%3,!f){e.period=a.period,a=a.next;continue}for(f===1?f=a.param>>4:f=a.param&15,i=a.finetune,r=i+37;i<r;++i)if(a.period>=be[i]){e.period=be[i+f];break}break;case 1:a.period-=a.param,a.period<113&&(a.period=113),e.period=a.period;break;case 2:a.period+=a.param,a.period>856&&(a.period=856),e.period=a.period;break;case 3:case 5:if(a.effect===5?s=1:(a.portaSpeed=a.param,a.param=0),a.portaPeriod)if(a.portaDir?(a.period-=a.portaSpeed,a.period<=a.portaPeriod&&(a.period=a.portaPeriod,a.portaPeriod=0)):(a.period+=a.portaSpeed,a.period>=a.portaPeriod&&(a.period=a.portaPeriod,a.portaPeriod=0)),a.glissando){for(i=a.finetune,f=i+37;i<f&&!(a.period>=be[i]);++i);i===f&&i--,e.period=be[i]}else e.period=a.period;break;case 4:case 6:a.effect===6?s=1:a.param&&(f=a.param&15,f&&(a.vibratoParam=a.vibratoParam&240|f),f=a.param&240,f&&(a.vibratoParam=a.vibratoParam&15|f)),r=a.vibratoPos>>2&31,o=a.vibratoWave&3,o?(f=255,r<<=3,o===1&&(a.vibratoPos>127?f-=r:f=r)):f=Li[r],f=(a.vibratoParam&15)*f>>this.vibratoDepth,a.vibratoPos>127?e.period=a.period-f:e.period=a.period+f,f=a.vibratoParam>>2&60,a.vibratoPos=a.vibratoPos+f&255;break;case 7:e.period=a.period,a.param&&(f=a.param&15,f&&(a.tremoloParam=a.tremoloParam&240|f),f=a.param&240,f&&(a.tremoloParam=a.tremoloParam&15|f)),r=a.tremoloPos>>2&31,o=a.tremoloWave&3,o?(f=255,r<<=3,o===1&&(a.tremoloPos>127?f-=r:f=r)):f=Li[r],f=(a.tremoloParam&15)*f>>6,a.tremoloPos>127?e.volume=a.volume-f:e.volume=a.volume+f,f=a.tremoloParam>>2&60,a.tremoloPos=a.tremoloPos+f&255;break;case 10:s=1;break;case 14:this.extended(a);break;default:break}s&&(s=0,f=a.param>>4,f?a.volume+=f:a.volume-=a.param&15,a.volume<0?a.volume=0:a.volume>64&&(a.volume=64),e.volume=a.volume),a=a.next}}},moreEffects:{value:function(e){var i=e.channel,r;switch(e.funkSpeed&&this.updateFunk(e),e.effect){case 9:e.param&&(e.offset=e.param),r=e.offset<<8,r>=e.length?e.length=2:(e.pointer+=r,e.length-=r);break;case 11:this.trackPos=e.param-1,this.breakPos=0,this.jumpFlag=1;break;case 12:e.volume=e.param,e.volume>64&&(e.volume=64),i.volume=e.volume;break;case 13:this.breakPos=(e.param>>4)*10+(e.param&15),this.breakPos>63?this.breakPos=0:this.breakPos<<=2,this.jumpFlag=1;break;case 14:this.extended(e);break;case 15:if(!e.param)return;e.param<32?this.speed=e.param:this.mixer.samplesTick=this.sampleRate*2.5/e.param>>0,this.tick=0;break;default:break}}},extended:{value:function(e){var i=e.channel,r=e.param>>4,s,f,a,o=e.param&15;switch(r){case 0:this.mixer.filter.active=o;break;case 1:if(this.tick)return;e.period-=o,e.period<113&&(e.period=113),i.period=e.period;break;case 2:if(this.tick)return;e.period+=o,e.period>856&&(e.period=856),i.period=e.period;break;case 3:e.glissando=o;break;case 4:e.vibratoWave=o;break;case 5:e.finetune=o*37;break;case 6:if(this.tick)return;o?(e.loopCtr?e.loopCtr--:e.loopCtr=o,e.loopCtr&&(this.breakPos=e.loopPos<<2,this.patternBreak=1)):e.loopPos=this.patternPos>>2;break;case 7:e.tremoloWave=o;break;case 8:for(f=e.length-2,a=this.mixer.memory,s=e.loopPtr;s<f;)a[s]=(a[s]+a[++s])*.5;a[++s]=(a[s]+a[0])*.5;break;case 9:if(this.tick||!o||!e.period||this.tick%o)return;i.enabled=0,i.pointer=e.pointer,i.length=e.length,i.delay=30,i.enabled=1,i.pointer=e.loopPtr,i.length=e.repeat,i.period=e.period;break;case 10:if(this.tick)return;e.volume+=o,e.volume>64&&(e.volume=64),i.volume=e.volume;break;case 11:if(this.tick)return;e.volume-=o,e.volume<0&&(e.volume=0),i.volume=e.volume;break;case 12:this.tick===o&&(i.volume=e.volume=0);break;case 13:if(this.tick!==o||!e.period)return;i.enabled=0,i.pointer=e.pointer,i.length=e.length,i.delay=30,i.enabled=1,i.pointer=e.loopPtr,i.length=e.repeat,i.period=e.period;break;case 14:if(this.tick||this.patternDelay)return;this.patternDelay=++o;break;case 15:if(this.tick)return;e.funkSpeed=o,o&&this.updateFunk(e);break;default:break}}},updateFunk:{value:function(e){var i=e.channel,r,s,f=Aa[e.funkSpeed];e.funkPos+=f,!(e.funkPos<128)&&(e.funkPos=0,this.version===Mt?(r=e.pointer+e.sample.realLen-e.repeat,s=e.funkWave+e.repeat,s>r&&(s=e.loopPtr,i.length=e.repeat),i.pointer=e.funkWave=s):(r=e.loopPtr+e.repeat,s=e.funkWave+1,s>=r&&(s=e.loopPtr),this.mixer.memory[s]=-this.mixer.memory[s]))}}}),t.voices[0]=Ft(0),t.voices[0].next=t.voices[1]=Ft(1),t.voices[1].next=t.voices[2]=Ft(2),t.voices[2].next=t.voices[3]=Ft(3),t.track=new Uint16Array(128),Object.seal(t)}var Mt=1,Ai=2,Vt=3,be=[856,808,762,720,678,640,604,570,538,508,480,453,428,404,381,360,339,320,302,285,269,254,240,226,214,202,190,180,170,160,151,143,135,127,120,113,0,850,802,757,715,674,637,601,567,535,505,477,450,425,401,379,357,337,318,300,284,268,253,239,225,213,201,189,179,169,159,150,142,134,126,119,113,0,844,796,752,709,670,632,597,563,532,502,474,447,422,398,376,355,335,316,298,282,266,251,237,224,211,199,188,177,167,158,149,141,133,125,118,112,0,838,791,746,704,665,628,592,559,528,498,470,444,419,395,373,352,332,314,296,280,264,249,235,222,209,198,187,176,166,157,148,140,132,125,118,111,0,832,785,741,699,660,623,588,555,524,495,467,441,416,392,370,350,330,312,294,278,262,247,233,220,208,196,185,175,165,156,147,139,131,124,117,110,0,826,779,736,694,655,619,584,551,520,491,463,437,413,390,368,347,328,309,292,276,260,245,232,219,206,195,184,174,164,155,146,138,130,123,116,109,0,820,774,730,689,651,614,580,547,516,487,460,434,410,387,365,345,325,307,290,274,258,244,230,217,205,193,183,172,163,154,145,137,129,122,115,109,0,814,768,725,684,646,610,575,543,513,484,457,431,407,384,363,342,323,305,288,272,256,242,228,216,204,192,181,171,161,152,144,136,128,121,114,108,0,907,856,808,762,720,678,640,604,570,538,508,480,453,428,404,381,360,339,320,302,285,269,254,240,226,214,202,190,180,170,160,151,143,135,127,120,0,900,850,802,757,715,675,636,601,567,535,505,477,450,425,401,379,357,337,318,300,284,268,253,238,225,212,200,189,179,169,159,150,142,134,126,119,0,894,844,796,752,709,670,632,597,563,532,502,474,447,422,398,376,355,335,316,298,282,266,251,237,223,211,199,188,177,167,158,149,141,133,125,118,0,887,838,791,746,704,665,628,592,559,528,498,470,444,419,395,373,352,332,314,296,280,264,249,235,222,209,198,187,176,166,157,148,140,132,125,118,0,881,832,785,741,699,660,623,588,555,524,494,467,441,416,392,370,350,330,312,294,278,262,247,233,220,208,196,185,175,165,156,147,139,131,123,117,0,875,826,779,736,694,655,619,584,551,520,491,463,437,413,390,368,347,328,309,292,276,260,245,232,219,206,195,184,174,164,155,146,138,130,123,116,0,868,820,774,730,689,651,614,580,547,516,487,460,434,410,387,365,345,325,307,290,274,258,244,230,217,205,193,183,172,163,154,145,137,129,122,115,0,862,814,768,725,684,646,610,575,543,513,484,457,431,407,384,363,342,323,305,288,272,256,242,228,216,203,192,181,171,161,152,144,136,128,121,114,0],Li=[0,24,49,74,97,120,141,161,180,197,212,224,235,244,250,253,255,253,250,244,235,224,212,197,180,161,141,120,97,74,49,24],Aa=[0,5,6,7,8,10,11,13,16,19,22,26,32,43,64,128],Ii=Ca;function La(){var u=Object.create(null,{player:{value:null,writable:!0},index:{value:0,writable:!0},amiga:{value:null,writable:!0},mixer:{value:null,writable:!0},tracker:{get:function(){return this.player?Ri[this.index+this.player.version]:Ri[0]}},load:{value:function(t){var e,i;if(t.view||(t=jt(t)),t.endian=1,t.position=0,t.readUint()===67324752&&window.neoart.Unzip,!t)return null;if(this.player&&this.player.id!=="STPlayer"&&(this.player.load(t),this.player.version))return this.player;if(t.length>336&&(t.position=38,e=t.readString(20),(e==="FastTracker v2.00   "||e==="FastTracker v 2.00  "||e==="Sk@le Tracker"||e==="MadTracker 2.0"||e==="MilkyTracker        "||e==="DigiBooster Pro 2.18"||e.indexOf("OpenMPT")!==-1)&&(this.player=Di(this.mixer),this.player.load(t),this.player.version)))return this.index=ja,this.player;if(t.endian=0,t.length>2105){if(t.position=1080,e=t.readString(4),e==="M.K."||e==="FLT4"){if(this.player=Mi(this.amiga),this.player.load(t),this.player.version)return this.index=Ra,this.player}else if(e==="FEST"&&(this.player=window.neoart.HMPlayer(this.amiga),this.player.load(t),this.player.version))return this.index=za,this.player}return t.length>2105&&(t.position=1080,e=t.readString(4),(e==="M.K."||e==="M!K!")&&(this.player=Ii(this.amiga),this.player.load(t),this.player.version))?(this.index=Oa,this.player):t.length>5220&&(this.player=window.neoart.S1Player(this.amiga),this.player.load(t),this.player.version)?(this.index=Ua,this.player):(t.position=0,i=t.readUshort(),t.position=0,e=t.readString(4),(e==="COSO"||i===24576||i===24578||i===24590||i===24598)&&(this.player=window.neoart.JHPlayer(this.amiga),this.player.load(t),this.player.version)?(this.index=Ba,this.player):(t.position=0,i=t.readUshort(),this.player=window.neoart.DWPlayer(this.amiga),this.player.load(t),this.player.version?(this.index=_a,this.player):(t.position=0,i=t.readUshort(),i===24576&&(this.player=window.neoart.RHPlayer(this.amiga),this.player.load(t),this.player.version)?(this.index=qa,this.player):t.length>1625&&(this.player=window.neoart.STPlayer(this.amiga),this.player.load(t),this.player.version)?(this.index=Ia,this.player):(t.clear(),this.index=0,this.player=null))))}}});return u.amiga=Nt(),Object.seal(u)}var Ia=0,Ra=4,Oa=9,za=12,Ua=26,_a=28,Ba=30,qa=32,ja=33,Ri=["Unknown Format","Ultimate SoundTracker","D.O.C. SoundTracker 9","Master SoundTracker","D.O.C. SoundTracker 2.0/2.2","SoundTracker 2.3","SoundTracker 2.4","NoiseTracker 1.0","NoiseTracker 1.1","NoiseTracker 2.0","ProTracker 1.0","ProTracker 1.1/2.1","ProTracker 1.2/2.0","His Master's NoiseTracker","SoundFX 1.0/1.7","SoundFX 1.8","SoundFX 1.945","SoundFX 1.994/2.0","BP SoundMon V1","BP SoundMon V2","BP SoundMon V3","Delta Music 1.0","Delta Music 2.0","Digital Mugician","Digital Mugician 7 Voices","Future Composer 1.0/1.3","Future Composer 1.4","SidMon 1.0","SidMon 2.0","David Whittaker","FredEd","Jochen Hippel","Jochen Hippel COSO","Rob Hubbard","FastTracker II","Sk@leTracker","MadTracker 2.0","MilkyTracker","DigiBooster Pro 2.18","OpenMPT"],Na=La(),Oi=Na;var Ct=class{constructor(t={}){this.baseRawUrl="https://raw.githubusercontent.com/michioxd/keygen-music/master/",this.indexUrl=this.baseRawUrl+"index.json",this.trackList=[],this.history=[],this.maxHistory=50,this.historyCursor=-1,this.currentPlayer=null,this.isPlaying=!1,this.pollInterval=null,this._opId=0,this.onTrackChange=t.onTrackChange||(()=>{}),this.onError=t.onError||(()=>{}),this.hasFetchedIndex=!1,this.currentTrack=null}async init(){if(!this.hasFetchedIndex)try{let t=await fetch(this.indexUrl);if(!t.ok)throw new Error("Network response was not ok");let e=await t.json(),i=["xm","mod","s3m","it"];this.trackList=e.filter(r=>r.fileExtension&&i.includes(r.fileExtension.toLowerCase())),this.hasFetchedIndex=!0}catch(t){throw console.warn("Jukebox offline or failed to fetch index:",t),this.trackList=[],this.onError("NO INTERNET OR BLOCKED ... TRY AGAIN?"),t}}async playNext(t=null){let e=++this._opId;this.stop();try{if(!this.hasFetchedIndex&&(await this.init(),e!==this._opId))return;if(this.trackList.length===0){console.warn("No tracks available in Jukebox.");return}let i=null;if(t&&typeof t=="object"){let{title:r,trackTitle:s,artist:f}=t,a=this.trackList.filter(o=>{let h=!f||o.artist&&o.artist.toLowerCase()===f.toLowerCase(),c=!r||o.title&&o.title.toLowerCase()===r.toLowerCase(),n=!s||o.trackTitle&&o.trackTitle.toLowerCase()===s.toLowerCase();return h&&c&&n});a.length===0?console.warn("Jukebox: NO matches found for target object:",t):a.length>1&&console.warn(`Jukebox: ${a.length} matches found. Refine your search!`,a),i=a[0]||null}else if(t&&typeof t=="string"){let r=this.trackList.filter(s=>s.title&&s.title.toLowerCase()===t.toLowerCase());r.length===0?console.warn("Jukebox: NO matches found for target title string:",t):r.length>1&&console.warn(`Jukebox: ${r.length} matches found for title string.`,r),i=r[0]||null}if(!i&&!t&&this.historyCursor<this.history.length-1)this.historyCursor++,i=this.trackList[this.history[this.historyCursor]];else if(!i){let r=this.trackList.filter((a,o)=>!this.history.includes(o));r.length===0&&(this.history=[],this.historyCursor=-1);let s=r.length>0?r:this.trackList;i=s[Math.floor(Math.random()*s.length)];let f=this.trackList.indexOf(i);this.historyCursor<this.history.length-1&&(this.history=this.history.slice(0,this.historyCursor+1)),this.history.push(f),this.history.length>this.maxHistory&&this.history.shift(),this.historyCursor=this.history.length-1}await this._playTrack(i,e)}catch(i){console.warn("Jukebox track fetch failed:",i),this.onError("NO INTERNET OR BLOCKED ... TRY AGAIN?")}}async playPrevious(){if(this.historyCursor>0){let t=++this._opId;this.stop(),this.historyCursor--;let e=this.trackList[this.history[this.historyCursor]];try{await this._playTrack(e,t)}catch(i){console.warn("Jukebox track fetch failed:",i),this.onError("NO INTERNET OR BLOCKED ... TRY AGAIN?")}}}async _playTrack(t,e){let i=t.path.split("/").map(o=>encodeURIComponent(o)).join("/"),r=this.baseRawUrl+i,s=await fetch(r);if(!s.ok)throw new Error("Failed to fetch audio file");if(e!==this._opId)return;let f=await s.arrayBuffer();if(e!==this._opId)return;let a=null;try{a=Oi.load(f)}catch(o){console.warn("Jukebox: unsupported format for track, skipping:",t.title,o.message),e===this._opId&&setTimeout(()=>this.playNext(),100);return}e===this._opId&&(this.currentPlayer=a,this.currentPlayer?(this.currentTrack=t,typeof this.currentPlayer.loopSong<"u"&&(this.currentPlayer.loopSong=1),this.currentPlayer.play(),this.isPlaying=!0,this.onTrackChange(t),this.setupCompletionPolling()):setTimeout(()=>this.playNext(),100))}setupCompletionPolling(){this.pollInterval&&clearInterval(this.pollInterval);let t=Date.now();this.pollInterval=setInterval(()=>{if(!this.currentPlayer)return this.stopPolling();let e=!1;this.currentPlayer.amiga&&this.currentPlayer.amiga.playing===!1&&(e=!0),this.currentPlayer.mixer&&this.currentPlayer.mixer.playing===!1&&(e=!0),this.currentPlayer.stopped&&(e=!0),this.currentPlayer.playing===!1&&(e=!0),e&&this.playNext()},1e3)}stopPolling(){this.pollInterval&&(clearInterval(this.pollInterval),this.pollInterval=null)}stop(){if(this.stopPolling(),this.isPlaying=!1,this.currentPlayer){try{this.currentPlayer.stop()}catch{}this.currentPlayer=null}}};var zi=`:root {
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
    --afx-none-bg: var(--afx-bg-color, black);
}

/* --- THEME REACTIVITY --- */
/* None effect: Reactive Light/Dark switching */
html.afx-effect-none {
    --afx-body-bg: #f5f5f5;
    --afx-body-color: #000000;
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
    filter: blur(8px);
    width: 12.5% !important;
    height: 12.5% !important;
    transform: scale(8.1) !important;
    transform-origin: top left !important;
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
.afx-dual-control-stack,
#afx-controls-stack-right {
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
.afx-agreed-state .afx-dual-control-stack,
.afx-agreed-state #afx-controls-stack-right {
    display: flex !important;
    pointer-events: auto !important;
    position: fixed !important;
    z-index: 10001 !important;
    flex-direction: column;
    gap: 8px;
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

.afx-dual-control-stack {
    bottom: 20px;
    left: 20px;
    align-items: flex-start;
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
    padding: 0 !important;
}

#afx-controls-stack-right {
    bottom: 20px;
    right: 20px;
    align-items: flex-end;
}

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

#afx-controls-stack-right .afx-effect-selector-container {
    width: auto;
    min-width: 140px;
    max-width: 280px;
}

@media (max-width: 480px) {
    .afx-dual-control-stack {
        gap: 5px;
        /* Tighter gap on mobile */
    }
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

    .afx-dual-control-stack {
        bottom: calc(10px + env(safe-area-inset-bottom)) !important;
        left: calc(10px + env(safe-area-inset-left)) !important;
    }

    #afx-controls-stack-right {
        bottom: calc(10px + env(safe-area-inset-bottom)) !important;
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
}`;var q=class u{static init(t={}){console.log("AnkiFX: Initialized.");let e={deckTitle:"AnkiFX Deck",deckAuthor:"Anonymous",termsText:"No terms provided.",sources:[],marquee:"ANKIFX ENGINE INITIALIZED ...",defaultEffect:"geometry",debug:!1,countdown:30,marqueePosition:"top",...window.AnkiFX_Config||{},...t};Array.isArray(e.sources)||(e.sources=[]);let i=parseInt(e.countdown,10);e.countdown=isNaN(i)?30:Math.max(0,i),e.isConfigFileError=typeof e.termsText!="string"||e.termsText.trim()===""||e.termsText==="No terms provided.";let r=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);if(document.getElementById("ankifx-overlay")&&document.getElementById("ankifx-overlay").classList.contains("afx-agreed-state")){let n=document.getElementById("qa");n&&(n.style.position="relative",n.style.zIndex="10"),this.defaultMarqueeText=e.marquee,this.marquee&&(this.marquee.setText(e.marquee),this.marquee.setPosition(e.marqueePosition));let d=document.getElementById("afx-deck-title");d&&(d.textContent=e.deckTitle);return}document.documentElement.classList.remove("afx-scroll-lock"),document.documentElement.classList.remove("afx-agreed"),["ankifx-overlay","ankifx-background","afx-btn-back","afx-btn-skip"].forEach(c=>{let n=document.getElementById(c);n&&n.remove()}),this.defaultMarqueeText=e.marquee,this.EFFECT_SONG_MAP={},Object.entries(Z).forEach(([c,n])=>{n&&n.preferredTrack&&(this.EFFECT_SONG_MAP[c]=n.preferredTrack)}),this.injectCSS();let s=window.AnkiFX_Config?.defaultEffect,f;s?(f=s,localStorage.setItem("ankifx_preferred_effect",f)):f=localStorage.getItem("ankifx_preferred_effect")||e.defaultEffect||"geometry",Z[f]||(console.warn(`AnkiFX: Stale or invalid activeEffect "${f}" detected. Falling back to default.`),f=e.defaultEffect||"geometry",Z[f]||(f=Object.keys(Z)[0]||"geometry"),localStorage.setItem("ankifx_preferred_effect",f));let{overlay:a,background:o}=this.injectUI(e,r,f);this.initTuner(e.debug,f),this._layoutHandler&&(window.removeEventListener("orientationchange",this._layoutHandler),window.removeEventListener("resize",this._layoutHandler)),this._layoutHandler=()=>{setTimeout(()=>{this.handleResize(),this.updateTuner()},50)},window.addEventListener("orientationchange",this._layoutHandler),window.addEventListener("resize",this._layoutHandler),this.handleResize(),this.marquee?(this.marquee.setText(e.marquee),this.marquee.setPosition(e.marqueePosition)):(this.marquee=new gt(e.marquee,e.marqueePosition),this.startMarqueeLoop()),this.startEffect(e,o,e.marqueePosition,f);let h=localStorage.getItem("ankifx_marquee_enabled")!=="false";this.marquee&&(this.marquee.enabled=h),u.observer||(u.observer=new MutationObserver(()=>{setTimeout(()=>{let c=document.getElementById("qa");c&&c.querySelector(".ankifx-card")||u.destroy()},20)}),u.observer.observe(document.documentElement,{childList:!0,subtree:!0}))}static injectCSS(){if(document.getElementById("ankifx-styles"))return;let t=document.createElement("style");t.id="ankifx-styles",t.textContent=zi,document.head.appendChild(t)}static initTuner(t,e){let i=localStorage.getItem("ankifx_tuner_offset"),r=getComputedStyle(document.documentElement),s=parseInt(r.getPropertyValue("--io-header"))||0,f=i!==null?parseInt(i):-s;this.tunerOffset=f,this.tunerAutoUpdate=i===null,this.updateTuner();let a=s,o=setInterval(()=>{let h=getComputedStyle(document.documentElement),c=parseInt(h.getPropertyValue("--io-header"))||0;c!==a&&(a=c,this.tunerAutoUpdate&&(this.tunerOffset=-c),this.updateTuner())},50);setTimeout(()=>{clearInterval(o)},2e3)}static updateTuner(){let t=localStorage.getItem("ankifx_tuner_offset"),e=getComputedStyle(document.documentElement),i=parseInt(e.getPropertyValue("--io-header"))||0,s=(this.tunerOffset!==void 0?this.tunerOffset:t!==null?parseInt(t):-i)+i;if(document.documentElement.style.setProperty("--tuner-height",`calc(100dvh + ${s}px)`),this.currentEffectId&&Z[this.currentEffectId]?.onResize){let f=Math.min(window.devicePixelRatio||1,1.5),a=this.currentEffectId==="mandelbrot"||this.currentEffectId==="julia"?f:this.dpr;Z[this.currentEffectId].onResize(this.width,this.height,a)}}static handleResize(){let t=document.getElementById("ankifx-background");if(!t||!this.sharedGL||!this.shared2D||!this.sharedMarquee)return;let e=t.getBoundingClientRect();this.width=e.width,this.height=e.height,this.dpr=Math.min(window.devicePixelRatio||1,2);let i=Math.min(window.devicePixelRatio||1,1.5);if(this.sharedGL.width=this.width*i,this.sharedGL.height=this.height*i,this.sharedGL.style.width=this.width+"px",this.sharedGL.style.height=this.height+"px",this.shared2D.width=this.width*this.dpr,this.shared2D.height=this.height*this.dpr,this.shared2D.style.width=this.width+"px",this.shared2D.style.height=this.height+"px",this.sharedMarquee.width=this.width*this.dpr,this.sharedMarquee.height=this.height*this.dpr,this.sharedMarquee.style.width=this.width+"px",this.sharedMarquee.style.height=this.height+"px",this.glContext&&this.glContext.viewport(0,0,this.sharedGL.width,this.sharedGL.height),this.ctx2D&&(this.ctx2D.setTransform(1,0,0,1,0,0),this.ctx2D.scale(this.dpr,this.dpr)),this.ctxMarquee&&(this.ctxMarquee.setTransform(1,0,0,1,0,0),this.ctxMarquee.scale(this.dpr,this.dpr)),this.currentEffectId&&Z[this.currentEffectId]?.onResize){let r=this.currentEffectId==="mandelbrot"||this.currentEffectId==="julia"?i:this.dpr;Z[this.currentEffectId].onResize(this.width,this.height,r)}}static injectUI(t,e,i){let r=document.createElement("div");r.id="ankifx-overlay",t.debug&&r.classList.add("afx-debug-active");let s=window.innerWidth||document.documentElement.clientWidth||800,f=s<480?.65:s<768?.8:1,a=Math.max(55,Math.ceil(85*f));(/iPad|iPhone|iPod/.test(navigator.userAgent)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1)&&(t.marqueePosition==="top"?r.style.paddingTop=`calc(1rem + ${a}px)`:r.style.paddingBottom=`calc(1rem + ${a}px)`);let h=localStorage.getItem("ankifx_marquee_enabled")!=="false",c=Z.julia?.presets||[],n=s<480,d=n?"\u{1F4DC} ":"\u{1F4DC} TEXT: ",x=n?"":" BGM: ",m=n?d.trim():h?`${d}ON`:`${d}OFF`,l=n?"\u{1F507}":`\u{1F507}${x}OFF`,v=n?"\u{1F50A}":`\u{1F50A}${x}ON`,p=`
            <div class="afx-dual-control-stack">
                <div class="afx-control-row">
                    <label class="afx-toggle"><input type="checkbox" id="afx-text-toggle" ${h?"checked":""}><span class="afx-slider"></span></label>
                    <span id="afx-text-status">${m}</span>
                </div>
                <div id="afx-bgm-container" class="afx-control-row">
                    <label class="afx-toggle"><input type="checkbox" id="afx-audio-toggle"><span class="afx-slider"></span></label>
                    <span id="afx-bgm-status">${l}</span>
                </div>
            </div>
        `,g=n?"\u{1F3A8} ":"[ Effect: ",w=n?"":" ]",P=Object.values(Z).filter(F=>F.id!=="debug"||t.debug).map(F=>`

                <option value="${F.id}" ${i===F.id?"selected":""}>
                    ${g}${F.name}${w}
                </option>
            `).join(""),b=n?"\u{1F4A0} ":"[ Preset: ",y=n?"":" ]",E=c.map((F,R)=>`
            <option value="${R}">${b}${F.name}${y}</option>
        `).join(""),k=`
            <div id="afx-julia-selector-container" class="afx-control-row afx-effect-selector-container" style="padding: 0; display: ${i==="julia"?"flex":"none"};">
                <select id="afx-julia-selector" class="afx-sub-picker">
                    ${E}
                </select>
            </div>
        `,T=`
            <div id="afx-effect-selector-container" class="afx-control-row afx-effect-selector-container" style="padding: 0;">
                <select id="afx-effect-selector">
                    ${P}
                </select>
            </div>
        `,S="";t.debug&&(S=`
                <div id="afx-clear-storage-container" class="afx-control-row afx-effect-selector-container" style="padding: 0; border: 1px solid rgba(255, 85, 85, 0.4); display: ${i==="debug"?"flex":"none"};">
                    <button id="afx-debug-clear-storage" style="background: transparent; color: #ff5555; border: none; width: 100%; height: 100%; cursor: pointer; text-transform: uppercase; font-family: 'Courier New', Courier, monospace !important; font-size: var(--afx-picker-font-size) !important; font-weight: bold !important; padding: 0 10px; display: flex; align-items: center; justify-content: center; width: 100%;">
                        \u{1F9F9} CLEAR STORAGE
                    </button>
                </div>
            `);let A=`
            <div id="afx-controls-stack-right" class="afx-controls-stack">
                ${k}
                ${S}
                ${T}
            </div>
        `,M=!1;try{M=sessionStorage.getItem(`ankifx_agreed_${t.deckTitle}`)==="true"}catch{}let L=t.termsText&&t.termsText.trim()!==""&&!M,I="";if(L){let F=t.sources.map(R=>`<li>${R}</li>`).join("");I=`
                <div class="afx-dialog">
                    <div class="afx-terms">
                        <h3>${t.deckTitle}</h3>
                        ${t.deckAuthor?`<h4 style="margin: -10px 0 15px 0; opacity: 0.7; font-size: 0.9rem;">by ${t.deckAuthor}</h4>`:""}
                        <p>${t.termsText}</p>
                        ${t.sources&&t.sources.length>0?`
                            <p><strong>Sources:</strong></p>
                            <ul>${F}</ul>
                        `:""}
                    </div>
                    <div class="afx-action-row">
                        <button id="afx-consent-btn" class="afx-btn" disabled>I AGREE</button>
                    </div>
                </div>
            `}let _="";t.debug&&(_=`
                <div id="afx-global-fps" style="position: absolute; top: 10px; left: 10px; color: #0f0; font-family: monospace; font-size: 14px; font-weight: bold; text-shadow: 1px 1px 2px #000; z-index: 9999; pointer-events: none;">
                    FPS: --
                </div>
            `),r.innerHTML=I+_;let U=document.createElement("div");for(U.innerHTML=p+A;U.firstChild;)r.appendChild(U.firstChild);let C=document.createElement("div");C.id="ankifx-background",document.body.appendChild(C),this.sharedGL=document.createElement("canvas"),this.sharedGL.id="afx-shared-gl",this.sharedGL.style.cssText="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;",C.appendChild(this.sharedGL),this.shared2D=document.createElement("canvas"),this.shared2D.id="afx-shared-2d",this.shared2D.style.cssText="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;",C.appendChild(this.shared2D),this.sharedMarquee=document.createElement("canvas"),this.sharedMarquee.id="afx-shared-marquee",this.sharedMarquee.style.cssText="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 5;",C.appendChild(this.sharedMarquee),this.glContext=this.sharedGL.getContext("webgl",{alpha:!1,antialias:!1}),this.ctx2D=this.shared2D.getContext("2d"),this.ctxMarquee=this.sharedMarquee.getContext("2d"),document.body.appendChild(r);let O=document.createElement("button");O.id="afx-btn-back",O.className="afx-playback-btn",O.textContent="\u23EE\uFE0F";let j=document.createElement("button");j.id="afx-btn-skip",j.className="afx-playback-btn",j.textContent="\u23ED\uFE0F",r.appendChild(O),r.appendChild(j);let G=F=>{let R=r.classList.contains("afx-agreed-state"),V=F.target.closest("button, input, select, .afx-slider, .afx-toggle, .afx-playback-btn, select option");R?V&&F.stopPropagation():F.stopPropagation()};["touchstart","touchend","mousedown","mouseup","pointerdown","pointerup","click"].forEach(F=>{r.addEventListener(F,G,{passive:!1})});let z=document.getElementById("afx-consent-btn");if(L&&z){let F=t.countdown;if((t.debug||t.isConfigFileError)&&(F=0),F>0){z.textContent=`( ${F} )`;let R=setInterval(()=>{F--,z.textContent=`( ${F} )`,F<=0&&(clearInterval(R),z.textContent="I AGREE",z.disabled=!1)},1e3)}else z.textContent="I AGREE",z.disabled=!1;z.addEventListener("click",R=>{R.stopPropagation(),z.disabled||this.agree(r,t.deckTitle)})}else this.agree(r,t.deckTitle);let H=document.getElementById("afx-audio-toggle");if(H){let F=document.getElementById("afx-bgm-status");H.checked&&r.classList.add("afx-music-playing"),u.jukebox=new Ct({onTrackChange:R=>{let V=`NOW PLAYING: ${R.artist} - ${R.title} - ${R.trackTitle}`;t.marquee=V,u.marquee&&u.marquee.setText(V)},onError:R=>{t.marquee=R,u.marquee&&u.marquee.setText(R)}}),H.addEventListener("change",R=>{if(R.target.checked){r.classList.add("afx-bgm-active"),r.classList.add("afx-music-playing"),F.innerHTML=n?"\u{1F50A}":"\u{1F50A} BGM: ON",F.style.color="#ff6b6b";let X=window.AudioContext||window.webkitAudioContext;X&&(window.neoart=window.neoart||{},window.neoart.audioContext||(window.neoart.audioContext=new X)),window.neoart.audioContext&&window.neoart.audioContext.state==="suspended"&&window.neoart.audioContext.resume();let ee=localStorage.getItem("ankifx_preferred_effect")||t.defaultEffect||"geometry",se=t.trackTitle||u.EFFECT_SONG_MAP[ee]||null;u.jukebox.playNext(se)}else r.classList.remove("afx-bgm-active"),r.classList.remove("afx-music-playing"),F.innerHTML=n?"\u{1F507}":"\u{1F507} BGM: OFF",F.style.color="#fff",u.jukebox.stop(),t.marquee=u.defaultMarqueeText,u.marquee&&u.marquee.setText(u.defaultMarqueeText)})}let J=document.getElementById("afx-text-toggle");if(J){let F=document.getElementById("afx-text-status");J.addEventListener("change",R=>{let V=R.target.checked;localStorage.setItem("ankifx_marquee_enabled",V);let X=n?"\u{1F4DC} ":"\u{1F4DC} TEXT: ";F.textContent=n?X.trim():V?`${X}ON`:`${X}OFF`,u.marquee&&(u.marquee.enabled=V)})}O.addEventListener("click",F=>{F.stopPropagation(),u.jukebox&&u.jukebox.playPrevious()}),j.addEventListener("click",F=>{F.stopPropagation(),u.jukebox&&u.jukebox.playNext()});let te=document.getElementById("afx-effect-selector"),ie=document.getElementById("afx-julia-selector-container"),ae=document.getElementById("afx-julia-selector");te&&te.addEventListener("change",F=>{let R=F.target.value;localStorage.setItem("ankifx_preferred_effect",R),Object.values(Z).forEach(X=>X.stop()),this.ctx2D&&this.ctx2D.clearRect(0,0,this.width,this.height),this.glContext&&(this.glContext.clearColor(0,0,0,0),this.glContext.clear(this.glContext.COLOR_BUFFER_BIT)),t.defaultEffect=R,ie&&(ie.style.display=R==="julia"?"flex":"none");let V=document.getElementById("afx-clear-storage-container");if(V&&(V.style.display=R==="debug"?"flex":"none"),R==="debug"?r.classList.add("afx-debug-active"):r.classList.remove("afx-debug-active"),u.startEffect(t,C,t.marqueePosition,R),u.jukebox&&u.jukebox.isPlaying){let X=t.trackTitle||u.EFFECT_SONG_MAP[R]||null,ee=u.jukebox.currentTrack,se=!1;X&&(typeof X=="string"?se=!ee||ee.title.toLowerCase()!==X.toLowerCase():se=!ee||X.title&&ee.title.toLowerCase()!==X.title.toLowerCase()||X.trackTitle&&ee.trackTitle.toLowerCase()!==X.trackTitle.toLowerCase()||X.artist&&(ee.artist||"").toLowerCase()!==X.artist.toLowerCase()),se&&u.jukebox.playNext(X)}}),ae&&ae.addEventListener("change",F=>{let R=parseInt(F.target.value),V=Z.julia.presets[R];V&&(Object.assign(t,V),Z.julia.stop(),this.ctx2D&&this.ctx2D.clearRect(0,0,this.width,this.height),u.startEffect(t,C,t.marqueePosition,"julia"))});let Se=document.getElementById("afx-debug-clear-storage");return Se&&Se.addEventListener("click",F=>{F.stopPropagation(),confirm("Clear ALL AnkiFX local storage?")&&(localStorage.clear(),location.reload())}),{overlay:r,background:C}}static startEffect(t,e,i,r){r==="debug"?e.classList.add("afx-debug-active"):e.classList.remove("afx-debug-active");let s=Z[r];if(s){let f=Math.min(window.devicePixelRatio||1,1.5),a=r==="mandelbrot"||r==="julia"?f:this.dpr,o={gl:this.glContext,ctx2d:this.ctx2D,canvasGL:this.sharedGL,canvas2D:this.shared2D,width:this.width,height:this.height,dpr:a};this.currentEffectId=r;let h=document.documentElement;Array.from(h.classList).forEach(n=>{n.startsWith("afx-effect-")&&h.classList.remove(n)}),h.classList.add(`afx-effect-${r}`),this.marquee&&this.marquee.updateStyles(s.marqueeFont||{}),s.run(o,t);let c=localStorage.getItem("ankifx_marquee_enabled")!=="false";this.marquee&&(this.marquee.enabled=c)}}static agree(t,e){if(t.classList.add("afx-agreed-state"),document.documentElement.classList.add("afx-agreed"),document.documentElement.classList.remove("afx-scroll-lock"),e)try{sessionStorage.setItem(`ankifx_agreed_${e}`,"true")}catch{}let i=document.getElementById("qa");i&&(i.style.position="relative",i.style.zIndex="10")}static destroy(){this.currentEffectId&&Z[this.currentEffectId]?.stop&&Z[this.currentEffectId].stop(),this.jukebox&&(this.jukebox.stop(),this.jukebox=null),this.marqueeInterval&&(cancelAnimationFrame(this.marqueeInterval),this.marqueeInterval=null),this.marquee&&(this.marquee=null),["ankifx-overlay","ankifx-background","afx-btn-back","afx-btn-skip"].forEach(i=>{let r=document.getElementById(i);r&&r.remove()});let t=document.getElementById("ankifx-styles");t&&t.remove(),document.documentElement.style.removeProperty("--tuner-height");let e=document.getElementById("qa");e&&(e.style.position="",e.style.zIndex=""),document.documentElement.classList.remove("afx-scroll-lock"),document.documentElement.classList.remove("afx-agreed"),Array.from(document.documentElement.classList).forEach(i=>{i.startsWith("afx-effect-")&&document.documentElement.classList.remove(i)}),window.AnkiFX_Config=null,this.observer&&(this.observer.disconnect(),this.observer=null),console.log("AnkiFX: Destroyed.")}static startMarqueeLoop(){if(this.marqueeInterval)return;let t=0,e=0,i=r=>{if(r===void 0&&(r=performance.now()),t||(t=r),e++,r-t>=1e3){let s=document.getElementById("afx-global-fps");s&&(s.textContent=`FPS: ${e} | Engine DPR: ${this.dpr}`),e=0,t=r}this.marquee&&this.ctxMarquee&&(this.ctxMarquee.clearRect(0,0,this.width,this.height),this.marquee.render(this.ctxMarquee,this.width,this.height)),this.marqueeInterval=requestAnimationFrame(i)};this.marqueeInterval=requestAnimationFrame(i)}};q.marquee=null;q.jukebox=null;q.defaultMarqueeText=null;q.sharedGL=null;q.shared2D=null;q.sharedMarquee=null;q.glContext=null;q.ctx2D=null;q.ctxMarquee=null;q.currentEffectId=null;q.dpr=1;q.width=0;q.height=0;q.marqueeInterval=null;q._layoutHandler=null;q.observer=null;var At="local";try{let u=typeof __ankifx_script_src=="string"?__ankifx_script_src:"";if(!u){let e=(new Error().stack||"").match(/(https?:\/\/[^\s)\n:]+|file:\/\/[^\s)\n:]+)/g);if(e&&e.length>0){for(let i=0;i<e.length;i++)if(e[i].includes("ankifx")){u=e[i];break}}}u&&(u.includes("cdn.jsdelivr.net")||u.includes("github")||u.includes("rawgit")||u.includes("githack")?At="remote":At="local")}catch{At="detection-failed"}q.version="1.0.0-a384125";q.buildDate="5/30/2026, 9:56:14 PM";q.source=At;window.AnkiFX_Eval_History=window.AnkiFX_Eval_History||[];var Ui=window.AnkiFX&&window.AnkiFX.source==="remote"&&q.source==="local";window.AnkiFX_Eval_History.push({source:q.source,version:q.version,buildDate:q.buildDate,time:new Date().toLocaleTimeString(),status:Ui?"ignored (late local)":"active"});Ui?console.warn(`[AnkiFX Loader] Late local engine evaluation ignored. A remote engine (Version: ${window.AnkiFX.version}) is already active.`):window.AnkiFX=q;})();
