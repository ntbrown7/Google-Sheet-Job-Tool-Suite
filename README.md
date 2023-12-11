# Google-Sheet-Job-Tool-Suite
Track your progress with this dynamic tool. Assign the scripts to the buttons to be well on your way to dominating the job market! Keep track of your progress as you ascend towards employment. Main features involve dynamic job app counter, information adding, and a chart to see your overall progress! 


This documentation covers the usage of three Google Apps Script functions designed to manage application tracking within a Google Sheet.

## Functions

### `addAppCount()`

This function increments an application count for today's date. If today's date does not exist in the sheet, it adds a new column with today's date and initializes the counter to 0.

#### Behavior

- Checks if today's date is already in the first row.
- If not present, adds today's date and sets the counter under it to 0.
- If present, increments the counter by 1.

### `setTodaysDateIfEmpty()`

This function checks the first 20 columns of the first row. If they are empty, it sets the current date in the 'A1' cell in the format "MM/dd/yyyy".

#### Behavior

- Checks for any values in the first 20 columns of row 1.
- If all empty, sets today's date in cell 'A1'.

### `addJobInfo()`

This function prompts the user for job information text and then inserts this text into the next available cell under the column with today's date.

#### Behavior

- Prompts the user to enter job information.
- Finds the column with today's date.
- Inserts the entered text into the next empty cell in the identified column.

## Usage

These functions are intended to be assigned to buttons within a Google Sheet for ease of use:

- **+1 Application Button**: Connects to `addAppCount()` to track the number of applications.
- **Add Job Info Button**: Connects to `addJobInfo()` to enter job details into the sheet.

### Setting Up Buttons

1. In your Google Sheet, go to `Insert > Drawing` to create a new button.
2. After creating the button, click on it and select the three dots in the top right corner.
3. Choose `Assign script` and enter the name of the function you wish to link the button to (e.g., `addAppCount` or `addJobInfo`).

## Important Notes

- Ensure that the Google Sheet's timezone matches the timezone expected by the script for accurate date representation.
- The user will be alerted if today's date column cannot be found or if there are no empty rows to enter job information.
- Only users with Edit permissions to the Google Sheet can run these scripts successfully.

