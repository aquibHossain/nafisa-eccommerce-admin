// @mui material components
import { Typography, Box } from "@mui/material";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

function ActionCell() {
  return (
    <Box display="flex" alignItems="center">
      <Typography variant="body1" color="secondary" sx={{ cursor: "pointer", lineHeight: 0 }}>
        <Tooltip title="Preview product" placement="top">
          <Icon>visibility</Icon>
        </Tooltip>
      </Typography>
      <Box mx={2}>
        <Typography variant="body1" color="secondary" sx={{ cursor: "pointer", lineHeight: 0 }}>
          <Tooltip title="Edit product" placement="top">
            <Icon>edit</Icon>
          </Tooltip>
        </Typography>
      </Box>
      <Typography variant="body1" color="secondary" sx={{ cursor: "pointer", lineHeight: 0 }}>
        <Tooltip title="Delete product" placement="left">
          <Icon>delete</Icon>
        </Tooltip>
      </Typography>
    </Box>
  );
}

export default ActionCell;
