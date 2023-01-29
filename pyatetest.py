from pyate import combo_basic


punctuation = "!\"#$%&\'()*+,—-./:;<=>?@[\]^_`{|}~’”“"
punctuation_set = set(i for i in punctuation)


class Flashcard:
    def __init__(self, sentence, keyword, flashcard_text, answered_question):
        self.sentence = sentence
        self.keyword = keyword
        self.flashcard_text = flashcard_text
        self.answered_question = answered_question


def make_flashcards(paragraph: str):
    flashcard_list = list()
    import re
    purged = re.sub(".\[[0-9]*\]", ".", paragraph)
    purged = purged.replace('\r\n', ' ')
    keywords = combo_basic(purged).sort_values(ascending=False)
    sentences = purged.split(". ")
    unused_keywords = list(keywords.items())
    keywords = list(keywords.items())
    for i, sentence in enumerate(sentences):
        if (i != len(sentences) - 1):
            sentence = sentence+"."
        if (sentence):
            keyword = None
            # check unused keywords
            for word in unused_keywords:
                if word[0] in sentence:
                    keyword = word[0]
                    unused_keywords.remove(word)
                    break
            # then just check keywords
            if keyword == None:
                for word in keywords:
                    if word[0] in sentence:
                        keyword = word[0]
                        break
            # then take the longest proper noun
            if keyword == None:
                proper_noun_list = [x for x in sentence.split(" ") if x[0].isupper()]
                if len(proper_noun_list) == 1:
                    keyword = proper_noun_list[0]
                elif len(proper_noun_list) > 1:
                    keyword = max(proper_noun_list, key=len)
            # then take the longest word
            if keyword == None:
                keyword = max(sentence.split(" "), key=len)
            keyword, flashcard_text, answered_question = get_flashcard_text(
                sentence, keyword)
            flashcard = Flashcard(
                sentence, keyword, flashcard_text, answered_question)
            flashcard_list.append(flashcard)
    return (flashcard_list)


def get_most_reasonable_phrase(sentence):
    phrase_raker.extract_keywords_from_text(sentence)
    ranked_phrases_with_score = phrase_raker.get_ranked_phrases_with_scores()
    for item in ranked_phrases_with_score:
        score, phrase = item
        if not detect_puntuation(phrase) and score >= 4 and phrase != None:
            return phrase
        if score < 4:
            short_output = get_most_reasonable_single_word(sentence)
            if short_output == None:
                break

    split = sentence.split(" ")
    max_len = 0
    for i in range(len(split)):
        if len(split[i]) > len(split[max_len]):
            max_len = i
    return split[i]


def get_most_reasonable_single_word(sentence):
    single_word_raker.extract_keywords_from_text(sentence)
    ranked_phrases = single_word_raker.get_ranked_phrases()
    for i in range(len(ranked_phrases)):
        if not not detect_puntuation(ranked_phrases[i]):
            return ranked_phrases[i]


def detect_puntuation(string):
    return any(p in string for p in punctuation)


def get_flashcard_text(sentence, keyword):
    if keyword in sentence:
        return keyword, sentence.replace(keyword, '________', 1), sentence.replace(keyword, "{{"+keyword+"}}", 1)
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
