import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5f5ff6",
      contrastText: "#FFFFFF",
      light: "#7F7FF7",
      dark: "#4242AC",
      100: "#e5e5fd94",
    },
    secondary: {
      main: "#00C5CF",
      dark: "#008990",
      light: "#33D0D8",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#F5F2F2",
      paper: "#FFFFFF",
    },
    divider: "#EBE4E4",
  },
});

export default theme;
