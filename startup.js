var cluster = require('cluster');

var config=require('./config.js')
,log=require('./logger.js').getLogger("system");

var count =  require('os').cpus().length
  , port = config.socket.port;

cluster.schedulingPolicy= cluster.SCHED_RR;

//进程总数
var workerTatol=config.service.workerTatol==undefined ? count:config.service.workerTatol;
log.info("create "+workerTatol+" process");
if (cluster.isMaster){
for (var i = 0; i < workerTatol; i++) {
	var worker = cluster.fork();
    worker.send('[master] ' + 'hi worker' + worker.id);
}
   cluster.on('listening', function (worker, address) {
        console.log('[master] ' + 'listening: worker' + worker.id + ',pid:' + worker.process.pid + ', Address:' + address.address + ":" + address.port);
    });
}else{
    require('./app.js');
}

// if(config.service.isAnew == true){
// 	//如果线程死亡，尝试重启
// 	cluster.on("death",function (worker, task){
// 		setTimeout(function (){
// 			task.fork({args:worker.args});
// 		},config.service.anewTime)
// 	});
// }

function createNodeId() {
    // by default, we generate a random id 
    return Math.abs(Math.random() * Math.random() * Date.now() | 0);
};
