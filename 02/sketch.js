// Dimensiones
var xsize = 480;
var ysize = 750;
var w = xsize / 12;
var h = ysize / 6;
// Variables para color principal y secundario
var cppl;
var csec;

//Convenciones para dibujo en cada bloque
/*
1: Cruz blanco sobre negro
2: Cruz negro
3: Cruz rojo sobre negro
4: Cruz rojo
5: Líneas rojo blanco
6: Líneas blanco negro
7: Líneas cafe gris
8: Líneas gris cafe
*/

// Tipos de columna
var c1 = [1, 6, 7, 4, 8, 5];
var c2 = [5, 8, 3, 7, 6, 2];
var c3 = [7, 2, 5, 5, 1, 7];
// Orden columnas
var pttrn = [c1, c2, c3, c1, c3, c1, c2, c3, c2, c1, c3, c2];

function setup() {
  // Definir colores
  var rojo = color(200, 60, 50);
  var fondo = color(210, 195, 165);
  var gris = color(185, 160, 135);
  var cafe = color(80, 50, 40);
  createCanvas(xsize, ysize);
	
  // Recorrer matrix
  for (var x = 0; x < 12; x++) {
    for (var y = 0; y < 6; y++) {
      // Asignar colores
      if (pttrn[x][y] == 1) {
        cppl = 0;
        csec = fondo;
      } else if (pttrn[x][y] == 2) {
        cppl = fondo;
        csec = 0;
      } else if (pttrn[x][y] == 3) {
        cppl = 0;
        csec = rojo;
      } else if (pttrn[x][y] == 4) {
        cppl = fondo;
        csec = rojo;
      } else if (pttrn[x][y] == 5) {
        cppl = rojo;
        csec = fondo;
      } else if (pttrn[x][y] == 6) {
        cppl = fondo;
        csec = rojo;
      } else if (pttrn[x][y] == 7) {
        cppl = cafe;
        csec = gris;
      } else if (pttrn[x][y] == 8) {
        cppl = gris;
        csec = cafe;
      }
      
      // Dibujar cruz o cuadros
      if (pttrn[x][y] < 5) { // Cruz
        noStroke();
        fill(cppl); // Fondo color ppl
        rect(x*w, y*h, w, h);
        strokeCap(SQUARE);
        strokeWeight(2);
        stroke(csec); // Líneas color sec
        line(x*w, y*h+h/2, (x+1)*w, y*h+h/2);
        line(x*w+w/2, y*h, x*w+w/2, (y+1)*h);
      }else{ // Cuadros
        noStroke();
        for(var i = 0; i < 6; i++){
        	fill(cppl); // Primero color ppl
          rect(x*w, y*h+i*h/6, w, h/12);
          fill(csec);
          rect(x*w, y*h+(2*i+1)*h/12, w, h/12);
        }
      }
    }
  }
}