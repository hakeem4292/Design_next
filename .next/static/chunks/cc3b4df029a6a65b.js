(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,53369,e=>{"use strict";var t=e.i(43476),r=e.i(71645);e.s(["default",0,function({SIM_RESOLUTION:e=128,DYE_RESOLUTION:i=1440,CAPTURE_RESOLUTION:o=512,DENSITY_DISSIPATION:n=3.5,VELOCITY_DISSIPATION:a=2,PRESSURE:u=.1,PRESSURE_ITERATIONS:l=20,CURL:c=3,SPLAT_RADIUS:s=.2,SPLAT_FORCE:v=6e3,SHADING:d=!0,COLOR_UPDATE_SPEED:f=10,BACK_COLOR:m={r:.5,g:0,b:0},TRANSPARENT:x=!0}){let h=(0,r.useRef)(null),g=(0,r.useRef)(null);return(0,r.useEffect)(()=>{let t,r,o,m,x,p;if(!h.current)return;let E=h.current,T=!0,R={SIM_RESOLUTION:e,DYE_RESOLUTION:i,DENSITY_DISSIPATION:n,VELOCITY_DISSIPATION:a,PRESSURE:u,PRESSURE_ITERATIONS:l,CURL:c,SPLAT_RADIUS:s,SPLAT_FORCE:v,SHADING:d,COLOR_UPDATE_SPEED:f},y=[new class{id=-1;texcoordX=0;texcoordY=0;prevTexcoordX=0;prevTexcoordY=0;deltaX=0;deltaY=0;down=!1;moved=!1;color={r:0,g:0,b:0}}],{gl:w,ext:S}=function(e){let t,r,i,o,n,a={alpha:!0,depth:!1,stencil:!1,antialias:!1,preserveDrawingBuffer:!1},u=e.getContext("webgl2",a)||e.getContext("webgl",a)||e.getContext("experimental-webgl",a);if(!u)throw Error("WebGL not supported");D(u)?(u.getExtension("EXT_color_buffer_float"),r=u.getExtension("OES_texture_float_linear")):(t=u.getExtension("OES_texture_half_float"),r=u.getExtension("OES_texture_half_float_linear")),u.clearColor(0,0,0,1);let l=D(u)?u.HALF_FLOAT:t&&t.HALF_FLOAT_OES;return D(u)?(i=_(u,u.RGBA16F,u.RGBA,l),o=_(u,u.RG16F,u.RG,l),n=_(u,u.R16F,u.RED,l)):(i=_(u,u.RGBA,u.RGBA,l),o=_(u,u.RGBA,u.RGBA,l),n=_(u,u.RGBA,u.RGBA,l)),{gl:u,ext:{formatRGBA:i,formatRG:o,formatR:n,halfFloatTexType:l,supportLinearFiltering:r}}}(E);function D(e){return e instanceof WebGL2RenderingContext}function _(e,t,r,i){var o,n,a,u;let l,c;if(o=e,n=t,a=r,u=i,l=o.createTexture(),o.bindTexture(o.TEXTURE_2D,l),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.NEAREST),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE),o.texImage2D(o.TEXTURE_2D,0,n,4,4,0,a,u,null),c=o.createFramebuffer(),o.bindFramebuffer(o.FRAMEBUFFER,c),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,l,0),o.checkFramebufferStatus(o.FRAMEBUFFER)!==o.FRAMEBUFFER_COMPLETE)switch(t){case e.R16F:return _(e,e.RG16F,e.RG,i);case e.RG16F:return _(e,e.RGBA16F,e.RGBA,i);default:return null}return{internalFormat:t,format:r}}D(w)||S.supportLinearFiltering||(R.DYE_RESOLUTION=256,R.SHADING=!1);class b{uniforms;program;constructor(e,t){this.uniforms={},this.program=A(e,t),this.uniforms=F(this.program)}bind(){w.useProgram(this.program)}}function A(e,t){let r=w.createProgram();if(!r)throw Error("Failed to create program");return w.attachShader(r,e),w.attachShader(r,t),w.linkProgram(r),w.getProgramParameter(r,w.LINK_STATUS)||console.trace(w.getProgramInfoLog(r)),r}function F(e){let t={},r=w.getProgramParameter(e,w.ACTIVE_UNIFORMS);for(let i=0;i<r;i++){let r=w.getActiveUniform(e,i);if(r){let i=r.name;t[i]=w.getUniformLocation(e,i)}}return t}function L(e,t,r){t=function(e,t){if(!t)return e;let r="";return t.forEach(e=>{r+="#define "+e+"\n"}),r+e}(t,r);let i=w.createShader(e);if(!i)throw Error("Failed to create shader");return w.shaderSource(i,t),w.compileShader(i),w.getShaderParameter(i,w.COMPILE_STATUS)||console.trace(w.getShaderInfoLog(i)),i}let U=L(w.VERTEX_SHADER,`
        precision highp float;
        attribute vec2 aPosition;
        varying vec2 vUv;
        varying vec2 vL;
        varying vec2 vR;
        varying vec2 vT;
        varying vec2 vB;
        uniform vec2 texelSize;

        void main () {
            vUv = aPosition * 0.5 + 0.5;
            vL = vUv - vec2(texelSize.x, 0.0);
            vR = vUv + vec2(texelSize.x, 0.0);
            vT = vUv + vec2(0.0, texelSize.y);
            vB = vUv - vec2(0.0, texelSize.y);
            gl_Position = vec4(aPosition, 0.0, 1.0);
        }
      `),z=L(w.FRAGMENT_SHADER,`
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        uniform sampler2D uTexture;

        void main () {
            gl_FragColor = texture2D(uTexture, vUv);
        }
      `),B=L(w.FRAGMENT_SHADER,`
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        uniform sampler2D uTexture;
        uniform float value;

        void main () {
            gl_FragColor = value * texture2D(uTexture, vUv);
        }
      `),N=`
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uTexture;
      uniform sampler2D uDithering;
      uniform vec2 ditherScale;
      uniform vec2 texelSize;

      vec3 linearToGamma (vec3 color) {
          color = max(color, vec3(0));
          return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));
      }

      void main () {
          vec3 c = texture2D(uTexture, vUv).rgb;
          #ifdef SHADING
              vec3 lc = texture2D(uTexture, vL).rgb;
              vec3 rc = texture2D(uTexture, vR).rgb;
              vec3 tc = texture2D(uTexture, vT).rgb;
              vec3 bc = texture2D(uTexture, vB).rgb;

              float dx = length(rc) - length(lc);
              float dy = length(tc) - length(bc);

              vec3 n = normalize(vec3(dx, dy, length(texelSize)));
              vec3 l = vec3(0.0, 0.0, 1.0);

              float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
              c *= diffuse;
          #endif

          float a = max(c.r, max(c.g, c.b));
          gl_FragColor = vec4(c, a);
      }
    `,C=L(w.FRAGMENT_SHADER,`
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        uniform sampler2D uTarget;
        uniform float aspectRatio;
        uniform vec3 color;
        uniform vec2 point;
        uniform float radius;

        void main () {
            vec2 p = vUv - point.xy;
            p.x *= aspectRatio;
            vec3 splat = exp(-dot(p, p) / radius) * color;
            vec3 base = texture2D(uTarget, vUv).xyz;
            gl_FragColor = vec4(base + splat, 1.0);
        }
      `),P=L(w.FRAGMENT_SHADER,`
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        uniform sampler2D uVelocity;
        uniform sampler2D uSource;
        uniform vec2 texelSize;
        uniform vec2 dyeTexelSize;
        uniform float dt;
        uniform float dissipation;

        vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
            vec2 st = uv / tsize - 0.5;
            vec2 iuv = floor(st);
            vec2 fuv = fract(st);

            vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
            vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
            vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
            vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);

            return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
        }

        void main () {
            #ifdef MANUAL_FILTERING
                vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
                vec4 result = bilerp(uSource, coord, dyeTexelSize);
            #else
                vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
                vec4 result = texture2D(uSource, coord);
            #endif
            float decay = 1.0 + dissipation * dt;
            gl_FragColor = result / decay;
        }
      `,S.supportLinearFiltering?void 0:["MANUAL_FILTERING"]),I=L(w.FRAGMENT_SHADER,`
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uVelocity;

        void main () {
            float L = texture2D(uVelocity, vL).x;
            float R = texture2D(uVelocity, vR).x;
            float T = texture2D(uVelocity, vT).y;
            float B = texture2D(uVelocity, vB).y;

            vec2 C = texture2D(uVelocity, vUv).xy;
            if (vL.x < 0.0) { L = -C.x; }
            if (vR.x > 1.0) { R = -C.x; }
            if (vT.y > 1.0) { T = -C.y; }
            if (vB.y < 0.0) { B = -C.y; }

            float div = 0.5 * (R - L + T - B);
            gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
        }
      `),M=L(w.FRAGMENT_SHADER,`
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uVelocity;

        void main () {
            float L = texture2D(uVelocity, vL).y;
            float R = texture2D(uVelocity, vR).y;
            float T = texture2D(uVelocity, vT).x;
            float B = texture2D(uVelocity, vB).x;
            float vorticity = R - L - T + B;
            gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
        }
      `),X=L(w.FRAGMENT_SHADER,`
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        varying vec2 vL;
        varying vec2 vR;
        varying vec2 vT;
        varying vec2 vB;
        uniform sampler2D uVelocity;
        uniform sampler2D uCurl;
        uniform float curl;
        uniform float dt;

        void main () {
            float L = texture2D(uCurl, vL).x;
            float R = texture2D(uCurl, vR).x;
            float T = texture2D(uCurl, vT).x;
            float B = texture2D(uCurl, vB).x;
            float C = texture2D(uCurl, vUv).x;

            vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
            force /= length(force) + 0.0001;
            force *= curl * C;
            force.y *= -1.0;

            vec2 velocity = texture2D(uVelocity, vUv).xy;
            velocity += force * dt;
            velocity = min(max(velocity, -1000.0), 1000.0);
            gl_FragColor = vec4(velocity, 0.0, 1.0);
        }
      `),G=L(w.FRAGMENT_SHADER,`
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uPressure;
        uniform sampler2D uDivergence;

        void main () {
            float L = texture2D(uPressure, vL).x;
            float R = texture2D(uPressure, vR).x;
            float T = texture2D(uPressure, vT).x;
            float B = texture2D(uPressure, vB).x;
            float C = texture2D(uPressure, vUv).x;
            float divergence = texture2D(uDivergence, vUv).x;
            float pressure = (L + R + B + T - divergence) * 0.25;
            gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
        }
      `),O=L(w.FRAGMENT_SHADER,`
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uPressure;
        uniform sampler2D uVelocity;

        void main () {
            float L = texture2D(uPressure, vL).x;
            float R = texture2D(uPressure, vR).x;
            float T = texture2D(uPressure, vT).x;
            float B = texture2D(uPressure, vB).x;
            vec2 velocity = texture2D(uVelocity, vUv).xy;
            velocity.xy -= vec2(R - L, T - B);
            gl_FragColor = vec4(velocity, 0.0, 1.0);
        }
      `),Y=(w.bindBuffer(w.ARRAY_BUFFER,w.createBuffer()),w.bufferData(w.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),w.STATIC_DRAW),w.bindBuffer(w.ELEMENT_ARRAY_BUFFER,w.createBuffer()),w.bufferData(w.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,0,2,3]),w.STATIC_DRAW),w.vertexAttribPointer(0,2,w.FLOAT,!1,0,0),w.enableVertexAttribArray(0),(e,t=!1)=>{null==e?(w.viewport(0,0,w.drawingBufferWidth,w.drawingBufferHeight),w.bindFramebuffer(w.FRAMEBUFFER,null)):(w.viewport(0,0,e.width,e.height),w.bindFramebuffer(w.FRAMEBUFFER,e.fbo)),t&&(w.clearColor(0,0,0,1),w.clear(w.COLOR_BUFFER_BIT)),w.drawElements(w.TRIANGLES,6,w.UNSIGNED_SHORT,0)}),j=new b(U,z),H=new b(U,B),V=new b(U,C),k=new b(U,P),W=new b(U,I),K=new b(U,M),q=new b(U,X),Z=new b(U,G),$=new b(U,O),J=new class{vertexShader;fragmentShaderSource;programs;activeProgram;uniforms;constructor(e,t){this.vertexShader=e,this.fragmentShaderSource=t,this.programs=[],this.activeProgram=null,this.uniforms={}}setKeywords(e){let t=0;for(let r=0;r<e.length;r++)t+=function(e){if(0===e.length)return 0;let t=0;for(let r=0;r<e.length;r++)t=(t<<5)-t+e.charCodeAt(r)|0;return t}(e[r]);let r=this.programs[t];if(null==r){let i=L(w.FRAGMENT_SHADER,this.fragmentShaderSource,e);r=A(this.vertexShader,i),this.programs[t]=r}r!==this.activeProgram&&(this.uniforms=F(r),this.activeProgram=r)}bind(){w.useProgram(this.activeProgram)}}(U,N);function Q(){let e=ec(R.SIM_RESOLUTION),i=ec(R.DYE_RESOLUTION),n=S.halfFloatTexType,a=S.formatRGBA,u=S.formatRG,l=S.formatR,c=S.supportLinearFiltering?w.LINEAR:w.NEAREST;if(w.disable(w.BLEND),!a||!u||!l)throw Error("Float WebGL textures not supported");t=t?er(t,i.width,i.height,a.internalFormat,a.format,n,c):et(i.width,i.height,a.internalFormat,a.format,n,c),r=r?er(r,e.width,e.height,u.internalFormat,u.format,n,c):et(e.width,e.height,u.internalFormat,u.format,n,c),o=ee(e.width,e.height,l.internalFormat,l.format,n,w.NEAREST),m=ee(e.width,e.height,l.internalFormat,l.format,n,w.NEAREST),x=et(e.width,e.height,l.internalFormat,l.format,n,w.NEAREST)}function ee(e,t,r,i,o,n){w.activeTexture(w.TEXTURE0);let a=w.createTexture();w.bindTexture(w.TEXTURE_2D,a),w.texParameteri(w.TEXTURE_2D,w.TEXTURE_MIN_FILTER,n),w.texParameteri(w.TEXTURE_2D,w.TEXTURE_MAG_FILTER,n),w.texParameteri(w.TEXTURE_2D,w.TEXTURE_WRAP_S,w.CLAMP_TO_EDGE),w.texParameteri(w.TEXTURE_2D,w.TEXTURE_WRAP_T,w.CLAMP_TO_EDGE),w.texImage2D(w.TEXTURE_2D,0,r,e,t,0,i,o,null);let u=w.createFramebuffer();w.bindFramebuffer(w.FRAMEBUFFER,u),w.framebufferTexture2D(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_2D,a,0),w.viewport(0,0,e,t),w.clear(w.COLOR_BUFFER_BIT);let l=1/e,c=1/t;return{texture:a,fbo:u,width:e,height:t,texelSizeX:l,texelSizeY:c,attach:e=>(w.activeTexture(w.TEXTURE0+e),w.bindTexture(w.TEXTURE_2D,a),e)}}function et(e,t,r,i,o,n){let a=ee(e,t,r,i,o,n),u=ee(e,t,r,i,o,n);return{width:e,height:t,texelSizeX:a.texelSizeX,texelSizeY:a.texelSizeY,get read(){return a},set read(value){a=value},get write(){return u},set write(value){u=value},swap(){let e=a;a=u,u=e}}}function er(e,t,r,i,o,n,a){var u;let l;return e.width===t&&e.height===r?e:(u=e.read,l=ee(t,r,i,o,n,a),j.bind(),w.uniform1i(j.uniforms.uTexture,u.attach(0)),Y(l),e.read=l,e.write=ee(t,r,i,o,n,a),e.width=t,e.height=r,e.texelSizeX=1/t,e.texelSizeY=1/r,e)}p=[],R.SHADING&&p.push("SHADING"),J.setKeywords(p),Q();let ei=Date.now(),eo=0;function en(e,i,o,n,a){var u;let l;V.bind(),w.uniform1i(V.uniforms.uTarget,r.read.attach(0)),w.uniform1f(V.uniforms.aspectRatio,E.width/E.height),w.uniform2f(V.uniforms.point,e,i),w.uniform3f(V.uniforms.color,o,n,0),w.uniform1f(V.uniforms.radius,(u=R.SPLAT_RADIUS/100,(l=E.width/E.height)>1&&(u*=l),u)),Y(r.write),r.swap(),w.uniform1i(V.uniforms.uTarget,t.read.attach(0)),w.uniform3f(V.uniforms.color,a.r,a.g,a.b),Y(t.write),t.swap()}function ea(e,t,r,i){e.id=t,e.down=!0,e.moved=!1,e.texcoordX=r/E.width,e.texcoordY=1-i/E.height,e.prevTexcoordX=e.texcoordX,e.prevTexcoordY=e.texcoordY,e.deltaX=0,e.deltaY=0,e.color=el()}function eu(e,t,r,i){var o,n;let a,u;e.prevTexcoordX=e.texcoordX,e.prevTexcoordY=e.texcoordY,e.texcoordX=t/E.width,e.texcoordY=1-r/E.height,o=e.texcoordX-e.prevTexcoordX,(a=E.width/E.height)<1&&(o*=a),e.deltaX=o,n=e.texcoordY-e.prevTexcoordY,(u=E.width/E.height)>1&&(n/=u),e.deltaY=n,e.moved=Math.abs(e.deltaX)>0||Math.abs(e.deltaY)>0,e.color=i}function el(){let e=function(e,t,r){let i=0,o=0,n=0,a,u,l,c,s;switch(a=Math.floor(6*e),u=6*e-a,l=0,c=+(1-u),s=+(1-(1-u)*1),a%6){case 0:i=1,o=s,n=l;break;case 1:i=c,o=1,n=l;break;case 2:i=l,o=1,n=s;break;case 3:i=l,o=c,n=1;break;case 4:i=s,o=l,n=1;break;case 5:i=1,o=l,n=c}return{r:i,g:o,b:n}}(Math.random(),1,1);return e.r*=.15,e.g*=.15,e.b*=.15,e}function ec(e){let t=w.drawingBufferWidth/w.drawingBufferHeight;t<1&&(t=1/t);let r=Math.round(e),i=Math.round(e*t);return w.drawingBufferWidth>w.drawingBufferHeight?{width:i,height:r}:{width:r,height:i}}function es(e){return Math.floor(e*(window.devicePixelRatio||1))}function ev(e){let t,r,i,o=y[0];ea(o,-1,es(e.clientX),es(e.clientY)),t=el(),t.r*=10,t.g*=10,t.b*=10,r=10*(Math.random()-.5),i=30*(Math.random()-.5),en(o.texcoordX,o.texcoordY,r,i,t)}let ed=!1;function ef(e){let t=y[0],r=es(e.clientX),i=es(e.clientY);ed?eu(t,r,i,t.color):(eu(t,r,i,el()),ed=!0)}function em(e){let t=e.targetTouches,r=y[0];for(let e=0;e<t.length;e++){let i=es(t[e].clientX),o=es(t[e].clientY);ea(r,t[e].identifier,i,o)}}function ex(e){let t=e.targetTouches,r=y[0];for(let e=0;e<t.length;e++)eu(r,es(t[e].clientX),es(t[e].clientY),r.color)}function eh(e){let t=e.changedTouches,r=y[0];for(let e=0;e<t.length;e++)r.down=!1}return window.addEventListener("mousedown",ev),window.addEventListener("mousemove",ef),window.addEventListener("touchstart",em),window.addEventListener("touchmove",ex,!1),window.addEventListener("touchend",eh),!function e(){var i,n,a,u,l;let c,s,v,d,f,h,p;if(!T)return;let D=(s=Math.min(s=((c=Date.now())-ei)/1e3,.016666),ei=c,s);v=es(E.clientWidth),d=es(E.clientHeight),(E.width!==v||E.height!==d)&&(E.width=v,E.height=d,1)&&Q(),i=D,R.COLOR_UPDATE_SPEED&&(eo+=i*R.COLOR_UPDATE_SPEED)>=1&&(n=eo,a=0,eo=0==(f=1)?0:(n-0)%f+0,y.forEach(e=>{e.color=el()})),y.forEach(e=>{var t;let r,i;e.moved&&(e.moved=!1,r=(t=e).deltaX*R.SPLAT_FORCE,i=t.deltaY*R.SPLAT_FORCE,en(t.texcoordX,t.texcoordY,r,i,t.color))}),function(e){w.disable(w.BLEND),K.bind(),w.uniform2f(K.uniforms.texelSize,r.texelSizeX,r.texelSizeY),w.uniform1i(K.uniforms.uVelocity,r.read.attach(0)),Y(m),q.bind(),w.uniform2f(q.uniforms.texelSize,r.texelSizeX,r.texelSizeY),w.uniform1i(q.uniforms.uVelocity,r.read.attach(0)),w.uniform1i(q.uniforms.uCurl,m.attach(1)),w.uniform1f(q.uniforms.curl,R.CURL),w.uniform1f(q.uniforms.dt,e),Y(r.write),r.swap(),W.bind(),w.uniform2f(W.uniforms.texelSize,r.texelSizeX,r.texelSizeY),w.uniform1i(W.uniforms.uVelocity,r.read.attach(0)),Y(o),H.bind(),w.uniform1i(H.uniforms.uTexture,x.read.attach(0)),w.uniform1f(H.uniforms.value,R.PRESSURE),Y(x.write),x.swap(),Z.bind(),w.uniform2f(Z.uniforms.texelSize,r.texelSizeX,r.texelSizeY),w.uniform1i(Z.uniforms.uDivergence,o.attach(0));for(let e=0;e<R.PRESSURE_ITERATIONS;e++)w.uniform1i(Z.uniforms.uPressure,x.read.attach(1)),Y(x.write),x.swap();$.bind(),w.uniform2f($.uniforms.texelSize,r.texelSizeX,r.texelSizeY),w.uniform1i($.uniforms.uPressure,x.read.attach(0)),w.uniform1i($.uniforms.uVelocity,r.read.attach(1)),Y(r.write),r.swap(),k.bind(),w.uniform2f(k.uniforms.texelSize,r.texelSizeX,r.texelSizeY),S.supportLinearFiltering||w.uniform2f(k.uniforms.dyeTexelSize,r.texelSizeX,r.texelSizeY);let i=r.read.attach(0);w.uniform1i(k.uniforms.uVelocity,i),w.uniform1i(k.uniforms.uSource,i),w.uniform1f(k.uniforms.dt,e),w.uniform1f(k.uniforms.dissipation,R.VELOCITY_DISSIPATION),Y(r.write),r.swap(),S.supportLinearFiltering||w.uniform2f(k.uniforms.dyeTexelSize,t.texelSizeX,t.texelSizeY),w.uniform1i(k.uniforms.uVelocity,r.read.attach(0)),w.uniform1i(k.uniforms.uSource,t.read.attach(1)),w.uniform1f(k.uniforms.dissipation,R.DENSITY_DISSIPATION),Y(t.write),t.swap()}(D),u=null,w.blendFunc(w.ONE,w.ONE_MINUS_SRC_ALPHA),w.enable(w.BLEND),h=(l=null,w.drawingBufferWidth),p=null==l?w.drawingBufferHeight:l.height,J.bind(),R.SHADING&&w.uniform2f(J.uniforms.texelSize,1/h,1/p),w.uniform1i(J.uniforms.uTexture,t.read.attach(0)),Y(l),g.current=requestAnimationFrame(e)}(),()=>{T=!1,g.current&&(cancelAnimationFrame(g.current),g.current=null),window.removeEventListener("mousedown",ev),window.removeEventListener("mousemove",ef),window.removeEventListener("touchstart",em),window.removeEventListener("touchmove",ex),window.removeEventListener("touchend",eh)}},[]),(0,t.jsx)("div",{style:{position:"fixed",top:0,left:0,zIndex:50,pointerEvents:"none",width:"100%",height:"100%"},children:(0,t.jsx)("canvas",{ref:h,id:"fluid",style:{width:"100vw",height:"100vh",display:"block"}})})}])},72026,e=>{"use strict";var t=e.i(43476),r=e.i(71645),i=e.i(75056),o=e.i(71753),n=e.i(31067),a=e.i(90072);class u extends a.MeshPhysicalMaterial{constructor(e={}){super(e),this.setValues(e),this._time={value:0},this._distort={value:.4},this._radius={value:1}}onBeforeCompile(e){e.uniforms.time=this._time,e.uniforms.radius=this._radius,e.uniforms.distort=this._distort,e.vertexShader=`
      uniform float time;
      uniform float radius;
      uniform float distort;
      #define GLSLIFY 1
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}float snoise(vec3 v){const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;i=mod289(i);vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));}
      ${e.vertexShader}
    `,e.vertexShader=e.vertexShader.replace("#include <begin_vertex>",`
        float updateTime = time / 50.0;
        float noise = snoise(vec3(position / 2.0 + updateTime * 5.0));
        vec3 transformed = vec3(position * (noise * pow(distort, 2.0) + radius));
        `)}get time(){return this._time.value}set time(e){this._time.value=e}get distort(){return this._distort.value}set distort(e){this._distort.value=e}get radius(){return this._radius.value}set radius(e){this._radius.value=e}}let l=r.forwardRef(({speed:e=1,...t},i)=>{let[a]=r.useState(()=>new u);return(0,o.useFrame)(t=>a&&(a.time=t.clock.elapsedTime*e)),r.createElement("primitive",(0,n.default)({object:a,ref:i,attach:"material"},t))}),c=r.forwardRef(({args:e,children:t,...i},o)=>{let a=r.useRef(null);return r.useImperativeHandle(o,()=>a.current),r.useLayoutEffect(()=>void 0),r.createElement("mesh",(0,n.default)({ref:a},i),r.createElement("sphereGeometry",{attach:"geometry",args:e}),t)}),s=r.forwardRef(({children:e,enabled:t=!0,speed:i=1,rotationIntensity:n=1,floatIntensity:u=1,floatingRange:l=[-.1,.1],autoInvalidate:c=!1,...s},v)=>{let d=r.useRef(null);r.useImperativeHandle(v,()=>d.current,[]);let f=r.useRef(1e4*Math.random());return(0,o.useFrame)(e=>{var r,o;if(!t||0===i)return;c&&e.invalidate();let s=f.current+e.clock.elapsedTime;d.current.rotation.x=Math.cos(s/4*i)/8*n,d.current.rotation.y=Math.sin(s/4*i)/8*n,d.current.rotation.z=Math.sin(s/4*i)/20*n;let v=Math.sin(s/4*i)/10;v=a.MathUtils.mapLinear(v,-.1,.1,null!=(r=null==l?void 0:l[0])?r:-.1,null!=(o=null==l?void 0:l[1])?o:.1),d.current.position.y=v*u,d.current.updateMatrix()}),r.createElement("group",s,r.createElement("group",{ref:d,matrixAutoUpdate:!1},e))}),v=()=>{let e=(0,r.useRef)(null),[i,n]=(0,r.useState)(.4),[u,v]=(0,r.useState)(2),d=(0,r.useRef)({x:0,y:0});return(0,r.useEffect)(()=>{let e=e=>{d.current={x:e.clientX/window.innerWidth*2-1,y:-(2*(e.clientY/window.innerHeight))+1}},t=()=>{let e=window.scrollY/(document.documentElement.scrollHeight-window.innerHeight);n(.4+.6*e),v(2+4*e)};return window.addEventListener("mousemove",e),window.addEventListener("scroll",t),()=>{window.removeEventListener("mousemove",e),window.removeEventListener("scroll",t)}},[]),(0,o.useFrame)(t=>{e.current&&(e.current.rotation.x+=.005,e.current.rotation.y+=.005,e.current.position.x=a.MathUtils.lerp(e.current.position.x,.5*d.current.x,.1),e.current.position.y=a.MathUtils.lerp(e.current.position.y,.5*d.current.y,.1))}),(0,t.jsx)(s,{speed:u,rotationIntensity:2,floatIntensity:2,children:(0,t.jsx)(c,{ref:e,args:[1,64,64],children:(0,t.jsx)(l,{color:"#10b981",speed:u,distort:i,radius:1})})})},d=()=>{let[e,i]=(0,r.useState)("SYNCED"),[o,n]=(0,r.useState)(42);return(0,r.useEffect)(()=>{let e=setInterval(()=>{let e=["SYNCED","ANALYZING","PROCESSING","STABLE","OPTIMIZING"];i(e[Math.floor(Math.random()*e.length)]),n(Math.floor(60*Math.random())+20)},3e3);return()=>clearInterval(e)},[]),(0,t.jsxs)("div",{className:"absolute top-0 left-0 w-full h-full pointer-events-none flex flex-col justify-end p-3 md:p-6 font-mono text-[8px] md:text-[10px] text-emerald-500/80 uppercase tracking-widest md:tracking-[0.2em]",children:[(0,t.jsxs)("div",{className:"flex justify-between items-end border-b border-emerald-500/20 pb-1 md:pb-2 mb-1 md:mb-2",children:[(0,t.jsxs)("div",{children:[(0,t.jsxs)("div",{className:"flex items-center gap-1 md:gap-2",children:[(0,t.jsx)("span",{className:"w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-emerald-500 animate-pulse"}),"AI CORE"]}),(0,t.jsxs)("div",{className:"hidden sm:block",children:["STATUS: ",e]})]}),(0,t.jsxs)("div",{className:"text-right",children:[(0,t.jsxs)("div",{children:["LOAD: ",o,"%"]}),(0,t.jsx)("div",{className:"hidden sm:block",children:"LATENCY: 12ms"})]})]}),(0,t.jsxs)("div",{className:"flex justify-between text-[6px] md:text-[8px] text-emerald-500/40",children:[(0,t.jsx)("div",{className:"truncate",children:"LINK_ESTABLISHED"}),(0,t.jsx)("div",{className:"hidden sm:block",children:"SECURE_ACTIVE"})]})]})};function f(){return(0,t.jsxs)("div",{className:"fixed bottom-4 right-4 md:bottom-8 md:right-8 w-24 h-24 md:w-48 md:h-48 z-[100] group cursor-pointer",children:[(0,t.jsx)("div",{className:"absolute inset-0 bg-emerald-500/5 rounded-full blur-2xl md:blur-3xl group-hover:bg-emerald-500/10 transition-colors duration-700"}),(0,t.jsxs)(i.Canvas,{camera:{position:[0,0,4],fov:45},children:[(0,t.jsx)("ambientLight",{intensity:.5}),(0,t.jsx)("pointLight",{position:[10,10,10],intensity:1,color:"#10b981"}),(0,t.jsx)(v,{})]}),(0,t.jsx)(d,{}),(0,t.jsx)("div",{className:"absolute inset-0 border border-emerald-500/10 rounded-full scale-110 group-hover:scale-125 transition-transform duration-1000"}),(0,t.jsx)("div",{className:"absolute inset-0 border border-emerald-500/5 rounded-full scale-125 group-hover:scale-150 transition-transform duration-1000"})]})}e.s(["default",()=>f],72026)}]);