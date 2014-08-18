var dustin = require("gulp-dustin")
var plumber = require('gulp-plumber')

var FILES = {
//  "compile": {
//    "src": "",
//    "dest": "public/static/template/"
//  }
}

module.exports = function ( gulp, tasks ){
  gulp.multiTask("compile", FILES, function ( name, target ){
    gulp
      .src(target.src)
      .pipe(plumber())
      .pipe(dustin.compile({
        "resolve": "view/",
        "preserveWhiteSpace": false
      }))
      .pipe(gulp.dest(target.dest))
  })

  dustin.client("public/static/js/dustin", "/static/template/", {
    dustinHelpers: true,
    dustHelpers: true,
    userHelpers: ".helpers/client/*.js"
  })
}