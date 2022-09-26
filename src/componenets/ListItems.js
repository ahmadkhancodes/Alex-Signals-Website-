import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";
import TocIcon from "@mui/icons-material/Toc";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import InfoIcon from "@mui/icons-material/Info";
import DescriptionIcon from "@mui/icons-material/Description";
import InterestsIcon from "@mui/icons-material/Interests";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import { Link } from "react-router-dom";

export const mainListItems = (
  <React.Fragment>
    <Link to="/dashboard" style={{ color: "grey", textDecoration: "none" }}>
      <ListItemButton>
        <ListItemIcon>
          <NotificationAddIcon />
        </ListItemIcon>
        <ListItemText primary="Add New Signal" />
      </ListItemButton>
    </Link>
    <Link
      to="/tableofcontent"
      style={{ color: "grey", textDecoration: "none" }}
    >
      <ListItemButton>
        <ListItemIcon>
          <TocIcon />
        </ListItemIcon>
        <ListItemText primary="Table of Contents" />
      </ListItemButton>
    </Link>
    <Link to="/disclaimer" style={{ color: "grey", textDecoration: "none" }}>
      <ListItemButton>
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary="Disclaimer" />
      </ListItemButton>
    </Link>
    <Link to="/donation" style={{ color: "grey", textDecoration: "none" }}>
      <ListItemButton>
        <ListItemIcon>
          <VolunteerActivismIcon />
        </ListItemIcon>
        <ListItemText primary="Donation" />
      </ListItemButton>
    </Link>
    <Link to="/social" style={{ color: "grey", textDecoration: "none" }}>
      <ListItemButton>
        <ListItemIcon>
          <InterestsIcon />
        </ListItemIcon>
        <ListItemText primary="Social" />
      </ListItemButton>
    </Link>
    <Link to="/legal" style={{ color: "grey", textDecoration: "none" }}>
      <ListItemButton>
        <ListItemIcon>
          <DescriptionIcon />
        </ListItemIcon>
        <ListItemText primary="Legal" />
      </ListItemButton>
    </Link>
    <Link to="/stat" style={{ color: "grey", textDecoration: "none" }}>
      <ListItemButton>
        <ListItemIcon>
          <AutoGraphIcon />
        </ListItemIcon>
        <ListItemText primary="Statistics" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);
