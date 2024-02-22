import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  Box,
  Autocomplete,
  Grid,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";

import DealWidget from "./pages/DealWidget";

import { Snackbar } from "@mui/material";
import dayjs from "dayjs";

const ZOHO = window.ZOHO;

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "black",
        },
      },
    },
  },
});

function App() {
  const [page, setPage] = useState("deal");
  const [recordResp, setRecordResp] = useState([]);
  const [recordId, setRecordId] = useState(null);
  const [dealAmount, setDealAmount] = useState(1500);

  const [height, setHeight] = useState("500");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [accountName, setAccountName] = useState("");
  const [dealName, setDealName] = useState("");
  const [contactFirstName, setContactFirstName] = useState("");
  const [contactLastName, setContactLastName] = useState("");
  const [amount, setAmount] = useState("");
  const [companyRevenue, setCompanyRevenue] = useState("");
  const [dealStage, setDealStage] = useState("");
  const [contactPersonTitle, setContactPersonTitle] = useState("");
  const [contactPersonLinkedin, setContactPersonLinkedin] = useState("");
  const [ceoLinkedin, setCeoLinkedin] = useState("");
  const [description, setDescription] = useState("");
  const [nextStep, setNextStep] = useState("");
  const [followup, setFollowUp] = useState(null);

  const options = [
    "-None-",
    "Acuity",
    "Homepage Form",
    "Zoho Implementation",
    "upWork",
    "Zoho Partner Page",
    "Search Engines",
    "Email",
    "Manual",
    "Quick Quote",
    "Contact Form",
    "Google Ads",
    "Chat",
    "Phone calls",
    "Footer",
  ];

  const [descriptionHeight, setDescriptionHeight] = useState(0);

  const [invoices, setInvoices] = useState([]);
  const [project, setProject] = useState([]);

  useEffect(() => {
    console.log({ height });
    ZOHO.embeddedApp.on("PageLoad", async function (data) {
      // console.log(data.EntityId);

      setRecordId(data?.EntityId[0]);
      try {
        const recordData = await ZOHO.CRM.API.getRecord({
          Entity: "Deals",
          RecordID: data?.EntityId[0],
        });

        console.log({ recordData });
        const description = recordData?.data[0]?.Description; // Attempt to get the description

        // Set initial parameters
        const baseHeight = 500;
        const charactersPerLine = 106;
        const heightIncrementPerLine = 20;
        let dynamicHeight = baseHeight; // Default height

        // Only calculate dynamic height if description exists
        if (description) {
          const descriptionLength = description.length;
          const numLines = Math.ceil(descriptionLength / charactersPerLine);
          dynamicHeight += numLines * heightIncrementPerLine; // Adjust height based on description length
        }

        await ZOHO.CRM.UI.Resize({ height: "800", width: "1200" }).then(
          function (uiData) {
            console.log(uiData);
          }
        );

        let func_name = "related_books_invoice";
        let req_data = {
          id: data?.EntityId[0],
        };
        console.log({req_data})
        await ZOHO.CRM.FUNCTIONS.execute(func_name, req_data).then(
          async function (result) {
            console.log({invoices: result})
            setInvoices(result.data);
          }
        );

        let function_name = "related_project_books";
        let request_data = {
          id: data?.EntityId[0],
        };
        await ZOHO.CRM.FUNCTIONS.execute(function_name, request_data).then(
          async function (result) {
            setProject(result.data);
          }
        );

        // https://www.zohoapis.com/crm/v2/functions/related_project_books/actions/execute?auth_type=oauth

        if (recordData && recordData.data && recordData.data.length > 0) {
          const record = recordData.data[0];
          // Uncomment and adjust the state setters according to your actual state variables
          setAccountName(record?.Account_Name?.name);
          setDealName(record?.Deal_Name);
          setAmount(record?.Amount);
          setDealStage(record?.Stage);
          setDescription(record?.Description);
          setCeoLinkedin(record?.CEO_LinkedIN);
          setContactPersonTitle(record?.Contact_Person_Title);
          setContactPersonLinkedin(record?.Contact_Person_LinkedIN);
          setCompanyRevenue(record?.Company_Size_and_Revenue);
          setNextStep(record?.Next_Step);
          const date = new Date(record?.Follow_Up_Date)
          const formattedDate = dayjs(date);
          // Set the formatted date using setFollowUp
          setFollowUp(formattedDate);
          if (record.Contact_Name !== null) {
            const contactData = await ZOHO.CRM.API.getRecord({
              Entity: "Contacts",
              RecordID: record?.Contact_Name.id,
            });

            console.log("follow u date", record?.Follow_Up_Date);

            setContactFirstName(contactData?.data[0]?.First_Name);
            setContactLastName(contactData?.data[0]?.Last_Name);
          }
        }

        console.log(recordData.data[0]?.Contact_Name);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    });

    ZOHO.embeddedApp.init().then(() => {
      // setZohoLoaded(true);
    });
  }, [height, page]);

  console.log({ recordResp });

  const handleClose = async () => {
    await ZOHO.CRM.UI.Popup.close().then(function (data) {
      console.log(data);
    });
  };

  console.log({invoices: invoices, projects: project})

  const handleSave = async () => {
    var config = {
      Entity: "Deals",
      APIData: {
        id: recordId,
        Contact_Person_LinkedIN: contactPersonLinkedin,
        Contact_Person_Title: contactPersonTitle,
        CEO_LinkedIN: ceoLinkedin,
        Amount: amount,
        Company_Size_and_Revenue: companyRevenue,
        Follow_Up_Date: followup,
        Next_Step: nextStep,
      },
      Trigger: ["workflow"],
    };
    await ZOHO.CRM.API.updateRecord(config).then(function (data) {
      console.log(data);
    });
    ZOHO.CRM.UI.Popup.closeReload().then(function (data) {
      console.log(data);
    });
  };

  const handleStatus = async (stage) => {
    console.log({ recordId });
    var config = {
      Entity: "Deals",
      APIData: {
        id: recordId,
        Stage: stage,
      },
      Trigger: ["workflow"],
    };
    await ZOHO.CRM.API.updateRecord(config).then(function (data) {
      console.log(data);
    });
    ZOHO.CRM.UI.Popup.closeReload().then(function (data) {
      console.log(data);
    });
  };

  const [loading, setLoading] = useState(false);

  const [dealId, setDealId] = useState(null);

  let selectedInvoices;

  if (invoices !== undefined && invoices.length > 0) {
    selectedInvoices = invoices.slice(0, 5);
  } else {
    selectedInvoices = [];
  }

  return (
    <ThemeProvider theme={theme}>
      {page === "deal" && (
        <DealWidget
          handleClose={handleClose}
          dealId={dealId}
          accountName={accountName}
          setAccountName={setAccountName}
          dealName={dealName}
          setDealName={setDealName}
          contactFirstName={contactFirstName}
          setContactFirstName={setContactFirstName}
          contactLastName={contactLastName}
          setContactLastName={setContactLastName}
          amount={amount}
          setAmount={setAmount}
          companyRevenue={companyRevenue}
          setCompanyRevenue={setCompanyRevenue}
          dealStage={dealStage}
          setDealStage={setDealStage}
          contactPersonTitle={contactPersonTitle}
          setContactPersonTitle={setContactPersonTitle}
          contactPersonLinkedin={contactPersonLinkedin}
          setContactPersonLinkedin={setContactPersonLinkedin}
          ceoLinkedin={ceoLinkedin}
          setCeoLinkedin={setCeoLinkedin}
          description={description}
          setDescription={setDescription}
          handleStatus={handleStatus}
          handleSave={handleSave}
          selectedInvoices={selectedInvoices}
          nextStep={nextStep}
          setNextStep={setNextStep}
          followup={followup}
          setFollowUp={setFollowUp}
        />
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </ThemeProvider>
  );
}

export default App;
