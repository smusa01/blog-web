const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;
    
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo', // Or 'gpt-4' if you have access
            messages: [{ role: 'user', content: userMessage }],
            max_tokens: 150,
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            }
        });

        const aiResponse = response.data.choices[0].message.content.trim();
        res.json({ response: aiResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ response: 'An error occurred.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
