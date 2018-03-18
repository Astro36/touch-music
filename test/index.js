const fs = require('fs');
const path = require('path');

const { SongAnalyzer, SongList } = require('../lib');

(async () => {
  const songs = SongList.fromJSONFile(path.join(__dirname, '../data/melon_songs.json'));
  const songData = await SongAnalyzer.run(songs);
  fs.writeFileSync(path.join(__dirname, '../data/melon_songs.analyzed.json'), JSON.stringify(songData, null, 4));
})();
