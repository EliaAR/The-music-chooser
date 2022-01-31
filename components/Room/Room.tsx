import { useState, useEffect } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { getSongs, createSong, updateSong } from "../../services";
import { GetLocalStorage, SetLocalStorage } from "../../services/localStorage";
import { SongModel } from "../../types/model";
import { Alert } from "../Common/Alert";
import { CardSong } from "../CardSong/CardSong";
import styles from "./Room.module.scss";

interface RoomProps {
  id: string | number;
}

interface HandleUpdateSongProps {
  votos: number;
  idSong: number;
}

function Room({ id }: RoomProps) {
  const [callAPIGet, setCallAPIGet] = useState(true);
  const [songs, setSongs] = useState<SongModel[]>([]);
  const [callAPIPost, setCallAPIPost] = useState(false);
  const [error, setError] = useState("");
  const [urlSong, setUrlSong] = useState("");
  const [idVotadas, setIdVotadas] = useState(
    GetLocalStorage<number[]>({ key: "idVotadas", defaultValue: [] })
  );

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
          setUrlSong("");
        })
        .catch((err) => {
          setError(err.message);
          console.error(err);
        });
    }
  }, [callAPIPost, id, urlSong]);

  const handleUpdateSong = ({ votos, idSong }: HandleUpdateSongProps) => {
    updateSong({ votos, idSong })
      .then((data) => {
        console.log(data);
        setCallAPIGet(true);
      })
      .catch((err) => {
        setError(err.message);
        console.error(err);
      });
  };

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
            Añadir Canción
          </Button>
        </Box>
        <div>
          <Typography
            variant="body1"
            component="h6"
            sx={{
              fontWeight: 500,
            }}
            className={styles.room__listTitle}
          >
            Listado canciones
          </Typography>
          <Box
            sx={{
              backgroundColor: "background.paper",
            }}
            component="section"
            className={styles.room__listContainer}
          >
            {songs.map((song) => (
              <CardSong
                key={song.id_song}
                song={song}
                onClickVote={() => {
                  if (!idVotadas.includes(song.id_song)) {
                    SetLocalStorage({
                      key: "idVotadas",
                      value: [...idVotadas, song.id_song],
                    });
                    handleUpdateSong({
                      votos: song.votos + 1,
                      idSong: song.id_song,
                    });
                    setIdVotadas([...idVotadas, song.id_song]);
                  } else {
                    SetLocalStorage({
                      key: "idVotadas",
                      value: idVotadas.filter((id) => id !== song.id_song),
                    });
                    handleUpdateSong({
                      votos: song.votos - 1,
                      idSong: song.id_song,
                    });
                    setIdVotadas(idVotadas.filter((id) => id !== song.id_song));
                  }
                }}
                isVoted={idVotadas.includes(song.id_song)}
              />
            ))}
          </Box>
        </div>
        <Box component="section">
          <Button variant="contained">
            <Link href={"/partyRoom/[id]"} as={`/partyRoom/${id}`}>
              <a>Abrir Sala de Reproducción</a>
            </Link>
          </Button>
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
