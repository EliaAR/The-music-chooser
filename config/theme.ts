import { createContext } from "react";

const themeOptionsDark = {
  palette: {
    primary: {
      main: "#4F4580",
      light: "#8870B9",
      dark: "#373151",
      contrastText: "#fff",
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
      // main: "#968b7f",
      main: "#978e84",
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
      contrastText: "#723838",
    },
    info: {
      main: "#fff0db",
      contrastText: "#303030",
    },
    divider: "rgba(255, 255, 255, 0.15)",
    action: {
      disabledBackground: "#292532",
    },
  },
};

const themeOptionsLight = {
  palette: {
    primary: {
      main: "#8c7ed0",
      light: "#8870B9",
      dark: "#8c7ed0",
    },
    secondary: {
      main: "#7d894a",
    },
    tertiary: {
      main: "#3a3838",
      // light: "#968b7f",
      light: "#978e84",
      dark: "#212121",
      contrastText: "rgba(255, 255, 255, 0.6)",
    },
    quaternary: {
      main: "#545454",
      light: "#fff",
      dark: "#fff",
      contrastText: "#4c463f",
    },
    text: {
      primary: "#212121",
      secondary: "rgba(0, 0, 0, 0.4)",
      disabled: "#3a3838",
    },
    background: {
      default: "#f6f6f6",
      paper: "#e8e2db",
    },
    error: {
      main: "#592a2a",
      contrastText: "#592a2a",
    },
    info: {
      main: "#F57C00",
      contrastText: "#f6f6f6",
    },
    divider: "rgba(0, 0, 0, 0.25)",
    action: {
      disabledBackground: "#d8cfec",
    },
  },
};

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export { themeOptionsDark, themeOptionsLight, ColorModeContext };
