from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import sys
import os

# Add the current directory to sys.path to allow imports if running from root
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

try:
    from backend.extractor import extract_content
except ImportError:
    try:
        from extractor import extract_content
    except ImportError:
        # Fallback for when running from root but backend is not a package yet
        sys.path.append(os.path.join(os.getcwd(), 'backend'))
        from extractor import extract_content

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        text = extract_content(contents, file.filename)
        return {"filename": file.filename, "text": text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
