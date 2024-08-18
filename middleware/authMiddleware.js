import jwt from 'jsonwebtoken';

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401); // If there's no token, return a 401
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log('token verification failed', err)
            return res.sendStatus(403); // If the token is invalid, return a 403
        }
        req.user = {id: parseInt(user.id, 10)};
        next(); // Proceed to the next middleware/route handler
    });
}

export default authenticateToken;
