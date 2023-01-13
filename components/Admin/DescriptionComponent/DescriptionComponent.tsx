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
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ModeNightOutlinedIcon from "@mui/icons-material/ModeNightOutlined";
import ShareIcon from "@mui/icons-material/Share";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import AppBlockingOutlinedIcon from "@mui/icons-material/AppBlockingOutlined";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";

function DescriptionComponent() {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <Box component="section">
      <Button
        variant="outlined"
        onClick={() => setShowDescription(!showDescription)}
        sx={{
          display: "flex",
          gap: "0.5rem",
          color: "primary.light",
          borderColor: "primary.light",
        }}
      >
        <InfoOutlinedIcon />
        Tutorial
      </Button>

      <Dialog
        open={showDescription}
        aria-labelledby="título descripción"
        aria-describedby="contenido descripción"
      >
        <DialogTitle
          id="título descripción"
          sx={{
            textTransform: "uppercase",
            fontWeight: 700,
            color: "common.black",
          }}
        >
          Tutorial para la App
          <IconButton
            aria-label="cerrar modal descripción"
            onClick={() => setShowDescription(false)}
            sx={{
              position: "absolute",
              right: "0.5rem",
              top: "0.5rem",
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent
          dividers
          id="contenido descripción"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            textAlign: "justify",
          }}
        >
          <Box component="article">
            <Box
              component="article"
              sx={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
            >
              <Typography variant="h6" sx={{ color: "tertiary.dark" }}>
                Tema claro u oscuro
              </Typography>
              <Brightness7Icon sx={{ color: "primary.main" }} />
              <Typography variant="body1" sx={{ color: "primary.main" }}>
                /
              </Typography>
              <ModeNightOutlinedIcon sx={{ color: "primary.main" }} />
            </Box>
            <Typography variant="body1">
              Podrás escoger entre tema claro u oscuro. Para cambiarlo sólo
              tienes que pulsar el botón de la luna o el sol arriba a la
              izquierda.
            </Typography>
          </Box>
          <Box component="article">
            <Box
              component="article"
              sx={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
            >
              <Typography variant="h6" sx={{ color: "tertiary.dark" }}>
                Compartir la Sala
              </Typography>
              <ShareIcon sx={{ color: "primary.main" }} />
            </Box>
            <Typography variant="body1">
              Compartir la sala es muy sencillo. Sólo tienes que pulsar el botón
              de compartir y seleccionar WhatsApp, Telegram o ambas.
            </Typography>
          </Box>
          <Box component="article">
            <Box
              component="article"
              sx={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
            >
              <Typography variant="h6" sx={{ color: "tertiary.dark" }}>
                Añadir canciones
              </Typography>
              <QueueMusicIcon sx={{ color: "primary.main" }} />
            </Box>
            <Typography variant="body1">
              Podréis añadir todas canciones que queráis para crear vuestra
              playlist.
            </Typography>
            <Typography variant="body1">
              Las canciones se añaden poniendo en el campo de texto la URL
              copiada de Youtube.
            </Typography>
            <Typography variant="body1">
              Ojo! No añadas una canción de una lista de reproducción de
              Youtube.
            </Typography>
          </Box>
          <Box component="article">
            <Box
              component="article"
              sx={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
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
            <Typography variant="body1">
              Después toca votar las canciones que más os gusten.
            </Typography>
            <Typography variant="body1">
              Para ello pulsa el botón de la manita y cambiará a check.
            </Typography>
            <Typography variant="body1">
              Si quieres quitar tu voto, pulsa el check.
            </Typography>
          </Box>
          <Box component="article">
            <Box
              component="article"
              sx={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
            >
              <Typography variant="h6" sx={{ color: "tertiary.dark" }}>
                Cerrar votaciones
              </Typography>
              <AppBlockingOutlinedIcon sx={{ color: "primary.main" }} />
            </Box>
            <Typography variant="body1">
              Cuando queráis finalizar las votaciones, quien sea Admin se
              encargará de cerrarlas.
            </Typography>
            <Typography variant="body1">
              A partir de ese momento no podréis añadir ni votar canciones.
            </Typography>
          </Box>
          <Box component="article">
            <Box
              component="article"
              sx={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
            >
              <Typography variant="h6" sx={{ color: "tertiary.dark" }}>
                Reproducir canciones
              </Typography>
              <PlayArrowRoundedIcon
                sx={{ height: 35, width: 35, color: "primary.main" }}
              />
            </Box>
            <Typography variant="body1">
              Una vez cerradas las votaciones, podréis empezar a reproducir la
              playlist ordenada por el número de votos.
            </Typography>
            <Typography variant="body1">
              Sólo quien sea Admin podrá reproducir la playlist, pausarla,
              saltar canciones y avanzar o retroceder la canción.
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export { DescriptionComponent };
