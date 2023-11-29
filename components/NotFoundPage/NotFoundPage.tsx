import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import darkWorriedChoosy from "../../public/darkWorriedChoosy.png";
import lightShadowWorriedChoosy from "../../public/lightShadowWorriedChoosy.png";
import styles from "./NotFoundPage.module.scss";

function NotFoundPage() {
  const router = useRouter();

  const theme = useTheme();

  return (
    <Box
      component="main"
      className={`${styles.notFoundPage} ${
        theme.palette.mode === "dark"
          ? styles["notFoundPage--dark"]
          : styles["notFoundPage--light"]
      }`}
    >
      <Box component="section" className={styles.notFoundPage__infoContainer}>
        <Box
          component="article"
          className={styles.notFoundPage__infoChoosyContainer}
        >
          <Box
            component="article"
            className={styles.notFoundPage__infoChoosyImageContainer}
          >
            <Image
              src={
                theme.palette.mode === "dark"
                  ? lightShadowWorriedChoosy.src
                  : darkWorriedChoosy.src
              }
              alt="Choosy (logo)"
              title="Choosy (logo)"
              fill
              sizes="5rem"
              style={{
                objectFit: "contain",
              }}
            />
          </Box>
          <Typography
            variant="body3"
            sx={{ color: "primary.main" }}
            className={`${styles.notFoundPage__infoChoosyBubble} ${
              theme.palette.mode === "dark"
                ? styles["notFoundPage__infoChoosyBubble--dark"]
                : styles["notFoundPage__infoChoosyBubble--light"]
            }`}
          >
            Ups!
          </Typography>
        </Box>

        <Typography
          variant="body3"
          sx={{ color: "primary.light" }}
          className={styles.notFoundPage__infoParagraph}
        >
          Parece que no encuentro la página que buscas
        </Typography>
      </Box>

      <Box component="section" className={styles.notFoundPage__buttonContainer}>
        <Link href={"/"}>
          <Button
            variant="outlined"
            color="secondary"
            className={styles.notFoundPage__buttonHomePage}
          >
            Volver a la página principal
          </Button>
        </Link>
        <Button
          onClick={() => router.back()}
          variant="outlined"
          color="secondary"
          className={styles.notFoundPage__buttonBack}
        >
          Volver atrás
        </Button>
      </Box>
    </Box>
  );
}

export { NotFoundPage };
