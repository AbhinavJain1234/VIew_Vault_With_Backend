Additional developer notes:

- To serve from Spring Boot: copy `dist/` contents into `src/main/resources/static`.
- For client-side routing, add a controller mapping to return `index.html` for unknown paths.
- To enable compressed assets, consider configuring Spring to serve pre-compressed files or use a CDN/proxy.
