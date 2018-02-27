var phr;
var pmn;
var hr;
var mn;
var sc;

var minutes = [];
var hours = [];

function setup() {
	createCanvas(600, 540);
}

function draw() {
	background(0);

	hr = hour();
	mn = minute();
	sc = second();

	ys = map(sc, 0, 60, 0, width);
	ym = map(mn + sc / 60, 0, 60, 0, width);

	if (pmn != mn)
		makeMinutes();
	if (phr != hr)
		makeHours();

	// Draw Hours
	fill(255);
	for (let i = 0; i < hours.length; i += 1)
		ellipse(hours[i].x, hours[i].y + ym, hours[i].r * 2);
	// Draw Minutes
	fill(255, 127);
	for (let i = 0; i < minutes.length; i += 1)
		ellipse(minutes[i].x, minutes[i].y + ys, minutes[i].r * 2);

	pmn = mn;
	phr = hr;
}


function makeMinutes() {
	minutes = [];
	for (let i = 0; i < mn; i += 1) {
		var mint = {
			x: random(width),
			y: random(-40, -10),
			r: 10
		};

		let ovr = false;
		for (let j = 0; j < minutes.length; j += 1) {
			let cur = minutes[j];
			if (dist(mint.x, mint.y, cur.x, cur.y) < mint.r + cur.r) {
				ovr = true;
				i -= 1;
				break;
			}
		}
		if (!ovr)
			minutes.push(mint);
	}
}

function makeHours() {
	hours = [];
	for (let i = 0; i < hr; i += 1) {
		var huor = {
			x: random(width),
			y: random(-80, -20),
			r: 20
		};

		let ovr = false;
		for (let j = 0; j < hours.length; j += 1) {
			let cur = hours[j];
			if (dist(huor.x, huor.y, cur.x, cur.y) < huor.r + cur.r) {
				ovr = true;
				i -= 1;
				break;
			}
		}
		if (!ovr)
			hours.push(huor);
	}
}
