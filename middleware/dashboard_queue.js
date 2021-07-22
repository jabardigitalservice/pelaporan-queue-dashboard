/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/no-unresolved
const Arena = require('bull-arena')
const Bee = require('bee-queue')

const redactionDashboard = 'Dashboard Queue Pelaporan'
require('dotenv').config()

const arena = new Arena({
  Bee,
  queues: [
    {
      type: 'bee',
      // Name of the bull queue, this name must match up exactly with what you've defined in bull.
      name: 'queue-export-cases',
      // Hostname or queue prefix, you can put whatever you want.
      hostId: redactionDashboard,
      // Redis auth.
      redis: {
        port: process.env.REDIS_PORT,
        host: process.env.REDIS_HOST
      }
    },
    {
      type: 'bee',
      name: 'queue-export-histories',
      hostId: redactionDashboard,
      redis: {
        port: process.env.REDIS_PORT,
        host: process.env.REDIS_HOST
      }
    }
  ],
  customCssPath: 'https://example.com/custom-arena-styles.css',
  customJsPath: 'https://example.com/custom-arena-js.js',
},
{
  basePath: '/arena',
  disableListen: true,
})

module.exports = { arena }
