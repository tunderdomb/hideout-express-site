var imagemin = require("gulp-imagemin")
var plumber = require('gulp-plumber')

module.exports = function( gulp, tasks ){

  gulp.task("imagemin", function(  ){
    return gulp.src("public/static/**/*.{png,jpe?g,gif,svg}")
      .pipe(plumber())
      .pipe(imagemin({
        optimizationLevel: 7,
        progressive: true
      }))
      .pipe(gulp.dest("public/static/"))
  })
}