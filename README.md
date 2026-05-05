# Collaborative Whiteboard

This is the foundational boilerplate for a Collaborative Whiteboard application. 

## Quick Start

### 1. Infrastructure (Database & Cache)
Make sure you have Docker installed and running.
```bash
docker compose up -d
```
This will start PostgreSQL on port 5432 and Redis on port 6379.

### 2. Backend (Spring Boot)
Navigate to the backend directory and run the application:
```bash
cd backend
mvn spring-boot:run
```
The backend runs on `http://localhost:8080`.
You can check the health endpoint at `http://localhost:8080/api/health`.

### 3. Frontend (Next.js)
Navigate to the frontend directory, install dependencies, and start the dev server:
```bash
cd frontend
npm install
npm run dev
```
The frontend runs on `http://localhost:3000`.

## Project Structure
- `docker-compose.yml`: Local infrastructure setup (PostgreSQL + Redis).
- `backend/`: Spring Boot Java application providing the REST API.
- `frontend/`: Next.js React application with Tailwind CSS for the user interface.
