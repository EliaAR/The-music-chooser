import Box from "@mui/material/Box";
import DangerousOutlinedIcon from "@mui/icons-material/DangerousOutlined";
import Typography from "@mui/material/Typography";
import styles from "./ErrorComponent.module.scss";

interface ErrorComponentProps {
  message: string;
}

function ErrorComponent({ message }: ErrorComponentProps) {
  return (
    <Box
      component="section"
      sx={{ backgroundColor: "background.paper", color: "error.main" }}
      className={styles.errorComponent}
    >
      <DangerousOutlinedIcon sx={{ fontSize: "2.8rem" }} />
      <Typography
        variant="body1"
        component="p"
        sx={{ fontWeight: 500 }}
        className={styles.errorComponent__paragraph}
      >
        {message}
      </Typography>
    </Box>
  );
}

export { ErrorComponent };
