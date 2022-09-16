import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SongModel } from "../../types/model";
import { CardSong } from "../CardSong/CardSong";
import styles from "./CardVote.module.scss";

interface CardVoteProps {
  songs: SongModel[];
  isClosed: boolean;
  idVotadas: number[];
  handleIdVotadas: (idVotadas: number[]) => void;
  handleVoteSuccess: () => void;
  handleVoteError: (err: string) => void;
  isCurrentSong: boolean;
}

function CardVote({
  songs,
  isClosed,
  idVotadas,
  handleIdVotadas,
  handleVoteSuccess,
  handleVoteError,
  isCurrentSong,
}: CardVoteProps) {
  return (
    <Box component="section" sx={{ flexGrow: 0.4 }}>
      <Box
        component="article"
        sx={{ backgroundColor: "info.main", boxShadow: 3 }}
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
            handleVoteSuccess={handleVoteSuccess}
            handleVoteError={handleVoteError}
            isVoted={idVotadas.includes(song.id_song)}
            isCurrentSong={isCurrentSong}
          />
        ))}
      </Box>
    </Box>
  );
}

export { CardVote };
