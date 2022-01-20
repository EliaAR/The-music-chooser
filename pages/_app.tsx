import { useState, useMemo } from "react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material";
import {
  themeOptionsDark,
  themeOptionsLight,
  ColorModeContext,
} from "../config/theme";
import "../styles/globals.css";

type ColorModeType = "light" | "dark";

function MyApp({ Component, pageProps }: AppProps) {
  const [mode, setMode] = useState<ColorModeType>("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? themeOptionsLight.palette
            : themeOptionsDark.palette),
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default MyApp;
