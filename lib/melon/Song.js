const jsdom = require('jsdom');
const request = require('request');

const { JSDOM } = jsdom;

class Song {
  constructor(songId) {
    this.songId = songId;
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
    const { album } = this;
    if (!album) {
      return (await this.init()).album;
    }
    return album;
  }

  async getArtist() {
    const { artist } = this;
    if (!artist) {
      return (await this.init()).artist;
    }
    return artist;
  }

  async getGerne() {
    const { gerne } = this;
    if (!gerne) {
      return (await this.init()).gerne;
    }
    return gerne;
  }

  async getLyric() {
    const { lyric } = this;
    if (!lyric) {
      return (await this.init()).lyric;
    }
    return lyric;
  }

  async getTitle() {
    const { title } = this;
    if (!title) {
      return (await this.init()).title;
    }
    return title;
  }
}

module.exports = Song;
