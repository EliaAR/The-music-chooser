import { useState } from "react";
import Box from "@mui/material/Box";
import ShareIcon from "@mui/icons-material/Share";
import TelegramIcon from "@mui/icons-material/Telegram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { RoomModel } from "../../types/model";

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
    <Box component="article" sx={{ position: "absolute", top: 12, left: 8 }}>
      <SpeedDial
        ariaLabel="SpeedDial controlador"
        icon={<ShareIcon sx={{ color: "text.primary" }} />}
        onClick={() => setShowShareButtons(!showShareButtons)}
        open={showShareButtons}
        direction="down"
        FabProps={{
          style: { backgroundColor: "transparent" },
        }}
      >
        <SpeedDialAction
          icon={<TelegramIcon />}
          tooltipTitle="Comparte por Telegram"
          onClick={() => handleShareTelegram()}
          FabProps={{ style: { color: "white", backgroundColor: "#0088cc" } }}
        />
        <SpeedDialAction
          icon={<WhatsAppIcon />}
          tooltipTitle="Comparte por WhatsApp"
          onClick={() => handleShareWhatsApp()}
          FabProps={{ style: { color: "white", backgroundColor: "#25D366" } }}
        />
      </SpeedDial>
    </Box>
  );
}

export { ShareButtons };
