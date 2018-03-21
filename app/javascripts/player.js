const { remote } = require('electron');

const mainJS = remote.require('./main.js')
const win = remote.getCurrentWindow();

const YOUTUBE_EMBED_HEADER = '<iframe width="100%" style="height: calc(100vw * 9 / 16)" src=https://www.youtube.com/embed/';
const YOUTUBE_EMBED_FOOTER = '?rel=0&amp;controls=1&amp;autoplay=1&amp;showinfo=0 frameborder="0" allow="autoplay; encrypted-media"></iframe>'

$(document).ready(() => {
  $('#video-frame').append(YOUTUBE_EMBED_HEADER + mainJS.youtubeID + YOUTUBE_EMBED_FOOTER);
  $('#title').text(mainJS.title);
  $('#singer').text(mainJS.singer);

  $('#close').click(() => {
    win.close();
  });
});
