import {createLight, createGround, createPlayer, createCamera} from "./elements.js"

// const values
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const playerSpeed = 0.2;

// Canvas :
const canvas = document.querySelector("#renderCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Engine :
const engine = new BABYLON.Engine(canvas, true);
// Scene :
const scene = new BABYLON.Scene(engine);

// Light :
const light = createLight(scene);
// Ground :
const groundPromise = createGround(scene, isMobile ? 50 : 150);
// Player :
const player = createPlayer(scene);
// Camera :
const camera = createCamera(scene, player);
      
// keyboard's inputs
const keyboardInputs = {};
if (!isMobile) {
    window.addEventListener("keydown", (event) => {
        keyboardInputs[event.key] = true;
    });
    window.addEventListener("keyup", (event) => {
        keyboardInputs[event.key] = false;
    });
}

groundPromise.then((ground) => {
    alert("promise resolved !")
    ground.showBoundingBox = true;
});

scene.registerBeforeRender(() => {
    // player's movement
    if (keyboardInputs["w"] || keyboardInputs["ArrowUp"]) player.position.z += playerSpeed;
    if (keyboardInputs["s"] || keyboardInputs["ArrowDown"]) player.position.z -= playerSpeed;
    if (keyboardInputs["a"] || keyboardInputs["ArrowLeft"]) player.position.x -= playerSpeed;
    if (keyboardInputs["d"] || keyboardInputs["ArrowRight"]) player.position.x += playerSpeed;
    // Camera's movement
    camera.target = player.position.add(new BABYLON.Vector3(0, 1, 0));
});

// Main loop
engine.runRenderLoop(() => {
    scene.render();
});

// Resize
window.addEventListener("resize", ()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    engine.resize();
})