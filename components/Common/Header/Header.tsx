import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Switch from "@mui/material/Switch";
import ModeNightOutlinedIcon from "@mui/icons-material/ModeNightOutlined";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ColorModeContext } from "../../../config/theme";
import darkChoosy from "../../../public/darkChoosy.png";
import lightChoosy from "../../../public/lightChoosy.png";
import styles from "./Header.module.scss";

function Header() {
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
              component="article"
              className={styles.header__toolbarImageContainer}
            >
              <Image
                src={
                  theme.palette.mode === "dark"
                    ? lightChoosy.src
                    : darkChoosy.src
                }
                alt="Choosy (logo)"
                title="Choosy (logo)"
                layout="fill"
                objectFit="contain"
              />
            </Box>
          </a>
        </Link>

        <Typography
          component="h3"
          variant="h3"
          sx={{ color: "primary.contrastText" }}
          className={styles.header__toolbarTitle}
        >
          The music chooser
        </Typography>

        <Box
          component="article"
          className={styles.header__toolbarSwitchContainer}
        >
          <Tooltip
            title={theme.palette.mode === "dark" ? "Modo oscuro" : "Modo claro"}
          >
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
          </Tooltip>
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
