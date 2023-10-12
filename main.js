fetch('https://countriesnow.space/api/v0.1/countries/capital')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Parse the response as JSON
  })
  .then((data) => {
    // Use the data returned by the API
    // console.log(data.data);
    const dropdownCountries = document.getElementById('country');
    let countries = data.data;
    for (let i = 0; i < countries.length; i++) {
      const option = document.createElement('option');
      option.value = countries[i].name;
      option.text = countries[i].name;
      dropdownCountries.appendChild(option);
    }
  })
  .catch((error) => {
    console.error('There was a problem with the fetch operation:', error);
  });

function getStatesAndCitiesByCountry(countryParam) {
  getStatesByCountry();
  // getCitiesByCountry();
}

function getStatesByCountry(countryParam) {
  const dropdownStates = document.getElementById('state');
  fetch('https://countriesnow.space/api/v0.1/countries/states', {
    method: 'POST',
    body: JSON.stringify({
      country: countryParam,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) =>
      json.data.states.forEach((state) => {
        const option = document.createElement('option');
        option.value = state.name;
        option.text = state.name;
        dropdownStates.appendChild(option);
        console.log(state.name);
      })
    );
}

function getCitiesByCountry(countryParam) {
  const dropdownCities = document.getElementById('city');
  fetch('https://countriesnow.space/api/v0.1/countries/cities', {
    method: 'POST',
    body: JSON.stringify({
      country: countryParam,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) =>
      json.data.forEach((city) => {
        const option = document.createElement('option');
        option.value = city;
        option.text = city;
        dropdownCities.appendChild(option);
        console.log(city);
      })
    );
}

function verifyInput() {
  let isValid = true;

  const firstNameInput = document.getElementById('firstName');
  const lastNameInput = document.getElementById('lastName');
  const phoneInput = document.getElementById('phoneNumber');
  const emailInput = document.getElementById('email');
  const addressInput = document.getElementById('address');
  const countryInput = document.getElementById('country');
  const cityInput = document.getElementById('city');

  isValid = validateInput(firstNameInput, 'First name is required', isValid);
  isValid = validateInput(lastNameInput, 'Last name is required', isValid);
  isValid = validatePhoneNumber(phoneInput, isValid);
  isValid = validateInput(emailInput, 'Email is required', isValid);
  isValid = validateInput(addressInput, 'Address is required', isValid);
  isValid = validateInput(countryInput, 'Country is required', isValid);
  isValid = validateInput(cityInput, 'City is required', isValid);

  // if (!isValid) {
  //     alert(firstNameInput)
  // }
}

function validateInput(input, errorMessage, isValid) {
  if (input.value.trim() === '') {
    displayError(input, errorMessage);
    isValid = false;
  }
  return isValid;
}

function validatePhoneNumber(input, isValid) {
  // A simple regex pattern for a valid phone number format
  const phonePattern = /^\d{10}$/;

  if (!phonePattern.test(input.value)) {
    displayError(input, 'Wrong phone number format');
    isValid = false;
  }
  return isValid;
}

function displayError(input, message) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  const inputErrors = document.getElementById('inputErrors');
  inputErrors.appendChild(errorDiv);
}
