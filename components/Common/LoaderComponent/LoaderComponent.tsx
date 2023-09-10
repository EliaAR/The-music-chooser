import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "./LoaderComponent.module.scss";

function LoaderComponent() {
  return (
    <Box
      component="main"
      sx={{ backgroundColor: "background.default" }}
      className={styles.loaderComponent}
    >
      <Box
        component="article"
        className={styles.loaderComponent__loaderContainer}
      >
        <CircularProgress
          variant="indeterminate"
          className={styles.loaderComponent__loaderIcon}
        />
      </Box>
    </Box>
  );
}

export { LoaderComponent };
