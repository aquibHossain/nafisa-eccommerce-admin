import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";

// Charg Dashboard MUI contexts
import { useArgonController } from "context";

function Accounts() {
  const [controller] = useArgonController();
  const { darkMode } = controller;
  const [slack2FA, setSlack2FA] = useState(true);
  const [spotify2FA, setSpotify2FA] = useState(true);
  const [atlassian2FA, setAtlassian2FA] = useState(true);
  const [asana2FA, setAsana2FA] = useState(false);

  const handleSetSlack2FA = () => setSlack2FA(!slack2FA);
  const handleSetSpotify2FA = () => setSpotify2FA(!spotify2FA);
  const handleSetAtlassian2FA = () => setAtlassian2FA(!atlassian2FA);
  const handleSetAsana2FA = () => setAsana2FA(!asana2FA);

  return <Card id="accounts"></Card>;
}

export default Accounts;
