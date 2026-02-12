// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Link from "@mui/material/Link";

import { Box, Typography } from "@mui/material";

import { Avatar } from "@mui/material";

import colors from "assets/theme/base/colors";

function DefaultProfileCard({ image, name, position, description, social }) {
  const { socialMediaColors } = colors;

  // Render the social media icons
  const renderSocial = social.map(({ link, icon, color }, key) => (
    <Box
      key={color}
      component={Link}
      href={link}
      target="_blank"
      rel="noreferrer"
      fontSize="1.375rem"
      color={socialMediaColors[color].main}
      py={2}
      pr={2}
      pl={key === 0 ? 0 : 2}
      lineHeight={1}
    >
      {icon}
    </Box>
  ));

  return (
    <Box>
      <Avatar src={image} alt={name} size="xxl" shadow="xl" variant="rounded" />
      <Box py={2.5} pr={4}>
        <Typography variant="h5">{name}</Typography>
        <Typography variant="body2" color="text">
          {position}
        </Typography>
        {description && (
          <Box my={2}>
            <Typography variant="body2" color="text">
              {description}
            </Typography>
          </Box>
        )}
        <Box display="flex">{renderSocial}</Box>
      </Box>
    </Box>
  );
}

// Setting default props for the DefaultProfileCard
DefaultProfileCard.defaultProps = {
  description: "",
  social: [{}],
};

// Typechecking props for the DefaultProfileCard
DefaultProfileCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  description: PropTypes.string,
  social: PropTypes.arrayOf(PropTypes.object),
};

export default DefaultProfileCard;
