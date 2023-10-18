import Image from "next/image";
import Box from "@mui/material/Box";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import styles from "./CoverImg.module.scss";

interface CoverImgProps {
  isBigCover: boolean;
  img: string;
  name: string;
  sizes: string;
}

function CoverImg({ isBigCover, img, name, sizes }: CoverImgProps) {
  return (
    <Box
      component="article"
      className={`${styles.coverImg} ${
        isBigCover ? styles["coverImg--big"] : styles["coverImg--small"]
      }`}
    >
      {img ? (
        <Image
          src={img}
          alt={name}
          title={name}
          fill
          sizes={sizes}
          priority={true}
          style={{
            objectFit: "contain",
          }}
        />
      ) : (
        <Box className={styles.coverImg__iconContainer}>
          <WallpaperIcon
            sx={{ color: "background.paper" }}
            className={`${
              isBigCover
                ? styles["coverImg__icon--big"]
                : styles["coverImg__icon--small"]
            }`}
          />
        </Box>
      )}
    </Box>
  );
}

export { CoverImg };
