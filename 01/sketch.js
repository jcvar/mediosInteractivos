function setup() { 
  createCanvas(555, 480);
	background(230, 210, 190);
  
  // Cuadrante II --------------------------------
  push();
  strokeWeight(3);
  translate(0, 333);
  rotate(-PI*37/240);
  rect(0, 0, 90, 140);
  //Rectángulos negros
  fill(0);
  rect(31, 0, 33, 35);
  rect(31, 66, 33, 33);
  rect(0, 99, 31, 41);
  
  // Cuadrado rojo
  push();
  noStroke();
  rotate(PI*37/240);
  translate(0, -333);
  fill(188, 11, 55, 153);
  rect(0, 303, 73, 88);
  pop();
  
  fill(108, 108, 108);
  rect(0, 35, 31, 31);
  fill(188, 20, 60);
  rect(0, 0, 31, 35);
  strokeWeight(3);
  noFill();
  rect(0, 0, 90, 140);
  rect(31, 0, 33, 140);
  rect(0, 35, 90, 31);
  line(0, 99, 90, 99);

  pop();
  // Cuadrante III --------------------------------
  push(); 
  translate(0, 333);
  rotate(-PI*37/240);
  translate(0, 135);
  rotate(-PI*5/240);
  
  strokeWeight(3);
  rect(0, 0, 90, 100);
  rect(31, 0, 33, 100);
  fill(220, 200, 190);
  rect(64, 0, 26, 32);
  rect(64, 32, 26, 27);
  fill(173, 100, 33);
  rect(64, 57, 26, 30);
  fill(108, 108, 108);
  rect(0, -1, 31, 29);
  rect(-60, -1, 30, 29);
  fill(230, 180, 190);
  rect(-30, -1, 30, 29);
  
  pop();
  
  // Cuadrante IV --------------------------------
  push(); 
  translate(0, 333);
  rotate(-PI*37/240);
  translate(0, 135);
  rotate(-PI*5/240);
  translate(90, 0);
  strokeWeight(3);
  rect(0, 32, 190, 25);
  noStroke();
  ellipse(195, 77, 92, 92);
  stroke(0);
  fill(0);
  rect(115, 57, 55, 55);
  rect(115, 130, 55, 35);
  rect(115, 170, 150, 15);
  
  rect(270, 32, 30, 30);
  rect(265, 80, 35, 40);
  
  // Circulo 2
  strokeWeight(1);
  fill(199, 55, 44, 232);
  ellipse(195, 77, 92, 92);
  fill(188, 148, 166, 232);
  ellipse(193, 72, 82, 82);
  
  //Triángulo Naranja
  strokeWeight(2);
  noFill();
  rect(115, 57, 55, 57);
  fill(188, 122, 70);
  beginShape();
  vertex(0, 2);
  vertex(400, 32);
  vertex(0, 32);
  endShape(CLOSE);
  pop();
  
  // Cuadrante I --------------------------------
  push();
  translate(0, 333);
  rotate(-PI*37/240);
  translate(90, 0);
  rect(0, 66, 222, 33);
  ellipse(248, 84, 97);
  
  strokeWeight(3);
  rect(0, 0, 666, 66);
  line(0, 35, 666, 35);
  rect(0, 99, 192, 32);
  noFill();
  rect(0, 0, 33, 99);
  //Rectángulos negros
  fill(0);
  rect(192, 99, 52, 32);
  rect(315, 66, 35, 33);
  //Rectángulos otros
  fill(148, 145, 155);
  rect(388, 0, 46, 35);
  fill(96, 94, 99);
  rect(200, 0, 42, 35);
  
  fill(151, 144, 123);
  beginShape();
  vertex(33, 1);
  vertex(67, 1);
  vertex(78, 35);
  vertex(33, 35);
  endShape(CLOSE);
  line(78, 35, 88, 66);
  beginShape();
  vertex(33, 66);
  vertex(88, 66);
  vertex(100, 99);
  vertex(33, 99);
  endShape(CLOSE);
  
  fill(125, 145, 105);
  rect(0, 35, 33, 31);
  noFill();
  rect(-26, 99, 26, 32);
  // Círculo 3
  strokeWeight(1);
  fill(226, 210, 130, 200);
  ellipse(248, 84, 97);
  fill(121, 160, 228, 200);
  ellipse(248, 84, 77);
  
  pop(); 
  

  
  // Elementos extra --------------------------------
  // Líneas cortas
  strokeWeight(4);
	line(426, 468, 426, 480);
  line(474, 468, 474, 480);
  line(520, 468, 520, 480);
  // Circulo 3
  ellipse(480, 290, 70);
  //Circulo 4
  strokeWeight(1);
  fill(199, 110, 63, 180);
  ellipse(130, 290, 110);
  strokeWeight(6);
  fill(222, 184, 108, 180);
  ellipse(100, 290, 136);
  // Cuadrado aparte
  fill(240, 220, 160);
  rect(212, 82, 34, 32);
  
  
}