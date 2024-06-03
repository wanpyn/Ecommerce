const jwt = require("jsonwebtoken");
const { secretkey } = require("../configuration/jwtConfig");

function authenticationToken(req, res, next) {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized User" });
  }
  const [bearer, token] = authHeader.split(" ");
  if (bearer !== "Bearer" || !token) {
    return res.status(402).json({ message: "Unauthorized User" });
  }

  jwt.verify(token, secretkey, (err, user) => {
    if (err) {
      return res.status(402).json({ message: `Invalid token: ${err}` });
    }
    req.user = user;
    next();
  });
}

function verifyToken(token) {
  return jwt.verify(token, secretkey);
}

module.exports = { authenticationToken, verifyToken };
