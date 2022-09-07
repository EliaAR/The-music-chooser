import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import styles from "./ErrorComponent.module.scss";

interface FailComponentProps {
  message: string;
}

function ErrorComponent({ message }: FailComponentProps) {
  return (
    <Box
      component="section"
      sx={{ backgroundColor: "background.paper" }}
      className={styles.failComponent}
    >
      <AnnouncementIcon sx={{ height: 45, width: 45 }} />
      <Typography
        variant="body1"
        component="p"
        sx={{ fontWeight: 500 }}
        className={styles.failComponent__paragraph}
      >
        {message}
      </Typography>
    </Box>
  );
}

export { ErrorComponent };
