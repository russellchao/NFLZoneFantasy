package com.nfl.nfl_zone.PlayerStats.kicker;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class KickerService {

    private final KickerRepository kickerRepository;

    @Autowired
    public KickerService(KickerRepository kickerRepository) {
        this.kickerRepository = kickerRepository;
    }

    public List<Kicker> getKickers() {
        return kickerRepository.findAll();
    }

    public List<Kicker> getKickersFromTeam(String teamName) {
        return kickerRepository.findAll().stream()
                .filter(kicker -> teamName.equals(kicker.getTeam()))
                .collect(Collectors.toList());
    }

    public List<Kicker> getKickersByName(String searchText) {
        return kickerRepository.findAll().stream()
                .filter(kicker -> kicker.getName().toLowerCase().contains(searchText.toLowerCase()))
                .collect(Collectors.toList());
    }

    public List<Kicker> getKickersByPos(String searchText) {
        // NOTE: Every kicker will obviously have a position of QB, but this is just for practice's sake

        return kickerRepository.findAll().stream()
                .filter(kicker -> kicker.getPos().toLowerCase().contains(searchText.toLowerCase()))
                .collect(Collectors.toList());
    }

    public List<Kicker> getKickersByTeamAndPos(String team, String pos) {
        return kickerRepository.findAll().stream()
                .filter(kicker -> team.equals(kicker.getTeam()) && pos.equals(kicker.getPos()))
                .collect(Collectors.toList());
    }

    public Kicker addKicker(Kicker kicker) {
        kickerRepository.save(kicker);
        return kicker;
    }

    public Kicker updateKicker(Kicker updatedKicker) {
        Optional<Kicker> existingKicker = kickerRepository.findByName(updatedKicker.getName());

        if (existingKicker.isPresent()) {
            Kicker kickerToUpdate = existingKicker.get();
            kickerToUpdate.setName(updatedKicker.getName());
            kickerToUpdate.setPos(updatedKicker.getPos());
            kickerToUpdate.setTeam(updatedKicker.getTeam());

            kickerRepository.save(kickerToUpdate);
            return kickerToUpdate;
        }

        return null;
    }

    @Transactional
    public void deleteKicker(String kickerName) {
        kickerRepository.deleteByName(kickerName);
    }

}























