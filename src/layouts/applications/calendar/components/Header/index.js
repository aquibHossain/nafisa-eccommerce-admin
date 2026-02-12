// @mui material components
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";


import { Box } from "@mui/material";

import { Avatar } from "@mui/material";
import { Button } from "@mui/material";

// Image
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import team5 from "assets/images/team-5.jpg";
import { Typography } from "@mui/material";

function Header() {
  const avatarStyles = {
    border: ({ borders: { borderWidth }, palette: { white } }) =>
      `${borderWidth[2]} solid ${white.main}`,
    cursor: "pointer",
    position: "relative",
    ml: -1.5,

    "&:hover, &:focus": {
      zIndex: "10",
    },
  };

  return (
    <Box display="flex" alignItems="center">
      <Box mt={0.5} pr={1}>
        <Box mb={1} ml={-1.5} lineHeight={0} position="relative">
          <Typography variant="caption" color="white" fontWeight="medium">
            Team members:
          </Typography>
        </Box>
        <Box display="flex">
          <Tooltip title="Jessica Rowland" placement="top">
            <Avatar src={team1} alt="team-1" size="sm" sx={avatarStyles} />
          </Tooltip>
          <Tooltip title="Audrey Love" placement="top">
            <Avatar src={team2} alt="team-1" size="sm" sx={avatarStyles} />
          </Tooltip>
          <Tooltip title="Michael Lewis" placement="top">
            <Avatar src={team3} alt="team-1" size="sm" sx={avatarStyles} />
          </Tooltip>
          <Tooltip title="Lucia Linda" placement="top">
            <Avatar src={team4} alt="team-1" size="sm" sx={avatarStyles} />
          </Tooltip>
          <Tooltip title="Ronald Miller" placement="top">
            <Avatar src={team5} alt="team-1" size="sm" sx={avatarStyles} />
          </Tooltip>
        </Box>
      </Box>
      <Box height="100%" alignSelf="flex-end">
        <Divider orientation="vertical" light />
      </Box>
      <Box pl={1}>
        <Button variant="outlined" color="white" iconOnly>
          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
        </Button>
      </Box>
    </Box>
  );
}

export default Header;
