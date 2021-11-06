// variable declaration for default values
var interest = 4;
var principle = 150000;
var time = 10;
var yearlyInt = 0;
var yearlyPrincipal = 0;
var dataTable = $('#schedule');


// caluclate button
$(document).ready(function() {
    $("#myButton").click(function(){
        createSchedule(interest, principle, time);
    });
});

// Schedule
function balanceCalc(balanceP, mc, interestRate){

  var interestPmt = balanceP * (interestRate/12);
  var principalPmt = mc - interestPmt;
  var balance = balanceP - principalPmt;

  // var calcOutput2 = document.getElementById("calcResult")
  // calcOutput2.innerHTML = principalPmt;

  return {
      balance: balance,
      outputP: principalPmt,
      outputI: interestPmt,
    };

};

function createSchedule() {

  var interestRate = interest / 100;
  var mc = (interestRate*principle) / (12*(1-(1+(interestRate/12))**(-12*time)));
  var balanceP = principle;
  var beginBalance = principle;
  var duration = time*12


  dataTable.html("");


  var row = "<thead><th>Year#</th><th>Begining Balance</th><th>Principal</th><th>Interest</th><th>Ending Balance</th></thead>"

  dataTable.append(row);

  dataTable.append('<tbody>');

  i = 0;

  while (i < duration) {
    var {balance, outputP, outputI} = balanceCalc(balanceP, mc, interestRate);
    balanceP = balance;
    yearlyInt = yearlyInt + outputI;
    yearlyPrincipal += outputP;

    i++;
    if(i%12 == 0 ){
      var row = "<tr><td>" + (i/12) + "</td><td>" + Number(beginBalance).toFixed(2) +
        "</td><td>" + yearlyPrincipal.toFixed(2) + "</td><td>" + yearlyInt.toFixed(2) +
        "</td><td>" + Math.abs(balanceP).toFixed(2) + "</td></tr>";
      dataTable.append(row);
      yearlyInt = 0;
      yearlyPrincipal = 0;
      beginBalance = balanceP;
    }

  }
    dataTable.append('</tbody>');
}


// Calculate Monthly Cost & Yearly Costs
function calculateYC(interest, principle, time) {

  var interestRate = interest / 100
  var monthlyCost = (interestRate*principle) / (12*(1-(1+(interestRate/12))**(-12*time)))
  var annualCost = monthlyCost * 12

  calcOutput.innerHTML = annualCost.toFixed(2);

}

var calcOutput = document.getElementById("calcResult")
calcOutput.innerHTML.value = calculateYC(interest, principle, time);

// principle slider values
var principleSlider = document.getElementById("principleRange");
var principleOutput = document.getElementById("pincipleResult");
principleOutput.innerHTML = principleSlider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
principleSlider.oninput = function() {
  principleOutput.innerHTML = this.value;
  principle = this.value;
  dataTable.html("");
  calculateYC(interest, principle, time);
}

// time slider values
var timeSlider = document.getElementById("timeRange");
var timeOutput = document.getElementById("timeResult");
timeOutput.innerHTML = timeSlider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
timeSlider.oninput = function() {
  timeOutput.innerHTML = this.value;
  time = this.value;
  dataTable.html("");
  calculateYC(interest, principle, time)
}

// interest rate slider values
var interestSlider = document.getElementById("interestRange");
var interestOutput = document.getElementById("interestResult");
interestOutput.innerHTML = interestSlider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
interestSlider.oninput = function() {
  interestOutput.innerHTML = this.value;
  interest = this.value;
  dataTable.html("");
  calculateYC(interest, principle, time)
}
