#!/usr/bin/python
#-*- coding: utf-8 -*-

import logging
import json
import math
import re
from konlpy.tag import Twitter


def tfidf(term, document, documents):
    f = document.count(term)
    tf = f / len(document)
    idf = math.log(len(documents) / (1 + sum(term in document for document in documents)))
    return tf * idf


if __name__ == '__main__':
    # Extract words from the lyrics
    twitter = Twitter()
    # f = open('../songs.json', 'r')
    # songs = json.loads(f.read())
    # for song in songs:
    #     print(song['title'])
    #     sentences = song['lyric'].split('\n')
    #     lyric_words = []
    #     for sentence in sentences:
    #         sentence_words = twitter.morphs(sentence)
    #         lyric_words.append(sentence_words)
    #     song['lyric_words'] = lyric_words

    # # Calculate TF-IDF value on each words
    # lyric_sentences = sum(map(lambda song: song['lyric_words'], songs), [])
    # lyric_words = list(set(sum(lyric_sentences, [])))
    # word_scores = []
    # for song in songs:
    #     sentences = song['lyric_words']

    #     # Extract keywords
    #     word_scores = []
    #     for sentence in sentences:
    #         for word in sentence:
    #             word_scores.append((word, tfidf(word, sentence, sentences)))
    #     sorted(word_scores, key=lambda value: value[1], reverse=True)
    #     keywords = word_scores[:10]
    #     song['keywords'] = keywords

    #     # Extract keysentences from the keywords
    #     sentence_scores = []
    #     for sentence in sentences:
    #         sentence_words = twitter.morphs(sentence)
    #         count = sum(keyword in sentence_words for keyword in keywords)
    #         sentence_scores.append((sentence, count))
    #     sorted(sentence_scores, key=lambda value: value[1], reverse=True)
    #     keysentences = sentence_scores[:10]
    #     song['keysentences'] = keysentences

    # # Save as a file
    # f = open('../songs.json', 'w')
    # f.write(json.dumps(songs, ensure_ascii=False).encode('utf8'))
    # f.close()
