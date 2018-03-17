#!/usr/bin/python
#-*- coding: utf-8 -*-

import logging
import json
import os
import re
import sys
import gensim
from konlpy.tag import Twitter


if __name__ == '__main__':
    # Extract the words from the lyrics.
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
    f = open(u'{}/songs_analyzed.json'.format(output_path), 'w')
    f.write(json.dumps(songs, indent=4, ensure_ascii=False).encode('utf8'))
    f.close()

    # Train the word2vec model.
    logging.basicConfig(
        format='%(asctime)s : %(levelname)s : %(message)s', level=logging.INFO)
    lyric_sentences = sum(map(lambda song: song['lyric_words'], songs), [])
    model = gensim.models.Word2Vec(lyric_sentences, min_count=1, size=200)
    model.wv.save_word2vec_format(
        u'{}/word2vec.txt'.format(output_path), binary=False)
