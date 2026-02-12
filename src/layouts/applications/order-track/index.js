import { useState } from "react";


import { Box } from "@mui/material";

// Charg Dashboard MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Charg Dashboard MUI contexts
import { useArgonController } from "context";

// Kanban application components
import Header from "layouts/applications/order-track/components/Header";

// Data
import boards from "layouts/applications/order-track/data";
import OrdersOverview from "layouts/pages/widgets/components/OrdersOverview";

function Kanban() {
  const [controller] = useArgonController();
  const { darkMode } = controller;
  const [newCardForm, setNewCardForm] = useState(false);
  const [formValue, setFormValue] = useState("");

  const openNewCardForm = (event, id) => setNewCardForm(id);
  const closeNewCardForm = () => setNewCardForm(false);
  const handeSetFormValue = ({ currentTarget }) => setFormValue(currentTarget.value);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box py={3}>
        <Box display="flex" justifyContent="flex-end" m={2}>
          <Header />
        </Box>

        <Box
          position="relative"
          my={4}
          sx={({
            palette: { light, background },
            functions: { pxToRem },
            borders: { borderRadius },
          }) => ({
            "& .react-kanban-column": {
              backgroundColor: darkMode ? background.dark : light.main,
              width: pxToRem(450),
              margin: `0 ${pxToRem(10)}`,
              padding: pxToRem(20),
              borderRadius: borderRadius.lg,
            },
          })}
        >
          <OrdersOverview />
        </Box>
      </Box>
      <Footer />
    </DashboardLayout>
  );
}

export default Kanban;
