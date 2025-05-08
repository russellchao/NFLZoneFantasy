package com.nfl.nfl_zone.kicker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/kicker")
public class KickerController {

    private final KickerService kickerService;

    @Autowired
    public KickerController(KickerService kickerService) {
        this.kickerService = kickerService;
    }

    @GetMapping
    public List<Kicker> getKickers(
        @RequestParam(required = false) String team,
        @RequestParam(required = false) String name,
        @RequestParam(required = false) String pos) {

        if (team != null && pos != null) {
            return kickerService.getKickersByTeamAndPos(team, pos);
        }
        else if (team != null) {
            return kickerService.getKickersFromTeam(team);
        }
        else if (name != null) {
            return kickerService.getKickersByName(name);
        }
        else if (pos != null) {
            return kickerService.getKickersByPos(pos);
        }
        else {
           return kickerService.getKickers();
        }

    }

    @PostMapping
    public ResponseEntity<Kicker> addKicker(@RequestBody Kicker kicker) {
        Kicker createdKicker = kickerService.addKicker(kicker);
        return new ResponseEntity<>(createdKicker, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Kicker> updateKicker(@RequestBody Kicker kicker) {
        Kicker resultKicker = kickerService.updateKicker(kicker);
        if (resultKicker != null) {
            return new ResponseEntity<>(resultKicker, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{kickerName}")
    public ResponseEntity<String> deleteKicker(@PathVariable String kickerName) {
        kickerService.deleteKicker(kickerName);
        return new ResponseEntity<>("Kicker deleted successfully", HttpStatus.OK);
    }

}




















