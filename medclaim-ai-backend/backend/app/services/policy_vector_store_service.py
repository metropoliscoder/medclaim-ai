import os
import time

from dotenv import load_dotenv
from pinecone import Pinecone, ServerlessSpec

from backend.app.services.policy_embedding_service import (
    PolicyEmbeddingService
)

load_dotenv()

INDEX_NAME = "medclaim-policy-index"
NAMESPACE = "gold-policy"


class PolicyVectorStoreService:

    def __init__(self):

        self.pc = Pinecone(
            api_key=os.getenv("PINECONE_API_KEY")
        )

        self.embedding_service = (
            PolicyEmbeddingService()
        )

        self._create_index_if_not_exists()

        self.index = self.pc.Index(
            INDEX_NAME
        )

    def _create_index_if_not_exists(self):

        existing_indexes = (
            self.pc.list_indexes().names()
        )

        if INDEX_NAME not in existing_indexes:

            self.pc.create_index(
                name=INDEX_NAME,
                dimension=1536,
                metric="cosine",
                spec=ServerlessSpec(
                    cloud="aws",
                    region="us-east-1"
                )
            )

            while not self.pc.describe_index(
                INDEX_NAME
            ).status["ready"]:

                time.sleep(1)

    def store_chunks(
        self,
        chunks: list[str]
    ):

        vectors = []

        for i, chunk in enumerate(chunks):

            embedding = (
                self.embedding_service.generate_embedding(
                    chunk
                )
            )

            vectors.append(
                {
                    "id": f"chunk_{i}",

                    "values": embedding,

                    "metadata": {
                        "text": chunk,
                        "policy_type": "gold"
                    }
                }
            )

        self.index.upsert(
            vectors=vectors,
            namespace=NAMESPACE
        )

    def search(
        self,
        query: str,
        top_k: int = 3
    ):

        query_embedding = (
            self.embedding_service.generate_embedding(
                query
            )
        )

        response = self.index.query(
            vector=query_embedding,
            top_k=top_k,
            namespace=NAMESPACE,
            include_metadata=True
        )

        return response

    def describe_stats(self):

        return self.index.describe_index_stats()