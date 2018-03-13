var cityu;
var bttnsz = 20;
var tool = 0;
var bttm = 0;
var pickin = true;
var clr = color(0);
var mx;
var my;

function preload(){
 cityu = loadImage('assets/cityu.png');
}

function setup() {
  createCanvas(510, 560);
  background(255);
  clr = color(0);
  textFont('monospace');
  strokeCap(SQUARE);
  
  image(cityu, 0, 40, 510, 510);
  
}

function draw() {
  
  // TOOL DRAWING
  fill(clr);
  stroke(clr);
  if (mouseIsPressed && mouseY > 40 && mouseY < 500) {
    switch (tool) {
      case 1:
        background(255);
        tint(clr);
        image(cityu, 0, 40, 510, 510);
        break;
      case 2:
        //background(255);
        clr = cityu.get(mouseX, mouseY-40);
        tint(clr);
        image(cityu, 0, 40, 510, 510);
        break;
      case 3:
        //TODO
        break;
      case 4:
        //noTint();
        //image(cityu, 0, 40, 510, 510);
        break;
      case 5:
        //saveCanvas('savedCanvas.png', 'png');
        break;
    }
  }
  drawToolbar();
}

function drawToolbar() {
  // TOP
  stroke(0);
  fill(127);
  rect(0, 0, width - 1, 40);

  // TOOLS
  for (let i = 0; i < 5; i += 1) {
    fill(255);
    stroke(255);
    rect(10 + i * 25, 10, 20, 20);
    fill(clr);
    stroke(clr);
    text(i+1, 17 + i * 25, 24)
  }
  
  stroke(0);
  // COLORS
  fill(255); // WHITE
  rect(405, 10, 20, 20);
  fill(255, 0, 0); // RED
  rect(430, 10, 20, 20);
  fill(0, 255, 0); // GREEN
  rect(455, 10, 20, 20);
  fill(0, 0, 255); // BLUE
  rect(480, 10, 20, 20);

  // PAINTING WITH
  fill(255);
  rect(360, 10, 20, 20);
  text('Working With:', 260, 20);
  fill(clr);
  stroke(clr);
  text(tool, 367, 24);

  // BOTTOM
  for (let i = 0; i < width; i += 2) {
    noStroke();
    switch (bttm) {
      case 1:
        fill(i / 2, 0, 0);
        break;
      case 2:
        fill(0, i / 2, 0);
        break;
      case 3:
        fill(0, 0, i / 2);
        break;
      default:
        fill(i / 2);
    }
    rect(i, 550, 2, 10);
  }
}

function mousePressed() {
  mx = mouseX;
  my = mouseY;
  // TOOL CHOOSER
  if (mouseX > 10 && mouseX < 10 + bttnsz && mouseY > 10 && mouseY < 10 + bttnsz)
    tool = 1;
  if (mouseX > 35 && mouseX < 35 + bttnsz && mouseY > 10 && mouseY < 10 + bttnsz)
    tool = 2;
  if (mouseX > 60 && mouseX < 60 + bttnsz && mouseY > 10 && mouseY < 10 + bttnsz)
    tool = 3;
  if (mouseX > 85 && mouseX < 85 + bttnsz && mouseY > 10 && mouseY < 10 + bttnsz){
    tool = 4;
    noTint();
    image(cityu, 0, 40, 510, 510);
  }
  if (mouseX > 110 && mouseX < 110 + bttnsz && mouseY > 10 && mouseY < 10 + bttnsz){
    tool = 5;
    saveCanvas('savedCanvas.png', 'png');
  }

  // COLOR CHOOSER
  if (mouseX > 405 && mouseX < 405 + bttnsz && mouseY > 10 && mouseY < 10 + bttnsz) {
    bttm = 0;
    clr = color(0);
    pickin = true;
  }
  if (mouseX > 430 && mouseX < 430 + bttnsz && mouseY > 10 && mouseY < 10 + bttnsz) {
    bttm = 1;
    pickin = true;
  }
  if (mouseX > 455 && mouseX < 455 + bttnsz && mouseY > 10 && mouseY < 10 + bttnsz) {
    bttm = 2;
    pickin = true;
  }
  if (mouseX > 480 && mouseX < 480 + bttnsz && mouseY > 10 && mouseY < 10 + bttnsz) {
    bttm = 3;
    pickin = true;
  }

  // COLOR PICKER
  if (mouseY >= 550 && pickin) {
    switch (bttm) {
      case 1:
        clr.setRed(mouseX / 2);
        break;
      case 2:
        clr.setGreen(mouseX / 2);
        break;
      case 3:
        clr.setBlue(mouseX / 2);
        break;
      default:
        clr = color(mouseX / 2);
    }
  }
  if (mouseY < 550 && mouseY > 40) {
    pickin = false;
  }
  print('tool=' + tool + ' pickin=' + pickin + 'color=' + clr, 100, 100);
}