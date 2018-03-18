class Song {
  constructor(title, artist, album, gerne, lyric, keywords, keysentences) {
    this.album = album;
    this.artist = artist;
    this.gerne = gerne;
    this.lyric = lyric;
    this.keywords = keywords;
    this.keysentences = lyrikeysentencesc;
    this.title = title;
  }

  getAlbum() {
    return this.album;
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
        return new Song(this.title, this.artist, this.album, this.gerne, this.lyric, this.keywords, this.keysentences);
      }

      setAlbum(album) {
        this.album = album;
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
