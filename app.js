var http = require('http'),
	fs = require('fs');

var server = http.createServer(function(req, res){
	if('GET' == req.method && '/' == req.url){
		serve(__dirname + '/index.html', 'text/html');
	}else if('GET' == req.method && '/jquery-1.7.2.js' == req.url){//加载jquery
		serve(__dirname + req.url, 'text/plain');
	}else if('GET' == req.method && '/src/' == req.url.substr(0,5)){//加载源文件
		serve(__dirname + req.url, 'text/plain');
	}else{
		res.writeHead(404);
		res.end('Not found');
	}
	function serve(path, type){
		res.writeHead(200, {'Content-Type': type});
		fs.createReadStream(path).pipe(res);
	}
});
server.listen(9237);