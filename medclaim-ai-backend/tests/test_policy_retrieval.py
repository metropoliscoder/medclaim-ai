from backend.app.services.policy_vector_store_service import (
    PolicyVectorStoreService
)

vector_store = (
    PolicyVectorStoreService()
)

results = vector_store.search(
    query="Is Appendectomy covered?",
    top_k=3
)

print(results)