import { ChangeEventHandler } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

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
    <Box
      component="section"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <TextField
        label="URL Canción"
        color="secondary"
        placeholder="Escríbela aquí"
        focused
        onChange={onChangeAddSongInput}
        value={valueAddSongInput}
      />
      <Button variant="contained" onClick={onClickCallAPIPost}>
        Añadir Canción
      </Button>
    </Box>
  );
}

export { AddSongInput };
