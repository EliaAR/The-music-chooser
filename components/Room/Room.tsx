import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import styles from "./Room.module.scss";
import { getSongs } from "../../services";
import { SongModel } from "../../types/model";
import { CardSong } from "../CardSong/CardSong";

interface RoomProps {
  id: string | number;
}

function Room({ id }: RoomProps) {
  const [songs, setSongs] = useState<SongModel[]>([]);

  useEffect(() => {
    getSongs({ id })
      .then((data) => setSongs(data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <Box
      sx={{ backgroundColor: "background.default" }}
      component="main"
      className={styles.room}
    >
      <Box sx={{ backgroundColor: "background.paper" }} component="section">
        <CardSong />
      </Box>
    </Box>
  );
}

export { Room };
