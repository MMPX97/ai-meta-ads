const { generateAudienceProfile } = require('../services/aiService');

async function generateAudience(req, res) {
    try {
        const userInput = req.body;
        const audienceProfile = await generateAudienceProfile(userInput);
        res.json({ audienceProfile });
    } catch (err) {
        console.error("Error generating audience:", err);
        res.status(500).json({ error: 'Failed to generate audience' });
    }
}

module.exports = { generateAudience };