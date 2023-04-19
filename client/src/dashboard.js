import React, { useEffect } from "react";

const Dashboard = () => {
  const [token] = React.useState(localStorage.getItem("token"));

  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
    }
    console.log(localStorage.getItem("user"));
  }, [token]);

  return (
    token && (
      <div>
        <h1>
          Welcome {JSON.parse(localStorage.getItem("user")).firstName}{" "}
          {JSON.parse(localStorage.getItem("user")).lastName}
        </h1>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login";
          }}
        >
          logout
        </button>
      </div>
    )
  );
};

export default Dashboard;
