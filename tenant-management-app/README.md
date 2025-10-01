# Tenant Management App

A single-file Flask app to manage tenants, properties, and transactions. It serves a modern UI from `app.py`, persists data in a local SQLite database (`instance/app.db`), and supports CSV and Excel exports.

## Features
- Manage tenants, properties, and transactions in one place
- Filter, sort, and paginate transactions in the UI
- Export CSV reports for tenants, properties, and transactions
- Export monthly Excel reports (OpenPyXL)
- Uses SQLite by default; tables auto-create on first run

## Requirements
- Python 3.10+
- uv (fast Python package manager and runner)

Install `uv` (see docs at `https://docs.astral.sh/uv/`), then let it handle dependencies automatically when running the app.

Python packages used by the app include (resolved by uv):
- Flask
- Flask-SQLAlchemy
- python-dotenv
- openpyxl

## Configuration
- Database URL via `DATABASE_URI` env var (defaults to `sqlite:///app.db` which creates `instance/app.db`).
- Optional `.env` file in this folder is loaded automatically.

Example `.env`:
```env
DATABASE_URI=sqlite:///app.db
FLASK_ENV=development
```

## Running the App (uv)
Simple run (auto-creates DB tables):
```bash
uv run python app.py
```

Run with a different host/port:
```bash
uv run python -c "import app; app.app.run(host='0.0.0.0', port=5050, debug=True)"
```

By default the server runs at `http://127.0.0.1:5000/` with debug enabled.

## Useful Endpoints
- UI: `/`
- Reports (CSV):
  - `/api/reports/tenants_csv`
  - `/api/reports/properties_csv`
  - `/api/reports/transactions_csv`

## Database Notes
- SQLite database file is stored under `instance/app.db`.
- Initial tables are created on first run inside `if __name__ == '__main__':`.

## Development Tips
- If you change models, delete `instance/app.db` to recreate from scratch (dev only).
- Use the built-in UI forms to create and edit records.

## Troubleshooting
- **Port in use**: change the run command (with uv):
  ```bash
  uv run python -c "import app; app.app.run(host='0.0.0.0', port=5050, debug=True)"
  ```
- **Missing packages**: uv will resolve and install on first run.
- **Database locked**: stop other processes accessing `app.db` and retry.


