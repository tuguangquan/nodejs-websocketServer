var http = require("http")
var ws = require("../../")
var url = require("url")
var fs = require("fs")
var os = require('os');
var log=require('./../../logger.js').getLogger("system");
var config=require('./../../config.js');
var port = process.argv[2] || config.socket.port;

http.createServer(function (req, res) {
	fs.createReadStream("index.html").pipe(res)
}).listen(8080)

var server = ws.createServer(function (connection) {
	//console.log(arguments);
	connection.on("text", function (str) {   //收到客户端的消息
		connection.sendText("欢迎访问10.138.120.147");
	})
	connection.on("close", function () {
		log.info("client close"); 
	})
	connection.on("error", function () {
		log.info("error ")
	})
})

server.listen(port,function(){
	log.info("server start listen on:"+port)
})

	// var pathname = url.parse(connection.url).pathname;
 //    var arg = url.parse(connection.url).query; 
 //    console.log("Request for " + arg );
 //    console.log("Request for " + pathname + " received."); 
function getIPAdress(){
	 var ifaces = os.networkInterfaces();
    console.log(ifaces);
    var interfaces = require('os').networkInterfaces();
    for(var devName in interfaces){
          var iface = interfaces[devName];
          for(var i=0;i<iface.length;i++){
               var alias = iface[i];
               if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
                     return alias.address;
               }
          }
    }
}
// function broadcast(str) {
// 	server.connections.forEach(function (connection) {
// 		connection.sendText(str)
// 	})
// }
//   setInterval(getData,5000);  
//      function getData()  
//         {  
//            var url = "http://hq.sinajs.cn/list=sh601857";  
//                     http.get(url, function(res) {  
//                         var source = "";  
  
//                         res.on('data', function(data) {  
//                             source += data;  
//                         });  
  
//                         res.on('end', function() {  
//                             var now = new Date();  
//                             var hh = now.getHours();  
//                             var mm = now.getMinutes();          //minutes  
//                             var ss = now.getSeconds();  
//                             var clock ="";  
//                             if(hh < 10)  
//                                 clock += "0";  
  
//                             clock += hh + ":";  
//                             if (mm < 10) clock += '0';   
//                             clock += mm+":";   
  
//                             if (ss < 10) clock += '0';   
//                             clock += ss;   
  
//                             var elements=source.split(",");  
  
//                             var nameJson ="zhao";  
//                             var stockidJson ="601857";  
//                             var dayJson= elements[30];  
//                             var timeJson= clock;  
//                             var priceJson= Number(elements[3]);  
//                             var volumeJson=Number(elements[8]);  
//                             var stockIndexJson=0;  
  
//                             var json ={name:nameJson,stockid:stockidJson,  
//                                 day:dayJson,time:timeJson,  
//                                 price:priceJson,volume:volumeJson,  
//                                 stockIndex:stockIndexJson}; 

//                             broadcast(JSON.stringify(json));
//                             console.log(json);       
//                                 });  
//                             });  
//                     }           