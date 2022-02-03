import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import Divider from "@mui/material/Divider";
import { SongModel } from "../../types/model";
import styles from "./PlayCardSong.module.scss";

interface PlayCardSongProps {
  song: SongModel;
}

function PlayCardSong({ song }: PlayCardSongProps) {
  const theme = useTheme();

  return (
    <Card component="section" className={styles.playCardSong}>
      <Box>
        <CardContent>
          <Typography
            component="h6"
            variant="h6"
            sx={{ fontSize: 15 }}
            className={styles.playCardSong__title}
            title={song.name_song}
          >
            {song.name_song}
          </Typography>
        </CardContent>
        <Divider orientation="horizontal" variant="middle" />
        <Box className={styles.playCardSong__controlContainer}>
          <IconButton aria-label="previous">
            {theme.direction === "rtl" ? (
              <SkipNextIcon />
            ) : (
              <SkipPreviousIcon />
            )}
          </IconButton>
          <IconButton aria-label="play/pause">
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
          <IconButton aria-label="next">
            {theme.direction === "rtl" ? (
              <SkipPreviousIcon />
            ) : (
              <SkipNextIcon />
            )}
          </IconButton>
        </Box>
      </Box>
      <CardMedia
        component="img"
        image={song.img}
        alt={song.name_song}
        sx={{ height: 118 }}
      />
    </Card>
  );
}

export { PlayCardSong };
