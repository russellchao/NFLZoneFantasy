package com.nfl.nfl_zone.HotTakes;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/hotTakes")
public class HotTakeController {

    private final HotTakeService hotTakeService;

    public HotTakeController(HotTakeService hotTakeService) {
        this.hotTakeService = hotTakeService;
    }

    @GetMapping("/validate")
    public String validateHotTake(@RequestParam String hotTake) {
        return hotTakeService.validateHotTake(hotTake);
    }

    @PostMapping("/save")
    public String saveHotTake(@RequestParam String username, @RequestParam String hotTake) {
        return hotTakeService.saveHotTake(username, hotTake);
    }

}
