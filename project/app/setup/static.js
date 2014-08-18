var path = require("path")
var express = require("express")
var debugMode = process.env.NODE_ENV == "development"

module.exports = function ( app ){

  /* link resource root with actual path for bower components */
  app.use("/bower_components", express.static(path.join(process.cwd(), "bower_components"), {
    maxAge: "30d"
  }))

  /* download files */
  app.use("/downloads", express.static(path.join(process.cwd(), "public/downloads"), {
    setHeaders: function ( res, path ){
      res.attachment(path)
    }
  }))

  /* static resources */
  app.use(express.static(path.join(process.cwd(), "public"), {
    maxAge: "30d",
    index: false
  }))

  /* directory listing */
//  app.use(require('serve-index')("public", {icons: true}))
}