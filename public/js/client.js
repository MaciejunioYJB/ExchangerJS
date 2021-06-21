var file = null;
var cryptoFile = null;

fetch('json/currencies.json')
  .then(response => response.json())
  .then(jsonResponse => file = jsonResponse);

fetch('json/crypto.json')
.then(response => response.json())
.then(jsonResponse => cryptoFile = jsonResponse);

function submit() {
    const baseCurrency = document.getElementById("cf-from").value.toUpperCase();
    const currencyToConvert = document.getElementById("cf-to").value.toUpperCase();
    const valueToConvert = document.getElementById("cf-value").value;
    const resultBox = document.getElementById("result");
    const errorBox = document.getElementById("error");
    resultBox.innerText = "";
    errorBox.innerText = "";
    console.log("baseCurrency -> " + baseCurrency);
    console.log("currencyToConvert -> " + currencyToConvert);
    console.log("valueToConvert -> " + valueToConvert);
    if (baseCurrency === currencyToConvert) {
        errorBox.innerText = "We can't convert the same currency";
    }
    else {
        convert(file, baseCurrency, currencyToConvert, valueToConvert, resultBox, errorBox);
    }
}

function submitCrypto() {
    const cryptoCurrency = document.getElementById("cf-from2").value.toUpperCase();
    const resultBox = document.getElementById("result-crypto");
    const errorBox = document.getElementById("error-crypto");
    resultBox.innerText = "";
    errorBox.innerText = "";
    console.log("cryptoCurrency -> " + cryptoCurrency);
    convertCrypto(cryptoFile, cryptoCurrency, resultBox, errorBox);
}

function convert(response, baseCurrency, currencyToConvert, valueToConvert, resultBox, errorBox) {
    const convertedValue = parseInt(valueToConvert.replace(',','.'));
    found = false;
    response.forEach(currency => {
        if (currency.base === baseCurrency) {
            console.log("BASE -> " + currency.base);
            var value = currency.rates[currencyToConvert];
            console.log("VALUE -> " + value);
            if (!value) {
                errorBox.innerText = "Unable to find " + currencyToConvert;
            }
            var result = convertedValue * value;
            console.log("RESULT -> " + result);
            if (!result) {
                errorBox.innerText = `We can't convert ${valueToConvert} ${baseCurrency} to ${currencyToConvert}`;
            } else {
                resultBox.innerText = `${valueToConvert} ${baseCurrency} = ${result} ${currencyToConvert}`
            }
            found = true;
        }
    });
    if (!found) {
        errorBox.innerText = "Unable to find " + baseCurrency;
    }
}

function convertCrypto(response, cryptoCurrency, resultBox, errorBox) {
    found = false;
    response.forEach(currency => {
        if (currency.symbol === cryptoCurrency) {
            var value = currency.exchanges[0].exchangeValue;
            resultBox.innerText = `1.00 ${cryptoCurrency} = ${value} USD`;
            found = true;
        }
    })
    if (!found) {
        errorBox.innerText = "Unable to find " + cryptoCurrency;
    }
}