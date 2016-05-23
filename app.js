var log = require('./logger.js').getLogger("system");
log.info("{host: \'127.0.0.2',port: \'5672\'}");
log.info("{host: \'127.0.0.1',port: \'5672\'}");
log.info("Rabbit Connection connect Success");
log.info("rabbitConnection ready");