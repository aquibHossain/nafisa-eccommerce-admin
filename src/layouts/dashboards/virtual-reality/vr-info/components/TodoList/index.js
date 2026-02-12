

// @mui material components
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";


import { Box } from "@mui/material";


import { useArgonController } from "context";

function TodoList() {
  const [controller] = useArgonController();
  const { darkMode } = controller;

  return (
    <Card sx={{ height: "100%" }}>
      <Box p={3}>
        <Box display="flex" lineHeight={1}>
          <Box mr={2}>
            <Typography variant="h6" fontWeight="medium">
              08:00
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="medium">
              Synk up with Mark
            </Typography>
            <Typography variant="button" fontWeight="regular" color="secondary">
              Hangouts
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box display="flex" lineHeight={0}>
          <Box mr={2}>
            <Typography variant="h6" fontWeight="medium">
              09:30
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="medium">
              Gym
            </Typography>
            <Typography variant="button" fontWeight="regular" color="secondary">
              World Class
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box display="flex" lineHeight={1}>
          <Box mr={2}>
            <Typography variant="h6" fontWeight="medium">
              11:00
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="medium">
              Design Review
            </Typography>
            <Typography variant="button" fontWeight="regular" color="secondary">
              Zoom
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box bgColor={darkMode ? "transparent" : "grey-100"} mt="auto">
        <Tooltip title="Show More" placement="top" sx={{ cursor: "pointer" }}>
          <Box textAlign="center" py={0.5} color="info" lineHeight={0}>
            <Icon sx={{ fontWeight: "bold" }} color="inherit" fontSize="default">
              keyboard_arrow_down
            </Icon>
          </Box>
        </Tooltip>
      </Box>
    </Card>
  );
}

export default TodoList;
