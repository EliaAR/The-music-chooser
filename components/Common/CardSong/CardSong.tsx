import Image from "next/image";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
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
        backgroundColor:
          song.id_song === indexCurrentSong
            ? "quaternary.main"
            : "background.paper",
      }}
      className={styles.cardSong}
    >
      <Typography
        variant="body1"
        title={song.name_song}
        className={`${styles.cardSong__title} ${
          !isClosed
            ? styles["cardSong__title--bold"]
            : styles["cardSong__title--thin"]
        }`}
      >
        {song.name_song}
      </Typography>

      <Box component="article" className={styles.cardSong__imageContainer}>
        <Image
          src={song.img}
          alt={song.name_song}
          title={song.name_song}
          layout="fill"
          objectFit="contain"
        />
      </Box>

      {!isClosed ? (
        <Box component="article" className={styles.cardSong__voteContainer}>
          <IconButton
            component="button"
            onClick={() => handleVote(song)}
            aria-label="votar por la canción"
            color="secondary"
            className={styles.cardSong__voteButton}
          >
            {isVoted ? (
              <HowToRegIcon className={styles.cardSong__voteIcon} />
            ) : (
              <ThumbUpOutlinedIcon className={styles.cardSong__voteIcon} />
            )}
          </IconButton>
          <Typography variant="body3">{song.votos}</Typography>
        </Box>
      ) : null}

      {isClosed && !isAdmin ? (
        <Box component="article" className={styles.cardSong__voteContainer}>
          <HowToVoteIcon sx={{ color: "secondary.main" }} />
          <Typography variant="body3">{song.votos}</Typography>
        </Box>
      ) : null}

      {isClosed && isAdmin ? (
        <Box component="article" className={styles.cardSong__playContainer}>
          <IconButton aria-label="play" className={styles.cardSong__playButton}>
            <PlayArrowRoundedIcon
              sx={{ color: "text.secondary" }}
              className={styles.cardSong__playIcon}
            />
          </IconButton>
          <Typography variant="body3">{song.votos}</Typography>
        </Box>
      ) : null}
    </Card>
  );
}

export { CardSong };