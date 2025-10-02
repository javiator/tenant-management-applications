# Tenant Management System - Java Spring Boot + React

A full-stack tenant management application with Spring Boot backend and React frontend, designed for containerized deployment.

## Project Structure

```
tenant-management-java/
├── backend/                 # Spring Boot application
│   ├── src/
│   ├── pom.xml
│   ├── Dockerfile
│   └── docker-compose.yml   # Backend-only compose
├── frontend/                # React application
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── Dockerfile
│   └── nginx.conf
├── docker-compose.yml       # Full-stack orchestration
└── README.md
```

## Technology Stack

### Backend
- **Java 21** with Spring Boot 3.3.4
- **Spring Data JPA** for database operations
- **H2** (development) / **PostgreSQL** (production)
- **Flyway** for database migrations
- **Springdoc OpenAPI** for API documentation
- **Docker** for containerization

### Frontend
- **React 18** with modern hooks
- **Axios** for API communication
- **Tailwind CSS** for styling
- **Nginx** for production serving

## Quick Start

### Option 1: Full Stack with Docker Compose (Recommended)

```bash
# Start all services (PostgreSQL + Backend + Frontend)
docker compose up --build

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:8080
# API Docs: http://localhost:8080/swagger-ui.html
```

### Option 2: Development Mode

#### Backend Only
```bash
cd backend
mvn spring-boot:run
# Backend runs on http://localhost:8080
```

#### Frontend Only
```bash
cd frontend
npm install
npm start
# Frontend runs on http://localhost:3000
```

## API Endpoints

### Properties
- `GET /api/properties` - List all properties
- `POST /api/properties` - Create property
- `PUT /api/properties/{id}` - Update property
- `DELETE /api/properties/{id}` - Delete property

### Tenants
- `GET /api/tenants` - List all tenants
- `POST /api/tenants` - Create tenant
- `PUT /api/tenants/{id}` - Update tenant
- `DELETE /api/tenants/{id}` - Delete tenant

### Transactions
- `GET /api/transactions` - List all transactions
- `POST /api/transactions` - Create transaction
- `PUT /api/transactions/{id}` - Update transaction
- `DELETE /api/transactions/{id}` - Delete transaction

## Database

### Development (H2)
- In-memory database with console at `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:testdb`
- Username: `sa`, Password: (empty)

### Production (PostgreSQL)
- Persistent database with Docker volume
- Connection details in `docker-compose.yml`

## Features

- **Property Management**: Add, edit, delete properties
- **Tenant Management**: Track tenant details, contracts, payments
- **Transaction Management**: Record rent payments and other transactions
- **Responsive UI**: Modern React interface with Tailwind CSS
- **API Documentation**: Interactive Swagger UI
- **Health Monitoring**: Spring Boot Actuator endpoints

## Development

### Backend Development
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### Frontend Development
```bash
cd frontend
npm install
npm start
```

### Database Migrations
- Flyway migrations in `backend/src/main/resources/db/migration/`
- Add new migrations with version numbers (V3__, V4__, etc.)

## Deployment

### Docker Production Build
```bash
# Build and run with production database
docker compose -f docker-compose.yml up --build
```

### Individual Service Deployment
```bash
# Backend only
cd backend
docker compose up

# Frontend only (requires backend running)
cd frontend
docker build -t tenant-frontend .
docker run -p 3000:3000 tenant-frontend
```

## Configuration

### Environment Variables
- `SPRING_PROFILES_ACTIVE`: `dev` (H2) or `prod` (PostgreSQL)
- `REACT_APP_API_URL`: Backend API URL for frontend

### Database Configuration
- Development: H2 in-memory database
- Production: PostgreSQL with persistent storage

## Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure ports 3000, 8080, 5432 are available
2. **Database connection**: Check PostgreSQL container is running
3. **Frontend API calls**: Verify `REACT_APP_API_URL` points to backend
4. **Migration errors**: Clear H2 database files and restart

### Reset Database
```bash
# For H2 development
rm -f backend/data/dev-db*

# For PostgreSQL
docker compose down -v
docker compose up --build
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with Docker Compose
5. Submit a pull request

## License

This project is licensed under the MIT License.