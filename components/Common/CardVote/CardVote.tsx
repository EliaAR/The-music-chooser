import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SongModel } from "../../../types/song";
import { CardSong } from "../CardSong/CardSong";
import styles from "./CardVote.module.scss";

interface CardVoteProps {
  songs: SongModel[];
  isClosed: boolean;
  idVotadas: number[];
  handleIdVotadas: (idVotadas: number[]) => void;
  onVoteSuccess: () => void;
  onVoteError: (err: string) => void;
  indexCurrentSong: number;
  isAdmin: boolean;
}

function CardVote({
  songs,
  isClosed,
  idVotadas,
  handleIdVotadas,
  onVoteSuccess,
  onVoteError,
  indexCurrentSong,
  isAdmin,
}: CardVoteProps) {
  return (
    <Box
      component="section"
      sx={{ flexGrow: isAdmin ? "null" : 0.4, width: "20.4rem" }}
    >
      <Box
        component="article"
        sx={{
          boxShadow: 3,
          backgroundColor: "tertiary.light",
          color: "tertiary.contrastText",
        }}
        className={styles.CardVote__title}
      >
        <Typography
          component="h6"
          variant="body1"
          sx={{
            fontWeight: 700,
          }}
        >
          Listado canciones
        </Typography>
      </Box>
      <Box
        component="article"
        sx={{
          backgroundColor: "background.paper",
          boxShadow: 2,
        }}
        className={styles.CardVote__songs}
      >
        {songs.map((song) => (
          <CardSong
            key={song.id_song}
            song={song}
            isClosed={isClosed}
            idVotadas={idVotadas}
            handleIdVotadas={handleIdVotadas}
            onVoteSuccess={onVoteSuccess}
            onVoteError={onVoteError}
            isVoted={idVotadas.includes(song.id_song)}
            indexCurrentSong={indexCurrentSong}
            isAdmin={isAdmin}
          />
        ))}
      </Box>
    </Box>
  );
}

export { CardVote };
