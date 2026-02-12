import PropTypes from "prop-types";
import {
  Checkbox,
  Box,
  FormControl,
  ListItemText,
  MenuItem,
  Select,
  Typography,
  Grid,
} from "@mui/material";
import { useState, useEffect } from "react";
import FormField from "layouts/ecommerce/products/new-product/components/FormField";

function Pricing({ formData, setFormData }) {
  const [selectedTags, setSelectedTags] = useState(formData?.tags || []);

  const tagOptions = ["Brand", "Gadget", "In Stock", "Sale"];

  const handleTagChange = (event) => {
    const tags = event.target.value;
    setSelectedTags(tags);
    setFormData({ ...formData, tags });
  };

  // const handleFieldChange = (field, value) => {
  //   setFormData({ ...formData, [field]: value });
  // };

  const submitData = {
    ...formData,
    displayPrice: parseFloat(formData.displayPrice),
    price: parseFloat(formData.price),
  };

  const handleFieldChange = (field, value) => {
    const parsedValue = field === "price" || field === "displayPrice" ? parseFloat(value) : value;
    setFormData({ ...formData, [field]: parsedValue });
  };

  useEffect(() => {
    setFormData({ ...formData, tags: selectedTags });
  }, [selectedTags, setFormData]);

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Pricing
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormField
            required
            fullWidth
            label="Price"
            type="number"
            variant="outlined"
            placeholder="1200"
            value={formData?.price || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                price: e.target.value ? parseFloat(e.target.value) : "",
              })
            }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormField
            required
            fullWidth
            label="Display Price"
            type="number"
            variant="outlined"
            placeholder="1500"
            value={formData?.displayPrice || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                displayPrice: e.target.value ? parseFloat(e.target.value) : "",
              })
            }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormField
            type="text"
            label="SKU"
            placeholder="007"
            value={formData?.sku || ""}
            onChange={(e) => handleFieldChange("sku", e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormField
            type="text"
            label="Youtube Link"
            placeholder="www.youtube.com"
            value={formData?.youtube || ""}
            onChange={(e) => handleFieldChange("youtube", e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box mt={1.5}>
            <Typography
              component="label"
              variant="caption"
              fontWeight="bold"
              mb={1}
              display="block"
            >
              Tags
            </Typography>
            <FormControl fullWidth>
              <Select
                multiple
                value={selectedTags}
                onChange={handleTagChange}
                renderValue={(selected) => selected.join(", ")}
              >
                {tagOptions.map((tag) => (
                  <MenuItem key={tag} value={tag}>
                    <Checkbox checked={selectedTags.includes(tag)} />
                    <ListItemText primary={tag} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

Pricing.propTypes = {
  formData: PropTypes.shape({
    price: PropTypes.number.isRequired,
    displayPrice: PropTypes.number.isRequired,
    ratings: PropTypes.number,
    sku: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    status: PropTypes.bool,
    youtube: PropTypes.string,
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default Pricing;
