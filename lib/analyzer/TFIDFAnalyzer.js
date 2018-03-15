const unique = arr => [...new Set(arr)];
const size = object => object.length;
const f = (term, document) => size(document.filter(term2 => term === term2));
const tf = (term, document) => f(term, document) / size(document);
const idf = (term, documents) => Math.log(size(documents)
  / (1 + size(documents.filter(document => document.some(term2 => term === term2)))));
const tfidf = (term, document, documents) => tf(term, document) * idf(term, documents);

class TFIDFAnalyzer {
  static run(documents) {
    const documentList = [];
    for (let i = 0, len = documents.length; i < len; i += 1) {
      const document = documents[i];
      const uniqueDocument = unique(document);
      const wordList = [];
      for (let j = 0, len2 = uniqueDocument.length; j < len2; j += 1) {
        const word = uniqueDocument[j];
        wordList.push([word, tfidf(word, document, documents)]);
      }
      documentList.push([document, wordList]);
    }
    return documentList.map(([document, wordList]) => [
      document,
      wordList.sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(value => value[0]),
    ]);
  }
}

module.exports = TFIDFAnalyzer;
