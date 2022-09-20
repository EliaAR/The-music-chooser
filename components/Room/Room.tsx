import { ChangeEventHandler } from "react";
import Box from "@mui/material/Box";
import { SongModel } from "../../types/model";
import { AddSongInput } from "../AddSongInput/AddSongInput";
import { InfoComponent } from "../InfoComponent/InfoComponent";
import { CardVote } from "../CardVote/CardVote";
import styles from "./Room.module.scss";

interface RoomProps {
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
      className={styles.room}
    >
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
