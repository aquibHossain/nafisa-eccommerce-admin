

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";


import { Box } from "@mui/material";

import { Badge } from "@mui/material";
import { Avatar } from "@mui/material";

function TeamProfileCard({ color, title, description, industry, rating, members, dropdown }) {
  const ratings = {
    0.5: [
      <Icon key={1}>star_outline</Icon>,
      <Icon key={2}>star_outline</Icon>,
      <Icon key={3}>star_outline</Icon>,
      <Icon key={4}>star_outline</Icon>,
      <Icon key={5}>star_outline</Icon>,
    ],
    1: [
      <Icon key={1}>star</Icon>,
      <Icon key={2}>star_outline</Icon>,
      <Icon key={3}>star_outline</Icon>,
      <Icon key={4}>star_outline</Icon>,
      <Icon key={5}>star_outline</Icon>,
    ],
    1.5: [
      <Icon key={1}>star</Icon>,
      <Icon key={2}>star_half</Icon>,
      <Icon key={3}>star_outline</Icon>,
      <Icon key={4}>star_outline</Icon>,
      <Icon key={5}>star_outline</Icon>,
    ],
    2: [
      <Icon key={1}>star</Icon>,
      <Icon key={2}>star</Icon>,
      <Icon key={3}>star_outline</Icon>,
      <Icon key={4}>star_outline</Icon>,
      <Icon key={5}>star_outline</Icon>,
    ],
    2.5: [
      <Icon key={1}>star</Icon>,
      <Icon key={2}>star</Icon>,
      <Icon key={3}>star_half</Icon>,
      <Icon key={4}>star_outline</Icon>,
      <Icon key={5}>star_outline</Icon>,
    ],
    3: [
      <Icon key={1}>star</Icon>,
      <Icon key={2}>star</Icon>,
      <Icon key={3}>star</Icon>,
      <Icon key={4}>star_outline</Icon>,
      <Icon key={5}>star_outline</Icon>,
    ],
    3.5: [
      <Icon key={1}>star</Icon>,
      <Icon key={2}>star</Icon>,
      <Icon key={3}>star</Icon>,
      <Icon key={4}>star_half</Icon>,
      <Icon key={5}>star_outline</Icon>,
    ],
    4: [
      <Icon key={1}>star</Icon>,
      <Icon key={2}>star</Icon>,
      <Icon key={3}>star</Icon>,
      <Icon key={4}>star</Icon>,
      <Icon key={5}>star_outline</Icon>,
    ],
    4.5: [
      <Icon key={1}>star</Icon>,
      <Icon key={2}>star</Icon>,
      <Icon key={3}>star</Icon>,
      <Icon key={4}>star</Icon>,
      <Icon key={5}>star_half</Icon>,
    ],
    5: [
      <Icon key={1}>star</Icon>,
      <Icon key={2}>star</Icon>,
      <Icon key={3}>star</Icon>,
      <Icon key={4}>star</Icon>,
      <Icon key={5}>star</Icon>,
    ],
  };

  const renderMembers = members.map(({ image, name }) => (
    <Tooltip key={name} title={name} placement="bottom">
      <Avatar
        src={image}
        alt={name}
        size="xs"
        sx={({ borders: { borderWidth }, palette: { white } }) => ({
          ml: -1.25,
          border: `${borderWidth[2]} solid ${white.main}`,
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
      <Box p={3}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography
            variant="h5"
            fontWeight="medium"
            color={color}
            textTransform="capitalize"
            textGradient
          >
            {title}
          </Typography>
          {dropdown && (
            <Typography
              color="secondary"
              onClick={dropdown.action}
              sx={{
                width: "16px",
                cursor: "pointer",
              }}
            >
              <Icon fontSize="default">more_vert</Icon>
            </Typography>
          )}
          {dropdown.menu}
        </Box>
        <Box mb={2}>
          <Typography variant="body2" color="text">
            {description}
          </Typography>
        </Box>
        <Box component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {industry ? (
            <Box component="li" display="flex" flexDirection="column">
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" color="text">
                  Industry:
                </Typography>
                <Badge
                  variant="contained"
                  color="secondary"
                  size="md"
                  badgeContent={industry}
                  container
                />
              </Box>
              <Divider />
            </Box>
          ) : null}
          {rating ? (
            <Box component="li" display="flex" flexDirection="column">
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" color="text">
                  Rating:
                </Typography>
                <Box
                  sx={({ functions: { pxToRem }, palette: { text } }) => ({
                    fontSize: pxToRem(24),
                    lineHeight: 0,
                    color: text.main,
                  })}
                >
                  {ratings[rating]}
                </Box>
              </Box>
              <Divider />
            </Box>
          ) : null}
          {members ? (
            <Box
              component="li"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body2" color="text">
                Members:
              </Typography>
              <Box display="flex">{renderMembers}</Box>
            </Box>
          ) : null}
        </Box>
      </Box>
    </Card>
  );
}

// Setting default values for the props of TeamProfileCard
TeamProfileCard.defaultProps = {
  color: "info",
  industry: "",
  rating: 0,
  members: [],
  dropdown: false,
};

// Typechecking props for the TeamProfileCard
TeamProfileCard.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  industry: PropTypes.string,
  rating: PropTypes.number,
  members: PropTypes.arrayOf(PropTypes.object),
  dropdown: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      action: PropTypes.func,
      menu: PropTypes.node,
    }),
  ]),
};

export default TeamProfileCard;
