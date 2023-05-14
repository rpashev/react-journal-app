import { Alert, Snackbar } from "@mui/material";
import React, { useContext } from "react";
import SnackbarContext from "../../context/snackbar-context";

const SnackbarMessage = () => {
  const snackbarContext = useContext(SnackbarContext);

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={snackbarContext.openSnackbar}
      onClose={snackbarContext.closeSnackbar}
      autoHideDuration={4000}
    >
      <Alert
        onClose={snackbarContext.closeSnackbar}
        severity={snackbarContext.severitySnackbar as any}
        sx={{ width: "100%" }}
      >
        {snackbarContext.snackbarMessage}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarMessage;
