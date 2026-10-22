# MedClaim AI - Database Design (PostgreSQL)

# Overview

MedClaim AI uses **PostgreSQL** as its relational database layer to manage structured insurance claim data, AI review results, audit logs, and application metadata.

The database is designed using a normalized schema and integrated with SQLAlchemy ORM to provide a scalable, maintainable, and production-ready persistence layer.

---

# Database Technology

| Component      | Technology    |
| -------------- | ------------- |
| Database       | PostgreSQL 16 |
| ORM            | SQLAlchemy    |
| Driver         | psycopg2      |
| Migration Tool | Alembic       |

---

# Database Architecture

```text
                    FastAPI Backend
                           │
                           ▼
                    SQLAlchemy ORM
                           │
                           ▼
                     PostgreSQL
          ┌─────────────┬──────────────┬──────────────┐
          ▼             ▼              ▼
      Claims      Claim Audits       Users
```

---

# Entity Relationship Diagram

```text
+----------------------+
|        Claims        |
+----------------------+
| id                   |
| job_id               |
| patient_name         |
| hospital_name        |
| diagnosis            |
| procedure            |
| claim_amount         |
| status               |
| decision             |
| confidence           |
| created_at           |
+----------+-----------+
           |
           | 1
           |
           | N
           ▼
+----------------------+
|    Claim_Audits      |
+----------------------+
| id                   |
| claim_id             |
| medical_review       |
| policy_review        |
| ai_reasoning         |
| final_decision       |
| created_at           |
+----------------------+
```

---

# Core Tables

## Claims

Stores the primary insurance claim and AI processing status.

| Column        | Type      | Description           |
| ------------- | --------- | --------------------- |
| id            | SERIAL    | Primary Key           |
| job_id        | VARCHAR   | Unique Job Identifier |
| patient_name  | VARCHAR   | Patient Name          |
| hospital_name | VARCHAR   | Hospital Name         |
| diagnosis     | VARCHAR   | Medical Diagnosis     |
| procedure     | VARCHAR   | Medical Procedure     |
| claim_amount  | NUMERIC   | Claimed Amount        |
| status        | VARCHAR   | Processing Status     |
| decision      | VARCHAR   | Final AI Decision     |
| confidence    | NUMERIC   | AI Confidence Score   |
| created_at    | TIMESTAMP | Record Creation Time  |

---

## Claim_Audits

Stores explainable AI outputs for every processed claim.

| Column         | Type      | Description             |
| -------------- | --------- | ----------------------- |
| id             | SERIAL    | Primary Key             |
| claim_id       | INTEGER   | Foreign Key             |
| medical_review | TEXT      | Medical Analysis        |
| policy_review  | TEXT      | Policy Validation       |
| ai_reasoning   | TEXT      | AI Decision Explanation |
| final_decision | TEXT      | Final Recommendation    |
| created_at     | TIMESTAMP | Timestamp               |

---

# Relationship

```text
Claims (1)
      │
      │
      ▼
Claim_Audits (N)
```

Each insurance claim can have one or more audit records, allowing complete traceability of AI-generated decisions.

---

# Supporting Tables

## Users

```text
id
name
email
password_hash
role
created_at
```

Purpose

* User Management
* Authentication
* Role-Based Access Control (RBAC)

---

## Uploaded Documents

```text
id
claim_id
document_type
file_name
storage_path
uploaded_at
```

Purpose

* Store document metadata
* Link uploaded files with claims
* Support cloud storage integration

---

## AI Job History

```text
id
job_id
status
started_at
completed_at
duration
```

Purpose

* Track AI workflow execution
* Measure processing performance
* Support monitoring and reporting

---

## Prompt Logs

```text
id
claim_id
agent_name
prompt
response
tokens
created_at
```

Purpose

* AI Explainability
* Prompt Auditing
* Token Usage Tracking

---

# Data Flow

```text
User Upload
      │
      ▼
Upload API
      │
      ▼
Claim Extraction
      │
      ▼
PostgreSQL (Claims)
      │
      ▼
Medical Review
      │
      ▼
Policy Review
      │
      ▼
Decision Agent
      │
      ▼
PostgreSQL (Claim_Audits)
      │
      ▼
Frontend Dashboard
```

---

# Database Layer

```text
database/

├── database.py
├── models.py
├── schema.sql
└── migrations/
```

The database layer is implemented using SQLAlchemy to provide clean model definitions, relationship management, and database abstraction.

---

# Benefits

* Persistent insurance claim records
* Explainable AI audit history
* Multi-user architecture
* Historical reporting
* Faster claim search
* Dashboard analytics
* Secure structured storage
* Enterprise scalability

---

# Production Database Features

* PostgreSQL 16
* SQLAlchemy ORM
* Normalized schema
* Foreign key relationships
* Indexed Job IDs
* Audit logging
* Transaction support
* Migration management with Alembic

---

# Database Lifecycle

```text
Claim Submission
        │
        ▼
Claims Table
        │
        ▼
Medical Review
        │
        ▼
Policy Review
        │
        ▼
Decision Generation
        │
        ▼
Claim_Audits Table
        │
        ▼
Dashboard & Reporting
```

---

# Conclusion

The PostgreSQL database layer provides a scalable and structured foundation for MedClaim AI by managing insurance claims, AI-generated decisions, audit trails, and operational metadata. Combined with SQLAlchemy ORM, it enables maintainable data access, improved traceability, and a robust architecture suitable for enterprise healthcare insurance claim processing.
