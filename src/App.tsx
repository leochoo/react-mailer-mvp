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
  Grid,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import SendIcon from "@material-ui/icons/Send";
import axios, { AxiosError } from "axios";
import { ErrorRounded } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        // margin: theme.spacing(3),
        // width: "25ch",
      },
    },
    input: {
      // color: "#FFFFFF",
    },
    formControl: {
      // margin: theme.spacing(1),
      // width: "100%",
    },
    selectEmpty: {
      // marginTop: theme.spacing(2),
    },
  })
);

const callSendemailAPI = async (
  emailField?: String,
  nameField?: String,
  templateId?: String
) => {
  try {
    const response = await axios.post("http://localhost:5000/send_email", {
      emailAddress: emailField,
      name: nameField,
      templateId: templateId,
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

// set handlechange event value to templateID state

function App() {
  const classes = useStyles();
  // const [emailField, setEmailField] = useState("Put Your Email");
  // const fromInput = useRef<HTMLInputElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const templateIdInput = useRef<HTMLInputElement>(null);
  const [templateId, setTemplateId] = useState<String>("");
  console.log("first render templateId:", templateId);
  const [emailStatus, setEmailStatus] = useState("");

  const handleChange = (event: any) => {
    console.log("handleChange templateId:", templateId);
    setTemplateId(event.target.value as string);
  };

  useEffect(() => {}, []);

  function ApplicantRow() {
    return (
      <React.Fragment>
        <Grid xs={12} sm={6} md={6} item>
          <TextField
            inputRef={nameInput}
            color="primary"
            label="Applicant Name"
            placeholder="Applicant Name"
            InputProps={{
              className: classes.input,
            }}
            variant="outlined"
            fullWidth
          ></TextField>
        </Grid>

        <Grid xs={12} sm={6} md={6} item>
          {" "}
          <TextField
            inputRef={emailInput}
            color="primary"
            label="Applicant Email"
            InputProps={{
              className: classes.input,
            }}
            variant="outlined"
            fullWidth
          ></TextField>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root}>
      <div className="App-body">
        <Typography gutterBottom variant="h3" align="center">
          Interview Email System
        </Typography>
        <Grid>
          <Card style={{ padding: "20px 5px", margin: "0 auto" }}>
            <CardContent>
              <Typography gutterBottom variant="h5">
                Contact Us
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                gutterBottom
              >
                Fill up the form and our team will get back to you within 24
                hours.
              </Typography>
              <Grid container spacing={1}>
                <Grid xs={12} item>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                    fullWidth
                  >
                    <InputLabel id="sender-inputlabel-id">FROM</InputLabel>
                    <Select
                      labelId="sender-inputlabel-id"
                      id="sender-select-id"
                      label="sender-select-label"
                      defaultValue={"leochootest@gmail.com"}
                    >
                      <MenuItem value={"leochootest@gmail.com"}>
                        leochootest@gmail.com
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid xs={12} item>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                    fullWidth
                  >
                    <InputLabel id="template-inputlabel-id">
                      Template
                    </InputLabel>
                    <Select
                      labelId="template-inputlabel-id"
                      id="template-select-id"
                      label="template-select-label"
                      defaultValue={"d-c606695e3a4f430d9755b3fb5b4801bc"}
                      // onChange={handleChange}
                      inputRef={templateIdInput}
                    >
                      <MenuItem value={"d-c606695e3a4f430d9755b3fb5b4801bc"}>
                        Wings Template
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid
                  xs={12}
                  sm={12}
                  md={12}
                  container
                  item
                  // spacing={1}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="stretch"
                >
                  {/* TODO: Need to dynamically generate this on a need basis */}
                  <ApplicantRow />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <ButtonGroup variant="contained" size="large">
          <Button
            onClick={() => {
              console.log("running");
              callSendemailAPI(
                emailInput.current?.value,
                nameInput.current?.value,
                templateId
              ).then((res) => {
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
      </div>
    </div>
  );
}

export default App;
