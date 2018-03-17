#!/usr/bin/python
#-*- coding: utf-8 -*-

import logging
import json
import re
from konlpy.tag import Twitter


if __name__ == '__main__':
    twitter = Twitter()
    f = open('../news.txt', 'r')
    sentences = f.read().split('\n')
    words = []
    for sentence in sentences:
        words.append(twitter.morphs(sentence))
    f = open('../news.json', 'w')
    f.write(json.dumps(words, ensure_ascii=False).encode('utf8'))
    f.close()
