module.exports = function ( app ){
  app.use(function ( err, req, res, next ){
    app.get("log").error({err: err.original})
    switch ( req.headers.accept ) {
      case "application/json":
        res.send(err.original)
        break
      default:
        res.render("error/"+(err.status || 500), err)
    }
  })
}