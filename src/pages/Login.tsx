import { Button, Grid, TextField, Typography, Alert } from "@mui/material";
import { Container } from "@mui/system";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useContext } from "react";
import Spinner from "../components/UI/Spinner";
import AuthContext from "../context/user-context";
import api from "../services/api";
import { validateEmail } from "../utils/validations";
import useInput from "../hooks/use-input";
import SnackbarContext from "../context/snackbar-context";

export interface LoginInputState {
  email: string;
  password: string;
}

const Login = () => {
  const snackbarContext = useContext(SnackbarContext);

  const {
    value: email,
    hasError: emailError,
    isValid: emailIsValid,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(validateEmail);

  const {
    value: password,
    hasError: passwordError,
    isValid: passwordIsValid,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput((value) => (value.length < 6 ? false : true));

  const context = useContext(AuthContext);

  const { isError, error, isLoading, mutate } = useMutation<
    any,
    AxiosError,
    LoginInputState
  >(api.login, {
    onSuccess: (res) => {
      context.login(res.data.token, res.data.userId);
      snackbarContext.showMessage("You logged in successfully!");
    },
  });

  const showEmailError = emailError || (isLoading && !emailIsValid);
  const showPasswordError = passwordError || (isLoading && !passwordIsValid);

  let errorContent: any;
  if (isError && error) {
    let err: any = error.response?.data;
    errorContent = err?.message || "Could not login!";
  }

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate({ email, password });
  };

  return (
    <Container>
      <Typography
        variant="h4"
        component="h2"
        color="secondary"
        sx={{ textAlign: "center", marginTop: 5, marginBottom: 3 }}
      >
        LOGIN
      </Typography>
      <form
        onSubmit={submitHandler}
        style={{ maxWidth: "20rem", margin: "0 auto" }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              fullWidth
              label="Email"
              variant="outlined"
              color="secondary"
              name="email"
              required
              type="email"
            />
            {showEmailError && (
              <Alert severity="error">Please enter a valid email!</Alert>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              fullWidth
              type="password"
              label="Password"
              variant="outlined"
              color="secondary"
              name="password"
              required
            />
            {showPasswordError && (
              <Alert severity="error">
                Password should be at least 6 symbols!
              </Alert>
            )}
          </Grid>
          {!isLoading && (
            <Grid item xs={12} md={5}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="secondary"
                disabled={!emailIsValid || !passwordIsValid}
              >
                Login
              </Button>
            </Grid>
          )}

          {isLoading && (
            <Grid item xs={12}>
              <Spinner />
            </Grid>
          )}
          {isError && (
            <Grid item xs={12}>
              <Alert severity="error">{errorContent}</Alert>
            </Grid>
          )}
        </Grid>
      </form>
    </Container>
  );
};
export default Login;
