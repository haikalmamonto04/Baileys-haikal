function makeTemplateButtons(text, buttons, footer = '', headerType = 1) {
  return {
    text,
    footer,
    templateButtons: buttons.map((btn, i) => ({
      index: i,
      quickReplyButton: {
        displayText: btn.text,
        id: btn.id
      }
    })),
    headerType
  }
}

module.exports = {
  makeTemplateButtons
}