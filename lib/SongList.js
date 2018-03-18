const fs = require('fs');

const Song = require('./Song');

class SongList {
  static fromJSONFile(file) {
    if (fs.existsSync(file)) {
      return JSON.parse(fs.readFileSync(file))
        .map(({ artist, lyric, title }) => new Song.Builder()
          .setAlbum(null)
          .setArtist(artist)
          .setGerne(null)
          .setLyric(lyric)
          .setTitle(title)
          .create());
    }
    return null;
  }
}

module.exports = SongList;
