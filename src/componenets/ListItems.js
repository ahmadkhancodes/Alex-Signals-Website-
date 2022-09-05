import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
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
      to="/publishedsignals"
      style={{ color: "grey", textDecoration: "none" }}
    >
      <ListItemButton>
        <ListItemIcon>
          <PublishedWithChangesIcon />
        </ListItemIcon>
        <ListItemText primary="Published Signals" />
      </ListItemButton>
    </Link>
    <Link
      to="/unpublishedsignals"
      style={{ color: "grey", textDecoration: "none" }}
    >
      <ListItemButton>
        <ListItemIcon>
          <UnpublishedIcon />
        </ListItemIcon>
        <ListItemText primary="Unpublished Signals" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);
