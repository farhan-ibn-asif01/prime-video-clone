# Amazon Prime Video Clone

A simple Amazon Prime Video clone built with React, TypeScript, and JSON Server.

## Features

- Hero banner with featured content
- Movie rows organized by category
- Responsive design
- Mock data with TMDB API

## Setup

1. Get a free TMDB API key:
   - Sign up at https://www.themoviedb.org/
   - Go to Settings > API and request an API key

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```
VITE_TMDB_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
amazon-prime-clone/
├── src/
│   ├── components/       # React components
│   ├── services/         # API services
│   ├── styles/          # CSS styles
│   ├── types/           # TypeScript types
│   ├── App.tsx          # Main app component
│   └── main.tsx         # Entry point
├── db.json              # JSON Server database
├── package.json
└── tsconfig.json
```

## Technologies

- React 18
- TypeScript
- Vite
- TMDB API
- Axios
