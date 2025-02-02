const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const GPT_MODEL = "gpt-3.5-turbo";

const guessWord = async (description, language) => {
    const completion = await openai.chat.completions.create({
        model: GPT_MODEL,
        messages: [
            {
                role: "system",
                content: "You are playing a game of guessing target words based on a description. Always return a single, complete word as your answer. Do not abbreviate."
            },
            {
                role: "user",
                content: `Guess the target word from this description in ${language}: ${description}`
            }
        ],
        max_tokens: 5
    });

    if (process.env.NODE_ENV === 'development') {
        console.log('OpenAI API Response:', JSON.stringify(completion, null, 2));
    }

    // Extract first word only from response, removing any extra whitespace
    // This ensures we get a single word even if the model returns multiple
    return completion.choices[0].message.content.trim().split(/\s+/)[0];
};

module.exports = { guessWord }; 