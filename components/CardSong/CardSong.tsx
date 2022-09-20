import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { updateSong } from "../../services";
import { SetLocalStorage } from "../../services/localStorage";
import { SongModel } from "../../types/model";
import styles from "./CardSong.module.scss";

interface CardSongProps {
  song: SongModel;
  isClosed: boolean;
  idVotadas: number[];
  handleIdVotadas: (idVotadas: number[]) => void;
  onVoteSuccess: () => void;
  onVoteError: (err: string) => void;
  isVoted: boolean;
  indexCurrentSong: number;
}

interface HandleUpdateSongProps {
  votos: number;
  idSong: number;
}

function CardSong({
  song,
  isClosed,
  idVotadas,
  handleIdVotadas,
  onVoteSuccess,
  onVoteError,
  isVoted,
  indexCurrentSong,
}: CardSongProps) {
  const handleUpdateSong = ({ votos, idSong }: HandleUpdateSongProps) => {
    updateSong({ votos, idSong })
      .then((data) => {
        console.log(data);
        onVoteSuccess();
      })
      .catch((err) => {
        if (err instanceof Error) {
          onVoteError(err.message);
          console.error(err);
        }
      });
  };
  const handleVote = (song: SongModel) => {
    if (isClosed === false) {
      if (!idVotadas.includes(song.id_song)) {
        SetLocalStorage({
          key: "idVotadas",
          value: [...idVotadas, song.id_song],
        });
        handleUpdateSong({
          votos: song.votos + 1,
          idSong: song.id_song,
        });
        handleIdVotadas([...idVotadas, song.id_song]);
      } else {
        SetLocalStorage({
          key: "idVotadas",
          value: idVotadas.filter((id) => id !== song.id_song),
        });
        handleUpdateSong({
          votos: song.votos - 1,
          idSong: song.id_song,
        });
        handleIdVotadas(idVotadas.filter((id) => id !== song.id_song));
      }
    }
  };

  return (
    <Card
      component="article"
      sx={{
        overflow: "visible",
        backgroundColor:
          song.id_song === indexCurrentSong
            ? "warning.main"
            : "background.paper",
      }}
      className={styles.cardSong}
    >
      <CardContent component="article">
        <Typography
          component="p"
          variant="body1"
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
        className={styles.cardSong__img}
      />
      {!isClosed ? (
        <Box component="article" className={styles.cardSong__voteContainer}>
          <CardActions sx={{ p: 0 }}>
            <IconButton
              component="button"
              aria-label="voto"
              color="secondary"
              sx={{ pt: 0, pr: 1, pb: 0, pl: 1 }}
              onClick={() => handleVote(song)}
            >
              {isVoted ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
            </IconButton>
          </CardActions>
          <Typography component="p" variant="body1" sx={{ fontSize: 12 }}>
            {song.votos}
          </Typography>
        </Box>
      ) : (
        <IconButton aria-label="play">
          <PlayArrowRoundedIcon
            sx={{ height: 38, width: 38 }}
            color="success"
          />
        </IconButton>
      )}
    </Card>
  );
}

export { CardSong };
