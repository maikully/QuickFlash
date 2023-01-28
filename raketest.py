from rake_nltk import Rake
import nltk
nltk.download('stopwords')
nltk.download('punkt')

# Uses stopwords for english from NLTK, and all puntuation characters by
# default
r = Rake()

# Extraction given the text.
r.extract_keywords_from_text("While the citric acid cycle is in general highly conserved, there is significant variability in the enzymes found in different taxa[22] (note that the diagrams on this page are specific to the mammalian pathway variant).")

# To get keyword phrases ranked highest to lowest.
print(r.get_ranked_phrases())
# To get keyword phrases ranked highest to lowest with scores.
print(r.get_ranked_phrases_with_scores())