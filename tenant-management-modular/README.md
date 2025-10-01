# Tenant Management System - Modular Version

A modern, modular property management application with separate frontend and backend components. This is the modular version of the original single-file application.

## Project Structure

```
tenant-management-modular/
├── backend/                 # Flask backend API
│   ├── __init__.py
│   ├── app.py              # Flask application factory
│   ├── config.py           # Configuration management
│   ├── models.py           # Database models
│   ├── routes.py           # API routes
│   └── services.py         # Business logic services
├── fastapi_backend/        # FastAPI backend API (auto Swagger)
│   ├── config.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   └── main.py
├── frontend/               # React frontend
│   ├── package.json
│   ├── public/
│   └── src/
│       ├── App.js
│       ├── App.css
│       └── components/
│           ├── Navigation.js
│           ├── Dashboard.js
│           ├── Tenants.js
│           ├── Properties.js
│           └── Transactions.js
├── instance/               # Database files (auto-created)
├── run.py                  # Flask backend entry point
├── start_dev.py           # Flask dev startup script
├── requirements.txt        # Python dependencies (Flask + FastAPI)
└── README.md
```

## Features

- **Modular Architecture**: Clean separation between frontend and backend
- **RESTful API**: Complete CRUD operations for tenants, properties, and transactions
- **Database Management**: SQLite with automatic backup functionality
- **Report Generation**: CSV exports for all data types
- **Modern UI**: React-based frontend with responsive design
- **Environment Configuration**: Flexible configuration via environment variables

## Quick Start (with uv)

### Option A: Run FastAPI (recommended during development)

1. Sync dependencies with uv:
   ```bash
    cd tenant-management-modular
    uv sync
   ```
2. Start FastAPI server (port 8000):
   ```bash
   uv run uvicorn fastapi_backend.main:app --reload
   ```
3. Start the React app (proxy is set to 8000):
   ```bash
   cd frontend
   npm install
   npm start
   ```
4. API docs available at:
   - Swagger UI: `http://localhost:8000/docs`
   - ReDoc: `http://localhost:8000/redoc`
   - OpenAPI: `http://localhost:8000/openapi.json`

### Option B: Run Flask (existing modular Flask backend)

1. Sync dependencies with uv:
   ```bash
    cd tenant-management-modular
    uv sync
   ```
2. Start Flask backend (port 5000):
   ```bash
   uv run python run.py
   ```
3. If using Flask with the React dev server, change `frontend/package.json` proxy to `http://localhost:5000`.
4. API docs for Flask (if enabled):
   - Swagger UI: `http://localhost:5000/docs`
   - OpenAPI YAML: `http://localhost:5000/openapi.yaml`

## API Endpoints

### Tenants
- `GET /api/tenants` - Get all tenants (with pagination)
- `GET /api/tenants/{id}` - Get specific tenant
- `POST /api/tenants` - Create new tenant
- `PUT /api/tenants/{id}` - Update tenant
- `DELETE /api/tenants/{id}` - Delete tenant

### Properties
- `GET /api/properties` - Get all properties
- `GET /api/properties/{id}` - Get specific property
- `POST /api/properties` - Create new property
- `PUT /api/properties/{id}` - Update property
- `DELETE /api/properties/{id}` - Delete property

### Transactions
- `GET /api/transactions` - Get all transactions
- `GET /api/transactions/{id}` - Get specific transaction
- `POST /api/transactions` - Create new transaction
- `PUT /api/transactions/{id}` - Update transaction
- `DELETE /api/transactions/{id}` - Delete transaction

### Reports
- `GET /api/reports/tenants_csv` - Download tenants CSV report
- `GET /api/reports/properties_csv` - Download properties CSV report
- `GET /api/reports/transactions_csv` - Download transactions CSV report

### System
- `GET /api/backup` - Download database backup

## Configuration

Uses the same environment variables for both backends:

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URI` | Database connection string | `sqlite:///app.db` |
| `BACKUP_STORAGE_PATH` | Path for backup files | `.` |
| `CORS_ORIGINS` | Allowed CORS origins (comma-separated) | `http://localhost:3000` |

SQLite path follows the Flask instance convention: the actual DB file is stored under `tenant-management-modular/instance/`.

## Notes
- React dev proxy now targets `http://localhost:8000` for FastAPI. Switch to `5000` if you run the Flask backend instead.
- Both backends expose the same API routes under `/api/*` so the frontend works with either.

## Development

### Backend Development

The backend follows a modular structure:

- **Models** (`backend/models.py`): Database schema and relationships
- **Services** (`backend/services.py`): Business logic and data operations
- **Routes** (`backend/routes.py`): API endpoints and request handling
- **Config** (`backend/config.py`): Application configuration

### Frontend Development

The frontend is built with React and includes:

- **Components**: Reusable UI components
- **Routing**: Client-side navigation
- **API Integration**: Axios for backend communication
- **Styling**: Custom CSS with responsive design

## Comparison with Original

This modular version offers several advantages over the original single-file application:

### Original (`tenant-management-app/`)
- Single `app.py` file with embedded HTML/CSS/JS
- All functionality in one place
- Harder to maintain and scale
- No separation of concerns

### Modular Version (`tenant-management-modular/`)
- Separate frontend and backend
- Clean architecture with proper separation
- Easier to maintain and extend
- Better for team development
- Modern development practices

## Deployment

### Backend Deployment

1. **Production WSGI Server:**
   ```bash
   uv pip install gunicorn
   uv run gunicorn -w 4 -b 0.0.0.0:5000 run:app
   ```

2. **Environment Variables:**
   Set production environment variables:
   ```env
   FLASK_ENV=production
   SECRET_KEY=your-production-secret-key
   DATABASE_URI=your-production-database-uri
   ```

### Frontend Deployment

1. **Build for Production:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Serve Static Files:**
   Use a web server like nginx to serve the `build` directory.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
