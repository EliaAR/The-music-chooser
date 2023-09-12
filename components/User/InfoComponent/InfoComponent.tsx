import Box from "@mui/material/Box";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import styles from "./InfoComponent.module.scss";

function InfoComponent() {
  return (
    <Box
      component="section"
      sx={{
        boxShadow: 3,
        backgroundColor: "background.paper",
      }}
      className={styles.infoComponent}
    >
      <InfoOutlinedIcon
        sx={{ color: "error.main" }}
        className={styles.infoComponent__icon}
      />

      <Box component="article" className={styles.infoComponent__infoContainer}>
        <Divider orientation="vertical" flexItem />

        <Typography
          variant="body1"
          sx={{ color: "text.secondary" }}
          className={styles.infoComponent__infoParagraph}
        >
          Las votaciones se han cerrado
        </Typography>
      </Box>
    </Box>
  );
}

export { InfoComponent };
