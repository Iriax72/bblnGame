// Functions:
async function loadGroundShaders() {
    const vertexShader = await fetch("shader/ground.vs.glsl").then(r => r.text());
    const fragmentShader = await fetch("shader/ground.fs.glsl").then(r => r.text());

    BABYLON.Effect.shaderStore["terrainVertexShader"] = vertexShader;
    BABYLON.Effect.shaderStore["terrainFragmentShader"] = fragmentShader;
}

// Light :
export function createLight(scene) {
    const light = new BABYLON.HemisphericLight(
        "light",
        new BABYLON.Vector3(0.1, 1, 0.3),
        scene
    )
    light.intensity = 0.7;
    return light;
}

// Ground :
export function createGround(scene, subdivisions) {
    const ground = BABYLON.MeshBuilder.CreateGroundFromHeightMap(
        "ground",
        "assets/images/heightmap.png",
        {
            width: 200,
            height: 200,
            subdivisions: subdivisions,
            minHeight: -4,
            maxHeight: 10,
            updatable: false,  
            onReady: async (mesh) => {
                await loadGroundShaders();
                applyTexture(
                    mesh, 
                    [
                        "assets/images/rocktexture.png",
                        "assets/images/grasstexture.png",
                        "assets/images/snowtexture.png"
                    ],
                    scene
                );
            }
        },
        scene
    );
    return ground;
}

// Player :
export function createPlayer(scene) {
    const player = new BABYLON.MeshBuilder.CreateBox("player", {size: 2}, scene);
    return player;
}

// Camera:
export function createCamera(scene, player) {
    const camera = new BABYLON.ArcRotateCamera(
        "camera",
        Math.PI/2,
        Math.PI/4,
        15,
        player.position.add(new BABYLON.Vector3(0, 1, 0)),
        scene
    );
    camera.attachControl();
    camera.lowerRadiusLimit = camera.radius;
    camera.upperRadiusLimit = camera.radius;
    camera.panningSensibility = 0;
    camera.lowerBetaLimit = -Math.PI/6;
    camera.upperBetaLimit = Math.PI/2;
    return camera;
}

// Fonctions: 
function applyTexture(mesh, url, scene) {
    const material = new BABYLON.ShaderMaterial(mesh.name + "Material", scene, {
        vertex: "terrain",
        fragment: "terrain"
    }, 
    {
        attributs: ["position", "uv"],
        uniforms: ["world", "worldViewProjection", "grassStart", "snowStart"],
        samplers: ["rockTexture", "grassTexture", "snowTexture"]
    });

    // Attraper les erreurs (temporaire):
    material.onError = function(effect, errors) {
        console.error("ShaderMaterial error:", errors);
        alert("Erreur dans le ShaderMaterial:\n\n" + errors);
    };


    material.setTexture("rockTexture", new BABYLON.Texture(url[0], scene));
    material.setTexture("grassTexture", new BABYLON.Texture(url[1], scene));
    material.setTexture("snowTexture", new BABYLON.Texture(url[2], scene));

    material.setFloat("grassStart", 0.0);
    material.setFloat("snowStart", 6.0);
    /*const texture = new BABYLON.Texture(url, scene);
    texture.wrapU = BABYLON.Texture.MIRROR_ADRESSMODE;
    texture.wrapV = BABYLON.Texture.MIRROR_ADRESSMODE;
    texture.uScale = 40;
    texture.vScale = 40;
    const material = new BABYLON.StandardMaterial(mesh.name + "Material", scene);
    material.diffuseTexture = texture;
    */
    mesh.material = material;
}