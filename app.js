var http = require('http'),
	fs = require('fs');

var port = 9237;//端口号
/*
	这是一个简单的服务器 
	主要作用是 启动这个静态文件
	只支持 加载css/js
	默认跳转也面 只有首页
*/
var server = http.createServer(function(req, res){
	if('GET' == req.method && '/' == req.url){
		serve(__dirname + '/index.html', 'text/html');
	}else if('GET' == req.method && '/jquery-1.7.2.js' == req.url){//加载jquery
		serve(__dirname + req.url, 'text/javascript');
	}else if('GET' == req.method && '/src/' == req.url.substr(0,5)){//加载源文件
		if('.js' == getType(req.url)){
			serve(__dirname + req.url, 'text/javascript');
		}else if('.css' == getType(req.url)){
			serve(__dirname + req.url, 'text/css');
		}else{
			res.writeHead(404);
			res.end('Not found');
		}
	}else{
		res.writeHead(404);
		res.end('Not found');
	}
	function serve(path, type){
		res.writeHead(200, {'Content-Type': type});
		fs.createReadStream(path).pipe(res);
	}
	function getType(url){
		return url.substring(url.lastIndexOf('.'), url.length);
	}
});
server.listen(port, function(){
	console.log('Express server listening on port ' + port);
});