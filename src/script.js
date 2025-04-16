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

// konversi berat
const toKgFactors = {
  g: 0.001,
  kg: 1,
  lb: 0.453592,
  oz: 0.0283495,
  t : 1000,
};
const fromKgFactors = {
  g: 1000,
  kg: 1,
  lb: 2.20462,
  oz: 35.274,
  t : 0.001,
};

function convertWeight() {
  const input = document.getElementById("weight-input").value;
  const fromUnit = document.getElementById("weight-from").value;
  const toUnit = document.getElementById("weight-to").value;
  const resultElement = document.getElementById("weight-result");

  // Validasi input
  if (!input || isNaN(input)) {
    resultElement.value = "";
    return;
  }

  // Konversi ke kg terlebih dahulu
  const valueInKg = parseFloat(input) * toKgFactors[fromUnit];
  // Kemudian konversi ke unit tujuan
  const result = valueInKg * fromKgFactors[toUnit];

  // Tampilkan hasil dengan 2 angka desimal
  resultElement.value = result.toFixed(2);
}


// ========== SHARED UTILITY FUNCTIONS ==========

// High order function for input validation
const validateInput = (conversionFn) => {
    return function() {
      const inputId = this.id.split('-')[0] + '-input';
      const input = document.getElementById(inputId).value;
      
      // Basic validation
      if (input === '') {
        document.getElementById(this.id.split('-')[0] + '-result').value = '';
        return;
      }
      
      const numValue = parseFloat(input);
      if (isNaN(numValue)) {
        document.getElementById(this.id.split('-')[0] + '-result').value = 'Invalid input';
        return;
      }
      
      // Call the original conversion function
      conversionFn();
    };
  };
  
  // Function to format result with appropriate decimal places
  const formatResult = (value, decimalPlaces = 2) => {
    return Number.isInteger(value) ? value.toString() : value.toFixed(decimalPlaces);
  };
  
  // ========== LENGTH CONVERSION ==========
  
  // Conversion factors to meters (base unit for length)
  const toMeterFactors = {
    km: 1000,     // 1 kilometer = 1000 meters
    m: 1,         // 1 meter = 1 meter
    cm: 0.01,     // 1 centimeter = 0.01 meters
    mm: 0.001,    // 1 millimeter = 0.001 meters
    mi: 1609.34,  // 1 mile = 1609.34 meters
    yd: 0.9144,   // 1 yard = 0.9144 meters
    ft: 0.3048,   // 1 foot = 0.3048 meters
    in: 0.0254    // 1 inch = 0.0254 meters
  };
  
  // Conversion factors from meters (base unit for length)
  const fromMeterFactors = {
    km: 0.001,    // 1 meter = 0.001 kilometers
    m: 1,         // 1 meter = 1 meter
    cm: 100,      // 1 meter = 100 centimeters
    mm: 1000,     // 1 meter = 1000 millimeters
    mi: 0.000621371, // 1 meter = 0.000621371 miles
    yd: 1.09361,  // 1 meter = 1.09361 yards
    ft: 3.28084,  // 1 meter = 3.28084 feet
    in: 39.3701   // 1 meter = 39.3701 inches
  };
  
  // Base conversion function for length
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
  
  // Temperature conversions are special because they're not just multiplication factors
  // We need to define functions to convert to and from Celsius (our base unit)
  
  const toCelsius = {
    celsius: (temp) => temp,
    fahrenheit: (temp) => (temp - 32) * 5/9,
    kelvin: (temp) => temp - 273.15,
    reamur: (temp) => temp * 5/4
  };
  
  const fromCelsius = {
    celsius: (temp) => temp,
    fahrenheit: (temp) => temp * 9/5 + 32,
    kelvin: (temp) => temp + 273.15,
    reamur: (temp) => temp * 4/5
  };
  
  // Base conversion function for temperature
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
  document.addEventListener("DOMContentLoaded", function() {
    // Add event listeners for length conversion
    document.getElementById("length-input").addEventListener("input", convertLength);
    document.getElementById("length-from").addEventListener("change", convertLength);
    document.getElementById("length-to").addEventListener("change", convertLength);
    
    // Add event listeners for temperature conversion
    document.getElementById("temp-input").addEventListener("input", convertTemperature);
    document.getElementById("temp-from").addEventListener("change", convertTemperature);
    document.getElementById("temp-to").addEventListener("change", convertTemperature);
  });

//     // Konversi ke Celsius
//     const toCelsius = (value, unit) => {
//         switch(unit) {
//             case 'celsius': return value;
//             case 'reamur': return value * 5/4;
//             case 'kelvin': return value - 273.15;
//             case 'fahrenheit': return (value - 32) * 5/9;
//             default: throw new Error('Satuan tidak valid');
//         }
//     };

//     // Konversi dari Celsius
//     const fromCelsius = (celsius, unit) => {
//         const converters = {
//             celsius: c => c,
//             reamur: c => c * 4/5,
//             kelvin: c => c + 273.15,
//             fahrenheit: c => c * 9/5 + 32
//         };
//         return convertTemperature(converters[unit])(celsius);
//     };

//     // Update output
//     const updateOutputs = (celsius, currentUnit) => {
//         ['celsius', 'reamur', 'kelvin', 'fahrenheit'].forEach(unit => {
//             if(unit !== currentUnit) {
//                 document.getElementById(unit).value = fromCelsius(celsius, unit).toFixed(2);
//             }
//         });
//     };

//     // Event handler
//     const handleConversion = (e) => {
//         const currentUnit = e.target.id;
//         const value = parseFloat(e.target.value);
//         const errorElement = document.getElementById('error');

//         try {
//             if(!isValidInput(value)) throw new Error('Masukkan angka yang valid');

//             const celsius = toCelsius(value, currentUnit);
//             updateOutputs(celsius, currentUnit);
//             errorElement.classList.add('hidden');
//         } catch(err) {
//             document.querySelectorAll('input').forEach(input => input.value = '');
//             errorElement.textContent = err.message;
//             errorElement.classList.remove('hidden');
//             setTimeout(() => errorElement.classList.add('hidden'), 2000);
//         }
//     };

//     // Inisialisasi event listeners
//     document.querySelectorAll('input').forEach(input => {
//         input.addEventListener('input', handleConversion);
//     });
// });
