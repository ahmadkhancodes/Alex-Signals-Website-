import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { dataActions } from "../store/data-slice";
import { useNavigate } from "react-router-dom";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export default function InputForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [alignment, setAlignment] = React.useState();
  const [alignment2, setAlignment2] = React.useState();
  //Form Data states
  const [selected, setSelected] = React.useState();
  const [selected2, setSelected2] = React.useState();
  const [instrument, setInstrument] = React.useState("");
  const [openprice, setOpenprice] = React.useState("");
  const [closeprice, setCloseprice] = React.useState("");
  const [profit, setProfit] = React.useState("");
  const [takeprofit, setTakeprofit] = React.useState("");
  const [stoploss, setStoploss] = React.useState("");
  const [odat, setOdat] = React.useState("");
  const [cdat, setCdat] = React.useState("");
  const [rfip, setRfip] = React.useState("");
  const [rl, setRl] = React.useState("");
  const [odat_issued, setOdat_issued] = React.useState("");
  const [cdat_issued, setCdat_issued] = React.useState("");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const handleAlignment2 = (event, newAlignment) => {
    setAlignment2(newAlignment);
  };

  const setOdat_func = (input) => {
    setOdat(input);
    setOdat_issued(new Date());
  };

  const setCdat_func = (input) => {
    setCdat(input);
    setCdat_issued(new Date());
  };
  const setActive = (input) => {
    setSelected2(input);
    setCdat();
    setCdat_issued();
  };
  const handleSubmit = async () => {
    dispatch(
      dataActions.addData({
        id: Date.now(),
        action: selected,
        instrument: instrument,
        isactive: selected2,
        open_price: openprice,
        close_price: closeprice,
        profit: profit,
        take_profit: takeprofit,
        open_date_and_time: String(odat),
        close_date_and_time: String(cdat),
        risk_factor_in_points: rfip,
        stop_loss: stoploss,
        recommended_leverage: rl,
        odat_issued: odat_issued,
        cdat_issued: cdat_issued,
      })
    );
    dispatch(dataActions.saveToFirebase());
    navigate("/tableofcontent");
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
            value={instrument}
            onChange={(e) => setInstrument(e.target.value)}
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
              onClick={() => setActive("active")}
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
            value={openprice}
            onChange={(e) => setOpenprice(e.target.value)}
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
            value={closeprice}
            onChange={(e) => setCloseprice(e.target.value)}
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
            value={profit}
            onChange={(e) => setProfit(e.target.value)}
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
            value={takeprofit}
            onChange={(e) => setTakeprofit(e.target.value)}
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
            value={stoploss}
            onChange={(e) => setStoploss(e.target.value)}
            label="STOP LOSS"
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <Typography style={{ color: "grey", marginBottom: 15 }}>
            OPEN DATE AND TIME
          </Typography>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Typography style={{ color: "grey" }}>CLOSE DATE AND TIME</Typography>
        </Grid>
        <Grid item xs={6} sm={6} style={{ marginTop: -45 }}>
          <DateTimePicker
            id="odat"
            name="odat"
            value={odat}
            onChange={(value) => setOdat_func(value)}
            renderInput={(params) => <TextField {...params} />}
          />
        </Grid>
        <Grid item xs={6} sm={6} style={{ marginTop: -45 }}>
          <DateTimePicker
            disabled={selected2 === "closed" ? false : true}
            id="cdat"
            name="cdat"
            value={cdat}
            onChange={(value) => setCdat_func(value)}
            renderInput={(params) => <TextField {...params} />}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="rfip"
            name="rfip"
            value={rfip}
            onChange={(e) => setRfip(e.target.value)}
            label="RISK FACTOR IN POINTS"
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="rl"
            name="rl"
            value={rl}
            onChange={(e) => setRl(e.target.value)}
            label="RECOMMENDED LEVERAGE"
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Button
          variant="contained"
          xs={12}
          sm={12}
          lg={12}
          style={{ marginTop: 50, textAlign: "center", width: "90%", left: 50 }}
          onClick={handleSubmit}
        >
          Save
        </Button>
      </Grid>
    </React.Fragment>
  );
}
