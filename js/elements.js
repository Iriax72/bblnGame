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
    alert("début de la fonction ground")
    alert("Prochaine ligne: création du ground")
    const ground = BABYLON.MeshBuilder.CreateGroundFromHeightMap(
        "ground",
        "assets/images/heightmap.png",
        {
            width: 100,
            height: 100,
            subdivisions: subdivisions,
            minHeight: 0,
            maxHeight: 10,
            updatable: false,
            onError: (message) => {
                alert("erreur: " + message);
            },    
            onReady: (mesh) => {
                alert("callback execute!!")
                const material = new BABYLON.StandardMaterial("groundTexture", scene);
                material.diffuseTexture = new BABYLON.Texture("assets/images/groundtexture.png", scene);
                ground.material = material;
            }
        },
        scene
    );
    return ground;
}

// Player :
export function createPlayer(scene) {
    const player = new BABYLON.MeshBuilder.CreateBox("player", {size: 2}, scene);
    player.position.y = 1;
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