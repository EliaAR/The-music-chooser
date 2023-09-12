import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SongModel } from "../../../types/song";
import { HandleUpdateCurrentSongDBProps } from "../../../hooks/useListenSongs";
import { RoomModel } from "../../../types/room";
import { CardSong } from "../CardSong/CardSong";
import styles from "./Playlist.module.scss";

interface PlaylistProps {
  songs: SongModel[];
  isClosed: boolean;
  idVotadas: number[];
  handleIdVotadas: (idVotadas: number[]) => void;
  onVoteSuccess: () => void;
  onVoteError: (err: string) => void;
  indexCurrentSong: number;
  isAdmin: boolean;
  isPlaying: boolean;
  onPlayPauseClick: () => void;
  handleUpdateCurrentSongDB: (
    props: HandleUpdateCurrentSongDBProps,
  ) => Promise<void>;
  roomData: RoomModel;
}

function Playlist({
  songs,
  isClosed,
  idVotadas,
  handleIdVotadas,
  onVoteSuccess,
  onVoteError,
  indexCurrentSong,
  isAdmin,
  isPlaying,
  onPlayPauseClick,
  handleUpdateCurrentSongDB,
  roomData,
}: PlaylistProps) {
  const theme = useTheme();

  return (
    <Box component="section" className={styles.playlist}>
      <Box
        component="article"
        sx={{
          boxShadow: 3,
          backgroundColor: "tertiary.light",
          color: "tertiary.contrastText",
        }}
        className={styles.playlist__titleContainer}
      >
        <Typography component="h2" variant="h2">
          Listado canciones
        </Typography>
      </Box>

      <Box
        component="article"
        sx={{
          backgroundColor: "background.paper",
          boxShadow: 2,
        }}
        className={`${styles.playlist__songs} ${
          theme.palette.mode === "dark"
            ? styles["playlist__songs--dark"]
            : styles["playlist__songs--light"]
        }`}
      >
        {songs.map((song, index) => (
          <CardSong
            key={song.id_song}
            song={song}
            isClosed={isClosed}
            idVotadas={idVotadas}
            handleIdVotadas={handleIdVotadas}
            onVoteSuccess={onVoteSuccess}
            onVoteError={onVoteError}
            isVoted={idVotadas.includes(song.id_song)}
            selectedSong={indexCurrentSong === index}
            isAdmin={isAdmin}
            isPlaying={isPlaying && indexCurrentSong === index}
            onPlayPauseClick={async () => {
              if (indexCurrentSong === index) {
                onPlayPauseClick();
              } else {
                await handleUpdateCurrentSongDB({
                  currentSong: song.id_song,
                  isClosed: true,
                  idRoom: roomData.id_room,
                });
                // onPlayPauseClick(true);
              }
            }}
          />
        ))}
      </Box>
    </Box>
  );
}

export { Playlist };
