(function () {
  var productRegistration = document.querySelector('.product-registration');
  var registrationItem = document.querySelectorAll('.product-registration__navigation-item');

  var form = document.querySelector('.personal-data__form');
  var surnameInput = document.querySelector(".personal-data input[name='surname']");
  var nameInput = document.querySelector(".personal-data input[name='name']");
  var patronymicInput = document.querySelector(".personal-data input[name='patronymic']");
  var cityInput = document.querySelector(".personal-data input[name='city']");
  var emailInput = document.querySelector(".personal-data input[name='email']");
  var checkbox = document.querySelector(".personal-data input[type='checkbox']");
  var checkboxLabel = document.querySelector('.personal-data__agreement-wrapper label');
  var agreement = document.querySelector(".personal-data__text-wrapper");
  var submitButton = document.querySelector('.personal-data__button');

  if (!surnameInput) {
    return;
  }

  var checkValidity = function () {
    if (
      surnameInput.validity.valid
      && nameInput.validity.valid
      && patronymicInput.validity.valid
      && cityInput.validity.valid
      && emailInput.validity.valid
      && checkbox.checked
    ) {
      submitButton.removeAttribute('disabled');
    } else {
      submitButton.setAttribute('disabled', '');
    }
  };

  var onInput = function (evt) {
    checkValidity();

    var item = evt.target;
    var label = item.parentNode.querySelector('p');

    if (!item.validity.valid) {
      if (!label.classList.contains('js--error')) {
        label.classList.add('js--error');
      }

      if (!item.classList.contains('js--wrong-input')) {
        item.classList.add('js--wrong-input');
      }
    }

    if (item.validity.valid) {
      if (label.classList.contains('js--error')) {
        label.classList.remove('js--error');
      }

      if (item.classList.contains('js--wrong-input')) {
        item.classList.remove('js--wrong-input');
      }
    }
  }

  var onCheckboxClick = function () {
    checkValidity();

    if (!checkbox.checked) {
      if (!checkboxLabel.classList.contains('js--wrong-input')) {
        checkboxLabel.classList.add('js--wrong-input');
      }

      if (!agreement.classList.contains('js--error')) {
        agreement.classList.add('js--error');
      }
    }

    if (checkbox.checked) {
      if (checkboxLabel.classList.contains('js--wrong-input')) {
        checkboxLabel.classList.remove('js--wrong-input');
      }

      if (agreement.classList.contains('js--error')) {
        agreement.classList.remove('js--error');
      }
    }
  }

  var onFormSubmit = function (evt) {
    evt.preventDefault();

    productRegistration.classList.remove('js--personal-data');
    productRegistration.classList.add('js--registration-end');

    registrationItem[1].classList.add('js--checked');
    registrationItem[2].classList.add('js--active');
  };

  surnameInput.addEventListener('input', onInput);
  nameInput.addEventListener('input', onInput);
  patronymicInput.addEventListener('input', onInput);
  cityInput.addEventListener('input', onInput);
  emailInput.addEventListener('input', onInput);
  checkbox.addEventListener('change', onCheckboxClick);

  form.addEventListener('submit', onFormSubmit);
})();
