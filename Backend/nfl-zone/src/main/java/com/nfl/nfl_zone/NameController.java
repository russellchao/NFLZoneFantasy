package com.nfl.nfl_zone;

import com.fasterxml.jackson.databind.util.JSONPObject;
import com.nfl.nfl_zone.passer.Passer;
import com.nfl.nfl_zone.passer.PasserService;
import com.nfl.nfl_zone.rusher.Rusher;
import com.nfl.nfl_zone.rusher.RusherService;
import com.nfl.nfl_zone.reciever.Receiver;
import com.nfl.nfl_zone.reciever.ReceiverService;
import com.nfl.nfl_zone.defender.Defender;
import com.nfl.nfl_zone.defender.DefenderService;
import com.nfl.nfl_zone.kicker.Kicker;
import com.nfl.nfl_zone.kicker.KickerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;


@RestController
@RequestMapping(path="api/v1")
public class NameController {

    private final PasserService passerService;
    private final RusherService rusherService;
    private final ReceiverService receiverService;
    private final DefenderService defenderService;
    private final KickerService kickerService;

    @Autowired
    public NameController(
            PasserService passerService,
            RusherService rusherService,
            ReceiverService receiverService,
            DefenderService defenderService,
            KickerService kickerService) {

        this.passerService = passerService;
        this.rusherService = rusherService;
        this.receiverService = receiverService;
        this.defenderService = defenderService;
        this.kickerService = kickerService;
    }


    @GetMapping
    public Map<String, Object> getNames(
            @RequestParam() String name) {

        Map<String, Object> names = new HashMap<>();

        if (name != null) {

            List<Passer> passers = passerService.getPassersByName(name);
            List<Rusher> rushers = rusherService.getRushersByName(name);
            List<Receiver> receivers = receiverService.getReceiversByName(name);
            List<Defender> defenders = defenderService.getDefendersByName(name);
            List<Kicker> kickers = kickerService.getKickersByName(name);

            // Ensure that only the correct stats get implemented into each position list
            for (Passer p : passers) {
                if ()
                names.put("Quarterbacks", passers);
            }


            names.put("Running Backs", rushers);
            names.put("Wide Receivers and Tight Ends", receivers);
            names.put("Defenders", defenders);
            names.put("Kickers", kickers);

            return names;

        } else {
            return null;
        }

    }


}
