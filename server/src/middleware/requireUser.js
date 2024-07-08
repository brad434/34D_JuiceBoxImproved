const jwt = require("jsonwebtoken");
const { getUserById } = require("../db/user");
const { JWT_SECRET } = process.env;

const requireUser = async (req, res, next) => {
  //check to see if there is a token already
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }
  //save the token
  const token = authHeader.split(" ")[1];

  try {
    //check if the specific user has matching token
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await getUserById(id);
    if (!user) {
      return res.status(403).json({ error: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Invalid token" });
    next();
  }
};
