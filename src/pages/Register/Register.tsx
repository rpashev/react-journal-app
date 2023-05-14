import {
  Button,
  Grid,
  TextField,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Container } from "@mui/system";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useContext, useState } from "react";
import Spinner from "../../components/UI/Spinner";
import AuthContext from "../../context/user-context";
import api from "../../services/api";
import useInput from "../../hooks/use-input";
import { validateEmail } from "../../utils/validations";
import SnackbarContext from "../../context/snackbar-context";

export interface RegisterInputState {
  email: string;
  password: string;
  repeatPassword?: string;
  firstName: string;
  lastName: string;
}

const Register = () => {
  const context = useContext(AuthContext);
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
  const {
    value: repeatPassword,
    hasError: repeatPasswordError,
    isValid: repeatPasswordIsValid,
    valueChangeHandler: repeatPasswordChangeHandler,
    inputBlurHandler: repeatPasswordBlurHandler,
  } = useInput((value) => (value.length < 6 ? false : true));
  const {
    value: firstName,
    hasError: firstNameError,
    isValid: firstNameIsValid,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
  } = useInput((value) => value.length > 0);
  const {
    value: lastName,
    hasError: lastNameError,
    isValid: lastNameIsValid,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
  } = useInput((value) => value.length > 0);

  const formIsValid =
    firstNameIsValid &&
    lastNameIsValid &&
    passwordIsValid &&
    emailIsValid &&
    password == repeatPassword;

  const { isError, error, isLoading, mutate } = useMutation<
    any,
    AxiosError,
    RegisterInputState
  >(api.register, {
    onSuccess: (res) => {
      context.login(res.data.token, res.data.userId);
      snackbarContext.showMessage("You registered successfully!");
    },
  });

  const showEmailError = emailError || (isLoading && !emailIsValid);
  const showPasswordError = passwordError || (isLoading && !passwordIsValid);
  const showFirstNameError = firstNameError || (isLoading && !firstNameIsValid);
  const showLastNameError = lastNameError || (isLoading && !lastNameIsValid);
  const showRepeatPasswordError =
    repeatPasswordError ||
    (isLoading && !repeatPasswordIsValid) ||
    (password !== repeatPassword && repeatPassword);

  let errorContent: any;
  if (isError && error) {
    let err: any = error.response?.data;
    errorContent = err?.message || "Could not register!";
  }

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate({ password, repeatPassword, firstName, lastName, email });
  };

  return (
    <Container>
      <Typography
        variant="h4"
        component="h2"
        color="secondary"
        sx={{ textAlign: "center", marginTop: 5, marginBottom: 3 }}
      >
        REGISTER
      </Typography>
      <form
        onSubmit={submitHandler}
        style={{ maxWidth: "20rem", margin: "0 auto" }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              onChange={firstNameChangeHandler}
              onBlur={firstNameBlurHandler}
              fullWidth
              label="First Name"
              variant="outlined"
              color="secondary"
              name="firstName"
              required
              type="text"
            />
            {showFirstNameError && (
              <Alert severity="error">First name is required!</Alert>
            )}
          </Grid>

          <Grid item xs={12}>
            <TextField
              onChange={lastNameChangeHandler}
              onBlur={lastNameBlurHandler}
              fullWidth
              type="text"
              label="Last Name"
              variant="outlined"
              color="secondary"
              name="lastName"
              required
            />
            {showLastNameError && (
              <Alert severity="error">Last name is required!</Alert>
            )}
          </Grid>
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
          <Grid item xs={12}>
            <TextField
              onChange={repeatPasswordChangeHandler}
              onBlur={repeatPasswordBlurHandler}
              fullWidth
              type="password"
              label="Confirm Password"
              variant="outlined"
              color="secondary"
              name="repeatPassword"
              required
            />
            {showRepeatPasswordError && (
              <Alert severity="error">Passwords should match!</Alert>
            )}
          </Grid>
          {!isLoading && (
            <Grid item xs={12} md={5}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="secondary"
                disabled={!formIsValid}
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
export default Register;
