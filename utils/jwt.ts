import jwt from "jsonwebtoken";

const JWT_SEC = process.env.JWT_SEC || "";
// token
const verifyToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, JWT_SEC, (err: any, user: any) => {
      if (err) {
        return res
          .status(403)
          .json({ message: "Session expired. Login to continue" });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ message: "You are not authenticated!" });
  }
};

const verifyTokenAndAuthorization = (req: any, res: any, next: any) => {
  verifyToken(req, res, () => {
    if (req.user) {
      next();
    } else {
      res
        .status(403)
        .json({ message: "You are not allowed to perform this operation!" });
    }
  });
};

export { verifyToken, verifyTokenAndAuthorization, jwt };
// module.exports = { verifyToken, verifyTokenAndAuthorization, jwt };
