//root file of node js
const http = require("http"); //helps to launch server

const routes = require("./routes");

const server = http.createServer(routes); //returns server

server.listen(3000);

//this is all raw logic , we can add abstraction using express.js
