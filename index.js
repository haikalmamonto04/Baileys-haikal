const baileys = require('@whiskeysockets/baileys')
const buttons = require('./lib/buttons.js') // tambahkan ekstensi biar aman di semua runtime

// Ekspor semua isi Baileys + tombol custom kamu
module.exports = {
  ...baileys,
  ...buttons
}