# Use Python official image
FROM python:3.12.4-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements file
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy source code
COPY . .

# Create directories for data files
RUN mkdir -p PlayerStatsData ScheduleData

# Expose port 5000 (Flask default)
EXPOSE 5000

# Set environment variables
ENV FLASK_APP=endpoints.py
ENV FLASK_ENV=production

# Start the Flask application
CMD ["python", "endpoints.py"]