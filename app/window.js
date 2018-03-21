const electron = require('electron');

const path = require('path');
const url = require('url');

const { app } = electron;
const { BrowserWindow } = electron;

class Window {
  constructor(option) {
    this.window = new BrowserWindow(Object.assign({
      frame: false,
      transparent: true,
      maximizable: false,
    }, option));

    this.window.on('resize', () => {
      const [size] = this.window.getSize();

      this.window.setSize(size, size + 96);
    });
  }

  load(name) {
    this.window.loadURL(url.format({
      pathname: path.join(__dirname, name),
      protocol: 'file:',
      slashes: true
    }));
  }
}

module.exports = Window;

