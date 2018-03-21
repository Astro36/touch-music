const { remote } = require('electron');
const path = require('path');

const { SongList, Word2Vec, Youtube } = require('../lib');

const mainJS = remote.require('./main.js')
const win = remote.getCurrentWindow();

let model = null;
let songList = null;
let topicWord = '';
let similarWords = [];
let isReady = false;

Materialize.toast('데이터를 불러오는 중...', 1000);

$(document).ready(() => {
  $('#content').load('./mindmap.html');

  setTimeout(() => {
    model = Word2Vec.load(path.join(__dirname, '../data/word2vec.tsv'));
    songList = SongList.fromJSONFile(path.join(__dirname, '../data/songs.json'));
    isReady = true;
  }, 200);

  $('#close').click(() => {
    win.close();
  });
  $('#minimize').click(() => {
    win.minimize();
  });
});

$('#search-button').click(() => {
  mainJS.showMusicPlayer('uw_HR9jIJww', '노래이름', '가수');
  $('#content').load('./mindmap.html');
  /*
  Materialize.toast('검색 중... 잠시만 기다려 주세요.', 1000);
  
  setTimeout(() => {
    topicWord = $('#search-input').val();
    similarWords = model.analogy({ positive: [topicWord] }, 6);

    initMindMap();
  }, 200);*/
});