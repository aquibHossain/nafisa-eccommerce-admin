

// @mui material components
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";

// Soft UI Dasboard PRO Material components
import { Box } from "@mui/material";


// General page components
import Todo from "layouts/pages/projects/general/components/Todo";

function TodoList() {
  return (
    <Card>
      <Box display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <Typography variant="h6" fontWeight="medium">
          To do list
        </Typography>
        <Typography variant="button" fontWeight="regular" color="text">
          23 - 30 March 2020
        </Typography>
      </Box>
      <Divider />
      <Box pb={2} px={2}>
        <Box component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <Todo
            title="Check status"
            date="24 March 2019"
            project="2414_VR4sf3#"
            company="Amarlodge"
            defaultChecked
          />
          <Todo
            title="Management discussion"
            date="24 March 2019"
            project="4411_8sIsdd23"
            company="Apple"
            defaultChecked
          />
          <Todo
            title="New channel distribution"
            date="25 March 2019"
            project="827d_kdl33D1s"
            company="Slack"
            defaultChecked
          />
          <Todo
            title="IOS App development"
            date="26 March 2019"
            project="88s1_349DA2sa"
            company="Facebook"
            noDivider
          />
        </Box>
      </Box>
    </Card>
  );
}

export default TodoList;
