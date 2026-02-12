

// react-router components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";
import MuiLink from "@mui/material/Link";


import { Box } from "@mui/material";


// Custom styles for the WavedBlogCard
import WavedBlogCardWavesRoot from "examples/Cards/BlogCards/WavedBlogCard/WavedBlogCardWavesRoot";
import { Card, Typography } from "@mui/material";

function WavedBlogCard({ image, title, description, action }) {
  const cardActionStyles = {
    display: "inline-block",
    textDecoration: "none",

    "& .MuiTypography-root": {
      display: "flex",
      alignItems: "center",
    },

    "& .material-icons, .material-icons-round,": {
      fontSize: "1.125rem",
      transform: `translateX(2px)`,
      transition: "transform 0.2s cubic-bezier(0.34,1.61,0.7,1.3)",
    },

    "&:hover .material-icons, &:focus .material-icons, &:hover .material-icons-round, &:focus .material-icons-round":
      {
        transform: `translateX(6px)`,
      },
  };

  return (
    <Card>
      <Box component="img" src={image} alt={title} width="100%" />
      <Box position="relative" height="3.125rem" overflow="hidden" zIndex={2} mt={-6.25}>
        <Box position="absolute" width="100%" top={0} zIndex={1}>
          <Box
            component="svg"
            position="relative"
            width="100%"
            height="3.125rem"
            minHeight="3.125rem"
            maxHeight="3.125rem"
            mb={-0.875}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 40"
            preserveAspectRatio="none"
            shapeRendering="auto"
          >
            <defs>
              <path
                id="card-wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <WavedBlogCardWavesRoot>
              <use xlinkHref="#card-wave" x="48" y="-1" fill="rgba(255,255,255,0.30" />
              <use xlinkHref="#card-wave" x="48" y="3" fill="rgba(255,255,255,0.35)" />
              <use xlinkHref="#card-wave" x="48" y="5" fill="rgba(255,255,255,0.25)" />
              <use xlinkHref="#card-wave" x="48" y="8" fill="rgba(255,255,255,0.20)" />
              <use xlinkHref="#card-wave" x="48" y="13" fill="rgba(255,255,255,0.15)" />
              <use xlinkHref="#card-wave" x="48" y="16" fill="rgba(255,255,255,0.99)" />
            </WavedBlogCardWavesRoot>
          </Box>
        </Box>
      </Box>
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        <Box mb={2}>
          <Typography variant="body2" component="p" color="text">
            {description}
          </Typography>
        </Box>
        {action.type === "internal" ? (
          <Link to={action.route} sx={cardActionStyles}>
            <Typography
              variant="body2"
              color={action.color}
              textTransform="capitalize"
              component="span"
            >
              {action.label}
              <Icon sx={{ fontWeight: "bold" }}>arrow_forward</Icon>
            </Typography>
          </Link>
        ) : (
          <MuiLink href={action.route} target="_blank" rel="noreferrer" sx={cardActionStyles}>
            <Typography
              variant="body2"
              color={action.color}
              textTransform="capitalize"
              component="span"
            >
              {action.label}
              <Icon sx={{ fontWeight: "bold" }}>arrow_forward</Icon>
            </Typography>
          </MuiLink>
        )}
      </Box>
    </Card>
  );
}

// Typechecking props for the WavedBlogCard
WavedBlogCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  action: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]),
    route: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    color: PropTypes.oneOf([
      "inherit",
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "light",
      "dark",
      "text",
    ]).isRequired,
  }).isRequired,
};

export default WavedBlogCard;
