// Fungsi untuk mengubah tab
function changeTab(tabName) {
  // Hide all content
  document.getElementById("home-content").classList.add("hidden");
  document.getElementById("weight-content").classList.add("hidden");
  document.getElementById("length-content").classList.add("hidden");
  document.getElementById("temperature-content").classList.add("hidden");
  // Show selected content
  document.getElementById(tabName + "-content").classList.remove("hidden");

  // Reset all buttons
  document
    .getElementById("home-btn")
    .classList.remove("bg-blue-500", "text-white");
  document
    .getElementById("weight-btn")
    .classList.remove("bg-blue-500", "text-white");
  document
    .getElementById("length-btn")
    .classList.remove("bg-blue-500", "text-white");
  document
    .getElementById("temperature-btn")
    .classList.remove("bg-blue-500", "text-white");

  document.getElementById("home-btn").classList.add("bg-white");
  document.getElementById("weight-btn").classList.add("bg-white");
  document.getElementById("length-btn").classList.add("bg-white");
  document.getElementById("temperature-btn").classList.add("bg-white");

  // Set active button
  document.getElementById(tabName + "-btn").classList.remove("bg-white");
  document
    .getElementById(tabName + "-btn")
    .classList.add("bg-blue-500", "text-white");
}
// ========== FUNGSI VALIDASI ==========

// High order function for input validation
const validateInput = (conversionFn) => {
  return function () {
    const inputId = this.id.split("-")[0] + "-input";
    const input = document.getElementById(inputId).value;

    // Basic validation
    if (input === "") {
      document.getElementById(this.id.split("-")[0] + "-result").value = "Inputnya salah!";
      return;
    }

    const numValue = parseFloat(input);
    if (isNaN(numValue)) {
      document.getElementById(this.id.split("-")[0] + "-result").value =
        "Invalid input";
      return;
    }

    // Call the original conversion function
    conversionFn();
  };
};
//=========== WEIGHT CONVERSION ==========

// dictionary konversi berat
const toKgFactors = {
  g: 0.001,
  kg: 1,
  lb: 0.453592,
  oz: 0.0283495,
  t: 1000,
};
const fromKgFactors = {
  g: 1000,
  kg: 1,
  lb: 2.20462,
  oz: 35.274,
  t: 0.001,
};
// Fungsi untuk mengonversi berat
function convertWeight() {
  const input = document.getElementById("weight-input").value;
  const fromUnit = document.getElementById("weight-from").value;
  const toUnit = document.getElementById("weight-to").value;
  const resultElement = document.getElementById("weight-result");

  // Validasi input
  if (!input || isNaN(input)) {
    resultElement.value = "Input yang bener dong!";
    return;
  }

  // Konversi ke kg terlebih dahulu
  const valueInKg = parseFloat(input) * toKgFactors[fromUnit];
  // Kemudian konversi ke unit tujuan
  const result = valueInKg * fromKgFactors[toUnit];

  //  menampilkan hasil
  resultElement.value = formatResult(result); // Mengganti result.toFixed(2)
}

// Function to format result with appropriate decimal places
const formatResult = (value, decimalPlaces = 2) => {
  return Number.isInteger(value)
    ? value.toString()
    : value.toFixed(decimalPlaces);
};

// ========== LENGTH CONVERSION ==========

// Dictionary konversi panjang
const toMeterFactors = {
  km: 1000,
  m: 1,
  cm: 0.01,
  mm: 0.001,
  mi: 1609.34,
  yd: 0.9144,
  ft: 0.3048,
  in: 0.0254,
};

const fromMeterFactors = {
  km: 0.001,
  m: 1,
  cm: 100,
  mm: 1000,
  mi: 0.000621371,
  yd: 1.09361,
  ft: 3.28084,
  in: 39.3701,
};

// fungsi konversi panjang
const convertLengthBase = () => {
  const input = parseFloat(document.getElementById("length-input").value);
  const fromUnit = document.getElementById("length-from").value;
  const toUnit = document.getElementById("length-to").value;

  // Convert to meters first, then to target unit
  const valueInMeters = input * toMeterFactors[fromUnit];
  const result = valueInMeters * fromMeterFactors[toUnit];

  document.getElementById("length-result").value = formatResult(result);
};

// Apply validation wrapper
const convertLength = validateInput(convertLengthBase);

// ========== TEMPERATURE CONVERSION ==========

// Dictionary konversi suhu
const toCelsius = {
  celsius: (temp) => temp,
  fahrenheit: (temp) => ((temp - 32) * 5) / 9,
  kelvin: (temp) => temp - 273.15,
  reamur: (temp) => (temp * 5) / 4,
};

const fromCelsius = {
  celsius: (temp) => temp,
  fahrenheit: (temp) => (temp * 9) / 5 + 32,
  kelvin: (temp) => temp + 273.15,
  reamur: (temp) => (temp * 4) / 5,
};

// fungsi konversi suhu
const convertTemperatureBase = () => {
  const input = parseFloat(document.getElementById("temp-input").value);
  const fromUnit = document.getElementById("temp-from").value;
  const toUnit = document.getElementById("temp-to").value;

  // Convert to Celsius first, then to target unit
  const valueInCelsius = toCelsius[fromUnit](input);
  const result = fromCelsius[toUnit](valueInCelsius);

  document.getElementById("temp-result").value = formatResult(result);
};

// Apply validation wrapper
const convertTemperature = validateInput(convertTemperatureBase);

// ========== EVENT LISTENERS ==========

// Initialize all converters on page load
document.addEventListener("DOMContentLoaded", function () {
  // Add event listeners for length conversion
  document
    .getElementById("length-input")
    .addEventListener("input", convertLength);
  document
    .getElementById("length-from")
    .addEventListener("change", convertLength);
  document
    .getElementById("length-to")
    .addEventListener("change", convertLength);

  // Add event listeners for temperature conversion
  document
    .getElementById("temp-input")
    .addEventListener("input", convertTemperature);
  document
    .getElementById("temp-from")
    .addEventListener("change", convertTemperature);
  document
    .getElementById("temp-to")
    .addEventListener("change", convertTemperature);
});
