import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
} from "@mui/material";

import background from "../assets/background2.png";

export default function ContactDetails({
  logo,
  contactPersonTitle,
  setContactPersonTitle,
  contactPersonLinkedin,
  setContactPersonLinkedin,
  ceoLinkedin,
  setCeoLinkedin,
  companyRevenue,
  setCompanyRevenue,
  handleClose,
  handleSave,
  setPage,
  handleLostLead,
  setOriginPage,
}) {
  const [contactPersonLinkedinError, setContactPersonLinkedinError] =
    useState("");
  const [ceoLinkedinError, setCeoLinkedinError] = useState("");

  const isValidUrl = (urlString) => {
    var urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // validate protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name and extension
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!urlPattern.test(urlString);
  };

  const handleConvert = () => {
    setPage("confirm");
    setOriginPage("second");
  };

  const handleContactPersonLinkedinChange = (e) => {
    const newValue = e;
    setContactPersonLinkedin(newValue);

    if (newValue && !isValidUrl(newValue)) {
      setContactPersonLinkedinError("Invalid URL");
    } else {
      setContactPersonLinkedinError("");
    }
  };

  const handleCeoLinkedinChange = (e) => {
    const newValue = e;

    console.log({ e });
    setCeoLinkedin(newValue);

    if (newValue && !isValidUrl(newValue)) {
      setCeoLinkedinError("Invalid URL");
    } else {
      setCeoLinkedinError("");
    }
  };

  return (
    <Box
      style={{
        width: "100%",
        height: "100vh",
        overflowY: "hidden",
        backgroundColor: "#1e1e1e",
        backgroundImage: `url(${background})`,
        // Cover the entire Box
        backgroundSize: "cover",
        // Prevent the image from repeating
        backgroundRepeat: "no-repeat",
        // Center the background image
        backgroundPosition: "center",
      }}
    >
      <AppBar position="static" sx={{ bgcolor: "#191919" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
          <img src={logo} alt="Logo" style={{ width: "20%", height: "auto" }} />
        </Toolbar>
      </AppBar>

      <form
        style={{
          margin: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Grid container spacing={2}>
          {/* TextField components for editing */}
          {[
            {
              label: "Contact Person Title",
              value: contactPersonTitle,
              setter: setContactPersonTitle,
            },
            {
              label: "Contact Person LinkedIn",
              value: contactPersonLinkedin,
              setter: handleContactPersonLinkedinChange,
            },
            {
              label: "CEO LinkedIn",
              value: ceoLinkedin,
              setter: handleCeoLinkedinChange,
            },
            {
              label: "Company Revenue",
              value: companyRevenue,
              setter: setCompanyRevenue,
            },
          ].map((field, index) => (
            <Grid
              item
              xs={6}
              key={index}
              style={{ display: "flex", alignItems: "center" }}
            >
              <TextField
                label={field.label}
                variant="outlined"
                value={field.value}
                onChange={(e) => field.setter(e.target.value)}
                fullWidth
                margin="dense"
                size="small"
                InputLabelProps={{
                  style: { color: "#ffffff" },
                  shrink: true, // Adjust label color if necessary
                }}
                InputProps={{
                  style: { color: "#ffffff", fontWeight: "bold" }, // Adjust text color and fontWeight if necessary
                }}
                error={
                  (field.label === "Contact Person LinkedIn" &&
                    !!contactPersonLinkedinError) ||
                  (field.label === "CEO LinkedIn" && !!ceoLinkedinError)
                }
                helperText={
                  (field.label === "Contact Person LinkedIn" &&
                    contactPersonLinkedinError) ||
                  (field.label === "CEO LinkedIn" && ceoLinkedinError)
                }
              />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ position: "fixed", bottom: 20, left: 20 }}>
          <Button
            onClick={() => setPage("info-gathering")}
            variant="outlined"
            color="info"
            sx={{ width: "130px", borderColor: "white", color: "white" }}
          >
            Back
          </Button>
        </Box>

        <Box
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            display: "flex",
            gap: 2,
          }}
        >
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{ width: "130px", bgcolor: "rgba(255, 255, 255,0.6)",color: "white", borderColor: "none" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleLostLead}
            sx={{
              width: "130px",
              bgcolor: "rgba(239, 83, 80, 0.6)", // Lost button with RGBA color
              "&:hover": {
                bgcolor: "rgba(239, 83, 80, 0.8)",
              },
            }}
          >
            Lost
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            sx={{
              width: "130px",
              bgcolor: "rgba(66, 165, 245, 0.6)", // Nurture button with RGBA color
              "&:hover": {
                bgcolor: "rgba(66, 165, 245, 0.8)",
              },
            }}
          >
            Save
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleConvert}
            // onClick={() => setPage("confirm")}
            sx={{
              width: "130px",
              bgcolor: "rgba(102, 187, 106, 0.6)", // Convert button with RGBA color
              "&:hover": {
                bgcolor: "rgba(102, 187, 106, 0.8)",
              },
            }}
          >
            Convert
          </Button>
        </Box>
      </form>
    </Box>
  );
}
