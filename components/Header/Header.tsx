import { useContext } from "react";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import ModeNightOutlinedIcon from "@mui/icons-material/ModeNightOutlined";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ColorModeContext } from "../../config/theme";
import darkChoosy from "../../public/darkChoosy.png";
import lightChoosy from "../../public/lightChoosy.png";
import styles from "./Header.module.scss";

interface HeaderProps {
  title: string;
}

function Header({ title }: HeaderProps) {
  const theme = useTheme();

  const colorMode = useContext(ColorModeContext);

  const matches = useMediaQuery("(max-height: 667px)");

  return (
    <AppBar position="static" sx={{ backgroundColor: "primary.main" }}>
      <Toolbar
        component="section"
        variant="dense"
        sx={{ justifyContent: "space-between", minHeight: matches ? 60 : 80 }}
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
              sx={{ width: 40, cursor: "pointer" }}
            ></Box>
          </a>
        </Link>
        <Typography
          component="h1"
          variant="h5"
          sx={{
            textAlign: "center",
            pl: 5,
            fontWeight: "bold",
            color: "text.disabled",
          }}
        >
          {title}
        </Typography>
        <Box component="article" className={styles.Header__switchContainer}>
          <Switch
            checked={theme.palette.mode === "dark"}
            onChange={colorMode.toggleColorMode}
          />
          {theme.palette.mode === "dark" ? (
            <ModeNightOutlinedIcon className={styles.Header__switchMoon} />
          ) : (
            <Brightness7Icon className={styles.Header__switchSun} />
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export { Header };
