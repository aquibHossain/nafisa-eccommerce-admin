

// @mui material components
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";


import { Box } from "@mui/material";

import { Button } from "@mui/material";

// Images
const bgImage =
  "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2370&q=80";

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
          rgba(gradients.info.main, 0.75),
          rgba(gradients.info.state, 0.75)
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
        <Box display="flex" mt={6} pt={1}>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Tooltip title="Prev" placement="top">
              <Button
                variant="outlined"
                size="large"
                circular
                iconOnly
                sx={mediaPlayerButtonStyles}
              >
                <Icon>skip_previous</Icon>
              </Button>
            </Tooltip>
            <Tooltip title="Pause" placement="top">
              <Button
                variant="outlined"
                size="large"
                circular
                iconOnly
                sx={mediaPlayerButtonStyles}
              >
                <Icon>play_arrow</Icon>
              </Button>
            </Tooltip>
            <Tooltip title="Next" placement="top">
              <Button
                variant="outlined"
                size="large"
                circular
                iconOnly
                sx={mediaPlayerButtonStyles}
              >
                <Icon>skip_next</Icon>
              </Button>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

export default MediaPlayer;
