var rabbitConnectionFactory=require('./rabbitConnectionFactory.js') 
var log=require('./logger.js').getLogger("system")
var config=require('./config.js');

var rabbitConnection=rabbitConnectionFactory.getConnection();

  setInterval(getData,5000);  
  function getData(){ 
    // var json = {appId:1001,userId:0001,group:0023,device:21,area:12,collector:132,sensorKind:01,sensor:301,monTime:new Date().getTime(),value:Math.round(Math.random() * 100)};
         var json1 ={appID:1,sensorNum:'001',data:Math.round(Math.random() * 100)}; 
         var json2 ={appID:1,sensorNum:'002',data:Math.round(Math.random() * 100)}; 
         var json3 ={appID:2,sensorNum:'001',data:Math.round(Math.random() * 100)};             
         var json4 ={appID:2,sensorNum:'002',data:Math.round(Math.random() * 100)};
         console.log(json1);
         console.log(json2);
         console.log(json3);
         console.log(json4);
        var exe = rabbitConnection.exchange();
       exe.publish(config.rabbit.receiveQueueName,json1);
       exe.publish(config.rabbit.receiveQueueName,json2);
       exe.publish(config.rabbit.receiveQueueName,json3);
       exe.publish(config.rabbit.receiveQueueName,json4);
        //broadcast(JSON.stringify(json3));
     } 