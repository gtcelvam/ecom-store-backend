const jwt = require("jsonwebtoken");
const { JWT_AUTH_TOKEN, STATUS_CODES } = require("./constants");

const { Bad_Request, UnAuthorized, Not_Found, Forbidden } = STATUS_CODES;

const option = {
  expiresIn: "1d",
};

const generateToken = (data) => {
  const { email } = data;
  const token = jwt.sign({ email }, JWT_AUTH_TOKEN, option);
  return token;
};

const verifyToken = (req, res, next) => {
  try {
    const jwtToken = req.headers["authorization"];
    if (!jwtToken)
      return res
        .status(Bad_Request.code)
        .json({ message: Bad_Request.message });
    const token = jwtToken.split(" ")[1];
    jwt.verify(token, JWT_AUTH_TOKEN, (err, decode) => {
      if (err)
        return res
          .status(UnAuthorized.code)
          .json({ message: UnAuthorized.message });
      return next();
    });
  } catch (error) {
    console.log("verify token error : ", error);
    res.status(Not_Found.code).json({ message: Not_Found.message });
  }
};

const verifyLoginToken = (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token)
      return res
        .status(Bad_Request.code)
        .json({ message: Bad_Request.message });
    jwt.verify(token, JWT_AUTH_TOKEN, (err, decode) => {
      if (err)
        return res
          .status(UnAuthorized.code)
          .json({ message: UnAuthorized.message });
      if (decode.email === req.body.email) return next();
      req.status(Forbidden.code).json({ message: Forbidden.message });
    });
  } catch (error) {
    console.log("verify login token error : ", error);
    res.status(Not_Found.code).json({ message: Not_Found.message });
  }
};

module.exports = { generateToken, verifyToken, verifyLoginToken };
