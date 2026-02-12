

// @mui material components
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";


import { Box } from "@mui/material";


function TodoCard() {
  return (
    <Card>
      <Box bgColor="dark" variant="gradient">
        <Box p={3}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h5" color="white">
              To Do
            </Typography>
            <Box textAlign="center" lineHeight={1}>
              <Typography variant="h1" color="white" fontWeight="bold">
                7
              </Typography>
              <Typography variant="button" color="white" fontWeight="regular">
                items
              </Typography>
            </Box>
          </Box>
          <Typography variant="body2" color="white" fontWeight="regular">
            Shopping
          </Typography>
          <Typography variant="body2" color="white" fontWeight="regular">
            Meeting
          </Typography>
        </Box>
        <Tooltip title="Show More" placement="top" sx={{ cursor: "pointer" }}>
          <Box textAlign="center" color="white" py={0.5} lineHeight={0}>
            <Icon sx={{ fontWeight: "bold" }} color="inherit" fontSize="default">
              keyboard_arrow_down
            </Icon>
          </Box>
        </Tooltip>
      </Box>
    </Card>
  );
}

export default TodoCard;
