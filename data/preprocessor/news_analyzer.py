#!/usr/bin/python
#-*- coding: utf-8 -*-

import codecs
import json
from konlpy.tag import Twitter


if __name__ == '__main__':
    twitter = Twitter()
    f = codecs.open('../news.txt', encoding='utf-8', mode='r')
    sentences = f.read().split('\n')
    words = []
    for sentence in sentences:
        words.append(twitter.morphs(sentence))
    f = open('../news.json', 'w')
    f.write(json.dumps(words, ensure_ascii=False).encode('utf8'))
    f.close()
