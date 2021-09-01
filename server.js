const express = require("express"); //Line 1
var cors = require("cors");
const app = express(); //Line 2
const port = 5000; //Line 3

require("dotenv").config({ path: ".env" });

const sendNodemail = () => {
  var nodemailer = require("nodemailer");

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.TEST_USER,
      pass: process.env.TEST_PASS,
    },
  });

  var mailOptions = {
    from: process.env.TEST_USER,
    to: process.env.TEST_USER,
    subject: "React MUI Nodemailer",
    text: "That was easy!",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return { message: "Failed" };
    } else {
      console.log("Email sent: " + info.response);
      return { message: "OK" };
    }
  });

  return { message: "OK" };
};

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

app.use(cors());
// create a GET route
app.get("/express_backend", (req, res) => {
  //Line 9
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" }); //Line 10
}); //Line 11

app.get("/send_email", (req, res) => {
  res.send(sendNodemail());
});
