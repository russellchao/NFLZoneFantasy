package com.nfl.nfl_zone.PlayerStats.defender;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/defender")
public class DefenderController {

    private final DefenderService defenderService;

    @Autowired
    public DefenderController(DefenderService defenderService) {
        this.defenderService = defenderService;
    }

    @GetMapping
    public List<Defender> getDefenders(
        @RequestParam(required = false) String team,
        @RequestParam(required = false) String name,
        @RequestParam(required = false) String pos) {

        if (team != null && pos != null) {
            return defenderService.getDefendersByTeamAndPos(team, pos);
        }
        else if (team != null) {
            return defenderService.getDefendersFromTeam(team);
        }
        else if (name != null) {
            return defenderService.getDefendersByName(name);
        }
        else if (pos != null) {
            return defenderService.getDefendersByPos(pos);
        }
        else {
           return defenderService.getDefenders();
        }

    }

    @PostMapping
    public ResponseEntity<Defender> addDefender(@RequestBody Defender defender) {
        Defender createdDefender = defenderService.addDefender(defender);
        return new ResponseEntity<>(createdDefender, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Defender> updateDefender(@RequestBody Defender defender) {
        Defender resultDefender = defenderService.updateDefender(defender);
        if (resultDefender != null) {
            return new ResponseEntity<>(resultDefender, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{defenderName}")
    public ResponseEntity<String> deleteDefender(@PathVariable String defenderName) {
        defenderService.deleteDefender(defenderName);
        return new ResponseEntity<>("Defender deleted successfully", HttpStatus.OK);
    }

}




















