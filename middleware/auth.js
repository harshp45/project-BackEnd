const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next)
{
    //get token from header
    const token = req.headers['x-access-token'];
    
    //check if token is there
    if(!token)
    {
        return res.status(400).json({ msg: 'no token authorization denied' });
    }
    

    //Verify token
    try
    {
        const decoded = jwt.verify(token, config.get('jwtsecret'));
        req.user = decoded.user;
        console.log("Request User:"+JSON.stringify(req.user));
        console.log("Decoded User:"+JSON.stringify(decoded.user));
        next();
    }
    catch (err)
    {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};