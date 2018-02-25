var shwtm = 'OPEN ON MOBILE DEVICE';

function setup() {
	createCanvas(windowWidth, windowHeight);

	textFont('monospace');
	textAlign(CENTER, CENTER);
}

function draw() {
	background(255);
	if (turnAxis == 'X' || turnAxis == 'Y' || turnAxis == 'Z') {
		text(shwtm, width / 2, height / 2);
	} else {
		text(shwtm, width / 2, 10);
	}
}

function deviceTurned() {
	if (turnAxis === 'X')
		shwtm = ' ' + hour() + ':';

	if (turnAxis === 'Y')
		shwtm = ':' + minute() + ':';

	if (turnAxis === 'Z')
		shwtm = ':' + second() + ' ';
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
