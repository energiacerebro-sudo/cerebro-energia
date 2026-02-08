# Cerebro Energia Web App

Full-stack web app for the Cerebro Energia company website.

## Stack

- Frontend: Next.js (React) + Tailwind CSS
- Backend: Django
- Database: Postgres
- Cache: Redis

## Quick Start (Local Dev)

1. Copy env files:

```
copy backend\.env.example backend\.env
copy frontend\.env.example frontend\.env.local
```

2. Start services:

```
docker compose up --build
```

3. Create a superuser and seed content:

```
docker compose exec backend python manage.py makemigrations core
docker compose exec backend python manage.py migrate
docker compose exec backend python manage.py createsuperuser
```

4. Visit:

- Frontend: http://localhost:3000
- Backend admin: http://localhost:8000/admin

## Notes

- Content is managed in Django admin.
- The frontend pulls content from the backend JSON endpoints.
