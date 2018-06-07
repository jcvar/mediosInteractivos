// Options for map
var options = {
  lat: 4.65,
  lng: -74.1,
  zoom: 12,
  style: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
}

// Create an instance of Leaflet
var mappa = new Mappa('Leaflet');
var myMap;

var canvas;
var meteorites;

var ciclo;
var sitp;
var ruta;
var names = [];

var route;
var coords = [];
var pixs = [];
//Proj4
var utm = "+proj=utm +zone=18";
var wgs84 = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";

function preload() {
  ciclo = loadJSON("https://jcvargas10.github.io/mediosInteractivos/10/assets/cicloparqueaderos.json");
  sitp = loadTable('https://jcvargas10.github.io/mediosInteractivos/10/assets/sitp.csv', 'csv', 'header');
}


function setup() {
  canvas = createCanvas(600, 600);

  // Create a tile map and overlay the canvas on top.
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  // Only redraw map changes.
  myMap.onChange(drawRoute);


  ruta = createSelect();
  ruta.position(10, 610);

  for (let i = 0; i < sitp.getRowCount(); i += 1) {
    let s = sitp.getRow(i).obj["Ruta Comercial"] + " (" + sitp.getRow(i).obj["Ruta SAE"] + ")";

    let flag = false;
    for (let j = 0; j < names.length; j += 1) {
      if (s == names[j]) {
        flag = true;
        break;
      }
    }
    if (flag == false)
      names.push(s);
  }
  names.sort();

  for (let j = 0; j < names.length; j += 1) {
    ruta.option(names[j]);
  }
  ruta.changed(drawRoute);

}

function draw() {
  drawRoute();
  // DRAW PARKING
  noStroke();
  let offst = 0;
  for (let i = 0; i < Object.keys(ciclo).length; i += 1) {
    let pos = myMap.latLngToPixel(ciclo[i]["Y"], ciclo[i]["X"]);
    fill(127, 127);
    ellipse(pos.x, pos.y, ciclo[i].CUPO_BICI / 2);

    if (dist(mouseX, mouseY, pos.x, pos.y) < ciclo[i].CUPO_BICI / 4) {
      fill(0);
      text(ciclo[i].NOMBRE, 80, 200 + offst);
      if (mouseIsPressed)
        text("🚲 " + ciclo[i].CUPO_BICI + " cupos. " + ciclo[i].DIRECCION, 100, 212 + offst);
      offst += 24;
    }
  }

}

function drawRoute() {
  clear();


  stroke(0);
  strokeWeight(2);
  //Update route coordinates
  if (route != ruta.value()) {
    route = ruta.value();
    coords = [];
    console.log(route);
    for (let i = 0; i < sitp.getRowCount(); i++) {
      if (route == sitp.getRow(i).obj["Ruta Comercial"] + " (" + sitp.getRow(i).obj["Ruta SAE"] + ")") {
        coords.push(proj4(utm, wgs84, [Number(sitp.getString(i, 'PosX')), Number(sitp.getString(i, 'PosY'))]));
      }
    }
  }
  //Update map points
  pixs = [];
  for (let i = 0; i < coords.length; i++) {
    pixs.push(myMap.latLngToPixel(coords[i][1], coords[i][0]));
  }
  //Trace Route
  for (let i = 0; i < pixs.length - 1; i++) {
    line(pixs[i].x, pixs[i].y, pixs[i + 1].x, pixs[i + 1].y);
  }
}


function mousePressed() {
  drawRoute();
}

function mouseReleased() {
  drawRoute();
}
