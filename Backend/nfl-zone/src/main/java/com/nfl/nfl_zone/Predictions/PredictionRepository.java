package com.nfl.nfl_zone.Predictions;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.*;

@Repository
public interface PredictionRepository extends JpaRepository<Prediction, String> {
    Optional<Prediction> findByPredictionId(String predictionId);
    List<Prediction> findAllByUsername(String username);
    Optional<Prediction> findByGameIdAndUsername(String gameId, String username);
}
