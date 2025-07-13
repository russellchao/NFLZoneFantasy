import re


def basic_invalidator(hotTake, listOfHotTakes):

    ##### BASIC CONDITIONS FOR INVALIDATION #####
    # 1. If there already exists 10 hot takes
    # 2. If the hot take already exists in the currentl list of hot takes

    # TODO: 
    # For the second condition, set every letter to lowercase, check for extra punctuation, check for contractions
    # in the incoming take and each hot take in the current list of hot takes
    
    if len(listOfHotTakes) >= 10:
        return "This hot take is invalid, you already have 10 hot takes"
    
    if hotTake in listOfHotTakes:
        return "This hot take is invalid, you already have this hot take"
    
    return "This hot take passes the basic invalidation test"



def extract_team_and_action(hotTake):
    # Very basic extractor, this can be expanded 
    patterns = [
        (r'(.*?) will win the (AFC|NFC|Super Bowl|[A-Z]{2,} [A-Z][a-z]+)', 'win'),
        (r'(.*?) won\'t win the (AFC|NFC|Super Bowl|[A-Z]{2,} [A-Z][a-z]+)', 'not_win'),
        (r'(.*?) will make the playoffs', 'make_playoffs'),
        (r'(.*?) will miss the playoffs', 'miss_playoffs'),
    ]

    for pattern, action in patterns:
        match = re.search(pattern, hotTake, re.IGNORECASE)

        if match:
            team = match.group(1).strip()
            return (team.lower(), action)
        
    return (None, None)



def is_contradictory(hotTake, listOfHotTakes):
    team1, action1 = extract_team_and_action(hotTake)
    if not team1 or not action1:
        return False  # Not analyzable
    
    for take in listOfHotTakes:
        team2, action2 = extract_team_and_action(take)
        if not team2 or not action2:
            continue

        if team1 == team2:
            if (action1 == 'make_playoffs' and action2 == 'miss_playoffs') or \
               (action1 == 'miss_playoffs' and action2 == 'make_playoffs') or \
               (action1 == 'win' and action2 == 'not_win') or \
               (action1 == 'not_win' and action2 == 'win'):
                return True

        # Mutually exclusive titles
        if action1 == 'win' and action2 == 'win' and team1 != team2:
            if 'super bowl' in hotTake.lower() and 'super bowl' in take.lower():
                return True
            if 'afc' in hotTake.lower() and 'afc' in take.lower():
                return True
            if 'nfc' in hotTake.lower() and 'nfc' in take.lower():
                return True
            if 'division' in hotTake.lower() and 'division' in take.lower():
                return True

    return False







def validate_hot_take(hotTake, listOfHotTakes):

    # 1. Basic invalidator
    result = basic_invalidator(hotTake, listOfHotTakes)
    if result != "This hot take passes the basic invalidation test": return result

    # 2. Contradiction invalidator
    if is_contradictory(hotTake, listOfHotTakes):
        return "This hot take is invalid, it contradicts an existing hot take"




    return "This hot take is valid"






if __name__ == '__main__':
    # FOR TESTING ONLY

    listOfHotTakes = [
        "Jayden Daniels will be top 5 in passing yards", 
        "The Bengals will fire Zac Taylor by the end of the season",
        "The Panthers will make the playoffs",
        "The Eagles won't make the Super Bowl",
        "The Eagles will make the Super Bowl"
    ]


    while True:
        hotTake = input("Enter your hot take: ")
        result = validate_hot_take(hotTake, listOfHotTakes)
        print(result)