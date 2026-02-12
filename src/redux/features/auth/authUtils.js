import config from "config";
import { login, logout } from "./authSlice";

// Handle login
export const handleLogin = async (dispatch, email, password) => {
  try {
    const response = await fetch(`${config.production_url}/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const responseData = await response.json();

    if (response.ok) {
      const token = responseData.data?.token;

      localStorage.setItem("token", token);
      dispatch(login(token));
      return Promise.resolve();
    } else {
      return Promise.reject(new Error(responseData.message || "Invalid credentials"));
    }
  } catch (error) {
    console.error("Login error:", error);
    return Promise.reject(new Error(error.message || "Something went wrong"));
  }
};

// Handle logout
export const handleLogout = (dispatch) => {
  localStorage.removeItem("token");
  dispatch(logout());
};
