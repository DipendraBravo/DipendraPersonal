# Build stage - Use valid Maven image
FROM maven:3.8.6-jdk-17 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package

# Run stage
FROM eclipse-temurin:17-jre
COPY --from=build /app/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]