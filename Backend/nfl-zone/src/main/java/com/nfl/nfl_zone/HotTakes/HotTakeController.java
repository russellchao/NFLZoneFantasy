package com.nfl.nfl_zone.HotTakes;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/hotTakes")
public class HotTakeController {

    private final HotTakeService hotTakeService;

    public HotTakeController(HotTakeService hotTakeService) {
        this.hotTakeService = hotTakeService;
    }

    @GetMapping("/get")
    public List<String> getHotTakes(@RequestParam String username) {
        return hotTakeService.getHotTakes(username);
    }

    @GetMapping("/validate")
    public String validateHotTake(@RequestParam String username, @RequestParam String hotTake) {
        return hotTakeService.validateHotTake(username, hotTake);
    }

    @PostMapping("/save")
    public String saveHotTake(@RequestParam String username, @RequestParam String hotTake) {
        return hotTakeService.saveHotTake(username, hotTake);
    }

    @DeleteMapping("/delete")
    public String deleteHotTake(@RequestParam String username, @RequestParam String hotTake) {
        return hotTakeService.deleteHotTake(username, hotTake);
    }

}
