var redis = require("redis");

var config=require('./config.js'),
log=require('./logger.js').getLogger("system");
redis.debug_mode=config.redis.debug_mode;

function getConnection(options){
	var con= redis.createClient(config.redis.port,config.redis.host,options);
	con.on("error", function (err) {
	    log.error("redis " + err);
	});
	
	return con;
}
exports.getConnection=getConnection;

exports.getConnectionToDB=function (dbIndex,options){
	var con= getConnection(options);
	con.select(dbIndex); //选择第七个数据库
	return con;
}