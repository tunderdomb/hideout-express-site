var log = require("./setup/logger")

module.exports = function ( app ){

  app.set("log", log)

  require("./setup/engine")(app)
  require("./setup/request-extenders")(app)

  require("./api")(app)
  require("./setup/debugger")(app)
  require("./pages")(app)
  require("./setup/static")(app)
  require("./errors")(app)

  app.listen(process.env.PORT)

  console.log("App setup completed, starting server")
  log.info("environment: " + process.env.NODE_ENV)
  log.info("cwd:" + process.cwd())
  log.info("Starting server on " + process.env.PORT)
  return app
}