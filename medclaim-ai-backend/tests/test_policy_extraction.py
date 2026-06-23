from backend.app.services.policy_vector_store_service import (
    PolicyVectorStoreService
)

from backend.app.services.policy_extraction_service import (
    extract_policy_information
)

vector_store = PolicyVectorStoreService()

results = vector_store.search(
    query="Is Appendectomy covered?"
)

context = "\n\n".join(
    match["metadata"]["text"]
    for match in results["matches"]
)

policy_info = extract_policy_information(
    context
)

print(policy_info)