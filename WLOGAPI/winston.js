const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');

//Formatting the date for the log name
const date = new Date();
let finalDate = date.toLocaleDateString().replace(/\//g, "-");
finalDate = finalDate.replace(",", "") + "--" +  date.getHours();
finalDate = finalDate.replace(/:/g, "-");
finalDate = finalDate.replace(" PM", "");
finalDate = finalDate.replace(" AM", "");

//Create transport for daily rotating files
let transport = new (transports.DailyRotateFile)({
  filename: './logs/wlogapi-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: false,
  maxSize: '20m',
  maxFiles: '14d',
  auditFile: './logs/audit.json'
});

transport.on('rotate', function(oldFilename, newFilename) {
  logger.info("Rotating logging file. Closing " + oldFilename + " and opening " + newFilename);
});

//Creating logger
const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    //format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'WlogApi' },
  transports: [
    transport
  ]
});


// If we're not in production then **ALSO** log to the `console`
// with the colorized simple format.
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple()
    )
  }));
}

module.exports = logger;