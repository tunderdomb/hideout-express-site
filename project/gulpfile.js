var path = require("path")

var gulp = require("gulp")
var glob = require("glob")
var merge = require('merge-stream')

var CWD = process.cwd()
var TASK_DIR = "tasks"
var TASK_FILES = path.join(CWD, TASK_DIR, "*.js")

var tasks = []

gulp.multiTask = function ( name, config, deps, task ){
  if ( !task ) {
    task = deps
    deps = []
  }
  gulp.task(name, deps, function (){
    var setup
      , streams = []
      , stream
    if ( Array.isArray(config) ) {
      config.map(function ( setup ){
        stream = task(name, setup)
        if ( stream ) streams.push(stream)
      })
    }
    else for ( var name in config ) {
      setup = config[name]
      stream = task(name, setup)
      if ( stream ) streams.push(stream)
    }
    if ( streams.length ) return merge(streams)
  })
}

glob.sync(TASK_FILES).forEach(function ( task ){
  task = require(task)
  task(gulp, tasks)
})

gulp.task("default", tasks)



