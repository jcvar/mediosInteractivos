// Lissajous Curves
/*
Parametric equations:
x = A sin(at + c)
y = B sin(bt)

A, B : curve range / half size
a, b : axis lobes
c : phase (rotation)
*/
var n = 5; // curves
var w = 500; // points per curve
var x;
var y;
// Size setup
var X = 550;
var Y = 850;
var A = ((X / n) - 10) / 2;
var B = A; // square container
var c;

function setup() {
  frameRate(14); // 70f @ 14fps = 5s
  createCanvas(X, Y); // 55x85 mm @ 550x850 px = 254 ppi
}

function draw() {
  clear();
  noFill();
  rect(0, 0, width - 1, height - 1); // border

  c = map(frameCount, 0, 70, 0, TWO_PI);
  // loop matrix
  for (var i = 1; i < n + 1; i++) {
    for (var j = 1; j < n + 1; j++) {
      translate((2 * i - 1) * width / (2 * n), (2 * j - 1) * width / (2 * n));
      // draw points
      for (var t = 0; t <= w; t++) {
        map(t, 0, w, 0, TWO_PI);
        x = A * sin(i * t + c);
        y = B * sin(j * t);
        point(x, y);
      }
      resetMatrix();
    }
  }
	fill(0);
  text(frameCount, 0, 840);
  if (frameCount <= 70)
    //saveCanvas('flip', 'png');
  if (frameCount == 70)
    noLoop();
}