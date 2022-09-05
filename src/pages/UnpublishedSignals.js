import React, { useEffect, useState } from "react";
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

const UnPublishedSignalsComponent = () => {
  var data = useSelector((state) => state.data.allData);
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div>
      {data
        .filter((item) => item.close_price === "")
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
                }}
              >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  {item.action?.toString().toUpperCase()}
                </Typography>
                <Typography sx={{ color: "black" }}>
                  {item.instrument?.toString().toUpperCase()}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid
                  style={{
                    display: "flex",
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
                <Grid
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    backgroundColor: "grey",
                    padding: 10,
                  }}
                >
                  <Typography color="white">Close Price</Typography>
                  <Typography color="white">
                    {item.close_price?.toString().toUpperCase()}
                  </Typography>
                </Grid>
                <Line />
                <Grid
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    backgroundColor: "grey",
                    padding: 10,
                  }}
                >
                  <Typography color="white">Profit</Typography>
                  <Typography color="white">
                    {item.profit?.toString().toUpperCase()}
                  </Typography>
                </Grid>
                <Grid
                  style={{
                    display: "flex",
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
                <Line color="black" />
                <Grid
                  style={{
                    display: "flex",
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
                <Grid
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    backgroundColor: "#080200",
                    padding: 10,
                  }}
                >
                  <Typography color="white">Open Time</Typography>
                  <Typography color="white" style={{ textAlign: "end" }}>
                    {item.open_date_and_time}
                  </Typography>
                </Grid>
                <Line />
                <Grid
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    backgroundColor: "#080200",
                    padding: 10,
                  }}
                >
                  <Typography color="white">Close Time</Typography>
                  <Typography color="white" style={{ textAlign: "end" }}>
                    {item.close_date_and_time}
                  </Typography>
                </Grid>
                <Line />
                <Grid
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    backgroundColor: "grey",
                    padding: 10,
                  }}
                >
                  <Typography color="white">Risk factor in points</Typography>
                  <Typography color="white">
                    {item.risk_factor_in_points}
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
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    style={{ width: "32%" }}
                  >
                    Duplicate
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    style={{ width: "32%" }}
                    // onClick={() => deleteData(item.id)}
                  >
                    Delete
                  </Button>
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Line />
          </>
        ))}
    </div>
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
