import { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Switch from "@mui/material/Switch";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ColorModeContext } from "../../config/theme";

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
          <Typography
            variant="h5"
            color="inherit"
            component="h1"
            sx={{ flexGrow: 1, pl: 5, fontWeight: "bold" }}
            align="center"
          >
            {title}
          </Typography>
          <Switch
            checked={theme.palette.mode === "dark"}
            onChange={colorMode.toggleColorMode}
          />
          {theme.palette.mode === "dark" ? (
            <Brightness4Icon />
          ) : (
            <Brightness7Icon />
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export { Header };
