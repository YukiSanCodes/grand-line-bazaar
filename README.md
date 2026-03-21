# GRAND LINE BAZAAR 

## 1. Backend API (`ecommerce-backend/`)

Serves product data at `http://localhost:5001` and **static product images** from `ecommerce-backend/devil-fruits/` at `http://localhost:5001/devil-fruits/<filename>`.

JSON from `/api/products` includes **absolute** image URLs (default `http://localhost:5001/devil-fruits/...`). Override the public origin with:

`API_PUBLIC_URL=http://10.0.2.2:5001 npm start` (example for Android emulator → host machine).

```bash
cd ecommerce-backend
npm install
npm start
```

You should see: `Backend server running at http://localhost:5001`.

---

## 2. Frontend PWA (`react-ecommerce/`)

The app uses **`src/config/api.js`**: `VITE_API_URL` or `http://localhost:5001`. Set `VITE_API_URL` when the API is not on localhost (e.g. device/emulator). Start the backend before using product/category features.

### Development

```bash
cd react-ecommerce
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`). Resize below the `lg` breakpoint or use device emulation to see **bottom navigation**; desktop keeps the full top navbar.

### Production build & PWA

```bash
cd react-ecommerce
npm install
npm run build
```

Outputs `react-ecommerce/dist/` with the service worker and web manifest.

Preview the production build (good for testing installability and offline caching):

```bash
npm run preview
```

Then in Chrome: **DevTools → Application → Manifest** (and **Service workers**).

---

## 3. Android (Capacitor)

After a successful **`npm run build`**:

```bash
cd react-ecommerce
npx cap sync
npm run cap:open:android
```

Or: `npm run cap:sync` then `npm run cap:open:android`.

In Android Studio, choose a device/emulator and run the app.
