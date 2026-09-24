# Residency pathway
this app helps a medical student to know what it takes and other relevant information about their residency program of aspiration.

> Work in Progress: a learning project


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
3. Start the server:
   ```
   node server.js
   ```
4. Open http://localhost:3000 in your browser. Press Ctrl+C in the terminal to stop the server.

## Folder structure

```
residency-pathway/
├── server.js       backend: the Express server
├── package.json    project info and dependencies
└── public/         files the browser receives
    └── index.html
```