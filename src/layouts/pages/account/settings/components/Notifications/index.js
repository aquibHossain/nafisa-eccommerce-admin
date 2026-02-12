

// @mui material components
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Switch from "@mui/material/Switch";


import { Box } from "@mui/material";


// Setting pages components
import TableCell from "layouts/pages/account/settings/components/TableCell";

function Notifications() {
  return (
    <Card id="notifications">
      <Box p={3} lineHeight={1}>
        <Box mb={1}>
          <Typography variant="h5">Notifications</Typography>
        </Box>
        <Typography variant="button" color="text" fontWeight="regular">
          Choose how you receive notifications. These notification settings apply to the things
          you’re watching.
        </Typography>
      </Box>
      <Box pb={3} px={3}>
        <Box minWidth="auto" sx={{ overflow: "scroll" }}>
          <Table sx={{ minWidth: "36rem" }}>
            <Box component="thead">
              <TableRow>
                <TableCell width="100%" padding={[1.5, 3, 1.5, 0.5]}>
                  Activity
                </TableCell>
                <TableCell align="center" padding={[1.5, 3, 1.5, 3]}>
                  Email
                </TableCell>
                <TableCell align="center" padding={[1.5, 3, 1.5, 3]}>
                  Push
                </TableCell>
                <TableCell align="center" padding={[1.5, 3, 1.5, 3]}>
                  SMS
                </TableCell>
              </TableRow>
            </Box>
            <TableBody>
              <TableRow>
                <TableCell padding={[1, 1, 1, 0.5]}>
                  <Box lineHeight={1.4}>
                    <Typography display="block" variant="button" fontWeight="regular">
                      Mentions
                    </Typography>
                    <Typography variant="caption" color="text" fontWeight="regular">
                      Notify when another user mentions you in a comment
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="center" padding={[1, 1, 1, 0.5]}>
                  <Switch defaultChecked />
                </TableCell>
                <TableCell align="center" padding={[1, 1, 1, 0.5]}>
                  <Switch />
                </TableCell>
                <TableCell align="center" padding={[1, 1, 1, 0.5]}>
                  <Switch />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell padding={[1, 1, 1, 0.5]}>
                  <Box lineHeight={1.4}>
                    <Typography display="block" variant="button" fontWeight="regular">
                      Comments
                    </Typography>
                    <Typography variant="caption" color="text" fontWeight="regular">
                      Notify when another user comments your item.
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="center" padding={[1, 1, 1, 0.5]}>
                  <Switch defaultChecked />
                </TableCell>
                <TableCell align="center" padding={[1, 1, 1, 0.5]}>
                  <Switch defaultChecked />
                </TableCell>
                <TableCell align="center" padding={[1, 1, 1, 0.5]}>
                  <Switch />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell padding={[1, 1, 1, 0.5]}>
                  <Box lineHeight={1.4}>
                    <Typography display="block" variant="button" fontWeight="regular">
                      Follows
                    </Typography>
                    <Typography variant="caption" color="text" fontWeight="regular">
                      Notify when another user follows you.
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="center" padding={[1, 1, 1, 0.5]}>
                  <Switch />
                </TableCell>
                <TableCell align="center" padding={[1, 1, 1, 0.5]}>
                  <Switch defaultChecked />
                </TableCell>
                <TableCell align="center" padding={[1, 1, 1, 0.5]}>
                  <Switch />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell padding={[1, 1, 1, 0.5]} noBorder>
                  <Typography
                    display="block"
                    variant="button"
                    color="text"
                    fontWeight="regular"
                  >
                    Log in from a new device
                  </Typography>
                </TableCell>
                <TableCell align="center" padding={[1, 1, 1, 0.5]} noBorder>
                  <Switch defaultChecked />
                </TableCell>
                <TableCell align="center" padding={[1, 1, 1, 0.5]} noBorder>
                  <Switch defaultChecked />
                </TableCell>
                <TableCell align="center" padding={[1, 1, 1, 0.5]} noBorder>
                  <Switch defaultChecked />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Box>
    </Card>
  );
}

export default Notifications;
