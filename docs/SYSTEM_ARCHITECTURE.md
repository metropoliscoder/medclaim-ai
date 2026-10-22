# MedClaim AI - System Architecture

# Architecture Overview

MedClaim AI follows a layered architecture that separates the user interface, backend orchestration, AI services, vector search, and cloud infrastructure.

Each layer is independently responsible for a specific part of the insurance claim review lifecycle, making the application modular, scalable, and easy to maintain.

---

# High-Level Architecture

```text
                                USER

                                  │
                                  ▼

                     React Frontend (Dashboard)

                                  │
                         Axios REST APIs
                                  │
                                  ▼

                        FastAPI Backend Server

                                  │
                    Upload Orchestrator
                                  │
                                  ▼

                  Claim Review Orchestrator

      ┌──────────────┬──────────────┬──────────────┐
      │              │              │              │
      ▼              ▼              ▼              ▼

 Claim Loader   Medical Review   Policy Review   Audit Service

      │              │              │
      │              ▼              ▼
      │       Medical Knowledge   Pinecone
      │            Service      Vector Search
      │                             │
      └──────────────┬──────────────┘
                     ▼

              Decision Service

                     │
                     ▼

             Final AI Response

                     │
                     ▼

              React Dashboard
```

---

# Cloud Architecture

```text
                      AWS Cloud

            +--------------------------+

            |       React Frontend      |
            |  S3 Static Hosting /      |
            |       AWS Amplify         |

            +------------+-------------+

                         |

                         |

                         ▼

               AWS EC2 Instance

            +--------------------------+

            |      Docker Container     |

            |                           |

            |        FastAPI API        |

            +------------+-------------+

                         |

        +----------------+----------------+

        |                                 |

        ▼                                 ▼

 OpenAI GPT-4.1 Mini              Pinecone Vector DB

        |                                 |

        +---------------+-----------------+

                        ▼

                AI Decision Engine
```

---

# Backend Architecture

```text
backend/

│

├── routes/

│      REST API Endpoints

│

├── orchestrators/

│      Business Workflow

│

├── services/

│      AI Services

│

├── models/

│      Pydantic Models

│

├── data/

│      Medical & Policy Data

│

├── uploads/

│      Uploaded Documents

│

└── logs/

       Audit Logs
```

---

# Frontend Architecture

```text
src/

│

├── components/

│

├── pages/

│

├── services/

│

├── api/

│

├── hooks/

│

├── assets/

│

└── utils/
```

---

# AI Component Architecture

The application is composed of multiple specialized AI components.

## Upload Orchestrator

Responsibilities

* Create Job ID
* Store uploaded files
* Trigger AI workflow

---

## Claim Review Orchestrator

Coordinates the complete AI pipeline.

Responsible for:

* Medical Review
* Policy Review
* Decision Making
* Audit Generation

---

## Medical Review Service

Inputs

* Diagnosis
* Procedure
* Medical Knowledge

Outputs

* Medical Validity
* Clinical Observations
* Confidence Score

---

## Medical Knowledge Service

Acts as a healthcare knowledge base.

Provides:

* Disease Information
* Procedure Validation
* Clinical Context

---

## Policy Vector Store Service

Uses Pinecone to perform semantic retrieval over insurance policy documents.

Responsibilities:

* Embed policy text
* Retrieve relevant clauses
* Improve AI grounding

---

## Policy Review Service

Compares

Medical Claim

VS

Insurance Policy

Produces:

* Coverage Status
* Violations
* Coverage Explanation

---

## Decision Service

Combines:

Medical Review

*

Policy Review

Produces:

* Final Decision
* Confidence Score
* AI Reasoning

---

## Audit Service

Creates an explainable record of every AI decision.

Audit contains:

* Medical Findings
* Policy Findings
* Decision Reasoning
* Confidence

---

# Current Technology Stack

## Frontend

* React.js
* Tailwind CSS
* Axios

---

## Backend

* Python
* FastAPI
* Pydantic

---

## AI

* OpenAI GPT-4.1 Mini
* Prompt Engineering
* Agentic AI Workflow

---

## Vector Database

* Pinecone

---

## Cloud

* AWS EC2
* AWS S3
* AWS Amplify

---

## DevOps

* Docker
* Docker Compose
* GitHub

---

# Planned Database Layer

Current MVP stores runtime information in memory.

Future production architecture introduces PostgreSQL.

```text
FastAPI

      │

      ▼

 PostgreSQL

      │

Claims

Audit Logs

Users

History
```

---

# Design Principles

The architecture is based on the following software engineering principles.

* Separation of Concerns
* Modular Services
* Explainable AI
* Scalable Cloud Deployment
* Agent-based AI Architecture
* RESTful APIs
* Containerized Deployment
* Retrieval-Augmented Generation (RAG)

---

# Security Considerations

Current MVP

* API Key based authentication
* Environment variable configuration
* Dockerized backend
* AWS hosted infrastructure

Planned Production Enhancements

* JWT Authentication
* PostgreSQL persistence
* HTTPS
* Nginx Reverse Proxy
* Role Based Access Control
* CloudFront CDN
* AWS Secrets Manager

---

# Scalability Roadmap

Future production deployment can support

* PostgreSQL
* Redis
* Background Workers
* Kubernetes
* AWS ECS
* CI/CD Pipelines
* Monitoring & Logging
* Horizontal Scaling

without changing the core AI orchestration logic.
