const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const Form = require("./model/userDetails");
const sendSMS = require("./utils/sendSMS");

const app = express();
app.use(cors({
  origin: "https://bpcllpoffer.netlify.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);
console.log(process.env.MONGO_URI)

app.post("/api/save-details", async (req, res) => {
  const { name, vehicle, mobile, bill } = req.body;

  if (!name || !vehicle || !mobile || !bill) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (mobile.length !== 10) {
    return res.status(400).json({ message: "Mobile number must be 10 digits" });
  }

  try {
    // ⚠️ Check if number already exists
    const exists = await Form.findOne({ mobile });

    if (exists) {
      // ❌ DO NOT send SMS (as per your request)
      return res.status(400).json({
        message: "This mobile number is already registered",
        status: "duplicate",
      });
    }

    // Save new data
    await Form.create({ name, vehicle, mobile, bill });

    // Send success SMS
    try {
      await sendSMS(
        mobile,      
      );
    } catch (smsErr) {
        console.log(smsErr)
      return res.status(500).json({
        message: "Data saved but SMS sending failed",
        status: "sms_failed",
      });
    }

    return res.json({
      message: "Details saved successfully",
      status: "success",
    });
  } catch (err) {
    // MongoDB unique index error
    if (err.code === 11000) {
      return res.status(400).json({
        message: "This mobile number is already registered (DB unique)",
        status: "duplicate",
      });
    }

    return res.status(500).json({
      message: "Server or database error",
      status: "error",
    });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
