import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import Popper from "@mui/material/Popper";
import { RoomNameRestrictionsModal } from "../RoomNameRestrictionsModal/RoomNameRestrictionsModal";
import styles from "./AddNameRoomComponent.module.scss";

interface AddNameRoomComponentProps {
  handleValueNameRoom: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nameRoom: string;
  handleBlurError: () => void;
  isError: boolean;
  nameRoomErrors: React.ReactNode[];
  handleClickReset: () => void;
}

function AddNameRoomComponent({
  handleValueNameRoom,
  nameRoom,
  handleBlurError,
  isError,
  nameRoomErrors,
  handleClickReset,
}: AddNameRoomComponentProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const openPopper = Boolean(anchorEl);

  const handleClickOpenPopper = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  return (
    <Box component="article" className={styles.addNameRoomComponent}>
      <TextField
        onChange={handleValueNameRoom}
        value={nameRoom}
        onBlur={handleBlurError}
        error={isError}
        helperText={nameRoomErrors}
        label="Nombre Sala"
        color="secondary"
        placeholder="Escríbelo aquí"
        focused
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickReset}
                aria-label="indica un error"
              >
                {nameRoom ? (
                  <HighlightOffRoundedIcon
                    sx={{
                      color: nameRoomErrors.length
                        ? "error.contrastText"
                        : "secondary.main",
                    }}
                  />
                ) : null}
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiInputBase-root.Mui-focused": {
            "& .MuiIconButton-root": {
              color: nameRoomErrors.length
                ? "error.contrastText"
                : "secondary.main",
            },
          },
          "& .MuiInputBase-root": {
            "& .MuiIconButton-root": {
              color: nameRoomErrors.length
                ? "error.contrastText"
                : "secondary.main",
            },
          },
          "& .MuiFormHelperText-root": {
            display: "flex",
            flexWrap: "wrap",
          },
          "& .MuiFormHelperText-root.Mui-error": {
            color: "error.contrastText",
          },
          "& .MuiFormLabel-root.Mui-error": { color: "error.contrastText" },
        }}
      />

      <IconButton
        onClick={handleClickOpenPopper}
        aria-label="muestra las restricciones para el nombre de la Sala"
        aria-describedby="restricciones-nombre-sala"
        sx={{ "&:hover": { backgroundColor: "inherit" } }}
        className={styles.addNameRoomComponent__buttonContainer}
      >
        <HelpOutlineRoundedIcon sx={{ color: "text.secondary" }} />
      </IconButton>

      <Popper
        open={openPopper}
        anchorEl={anchorEl}
        id="restricciones-nombre-sala"
        placement="bottom-end"
      >
        <RoomNameRestrictionsModal />
      </Popper>
    </Box>
  );
}

export { AddNameRoomComponent };
