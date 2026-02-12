/* eslint-disable react/prop-types */

import { Box, Typography } from "@mui/material";

import { Avatar } from "@mui/material";
import { Badge } from "@mui/material";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

function Author({ image, name, email }) {
  return (
    <Box display="flex" alignItems="center" px={1} py={0.5}>
      <Box mr={2}>
        <Avatar src={image} alt={name} size="sm" variant="rounded" />
      </Box>
      <Box display="flex" flexDirection="column">
        <Typography variant="button" fontWeight="medium">
          {name}
        </Typography>
        <Typography variant="caption" color="secondary">
          {email}
        </Typography>
      </Box>
    </Box>
  );
}

function Function({ job, org }) {
  return (
    <Box display="flex" flexDirection="column">
      <Typography variant="caption" fontWeight="medium" color="text">
        {job}
      </Typography>
      <Typography variant="caption" color="secondary">
        {org}
      </Typography>
    </Box>
  );
}

const authorsTableData = {
  columns: [
    { name: "author", align: "left" },
    { name: "function", align: "left" },
    { name: "status", align: "center" },
    { name: "employed", align: "center" },
    { name: "action", align: "center" },
  ],

  rows: [
    {
      author: <Author image={team2} name="John Michael" email="john@brain-schema.com" />,
      function: <Function job="Manager" org="Organization" />,
      status: <Badge variant="contained" badgeContent="online" color="success" size="xs" />,
      employed: (
        <Typography variant="caption" color="secondary" fontWeight="medium">
          23/04/18
        </Typography>
      ),
      action: (
        <Typography
          component="a"
          href="#"
          variant="caption"
          color="secondary"
          fontWeight="medium"
        >
          Edit
        </Typography>
      ),
    },
    {
      author: <Author image={team3} name="Alexa Liras" email="alexa@brain-schema.com" />,
      function: <Function job="Programator" org="Developer" />,
      status: <Badge variant="contained" badgeContent="offline" color="secondary" size="xs" />,
      employed: (
        <Typography variant="caption" color="secondary" fontWeight="medium">
          11/01/19
        </Typography>
      ),
      action: (
        <Typography
          component="a"
          href="#"
          variant="caption"
          color="secondary"
          fontWeight="medium"
        >
          Edit
        </Typography>
      ),
    },
    {
      author: <Author image={team4} name="Laurent Perrier" email="laurent@brain-schema.com" />,
      function: <Function job="Executive" org="Projects" />,
      status: <Badge variant="contained" badgeContent="online" color="success" size="xs" />,
      employed: (
        <Typography variant="caption" color="secondary" fontWeight="medium">
          19/09/17
        </Typography>
      ),
      action: (
        <Typography
          component="a"
          href="#"
          variant="caption"
          color="secondary"
          fontWeight="medium"
        >
          Edit
        </Typography>
      ),
    },
    {
      author: <Author image={team3} name="Michael Levi" email="michael@brain-schema.com" />,
      function: <Function job="Programator" org="Developer" />,
      status: <Badge variant="contained" badgeContent="online" color="success" size="xs" />,
      employed: (
        <Typography variant="caption" color="secondary" fontWeight="medium">
          24/12/08
        </Typography>
      ),
      action: (
        <Typography
          component="a"
          href="#"
          variant="caption"
          color="secondary"
          fontWeight="medium"
        >
          Edit
        </Typography>
      ),
    },
    {
      author: <Author image={team2} name="Richard Gran" email="richard@brain-schema.com" />,
      function: <Function job="Manager" org="Executive" />,
      status: <Badge variant="contained" badgeContent="offline" color="secondary" size="xs" />,
      employed: (
        <Typography variant="caption" color="secondary" fontWeight="medium">
          04/10/21
        </Typography>
      ),
      action: (
        <Typography
          component="a"
          href="#"
          variant="caption"
          color="secondary"
          fontWeight="medium"
        >
          Edit
        </Typography>
      ),
    },
  ],
};

export default authorsTableData;
