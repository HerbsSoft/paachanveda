// ============================================================
// 📌 VedaVital PachanVeda - Google Apps Script (WORKING)
// ============================================================
//
// STEP-BY-STEP SETUP:
//
// 1️⃣  Go to → https://docs.google.com/spreadsheets
//     Create a NEW Google Sheet
//     Name it: "VedaVital Leads"
//
// 2️⃣  In the Sheet, rename "Sheet1" tab to "Leads"
//     (Right-click on "Sheet1" tab at bottom → Rename)
//
// 3️⃣  In Row 1, add these headers:
//     A1: Timestamp
//     B1: Name  
//     C1: Phone
//     D1: City
//     E1: Purpose
//     F1: Source
//
// 4️⃣  Go to → Extensions → Apps Script
//     (This opens the script editor)
//
// 5️⃣  DELETE everything in the editor
//     PASTE all the code below
//
// 6️⃣  Click 💾 Save (Ctrl+S)
//
// 7️⃣  Click "Deploy" → "New deployment"
//     - Click ⚙️ gear icon → Select "Web app"
//     - Description: "VedaVital Leads"
//     - Execute as: "Me"
//     - Who has access: "Anyone"  ← IMPORTANT!
//     - Click "Deploy"
//
// 8️⃣  It will ask for Authorization:
//     - Click "Authorize access"
//     - Choose your Google account
//     - Click "Advanced" → "Go to VedaVital Leads (unsafe)"
//     - Click "Allow"
//
// 9️⃣  COPY the Web App URL it gives you
//     It looks like: https://script.google.com/macros/s/AKfycbx.../exec
//
// 🔟  PASTE that URL in your landing page HTML
//     Find: YOUR_GOOGLE_APPS_SCRIPT_URL_HERE
//     Replace with your URL
//
// ============================================================

// This handles POST requests from your form
function doPost(e) {
  return handleRequest(e);
}

// This handles GET requests (for testing)
function doGet(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  try {
    // Get the active spreadsheet
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Leads");
    
    // If "Leads" sheet doesn't exist, use the first sheet
    if (!sheet) {
      sheet = ss.getSheets()[0];
    }
    
    // Check if headers exist, if not add them
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Name", "Phone", "City", "Purpose", "Source"]);
    }
    
    // Get form data from parameters
    var name = "";
    var phone = "";
    var city = "";
    var purpose = "";
    var timestamp = "";
    var source = "";
    
    if (e && e.parameter) {
      name = e.parameter.name || "";
      phone = e.parameter.phone || "";
      city = e.parameter.city || "";
      purpose = e.parameter.purpose || "";
      timestamp = e.parameter.timestamp || "";
      source = e.parameter.source || "";
    }
    
    // If timestamp is empty, create one
    if (!timestamp) {
      timestamp = new Date().toLocaleString("en-IN", {timeZone: "Asia/Kolkata"});
    }
    
    // If source is empty
    if (!source) {
      source = "Landing Page";
    }
    
    // Map purpose values to readable Hindi text
    if (purpose === "order") {
      purpose = "🛒 ऑर्डर करना चाहते हैं";
    } else if (purpose === "consult") {
      purpose = "👨‍⚕️ फ्री कंसल्टेशन";
    } else if (purpose === "info") {
      purpose = "📋 जानकारी चाहिए";
    }
    
    // Add the row to the sheet
    sheet.appendRow([timestamp, name, phone, city, purpose, source]);
    
    // Return success response with CORS headers
    var output = ContentService.createTextOutput(
      JSON.stringify({"status": "success", "message": "Lead saved!"})
    ).setMimeType(ContentService.MimeType.JSON);
    
    return output;
    
  } catch (error) {
    // Return error response
    var output = ContentService.createTextOutput(
      JSON.stringify({"status": "error", "message": error.toString()})
    ).setMimeType(ContentService.MimeType.JSON);
    
    return output;
  }
}
