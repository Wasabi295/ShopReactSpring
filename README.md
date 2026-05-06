# ShopReactSpring — Full-Stack E-Commerce App

A small but realistic online shop with a **Spring Boot 3** backend and a **React + Vite + Tailwind** frontend. The project is set up to run either locally (`docker-compose up`) or against managed services (Neon Postgres + Upstash Redis + Netlify), and is wired with JWT authentication, an admin dashboard, role-based access, Firebase-powered chat between users and admins, and product images.

## Features

- **Authentication** — register / login with JWT, hashed passwords, role check (`USER` / `ADMIN`)
- **Catalog** — products with images, CRUD from the admin dashboard
- **Orders** — cart, checkout, order history, per-order item snapshots
- **Admin dashboard** — manage products, view orders, answer user chats
- **Live user ↔ admin chat** — Firebase Realtime / Firestore in the frontend, plus admin notifications
- **Caching** — Redis (Lettuce) for hot reads
- **Database migrations** — Flyway scripts in `db/migration/`
- **OpenAPI / Swagger UI** — `springdoc-openapi` exposes interactive API docs
- **Observability** — Spring Boot Actuator endpoints

## Tech stack

**Backend** — Java 21, Spring Boot 3.2, Spring Security, Spring Data JPA (PostgreSQL), Spring Data Redis, Flyway, JJWT, Lombok, springdoc-openapi, Gradle.

**Frontend** — React 18, Vite 7, React Router 7, TanStack Query 5, Axios, Tailwind CSS, Headless UI / Heroicons, Firebase JS SDK.

**Infra** — Docker Compose for local Postgres + Redis + backend; Netlify for the frontend; Neon for managed Postgres and Upstash for managed Redis in the deployed configuration.

## Repo layout

```
ShopReactSpring/
├── docker-compose.yml             # Postgres + Redis + backend (local)
├── backend/shop/                  # Spring Boot service
│   ├── build.gradle
│   ├── Dockerfile
│   └── src/main/
│       ├── java/com/shop/
│       │   ├── ShopApplication.java
│       │   ├── auth/              # JWT, Spring Security, register/login
│       │   ├── catalog/           # Product entity, service, controller
│       │   ├── order/             # Orders, order items
│       │   ├── admin/             # Admin user management
│       │   └── infrastructure/    # Caching, OpenAPI, Firebase config, init
│       └── resources/
│           ├── application.properties
│           └── db/migration/      # V1__init, V2__reset_password, ...
└── frontend/                      # React + Vite app
    ├── package.json
    ├── tailwind.config.js
    └── src/
        ├── main.jsx, App.jsx
        ├── api/axios.js
        ├── contexts/              # AuthContext, CartContext
        ├── hooks/useAuth.js
        ├── components/            # Navbar, Layout, UserChat, AdminNotifications
        └── pages/                 # Login, Register, Products, Cart,
                                   #   AdminDashboard, AdminChatPage, ProductForm
```

## Running locally with Docker

```bash
git clone https://github.com/Wasabi295/ShopReactSpring.git
cd ShopReactSpring
docker-compose up --build
```

This starts:

- `postgres` on `localhost:5432` (db `shop_db`, user `postgres` / `postgres`)
- `redis` on `localhost:6379`
- `backend` on `localhost:8080` (profile `docker`)

Then start the frontend:

```bash
cd frontend
npm install
npm run dev          # http://localhost:5173
```

## Running the backend without Docker

```bash
cd backend/shop
./gradlew bootRun
```


## API documentation

Once the backend is running, open:

- Swagger UI: `http://localhost:8080/swagger-ui.html`
- Actuator health: `http://localhost:8080/actuator/health`
