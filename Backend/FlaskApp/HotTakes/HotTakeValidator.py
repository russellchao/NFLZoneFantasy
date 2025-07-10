def validate_hot_take(hotTake, listOfHotTakes):

    ##### SECTION 1: BASIC CONDITIONS FOR INVALIDATION #####
    # 1. If there already exists 10 hot takes
    # 2. If the hot take already exists in the currentl list of hot takes

    # TODO: 
    # For the second condition, set every letter to lowercase, check for extra punctuation, check for contractions
    # in the incoming take and each hot take in the current list of hot takes
    
    if len(listOfHotTakes) >= 10:
        return "This hot take is invalid, you already have 10 hot takes"
    
    if hotTake in listOfHotTakes:
        return "This hot take is invalid, you already have this hot take"
    
    

    ##### SECTION 2: CHECK FOR CONTRADICTIONS IN THE INCOMING TAKE AGAINST EXISTING TAKES #####














    return "This hot take is valid"