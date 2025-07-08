package com.nfl.nfl_zone.HotTakes;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class HotTakeService {

    public String validateHotTake(String hotTake) {
        String flaskURL = String.format("http://localhost:5000/validateHotTake/%s", hotTake);
        RestTemplate restTemplate = new RestTemplate();

        try {
            String response = restTemplate.getForObject(flaskURL, String.class);

            // Placeholder for now
            return response;

        } catch (Exception e) {
            System.out.println("Error calling Flask: " + e);
            return "Spring Boot: Failure validating hot take";
        }
    }

}
