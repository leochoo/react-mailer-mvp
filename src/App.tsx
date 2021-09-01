import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import "@fontsource/roboto";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { ButtonGroup, Button, FormControl, TextField } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(3),
        width: "25ch",
      },
    },
  })
);

require("dotenv").config({ path: ".env" });

const sendNodemail = (emailField: String) => {
  var nodemailer = require("nodemailer");

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.TEST_USER,
      pass: process.env.TEST_PASS,
    },
  });

  var mailOptions = {
    from: emailField,
    to: "leochootest@gmail.com",
    subject: "React MUI Nodemailer",
    text: "That was easy!",
  };

  transporter.sendMail(mailOptions, function (error: any, info: any) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

function App() {
  const classes = useStyles();

  const [emailField, setEmailField] = useState("Put Your Email");

  return (
    <div className={classes.root}>
      <header className="App-header">
        <TextField defaultValue={emailField} color="primary"></TextField>
        <ButtonGroup variant="contained" size="large">
          <Button
            onClick={() => sendNodemail(emailField)}
            color="primary"
            startIcon={<SendIcon />}
          >
            SEND
          </Button>
          <Button color="secondary" startIcon={<DeleteIcon />}>
            DISCARD
          </Button>
        </ButtonGroup>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
