import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import styles from "./HomePage.module.scss";
import { createRoom } from "../../services";
import { Header } from "../../components/Header/Header";
import { Alert } from "../Common/Alert";
import { style } from "@mui/system";

function HomePage() {
  const [nameRoom, setNameRoom] = useState("");
  const [error, setError] = useState(false);
  const [callAPI, setCallAPI] = useState(false);

  useEffect(() => {
    if (callAPI) {
      setError(false);
      setCallAPI(false);
      createRoom({ nameRoom })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          setError(true);
          console.error(err);
        });
    }
  }, [callAPI, nameRoom]);
  return (
    <>
      <Header />
      <main className={styles.HomePage}>
        <h3 className={styles.HomePage__title}>Pick out your song!</h3>
        <section className={styles.HomePage__article}>
          <p className={styles.HomePage__articleTitle}>Descripción</p>
          <p className={styles.HomePage__articleParagraph}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
            quo, possimus a ratione alias aspernatur assumenda sed dolorem
            pariatur sint ex explicabo repudiandae placeat maxime harum nihil?
            Laboriosam, corrupti nam.
          </p>
        </section>
        <section className={styles.HomePage__room}>
          <TextField
            label="Nombre Sala"
            color="secondary"
            placeholder="Escríbelo aquí"
            focused
            onChange={(e) => setNameRoom(e.currentTarget.value)}
            value={nameRoom}
          />

          <Button
            variant="contained"
            onClick={() => {
              setCallAPI(true);
            }}
          >
            Crear Sala
          </Button>
        </section>
      </main>
      <Alert
        open={error}
        alertMsg="Fallo al crear la Sala"
        hadleCloseAlert={() => setError(false)}
      />
    </>
  );
}

export { HomePage };
