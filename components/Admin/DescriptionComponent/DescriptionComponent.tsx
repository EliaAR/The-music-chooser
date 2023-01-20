import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import AppBlockingOutlinedIcon from "@mui/icons-material/AppBlockingOutlined";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import styles from "./DescriptionComponent.module.scss";

function DescriptionComponent() {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <Box component="section" className={styles.descriptionComponent}>
      <Button
        onClick={() => setShowDescription(!showDescription)}
        variant="outlined"
        sx={{ color: "primary.light", borderColor: "primary.light" }}
        className={styles.descriptionComponent__buttonContainer}
      >
        <InfoOutlinedIcon className={styles.descriptionComponent__buttonIcon} />
        Tutorial
      </Button>

      <Dialog
        open={showDescription}
        aria-labelledby="título descripción"
        aria-describedby="contenido descripción"
      >
        <DialogTitle
          id="título descripción"
          sx={{ color: "common.black" }}
          className={styles.descriptionComponent__dialogTitle}
        >
          Tutorial para la App
          <IconButton
            onClick={() => setShowDescription(false)}
            aria-label="cerrar modal descripción"
            className={styles.descriptionComponent__dialogIconClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent
          dividers
          id="contenido descripción"
          className={styles.descriptionComponent__dialogContentContainer}
        >
          <Box
            component="article"
            className={styles.descriptionComponent__dialogContentBlock}
          >
            <Box
              component="article"
              className={styles.descriptionComponent__dialogContentBlockTitle}
            >
              <Typography variant="h6" sx={{ color: "tertiary.dark" }}>
                Compartir la Sala
              </Typography>
              <ShareIcon sx={{ color: "primary.main" }} />
            </Box>
            <Typography
              variant="body1"
              className={
                styles.descriptionComponent__dialogContentBlockParagraph
              }
            >
              Compartir la sala es muy sencillo. Pulsa el botón de compartir y
              selecciona entre WhatsApp, Telegram o ambas.
            </Typography>
          </Box>

          <Box
            component="article"
            className={styles.descriptionComponent__dialogContentBlock}
          >
            <Box
              component="article"
              className={styles.descriptionComponent__dialogContentBlockTitle}
            >
              <Typography variant="h6" sx={{ color: "tertiary.dark" }}>
                Añadir canciones
              </Typography>
              <QueueMusicIcon sx={{ color: "primary.main" }} />
            </Box>
            <Box
              component="article"
              className={
                styles.descriptionComponent__dialogContentBlockParagraphContainer
              }
            >
              <Typography
                variant="body1"
                className={
                  styles.descriptionComponent__dialogContentBlockParagraph
                }
              >
                Accede a la sala con la dirección compartida y añade canciones a
                la playlist.
              </Typography>
              <Typography
                variant="body1"
                className={
                  styles.descriptionComponent__dialogContentBlockParagraph
                }
              >
                Busca en Youtube la canción que quieres incluir y copia la URL
                en el campo de texto.
              </Typography>
              <Typography
                variant="body1"
                className={
                  styles.descriptionComponent__dialogContentBlockParagraph
                }
              >
                Ojo! No añadas una canción de una lista de reproducción.
              </Typography>
            </Box>
          </Box>

          <Box
            component="article"
            className={styles.descriptionComponent__dialogContentBlock}
          >
            <Box
              component="article"
              className={styles.descriptionComponent__dialogContentBlockTitle}
            >
              <Typography variant="h6" sx={{ color: "tertiary.dark" }}>
                Votar canciones
              </Typography>
              <ThumbUpOutlinedIcon sx={{ color: "primary.main" }} />
              <Typography variant="body1" sx={{ color: "primary.main" }}>
                /
              </Typography>
              <HowToRegIcon sx={{ color: "primary.main" }} />
            </Box>
            <Box
              component="article"
              className={
                styles.descriptionComponent__dialogContentBlockParagraphContainer
              }
            >
              <Typography
                variant="body1"
                className={
                  styles.descriptionComponent__dialogContentBlockParagraph
                }
              >
                Nada más añadir una canción, aparecerá en el listado y se podrá
                votar.
              </Typography>
              <Typography
                variant="body1"
                className={
                  styles.descriptionComponent__dialogContentBlockParagraph
                }
              >
                Para votarla, pulsa el botón de la manita y cambiará a check.
              </Typography>
              <Typography
                variant="body1"
                className={
                  styles.descriptionComponent__dialogContentBlockParagraph
                }
              >
                Si quieres quitar tu voto, pulsa el check y volverá a la manita.
              </Typography>
            </Box>
          </Box>

          <Box
            component="article"
            className={styles.descriptionComponent__dialogContentBlock}
          >
            <Box
              component="article"
              className={styles.descriptionComponent__dialogContentBlockTitle}
            >
              <Typography variant="h6" sx={{ color: "tertiary.dark" }}>
                Cerrar votaciones
              </Typography>
              <AppBlockingOutlinedIcon sx={{ color: "primary.main" }} />
            </Box>
            <Box
              component="article"
              className={
                styles.descriptionComponent__dialogContentBlockParagraphContainer
              }
            >
              <Typography
                variant="body1"
                className={
                  styles.descriptionComponent__dialogContentBlockParagraph
                }
              >
                Cuando queráis finalizar las votaciones, quien sea Admin se
                encargará de cerrarlas.
              </Typography>
              <Typography
                variant="body1"
                className={
                  styles.descriptionComponent__dialogContentBlockParagraph
                }
              >
                A partir de ese momento no podréis añadir ni votar más
                canciones. Aunque siempre se puede volver a abrir las
                votaciones.
              </Typography>
            </Box>
          </Box>

          <Box
            component="article"
            className={styles.descriptionComponent__dialogContentBlock}
          >
            <Box
              component="article"
              className={styles.descriptionComponent__dialogContentBlockTitle}
            >
              <Typography variant="h6" sx={{ color: "tertiary.dark" }}>
                Reproducir canciones
              </Typography>
              <PlayArrowRoundedIcon
                sx={{ height: 35, width: 35, color: "primary.main" }}
              />
            </Box>
            <Box
              component="article"
              className={
                styles.descriptionComponent__dialogContentBlockParagraphContainer
              }
            >
              <Typography
                variant="body1"
                className={
                  styles.descriptionComponent__dialogContentBlockParagraph
                }
              >
                Una vez cerradas las votaciones, podréis empezar a reproducir la
                playlist ordenada por el número de votos.
              </Typography>
              <Typography
                variant="body1"
                className={
                  styles.descriptionComponent__dialogContentBlockParagraph
                }
              >
                Sólo quien sea Admin podrá reproducir la playlist, pausarla,
                saltar canciones y avanzar o retroceder la canción. El resto, a
                disfrutar!
              </Typography>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export { DescriptionComponent };
