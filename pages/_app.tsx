import type { AppProps } from "next/app";
import { useState, useMemo } from "react";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
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
    [],
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
        typography: {
          h1: {
            textTransform: "uppercase",
            fontWeight: 700,
            fontSize: "2rem",
          },
          h2: {
            textTransform: "uppercase",
            fontWeight: 700,
            fontSize: "1.15rem",
          },
          h3: {
            textTransform: "uppercase",
            fontWeight: 700,
            fontSize: "1.5rem",
            lineHeight: 1.334,
          },
          subtitle2: {
            fontWeight: 500,
            fontSize: "0.9rem",
            lineHeight: 1.6,
            letterSpacing: "0.0075em",
          },
          body3: {
            fontFamily: "'Roboto', sans-serif",
            fontWeight: 400,
            fontSize: "0.75rem",
            lineHeight: 1.43,
            letterSpacing: "0.01071em",
          },
        },
        components: {
          MuiSwitch: {
            styleOverrides: {
              track: {
                opacity: 0.2,
                backgroundColor: "#fff",
                ".Mui-checked.Mui-checked + &": {
                  opacity: 0.2,
                  backgroundColor: "#fff",
                },
              },
            },
          },
        },
      }),
    [mode],
  );

  return (
    <StyledEngineProvider injectFirst>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </StyledEngineProvider>
  );
}

export default MyApp;
