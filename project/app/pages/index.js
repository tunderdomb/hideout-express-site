//var pageContext
var context = require("../context")

module.exports = function ( app ){

  /* public page routes */

  app.get("/", function ( req, res, next ){
    res.render("index/index", context("index", {}))
  })
}