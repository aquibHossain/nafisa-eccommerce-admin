

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Fade from "@mui/material/Fade";
import Icon from "@mui/material/Icon";


import { Box, Typography } from "@mui/material";

import { Badge } from "@mui/material";


import typography from "assets/theme/base/typography";

function CameraView({ image, date, time, value, index }) {
  const { size } = typography;

  return (
    value === index && (
      <Fade in timeout={850}>
        <Box width="100%" height="100%" position="relative" borderRadius="lg">
          <Box
            component="img"
            src={image}
            position="absolute"
            top={0}
            left={0}
            width="100%"
            height="100%"
            borderRadius="lg"
            sx={{ objectFit: "cover", objectPosition: "center" }}
          />
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            position="absolute"
            top={0}
            left={0}
            width="calc(100% - 1rem)"
          >
            <Box p={2}>
              <Typography variant="h6" fontWeight="regular" color="white">
                {date} &nbsp; {time}
              </Typography>
            </Box>
            <Badge
              color="secondary"
              variant="contained"
              size="lg"
              badgeContent={
                <Box display="flex" alignItems="center">
                  <Box color="error" lineHeight={0} fontSize={size.md}>
                    <Icon>fiber_manual_record</Icon>
                  </Box>
                  <Box mb={-0.25} ml={0.25}>
                    <Typography
                      component="span"
                      variant="caption"
                      color="text"
                      fontWeight="bold"
                      textTransform="uppercase"
                    >
                      recording
                    </Typography>
                  </Box>
                </Box>
              }
            />
          </Box>
        </Box>
      </Fade>
    )
  );
}

// Typechecking props for the CameraView
CameraView.propTypes = {
  image: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default CameraView;
