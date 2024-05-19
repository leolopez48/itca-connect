# Use a base image with Java 17
FROM openjdk:17

# Copy the JAR package into the image
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar

# Set environment variables
ENV DB_HOST=${DB_HOST}
ENV DB_NAME=${DB_NAME}
ENV DB_USER=${DB_USER}
ENV DB_PASS=${DB_PASS}

# Expose the application port
EXPOSE 8080

# Copy the pom.xml file to the working directory
COPY pom.xml .

# Run the App
ENTRYPOINT ["java", "-jar", "/app.jar"]