import { createContext } from "react";

const themeOptionsDark = {
  palette: {
    primary: {
      main: "#4F4580",
      light: "#8870B9",
    },
    secondary: {
      main: "#758045",
    },
    tertiary: {
      main: "#3a3838",
      light: "#545454",
      dark: "#212121",
      contrastText: "rgba(255, 255, 255, 0.6)",
    },
    quaternary: {
      main: "#968b7f",
      light: "#fff",
      dark: "#fff",
      contrastText: "#fff",
    },
    text: {
      primary: "rgba(255, 255, 255, 0.7)",
      secondary: "rgba(255, 255, 255, 0.4)",
      disabled: "#fff",
    },
    background: {
      default: "#303030",
      paper: "#424242",
    },
    error: {
      main: "#592a2a",
      contrastText: "#E4E6EB",
    },
    divider: "rgba(255, 255, 255, 0.15)",
  },
};

const themeOptionsLight = {
  palette: {
    primary: {
      main: "#8c7ed0",
      light: "#8870B9",
    },
    secondary: {
      main: "#7d894a",
    },
    tertiary: {
      main: "#3a3838",
      light: "#968b7f",
      dark: "#212121",
      contrastText: "rgba(255, 255, 255, 0.6)",
    },
    quaternary: {
      main: "#545454",
      light: "#fff",
      dark: "#fff",
      contrastText: "#fff",
    },
    text: {
      primary: "#212121",
      secondary: "rgba(0, 0, 0, 0.4)",
      disabled: "#3a3838",
    },
    background: {
      default: "rgba(251, 246, 243, 0.49)",
      paper: "#e8e2db",
    },
    error: {
      main: "#592a2a",
      contrastText: "#E4E6EB",
    },
    divider: "rgba(0, 0, 0, 0.25)",
  },
};

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export { themeOptionsDark, themeOptionsLight, ColorModeContext };
