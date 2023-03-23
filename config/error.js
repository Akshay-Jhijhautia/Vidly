const { createLogger, transports, format }= require('winston');
require('winston-mongodb');

const logger = createLogger({
    transports : [
        new transports.MongoDB({
            level: 'error',
            db: 'mongodb://localhost/vidly',
            options : { useUnifiedTopology: true },
            format: format.combine(format.timestamp(), format.json())
        })
    ]
})


module.exports = logger;