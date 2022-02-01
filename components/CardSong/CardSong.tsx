import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import styles from "./CardSong.module.scss";
import { SongModel } from "../../types/model";
import { Box } from "@mui/material";

interface CardSongProps {
  song: SongModel;
  onClickVote: () => void;
  isVoted: boolean;
  isClosed: boolean;
}

function CardSong({ song, onClickVote, isVoted, isClosed }: CardSongProps) {
  return (
    <Card className={styles.cardSong}>
      <CardContent>
        <Typography
          variant="body1"
          component="p"
          title={song.name_song}
          className={styles.cardSong__title}
        >
          {song.name_song}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        image={song.img}
        alt={song.name_song}
        sx={{ maxHeight: 50 }}
      />
      {!isClosed ? (
        <Box className={styles.cardSong__voteContainer}>
          <CardActions sx={{ p: 0 }}>
            <IconButton
              aria-label="voto"
              color="secondary"
              sx={{ pt: 0, pr: 1, pb: 0, pl: 1 }}
              onClick={onClickVote}
            >
              {isVoted ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
            </IconButton>
          </CardActions>
          <Typography variant="body1" component="p" sx={{ fontSize: 12 }}>
            {song.votos}
          </Typography>
        </Box>
      ) : null}
    </Card>
  );
}

export { CardSong };
