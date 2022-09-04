import React, { useEffect, useState } from "react";
import DashboardComponent from "../componenets/DashboardComponent";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Grid } from "@mui/material";
import Line from "../componenets/Line";

const PublishedSignalsComponent = () => {
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [data, setData] = useState([]);
  const dataCollectionRef = collection(db, "data");

  useEffect(() => {
    const getData = async () => {
      const data = await getDocs(dataCollectionRef);
      setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getData();
  }, [dataCollectionRef]);
  return (
    <div>
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
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                {item.action.toString().toUpperCase()}
              </Typography>
              <Typography sx={{ color: "black" }}>
                {item.instrument.toString().toUpperCase()}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Line color={"grey"} />
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
                  {item.open_price.toString().toUpperCase()}
                </Typography>
              </Grid>
              <Line color={"white"} />
              <Grid
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  backgroundColor: "grey",
                  padding: 10,
                }}
              >
                <Typography>Close Price</Typography>
                <Typography>
                  {item.close_price.toString().toUpperCase()}
                </Typography>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </>
      ))}
    </div>
  );
};

function PublishedSignals() {
  return (
    <>
      <DashboardComponent Component={PublishedSignalsComponent} />
    </>
  );
}

export default PublishedSignals;
