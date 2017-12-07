const express = require("express");
const server = express();

server.get("/", (req, res) => {
  res.sendFile(__dirname + "/src/index.html");
});

server.get("/canvas", (req, res) => {
  res.sendFile(__dirname + "/src/canvas.html");
});

server.use(express.static("src"));


server.listen(4000, () => {
  console.log("The magic is happening on port 4000");
});
