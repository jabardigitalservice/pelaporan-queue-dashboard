/* eslint-disable global-require */
const httpMock = require('node-mocks-http')
const {
  resultValidation, countValidation
} = require('../utils')

let req
let res

/* eslint-disable no-undef */
describe('utils custom testing ', () => {
  beforeEach(() => {
    // create express request and response mock
    req = httpMock.createRequest()
    res = httpMock.createResponse()
    next = jest.fn()
  })

  it('validate resultt', () => {
    resultValidation(req)
  })

  it('coun result', () => {
    const msg = require('../utils/exceptions')
    countValidation(req, res, [], msg)
  })
})
