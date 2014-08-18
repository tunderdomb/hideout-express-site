var debugMode = process.env.NODE_ENV == "development"

module.exports = function ( app ){
  if( !debugMode ) return

  var inject = require("connect-inject")
  var snippet = ""

  if ( process.env.WEINRE ) {
    console.log("Using weinre", process.env.WEINRE)
    /* inject weinre script to pages */
    snippet += '<script async src="' + process.env.WEINRE + '"></script>'
  }
  if ( process.env.LIVERELOAD ) {
    console.log("Using livereload", process.env.LIVERELOAD)
    /* inject browser-sync script to pages */
    snippet += '<script async src="' + process.env.LIVERELOAD + '"></script>'
  }
  if ( snippet ) {
    app.use(inject({snippet: snippet}))
  }
}
