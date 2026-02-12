import React from "react";
const Logout = () => {

  return <button onClick={() => localStorage.removeItem("token")
  }> Logout</button >;
};

export default Logout;
