const logger = require('../config/error');

module.exports = function(err,req,res,next){
    logger.error(err,err.message);
    res.status(500).send("Something failed");
}