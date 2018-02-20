// Paint5
/*
Click on tool icon to select.
Click on color square to modify RGB.
Click on canvas to draw.
*/
var bttnsz = 20;
var tool = 0;
var bttm = 0;
var pickin = true;
var clr;
var mx;
var my;

function setup() {
	createCanvas(510, 560);
	background(255);
	clr = color(0);
	textFont('monospace');
	strokeCap(SQUARE);
}

function draw() {
	drawToolbar();
	// TOOL DRAWING
	fill(clr);
	stroke(clr);
	if (mouseIsPressed && mouseY > 40 && mouseY < 500) {
		switch (tool) {
			case 1:
				rect(mx, my, mouseX - mx, mouseY - my);
				break;
			case 2:
				ellipse(mx, my, mouseX - mx, mouseY - my);
				break;
			case 3:
				line(mx, my, mouseX, mouseY);
				break;
			case 4:
				triangle(mx, my, mouseX, mouseY, 2 * mx - mouseX, mouseY);
				break;
			case 5:
				line(mouseX, 0, mouseX, height);
				line(0, mouseY, width, mouseY);
				break;
			case 6:
				stroke(mouseX / 2, mouseY / 2, frameCount % 255);
				line(mouseX, 0, mouseX, height);
				line(0, mouseY, width, mouseY);
				break;
			case 7:
				stroke(mouseX / 2, mouseY / 2, frameCount % 255);
				noFill();
				ellipse(mx, my, mouseX - mx, mouseY - my);
				break;
			case 8:
				ellipse(mouseX, mouseY, 10, 10);
				break;
			case 9:
				triangle(mx, my, mouseX, mouseY, 2 * mx - mouseX, 2 * my - mouseY);
				break;
			case 10:
				background(clr);
				break;
		}
	}
}

function drawToolbar() {
	// TOP
	stroke(0);
	fill(127);
	rect(0, 0, width - 1, 40);

	// TOOLS
	fill(255);
	for (let i = 0; i < 10; i += 1) {
		rect(10 + i * 25, 10, 20, 20);
	}
	fill(clr);
	stroke(clr);
	rect(15, 15, 10, 10); // 1. Rect

	ellipse(45, 20, 11); // 2. Ellipse

	line(70, 14, 70, 26); // 3. Line

	triangle(95, 14, 88, 26, 102, 26); // 4. Triangle

	line(110, 20, 130, 20); // 5. Cross
	line(120, 10, 120, 30);

	stroke(mouseX / 2, mouseY / 2, frameCount % 255); // 6. Color Cross
	line(135, 15, 155, 15);
	line(140, 10, 140, 30);
	noFill();
	ellipse(170, 20, 10, 10); // 7.
	stroke(clr);
	fill(0);
	ellipse(195, 20, 5, 5); // 8. Dot
	line(210, 15, 230, 25); // 9. Bowtie
	line(210, 25, 230, 15);
	// 10. Background

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
	text('Painting With:', 260, 20);
	fill(clr);
	stroke(clr);
	switch (tool) {
		case 1:
			rect(365, 15, 10, 10);
			break;
		case 2:
			ellipse(370, 20, 11);
			break;
		case 3:
			line(370, 14, 370, 26);
			break;
		case 4:
			triangle(370, 14, 363, 26, 377, 26);
			break;
		case 5:
			line(360, 20, 380, 20);
			line(370, 10, 370, 30);
			break;
		case 6:
			stroke(mouseX / 2, mouseY / 2, frameCount % 255);
			line(360, 20, 380, 20);
			line(370, 10, 370, 30);
			break;

		case 7:
			stroke(mouseX / 2, mouseY / 2, frameCount % 255);
			noFill();
			ellipse(370, 20, 5, 5);
			break;

		case 8:
			ellipse(370, 20, 5, 5);
			break;
		case 9:
			line(360, 15, 380, 25);
			line(360, 25, 380, 15);
			break;
		case 10:
			stroke(0);
			rect(360, 10, 20, 20);
			break;
	}


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
	if (mouseX > 85 && mouseX < 85 + bttnsz && mouseY > 10 && mouseY < 10 + bttnsz)
		tool = 4;
	if (mouseX > 110 && mouseX < 110 + bttnsz && mouseY > 10 && mouseY < 10 + bttnsz)
		tool = 5;
	if (mouseX > 135 && mouseX < 135 + bttnsz && mouseY > 10 && mouseY < 10 + bttnsz)
		tool = 6;
	if (mouseX > 160 && mouseX < 160 + bttnsz && mouseY > 10 && mouseY < 10 + bttnsz)
		tool = 7;
	if (mouseX > 185 && mouseX < 185 + bttnsz && mouseY > 10 && mouseY < 10 + bttnsz)
		tool = 8;
	if (mouseX > 210 && mouseX < 210 + bttnsz && mouseY > 10 && mouseY < 10 + bttnsz)
		tool = 9;
	if (mouseX > 235 && mouseX < 235 + bttnsz && mouseY > 10 && mouseY < 10 + bttnsz)
		tool = 10;

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