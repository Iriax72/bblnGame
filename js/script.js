const canvas = document.querySelector("#renderCanvas");
const engine = new BABYLON.Engine(canvas, true);
const scene = new BABYLON.Scene(engine);
const player = new BABYLON.MeshBuilder.CreateBox("player", {size: 2}, scene);
const camera = new BABYLON.ArcRotateCamera(
    "camera",
    Math.PI/2,
    Math.PI/4,
    10,
    player.position.add(new BABYLON.Vector3(0, 2, 0)),
    scene
);
camera.attachControl();
camera.lowerRadiusLimit = camera.upperRadiusLimit = camera.radius;
camera.panningSensibility = 0;
camera.lowerBetaLimit = -Math.PI/6;
camera.upperBetaLimit = Math.PI/2;

function gameLoop() {
    scene.render();
}

scene.registerBeforeRender(() => {
    camera.target = player.position.add(new BABYLON.Vector3(0, 2, 0));
})

engine.runRenderLoop(gameLoop);

window.addEventListener("resize", ()=>{engine.resize();})