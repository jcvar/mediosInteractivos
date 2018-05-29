var clients = {};

var express = require("express");
var socket = require("socket.io");

var app = express();
var server = app.listen(3000);
app.use(express.static('public'));

var io = socket(server);
console.log("SERVER RUNNING");

io.sockets.on("connection", newConnection);

function newConnection(socket) {
  console.log("new connection " + socket.id);
  console.log(Object.keys(clients).length + "players");
  console.log("NO CERRAR ESTA VENTANA");

  // PLAYER EMITS
  socket.on("begin", function (begdata) {
    clients[socket.id] = begdata;
    console.log("NO CERRAR ESTA VENTANA");
    socket.broadcast.emit("game", clients);
  });
  socket.on("update", function (updata) {
    clients[socket.id] = updata;
    console.log("NO CERRAR ESTA VENTANA");
    socket.broadcast.emit("game", clients);
  });
  socket.on("fire", function (bcolor) {
    console.log("NO CERRAR ESTA VENTANA");
    socket.broadcast.emit("newfire", socket.id);
  });
  socket.on("enter", function (edata) {
    console.log("NO CERRAR ESTA VENTANA");
    socket.broadcast.emit("entry", socket.id);
  });

  // DISPLAY EMITS
  socket.on("sendlife", function (lifedata) {
    console.log("NO CERRAR ESTA VENTANA");
    socket.broadcast.to(lifedata.id).emit("clife", lifedata);
  });

  socket.on("disconnect", function () {
    console.log("disconnected " + socket.id);
    if (clients[socket.id] != undefined) {
      delete clients[socket.id];
    }
    console.log(Object.keys(clients).length + " players");
  });

}
