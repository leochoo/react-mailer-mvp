import React, { useEffect, useRef, useState } from "react";

import ReactDOM from "react-dom";
// import Select from "react-select";
import { Link as RouterLink } from "react-router-dom";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import Input from "@material-ui/core/Input";
import {
  Button,
  Box,
  Grid,
  TextField,
  Container,
  MenuItem,
  IconButton,
  Link,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import axios, { AxiosError } from "axios";
import useStyles from "./SendEmailPage.styles";

const App = (): JSX.Element => {
  const [emailStatus, setEmailStatus] = useState("");
  const [numApplicants, setNumApplicants] = useState(0);

  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      from: "leochootest@gmail.com",
      template: "d-c606695e3a4f430d9755b3fb5b4801bc",
      applicantArray: [
        {
          applicantName: "",
          applicantEmail: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "applicantArray", // unique name for your Field Array
    // keyName: "id", default to "id", you can change the key name
  });

  const handleAppend = () => {
    append({
      applicantName: "appended name",
      applicantEmail: "appended email",
    });
  };

  const handleRemove = () => {
    remove(fields.length - 1);
  };

  const callSendemailAPI = async (data: formData) => {
    console.log(JSON.stringify(data));
    try {
      const response = await axios.post("http://localhost:5000/send_email", {
        fromEmail: data.from,
        templateId: data.template,
        applicantArray: data.applicantArray,
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

  interface formData {
    from: string;
    template: string;
    applicantArray: {
      applicantName: string;
      applicantEmail: string;
    }[];
  }

  const onSubmit = handleSubmit((data) => {
    callSendemailAPI(data).then((res) => {
      if (res !== "201") {
        setEmailStatus("Failed to POST " + res);
      } else {
        setEmailStatus("SENT! Post successful " + res);
      }
    });
  });

  useEffect(() => {
    setNumApplicants(fields.length);
  }, [fields]);

  //log when numApplicant chnages
  useEffect(() => {
    console.log("numApplicants: ", numApplicants);
  }, [numApplicants]);

  const styles = useStyles();

  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid item></Grid>
      <Grid item xs={12}>
        <Typography variant="h3" align="center">
          Email New Applicants
        </Typography>
      </Grid>
      <form onSubmit={onSubmit} className={styles.form}>
        <Grid xs={12} item>
          <label className={styles.label}>FROM</label>
          <Controller
            as={
              <TextField select variant="standard" fullWidth>
                <MenuItem value={"leochootest@gmail.com"}>
                  leochootest@gmail.com
                </MenuItem>
                <MenuItem value={"leochootest@gmail.com"}>
                  leochootest@gmail.com
                </MenuItem>
              </TextField>
            }
            name="from"
            control={control}
            className={styles.Input}
          />
        </Grid>
        <Grid xs={12} item>
          <label className={styles.label}>TEMPLATE</label>
          <Controller
            as={
              <TextField select variant="standard" fullWidth>
                <MenuItem value={"d-c606695e3a4f430d9755b3fb5b4801bc"}>
                  Wings Template
                </MenuItem>
                <MenuItem value={"d-c606695e3a4f430d9755b3fb5b4801bc"}>
                  Wings Template copy
                </MenuItem>
              </TextField>
            }
            name="template"
            control={control}
            className={styles.Input}
          />
        </Grid>
        {
          // render warning if numApplicant more than 2
          numApplicants >= 2 && (
            <Grid xs={12} item>
              <Alert severity="warning">
                <b>同じメールアドレスに複数のメール</b>
                を送ると、<b>最初のメールだけ</b>送信されます。<br></br>
                <b>ONLY the first email</b> will be sent, if you send multiple
                emails to the <b>same address</b>.
              </Alert>
            </Grid>
          )
        }
        {fields.map((field, index) => (
          <Grid
            xs={12}
            sm={12}
            md={12}
            container
            item
            spacing={1}
            key={field.id}
          >
            <Grid xs={12} sm={6} md={6} item>
              <label className={styles.label}>Applicant Name</label>
              <TextField
                name={`applicantArray[${index}].applicantName`}
                inputRef={register()}
                placeholder="Name"
                fullWidth
              />
              {/* <Controller
                as={Input}
                name={`applicantArray[${index}].name`}
                control={control}
                defaultValue=""
                className={styles.Input}
              /> */}
            </Grid>
            <Grid xs={12} sm={6} md={6} item>
              <label className={styles.label}>Applicant Email</label>
              <TextField
                name={`applicantArray[${index}].applicantEmail`}
                inputRef={register()}
                placeholder="Email"
                fullWidth
              />
              {/* <Controller
                as={Input}
                name={`applicantArray[${index}].email`}
                control={control}
                defaultValue=""
                className={styles.Input}
              /> */}
            </Grid>
          </Grid>
        ))}

        <Grid container item justifyContent="center">
          <IconButton onClick={handleAppend} data-testid="append-button">
            <AddCircleOutlineIcon fontSize="large" />
          </IconButton>
          <IconButton onClick={handleRemove} data-testid="remove-button">
            <RemoveCircleOutlineIcon fontSize="large" />
          </IconButton>
        </Grid>
        <Grid container item justifyContent="center">
          <Button type="submit" variant="contained" color="secondary">
            SUBMIT
          </Button>
        </Grid>
        <Grid container item justifyContent="center">
          Email Status: {emailStatus}
        </Grid>
      </form>
    </Grid>
  );
};

export default App;
