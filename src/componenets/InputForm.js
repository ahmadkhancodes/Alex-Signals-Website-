import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Button from "@mui/material/Button";

export default function InputForm() {
  const [alignment, setAlignment] = React.useState();
  const [alignment2, setAlignment2] = React.useState();
  const [selected, setSelected] = React.useState();
  const [selected2, setSelected2] = React.useState();
  const [date, setDate] = React.useState();

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const handleAlignment2 = (event, newAlignment) => {
    setDate(new Date());
    setAlignment2(newAlignment);
  };

  return (
    <React.Fragment>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={12} lg={12} style={{ width: "100%" }}>
          <Typography
            sx={{ flexGrow: 1 }}
            style={{
              marginBottom: -20,
              fontWeight: "bold",
              fontSize: 25,
              textAlign: "center",
              color: "grey",
            }}
          >
            ADD A SIGNAL
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} lg={12} style={{ width: "100%" }}>
          <ToggleButtonGroup
            size="small"
            style={{
              display: "flex",
            }}
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
          >
            <ToggleButton
              size="small"
              onClick={() => setSelected("buy")}
              value="buy"
              aria-label="left aligned"
              style={{
                backgroundColor: selected === "buy" ? "blue" : "white",
                borderWidth: 2,
                borderRight: 0,
                borderColor: "blue",
                borderRightColor:
                  selected === "buy"
                    ? "blue"
                    : selected === "sell"
                    ? "red"
                    : "grey",
                width: "50%",
              }}
            >
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                BUY
              </Typography>
            </ToggleButton>
            <ToggleButton
              size="small"
              onClick={() => setSelected("sell")}
              value="sell"
              aria-label="centered"
              style={{
                backgroundColor: selected === "sell" ? "red" : "white",
                borderWidth: 2,
                borderColor: "red",
                borderLeftColor:
                  selected === "buy"
                    ? "blue"
                    : selected === "sell"
                    ? "red"
                    : "grey",
                width: "50%",
              }}
            >
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                SELL
              </Typography>
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={12} sm={12} lg={12}>
          <TextField
            id="instrument"
            name="instrument"
            label="INSTRUMENT"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={12} lg={12} style={{ width: "100%" }}>
          <ToggleButtonGroup
            size="small"
            style={{
              display: "flex",
            }}
            value={alignment2}
            exclusive
            onChange={handleAlignment2}
            aria-label="text alignment"
          >
            <ToggleButton
              size="small"
              onClick={() => setSelected2("active")}
              value="active"
              aria-label="left aligned"
              style={{
                backgroundColor: selected2 === "active" ? "#cfae0a" : "white",
                borderWidth: 2,
                width: "50%",
              }}
            >
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                ACTIVE
              </Typography>
            </ToggleButton>
            <ToggleButton
              size="small"
              onClick={() => setSelected2("closed")}
              value="closed"
              aria-label="centered"
              style={{
                backgroundColor: selected2 === "closed" ? "grey" : "white",
                borderWidth: 2,
                width: "50%",
              }}
            >
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                Closed
              </Typography>
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="openprice"
            name="openprice"
            label="OPEN PRICE"
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="closeprice"
            name="closeprice"
            label="CLOSE PRICE"
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="profit"
            name="profit"
            label="PROFIT"
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="takeprofit"
            name="takeprofit"
            label="TAKE PROFIT"
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="stoploss"
            name="stoploss"
            label="STOP LOSS"
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography style={{ color: "grey" }}>OPEN DATE AND TIME</Typography>
        </Grid>
        <Grid item xs={12} sm={12} style={{ marginTop: -45 }}>
          <TextField
            id="odat"
            name="odat"
            value={date}
            disabled={true}
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography style={{ color: "grey" }}>CLOSE DATE AND TIME</Typography>
        </Grid>
        <Grid item xs={12} sm={12} style={{ marginTop: -45 }}>
          <TextField
            id="cdat"
            name="cdat"
            value={date}
            disabled={true}
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="rfip"
            name="rfip"
            label="RISK FACTOR IN POINTS"
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid xs={12} sm={12} lg={12} style={{ marginTop: 50 }}>
          <Button
            style={{ width: "45%", marginLeft: 50, fontSize: 15 }}
            variant="contained"
          >
            Save
          </Button>
          <Button
            style={{ width: "45%", marginLeft: 5, fontSize: 15 }}
            variant="contained"
          >
            Save and Publish
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}