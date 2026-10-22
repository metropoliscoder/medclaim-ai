# MedClaim AI - Deployment Guide

# Overview

MedClaim AI is designed as a cloud-ready AI application. The backend is containerized using Docker and deployed on AWS EC2, while the frontend is deployed as a static website.

The deployment architecture separates the frontend, backend, AI services, and infrastructure, making the application scalable and easy to maintain.

---

# Deployment Architecture

```text
                        USER

                          │

                          ▼

             React Frontend (Browser)

                          │

               REST API (HTTP/HTTPS)

                          │

                          ▼

             AWS EC2 (Ubuntu Server)

                          │

                    Docker Container

                          │

                    FastAPI Backend

          ┌───────────────┴───────────────┐

          ▼                               ▼

   OpenAI GPT-4.1 Mini            Pinecone Vector DB
```

---

# Cloud Infrastructure

| Component        | Technology                          |
| ---------------- | ----------------------------------- |
| Cloud Provider   | AWS                                 |
| Compute          | EC2 (Ubuntu)                        |
| Backend          | FastAPI                             |
| Frontend         | AWS S3 Static Website / AWS Amplify |
| Containerization | Docker                              |
| Version Control  | GitHub                              |
| AI Model         | OpenAI GPT-4.1 Mini                 |
| Vector Database  | Pinecone                            |

---

# Backend Deployment

## Step 1

Clone the repository

```bash
git clone <repository-url>

cd medclaim-ai
```

---

## Step 2

Navigate to backend

```bash
cd medclaim-ai-backend
```

---

## Step 3

Configure Environment Variables

Create a `.env` file.

Example

```text
OPENAI_API_KEY=xxxxxxxx

PINECONE_API_KEY=xxxxxxxx

PINECONE_INDEX=xxxxxxxx

PINECONE_HOST=xxxxxxxx
```

---

## Step 4

Build Docker Image

```bash
docker compose up --build -d
```

Docker performs the following tasks automatically:

* Creates the container
* Installs Python dependencies
* Copies project files
* Starts FastAPI
* Exposes port 8000

---

## Step 5

Verify Deployment

Swagger

```text
http://<EC2-IP>:8000/docs
```

Health API

```text
GET /health
```

---

# Frontend Deployment

The React application is deployed as a static website.

Deployment process

```bash
npm install

npm run build
```

Upload the generated build files to:

* AWS S3 Static Website Hosting

or

* AWS Amplify

---

# Docker Workflow

Development

```text
Local Code

↓

Docker Build

↓

Docker Image

↓

Docker Container

↓

FastAPI
```

---

# Docker Commands

Build application

```bash
docker compose up --build
```

Run in background

```bash
docker compose up -d
```

View running containers

```bash
docker ps
```

View logs

```bash
docker logs -f medclaim-backend
```

Stop containers

```bash
docker compose down
```

Restart containers

```bash
docker compose restart
```

---

# GitHub Deployment Workflow

```text
Local Development

        │

        ▼

Git Commit

        │

        ▼

GitHub Repository

        │

        ▼

AWS EC2

        │

        ▼

git pull

        │

        ▼

docker compose up --build -d
```

---

# Docker Image Lifecycle

```text
Source Code

      │

      ▼

Dockerfile

      │

      ▼

Docker Image

      │

      ▼

Docker Container

      │

      ▼

Running FastAPI Application
```

---

# AWS Deployment Flow

```text
Developer

      │

      ▼

GitHub

      │

      ▼

AWS EC2

      │

      ▼

Docker Compose

      │

      ▼

FastAPI Backend

      │

      ▼

OpenAI

      │

      ▼

Pinecone

      │

      ▼

Frontend Response
```

---

# Environment Variables

The application uses environment variables to avoid hardcoding sensitive information.

Current configuration includes:

* OPENAI_API_KEY
* PINECONE_API_KEY
* PINECONE_INDEX
* PINECONE_HOST

Future production deployments may additionally use:

* DATABASE_URL
* JWT_SECRET
* AWS_ACCESS_KEY
* AWS_SECRET_KEY
* REDIS_URL

---

# Security Considerations

Current MVP

* API keys stored in environment variables
* Docker container isolation
* Cloud-hosted backend

Planned production improvements

* HTTPS
* Nginx Reverse Proxy
* AWS Secrets Manager
* IAM Roles
* Private VPC
* CloudFront
* JWT Authentication

---

# Monitoring

Useful Docker commands

Container Logs

```bash
docker logs -f medclaim-backend
```

Container Status

```bash
docker ps
```

Container Health

```bash
docker inspect medclaim-backend
```

---

# Current Deployment Status

| Component            | Status  |
| -------------------- | ------- |
| React Frontend       | ✅       |
| FastAPI Backend      | ✅       |
| Docker               | ✅       |
| Docker Compose       | ✅       |
| GitHub               | ✅       |
| AWS EC2              | ✅       |
| OpenAI Integration   | ✅       |
| Pinecone Integration | ✅       |
| PostgreSQL           | Planned |

---

# Future Production Deployment

The application is designed to evolve into a production-grade cloud architecture.

Planned improvements include:

* PostgreSQL
* Redis
* Nginx Reverse Proxy
* HTTPS
* Amazon ECS
* Kubernetes
* CI/CD Pipeline
* CloudWatch Monitoring
* Auto Scaling
* Load Balancer

---

# Conclusion

The deployment strategy follows modern cloud-native practices by containerizing the backend, separating frontend and backend services, and integrating external AI services through secure environment configuration.

The current architecture provides a solid foundation for future production enhancements while keeping deployment simple, reproducible, and scalable.
