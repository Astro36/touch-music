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

class Song {
  constructor(title, artist, album, albumArtUrl, gerne, lyric, keywords, keysentences) {
    this.album = album;
    this.artist = artist;
    this.albumArtUrl = albumArtUrl;
    this.gerne = gerne;
    this.lyric = lyric;
    this.keywords = keywords;
    this.keysentences = keysentences;
    this.title = title;
  }

  getAlbum() {
    return this.album;
  }

  getAlbumArtUrl() {
    return this.albumArtUrl;
  }

  getArtist() {
    return this.artist;
  }

  getGerne() {
    return this.gerne;
  }

  getLyric() {
    return this.lyric;
  }

  getLyricKeysentences() {
    return this.keysentences;
  }

  getLyricKeywords() {
    return this.keywords;
  }

  getTitle() {
    return this.title;
  }

  static get Builder() {
    class Builder {
      create() {
        return new Song(
          this.title, this.artist, this.album, this.albumArtUrl, this.gerne,
          this.lyric, this.keywords, this.keysentences,
        );
      }

      setAlbum(album) {
        this.album = album;
        return this;
      }

      setAlbumArtUrl(url) {
        this.albumArtUrl = url;
        return this;
      }

      setArtist(artist) {
        this.artist = artist;
        return this;
      }

      setGerne(gerne) {
        this.gerne = gerne;
        return this;
      }

      setLyric(lyric) {
        this.lyric = lyric;
        return this;
      }

      setLyricKeysentences(keysentences) {
        this.keysentences = keysentences;
        return this;
      }

      setLyricKeywords(keywords) {
        this.keywords = keywords;
        return this;
      }

      setTitle(title) {
        this.title = title;
        return this;
      }
    }
    return Builder;
  }
}

module.exports = Song;
