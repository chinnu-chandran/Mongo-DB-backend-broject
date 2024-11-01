const jwt = require('jsonwebtoken');

const UserRole = Object.freeze({
    USER:'user',
    ADMIN:'admin',
    OWNER:'owner'
});

exports.tokenAuthentication = (roles=[UserRole.USER,UserRole.ADMIN,UserRole.OWNER]) => {
    return (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        return res.status(401).json({ message: 'Not authenticated.' });
    }

    const token = authHeader.split(' ')[1]; 
    if (!token) {
        return res.status(401).json({ message: 'Malformed token.' });
      }
    try {
        decodedToken = jwt.verify(token, 'my secret key'); // Use the same secret key that was used to generate the token
    } catch (err) {
        return res.status(500).json({ message: 'Token verification failed.' });
    }

    if (!decodedToken) {
        return res.status(401).json({ message: 'Not authenticated.' });
    }
    if (!roles.includes(decodedToken.role)) {
        return res.status(403).json({ message: 'Access denied' });
    }

    req.id = decodedToken.id; // Attach userId from the token to the request
    req.role = decodedToken.role; 
    next();
};
};





// const jwt = require('jsonwebtoken');

// const userTypes =Object.freeze({
//     ADMIN: 'admin',
//     USER: 'user',
//     OWNER: 'owner'
// });


// exports.tokenAuthentication = (roles = [userTypes.ADMIN, userTypes.USER, userTypes.OWNER] ) => {
// return (req, res, next) => {
//     const token = req.get('Authorization')?.split(' ')[1];    
//     if(!token) {
//         return res.send({message: 'Access denied, no token provided'})
//     }
//     try {
//         const decoded = jwt.verify(token, 'my secret key');        if(!decoded){
//         return res.send({message: 'not authenticated'})
//        }
//        if(!roles.includes(decoded.role)){
//         console.log('Decoded role:', decoded.role);
//          console.log('Allowed roles:', roles);

//         return res.status(401).send({ message: 'insufficient permission' });

//        }
//        req.user = {
//         id: decoded.id,
//         email: decoded.email,
//         role: decoded.role
//     };       // Attach user info to request object 
//     next();   // Continue to the next middleware or route handler
   
//     } 
//     catch (err) {
//         return res.status(401).send({ message: 'Invalid or expired token' });
//     }
// }
// }