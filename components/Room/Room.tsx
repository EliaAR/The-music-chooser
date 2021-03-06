import { useState, useEffect } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { getSongs, createSong, updateSong, updateRoom } from "../../services";
import { GetLocalStorage, SetLocalStorage } from "../../services/localStorage";
import { RoomModel, SongModel } from "../../types/model";
import { Alert } from "../Common/Alert";
import { CardSong } from "../CardSong/CardSong";
import styles from "./Room.module.scss";

interface RoomProps {
  roomData: RoomModel;
}

interface HandleUpdateSongProps {
  votos: number;
  idSong: number;
}

interface HandleUpdateRoomProps {
  isClosed: boolean;
  idRoom: string | number;
}

function Room({ roomData }: RoomProps) {
  const [callAPIGet, setCallAPIGet] = useState(true);
  const [songs, setSongs] = useState<SongModel[]>([]);
  const [callAPIPost, setCallAPIPost] = useState(false);
  const [error, setError] = useState("");
  const [urlSong, setUrlSong] = useState("");
  const [idVotadas, setIdVotadas] = useState(
    GetLocalStorage<number[]>({ key: "idVotadas", defaultValue: [] })
  );

  const id = roomData.id_room;

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

  const handleUpdateRoom = ({ isClosed, idRoom }: HandleUpdateRoomProps) => {
    updateRoom({ isClosed, idRoom })
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
            label="URL Canci??n"
            color="secondary"
            placeholder="Escr??bela aqu??"
            focused
            onChange={(e) => setUrlSong(e.currentTarget.value)}
            value={urlSong}
            sx={{ mb: 1 }}
          />
          <Button variant="contained" onClick={() => setCallAPIPost(true)}>
            A??adir Canci??n
          </Button>
        </Box>
        <Box component="section">
          <Box
            component="section"
            sx={{ boxShadow: 2 }}
            className={styles.room__listTitle}
          >
            <Typography
              variant="body1"
              component="h6"
              sx={{
                fontWeight: 500,
              }}
            >
              Listado canciones
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: "background.paper",
              boxShadow: 2,
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
                isClosed={roomData.isclosed}
              />
            ))}
          </Box>
        </Box>
        <Box component="section" className={styles.room__buttonContainer}>
          <Button
            variant="contained"
            onClick={() => handleUpdateRoom({ isClosed: true, idRoom: id })}
          >
            <Link href={"/idpartyroom/[id]"} as={`/idpartyroom/${id}`}>
              <a>Abrir Sala de Reproducci??n</a>
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
