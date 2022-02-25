const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../Model/userSchema");

router.get("/", (req, res) => {
  res.send("Hello word");
});

router.post("/register", async (req, res) => {
  const { name, email, phone, password, cpassword } = req.body;
  if (!name || !email || !phone || !password || !cpassword)
    return res.status(422).json({ error: "enter the correct details" });

  try {
    const userExists = await User.findOne({ email: email });
    if (userExists)
      return res.status(422).json({ error: "Email already exists" });
    else if (password != cpassword) {
      return res.status(422).json({ error: "Passwords dont match" });
    } else {
      const user = new User({ name, email, phone, password, cpassword });

      const userRegistered = await user.save();

      if (userRegistered)
        res.status(200).json({ message: "User registered successfully" });
      else res.status(500).json({ error: "Failed registered" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/signin", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;
    if (!email || !password)
      res.status(400).send({ message: "Cannot be empty" });
    const userLogin = await User.findOne({ email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      token = await userLogin.generateAuthToken();
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true
      });

      if (!isMatch) res.status(400).send({ message: "Invalid Creadentials" });
      else res.status(200).send({ message: " login Done" });
    } else {
      res.status(422).send("invalid credentials");
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
