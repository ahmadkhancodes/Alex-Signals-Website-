import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
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
import Copyright from "../componenets/Copyright";

const theme = createTheme();

export default function ForgetPassword() {
  const [forgotButton, setForgotButton] = React.useState(false);
  const [error, setError] = React.useState(false);
  const navigate = useNavigate();
  const { resetPassword } = useAuth();

  const handleForget = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("email") !== "alex85excel@gmail.com") {
      setError(true);
      return;
    }
    try {
      setForgotButton(true);
      setError(false);
      await resetPassword("alex85excel@gmail.com");
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
              Forget Password
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleForget}
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
              <Button
                disabled={forgotButton}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Send me Email
              </Button>
              <Button
                onClick={() => navigate("/")}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Back to Login
              </Button>
              <Grid style={{ display: forgotButton ? "" : "none" }} container>
                <Grid item xs>
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="success">
                      <AlertTitle>Success 😀</AlertTitle>
                      Password reset Instructions successfully sent on your
                      email
                    </Alert>
                  </Stack>
                </Grid>
              </Grid>

              <Grid style={{ display: error ? "" : "none" }} container>
                <Grid item xs>
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">
                      <AlertTitle>Failed ☹️</AlertTitle>
                      Please enter the Valid Email.
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
