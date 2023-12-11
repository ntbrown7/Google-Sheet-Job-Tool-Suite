function addAppCount() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  setTodaysDateIfEmpty()

  if (sheet.getMaxColumns() === 0) {
    sheet.insertColumnBefore(1);
  }

  var today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "MM/dd/yyyy");
  var lastColumn = sheet.getLastColumn();
  var headers = lastColumn > 0 ? sheet.getRange(1, 1, 1, lastColumn).getValues()[0] : [];
  
  var formattedHeaders = headers.map(function(dateString) {
    var date = new Date(dateString);
    return Utilities.formatDate(date, Session.getScriptTimeZone(), "MM/dd/yyyy");
  });

  var columnIndex = formattedHeaders.indexOf(today) + 1;

  if (columnIndex === 0) {
    columnIndex = lastColumn + 1;
    sheet.insertColumnAfter(lastColumn);
    sheet.getRange(1, columnIndex).setValue(today);
    sheet.getRange(2, columnIndex).setValue(0);
  } else {
    var currentValue = sheet.getRange(2, columnIndex).getValue();
    sheet.getRange(2, columnIndex).setValue(currentValue + 1);
  }
}


function setTodaysDateIfEmpty() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var firstRowValues = sheet.getRange(1, 1, 1, 20).getValues()[0]; // Get the first row, first 20 columns
  var isEmpty = firstRowValues.every(function(value) { return value === ''; }); // Check if all values are empty

  if (isEmpty) {
    var today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "MM/dd/yyyy");
    sheet.getRange('A1').setValue(today); // Set today's date in A1
  }
}

function addJobInfo() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var ui = SpreadsheetApp.getUi(); // Get the UI environment to use alerts and prompts
  
  // Prompt the user for job information
  var response = ui.prompt('Enter Job Information', 'Please enter the job details:', ui.ButtonSet.OK_CANCEL);
  
  // Check if the user clicked "OK"
  if (response.getSelectedButton() == ui.Button.OK) {
    var jobInfo = response.getResponseText();
    var today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "MM/dd/yyyy");
    var lastColumn = sheet.getLastColumn();
    var headers = lastColumn > 0 ? sheet.getRange(1, 1, 1, lastColumn).getValues()[0] : [];
    
    var formattedHeaders = headers.map(function(dateString) {
      var date = new Date(dateString);
      return Utilities.formatDate(date, Session.getScriptTimeZone(), "MM/dd/yyyy");
    });
  
    var columnIndex = formattedHeaders.indexOf(today) + 1;
  
    if (columnIndex === 0) {
      // If today's date is not found, inform the user and do nothing
      ui.alert('Error', 'Today\'s date column not found. Please ensure the date column exists.', ui.ButtonSet.OK);
    } else {
      // Find the next available row in the column for today's date
      var dataRange = sheet.getRange(2, columnIndex, sheet.getMaxRows() - 1);
      var data = dataRange.getValues();
      var nextEmptyRowIndex = data.findIndex(function(row) { return row[0] === ''; }) + 2; // +2 to adjust for array index and header row
      
      // Set the job information in the cell
      if (nextEmptyRowIndex > 1) { // Check if a next empty row was found
        sheet.getRange(nextEmptyRowIndex, columnIndex).setValue(jobInfo);
      } else {
        ui.alert('Error', 'No empty rows found to enter job information.', ui.ButtonSet.OK);
      }
    }
  }
}
