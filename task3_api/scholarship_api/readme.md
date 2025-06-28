# 📦 Task 3: Scholarship Metadata Backend API

This backend REST API is built using **Node.js**, **Express**, and **MongoDB** to manage and store scholarship metadata off-chain. It is containerized using **Docker** for easy deployment and scalability.

---

## ✅ Features

- 🧾 Create and store scholarship metadata (e.g., title, description, eligibility, amount).
- 🔍 Retrieve scholarship metadata by ID.
- 🌐 RESTful endpoints built with Express.js.
- 🗃 MongoDB database integration using Mongoose.
- 🐳 Docker support with `docker-compose`.

---

## ⚙️ Setup Instructions

### 🔧 Local Development

1. **Clone the repo**  
```bash
   git clone <repo_url>
   cd scholarship_api

```
2. **Install dependencies**

```bash
    npm install
```

3. **Start the server**
```bash
    npm run dev
```

4. **API will be running at:**
```bash
    http://localhost:3000/api/scholarships
    
```

## 🐳 Dockerized Setup

```bash
    docker compose up --build
    
```
