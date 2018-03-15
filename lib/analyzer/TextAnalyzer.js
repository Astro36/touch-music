const OpenKoreanText = require('open-korean-text-node').default;

class TextAnalyzer {
  static run(text) {
    const tokens = OpenKoreanText.tokenizeSync(text);
    const words = OpenKoreanText.tokensToJsonArraySync(tokens, false)
      .filter(value => ['Alpha', 'Number', 'Noun', 'Verb', 'Abverb'].includes(value.pos))
      .map(value => (value.stem ? value.stem : value.text));
    return words;
  }
}

module.exports = TextAnalyzer;
