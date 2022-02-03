import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { getSongs } from "../../services";
import { RoomModel, SongModel } from "../../types/model";
import { PlayCardSong } from "../PlayCardSong/PlayCardSong";
import styles from "./PartyRoom.module.scss";

interface PartyRoomProps {
  roomData: RoomModel;
}

function PartyRoom({ roomData }: PartyRoomProps) {
  const [songs, setSongs] = useState<SongModel[]>([]);

  const id = roomData.id_room;

  useEffect(() => {
    getSongs({ id })
      .then((data) => setSongs(data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <Box
      sx={{ backgroundColor: "background.default" }}
      component="main"
      className={styles.partyRoom}
    >
      {/* {songs.map((song) => (
        <PlayCardSong key={song.id_song} song={song} />
      ))} */}
      <PlayCardSong song={songs[0]} />
    </Box>
  );
}

export { PartyRoom };
