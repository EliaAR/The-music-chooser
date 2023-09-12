import { ChangeEventHandler, FormEventHandler } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SongModel } from "../../types/song";
import { DescriptionComponent } from "../Common/DescriptionComponent/DescriptionComponent";
import { AddSongInput } from "../Common/AddSongInput/AddSongInput";
import { InfoComponent } from "./InfoComponent/InfoComponent";
import { Playlist } from "../Common/Playlist/Playlist";
import styles from "./User.module.scss";

interface UserProps {
  title: string;
  valueAddSongInput: string;
  onChangeAddSongInput: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
  handleSubmitSong: FormEventHandler<HTMLDivElement>;
  songs: SongModel[];
  isClosed: boolean;
  idVotadas: number[];
  handleIdVotadas: (idVotadas: number[]) => void;
  onVoteSuccess: () => void;
  onVoteError: (err: string) => void;
  indexCurrentSong: number;
  isAdmin: boolean;
}

function User({
  title,
  valueAddSongInput,
  onChangeAddSongInput,
  handleSubmitSong,
  songs,
  isClosed,
  idVotadas,
  handleIdVotadas,
  onVoteSuccess,
  onVoteError,
  indexCurrentSong,
  isAdmin,
}: UserProps) {
  const titleNoHyphens = title.replace(/-/g, " ");

  return (
    <Box
      component="main"
      sx={{ backgroundColor: "background.default" }}
      className={`${styles.user} ${
        !isClosed ? styles["user--open"] : styles["user--closed"]
      }`}
    >
      <Box component="section" className={styles.user__headlineContainer}>
        <Typography
          component="h2"
          variant="h2"
          sx={{ color: "quaternary.contrastText" }}
          className={styles.user__headlineSubtitle}
        >
          sala
        </Typography>
        <Typography
          component="h1"
          variant="h1"
          sx={{ color: "quaternary.contrastText" }}
          className={styles.user__headlineTitle}
        >
          {"  "}
          {titleNoHyphens}
        </Typography>
      </Box>

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
          handleSubmitSong={handleSubmitSong}
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

export { User };
