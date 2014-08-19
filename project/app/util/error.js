module.exports = function error( status, message, description, original ){
  return {
    status: status,
    message: message,
    description: description,
    original: original
  }
}