import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "./LoaderComponent.module.scss";

interface LoaderComponentProps {
  isAllViewport: boolean;
}

function LoaderComponent({ isAllViewport }: LoaderComponentProps) {
  return (
    <Box
      component="main"
      sx={{
        backgroundColor: isAllViewport
          ? "background.default"
          : "background.paper",
      }}
      className={`${styles.loaderComponent} ${
        isAllViewport
          ? styles["loaderComponent--big"]
          : styles["loaderComponent--small"]
      }`}
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
