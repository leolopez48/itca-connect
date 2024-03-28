# Use a base image with Java 17
FROM openjdk:17

# Copy the JAR package into the image
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar

# Expose the application port
EXPOSE 8080

# Copy the pom.xml file to the working directory
COPY pom.xml .

# Run the App
ENTRYPOINT ["java", "-jar", "/app.jar"]