import Button from "@mui/material/Button";
import styles from "./HomePage.module.scss";

function HomePage() {
  return (
    <main className={styles.HomePage}>
      <h3 className={styles.HomePage__title}>Pick out your song!</h3>
      <article className={styles.HomePage__article}>
        <p className={styles.HomePage__articleTitle}>Descripción</p>
        <p className={styles.HomePage__articleParagraph}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore quo,
          possimus a ratione alias aspernatur assumenda sed dolorem pariatur
          sint ex explicabo repudiandae placeat maxime harum nihil? Laboriosam,
          corrupti nam.
        </p>
      </article>
      <Button variant="contained" href="#contained-buttons">
        Abrir Sala
      </Button>
    </main>
  );
}

export { HomePage };
