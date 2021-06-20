var file = null;
/*
GET OPERATION
var headers = new Headers();
headers.append("x-api-key", "uhu63XPxEc8cy9gkfVcVi01Nv1bYjco4gtjxxES6");
headers.append("Access-Control-Allow-Origin", "https://u7u0iwpuhc.execute-api.eu-central-1.amazonaws.com");

var requestOptions = {
  method: 'GET',
  headers: headers,
  redirect: 'follow'
};

fetch("https://u7u0iwpuhc.execute-api.eu-central-1.amazonaws.com/Prod/currExchangeQuery", requestOptions)
  .then(response => response.json())
  .then(jsonResponse => file = jsonResponse)
  .catch(error => console.log('error', error));

console.log(file);
*/

fetch('json/currencies.json')
  .then(response => response.json())
  .then(jsonResponse => file = jsonResponse);

function submit() {
    const baseCurrency = document.getElementById("cf-from").value;
    const currencyToConvert = document.getElementById("cf-to").value;
    const valueToConvert = document.getElementById("cf-value").value;
    const resultBox = document.getElementById("result");
    const errorBox = document.getElementById("error");
    resultBox.innerText = "";
    errorBox.innerText = "";
    console.log("baseCurrency -> " + baseCurrency);
    console.log("currencyToConvert -> " + currencyToConvert);
    console.log("valueToConvert -> " + valueToConvert);
    convert(file, baseCurrency, currencyToConvert, valueToConvert, resultBox, errorBox);
}

function convert(response, baseCurrency, currencyToConvert, valueToConvert, resultBox, errorBox) {
    const convertedValue = parseInt(valueToConvert.replace(',','.'));
    found = false;
    response.forEach(currency => {
        if(currency.base === baseCurrency) {
            console.log("BASE -> " + currency.base);
            var value = currency.rates[currencyToConvert];
            console.log("VALUE -> " + value);
            if (!value) {
                errorBox.innerText = "Unable to found " + currencyToConvert;
            }
            var result = convertedValue * value;
            console.log("RESULT -> " + result);
            resultBox.innerText = `${valueToConvert} ${baseCurrency} = ${result} ${currencyToConvert}`
            found = true;
        }
    });
    if (!found) {
        errorBox.innerText = "Unable to found " + baseCurrency;
    }
}