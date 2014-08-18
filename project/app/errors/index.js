module.exports = function ( app ){
  app.use(function ( err, req, res, next ){
    app.get("log").error({err: err})
    switch ( req.headers.accept ) {
      case "application/json":
        res.send(err)
        break
      default:
        var status = err.status || 500
        res.render(status, {
          errorCode: err.status,
          errorMessage: err.message,
          stackTrace: err.stack
        })
    }
  })
}