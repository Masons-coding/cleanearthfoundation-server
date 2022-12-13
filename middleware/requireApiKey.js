const validApiKey = "jjgg561573hfdtgsdd5h4j";

function requireApiKey(req, res, next) {

    const apiKeyQuery = req.query.apiKey;

    if (apiKeyQuery === validApiKey) {
        return next();
    }

    return res.status(401).json({
        error: "Invalid key: " + apiKeyQuery
    })
}

module.exports = requireApiKey;