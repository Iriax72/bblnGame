// Light :
export function createLight(scene) {
    const light = new BABYLON.HemisphericalLight(
        "light",
        new BABYLON.Vector3(0, 1, 0),
        scene
    )
    light.intensity = 0.7;
    return light;
}

// Ground :
export function createGround(scene) {
    
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
        10,
        player.position,
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