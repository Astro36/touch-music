const jsdom = require('jsdom');
const request = require('request');

const { JSDOM } = jsdom;

class Song {
  constructor(songId) {
    this.songId = songId;
    this.isInit = false;
  }

  init() {
    const { songId } = this;
    return new Promise((resolve, reject) => {
      request.get(`http://www.melon.com/song/detail.htm?songId=${songId}`, (err, httpResponse, body) => {
        if (err) {
          reject(err);
        } else {
          const { document } = (new JSDOM(body)).window;
          const title = document.querySelector('.info > .song_name').innerHTML.match(/(?:\t)+(.+)\n(?:\t)+$/)[1];
          const artist = document.querySelector('.info > .artist > .artist_name').title;
          const meta = document.querySelector('.meta > .list').innerHTML;
          const album = meta.match(/goAlbumDetail\('\d+'\);">(.+)<\/a>/)[1];
          const gerne = meta.match(/장르<\/dt>\s*<dd>(.+)<\/dd>/)[1].replace('&amp;', '&');
          const lyric = document.querySelector('.wrap_lyric > .lyric').innerHTML
            .match(/(?:\t)+(.+)\n(?:\t)+$/)[1]
            .replace(/<br>/g, '\n')
            .trim();
          this.isInit = true;
          this.album = album;
          this.artist = artist;
          this.gerne = gerne;
          this.lyric = lyric;
          this.title = title;
          resolve({
            album,
            artist,
            gerne,
            lyric,
            title,
          });
        }
      });
    });
  }

  async getAlbum() {
    const { album, isInit } = this;
    if (!isInit) {
      return (await this.init()).album;
    }
    return album;
  }

  async getArtist() {
    const { artist, isInit } = this;
    if (!isInit) {
      return (await this.init()).artist;
    }
    return artist;
  }

  async getGerne() {
    const { gerne, isInit } = this;
    if (!isInit) {
      return (await this.init()).gerne;
    }
    return gerne;
  }

  async getLyric() {
    const { lyric, isInit } = this;
    if (!isInit) {
      return (await this.init()).lyric;
    }
    return lyric;
  }

  async getTitle() {
    const { title, isInit } = this;
    if (!isInit) {
      return (await this.init()).title;
    }
    return title;
  }

  static get Builder() {
    class Builder {
      create() {
        const song = new Song();
        song.isInit = true;
        song.album = this.album;
        song.artist = this.artist;
        song.gerne = this.gerne;
        song.lyric = this.lyric;
        song.title = this.title;
        return song;
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
