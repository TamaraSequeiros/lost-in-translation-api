const express = require('express');
const router = express.Router();
const { guessWord } = require('../services/openai');

const capitalizeWord = (word) => {
    return word.toLowerCase().replace(/^./, char => char.toUpperCase());
};

router.post('/guess-word', async (req, res) => {
    try {
        const { description, language } = req.body;

        if (!description || !language) {
            return res.status(400).json({ 
                error: 'Missing required parameters' 
            });
        }

        const rawWord = await guessWord(description, language);
        const word = capitalizeWord(rawWord);
        res.json({ word });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            error: 'Failed to get word guess',
            details: error.message 
        });
    }
});

module.exports = router; 