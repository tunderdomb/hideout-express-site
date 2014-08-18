var DEBUG = process.env.NODE_ENV == "development"
var adapter = require("dustin")({
  cache: !DEBUG,
  whiteSpace: false,
  helpers: "helpers/node/*.js",
  resolve: "view/"
})
module.exports = function ( app ){
  app.engine("dust", adapter.__express)
  app.set("view engine", "dust")
  app.set("views", "view/")
  app.set("view cache", false)
}