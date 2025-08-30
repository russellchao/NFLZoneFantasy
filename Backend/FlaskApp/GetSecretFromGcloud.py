from google.cloud import secretmanager

def get_secret_from_gcloud(secret):
    # Get a secret (e.g. an API Key) from the Google Cloud Secret Manager for the NFL Zone project in Google Cloud
    try:
        project_id = "nfl-zone-470604"
        client = secretmanager.SecretManagerServiceClient()
        name = f"projects/{project_id}/secrets/{secret}/versions/latest"
        response = client.access_secret_version(name=name)
        
        return response.payload.data.decode("UTF-8")
        
    except ImportError:
        raise Exception("google-cloud-secret-manager library not installed. Run: pip install google-cloud-secret-manager")
    except Exception as e:
        raise Exception(f"Failed to retrieve secret from Google Secret Manager: {str(e)}")