function calculateTotal() {
    var num1 = parseFloat(document.querySelector('input[name="total-1"]').value) || 0;
    var num2 = parseFloat(document.querySelector('input[name="total-2"]').value) || 0;
    var num3 = parseFloat(document.querySelector('input[name="total-3"]').value) || 0;
    
    var sum = num1 + num2 + num3;
    
    document.getElementById("totalAmount").innerHTML = "Total Amount: " + sum.toFixed(2); // Show total with 2 decimal places
    
    var totalInWords = convertToWords(sum);
    
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
 