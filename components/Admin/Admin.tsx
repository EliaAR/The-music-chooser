import { ChangeEventHandler, FormEventHandler } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AppBlockingOutlinedIcon from "@mui/icons-material/AppBlockingOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { updateRoom } from "../../services/front/room/updateRoom";
import { useListenSongs } from "../../hooks/useListenSongs";
import { RoomModel } from "../../types/room";
import { SongModel } from "../../types/song";
import { ShareButtons } from "./ShareButtons/ShareButtons";
import { DescriptionComponent } from "../Common/DescriptionComponent/DescriptionComponent";
import { AddSongInput } from "../Common/AddSongInput/AddSongInput";
import { PlayCardSong } from "./PlayCardSong/PlayCardSong";
import { Playlist } from "../Common/Playlist/Playlist";
import styles from "./Admin.module.scss";

interface AdminProps {
  title: string;
  valueAddSongInput: string;
  onChangeAddSongInput: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
  handleSubmitSong: FormEventHandler<HTMLDivElement>;
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
  asyncReloadRoomData: () => Promise<void>;
  onUpdateRoom: (err: string) => void;
  isAdmin: boolean;
}

interface HandleUpdateRoomProps {
  idRoom: number;
  isClosed: boolean;
}

function Admin({
  title,
  valueAddSongInput,
  onChangeAddSongInput,
  handleSubmitSong,
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
  asyncReloadRoomData,
  onUpdateRoom,
  isAdmin,
}: AdminProps) {
  const {
    progressTrack,
    duration,
    isPlaying,
    setIsPlaying,
    handleChangeScrub,
    handleChangeScrubEnd,
    handleUpdateCurrentSongDB,
    handleSkipPrevious,
    handleSkipNext,
  } = useListenSongs({
    asyncReloadRoomData,
    song: currentSong,
    songs,
    indexCurrentSong,
    onUpdateRoom,
    roomData,
  });

  const titleNoHyphens = title.replace(/-/g, " ");

  const handleUpdateRoom = ({ idRoom, isClosed }: HandleUpdateRoomProps) => {
    updateRoom({
      id_room: idRoom,
      is_closed: isClosed,
      current_song: songs[0].id_song,
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

  return (
    <Box
      component="main"
      sx={{ backgroundColor: "background.default" }}
      className={`${styles.admin} ${
        !isClosed ? styles["admin--open"] : styles["admin--closed"]
      }`}
    >
      <Box component="section" className={styles.admin__headlineContainer}>
        <Box
          component="article"
          className={styles.admin__headlineTitleContainer}
        >
          <Typography
            component="h1"
            variant="h1"
            sx={{ color: "quaternary.contrastText" }}
            className={styles.admin__headlineTitle}
          >
            sala admin{" "}
          </Typography>
          <Typography
            component="h2"
            variant="h2"
            sx={{ color: "quaternary.contrastText" }}
            className={styles.admin__headlineSubtitle}
          >
            {titleNoHyphens}
          </Typography>
        </Box>
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
          handleSubmitSong={handleSubmitSong}
        />
      ) : (
        <PlayCardSong
          song={currentSong}
          isPlaying={isPlaying}
          onPlayPauseClick={() => setIsPlaying(!isPlaying)}
          onSkipPrevious={handleSkipPrevious}
          onSkipNext={handleSkipNext}
          onChangeScrub={handleChangeScrub}
          onChangeScrubEnd={handleChangeScrubEnd}
          progressTrack={progressTrack}
          maxSliderSong={duration ? duration : 0}
        />
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
        isPlaying={isPlaying}
        onPlayPauseClick={() => setIsPlaying(!isPlaying)}
        roomData={roomData}
        handleUpdateCurrentSongDB={handleUpdateCurrentSongDB}
      />

      <Button
        onClick={() =>
          handleUpdateRoom({
            idRoom: roomData.id_room,
            isClosed: !roomData.is_closed,
          })
        }
        disabled={songs.length === 0}
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
