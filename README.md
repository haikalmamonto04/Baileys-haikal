# Baileys-haikal

Custom Baileys untuk kebutuhan WhatsApp bot grup milik Haikal dengan dukungan Pairing Code.

## Fitur Custom
- Dibangun dari Baileys v6.6.0
- **ES Modules (ESM)** support - menggunakan `import/export`
- Tambahan helper `buildTemplateButton()` untuk pesan template dengan tombol
- **Pairing Code Generator** - `startPairing()` untuk koneksi WhatsApp Business
- Siap diintegrasikan ke bot berbasis ESM

## Cara Pakai

### Install dari GitHub:
```bash
npm install github:haikalmamonto04/baileys-haikal
```

### Import dan Penggunaan:
```javascript
// ESM Import
import baileys from '@haikalmamonto04/baileys-haikal'
import { buildTemplateButton, startPairing } from '@haikalmamonto04/baileys-haikal'

// Atau import semua
import * as baileysHaikal from '@haikalmamonto04/baileys-haikal'
```

### Contoh Penggunaan Template Button:
```javascript
const buttons = [
  { id: 'btn1', text: 'Tombol 1' },
  { id: 'btn2', text: 'Tombol 2' }
]

const message = buildTemplateButton(
  '628xxxxx@s.whatsapp.net',
  'Pesan utama Anda',
  buttons,
  'Footer text (opsional)'
)

// Kirim pesan
await sock.sendMessage('628xxxxx@s.whatsapp.net', message)
```

### Contoh Pairing Code:
```javascript
// Generate pairing code untuk WhatsApp Business
await startPairing()
```

## Struktur File
```
baileys-haikal/
├── index.js          # Main export (ESM)
├── lib/
│   ├── buttons.js    # Template button helper
│   └── pairing.js    # Pairing code generator
├── package.json
└── README.md
```

## Dependencies
- `@whiskeysockets/baileys` v6.6.0
- `ora` (untuk spinner)
- `chalk` (untuk warna terminal)
- `qrcode-terminal` (untuk QR code)
- `@hapi/boom` (untuk error handling)