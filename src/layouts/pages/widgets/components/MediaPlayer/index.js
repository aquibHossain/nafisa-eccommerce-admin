// @mui material components
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import Icon from "@mui/material/Icon";


import { Box } from "@mui/material";

import { Button } from "@mui/material";

// Images
const bgImage =
  "https://raw.githubusercontent.com/amartheme/public-assets/master/amar-dashboard-pro/assets/img/card-music.jpg";

function MediaPlayer() {
  const mediaPlayerButtonStyles = ({ functions: { pxToRem } }) => ({
    width: pxToRem(46),
    height: pxToRem(46),
    minWidth: pxToRem(46),
    minHeight: pxToRem(46),
    mr: 1,
  });

  return (
    <Card
      sx={({ functions: { linearGradient, rgba }, palette: { gradients } }) => ({
        backgroundImage: `${linearGradient(
          rgba(gradients.dark.main, 0.85),
          rgba(gradients.dark.state, 0.85)
        )}, url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      })}
    >
      <Box p={3} position="relative" lineHeight={0}>
        <Typography variant="h5" color="white" fontWeight="medium">
          Some Kind Of Blues
        </Typography>
        <Typography variant="button" color="white" fontWeight="regular">
          Deftones
        </Typography>
        <Box display="flex" mt={3} pt={1}>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Button
              variant="outlined"
              size="large"
              circular
              iconOnly
              sx={mediaPlayerButtonStyles}
            >
              <Icon>skip_previous</Icon>
            </Button>
            <Button
              variant="outlined"
              size="large"
              circular
              iconOnly
              sx={mediaPlayerButtonStyles}
            >
              <Icon>play_arrow</Icon>
            </Button>
            <Button
              variant="outlined"
              size="large"
              circular
              iconOnly
              sx={mediaPlayerButtonStyles}
            >
              <Icon>skip_next</Icon>
            </Button>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

export default MediaPlayer;
