const rateLimit = require('express-rate-limit');

// Rate limit by device ID
// Default 10 requests per 5 minutes
const deviceConfig = {
    max: parseInt(process.env.DEVICE_RATE_LIMIT_MAX) || 10,
    windowMs: (parseInt(process.env.DEVICE_RATE_LIMIT_WINDOW_MINUTES) || 5) * 60 * 1000
};

const deviceLimiter = rateLimit({
    windowMs: deviceConfig.windowMs,
    max: deviceConfig.max,
    keyGenerator: (req) => req.header('X-Device-ID')
});

// Additional rate limit by IP
// Default 30 requests per 15 minutes
const ipConfig = {
    max: parseInt(process.env.IP_RATE_LIMIT_MAX) || 30,
    windowMs: (parseInt(process.env.IP_RATE_LIMIT_WINDOW_MINUTES) || 15) * 60 * 1000
};

const ipLimiter = rateLimit({
    windowMs: ipConfig.windowMs,
    max: ipConfig.max,
    keyGenerator: (req) => req.ip
});

module.exports = { deviceLimiter, ipLimiter }; 