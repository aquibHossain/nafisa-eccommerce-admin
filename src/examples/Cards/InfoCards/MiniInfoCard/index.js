// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import Icon from "@mui/material/Icon";


import { Box } from "@mui/material";

function MiniInfoCard({ color, icon, title, description }) {
  return (
    <Card>
      <Box p={3}>
        <Box
          display="grid"
          justifyContent="center"
          alignItems="center"
          bgColor={color}
          color="white"
          width="3rem"
          height="3rem"
          shadow="md"
          borderRadius="lg"
          variant="gradient"
        >
          <Icon fontSize="default">{icon}</Icon>
        </Box>
        <Box mt={2}>
          <Typography variant="h5" fontWeight="medium" textTransform="capitalize">
            {title}
          </Typography>
          <Typography variant="body2" color="text" fontWeight="regular">
            {description}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}

// Setting default values for the props of MiniInfoCard
MiniInfoCard.defaultProps = {
  color: "info",
};

// Typechecking props for the MiniInfoCard
MiniInfoCard.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  description: PropTypes.string.isRequired,
};

export default MiniInfoCard;
