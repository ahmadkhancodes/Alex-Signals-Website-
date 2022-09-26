import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function TableComponent({ data }) {
  const lastActive = (id) => {
    if (data) {
      var temp_arr = data[id]["obj"]["appOpenActivity"];
      var last_id = "";
      Object.keys(temp_arr).map((item) => (last_id = item));
      return temp_arr[last_id]["curr_date"];
    }
  };
  return (
    <Paper
      className={{
        width: "100%",
        overflowX: "scroll",
      }}
    >
      <Table className={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="center">App Installed Date</TableCell>
            <TableCell align="center">Country</TableCell>
            <TableCell align="center">Times App Opened</TableCell>
            <TableCell align="center">Times Signals Watched</TableCell>
            <TableCell align="center">Last Active</TableCell>
            <TableCell align="center">Notifications</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            Object.keys(data).map((row) => (
              <TableRow key={data[row]["obj"]["username"]}>
                <TableCell component="th" scope="row">
                  {data[row]["obj"]["username"]}
                </TableCell>
                <TableCell align="center">
                  {data[row]["obj"]["dateInstalled"]}
                </TableCell>
                <TableCell align="center">
                  {data[row]["obj"]["location"] === "Cyprus"
                    ? "Cyprus"
                    : "Pakistan"}
                </TableCell>
                <TableCell align="center">
                  {Object.keys(data[row]["obj"]["appOpenActivity"]).length}
                </TableCell>
                <TableCell align="center">
                  {Object.keys(data[row]["obj"]["signalScreenAtivity"]).length}
                </TableCell>
                <TableCell align="center">{lastActive(row)}</TableCell>
                <TableCell align="center">
                  {data[row]["obj"]["receiveNotification"] ? "ON" : "OFF"}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
