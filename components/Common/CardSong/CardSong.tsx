import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { updateSong } from "../../../services/front/song/updateSong";
import { SetLocalStorage } from "../../../utils/localStorage";
import { SongModel } from "../../../types/song";
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
  isAdmin: boolean;
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
  isAdmin,
}: CardSongProps) {
  const handleUpdateSong = ({ votos, idSong }: HandleUpdateSongProps) => {
    updateSong({ votos, id_song: idSong })
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
      <Typography
        component="p"
        variant="body1"
        title={song.name_song}
        sx={{
          width: isClosed && !isAdmin ? 170 : 150,
        }}
        className={styles.cardSong__title}
      >
        {song.name_song}
      </Typography>
      <CardMedia
        component="img"
        image={song.img}
        alt={song.name_song}
        className={styles.cardSong__img}
      />
      {!isClosed ? (
        <Box component="article" className={styles.cardSong__voteContainer}>
          <IconButton
            component="button"
            aria-label="voto"
            color="secondary"
            sx={{ padding: 0 }}
            onClick={() => handleVote(song)}
          >
            {isVoted ? (
              <HowToRegIcon sx={{ height: 30, width: 30 }} />
            ) : (
              <ThumbUpOutlinedIcon sx={{ height: 30, width: 30 }} />
            )}
          </IconButton>
          <Typography component="p" variant="body1" sx={{ fontSize: 12 }}>
            {song.votos}
          </Typography>
        </Box>
      ) : null}

      {isClosed && !isAdmin ? (
        <Box component="article" className={styles.cardSong__voteContainer}>
          <HowToVoteIcon sx={{ color: "secondary.main" }} />
          <Typography component="p" variant="body1" sx={{ fontSize: 12 }}>
            {song.votos}
          </Typography>
        </Box>
      ) : null}

      {isClosed && isAdmin ? (
        <Box component="article" className={styles.cardSong__voteContainer}>
          <IconButton aria-label="play" sx={{ padding: 0 }}>
            <PlayArrowRoundedIcon
              sx={{ height: 38, width: 38 }}
              color="success"
            />
          </IconButton>
          <Typography component="p" variant="body1" sx={{ fontSize: 12 }}>
            {song.votos}
          </Typography>
        </Box>
      ) : null}
    </Card>
  );
}

export { CardSong };
