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

export interface LoginInputState {
  email: string;
  password: string;
}

const Login = () => {
  const [inputs, setInputs] = useState<LoginInputState>({
    email: "",
    password: "",
  });

  const context = useContext(AuthContext);

  const { isError, error, isLoading, mutate } = useMutation<
    any,
    AxiosError,
    LoginInputState
  >(api.login, {
    onSuccess: (res) => {
      context.login(res.data.token, res.data.userId);
    },
  });

  let errorContent: any;
  if (isError && error) {
    let err: any = error.response?.data;
    errorContent = err?.message || "Could not login!";
  }

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputs.email && inputs.password) {
      mutate(inputs);
      console.log(inputs);
    }
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
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
              onChange={changeHandler}
              fullWidth
              label="Email"
              variant="outlined"
              color="secondary"
              name="email"
              required
              type="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={changeHandler}
              fullWidth
              type="password"
              label="Password"
              variant="outlined"
              color="secondary"
              name="password"
              required
            />
          </Grid>
          {!isLoading && (
            <Grid item xs={12} md={5}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="secondary"
                disabled={!inputs.email || !inputs.password}
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
