import sys
import os
import json
from dotenv import load_dotenv
from openai import OpenAI

def validate_hot_take(hotTake, listOfHotTakes):
    specific_examples = [
        "The Philadelphia Eagles will win the Super Bowl is valid since it's specific and measurable,"
        "but the Eagles will be good is invalid since it's not specific.",
        "The Bears will finish with a losing record, as opposed to the Bears will have a disappointing season.",
        "Josh Allen will throw for over 4500 yards, as opposed to Josh Allen will pass for a lot of yards.", 
        "Lamar Jackson will lead the league in passing touchdowns is valid, since there can be only one leader in each category",
        "Zac Taylor will be fired at the end of the season is valid. Predicting coach firings are valid since it reflects on how the user"
        "thinks a team's season will turn out and doesn't necessarily predict injuries and suspensions.",

        "When measuring specificness, look for key words such as 'lead the league', 'top 5', 'winning/losing record',"
        "'make/miss the playoffs', 'fired', and more. Any hot takes containing only adjectives like 'surprising' or 'disappointing'"
        "without anything measureable and specific should be invalid."
    ]

    blatantly_false_examples = [
        "The Chiefs will four-peat is invalid. The Chiefs failed to three-peat after losing Super Bowl LIX to the Eagles.",
        "The Rams will win the AFC West is invalid. The Rams are in the NFC West, not AFC West.",

        "More examples as follows:", 
        "Tom Brady will lead the Patriots to their seventh Super Bowl. No, Tom Brady is no longer in the NFL.", 
        "The Lions will win the AFC. No, the Lions are in the NFC.", 
        "Baker Mayfield will take the Browns to the playoffs. No, he's no longer with the Browns", 

        "Hot takes that are considered unrealistic should also be considered blatantly false. Examples:", 
        "The Saints will make the Super Bowl with a 2-15 record. You can't even make the playoffs with that record.",
        "Joe Burrow will pass for 9000 yards. Not even the best of QBs can throw for that many yards in a single season.", 
        
        "Hot takes that are considered unlikely but still realistic should still be accepted. Examples:",
        "The Jets will win the Super Bowl is valid. While unlikely, it's still realistic since they have a good team.",
        "Mac Jones will win the MVP is valid. While unlikely, it's still realistic since he has the potential to do so.",
        "The Saints will finish with a 17-0 record is valid. While unlikely, it's still realistic since they have a good team."
    ]

    directly_implying_examples = [
        "A hot take like 'The Packers will win the NFC North' should directly replace something like 'The Lions won't win the NFC North'.",

        "More examples as follows:",
        "'The Commanders will make the Super Bowl' should replace 'The Commanders will make the Playoffs.'",
        "'CJ Stroud will pass for over 4500 yards this season' should replace 'CJ Stroud will pass for over 4000 yards this season'.",
        "'The Seahawks will win the NFC West' should replace 'The Seahawks will make the Playoffs'."
        
        "When looking for direct implications, check to see if the incoming hot take is stronger than an existing hot take.",

        "Conversely, an incoming hot take that's already directly implied by an existing hot take should be invalidated. For example:",
        "'The Dolphins will miss the playoffs' should be invalid if there exists a hot take like, "
        "'The Bills will be the only AFC East team to make the playoffs.'",

        "Here are some examples of when a hot take does NOT directly imply another hot take:"
        "'Jared Goff will lead the league in passing touchdowns' shouldn't replace 'Jared Goff will have 40 passing touchdowns.'"
    ]

    contradicting_examples = [
        "'The 49ers will win the Super Bowl' contradicts 'The 49ers will not make the playoffs.'",
        "'The Cowboys will win the NFC East' contradicts 'The Eagles will win the NFC East.' as both teams are in the same division.",
        "'The Ravens will make the Super Bowl' contradicts 'The Bills will make the Super Bowl.' because both teams are in the same conference.",
    ]   

    hotTakeRules = [
        "There may be no more than 10 hot takes",

        f"Hot takes must be specific and measurable. Refer to {specific_examples} for examples of valid specific hot takes.",

        f"Hot takes must not contain blatantly false information. Refer to {blatantly_false_examples}.",

        f"A hot take that directly implies another hot take will replace the latter. Refer to {directly_implying_examples}"

        f"Hot takes that contradict other hot takes won't be accepted. Refer to {contradicting_examples}",

        "Hot takes that involve predicting injuries and suspensions won't be accepted.",
    ]

    # Get OpenAI API Key and Initialize OpenAI client
    load_dotenv()
    open_ai_api_key = os.getenv("OPENAI_API_KEY")
    client = OpenAI(api_key=open_ai_api_key)

    response = client.responses.create(
        model = "gpt-4.1-2025-04-14",
        input = f"Please evaluate the validity of the following hot take: '{hotTake}'? " +
            "Here are some other hot takes for context: " + json.dumps(listOfHotTakes) +
            "And here are the rules for hot takes: " + json.dumps(hotTakeRules) +
            "Please respond with 'This hot take is valid' if the hot take is valid, "
            "or 'This hot take is invalid, --reason--', if it's not."
    )

    # print(response.json())

    response_json = json.loads(response.json())
    print(f"Response: {response_json.get('output')[0].get('content')[0].get('text')}")

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

        