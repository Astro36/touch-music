function initList() {
  let songs = songList.findAll(topicWord).splice(0, 5);

  for (let item of songs) {
    const artist = item.getArtist();
    const title = item.getTitle();
    const album = item.getAlbumArtUrl();

    $('#song-list').append(
      `<tr>
        <td><img src="${album}" width="48px" height="48px"></td>
        <td class="album"><a onclick="openMusic(\'${title}\', \'${artist}\')">${title}</a></td>
        <td>${artist}</td>
      </tr>`
    )
  }
}

async function openMusic (title, artist) {
  const url = await Youtube.find(title + ' ' + artist);
  const id = url.split('watch?v=')[1];

  mainJS.showMusicPlayer (id, title, artist);
}