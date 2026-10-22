# MedClaim AI - API Documentation

# Overview

The MedClaim AI backend exposes RESTful APIs built using FastAPI.

These APIs manage document uploads, AI claim processing, job tracking, and health monitoring.

Base URL

```
http://<server-ip>:8000/api/v1
```

Example

```
http://65.xx.xx.xx:8000/api/v1
```

Swagger Documentation

```
http://<server-ip>:8000/docs
```

---

# Authentication

Current MVP

No authentication is required.

Future Production

* JWT Authentication
* Role Based Access Control (RBAC)

---

# API List

| Method | Endpoint       | Description              |
| ------ | -------------- | ------------------------ |
| POST   | /claims/upload | Upload claim documents   |
| GET    | /jobs/{job_id} | Get AI processing status |
| GET    | /health        | Health Check             |

---

# 1. Upload Claim

### Endpoint

```
POST /claims/upload
```

### Description

Uploads all required insurance claim documents and starts the AI review workflow.

---

### Request Type

```
multipart/form-data
```

---

### Required Files

| Field             | Type |
| ----------------- | ---- |
| claim_form        | PDF  |
| hospital_bill     | PDF  |
| discharge_summary | PDF  |
| policy            | PDF  |

---

### Sample Request

```
POST /api/v1/claims/upload

Form Data

claim_form

hospital_bill

discharge_summary

policy
```

---

### Successful Response

```json
{
    "job_id": "9cb2b5ef-1234-5678-abcd",
    "status": "UPLOADED"
}
```

---

### Processing Flow

```
Upload

↓

Save Documents

↓

Create Job

↓

Start AI Workflow

↓

Return Job ID
```

---

# 2. Get Job Status

### Endpoint

```
GET /jobs/{job_id}
```

---

### Description

Returns the current AI processing status along with the generated review results.

---

### Sample Request

```
GET /jobs/9cb2b5ef-1234-5678-abcd
```

---

### Sample Response

```json
{
    "job_id": "9cb2b5ef-1234",
    "status": "COMPLETED",
    "result": {
        "decision": "APPROVED",
        "confidence": 0.94,
        "medical_review": "...",
        "policy_review": "...",
        "audit_summary": "..."
    }
}
```

---

### Job Status Values

```
UPLOADED

↓

EXTRACTING_CLAIM

↓

PROCESSING

↓

COMPLETED
```

Failure

```
FAILED
```

---

# 3. Health Check

### Endpoint

```
GET /health
```

---

### Description

Verifies that the backend service is running.

---

### Sample Response

```json
{
    "status": "healthy"
}
```

---

# Response Codes

| Code | Meaning               |
| ---- | --------------------- |
| 200  | Success               |
| 201  | Resource Created      |
| 400  | Invalid Request       |
| 404  | Resource Not Found    |
| 422  | Validation Error      |
| 500  | Internal Server Error |

---

# AI Processing Pipeline

```
POST Upload

        │

        ▼

Upload Service

        │

        ▼

Upload Orchestrator

        │

        ▼

Claim Review Orchestrator

        │

        ▼

Medical Review

        │

        ▼

Policy Retrieval

        │

        ▼

Decision Agent

        │

        ▼

Audit Generation

        │

        ▼

GET Job Status
```

---

# Backend Modules

The APIs internally interact with the following modules.

```
Routes

↓

Services

↓

Orchestrators

↓

AI Agents

↓

OpenAI

↓

Pinecone
```

---

# Error Handling

Typical validation errors include

* Missing claim document
* Invalid file type
* Empty upload
* AI processing failure
* OpenAI authentication error
* Pinecone retrieval error

Each failed job is marked with the status:

```
FAILED
```

along with an error message stored in the backend.

---

# API Versioning

Current Version

```
v1
```

Future versions may introduce

* Authentication
* Claim History
* User Management
* Dashboard Analytics
* Reporting APIs

---

# Future APIs

The following endpoints are planned for production.

```
POST   /auth/login

POST   /auth/register

GET    /claims

GET    /claims/{id}

DELETE /claims/{id}

POST   /documents/upload

GET    /audit/{claim_id}

GET    /users/profile
```

---

# API Design Principles

The backend follows REST API best practices.

* Resource-oriented endpoints
* JSON responses
* Stateless communication
* Clear HTTP status codes
* Modular routing
* Versioned APIs
* OpenAPI (Swagger) documentation

---

# Integration Notes

Frontend communicates with the backend using Axios.

The backend is containerized using Docker and deployed on AWS EC2.

All AI requests are routed through the Claim Review Orchestrator, which coordinates OpenAI and Pinecone services before returning the final explainable decision.
