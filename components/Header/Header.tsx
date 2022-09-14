import { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ColorModeContext } from "../../config/theme";
import whiteChoosy from "../../public/whiteChoosy.png";
import blackChoosy from "../../public/blackChoosy.png";
import styles from "./Header.module.scss";

interface HeaderProps {
  title: string;
}

function Header({ title }: HeaderProps) {
  const theme = useTheme();

  const colorMode = useContext(ColorModeContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "primary.main" }}>
        <Toolbar component="section" variant="dense" sx={{ minHeight: 68.8 }}>
          <Box
            component="img"
            src={
              theme.palette.mode === "dark" ? whiteChoosy.src : blackChoosy.src
            }
            alt="Choosy"
            sx={{ width: 40 }}
          ></Box>
          <Typography
            variant="h5"
            color="inherit"
            component="h1"
            sx={{
              flexGrow: 1,
              pl: 5,
              fontWeight: "bold",
              color: "text.disabled",
            }}
            align="center"
          >
            {title}
          </Typography>
          <Switch
            checked={theme.palette.mode === "dark"}
            onChange={colorMode.toggleColorMode}
          />
          {theme.palette.mode === "dark" ? (
            <Brightness4Icon className={styles.Header__moon} />
          ) : (
            <Brightness7Icon className={styles.Header__sun} />
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export { Header };
