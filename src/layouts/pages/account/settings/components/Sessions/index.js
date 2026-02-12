

// @mui material components
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import Icon from "@mui/material/Icon";
import Divider from "@mui/material/Divider";


import { Box } from "@mui/material";

import { Badge } from "@mui/material";

function Sessions() {
  const actionButtonStyles = {
    "& .material-icons-round": {
      transform: `translateX(0)`,
      transition: "all 200ms cubic-bezier(0.34,1.61,0.7,1.3)",
    },

    "&:hover .material-icons-round, &:focus .material-icons-round": {
      transform: `translateX(4px)`,
    },
  };

  return (
    <Card id="sessions">
      <Box p={3} lineHeight={1}>
        <Box mb={1}>
          <Typography variant="h5">Sessions</Typography>
        </Box>
        <Typography variant="button" color="text" fontWeight="regular">
          This is a list of devices that have logged into your account. Remove those that you do not
          recognize.
        </Typography>
      </Box>
      <Box pb={3} px={3} sx={{ overflow: "auto" }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width={{ xs: "max-content", sm: "100%" }}
        >
          <Box display="flex" alignItems="center">
            <Box textAlign="center" color="text" px={{ xs: 0, md: 1.5 }} opacity={0.6}>
              <Icon fontSize="default">desktop_windows</Icon>
            </Box>
            <Box height="100%" ml={2} lineHeight={1.4} mr={2}>
              <Typography display="block" variant="button" fontWeight="regular" color="text">
                Bucharest 68.133.163.201
              </Typography>
              <Typography variant="caption" color="text">
                Your current session
              </Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center">
            <Badge
              variant="contained"
              size="xs"
              badgeContent="active"
              color="success"
              container
            />
            <Box mx={2} lineHeight={1}>
              <Typography variant="button" color="secondary" fontWeight="regular">
                EU
              </Typography>
            </Box>
            <Typography
              component="a"
              href="#"
              variant="button"
              color="info"
              fontWeight="regular"
              sx={actionButtonStyles}
            >
              See more&nbsp;
              <Icon sx={{ fontWeight: "bold", verticalAlign: "middle" }}>arrow_forward</Icon>
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width={{ xs: "max-content", sm: "100%" }}
        >
          <Box display="flex" alignItems="center" mr={2}>
            <Box textAlign="center" color="text" px={{ xs: 0, md: 1.5 }} opacity={0.6}>
              <Icon fontSize="default">desktop_windows</Icon>
            </Box>
            <Box ml={2}>
              <Typography display="block" variant="body2" fontWeight="regular" color="text">
                Chrome on macOS
              </Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center">
            <Box mx={2} lineHeight={1}>
              <Typography variant="button" color="secondary" fontWeight="regular">
                US
              </Typography>
            </Box>
            <Typography
              component="a"
              href="#"
              variant="button"
              color="info"
              fontWeight="regular"
              sx={actionButtonStyles}
            >
              See more&nbsp;
              <Icon sx={{ fontWeight: "bold", verticalAlign: "middle" }}>arrow_forward</Icon>
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width={{ xs: "max-content", sm: "100%" }}
        >
          <Box display="flex" alignItems="center" mr={2}>
            <Box textAlign="center" color="text" px={{ xs: 0, md: 1.5 }} opacity={0.6}>
              <Icon fontSize="default">phone_iphone</Icon>
            </Box>
            <Box ml={2}>
              <Typography display="block" variant="body2" fontWeight="regular" color="text">
                Safari on iPhone
              </Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center">
            <Box mx={2} lineHeight={1}>
              <Typography variant="button" color="secondary" fontWeight="regular">
                US
              </Typography>
            </Box>
            <Typography
              component="a"
              href="#"
              variant="button"
              color="info"
              fontWeight="regular"
              sx={actionButtonStyles}
            >
              See more&nbsp;
              <Icon sx={{ fontWeight: "bold", verticalAlign: "middle" }}>arrow_forward</Icon>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

export default Sessions;
