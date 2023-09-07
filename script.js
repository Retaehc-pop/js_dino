import { updateGround, setUpGround } from "./ground.js";
import { updateDino, setUpDino, getDinoRect, setDinoLose } from "./dino.js";
import { updateCactus, setUpCactus, getCactusRect} from "./cactus.js";

const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;
const SPEED_SCALE_INCREASE = 0.0001;
const worldElem = document.querySelector("[data-world]");

setPixelToWorldScale();
window.addEventListener("resize", setPixelToWorldScale);
window.addEventListener("keydown", handleStart,{once:true});


let lastTime;
let speedScale = 1;
let score = 0;
function update(time) {
  if (lastTime == null) {
    lastTime = time;
    window.requestAnimationFrame(update);
    return;
  }

  const delta = time - lastTime;
  lastTime = time;
  updateGround(delta, speedScale);
  updateSpeedScale(delta);
  updateScore(delta);
  updateDino(delta, speedScale);
  updateCactus(delta, speedScale);
  if(islose()){
    return handleLost();
  }

  window.requestAnimationFrame(update);
}

function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE_INCREASE;
}


function islose(){
  const dinoRect = getDinoRect();
  const cactusRects = getCactusRect();
  return cactusRects.some(cactusRect => isCollision(dinoRect,cactusRect))
  // return false
}

function isCollision(rect1,rect2){
  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  )
}
function setPixelToWorldScale() {
  let worldToPixelScale;
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    worldToPixelScale = window.innerWidth / WORLD_WIDTH;
  } else {
    worldToPixelScale = window.innerHeight / WORLD_HEIGHT;
  }

  worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`;
  worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`;
}


function handleLost(){
  setDinoLose();
  setTimeout(() => {
    document.addEventListener("keydown", handleStart,{once:true});
    document.querySelector("[data-start-screen]").classList.remove("hide")
  },500)
}

function updateScore(delta){
  score += delta * .01;
  document.querySelector("[data-score]").textContent = Math.floor(score);
}


function handleStart(){
  lastTime = null;
  setUpGround();
  setUpDino();
  setUpCactus();
  document.querySelector("[data-start-screen]").classList.add("hide")
  score = 0;
  window.requestAnimationFrame(update);
  document.get
}