import yaml
from pymongo import MongoClient

client = MongoClient('0.0.0.0', 27017) # Connect to mongo client (local level)
db = client["ROBOT_UCSD"] # Access/creation of data base

facial_expressions = db["facial_expressions"] # Creation/Access of table Expressions
body_gestures = db["body_gestures"] # Creation/Access of table Movements
tones_of_voice = db["tones_of_voice"] # Creation/Access of table Tones of Voice
speech_elements = db["speech_elements"] # Creation/Access of table Speech
routines = db["routines"] #Creation/Access of table Routines

facial_expressions_entries = []
for entry in facial_expressions.find():
    facial_expressions_entries.append({"id": entry["_id"], "label": entry["expression_name"], "description": entry["description"], "id_in_robot": entry["id_in_robot"]})

body_gestures_entries = []
for entry in body_gestures.find():
    body_gestures_entries.append({"id": entry["_id"], "label": entry["movement_name"], "description": entry["description"], "id_in_robot": entry["id_in_robot"]})

tones_of_voice_entries = []
for entry in tones_of_voice.find():
    tones_of_voice_entries.append({"id": entry["_id"], "label": entry["tone_name"], "description": entry["description"], "id_in_robot": entry["id_in_robot"]})

speech_elements_entries = []
for entry in speech_elements.find():
    speech_elements_entries.append({"id": entry["_id"], "label": entry["element_name"], "description": entry["description"], "id_in_robot": entry["id_in_robot"]})

# routines_entries = []
# for entry in routines.find():
#     routines_entries.append({"description": entry["element_name"], "id_in_robot": entry["id_in_robot"], "utterance": entry["description"]})


print(facial_expressions_entries)
print(body_gestures_entries)
print(tones_of_voice_entries)
print(tones_of_voice_entries)
print(speech_elements_entries)


#Format file in python
# data = {
#     "Block_1": {"Talk" : 1 , "Walk" : 3, "Energetic" : 2, "Happy": 3},
#     "Block_2": {"Nod" : 1 , "Hum" : 3},
#     "Block_3": {"Talk" : 2 , "Walk" : 2, "Energetic" : 2, "Happy": 2},
#     "Block_4": {"Listen" : 3}
# }

# print(yaml.dump(data))

# Format
# Segment_1:
#   Block_1:
#       Type: facial_expression
#       Level: 2


#   Happy: 3
#   Talk: kjehfsejrg
#   Walk: 3
# Block_2:
#   Hum: 3
#   Nod: 1
# Block_3:
#   Energetic: 2
#   Happy: 2
#   Talk: 2
#   Walk: 2
# Block_4:
#   Listen: 3

# Save file
# with open('info1.yaml', 'w') as file:
#     documents = yaml.dump(data, file)