

import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";


import { Box, Typography } from "@mui/material";

import { Button } from "@mui/material";

function Account() {
  const [design, setDesign] = useState(false);
  const [code, setCode] = useState(false);
  const [develop, setDevelop] = useState(false);

  const handleSetDesign = () => setDesign(!design);
  const handleSetCode = () => setCode(!code);
  const handleSetDevelop = () => setDevelop(!develop);

  const customButtonStyles = ({
    functions: { pxToRem, rgba },
    borders: { borderWidth },
    palette: { transparent, dark, secondary },
  }) => ({
    width: pxToRem(150),
    height: pxToRem(120),
    borderWidth: borderWidth[2],
    mb: 1,
    ml: 0.5,

    "&.MuiButton-contained, &.MuiButton-contained:hover": {
      boxShadow: "none",
      border: `${borderWidth[2]} solid ${transparent.main}`,
    },

    "&:hover": {
      backgroundColor: `${transparent.main} !important`,
      border: `${borderWidth[2]} solid ${secondary.main} !important`,

      "& i": {
        color: rgba(dark.main, 0.75),
      },
    },
  });

  return (
    <Box>
      <Box width="80%" textAlign="center" mx="auto" mb={4}>
        <Box mb={1}>
          <Typography variant="h5" fontWeight="regular">
            What are you doing? (checkboxes)
          </Typography>
        </Box>
        <Typography variant="body2" fontWeight="regular" color="text">
          Give us more details about you. What do you enjoy doing in your spare time?
        </Typography>
      </Box>
      <Box mt={2}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={3}>
            <Box textAlign="center">
              <Button
                color="secondary"
                variant={design ? "contained" : "outlined"}
                onClick={handleSetDesign}
                sx={customButtonStyles}
              >
                <Box
                  component="i"
                  fontSize="24px"
                  color={design ? "white" : "dark"}
                  className="ni ni-settings-gear-65"
                />
              </Button>
              <Typography variant="h6">Design</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box textAlign="center">
              <Button
                color="secondary"
                variant={code ? "contained" : "outlined"}
                onClick={handleSetCode}
                sx={customButtonStyles}
              >
                <Box
                  component="i"
                  fontSize="24px"
                  color={code ? "white" : "dark"}
                  className="ni ni-app"
                />
              </Button>
              <Typography variant="h6">Code</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box textAlign="center">
              <Button
                color="secondary"
                variant={develop ? "contained" : "outlined"}
                onClick={handleSetDevelop}
                sx={customButtonStyles}
              >
                <Box
                  component="i"
                  fontSize="24px"
                  color={develop ? "white" : "dark"}
                  className="ni ni-spaceship"
                />
              </Button>
              <Typography variant="h6">Develop</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Account;
