const electron = require('electron');

const Window = require('./window.js');

const { app } = electron;
const { BrowserWindow } = electron;

let mainWindow = null;
let musicWindow = null;

const buildWindow = () => {
  mainWindow = new Window({
    width: 400,
    height: 496,
    minWidth: 200,
    minHeight: 200,
  }, 1, 96);

  mainWindow.load('index.html');
};

app.on('ready', buildWindow);
app.on('activate', () => {
  if (mainWindow == null) {
    buildWindow();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

exports.showMusicPlayer = (youtubeID, title, singer) => {
  exports.youtubeID = youtubeID;
  exports.title = title;
  exports.singer = singer;

  musicWindow = new Window({
    width: 300,
    height: 250,
    minWidth: 200,
    maxWidth: 900,
    alwaysOnTop: true,
  }, 9 / 16, 80);

  musicWindow.load('player.html');
};
