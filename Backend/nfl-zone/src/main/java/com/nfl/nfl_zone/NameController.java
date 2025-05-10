package com.nfl.nfl_zone;

import com.nfl.nfl_zone.defender.Defender;
import com.nfl.nfl_zone.defender.DefenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="api/v1")
public class NameController {
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
    
}
