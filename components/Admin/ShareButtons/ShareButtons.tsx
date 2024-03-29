import { useState } from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import ShareIcon from "@mui/icons-material/Share";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import TelegramIcon from "@mui/icons-material/Telegram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { RoomModel } from "../../../types/room";
import styles from "./ShareButtons.module.scss";

interface ShareButtonsProps {
  roomData: RoomModel;
}

function ShareButtons({ roomData }: ShareButtonsProps) {
  const [showShareButtons, setShowShareButtons] = useState(false);

  const shareMessage = `Vota tus canciones favoritas en la sala ${roomData.name_room} en The Music Chooser: ${window.location.href}`;

  const handleShareWhatsApp = () => {
    const whatsApp = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;
    window.open(whatsApp, "_blank");
  };

  const handleShareTelegram = () => {
    const telegram = `https://t.me/share/url?url=${encodeURIComponent(
      shareMessage,
    )}`;
    window.open(telegram, "_blank");
  };

  return (
    <Box component="article" className={styles.shareButtons}>
      <SpeedDial
        onClick={() => setShowShareButtons(!showShareButtons)}
        open={showShareButtons}
        ariaLabel="Compartir la URL de la sala por WhatsApp y Telegram"
        icon={<ShareIcon sx={{ color: "text.primary" }} />}
        direction="down"
        sx={{
          height: "2.75rem",
          width: "2.75rem",
          "& .MuiButtonBase-root": {
            boxShadow: 1,
            height: "2.75rem",
            width: "2.75rem",
            backgroundColor: "inherit",
            color: "primary.light",
            "&:hover": { backgroundColor: "inherit" },
          },
        }}
      >
        <SpeedDialAction
          onClick={() => handleShareTelegram()}
          tooltipTitle="Comparte por Telegram"
          icon={<TelegramIcon />}
          FabProps={{ style: { color: "white", backgroundColor: "#0088cc" } }}
        />
        <SpeedDialAction
          onClick={() => handleShareWhatsApp()}
          tooltipTitle="Comparte por WhatsApp"
          icon={<WhatsAppIcon />}
          FabProps={{ style: { color: "white", backgroundColor: "#25D366" } }}
        />
      </SpeedDial>
    </Box>
  );
}

export { ShareButtons };
