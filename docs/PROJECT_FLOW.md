# MedClaim AI - AI Workflow Documentation

## Overview

MedClaim AI follows a multi-agent AI architecture where each AI agent is responsible for a specific task in the insurance claim review process.

Instead of asking a single LLM to make the complete decision, the workflow divides the problem into multiple explainable stages. Every stage validates one aspect of the claim before passing its output to the next AI agent.

This architecture improves explainability, modularity, and decision transparency.

---

# End-to-End Workflow

```text
                      USER

                        │
                        ▼

             Upload 4 PDF Documents

        • Claim Form
        • Hospital Bill
        • Discharge Summary
        • Insurance Policy

                        │
                        ▼

                Upload API (FastAPI)

                        │
                        ▼

               Upload Orchestrator

                        │
                        ▼

             Store Uploaded Documents

                        │
                        ▼

          Claim Review Orchestrator

                        │
        ┌───────────────┼────────────────┐
        │               │                │
        ▼               ▼                ▼

 Claim Loader     Medical Review     Policy Retrieval

                        │
                        ▼

        Medical Knowledge Validation

                        │
                        ▼

      Pinecone Policy Vector Search

                        │
                        ▼

          Policy Extraction Agent

                        │
                        ▼

           Policy Review Agent

                        │
                        ▼

            Decision Making Agent

                        │
                        ▼

             Audit Report Generator

                        │
                        ▼

             Final Claim Decision

                        │
                        ▼

            React Frontend Dashboard
```

---

# Step 1 – Document Upload

The user uploads four healthcare documents.

Required documents:

* Claim Form
* Hospital Bill
* Discharge Summary
* Insurance Policy

The Upload API receives these documents and creates a unique Job ID for tracking the complete workflow.

---

# Step 2 – Upload Orchestrator

Responsibilities:

* Generate Job ID
* Save uploaded documents
* Track job status
* Trigger AI workflow

The Upload Orchestrator acts as the entry point for the complete claim review process.

---

# Step 3 – Claim Loader

The Claim Loader converts structured claim information into application models.

Information extracted includes:

* Patient Information
* Hospital Details
* Diagnosis
* Treatment
* Billing Information
* Claim Amount

This creates a standardized Claim object used throughout the pipeline.

---

# Step 4 – Medical Review Agent

Objective:

Validate whether the medical treatment is clinically justified.

Inputs:

* Diagnosis
* Treatment
* Procedure
* Medical Knowledge Base

Outputs:

* Medical Validity
* Clinical Observations
* AI Confidence Score

---

# Step 5 – Medical Knowledge Service

The Medical Knowledge Service provides domain-specific healthcare knowledge.

It validates:

* Diagnosis
* Recommended procedures
* Medical necessity
* Treatment consistency

This reduces hallucinations by grounding the AI response with reference data.

---

# Step 6 – Policy Retrieval

The insurance policy is converted into vector embeddings and stored inside Pinecone.

The Policy Retrieval component searches only the most relevant clauses instead of sending the complete insurance policy to the LLM.

Benefits:

* Faster retrieval
* Lower token usage
* Better accuracy
* Explainable references

---

# Step 7 – Policy Extraction

Relevant policy clauses are extracted from Pinecone search results.

Examples include:

* Waiting Period
* Coverage Limits
* Exclusions
* Room Rent
* Procedure Eligibility

Only these relevant clauses are sent to the Policy Review Agent.

---

# Step 8 – Policy Review Agent

Responsibilities:

* Compare medical claim with insurance policy
* Verify coverage
* Detect exclusions
* Identify violations

Outputs:

* Covered
* Partially Covered
* Not Covered

Along with detailed reasoning.

---

# Step 9 – Decision Agent

The Decision Agent combines outputs from:

* Medical Review Agent
* Policy Review Agent

It generates:

* Final Decision
* Approval Status
* Confidence Score
* Decision Summary

Possible decisions:

* APPROVED
* PARTIALLY APPROVED
* REJECTED

---

# Step 10 – Audit Service

Every AI decision is converted into an explainable audit report.

The audit includes:

* Medical findings
* Policy findings
* AI reasoning
* Final recommendation
* Decision confidence

This ensures transparency for claim reviewers.

---

# Step 11 – Frontend Dashboard

The React frontend continuously polls the backend using the Job ID.

Users can monitor:

* Upload Status
* Processing Stage
* Medical Review
* Policy Review
* Final Decision
* AI Confidence
* Audit Summary

---

# Job Status Flow

```text
UPLOADED

      │

      ▼

EXTRACTING CLAIM

      │

      ▼

MEDICAL REVIEW

      │

      ▼

POLICY VALIDATION

      │

      ▼

DECISION

      │

      ▼

COMPLETED
```

If an unexpected exception occurs, the job transitions to:

```text
FAILED
```

with detailed backend logs for debugging.

---

# AI Services Used

| Service             | Purpose                                 |
| ------------------- | --------------------------------------- |
| OpenAI GPT-4.1 Mini | Medical reasoning & decision generation |
| Pinecone            | Insurance policy retrieval              |
| FastAPI             | REST APIs                               |
| Pydantic            | Data validation                         |
| Docker              | Containerization                        |
| AWS EC2             | Backend deployment                      |
| React               | User Interface                          |

---

# Design Principles

The workflow follows:

* Agent-based AI architecture
* Separation of responsibilities
* Explainable AI
* Modular orchestration
* Retrieval-Augmented Generation (RAG)
* Stateless REST APIs
* Cloud-ready deployment

---

# Future Workflow Enhancements

Planned production improvements include:

* PostgreSQL persistence
* Background task queue
* Redis caching
* JWT authentication
* Multi-user support
* S3 document storage
* CI/CD pipeline
* Kubernetes deployment
* Monitoring & Observability
