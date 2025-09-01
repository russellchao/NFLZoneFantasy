# Use OpenJDK 17 (matching your pom.xml)
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy Maven wrapper and pom.xml
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Make mvnw executable
RUN chmod +x ./mvnw

# Download dependencies
RUN ./mvnw dependency:go-offline -B

# Copy source code
COPY src ./src

# Build the application
RUN ./mvnw clean package -DskipTests

# Expose port 8081 (your custom port)
EXPOSE 8081

# Run the jar file
CMD ["java", "-jar", "-Dserver.port=8081", "target/nfl-zone-0.0.1-SNAPSHOT.jar"]