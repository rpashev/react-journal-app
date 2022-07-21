import { Button, Grid, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import { useState } from "react";

interface InputState {
  email: string;
  password: string;
}

const Login = () => {
  const [inputs, setInputs] = useState<InputState>({
    email: "",
    password: "",
  });

  const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (inputs.email && inputs.password) {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}auth/login`, { ...inputs })
        .then((res) => console.log(res));
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
              label="Password"
              variant="outlined"
              color="secondary"
              name="password"
              required
            />
          </Grid>
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
        </Grid>
      </form>
    </Container>
  );
};
export default Login;
