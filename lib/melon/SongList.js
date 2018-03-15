const jsdom = require('jsdom');
const request = require('request');

const Song = require('./Song');

const { JSDOM } = jsdom;

class SongList {
  constructor(songs) {
    this.songs = songs;
  }

  static async fromDailyChart() {
    return new Promise((resolve, reject) => {
      request.get('http://www.melon.com/chart/day/index.htm', (err, httpResponse, body) => {
        if (err) {
          reject(err);
        } else {
          const { document } = (new JSDOM(body)).window;
          const songs = Array.from(document.querySelectorAll('.lst50 > td > .wrap.t_right > .input_check'))
            .filter(element => element.value)
            .map(element => new Song(element.value));
          resolve(songs);
        }
      });
    });
  }
}

module.exports = SongList;
