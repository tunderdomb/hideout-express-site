var sm = require("sitemap")

var debugMode = process.env.NODE_ENV == "development"

var sitemap = sm.createSitemap({
  hostname: "http://example.com",
  cacheTime: 600000
})

var cachedXml

module.exports = function ( app ){

  app.get("/sitemap.xml", function ( req, res, next ){
    if ( !debugMode && cachedXml ) {
      res.header("Content-Type", "application/xml")
      res.send(cachedXml)
      return
    }
    sitemap.toXML(function ( xml ){
      if( !debugMode ) cachedXml = xml
      res.header("Content-Type", "application/xml")
      res.send(xml)
    })
  })
}