import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector, useDispatch } from "react-redux";
import { dataActions } from "../store/data-slice";

export default function Disclaimer() {
  const dispatch = useDispatch();
  var text = useSelector((state) => state.data.disclaimer);
  const [disclaimer, setDisclaimer] = React.useState(text);
  const [edit, setEdit] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    setEdit(!edit);
    handleClose();
    dispatch(dataActions.setDisclaimer(disclaimer));
    dispatch(dataActions.saveDisclaimerToFirebase());
  };
  const handleEdit = () => {
    if (edit) {
      setEdit(false);
    } else {
      setOpen(true);
    }
  };
  return (
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
          DISCLAIMER
        </Typography>
        <Grid item xs={12} sm={12} lg={12}>
          <TextField
            id="disclaimer"
            name="disclaimer"
            value={disclaimer}
            onChange={(e) => setDisclaimer(e.target.value)}
            disabled={edit}
            fullWidth
            multiline
            rows={12}
            style={{ marginTop: 30 }}
          />
        </Grid>
        <Button
          variant="contained"
          xs={12}
          sm={12}
          lg={12}
          style={{ width: "100%", marginTop: 10 }}
          onClick={() => handleEdit()}
        >
          {!edit ? "Save" : "Edit"}
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {`Are you sure you want to Publish this Disclaimer to Mobile App ?`}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} autoFocus>
              Yes Publish
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  );
}
