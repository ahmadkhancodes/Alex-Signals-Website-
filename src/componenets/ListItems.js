import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";
import TocIcon from "@mui/icons-material/Toc";
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
  </React.Fragment>
);
