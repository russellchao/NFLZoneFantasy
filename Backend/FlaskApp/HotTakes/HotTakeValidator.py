def validate_hot_take(hotTake, listOfHotTakes):
    
    # If the length of the hot takes list is already 10
    if len(listOfHotTakes) >= 10:
        return "This hot take is invalid, you already have 10 hot takes"
    
    # If the hot take is already in the list of hot takes
    if hotTake in listOfHotTakes:
        return "This hot take is invalid, you already have this hot take"

    return "This hot take is valid"