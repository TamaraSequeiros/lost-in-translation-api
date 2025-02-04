const rateLimit = require('express-rate-limit');

// Rate limit by device ID
const deviceLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 10, // 10 requests per device
    keyGenerator: (req) => req.header('X-Device-ID')
});

// Additional rate limit by IP
const ipLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 30, // 30 requests per IP
    keyGenerator: (req) => req.ip
});

module.exports = { deviceLimiter, ipLimiter }; 