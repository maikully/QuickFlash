from flask import Flask
from flask_cors import CORS, cross_origin
from flask import request
from werkzeug.utils import secure_filename
import os
import json
import raketest

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
UPLOAD_FOLDER = '../uploads'
ALLOWED_EXTENSIONS = {'json'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/generate", methods = ['GET', 'POST'])
@cross_origin()
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
               "question": flashcard.flashcard_text,
               "answered_question": flashcard.answered_question}
        jsoned.append(obj)
    return jsoned

@app.route("/jsonupload", methods = ['POST'])
def generate_flashcards_from_json():
    if 'file' not in request.files:
        response = app.response_class(
            response=json.dumps({"message": "file not in request"}),
            status=409,
            mimetype='application/json'
            )
    file = request.files['file']
    # If the user does not select a file, the browser submits an
    # empty file without a filename.
    if file.filename == '':
        response = app.response_class(
            response=json.dumps({"message": "filename is empty"}),
            status=409,
            mimetype='application/json'
            )
    if file and (allowed_file(file.filename) or file.filename == "blob"):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], "temp.json"))
        f = open(UPLOAD_FOLDER + "/" + "temp.json")
        jsoner = json.load(f)
        print(jsoner)
        response = app.response_class(
            response=json.dumps(jsoner),
            status=200,
            mimetype='application/json'
            )
        return response

def main():
    app.run(threaded=True, port=5000)

if __name__ == '__main__':
    main()
