/* eslint-disable */
import { PaletteOptions, Palette } from "@mui/material/styles/createPalette";
import {
  Typography,
  TypographyOptions,
} from "@mui/material/styles/createTypography";
import { TypographyPropsVariantOverrides } from "@mui/material/styles";

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

interface ExtendedTypographyOptions {
  body3: {
    fontFamily: string;
    fontWeight: number;
    fontSize: string;
    lineHeight: number;
    letterSpacing: string;
  };
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    body3: true;
  }
}
declare module "@mui/material/styles/createTypography" {
  export interface TypographyOptions extends ExtendedTypographyOptions {}
  export interface Typography extends ExtendedTypographyOptions {}
}
