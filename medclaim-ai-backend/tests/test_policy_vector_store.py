from backend.app.services.policy_vector_store_service import (
    PolicyVectorStoreService
)

vector_store = PolicyVectorStoreService()

print(
    vector_store.index.describe_index_stats()
)