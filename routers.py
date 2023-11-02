import io
import numpy as np
from fastapi import FastAPI, File, UploadFile
import cv2
import magic
from magic import *
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()


origins = [
    "http://localhost",
    "http://localhost:63342",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/all_languages")
async def get_all_languages():
    return await magic.all_languages()


@app.get("/translate")
async def translate(input_lang, output_lang, text):
    return await magic.translate(src=input_lang, dest=output_lang, input=text)


@app.get("/translate_detect")
async def translate_with_detect(text, output_lang):
    return await define_lang_translate(text=text, output_lang=output_lang)


@app.put("/read_image")
async def read_image(img: UploadFile = File(...),):
    image_stream = io.BytesIO(img.file.read())
    image_stream.seek(0)
    file_bytes = np.asarray(bytearray(image_stream.read()), dtype=np.uint8)
    frame = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
    return await magic.image_to_text(frame)
