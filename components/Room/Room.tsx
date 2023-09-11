import { ChangeEventHandler } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SongModel } from "../../types/song";
import { DescriptionComponent } from "../Common/DescriptionComponent/DescriptionComponent";
import { AddSongInput } from "../Common/AddSongInput/AddSongInput";
import { InfoComponent } from "./InfoComponent/InfoComponent";
import { Playlist } from "../Common/Playlist/Playlist";
import styles from "./Room.module.scss";

interface RoomProps {
  title: string;
  valueAddSongInput: string;
  onChangeAddSongInput: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
  onClickCallAPIPost: () => void;
  songs: SongModel[];
  isClosed: boolean;
  idVotadas: number[];
  handleIdVotadas: (idVotadas: number[]) => void;
  onVoteSuccess: () => void;
  onVoteError: (err: string) => void;
  indexCurrentSong: number;
  isAdmin: boolean;
}

function Room({
  title,
  valueAddSongInput,
  onChangeAddSongInput,
  onClickCallAPIPost,
  songs,
  isClosed,
  idVotadas,
  handleIdVotadas,
  onVoteSuccess,
  onVoteError,
  indexCurrentSong,
  isAdmin,
}: RoomProps) {
  const titleNoHyphens = title.replace(/-/g, " ");

  return (
    <Box
      component="main"
      sx={{ backgroundColor: "background.default" }}
      className={`${styles.room} ${
        !isClosed ? styles["room--open"] : styles["room--closed"]
      }`}
    >
      <Typography
        component="h1"
        variant="h1"
        sx={{ color: "quaternary.contrastText" }}
        className={styles.room__title}
      >
        <span className={styles.room__titleSpan}>sala</span>
        {"  "}
        {titleNoHyphens}
      </Typography>

      {!isClosed ? (
        <DescriptionComponent
          textTitle="Tutorial para Users"
          textAddSongs="Accede a la sala con la dirección compartida y añade canciones a la playlist."
          textCloseVoting="quien sea Admin se encargará de cerrarlas."
          textCloseVoting2="De nuevo, le toca a quien sea Admin."
          textPlaySongs="podréis empezar a reproducir la playlist ordenada por el número de votos."
          textPlaySongs2="Sólo quien sea Admin podrá reproducir la playlist, pausarla, saltar canciones y avanzar o retroceder la canción. El resto, a disfrutar!"
        />
      ) : null}

      {!isClosed ? (
        <AddSongInput
          valueAddSongInput={valueAddSongInput}
          onChangeAddSongInput={onChangeAddSongInput}
          onClickCallAPIPost={onClickCallAPIPost}
        />
      ) : (
        <InfoComponent />
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
    </Box>
  );
}

export { Room };
