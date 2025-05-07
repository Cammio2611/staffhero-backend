const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Staff = require("../models/Staff");

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_key";

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const staff = await Staff.findOne({ email });

    if (!staff) {
      return res.status(404).json({ error: "Staff not found" });
    }

    const isMatch = await bcrypt.compare(password, staff.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: staff._id, role: "staff" },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      staff: {
        id: staff._id,
        name: staff.name,
        email: staff.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
