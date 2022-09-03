import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { createRoom } from "../../services";
import { Alert } from "../Common/Alert";
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
        await router.push("/idroom/[id]", `/idroom/${data.id_room}`);
      }
    } catch (err) {
      setError(err.message);
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
        className={styles.HomePage}
        sx={{ backgroundColor: "background.default" }}
        component="main"
      >
        <Typography
          variant="h6"
          component="h3"
          sx={{ color: "secondary.main" }}
          className={
            styles.HomePage__title +
            " " +
            (theme.palette.mode === "dark"
              ? styles["HomePage__title--dark"]
              : styles["HomePage__title--light"])
          }
        >
          Pick out your song!
        </Typography>
        <Box
          component="section"
          sx={{ backgroundColor: "background.paper", boxShadow: 3 }}
          className={styles.HomePage__instructions}
        >
          <Typography
            variant="h6"
            component="h6"
            lineHeight="2"
            sx={{ color: "text.secondary" }}
          >
            Descripción
          </Typography>
          <Divider orientation="horizontal" variant="middle" />
          <Typography
            variant="body1"
            sx={{ color: "text.secondary", pt: "5px", textAlign: "justify" }}
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
            blanditiis tenetur unde suscipit, quam beatae rerum inventore
            consectetur, neque doloribus, cupiditate numquam dignissimos laborum
            fugiat deleniti? Eum quasi quidem quibusdam.
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
        alertMsg={error}
        handleCloseAlert={() => setError("")}
      />
    </>
  );
}

export { HomePage };
