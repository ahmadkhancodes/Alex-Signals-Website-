import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Button from "@mui/material/Button";
import { dataActions } from "../store/data-slice";
import { useDispatch, useSelector } from "react-redux";
import { set, ref } from "firebase/database";
import { db } from "../firebase";

export default function UpdateInputForm({ data }) {
  var DATA_FROM_STORE = useSelector((state) => state.data.allData);
  const dispatch = useDispatch();
  const id = data && data.id;
  const [alignment, setAlignment] = React.useState();
  const [alignment2, setAlignment2] = React.useState();
  //Form Data states
  const [selected, setSelected] = React.useState(data && data.action);
  const [selected2, setSelected2] = React.useState(data && data.isactive);
  const [instrument, setInstrument] = React.useState(data && data.instrument);
  const [openprice, setOpenprice] = React.useState(data && data.openprice);
  const [closeprice, setCloseprice] = React.useState(data && data.closeprice);
  const [profit, setProfit] = React.useState(data && data.profit);
  const [takeprofit, setTakeprofit] = React.useState(data && data.takeprofit);
  const [stoploss, setStoploss] = React.useState(data && data.stoploss);
  const [odat, setOdat] = React.useState(data && data.odat);
  const [cdat, setCdat] = React.useState(data && data.cdat);
  const [rfip, setRfip] = React.useState(data && data.rfip);

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const setActiveOrClose = (input) => {
    setSelected2(input);
    if (input === "active") {
      setOdat(new Date());
      setCdat("");
    }
    if (input === "closed") {
      setCdat(new Date());
    }
  };
  const handleAlignment2 = (event, newAlignment) => {
    setAlignment2(newAlignment);
  };

  const handleSubmit = async () => {
    const data = DATA_FROM_STORE.find((item) => item.id === id);
    data["action"] = selected;
    data["instrument"] = instrument;
    data["isactive"] = selected2;
    data["open_price"] = openprice;
    data["close_price"] = closeprice;
    data["profit"] = profit;
    data["take_profit"] = takeprofit;
    data["open_date_and_time"] = String(odat);
    data["close_date_and_time"] = String(cdat);
    data["risk_factor_in_points"] = rfip;
    data["stop_loss"] = stoploss;
    dispatch(dataActions.setAllData(DATA_FROM_STORE));
  };

  React.useEffect(() => {
    // Storing Data into Firebase
    set(ref(db, "/data"), {
      DATA_FROM_STORE,
    });
  }, [DATA_FROM_STORE]);

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
            UPDATE SIGNAL
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
              onClick={() => setActiveOrClose("active")}
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
              onClick={() => setActiveOrClose("closed")}
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
        <Grid item xs={12} sm={12}>
          <Typography style={{ color: "grey" }}>OPEN DATE AND TIME</Typography>
        </Grid>
        <Grid item xs={12} sm={12} style={{ marginTop: -45 }}>
          <TextField
            id="odat"
            name="odat"
            value={odat}
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
            value={cdat}
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
            value={rfip}
            onChange={(e) => setRfip(e.target.value)}
            label="RISK FACTOR IN POINTS"
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
          Update
        </Button>
      </Grid>
    </React.Fragment>
  );
}
