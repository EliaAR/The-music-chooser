import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Divider from "@mui/material/Divider";

function InfoComponent() {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        paddingBlock: 0.8,
        paddingInline: 2,
        borderRadius: 1.2,
        boxShadow: 3,
        backgroundColor: "background.paper",
      }}
    >
      <InfoOutlinedIcon
        onClick={() => setShowInfo(!showInfo)}
        sx={{ height: 30, width: 30, color: "error.main", cursor: "pointer" }}
      />
      {showInfo ? (
        <Box
          component="article"
          sx={{ display: "flex", gap: 2 }}
          onClick={() => setShowInfo(false)}
        >
          <Divider orientation="vertical" flexItem />
          <Box
            component="article"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "text.secondary",
            }}
          >
            <Typography
              variant="body1"
              sx={{ textAlign: "center", fontSize: 14 }}
            >
              Las votaciones se han cerrado
            </Typography>
            <Typography
              variant="body1"
              sx={{ textAlign: "center", fontSize: 14 }}
            >
              No puedes votar ni añadir canciones
            </Typography>
          </Box>
        </Box>
      ) : null}
    </Box>
  );
}

export { InfoComponent };
