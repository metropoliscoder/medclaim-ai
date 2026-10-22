# 🏥 MedClaim AI – Intelligent Healthcare Insurance Claim Review Assistant

## Overview

MedClaim AI is an AI-powered Healthcare Insurance Claim Review Assistant designed to automate medical insurance claim assessment using a multi-agent AI architecture. The system analyzes uploaded healthcare documents, validates medical treatments against policy coverage, and generates an explainable AI-driven claim decision.

This project was developed as a capstone project for the IIT Roorkee AIOps & Generative AI Program.

---

# Problem Statement

Manual insurance claim processing is time-consuming, error-prone, and lacks transparency. Claim reviewers must manually verify multiple medical documents, compare them against insurance policies, and justify every approval or rejection.

MedClaim AI automates this process using AI agents while providing complete reasoning behind every decision.

---

# Key Features

* Multi-Agent AI based claim evaluation
* Medical document validation
* Insurance policy verification
* AI-powered explainable decision making
* Policy retrieval using Pinecone Vector Database
* Medical knowledge validation
* Confidence score generation
* Detailed audit trail
* Interactive React dashboard
* Dockerized backend deployment
* AWS EC2 deployment
* REST API using FastAPI

---

# AI Workflow

```
User Uploads Documents
        │
        ▼
Document Upload Service
        │
        ▼
Claim Extraction
        │
        ▼
Medical Review Agent
        │
        ▼
Policy Retrieval (Pinecone)
        │
        ▼
Policy Review Agent
        │
        ▼
Decision Agent
        │
        ▼
Audit Generator
        │
        ▼
Frontend Dashboard
```

---

# Technology Stack

## Frontend

* React.js
* Tailwind CSS
* Axios

## Backend

* Python
* FastAPI
* Pydantic

## AI Stack

* OpenAI GPT-4.1 Mini
* Prompt Engineering
* Multi-Agent Orchestration

## Vector Database

* Pinecone

## Deployment

* Docker
* Docker Compose
* AWS EC2

## Cloud Services

* AWS EC2
* AWS S3 (Static Website Hosting)
* GitHub

---

# Project Structure

```
medclaim-ai/

│
├── medclaim-ai-backend/
│
│   ├── app/
│   │
│   ├── orchestrators/
│   ├── services/
│   ├── models/
│   ├── routes/
│   ├── data/
│   ├── uploads/
│   ├── logs/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── requirements.txt
│
├── medclaim-ai-frontend/
│
│   ├── src/
│   ├── public/
│   └── package.json
│
└── docs/
```

---

# AI Decision Pipeline

The claim review process is divided into multiple independent AI stages.

1. Upload Claim Documents
2. Extract Claim Information
3. Validate Medical Diagnosis
4. Retrieve Relevant Policy Clauses
5. Perform Policy Validation
6. Generate Final Decision
7. Produce Explainable Audit Report

---

# Deployment Architecture

```
React Frontend
        │
        ▼
AWS S3 / Amplify
        │
        ▼
FastAPI Backend
        │
        ▼
Docker Container
        │
        ▼
AWS EC2
        │
        ▼
OpenAI API
        │
        ▼
Pinecone Vector Database
```

---

# Future Enhancements

The current implementation focuses on the AI workflow and deployment. Planned production enhancements include:

* PostgreSQL integration for persistent claim storage
* User authentication and authorization
* JWT-based session management
* Amazon S3 document storage
* CloudFront CDN
* HTTPS with Nginx reverse proxy
* CI/CD pipeline
* Kubernetes deployment
* Monitoring and observability
* Multi-tenant insurance platform support

---

# Learning Outcomes

This project demonstrates practical implementation of:

* Agentic AI Architecture
* FastAPI Backend Development
* Docker Containerization
* AWS Deployment
* Retrieval-Augmented Generation (RAG)
* Pinecone Vector Search
* Prompt Engineering
* Explainable AI
* REST API Development
* Frontend–Backend Integration
