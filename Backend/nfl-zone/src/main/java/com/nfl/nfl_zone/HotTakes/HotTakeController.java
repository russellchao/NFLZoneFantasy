package com.nfl.nfl_zone.HotTakes;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/hotTakes")
public class HotTakeController {

    private final HotTakeService hotTakeService;

    public HotTakeController(HotTakeService hotTakeService) {
        this.hotTakeService = hotTakeService;
    }

    @GetMapping("/print")
    public String printHotTake(@RequestParam String hotTake) {
        // Testing the hot take Controller
        return "SPRING BOOT RESPONSE: The hot take is: " + hotTake;
    }

    @GetMapping("/validate")
    public String validateHotTake(@RequestParam String hotTake) {
        return hotTakeService.validateHotTake(hotTake);
    }

}
