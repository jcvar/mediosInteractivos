// Socket stuff
var ip = "http://0.0.0.0:3000"; // EDIT IP ADDRESS
// "http://157.253.190.87:3000" // Andes
// "http://157.253.137.50:3000" // Andes 2
var socket;

// Game control stuff
var modes = 0;
var sbttn = false;
var codes = [65, 65, 65];
var letter = 0;
var pdata;
var plife = 100;

var score = {
  b: 0,
  s: 0,
  k: 0,
};
var hiscore = {
  b: 0,
  s: 0,
  k: 0,
};

// Size & Speed stuff
var ships = 32;
var ss = 4.5;
var plyrs = [];
var bllts = [];
var bs = 6;

// Screen stuff
var rw;
var rh;
//var height = 2048 / 2; // 1024
//var width = 1536 / 2; // 768
// buttons
var bttns;

// Text stuff
var vt323;
var txts = 64;
var ta16;
var ta32;

//
// P5 ENGINE FUNCTIONS
//

function preload() {
  vt323 = loadFont("VT323-Regular.ttf");
}

function setup() {
  //pixelDensity(2);
  createCanvas(windowWidth, windowHeight);
  rh = width;
  rw = height;
  
  // Button placement
  bttns = {
    banner: {
      x: rw / 2,
      y: rh / 4,
    },
    playb: {
      x: rw / 2,
      y: 3 * rh / 4,
    },
    lttrs: {
      x: rw / 2,
      y: rh / 2,
    }
  }

  rectMode(CENTER);
  angleMode(DEGREES);

  textFont(vt323);
  textAlign(CENTER);
  textSize(txts / 2);
  ta16 = textAscent() - 16;
  textSize(txts);
  ta32 = textAscent() - 32;

  noLoop();
  socket = io.connect(ip);
}

function draw() {
  switch (modes) {
    case 0:
      welcomeScreen();
      break;
    case 1:
      displayMode();
      break;
    case 2:
      playMode();
      break;
    case 3:
      tutorial();
      break;
    case 4:
      endScreen();
      break;
  }
}

//
// MODE FUNCTIONS
//

// case 0
function welcomeScreen() {
  doBack(127);
  noStroke();

  push();
  rotate90();

  fill(255);
  text("ASTEROIDS.io", bttns.banner.x, bttns.banner.y);
  rect(bttns.playb.x, bttns.playb.y, 80, 32);
  fill(0);
  textSize(txts / 2);
  text("PLAY", bttns.playb.x, bttns.playb.y + ta16);
  // secret button
  if (sbttn) {
    fill(255);
    rect(rw - 50, 16, 100, 32);
    fill(0);
    text("DISPLAY", rw - 50, textAscent());
  }
  textSize(txts);
  for (let i = 0; i < codes.length; i += 1) {
    fill(255);
    rect(i * 51.2 - 51.2 + bttns.lttrs.x, bttns.lttrs.y, 48, 64);
    fill(0);
    text(String.fromCharCode(codes[i]), i * 51.2 - 51.2 + bttns.lttrs.x, bttns.lttrs.y + ta32);
  }

  // LR buttons
  fill(255);
  rect(bttns.lttrs.x - 90.4, bttns.lttrs.y, 24, 64);
  rect(bttns.lttrs.x + 90.4, bttns.lttrs.y, 24, 64);
  fill(0);
  text("<", bttns.lttrs.x - 90.4, bttns.lttrs.y + ta32);
  text(">", bttns.lttrs.x + 90.4, bttns.lttrs.y + ta32);

  pop();
  // UD buttons
  fill(255);
  rect(width / 2 - 48, letter * 51.2 - 51.2 + height / 2, 24, 48);
  rect(width / 2 + 48, letter * 51.2 - 51.2 + height / 2, 24, 48);
  fill(0);
  text("<", width / 2 - 48, letter * 51.2 - 51.2 + height / 2 + ta32);
  text(">", width / 2 + 48, letter * 51.2 - 51.2 + height / 2 + ta32);
}
// case 1
function displayMode() {
  doBack(127);
  noStroke();

  // FOR PLAYERS
  let pl = Object.keys(plyrs);
  for (let i = 0; i < pl.length; i += 1) {
    let slife = {
      id: pl[i],
      l: plyrs[pl[i]].l,
      m: plyrs[pl[i]].m,
      s: plyrs[pl[i]].s,
      k: plyrs[pl[i]].k
    }
    socket.emit("sendlife", slife);
    if (plyrs[pl[i]].m == 2) {
      // UPDATE
      plyrs[pl[i]].a = plyrs[pl[i]].yrot < 45 ? (plyrs[pl[i]].a + plyrs[pl[i]].xrot / 18) % 360 : plyrs[pl[i]].a; // + plyrs[pl[i]].xrot - 180;
      plyrs[pl[i]].v = plyrs[pl[i]].yrot < 45 ? map(constrain(plyrs[pl[i]].yrot, -90, 0), -90, 0, 0, ss) : plyrs[pl[i]].v;
      plyrs[pl[i]].x = constrain(plyrs[pl[i]].x + plyrs[pl[i]].v * cos(plyrs[pl[i]].a), 0, width);
      plyrs[pl[i]].y = constrain(plyrs[pl[i]].y + plyrs[pl[i]].v * sin(plyrs[pl[i]].a), 0, height);
      // SHOW
      showPlayer(plyrs[pl[i]]);
    }
  }

  // FOR BULLETS
  let newbllts = [];
  for (let i = 0; i < bllts.length; i += 1) {
    if (bllts[i].x > 0 && bllts[i].y > 0 && bllts[i].x < width && bllts[i].y < height) {
      // UPDATE
      bllts[i].x = bllts[i].x + bs * cos(bllts[i].a);
      bllts[i].y = bllts[i].y + bs * sin(bllts[i].a);

      showBullet(bllts[i]);
      // COLLISIONS
      let hit = false;
      for (let j = 0; j < pl.length; j += 1) {
        if (plyrs[pl[j]].m == 2) {
          if (bllts[i].i != pl[j] && dist(plyrs[pl[j]].x, plyrs[pl[j]].y, bllts[i].x, bllts[i].y) < 16) {
            hit = true;
            plyrs[pl[j]].l = plyrs[pl[j]].l - 4;
            plyrs[bllts[i].id].s = plyrs[bllts[i].id].s + 10
            let slife = {
              id: pl[j],
              l: plyrs[pl[j]].l,
              m: plyrs[pl[j]].m,
              s: plyrs[pl[j]].s,
              k: plyrs[pl[j]].k
            }
            socket.emit("sendlife", slife);
          }
          if (plyrs[pl[j]].l <= 0) {
            plyrs[pl[j]].m = 4;
            plyrs[bllts[i].id].k = plyrs[bllts[i].id].k + 1
            plyrs[bllts[i].id].s = plyrs[bllts[i].id].s + 100
          }
          if (hit) {
            break;
          }
        }
      }
      if (!hit) {
        newbllts.push(bllts[i]);
      }
    }
  }
  bllts = newbllts;

}
// case 2
function playMode() {
  //update
  pdata.xrot = rotationX;
  pdata.yrot = rotationY;
  //send
  socket.emit("update", pdata);
  //show
  doBack(pdata.c);
  let lr = map(plife, 100, 0, 0, height / 2);
  let lg = map(plife, 0, 100, 0, height / 2);
  fill(255);
  textSize(txts / 2);
  text("LIFE", width / 2, height / 4);
  fill(255, 0, 0);
  rect(width / 2, 3 * height / 4 - lr / 2, 51.2, lr);
  fill(0, 255, 0);
  rect(width / 2, height / 4 + lg / 2, 51.2, lg);
}
// case 3
function tutorial() {
  push();
  doBack(127);
  rotate90();
  
  textSize(txts / 2);
  fill(255);
  text("LOCK YOUR DEVICE ROTATION IN PORTRAIT MODE", rw / 2, rh / 5);
  text("tilt left / right to pilot your ship", rw / 2, rh / 2 - txts / 2);
  text("tilt front / back to accelerate and brake", rw / 2, rh / 2);
  text("tap to shoot", rw / 2, rh / 2 + txts / 2);

  rect(bttns.playb.x, bttns.playb.y, 80, 32);
  fill(0);
  textAlign(CENTER);
  text("OK", bttns.playb.x, bttns.playb.y + ta16);
  pop();
}
// case 4
function endScreen() {
  push();
  doBack(pdata.c);
  rotate90();

  fill(255);
  textSize(txts);
  text("GAME OVER", rw / 2, rh / 4);

  textSize(txts / 2);
  text("HI-SCORE", rw / 4, rh / 2 - txts / 2 - ta16);
  text("LAST RUN", 3 * rw / 4, rh / 2 - txts / 2 - ta16);

  textAlign(LEFT);
  text("Shots: ", rw / 4 - 80, rh / 2 - ta16);
  text("Kills: ", rw / 4 - 80, rh / 2 - ta16 + txts / 2);
  text("Score: ", rw / 4 - 80, rh / 2 - ta16 + txts);

  text("Shots: ", 3 * rw / 4 - 80, rh / 2 - ta16);
  text("Kills: ", 3 * rw / 4 - 80, rh / 2 - ta16 + txts / 2);
  text("Score: ", 3 * rw / 4 - 80, rh / 2 - ta16 + txts);

  textAlign(RIGHT);
  text(score.b, 3 * rw / 4 + 80, rh / 2 - ta16);
  text(score.k, 3 * rw / 4 + 80, rh / 2 - ta16 + txts / 2);
  text(score.s, 3 * rw / 4 + 80, rh / 2 - ta16 + txts);

  if (score.s > hiscore.s) {
    hiscore.s = score.s;
    hiscore.b = score.b;
    hiscore.k = score.k;
  }

  text(hiscore.b, rw / 4 + 80, rh / 2 - ta16);
  text(hiscore.k, rw / 4 + 80, rh / 2 - ta16 + txts / 2);
  text(hiscore.s, rw / 4 + 80, rh / 2 - ta16 + txts);

  rect(bttns.playb.x, bttns.playb.y, 80, 32);
  fill(0);
  textAlign(CENTER);
  text("PLAY", bttns.playb.x, bttns.playb.y + ta16);
  pop();
}

//
// TOUCH CONTROL
//

function touchStarted() {
  switch (modes) {
    case 0:
      if (sbttn) {
        if (mouseX > width - 32 && mouseY > height - 100) {
          socket.on("game", playerKeys);
          socket.on("newfire", newShot);
          socket.on("entry", respawn);
          modes = 1;
          loop();
        } else {
          sbttn = false;
          redraw();
        }
      } else if (!sbttn && mouseX < 32 && mouseY < 32) {
        sbttn = true;
        redraw();
      } else if (mouseY > letter * 51.2 - 51.2 + height / 2 - 24 && mouseY < letter * 51.2 - 51.2 + height / 2 + 24) {
        if (mouseX > width / 2 + 36 && mouseX < width / 2 + 60) {
          codes[letter] = codes[letter] == 65 ? 90 : codes[letter] - 1;
          redraw();
        } else if (mouseX > width / 2 - 60 && mouseX < width / 2 - 36) {
          codes[letter] = codes[letter] == 90 ? 65 : codes[letter] + 1;
          redraw();
        }
      } else if (mouseX > width / 2 - 32 && mouseX < width / 2 + 32) {
        if (mouseY > height / 2 - 90.4 - 12 && mouseY < height / 2 - 90.4 + 12) {
          letter = letter == 0 ? 2 : letter - 1;
          redraw();
        } else if (mouseY > height / 2 + 90.4 - 12 && mouseY < height / 2 + 90.4 + 12) {
          letter = letter == 2 ? 0 : letter + 1;
          redraw();
        }
      } else if (mouseY > height / 2 - 40 && mouseY < height / 2 + 40 && mouseX > width / 4 - 16 && mouseX < width / 4 + 16) {
        pdata = {
          xrot: rotationX,
          yrot: rotationY,
          c: [random(50, 255), random(50, 255), random(50, 255)],
          n: String.fromCharCode(codes[0]) + String.fromCharCode(codes[1]) + String.fromCharCode(codes[2])
        };
        socket.on("clife", newLife);
        socket.emit("begin", pdata);
        modes = 3;
        redraw();
      }
      break;

    case 1:
      // NO TOUCH EVENTS
      break;

    case 2:
      score.b = score.b + 1;
      socket.emit("fire", modes);
      break;

    case 3:
      if (mouseY > height / 2 - 40 && mouseY < height / 2 + 40 && mouseX > width / 4 - 16 && mouseX < width / 4 + 16) {
        socket.emit("enter", pdata);
        modes = 2;
        loop();
      }
      break;

    case 4:
      if (mouseY > height / 2 - 40 && mouseY < height / 2 + 40 && mouseX > width / 4 - 16 && mouseX < width / 4 + 16) {
        socket.emit("enter", pdata);
        modes = 2;
      }
      break;
  }
  return false;
}

//
// SOCKET CONTROL FUNCTIONS
//

function playerKeys(rotplyrs) {
  let rp = Object.keys(rotplyrs);
  for (let i = 0; i < rp.length; i += 1) {
    if (rp[i] in plyrs) {
      plyrs[rp[i]].xrot = rotplyrs[rp[i]].xrot;
      plyrs[rp[i]].yrot = rotplyrs[rp[i]].yrot;
      if (plyrs[rp[i]].m != rotplyrs[rp[i]].m) {
        let slife = {
          id: rp[i],
          l: plyrs[rp[i]].l,
          m: plyrs[rp[i]].m
        }
        socket.emit("sendlife", slife);
      }
    } else {
      let ra = random(360);
      let np = {
        a: ra,
        v: 0,
        x: width / 2 - cos(ra) * width,
        y: height / 2 - sin(ra) * width,
        l: 100,
        s: 0,
        k: 0,
        m: 3,
        xrot: rotplyrs[rp[i]].xrot,
        yrot: rotplyrs[rp[i]].yrot,
        c: rotplyrs[rp[i]].c,
        n: rotplyrs[rp[i]].n
      }
      console.log(np.x, np.y, np.a);
      plyrs[rp[i]] = np;
    }
  }
}

function newShot(bulletid) {
  let shot = {
    id: bulletid,
    x: plyrs[bulletid].x + ships * cos(plyrs[bulletid].a),
    y: plyrs[bulletid].y + ships * sin(plyrs[bulletid].a),
    a: plyrs[bulletid].a,
    c: plyrs[bulletid].c
  }
  bllts.push(shot);
}

function respawn(playerid) {
  let ra = random(360);
  plyrs[playerid].x = width / 2 - cos(ra) * width;
  plyrs[playerid].y = height / 2 - sin(ra) * width;
  plyrs[playerid].l = 100;
  plyrs[playerid].s = 0;
  plyrs[playerid].k = 0;
  plyrs[playerid].m = 2;
}

function newLife(life) {
  plife = life.l;
  modes = life.m;
  score.s = life.s;
  score.k = life.k;

}

//
// EXTRA STUFF
//

function showPlayer(p) {
  fill(p.c);
  beginShape();
  ellipse
  vertex(p.x + ships * cos(p.a), p.y + ships * sin(p.a));
  vertex(p.x + ships * cos(p.a + 135), p.y + ships * sin(p.a + 135));
  vertex(p.x + ships * cos(p.a + 180) / 2, p.y + ships * sin(p.a + 180) / 2);
  vertex(p.x + ships * cos(p.a + 225), p.y + ships * sin(p.a + 225));
  endShape(CLOSE);
}

function showBullet(b) {
  fill(b.c);
  beginShape();
  vertex(b.x + bs * cos(b.a), b.y + bs * sin(b.a));
  vertex(b.x + bs * cos(b.a + 135), b.y + bs * sin(b.a + 135));
  vertex(b.x + bs / 2 * cos(b.a + 180), b.y + bs / 2 * sin(b.a + 180));
  vertex(b.x + bs * cos(b.a + 225), b.y + bs * sin(b.a + 225));
  endShape(CLOSE);
}

function doBack(c) {
  background(0);
  stroke(c);
  for (let i = 0; i < width / 16; i += 1) {
    line(width / 2 - i * 32, 0, width / 2 - i * 32, height);
    line(width / 2 + i * 32, 0, width / 2 + i * 32, height);
    for (let j = 0; j < height / 16; j += 1) {
      line(0, height / 2 - i * 32, width, height / 2 - i * 32);
      line(0, height / 2 + i * 32, width, height / 2 + i * 32);
    }
  }
}

function rotate90() {
  translate(width, 0);
  rotate(90);
}

function mouseDragged() {
  return false;
}

function mouseWheel() {
  return false;
}
