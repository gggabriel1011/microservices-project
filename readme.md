# Microservices Project

## 🔖 Overview

This project implements a microservices architecture that simulates a secure profile management system. It includes full CRUD operations, JWT and Basic Auth authentication, HTTPS encryption, deployment with Docker Compose and Kubernetes, and MongoDB storage.

---

## 🛠️ Technologies Used

- **Node.js + TypeScript**: Backend for both microservices
- **Express**: HTTP framework
- **MongoDB**: NoSQL database
- **JWT**: Token-based authentication
- **Basic Auth**: HTTP authentication to protect routes
- **HTTPS**: Self-signed certificates for local encryption
- **Docker**: Service containerization
- **Kubernetes**: Service orchestration and deployment

---

## 🧰 Architecture

- **MS-CRUD**: Microservice to create, update, delete, and list profiles
- **MS-PROFILE**: Microservice to query and validate profiles using JWT tokens
- **MongoDB**: Centralized database service
- **Secrets**: Secure credential handling via Kubernetes

### Service Communication:

- Both microservices connect to the same Mongo database
- All endpoints use JSON format (✅ BR1)
- All endpoints are exposed via HTTPS + Basic Auth (✅ BR2 and SS1)
- Each service has its own endpoint (✅ BR3)

---

## ⚖️ Business Rules Implemented

- **BR1**: All requests are JSON
- **BR2**: All services use HTTPS with TLS 1.2+
- **BR3**: Each microservice exposes its own endpoint
- **SS1**: REST / HTTPS / TLS 1.2 / Basic Auth
- JWT is generated after creating a profile and validated later
- Validation of key pairs (ID + Token) for secure access

---

## 👀 Main Endpoints

### MS-CRUD

- `POST /api/create-profile`
- `PUT /api/update-profile`
- `DELETE /api/delete-profile`
- `GET /api/list-profiles`

### MS-PROFILE

- `POST /api/get-profile`
- `POST /api/validate-profile`

> All endpoints require Basic Auth + JSON format

---

## 🛠️ Local Environment Setup

### Requirements:

- Node.js
- npm
- Docker + Docker Compose
- Git
- OpenSSL (for local certificates)

### Installation:

```bash
npm install
```

### TypeScript Compilation:

```bash
npm run build
```

### Run Locally:

```bash
npm run dev
```

### Generate Certificates:

```bash
openssl req -nodes -new -x509 -keyout cert.key -out cert.pem
```

---

## 📂 Docker & Docker Compose

### Build Images:

```bash
docker build -t ms-crud ./ms-crud
docker build -t ms-profile ./ms-profile
```

### Run Everything:

```bash
docker-compose up --build
```

---

## ⚖ Kubernetes

### Structure:

```
k8s/
├── mongo-deployment.yaml
├── mongo-service.yaml
├── mongo-credentials.yaml
├── ms-crud-deployment.yaml
├── ms-crud-service.yaml
├── ms-profile-deployment.yaml
├── ms-profile-service.yaml
```

### Apply Resources:

```bash
kubectl apply -f k8s/
```

### Restart Deployments:

```bash
kubectl rollout restart deployment ms-crud
kubectl rollout restart deployment ms-profile
```

### View Pods and Services:

```bash
kubectl get pods
kubectl get svc
```

---

## 🔐 Security

- **Basic Auth** enabled on all endpoints
- **JWT** generated when creating a profile
- **ID + token** pair used for validation
- **Local HTTPS** with self-signed certificates
- **Kubernetes Secrets** to hide:
  - MONGO_URI
  - JWT_SECRET
  - Basic Auth credentials

---

## ⚠️ Best Practices

- `.gitignore` includes cert.pem, cert.key, `node_modules`, `dist/`, `docker-compose.yml`
- `k8s/` contains secure manifests without exposing sensitive data
- Environment variables are injected using `envFrom.secretRef` in Kubernetes
- Clear and modular documentation

---


> Project completed meeting all technical, architectural, security, and deployment requirements. ✅

