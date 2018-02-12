const fs = require('fs');  
function readBigFileEntry(filename, response) {  
  fs.exists(filename, function(exists) {  
      if (!filename || !exists) {  
          response.writeHead(404);  
          response.end();  
          return;  
      }  
        
      var readStream = fs.ReadStream(filename);  
        
      var contentType = 'none';  
      var ext = fs.extname(filename);  
      switch (ext) {  
          case ".flv":  
              contentType = "video/flv";  
              break;  
      }  

      response.writeHead(200, {  
          'Content-Type' : contentType,  
          'Accept-Ranges' : 'bytes',  
          'Server' : 'Microsoft-IIS/7.5',  
          'X-Powered-By' : 'ASP.NET'  
      });  
        
        

      readStream.on('close', function() {  
          response.end();  
          console.log("Stream finished.");  
      });  
      readStream.pipe(response);  
  });  
}  

var http = require('http');  
http.createServer(function (request, response) {  
  readBigFileEntry(__dirname+'/reslove.pm4', response)
}).listen(8888);  
console.log('Server running at http://127.0.0.1:8888/');  