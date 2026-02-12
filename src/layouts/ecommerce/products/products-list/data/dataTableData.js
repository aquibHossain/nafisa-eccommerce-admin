// ProductsList page components
import ProductCell from "layouts/ecommerce/products/products-list/components/ProductCell";
import ActionCell from "layouts/ecommerce/products/products-list/components/ActionCell";
import { Badge } from "@mui/material";

// Images
const {
  adidasHoodie,
  macBookPro,
  metroChair,
  alchimiaChair,
  fendiCoat,
  offWhiteJacket,
  yohjiYamamoto,
  mcqueenShirt,
  yellowChair,
  heronTshirt,
  livingChair,
  orangeSofa,
  burberry,
  dgSkirt,
  undercover,
} = "https://cdn.pixabay.com/photo/2024/11/13/08/47/city-9193823_1280.jpg";

// Badges
const outOfStock = (
  <Badge variant="contained" color="error" size="xs" badgeContent="False" container />
);

const inStock = (
  <Badge variant="contained" color="success" size="xs" badgeContent="True" container />
);

const dataTableData = {
  columns: [
    {
      Header: "product",
      accessor: "product",
      width: "40%",
      // eslint-disable-next-line react/prop-types
      Cell: ({ value: [name, data] }) => (
        <ProductCell image={data.image} name={name} checked={data.checked} />
      ),
    },
    { Header: "category", accessor: "category" },
    { Header: "price", accessor: "price" },
    { Header: "sku", accessor: "sku" },
    { Header: "quantity", accessor: "quantity" },
    {
      Header: "status",
      accessor: "status",
      // eslint-disable-next-line react/prop-types
      Cell: ({ value }) => (value === "in stock" ? inStock : outOfStock),
    },
    { Header: "action", accessor: "action" },
  ],

  rows: [
    {
      product: ["Jacket Full Zip Hoodie", { image: adidasHoodie, checked: true }],
      category: "Clothing",
      price: "$1,321",
      sku: 243598234,
      quantity: 0,
      status: "out of stock",
      action: <ActionCell />,
    },
    {
      product: ["MacBook Pro", { image: macBookPro, checked: true }],
      category: "Electronics",
      price: "$1,869",
      sku: 877712,
      quantity: 0,
      status: "out of stock",
      action: <ActionCell />,
    },
    {
      product: ["Metro Bar Stool", { image: metroChair, checked: false }],
      category: "Furniture",
      price: "$99",
      sku: "0134729",
      quantity: 978,
      status: "in stock",
      action: <ActionCell />,
    },
    {
      product: ["Alchimia Chair", { image: alchimiaChair, checked: false }],
      category: "Furniture",
      price: "$2,999",
      sku: 113213,
      quantity: 0,
      status: "out of stock",
      action: <ActionCell />,
    },
  ],
};

export default dataTableData;
