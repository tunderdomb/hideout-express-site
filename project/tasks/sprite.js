var spritesmith = require('gulp.spritesmith')
var path = require("path")

var SPRITE_INDEX = path.join(process.cwd(), "tasks/sprite.json")
var SPRITES_DIR = "public/static/sprite/"
var IMAGES_DIR = "public/static/img/sprite/"
var SPRITE_URL = "/static/img/sprite/"
var STYLES_DIR = "style/sprite"
var OPTIONS = {
  // OPTIONAL: Specify algorithm (top-down, left-right, diagonal [\ format],
  // alt-diagonal [/ format], binary-tree [best packing])
  algorithm: "binary-tree",
  // OPTIONAL: Specify padding between images
  padding: 2,
  // OPTIONAL: Specify engine (auto, phantomjs, canvas, gm, pngsmith)
  engine: "gm",
  // OPTIONAL: Specify img options
  imgOpts: {
    // gm only: Quality of image
    quality: 90
    // phantomjs only: Milliseconds to wait before terminating PhantomJS script
//    timeout: 10000
  }
}
var FILES = {
//  "sprite.png":  {
//    "src": "*.png",
//    "css": "sprite.less"
//  }
}
function merge( obj, obj2 ){
  for ( var prop in obj2 ) {
    if ( obj2.hasOwnProperty(prop) ) obj[prop] = obj2[prop]
  }
  return obj
}
module.exports = function ( gulp, tasks ){
  gulp.multiTask("sprite", FILES, function ( name, options ){
    var src = typeof options.src == "string" ? [options.src] : options.src
    src = src.map(function ( src ){
      return path.join(SPRITES_DIR, src).replace(/\\/g, "/")
    })
    options = merge(options, OPTIONS)
    options.imgName = name
    options.cssName = options.css
    options.imgPath = path.join(SPRITE_URL, name).replace(/\\/g, "/")
    var spriteData = gulp.src(src).pipe(spritesmith(options))
    spriteData.img
      .pipe(gulp.dest(IMAGES_DIR))
      .pipe(tasks.reloadStream())
    return spriteData.css
      .pipe(gulp.dest(STYLES_DIR))
  })

  tasks.push("sprite:watch")
  gulp.task("sprite:watch", function (){
    gulp.watch([SPRITE_INDEX, SPRITES_DIR + "**/*.{png,svg,jpe?g,gif}"], ["sprite", "less:sprite"])

  })
}