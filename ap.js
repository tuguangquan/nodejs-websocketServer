var http = require("http")
var ws = require("./index.js")
var url = require("url")
var fs = require("fs")
var os = require('os')
var config=require('./config.js');
var port = process.argv[2] || config.socket.port;
var amqp = require('amqp');
var log = require('./logger.js').getLogger("system");
var rabbitConnectionFactory = require('./rabbitConnectionFactory.js');
var redisConnectionFactory = require('./redisConnectionFactory.js');
var msgSubClient = redisConnectionFactory.getConnectionToDB(config.redis.socketDB); 
var msgPubClient = redisConnectionFactory.getConnectionToDB(config.redis.socketDB);
var Map = require("./map.js");
var stringConnectionsMap = new Map();
var List = require("./list.js");

// http.createServer(function (req, res) {
//   fs.createReadStream("index.html").pipe(res)
// }).listen(8080)

var server = ws.createServer(function (connection) {
	connection.on("text", function (str) {   //收到客户端的消息
        var json=JSON.parse(str);
        var sensors = json.msg;
        var sensorSplit = sensors.split(',')
        for (var i = 0; i < sensorSplit.length; i++) {
        	var s = json.appID+":"+sensorSplit[i];
            if (json.cmd == "subscribe") {
              var cons = stringConnectionsMap.get(s);
              if (cons) {
                cons.add(connection);
                stringConnectionsMap.put(s,cons);
              }else {
              	var lists = new List();
                lists.add(connection);
                stringConnectionsMap.put(s,lists);                
              };
            }else if (json.cmd == "unSubscribe") {
            	//console.log(123);
            	var cons = stringConnectionsMap.get(s);
            	if (cons) {
            		console.log(cons);
            		 cons.removeItem(connection);
        	        // stringConnectionsMap.put(s,cons);
        	         console.log(stringConnectionsMap);
        	  }else{
        		 log.error("");
        	   }    
        	};
        };
	})
	connection.on("close", function () {
		log.info("client close"); 
	})
  connection.on("open", function () {
    log.info("client open"); 
  })
	connection.on("error", function () {
		log.info("error ")
	})
})
server.listen(port,function(){
	//console.log(arguments);
}) 


var rabbitConnection=rabbitConnectionFactory.getConnection();

rabbitConnection.on('ready', function () {
	log.info("rabbitConnection ready");
	var q=rabbitConnection.queue(config.rabbit.receiveQueueName,
		{durable:true,autoDelete:false,'arguments': {'x-message-ttl': 600000}});
    q.bind(rabbitConnection.exchange(),config.rabbit.receiveQueueName)
    q.subscribe({ ack: true, prefetchCount: 1 },function (json, headers, deliveryInfo, m) {
	  	try{
           var s = json.appID+":"+json.sensorNum;
           var connections = stringConnectionsMap.get(s);
           if(connections){
              for (var i = connections.length()-1;i >= 0; i--) {
                 var connection =  connections.elementAt(i);
                 connection.sendText(JSON.stringify(json))
              }; 
             }  
       	}catch(e){
	  		log.error(e);
	  	}
	  	try{
	      	m.acknowledge(true);
	  	}catch(e){
	  		log.error("ack msg error:",e);
	  	}
    });
});

function strSplit(str){
  return str.split(",");
}

function broadcast(str) {
	server.connections.forEach(function (connection) {
		connection.sendText(str)
	})
}
      