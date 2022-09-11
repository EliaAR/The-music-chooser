import { useState, useEffect } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { getSongs, createSong, updateRoom } from "../../services";
import { GetLocalStorage } from "../../services/localStorage";
import { RoomModel, SongModel } from "../../types/model";
import { Alert } from "../Common/Alert/Alert";
import { CardSong } from "../CardSong/CardSong";
import styles from "./Room.module.scss";

interface RoomProps {
  roomData: RoomModel;
  reloadRoomData: () => void;
}
interface HandleUpdateRoomProps {
  isClosed: boolean;
  idRoom: string | number;
}

function Room({ roomData, reloadRoomData }: RoomProps) {
  const [callAPIGet, setCallAPIGet] = useState(true);
  const [songs, setSongs] = useState<SongModel[]>([]);
  const [callAPIPost, setCallAPIPost] = useState(false);
  const [error, setError] = useState("");
  const [urlSong, setUrlSong] = useState("");
  const [idVotadas, setIdVotadas] = useState(
    GetLocalStorage<number[]>({ key: "idVotadas", defaultValue: [] }),
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
          if (err instanceof Error) {
            setError(err.message);
            console.error(err);
          }
        });
    }
  }, [callAPIPost, id, urlSong]);

  const handleUpdateRoom = ({ isClosed, idRoom }: HandleUpdateRoomProps) => {
    updateRoom({ isClosed, idRoom, currentSong: songs[0].id_song })
      .then(() => {
        reloadRoomData();
        setCallAPIGet(true);
      })
      .catch((err) => {
        if (err instanceof Error) {
          setError(err.message);
          console.error(err);
        }
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
            sx={{ mb: 1 }}
          />
          <Button variant="contained" onClick={() => setCallAPIPost(true)}>
            Añadir Canción
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
                isClosed={roomData.is_closed}
                idVotadas={idVotadas}
                handleIdVotadas={(newIdArrayVotadas) =>
                  setIdVotadas(newIdArrayVotadas)
                }
                handleVoteSuccess={() => setCallAPIGet(true)}
                handleVoteError={(err) => setError(err)}
                isVoted={idVotadas.includes(song.id_song)}
              />
            ))}
          </Box>
        </Box>
        <Box component="section" className={styles.room__buttonsContainer}>
          <Button
            variant="contained"
            onClick={() =>
              handleUpdateRoom({ isClosed: !roomData.is_closed, idRoom: id })
            }
          >
            {roomData.is_closed ? "Abrir" : "Cerrar"} Votaciones
          </Button>
          <Button variant="contained">
            <Link href={`/room/${id}/play`}>
              <a>Abrir Sala de Reproducción</a>
            </Link>
          </Button>
        </Box>
      </Box>
      <Alert
        open={error !== ""}
        alertMsg={error}
        handleCloseAlert={() => setError("")}
      />
    </>
  );
}

export { Room };
