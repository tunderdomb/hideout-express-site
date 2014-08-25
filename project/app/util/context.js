var clone = require("./clone")
var DEBUG = process.env.NODE_ENV == "development"
var base = {
  NODE_ENV_DEVELOPMENT: DEBUG
}

function dummy( name ){
  if ( !DEBUG ) return {}
  try {
    return require("../context/dummy/" + name)
  }
  catch ( e ) {
    return {}
  }
}

module.exports = function ( name, ext ){
  try {
    return clone(base, require("../context/" + name), ext, dummy(name))
  }
  catch ( e ) {
    return clone(base, ext, dummy(name))
  }
}