# Residency Pathway

A web app that helps medical students plan their path to residency.

> Work in progress: a learning project

## Live demo

Try it here: [Residency Pathway](https://residency-pathway.onrender.com/)

The app runs on Render's free tier, which puts the server to sleep when it is idle. The first page load can take a few seconds while it wakes up.

## What it does

- The student enters their university, chooses a specialty and picks a preferred region.
- The server looks up the matching entry in `data/pathways.json`.
- The page shows four sections: best and most likely destinations, what to do now, requirements, and sites to visit for more info.
- If there is no data yet for that combination, the page says so.
- Below the results, a feedback box saves anonymous comments to a Supabase (Postgres) database.

## Disclaimer

All content is currently placeholder data, not real residency advice. Do not use this app to make decisions about your residency applications. Always check official sources such as ECFMG, NRMP, national medical councils and program websites.

## How to run locally

You need [Node.js](https://nodejs.org) (which includes npm) and [Git](https://git-scm.com) installed.

1. Clone the repository:
   ```
   git clone https://github.com/aimepaccy/residency-pathway.git
   cd residency-pathway
   ```
2. Install the dependencies:
   ```
   npm install
   ```
3. Set up the database. Create a free project on [Supabase](https://supabase.com), open its SQL Editor and run:
   ```sql
   create table feedback (
     id bigint generated always as identity primary key,
     message text not null,
     created_at timestamptz not null default now()
   );

   alter table feedback enable row level security;
   ```
4. Add your secrets. Copy `.env.example` to a new file called `.env`, then fill in `SUPABASE_URL` and `SUPABASE_SECRET_KEY` from your Supabase project settings. Never commit `.env`.
5. Start the server:
   ```
   node server.js
   ```
6. Open http://localhost:3000 in your browser. Press Ctrl+C in the terminal to stop the server.

## Folder structure

```
residency-pathway/
├── README.md          what the project is and how to run it
├── CLAUDE.md          instructions for the Claude tutor
├── .gitignore         files git must not track
├── .env.example       names of the required secrets, no values
├── package.json       project info and dependencies
├── package-lock.json  exact dependency versions
├── server.js          backend: the Express server and API routes
├── data/
│   └── pathways.json  curated pathway data (placeholder for now)
└── public/            files the browser receives
    ├── index.html     the page and the form
    ├── style.css      layout and styling
    └── app.js         form steps, fetch calls and result cards
```