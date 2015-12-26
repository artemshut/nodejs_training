var fs = require('fs');
var http = require('http');

new http.Server(function (req, res) {
    if (req.url == '/big.html') {
        var file = new fs.ReadStream('big.html');
        sendFile(file, res);
    }
}).listen(3000);

function sendFile(file, res) {

    file.pipe(res);
    file.pipe(process.stdout);

    file.on('error', function (err) {

    });

    res.on('close', function () {
        file.destroy();
    });

    // Standard realization write read stream method PIPE
    //file.on('readable', write);
    //
    //function write() {
    //    var fileContent = file.read();
    //
    //    if (fileContent && !res.write(fileContent)) {
    //        file.removeListener('readable', write);
    //        res.once('drain', function () {
    //            file.on('readable', write);
    //            write();
    //        });
    //    }
    //}
    //file.on('end', function () {
    //    res.end();
    //});
}

