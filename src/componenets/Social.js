import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

export default function Social() {
  const [fbpagelink, setFbPageLink] = React.useState();
  const [fbgrouplink, setFbGroupLink] = React.useState();
  const [instgramlink, setInstagramLink] = React.useState();
  const [twitterlink, setTwitterLink] = React.useState();
  const [edit, setEdit] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    setEdit(!edit);
    handleClose();
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
          SOCIAL ACCOUNT LINKS
        </Typography>
        <Grid item xs={12} sm={12} lg={12}>
          <TextField
            id="fbpagelink"
            name="fbpagelink"
            value={fbpagelink}
            onChange={(e) => setFbPageLink(e.target.value)}
            disabled={edit}
            fullWidth
            multiline
            rows={1}
            label="Facebook Page Link"
            style={{ marginTop: 30 }}
          />
        </Grid>
        <Grid item xs={12} sm={12} lg={12}>
          <TextField
            id="fbgrouplink"
            name="fbgrouplink"
            value={fbgrouplink}
            onChange={(e) => setFbGroupLink(e.target.value)}
            disabled={edit}
            fullWidth
            multiline
            rows={1}
            label="Facebook Group Link"
            style={{ marginTop: 10 }}
          />
        </Grid>
        <Grid item xs={12} sm={12} lg={12}>
          <TextField
            id="instgramlink"
            name="instgramlink"
            value={instgramlink}
            onChange={(e) => setInstagramLink(e.target.value)}
            disabled={edit}
            fullWidth
            multiline
            rows={1}
            label="Instagram Link"
            style={{ marginTop: 10 }}
          />
        </Grid>
        <Grid item xs={12} sm={12} lg={12}>
          <TextField
            id="twitterlink"
            name="twitterlink"
            value={twitterlink}
            onChange={(e) => setTwitterLink(e.target.value)}
            disabled={edit}
            fullWidth
            multiline
            rows={1}
            label="Twitter Link"
            style={{ marginTop: 10 }}
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
            {`Are you sure you want to Publish these Social Media Links to Mobile App ?`}
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
