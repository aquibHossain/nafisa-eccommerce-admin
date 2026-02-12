// react-router components
import { Link } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import { Avatar, Badge, Box, Button, Typography } from "@mui/material";

// Charg Dashboard MUI contexts
import { useArgonController } from "context";

function AnnouncementCard({ by, badge, title, description, value, action }) {
  const [controller] = useArgonController();
  const { darkMode } = controller;

  return (
    <Card>
      <Box display="flex" justifyContent="space-between" alignItems="flex-start" p={2}>
        {by.image || by.name || by.date ? (
          <Box display="flex" mr={2}>
            {by.image ? <Avatar src={by.image} alt={by.name} size="sm" variant="rounded" /> : null}
            <Box display="flex" flexDirection="column" justifyContent="center" ml={1}>
              {by.name ? (
                <Typography variant="button" fontWeight="medium" textTransform="capitalize">
                  {by.name}
                </Typography>
              ) : null}
              {by.date ? (
                <Typography variant="caption" color="text">
                  {by.date}
                </Typography>
              ) : null}
            </Box>
          </Box>
        ) : null}
        {badge.color && badge.label ? (
          <Badge color={badge.color} badgeContent={badge.label} size="sm" container />
        ) : null}
      </Box>
      <Box pt={0.5} pb={2} px={2}>
        <Typography variant="h6">{title}</Typography>
        <Box mt={1} mb={2} lineHeight={0}>
          <Typography variant="button" fontWeight="regular" color="text">
            {description}
          </Typography>
        </Box>
        <Box
          bgColor={darkMode ? "dark" : "grey-100"}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          borderRadius="lg"
          p={2}
        >
          {value.amount ? (
            <Typography variant="h4">
              {value.method ? (
                <Box component="span" mr={0.5}>
                  <Typography
                    variant="button"
                    color={darkMode ? "text" : "secondary"}
                    fontWeight="medium"
                    verticalAlign="text-bottom"
                  >
                    {value.type}
                  </Typography>
                </Box>
              ) : null}
              {value.amount}
              {value.method ? (
                <Box component="span" ml={0.5}>
                  <Typography
                    variant="button"
                    color={darkMode ? "text" : "secondary"}
                    fontWeight="medium"
                    verticalAlign="text-bottom"
                  >
                    / {value.method}
                  </Typography>
                </Box>
              ) : null}
            </Typography>
          ) : (
            <Box />
          )}
          {action.type === "internal" ? (
            <Button
              component={Link}
              to={action.route}
              variant="outlined"
              color={darkMode ? "white" : "dark"}
            >
              {action.label}
            </Button>
          ) : (
            <Button
              component="a"
              href={action.route}
              target="_blank"
              rel="noreferrer"
              variant="outlined"
              color={darkMode ? "white" : "dark"}
            >
              {action.label}
            </Button>
          )}
        </Box>
      </Box>
    </Card>
  );
}

// Setting default values for the props of AnnouncementCard
AnnouncementCard.defaultProps = {
  by: {},
  badge: {},
  value: {},
};

// Typechecking props for the AnnouncementCard
AnnouncementCard.propTypes = {
  by: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    date: PropTypes.string,
  }),
  badge: PropTypes.shape({
    color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
    label: PropTypes.string,
  }),
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  value: PropTypes.shape({
    type: PropTypes.string,
    amount: PropTypes.string,
    method: PropTypes.string,
  }),
  action: PropTypes.shape({
    type: PropTypes.oneOf(["enternal", "internal"]).isRequired,
    route: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
};

export default AnnouncementCard;
