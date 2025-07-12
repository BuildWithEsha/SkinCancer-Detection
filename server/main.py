from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import numpy as np
import tensorflow as tf
import io
from keras.applications.vgg16 import preprocess_input

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = tf.keras.models.load_model("skin_cancer_classification.keras")

IMAGE_SIZE = (224, 224)

class_names_mapping = {
    0: "Non-Cancerous",
    1: "Cancerous"
}

@app.post("/predict")
async def predict(image: UploadFile = File(...)):
    try:
        contents = await image.read()
        pil_image = Image.open(io.BytesIO(contents)).convert("RGB").resize(IMAGE_SIZE)

        img_array = np.array(pil_image, dtype=np.float32)

        img_array = preprocess_input(img_array)

        img_array = np.expand_dims(img_array, axis=0)

        prediction = model.predict(img_array)[0]

        predicted_class = int(np.argmax(prediction))
        confidence = float(np.max(prediction))
        label = class_names_mapping.get(predicted_class, "Unknown")

        print({
            "result": f"{label} ({confidence * 100:.2f}% confidence)",
            "label": label,
            "confidence": f"{confidence * 100:.2f}%",
            "raw_predictions": {class_names_mapping[i]: float(score) for i, score in enumerate(prediction)}
        })


        return {
            
            "result": f"{label} ({confidence * 100:.2f}% confidence)",
            "label": label,
            "confidence": f"{confidence * 100:.2f}%",
            "raw_predictions": {class_names_mapping[i]: float(score) for i, score in enumerate(prediction)}
        }
    except Exception as e:
        return {"error": str(e)}
