precision highp float;

varying vec2 vUV;
varying float vHeight;

uniform sampler2D rockTexture;
uniform sampler2D grassTexture;
uniform sampler2D snowTexture;

uniform float grassStart;
uniform float rockStart;

void main(void) {
    vec4 rock = texture2D(rockTexture, vUV);
    vec4 grass = texture2D(grassTexture, vUV);
    vec4 snow = texture2D(snowTexture, vUV);

    float wRock = 1.0 - smoothstep(0.0, grassStart, vHeight);
    float wGrass = smoothstep(grassStart - 1.0, grassStart + 1.0, vHeight) * (1.0 - smoothstep(snowStart - 1.0, snowStart + 1.0, vHeight));
    float wSnow = smoothstep(snowStart, snowStart + 2.0, vHeight);

    float sum = wRock + wGrass + wSnow;
    wRock /= sum;
    wGrass /= sum;
    wSnow /= sum;

    gl_FragColor = rock * wRock + grass * wGrass + snow * wSnow;
}