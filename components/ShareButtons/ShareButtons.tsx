import IconButton from "@mui/material/IconButton";
import TelegramIcon from "@mui/icons-material/Telegram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

function ShareButtons() {
  return (
    <IconButton aria-label="share">
      <TelegramIcon />
      <WhatsAppIcon />
    </IconButton>
  );
}

export { ShareButtons };
