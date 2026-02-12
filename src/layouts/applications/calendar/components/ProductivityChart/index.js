

import { useRef, useEffect, useState, useMemo } from "react";

// react-chartjs-2 components
import { Line } from "react-chartjs-2";

// @mui material components
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Icon from "@mui/material/Icon";


import { Box } from "@mui/material";


// Charg Dashboard MUI helper functions
import gradientChartLine from "assets/theme/functions/gradientChartLine";

// Chart configurations
import configs from "layouts/applications/calendar/components/ProductivityChart/configs";


import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";

function ProductivityChart() {
  const { white } = colors;
  const { size } = typography;
  const chartRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [chartData, setChartData] = useState({});
  const { data, options } = chartData;

  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(null);

  useEffect(() => {
    const backgroundColor = gradientChartLine(chartRef.current.children[0], white.main, 0.3);

    setChartData(configs(backgroundColor));
  }, [configs]);

  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      keepMounted
    >
      <MenuItem onClick={handleCloseMenu}>Action</MenuItem>
      <MenuItem onClick={handleCloseMenu}>Another action</MenuItem>
      <MenuItem onClick={handleCloseMenu}>Something else here</MenuItem>
    </Menu>
  );

  return (
    <Card>
      <Box bgColor="dark" variant="gradient">
        <Box p={2}>
          <Box display="flex" justifyContent="space-between">
            <Box>
              <Typography variant="h6" fontWeight="medium" color="white">
                Productivity
              </Typography>
              <Box display="flex" alignItems="center">
                <Box fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                  <Icon sx={{ fontWeight: "bold" }}>arrow_upward</Icon>
                </Box>
                <Typography variant="button" color="white" fontWeight="medium">
                  14% more{" "}
                  <Typography variant="button" color="white" fontWeight="regular">
                    in 2021
                  </Typography>
                </Typography>
              </Box>
            </Box>
            <Typography color="white" onClick={handleOpenMenu}>
              <Icon fontSize="default" sx={{ cursor: "pointer" }}>
                more_horiz
              </Icon>
            </Typography>
            {renderMenu()}
          </Box>
        </Box>
        {useMemo(
          () => (
            <Box ref={chartRef} sx={{ height: "6.25rem" }}>
              <Line data={data} options={options} />
            </Box>
          ),
          [chartData]
        )}
      </Box>
    </Card>
  );
}

export default ProductivityChart;
