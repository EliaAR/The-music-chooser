import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide, { SlideProps } from "@mui/material/Slide";
import Fade from "@mui/material/Fade";
import MuiAlert from "@mui/material/Alert";

interface AlertProps {
  alertMsg: string;
  hadleCloseAlert: () => void;
  open: boolean;
}

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

function Alert({ alertMsg, hadleCloseAlert, open }: AlertProps) {
  return (
    <Snackbar
      open={open}
      onClose={hadleCloseAlert}
      TransitionComponent={open ? SlideTransition : Fade}
      key={Fade.name}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={15000}
    >
      <MuiAlert variant="filled" severity="error">
        <span>{alertMsg}</span>
        <Button
          color="secondary"
          size="small"
          onClick={hadleCloseAlert}
        ></Button>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={hadleCloseAlert}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </MuiAlert>
    </Snackbar>
  );
}

export { Alert };
