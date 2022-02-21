const express = require("express");
const router = express.Router();

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

    const user = new User({ name, email, phone, password, cpassword });

    const userRegistered = await user.save();

    if (userRegistered)
      res.status(200).json({ message: "User registered successfully" });
    else res.status(500).json({ error: "Failed registered" });
  } catch (err) {
    console.log(err);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      res.status(400).send({ message: "Cannot be empty" });
    const userLogin = await User.findOne({ email });
    if (!userLogin) res.status(400).send({ message: " login Error" });
    else res.status(200).send({ message: " login Done" });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
