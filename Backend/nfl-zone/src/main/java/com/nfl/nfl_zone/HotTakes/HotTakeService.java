package com.nfl.nfl_zone.HotTakes;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.*;

@Service
public class HotTakeService {

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

    public void saveHotTake(String username, String hotTake) {

    }

    public void deleteHotTake(String username, String hotTake) {

    }

}
