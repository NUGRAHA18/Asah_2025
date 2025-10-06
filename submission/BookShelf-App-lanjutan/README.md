# Bookshelf App (Vanilla modular)

## Quick start

1. Install dependencies:

```bash
npm install
```

2. Run development server:

```bash
npm run start-dev
```

3. Build for production:

```bash
npm run build
```

## Notes

- App uses the public Notes API at `https://notes-api.dicoding.dev/v2`. If your API requires authentication, update `src/api.js` to include headers (e.g. `X-Auth-Token`).
- Book data is stored inside note `body` as a JSON string to preserve `author/year/isComplete` fields.
- Loading indicator and basic error handling are implemented.
- The project follows a React-like folder layout but uses plain vanilla JS modules.
