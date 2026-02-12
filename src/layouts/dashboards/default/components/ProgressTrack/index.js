// @mui material components
import Card from "@mui/material/Card";

// Images
import img1 from "assets/images/small-logos/logo-jira.svg";
import img2 from "assets/images/small-logos/logo-asana.svg";
import img3 from "assets/images/small-logos/logo-spotify.svg";
import img4 from "assets/images/small-logos/bootstrap.svg";

// Data
const data = [
  { img: img1, name: "React Material Dashboard", progress: 90, color: "info" },
  { img: img2, name: "Amarlodge Design System", progress: 60, color: "error" },
  { img: img3, name: "VueJs Now UI Kit PRO", progress: 100, color: "success" },
  { img: img4, name: "Soft UI Dashboard", progress: 72, color: "info" },
];

function ProgressTrack() {
  return <Card sx={{ height: "100%", overflow: "hidden" }}></Card>;
}

export default ProgressTrack;
