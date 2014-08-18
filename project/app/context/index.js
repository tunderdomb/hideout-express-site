var clone = require("../util/clone")
var DEBUG = process.env.NODE_ENV == "development"
var base = {
  NODE_ENV_DEVELOPMENT: DEBUG
}

module.exports = function ( name, ext ){
  try{
    return clone(base, require("./"+name+".json"), ext)
  }
  catch( e ){
    return clone(base, ext)
  }
}