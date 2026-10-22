CREATE TABLE claims (

    id SERIAL PRIMARY KEY,

    job_id VARCHAR(255) UNIQUE,

    patient_name VARCHAR(255),

    hospital_name VARCHAR(255),

    diagnosis VARCHAR(255),

    procedure VARCHAR(255),

    claim_amount NUMERIC,

    status VARCHAR(100),

    decision VARCHAR(100),

    confidence NUMERIC,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);


CREATE TABLE claim_audits (

    id SERIAL PRIMARY KEY,

    claim_id INTEGER REFERENCES claims(id),

    medical_review TEXT,

    policy_review TEXT,

    ai_reasoning TEXT,

    final_decision TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);