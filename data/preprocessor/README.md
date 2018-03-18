# Data Preprocessor

> 데이터 전처리를 위한 스크립트입니다.

## Requirements

- Java 8
- Python 2.7
  - bs4
  - gensim
  - konlpy
  - request

`konlpy`를 사용하기 위해서는 Windows의 비트(32비트 / 64비트)를 맞춰주세요. Windows가 64비트면 JDK, Python 역시 64비트 버전을 사용해야 됩니다.

## Scripts

- [뉴스 크롤러](https://gist.github.com/Astro36/13806abcd85563376a3259f1fb7ebb32)
- [뉴스 분석기](./news_analyzer.py)
- [음악 크롤러](./song_crawler.py)
- [음악 분석기](./song_analyzer.py)
- [Word2Vec 트레이너](./word2vec_trainer.py)
