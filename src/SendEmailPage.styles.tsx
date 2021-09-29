import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      width: "80%",
      maxWidth: "800px",
      margin: "0 auto",
      marginBottom: "400px",
    },
    Input: {
      display: "block",
      boxSizing: "border-box",
      width: "100%",
      borderRadius: "4px",
      marginBottom: "10px",
      fontSize: "14px",
    },

    label: {
      lineHeight: "2",
      textAlign: "left",
      display: "block",
      marginBottom: "13px",
      marginTop: "20px",
      fontSize: "14px",
      fontWeight: 500,
    },
  })
);

export default useStyles;
