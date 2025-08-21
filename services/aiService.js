const axios = require('axios');

async function generateAudienceProfile(userInput) {
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

    return response.data.choices[0].message.content;
}

module.exports = { generateAudienceProfile };