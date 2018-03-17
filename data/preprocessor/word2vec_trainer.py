#!/usr/bin/python
#-*- coding: utf-8 -*-

import logging
import json
import gensim


if __name__ == '__main__':
    # Get sentences from song's lyrics
    f = open('./songs.json', 'r')
    songs = json.loads(f.read())
    lyric_sentences = sum(map(lambda song: song['lyric_words'], songs), [])

    # Get sentences from news content
    f = open('./songs.json', 'r')
    
    logging.basicConfig(
        format='%(asctime)s : %(levelname)s : %(message)s', level=logging.INFO)
    sentences = lyric_sentences
    model = gensim.models.Word2Vec(sentences, size=200, sg=1)
    model.wv.save_word2vec_format('../word2vec.txt', binary=False)
