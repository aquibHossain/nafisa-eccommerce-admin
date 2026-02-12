

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";


import { Box } from "@mui/material";

import ArgonProgress from "components/ArgonProgress";


import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";

function SocialItem({ icon, title, percentage }) {
  const { socialMediaColors } = colors;
  const { size } = typography;

  return (
    <Box width="100%" py={1} mb={1}>
      <Box display="flex" justifyContent="space-between" mb={1}>
        <Box display="flex" alignItems="center" lineHeight={0}>
          <Box mr={1} color={socialMediaColors[icon.color].main} fontSize={size.lg}>
            {icon.component}
          </Box>
          <Typography variant="button" fontWeight="medium" color="text">
            {title}
          </Typography>
        </Box>
        <Typography variant="button" fontWeight="medium" color="text">
          {percentage}%
        </Typography>
      </Box>
      <ArgonProgress value={percentage} color="dark" />
    </Box>
  );
}

// Typechecking props for the SocialItem
SocialItem.propTypes = {
  icon: PropTypes.shape({
    color: PropTypes.oneOf([
      "facebook",
      "twitter",
      "instagram",
      "linkedin",
      "pinterest",
      "youtube",
      "vimeo",
      "slack",
      "dribbble",
      "github",
      "reddit",
      "tumblr",
    ]).isRequired,
    component: PropTypes.node.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
  percentage: PropTypes.number.isRequired,
};

export default SocialItem;
