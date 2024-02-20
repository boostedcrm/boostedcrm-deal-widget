import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";

import InvoiceTable from "./InvoiceTable";

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
  selectedInvoices,
}) => {
  const handleCancel = () => {
    ZOHO.CRM.UI.Popup.closeReload().then(function (data) {
      console.log(data);
    });
  };


  const [activeSection, setActiveSection] = useState("main-deal-section");

  // Reusable TextField component
  const CustomTextField = ({ label, value, onChange, disabled, rowCount }) => (
    <Grid item xs={rowCount}>
      <TextField
        label={label}
        variant="outlined"
        value={value}
        onChange={onChange}
        fullWidth
        margin="dense"
        size="small"
        disabled={disabled}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          style: {
            backgroundColor: disabled ? "inherit" : "rgba(46, 125, 50, 0.08)",
          },
          classes: {
            notchedOutline: {
              borderColor: disabled ? "#000000" : "rgba(46, 125, 50, 1)",
              borderWidth: disabled ? 1 : 2,
            },
          },
        }}
      />
    </Grid>
  );

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
              {/* Account Name */}
              <CustomTextField
                label="Account Name"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                disabled
                rowCount={3}
              />
              {/* Deal Name */}
              <CustomTextField
                label="Deal Name"
                value={dealName}
                onChange={(e) => setDealName(e.target.value)}
                disabled
                rowCount={3}
              />
              {/* Amount */}
              <CustomTextField
                label="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                rowCount={3}
              />
              {/* Company Revenue */}
              <CustomTextField
                label="Company Revenue"
                value={companyRevenue}
                onChange={(e) => setCompanyRevenue(e.target.value)}
                rowCount={3}
              />
              {/* Deal Stage */}
              <CustomTextField
                label="Deal Stage"
                value={dealStage}
                onChange={(e) => setDealStage(e.target.value)}
                disabled
                rowCount={3}
              />
              {/* Contact First Name */}
              <CustomTextField
                label="Contact First Name"
                value={contactFirstName}
                onChange={(e) => setContactFirstName(e.target.value)}
                disabled
                rowCount={3}
              />
              {/* Contact Last Name */}
              <CustomTextField
                label="Contact Last Name"
                value={contactLastName}
                onChange={(e) => setContactLastName(e.target.value)}
                disabled
                rowCount={3}
              />
              {/* Contact Person Title */}
              <CustomTextField
                label="Contact Person Title"
                value={contactPersonTitle}
                onChange={(e) => setContactPersonTitle(e.target.value)}
                rowCount={3}
                disabled
              />
              {/* Contact Person LinkedIn */}
              <CustomTextField
                label="Contact Person LinkedIn"
                value={contactPersonLinkedin}
                onChange={(e) => setContactPersonLinkedin(e.target.value)}
                rowCount={6}
              />
              {/* CEO LinkedIn */}
              <CustomTextField
                label="CEO LinkedIn"
                value={ceoLinkedin}
                onChange={(e) => setCeoLinkedin(e.target.value)}
                rowCount={6}
              />
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
            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "7px"
                }}
              >
                <Typography fontWeight="bold">Finance</Typography>
                <Button>Project</Button>
              </Box>
              <InvoiceTable data={selectedInvoices} />
            </Box>
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
                borderColor: "none",
              }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              sx={{
                width: "130px",
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
              sx={{
                width: "130px",
                borderColor: "none",
              }}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleStatus("Closed - Lost")}
              sx={{
                width: "130px",
                borderColor: "none",
              }}
            >
              Lost
            </Button>
            <Button
              variant="contained"
              color="success"
              sx={{
                width: "130px",
                borderColor: "none",
              }}
              onClick={() => handleStatus("Closed Won - Paid")}
            >
              Won
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default DealWidget;
