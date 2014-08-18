var dustin = require("gulp-dustin")
var plumber = require('gulp-plumber')

module.exports = function( gulp, tasks ){

  gulp.task("render", function(  ){
    gulp
      .src("view/*.dust")
      .pipe(plumber())
      .pipe(dustin.render({
        "resolve": "view/",
        "preserveWhiteSpace": false
      }))
      .pipe(gulp.dest("build/"))
  })

}