

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Link from "@mui/material/Link";


import { Box } from "@mui/material";



import colors from "assets/theme/base/colors";

function ComplexProfileCard({ image, name, position, description, social }) {
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
      py={1.5}
      pr={1.5}
      pl={key === 0 ? 0 : 1.5}
      lineHeight={1}
    >
      {icon}
    </Box>
  ));

  return (
    <Box width="100%" height="100%" display="flex" alignItems="center">
      <Box width="40%" height="100%">
        <Box
          component="img"
          src={image}
          alt={name}
          shadow="lg"
          borderRadius="lg"
          width="100%"
          height="100%"
          sx={{ objectFit: "cover" }}
        />
      </Box>
      <Box width="60%" py={2.5} px={4}>
        <Box mb={1} lineHeight={1}>
          <Typography variant="h5" fontWeight="bold">
            {name}
          </Typography>
          <Typography
            variant="button"
            color="text"
            textTransform="uppercase"
            fontWeight="medium"
          >
            {position}
          </Typography>
        </Box>
        <Box mb={3}>
          <Typography variant="body2" color="text">
            {description}
          </Typography>
        </Box>
        <Box display="flex">{renderSocial}</Box>
      </Box>
    </Box>
  );
}

// Setting default props for the ComplexProfileCard
ComplexProfileCard.defaultProps = {
  description: "",
  social: [{}],
};

// Typechecking props for the ComplexProfileCard
ComplexProfileCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  description: PropTypes.string,
  social: PropTypes.arrayOf(PropTypes.object),
};

export default ComplexProfileCard;
