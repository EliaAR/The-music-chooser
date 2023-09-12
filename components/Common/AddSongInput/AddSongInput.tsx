import { ChangeEventHandler, FormEventHandler } from "react";
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
  handleSubmitSong: FormEventHandler<HTMLDivElement>;
}

function AddSongInput({
  valueAddSongInput,
  onChangeAddSongInput,
  handleSubmitSong,
}: AddSongInputProps) {
  return (
    <Box
      component="form"
      onSubmit={handleSubmitSong}
      className={styles.addSongInput}
    >
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
        type="submit"
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
