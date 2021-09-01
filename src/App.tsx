import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "@fontsource/roboto";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { ButtonGroup, Button, FormControl, TextField } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
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

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <header className="App-header">
        <TextField defaultValue="Put your email" color="primary"></TextField>
        <ButtonGroup variant="contained" size="large">
          <Button color="primary" startIcon={<SendIcon />}>
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
