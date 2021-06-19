var file = null;
fetch('json/currencies.json')
  .then(response => response.json())
  .then(jsonResponse => file = jsonResponse);

function submit(button) {
    const baseCurrency = document.getElementById("cf-from").value;
    const currencyToConvert = document.getElementById("cf-to").value;
    const valueToConvert = document.getElementById("cf-value").value;
    const resultBox = document.getElementById("result");
    console.log("baseCurrency -> " + baseCurrency);
    console.log("currencyToConvert -> " + currencyToConvert);
    console.log("valueToConvert -> " + valueToConvert);
    convert(file, baseCurrency, currencyToConvert, valueToConvert, resultBox);
}

function convert(response, baseCurrency, currencyToConvert, valueToConvert, resultBox) {
    var convertedValue = parseInt(valueToConvert.replace(',','.'));
    response.forEach(currency => {
        if(currency.base === baseCurrency) {
            console.log("BASE -> " + currency.base);
            var value = currency.rates[currencyToConvert];
            console.log("VALUE -> " + value);
            var result = convertedValue * value;
            console.log("RESULT -> " + result);
            resultBox.innerText = `${baseCurrency} -> ${currencyToConvert} = ${result}`
        }
    });;
}