const axios = require("axios");
const qs = require("qs");

const sendSMS = async (mobile) => {
  try {
    const params = {
      key: process.env.PIN4SMS_KEY,
      route: process.env.PIN4SMS_ROUTE,
      sender: process.env.PIN4SMS_SENDER_ID,
      number: mobile,
      sms: "Buy2Get2, B4G5, Suit & Blazer @50% Extra GV +++++++ on Bill Rs.4999 Get Rs.500 & Rs.7999 Get Rs.1000 Upto 31-01-26 Louis Philippe Outlet Kattur Trichy 9840099934 T&C Apply CHINNAMMAL ENTERPRISES",
      templateid: process.env.PIN4SMS_TEMPLATE_ID,
    };

    const url = "https://site.ping4sms.com/api/smsapi?" + qs.stringify(params);

    const resp = await axios.get(url);
    console.log(resp)

    // if (resp.data.includes("error") || resp.data.includes("invalid")) {
    //   throw new Error("SMS Gateway Error: " + resp.data);
    // }

    console.log("SMS sent to:", mobile);
    return true;

  } catch (err) {
    console.error("SMS sending error:", err.message);
    throw new Error("SMS sending failed");
  }
};

module.exports = sendSMS;
