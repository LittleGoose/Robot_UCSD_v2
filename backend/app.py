from flask import Flask, render_template, redirect, request, url_for
from pymongo import MongoClient
from bson.objectid import ObjectId
import datetime
from bson.binary import Binary
import yaml

app = Flask(__name__)

client = MongoClient('0.0.0.0', 27017) # Connect to mongo client (local level)
db = client["ROBOT_UCSD"] # Access/creation of data base

expressions = db["expressions"] # Creation/Access of table Expressions

# Dummy entry for Expressions table
# dummy_expression_post = {
#     "_id": "E1",
#     "expression_name": "Happy",
#        "description": "Expression for happiness",
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
# expressions.insert_one(dummy_expression_post)

movements = db["movements"] # Creation/Access of table Movements

# Dummy entry for Movements table
# dummy_movements_post = {
#     "_id": "M1",
#     "movement_name": "Nod",
#     "description": "Nod to the user",
#     "status": "Active"
# }
# movements.insert_one(dummy_movements_post)

tones_of_voice = db["tones_of_voice"] # Creation/Access of table Tones of Voice

# Dummy entry for Tones of Voice table
# dummy_tones_post = {
#     "_id": "V1",
#     "tone_name": "Energetic",
#     "description": "Eskeler mode",
#     "status": "Unactive"
# }
# tones_of_voice.insert_one(dummy_tones_post)

speech = db["speech_elements"] # Creation/Access of table Speech

# Dummy entry for Speech table
# dummy_speech_post = {
#     "_id": "S1",
#     "element_name": "Talk",
#     "text": "Lol",
#     "status": "Active"
# }
# speech_elements.insert_one(dummy_speech_post)

routines = db["routines"] #Creation/Access of table Routines

# Dummy entry for Routines table
# users = [{'name': 'John Doe', 'occupation': 'gardener'},
#          {'name': 'Lucy Black', 'occupation': 'teacher'}]
# encoded = yaml.dump(users)
# dummy_routine_post = {
#     "_id": "R1",
#     "user": "User1",
#     "last_modified": datetime.datetime.now(tz=datetime.timezone.utc),
#     "name": "Dance_1",
#     "file": encoded}
# routines.insert_one(dummy_routine_post)

# Main app
@app.route('/', methods=['GET'])
def root():
    return "Hello from Flask"

if __name__== "__main__":
    app.run()

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

if __name__== "__main__":
    app.run()