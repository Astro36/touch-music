class Song {
  constructor(title, artist, album, gerne, lyric) {
    this.album = album;
    this.artist = artist;
    this.gerne = gerne;
    this.lyric = lyric;
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

  getTitle() {
    return this.title;
  }

  static get Builder() {
    class Builder {
      create() {
        return new Song(this.title, this.artist, this.album, this.gerne, this.lyric);
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

      setTitle(title) {
        this.title = title;
        return this;
      }
    }
    return Builder;
  }
}

module.exports = Song;
