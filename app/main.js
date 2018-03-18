const { BrowserWindow, app } = require('electron');
const Window = require('./Window.js');

let win = null

app.on('ready', () => {
  win = new Window();
  win.load('index.html');
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    win.quit();
  }
});

app.on('activate', () => {
  if (win.isClosed) {
    win = new Window();
    win.load('index.html')
  }
});
