# Stage 1: Build the application
FROM eclipse-temurin:21 AS builder

WORKDIR /app

# Copy source files
COPY . .

# Build the application using Maven
RUN ./mvnw clean package -DskipTests

# Stage 2: Run the application
FROM eclipse-temurin:21-jre

WORKDIR /app

# Copy the built jar from the builder stage
COPY --from=builder /app/target/*.jar app.jar

# Expose the application's port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
