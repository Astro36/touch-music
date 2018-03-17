#!/usr/bin/python
#-*- coding: utf-8 -*-

import logging
import json
import os
import gensim


if __name__ == '__main__':
    output_path = os.getcwd()

    # Get sentences from song's lyrics
    f = open(u'{}/songs_analyzed.json'.format(output_path), 'r')
    songs = json.loads(f.read())
    lyric_sentences = sum(map(lambda song: song['lyric_words'], songs), [])

    # Get sentences from news content

    
    logging.basicConfig(
        format='%(asctime)s : %(levelname)s : %(message)s', level=logging.INFO)
    sentences = lyric_sentences
    model = gensim.models.Word2Vec(sentences, size=200, sg=1)
    model.wv.save_word2vec_format(
        u'{}/word2vec.txt'.format(output_path), binary=False)
