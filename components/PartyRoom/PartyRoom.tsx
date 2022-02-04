import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { getSongs, updateRoom } from "../../services";
import { RoomModel, SongModel } from "../../types/model";
import { PlayCardSong } from "../PlayCardSong/PlayCardSong";
import styles from "./PartyRoom.module.scss";

interface PartyRoomProps {
  roomData: RoomModel;
}

interface HandleUpdatePartyRoomProps {
  isClosed: boolean;
  idRoom: string | number;
}

function PartyRoom({ roomData }: PartyRoomProps) {
  const [songs, setSongs] = useState<SongModel[]>([]);

  const id = roomData.id_room;

  const router = useRouter();

  useEffect(() => {
    getSongs({ id })
      .then((data) => setSongs(data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleUpdatePartyRoom = ({
    isClosed,
    idRoom,
  }: HandleUpdatePartyRoomProps) => {
    updateRoom({ isClosed, idRoom })
      .then((data) => {
        console.log(data);
        router.push("/idroom/[id]", `/idroom/${data.id_room}`);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Box
      sx={{ backgroundColor: "background.default" }}
      component="main"
      className={styles.partyRoom}
    >
      {songs[0] ? <PlayCardSong song={songs[0]} /> : <p>Mensaje Alert</p>}
      <Box component="section" className={styles.room__buttonContainer}>
        <Button
          variant="contained"
          onClick={() => handleUpdatePartyRoom({ isClosed: false, idRoom: id })}
        >
          Volver y reabrir votaciones
        </Button>
      </Box>
    </Box>
  );
}

export { PartyRoom };
