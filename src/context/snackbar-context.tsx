import { createContext, useState } from "react";

interface SnackbarContext {
  openSnackbar: boolean;
  snackbarMessage: string;
  severitySnackbar: string;
  showMessage: (message: string, severity?: string) => void;
  closeSnackbar: () => void;
}

const SnackbarContext = createContext<SnackbarContext>({
  openSnackbar: false,
  snackbarMessage: "",
  severitySnackbar: "success",
  showMessage: (message: string, severity?: string): void => {},
  closeSnackbar: (): void => {},
});

type Props = {
  children: React.ReactNode;
};

export const SnackbarContextProvider = (props: Props) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severitySnackbar, setSeveritySnackbar] = useState("success");

  const showMessage = (message: string, severity = "success") => {
    setSnackbarMessage(message);
    setSeveritySnackbar(severity);
    setOpenSnackbar(true);
  };

  const closeSnackbar = () => {
    setOpenSnackbar(false);
    setSnackbarMessage("");
  };

  const contextValue: SnackbarContext = {
    openSnackbar,
    snackbarMessage,
    severitySnackbar,
    showMessage,
    closeSnackbar,
  };

  return (
    <SnackbarContext.Provider value={contextValue}>
      {props.children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarContext;
