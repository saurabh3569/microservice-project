# 🧱 Microservices Setup Summary

This document outlines the current setup and progress of the microservices-based project, including services created, integrations, and planned enhancements.

---

## ✅ Services Implemented

### 1. **User Service**

- **Port:** `3001`
- **MONGO_URI:** `mongodb://localhost:27017/userdb`
- **Endpoints:**
  - `POST /users` - Create user
  - `GET /users` - List users
  - `GET /users/:id` - Get user by ID
- **Database:** MongoDB

### 2. **Product Service**

- **Port:** `3002`
- **MONGO_URI:** `mongodb://localhost:27017/productdb`
- **Endpoints:**
  - `POST /products` - Create product
  - `GET /products` - List products with creator info (via fetch approach)
  - `GET /products/:id` - Get product with creator info (via fetch approach)
- **Database:** MongoDB

### 3. **API Gateway**

- **Port:** `8000`
- **Tech:** Express + `http-proxy-middleware`
- **Proxies:**
  - `/users` → `http://localhost:3001/users`
  - `/products` → `http://localhost:3002/products`
- **Future Config:** Move target URLs to `.env` or config file

---

## 📦 Microservices Design

- Each service has its own MongoDB instance (or collection)
- Services are completely decoupled
- Inter-service data fetched via HTTP (fetch/axios)

---

## 🧪 Features Completed

- User/product creation
- API Gateway routing
- Fetching user info from user-service inside product-service

---

## ⚙️ Future Improvements

### 🔐 Authentication

- Implement JWT-based authentication at API Gateway
- Pass user details to downstream services

### 🛡️ Security & Rate Limiting

- Use `helmet`, `cors`, and `express-rate-limit`

### 📜 Documentation

- Setup Swagger for user & product APIs

### 📦 Docker

- Containerize all services
- Create `docker-compose.yml` to spin up full app

### 📁 Config Management

- Use `.env` and config file for managing service URLs and ports

---

## 🧰 Optional Enhancements

- Redis for caching user info
- RabbitMQ/Kafka for async service communication
- Centralized logging using Winston/Morgan

---

## 🚀 How to Start/Run

### Prerequisites

- Node.js & npm installed
- MongoDB running locally on default port

### 1. Clone and setup each service:

```bash
cd user-service
npm install
npm run dev
```

```bash
cd product-service
npm install
npm run dev
```

```bash
cd api-gateway
npm install
node index.js
```

### 2. Hit APIs via API Gateway

```bash
# Create User
curl -X POST http://localhost:8000/users -H "Content-Type: application/json" -d '{"name":"John Doe","email":"john@example.com"}'

# Create Product
curl -X POST http://localhost:8000/products -H "Content-Type: application/json" -d '{"name":"iPhone 15 Pro","price":1299,"createdBy":"<USER_ID>"}'

# Get Products with User Info
curl http://localhost:8000/products
```

---

## 📬 Postman Collection

- A Postman collection JSON file is available to easily test all endpoints.
- Import it into Postman using **"Import > File"** option.

That's it 💥
