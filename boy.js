function updateTotalAmount() {
  var total = 0;
  var numInputs = document.querySelectorAll('input[name^="total-"]');
  numInputs.forEach(function (input) {
    total += parseFloat(input.value) || 0;
  });

  document.getElementById("totalAmount").innerHTML = "Total Amount: " + total.toFixed(2);
  var totalInWords = convertToWords(total);
  document.getElementById("totalAmountWords").innerHTML = "Total Amount in Words: " + totalInWords;
}

function convertToWords(num) {
  var ones = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
  var teens = ["", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  var tens = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  if (num === 0) {
    return "Zero";
  }

  var words = "";
  
  // Convert the integer part to words
  if (num >= 1000 && num <= 9999) {
    words += ones[Math.floor(num / 1000)] + " Thousand ";
    num %= 1000;
  }

  if (num >= 100) {
    words += ones[Math.floor(num / 100)] + " Hundred ";
    num %= 100;
  }

  if (num >= 20) {
    words += tens[Math.floor(num / 10)] + " ";
    num %= 10;
  }

  if (num > 10 && num < 20) {
    words += teens[num - 11] + " ";
    num = 0; // To avoid adding extra space
  }

  if (num > 0) {
    words += ones[num] + " ";
  }

  // Add the "Rupees" part to the words
  words += "Rupees";

  return words.trim();
}
  
  function printPage() {
    window.print();
  }
  function savePage() {
    var content = document.documentElement.outerHTML;
    var blob = new Blob([content], {type: 'text/html'});
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'my-page.html';
    a.click();
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
  
    var today = `${months[now.getMonth()]} ${date}, ${fourdigits(now.getYear())}`;
    return today;
  }
  
  // Other functions...
  
  $(document).ready(function() {
    // Event handling and initialization...
  });

  
 // Function to add a new row
function addRow() {
  // Get the table body where new rows will be added
  var tableBody = document.getElementById("table-body");

  // Create a new row
  var newRow = document.createElement("tr");

  // Define the HTML content for the new row
  newRow.innerHTML = `
    <td class="serial-number"></td> <!-- Will be set dynamically -->
    <td><input type="text" name="item-new"></td>
    <td><input type="number" name="quantity-new" oninput="calculateTotal(this)"></td>
    <td><input type="number" name="price-new" oninput="calculateTotal(this)"></td>
    <td><input type="number" name="total-new"></td>
    <td><button onclick="deleteRow(this)">Delete</button></td>
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
