const express = require('express');
const fs = require('fs');
const FEEDBACK_FILE = 'data/feedback.json';
const app = express();
const PORT = 3000;
const pathways = require('./data/pathways.json');

app.use(express.json());

app.use(express.static('public'));

app.post('/api/pathway', (req, res) => {
    const specialty = req.body.specialty;
    const region = req.body.region;
    console.log('Received:', specialty, region);
    if (!specialty || !region) {
        return res.status(400).json({ error: 'Please choose both a specialty and a region.' });
    }
    const specialtyData = pathways[specialty];
    if (!specialtyData || !specialtyData[region]) {
        return res.status(404).json({ error: 'Sorry, we have no information for that specialty and region yet.' });
    }
    res.json(specialtyData[region]);
});
app.post('/api/feedback', (req, res) => {
    const message = req.body.message;
    if (typeof message !== 'string' || message.trim() === '' || message.length > 1000) {
        return res.status(400).json({ error: 'Feedback must be between 1 and 1000 characters.' });
    }
    console.log('Feedback received:', message);
    const entry = { message: message.trim(), createdAt: new Date().toISOString() };
    let allFeedback = [];
    if (fs.existsSync(FEEDBACK_FILE)) {
        allFeedback = JSON.parse(fs.readFileSync(FEEDBACK_FILE, 'utf8'));
    }
    allFeedback.push(entry);
    fs.writeFileSync(FEEDBACK_FILE, JSON.stringify(allFeedback, null, 2));
    res.status(201).json({ ok: true });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});