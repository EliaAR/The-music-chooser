/* eslint-disable */
import { PaletteOptions, Palette } from "@mui/material/styles/createPalette";

interface ExtendedPaletteOptions {
  tertiary: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  quaternary: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
}

declare module "@mui/material/styles/createPalette" {
  export interface PaletteOptions extends ExtendedPaletteOptions {}
  export interface Palette extends ExtendedPaletteOptions {}
}
