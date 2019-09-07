import json

oFile = open("data.json", "w")

output = json.dumps(
{
    "apple": {
        "amount": 182,
        "cal": 95
    },
    "apple juice": {
        "amount": 248,
        "cal": 114
    },
    "banana": {
        "amount": 118,
        "cal": 105
    },
    "broccoli": {
        "amount": 44,
        "cal": 15
    },
    "rice": {
        "amount": 118,
        "cal": 152
    },
    "chicken, Kung Pao": {
        "amount": 121,
        "cal": 156
    }
}, sort_keys = True, indent = 4)

print(output)

oFile.write(output)
oFile.close()
