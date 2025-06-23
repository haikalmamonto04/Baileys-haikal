const { generateWAMessageFromContent, proto } = require('@whiskeysockets/baileys')

/**
 * Bangun pesan template buttons dengan konten teks + tombol
 * @param {string} jid - ID penerima
 * @param {string} text - Isi pesan utama
 * @param {Array<{ id: string, text: string }>} buttons - Daftar tombol
 * @param {string} footer - Teks footer (opsional)
 * @param {object} quoted - Pesan yang dikutip (opsional)
 * @returns {object} - WAMessage object siap dikirim
 */
function buildTemplateButton(jid, text, buttons, footer = '', quoted = null) {
  return generateWAMessageFromContent(jid, {
    templateMessage: {
      hydratedTemplate: {
        hydratedContentText: text,
        hydratedFooterText: footer,
        hydratedButtons: buttons.map(btn => ({
          quickReplyButton: {
            displayText: btn.text,
            id: btn.id
          }
        })),
        templateId: 'haikal-button-template'
      }
    }
  }, { quoted })
}

module.exports = {
  buildTemplateButton
}