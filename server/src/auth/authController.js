const { getUserByUsername, createUser } = require("../db/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = process.env;

const register = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser({
      username,
      password: hashedPassword,
    });
    const token = jwt.sign({ id: user.id, username }, JWT_SECRET, {
      expiresIn: "1m",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    next();
  }
};

const login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await getUserByUsername(username);
    if (user && (await bcrypt.compare(password, hashedPassword))) {
      const token = jwt.sign(
        {
          id: user.id,
          username,
        },
        JWT_SECRET,
        { expiresIn: "2m" }
      );
      res.send({ token });
    }
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid credentials" });
    next();
  }
};

module.exports = { register, login };
