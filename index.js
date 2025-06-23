const baileys = require('@whiskeysockets/baileys')
const buttons = require('./lib/buttons')

module.exports = {
  ...baileys,
  ...buttons
}