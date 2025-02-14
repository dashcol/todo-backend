import jwt from "jsonwebtoken";

const JWTauth = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    res.status(401).send("Unauthorized");
  }

  jwt.verify(
    token,
    "5593abb4f1827c21f04c789b1973f982df18fbc10b48da39cce21c20b9bd915d",
    (err, user) => {
      if (err) {
        return res.status(403).json({ message: "invalid token" });
      }
      req.user = user;
      next();
    }
  );
};

export default JWTauth;
