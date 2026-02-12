import axios from "axios";
import config from "config";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import "./Product.css";
import { useEffect, useState } from "react";
import { Box, FormControl, Menu, MenuItem, Select, TextareaAutosize, Typography } from "@mui/material";
import FormField from "layouts/ecommerce/products/new-product/components/FormField";

function ProductInfo({ formData = {}, setFormData }) {
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState();
  const [brands, setBrands] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingSubCategories, setLoadingSubCategories] = useState(false);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get(`${config.production_url}/brand`);
        setBrands(response.data.data.result);
      } catch (error) {
        console.error("Error fetching brands:", error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchBrands();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${config.production_url}/category`);
        setCategories(response.data.data.result);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // useEffect(() => {
  //   setFormData({ ...formData, description: description })
  // }, [description]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => {
      if (prev[field] !== value) {
        return { ...prev, [field]: value };
      }
      return prev;
    });
  };


  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setFormData({ ...formData, category: selectedCategory, subCategory: "" });
  };

  const handleSubCategoryChange = (event) => {
    setFormData({ ...formData, subCategory: event.target.value });
  };


  {
    categories &&
      categories.map((category) => {
        return (
          <MenuItem key={category._id} value={category._id}>
            {category.subCategory && category.subCategory.length > 0 ? (
              category.subCategory.map((subC) => (
                <MenuItem key={subC._id} value={subC._id}>
                  {subC.name}
                </MenuItem>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                No Subcategories Available
              </Typography>
            )}
          </MenuItem>
        );
      });
  }

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Create Product
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormField
            type="text"
            label="Product Name"
            placeholder="e.g., Xpert..."
            value={formData?.productName || ""}
            onChange={(e) => handleInputChange("productName", e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="caption" fontWeight="bold" mb={1} display="block">
            Brand
          </Typography>
          <FormControl fullWidth style={{ marginTop: "12px" }}>
            <Select
              value={formData?.brand || ""}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              displayEmpty
              inputProps={{ "aria-label": "Brand" }}
            >
              <MenuItem value="" disabled>
                {brands ? "Select Brand" : "Select Brand"}
              </MenuItem>
              {brands.map((brand) => (
                <MenuItem key={brand._id} value={brand._id}>
                  {brand.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="caption" fontWeight="bold" mb={1} display="block">
            Category
          </Typography>
          <FormControl fullWidth>
            <Select
              value={formData?.category || ""}
              onChange={handleCategoryChange}
              displayEmpty
              inputProps={{ "aria-label": "Category" }}
              disabled={loadingCategories}
            >
              <MenuItem value="" disabled>
                {loadingCategories ? "Loading Categories..." : "Select Category"}
              </MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat._id} value={cat._id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {formData.category && (
          <Grid item xs={12} sm={6}>
            <Typography variant="caption" fontWeight="bold" mb={1} display="block">
              Sub Category
            </Typography>
            <FormControl fullWidth>
              <Select
                value={formData?.subCategory || ""}
                onChange={handleSubCategoryChange}
                displayEmpty
                inputProps={{ "aria-label": "Sub Category" }}
                disabled={loadingSubCategories}
              >
                <MenuItem value="" disabled>
                  {loadingSubCategories ? "Loading Subcategories..." : "Select Subcategory"}
                </MenuItem>
                {categories
                  ?.find((cat) => cat._id === formData.category)
                  ?.subCategory?.map((subC) => (
                    <MenuItem key={subC._id} value={subC._id}>
                      {subC.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
        )}

      </Grid>
    </Box>
  );
}

ProductInfo.propTypes = {
  formData: PropTypes.shape({
    productName: PropTypes.string,
    brand: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
    subCategory: PropTypes.string,
  }),
  setFormData: PropTypes.func.isRequired,
};

ProductInfo.defaultProps = {
  formData: {
    productName: "",
    brand: "",
    description: "",
    category: "",
    subCategory: "",
  },
};

export default ProductInfo;
