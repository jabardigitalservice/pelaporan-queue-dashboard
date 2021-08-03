const { ObjectId } = require('mongoose').Types

const { ROLE } = require('./constant')

const exportByRole = (params, user) => {
  if (user.role === ROLE.KOTAKAB) {
    params.author_district_code = user.code_district_city;
  } else if (user.role === ROLE.PROVINCE || user.role === ROLE.ADMIN) {
    //
  } else {
    params.author = new ObjectId(user._id);
    params.author_district_code = user.code_district_city;
  }
  return params
}

const filterRole = (query, user, name) => {
  const params = {}
  if (user.role === ROLE.PROVINCE || user.role === ROLE.ADMIN) {
    if (query[name]) params[name] = query[name]
  }

  return params
}

module.exports = { exportByRole, filterRole }
