// Touch Music
// Copyright (C) 2018  창조코딩

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

const fs = require('fs');

const Song = require('./Song');

class SongList {
  constructor(songs) {
    this.songs = songs;
  }

  static fromJSONFile(file) {
    if (fs.existsSync(file)) {
      return new SongList(JSON.parse(fs.readFileSync(file))
        .map(({
          artist, lyric, title, keywords, keysentences,
        }) => new Song.Builder()
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
    const { songs } = this;
    return songs.filter(song => song.getLyricKeysentences().some(lyric => lyric.includes(topic)));
  }
}

module.exports = SongList;
