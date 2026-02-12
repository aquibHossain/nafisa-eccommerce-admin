

import { useState } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Soft UI Dasboard PRO Material components
import { Box } from "@mui/material";


// Soft UI Dasboard PRO Material base styles
import borders from "assets/theme/base/borders";

function Todo({ title, date, project, company, defaultChecked, noDivider }) {
  const { borderWidth } = borders;
  const [openMenu, setOpenMenu] = useState(null);

  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(null);

  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      keepMounted
    >
      <MenuItem onClick={handleCloseMenu}>Action</MenuItem>
      <MenuItem onClick={handleCloseMenu}>Another action</MenuItem>
      <MenuItem onClick={handleCloseMenu}>Something else here</MenuItem>
    </Menu>
  );

  return (
    <Box component="li" width="100%" pr={2} mb={2} sx={{ listStyle: "none" }}>
      <Box width="100%" pl={1} ml={2}>
        <Box display="flex" alignItems="center">
          <Checkbox defaultChecked={defaultChecked} />
          <Box ml={0.2} lineHeight={1}>
            <Typography variant="button" fontWeight="medium">
              {title}
            </Typography>
          </Box>
          <Box ml="auto" color="secondary" pr={3} lineHeight={0}>
            <Icon fontSize="default" sx={{ cursor: "pointer" }} onClick={handleOpenMenu}>
              more_horiz
            </Icon>
          </Box>
          {renderMenu()}
        </Box>
        <Box
          display="flex"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mt={2}
          ml={3}
          pl={0.5}
        >
          <Box lineHeight={1} mb={{ xs: 1, sm: 0 }}>
            <Typography
              display="block"
              variant="caption"
              fontWeight="medium"
              color="secondary"
            >
              Date
            </Typography>
            <Typography variant="caption" fontWeight="bold" color="text">
              {date}
            </Typography>
          </Box>
          <Box ml={{ xs: 0, sm: "auto" }} mb={{ xs: 1, sm: 0 }} lineHeight={1}>
            <Typography
              display="block"
              variant="caption"
              fontWeight="medium"
              color="secondary"
            >
              Project
            </Typography>
            <Typography variant="caption" fontWeight="bold" color="text">
              {project}
            </Typography>
          </Box>
          <Box mx={{ xs: 0, sm: "auto" }} lineHeight={1}>
            <Typography
              display="block"
              variant="caption"
              fontWeight="medium"
              color="secondary"
            >
              Company
            </Typography>
            <Typography variant="caption" fontWeight="bold" color="text">
              {company}
            </Typography>
          </Box>
        </Box>
      </Box>
      {noDivider ? null : <Divider sx={{ marginBottom: 0 }} />}
    </Box>
  );
}

// Setting default values for the props of Todo
Todo.defaultProps = {
  noDivider: false,
  defaultChecked: false,
};

// Typechecking props for the Todo
Todo.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  project: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  defaultChecked: PropTypes.bool,
  noDivider: PropTypes.bool,
};

export default Todo;
