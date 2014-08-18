module.exports = function clone(  ){
  var key
    , ret = {}
    , args = [].slice.call(arguments)
  args.forEach(function( obj ){
    if( obj ) for( key in obj ){
      if( obj.hasOwnProperty(key) ) ret[key] = obj[key]
    }
  })
  return ret
}
