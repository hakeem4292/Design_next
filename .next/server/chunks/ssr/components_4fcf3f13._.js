module.exports=[64665,a=>{"use strict";var b=a.i(87924),c=a.i(72131);a.s(["default",0,function({SIM_RESOLUTION:a=128,DYE_RESOLUTION:d=1440,CAPTURE_RESOLUTION:e=512,DENSITY_DISSIPATION:f=3.5,VELOCITY_DISSIPATION:g=2,PRESSURE:h=.1,PRESSURE_ITERATIONS:i=20,CURL:j=3,SPLAT_RADIUS:k=.2,SPLAT_FORCE:l=6e3,SHADING:m=!0,COLOR_UPDATE_SPEED:n=10,BACK_COLOR:o={r:.5,g:0,b:0},TRANSPARENT:p=!0}){let q=(0,c.useRef)(null),r=(0,c.useRef)(null);return(0,c.useEffect)(()=>{let b,c,e,o,p,s;if(!q.current)return;let t=q.current,u=!0,v={SIM_RESOLUTION:a,DYE_RESOLUTION:d,DENSITY_DISSIPATION:f,VELOCITY_DISSIPATION:g,PRESSURE:h,PRESSURE_ITERATIONS:i,CURL:j,SPLAT_RADIUS:k,SPLAT_FORCE:l,SHADING:m,COLOR_UPDATE_SPEED:n},w=[new class{id=-1;texcoordX=0;texcoordY=0;prevTexcoordX=0;prevTexcoordY=0;deltaX=0;deltaY=0;down=!1;moved=!1;color={r:0,g:0,b:0}}],{gl:x,ext:y}=function(a){let b,c,d,e,f,g={alpha:!0,depth:!1,stencil:!1,antialias:!1,preserveDrawingBuffer:!1},h=a.getContext("webgl2",g)||a.getContext("webgl",g)||a.getContext("experimental-webgl",g);if(!h)throw Error("WebGL not supported");z(h)?(h.getExtension("EXT_color_buffer_float"),c=h.getExtension("OES_texture_float_linear")):(b=h.getExtension("OES_texture_half_float"),c=h.getExtension("OES_texture_half_float_linear")),h.clearColor(0,0,0,1);let i=z(h)?h.HALF_FLOAT:b&&b.HALF_FLOAT_OES;return z(h)?(d=A(h,h.RGBA16F,h.RGBA,i),e=A(h,h.RG16F,h.RG,i),f=A(h,h.R16F,h.RED,i)):(d=A(h,h.RGBA,h.RGBA,i),e=A(h,h.RGBA,h.RGBA,i),f=A(h,h.RGBA,h.RGBA,i)),{gl:h,ext:{formatRGBA:d,formatRG:e,formatR:f,halfFloatTexType:i,supportLinearFiltering:c}}}(t);function z(a){return a instanceof WebGL2RenderingContext}function A(a,b,c,d){var e,f,g,h;let i,j;if(e=a,f=b,g=c,h=d,i=e.createTexture(),e.bindTexture(e.TEXTURE_2D,i),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,f,4,4,0,g,h,null),j=e.createFramebuffer(),e.bindFramebuffer(e.FRAMEBUFFER,j),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,i,0),e.checkFramebufferStatus(e.FRAMEBUFFER)!==e.FRAMEBUFFER_COMPLETE)switch(b){case a.R16F:return A(a,a.RG16F,a.RG,d);case a.RG16F:return A(a,a.RGBA16F,a.RGBA,d);default:return null}return{internalFormat:b,format:c}}z(x)||y.supportLinearFiltering||(v.DYE_RESOLUTION=256,v.SHADING=!1);class B{uniforms;program;constructor(a,b){this.uniforms={},this.program=C(a,b),this.uniforms=D(this.program)}bind(){x.useProgram(this.program)}}function C(a,b){let c=x.createProgram();if(!c)throw Error("Failed to create program");return x.attachShader(c,a),x.attachShader(c,b),x.linkProgram(c),x.getProgramParameter(c,x.LINK_STATUS)||console.trace(x.getProgramInfoLog(c)),c}function D(a){let b={},c=x.getProgramParameter(a,x.ACTIVE_UNIFORMS);for(let d=0;d<c;d++){let c=x.getActiveUniform(a,d);if(c){let d=c.name;b[d]=x.getUniformLocation(a,d)}}return b}function E(a,b,c){b=function(a,b){if(!b)return a;let c="";return b.forEach(a=>{c+="#define "+a+"\n"}),c+a}(b,c);let d=x.createShader(a);if(!d)throw Error("Failed to create shader");return x.shaderSource(d,b),x.compileShader(d),x.getShaderParameter(d,x.COMPILE_STATUS)||console.trace(x.getShaderInfoLog(d)),d}let F=E(x.VERTEX_SHADER,`
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
      `),G=E(x.FRAGMENT_SHADER,`
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        uniform sampler2D uTexture;

        void main () {
            gl_FragColor = texture2D(uTexture, vUv);
        }
      `),H=E(x.FRAGMENT_SHADER,`
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        uniform sampler2D uTexture;
        uniform float value;

        void main () {
            gl_FragColor = value * texture2D(uTexture, vUv);
        }
      `),I=`
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
    `,J=E(x.FRAGMENT_SHADER,`
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
      `),K=E(x.FRAGMENT_SHADER,`
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
      `,y.supportLinearFiltering?void 0:["MANUAL_FILTERING"]),L=E(x.FRAGMENT_SHADER,`
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
      `),M=E(x.FRAGMENT_SHADER,`
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
      `),N=E(x.FRAGMENT_SHADER,`
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
      `),O=E(x.FRAGMENT_SHADER,`
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
      `),P=E(x.FRAGMENT_SHADER,`
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
      `),Q=(x.bindBuffer(x.ARRAY_BUFFER,x.createBuffer()),x.bufferData(x.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),x.STATIC_DRAW),x.bindBuffer(x.ELEMENT_ARRAY_BUFFER,x.createBuffer()),x.bufferData(x.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,0,2,3]),x.STATIC_DRAW),x.vertexAttribPointer(0,2,x.FLOAT,!1,0,0),x.enableVertexAttribArray(0),(a,b=!1)=>{null==a?(x.viewport(0,0,x.drawingBufferWidth,x.drawingBufferHeight),x.bindFramebuffer(x.FRAMEBUFFER,null)):(x.viewport(0,0,a.width,a.height),x.bindFramebuffer(x.FRAMEBUFFER,a.fbo)),b&&(x.clearColor(0,0,0,1),x.clear(x.COLOR_BUFFER_BIT)),x.drawElements(x.TRIANGLES,6,x.UNSIGNED_SHORT,0)}),R=new B(F,G),S=new B(F,H),T=new B(F,J),U=new B(F,K),V=new B(F,L),W=new B(F,M),X=new B(F,N),Y=new B(F,O),Z=new B(F,P),$=new class{vertexShader;fragmentShaderSource;programs;activeProgram;uniforms;constructor(a,b){this.vertexShader=a,this.fragmentShaderSource=b,this.programs=[],this.activeProgram=null,this.uniforms={}}setKeywords(a){let b=0;for(let c=0;c<a.length;c++)b+=function(a){if(0===a.length)return 0;let b=0;for(let c=0;c<a.length;c++)b=(b<<5)-b+a.charCodeAt(c)|0;return b}(a[c]);let c=this.programs[b];if(null==c){let d=E(x.FRAGMENT_SHADER,this.fragmentShaderSource,a);c=C(this.vertexShader,d),this.programs[b]=c}c!==this.activeProgram&&(this.uniforms=D(c),this.activeProgram=c)}bind(){x.useProgram(this.activeProgram)}}(F,I);function _(){let a=aj(v.SIM_RESOLUTION),d=aj(v.DYE_RESOLUTION),f=y.halfFloatTexType,g=y.formatRGBA,h=y.formatRG,i=y.formatR,j=y.supportLinearFiltering?x.LINEAR:x.NEAREST;if(x.disable(x.BLEND),!g||!h||!i)throw Error("Float WebGL textures not supported");b=b?ac(b,d.width,d.height,g.internalFormat,g.format,f,j):ab(d.width,d.height,g.internalFormat,g.format,f,j),c=c?ac(c,a.width,a.height,h.internalFormat,h.format,f,j):ab(a.width,a.height,h.internalFormat,h.format,f,j),e=aa(a.width,a.height,i.internalFormat,i.format,f,x.NEAREST),o=aa(a.width,a.height,i.internalFormat,i.format,f,x.NEAREST),p=ab(a.width,a.height,i.internalFormat,i.format,f,x.NEAREST)}function aa(a,b,c,d,e,f){x.activeTexture(x.TEXTURE0);let g=x.createTexture();x.bindTexture(x.TEXTURE_2D,g),x.texParameteri(x.TEXTURE_2D,x.TEXTURE_MIN_FILTER,f),x.texParameteri(x.TEXTURE_2D,x.TEXTURE_MAG_FILTER,f),x.texParameteri(x.TEXTURE_2D,x.TEXTURE_WRAP_S,x.CLAMP_TO_EDGE),x.texParameteri(x.TEXTURE_2D,x.TEXTURE_WRAP_T,x.CLAMP_TO_EDGE),x.texImage2D(x.TEXTURE_2D,0,c,a,b,0,d,e,null);let h=x.createFramebuffer();x.bindFramebuffer(x.FRAMEBUFFER,h),x.framebufferTexture2D(x.FRAMEBUFFER,x.COLOR_ATTACHMENT0,x.TEXTURE_2D,g,0),x.viewport(0,0,a,b),x.clear(x.COLOR_BUFFER_BIT);let i=1/a,j=1/b;return{texture:g,fbo:h,width:a,height:b,texelSizeX:i,texelSizeY:j,attach:a=>(x.activeTexture(x.TEXTURE0+a),x.bindTexture(x.TEXTURE_2D,g),a)}}function ab(a,b,c,d,e,f){let g=aa(a,b,c,d,e,f),h=aa(a,b,c,d,e,f);return{width:a,height:b,texelSizeX:g.texelSizeX,texelSizeY:g.texelSizeY,get read(){return g},set read(value){g=value},get write(){return h},set write(value){h=value},swap(){let a=g;g=h,h=a}}}function ac(a,b,c,d,e,f,g){var h;let i;return a.width===b&&a.height===c?a:(h=a.read,i=aa(b,c,d,e,f,g),R.bind(),x.uniform1i(R.uniforms.uTexture,h.attach(0)),Q(i),a.read=i,a.write=aa(b,c,d,e,f,g),a.width=b,a.height=c,a.texelSizeX=1/b,a.texelSizeY=1/c,a)}s=[],v.SHADING&&s.push("SHADING"),$.setKeywords(s),_();let ad=Date.now(),ae=0;function af(a,d,e,f,g){var h;let i;T.bind(),x.uniform1i(T.uniforms.uTarget,c.read.attach(0)),x.uniform1f(T.uniforms.aspectRatio,t.width/t.height),x.uniform2f(T.uniforms.point,a,d),x.uniform3f(T.uniforms.color,e,f,0),x.uniform1f(T.uniforms.radius,(h=v.SPLAT_RADIUS/100,(i=t.width/t.height)>1&&(h*=i),h)),Q(c.write),c.swap(),x.uniform1i(T.uniforms.uTarget,b.read.attach(0)),x.uniform3f(T.uniforms.color,g.r,g.g,g.b),Q(b.write),b.swap()}function ag(a,b,c,d){a.id=b,a.down=!0,a.moved=!1,a.texcoordX=c/t.width,a.texcoordY=1-d/t.height,a.prevTexcoordX=a.texcoordX,a.prevTexcoordY=a.texcoordY,a.deltaX=0,a.deltaY=0,a.color=ai()}function ah(a,b,c,d){var e,f;let g,h;a.prevTexcoordX=a.texcoordX,a.prevTexcoordY=a.texcoordY,a.texcoordX=b/t.width,a.texcoordY=1-c/t.height,e=a.texcoordX-a.prevTexcoordX,(g=t.width/t.height)<1&&(e*=g),a.deltaX=e,f=a.texcoordY-a.prevTexcoordY,(h=t.width/t.height)>1&&(f/=h),a.deltaY=f,a.moved=Math.abs(a.deltaX)>0||Math.abs(a.deltaY)>0,a.color=d}function ai(){let a=function(a,b,c){let d=0,e=0,f=0,g,h,i,j,k;switch(g=Math.floor(6*a),h=6*a-g,i=0,j=+(1-h),k=+(1-(1-h)*1),g%6){case 0:d=1,e=k,f=i;break;case 1:d=j,e=1,f=i;break;case 2:d=i,e=1,f=k;break;case 3:d=i,e=j,f=1;break;case 4:d=k,e=i,f=1;break;case 5:d=1,e=i,f=j}return{r:d,g:e,b:f}}(Math.random(),1,1);return a.r*=.15,a.g*=.15,a.b*=.15,a}function aj(a){let b=x.drawingBufferWidth/x.drawingBufferHeight;b<1&&(b=1/b);let c=Math.round(a),d=Math.round(a*b);return x.drawingBufferWidth>x.drawingBufferHeight?{width:d,height:c}:{width:c,height:d}}function ak(a){return Math.floor(a*(window.devicePixelRatio||1))}function al(a){let b,c,d,e=w[0];ag(e,-1,ak(a.clientX),ak(a.clientY)),b=ai(),b.r*=10,b.g*=10,b.b*=10,c=10*(Math.random()-.5),d=30*(Math.random()-.5),af(e.texcoordX,e.texcoordY,c,d,b)}let am=!1;function an(a){let b=w[0],c=ak(a.clientX),d=ak(a.clientY);am?ah(b,c,d,b.color):(ah(b,c,d,ai()),am=!0)}function ao(a){let b=a.targetTouches,c=w[0];for(let a=0;a<b.length;a++){let d=ak(b[a].clientX),e=ak(b[a].clientY);ag(c,b[a].identifier,d,e)}}function ap(a){let b=a.targetTouches,c=w[0];for(let a=0;a<b.length;a++)ah(c,ak(b[a].clientX),ak(b[a].clientY),c.color)}function aq(a){let b=a.changedTouches,c=w[0];for(let a=0;a<b.length;a++)c.down=!1}return window.addEventListener("mousedown",al),window.addEventListener("mousemove",an),window.addEventListener("touchstart",ao),window.addEventListener("touchmove",ap,!1),window.addEventListener("touchend",aq),!function a(){var d,f,g,h,i;let j,k,l,m,n,q,s;if(!u)return;let z=(k=Math.min(k=((j=Date.now())-ad)/1e3,.016666),ad=j,k);l=ak(t.clientWidth),m=ak(t.clientHeight),(t.width!==l||t.height!==m)&&(t.width=l,t.height=m,1)&&_(),d=z,v.COLOR_UPDATE_SPEED&&(ae+=d*v.COLOR_UPDATE_SPEED)>=1&&(f=ae,g=0,ae=0==(n=1)?0:(f-0)%n+0,w.forEach(a=>{a.color=ai()})),w.forEach(a=>{var b;let c,d;a.moved&&(a.moved=!1,c=(b=a).deltaX*v.SPLAT_FORCE,d=b.deltaY*v.SPLAT_FORCE,af(b.texcoordX,b.texcoordY,c,d,b.color))}),function(a){x.disable(x.BLEND),W.bind(),x.uniform2f(W.uniforms.texelSize,c.texelSizeX,c.texelSizeY),x.uniform1i(W.uniforms.uVelocity,c.read.attach(0)),Q(o),X.bind(),x.uniform2f(X.uniforms.texelSize,c.texelSizeX,c.texelSizeY),x.uniform1i(X.uniforms.uVelocity,c.read.attach(0)),x.uniform1i(X.uniforms.uCurl,o.attach(1)),x.uniform1f(X.uniforms.curl,v.CURL),x.uniform1f(X.uniforms.dt,a),Q(c.write),c.swap(),V.bind(),x.uniform2f(V.uniforms.texelSize,c.texelSizeX,c.texelSizeY),x.uniform1i(V.uniforms.uVelocity,c.read.attach(0)),Q(e),S.bind(),x.uniform1i(S.uniforms.uTexture,p.read.attach(0)),x.uniform1f(S.uniforms.value,v.PRESSURE),Q(p.write),p.swap(),Y.bind(),x.uniform2f(Y.uniforms.texelSize,c.texelSizeX,c.texelSizeY),x.uniform1i(Y.uniforms.uDivergence,e.attach(0));for(let a=0;a<v.PRESSURE_ITERATIONS;a++)x.uniform1i(Y.uniforms.uPressure,p.read.attach(1)),Q(p.write),p.swap();Z.bind(),x.uniform2f(Z.uniforms.texelSize,c.texelSizeX,c.texelSizeY),x.uniform1i(Z.uniforms.uPressure,p.read.attach(0)),x.uniform1i(Z.uniforms.uVelocity,c.read.attach(1)),Q(c.write),c.swap(),U.bind(),x.uniform2f(U.uniforms.texelSize,c.texelSizeX,c.texelSizeY),y.supportLinearFiltering||x.uniform2f(U.uniforms.dyeTexelSize,c.texelSizeX,c.texelSizeY);let d=c.read.attach(0);x.uniform1i(U.uniforms.uVelocity,d),x.uniform1i(U.uniforms.uSource,d),x.uniform1f(U.uniforms.dt,a),x.uniform1f(U.uniforms.dissipation,v.VELOCITY_DISSIPATION),Q(c.write),c.swap(),y.supportLinearFiltering||x.uniform2f(U.uniforms.dyeTexelSize,b.texelSizeX,b.texelSizeY),x.uniform1i(U.uniforms.uVelocity,c.read.attach(0)),x.uniform1i(U.uniforms.uSource,b.read.attach(1)),x.uniform1f(U.uniforms.dissipation,v.DENSITY_DISSIPATION),Q(b.write),b.swap()}(z),h=null,x.blendFunc(x.ONE,x.ONE_MINUS_SRC_ALPHA),x.enable(x.BLEND),q=(i=null,x.drawingBufferWidth),s=null==i?x.drawingBufferHeight:i.height,$.bind(),v.SHADING&&x.uniform2f($.uniforms.texelSize,1/q,1/s),x.uniform1i($.uniforms.uTexture,b.read.attach(0)),Q(i),r.current=requestAnimationFrame(a)}(),()=>{u=!1,r.current&&(cancelAnimationFrame(r.current),r.current=null),window.removeEventListener("mousedown",al),window.removeEventListener("mousemove",an),window.removeEventListener("touchstart",ao),window.removeEventListener("touchmove",ap),window.removeEventListener("touchend",aq)}},[]),(0,b.jsx)("div",{style:{position:"fixed",top:0,left:0,zIndex:50,pointerEvents:"none",width:"100%",height:"100%"},children:(0,b.jsx)("canvas",{ref:q,id:"fluid",style:{width:"100vw",height:"100vh",display:"block"}})})}])},66918,a=>{"use strict";var b=a.i(87924),c=a.i(72131),d=a.i(10129),e=a.i(12303),f=a.i(39705),g=a.i(35258);class h extends g.MeshPhysicalMaterial{constructor(a={}){super(a),this.setValues(a),this._time={value:0},this._distort={value:.4},this._radius={value:1}}onBeforeCompile(a){a.uniforms.time=this._time,a.uniforms.radius=this._radius,a.uniforms.distort=this._distort,a.vertexShader=`
      uniform float time;
      uniform float radius;
      uniform float distort;
      #define GLSLIFY 1
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}float snoise(vec3 v){const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;i=mod289(i);vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));}
      ${a.vertexShader}
    `,a.vertexShader=a.vertexShader.replace("#include <begin_vertex>",`
        float updateTime = time / 50.0;
        float noise = snoise(vec3(position / 2.0 + updateTime * 5.0));
        vec3 transformed = vec3(position * (noise * pow(distort, 2.0) + radius));
        `)}get time(){return this._time.value}set time(a){this._time.value=a}get distort(){return this._distort.value}set distort(a){this._distort.value=a}get radius(){return this._radius.value}set radius(a){this._radius.value=a}}let i=c.forwardRef(({speed:a=1,...b},d)=>{let[g]=c.useState(()=>new h);return(0,e.useFrame)(b=>g&&(g.time=b.clock.elapsedTime*a)),c.createElement("primitive",(0,f.default)({object:g,ref:d,attach:"material"},b))}),j=c.forwardRef(({args:a,children:b,...d},e)=>{let g=c.useRef(null);return c.useImperativeHandle(e,()=>g.current),c.useLayoutEffect(()=>void 0),c.createElement("mesh",(0,f.default)({ref:g},d),c.createElement("sphereGeometry",{attach:"geometry",args:a}),b)}),k=c.forwardRef(({children:a,enabled:b=!0,speed:d=1,rotationIntensity:f=1,floatIntensity:h=1,floatingRange:i=[-.1,.1],autoInvalidate:j=!1,...k},l)=>{let m=c.useRef(null);c.useImperativeHandle(l,()=>m.current,[]);let n=c.useRef(1e4*Math.random());return(0,e.useFrame)(a=>{var c,e;if(!b||0===d)return;j&&a.invalidate();let k=n.current+a.clock.elapsedTime;m.current.rotation.x=Math.cos(k/4*d)/8*f,m.current.rotation.y=Math.sin(k/4*d)/8*f,m.current.rotation.z=Math.sin(k/4*d)/20*f;let l=Math.sin(k/4*d)/10;l=g.MathUtils.mapLinear(l,-.1,.1,null!=(c=null==i?void 0:i[0])?c:-.1,null!=(e=null==i?void 0:i[1])?e:.1),m.current.position.y=l*h,m.current.updateMatrix()}),c.createElement("group",k,c.createElement("group",{ref:m,matrixAutoUpdate:!1},a))}),l=()=>{let a=(0,c.useRef)(null),[d,f]=(0,c.useState)(.4),[h,l]=(0,c.useState)(2),m=(0,c.useRef)({x:0,y:0});return(0,c.useEffect)(()=>{let a=a=>{m.current={x:a.clientX/window.innerWidth*2-1,y:-(2*(a.clientY/window.innerHeight))+1}},b=()=>{let a=window.scrollY/(document.documentElement.scrollHeight-window.innerHeight);f(.4+.6*a),l(2+4*a)};return window.addEventListener("mousemove",a),window.addEventListener("scroll",b),()=>{window.removeEventListener("mousemove",a),window.removeEventListener("scroll",b)}},[]),(0,e.useFrame)(b=>{a.current&&(a.current.rotation.x+=.005,a.current.rotation.y+=.005,a.current.position.x=g.MathUtils.lerp(a.current.position.x,.5*m.current.x,.1),a.current.position.y=g.MathUtils.lerp(a.current.position.y,.5*m.current.y,.1))}),(0,b.jsx)(k,{speed:h,rotationIntensity:2,floatIntensity:2,children:(0,b.jsx)(j,{ref:a,args:[1,64,64],children:(0,b.jsx)(i,{color:"#10b981",speed:h,distort:d,radius:1})})})},m=()=>{let[a,d]=(0,c.useState)("SYNCED"),[e,f]=(0,c.useState)(42);return(0,c.useEffect)(()=>{let a=setInterval(()=>{let a=["SYNCED","ANALYZING","PROCESSING","STABLE","OPTIMIZING"];d(a[Math.floor(Math.random()*a.length)]),f(Math.floor(60*Math.random())+20)},3e3);return()=>clearInterval(a)},[]),(0,b.jsxs)("div",{className:"absolute top-0 left-0 w-full h-full pointer-events-none flex flex-col justify-end p-3 md:p-6 font-mono text-[8px] md:text-[10px] text-emerald-500/80 uppercase tracking-widest md:tracking-[0.2em]",children:[(0,b.jsxs)("div",{className:"flex justify-between items-end border-b border-emerald-500/20 pb-1 md:pb-2 mb-1 md:mb-2",children:[(0,b.jsxs)("div",{children:[(0,b.jsxs)("div",{className:"flex items-center gap-1 md:gap-2",children:[(0,b.jsx)("span",{className:"w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-emerald-500 animate-pulse"}),"AI CORE"]}),(0,b.jsxs)("div",{className:"hidden sm:block",children:["STATUS: ",a]})]}),(0,b.jsxs)("div",{className:"text-right",children:[(0,b.jsxs)("div",{children:["LOAD: ",e,"%"]}),(0,b.jsx)("div",{className:"hidden sm:block",children:"LATENCY: 12ms"})]})]}),(0,b.jsxs)("div",{className:"flex justify-between text-[6px] md:text-[8px] text-emerald-500/40",children:[(0,b.jsx)("div",{className:"truncate",children:"LINK_ESTABLISHED"}),(0,b.jsx)("div",{className:"hidden sm:block",children:"SECURE_ACTIVE"})]})]})};function n(){return(0,b.jsxs)("div",{className:"fixed bottom-4 right-4 md:bottom-8 md:right-8 w-24 h-24 md:w-48 md:h-48 z-[100] group cursor-pointer",children:[(0,b.jsx)("div",{className:"absolute inset-0 bg-emerald-500/5 rounded-full blur-2xl md:blur-3xl group-hover:bg-emerald-500/10 transition-colors duration-700"}),(0,b.jsxs)(d.Canvas,{camera:{position:[0,0,4],fov:45},children:[(0,b.jsx)("ambientLight",{intensity:.5}),(0,b.jsx)("pointLight",{position:[10,10,10],intensity:1,color:"#10b981"}),(0,b.jsx)(l,{})]}),(0,b.jsx)(m,{}),(0,b.jsx)("div",{className:"absolute inset-0 border border-emerald-500/10 rounded-full scale-110 group-hover:scale-125 transition-transform duration-1000"}),(0,b.jsx)("div",{className:"absolute inset-0 border border-emerald-500/5 rounded-full scale-125 group-hover:scale-150 transition-transform duration-1000"})]})}a.s(["default",()=>n],66918)}];

//# sourceMappingURL=components_4fcf3f13._.js.map