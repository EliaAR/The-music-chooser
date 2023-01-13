import { useState, ChangeEventHandler } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { updateRoom } from "../../services/front/room/updateRoom";
import { RoomModel } from "../../types/room";
import { SongModel } from "../../types/song";
import { ShareButtons } from "./ShareButtons/ShareButtons";
import { DescriptionComponent } from "./DescriptionComponent/DescriptionComponent";
import { AddSongInput } from "../Common/AddSongInput/AddSongInput";
import { PlayCardSong } from "./PlayCardSong/PlayCardSong";
import { ErrorComponent } from "../Common/ErrorComponent/ErrorComponent";
import { CardVote } from "../Common/CardVote/CardVote";
import styles from "./Admin.module.scss";

interface AdminProps {
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
      sx={{ backgroundColor: "background.default", position: "relative" }}
      className={styles.admin}
    >
      <ShareButtons roomData={roomData} />

      <DescriptionComponent />

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

      <CardVote
        songs={songs}
        isClosed={isClosed}
        idVotadas={idVotadas}
        handleIdVotadas={handleIdVotadas}
        onVoteSuccess={onVoteSuccess}
        onVoteError={onVoteError}
        indexCurrentSong={indexCurrentSong}
        isAdmin={isAdmin}
      />

      <Box component="section" className={styles.admin__voteContainer}>
        <Button
          variant="contained"
          onClick={() =>
            handleUpdateRoom({
              isClosed: !roomData.is_closed,
              idRoom: roomData.id_room,
            })
          }
        >
          {roomData.is_closed
            ? "Abrir votaciones"
            : "Cerrar votaciones y Cambiar a reproducción"}
        </Button>
      </Box>
    </Box>
  );
}

export { Admin };
