import Snackbar from "@mui/material/Snackbar";
import Grow, { GrowProps } from "@mui/material/Grow";
import MuiAlert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

interface AlertProps {
  alertMsg: string;
  handleCloseAlert: () => void;
  open: boolean;
}

function GrowTransition(props: GrowProps) {
  return <Grow {...props} />;
}

function Alert({ alertMsg, handleCloseAlert, open }: AlertProps) {
  return (
    <Snackbar
      open={open}
      onClose={handleCloseAlert}
      TransitionComponent={GrowTransition}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      autoHideDuration={150000}
    >
      <MuiAlert
        variant="filled"
        severity="error"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          "& .MuiAlert-icon": {
            fontSize: "2rem",
          },
          "& .MuiAlert-message": {
            display: "flex",
            alignItems: "center",
            gap: "0.3rem",
          },
        }}
      >
        {alertMsg}

        <IconButton
          onClick={handleCloseAlert}
          aria-label="cerrar el alert"
          size="small"
          color="inherit"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </MuiAlert>
    </Snackbar>
  );
}

export { Alert };
