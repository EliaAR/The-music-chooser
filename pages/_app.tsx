import "../styles/globals.css";
import type { AppProps } from "next/app";
import { theme } from "../config/theme";
import { ThemeProvider } from "@mui/system";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
