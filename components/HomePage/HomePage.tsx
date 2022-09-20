import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { createRoom } from "../../services";
import { GetLocalStorage, SetLocalStorage } from "../../services/localStorage";
import { Alert } from "../Common/Alert/Alert";
import styles from "./HomePage.module.scss";

function HomePage() {
  const [nameRoom, setNameRoom] = useState("");
  const [error, setError] = useState("");
  const [callAPI, setCallAPI] = useState(false);

  const theme = useTheme();

  const router = useRouter();

  const handleCreateRoom = async () => {
    try {
      const data = await createRoom({ nameRoom });
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
  };

  useEffect(() => {
    if (callAPI) {
      setError("");
      setCallAPI(false);
      handleCreateRoom();
    }
  }, [callAPI, nameRoom]);

  return (
    <>
      <Box
        component="main"
        sx={{ backgroundColor: "background.default" }}
        className={styles.HomePage}
      >
        <Typography
          component="h3"
          variant="h6"
          sx={{ fontSize: 36.8, color: "secondary.main" }}
          className={`${styles.HomePage__title} ${
            theme.palette.mode === "dark"
              ? styles["HomePage__title--dark"]
              : styles["HomePage__title--light"]
          }`}
        >
          Pick out your song!
        </Typography>
        <Box
          component="section"
          sx={{ boxShadow: 3, backgroundColor: "background.paper" }}
          className={styles.HomePage__instructionsContainer}
        >
          <Typography
            variant="h6"
            sx={{ lineHeight: 2, color: "text.secondary" }}
          >
            Pasos para hacer la playlist
          </Typography>
          <Divider orientation="horizontal" variant="middle" />
          <Typography
            variant="body1"
            sx={{ paddingTop: 0.2, color: "text.secondary" }}
          >
            1. Crea una Sala
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            2. Comparte la URL con tu gente
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            3. Votad por vuestras canciones favoritas
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            4. ¡Disfrutad de la música!
          </Typography>
        </Box>
        <Box component="section" className={styles.HomePage__room}>
          <TextField
            label="Nombre Sala"
            color="secondary"
            placeholder="Escríbelo aquí"
            focused
            onChange={(e) => setNameRoom(e.currentTarget.value)}
            value={nameRoom}
          />
          <Button variant="contained" onClick={() => setCallAPI(true)}>
            Crear Sala
          </Button>
        </Box>
      </Box>
      <Alert
        open={error !== ""}
        alertMsg="Ese nombre de sala ya existe. Prueba con otro"
        handleCloseAlert={() => setError("")}
      />
    </>
  );
}

export { HomePage };
