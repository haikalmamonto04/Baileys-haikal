// lib/pairing.js – Pairing Code Generator by Haikal

import readline from 'readline'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import ora from 'ora'
import chalk from 'chalk'
import qrcode from 'qrcode-terminal'
import { Boom } from '@hapi/boom'
import baileys from '@haikalmamonto04/baileys-haikal'

const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason
} = baileys

const __dirname = dirname(fileURLToPath(import.meta.url))

// Fungsi minta input nomor dari terminal
function promptPhoneNumber() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    rl.question(chalk.yellowBright('🟡 Masukkan nomor WhatsApp Business bot kamu (e.g. 628xxxxxx): '), (number) => {
      rl.close()
      resolve(number.trim())
    })
  })
}

// Fungsi utama pairing
export async function startPairing() {
  const number = await promptPhoneNumber()
  const jid = number.includes('@s.whatsapp.net') ? number : number + '@s.whatsapp.net'

  const spinner = ora('Menghubungkan dan menghasilkan Pairing Code...').start()

  const { state, saveCreds } = await useMultiFileAuthState(join(__dirname, '../session'))

  const sock = makeWASocket({
    auth: state,
    browser: ['BOTGRUP', 'Haikal', '1.0.0'],
    mobile: true,
    printQRInTerminal: false
  })

  sock.ev.on('connection.update', ({ connection, lastDisconnect, pairingCode }) => {
    if (pairingCode) {
      spinner.stop()
      console.log(chalk.cyanBright(`\n🔑 Pairing Code untuk nomor ${chalk.bold(number)}:`))
      console.log(chalk.greenBright(`\n${pairingCode}\n`))
    }

    if (connection === 'open') {
      spinner.succeed('✅ Berhasil terhubung ke WhatsApp dengan pairing code!')
    } else if (connection === 'close') {
      const reason = new Boom(lastDisconnect?.error)?.output?.statusCode
      if (reason === DisconnectReason.loggedOut) {
        console.log(chalk.red('🔒 Bot logout. Pairing ulang diperlukan.'))
      } else {
        console.log(chalk.red(`❌ Koneksi terputus (Reason: ${reason})`))
        startPairing()
      }
    }
  })

  sock.ev.on('creds.update', saveCreds)
}