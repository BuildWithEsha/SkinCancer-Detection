## 🧬 Skin Cancer Detection with CNN 🧠

A full-stack AI web app that classifies skin images as **Cancerous** or **Non-Cancerous** using a **Convolutional Neural Network (CNN)** model.

---
<img width="1223" height="873" alt="Screenshot 2025-07-17 212423" src="https://github.com/user-attachments/assets/eaacee6d-4009-4efa-b288-2c03597f1d26" />

---
![Recording2025-07-17221626-ezgif com-speed](https://github.com/user-attachments/assets/f457e91d-14e3-4842-9234-89b6f37b1516)


### 🚀 Features

* 🧠 **CNN Model** trained to classify cancerous vs. non-cancerous skin images
* ⚡ **FastAPI** backend to serve predictions
* 🌐 **React + Vite** frontend for a clean, interactive UI
* 🖼️ Upload skin images and get instant prediction + confidence score

---

### 🖼️ Sample Output

```json
{
  "result": "Cancerous (96.87% confidence)",
  "label": "Cancerous",
  "confidence": "96.87%",
  "raw_predictions": {
    "Non-Cancerous": 0.031,
    "Cancerous": 0.969
  }
}
```


### 🧪 How to Run Locally

#### 🖥 Backend (FastAPI)

```bash
cd server
uvicorn main:app --port 8000
```

#### 🌐 Frontend (React + Vite)

```bash
cd client/Cancer-detection
npm install
npm run dev
```

---

### 📁 File Structure

```
AIPROJECT/
├── client/
│   └── Cancer-detection/     # React frontend
├── server/
│   ├── main.py               # FastAPI backend
│   └── Skin_cancer_classification.keras  # (ignored in .gitignore)
```

---

### 📦 Requirements (for backend)

```txt
fastapi
uvicorn
tensorflow
pillow
numpy
```

---

### 🛡 Disclaimer

This is an educational project. It should not be used for real medical diagnosis. Always consult a certified healthcare professional.

---

### ✨ Credits

Made with ❤️ by [@BuildWithEsha](https://github.com/BuildWithEsha)

---

