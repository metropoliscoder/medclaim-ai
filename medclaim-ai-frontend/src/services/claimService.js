import api from "../api/axios";

export async function uploadClaim(files) {
  const formData = new FormData();

  formData.append("claim_form", files[0]);
  formData.append("hospital_bill", files[1]);
  formData.append("discharge_summary", files[2]);
  formData.append("policy", files[3]);

  const response = await api.post(
    "/api/v1/claims/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}

export async function getJobStatus(jobId) {
  const response = await api.get(
    `/api/v1/jobs/${jobId}`
  );

  return response.data;
}