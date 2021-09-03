import React, { useEffect, useState } from "react";
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

const callBackendAPI = async () => {
  const response = await fetch("http://localhost:5000/express_backend");
  const body = await response.json();

  if (response.status !== 200) {
    throw Error(body.message);
  }
  return body;
};

const callSendemailAPI = async () => {
  const response = await fetch("http://localhost:5000/send_email");
  console.log("response:", response);
  // if (response.status !== 200) {
  //   throw Error();
  // }
  return response.status.toString();
};

function App() {
  const classes = useStyles();
  const [emailField, setEmailField] = useState("Put Your Email");
  const [apiState, setApiState] = useState("calling...");
  const [emailStatus, setEmailStatus] = useState("");

  useEffect(() => {
    callBackendAPI()
      // .then((res) => setApiState({ data: res.express}:{res.express: String}))
      .then((res) => setApiState(res.express))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={classes.root}>
      <header className="App-header">
        <div>{apiState}</div>
        <TextField defaultValue={emailField} color="primary"></TextField>
        <ButtonGroup variant="contained" size="large">
          <Button
            onClick={() => {
              console.log("running");
              callSendemailAPI().then((res) => {
                setEmailStatus(res);
              });
              // .catch((err) => console.log(err));
            }}
            color="primary"
            startIcon={<SendIcon />}
          >
            SEND
          </Button>
          <Button color="secondary" startIcon={<DeleteIcon />}>
            DISCARD
          </Button>
        </ButtonGroup>
        <div>Email Status: {emailStatus}</div>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
