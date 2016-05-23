var ws = require("./index.js") 
var log=require('./logger.js').getLogger("system") 

var cluster = require('cluster');
var os = require('os');
cluster.schedulingPolicy= cluster.SCHED_RR;

if (cluster.isMaster){
	console.log("master start...");
      // 繁衍工人进程，数量跟系统中的CPU数量一样
      for (var i = 0, n = os.cpus().length; i < n; i += 1){
      	 var wk = cluster.fork();
         wk.send('[master] ' + 'hi worker' + wk.id);
    }

    cluster.on('fork', function (worker) {
        console.log('[master] ' + 'fork: worker' + worker.id);
    });

    cluster.on('online', function (worker) {
        console.log('[master] ' + 'online: worker' + worker.id);
    });
    cluster.on('listening',function(worker,address){
        console.log('listening: worker ' + worker.process.pid +', Address: '+address.address+":"+address.port);
    });
    cluster.on('disconnect', function (worker) {
        console.log('[master] ' + 'disconnect: worker' + worker.id);
    });
    cluster.on('exit', function(worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died');
    });
} else
      // 启动程序
      app();


function app() {
    console.log('[worker] ' + "start worker ..." + cluster.worker.id);
    var server = ws.createServer(function (connection) {
    console.log('worker'+cluster.worker.id);
	connection.on("text", function (str) {   //收到客户端的消息
        console.log('text');
	})
	connection.on("close", function () {
		console.log('close'); 
	})            
    connection.on("connect", function () {
        console.log('connect');
    })
	connection.on("error", function () {
		console.log('error');
 	})
    })
    server.listen(8080) 
 }
