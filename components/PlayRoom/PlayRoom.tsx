import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { UpdateRoomResponse } from "../../pages/api/rooms/update";
import { getSongs, updateRoom } from "../../services";
import { RoomModel, SongModel } from "../../types/model";
import { PlayCardSong } from "../PlayCardSong/PlayCardSong";
import styles from "./PlayRoom.module.scss";

interface PlayRoomProps {
  roomData: RoomModel;
}

interface HandleUpdatePlayRoomProps {
  isClosed: boolean;
  idRoom: string | number;
}

function PlayRoom({ roomData }: PlayRoomProps) {
  const [songs, setSongs] = useState<SongModel[]>([]);

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

  const currentSong = songs.find(
    (song) => song.id_song === roomData.currentsong,
  );

  return (
    <Box
      sx={{ backgroundColor: "background.default" }}
      component="main"
      className={styles.playRoom}
    >
      {currentSong ? (
        <PlayCardSong song={currentSong} />
      ) : (
        <p>There is no song playing</p>
      )}
      {songs.length ? (
        songs.map((song) => <p key={song.id_song}>{song.name_song}</p>)
      ) : (
        <p>Mensaje Alert</p>
      )}
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
