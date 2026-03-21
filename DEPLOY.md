# Deploy (Render + Vercel)

Deploy **backend first**, then **frontend**. The React app needs the backend’s public URL.

---

## 1. Backend — Render (`ecommerce-backend`)

### Create the service

1. In [Render](https://render.com): **New** → **Web Service**.
2. Connect this repo.
3. Configure:

| Setting | Value |
|--------|--------|
| **Root Directory** | `ecommerce-backend` |
| **Runtime** | Node |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |

4. Create the service and wait until it is **Live**. Copy the service URL (e.g. `https://your-service.onrender.com`).

### Environment variables (Render)

Add these in the service **Environment** tab:

| Key | Value |
|-----|--------|
| `API_PUBLIC_URL` | Your Render service URL **exactly** as shown in the dashboard, with `https://`, **no trailing slash**.<br>Example: `https://your-service.onrender.com` |

**Why:** The API turns relative image paths into full URLs using this base. If it is wrong or missing, product images break.

**Note:** Render sets `PORT` automatically. Do not set `PORT` yourself unless you know you need to.

---

## 2. Frontend — Vercel (`react-ecommerce`)

### Create the project

1. In [Vercel](https://vercel.com): **Add New** → **Project** → import this repo.
2. Configure:

| Setting | Value |
|--------|--------|
| **Root Directory** | `react-ecommerce` |
| **Framework Preset** | Vite (or “Other” with the commands below) |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |

3. Add environment variable **before** the first deploy (or redeploy after adding):

| Key | Value |
|-----|--------|
| `VITE_API_URL` | Same base URL as the backend: `https://your-service.onrender.com` |

**No trailing slash.** Must match the `https` URL your browser uses to hit the API.

4. Deploy.

---

## 3. Quick checklist

- [ ] Backend is live on Render; opening `https://your-service.onrender.com` shows something like “E-Commerce Product API is running…”.
- [ ] `https://your-service.onrender.com/api/products` returns JSON.
- [ ] `API_PUBLIC_URL` on Render equals that same origin (scheme + host, no path).
- [ ] `VITE_API_URL` on Vercel equals that same origin.
- [ ] After changing env vars on Vercel, trigger a **Redeploy** (Vite bakes `VITE_*` at build time).

---

## Local development (reference)

| App | Env | Typical value |
|-----|-----|----------------|
| Backend | `API_PUBLIC_URL` | Optional; defaults to `http://localhost:5001` if unset |
| Frontend | `VITE_API_URL` | Optional; defaults to `http://localhost:5001` if unset |

Run backend: `cd ecommerce-backend && npm start`  
Run frontend: `cd react-ecommerce && npm run dev`

---

## Optional: Render free tier

Free web services **sleep** after idle time. The first request after sleep can be slow (cold start). Upgrade or accept the delay for demos.
