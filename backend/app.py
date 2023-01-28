from flask import Flask
from flask import request
import json
import raketest

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/generate", methods = ['GET', 'POST'])
def generate_original_flashcards():
    if request.method == 'POST':
        text_block = request.form['text']
    else:
        text_block = request.args.get("text")
    flashcard_list = raketest.make_flashcards(text_block)
    jsoner = jsonify_flashcard_list(flashcard_list)
    response = app.response_class(
        response=json.dumps(jsoner),
        status=200,
        mimetype='application/json'
        )
    return response

def jsonify_flashcard_list(flashcard_list):
    jsoned = list()
    for flashcard in flashcard_list:
        obj = {"original": flashcard.sentence,
               "answer": flashcard.keyword,
               "question": flashcard.flashcard_text}
        jsoned.append(obj)
    return jsoned

def main():
    app.run(threaded=True, port=5000)

if __name__ == '__main__':
    main()
