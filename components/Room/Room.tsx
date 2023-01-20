import { ChangeEventHandler } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SongModel } from "../../types/song";
import { AddSongInput } from "../Common/AddSongInput/AddSongInput";
import { InfoComponent } from "./InfoComponent/InfoComponent";
import { CardVote } from "../Common/CardVote/CardVote";
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
        variant="h5"
        sx={{ color: "quaternary.contrastText" }}
        className={styles.room__title}
      >
        <span className={styles.room__titleSpan}>sala</span>
        {"  "}
        {title}
      </Typography>

      {!isClosed ? (
        <AddSongInput
          valueAddSongInput={valueAddSongInput}
          onChangeAddSongInput={onChangeAddSongInput}
          onClickCallAPIPost={onClickCallAPIPost}
        />
      ) : (
        <InfoComponent />
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
    </Box>
  );
}

export { Room };
