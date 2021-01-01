function requestHandler(req, res) {
  const url = req.url;
  const fs = require("fs"); //file system package

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(
      "<head><title>WOW</title/></head><form action ='/message' method ='POST'><input type='text' name='message'></input><button type='submit'>Send</button> HEllo how are you</from>"
    );
    return res.end();
  }
  if (url === "/message" && req.method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      //gets all data from stream
      console.log(chunk, "hell");
      body.push(chunk);
    });

    return req.on("end", () => {
      //fires up on request end
      const parsdBody = Buffer.concat(body).toString(); //converting the parsed request to string
      console.log(parsdBody, "hello");
      const message = parsdBody.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
  res.write("<head><title>WOW</title/></head><h1>HEllo</h1>");
  return res.end(); //sends response to browser
}

module.exports = requestHandler;
