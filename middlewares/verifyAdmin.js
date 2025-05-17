import dotenv from 'dotenv';

dotenv.config();

const verifyAdmin = (req, res, next) => {
    
    const Authentication = req.headers['authentication'];
    if (!Authentication) {
        return res.status(401).json({ message: 'Authorization or Authentication header missing.' });
    };

    if (Authentication !== process.env.KEY) {
        return res.status(403).json({ message: 'Key not authorized.' });
    };

    next();
};

export default verifyAdmin;
