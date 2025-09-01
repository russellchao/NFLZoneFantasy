package com.nfl.nfl_zone.Config;

import com.google.cloud.secretmanager.v1.SecretManagerServiceClient;
import com.google.cloud.secretmanager.v1.SecretPayload;
import com.google.cloud.secretmanager.v1.SecretVersionName;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;

@Service
@Profile("production")
public class SecretManagerService {

    private static final Logger logger = LoggerFactory.getLogger(SecretManagerService.class);

    @Value("${google.cloud.project-id:}")
    private String projectId;

    // Cache secrets to avoid repeated API calls
    private final ConcurrentHashMap<String, String> secretCache = new ConcurrentHashMap<>();

    private SecretManagerServiceClient client;

    @PostConstruct
    public void initializeClient() {
        try {
            this.client = SecretManagerServiceClient.create();
            logger.info("Secret Manager client initialized successfully");
        } catch (IOException e) {
            logger.error("Failed to initialize Secret Manager client", e);
            throw new RuntimeException("Failed to initialize Secret Manager client", e);
        }
    }

    public String getSecret(String secretId) {
        return getSecret(secretId, "latest");
    }

    public String getSecret(String secretId, String version) {
        // Check cache first
        String cacheKey = secretId + ":" + version;
        if (secretCache.containsKey(cacheKey)) {
            return secretCache.get(cacheKey);
        }

        try {
            SecretVersionName secretVersionName = SecretVersionName.of(projectId, secretId, version);
            SecretPayload payload = client.accessSecretVersion(secretVersionName).getPayload();
            String secretValue = payload.getData().toStringUtf8();

            // Cache the secret
            secretCache.put(cacheKey, secretValue);

            logger.debug("Successfully retrieved secret: {}", secretId);
            return secretValue;

        } catch (Exception e) {
            logger.error("Failed to retrieve secret: {} from project: {}", secretId, projectId, e);
            throw new RuntimeException("Failed to retrieve secret: " + secretId, e);
        }
    }

    public void refreshSecret(String secretId) {
        String cacheKey = secretId + ":latest";
        secretCache.remove(cacheKey);
        getSecret(secretId); // This will fetch and cache the latest version
    }

    public void close() {
        if (client != null) {
            client.close();
        }
    }
}
