import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { alertActions } from "../../redux/store/alert-slice";
import "./AlertPopup.css";

const AlertPopup = () => {
  const hasError = useSelector((state) => state.alert.hasError);
  const message = useSelector((state) => state.alert.alertMessage);
  const alertOpen = useSelector((state) => state.alert.alertOpen);
  const dispatch = useDispatch();
  return (
    <div className="alert">
      <Snackbar
        open={alertOpen}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => dispatch(alertActions.closeAlert())}
        autoHideDuration={3000}
      >
        <Alert
          elevation={6}
          variant="filled"
          severity={hasError ? "error" : "success"}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AlertPopup;
