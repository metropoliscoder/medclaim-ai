from backend.app.services.policy_embedding_service import PolicyEmbeddingService

generateEmbedding = PolicyEmbeddingService()

embedding = generateEmbedding.generate_embedding(text="Appendix")

# print(embedding)
print(len(embedding))