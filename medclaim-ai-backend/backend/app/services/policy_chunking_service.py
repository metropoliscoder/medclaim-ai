from langchain_text_splitters import RecursiveCharacterTextSplitter

class PolicyChunkingService:
    def __init__(self,chunk_size: int = 100,chunk_overlap: int =100):
        self.text_splitter = RecursiveCharacterTextSplitter(chunk_size = chunk_size, chunk_overlap = chunk_overlap)
    
    def create_chunks(self,text: str) -> list[str]:
        chunks = self.text_splitter.split_text(text)
        return chunks