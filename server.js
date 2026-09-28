const express = require('express');

const app = express();
const PORT = 3000;
const pathways = require('./data/pathways.json');

app.use(express.json());

app.use(express.static('public'));

app.post('/api/pathway', (req, res) => {
    const specialty = req.body.specialty;
    const region = req.body.region;
    console.log('Received:', specialty, region);
    const specialtyData = pathways[specialty];
    if (!specialtyData || !specialtyData[region]) {
        return res.status(404).json({ error: 'Sorry, we have no information for that specialty and region yet.' });
    }
    res.json(specialtyData[region]);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});