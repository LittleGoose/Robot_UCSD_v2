import yaml

#Format file in python
data = {
    "Block_1": {"Talk" : 1 , "Walk" : 3, "Energetic" : 2, "Happy": 3},
    "Block_2": {"Nod" : 1 , "Hum" : 3},
    "Block_3": {"Talk" : 2 , "Walk" : 2, "Energetic" : 2, "Happy": 2},
    "Block_4": {"Listen" : 3}
}

print(yaml.dump(data))

# Format
# Block_1:
#   Energetic: 2
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