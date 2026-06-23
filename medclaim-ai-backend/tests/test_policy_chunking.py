from backend.app.services.policy_chunking_service import (
    PolicyChunkingService
)

with open(
    "data/documents/gold_policy.txt"
) as file:

    policy_text = file.read()

chunking_service = PolicyChunkingService()

chunks = chunking_service.create_chunks(
    policy_text
)

for i, chunk in enumerate(chunks, start=1):

    print(f"\n===== CHUNK {i} =====")
    print(chunk)