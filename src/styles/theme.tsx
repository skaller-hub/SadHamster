import { createTheme } from "@mui/material/styles";

export const colorPalette = {
  slate900: "#1E293B",
  slate700: "#334155",
  blueSoft: "#94A3B8",
  pink: "#F472B6",
  pinkSoft: "#F9A8D4",
  yellow: "#FACC15",
  yellowSoft: "#FDE68A",
  cream: "#F8FAFC",
  mist: "#E2E8F0",
  grey: "#64748B",
  red: "#F87171",
  orange: "#FB7185",
  peach: "#F9A8D4",
  indigo: "#1E293B",
};

export const MuiTheme = createTheme({
  typography: {
    fontFamily: '"Poppins", sans-serif',
  },
  palette: {
    primary: {
      main: colorPalette.pink,
    },
    secondary: {
      main: colorPalette.yellow,
    },
    error: {
      main: colorPalette.red,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 700,
        },
      },
    },
  },
});
