import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styles from "./RoomNameRestrictionsModal.module.scss";

function RoomNameRestrictionsModal() {
  return (
    <Box
      component="article"
      sx={{
        boxShadow: 1,
        backgroundColor: "info.main",
        "& .MuiTypography-root": {
          color: "info.contrastText",
        },
      }}
      className={styles.roomNameRestrictionsModal}
    >
      <Typography
        variant="body2"
        className={styles.roomNameRestrictionsModal__hyphensOne}
      >
        -
      </Typography>
      <Typography
        variant="body2"
        className={styles.roomNameRestrictionsModal__paragraphOne}
      >
        El nombre de la Sala sólo puede contener letras, números, puntos,
        guiones y guiones bajos
      </Typography>

      <Typography
        variant="body2"
        className={styles.roomNameRestrictionsModal__hyphensTwo}
      >
        -
      </Typography>
      <Typography
        variant="body2"
        className={styles.roomNameRestrictionsModal__paragraphTwo}
      >
        No puede contener espacios. Se sustituirán por guiones
      </Typography>

      <Typography
        variant="body2"
        className={styles.roomNameRestrictionsModal__hyphensThree}
      >
        -
      </Typography>
      <Typography
        variant="body2"
        className={styles.roomNameRestrictionsModal__paragraphThree}
      >
        Debe tener entre 3 y 20 caracteres
      </Typography>

      <Typography
        variant="body2"
        className={styles.roomNameRestrictionsModal__hyphensFour}
      >
        -
      </Typography>
      <Typography
        variant="body2"
        className={styles.roomNameRestrictionsModal__paragraphFour}
      >
        No puede estar repetido
      </Typography>
    </Box>
  );
}

export { RoomNameRestrictionsModal };
