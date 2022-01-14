import { createTheme } from "@mui/material";

const themeOptions = {
  palette: {
    type: "dark",
    primary: {
      main: "#4F4580",
    },
    secondary: {
      main: "#758045",
    },
    text: {
      primary: "#E4E6EB",
      secondary: "#B0B3B8",
    },
    background: {
      default: "#4F4580",
      paper: "#4F4580",
    },
  },
};

const theme = createTheme(themeOptions);

export { theme };
