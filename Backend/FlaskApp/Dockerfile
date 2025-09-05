FROM python:3.12.4-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements file
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Create directories for data files
RUN mkdir -p PlayerStatsData ScheduleData

# Copy source code
COPY . .

# Expose port 5000
EXPOSE 5000

# Set environment variables for development
ENV FLASK_APP=endpoints.py
ENV FLASK_DEBUG=1

# Start Flask in development mode with auto-reload
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000", "--reload"]