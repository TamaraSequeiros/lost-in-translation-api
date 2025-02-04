const express = require('express');
const cors = require('cors');
require('dotenv').config();

const corsOptions = require('./src/config/cors');
const validateDevice = require('./src/middleware/deviceAuth');
const { deviceLimiter, ipLimiter } = require('./src/middleware/rateLimiter');
const wordGuessRouter = require('./src/routes/wordGuess');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// Apply both rate limiters
app.use('/api', validateDevice, ipLimiter, deviceLimiter);

// Routes
app.use('/api', wordGuessRouter);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log('Press Ctrl + C to stop the server');
});
