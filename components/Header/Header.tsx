import { useContext } from "react";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import Brightness4Icon from "@mui/icons-material/Brightness4";
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
        sx={{ minHeight: matches ? 60 : 80, justifyContent: "space-between" }}
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
          variant="h5"
          color="inherit"
          component="h1"
          sx={{
            pl: 5,
            fontWeight: "bold",
            color: "text.disabled",
          }}
          align="center"
        >
          {title}
        </Typography>
        <Box component="article" className={styles.Header__switchContainer}>
          <Switch
            checked={theme.palette.mode === "dark"}
            onChange={colorMode.toggleColorMode}
          />
          {theme.palette.mode === "dark" ? (
            <Brightness4Icon className={styles.Header__switchMoon} />
          ) : (
            <Brightness7Icon className={styles.Header__switchSun} />
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export { Header };
