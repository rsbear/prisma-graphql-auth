const jwt = require("jsonwebtoken");

const APP_SECRET = "appsecret321";

const getUserId = context => {
  const Authorization = context.req.headers.authorization;
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const verifiedToken = jwt.verify(token, APP_SECRET);
    return verifiedToken && verifiedToken.userId;
  }
  throw new AuthError();
};

class AuthError extends Error {
  constructor() {
    super("Not authorized");
  }
}

module.exports = {
  getUserId,
  AuthError,
  APP_SECRET
};
