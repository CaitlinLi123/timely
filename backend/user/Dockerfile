# FROM maven:3.9.6-eclipse-temurin-17 AS builder
# WORKDIR /app
# COPY pom.xml .
# COPY src ./src
# RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM openjdk:25-slim-bullseye
COPY  /target/user-service.jar user-service.jar
EXPOSE 5000
ENTRYPOINT ["java", "-jar", "user-service.jar"]