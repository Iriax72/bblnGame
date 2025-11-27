precision highp float;

attribute vec3 position;
attribute vec2 uv;

uniform mat4 worldViewProjection;

varying vec2 vUV;
varying float vHeight;

void main(void) {
    vHeight = position.y;
    vUV = uv * 10.0;
    gl_Position = worldViewProjection * vec4(position, 1.0);
}