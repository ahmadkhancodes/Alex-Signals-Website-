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

export default function LegalComponent() {
  const dispatch = useDispatch();
  var data = useSelector((state) => state.data.legal);
  const [GDPR, setGDPR] = React.useState(data.GDPR ? data.GDPR : "");
  const [CCPA, setCCPA] = React.useState(data.CCPA ? data.CCPA : "");
  const [PECR, setPECR] = React.useState(data.PECR ? data.PECR : "");
  const [PIPEDA, setPIPEDA] = React.useState(data.PIPEDA ? data.PIPEDA : "");
  const [AUSTRALIA, setAUSTRALIA] = React.useState(
    data.AUSTRALIA ? data.AUSTRALIA : ""
  );
  const [tos, setTOS] = React.useState(data.tos ? data.tos : "");
  const [pp, setPP] = React.useState(data.pp ? data.pp : "");
  const [infringement, setInfringement] = React.useState(
    data.infringement ? data.infringement : ""
  );
  const [donations, setDonations] = React.useState(
    data.donations ? data.donations : ""
  );
  const [cookie, setCookie] = React.useState(data.cookie ? data.cookie : "");
  const [edit, setEdit] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    setEdit(!edit);
    handleClose();
    var obj = {
      GDPR: GDPR,
      CCPA: CCPA,
      PECR: PECR,
      PIPEDA: PIPEDA,
      AUSTRALIA: AUSTRALIA,
      tos: tos,
      pp: pp,
      infringement: infringement,
      donations: donations,
      cookie: cookie,
    };
    // console.log(obj);
    dispatch(dataActions.setLegal(obj));
    dispatch(dataActions.saveLegalToFirebase());
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
          LEGAL SECTION
        </Typography>
        <Grid item xs={12} sm={12} lg={12}>
          <TextField
            id="GDPR"
            name="GDPR"
            value={GDPR}
            onChange={(e) => setGDPR(e.target.value)}
            disabled={edit}
            fullWidth
            multiline
            rows={5}
            label="GDPR (EUROPE - General Data Protection Regulation)"
            style={{ marginTop: 30 }}
          />
        </Grid>
        <Grid item xs={12} sm={12} lg={12}>
          <TextField
            id="CCPA"
            name="CCPA"
            value={CCPA}
            onChange={(e) => setCCPA(e.target.value)}
            disabled={edit}
            fullWidth
            multiline
            rows={5}
            label="CCPA (CALIFORNIA - Consumer Privacy Act of 2018)"
            style={{ marginTop: 10 }}
          />
        </Grid>
        <Grid item xs={12} sm={12} lg={12}>
          <TextField
            id="PECR"
            name="PECR"
            value={PECR}
            onChange={(e) => setPECR(e.target.value)}
            disabled={edit}
            fullWidth
            multiline
            rows={5}
            label="PECR (AMERICA - the Privacy and Electronic Communications Regulations)"
            style={{ marginTop: 10 }}
          />
        </Grid>
        <Grid item xs={12} sm={12} lg={12}>
          <TextField
            id="PIPEDA"
            name="PIPEDA"
            value={PIPEDA}
            onChange={(e) => setPIPEDA(e.target.value)}
            disabled={edit}
            fullWidth
            multiline
            rows={5}
            label="PIPEDA (CANADA - Personal Information Protection and Electronic Documents Act)"
            style={{ marginTop: 10 }}
          />
        </Grid>
        <Grid item xs={12} sm={12} lg={12}>
          <TextField
            id="AUSTRALIA"
            name="AUSTRALIA"
            value={AUSTRALIA}
            onChange={(e) => setAUSTRALIA(e.target.value)}
            disabled={edit}
            fullWidth
            multiline
            rows={5}
            label=" Australia's Privacy Act - (AUSTRALIA)"
            style={{ marginTop: 10 }}
          />
        </Grid>
        <Grid item xs={12} sm={12} lg={12}>
          <TextField
            id="tos"
            name="tos"
            value={tos}
            onChange={(e) => setTOS(e.target.value)}
            disabled={edit}
            fullWidth
            multiline
            rows={5}
            label="Terms and Conditions or Terms of Service"
            style={{ marginTop: 10 }}
          />
        </Grid>
        <Grid item xs={12} sm={12} lg={12}>
          <TextField
            id="pp"
            name="pp"
            value={pp}
            onChange={(e) => setPP(e.target.value)}
            disabled={edit}
            fullWidth
            multiline
            rows={5}
            label="Privacy Policy"
            style={{ marginTop: 10 }}
          />
        </Grid>
        <Grid item xs={12} sm={12} lg={12}>
          <TextField
            id="infringement"
            name="infringement"
            value={infringement}
            onChange={(e) => setInfringement(e.target.value)}
            disabled={edit}
            fullWidth
            multiline
            rows={5}
            label="Copyright Infringement Notice (Intellectual Property Policy)"
            style={{ marginTop: 10 }}
          />
        </Grid>
        <Grid item xs={12} sm={12} lg={12}>
          <TextField
            id="donations"
            name="donations"
            value={donations}
            onChange={(e) => setDonations(e.target.value)}
            disabled={edit}
            fullWidth
            multiline
            rows={5}
            label="Donations, Refund, Return (no refund)"
            style={{ marginTop: 10 }}
          />
        </Grid>
        <Grid item xs={12} sm={12} lg={12}>
          <TextField
            id="cookie"
            name="cookie"
            value={cookie}
            onChange={(e) => setCookie(e.target.value)}
            disabled={edit}
            fullWidth
            multiline
            rows={5}
            label="Cookie banner information"
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
            {`Are you sure you want to Publish these Legal Details to Mobile App ?`}
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
