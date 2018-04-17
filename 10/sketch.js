var ciclo;

function preload(){
  ciclo = loadJSON("assets/cicloparqueaderos.json");
}

function setup() {
  createCanvas(800, 800);
  //print(ciclo);
  //print(Object.keys(ciclo).length);
}

function draw() {
  background(220);
  
  fill(51, 204);
  noStroke();
//  let maxx = -100;
//  let minx = 800;
//  let maxy = 0;
//  let miny = 800;
  
  let offst = 0;
  for(let i = 0; i < Object.keys(ciclo).length; i+=1){
    let xm = map(ciclo[i].X, -74, -74.25, width, 0);
    let ym = map(ciclo[i].Y, 4.55, 4.8, height, 0);
    
//    maxx = ciclo[i].X > maxx? ciclo[i].X : maxx;
//    maxy = ciclo[i].Y > maxy? ciclo[i].Y : maxy;
//    minx = ciclo[i].X < minx? ciclo[i].X : minx;
//    miny = ciclo[i].Y < miny? ciclo[i].Y : miny;
//    print("xm="+xm+" ym="+ym);
//    print(ciclo[i].CUPO_BICI);
    ellipse(xm, ym, ciclo[i].CUPO_BICI/2);
    
    
    if(dist(mouseX, mouseY, xm, ym) < ciclo[i].CUPO_BICI/4){
      text(ciclo[i].NOMBRE, 80, 200+offst);
      if(mouseIsPressed)
        text(ciclo[i].CUPO_BICI +" cupos. "+ciclo[i].DIRECCION, 100, 212+offst);
      offst +=24;
    }
    
  }
//  print(maxx);
//  print(minx);
//  print(maxy);
//  print(miny);
//  noLoop();
}