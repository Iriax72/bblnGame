import {createGround, createCamera} from "./elements.js"

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
const ground = createGround(scene);

// Player
const player = new BABYLON.MeshBuilder.CreateBox("player", {size: 2}, scene);

// Camera
const camera = createCamera(scene, player);

// Player's movement
const keyboardInputs = {};
if (!isMobile) {
    window.addEventListener("keydown", (event) => {
        keyboardInputs[event.key] = true;
    });
    window.addEventListener("keyup", (event) => {
        keyboardInputs[event.key] = false;
    });
}

function playerMovement(keyboardInputs) {
    if (isMobile) {
        
    } else {
        if (keyboardInputs["w"] || keyboardInputs["ArrowUp"]) player.position.z += playerSpeed;
        if (keyboardInputs["s"] || keyboardInputs["ArrowDown"]) player.position.z -= playerSpeed;
        if (keyboardInputs["a"] || keyboardInputs["ArrowLeft"]) player.position.x -= playerSpeed;
        if (keyboardInputs["d"] || keyboardInputs["ArrowRight"]) player.position.x += playerSpeed;
    }
}

// Camera's movement
scene.registerBeforeRender(() => {
    camera.target = player.position;
});

// Main loop
engine.runRenderLoop(() => {
    playerMovement(keyboardInputs);
    scene.render();
});

// Resize
window.addEventListener("resize", ()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    engine.resize();
})