import { ChangeEventHandler } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import styles from "./AddSongInput.module.scss";

interface AddSongInputProps {
  valueAddSongInput: string;
  onChangeAddSongInput: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
  onClickCallAPIPost: () => void;
}

function AddSongInput({
  valueAddSongInput,
  onChangeAddSongInput,
  onClickCallAPIPost,
}: AddSongInputProps) {
  return (
    <Box component="section" className={styles.addSongInput}>
      <TextField
        onChange={onChangeAddSongInput}
        value={valueAddSongInput}
        label="URL Canción"
        placeholder="Escríbela aquí"
        focused
        color="secondary"
        className={styles.addSongInput__textfield}
      />

      <Button
        onClick={onClickCallAPIPost}
        variant="contained"
        className={styles.addSongInput__buttonContainer}
      >
        <QueueMusicIcon className={styles.addSongInput__buttonIcon} />
        Añadir Canción
      </Button>
    </Box>
  );
}

export { AddSongInput };
