package com.nfl.nfl_zone.PlayerStats.rusher;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/rusher")
public class RusherController {

    private final RusherService rusherService;

    @Autowired
    public RusherController(RusherService rusherService) {
        this.rusherService = rusherService;
    }

    @GetMapping
    public List<Rusher> getRushers(
        @RequestParam(required = false) String team,
        @RequestParam(required = false) String name,
        @RequestParam(required = false) String pos) {

        if (team != null && pos != null) {
            return rusherService.getRushersByTeamAndPos(team, pos);
        }
        else if (team != null) {
            return rusherService.getRushersFromTeam(team);
        }
        else if (name != null) {
            return rusherService.getRushersByName(name);
        }
        else if (pos != null) {
            return rusherService.getRushersByPos(pos);
        }
        else {
           return rusherService.getRushers();
        }

    }

    @PostMapping
    public ResponseEntity<Rusher> addRusher(@RequestBody Rusher rusher) {
        Rusher createdRusher = rusherService.addRusher(rusher);
        return new ResponseEntity<>(createdRusher, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Rusher> updateRusher(@RequestBody Rusher rusher) {
        Rusher resultRusher = rusherService.updateRusher(rusher);
        if (resultRusher != null) {
            return new ResponseEntity<>(resultRusher, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{rusherName}")
    public ResponseEntity<String> deleteRusher(@PathVariable String rusherName) {
        rusherService.deleteRusher(rusherName);
        return new ResponseEntity<>("Rusher deleted successfully", HttpStatus.OK);
    }

}




















