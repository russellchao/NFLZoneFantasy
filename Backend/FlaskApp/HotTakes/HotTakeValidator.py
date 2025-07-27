import os
import json
from openai import OpenAI
open_ai_api_key = os.getenv("OPENAI_API_KEY") 


def validate_hot_take(hotTake, listOfHotTakes):

    hotTakeRules = [
        "There may be no more than 10 hot takes",

        "Hot takes must be specific and measurable. "
        "For example, \"The Philadelphia Eagles will win the Super Bowl\" is a valid hot take, but \"The Eagles will be good\" is not.",

        "Hot takes must not contain blatantly false information. "
        "For example, \"The Kansas City Chiefs will four-peat\" is invalid since the Chiefs failed to three-peat.",

        "A hot take that directly implies another hot take will replace the latter. "
        "For example, \"The Bengals will win the AFC North\" will replace \"The Ravens won't win the AFC North\".",

        "Hot takes that contradict other hot takes or is seen as redundant won't be accepted.",

        "Hot takes that involve predicting injuries and suspensions won't be accepted.",
    ]

    client = OpenAI(api_key=open_ai_api_key)

    response = client.responses.create(
        model = "gpt-4.1-2025-04-14",
        input = f"Please evaluate the validity of the following hot take: '{hotTake}'? " +
            "Here are some other hot takes for context: " + json.dumps(listOfHotTakes) +
            "And here are the rules for hot takes: " + json.dumps(hotTakeRules) +
            "Please respond with 'This hot take is valid' if the hot take is valid, "
            "or 'This hot take is invalid, --reason--', if it's not."
    )

    print(response.json())


    return "This hot take is valid"



if __name__ == '__main__':
    # FOR TESTING ONLY

    listOfHotTakes = [
        "Jayden Daniels will be top 5 in passing yards", 
        "The Bengals will fire Zac Taylor by the end of the season",
        "The Panthers will make the playoffs",
        "The Buccaneers will make the Super Bowl"
    ]


    while True:
        hotTake = input("Enter your hot take: ")

        validate_hot_take(hotTake, listOfHotTakes)

        