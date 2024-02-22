import {
  Box,
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import {
  LocalizationProvider,
  DatePicker as MuiDatePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

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
  nextStep,
  setNextStep,
  followup,
  setFollowUp,
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

  const openProject = () => {
    // Open Google in a new tab
    window.open(
      "https://projects.zoho.com/portal/boostedcrm#kanbanview/1102347000010628029/customview/1102347000008767003",
      "_blank"
    );
  };



  console.log({followup})

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
                disabled
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
                rowCount={3}
                disabled
              />
              {/* CEO LinkedIn */}
              <CustomTextField
                label="CEO LinkedIn"
                value={ceoLinkedin}
                onChange={(e) => setCeoLinkedin(e.target.value)}
                rowCount={3}
                disabled
              />
              <CustomTextField
                label="Next Step"
                value={nextStep}
                onChange={(e) => setNextStep(e.target.value)}
                rowCount={3}
              />
              <Grid item xs={3} sx={{ mt: 1 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MuiDatePicker
                    disablePast
                    label="Follow Up"
                    value={followup}
                    onChange={(newValue) => {
                      setFollowUp(dayjs(newValue).format("YYYY-MM-DD"));
                    }}
                    PopperProps={{
                      placement: "right-end",
                    }}
                    fullWidth
                    sx={{ bgcolor: "rgba(46, 125, 50, 0.08)" }}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        size: "small",
                        InputLabelProps: { shrink: true },
                      },
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                        margin="dense"
                        sx={{
                          "& .MuiInputBase-input": {
                            // This class may vary, ensure it's the correct one
                            height: "30px !important", // Adjust the height as needed
                            padding: "6px 12px !important", // Adjust the padding as needed
                            fontSize: "0.875rem !important", // Adjust the font size as needed
                            bgcolor: "red",
                          },
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  variant="outlined"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  fullWidth
                  multiline
                  disabled
                  margin="dense"
                  size="small"
                  InputLabelProps={{
                    shrink: true,
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
                  padding: "7px",
                }}
              >
                <Typography fontWeight="bold">Finance</Typography>
                <Button>Project</Button>
              </Box>
              <InvoiceTable data={selectedInvoices} />
            </Box>
          </form>
          <Box>
            <Box
              sx={{
                position: "fixed",
                bottom: 20,
                left: 0,
                paddingLeft: "20px",
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
        </Box>
      )}
    </Box>
  );
};

export default DealWidget;
