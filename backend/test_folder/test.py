import yaml
from pymongo import MongoClient
from flask import jsonify
import json
import gridfs
import datetime
import bson
from datetime import datetime
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

# fs = gridfs.GridFS(db, collection="routines")
# data = yaml.dump(routine).encode('utf-8')
# fs.put(data)

# print("Upload Complete")

# dummy_routine_post = {
#     "user": "User1",
#     "last_modified": datetime.datetime.now(tz=datetime.timezone.utc),
#     "name": "Dance_1",
#     "file":  bson.encode(routine)}


# print(type(yaml.dump(routine)))

# routines.insert_one(dummy_routine_post)

decoded_data = bson.decode(routines.find_one({"user": "User1"})["file"])
# print(decoded_data)
# print(yaml.dump(decoded_data))


home = os.path.expanduser("~")
download_path = os.path.join(home, 'Downloads/')

x = datetime.now()

file_name = download_path + x.strftime('%d-%m-%Y-%H-%M-%S.yaml')
with open(file_name, 'w') as fp:
    fp.write(yaml.dump(decoded_data))

print(file_name)

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