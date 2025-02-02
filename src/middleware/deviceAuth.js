const APP_SECRET = process.env.APP_SECRET;

const validateDevice = (req, res, next) => {
    const deviceId = req.header('X-Device-ID');
    const signature = req.header('X-Device-Signature');
    
    if (!deviceId || !signature) {
        return res.status(401).json({ error: 'Missing authentication' });
    }

    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(deviceId)) {
        return res.status(401).json({ error: 'Invalid Device ID format' });
    }

    // Validate signature
    const expectedSignature = Buffer.from(deviceId + APP_SECRET).toString('base64');
    if (signature !== expectedSignature) {
        return res.status(401).json({ error: 'Invalid signature' });
    }

    next();
};

module.exports = validateDevice; 