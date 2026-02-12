

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";


import { Box } from "@mui/material";

import { Button } from "@mui/material";
import { Badge } from "@mui/material";
import { Select } from "@mui/material";
import { Input } from "@mui/material";
import { Typography } from "@mui/material";

function ProductInfo() {
  const frameOptions = [
    { value: "aluminium", label: "Aluminium" },
    { value: "carbon", label: "Carbon" },
    { value: "steel", label: "Steel" },
    { value: "wood", label: "Wood" },
  ];

  const colorOptions = [
    { value: "black", label: "black" },
    { value: "blue", label: "blue" },
    { value: "gray", label: "gray" },
    { value: "pink", label: "pink" },
    { value: "red", label: "red" },
    { value: "white", label: "white" },
  ];

  return (
    <Box>
      <Box mb={1}>
        <Typography variant="h3" fontWeight="bold">
          Minimal Bar Stool
        </Typography>
      </Box>
      <Typography variant="h4" color="text">
        <Icon>star</Icon>
        <Icon>star</Icon>
        <Icon>star</Icon>
        <Icon>star</Icon>
        <Icon>star_half</Icon>
      </Typography>
      <Box mt={1}>
        <Typography variant="h6" fontWeight="medium">
          Price
        </Typography>
      </Box>
      <Box mb={1}>
        <Typography variant="h5" fontWeight="medium">
          $1,419
        </Typography>
      </Box>
      <Badge variant="contained" color="success" badgeContent="in stock" container />
      <Box mt={3} mb={1} ml={0.5}>
        <Typography variant="caption" fontWeight="bold">
          Description
        </Typography>
      </Box>
      <Box component="ul" m={0} pl={4} mb={2}>
        <Box component="li" color="text" fontSize="1.25rem" lineHeight={1}>
          <Typography variant="body2" color="text" verticalAlign="middle">
            The most beautiful curves of this swivel stool adds an elegant touch to any environment
          </Typography>
        </Box>
        <Box component="li" color="text" fontSize="1.25rem" lineHeight={1}>
          <Typography variant="body2" color="text" verticalAlign="middle">
            Memory swivel seat returns to original seat position
          </Typography>
        </Box>
        <Box component="li" color="text" fontSize="1.25rem" lineHeight={1}>
          <Typography variant="body2" color="text" verticalAlign="middle">
            Comfortable integrated layered chair seat cushion design
          </Typography>
        </Box>
        <Box component="li" color="text" fontSize="1.25rem" lineHeight={1}>
          <Typography variant="body2" color="text" verticalAlign="middle">
            Fully assembled! No assembly required
          </Typography>
        </Box>
      </Box>
      <Box mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={5}>
            <Box mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <Typography component="label" variant="caption" fontWeight="bold">
                Frame Material
              </Typography>
            </Box>
            <Select defaultValue={frameOptions[3]} options={frameOptions} />
          </Grid>
          <Grid item xs={12} lg={5}>
            <Box mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <Typography component="label" variant="caption" fontWeight="bold">
                Color
              </Typography>
            </Box>
            <Select defaultValue={colorOptions[5]} options={colorOptions} />
          </Grid>
          <Grid item xs={12} lg={2}>
            <Box mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <Typography component="label" variant="caption" fontWeight="bold">
                Quantity
              </Typography>
            </Box>
            <Input inputProps={{ type: "number" }} defaultValue={1} />
          </Grid>
        </Grid>
      </Box>
      <Box mt={3}>
        <Grid item xs={12} lg={5} container>
          <Button variant="gradient" color="info" fullWidth>
            Add To Cart
          </Button>
        </Grid>
      </Box>
    </Box>
  );
}

export default ProductInfo;
