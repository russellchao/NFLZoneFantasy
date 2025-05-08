package com.nfl.nfl_zone.reciever;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/receiver")
public class ReceiverController {

    private final ReceiverService receiverService;

    @Autowired
    public ReceiverController(ReceiverService receiverService) {
        this.receiverService = receiverService;
    }

    @GetMapping
    public List<Receiver> getReceivers(
        @RequestParam(required = false) String team,
        @RequestParam(required = false) String name,
        @RequestParam(required = false) String pos) {

        if (team != null && pos != null) {
            return receiverService.getReceiversByTeamAndPos(team, pos);
        }
        else if (team != null) {
            return receiverService.getReceiversFromTeam(team);
        }
        else if (name != null) {
            return receiverService.getReceiversByName(name);
        }
        else if (pos != null) {
            return receiverService.getReceiversByPos(pos);
        }
        else {
           return receiverService.getReceivers();
        }

    }

    @PostMapping
    public ResponseEntity<Receiver> addReceiver(@RequestBody Receiver receiver) {
        Receiver createdReceiver = receiverService.addReceiver(receiver);
        return new ResponseEntity<>(createdReceiver, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Receiver> updateReceiver(@RequestBody Receiver receiver) {
        Receiver resultReceiver = receiverService.updateReceiver(receiver);
        if (resultReceiver != null) {
            return new ResponseEntity<>(resultReceiver, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{receiverName}")
    public ResponseEntity<String> deleteReceiver(@PathVariable String receiverName) {
        receiverService.deleteReceiver(receiverName);
        return new ResponseEntity<>("Receiver deleted successfully", HttpStatus.OK);
    }

}




















