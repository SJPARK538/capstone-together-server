// const jwt = require('../config/jwt')
// const createError = require('http-errors')

// const auth = async (req, res, next) => {
//     if (!req.headers.authorization) {
//         return next(createError.Unauthorized('Access token is required'))
//     }
//     const token = req.headers.authorization.split(' ')[1]
//     if (!token) {
//         return next(createError.Unauthorized())
//     }
//     await jwt.verifyAccessToken(token).then(user => {
//         req.user = user
//         next()
//     }).catch (e => {
//         next(createError.Unauthorized(e.message))
//     })
// }

// module.exports = auth;

// //not used 

const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    next();
  });
}

module.exports = auth;