import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://alexsignals.netlify.app/">
        Alex Signals Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInPage() {
  const [forgotButton, setForgotButton] = React.useState(false);
  const [error, setError] = React.useState(false);
  const navigate = useNavigate();
  const { login, resetPassword } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      await login(data.get("email"), data.get("password"));
      navigate("/dashboard");
    } catch {
      setError(true);
      console.log("Failed to Log In");
    }
  };

  const handleForget = async (event) => {
    event.preventDefault();
    try {
      setForgotButton(true);
      await resetPassword("ahmadkhan.cui@gmail.com");
    } catch {
      console.log("Failed to Reset Password");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Welcome Alex, please Sign In
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Stack
                style={{ display: error ? "" : "none" }}
                sx={{ width: "100%" }}
                spacing={2}
              >
                <Alert severity="error">
                  <AlertTitle>Alex, These details are invalid ☹️</AlertTitle>
                  Remember, your email is{" "}
                  <strong>ahmadkhan.cui@gmail.com</strong>
                  <br />
                  If you lost your password, just click on{" "}
                  <strong>Forgot Password</strong> below
                </Alert>
              </Stack>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Let me In!
              </Button>
              <Grid container>
                <Grid item xs>
                  <Button disabled={forgotButton} onClick={handleForget}>
                    Forgot password?
                  </Button>
                </Grid>
              </Grid>
              <Grid style={{ display: forgotButton ? "" : "none" }} container>
                <Grid item xs>
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="success">
                      <AlertTitle>Success 😀</AlertTitle>
                      Password reset Instructions successfully sent on{" "}
                      <strong>ahmadkhan.cui@gmail.com</strong>
                    </Alert>
                  </Stack>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
