const express = require("express"); //Line 1
var cors = require("cors");
const app = express(); //Line 2
const port = 5000; //Line 3

require("dotenv").config({ path: ".env" });

const sendgridAPI = async () => {
  const sgMail = require("@sendgrid/mail");
  //   sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  sgMail.setApiKey(process.env.WRONG_SENDGRID_API_KEY);

  const msg = {
    to: "leochoodev@gmail.com", // Change to your recipient
    from: "leochootest@gmail.com", // Change to your verified sender
    templateId: "d-43903e12c5a241959a1f60bb52564a59",
    dynamicTemplateData: {
      subject: "Testing Templates",
      name: "Some One",
      city: "Denver",
    },
  };

  try {
    const response = await sgMail.send(msg);
    return JSON.stringify(response[0].statusCode);
  } catch (err) {
    return err.code;
  }
};
/*
const sendgridAPI2 = new Promise((resolve, reject) => {
  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  sgMail.setApiKey(process.env.WRONG_SENDGRID_API_KEY);

  const msg = {
    to: "leochoodev@gmail.com", // Change to your recipient
    from: "leochootest@gmail.com", // Change to your verified sender
    templateId: "d-43903e12c5a241959a1f60bb52564a59",
    dynamicTemplateData: {
      subject: "Testing Templates",
      name: "Some One",
      city: "Denver",
    },
  };

  var result = "";

  sgMail
    .send(msg)
    .then((response) => {
      console.log(response);
      result += JSON.stringify(response[0].statusCode);
      resolve(result);
    })
    .catch((error) => {
      console.error("Error", error.code);
      //   console.log(error.code);
      result += error.code;
      reject(error.code);
    });

  //   return result;
});
*/
// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(cors());

// create a GET route
app.get("/express_backend", (req, res) => {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});

app.get("/send_email", async (req, res) => {
  const statusCode = await sendgridAPI();
  res.sendStatus(statusCode);
});
