# Nia App - Development Setup Guide

Welcome to the **Nia App** repository. Follow these sequential steps to configure your local development environment, initialize the database tables, and run both the backend and frontend servers cleanly.

---

## 📋 Prerequisites
Ensure you have the following core runtimes installed on your local machine:
* **Python 3.12+**
* **Node.js (v18 or higher)** & **npm**
* **Git**

---

## 🛠️ Step 1: Backend Environment Setup
Open your terminal, navigate directly into the `backend` folder, and configure your isolated Python environment:

```bash
# Navigate to the backend directory
cd backend

# Create a clean virtual environment
python3 -m venv venv

# Activate the virtual environment
source venv/bin/activate

# Install all required dependencies
pip install -r requirements.txt
```

---

## 🔑 Step 2: Configure Environment Variables
You need a local configuration file for encryption keys and system paths.

1. Create a brand new file named `.env` directly inside your `backend/` root directory:
   ```bash
   touch .env
   ```
2. Open the `.env` file in your text editor and add the following baseline configurations:
   ```env
   FLASK_APP=app.py
   FLASK_RUN_PORT=5000
   JWT_SECRET_KEY=dev-secret-key-token-generation-12345
   ```

---

## 🗄️ Step 3: Synchronize & Seed the Database
Since database files are excluded from git tracking, build your local SQLite database layout using the existing migration history blueprints and populate it with seed records:

```bash
# Force your local database file to catch up to existing migration files
flask db upgrade

# Run the seeding script to populate your tables with mock json records
PYTHONPATH=. python seeds/seed.py
```

---

## 🚀 Step 4: Run the Application

To run the full stack, you will need to keep **two separate terminal windows** open running concurrently.

### Terminal 1: Launch the Flask Backend
Inside your `backend` directory with your virtual environment (`venv`) active, start the server:
```bash
PYTHONPATH=. python app.py
```
* Your backend server will spin up and listen globally on **`http://0.0.0.0:5000`** to allow clean Windows-to-WSL network routing layers.
* Verify it is live by opening your browser to `http://localhost:5000/`. You should see a `{"message": "backend running"}` payload response.

### Terminal 2: Launch the React Frontend
Open a brand new terminal tab, navigate straight into your frontend root subfolder, install its packages, and run the development compiler:
```bash
# Navigate to your frontend project directory
cd "Frontend "

# Install node dependencies
npm install

# Run the Vite live-reloading developer server
npm run dev
```
* Your frontend app will spin up and listen on **`http://localhost:5173`**.

---

## ⚡ Troubleshooting Notes
* **Failed to Fetch / CORS Blocks:** Ensure that your backend is actively running on port `5000`. The global Flask-RESTful CORS decorators will automatically manage preflight handshakes from your Vite port (`5173`).
* **Python Path Resolution Errors:** Always prepend your backend execution triggers with `PYTHONPATH=.` when working inside nested root layouts to assist Python in locating the primary module context sheets correctly.
