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

    public List<String> getHotTakes(String username) {
        if (hotTakeRepository.findByUsername(username).isEmpty()) {
            return new ArrayList<>();
        }

        return hotTakeRepository.findByUsername(username).get().getHotTakes();
    }

    public String validateHotTake(String username, String hotTake) {

        // Check if the username exists in the hot_takes table
        if (hotTakeRepository.findByUsername(username).isEmpty()) {
            System.out.println("User \"" + username + "\" does not exist in hot_takes table. Creating new user...");

            // Add a new user to the hot_takes table if it doesn't exist
            HotTakes newUser = new HotTakes();
            newUser.setUsername(username);
            newUser.setHotTakes(new ArrayList<>());
            hotTakeRepository.save(newUser);
        }

        // Get the user's existing hot takes and convert it into a comma-separated string, or an empty string if there are no existing hot takes
        List<String> existingHotTakes = hotTakeRepository.findByUsername(username).get().getHotTakes();
        String existingHotTakesString;

        if (existingHotTakes.isEmpty()) {
            existingHotTakesString = "None";
        } else {
            existingHotTakesString = String.join(",", existingHotTakes);
        }

        System.out.println("Existing hot takes for user \"" + username + "\": " + existingHotTakesString);

        // Create the Flask endpoint that validates the hot take
        String flaskURL = String.format("http://flask-app:5000/validateHotTake/%s/%s", hotTake, existingHotTakesString);
        RestTemplate restTemplate = new RestTemplate();

        try {
            // Calls the endpoint and returns a String for whether the hot take is valid or not
            return restTemplate.getForObject(flaskURL, String.class);

        } catch (Exception e) {
            System.out.println("Error calling Flask: " + e);
            return "Spring Boot: Error validating hot take";
        }
    }

    public String saveHotTake(String username, String hotTake) {
        /**
         * NOTE: There are warnings under the get() calls saying 'Optional.get()' without 'isPresent()' check.
         * The validateHotTake(), which always gets called before this function gets called,
         * already checks if the given username exists in the hot_takes table.
          */

        hotTakeRepository.findByUsername(username).get().getHotTakes().add(hotTake);
        hotTakeRepository.save(hotTakeRepository.findByUsername(username).get());

        return "Spring Boot: Successfully saved hot take \"" + hotTake + "\" for user \"" + username + "\"";
    }

    public String deleteHotTake(String username, String hotTake) {

        // Check if the username exists in the hot_takes table
        if (hotTakeRepository.findByUsername(username).isEmpty()) {
            return "Spring Boot: User \"" + username + "\" does not exist in hot_takes table. Cannot delete hot take \"" + hotTake + "\"";
        }

        // Check if the hot take exists in the hot_takes table for the given user
        if (hotTakeRepository.findByUsername(username).get().getHotTakes().contains(hotTake)) {
            hotTakeRepository.findByUsername(username).get().getHotTakes().remove(hotTake);
            hotTakeRepository.save(hotTakeRepository.findByUsername(username).get());

            return "Spring Boot: Successfully deleted hot take \"" + hotTake + "\" for user \"" + username + "\"";
        } else {
            return "Spring Boot: Hot take \"" + hotTake + "\" does not exist for user \"" + username + "\"";
        }
    }

}
