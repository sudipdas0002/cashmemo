function updateTotalAmount() {
  var total = 0;
  var numInputs = document.querySelectorAll('input[name^="total-"]');
  numInputs.forEach(function (input) {
    total += parseFloat(input.value) || 0;
  });

  document.getElementById("totalAmount").innerHTML = "Total Amount: " + total.toFixed(2);
  var totalInWords = convertToWords(total);
  document.getElementById("totalAmountWords").innerHTML = "Total Amount in Words: " + totalInWords + " Only";
}

function convertToWords(num) {
  var ones = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
  var teens = [ "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  var tens = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  if (num === 0) {
    return "Zero Rupees";
  }

  function convertLessThanThousand(num) {
    var words = "";

    if (num >= 100) {
      words += ones[Math.floor(num / 100)] + " Hundred ";
      num %= 100;
    }

    if (num >= 11 && num <= 19) {
      words += teens[num - 11] + " ";
      num = 0; // To avoid adding extra space
    } else if (num >= 20) {
      words += tens[Math.floor(num / 10)] + " ";
      num %= 10;
    }

    if (num > 0) {
      words += ones[num] + " ";
    }

    return words;
  }

  var words = "";

  if (num >= 100000) {
    words += convertLessThanThousand(Math.floor(num / 100000)) + "Lakh ";
    num %= 100000;
  }

  if (num >= 1000) {
    words += convertLessThanThousand(Math.floor(num / 1000)) + "Thousand ";
    num %= 1000;
  }

  words += convertLessThanThousand(num);
  words += "Rupees";

  return words.trim();
}
 
  
  // Function to calculate the current date in a specific format
function print_today() {
    var now = new Date();
    var months = [
      'January','February','March','April','May','June','July','August','September','October','November','December'
    ];
    var date = ((now.getDate() < 10) ? "0" : "") + now.getDate();
  
    function fourdigits(number) {
      return (number < 1000) ? number + 1900 : number;
    }
    var today = `${months[now.getMonth()]} ${date}, ${now.getFullYear()}`;
    return today;
  };

  
 // Function to add a new row
function addRow() {
  // Get the table body where new rows will be added
  var tableBody = document.getElementById("table-body");

  // Create a new row
  var newRow = document.createElement("tr");

  // Define the HTML content for the new row
  newRow.innerHTML = `
    <td class="serial-number"></td> <!-- Will be set dynamically -->
    <td class="wide-box"><input class="text-1" name="item-new"></td>
    <td class="smaller-box"><input class="number-1" name="quantity-new" oninput="calculateTotal(this)"></td>
    <td class="small-box"><input class="number-2" name="price-new" oninput="calculateTotal(this)"></td>
    <td class="medium-box"><input class="number-2" name="total-new"></td>
    <td class="no-box"><button onclick="deleteRow(this)">Delete</button></td>
  `;

  // Append the new row to the table body
  tableBody.appendChild(newRow);

  // Update serial numbers for all rows
  updateSerialNumbers();
}

// Function to delete a row
function deleteRow(button) {
  // Get the row that contains the button
  var row = button.parentNode.parentNode;

  // Get the table body
  var tableBody = document.getElementById("table-body");

  // Remove the row from the table
  tableBody.removeChild(row);

  // Update serial numbers for all remaining rows
  updateSerialNumbers();
}

// Function to update serial numbers for all rows
function updateSerialNumbers() {
  var serialNumbers = document.querySelectorAll(".serial-number");
  serialNumbers.forEach(function (element, index) {
    element.textContent = index + 1;
  });
}

// Function to calculate total based on quantity and price input
function calculateTotal(inputElement) {
  var row = inputElement.parentNode.parentNode;
  var quantity = parseFloat(row.querySelector('input[name^="quantity"]').value) || 0;
  var price = parseFloat(row.querySelector('input[name^="price"]').value) || 0;
  var total = quantity * price;
  row.querySelector('input[name^="total"]').value = total.toFixed(2); // Display total with 2 decimal places
}

function savePage() {
    var element = document.body; // Choose the element to be saved as PDF

    html2pdf(element);
  }
  

function printPage() {
  toggleElements();
  var printContents = document.getElementById("content-to-print").innerHTML;
  var originalContents = document.body.innerHTML;
  document.body.innerHTML = printContents;
  window.print();
  document.body.innerHTML = originalContents; // Restore the original content
  toggleElements();
}

function printPage() {
  window.print();
}

