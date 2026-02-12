/* eslint-disable react/prop-types */
// @mui material components
import Icon from "@mui/material/Icon";


import { Box, Typography } from "@mui/material";

import { Badge } from "@mui/material";
import ArgonProgress from "components/ArgonProgress";

// Images
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import logoJira from "assets/images/small-logos/logo-jira.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoWebDev from "assets/images/small-logos/logo-webdev.svg";
import logoXD from "assets/images/small-logos/logo-xd.svg";

function Completion({ value, color }) {
  return (
    <Box display="flex" alignItems="center">
      <Typography variant="caption" color="text">
        {value}%
      </Typography>
      <Box width="8rem" ml={1}>
        <ArgonProgress value={value} color={color} label={false} />
      </Box>
    </Box>
  );
}

const action = (
  <Icon
    sx={{
      cursor: "pointer",
      fontWeight: "bold",
      mt: 0.625,
      color: ({ palette: { dark } }) => dark.main,
    }}
    fontSize="small"
  >
    more_vert
  </Icon>
);

const projectsTableData = {
  columns: [
    { name: "project", align: "left" },
    { name: "budget", align: "left" },
    { name: "status", align: "left" },
    { name: "completion", align: "center" },
    { name: "action", align: "center" },
  ],

  rows: [
    {
      project: [logoSpotify, "Spotift"],
      budget: (
        <Typography variant="caption" color="text" fontWeight="medium">
          $2,500
        </Typography>
      ),
      status: <Badge color="info" badgeContent="working" size="xs" sx={{ px: 0 }} />,
      completion: <Completion value={60} color="info" />,
      action,
    },
    {
      project: [logoInvesion, "Invesion"],
      budget: (
        <Typography variant="caption" color="text" fontWeight="medium">
          $5,000
        </Typography>
      ),
      status: <Badge color="success" badgeContent="done" size="xs" sx={{ px: 0 }} />,
      completion: <Completion value={100} color="success" />,
      action,
    },
    {
      project: [logoJira, "Jira"],
      budget: (
        <Typography variant="caption" color="text" fontWeight="medium">
          $3,400
        </Typography>
      ),
      status: <BadgeDot color="error" badgeContent="canceled" size="xs" sx={{ px: 0 }} />,
      completion: <Completion value={30} color="error" />,
      action,
    },
    {
      project: [logoSlack, "Slack"],
      budget: (
        <Typography variant="caption" color="text" fontWeight="medium">
          $1,400
        </Typography>
      ),
      status: <BadgeDot color="error" badgeContent="canceled" size="xs" sx={{ px: 0 }} />,
      completion: <Completion value={0} color="error" />,
      action,
    },
    {
      project: [logoWebDev, "Webdev"],
      budget: (
        <Typography variant="caption" color="text" fontWeight="medium">
          $14,000
        </Typography>
      ),
      status: <BadgeDot color="info" badgeContent="working" size="xs" sx={{ px: 0 }} />,
      completion: <Completion value={80} color="info" />,
      action,
    },
    {
      project: [logoXD, "Adobe XD"],
      budget: (
        <Typography variant="caption" color="text" fontWeight="medium">
          $2,300
        </Typography>
      ),
      status: <BadgeDot color="success" badgeContent="done" size="xs" sx={{ px: 0 }} />,
      completion: <Completion value={100} color="success" />,
      action,
    },
  ],
};

export default projectsTableData;
