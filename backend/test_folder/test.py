import yaml
from pymongo import MongoClient
from flask import Flask, jsonify
import json
import gridfs
import bson
from bson.objectid import ObjectId
import datetime
import os

client = MongoClient('0.0.0.0', 27017) # Connect to mongo client (local level)
db = client["ROBOT_UCSD"] # Access/creation of data base

facial_expressions = db["facial_expressions"] # Creation/Access of table Expressions
body_gestures = db["body_gestures"] # Creation/Access of table Movements
tones_of_voice = db["tones_of_voice"] # Creation/Access of table Tones of Voice
speech_elements = db["speech_elements"] # Creation/Access of table Speech
routines = db["routines"] #Creation/Access of table Routines

routine = {
    "Segment_1": {
        "Block_1": {
            "Type": "facial_expression",
            "Level": 2,
            "Label": "Happy"
            }
    },
    "Segment_2": {
        "Block_1": {
            "Type": "speech",
            "Level": 3,
            "Label": "Hum"
        }
    }
}

recent_routine = []
recent = routines.find_one(sort=[('$natural', -1)])
recent_routine.append({"id": str(recent["_id"]), "label": recent["label"], "user": recent["user"],"last_modified": recent["last_modified"], "file": bson.decode(recent["file"])})

# fs = gridfs.GridFS(db, collection="routines")
# data = yaml.dump(routine).encode('utf-8')
# fs.put(data)

# print("Upload Complete")

# dummy_routine_post = {
#     "user": "User3",
#     "last_modified": datetime.datetime.now(tz=datetime.timezone.utc),
#     "label": "Dance_3",
#     "file":  bson.encode(routine)}


# print(type(yaml.dump(routine)))

# routines.insert_one(dummy_routine_post)

# decoded_data = bson.decode(routines.find_one({"user": "User1"})["file"])
# print(decoded_data)
# print(yaml.dump(decoded_data))

# home = os.path.expanduser("~")
# download_path = os.path.join(home, 'Downloads/')

# x = datetime.now()

# file_name = home + x.strftime('%d-%m-%Y-%H-%M-%S.yaml')
# with open(file_name, 'w') as fp:
#     fp.write(yaml.dump(decoded_data))

# print(file_name)

# Format
#
# Segment_1:
#   Block_1:
#       Type: facial_expression
#       Level: 2
#       Label: Happy
# Segment 2:
#   Block_2:
#       Type: speech
#       Level: 3
#       Label: Hum


# from flask import Flask, render_template, redirect, request, url_for, jsonify
# from pymongo import MongoClient
# from bson.objectid import ObjectId
# import datetime
# import bson
# import yaml
# import json

app = Flask(__name__)

# client = MongoClient('0.0.0.0', 27017) # Connect to mongo client (local level)
# db = client["ROBOT_UCSD"] # Access/creation of data base

# facial_expressions = db["facial_expressions"] # Creation/Access of table Expressions

# Dummy entry for Expressions table
# dummy_expression_post = {
#     "id_in_robot": "DummyId",
#     "expression_name": "Happy",
#     "description": "Expression for happiness",
#     "animation": """import { AnimatedSprite, Texture } from 'pixi.js';
#                     const alienImages = [
#                         'image_sequence_01.png',
#                         'image_sequence_02.png',
#                         'image_sequence_03.png',
#                         'image_sequence_04.png',
#                     ];
#                     const textureArray = [];
#                     for (let i = 0; i < 4; i++){
#                         const texture = Texture.from(alienImages[i]);
#                         textureArray.push(texture);
#                     }
#                     const animatedSprite = new AnimatedSprite(textureArray);
#                     """,
#         "status": "Active"
# }
# facial_expressions.insert_one(dummy_expression_post)

# body_gestures = db["body_gestures"] # Creation/Access of table Movements

# Dummy entry for Movements table
# dummy_movements_post = {
#     "id_in_robot": "DummyId",
#     "movement_name": "Nod",
#     "description": "Nod to the user",
#     "status": "Active"
# }
# body_gestures.insert_one(dummy_movements_post)

# tones_of_voice = db["tones_of_voice"] # Creation/Access of table Tones of Voice

# Dummy entry for Tones of Voice table
# dummy_tones_post = {
#     "id_in_robot": "DummyId",
#     "tone_name": "Energetic",
#     "description": "Eskeler mode",
#     "status": "Unactive"
# }
# tones_of_voice.insert_one(dummy_tones_post)

# speech_elements = db["speech_elements"] # Creation/Access of table Speech

# Dummy entry for Speech table
# dummy_speech_post = {
#     "id_in_robot": "DummyId",
#     "element_name": "Talk",
#     "description": "Casual conversation",
#     "utterance" : "Hello there",
#     "status": "Active"
# }
# speech_elements.insert_one(dummy_speech_post)

# routines = db["routines"] #Creation/Access of table Routines

# Dummy entry for Routines table
# routine = {
#     "Segment_1": {
#         "Block_1": {
#             "Type": "facial_expression",
#             "Level": 2,
#             "Label": "Happy"
#             }
#     },
#     "Segment_2": {
#         "Block_1": {
#             "Type": "speech",
#             "Level": 3,
#             "Label": "Hum"
#         }
#     }
#     }

# dummy_routine_post = {
#     "user": "User1",
#     "last_modified": datetime.datetime.now(tz=datetime.timezone.utc),
#     "name": "Dance_1",
#     "file": yaml.dump(routine)}

# json.dumps() json.loads() https://stackoverflow.com/questions/26745519/converting-dictionary-to-json
# routines.insert_one(dummy_routine_post)

# Main app
@app.route('/', methods=['GET'])
def root():
    return jsonify(recent_routine)


# @app.route("/create_yaml", methods=['GET'])
# def create_yaml():
#     data = {
#         "Block_1": {"Talk" : 1 , "Walk" : 3, "Energetic" : 2, "Happy": 3},
#         "Block_2": {"Nod" : 1 , "Hum" : 3},
#         "Block_3": {"Talk" : 2 , "Walk" : 2, "Energetic" : 2, "Happy": 2},
#         "Block_4": {"Listen" : 3}
#     }

#     yaml = yaml.dump(data)

# @app.route("/fetch_from_db", methods=['GET'])
# def create_yaml():
        
#     data = {}

#     facial_expressions_entries = []
#     for entry in facial_expressions.find():
#         facial_expressions_entries.append({"id": str(entry["_id"]), "label": entry["expression_name"], "description": entry["description"], "id_in_robot": entry["id_in_robot"]})

#     data["facial_expressions"] = facial_expressions_entries

#     body_gestures_entries = []
#     for entry in body_gestures.find():
#         body_gestures_entries.append({"id": str(entry["_id"]), "label": entry["movement_name"], "description": entry["description"], "id_in_robot": entry["id_in_robot"]})

#     data["body_gestures"] = body_gestures_entries

#     tones_of_voice_entries = []
#     for entry in tones_of_voice.find():
#         tones_of_voice_entries.append({"id": str(entry["_id"]), "label": entry["tone_name"], "description": entry["description"], "id_in_robot": entry["id_in_robot"]})

#     data["tones_of_voice"] = tones_of_voice_entries
    
#     speech_elements_entries = []
#     for entry in speech_elements.find():
#         speech_elements_entries.append({"id": str(entry["_id"]), "label": entry["element_name"], "description": entry["description"], "id_in_robot": entry["id_in_robot"], "utterance": entry["utterance"]})

#     data["speech_elements"] = speech_elements_entries

#     routines_entries = []
#     for entry in routines.find():
#         routines_entries.append({"id": str(entry["_id"]), "user": entry["user"], "last_modified": entry["last_modified"], "name": entry["name"], "file": bson.decode(entry["file"])})

#     data["routines"] = routines_entries

#     return jsonify(data)

# @app.route("/fetch_subroutines", methods=['GET'])
# def create_yaml():
#     return "Here I implement returning subroutine (YAML) file as a JSON object"

if __name__== "__main__":
    app.run(debug=True)

# R2
# @app.route('/', methods=['GET', 'POST'])
# def root():
#     if request.method=='POST':
#         content = request.form['content']
#         degree = request.form['degree']
#         todos.insert_one({'content': content, 'degree': degree})
#         return redirect(url_for('root'))

#     all_todos = todos.find()
#     return render_template('index.html', todos=all_todos)


# @app.post('/<id>/delete/')
# def delete(id):
#     todos.delete_one({"_id": ObjectId(id)})
#     return redirect(url_for('root'))