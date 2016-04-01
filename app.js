var http = require('http');
var cloudscraper = require('cloudscraper');

const PORT = process.env.PORT || 8787;

const TARGET_URL = 'http://cdn.animenewsnetwork.com';

function handleRequest(origin_request, origin_response){
  cloudscraper.get(TARGET_URL+origin_request.url, function(error, response, body) {
    if (error) {
      console.log('Error occurred');
      origin_response.end('Error: ' + error);
    } else {
      console.log(response.statusCode,response.headers);
      origin_response.writeHead(response.statusCode,response.headers);
      origin_response.end(body);
    }
  });

}

var server = http.createServer(handleRequest);

server.listen(PORT, function(){
    console.log("Server is listening on port %s", PORT);
});
