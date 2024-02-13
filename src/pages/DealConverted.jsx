import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  AppBar,
  Toolbar,
  Chip,
  Button,
} from "@mui/material";
import background from "../assets/background2.png";
import logo from "../assets/logo.png";

export default function DealConverted({ convertedResp }) {
  return (
    <Box
      style={{
        width: "100%",
        height: "100vh",
        overflowY: "hidden",
        backgroundColor: "#1e1e1e",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <AppBar position="static" sx={{ bgcolor: "#191919" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
          <img src={logo} alt="Logo" style={{ width: "20%", height: "auto" }} />
        </Toolbar>
      </AppBar>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Chip
          label="Your lead has been converted into a Deal, an Account, and a Contact."
          color="success"
          size="medium"
          sx={{ borderRadius: "6px" }}
        />
      </Box>
      <Box
        display="flex"
        justifyContent="space-around"
        mt={4}
        sx={{
          margin: "20px",
          display: "flex",
          alignItems: "center",
        //   flexDirection: "column",
          gap: "20px",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          paddingBottom: "20px",
          borderRadius: "10px",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          color: "#000",
          padding: "20px",
        //   marginTop: "100px"
        }}
      >
        <Button variant="contained">Account</Button>
        <Button variant="contained">Contact</Button>
        <Button variant="contained">Deal</Button>
      </Box>
    </Box>
  );
}
