console.log("Hello world from node js ");
const eventEmmiter = require("events");
eventEmitter = new eventEmmiter();

eventEmitter.on("tutorial", () => {
  console.log("tutorial event has occured ");
});

eventEmitter.emit("tutorial");
