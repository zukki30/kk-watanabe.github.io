const http = require("http");
const server = http.createServer();

server.on("request", function(req, res) {
  const data = "Hello world";

  res.writeHead(200, {
    "Contens-Length": Buffer.byteLength(data),
    "content-type": "text/plain"
  });

  res.write(data, "utf8 ");

  res.end();
});

server.listen(3000);

console.log("server listening...");
