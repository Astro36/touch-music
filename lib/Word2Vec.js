const fs = require('fs');

var Parser = require('tsv').Parser
var CSV = new Parser("\t", { header: false })

const Vector = require('./Vector');

class Word2Vec {
  constructor(vectors, size = -1) {
    this.vectors = vectors;
    if (size > 0) {
      this.size = size;
    } else {
      this.size = Object.values(vectors)[0].valueOf().length;
    }
  }

  static load(file) {
    const content = CSV.parse(fs.readFileSync(file).toString());
    const vectors = {};
    const size = JSON.parse(content[0][2]).length;
    for (let i = 0, len = content.length; i < len; i += 1) {
      const value = content[i];
      vectors[value[1]] = new Vector(JSON.parse(value[2]));
    }
    return new Word2Vec(vectors, size);
  }

  /**
   * @param {Object.<Array>} texts
   * @param {Array.<string>} texts.positive
   * @param {Array.<string>} texts.negative
   * @param {number} amount
   * @returns {Array.<Vector>}
   */
  analogy({ positive = [], negative = [] }, amount = 10) {
    const { vectors, size } = this;
    const getVector = texts => texts.map(value => this.getVector(value) || Vector.ones(size));
    const inputVectors = [
      ...getVector(positive),
      ...getVector(negative).map(value => value.negative()),
    ];
    return Object.entries(vectors)
      .map(([text, vector]) => [
        text,
        vector,
        inputVectors.map(value => value.similarity(vector))//.reduce((numA, numB) => numA + numB),
      ])
      .sort((a, b) => b[2] - a[2])
      .slice(1, amount + 1)
      .map(([text, vector]) => ({ text, vector }));
  }

  /**
   * @param {string} text
   * @returns {Vector}
   */
  getVector(text) {
    const { vectors } = this;
    if (text in vectors) {
      return vectors[text];
    }
    return null;
  }
}

module.exports = Word2Vec