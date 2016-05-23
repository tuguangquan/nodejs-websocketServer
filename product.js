var context = require('rabbit.js').createContext('amqp://localhost'); 

var pub = context.socket('PUBLISH'); 
var sub = context.socket('SUBSCRIBE'); 

pub.connect('alerts'); 
sub.connect('alerts'); 

pub.write("Emergency. There's an emergency going on", 'utf8'); 

sub.setEncoding('utf8'); 
sub.on('data', function(note) { console.log("Alarum! %s", note); }); 