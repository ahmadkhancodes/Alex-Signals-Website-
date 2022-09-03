import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import UnpublishedIcon from "@mui/icons-material/Unpublished";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <NotificationAddIcon />
      </ListItemIcon>
      <ListItemText primary="Add New Signal" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PublishedWithChangesIcon />
      </ListItemIcon>
      <ListItemText primary="Published Signals" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <UnpublishedIcon />
      </ListItemIcon>
      <ListItemText primary="Unpublished Signals" />
    </ListItemButton>
  </React.Fragment>
);
