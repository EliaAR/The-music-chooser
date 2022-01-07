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
  },
};

const theme = createTheme(themeOptions);

export { theme };
