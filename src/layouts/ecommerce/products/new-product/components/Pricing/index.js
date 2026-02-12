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
  TextField,
  IconButton,
  Button,
  OutlinedInput,
} from "@mui/material";
import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import FormField from "layouts/ecommerce/products/new-product/components/FormField";

const defaultTagOptions = ["Bag", "Brand", "Gadget", "In Stock", "On Sale", "Top Rated", "Featured", "Trending", "Save Big", "Latest Product"];

function Pricing({ formData, setFormData }) {
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState(formData?.tags || []);

  const [variants, setVariants] = useState(formData?.variants || []);
  const [inventory, setInventory] = useState(formData?.inventory || []);

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.find((t) => t.name === trimmed)) {
      const updated = [...tags, { name: trimmed, hide: false }];
      setTags(updated);
      setFormData({ ...formData, tags: updated });
    }
    setTagInput("");
  };

  const handleTagSelectChange = (event) => {
    const selectedNames = event.target.value;

    const updatedTags = selectedNames.map((name) => {
      const existing = tags.find((t) => t.name === name);
      return existing || { name, hide: false };
    });

    setTags(updatedTags);
    setFormData({ ...formData, tags: updatedTags });
  };

  const handleTagHideToggle = (index) => {
    const updated = [...tags];
    updated[index].hide = !updated[index].hide;
    setTags(updated);
    setFormData({ ...formData, tags: updated });
  };

  const handleRemoveTag = (index) => {
    const updated = [...tags];
    updated.splice(index, 1);
    setTags(updated);
    setFormData({ ...formData, tags: updated });
  };

  const handleAddVariant = () => {
    setVariants([...variants, { type: "", value: "" }]);
  };

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...variants];
    updatedVariants[index][field] = value;
    setVariants(updatedVariants);
    setFormData({ ...formData, variants: updatedVariants });
  };

  const handleRemoveVariant = (index) => {
    const updatedVariants = variants.filter((_, i) => i !== index);
    setVariants(updatedVariants);
    setFormData({ ...formData, variants: updatedVariants });
  };

  const handleInventoryChange = (index, field, value) => {
    const updatedInventory = [...inventory];
    updatedInventory[index][field] = value;
    setInventory(updatedInventory);
    setFormData({ ...formData, inventory: updatedInventory });
  };

  const handleImageUpload = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const image = {
        file,
        preview: URL.createObjectURL(file),
      };
      handleInventoryChange(index, "img", image);
    }
  };

  const handleRemoveImage = (index) => {
    handleInventoryChange(index, "img", null);
  };

  const handleAddInventory = () => {
    setInventory([...inventory, { productName: "", img: null, quantity: 0, price: 0, displayPrice: 0, inStock: true }]);
  };

  const handleRemoveInventory = (index) => {
    const updatedInventory = inventory.filter((_, i) => i !== index);
    setInventory(updatedInventory);
    setFormData({ ...formData, inventory: updatedInventory });
  };

  const handleFieldChange = (field, value) => {
    const parsedValue = field === "price" || field === "displayPrice" ? parseFloat(value) : value;
    setFormData({ ...formData, [field]: parsedValue });
  };

  useEffect(() => {
    setFormData({ ...formData, tags });
  }, [tags]);

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
            label="Discounted Price"
            type="number"
            variant="outlined"
            placeholder="1200"
            value={formData?.price || ""}
            onChange={(e) => handleFieldChange("price", e.target.value)}
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
            onChange={(e) => handleFieldChange("displayPrice", e.target.value)}
          />
        </Grid>

        {/* Tags */}
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Tags
          </Typography>
          <FormControl fullWidth>
            <Select
              multiple
              value={tags.map((t) => t.name)}
              onChange={handleTagSelectChange}
              input={<OutlinedInput />}
              renderValue={(selected) => selected.join(", ")}
            >
              {defaultTagOptions.map((tag) => (
                <MenuItem key={tag} value={tag}>
                  <Checkbox checked={tags.some((t) => t.name === tag)} />
                  <ListItemText primary={tag} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box mt={1} display="flex" gap={1}>
            <TextField
              fullWidth
              placeholder="Add custom tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
            />
            <Button onClick={handleAddTag} variant="outlined" style={{ color: "black" }}>
              Add
            </Button>
          </Box>

          <Grid container spacing={1} mt={1}>
            {tags.map((tag, index) => (
              <Grid item xs={12} sm={6} key={tag.name}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Checkbox
                    checked={tag.hide}
                    onChange={() => handleTagHideToggle(index)}
                  />
                  <Typography variant="body2" flexGrow={1}>
                    {tag.name} {tag.hide ? "(Hidden)" : ""}
                  </Typography>
                  <IconButton onClick={() => handleRemoveTag(index)} size="small">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Inventory Section */}
        <Grid item xs={12}>
          <Typography variant="h5" fontWeight="bold" mt={3}>
            Inventory
          </Typography>
          {inventory?.map((item, index) => (
            <Grid container spacing={2} mt={1} key={index} alignItems="center">
              <Grid item xs={12} lg={5}>
                <FormField
                  label="Product Name"
                  value={item.productName}
                  onChange={(e) => handleInventoryChange(index, "productName", e.target.value)}
                />
              </Grid>
              <Grid item xs={12} lg={5}>
                <FormField
                  type="number"
                  label="Discounted Price"
                  value={item.displayPrice}
                  onChange={(e) => handleInventoryChange(index, "displayPrice", e.target.value)}
                />
              </Grid>
              <Grid item xs={12} lg={5}>
                <FormField
                  type="number"
                  label="Price"
                  value={item.price}
                  onChange={(e) => handleInventoryChange(index, "price", e.target.value)}
                />
              </Grid>
              <Grid item xs={12} lg={5}>
                <FormField
                  type="number"
                  label="Quantity"
                  value={item.quantity}
                  onChange={(e) => handleInventoryChange(index, "quantity", e.target.value)}
                />
              </Grid>
              <Grid item xs={2} style={{ paddingTop: "45px" }}>
                <IconButton color="error" onClick={() => handleRemoveInventory(index)}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
              <Grid item xs={12}>
                <Typography component="label" variant="caption" fontWeight="bold">
                  Product Image
                </Typography>
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(index, e)} />
                {item.img && (
                  <Box mt={1} position="relative" width="100px" height="100px" border="1px solid #ddd" borderRadius="4px" overflow="hidden">
                    <img
                      src={item.img.preview || item.img}
                      alt="Product"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveImage(index)}
                      style={{ position: "absolute", top: 4, right: 4, backgroundColor: "rgba(0, 0, 0, 0.5)", color: "white" }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                )}
              </Grid>

            </Grid>
          ))}
          <Button
            variant="outlined"
            style={{ background: "blue", color: "white", marginTop: "20px" }}
            startIcon={<AddIcon />}
            onClick={handleAddInventory}
          >
            Add Inventory
          </Button>
        </Grid>

        {/* Variants Section */}
        <Grid item xs={12}>
          <Typography variant="h5" fontWeight="bold" mt={3}>
            Specification
          </Typography>
          {variants.map((variant, index) => (
            <Grid container spacing={2} key={index} mt={1} alignItems="center">
              <Grid item xs={5}>
                <FormField
                  required
                  variant="outlined"
                  placeholder="storage"
                  label="Type"
                  fullWidth
                  value={variant.type}
                  onChange={(e) => handleVariantChange(index, "type", e.target.value)}
                />
              </Grid>
              <Grid item xs={5}>
                <FormField
                  required
                  variant="outlined"
                  placeholder="1200gb"
                  label="Value"
                  fullWidth
                  value={variant.value}
                  onChange={(e) => handleVariantChange(index, "value", e.target.value)}
                />
              </Grid>
              <Grid item xs={2} style={{ paddingTop: "45px" }}>
                <IconButton color="error" onClick={() => handleRemoveVariant(index)}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
          <Button variant="outlined" style={{ background: "blue", color: "white", marginTop: "20px" }} startIcon={<AddIcon />} onClick={handleAddVariant} mt={2}>
            Add Variant
          </Button>
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
      </Grid>
    </Box>
  );
}

Pricing.propTypes = {
  formData: PropTypes.shape({
    price: PropTypes.number.isRequired,
    displayPrice: PropTypes.number.isRequired,
    sku: PropTypes.string,
    youtube: PropTypes.string,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        hide: PropTypes.bool,
      })
    ),
    variants: PropTypes.array,
    inventory: PropTypes.array,
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default Pricing;
