

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";


import { Box } from "@mui/material";


function TransparentInfoCard({ color, icon, description, value }) {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" textAlign="center" p={3}>
      <Box
        display="grid"
        justifyContent="center"
        alignItems="center"
        bgColor={color}
        color="white"
        width="3rem"
        height="3rem"
        shadow="md"
        borderRadius="md"
        variant="gradient"
        mb={1}
      >
        <Icon fontSize="default">{icon}</Icon>
      </Box>
      <Box mb={1} lineHeight={0}>
        <Typography variant="button" color="text" fontWeight="medium">
          {description}
        </Typography>
      </Box>
      {value && (
        <Typography variant="h5" fontWeight="bold">
          {value}
        </Typography>
      )}
    </Box>
  );
}

// Setting default values for the props of TransparentInfoCard
TransparentInfoCard.defaultProps = {
  color: "info",
  value: "",
};

// Typechecking props for the TransparentInfoCard
TransparentInfoCard.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  icon: PropTypes.node.isRequired,
  description: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.node]),
};

export default TransparentInfoCard;
