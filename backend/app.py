from flask import Flask, jsonify, request, send_file
from pymongo import MongoClient
import datetime as dt
from datetime import datetime
import bson
from bson.objectid import ObjectId
from bson.json_util import loads
import yaml
import os
from dotenv import load_dotenv
from io import BytesIO

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False

# Connect to mongo client (local level)
# client = MongoClient("127.0.0.1", 27017)
# db = client["ROBOT_UCSD"]  # Access/creation of data base

# Connect to mongo client (Atlas - Cloud)
load_dotenv()
user = os.getenv("user")
password = os.getenv("password")

client = MongoClient(f"mongodb+srv://{user}:{password}@robot-ucsd.oqmkaj6.mongodb.net", tls=True, tlsAllowInvalidCertificates=True) 
db = client["ROBOT-UCSD"]  # Access/creation of data base

facial_expressions = db["facial_expressions"] # Creation/Access of table Expressions
body_gestures = db["body_gestures"]  # Creation/Access of table Movements
tones_of_voice = db["tones_of_voice"] # Creation/Access of table Tones of Voice
speech_elements = db["speech_elements"]  # Creation/Access of table Speech
routines = db["routines"]  # Creation/Access of table Routines

# Main app
@app.route("/", methods=["GET"])
def root():
    return "MAIN FLASK ROUTE"


# Fetch entries from all tables to send to sidebar angular component
# Return entries in a json format
@app.route("/fetch_tables_from_db", methods=["GET"])
def fetch_from_db():
    try:
        data = []

        facial_expressions_entries = []
        for entry in facial_expressions.find():
            facial_expressions_entries.append({"id": str(entry["_id"]), "label": entry["expression_name"],
                                              "level": 0, "description": entry["description"], "id_in_robot": entry["id_in_robot"]})

        data.append(facial_expressions_entries)

        body_gestures_entries = []
        for entry in body_gestures.find():
            body_gestures_entries.append({"id": str(
                entry["_id"]), "label": entry["movement_name"], "description": entry["description"], "id_in_robot": entry["id_in_robot"]})

        data.append(body_gestures_entries)

        tones_of_voice_entries = []
        for entry in tones_of_voice.find():
            tones_of_voice_entries.append({"id": str(
                entry["_id"]), "label": entry["tone_name"], "description": entry["description"], "id_in_robot": entry["id_in_robot"]})

        data.append(tones_of_voice_entries)

        speech_elements_entries = []
        for entry in speech_elements.find():
            speech_elements_entries.append({"id": str(entry["_id"]), "label": entry["element_name"],
                                           "description": entry["description"], "id_in_robot": entry["id_in_robot"], "utterance": entry["utterance"]})

        data.append(speech_elements_entries)

        #TODO Preguntar como pasar el file (BSON/JSON decodificado es lo que se utiliza actualmente)
        routines_entries = []
        for entry in routines.find():
            routines_entries.append({"id": str(entry["_id"]), "label": entry["label"], "user": entry["user"],
                                    "last_modified": entry["last_modified"], "file": bson.decode(entry["file"])})

        data.append(routines_entries)
        return jsonify(data)
    except Exception as e:
        return jsonify({"Status" : "An error ocurred: " + str(e)})



# CREATE
# Receive a the routine object to enconde in binary
# Add to entry and upload to database
@app.route("/save_routine", methods=["POST"])
def save_routine():
    if request.method == 'POST':
        routine = loads(request.data)
    
        try:
            if (routines.find_one({"label": routine["routine_name"]})) is None:
                db_routine = {}
                db_routine["user"] = "TESTUSER"
                db_routine["last_modified"] = datetime.now(tz=dt.timezone.utc)
                db_routine["label"] = routine["routine_name"]

                file = {}

                for i in range(0, len(routine["routine"])):
                    file["Segment" + str(i+1)] = routine["routine"][i]

                db_routine["file"] = bson.encode(file)

                routines.insert_one(db_routine)
                return jsonify({"Status" : "Insert completed"})
            else:
                return jsonify({"Status" : f"Routine {routine['routine_name']} already exists"})
        except Exception as e:
            return jsonify({"Status" : "An error ocurred: " + str(e)})


# READ
# Download routine from angular app
@app.route("/download_routine/<name>", methods=["GET"])
def download_routine(name):
    try:
        routine = routines.find_one({"label": name})
        routine = routine["file"]
        routine = bson.decode(routine)
        routine = yaml.dump(routine).encode()
        return send_file(BytesIO(routine), attachment_filename=name+".yaml", as_attachment=True)
    except Exception as e:
        print("An error ocurred: ", e)
        return jsonify({"Status" : "False"})

# MOST RECENT
# Retrieve most recent routine
# regresar como array de arrays (asi como lo manda ionic)
@app.route("/recent_routine", methods=["GET"])
def get_most_recent_routine():
    try:
        recent = routines.find_one(sort=[('$natural', -1)])
        recent_routine = bson.decode(recent["file"])
        return jsonify({"name": recent["label"], "routine": recent_routine})
    except Exception as e:
        print("An error ocurred: ", e)


# UPDATE/REPLACE
# Update routine entry in db using its name and receiving new
# routine object
@app.route("/update_routine/<name>", methods=["POST"])
def update_routine(name):
    if request.method == 'POST':
        routine = loads(request.data)
        routine = routine["routine"]
        print(routine)
        try:
            filter = {"label": name}
            new_values = {"$set": {"file": routine, "last_modified": datetime.datetime.now(
                tz=datetime.timezone.utc)}}
            routines.update_one(filter, new_values)
            return jsonify({"Status" : "Update completed"})
        except Exception as e:
            return jsonify({"Status" : "An error ocurred: " + str(e)})


# DELETE
# Delete routine entry from db using its name
@app.route("/delete_routine/<name>", methods=["DELETE"])
def delete_routine(name):
    try:
        if (routines.find_one({"label": name})) is not None:
            routines.delete_one({"label": name})
            return jsonify({"Status" : "Delete completed"})
        else:
            return jsonify({"Status" : "No such routine found"})
    except Exception as e:
        return jsonify({"Status" : "An error ocurred: " + str(e)})


if __name__ == "__main__":
    app.run(debug=True)
