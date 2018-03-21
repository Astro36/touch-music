const electron = require('electron');

const Window = require('./window.js')

const { app } = electron;
const { BrowserWindow } = electron;

let mainWindow = null
let musicWindow = null

const buildWindow = () => {
  mainWindow = new Window({
    width: 500,
    height: 500,
    minWidth: 200,
    minHeight: 200,
  }, 1, 96);

  mainWindow.load('index.html');
}

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

exports.showMusicPlayer = () => {
  musicWindow = new Window({
    width: 150,
    height: 200,
    minWidth: 100,
    maxWidth: 300,
    alwaysOnTop: true
    }, 9/16, 64);

  musicWindow.load('player.html');
}