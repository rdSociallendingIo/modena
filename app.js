'use strict';

var nodeModel = require('./lib/node');
var node = new nodeModel();
loggerEth.debug("info....................................loggerEth")
loggerEth.debug("debug....................................logger")
var gracefulShutdown = function(val) {
    if (val) {
        loggerEth.error("gracefulShutdown signal", val);
    }
    loggerEth.error("xxx", "sys", "Received kill signal, shutting down gracefully.");

    node.stop();
    loggerEth.debug("xxx", "sys", "Closed node watcher");

    setTimeout(function(){
        loggerEth.debug("xxx", "sys", "Closed out remaining connections.");
        process.exit(0);
    }, 1000);
}
// listen for TERM signal .e.g. kill
process.on('SIGTERM', function() {
    gracefulShutdown("SIGTERM");
});
// listen for INT signal e.g. Ctrl-C
process.on('SIGINT', function() {
    gracefulShutdown("SIGINT");
});
// listen for shutdown signal from pm2
process.on('message', function(msg) {
    loggerEth.log('msg <== ', msg);
	if (msg == 'shutdown')
		gracefulShutdown();
});
module.exports = node;
