// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

import { Badge, Box } from "@mui/material";

// Timeline context
import { useTimeline } from "examples/Timeline/context";

// Custom styles for the TimelineItem
import { timelineItem, timelineItemIcon } from "examples/Timeline/TimelineItem/styles";
import { Typography } from "@mui/material";

function TimelineItem({ color, icon, title, dateTime, description, badges, lastItem }) {
  const isDark = useTimeline();

  const renderBadges =
    badges.length > 0
      ? badges.map((badge, key) => {
          const badgeKey = `badge-${key}`;

          return (
            <Box key={badgeKey} mr={key === badges.length - 1 ? 0 : 0.5}>
              <Badge color={color} size="xs" badgeContent={badge} container />
            </Box>
          );
        })
      : null;

  return (
    <Box position="relative" sx={(theme) => timelineItem(theme, { lastItem })}>
      <Box
        bgColor={isDark ? "dark" : "white"}
        width="1.625rem"
        height="1.625rem"
        borderRadius="50%"
        position="absolute"
        top="3.25%"
        left="2px"
        zIndex={2}
      >
        <Icon sx={(theme) => timelineItemIcon(theme, { color })}>{icon}</Icon>
      </Box>
      <Box ml={5.75} pt={description ? 0.7 : 0.5} lineHeight={0} maxWidth="30rem">
        <Typography variant="button" fontWeight="medium" color={isDark ? "white" : "dark"}>
          {title}
        </Typography>
        <Box mt={0.5}>
          <Typography variant="caption" fontWeight="medium" color={isDark ? "secondary" : "text"}>
            {dateTime}
          </Typography>
        </Box>
        <Box mt={2} mb={1.5}>
          {description ? (
            <Typography variant="button" fontWeight="regular" color="text">
              {description}
            </Typography>
          ) : null}
        </Box>
        {badges.length > 0 ? (
          <Box display="flex" pb={lastItem ? 1 : 2}>
            {renderBadges}
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}

// Setting default values for the props of TimelineItem
TimelineItem.defaultProps = {
  color: "info",
  badges: [],
  lastItem: false,
  description: "",
};

// Typechecking props for the TimelineItem
TimelineItem.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  dateTime: PropTypes.string.isRequired,
  description: PropTypes.string,
  badges: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  lastItem: PropTypes.bool,
};

export default TimelineItem;
