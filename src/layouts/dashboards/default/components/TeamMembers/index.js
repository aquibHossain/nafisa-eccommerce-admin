import Card from "@mui/material/Card";

// Images
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

// Data
const data = [
  { img: team1, name: "John Michael", status: "online", badge: "success" },
  { img: team2, name: "Alex Smith", status: "in meeting", badge: "warning" },
  { img: team3, name: "Samantha Ivy", status: "offline", badge: "error" },
  { img: team4, name: "John Michael", status: "online", badge: "success" },
];

function TeamMembers() {
  return <Card sx={{ height: "100%", overflow: "hidden" }}></Card>;
}

export default TeamMembers;
