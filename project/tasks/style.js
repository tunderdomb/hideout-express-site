var stylist = require("gulp-stylist")
var prefix = require('gulp-autoprefixer')
var minifyCss = require('gulp-minify-css')
var less = require('gulp-less')
var plumber = require('gulp-plumber')

module.exports = function ( gulp, tasks ){

  function renderLess(){
    return gulp.src("style/*.less")
      .pipe(plumber())
      .pipe(less({}))
      .pipe(minifyCss({
        noAdvanced: true
      }))
      .pipe(prefix("last 2 versions", "> 1%", "ie 8", "Android 2", "Firefox ESR"))
      .pipe(plumber.stop())
      .pipe(gulp.dest("public/static/css/"))
      .pipe(tasks.reloadStream())
  }

  gulp.task("less:render", function (){
    renderLess()
  })

  gulp.task("less:sprite", ["sprite"], function (){
    return renderLess()
  })

  gulp.task("extract", function (){
    return gulp.src("view/**/*.dust")
      .pipe(plumber())
      .pipe(stylist({
        style: "less",
        ignore: "style/**/*.less"
      }))
  })

  tasks.push("style:watch")
  gulp.task("style:watch", function (){
    gulp.watch("{view,style}/**/*.less", ["less:render"])
    gulp.watch("view/**/*.dust", ['extract', "reload"])
  })
}