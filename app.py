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
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'json'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route("/generate", methods = ['GET', 'POST'])
@cross_origin()
def generate_original_flashcards():
    if request.method == 'POST':
        text_block = request.form['text']
    else:
        text_block = request.args.get("text")
    flashcard_list = raketest.make_flashcards(text_block)
    jsoner = jsonify_flashcard_list(flashcard_list)
    print(jsoner)
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
    if 'files' not in request.files:
        response = app.response_class(
            response=json.dumps({"message": "File not in request."}),
            status=409,
            mimetype='application/json'
            )
        return response

    files = request.files.getlist("files")
    net_jsons = list()
    if files:
        for file in files:
            filename = generate_string(8) +".json"
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            f = open(UPLOAD_FOLDER + "/" + filename, encoding="utf8")
            jsoner = json.load(f)
            net_jsons.extend(jsoner)

            for elem in net_jsons:
                if not ("original" in elem and "answer" in elem and "question" in elem and "answered_question" in elem):
                    response = app.response_class(
                        response=json.dumps({"message": "Cannot interpret uploaded files."}),
                        status=409,
                        mimetype='application/json'
                        )
                    return response
            
        response = app.response_class(
            response=json.dumps(net_jsons),
            status=200,
            mimetype='application/json'
            )
        return response

    else:
        response = app.response_class(
            response=json.dumps({"message": "Unable to process file or file type."}),
            status=409,
            mimetype='application/json'
            )
        return response

def generate_string(k):
    import random
    import string
    return ''.join(random.choices(string.ascii_lowercase, k=k))

def main():
    app.run(threaded=True, port=5000)

if __name__ == '__main__':
    main()
