const tk = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.body.token;
    if (!token) return res.status(401).json({ error: "Access denied" });
    try {
        req.user = tk.verify(token, process.env.TOKEN_SECRET).user;
        next();
    } catch (error) {
        res.status(400).json({ error: "token is not valid " });
    }
};