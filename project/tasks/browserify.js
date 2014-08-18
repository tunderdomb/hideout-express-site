var browserify = require("gulp-browserify")
var concat = require('gulp-concat')
var plumber = require('gulp-plumber')
var glob = require('glob')
var merge = require('merge-stream')
var uglify = require('gulp-uglifyjs')
var rename = require('gulp-rename')

module.exports = function( gulp, tasks ){

  gulp.task("browserify", function(  ){
    var scripts = glob.sync("client/*.js").map(function( script ){
      return gulp.src(script)
        .pipe(plumber())
        .pipe(browserify({}))
        .pipe(gulp.dest('public/static/js'))
        .pipe(uglify())
        .pipe(rename({
          extname: ".min.js"
        }))
        .pipe(gulp.dest('public/static/js'))
    })
    return merge(scripts)
  })

  gulp.task("browserify:reload", ["browserify"], function(  ){
    tasks.reload()
  })

  tasks.push("browserify:watch")
  gulp.task("browserify:watch", function(  ){
    gulp.watch(["client/**/*.js", "model/**/*.js"], ["browserify:reload"])
  })
}