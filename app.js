require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const { generateAudienceProfile } = require('./services/aiService');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Root route to serve dashboard
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API route: POST /audience/generate
app.post('/audience/generate', async (req, res) => {
    console.log("✅ /audience/generate route hit", req.body);

    try {
        const userInput = req.body;
        const audienceProfile = await generateAudienceProfile(userInput);
        res.json({ audienceProfile });
    } catch (err) {
        console.error("❌ Error generating audience:", err);
        res.status(500).json({ error: 'Failed to generate audience' });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));