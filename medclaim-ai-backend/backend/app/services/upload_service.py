from pathlib import Path
import shutil

from fastapi import UploadFile


class UploadService:

    def __init__(self):

        self.base_folder = Path("uploads")

        self.base_folder.mkdir(exist_ok=True)

    def create_job_folder(
        self,
        job_id: str
    ) -> Path:

        folder = self.base_folder / job_id

        folder.mkdir(
            parents=True,
            exist_ok=True
        )

        return folder

    def save_files(
        self,
        job_id: str,
        files: dict[str, UploadFile]
    ) -> dict[str, str]:

        folder = self.create_job_folder(job_id)

        uploaded_files = {}

        for document_type, file in files.items():

            extension = Path(file.filename).suffix

            filename = f"{document_type}{extension}"

            destination = folder / filename

            with open(destination, "wb") as buffer:

                shutil.copyfileobj(
                    file.file,
                    buffer
                )

            uploaded_files[document_type] = str(destination)

        return uploaded_files
    
    def attach_uploaded_files(
        self,
        job_id: str,
        uploaded_files: dict[str, str]
    ):

        job = self.get_job(job_id)

        if job is None:
            return None

        job.uploaded_files = uploaded_files

        return job

upload_service = UploadService()