## Pastebin-Lite

A lightweight pastebin like project built with **MERN stack**.
Users can create pastes with optional **time-to-live(TTL)** and **maximum view limits**, and share a link to view the paste

---

## Live Demo

- Frontend: [https://pastebin-lite-six-sand.vercel.app](https://pastebin-lite-six-sand.vercel.app)

- Backend: [https://pastebin-lite-dw5r.onrender.com](https://pastebin-lite-dw5r.onrender.com)


---

## Features

- Create a text paste with optional constraints:
    1. TTL (seconds) -- auto expire after time
    2. Max views -- auto expire after being viewed N times.
- Shareable URL for each paste.
- View a paste with remaining views and expiry info.
- Simple React frontend with controlled form
- Safe Paste rendering
- Backend API fully complaint with grader tests

---

## Tech Stack

1. **Frontend:** React, CSS Modules, Axios
2. **Backend:** Node.js, Express
3. **Database:** MongoDB(Atlas)
4. **Deployment:** Frontend on vercel, Backend on render

---

## Project Setup

# Clone the repo
1.  git clone https://github.com/Durgasr/pastebin-lite.git
2.  cd pastebin-lite

----

# Backend
1. cd backend
2. npm install

- create .env file

1. BASE_URL=http://localhost:3000
2. MONGO_URI= mongo_string


# Run backend

1. node server.js


----


# Frontend

- run below commands

1. cd frontend
2. npm install
3. npm start


open browser at "http://localhost:3000"



## API Endpoints

| Route             | Method | Description          |
| ----------------- | ------ | -------------------- |
| `/api/healthz`    | GET    | Health check         |
| `/api/pastes`     | POST   | Create a paste       |
| `/api/pastes/:id` | GET    | Fetch a paste (JSON) |


## Environment Variables

1. BASE_URL  -  Base URL for generating shareable links.
2. MONGO_URI  -  MongoDB connection string.
