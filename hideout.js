module.exports = function( hideout ){
  hideout
    .config(function( options ){
      options.defaults = true
      options.verbose = true
    })
    .copy([
      "*",
      ".gitignore"
    ])
    .make([
      ".des",
      "logs",
      "bower_components",
      "client",
      "public/downloads",
      "public/uploads",
      "public/uploads",
      "public/static/css",
      "public/static/js",
      "public/static/img",
      "public/static/sprite",
      "public/static/template"
    ])
    .sequence("npmInit")
    .dependencies({
      "formidable": "1.0.15",
      "superagent": "0.18.0",
      "dustin": "^1.2.1",
      "serve-favicon": "2.0.1",
      "serve-index": "1.1.4",
      "bunyan": "0.23.1",
      "express": "4.6.1",
      "sitemap": "0.7.3",
      "cookie-parser": "1.3.2",
      "connect-livereload": "0.4.0",
      "body-parser": "~1.6.0"
    })
    .devDependencies({
      "gulp": "~3.8.6",
      "glob": "4.0.4",
      "merge-stream": "0.1.5",
      "gulp-stylist": "^1.2.1",
      "gulp-dustin": "^1.0.3",
      "gulp-concat": "2.3.4",
      "gulp-watch": "0.6.8",
      "gulp-imagemin": "0.6.1",
      "gulp-changed": "~0.4.0",
      "portreserver": "~1.0.1",
      "nodemon": "~1.2.1",
      "open": "0.0.5",
      "browser-sync": "~1.3.0",
      "through2": "~0.5.1",
      "gulp.spritesmith": "~1.1.1",
      "gulp-autoprefixer": "0.0.8",
      "gulp-minify-css": "~0.3.7",
      "gulp-less": "~1.3.2",
      "gulp-util": "~3.0.0",
      "plumber": "~0.4.3",
      "gulp-plumber": "~0.6.4",
      "gulp-browserify": "~0.5.0",
      "connect-inject": "~0.3.2",
      "gulp-uglifyjs": "~0.4.2",
      "gulp-rename": "~1.2.0",
      "minimist": "~0.2.0"
    })
    .npmInstall()
    .start(__dirname+"/project", function(  ){
      console.log("Done!")
    })
}