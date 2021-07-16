const validateData = (req, res, msg, message, result) => {
  let messages
  if (result) {
    messages = msg.successResponse(res, message, result)
  } else {
    messages = msg.notFoundHandler(req, res)
  }

  return messages
}

module.exports = { validateData }
