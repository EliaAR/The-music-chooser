import { useState, ChangeEventHandler } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AppBlockingOutlinedIcon from "@mui/icons-material/AppBlockingOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { updateRoom } from "../../services/front/room/updateRoom";
import { RoomModel } from "../../types/room";
import { SongModel } from "../../types/song";
import { ShareButtons } from "./ShareButtons/ShareButtons";
import { DescriptionComponent } from "../Common/DescriptionComponent/DescriptionComponent";
import { AddSongInput } from "../Common/AddSongInput/AddSongInput";
import { PlayCardSong } from "./PlayCardSong/PlayCardSong";
import { ErrorComponent } from "../Common/ErrorComponent/ErrorComponent";
import { Playlist } from "../Common/Playlist/Playlist";
import styles from "./Admin.module.scss";

interface AdminProps {
  title: string;
  valueAddSongInput: string;
  onChangeAddSongInput: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
  onClickCallAPIPost: () => void;
  currentSong: SongModel;
  songs: SongModel[];
  isClosed: boolean;
  idVotadas: number[];
  handleIdVotadas: (idVotadas: number[]) => void;
  onVoteSuccess: () => void;
  onVoteError: (err: string) => void;
  indexCurrentSong: number;
  roomData: RoomModel;
  reloadRoomData: () => void;
  onUpdateRoom: (err: string) => void;
  isAdmin: boolean;
}

interface HandleUpdateRoomProps {
  isClosed: boolean;
  idRoom: number;
}

interface HandleUpdateCurrentSongDBProps extends HandleUpdateRoomProps {
  currentSong: number;
}

function Admin({
  title,
  valueAddSongInput,
  onChangeAddSongInput,
  onClickCallAPIPost,
  currentSong,
  songs,
  isClosed,
  idVotadas,
  handleIdVotadas,
  onVoteSuccess,
  onVoteError,
  indexCurrentSong,
  roomData,
  reloadRoomData,
  onUpdateRoom,
  isAdmin,
}: AdminProps) {
  const [defaultIsPlaying, setDefaultIsPlaying] = useState(false);

  const titleNoHyphens = title.replace(/-/g, " ");

  const handleUpdateRoom = ({ isClosed, idRoom }: HandleUpdateRoomProps) => {
    updateRoom({
      is_closed: isClosed,
      current_song: songs[0].id_song,
      id_room: idRoom,
    })
      .then(() => {
        reloadRoomData();
      })
      .catch((err) => {
        if (err instanceof Error) {
          onUpdateRoom(err.message);
          console.error(err);
        }
      });
  };

  const handleUpdateCurrentSongDB = ({
    isClosed,
    idRoom,
    currentSong,
  }: HandleUpdateCurrentSongDBProps) => {
    updateRoom({
      is_closed: isClosed,
      current_song: currentSong,
      id_room: idRoom,
    })
      .then(() => {
        reloadRoomData();
        setDefaultIsPlaying(true);
      })
      .catch((err) => {
        if (err instanceof Error) {
          onUpdateRoom(err.message);
          console.error(err);
        }
      });
  };

  const handleSkipPrevious = () => {
    if (songs[indexCurrentSong - 1]) {
      handleUpdateCurrentSongDB({
        isClosed: true,
        idRoom: roomData.id_room,
        currentSong: songs[indexCurrentSong - 1].id_song,
      });
    }
  };

  const handleSkipNext = () => {
    if (songs[indexCurrentSong + 1]) {
      handleUpdateCurrentSongDB({
        isClosed: true,
        idRoom: roomData.id_room,
        currentSong: songs[indexCurrentSong + 1].id_song,
      });
    }
  };

  return (
    <Box
      component="main"
      sx={{ backgroundColor: "background.default" }}
      className={`${styles.admin} ${
        !isClosed ? styles["admin--open"] : styles["admin--closed"]
      }`}
    >
      <Box component="section" className={styles.admin__titleContainer}>
        <Typography
          component="h1"
          variant="h1"
          sx={{ color: "quaternary.contrastText" }}
          className={styles.admin__title}
        >
          sala admin{" "}
          <span className={styles.admin__titleSpan}>{titleNoHyphens}</span>
        </Typography>

        <ShareButtons roomData={roomData} />
      </Box>

      {!isClosed ? (
        <DescriptionComponent
          textTitle="Tutorial para Admin"
          textAddSongs=""
          textCloseVoting="tú te encargarás de cerrarlas pulsando el botón de 	'cerrar votaciones'."
          textCloseVoting2="Tú lo podrás hacer pulsando el botón de 'abrir votaciones'."
          textPlaySongs="se cambiará automáticamente el campo de añadir canciones por el reproductor. Las canciones aparecerán en orden de votación."
          textPlaySongs2="Sólo tú podrás reproducir la playlist, pausarla, saltar canciones y avanzar o retroceder la canción. No abuses de este poder!"
        />
      ) : null}

      {!isClosed ? (
        <AddSongInput
          valueAddSongInput={valueAddSongInput}
          onChangeAddSongInput={onChangeAddSongInput}
          onClickCallAPIPost={onClickCallAPIPost}
        />
      ) : currentSong ? (
        <PlayCardSong
          song={currentSong}
          onSkipPrevious={() => handleSkipPrevious()}
          onSkipNext={() => handleSkipNext()}
          defaultIsPlaying={defaultIsPlaying}
        />
      ) : (
        <ErrorComponent message="No existe canción para reproducir" />
      )}

      <Playlist
        songs={songs}
        isClosed={isClosed}
        idVotadas={idVotadas}
        handleIdVotadas={handleIdVotadas}
        onVoteSuccess={onVoteSuccess}
        onVoteError={onVoteError}
        indexCurrentSong={indexCurrentSong}
        isAdmin={isAdmin}
      />

      <Button
        onClick={() =>
          handleUpdateRoom({
            isClosed: !roomData.is_closed,
            idRoom: roomData.id_room,
          })
        }
        variant="contained"
        className={styles.admin__closeButtonContainer}
      >
        {roomData.is_closed ? (
          <ThumbUpOutlinedIcon className={styles.admin__closeButtonIcon} />
        ) : (
          <AppBlockingOutlinedIcon className={styles.admin__closeButtonIcon} />
        )}

        {roomData.is_closed ? "Abrir votaciones" : "Cerrar votaciones "}
      </Button>
    </Box>
  );
}

export { Admin };
