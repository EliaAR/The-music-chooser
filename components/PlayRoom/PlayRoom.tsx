import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { UpdateRoomResponse } from "../../pages/api/rooms/update";
import { getSongs, updateRoom } from "../../services";
import { RoomModel, SongModel } from "../../types/model";
import { PlayCardSong } from "../PlayCardSong/PlayCardSong";
import { CardListSong } from "../CardListSong/CardListSong";
import { ErrorComponent } from "../Common/ErrorComponent/ErrorComponent";
import styles from "./PlayRoom.module.scss";

interface PlayRoomProps {
  roomData: RoomModel;
  reloadRoomData: () => void;
}
interface HandleUpdatePlayRoomProps {
  isClosed: boolean;
  idRoom: string | number;
}

interface HandleUpdateCurrentSongDBProps {
  isClosed: boolean;
  idRoom: string | number;
  currentSong: number;
}

function PlayRoom({ roomData, reloadRoomData }: PlayRoomProps) {
  const [songs, setSongs] = useState<SongModel[]>([]);
  const [defaultIsPlaying, setDefaultIsPlaying] = useState(false);

  const id = roomData.id_room;

  const router = useRouter();

  useEffect(() => {
    getSongs({ id })
      .then((data) => setSongs(data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleUpdatePlayRoom = async ({
    isClosed,
    idRoom,
  }: HandleUpdatePlayRoomProps) => {
    try {
      const data: UpdateRoomResponse = await updateRoom({
        isClosed,
        idRoom,
      });
      console.log(data);
      if ("id_room" in data) {
        await router.push(`/room/${data.id_room}/vote`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateCurrentSongDB = ({
    isClosed,
    idRoom,
    currentSong,
  }: HandleUpdateCurrentSongDBProps) => {
    updateRoom({ isClosed, idRoom, currentSong })
      .then(() => {
        reloadRoomData();
        setDefaultIsPlaying(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const indexCurrentSong = songs.findIndex(
    (song) => song.id_song === roomData.current_song,
  );

  const currentSong = songs[indexCurrentSong];

  const handleSkipPrevious = () => {
    if (songs[indexCurrentSong - 1]) {
      handleUpdateCurrentSongDB({
        isClosed: true,
        idRoom: id,
        currentSong: songs[indexCurrentSong - 1].id_song,
      });
    }
  };

  const handleSkipNext = () => {
    if (songs[indexCurrentSong + 1]) {
      handleUpdateCurrentSongDB({
        isClosed: true,
        idRoom: id,
        currentSong: songs[indexCurrentSong + 1].id_song,
      });
    }
  };

  return (
    <Box
      sx={{ backgroundColor: "background.default" }}
      component="main"
      className={styles.playRoom}
    >
      {currentSong ? (
        <PlayCardSong
          song={currentSong}
          onSkipPrevious={() => handleSkipPrevious()}
          onSkipNext={() => handleSkipNext()}
          defaultIsPlaying={defaultIsPlaying}
        />
      ) : (
        <ErrorComponent message="No existe canción para reproducir" />
      )}
      <Box component="section">
        <Divider variant="fullWidth" />
        <Typography
          variant="h6"
          sx={{ color: "text.secondary" }}
          className={styles.playRoom__title}
        >
          Lista de canciones
        </Typography>
        <Divider variant="fullWidth" />
        {songs.length ? (
          songs.map((song) => (
            <CardListSong
              key={song.id_song}
              name={song.name_song}
            ></CardListSong>
          ))
        ) : (
          <ErrorComponent message="No hay canciones en la lista" />
        )}
      </Box>
      <Box component="section" className={styles.room__buttonContainer}>
        <Button
          variant="contained"
          onClick={() => handleUpdatePlayRoom({ isClosed: false, idRoom: id })}
        >
          Volver y reabrir votaciones
        </Button>
      </Box>
    </Box>
  );
}

export { PlayRoom };
