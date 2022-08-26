const { User } = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function signUp(req, res) {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = bcryptjs.hashSync(req.body.password, 8);

    const user = await User.create({ name, email, password });
    res.send({ msg: "User created successfully" });
  } catch (err) {
    res.status(500).send({ msg: "Internal server error" });
  }
}

async function signIn(req, res) {
  try {
    const name = req.body.name;
    const password = req.body.password;

    const user = await User.findOne({
      where: {
        name: name,
      },
    });
    if (user) {
      const validPassword = bcryptjs.compareSync(password, user.password);
      if (!validPassword) {
        res.send({ msg: "Invalid credentials" });
      } 
      const token = await jwt.sign(
        { id: user.id },
        `${process.env.JWT_SECRET_KEY}`,
        {
          expiresIn: "1h",
        }
      );
      const finalUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        token: token,
      };

      res.send(finalUser);
    }
  } catch (err) {
    console.log(err);
    res.send({ msg: "Internal server error" });
  }
}

module.exports = { signUp, signIn };
