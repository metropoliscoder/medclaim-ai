# MedClaim AI - Test Cases

# Overview

This document describes the functional test cases executed for the MedClaim AI Healthcare Insurance Claim Review Assistant.

The objective is to validate the complete AI workflow, including document upload, medical review, policy validation, decision generation, and error handling.

---

# Test Environment

| Item            | Value               |
| --------------- | ------------------- |
| Frontend        | React.js            |
| Backend         | FastAPI             |
| AI Model        | OpenAI GPT-4.1 Mini |
| Vector Database | Pinecone            |
| Deployment      | AWS EC2 + Docker    |
| Browser         | Google Chrome       |
| API Testing     | Swagger UI          |

---

# Test Case 1 – Approved Claim

### Objective

Verify that a valid medical claim is approved.

### Test Data

| Field          | Value                     |
| -------------- | ------------------------- |
| Patient        | Rahul Sharma              |
| Hospital       | Apollo Hospital Delhi     |
| Diagnosis      | Acute Appendicitis        |
| Treatment      | Laparoscopic Appendectomy |
| Policy Age     | 4 Years                   |
| Waiting Period | Completed                 |

### Steps

1. Upload all four documents.
2. Click **Start Review**.
3. Wait for AI processing to complete.

### Expected Result

* Medical Review: Passed
* Policy Review: Passed
* Decision: **APPROVED**
* Confidence Score: High (>90%)

### Status

✅ Passed

---

# Test Case 2 – Partial Approval

### Objective

Validate room rent limit violation.

### Test Data

| Field        | Value               |
| ------------ | ------------------- |
| Patient      | Priya Verma         |
| Hospital     | Fortis Noida        |
| Diagnosis    | Gallstones          |
| Treatment    | Gallbladder Surgery |
| Room Rent    | ₹12,000/day         |
| Policy Limit | ₹6,000/day          |

### Expected Result

* Medical Review: Passed
* Policy Review: Partial Coverage
* Decision: **PARTIALLY APPROVED**

### Status

✅ Passed

---

# Test Case 3 – Waiting Period Rejection

### Objective

Verify rejection for waiting period violation.

### Test Data

| Field           | Value            |
| --------------- | ---------------- |
| Patient         | Amit Singh       |
| Diagnosis       | Knee Replacement |
| Policy Duration | 3 Months         |
| Waiting Period  | 24 Months        |

### Expected Result

* Medical Review: Passed
* Policy Review: Failed
* Decision: **REJECTED**
* Reason: Waiting period not completed

### Status

✅ Passed

---

# Test Case 4 – Medical Inconsistency

### Objective

Detect mismatch between diagnosis and billing.

### Test Data

| Field         | Value                   |
| ------------- | ----------------------- |
| Patient       | Neha Kapoor             |
| Diagnosis     | Migraine                |
| Hospital Bill | Cardiac Surgery Charges |

### Expected Result

* Medical Review: Failed
* Policy Review: Failed
* Decision: **REJECTED**
* Reason: Diagnosis inconsistent with billed procedure

### Status

✅ Passed

---

# Test Case 5 – Missing Claim Form

### Objective

Validate mandatory document upload.

### Steps

Upload only Hospital Bill, Discharge Summary and Policy.

### Expected Result

* Upload validation error
* User prompted to upload missing Claim Form

### Status

✅ Passed

---

# Test Case 6 – Unsupported File Type

### Objective

Verify file validation.

### Steps

Upload a `.jpg` or `.txt` file instead of PDF.

### Expected Result

* Validation error displayed
* Upload rejected

### Status

✅ Passed

---

# Test Case 7 – Empty File Upload

### Objective

Verify empty document validation.

### Expected Result

* Upload rejected
* Appropriate error message displayed

### Status

✅ Passed

---

# Test Case 8 – OpenAI Authentication Failure

### Objective

Validate backend error handling.

### Steps

Configure an invalid OpenAI API key.

### Expected Result

* AI processing fails
* Job status changes to **FAILED**
* Error logged

### Status

✅ Passed

---

# Test Case 9 – Pinecone Retrieval Failure

### Objective

Validate vector database error handling.

### Steps

Use an invalid Pinecone API key or index.

### Expected Result

* Policy retrieval fails
* Backend logs error
* Job marked as **FAILED**

### Status

✅ Passed

---

# Test Case 10 – Backend Health Check

### Objective

Verify backend availability.

### Endpoint

```text
GET /health
```

### Expected Result

```json
{
  "status": "healthy"
}
```

### Status

✅ Passed

---

# Test Case 11 – Docker Deployment

### Objective

Verify backend deployment using Docker.

### Steps

```bash
docker compose up --build
```

### Expected Result

* Docker image created
* Container started
* FastAPI accessible

### Status

✅ Passed

---

# Test Case 12 – AWS EC2 Deployment

### Objective

Verify cloud deployment.

### Steps

1. Deploy backend to EC2.
2. Access Swagger.

### Expected Result

```text
http://<EC2-IP>:8000/docs
```

Swagger loads successfully.

### Status

✅ Passed

---

# Test Summary

| Test Case                 | Result |
| ------------------------- | ------ |
| Approved Claim            | ✅ Pass |
| Partial Approval          | ✅ Pass |
| Waiting Period Rejection  | ✅ Pass |
| Medical Inconsistency     | ✅ Pass |
| Missing Documents         | ✅ Pass |
| Invalid File Type         | ✅ Pass |
| Empty Upload              | ✅ Pass |
| OpenAI Failure Handling   | ✅ Pass |
| Pinecone Failure Handling | ✅ Pass |
| Health API                | ✅ Pass |
| Docker Deployment         | ✅ Pass |
| AWS Deployment            | ✅ Pass |

---

# Overall Result

**Total Test Cases:** 12

**Passed:** 12

**Failed:** 0

**Success Rate:** **100%**

---

# Conclusion

The MedClaim AI application successfully completed all functional, integration, deployment, and AI workflow test cases. The system correctly handled valid insurance claims, policy violations, document validation, AI processing, deployment, and backend error scenarios. The test results demonstrate that the MVP is stable and ready for demonstration while providing a strong foundation for future production enhancements.
