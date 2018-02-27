var hr;
var mn;
var sc;

var clr = 0;
var mov = 0;

function setup() {
  createCanvas(400, 400);
  textFont('Inconsolata, monospace', 20);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(0);

  mov += abs(mouseX - pmouseX) + abs(mouseY - pmouseY);
  if (mov > 1600) {
    clr = 255;
    mov = 0;

    hr = hour();
    mn = minute();
    sc = second();
  }

  if (mov > 0)
    mov -= 10;

  clr -= 2;
  fill(clr);
  text((hr < 10 ? '0' + hr : hr) + ':' + (mn < 10 ? '0' + mn : mn) + ':' + (sc < 10 ? '0' + sc : sc), width / 2, height / 2);
}