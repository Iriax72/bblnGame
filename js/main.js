import {createGround} from "./ground.js"

// const values
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const playerSpeed = 0.2;

// Canva
const canvas = document.querySelector("#renderCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Engine & Scene
const engine = new BABYLON.Engine(canvas, true);
const scene = new BABYLON.Scene(engine);

// Ground
createGround(scene);

// Player
const player = new BABYLON.MeshBuilder.CreateBox("player", {size: 2}, scene);

// Camera
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

// Player's movement
if (isMobile) {
    const inputs = new BABYLON.Vecteur2.Zero();
} else {
    const inputs = {};
    window.addEventListener("keydown", (event) => {
        inputs[event.key] = true;
    });
    window.addEventListener("keyup", (event) => {
        inputs[event.key] = false;
    });
}

function playerMovement(inputs) {
    if (isMobile) {
        
    } else {
        if (inputs["w"] || inputs["ArrowUp"]) player.position.z += playerSpeed;
        if (inputs["s"] || inputs["ArrowDown"]) player.position.z -= playerSpeed;
        if (inputs["a"] || inputs["ArrowLeft"]) player.position.x -= playerSpeed;
        if (inputs["d"] || inputs["ArrowRight"]) player.position.x -= playerSpeed;
    }
}

// Camera's movement
scene.registerBeforeRender(() => {
    camera.target = player.position.add(new BABYLON.Vector3(0, 2, 0));
})

// Main loop
engine.runRenderLoop(() => {
    playerMovement(inputs);
    scene.render();
});

// Resize
window.addEventListener("resize", ()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    engine.resize();
})