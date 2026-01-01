# HealthTrack

HealthTrack is a simple activity-tracking web app (React frontend + Node/Express + MySQL backend). Users can add activities with optional images, categorize them, view a list of logged activities, and remove entries.

**Tech stack:**
- Frontend: React (Create React App)
- Backend: Node.js, Express
- Database: MySQL (Railway or local)
- File uploads: Multer

**Repository layout:**
- `backend/` — Express API and upload handling
- `src/` — React app source (pages, components, styles)
- `build/` — production build output (generated)

**Live deployments used in this project (examples):**
- Frontend: Netlify
- Backend: Render

---

**Setup (Local development)**

- Prerequisites:
  - Node.js (>= 16) and npm
  - MySQL (or a remote MySQL instance)

- Clone repository and install dependencies:

```bash
# clone repository (adjust URL)
git clone <your-repo-url>
cd WebProject
# frontend deps
npm install
# backend deps
cd backend
npm install
```

- Backend environment variables (`backend/.env`):

Create a `.env` file inside `backend/` with these keys (do NOT commit secrets):

```
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_PORT=your_db_port
PORT=5000
CORS_ORIGIN=http://localhost:3000,https://your-netlify-site.netlify.app
```

- Run backend and frontend locally:

```bash
# in backend/
npm start

# in project root (WebProject/)
npm start
```

Open `http://localhost:3000` to view the frontend. The frontend will call the backend at `http://localhost:5000` by default.

---

**Environment variables for production**

- Frontend (Netlify): set `REACT_APP_API_URL` to your Render backend URL (e.g. `https://webproject-3urv.onrender.com`). Netlify must have this env var at build time.
- Backend (Render): set `CORS_ORIGIN` to include your Netlify site URL and `PORT` if needed. Also set DB_* values for your hosted MySQL instance.

**Netlify build / deploy (CLI)**

```bash
# install netlify cli if needed
npm install -g netlify-cli
# build frontend
npm run build
# deploy
netlify deploy --prod --dir=build
```

**Render deploy (backend)**

- Connect your backend Git repo to Render and set environment variables via the Render dashboard. Trigger a manual deploy or enable auto-deploy on push.

---

**Screenshots**

Place screenshot images in a `screenshots/` folder at the project root and update filenames if needed.

- Home / Features

![Home screenshot](screenshots/home.png)

- Add Activity form

![Add Activity screenshot](screenshots/add-activity.png)

- Tracker (activities list)

![Tracker screenshot](screenshots/tracker.png)

---

**Troubleshooting**

- CORS errors: ensure `CORS_ORIGIN` on the backend includes the exact Netlify origin (no trailing slash). Restart/redeploy backend after changing env vars.
- Wrong API URL in frontend: Netlify must have `REACT_APP_API_URL` set at build time; changing a backend env does not update an already-built frontend.
- Image loading: backend serves uploaded images from `/images`.

**Useful commands**

- Backend logs (Render dashboard) — check incoming requests and errors.
- Test endpoint locally or in prod:

```bash
curl -i https://webproject-3urv.onrender.com/
curl -i https://webproject-3urv.onrender.com/activities
```

---

If you want, I can add actual screenshots to `screenshots/` from your local machine — tell me which images to include and I'll add them to the repo and update the README accordingly.
