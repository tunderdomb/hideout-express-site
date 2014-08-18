var debugMode = process.env.NODE_ENV == "development"
var bunyan = require("bunyan")
var logsDir = process.cwd() + "/logs"
var firstLogFile = logsDir + "/log.json"

var fs = require("fs")

if( !fs.existsSync(firstLogFile) ) {
  if( !fs.existsSync(logsDir) ) fs.mkdirSync(logsDir)
  fs.writeFileSync(firstLogFile, "", "utf8")
}

module.exports = bunyan.createLogger({
  name: "site log",
  src: debugMode,
  serializers: bunyan.stdSerializers,
  streams: [
    {
      path: firstLogFile
    }
  ]
})