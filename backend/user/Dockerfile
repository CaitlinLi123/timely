# Start from a Maven image to build the app
FROM maven:3.9.4-eclipse-temurin-21 AS builder

# Set working directory inside container
WORKDIR /app

# Copy the pom.xml and download dependencies first (for better caching)
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the entire project and build, skipping tests
COPY . .
RUN mvn clean package -DskipTests

# Use a smaller image for the final run stage
FROM eclipse-temurin:21-jdk-alpine

# Set the working directory for the final image
WORKDIR /app

# Copy the built jar from the builder stage
COPY --from=builder /app/target/*.jar user.jar

# Set the command to run the app
ENTRYPOINT ["java", "-jar", "user.jar"]



