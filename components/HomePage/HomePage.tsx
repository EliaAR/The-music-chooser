import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { createRoom } from "../../services/front/room/createRoom";
import { GetLocalStorage, SetLocalStorage } from "../../utils/localStorage";
import { errorMessage } from "../../utils/errorMessages";
import { AddNameRoomComponent } from "./AddNameRoomComponent/AddNameRoomComponent";
import { Alert } from "../Common/Alert/Alert";
import styles from "./HomePage.module.scss";

function HomePage() {
  const router = useRouter();

  const theme = useTheme();

  const [nameRoom, setNameRoom] = useState("");
  const [nameRoomErrors, setNameRoomErrors] = useState<React.ReactNode[]>([]);
  const [error, setError] = useState("");
  const [callAPI, setCallAPI] = useState(false);

  const isDisabled = nameRoom.length === 0 || nameRoomErrors.length > 0;
  const isError = !!nameRoomErrors.length;

  const handleValueNameRoom = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    const newValue = value.replace(/\s/g, "-");
    setNameRoom(newValue);
  };

  const handleBlurError = () => {
    const nameErrors = [];
    if (!nameRoom) {
      nameErrors.push("Es necesario un nombre de Sala");
    } else {
      const roomNameSizeValid = nameRoom.length > 2 && nameRoom.length < 20;
      const roomNameCharactersValid = /^[a-zA-Z0-9._-]+$/.test(nameRoom);
      if (!roomNameSizeValid) {
        nameErrors.push(
          <span key={1}>
            El nombre de la Sala debe tener entre 3 y 20 caracteres
          </span>,
        );
      }
      if (!roomNameCharactersValid) {
        nameErrors.push(
          <span key={2}>
            El nombre de la Sala debe contener caracteres válidos
          </span>,
        );
      }
    }
    setNameRoomErrors(nameErrors);
  };

  const handleClickReset = () => {
    setNameRoom("");
    setNameRoomErrors([]);
  };

  const handleCreateRoom = useCallback(async () => {
    try {
      const data = await createRoom({ name_room: nameRoom });
      if ("id_room" in data) {
        SetLocalStorage({
          key: "idsAdmin",
          value: [
            ...GetLocalStorage({ key: "idsAdmin", defaultValue: [] }),
            data.id_room,
          ],
        });
        await router.push(`/room/${data.id_room}`);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  }, [nameRoom, router]);

  useEffect(() => {
    if (callAPI) {
      setError("");
      setCallAPI(false);
      handleCreateRoom();
    }
  }, [callAPI, handleCreateRoom]);

  return (
    <>
      <Box
        component="main"
        sx={{ backgroundColor: "background.default" }}
        className={styles.homePage}
      >
        <Typography
          component="h1"
          variant="h2"
          sx={{ color: "secondary.main" }}
          className={`${styles.homePage__title} ${
            theme.palette.mode === "dark"
              ? styles["homePage__title--dark"]
              : styles["homePage__title--light"]
          }`}
        >
          Pick out your song!
        </Typography>

        <Box
          component="section"
          sx={{ boxShadow: 3, backgroundColor: "background.paper" }}
          className={styles.homePage__instructionsContainer}
        >
          <Typography
            component="h2"
            variant="h6"
            sx={{ color: "text.secondary" }}
            className={styles.homePage__instructionsTitle}
          >
            Pasos para hacer la playlist
          </Typography>
          <Divider orientation="horizontal" />
          <Typography
            variant="body1"
            sx={{ paddingTop: "0.2rem", color: "text.secondary" }}
          >
            1. Crea una Sala
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            2. Comparte la URL con tu gente
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            3. Vota por vuestras canciones favoritas
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            4. ¡Disfruta de la música!
          </Typography>
        </Box>

        <Box component="section" className={styles.homePage__createContainer}>
          <AddNameRoomComponent
            handleValueNameRoom={handleValueNameRoom}
            nameRoom={nameRoom}
            handleBlurError={handleBlurError}
            isError={isError}
            nameRoomErrors={nameRoomErrors}
            handleClickReset={handleClickReset}
          />
          <Button
            onClick={() => setCallAPI(true)}
            variant="contained"
            disabled={isDisabled}
          >
            Crear Sala
          </Button>
        </Box>
      </Box>

      <Alert
        open={error !== ""}
        alertMsg={errorMessage(error)}
        handleCloseAlert={() => setError("")}
      />
    </>
  );
}

export { HomePage };
