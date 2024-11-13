let selectedDate1 = new Date(); // The user's check in date
let selectedDate2 = new Date(); // The user's check out date
let selectedAdults = 1; // The # of adults the user selected
let totalCost = new Number();

// Datepicker function for the user to be able to click on the dates they want
$(document).ready(function () {
  
  // Datepicker function for check in
  $("#datepicker1").datepicker({
    autoclose: true,
    todayHighlight: true,
    format: "mm/dd/yyyy" 
  }).on("change", function () {
    const date = $(this).val();
    selectedDate1 = parseDate(date); 
    calculateDays();
    calculateCost();
  }).datepicker('update', selectedDate1);

// Datepicker function for check out
  $("#datepicker2").datepicker({
    autoclose: true,
    todayHighlight: true,
    format: "mm/dd/yyyy"
  }).on("change", function () {
    const date = $(this).val();
    selectedDate2 = parseDate(date); 
    calculateDays();
    calculateCost();
  }).datepicker('update', selectedDate2);
});

function parseDate(dateStr) {
  const [month, day, year] = dateStr.split("/").map(Number);
  return new Date(year, month - 1, day);
}

// This function calculates how many days between check out and check in
function calculateDays() {
  if (selectedDate1 && selectedDate2) {
    console.log("Selected Date 1:", selectedDate1);
    console.log("Selected Date 2:", selectedDate2);
    
    // Subtracts the value of check out date by check in date
    const differenceInTime = selectedDate2.getTime() - selectedDate1.getTime();
    const differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24));

    // Sets the "Days" for to the difference in days
    document.getElementById("Days").value = differenceInDays;
    return differenceInDays;
  }
}

$(document).ready(function () {
  
  // Datepicker function for check in
  $("#Adults").on("change", function () {
    const dropdown = document.getElementById("Adults");
    // Get the selected option's value and text
    selectedAdults = dropdown.value;
    calculateCost();
  }).select(calculateCost());
  });

function getSelectedOption() {
    // Get the dropdown element
    const dropdown = document.getElementById("Adults");

    // Get the selected option's value and text
    const selectedValue = dropdown.value;
    const selectedText = dropdown.options[dropdown.selectedIndex].text;

    // Display the result
    console.log(selectedAdults);
  }

// This function calculates the cost of the days booked
function calculateCost() {
  totalCost = calculateDays() * selectedAdults * 150;
  document.getElementById("Cost").value = "$" + totalCost;
}

// This function resets all form elements and displays a success toast
function showResetToast() { 
      const toast = document.getElementById("toastReset");
      toast.classList.add("show");
  clearForm();
      // Removes the toast after 3 seconds
      setTimeout(() => {
        toast.classList.remove("show");
      }, 3000);
    }

function clearForm() {
  // Clears User forms
  document.getElementById("form1").value = "";
  document.getElementById("form2").value = "";
  document.getElementById("form3").value = "";
  
  // Clears Contact forms
  document.getElementById("form4").value = "";
  document.getElementById("form5").value = "";
  document.getElementById("form6").value = "";
  
  // Clears schedule forms
  document.getElementById("Adults").value = "1";
  document.getElementById("Days").value = "";
  document.getElementById("Cost").value = "";
  document.getElementById("datepicker1").value = "mm/dd/yyyy";
  document.getElementById("datepicker2").value = "mm/dd/yyyy";
  
  // Clears other forms
  document.getElementById("form7").value = "";
  document.getElementById("Range").slider = ("setValue", 0);
  const slider = document.getElementById("Range");
  slider.value = 50;
  const radios = document.getElementsByName("optradio");
    radios.forEach((radio, index) => {
      radio.checked = index === 0;
    });
}

// This function makes sure the cost is not negative or 0
function costValidation() {
  
  // Shows "No cost was calculated if the Cost is 0"
  if (totalCost == 0) {  
    const toastNone = document.getElementById("submitNoCost");
      toastNone.classList.add("show");
    
    // Removes the toast after 3 seconds
    setTimeout(() => {
        toastNone.classList.remove("show");
      }, 3000);
  }
  // Shows "Cost is negative" if the cost is negative
    else if (totalCost < 0) {
      const toastNegative = document.getElementById("submitNegativeCost");
      toastNegative.classList.add("show");
    
    // Removes the toast after 3 seconds
    setTimeout(() => {
        toastNegative.classList.remove("show");
      }, 3000);
    }
  else {
    
    // Shows "Form successfully submitted" if there are no validation errors
    const toastSuccess = document.getElementById("submitSuccess");
      toastSuccess.classList.add("show");
    
    // Removes the toast after 3 seconds
    setTimeout(() => {
        toastSuccess.classList.remove("show");
      }, 3000);
    }
  }
window.onload = function() {
  clearForm();
};