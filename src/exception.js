const logger = require('../config/error');

module.exports = function() {
    process.on('uncaughtException', (ex) => { // Catching uncaught exceptions/promise rejections, which are beyond express i.e not happening in request-response pipeline
        console.log("uncaught Exception");
        logger.error(ex,ex.message);   
    });
    
    process.on('unhandledRejection', (ex) => {
        console.log("unhandled Rejection");
        logger.error(ex,ex.message);
    });
}