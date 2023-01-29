# QuickFlash

Quickly generate flashcards from your notes!

## About QuickFlash

QuickFlash is our innovative flashcard software that allows students to generate flashcards from their notes or textbooks just by simply pasting them in! Using rapid automatic keyword extraction (RAKE) and python automated term extraction (PyATE), we are able to find the most important parts of the notes for review via flashcards. We hope that QuickFlash will enable students to spend more time reviewing their notes and textbooks in a more fun and more efficient manner compared to traditional methods of just studying the text.

Try out the app at https://quickflash.herokuapp.com/!

## Features

Users can:
* Paste in a block of text and have it converted to a set of flashcards where our RAKE/PyATE algorithm has converted the text blob into usable flashcards.
* Download their flashcards for use in another study session.
* Upload previously-downloaded flashcards to use in a current study session.
* Create, modify, and delete flashcards.

## Local Installation

QuickFlash requires [Node.js](https://nodejs.org/) and [Python](https://www.python.org/) to run locally.

Starting the frontend (React) server:

```sh
cd frontend
npm i
npm start
```
Starting the backend (python) server:

```sh
pip3 install -r requirements.txt
flask run
```

## TODO

- [ ] add more accessibility features, e.g. screen-reading and printing capabilities
- [ ] add integration with existing online study software, e.g. Quizlet, Anki

## Credit

Special thanks to [PyATE](https://github.com/kevinlu1248/pyate) and [RAKE](https://github.com/csurfer/rake-nltk)!