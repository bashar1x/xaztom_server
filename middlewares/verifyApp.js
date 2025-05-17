import dotenv from 'dotenv';

dotenv.config();

const verifyApp = (req, res, next) => {
    
    const apps = req.headers['apps'];
    if (!apps) {
        return res.status(401).json({ message: 'Authorization or App-Name header missing.' });
    };

    if (apps !== process.env.ACCEPT_APP) {
        return res.status(403).json({ message: 'App not authorized.' });
    };

    next();
};

export default verifyApp;
