import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LogoutIcon from "@mui/icons-material/Logout";
import { mainListItems } from "../componenets/ListItems";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Copyright from "../componenets/Copyright";
import { useSelector } from "react-redux";
import GroupIcon from "@mui/icons-material/Group";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import Table from "../componenets/Table";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

function StatisticsContent() {
  const usersData = useSelector((state) => state.data.usersData);

  const { logout } = useAuth();

  const navigate = useNavigate();

  const [totalInteraction, setTotalInteraction] = React.useState(0);
  const [totalSignalInteraction, setTotalSignalInteraction] = React.useState(0);

  const totalInteractionFunc = () => {
    if (usersData) {
      var sum = 0;
      var arr = Object.keys(usersData);
      for (let i = 0; i < arr.length; i++) {
        sum =
          sum + Object.keys(usersData[arr[i]]["obj"]["appOpenActivity"]).length;
      }
      setTotalInteraction(sum);
    }
  };
  const totalSignalInteractionFunc = () => {
    if (usersData) {
      var sum = 0;
      var arr = Object.keys(usersData);
      for (let i = 0; i < arr.length; i++) {
        sum =
          sum +
          Object.keys(usersData[arr[i]]["obj"]["signalScreenAtivity"]).length;
      }
      setTotalSignalInteraction(sum);
    }
  };

  React.useEffect(() => {
    totalInteractionFunc();
    totalSignalInteractionFunc();
  });

  async function handleLogout() {
    try {
      await logout();
      navigate("/");
    } catch {
      console.log("Failed to log out");
    }
  }
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex", width: "100%" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit" onClick={handleLogout}>
              <Badge color="secondary">
                <LogoutIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">{mainListItems}</List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container sx={{ mt: 4, mb: 4 }}>
            <Grid
              container
              style={{
                alignItems: "center",
              }}
            >
              <Grid item xs={12} lg={12}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 2,
                    width: "100%",
                  }}
                >
                  <Grid
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                    }}
                  >
                    <Paper
                      elevation={3}
                      item
                      lg={3}
                      md={3}
                      xs={12}
                      style={{
                        textAlign: "center",
                        marginBottom: 3,
                        width: 350,
                      }}
                      sx={{
                        backgroundColor: "#2074d4",
                      }}
                    >
                      <GroupIcon style={{ fontSize: 40, marginBottom: -25 }} />
                      <h3>TOTAL USERS</h3>
                      <Typography variant="h4">
                        {Object.keys(usersData).length}
                      </Typography>
                      <Typography color="text.secondary" sx={{ flex: 1 }}>
                        Last updated Just Now
                      </Typography>
                    </Paper>
                    <Paper
                      elevation={3}
                      item
                      lg={3}
                      md={3}
                      xs={12}
                      style={{
                        textAlign: "center",
                        marginBottom: 3,
                        width: 350,
                      }}
                      sx={{
                        backgroundColor: "#529C52",
                      }}
                    >
                      <GroupAddIcon
                        style={{ fontSize: 40, marginBottom: -25 }}
                      />
                      <h3>TOTAL ACTIVE USERS</h3>
                      <Typography variant="h4">
                        {Object.keys(usersData).length}
                      </Typography>
                      <Typography color="text.secondary" sx={{ flex: 1 }}>
                        Last updated Just Now
                      </Typography>
                    </Paper>
                    <Paper
                      elevation={3}
                      item
                      lg={3}
                      md={3}
                      xs={12}
                      style={{
                        textAlign: "center",
                        marginBottom: 3,
                        width: 350,
                      }}
                      sx={{
                        backgroundColor: "#7E9291",
                      }}
                    >
                      <GroupRemoveIcon
                        style={{ fontSize: 40, marginBottom: -25 }}
                      />
                      <h3>TOTAL INACTIVE USERS</h3>
                      <Typography variant="h4">{0}</Typography>
                      <Typography color="text.secondary" sx={{ flex: 1 }}>
                        Last updated Just Now
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      marginTop: 20,
                    }}
                  >
                    <Paper
                      elevation={3}
                      item
                      lg={6}
                      md={6}
                      xs={12}
                      style={{
                        marginBottom: 3,
                        width: 550,
                        paddingLeft: 20,
                      }}
                      sx={{
                        backgroundColor: "#2074d4",
                      }}
                    >
                      <AutoGraphIcon
                        style={{ fontSize: 40, marginBottom: -25 }}
                      />
                      <h3>TOTAL APP INTERACTION COUNT</h3>
                      <Typography variant="h4">{totalInteraction}</Typography>
                      <Typography color="text.secondary" sx={{ flex: 1 }}>
                        Last updated Just Now
                      </Typography>
                    </Paper>
                    <Paper
                      elevation={3}
                      item
                      lg={6}
                      md={6}
                      xs={12}
                      style={{
                        marginBottom: 3,
                        width: 550,
                        paddingLeft: 20,
                      }}
                      sx={{
                        backgroundColor: "#2074d4",
                      }}
                    >
                      <AutoGraphIcon
                        style={{ fontSize: 40, marginBottom: -25 }}
                      />
                      <h3>TOTAL SIGNALS INTERACTION COUNT</h3>
                      <Typography variant="h4">
                        {totalSignalInteraction}
                      </Typography>
                      <Typography color="text.secondary" sx={{ flex: 1 }}>
                        Last updated Just Now
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      marginTop: 20,
                    }}
                  >
                    <Paper
                      // elevation={3}
                      item
                      lg={12}
                      md={12}
                      xs={12}
                      style={{
                        marginBottom: 3,
                        width: "100%",
                        paddingLeft: 20,
                      }}
                    >
                      <h3>USER DETAILS</h3>
                      <Table data={usersData} />
                    </Paper>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Statistics() {
  return <StatisticsContent />;
}
