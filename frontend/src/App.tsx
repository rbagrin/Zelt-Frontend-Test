import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("blue");

  useEffect(() => {
    (async () => {
      try {
        const message = (await axios.get("/hello-world")).data;
        setMessage(message);
        setColor("blue");
      } catch {
        setMessage("Something went wrong!");
        setColor("red");
      }
    })();
  }, []);

  return (
    <Box sx={{ mt: 10 }}>
      <Typography variant="h4" color={color} align="center">
        {message}
      </Typography>
    </Box>
  );
}

export default App;
