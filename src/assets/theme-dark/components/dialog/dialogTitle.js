


import typography from "assets/theme-dark/base/typography";

// Charg Dashboard MUI helper functions
import pxToRem from "assets/theme-dark/functions/pxToRem";

const { size } = typography;

const dialogTitle = {
  styleOverrides: {
    root: {
      padding: pxToRem(16),
      fontSize: size.xl,
    },
  },
};

export default dialogTitle;
