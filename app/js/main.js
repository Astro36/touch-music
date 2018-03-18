const remote = require('electron').remote;
const path = require('path');

const win = remote.getCurrentWindow();

function showScreen (_path) {
  $('#root').load(_path);
}

$('#close').click(() => {
  win.close();
});
$('#minimize').click(() => {
  win.minimize();
});
