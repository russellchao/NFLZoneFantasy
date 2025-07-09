package com.nfl.nfl_zone.HotTakes;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.*;

@Service
public class HotTakeService {

    private final HotTakeRepository hotTakeRepository;

    public HotTakeService(HotTakeRepository hotTakeRepository) {
        this.hotTakeRepository = hotTakeRepository;
    }

    public String validateHotTake(String hotTake) {
        String flaskURL = String.format("http://localhost:5000/validateHotTake/%s", hotTake);
        RestTemplate restTemplate = new RestTemplate();

        try {
            // returns a String for whether the hot take is valid or not
            return restTemplate.getForObject(flaskURL, String.class);

        } catch (Exception e) {
            System.out.println("Error calling Flask: " + e);
            return "Spring Boot: Failure validating hot take";
        }
    }

    public List<String> getHotTakes(String username) {

        return null;
    }

    public String saveHotTake(String username, String hotTake) {

        // Check if the username exists in the hot_takes table
        if (hotTakeRepository.findByUsername(username).isEmpty()) {
            System.out.println("User \"" + username + "\" does not exist in hot_takes table. Creating new user...");

            // Add a new user to the hot_takes table if it doesn't exist
            HotTakes newUser = new HotTakes();
            newUser.setUsername(username);
            newUser.setHotTakes(new ArrayList<>());
            hotTakeRepository.save(newUser);
        }

        // If the given user has less than 10 hot takes, add the new hot take to the list
        if (hotTakeRepository.findByUsername(username).get().getHotTakes().size() < 10) {
            hotTakeRepository.findByUsername(username).get().getHotTakes().add(hotTake);
            hotTakeRepository.save(hotTakeRepository.findByUsername(username).get());
        } else {
            return "Spring Boot: User \"" + username + "\" has reached the maximum number of hot takes (10)";
        }

        return "Spring Boot: Successfully saved hot take \"" + hotTake + "\" for user \"" + username + "\"";
    }

    public String deleteHotTake(String username, String hotTake) {

        return "Spring Boot: Successfully deleted hot take \"" + hotTake + "\" for user \"" + username + "\"";
    }

}
