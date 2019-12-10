var http = require('http');

exports.request = function (path) {
    return new Promise(function(resolve, reject) {
      let chunks = [];
        const req = http.get(path, res => {
            res.on('data', d => {
              chunks.push(d);
            })
            .on('end', function() {
            let data   = Buffer.concat(chunks);
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(e);
                }
            })
        })
        req.on('error', error => {
            reject(error);
        })
        req.end()
    })
}
