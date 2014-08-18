var exec = require("child_process").exec
var argv = require("minimist")(process.argv.splice(2))
var reserve = require("portreserver")
var IP = reserve.IP
var nodemon = require("nodemon")
var nodemonSettings = require("../nodemon")
var open = require("open")
var browserSync = require("browser-sync")
var reload = browserSync.reload
var browserSyncVersion = require("browser-sync/package.json").version

var PORT
  , LIVERELOAD_PORT
  , WEINRE_PORT
  , useWeinre = argv.weinre || argv.w
  , openBrowser = argv.open || argv.o
  , useNodemon = argv.nodemon || argv.n
  , productionMode = argv.production || argv.p
  , mountedPath = argv.m || ""

console.log("cli arguments", argv)
console.log("production mode ", !!productionMode)

module.exports = function ( gulp, tasks ){

  // exposing reload function to other tasks
  tasks.reload = reload
  tasks.reloadStream = function (){
    return reload({stream: true})
  }

  // convenience task
  gulp.task("reload", function (){
    reload()
  })

  gulp.task("server:setup", setupServer)
  tasks.push("server")
  gulp.task("server", ["server:setup"], liveReloadTask)

  function livereloadScriptPath( livereloadPort ){
    return "//" + IP + ":" + livereloadPort + "/browser-sync-client." + browserSyncVersion + ".js"
  }

  function weinreScriptPath( weinrePort ){
    return "//" + IP + ":" + weinrePort + "/target/target-script-min.js"
  }

  function setupEnv( env, serverPort, livereloadPort, weinrePort ){
    env.PORT = serverPort
    env.LIVERELOAD = livereloadScriptPath(livereloadPort)
    env.NODE_ENV = productionMode ? "production" : "development"
    env.mountDir = mountedPath
    if ( useWeinre ) env.WEINRE = weinreScriptPath(weinrePort)
  }

  function setupNodemon( serverPort, livereloadPort, weinrePort, cb ){
    // nodemon forks a child process, environment variables can be added to its env option
    setupEnv(nodemonSettings.env, serverPort, livereloadPort, weinrePort)
    nodemon(nodemonSettings).on("start",function (){
      console.log("App has started")
      if ( cb ) {
        // prevent callback to be called more than once,
        // because "start" is fired every time the server starts
        cb()
        cb = null
      }
    }).on("quit",function (){
      console.log("App has quit")
    }).on("restart", function ( files ){
      console.log("App restarted due to: ", files)
    })
  }

  function setupSimpleServer( serverPort, livereloadPort, weinrePort, cb ){
    // starting in the same process, we need to configure the local process.env
    setupEnv(process.env, serverPort, livereloadPort, weinrePort)
    require("../app/index")(require("express")())
    cb()
  }

  function setupServer( cb ){
    reserve(8000, 3, function ( serverPort, livereloadPort, weinrePort ){
      PORT = serverPort
      LIVERELOAD_PORT = livereloadPort
      if ( useWeinre ) WEINRE_PORT = weinrePort
      if ( useNodemon ) {
        console.log("Setting up nodemon")
        setupNodemon(serverPort, livereloadPort, weinrePort, cb)
      }
      else {
        console.log("Setting up simple server")
        setupSimpleServer(serverPort, livereloadPort, weinrePort, cb)
      }
    })
  }

  function liveReloadTask(){
    // setting up livereloading then opening browser
    browserSync({
      notify: false,
      port: LIVERELOAD_PORT,
      proxy: {
        host: IP,
        port: PORT
      }
    }, function (){
      if( useWeinre ) {
        startWeinre(function(  ){
          if( !openBrowser ) return
          var weinreAddress = "http://" + IP + ":" + WEINRE_PORT
          console.log("Opening weinre: %s", weinreAddress)
          open(weinreAddress)
        })
      }
      if( !openBrowser ) return
      var webAddress = "http://" + IP + ":" + PORT
      console.log("Opening browser: %s", webAddress)
      open(webAddress)
    })
  }

  function startWeinre( cb ){
    var cmd = "weinre"
      + " --httpPort " + WEINRE_PORT
      + " --boundHost  " + IP
    console.log("Starting weinre")
    exec(cmd, function ( err, stdout, stderr ){
      if ( err ) console.error(err)
      console.log("winre:", stdout)
    })
    // weinre is blocking with a server, we wait a bit for it to start
    setTimeout(cb, 2000)
  }

}