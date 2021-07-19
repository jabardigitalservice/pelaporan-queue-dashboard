const httpMock = require('node-mocks-http')
const { validateData } = require('../utils/custom')

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

  it('validate data', () => {
    // eslint-disable-next-line global-require
    const msg = require('../utils/exceptions')
    validateData(req, res, msg, 'world', {})
  })

  it('validate data', () => {
    // eslint-disable-next-line global-require
    const msg = require('../utils/exceptions')
    validateData(req, res, msg, 'world', {})
  })
})
