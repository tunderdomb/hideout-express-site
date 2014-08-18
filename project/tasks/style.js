var stylist = require("gulp-stylist")
var prefix = require('gulp-autoprefixer')
var minifyCss = require('gulp-minify-css')
var less = require('gulp-less')
var watch = require("gulp-watch")
var plumber = require('gulp-plumber')

var stylistOptions = {
  style: "less",
  ignore: "style/**/*.less"
}

var lessOptions = {}

var minifyCssOptions = {
  noAdvanced: true
}

module.exports = function ( gulp, tasks ){

  function renderLess(  ){
    return gulp.src("style/*.less")
      .pipe(plumber())
      .pipe(less(lessOptions))
      .pipe(minifyCss(minifyCssOptions))
      .pipe(prefix("last 2 versions", "> 1%", "ie 8", "Android 2", "Firefox ESR"))
      .pipe(gulp.dest("public/static/css/"))
      .pipe(tasks.reloadStream())
  }

  gulp.task("less:sprite", ["sprite"], function(  ){
    return renderLess()
  })

  gulp.task("extract", function (){
    return gulp.src("view/**/*.dust")
      .pipe(plumber())
      .pipe(stylist.extract(stylistOptions))
      .pipe(stylist.append("style/"))
  })

  tasks.push("style:watch")
  gulp.task("style:watch", function(  ){
    watch({glob: "style/**/*.less"}, function( files ){
      return renderLess()
    })
    gulp.watch("view/**/*.dust", ['extract', "reload"])
  })
}