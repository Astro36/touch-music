#!/usr/bin/python
#-*- coding: utf-8 -*-

import gensim
import os

if __name__ == '__main__':
    # Extract the words from the lyrics.
    output_path = os.getcwd()
    model = gensim.models.KeyedVectors.load_word2vec_format(u'{}/word2vec.txt'.format(output_path), binary=False)
    print(model.wv.most_similar(positive=[u'여름']))