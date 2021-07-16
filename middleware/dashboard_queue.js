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
      name: 'my-awesome-queue',
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
      // Name of the bull queue, this name must match up exactly with what you've defined in bull.
      name: 'my-awesome-queue-2',
      // Hostname or queue prefix, you can put whatever you want.
      hostId: redactionDashboard,
      // Redis auth.
      redis: {
        port: process.env.REDIS_PORT,
        host: process.env.REDIS_HOST
      }
    }
  ],
  // Optionally include your own stylesheet
  customCssPath: 'https://example.com/custom-arena-styles.css',
  // Optionally include your own script
  customJsPath: 'https://example.com/custom-arena-js.js',
},
{
  // Make the arena dashboard become available at {my-site.com}/arena.
  basePath: '/arena',
  // Let express handle the listening.
  disableListen: true,
})

module.exports = { arena }
