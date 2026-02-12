

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";


import { Box } from "@mui/material";



import typography from "assets/theme/base/typography";
import { Typography } from "@mui/material";

function Footer({ company, links }) {
  const { href, name } = company;
  const { size } = typography;

  const renderLinks = () =>
    links.map((link) => (
      <Box key={link.name} component="li" px={2} lineHeight={1}>
        <Link href={link.href} target="_blank">
          <Typography variant="button" fontWeight="regular" color="text">
            {link.name}
          </Typography>
        </Link>
      </Box>
    ));

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection={{ xs: "column", lg: "row" }}
      justifyContent="space-between"
      alignItems="center"
      px={1.5}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        color="text"
        fontSize={size.sm}
        px={1.5}
      >
        &copy; {new Date().getFullYear()}, made with
        <Box fontSize={size.md} color="text" mb={-0.5} mx={0.25}>
          <Icon color="inherit" fontSize="inherit">
            favorite
          </Icon>
        </Box>
        by
        <Link href={href} target="_blank">
          <Typography variant="button" fontWeight="medium">
            &nbsp;{name}&nbsp;
          </Typography>
        </Link>
        for a better web.
      </Box>
      <Box
        component="ul"
        sx={({ breakpoints }) => ({
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          listStyle: "none",
          mt: 3,
          mb: 0,
          p: 0,
          fontSize: 14,
          [breakpoints.up("lg")]: {
            mt: 0,
          },
        })}
      >
        Support : <a style={{ margin: "0 4px" }} href="tel:+01626001500">+01626001500</a> (whatsapp)
      </Box>
    </Box>
  );
}

// Setting default values for the props of Footer
Footer.defaultProps = {
  company: { href: "https://www.amarlodge.com/", name: "Amarlodge" },
  links: [
  ],
};

// Typechecking props for the Footer
Footer.propTypes = {
  company: PropTypes.objectOf(PropTypes.string),
  links: PropTypes.arrayOf(PropTypes.object),
};

export default Footer;
