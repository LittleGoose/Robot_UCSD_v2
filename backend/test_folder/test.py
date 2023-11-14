import yaml
from pymongo import MongoClient
from flask import Flask, jsonify
import json
import gridfs
import bson
from bson.objectid import ObjectId
import datetime as dt
from datetime import datetime
import os
from dotenv import load_dotenv


load_dotenv()
user = os.getenv("username")
password = os.getenv("password")

client = MongoClient("mongodb+srv://access:BFL2N3YtqbA45O9b@robot-ucsd.oqmkaj6.mongodb.net", tls=True, tlsAllowInvalidCertificates=True) 
db = client["ROBOT-UCSD"]  # Access/creation of data base

facial_expressions = db["facial_expressions"] # Creation/Access of table Expressions
body_gestures = db["body_gestures"]  # Creation/Access of table Movements
tones_of_voice = db["tones_of_voice"] # Creation/Access of table Tones of Voice
speech_elements = db["speech_elements"]  # Creation/Access of table Speech
routines = db["routines"]  # Creation/Access of table Routines

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False

@app.route("/load_current_routine_txt", methods=["GET"])
def load_current_routine_txt():
    try:
        recent = routines.find_one(sort=[('$natural', -1)])
        recent_routine = bson.decode(recent["file"])
        print(recent_routine)
        return yaml.dump(recent_routine)
    except Exception as e:
        return jsonify({"Status": e})

# @app.route("/load_current_routine", methods=["POST"])
# def load_current_routine(routine):
#     # if request.method == 'POST':
#     # routine = loads(request.data)
#     print(yaml.dump(routine))


if __name__ == "__main__":
    app.run(debug=True)
