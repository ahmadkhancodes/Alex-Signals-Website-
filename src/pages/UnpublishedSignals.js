import React from "react";
import DashboardComponent from "../componenets/DashboardComponent";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Grid } from "@mui/material";
import Line from "../componenets/Line";
import { useSelector, useDispatch } from "react-redux";
import { dataActions } from "../store/data-slice";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

const UnPublishedSignalsComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  var data = useSelector((state) => state.data.allData);
  const [open, setOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const getData = (id) => {
    var newItem = {};
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        newItem = { ...data[i] };
      }
    }
    return newItem;
  };

  function diff_hours(dt2) {
    if (dt2 === "") {
      return "";
    }
    dt2 = new Date(dt2);
    var dt1 = new Date();
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60 * 60;
    return Math.abs(Math.round(diff));
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteData = (item) => {
    var dataCopy = [...data];
    dataCopy.splice(dataCopy.indexOf(item), 1);
    dispatch(dataActions.setAllData(dataCopy));
    dispatch(dataActions.saveToFirebase());
  };

  const duplicateData = (id) => {
    var newItem = {};
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        newItem = { ...data[i] };
      }
    }
    newItem["id"] = Date.now();
    console.log(newItem);
    var dataCopy = [...data];
    dataCopy.push(newItem);
    dispatch(dataActions.setAllData(dataCopy));
    dispatch(dataActions.saveToFirebase());
  };
  var count = 1;
  return (
    <Grid container spacing={1}>
      {data
        .filter(
          (item) =>
            item.close_price === "" ||
            item.instrument === "" ||
            item.isactive === "" ||
            item.open_price === "" ||
            item.close_price === "" ||
            item.stop_loss === "" ||
            item.profit === "" ||
            item.take_profit === "" ||
            item.open_date_and_time === "" ||
            item.risk_factor_in_points === "" ||
            item.recommended_leverage === ""
        )
        .map((item) => (
          <>
            <Accordion
              expanded={expanded === item.id}
              onChange={handleChange(item.id)}
              style={{ width: 533 }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                style={{
                  backgroundColor:
                    item.action?.toString() === "buy" ? "green" : "red",
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "space-evenly",
                }}
              >
                <Typography
                  sx={{ width: "33%", flexShrink: 0, color: "white" }}
                >
                  {count}) {item.action?.toString().toUpperCase()}
                </Typography>
                <Typography sx={{ color: "white", width: "33%" }}>
                  {item.instrument?.toString().toUpperCase()}
                </Typography>
                <Typography
                  sx={{
                    color: "white",
                    paddingLeft: 2,
                    display: item.isactive === "closed" ? "" : "none",
                    flexShrink: 0,
                    width: "33%",
                  }}
                >
                  {item.isactive?.toString().toUpperCase()}
                </Typography>
                <Typography
                  sx={{
                    color: "black",
                    backgroundColor: "#f0bf0e",
                    display: item.isactive === "active" ? "" : "none",
                    flexShrink: 0,
                    width: "22%",
                    textAlign: "center",
                  }}
                >
                  {item.isactive?.toString().toUpperCase()}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid
                  style={{
                    display: item.open_price === "" ? "none" : "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 10,
                  }}
                >
                  <Typography>Open Price</Typography>
                  <Typography>
                    {item.open_price?.toString().toUpperCase()}
                  </Typography>
                </Grid>
                <Line display={item.stop_loss === "" ? "none" : ""} />
                <Grid
                  style={{
                    display: item.stop_loss === "" ? "none" : "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 10,
                  }}
                >
                  <Typography>Stop Loss</Typography>
                  <Typography>
                    {item.stop_loss?.toString().toUpperCase()}
                  </Typography>
                </Grid>
                <Line display={item.take_profit === "" ? "none" : ""} />
                <Grid
                  style={{
                    display: item.take_profit === "" ? "none" : "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 10,
                  }}
                >
                  <Typography>Take Profit</Typography>
                  <Typography>
                    {item.take_profit?.toString().toUpperCase()}
                  </Typography>
                </Grid>
                <Grid
                  style={{
                    display:
                      item.risk_factor_in_points === "" ? "none" : "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    backgroundColor: "#c23e06",
                    padding: 10,
                  }}
                >
                  <Typography color="black">Risk factor in points</Typography>
                  <Typography color="black">
                    {item.risk_factor_in_points}
                  </Typography>
                </Grid>
                <Line
                  display={item.risk_factor_in_points === "" ? "none" : ""}
                />
                <Grid
                  style={{
                    display:
                      item.risk_factor_in_points === "" ? "none" : "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    backgroundColor: "#c23e06",
                    padding: 10,
                  }}
                >
                  <Typography color="black">Recommended Leverage</Typography>
                  <Typography color="black">
                    {item.recommended_leverage}
                  </Typography>
                </Grid>
                <Grid
                  style={{
                    display: item.close_price === "" ? "none" : "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 10,
                  }}
                >
                  <Typography color="black">Close Price</Typography>
                  <Typography color="black">
                    {item.close_price?.toString().toUpperCase()}
                  </Typography>
                </Grid>
                <Line display={item.profit === "" ? "none" : ""} />
                <Grid
                  style={{
                    display: item.profit === "" ? "none" : "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 10,
                  }}
                >
                  <Typography color="black">Profit</Typography>
                  <Typography color="black">
                    {item.profit?.toString().toUpperCase()}
                  </Typography>
                </Grid>
                <Grid
                  style={{
                    display:
                      item.open_date_and_time === "" ||
                      item.open_date_and_time === "undefined"
                        ? "none"
                        : "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    backgroundColor: "grey",
                    padding: 10,
                  }}
                >
                  <Typography color="white">Open Time</Typography>
                  <Typography color="white" style={{ textAlign: "end" }}>
                    {diff_hours(item.open_date_and_time)} hours ago <br />
                    {item.open_date_and_time.slice(0, 33)}
                  </Typography>
                </Grid>
                <Line display={item.close_date_and_time === "" ? "none" : ""} />
                <Grid
                  style={{
                    display:
                      item.close_date_and_time === "undefined" ||
                      item.close_date_and_time === ""
                        ? "none"
                        : "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    backgroundColor: "grey",
                    padding: 10,
                  }}
                >
                  <Typography color="white">Close Time</Typography>
                  <Typography color="white" style={{ textAlign: "end" }}>
                    {diff_hours(item.close_date_and_time)} hours ago <br />
                    {item.close_date_and_time.slice(0, 33)}
                  </Typography>
                </Grid>
                <Grid
                  style={{
                    marginTop: 10,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    variant="contained"
                    color="info"
                    style={{ width: "32%" }}
                    onClick={() =>
                      navigate("/updatedata", { state: getData(item.id) })
                    }
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    style={{ width: "32%" }}
                    onClick={() => duplicateData(item.id)}
                  >
                    Duplicate
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    style={{ width: "32%" }}
                    onClick={() => handleClickOpen()}
                  >
                    Delete
                  </Button>
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Line />
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {`Are you sure you want to delete ${item.instrument}?`}
              </DialogTitle>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={() => deleteData(item)} autoFocus>
                  Confirm Delete
                </Button>
              </DialogActions>
            </Dialog>
          </>
        ))}
    </Grid>
  );
};

function UnpublishedSignals() {
  return (
    <>
      <DashboardComponent Component={UnPublishedSignalsComponent} />
    </>
  );
}

export default UnpublishedSignals;
