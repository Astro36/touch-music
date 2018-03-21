const electron = require('electron');

const Window = require('./window.js')

const { app } = electron;
const { BrowserWindow } = electron;

let mainWindow = null

const buildWindow = () => {
  mainWindow = new Window({
    width: 500,
    height: 500,
    minWidth: 200,
    minHeight: 200,
  });

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