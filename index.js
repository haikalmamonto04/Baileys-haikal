// index.js (ESM) - Custom Baileys by Haikal

import * as baileys from '@whiskeysockets/baileys'
import * as buttons from './lib/buttons.js'
import { startPairing } from './lib/pairing.js'

// Gabungkan semua export dari baileys + custom
export default {
  ...baileys,
  ...buttons,
  startPairing
}