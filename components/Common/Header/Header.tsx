import Link from "next/link";
import { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import ModeNightOutlinedIcon from "@mui/icons-material/ModeNightOutlined";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ColorModeContext } from "../../../config/theme";
import darkChoosy from "../../../public/darkChoosy.png";
import lightChoosy from "../../../public/lightChoosy.png";
import styles from "./Header.module.scss";

interface HeaderProps {
  title: string;
}

function Header({ title }: HeaderProps) {
  const theme = useTheme();

  const colorMode = useContext(ColorModeContext);

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "primary.main" }}
      className={styles.header}
    >
      <Toolbar
        component="section"
        variant="dense"
        className={styles.header__toolbar}
      >
        <Link href={"/"}>
          <a>
            <Box
              component="img"
              src={
                theme.palette.mode === "dark" ? lightChoosy.src : darkChoosy.src
              }
              alt="Choosy (logo)"
              title="Choosy (logo)"
              role=""
              sx={{ width: "2.5rem", cursor: "pointer" }}
            ></Box>
          </a>
        </Link>

        <Typography
          component="h1"
          variant="h5"
          sx={{
            textAlign: "center",
            paddingLeft: "2.5rem",
            fontWeight: 700,
            color: "text.disabled",
          }}
        >
          {title}
        </Typography>

        <Box component="article" sx={{ display: "flex", alignItems: "center" }}>
          <Switch
            checked={theme.palette.mode === "dark"}
            onChange={colorMode.toggleColorMode}
            sx={{
              "& .MuiButtonBase-root.MuiSwitch-switchBase": {
                color: "tertiary.main",
                "&.Mui-checked": {
                  color: "primary.contrastText",
                },
              },
            }}
          />
          {theme.palette.mode === "dark" ? (
            <ModeNightOutlinedIcon sx={{ color: "primary.contrastText" }} />
          ) : (
            <Brightness7Icon sx={{ color: "tertiary.main" }} />
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export { Header };
