from rake_nltk import Rake
import nltk

nltk.download('stopwords')
nltk.download('punkt')
punctuation = "!\"#$%&\'()*+,—-./:;<=>?@[\]^_`{|}~"
punctuation_set = set(i for i in punctuation)

# Uses stopwords for english from NLTK, and all puntuation characters by
# default
phrase_raker = Rake(punctuations = punctuation_set, max_length=3)
single_word_raker = Rake(min_length=1, max_length=1)

# Extraction given the text.
#phrase_raker.extract_keywords_from_text("While the citric acid cycle is in general highly conserved, there is significant variability in the enzymes found in different taxa[22] (note that the diagrams on this page are specific to the mammalian pathway variant).")
#print(phrase_raker.get_ranked_phrases())
#print(phrase_raker.get_ranked_phrases_with_scores())


class Flashcard:
    def __init__(self, sentence, keyword, flashcard_text):
        self.sentence = sentence
        self.keyword = keyword
        self.flashcard_text = flashcard_text

def make_flashcards(paragraph:str):
    flashcard_list = list()
    import re
    purged = re.sub(".\[[0-9]*\]", ".", paragraph)
    sentences = purged.split(". ")
    for i, sentence in enumerate(sentences):
        keyword = get_most_reasonable_phrase(sentence)
        if (i != len(sentences) - 1):
            sentence = sentence+"."
        keyword, flashcard_text = get_flashcard_text(sentence, keyword)
        flashcard = Flashcard(sentence, keyword, flashcard_text)
        flashcard_list.append(flashcard)
    return(flashcard_list)

def get_most_reasonable_phrase(sentence):
    phrase_raker.extract_keywords_from_text(sentence)
    ranked_phrases_with_score = phrase_raker.get_ranked_phrases_with_scores()
    for item in ranked_phrases_with_score:
        score, phrase = item
        if not detect_puntuation(phrase) and score >= 5:
            return phrase
        if score < 5:
            return get_most_reasonable_single_word(sentence)

def get_most_reasonable_single_word(sentence):
    single_word_raker.extract_keywords_from_text(sentence)
    ranked_phrases = single_word_raker.get_ranked_phrases()
    return ranked_phrases[0]
        
def detect_puntuation(string):
    return any(p in string for p in punctuation)

def get_flashcard_text(sentence, keyword):
    if keyword in sentence:
        return keyword, sentence.replace(keyword, '________', 1)
    if keyword.lower() in sentence.lower():
        start = sentence.lower().index(keyword.lower())
        keyword = sentence[start:start+len(keyword)]
        return get_flashcard_text(sentence, keyword)    

def print_flashcards(flashcards):
    for flashcard in flashcards:
        print("==================")
        print(flashcard.sentence)
        print(flashcard.keyword)
        print(flashcard.flashcard_text)
