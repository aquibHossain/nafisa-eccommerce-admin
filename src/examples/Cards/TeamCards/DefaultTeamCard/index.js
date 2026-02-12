

// react-router components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import MuiLink from "@mui/material/Link";


import { Box } from "@mui/material";


function DefaultTeamCard({ image, name, jobTitle, action }) {
  const template = (
    <Card>
      <Box p={2} textAlign="center" lineHeight={1}>
        <Box component="img" src={image} alt={name} width="100%" borderRadius="md" />
        <Box mt={2} mb={0.5}>
          <Typography variant="h5" textTransform="capitalize">
            {name}
          </Typography>
        </Box>
        <Typography
          variant="caption"
          textTransform="uppercase"
          fontWeight="bold"
          color={jobTitle.color ? jobTitle.color : "info"}
          textGradient
        >
          {jobTitle.label}
        </Typography>
      </Box>
    </Card>
  );

  return action.type === "external" ? (
    <MuiLink href={action.route} target="_blank" rel="noreferrer">
      {template}
    </MuiLink>
  ) : (
    <Link to={action.route}>{template}</Link>
  );
}

// Typechecking props for the DefaultTeamCard
DefaultTeamCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  jobTitle: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "light",
    ]),
    label: PropTypes.string.isRequired,
  }).isRequired,
  action: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]).isRequired,
    route: PropTypes.string.isRequired,
  }).isRequired,
};

export default DefaultTeamCard;
