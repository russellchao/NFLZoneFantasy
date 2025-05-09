package com.nfl.nfl_zone.defender;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class DefenderService {

    private final DefenderRepository defenderRepository;

    @Autowired
    public DefenderService(DefenderRepository defenderRepository) {
        this.defenderRepository = defenderRepository;
    }

    public List<Defender> getDefenders() {
        return defenderRepository.findAll();
    }

    public List<Defender> getDefendersFromTeam(String teamName) {
        return defenderRepository.findAll().stream()
                .filter(defender -> teamName.equals(defender.getTeam()))
                .collect(Collectors.toList());
    }

    public List<Defender> getDefendersByName(String searchText) {
        return defenderRepository.findAll().stream()
                .filter(defender -> defender.getName().toLowerCase().contains(searchText.toLowerCase()))
                .collect(Collectors.toList());
    }

    public List<Defender> getDefendersByPos(String searchText) {
        return defenderRepository.findAll().stream()
                .filter(defender -> defender.getPos().toLowerCase().contains(searchText.toLowerCase()))
                .collect(Collectors.toList());
    }

    public List<Defender> getDefendersByTeamAndPos(String team, String pos) {
        return defenderRepository.findAll().stream()
                .filter(defender -> team.equals(defender.getTeam()) && pos.equals(defender.getPos()))
                .collect(Collectors.toList());
    }

    public Defender addDefender(Defender defender) {
        defenderRepository.save(defender);
        return defender;
    }

    public Defender updateDefender(Defender updatedDefender) {
        Optional<Defender> existingDefender = defenderRepository.findByName(updatedDefender.getName());

        if (existingDefender.isPresent()) {
            Defender defenderToUpdate = existingDefender.get();
            defenderToUpdate.setName(updatedDefender.getName());
            defenderToUpdate.setPos(updatedDefender.getPos());
            defenderToUpdate.setTeam(updatedDefender.getTeam());

            defenderRepository.save(defenderToUpdate);
            return defenderToUpdate;
        }

        return null;
    }

    @Transactional
    public void deleteDefender(String defenderName) {
        defenderRepository.deleteByName(defenderName);
    }

}























