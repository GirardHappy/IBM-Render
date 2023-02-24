const http = require('http'); //http
var server = http.createServer(function(req, res) {
  
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write("lol");
    res.end()
  
});

server.listen(process.env.PORT || 5500);
