const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    // 10 requests per 5 minutes
    windowMs: 5 * 60 * 1000,
    max: 10,
    keyGenerator: (req) => {
        return req.header('X-Device-ID');
    },
    handler: (req, res) => {
        res.status(429).json({
            error: 'Too many requests from this device. Please try again later.'
        });
    }
});

module.exports = limiter; 