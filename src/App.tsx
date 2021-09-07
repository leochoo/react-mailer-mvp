import React, { useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import "@fontsource/roboto";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  ButtonGroup,
  Button,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import SendIcon from "@material-ui/icons/Send";
import axios, { AxiosError } from "axios";
import { ErrorRounded } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(3),
        width: "25ch",
      },
    },
    input: {
      color: "#FFFFFF",
    },
    formControl: {
      margin: theme.spacing(1),
      width: "100%",
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

const callSendemailAPI = async (emailField?: String) => {
  try {
    const response = await axios.post("http://localhost:5000/send_email", {
      emailAddress: emailField,
    });
    console.log("response:", response);
    return response.status.toString();
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log("err:", err);
      console.log("err response:", err.response);
      if (err.response) {
        return err.response.status.toString();
      }
    }
  }
};

function App() {
  const classes = useStyles();
  // const [emailField, setEmailField] = useState("Put Your Email");
  const nameInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const messageInput = useRef<HTMLInputElement>(null);

  const [emailStatus, setEmailStatus] = useState("");

  useEffect(() => {}, []);

  return (
    <div className={classes.root}>
      <body className="App-body">
        <div>Interview Email System</div>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="sender-inputlabel-id">FROM</InputLabel>
          <Select
            labelId="sender-inputlabel-id"
            id="sender-select-id"
            label="sender-select-label"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>sender-1</MenuItem>
            <MenuItem value={20}>sender-2</MenuItem>
            <MenuItem value={30}>sender-3</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="template-inputlabel-id">Template</InputLabel>
          <Select
            labelId="template-inputlabel-id"
            id="template-select-id"
            label="template-select-label"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>template-1</MenuItem>
            <MenuItem value={20}>template-2</MenuItem>
            <MenuItem value={30}>template-3</MenuItem>
          </Select>
        </FormControl>
        <TextField
          inputRef={nameInput}
          color="primary"
          label="Applicant Name"
          placeholder="Name"
          InputProps={{
            className: classes.input,
          }}
          variant="outlined"
        ></TextField>
        <TextField
          inputRef={nameInput}
          color="primary"
          label="UUID"
          placeholder="UUID"
          InputProps={{
            className: classes.input,
          }}
          variant="outlined"
        ></TextField>
        <TextField
          inputRef={emailInput}
          color="primary"
          label="TO"
          defaultValue="Email"
          InputProps={{
            className: classes.input,
          }}
          variant="outlined"
        ></TextField>
        <TextField
          inputRef={messageInput}
          color="primary"
          placeholder="Message"
          multiline
          rows={14}
          InputProps={{
            className: classes.input,
          }}
          variant="outlined"
        ></TextField>

        <ButtonGroup variant="contained" size="large">
          <Button
            onClick={() => {
              console.log("running");
              callSendemailAPI(emailInput.current?.value).then((res) => {
                if (res !== "201") {
                  setEmailStatus("Failed to POST " + res);
                } else {
                  setEmailStatus("SENT! Post successful " + res);
                }
              });
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
      </body>
    </div>
  );
}

export default App;
