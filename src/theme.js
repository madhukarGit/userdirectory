import { createTheme } from "@mui/material";
import { purple } from "@mui/material/colors";

const arcBlue = "#116466";
const Theme = createTheme({
  palette: {
    primary: {
      main: `${arcBlue}`,
      light: "#FEFFFF",
    },
    secondary: {
      main: "#6F2232",
      light: "#3AAFA9",
    },
  },
});
export default Theme;
