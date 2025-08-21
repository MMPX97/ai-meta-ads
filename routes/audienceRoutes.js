const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/generate', async (req, res) => {
    console.log("✅ Route hit", req.body);

    try {
        const userInput = req.body;
        const prompt = `Given this business info: ${JSON.stringify(userInput)}, generate an ideal Meta ads audience profile including age, gender, location, interests, and behaviors.`;

        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: "gpt-4",
                messages: [{ role: "user", content: prompt }],
                max_tokens: 500
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        res.json({ audienceProfile: response.data.choices[0].message.content });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

module.exports = router;