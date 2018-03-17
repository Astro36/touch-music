#!/usr/bin/python
#-*- coding: utf-8 -*-

import datetime
import json
import os
import re
import sys
from konlpy.tag import Twitter

if __name__ == '__main__':
    twitter = Twitter()
    output_path = os.getcwd()
    f = open(u'{}/songs.json'.format(output_path), 'r')
    songs = json.loads(f.read())
    for song in songs:
        print(song['title'])
        sentences = song['lyric'].split('\n')
        lyric_words = []
        for sentence in sentences:
            sentence_words = twitter.nouns(sentence)
            lyric_words.append(sentence_words)
        song['lyric_words'] = lyric_words
    f = open(u'{}/songs.analyzed.json'.format(output_path), 'w')
    f.write(json.dumps(songs, indent=4, ensure_ascii=False).encode('utf8'))
    f.close()
