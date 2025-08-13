# Task Management Application

This application was built to manage tasks, providing features to create, edit, list, and delete, developed with Java + Spring Boot for the backend and React + TypeScript + Vite for the frontend.

## Technologies Used

- **Backend**: Java with Spring Boot (Spring Data JPA, Spring Web, PostgreSQL Driver and Lombok).
- **Frontend**: ReactJS + TypeScript + Vite with Redux Toolkit, Axios.
- **Styling**: Ant Design + Styled Components
- **Database**: In Memory

## Requirements

Before setting up the application, ensure your environment meets the following requirements:

### Backend
- **Java**: OpenJDK 21  
  Install via your package manager or download from the [OpenJDK website](https://openjdk.org/).  
  
- **Maven**: Apache Maven 3.9+  
  Ensure Maven is installed for dependency management and building.

### Frontend
- **Node.js**: Node.js 22.17.1  
  Install Node.js 22 using a version manager like `nvm` or directly from the [Node.js website](https://nodejs.org/).  
 
- **yarn**: Install yarn directly from the [yarn website](https://classic.yarnpkg.com/lang/en/docs/install/) or using the `npm` package installer with the following command:
   ```bash 
   npm install -g yarn
   ```

## Run with Docker
You can use Docker to quickly set up and run the application. Follow these steps:

### Running the Backend

1. Go to the folder `backend` and run the following command:
   ```bash
   docker-compose up --build -d
   ```
   this command will build and start both Backend and PostgreSQL containers.

   - The backend will be available at [http://localhost:8080](http://localhost:8080).
 - You can find the Insomnia Collection file for this project on the folder `backend/local/docker/Insomnia_2025-08-13.yaml` and import it to your Insomnia application to test the API.

### Frontend

1. Go to the folder `frontend` and run the following command:
   ```bash
   docker-compose up --build -d
   ```
   this command will build and start the Frontend container of the application.

   - The frontend will be available at [http://localhost:4173](http://localhost:4173).

## Local Development Setup
If you prefer to set up the application manually for local development, follow these steps:

### Backend
**Important**: You should have a configured and running PostgreSQL instance.

1. Clone the repository.
2. Go to the `backend` directory and install dependencies using the following command:
   ```bash
   ./mvnw clean install
3. Run the Spring Boot application:
    ```bash
    ./mvnw spring-boot:run
    ```
4. The backend will be available at http://localhost:8080.

You can also have this project imported and configured in your prefered working tool, like Intellij IDEA or VSCode.

### Frontend
1. Clone the repository.
2. Navigate to the `frontend` directory and install dependencies:
   ```bash
   yarn install
   ```
3. Start the application with the following command:
    ```bash
   yarn run dev
   ```
4. The frontend will be available at http://localhost:5173.