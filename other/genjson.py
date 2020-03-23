import json

oFile = open("data.json", "w")

output = json.dumps(
{
    "apple": {
        "amount": 182,
        "cal": 94.6,
        "fat": 0.3,
        "carb": 25.1,
        "fib": 4.4,
        "sug": 18.9,
        "prot": 0.5,
        "url": "https://fdc.nal.usda.gov/fdc-app.html#/food-details/341508/nutrients"
    },
    "apple juice": {
        "amount": 248,
        "cal": 114,
        "fat": 0.3,
        "carb": 28,
        "fib": 0.5,
        "sug": 23.9,
        "prot": 0.2,
        "url": "https://fdc.nal.usda.gov/fdc-app.html#/food-details/341727/nutrients"
    },
    "banana": {
        "amount": 118,
        "cal": 105,
        "fat": 0.4,
        "carb": 27,
        "fib": 3,
        "sug": 14.4,
        "prot": 1.3,
        "url": "https://fdc.nal.usda.gov/fdc-app.html#/food-details/341529/nutrients"
    },
    "broccoli": {
        "amount": 44,
        "cal": 15,
        "fat": 0.2,
        "carb": 2.9,
        "fib": 1.1,
        "sug": 0.7,
        "prot": 1.2,
        "url": "https://fdc.nal.usda.gov/fdc-app.html#/food-details/342297/nutrients"
    },
    "rice": {
        "amount": 118,
        "cal": 152,
        "fat": 0.3,
        "carb": 33,
        "fib": 0.5,
        "sug": 0.1,
        "prot": 3.2,
        "url": "https://fdc.nal.usda.gov/fdc-app.html#/food-details/340449/nutrients"
    },
    "chicken, Kung Pao": {
        "amount": 121,
        "cal": 156,
        "fat": 8.5,
        "carb": 8.3,
        "fib": 1.8,
        "sug": 3.7,
        "prot": 11.8,
        "url": "https://fdc.nal.usda.gov/fdc-app.html#/food-details/338466/nutrients"
    },
    "snapper": {
        "amount": 170,
        "cal": 218,
        "fat": 2.9,
        "carb": 0,
        "fib": 0,
        "sug": 0,
        "prot": 44.7,
        "url": "https://fdc.nal.usda.gov/fdc-app.html#/food-details/173699/nutrients"
    },
    "seaweed, roasted": {
        "amount": 4,
        "cal": 25,
        "fat": 1.5,
        "carb": 1,
        "fib": 1,
        "sug": 0,
        "prot": 1,
        "url": "N/A"
    },
    "guava": {
        "amount": 82,
        "cal": 55.8,
        "fat": 0.8,
        "carb": 11.7,
        "fib": 4.4,
        "sug": 7.3,
        "prot": 2,
        "url": "https://fdc.nal.usda.gov/fdc-app.html#/food-details/341568/nutrients"    
    },
    "sardines in olive oil": {
        "amount": 85,
        "cal": 200,
        "fat": 12,
        "carb": 0,
        "fib": 0,
        "sug": 0,
        "prot": 22,
        "url": "N/A"    
    }
}, sort_keys = True, indent = 4)

print(output)

oFile.write(output)
oFile.close()
