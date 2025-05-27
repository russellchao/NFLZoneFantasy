package com.nfl.nfl_zone.PlayerStats.passer;

import jakarta.transaction.Transactional;
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

    public List<Passer> getPassersByTeamAndPos(String team, String pos) {
        return passerRepository.findAll().stream()
                .filter(passer -> team.equals(passer.getTeam()) && pos.equals(passer.getPos()))
                .collect(Collectors.toList());
    }

    public Passer addPasser(Passer passer) {
        passerRepository.save(passer);
        return passer;
    }

    public Passer updatePasser(Passer updatedPasser) {
        Optional<Passer> existingPasser = passerRepository.findByName(updatedPasser.getName());

        if (existingPasser.isPresent()) {
            Passer passerToUpdate = existingPasser.get();
            passerToUpdate.setName(updatedPasser.getName());
            passerToUpdate.setPos(updatedPasser.getPos());
            passerToUpdate.setTeam(updatedPasser.getTeam());

            passerRepository.save(passerToUpdate);
            return passerToUpdate;
        }

        return null;
    }

    @Transactional
    public void deletePasser(String passerName) {
        passerRepository.deleteByName(passerName);
    }

}























