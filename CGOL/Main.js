const canvas = document.getElementById("maincanvas");
const ctx = canvas.getContext("2d");
const runtext = document.getElementById("runtext");

var fps = 20;
var running = false;
var shouldClear = false;

canvas.width = screen.width-200;
canvas.height = screen.height-200;

var grid = new Grid(canvas.width, canvas.height);

function clickHandler(cx, cy) {
  let x = Math.floor(cx / cellSize);
  let y = Math.floor(cy / cellSize);
  grid.gridArray[y][x].toggle();
  draw();
}

function update() {
  if(running) {
    running = grid.update();
    runtext.innerHTML = "running";
  } else {
    runtext.innerHTML = "stopped";
  }
  draw();
  setTimeout(update, 1000/fps);
}

function start() {
  if(!running) {
    running = true;
  }
}

function draw() {
  ctx.fillStyle = "#e1e1e1";
  ctx.clearRect(0,0,canvas.width,canvas.height);
  grid.draw(ctx);
}

canvas.onclick = (e) => {
  let rect = canvas.getBoundingClientRect();
  let x = e.clientX - rect.x;
  let y = e.clientY - rect.y;

  clickHandler(x, y);

}

function clearGrid() {
  grid.clear();
  draw();
  console.log("clear");
}

function stop() {
  running = false;
  draw();
}

update();
draw();

//start();
