import { useState } from "react";
import toast from "react-hot-toast";
import Card from "@mui/material/Card";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Switch, Typography } from "@mui/material";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import { handleLogin } from "../../../redux/features/auth/authUtils";

const bgImage =
  "https://media.istockphoto.com/id/2043823329/photo/internet-network-cybersecurity-concept-data-privacy-protection-from-malicious-attacks-digital.jpg?s=2048x2048&w=is&k=20&c=lyFjPoQ0ohmuQn1dl33_hKZuXo9_qCwhr9jj6s9Xt1Y=";

function Cover() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleSubmit = (e) => {
    e.preventDefault();

    handleLogin(dispatch, email, password)
      .then(() => {
        toast.success("Logged in successfully!");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message || "Login failed. Please try again!");
        console.error("Login Error:", error);
      });
  };

  return (
    <CoverLayout title="Welcome!" description="Charg Admin Dashboard!" image={bgImage}>
      <Card>
        <Box pt={3} px={3}>
          <Typography variant="h3" color="textPrimary" fontWeight="bold" mb={1}>
            Welcome back
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Enter your email and password to sign in
          </Typography>
        </Box>
        <Box p={3}>
          <Box component="form" onSubmit={handleSubmit} role="form">
            <Box mb={3}>
              <Typography
                display="block"
                variant="caption"
                fontWeight="bold"
                color="textPrimary"
                sx={{ ml: 0.5, mb: 1 }}
              >
                Email
              </Typography>
              <TextField
                type="email"
                placeholder="Email"
                fullWidth
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Box mb={3}>
              <Typography
                display="block"
                variant="caption"
                fontWeight="bold"
                color="textPrimary"
                sx={{ ml: 0.5, mb: 1 }}
              >
                Password
              </Typography>
              <TextField
                type="password"
                placeholder="Password"
                fullWidth
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
            <Box display="flex" alignItems="center">
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <Typography
                variant="button"
                fontWeight="regular"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none" }}
              >
                &nbsp;&nbsp;Remember me
              </Typography>
            </Box>
            <Box mt={4}>
              <Button type="submit" variant="contained" style={{ color: "white" }} fullWidth>
                Sign In
              </Button>
            </Box>
          </Box>
        </Box>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
