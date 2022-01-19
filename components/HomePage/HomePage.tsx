import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createRoom } from "../../services";
import { Alert } from "../Common/Alert";
import styles from "./HomePage.module.scss";

function HomePage() {
  const [nameRoom, setNameRoom] = useState("");
  const [error, setError] = useState(false);
  const [callAPI, setCallAPI] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (callAPI) {
      setError(false);
      setCallAPI(false);
      createRoom({ nameRoom })
        .then((data) => {
          console.log(data);
          debugger;
          router.push("/room/[id]", `/room/${data.id_room}`);
        })
        .catch((err) => {
          setError(true);
          console.error(err);
        });
    }
  }, [callAPI, nameRoom]);
  return (
    <>
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

          <Button variant="contained" onClick={() => setCallAPI(true)}>
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
