const fs = require('fs');

const Song = require('./Song');

class SongList {
  constructor(songs) {
    this.songs = [];
  }

  static fromJSONFile(file) {
    if (fs.existsSync(file)) {
      return new SongList(JSON.parse(fs.readFileSync(file))
        .map(({ artist, lyric, title, keywords, keysentences }) => new Song.Builder()
          .setAlbum(null)
          .setArtist(artist)
          .setGerne(null)
          .setLyric(lyric)
          .setLyricKeysentences(keysentences)
          .setLyricKeywords(keywords)
          .setTitle(title)
          .create()));
    }
    return null;
  }

  findAll(topic) {
    const {songs}=this;
    return songs.filter(song => song.getLyricKeysentences().some(lyric => lyric.includes(topic)));
  }
}

module.exports = SongList;
