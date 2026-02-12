




const categoriesListData = [
  {
    color: "dark",
    icon: "devices_other",
    name: "Devices",
    description: (
      <>
        250 in stock,{" "}
        <Typography variant="caption" color="text" fontWeight="medium">
          346+ sold
        </Typography>
      </>
    ),
    route: "/",
  },
  {
    color: "dark",
    icon: "settings",
    name: "Tickets",
    description: (
      <>
        123 closed,{" "}
        <Typography variant="caption" color="text" fontWeight="medium">
          15 open
        </Typography>
      </>
    ),
    route: "/",
  },
  {
    color: "dark",
    icon: "info",
    name: "Error logs",
    description: (
      <>
        1 is active,{" "}
        <Typography variant="caption" color="text" fontWeight="medium">
          40 closed
        </Typography>
      </>
    ),
    route: "/",
  },
];

export default categoriesListData;
