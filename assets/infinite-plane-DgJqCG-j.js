import{r as i,j as m}from"./index-BO3p5MRe.js";const N=`#version 300 es
precision mediump float;

uniform float u_time;
uniform vec2  u_resolution;
uniform float u_planeHeight;
uniform float u_epsilon;
uniform float u_speed;

out vec4 fragColor;

// Signed-distance function for an infinite plane at height h
float sdPlane(vec3 p, float h) {
  return p.y - h;
}

// Scene SDF: only the plane
float mapScene(vec3 p) {
  return sdPlane(p, u_planeHeight);
}

// Estimate normal via gradient
vec3 calcNormal(vec3 p) {
  vec2 e = vec2(u_epsilon, 0.0);
  return normalize(vec3(
    mapScene(p + e.xyy) - mapScene(p - e.xyy),
    mapScene(p + e.yxy) - mapScene(p - e.yxy),
    mapScene(p + e.yyx) - mapScene(p - e.yyx)
  ));
}

// Raymarch loop
float rayMarch(vec3 ro, vec3 rd) {
  float d = 0.0;
  for (int i = 0; i < 40; i++) {
    vec3 p = ro + rd * d;
    float dist = mapScene(p);
    if (dist < u_epsilon || d > 20.0) break;
    d += dist;
  }
  return d;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
  vec3 ro = vec3(0.0, u_planeHeight + 1.5, -1.5) * u_speed;
  vec3 rd = normalize(vec3(uv, 1.0));

  float d = rayMarch(ro, rd);
  vec3 color = vec3(0.0);

  if (d < 20.0) {
    vec3 p = ro + rd * d;
    vec3 n = calcNormal(p);
    vec3 lightDir = normalize(vec3(1.0, 1.0, -1.0));
    float diff = max(dot(n, lightDir), 0.0);

    // Moving checkered pattern
    float check = mod(floor(p.x) + floor(p.z - u_time * u_speed), 2.0);
    vec3 mat = mix(vec3(0.2), vec3(0.6), check);

    color = mat * diff;
  }

  fragColor = vec4(color, 1.0);
}
`,D=`
precision mediump float;

uniform float u_time;
uniform vec2  u_resolution;
uniform float u_planeHeight;
uniform float u_epsilon;
uniform float u_speed;

float sdPlane(vec3 p, float h) {
  return p.y - h;
}

float mapScene(vec3 p) {
  return sdPlane(p, u_planeHeight);
}

vec3 calcNormal(vec3 p) {
  vec2 e = vec2(u_epsilon, 0.0);
  return normalize(vec3(
    mapScene(p + e.xyy) - mapScene(p - e.xyy),
    mapScene(p + e.yxy) - mapScene(p - e.yxy),
    mapScene(p + e.yyx) - mapScene(p - e.yyx)
  ));
}

float rayMarch(vec3 ro, vec3 rd) {
  float d = 0.0;
  for (int i = 0; i < 40; i++) {
    vec3 p = ro + rd * d;
    float dist = mapScene(p);
    if (dist < u_epsilon || d > 20.0) break;
    d += dist;
  }
  return d;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
  vec3 ro = vec3(0.0, u_planeHeight + 1.5, -1.5) * u_speed;
  vec3 rd = normalize(vec3(uv, 1.0));

  float d = rayMarch(ro, rd);
  vec3 color = vec3(0.0);

  if (d < 20.0) {
    vec3 p = ro + rd * d;
    vec3 n = calcNormal(p);
    vec3 lightDir = normalize(vec3(1.0, 1.0, -1.0));
    float diff = max(dot(n, lightDir), 0.0);

    float check = mod(floor(p.x) + floor(p.z - u_time * u_speed), 2.0);
    vec3 mat = mix(vec3(0.2), vec3(0.6), check);

    color = mat * diff;
  }

  gl_FragColor = vec4(color, 1.0);
}
`,H=`#version 300 es
in vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}`,G=`
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}`,W=({planeHeight:p=0,epsilon:v=.001,speed:h=1,className:F="",ariaLabel:I="Infinite plane shader background"})=>{const g=i.useRef(null),_=i.useRef(!0),[S,a]=i.useState(null);return i.useEffect(()=>{const r=g.current;if(!r)return;const k=r.getContext("webgl2"),C=r.getContext("webgl")||r.getContext("experimental-webgl"),e=k||C;if(!e){a("WebGL not supported in this browser.");return}const y=e instanceof WebGL2RenderingContext;a(null);const x=(t,B)=>{const n=e.createShader(t);return e.shaderSource(n,B),e.compileShader(n),e.getShaderParameter(n,e.COMPILE_STATUS)?n:(console.error(e.getShaderInfoLog(n)),e.deleteShader(n),a("Shader compile error (see console)."),null)},T=y?H:G,z=y?N:D,c=x(e.VERTEX_SHADER,T),l=x(e.FRAGMENT_SHADER,z);if(!c||!l)return;const o=e.createProgram();if(e.attachShader(o,c),e.attachShader(o,l),e.linkProgram(o),!e.getProgramParameter(o,e.LINK_STATUS)){console.error(e.getProgramInfoLog(o)),a("Program link error (see console).");return}const s=e.getAttribLocation(o,"a_position"),b=e.getUniformLocation(o,"u_resolution"),L=e.getUniformLocation(o,"u_time"),R=e.getUniformLocation(o,"u_planeHeight"),A=e.getUniformLocation(o,"u_epsilon"),w=e.getUniformLocation(o,"u_speed");if(s<0||!b||!L||!R||!A||!w){a("Shader uniforms/attributes unavailable.");return}const U=new Float32Array([-1,-1,1,-1,-1,1,1,1]),f=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,f),e.bufferData(e.ARRAY_BUFFER,U,e.STATIC_DRAW);const u=()=>{const t=Math.min(window.devicePixelRatio||1,1);r.width=r.clientWidth*t,r.height=r.clientHeight*t,e.viewport(0,0,r.width,r.height)};window.addEventListener("resize",u),u();const P=new IntersectionObserver(([t])=>{_.current=t.isIntersecting},{threshold:0});P.observe(r);let d;const E=t=>{d=requestAnimationFrame(E),_.current&&(e.clear(e.COLOR_BUFFER_BIT),e.useProgram(o),e.enableVertexAttribArray(s),e.bindBuffer(e.ARRAY_BUFFER,f),e.vertexAttribPointer(s,2,e.FLOAT,!1,0,0),e.uniform2f(b,r.width,r.height),e.uniform1f(L,t*.001),e.uniform1f(R,p),e.uniform1f(A,v),e.uniform1f(w,h),e.drawArrays(e.TRIANGLE_STRIP,0,4))};return d=requestAnimationFrame(E),()=>{window.removeEventListener("resize",u),cancelAnimationFrame(d),P.disconnect(),e.deleteBuffer(f),e.deleteProgram(o),e.deleteShader(c),e.deleteShader(l)}},[p,v,h]),m.jsxs("div",{role:"region","aria-label":I,className:`relative w-full h-full overflow-hidden ${F}`,children:[m.jsx("canvas",{ref:g,className:"block w-full h-full"}),S&&m.jsx("div",{className:"absolute inset-0 bg-black/80 flex items-center justify-center text-foreground font-mono text-sm p-4",children:S})]})};export{W as default};
