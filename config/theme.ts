/* eslint-disable @typescript-eslint/no-empty-function */

import { createContext } from "react";

const themeOptionsDark = {
  palette: {
    primary: {
      main: "#4F4580",
    },
    secondary: {
      main: "#758045",
    },
    text: {
      primary: "rgba(255, 255, 255, 0.9)",
      secondary: "rgba(255, 255, 255, 0.4)",
      disabled: "#fff",
    },
    background: {
      default: "#303030",
      paper: "#424242",
    },
    info: {
      main: "#545454",
    },
    success: {
      main: "rgba(255, 255, 255, 0.4)",
      contrastText: "#fff",
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
    },
    secondary: {
      main: "#7d894a",
    },
    text: {
      primary: "#212121",
      secondary: "rgba(0, 0, 0, 0.4)",
      disabled: "#000",
    },
    background: {
      default: "rgba(251, 246, 243, 0.49)",
      paper: "#e8e2db",
    },
    info: {
      main: "#968b7f",
    },
    success: {
      main: "rgba(0, 0, 0, 0.4)",
      contrastText: "#E4E6EB",
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
