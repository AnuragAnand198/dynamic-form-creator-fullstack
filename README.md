
# 🧾 Dynamic Form Creator – Fullstack (React + Node.js)

This project builds a **Dynamic Form Creator** using React.js (frontend) and Express.js (backend). The form renders entirely from JSON configuration, supports nested forms, file uploads, and live validations.

---

## 🛠️ Features

- ⚙️ Dynamic field rendering from JSON schema
- ✅ Real-time and submit-time validations (regex, required, min/max)
- 🗂 File upload support to custom endpoints
- 🧩 Nested sub-forms via cards (recursive rendering)
- 📦 JSON form submission to backend
- 🌐 Fully decoupled React + Express architecture

---

## 📁 Project Structure

```
dynamic-form-creator-fullstack/
├── frontend/        # React.js form renderer
└── backend/         # Express.js server (file uploads + form submission)
```

---

## 📦 Requirements

- Node.js (v16 or later)
- npm or yarn

---

## 🔧 Installation

### 1. Clone the project or unzip the folder:
```bash
git clone https://github.com/yourusername/dynamic-form-creator-fullstack.git
cd dynamic-form-creator-fullstack
```

### 2. Setup Backend
```bash
cd backend
npm install
node server.js
# Runs at http://localhost:5000
```

### 3. Setup Frontend
```bash
cd ../frontend
npm install
npm run dev
# Runs at http://localhost:5173
```

---

## 🧪 How to Use

1. Open `http://localhost:5173` in browser
2. Fill in the form rendered from JSON
3. Click **Submit**
4. Output JSON will be shown on the screen and sent to backend

---

## 🚀 Deploying on Another Machine

### Requirements:
- Node.js installed
- Open ports 5000 (backend) and 5173 (frontend) or configure `.env`

### Steps:
1. Copy or clone this project folder
2. Follow the install steps above
3. Optionally use `pm2` or Docker for production

---

## 📁 Sample JSON Supported

- Text, Number, Email
- Select, Multiselect, Typeahead
- File Uploads
- Nested Cards with recursive fields

---

## 📬 Backend Endpoints

| Endpoint         | Method | Description              |
|------------------|--------|--------------------------|
| `/upload`        | POST   | Accepts file uploads     |
| `/submit-form`   | POST   | Accepts form JSON data   |

---

> You can now build any form dynamically by changing the JSON schema inside `frontend/src/App.jsx`

Happy Building! 🔧✨
