# ViewVault

A minimal, production-ready frontend scaffold (Vite + React + TypeScript + Bootstrap) intended to be served as static assets from a Java Spring Boot application.

Quick start

1. Install dependencies:

```bash
cd ViewVault
npm install
```

2. Run local dev server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

Integration with Spring Boot

- After `npm run build`, the optimized files are placed in `dist/`.
- Copy the contents of `dist/` into your Spring Boot project under `src/main/resources/static` (or configure Spring to serve from a different directory).
- If using server-side routing, ensure your Spring controller forwards unknown routes to `index.html` so the SPA can handle client-side routes.

Notes

- Bootstrap CSS is included via npm and imported in `src/main.tsx`.
- This scaffold favors simplicity and compatibility with Spring Boot's static serving model.
