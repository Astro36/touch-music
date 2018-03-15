/* eslint no-await-in-loop: 0 */

const TextAnalyzer = require('./TextAnalyzer');
const TFIDFAnalyzer = require('./TFIDFAnalyzer');

class SongAnalyzer {
  static async run(songs) {
    const songData = [];
    for (let i = 0, len = songs.length; i < len; i += 1) {
      const song = songs[i];
      const title = await song.getTitle();
      const lyric = await song.getLyric();
      console.log(`"${title}" 가져오는 중...`);
      songData.push([title, lyric]);
    }
    console.log('형태소 분석 중...');
    const lyricDocuments = songData.map(value => TextAnalyzer.run(value[1]));
    const lyricWordList = TFIDFAnalyzer.run(lyricDocuments);
    const unique = arr => [...new Set(arr)];
    console.log('키워드 분석 중...');
    return songData.map(([title, lyric], index) => {
      const keywords = lyricWordList[index][1];
      const keysentences = unique(lyric.split('\n'))
        .filter(Boolean)
        .map(line => [
          line,
          keywords.filter(keyword => TextAnalyzer.run(line).includes(keyword)).length,
        ])
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(value => value[0]);
      return {
        song: songs[index],
        title,
        keywords,
        keysentences,
      };
    });
  }
}

module.exports = SongAnalyzer;
