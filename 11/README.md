# ASTEROIDS.io
### Proyecto Final - Diseño en Medios Interactivos

Asteroids.io is a multi-player variant of the arcade shooter *Asteroids*, initially released in november 1979. [Wikipedia](https://en.wikipedia.org/wiki/Asteroids_(video_game))

In this version, the game is displayed on a single monitor and using gyroscope enabled devices each player battles others players and competes for the highest score.

This game was developed as a [p5.js](https://p5js.org/) sketch and runs on [Node.js](https://nodejs.org/en/) using [Express](https://expressjs.com/). All multiplayer features are built with [Socket.IO](https://socket.io/).

All of the code is uploaded as it was presented in the final showcase for *Diseño en Medios Interactivos* at *Universidad de Los Andes* on May 22, 2018.

#### ¿How to run the game locally?
This game requires node on your host computer, you can download it [here](https://nodejs.org/en/download/). Both the display device and players must be connected to the same wireless network as the host.

##### Host computer:
1. Download the folder [`asteroids.io`](https://github.com/jcvargas10/mediosInteractivos/tree/master/11/asteroids.io)
2. Find your local IP address (in MacOS: System Preferences > Network > Wi-Fi)
3. Edit the sketch file with your IP address:
  * Open the file `/asteroids.io/public/public.js` on your preferred editor
  * Replace the address on the second line with your own:  
   `var ip = "http://0.0.0.0:3000";`  
   If your address is `123.123.123.123`, the line should be:  
   `var ip = "http://123.123.123.123:3000";`
  * Save the file
4. Navigate to the folder `/asteroids.io` on your terminal and run:  
`$ node server.js`
5. The terminal should display `SERVER RUNNING`

##### Display:
1. Go to the host IP address, on port 3000, in your browser (`123.123.123.123:3000`)
2. Tap or click the lower left corner and a DISPLAY button should appear in the opposite corner of the window
3. The screen should clear all banners and show the game grid after tapping / clicking the button

##### Player:
1. Open the device browser and go to the host IP address and follow the instructions
2. Wait a second or two for your ship to appear on the display screen
3. Play
