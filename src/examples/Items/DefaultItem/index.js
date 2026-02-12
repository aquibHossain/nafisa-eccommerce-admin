import { forwardRef } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";


import { Box } from "@mui/material";


// custom styles for the DefaultItem
import { defaultItemIconBox, defaultItemIcon } from "examples/Items/DefaultItem/styles";

const DefaultItem = forwardRef(({ color, icon, title, description, ...rest }, ref) => (
  <Box {...rest} ref={ref} display="flex" alignItems="center">
    <Box sx={(theme) => defaultItemIconBox(theme, { color })}>
      <Icon fontSize="default" sx={(theme) => defaultItemIcon(theme, { color })}>
        {icon}
      </Icon>
    </Box>
    <Box ml={2} lineHeight={1}>
      <Typography display="block" variant="button" fontWeight="medium">
        {title}
      </Typography>
      <Typography variant="button" fontWeight="regular" color="text">
        {description}
      </Typography>
    </Box>
  </Box>
));

// Setting default values for the props of DefaultItem
DefaultItem.defaultProps = {
  color: "info",
};

// Typechecking props for the DefaultItem
DefaultItem.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default DefaultItem;
