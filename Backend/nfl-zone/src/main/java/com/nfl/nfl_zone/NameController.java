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

            // Remove any multiple non-leading/trailing spaces, all leading/trailing spaces and hyphens in the name
            name = name.replaceAll("\\s+", " ");
            name = name.trim();
            // name = name.replaceAll("-", " ");

            List<Passer> passers = passerService.getPassersByName(name);
            List<Rusher> rushers = rusherService.getRushersByName(name);
            List<Receiver> receivers = receiverService.getReceiversByName(name);
            List<Defender> defenders = defenderService.getDefendersByName(name);
            List<Kicker> kickers = kickerService.getKickersByName(name);

            // Ensure that only the correct stats get implemented into each position list (not necessary for QBs and Kickers)

            names.put("Quarterbacks", passers);

            List<Rusher> allRBs = new ArrayList<>();
            for (Rusher r : rushers) {
                if (r.getPos().equals("RB")) {
                    allRBs.add(r);
                }
            }
            names.put("Running Backs", allRBs);

            List<Receiver> allWRsTEs = new ArrayList<>();
            for (Receiver r : receivers) {
                if (r.getPos().equals("WR") || r.getPos().equals("TE")) {
                    allWRsTEs.add(r);
                }
            }
            names.put("Wide Receivers and Tight Ends", allWRsTEs);

            List<Defender> allDefenders = new ArrayList<>();
            for (Defender d : defenders) {
                if (d.getPos().contains("LB") || d.getPos().contains("CB") || d.getPos().contains("S") || d.getPos().contains("DE") || d.getPos().contains("DT") ) {
                    allDefenders.add(d);
                }
            }
            names.put("Defenders", allDefenders);

            names.put("Kickers", kickers);


            return names;

        } else {
            return null;
        }

    }


}
