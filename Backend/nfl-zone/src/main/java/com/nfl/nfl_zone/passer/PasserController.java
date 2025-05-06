package com.nfl.nfl_zone.passer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping(path = "api/v1/passer")
public class PasserController {

    private final PasserService passerService;

    @Autowired
    public PasserController(PasserService passerService) {
        this.passerService = passerService;
    }

    @GetMapping
    public List<Passer> getPassers(
        @RequestParam(required = false) String team,
        @RequestParam(required = false) String player,
        @RequestParam(required = false) String pos) {

        if (team != null && pos != null) {
            return passerService.getPassersByTeamAndPos(team, pos);
        }
        else if (team != null) {
            return passerService.getPassersFromTeam(team);
        }
        else if (player != null) {
            return passerService.getPassersByName(player);
        }
        else if (pos != null) {
            return passerService.getPassersByPos(pos);
        }
        else {
           return passerService.getPassers();
        }

    }

    @PostMapping
    public ResponseEntity<Passer> addPasser(@RequestBody Passer passer) {
        Passer createdPasser = passerService.addPasser(passer);
        return new ResponseEntity<>(createdPasser, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Passer> updatePasser(@RequestBody Passer passer) {
        Passer resultPasser = passerService.updatePasser(passer);
        if (resultPasser != null) {
            return new ResponseEntity<>(resultPasser, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{passerName}")
    public ResponseEntity<String> deletePasser(@PathVariable String passerName) {
        passerService.deletePasser(passerName);
        return new ResponseEntity<>("Passer deleted successfully", HttpStatus.OK);
    }

}




















