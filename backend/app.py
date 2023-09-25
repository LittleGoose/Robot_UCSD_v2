from flask import Flask, jsonify, request
from pymongo import MongoClient
import datetime
import bson
from bson.objectid import ObjectId
from bson.json_util import loads
import yaml
import os

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False

# Connect to mongo client (local level)
client = MongoClient("127.0.0.1", 27017)
# client = MongoClient("0.0.0.0", 27017)
db = client["ROBOT_UCSD"]  # Access/creation of data base

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


# CREATE
# Receive a the routine object to enconde in binary
# Add to entry and upload to database
@app.route("/save_yaml", methods=["POST"])
def save_yaml():
    if request.method == 'POST':
        routine = bson.json_util.loads(request.data)
        print(routine)
    return jsonify({"response":"HI"})
    # try:
    #     if (routines.find_one({"_id": routine["id"]})) is None:
    #         routine_post = {
    #             "user": "User1",
    #             "last_modified": datetime.now(tz=datetime.timezone.utc),
    #             "label": "Dance_1",
    #             "file":  bson.encode(routine)}
    #         routines.insert_one(routine_post)
    #         print("Insert completed")
    #     else:
    #         update_routine(routine)
    # except Exception as e:
    #     print("An error ocurred: ", e)


# READ
# Download routine from angular app
@app.route("/download_routine", methods=["GET"])
def download_routine(routine):
    # TODO convert routine from angular data type to python dict
    try:
        home = os.path.expanduser("~")
        x = datetime.now()
        file_name = home + x.strftime('%d-%m-%Y-%H-%M-%S.yaml')
        with open(file_name, 'w') as fp:
            fp.write(yaml.dump(routine))
        print("Download completed")
    except Exception as e:
        print("An error ocurred: ", e)


# TODO Retrieve most recent routine
# db.routines.find().sort({"last_modified": -1}).limit(1)
def get_most_recent_routine():
    try:
        recent_routine = []
        recent = routines.find_one(sort=[('$natural', -1)])
        recent_routine.append({"id": str(recent["_id"]), "label": recent["label"], "user": recent["user"],"last_modified": recent["last_modified"], "file": bson.decode(recent["file"])})
        return jsonify(recent_routine)
    except Exception as e:
        print("An error ocurred: ", e)


# UPDATE
# Update routine entry in db using its id and receiving new
# routine object
def update_routine(routine):
    try:
        filter = {"_id": routine["id"]}
        new_values = {"$set": {"file": routine, "last_modified": datetime.datetime.now(
            tz=datetime.timezone.utc)}}
        routines.update_one(filter, new_values)
        print("Update completed")
    except Exception as e:
        print("An error ocurred: ", e)


# DELETE
# Delete routine entry from db using its id
@app.route("/delete_routine/<id>", methods=["DELETE"])
def delete_routine(id):
    try:
        if (routines.find_one({"_id": id})) is not None:
            routines.delete_one({"_id": id})
            print("Delete completed")
        else:
            print("No such routine found")
    except Exception as e:
        print("An error ocurred: ", e)


if __name__ == "__main__":
    app.run(debug=True)
