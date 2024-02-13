import React, { useState } from "react";

import background from "../assets/background2.png";
import logo from "../assets/logo.png";
import {
  AppBar,
  Box,
  Button,
  Chip,
  CircularProgress,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";

export default function ConfirmDeal({
  setPage,
  handleClose,
  setHeight,
  originPage,
  setDealAmount,
  dealAmount,
  handleSave,
  loading,
  handleConvert,
}) {
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
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "calc(100vh - 64px)", // Subtract height of AppBar
            color: "white",
          }}
        >
          <Typography variant="h5">
            Please wait while converting the lead
          </Typography>
          <CircularProgress color="secondary" sx={{ ml: 2 }} />
        </Box>
      ) : (
        <Box
          sx={{
            margin: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            // border: "1px solid rgba(255, 255, 255, 0.3)",
            paddingBottom: "20px",
            borderRadius: "10px",
            // backgroundColor: "rgba(255, 255, 255, 0.1)",
            color: "#000",
            padding: "20px 20px 35px 20px",
          }}
        >
          <Typography variant="h5" color="white" align="center">
            Are you sure you want to convert?
          </Typography>
          <Chip
            label=" Once you click Convert, the lead will be converted to an Account, a Contact and a Deal. Deal information will be loaded in the upcoming page!"
            color="success"
            size="medium"
            sx={{ borderRadius: "6px", backgroundColor: "#329B47" }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              pt: 0,
            }}
          >
            <TextField
              label="Deal Amount"
              variant="outlined"
              value={dealAmount}
              onChange={(e) => setDealAmount(e.target.value)}
              margin="dense"
              size="large"
              type="number"
              InputLabelProps={{
                style: { color: "#ffffff", fontSize: "1.3rem" },
                shrink: true,
              }}
              InputProps={{
                style: {
                  color: "#ffffff",
                  // fontWeight: "bold",
                  width: "300px",
                  fontSize: "1.3rem",
                },
              }}
            />
          </Box>
        </Box>
      )}
      {!loading && (
        <Box
          sx={{
            position: "fixed",
            bottom: 20,
            left: 20,
          }}
        >
          <Button
            variant="outlined"
            sx={{ width: "130px", borderColor: "white", color: "white" }}
            onClick={() => setPage(originPage)}
          >
            Back
          </Button>
        </Box>
      )}

      {!loading && (
        <Box
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Button
            variant="outlined"
            sx={{
              width: "130px",
              bgcolor: "rgba(255, 255, 255,0.6)",
              color: "white",
              borderColor: "none",
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              width: "130px",
              bgcolor: "rgba(66, 165, 245, 0.6)",
              "&:hover": { bgcolor: "rgba(66, 165, 245, 0.8)" },
            }}
            onClick={handleSave}
          >
            Save
          </Button>
          <Button
            variant="contained"
            color="success"
            sx={{
              width: "130px",
              bgcolor: "rgba(102, 187, 106, 0.6)",
              "&:hover": { bgcolor: "rgba(102, 187, 106, 0.8)" },
            }}
            onClick={handleConvert}
          >
            Convert
          </Button>
        </Box>
      )}
    </Box>
  );
}
