let fromCurrency = document.getElementById("from");
let toCurrency = document.getElementById("to");
const amount = document.querySelector(".amount input");
const resultText = document.querySelector(".result");

const apiKey = "7d4b6bf3a199701411ddc617";

//function to handle country flag.
const handleImage = (dropdown) => {
  //get image tag
  const imgTag = dropdown.parentElement.querySelector("img");
  //change image source
  imgTag.src = `https://flagsapi.com/${
    countryCodes[dropdown.value]
  }/flat/64.png`;
};

//function to execute on a selected drop-down option
const onChange = (dropdown) => {
  dropdown.addEventListener("change", (e) => {
    handleImage(dropdown);
    getExchangeRate();
  });
};

//function to get the exchange rate
const getExchangeRate = async () => {
  amount.value = amount.value || 0;

  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`
    );

    const result = await response.json();

    const exchangeRate = result.conversion_rates[toCurrency.value];

    //calculating the exchange rate
    let totalExchangeRate = (amount.value * exchangeRate).toFixed(2);

    resultText.innerText = totalExchangeRate;
  } catch (error) {
    alert("Something went wrong!");
  }
};

//generating a drop-down option list
[fromCurrency, toCurrency].forEach((dropdown, index) => {
  for (let country in countryCodes) {
    //Choose INDIA as the first country and the United States as the second.
    let selected =
      (country === "INR" && index == 0) || (country === "USD" && index == 1)
        ? "selected"
        : "";
    //Create an option tag.
    let optionTag = document.createElement("option");
    optionTag.value = country;
    optionTag.selected = selected;
    optionTag.innerHTML = country;
    //adding an option tag to the dropdown
    dropdown.appendChild(optionTag);
  }

  onChange(dropdown);
});

//function to interchange countries
const exchange = () => {
  [fromCurrency.value, toCurrency.value] = [
    toCurrency.value,
    fromCurrency.value,
  ];

  [fromCurrency, toCurrency].forEach((dropdown) => handleImage(dropdown));
  getExchangeRate();
};

//function to clear the input amount
const clear = () => (fromAmount.value = toAmount.value = null);