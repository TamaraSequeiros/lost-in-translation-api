const validateDevice = (req, res, next) => {
    const deviceId = req.header('X-Device-ID');
    
    if (!deviceId) {
        return res.status(401).json({ error: 'Device ID required' });
    }

    // Basic sanity checks
    if (deviceId.length < 10 || deviceId.length > 50) {
        return res.status(401).json({ error: 'Invalid Device ID length' });
    }

    // Only allow alphanumeric characters and dashes
    if (!/^[a-zA-Z0-9-]+$/.test(deviceId)) {
        return res.status(401).json({ error: 'Invalid Device ID format' });
    }

    next();
};

module.exports = validateDevice; 