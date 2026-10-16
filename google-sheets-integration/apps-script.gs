function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Leads") || ss.insertSheet("Leads");

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Timestamp", "Name", "Email", "Phone", "Company", "Team size", "Message"]);
  } else if (sheet.getRange(1, 7).getValue() === "") {
    // Existing sheet created before the Message column was added.
    sheet.getRange(1, 7).setValue("Message");
  }

  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.name || "",
    data.email || "",
    data.phone || "",
    data.company || "",
    data.team || "",
    data.message || "",
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ result: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}
