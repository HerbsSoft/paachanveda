// =====================================================
// GOOGLE APPS SCRIPT - VedaVital Lead Collection
// =====================================================
// 
// 📌 SETUP INSTRUCTIONS:
//
// 1. Go to https://script.google.com
// 2. Click "New Project"
// 3. Delete the default code and paste this entire code
// 4. Click "Deploy" → "New Deployment"
// 5. Select type: "Web app"
// 6. Set "Execute as": Me
// 7. Set "Who has access": Anyone
// 8. Click "Deploy" and copy the Web App URL
// 9. Paste that URL in the landing page's GOOGLE_SCRIPT_URL variable
//
// =====================================================

function doPost(e) {
  try {
    // Open the active spreadsheet (or create/open by name)
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // If no active spreadsheet, create one
    if (!ss) {
      ss = SpreadsheetApp.create("VedaVital PachanVeda Leads");
    }
    
    var sheet = ss.getSheetByName("Leads");
    
    // Create "Leads" sheet if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet("Leads");
      // Add headers
      sheet.appendRow([
        "Timestamp",
        "Name", 
        "Phone",
        "City",
        "Purpose",
        "Source",
        "Status"
      ]);
      
      // Format headers
      var headerRange = sheet.getRange(1, 1, 1, 7);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#2d6a2e");
      headerRange.setFontColor("white");
      
      // Set column widths
      sheet.setColumnWidth(1, 180);
      sheet.setColumnWidth(2, 150);
      sheet.setColumnWidth(3, 130);
      sheet.setColumnWidth(4, 130);
      sheet.setColumnWidth(5, 200);
      sheet.setColumnWidth(6, 120);
      sheet.setColumnWidth(7, 100);
    }
    
    // Get form data
    var name = e.parameter.name || "";
    var phone = e.parameter.phone || "";
    var city = e.parameter.city || "";
    var purpose = e.parameter.purpose || "";
    var timestamp = e.parameter.timestamp || new Date().toLocaleString("hi-IN");
    var source = e.parameter.source || "Landing Page";
    
    // Map purpose to Hindi
    var purposeMap = {
      "order": "🛒 ऑर्डर करना चाहते हैं",
      "consult": "👨‍⚕️ फ्री कंसल्टेशन चाहिए",
      "info": "📋 और जानकारी चाहिए"
    };
    var purposeText = purposeMap[purpose] || purpose;
    
    // Append row
    sheet.appendRow([
      timestamp,
      name,
      phone,
      city,
      purposeText,
      source,
      "New"
    ]);
    
    // Optional: Send email notification
    // Uncomment the lines below and replace with your email
    /*
    MailApp.sendEmail({
      to: "your-email@gmail.com",
      subject: "🛒 New Lead - VedaVital PachanVeda",
      htmlBody: `
        <h2>New Lead Received! 🎉</h2>
        <table border="1" cellpadding="8" style="border-collapse:collapse;">
          <tr><td><b>Name</b></td><td>${name}</td></tr>
          <tr><td><b>Phone</b></td><td>${phone}</td></tr>
          <tr><td><b>City</b></td><td>${city}</td></tr>
          <tr><td><b>Purpose</b></td><td>${purposeText}</td></tr>
          <tr><td><b>Time</b></td><td>${timestamp}</td></tr>
        </table>
      `
    });
    */
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        "status": "success",
        "message": "Lead saved successfully"
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        "status": "error",
        "message": error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests (for testing)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      "status": "active",
      "message": "VedaVital Lead Collection API is running!"
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
