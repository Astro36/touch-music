#!/usr/bin/python
#-*- coding: utf-8 -*-

# Touch Music
# Copyright (C) 2018  창조코딩

# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.

# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.

# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.

import datetime
import json
import multiprocessing
import re
import sys
import requests
from bs4 import BeautifulSoup


def get_song_detail(song_id):
    print(song_id)
    url = 'http://www.melon.com/song/detail.htm?songId={}'.format(song_id)
    try:
        req = requests.get(url, headers={
            'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linu…) Gecko/20100101 Firefox/59.0'})
        html = req.text
        soup = BeautifulSoup(html, 'html.parser')
        element_artist = soup.select_one('.info > .artist > .artist_name')
        element_lyric = soup.select_one('.wrap_lyric > .lyric')
        element_title = soup.select_one('.info > .song_name')
        if element_artist is not None \
                and element_lyric is not None \
                and element_title is not None:
            artist = element_artist.get('title').strip()
            lyric = element_lyric.get_text('\n', strip=True)
            title = element_title.get_text().replace(u'곡명', '').replace(u'19금', '').strip()
            return {
                'artist': artist,
                'lyric': lyric,
                'title': title
            }
    except:
        print('Error: song_id = {}'.format(song_id))


def get_song_ids(url):
    print(url)
    req = requests.get(url, headers={
                       'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linu…) Gecko/20100101 Firefox/59.0'})
    html = req.text
    soup = BeautifulSoup(html, 'html.parser')
    element_song_ids = soup.select(
        '.lst50 > td.t_left > .wrap > a.btn_icon_detail')
    song_ids = []
    if element_song_ids is not None:
        for element_song_id in element_song_ids:
            song_id = element_song_id.get('href') \
                .replace('javascript:melon.link.goSongDetail(\'', '') \
                .replace('\');', '')
            if song_id is not None:
                song_ids.append(song_id)
    return song_ids


if __name__ == '__main__':
    def get_gerne_id(year):
        if year >= 2017:
            return 'GN0000'
        elif year >= 2009:
            return 'DP0000'
        elif year >= 2006:
            return 'CL0000'
        else:
            return 'KPOP'

    def get_url(date_delta):
        start_date = datetime.datetime(
            2018, 3, 5) - datetime.timedelta(days=date_delta)
        end_date = datetime.datetime(
            2018, 3, 11) - datetime.timedelta(days=date_delta)
        return 'http://www.melon.com/chart/search/list.htm?chartType=WE&age={}&year={}&mon={}&day={}^{}&classCd={}&startDay={}&endDay={}&moved=Y'.format(
            (int(start_date.strftime("%Y")) // 10) * 10,
            start_date.strftime("%Y"),
            start_date.strftime("%m"),
            start_date.strftime("%Y%m%d"),
            end_date.strftime("%Y%m%d"),
            get_gerne_id(int(start_date.strftime("%Y"))),
            start_date.strftime("%Y%m%d"),
            end_date.strftime("%Y%m%d"),
        )
    urls = map(get_url, range(0, 365 * 5, 7))
    pool = multiprocessing.Pool(multiprocessing.cpu_count())
    song_ids = list(set(sum(pool.map(get_song_ids, urls), [])))
    songs = sorted(filter(None, pool.map(get_song_detail, song_ids)),
                   key=lambda song: song['title'])
    f = open('../songs.json', 'w')
    f.write(json.dumps(songs, ensure_ascii=False).encode('utf8'))
    f.close()
