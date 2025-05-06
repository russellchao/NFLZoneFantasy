package com.nfl.nfl_zone.player;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;

@Component
public class PasserService {

    private final PasserRepository passerRepository;

    @Autowired
    public PasserService(PasserRepository passerRepository) {
        this.passerRepository = passerRepository;
    }

    public List<Passer> getPassers() {
        return passerRepository.findAll();
    }

    public List<Passer> getPassersFromTeam(String teamName) {
        return passerRepository.findAll().stream()
                .filter(passer -> teamName.equals(passer.getTeam()))
                .collect(Collectors.toList());
    }

    public List<Passer> getPassersByName(String searchText) {
        return passerRepository.findAll().stream()
                .filter(passer -> passer.getName().toLowerCase().contains(searchText.toLowerCase()))
                .collect(Collectors.toList());
    }

    public List<Passer> getPassersByPos(String searchText) {
        // NOTE: Every passer will obviously have a position of QB, but this is just for practice's sake

        return passerRepository.findAll().stream()
                .filter(passer -> passer.getPos().toLowerCase().contains(searchText.toLowerCase()))
                .collect(Collectors.toList());
    }

}























