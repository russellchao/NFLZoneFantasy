package com.nfl.nfl_zone.reciever;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class ReceiverService {

    private final ReceiverRepository receiverRepository;

    @Autowired
    public ReceiverService(ReceiverRepository receiverRepository) {
        this.receiverRepository = receiverRepository;
    }

    public List<Receiver> getReceivers() {
        return receiverRepository.findAll();
    }

    public List<Receiver> getReceiversFromTeam(String teamName) {
        return receiverRepository.findAll().stream()
                .filter(receiver -> teamName.equals(receiver.getTeam()))
                .collect(Collectors.toList());
    }

    public List<Receiver> getReceiversByName(String searchText) {
        return receiverRepository.findAll().stream()
                .filter(receiver -> receiver.getName().toLowerCase().contains(searchText.toLowerCase()))
                .collect(Collectors.toList());
    }

    public List<Receiver> getReceiversByPos(String searchText) {
        // NOTE: Every receiver will obviously have a position of QB, but this is just for practice's sake

        return receiverRepository.findAll().stream()
                .filter(receiver -> receiver.getPos().toLowerCase().contains(searchText.toLowerCase()))
                .collect(Collectors.toList());
    }

    public List<Receiver> getReceiversByTeamAndPos(String team, String pos) {
        return receiverRepository.findAll().stream()
                .filter(receiver -> team.equals(receiver.getTeam()) && pos.equals(receiver.getPos()))
                .collect(Collectors.toList());
    }

    public Receiver addReceiver(Receiver receiver) {
        receiverRepository.save(receiver);
        return receiver;
    }

    public Receiver updateReceiver(Receiver updatedReceiver) {
        Optional<Receiver> existingReceiver = receiverRepository.findByName(updatedReceiver.getName());

        if (existingReceiver.isPresent()) {
            Receiver receiverToUpdate = existingReceiver.get();
            receiverToUpdate.setName(updatedReceiver.getName());
            receiverToUpdate.setPos(updatedReceiver.getPos());
            receiverToUpdate.setTeam(updatedReceiver.getTeam());

            receiverRepository.save(receiverToUpdate);
            return receiverToUpdate;
        }

        return null;
    }

    @Transactional
    public void deleteReceiver(String receiverName) {
        receiverRepository.deleteByName(receiverName);
    }

}























