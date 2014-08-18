var express = require('express')
var path = require("path")
var bodyParser = require("body-parser")

var faviconIco = path.join(process.cwd(), "public/static/favicon/favicon.ico")
var faviconDir = path.join(process.cwd(), "public/static/favicon/")

module.exports = function( app ){
  /* rerouting favicons to the root of the site keeping dir structure organized */
  app.use(require('serve-favicon')(faviconIco))
  app
    .route(/^\/(?:apple-touch-icon|favicon|mstile)-(\d{2,3})x\1|browserconfig\.xml/)
    .get(express.static(faviconDir))

  /* generating sitemap */
  require("./sitemap")(app)

  /* always parse cookies */
  app.use(require('cookie-parser')())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: false}))
}