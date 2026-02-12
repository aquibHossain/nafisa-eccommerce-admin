

import { useMemo } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-chartjs-2 components
import { Doughnut } from "react-chartjs-2";

// @mui material components
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";


import { Box } from "@mui/material";

import { Button } from "@mui/material";

// Charg Dashboard MUI example components
import ReportsDoughnutChartItem from "examples/Charts/DoughnutCharts/ReportsDoughnutChart/ReportsDoughnutChartItem";

// ReportsDoughnutChart configurations
import configs from "examples/Charts/DoughnutCharts/ReportsDoughnutChart/configs";

function ReportsDoughnutChart({ title, count, chart, tooltip }) {
  const { data, options } = configs(chart.labels || [], chart.datasets || {});

  const renderItems =
    chart.labels && chart.datasets
      ? chart.labels.map((label, key) => (
          <ReportsDoughnutChartItem
            color={chart.datasets.backgroundColors ? chart.datasets.backgroundColors[key] : "dark"}
            title={label}
            key={label}
            percentage={`${chart.datasets.data ? chart.datasets.data[key] : 0}%`}
            hasBorder={key !== chart.labels.length - 1}
          />
        ))
      : null;

  return (
    <Card>
      <Box display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <Typography variant="h6">{title}</Typography>
        <Tooltip title={tooltip} placement="bottom" arrow>
          <Button variant="outlined" color="secondary" size="small" circular iconOnly>
            <Icon>priority_high</Icon>
          </Button>
        </Tooltip>
      </Box>
      <Box p={2}>
        {useMemo(
          () => (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={5}>
                <Box height="100%" textAlign="center" position="relative">
                  <Box height={{ xs: "65%", sm: "100%" }} mt={{ xs: 6, sm: 0 }}>
                    <Doughnut data={data} options={options} />
                  </Box>
                  <Box
                    mt={{ xs: 0, sm: -15.25 }}
                    position="relative"
                    top={{ xs: "-8.25rem", sm: 0 }}
                  >
                    <Typography variant="h4" fontWeight="medium">
                      {count.number}
                    </Typography>
                    <Typography
                      variant="button"
                      color="text"
                      textTransform="uppercase"
                      fontWeight="medium"
                    >
                      {count.text}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={7}>
                {renderItems}
              </Grid>
            </Grid>
          ),
          [chart]
        )}
      </Box>
    </Card>
  );
}

// Setting default values for the props of ReportsDoughnutChart
ReportsDoughnutChart.defaultProps = {
  tooltip: "",
};

// Typechecking props for the ReportsDoughnutChart
ReportsDoughnutChart.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.shape({
    number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    text: PropTypes.string.isRequired,
  }).isRequired,
  chart: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.string).isRequired,
    datasets: PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string])
    ).isRequired,
  }).isRequired,
  tooltip: PropTypes.string,
};

export default ReportsDoughnutChart;
