const electron = require('electron');

const path = require('path')
const url = require('url')

const app = electron.app
const BrowserWindow = electron.BrowserWindow

let win = null
let buildWindow = () => {
  win = new BrowserWindow({
    frame: false,
    transparent: true,
    minWidth: 300,
    minHeight: 300,
    width: 500,
    height: 500,
  });

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true,
  }));

  win.on('resize', () => {
    size = win.getSize()[0];
    win.setSize(size, size);
  })
}

app.on('ready', buildWindow);
app.on('activate', () => {
  if (win == null) {
    buildWindow()
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
