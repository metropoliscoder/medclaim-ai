from backend.app.services.policy_chunking_service import (
    PolicyChunkingService
)

from backend.app.services.policy_vector_store_service import (
    PolicyVectorStoreService
)

with open(
    "data/documents/gold_policy.txt"
) as file:

    policy_text = file.read()

chunking_service = (
    PolicyChunkingService()
)

chunks = (
    chunking_service.create_chunks(
        policy_text
    )
)

vector_store = (
    PolicyVectorStoreService()
)

vector_store.store_chunks(
    chunks
)

print(
    vector_store.describe_stats()
)