# # import yaml
from pymongo import MongoClient
# # from flask import Flask, jsonify
# # import json
# # import gridfs
# # import bson
# # from bson.objectid import ObjectId
# # import datetime as dt
# # from datetime import datetime
import os
from dotenv import load_dotenv


# client = MongoClient("127.0.0.1", 27017)
# local_db = client["ROBOT_UCSD_LOCAL"]  # Access to data base containing the routines created locally
# admin_db = client["ROBOT_UCSD_ADMIN"]  # Access to data base containing behavior blocks data

# body_gestures = admin_db["body_gestures"]  # Access to Body Gestures collection
# facial_expressions = admin_db["facial_expressions"] # Access to Facial Expressions collection
# verbal = admin_db["verbal"] # Access to Verbal collection
# sounds = admin_db["sounds"]  # Access to Sounds collection

# routines = local_db["routines"]  # Access of Routines collections

# mongoexport --uri mongodb+srv://access:BFL2N3YtqbA45O9b@robot-ucsd.oqmkaj6.mongodb.net/ROBOT-UCSD --collection <COLLECTION> --type <FILETYPE> --out <FILENAME># if __name__ == "__main__":
#     app.run(debug=True)


# load_dotenv()
# user = os.getenv("MONGO_USR")
# password = os.getenv("password")

# client = MongoClient(f"mongodb+srv://{user}:{password}@robot-ucsd.oqmkaj6.mongodb.net", tls=True, tlsAllowInvalidCertificates=True) 
# db = client["ROBOT-UCSD"]  # Access/creation of data base

# routines = db["routines"] 

# x = routines.delete_many({})