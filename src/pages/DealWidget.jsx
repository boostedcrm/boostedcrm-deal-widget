import { AppBar, Box, Button, Grid, TextField, Toolbar } from "@mui/material";
import { useEffect, useState } from "react";
import background from "../assets/background2.png";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet"; // Icon for Finance

import logo from "../assets/logo.png";
import ProjectTable from "./Projects";
import InvoiceTable from "./Invoices";

const ZOHO = window.ZOHO;

const DealWidget = ({
  handleClose,
  dealId,
  accountName,
  setAccountName,
  dealName,
  setDealName,
  contactFirstName,
  setContactFirstName,
  contactLastName,
  setContactLastName,
  amount,
  setAmount,
  companyRevenue,
  setCompanyRevenue,
  dealStage,
  setDealStage,
  contactPersonTitle,
  setContactPersonTitle,
  contactPersonLinkedin,
  setContactPersonLinkedin,
  ceoLinkedin,
  setCeoLinkedin,
  description,
  setDescription,
  handleStatus
}) => {
  const handleStageButton = async (stage) => {
    ZOHO.CRM.UI.Popup.closeReload().then(function (data) {
      console.log(data);
    });
    window.location.href =
      "https://crm.zoho.com/crm/org582234994/tab/Potentials/" + dealId;
    // var config = {
    //   Entity: "Deals",
    //   APIData: {
    //     id: dealId,
    //     Stage: stage,
    //   },
    //   Trigger: ["workflow"],
    // };

    // await ZOHO.CRM.API.updateRecord(config)
    //   .then(function (data) {
    //     console.log(data);
    //     // Redirect to Google
    //     window.location.href = "https://crm.zoho.com/crm/org582234994/tab/Potentials/" + dealId;
    //   })
    //   .catch(function (error) {
    //     console.error("Failed to update record", error);
    //     // Handle error
    //   });
  };

  const handleCancel = () => {
    ZOHO.CRM.UI.Popup.closeReload().then(function (data) {
      console.log(data);
    });
  };

  const [invoices, setInvoices] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {

  //       const recordData = await ZOHO.CRM.API.getRecord({
  //         Entity: "Deals",
  //         RecordID: dealId,
  //       });

  //       const description = recordData?.data[0]?.Description; // Attempt to get the description

  //       // Set initial parameters
  //       const baseHeight = 500;
  //       const charactersPerLine = 106;
  //       const heightIncrementPerLine = 20;
  //       let dynamicHeight = baseHeight; // Default height

  //       // Only calculate dynamic height if description exists
  //       if (description) {
  //         const descriptionLength = description.length;
  //         const numLines = Math.ceil(descriptionLength / charactersPerLine);
  //         dynamicHeight += numLines * heightIncrementPerLine; // Adjust height based on description length
  //       }

  //       await ZOHO.CRM.UI.Resize({ height: dynamicHeight, width: "1000" }).then(
  //         function (uiData) {
  //           console.log(uiData);
  //         }
  //       );

  //       if (recordData.data[0]?.Contact_Name !== null) {
  //         const contactData = await ZOHO.CRM.API.getRecord({
  //           Entity: "Contacts",
  //           RecordID: recordData.data[0]?.Contact_Name.id,
  //         });

  //         setContactFirstName(contactData?.data[0]?.First_Name);
  //         setContactLastName(contactData?.data[0]?.Last_Name);
  //       }

  //       if (recordData && recordData.data && recordData.data.length > 0) {
  //         const record = recordData.data[0];
  //         // Uncomment and adjust the state setters according to your actual state variables
  //         setAccountName(record?.Account_Name.name);
  //         setDealName(record?.Deal_Name);
  //         setAmount(record?.Amount);
  //         setDealStage(record?.Stage);
  //         setDescription(record?.Description);
  //         setCeoLinkedin(record?.CEO_LinkedIN);
  //         setContactPersonTitle(record?.Contact_Person_Title);
  //         setContactPersonLinkedin(record?.Contact_Person_LinkedIN);
  //         setCompanyRevenue(record?.Company_Size_and_Revenue);
  //         console.log(record); // Optional: for debugging
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch data", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const [activeSection, setActiveSection] = useState("main-deal-section");

  // Event handlers to switch sections
  const showMainDealSection = () => setActiveSection("main-deal-section");
  const showProjectsSection = () => setActiveSection("Projects");
  const showFinanceSection = () => setActiveSection("Finance");

  const fields = [
    {
      label: "Account Name",
      value: accountName,
      setter: setAccountName,
    },
    {
      label: "Deal Name",
      value: dealName,
      setter: setDealName,
    },
    {
      label: "Contact First Name",
      value: contactFirstName,
      setter: setContactFirstName,
    },
    {
      label: "Contact Last Name",
      value: contactLastName,
      setter: setContactLastName,
    },
    {
      label: "Amount",
      value: amount,
      setter: setAmount,
    },
    {
      label: "Company Revenue",
      value: companyRevenue,
      setter: setCompanyRevenue,
    },
    {
      label: "Deal Stage",
      value: dealStage, // Updated from 'description'
      setter: setDealStage, // Updated setter function
    },
    {
      label: "Contact Person Title",
      value: contactPersonTitle,
      setter: setContactPersonTitle,
    },
    {
      label: "Contact Person LinkedIn",
      value: contactPersonLinkedin,
      setter: setContactPersonLinkedin,
    },
    {
      label: "CEO LinkedIn",
      value: ceoLinkedin,
      setter: setCeoLinkedin,
    },
  ];

  console.log({fields})

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
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* <Box></Box> */}
          <img src={logo} alt="Logo" style={{ width: "20%", height: "auto" }} />
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<AssignmentIcon />}
              onClick={showProjectsSection}
              sx={{
                bgcolor: "rgba(25, 118, 210, 0.8)",
                "&:hover": { bgcolor: "rgba(25, 118, 210, 1)" },
              }}
            >
              Projects
            </Button>
            <Button
              variant="contained"
              color="success"
              startIcon={<AccountBalanceWalletIcon />}
              onClick={showFinanceSection}
              sx={{
                bgcolor: "rgba(0, 128, 0, 0.8)",
                "&:hover": { bgcolor: "rgba(0, 128, 0, 1)" },
              }}
            >
              Finance
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {activeSection === "main-deal-section" && (
        <Box className="main-deal-section">
          <form
            style={{
              margin: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <Grid container spacing={1}>
              {fields.map((field, index) => (
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
                      shrink: true,
                    }}
                    InputProps={{
                      style: { color: "#ffffff" },
                      // Override the default outline
                      notchedOutline: { borderColor: "#ffffff" },
                      // Apply styles directly to the input
                      classes: {
                        notchedOutline: { borderColor: "#ffffff !important" },
                      },
                    }}
                  />
                </Grid>
              ))}
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  variant="outlined"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  fullWidth
                  multiline
                  minrows={4}
                  margin="dense"
                  size="small"
                  InputLabelProps={{
                    style: { color: "#ffffff" },
                    shrink: true,
                  }}
                  InputProps={{
                    style: { color: "#ffffff" },
                    // Override the default outline
                    notchedOutline: { borderColor: "#ffffff" },
                    // Apply styles directly to the input
                    classes: {
                      notchedOutline: { borderColor: "#ffffff !important" },
                    },
                  }}
                />
              </Grid>
            </Grid>
          </form>
          <Box
            sx={{
              position: "fixed",
              bottom: 20,
              right: 20,
              display: "flex",
              gap: 2,
              justifyContent: "space-between",
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
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="success"
              // onClick={handleConvert}
              onClick={() => handleStatus("Follow Up")}
              sx={{
                width: "130px",
                bgcolor: "rgba(102, 187, 106, 0.6)", // Convert button with RGBA color
                "&:hover": {
                  bgcolor: "rgba(102, 187, 106, 0.8)",
                },
              }}
            >
              Follow Up
            </Button>
            <Button
              variant="contained"
              color="success"
              // onClick={handleConvert}
              onClick={() => setPage("deal")}
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
              // onClick={handleConvert}
              onClick={() => handleStatus("Closed - Lost")}
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
              color="success"
              // onClick={handleConvert}
              onClick={() => handleStatus("Closed Won - Paid")}
              sx={{
                width: "130px",
                bgcolor: "rgba(102, 187, 106, 0.6)", // Convert button with RGBA color
                "&:hover": {
                  bgcolor: "rgba(102, 187, 106, 0.8)",
                },
              }}
            >
              Won
            </Button>
          </Box>
        </Box>
      )}
      {activeSection === "Projects" && (
        <Box className="Projects" sx={{ padding: "10px" }}>
          {/* Content for the Projects section */}
          <ProjectTable />

          <Box
            sx={{
              position: "fixed",
              bottom: 20,
              right: 20,
              display: "flex",
              gap: 2,
              justifyContent: "space-between",
            }}
          >
            <Button
              onClick={showMainDealSection}
              variant="contained"
              sx={{ width: "130px" }}
            >
              Back
            </Button>
          </Box>
        </Box>
      )}

      {activeSection === "Finance" && (
        <Box className="Finance" sx={{ padding: "10px" }}>
          {/* Content for the Finance section */}
          <InvoiceTable />
          <Box
            sx={{
              position: "fixed",
              bottom: 20,
              right: 20,
              display: "flex",
              gap: 2,
              justifyContent: "space-between",
            }}
          >
            <Button
              onClick={showMainDealSection}
              variant="contained"
              sx={{ width: "130px" }}
            >
              Back
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default DealWidget;
