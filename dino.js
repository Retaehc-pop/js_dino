import { getCustomProperty, incrementCustomProperty, setCustomProperty} from "./updateCustomProperty.js";

const dino = document.querySelector("[data-dino]");
const JUMP_SPEED = 0.45;
const GRAVITY = 0.0015;
const FRAME_TIME = 100;
const DINO_FRAME_COUNT = 2;

let isJumping;
let dinoFrame;
let currentFrameTime;
let yVelocity;

export function updateDino(delta, speedScale) {
  handleRun(delta, speedScale);
  handleJump(delta);
}

function handleRun(delta, speedScale) {
  if (isJumping) {
    dino.src = 'img/dino-stationary.png'
    return
  }
  
  if (currentFrameTime >= FRAME_TIME){
    dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT
    dino.src = 'img/dino-run-' + dinoFrame + '.png'
    currentFrameTime -= FRAME_TIME
  }
  currentFrameTime += delta * speedScale
}

function handleJump(delta,speedScale) {
  if (!isJumping) return;

  incrementCustomProperty(dino, "--bottom", delta * yVelocity);

  if (getCustomProperty(dino, "--bottom") <= 0) {
    setCustomProperty(dino,"--bottom", 0);
    isJumping = false;
  }

  yVelocity -= GRAVITY * delta;
  
}

function onJump(e) {
  if (e.code !== "Space" || isJumping) return;
  yVelocity = JUMP_SPEED;
  isJumping = true;
}


export function setUpDino() {
  isJumping = false;
  dinoFrame = 0;
  currentFrameTime = 0;
  yVelocity = 0;
  setCustomProperty(dino, "--bottom", 0);
  document.removeEventListener("keydown", onJump);
  document.addEventListener("keydown", onJump);
}


export function getDinoRect(){
  return dino.getBoundingClientRect();
}

export function setDinoLose(){
  dino.src = "img/dino-lose.png";
}