import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Alert } from "../Common/Alert";
import { getSongs, createSong } from "../../services";
import { SongModel } from "../../types/model";
import { CardSong } from "../CardSong/CardSong";
import styles from "./Room.module.scss";

interface RoomProps {
  id: string | number;
}

function Room({ id }: RoomProps) {
  const [callAPIGet, setCallAPIGet] = useState(true);
  const [songs, setSongs] = useState<SongModel[]>([]);
  const [callAPIPost, setCallAPIPost] = useState(false);
  const [error, setError] = useState("");
  const [urlSong, setUrlSong] = useState("");

  useEffect(() => {
    if (callAPIGet) {
      setCallAPIGet(false);
      getSongs({ id })
        .then((data) => setSongs(data))
        .catch((err) => console.log(err));
    }
  }, [callAPIGet, id]);

  useEffect(() => {
    if (callAPIPost) {
      setError("");
      setCallAPIPost(false);
      createSong({ idRoom: id, urlSong })
        .then((data) => {
          console.log(data);
          setCallAPIGet(true);
        })
        .catch((err) => {
          setError(err.message);
          console.error(err);
        });
    }
  }, [callAPIPost, id, urlSong]);

  return (
    <>
      <Box
        sx={{ backgroundColor: "background.default" }}
        component="main"
        className={styles.room}
      >
        <Box component="section" className={styles.room__createContainer}>
          <TextField
            label="URL Canción"
            color="secondary"
            placeholder="Escríbela aquí"
            focused
            onChange={(e) => setUrlSong(e.currentTarget.value)}
            value={urlSong}
          />
          <Button variant="contained" onClick={() => setCallAPIPost(true)}>
            Crear Canción
          </Button>
        </Box>
        <Box
          sx={{
            backgroundColor: "background.paper",
          }}
          component="section"
          className={styles.room__listContainer}
        >
          {songs.map((song) => (
            <>
              <CardSong
                key={song.id_song}
                imgSong={song.img}
                nameSong={song.name_song}
              />
              {/* <Divider orientation="horizontal" variant="inset" /> */}
            </>
          ))}
        </Box>
      </Box>
      <Alert
        open={error !== ""}
        alertMsg={error}
        hadleCloseAlert={() => setError("")}
      />
    </>
  );
}

export { Room };
