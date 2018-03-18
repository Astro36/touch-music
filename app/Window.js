const { BrowserWindow, app } = require('electron');

const path = require('path');
const url = require('url');

class Window {
  constructor () {
    this.window = new BrowserWindow({
      frame: false,
      transparent: true,
      minWidth: 400,
      minHeight: 200
    });
    this.isClosed = false

    this.window.on('closed', () => {
      this.isClosed = true
    })
  }

  load (_path) {
    this.window.loadURL(url.format({
      pathname: path.join(__dirname, _path),
      protocol: 'file:',
      slashes: true,
    }));
  }

  quit () {
    app.quit();
  }
}

module.exports = Window;
