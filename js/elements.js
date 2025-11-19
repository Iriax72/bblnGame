export function createGround(scene) {
    
}

export function createCamera(scene, player) {
    const camera = new BABYLON.ArcRoatateCamera(
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