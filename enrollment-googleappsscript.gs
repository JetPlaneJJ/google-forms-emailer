// Name: Jia-Jia (Jay) Lin
// Date: March 3rd, 2020
// Purpose: Generate a unique ID per Google Forms submitter, insert into spreadsheet, and display to submitter at the end. 
// This code was used for the Winter 2020 PNW Adapted Toy Library research project at UW Seattle.

// Adds User ID into a Form's Linked Spreadsheet (at the "ID", the last column)
// To use this properly, you must set a Trigger for "After Form Submitted", using this function
function add_uid(){
  var uid = create_id();
  var ss = SpreadsheetApp.getActive();
  var ws = ss.getSheetByName("Form Responses 1"); // name of the specific subsheet you want to insert data in
  var data = ws.getDataRange().getValues();
  var rowNum = data.length;
  var colNum = data[0].length;
  var IDcell = ws.getRange(rowNum, colNum) // gets the cell you want to insert in
  IDcell.setValue(uid);
  //doGet();
  
  // construct the HTML for email, then send to email address extracted from spreadsheet
  var htmlBody = '<ul>';
  htmlBody += "This is your unique ID: ";
  htmlBody += IDcell.getValue(); // assuming this cell has their email address
  htmlBody += '</ul>';
  
  // recipient = email
  var recipient = data[2][data.length];
  GmailApp.sendEmail(recipient, "Unique ID for PNW Library Enrollment", htmlBody); // template, you can change this
}

// Generate a random ID based on current Date 
function create_id(){
  var script_properties = PropertiesService.getScriptProperties();
  var keys = script_properties.getKeys();
  var uid = new_id();
  if (keys.indexOf(uid) >= 0) {
    uid = new_id();
  }
  else{
    script_properties.setProperty(uid, new Date());
  }
  return uid;
}

// returns a random number given a min and max
function rand(min, max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}

// returns a randomly generated user ID
function new_id(){
  var rNum = rand(1,9999999);
  var id = ('0000' + rNum).slice(-5);
  return 'USERID-' + id;
}

// use this to test the functions
function test(){
  Logger.log(new_id());
  create_id();
}



