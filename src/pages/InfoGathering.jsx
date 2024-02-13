import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  Box,
  Autocomplete,
  Grid,
  Chip,
  Link,
  Tooltip,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

import backround from "../assets/background2.png";
import { useState } from "react";

export default function InfoGathering({
  logo,
  firstName,
  lastName,
  email,
  numberOfZoho,
  description,
  leadStatus,
  leadSource,
  handleClose, // Event handler for 'Cancel' button
  setPage,
  handleLostLead,
  handleJunkLead,
  setOriginPage,
}) {
  const infoFields = [
    { label: "First Name", value: firstName },
    { label: "Last Name", value: lastName },
    { label: "Email", value: email },
    { label: "Lead Source", value: leadSource },
    { label: "Lead Status", value: leadStatus },
    { label: "Number of Zoho Users", value: numberOfZoho },
    // { label: "Description", value: description },
    // ... add other fields if necessary
  ];

  const [expanded, setExpanded] = useState(false);
  const maxCharacters = 80;

  const handleConvert = () => {
    setPage("confirm");
    setOriginPage("info-gathering");
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        overflowY: "hidden",
        bgcolor: "#1e1e1e",
        backgroundImage: `url(${backround})`,
        // Cover the entire Box
        // backgroundSize: "cover",
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
          // border: "1px solid rgba(255, 255, 255, 0.3)", // Light border for a frosted glass effect
          paddingBottom: "20px",
          borderRadius: "10px",
          // backgroundColor: "rgba(255, 255, 255, 0.1)", // Semi-transparent background
          // backdropFilter: "blur(10px)", // Apply blur effect
          // boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Optional subtle shadow for depth
          // Ensure the text and other elements inside the form are legible
          color: "#000", // Adjust text color as needed
          // padding: "20px", // Add padding to the form content
        }}
      >
        {/* Display Information */}
        <Grid container spacing={2} style={{ margin: "10px 0 0px 0px" }}>
          {infoFields.map((field, index) => (
            <Grid
              item
              xs={6} // Half-width for each info field, allowing two items per row
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "20px",
              }}
            >
              <Typography
                variant="body2"
                style={{
                  color: "rgba(239, 239, 239, 0.4)",
                  width: "100px",
                }}
                className="label"
              >
                {field.label}
              </Typography>
              <Typography
                sx={{ width: "50px", color: "#ffffff" }}
                align="center"
              >
                :
              </Typography>
              <Chip
                label={field.value || "N/A"}
                sx={{ bgcolor: "#1D342D", color: "#fff" }}
              />
              {/* <Typography
                variant="body1"
                style={{ color: "#ffffff",padding: "10px",bgcolor: "lightgrey" }}
                className="value"
              >
                {field.value || "N/A"}
              </Typography> */}
            </Grid>
          ))}
          {/* Assuming you want the description to span the full width of the grid below the fields */}
          <Grid item xs={12} style={{ display: 'flex', alignItems: 'center' }}>
      <Typography
        variant="body2"
        style={{
          color: 'rgba(239, 239, 239, 0.4)',
          width: '100px',
          // marginRight: '31px',
        }}
        className="label"
      >
        Description
      </Typography>
      <Typography sx={{ width: '50px', color: '#ffffff' }} align="center">:</Typography>
      {description && (
        <>
         <Typography
            variant="body1"
            style={{
              color: '#ffffff',
              paddingLeft: '10px',
              paddingRight: '15px',
              // marginTop: '10px',
              // overflow: 'hidden',
              // textOverflow: 'ellipsis',
              // whiteSpace: 'nowrap',
            }}
            className="value"
          >{description}</Typography>
          {/* <Typography
            variant="body1"
            style={{
              color: '#ffffff',
              // paddingLeft: '10px',
              // paddingRight: '15px',
              marginTop: '10px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
            className="value"
          >
            {description.length > maxCharacters ? `${description.slice(0, maxCharacters)}...` : description}
          </Typography>
          {description.length > maxCharacters && (
            <Tooltip title={description}>
              <Typography
                variant="body1"
                style={{
                  color: '#ffffff',
                  paddingLeft: '10px',
                  paddingRight: '15px',
                  marginTop: '10px',
                }}
                className="value"
              >
              Learn More
              </Typography>
            </Tooltip>
          )} */}
        </>
      )}
      {!description && (
        <Typography
          variant="body1"
          style={{ color: '#ffffff', paddingLeft: '10px', paddingRight: '15px', marginTop: '10px' }}
          className="value"
        >
          N/A
        </Typography>
      )}
    </Grid>
        </Grid>

        {/* <Grid container>
      <Grid item xs={6} sx={{ padding: "0px 5px" }}>
          <TextField
            label="Lead Status"
            variant="outlined"
            value={leadStatus}
            onChange={(e) => setLeadStatus(e.target.value)}
            size="small"
            sx={{ width: "100%" }}
            fullWidth
            InputLabelProps={{ shrink: true }}
            disabled={true}
            placeholder={leadStatus}
          />
        </Grid>
        <Grid item xs={6} sx={{ padding: "0px 5px" }}>
          <TextField
            label="Number of Zoho Users"
            variant="outlined"
            value={numberOfZoho}
            sx={{ width: "100%" }}
            onChange={(e) => setNumberOfZoho(e.target.value)}
            size="small"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>

      <Box sx={{ padding: "0px 5px" }}>
        <TextField
          label="Description"
          variant="outlined"
          multiline
          minRows={1}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          size="small"
          sx={{ width: "100%" }}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      </Box>  */}
        {/* <Grid container>

        <Grid item xs={6} sx={{ padding: "0px 5px" }}></Grid>
      </Grid> */}
        <Box sx={{ position: "fixed", bottom: 20, left: 20 }}>
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{
              width: "130px",
              bgcolor: "rgba(255, 255, 255,0.6)",
              color: "white",
              borderColor: "none",
            }}
          >
            Cancel
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
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              sx={{
                width: "130px",
                bgcolor: "rgba(255, 204, 128, 0.6)", // Junk button with RGBA color
                "&:hover": {
                  bgcolor: "rgba(255, 204, 128, 0.8)",
                },
                // "&:hover": {
                //   bgcolor: (theme) => alpha(theme.palette.warning.dark, 0.5),
                // },
              }}
              onClick={handleJunkLead}
            >
              Junk
            </Button>
            <Button
              variant="contained"
              sx={{
                width: "130px",
                bgcolor: "#EF5350",
                bgcolor: "rgba(239, 83, 80, 0.6)", // Lost button with RGBA color
                "&:hover": {
                  bgcolor: "rgba(239, 83, 80, 0.8)",
                },
              }}
              onClick={handleLostLead}
            >
              Lost
            </Button>
            <Button
              variant="contained"
              onClick={() => setPage("second")}
              sx={{
                width: "130px",
                bgcolor: "rgba(66, 165, 245, 0.6)", // Nurture button with RGBA color
                "&:hover": {
                  bgcolor: "rgba(66, 165, 245, 0.8)",
                },
              }}
            >
              Nurture
            </Button>
            <Button
              variant="contained"
              color="success"
              sx={{
                width: "130px",
                bgcolor: "rgba(102, 187, 106, 0.6)", // Convert button with RGBA color
                "&:hover": {
                  bgcolor: "rgba(102, 187, 106, 0.8)",
                },
              }}
              onClick={handleConvert}
            >
              Convert
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
}
