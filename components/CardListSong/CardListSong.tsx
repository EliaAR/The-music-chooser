import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import Divider from "@mui/material/Divider";
import styles from "./CardListSong.module.scss";

interface CardListSongProps {
  name: string;
}

function CardListSong({ name }: CardListSongProps) {
  return (
    <Box>
      <Box
        sx={{ backgroundColor: "background.default" }}
        component="section"
        className={styles.cardListSong}
      >
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          {name}
        </Typography>
        <IconButton aria-label="play">
          <PlayArrowRoundedIcon
            sx={{ height: 38, width: 38 }}
            color="success"
          />
        </IconButton>
      </Box>
      <Divider />
    </Box>
  );
}

export { CardListSong };
