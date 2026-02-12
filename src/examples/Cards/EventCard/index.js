// react-router components
import { Link } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";

import { Box } from "@mui/material";

import { Button } from "@mui/material";
import { Avatar } from "@mui/material";

function EventCard({ id, image, title, dateTime, description, members, action }) {
  const renderMembers = members.map(({ image: media, name }) => (
    <Tooltip key={name} title={name} placement="bottom">
      <Avatar
        src={media}
        alt={name}
        size="xs"
        sx={({ borders: { borderWidth }, palette: { white } }) => ({
          border: `${borderWidth[2]} solid ${white.main}`,
          ml: -1.25,
          cursor: "pointer",
          position: "relative",

          "&:hover, &:focus": {
            zIndex: "10",
          },
        })}
      />
    </Tooltip>
  ));

  return (
    <Card>
      <Box p={2}>
        <Box display="flex" alignItems="center">
          <Avatar src={image} alt={title} size="lg" variant="rounded" />
          <Box ml={1} lineHeight={0}>
            <Typography variant="h6" fontWeight="medium" textTransform="capitalize">
              {title}
            </Typography>
            {dateTime ? (
              <Typography
                variant="caption"
                fontWeight="regular"
                color="text"
                textTransform="capitalize"
              >
                {dateTime}
              </Typography>
            ) : null}
          </Box>
        </Box>
        <Box my={2}>
          <Typography variant="body2" color="text">
            {description}
          </Typography>
        </Box>
        {id ? (
          <Box>
            <Typography component="span" variant="body2" fontWeight="bold" color="text">
              Meeting ID:&nbsp;
            </Typography>
            <Typography component="span" variant="body2" color="text">
              {id}
            </Typography>
          </Box>
        ) : null}
        <Divider />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {action.type === "internal" ? (
            <Button component={Link} to={action.route} color={action.color} size="small">
              {action.label}
            </Button>
          ) : (
            <Button component="a" href={action.route} color={action.color} size="small">
              {action.label}
            </Button>
          )}
          <Box display="flex">{renderMembers}</Box>
        </Box>
      </Box>
    </Card>
  );
}

// Setting default values for the props of EventCard
EventCard.defaultProps = {
  id: "",
  dateTime: "",
  members: [],
};

// Typechecking props for the EventCard
EventCard.propTypes = {
  image: PropTypes.string.isRequired,
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  dateTime: PropTypes.string,
  description: PropTypes.node.isRequired,
  members: PropTypes.arrayOf(PropTypes.object),
  action: PropTypes.shape({
    type: PropTypes.oneOf(["enternal", "internal"]).isRequired,
    route: PropTypes.string.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "light",
    ]).isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
};

export default EventCard;
