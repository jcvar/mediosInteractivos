function setup() {
  createCanvas(400, 400);
  //textFont('monospace');
  textSize(20);
}

function draw() {
  background(220);
  text(deviceOrientation, 0, 0);
  text(accelerationX, 0, 20);
  text(accelerationY, 0, 40);
  text(accelerationZ, 0, 60);
  text(pAccelerationX, 0, 80);
  text(pAccelerationY, 0, 100);
  text(pAccelerationZ, 0, 120);
  text(rotationX, 0, 140);
  text(rotationY, 0, 160);
  text(rotationZ, 0, 180);
  text(pRotationX, 0, 200);
  text(pRotationY, 0, 220);
  text(pRotationZ, 0, 240);
  text(turnAxis, 0, 260);
}

function deviceMoved() {
  fill(255, 0, 0);
  rect(200, 0, 100, 100);
}

function deviceTurned() {
  if (turnAxis === 'X')
    fill(255, 0, 0);
  
  if (turnAxis === 'Y')
    fill(0, 255, 0);
  
  if (turnAxis === 'Z')
    fill(0, 0, 255);
  
  rect(200, 100, 100, 100);
  fill(0);
}

function deviceShaken() {
  fill(0, 0, 255);
  rect(200, 100, 100, 100);
}