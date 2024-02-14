import {
  AppBar,
  Box,
  Button,
  Grid,
  TextField,
  Toolbar,
  Tabs,
  Tab,
} from "@mui/material";
import { useEffect, useState } from "react";
import background from "../assets/background2.png";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet"; // Icon for Finance

import logo from "../assets/logo_2.png";
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
  handleStatus,
  handleSave,
}) => {
  const handleCancel = () => {
    ZOHO.CRM.UI.Popup.closeReload().then(function (data) {
      console.log(data);
    });
  };

  const [invoices, setInvoices] = useState([]);

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
      disabled: true,
    },
    {
      label: "Deal Name",
      value: dealName,
      setter: setDealName,
      disabled: true,
    },
    {
      label: "Contact First Name",
      value: contactFirstName,
      setter: setContactFirstName,
      disabled: true,
    },
    {
      label: "Contact Last Name",
      value: contactLastName,
      setter: setContactLastName,
      disabled: true,
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
      disabled: true,
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

  console.log({ fields });

  return (
    <Box
      style={{
        width: "100%",
        height: "100vh",
        overflowY: "hidden",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            bgcolor: "white",
          }}
        >
          <img src={logo} alt="Logo" style={{ width: "20%", height: "auto" }} />
          <Tabs
            value={activeSection}
            onChange={(event, newValue) => setActiveSection(newValue)}
            centered
          >
            <Tab
              label="Deal Info"
              value="main-deal-section"
              onClick={showMainDealSection}
            />
            <Tab
                label="Projects"
                value="Projects"
                onClick={showProjectsSection}
              />
             <Tab
                label="Finance"
                value="Finance"
                onClick={showFinanceSection}
              />
          </Tabs>
        </Box>

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
                    disabled={field.disabled} // Setting disabled based on field.disabled
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      style: {
                        backgroundColor: field.disabled
                          ? "inherit"
                          : "rgba(46, 125, 50, 0.08)",
                      },
                      classes: {
                        notchedOutline: {
                          borderColor: field.disabled
                            ? "#000000"
                            : "rgba(46, 125, 50, 1)",
                          borderWidth: field.disabled ? 1 : 2,
                        },
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
                  margin="dense"
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    style: {
                      backgroundColor: "rgba(46, 125, 50, 0.08)",
                    },
                    classes: {
                      notchedOutline: {
                        borderColor: "rgba(46, 125, 50, 1)",
                        borderWidth: 2,
                      },
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
                // bgcolor: "rgba(255, 255, 255,0.6)",
                // color: "white",
                borderColor: "none",
              }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              // onClick={handleConvert}
              sx={{
                width: "130px",
                // bgcolor: "rgba(255, 255, 255,0.6)",
                // color: "white",
                borderColor: "none",
              }}
              onClick={() => handleStatus("Follow Up")}
            >
              Follow Up
            </Button>
            <Button
              variant="outlined"
              color="info"
              onClick={handleSave}
              // onClick={() => setPage("deal")}
              sx={{
                width: "130px",
                // bgcolor: "rgba(255, 255, 255,0.6)",
                // color: "white",
                borderColor: "none",
              }}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="error"
              // onClick={handleConvert}
              onClick={() => handleStatus("Closed - Lost")}
              sx={{
                width: "130px",
                // bgcolor: "rgba(255, 255, 255,0.6)",
                // color: "white",
                borderColor: "none",
              }}
            >
              Lost
            </Button>
            <Button
              variant="contained"
              color="success"
              // onClick={handleConvert}
              sx={{
                width: "130px",
                // bgcolor: "rgba(255, 255, 255,0.6)",
                // color: "white",
                borderColor: "none",
              }}
              onClick={() => handleStatus("Closed Won - Paid")}
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
