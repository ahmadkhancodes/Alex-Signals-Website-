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
  const [openP, setOpenP] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const addZero = (d) => {
    if (String(d).length === 1) {
      return `0${d}`;
    }
    return d;
  };

  // const diff_hours = (dt2) => {
  //   if (dt2 === "") {
  //     return "";
  //   }
  //   var dateNow = new Date();
  //   dt2 = new Date(dt2);
  //   var seconds = Math.floor((dateNow - dt2) / 1000);
  //   var minutes = Math.floor(seconds / 60);
  //   var hours = Math.floor(minutes / 60);
  //   var days = Math.floor(hours / 24);

  //   hours = hours - days * 24;
  //   minutes = minutes - days * 24 * 60 - hours * 60;
  //   seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;
  //   return (
  //     addZero(hours) +
  //     "hours " +
  //     addZero(minutes) +
  //     "mins " +
  //     addZero(seconds) +
  //     "sec ago"
  //   );
  // };

  const getData = (id) => {
    var newItem = {};
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        newItem = { ...data[i] };
      }
    }
    return newItem;
  };

  // function diff_hours(dt2) {
  //   if (dt2 === "") {
  //     return "";
  //   }
  //   dt2 = new Date(dt2);
  //   var dt1 = new Date();
  //   var diff = (dt2.getTime() - dt1.getTime()) / 1000;
  //   diff /= 60 * 60;
  //   console.log(Math.abs(Math.round(diff)));
  //   return Math.abs(Math.round(diff));
  // }
  const [index, setIndex] = React.useState(0);
  const handleClickOpen = (id) => {
    setIndex(id);
    setOpen(true);
  };
  const [index2, setIndex2] = React.useState(0);
  const handleClickOpen2 = (id) => {
    setIndex2(id);
    setOpenP(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseP = () => {
    setOpenP(false);
  };

  const publishData = (item) => {
    var notification_body = {
      title: item.instrument + " Added",
      message: "Click to see the details",
    };
    // sending notification
    (async () => {
      const rawResponse = await fetch(
        "https://trading-markets-notifications.vercel.app/sendnotification",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(notification_body),
        }
      );
      const content = await rawResponse.json();
      console.log(content);
    })();
    (async () => {
      const rawResponse = await fetch(
        "https://trading-markets-notifications.vercel.app/sendnotification",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(notification_body),
        }
      );
      const content = await rawResponse.json();
      console.log(content);
    })();
    // code end
    dispatch(dataActions.updateData({ ...item, ispublished: true }));
    dispatch(dataActions.saveToFirebase());
    handleCloseP();
  };
  const unPublishData = (item) => {
    dispatch(dataActions.updateData({ ...item, ispublished: false }));
    dispatch(dataActions.saveToFirebase());
  };

  const formatDate = (d) => {
    var date = new Date(d);
    return (
      date.getFullYear() +
      "-" +
      addZero(date.getMonth() + 1) +
      "-" +
      addZero(date.getDate()) +
      " " +
      addZero(date.getHours()) +
      ":" +
      addZero(date.getMinutes()) +
      ":" +
      addZero(date.getSeconds())
    );
  };

  const deleteData = (item) => {
    var dataCopy = [...data];
    dataCopy.splice(dataCopy.indexOf(item), 1);
    dispatch(dataActions.setAllData(dataCopy));
    dispatch(dataActions.saveToFirebase());
    handleClose();
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
      {data.map((item) => (
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
              <Typography sx={{ width: "33%", flexShrink: 0, color: "white" }}>
                {count++}) {item.action?.toString().toUpperCase()}
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
                  display: item.risk_factor_in_points === "" ? "none" : "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  backgroundColor: "black",
                  padding: 10,
                }}
              >
                <Typography color="white">Risk factor in points</Typography>
                <Typography color="white">
                  {item.risk_factor_in_points}
                </Typography>
              </Grid>
              <Line display={item.risk_factor_in_points === "" ? "none" : ""} />
              <Grid
                style={{
                  display: item.risk_factor_in_points === "" ? "none" : "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  backgroundColor: "black",
                  padding: 10,
                }}
              >
                <Typography color="white">Recommended Leverage</Typography>
                <Typography color="white">
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
                  {formatDate(item.open_date_and_time)}
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
                  {formatDate(item.close_date_and_time)}
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
                  style={{ width: "24%" }}
                  onClick={() =>
                    navigate("/updatedata", { state: getData(item.id) })
                  }
                >
                  Update
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  style={{ width: "24%" }}
                  onClick={() => duplicateData(item.id)}
                >
                  Duplicate
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  style={{ width: "24%" }}
                  onClick={() => handleClickOpen(item.id)}
                >
                  Delete
                </Button>
                <Dialog
                  open={open && index === item.id}
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
                <Button
                  disabled={item.ispublished}
                  variant="contained"
                  color="info"
                  style={{ width: "24%" }}
                  onClick={() => handleClickOpen2(item.id)}
                >
                  Publish
                </Button>
                <Dialog
                  open={openP && index2 === item.id}
                  onClose={handleCloseP}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {`Are you sure you want to publish ${item.instrument} on Mobile App ?`}
                    {`This will also send notifications`}
                  </DialogTitle>
                  <DialogActions>
                    <Button onClick={handleCloseP}>Cancel</Button>
                    <Button onClick={() => publishData(item)} autoFocus>
                      Yes Publish
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>
              <Button
                disabled={!item.ispublished}
                variant="contained"
                style={{
                  width: "100%",
                  marginTop: 10,
                  backgroundColor: !item.ispublished ? "grey" : "black",
                  color: "white",
                }}
                onClick={() => unPublishData(item)}
              >
                Unpublish from Mobile App
              </Button>
            </AccordionDetails>
          </Accordion>
          <Line />
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
