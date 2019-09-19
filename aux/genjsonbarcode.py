import json

oFile = open("datab.json", "w")

output = json.dumps(
{
    "074410490577":"seaweed, salted"
}, sort_keys = True, indent = 4)

print(output)

oFile.write(output)
oFile.close()
