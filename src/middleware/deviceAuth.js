const devicesByIp = new Map();

const validateDevice = (req, res, next) => {
    const deviceId = req.header('X-Device-ID');
    
    if (!deviceId) {
        return res.status(401).json({ error: 'Device ID required' });
    }

    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(deviceId)) {
        return res.status(401).json({ error: 'Invalid Device ID format' });
    }

    next();
};

// Clean up old entries periodically
setInterval(() => {
    devicesByIp.clear();
}, 24 * 60 * 60 * 1000); // Clear daily

module.exports = validateDevice; 