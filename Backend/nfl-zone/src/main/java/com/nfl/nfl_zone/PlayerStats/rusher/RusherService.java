package com.nfl.nfl_zone.PlayerStats.rusher;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class RusherService {

    private final RusherRepository rusherRepository;

    @Autowired
    public RusherService(RusherRepository rusherRepository) {
        this.rusherRepository = rusherRepository;
    }

    public List<Rusher> getRushers() {
        return rusherRepository.findAll();
    }

    public List<Rusher> getRushersFromTeam(String teamName) {
        return rusherRepository.findAll().stream()
                .filter(rusher -> teamName.equals(rusher.getTeam()))
                .collect(Collectors.toList());
    }

    public List<Rusher> getRushersByName(String searchText) {
        return rusherRepository.findAll().stream()
                .filter(rusher -> rusher.getName().toLowerCase().contains(searchText.toLowerCase()))
                .collect(Collectors.toList());
    }

    public List<Rusher> getRushersByPos(String searchText) {
        // NOTE: Every rusher will obviously have a position of QB, but this is just for practice's sake

        return rusherRepository.findAll().stream()
                .filter(rusher -> rusher.getPos().toLowerCase().contains(searchText.toLowerCase()))
                .collect(Collectors.toList());
    }

    public List<Rusher> getRushersByTeamAndPos(String team, String pos) {
        return rusherRepository.findAll().stream()
                .filter(rusher -> team.equals(rusher.getTeam()) && pos.equals(rusher.getPos()))
                .collect(Collectors.toList());
    }

    public Rusher addRusher(Rusher rusher) {
        rusherRepository.save(rusher);
        return rusher;
    }

    public Rusher updateRusher(Rusher updatedRusher) {
        Optional<Rusher> existingRusher = rusherRepository.findByName(updatedRusher.getName());

        if (existingRusher.isPresent()) {
            Rusher rusherToUpdate = existingRusher.get();
            rusherToUpdate.setName(updatedRusher.getName());
            rusherToUpdate.setPos(updatedRusher.getPos());
            rusherToUpdate.setTeam(updatedRusher.getTeam());

            rusherRepository.save(rusherToUpdate);
            return rusherToUpdate;
        }

        return null;
    }

    @Transactional
    public void deleteRusher(String rusherName) {
        rusherRepository.deleteByName(rusherName);
    }

}























