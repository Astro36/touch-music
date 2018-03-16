#!/usr/bin/python
#-*- coding: utf-8 -*-

import datetime
import json
import multiprocessing
import os
import re
import sys
import requests
from bs4 import BeautifulSoup


def get_song_detail(song_id):
    print(song_id)
    url = 'http://www.melon.com/song/detail.htm?songId={}'.format(song_id)
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
        title = element_title.get_text().replace(u'곡명', '').strip()
        return {
            'artist': artist,
            'lyric': lyric,
            'title': title
        }


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
    def get_url(date_delta):
        start_date = datetime.datetime(
            2018, 3, 5) - datetime.timedelta(days=date_delta)
        end_date = datetime.datetime(
            2018, 3, 11) - datetime.timedelta(days=date_delta)
        return 'http://www.melon.com/chart/search/list.htm?chartType=WE&age=2010&year={}&mon={}&day={}^{}&classCd=GN0000&startDay={}&endDay={}&moved=Y'.format(
            start_date.strftime("%Y"),
            start_date.strftime("%m"),
            start_date.strftime("%Y%m%d"),
            end_date.strftime("%Y%m%d"),
            start_date.strftime("%Y%m%d"),
            end_date.strftime("%Y%m%d"),
        )
    output_path = os.getcwd()
    urls = map(get_url, range(0, 365, 7))
    pool = multiprocessing.Pool(multiprocessing.cpu_count())
    song_ids = list(set(sum(pool.map(get_song_ids, urls), [])))
    f = open(u'{}/song_ids.json'.format(output_path), 'w')
    f.write(json.dumps(song_ids, indent=4))
    f.close()
    songs = pool.map(get_song_detail, song_ids)
    f = open(u'{}/songs.json'.format(output_path), 'w')
    f.write(json.dumps(songs, indent=4, ensure_ascii=False).encode('utf8'))
    f.close()
