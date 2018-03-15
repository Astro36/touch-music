const { SongAnalyzer, SongList } = require('../lib');

(async () => {
  const songs = await SongList.fromDailyChart();
  const songData = await SongAnalyzer.run(songs);
  console.log(songData);
})();
