package com.nfl.nfl_zone.HotTakes;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/hotTakes")
public class HotTakeController {

    @GetMapping("/print")
    public String printHotTake(@RequestParam String hotTake) {
        // Testing the hot take Controller
        return "SPRING BOOT RESPONSE: The hot take is: " + hotTake;
    }

}
