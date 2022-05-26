const { response } = require("express");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "Token Invalido",
    });
  }

  try {
    const payload = jwt.verify(token, process.env.SECRETA);
    req.uid = payload.id;
    next()
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token Invalido",
    });
  }
};

module.exports = verifyToken;
