var fs = require('fs')//因为我们需要对文件来进行操作，所以导入fs模块
var path = require('path')
var Promise = require('bluebird')

exports.readFileAsync = function (fpath, encoding) {
    return new Promise(function (resolve, reject) {
        fs.readFile(fpath, encoding, function (err, content) {
            if (err) reject(err)
            else resolve(content)
        })
    })
}
exports.writeFileAsync = function (fpath, content) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(fpath, content, function (err, content) {
            if (err) reject(err)
            else resolve()
        })
    })
}
// exports.readBigFileEntry = function(filename, response) {  
//     fs.exists(filename, function(exists) {  
//         // let arr=[];
//         var readStream = fs.createReadStream(filename);  
//         readStream.on('data', function(chunk) {  
//             // arr.push(chunk);
//             response.write(chunk)
//         });  
  
//         readStream.on('end', function() {  
//             console.log( Buffer.concat(arr).toString());
//             response.end();  
//             console.log("Stream finished.");  
//         });  
//         // readStream.pipe(response);  
//     });  
//   }  