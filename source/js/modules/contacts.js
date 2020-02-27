(function () {
  var deviceRegistration = document.querySelector('.device-registration');
  var registrationItem = document.querySelectorAll('.device-registration__navigation-item');

  var contacts = document.querySelector('.contacts');
  var contactsPhone = document.querySelector('.contacts__phone-number');
  var contactsCode = document.querySelector('.contacts__code');
  var phoneInput = document.querySelector("input[name='phone-number']");
  var codeInput = document.querySelector("input[name='phone-code']")
  var phoneButton = document.querySelector('.contacts__phone-form button');
  var codeButton = document.querySelector('.contacts__code-form button')
  var phoneForm = document.querySelector('.contacts__phone-form');
  var codeForm = document.querySelector('.contacts__code-form');
  var changeButton = document.querySelector('.contacts__product-card .product-card__change');
  var selectedPhone = document.querySelector('.contacts__selected-phone');
  var codeError = document.querySelector('.contacts__code-error-message');
  var codeLabel = document.querySelector('.contacts__code-form label');

  var CORRECT_CODE = '0000000';
  var ERROR_MESSAGES = {
    first: 'Указан неверный код, осталось попыток: 1',
    second: 'Вы превысили количество попыток, следующий запрос кода возможен через 10 минут'
  };

  var attempts = 0;

  if (!phoneInput) {
    return;
  }

  var imPhone = new Inputmask('+7(999)999-99-99');
  imPhone.mask(phoneInput);

  var imCode = new Inputmask('9999999', { placeholder: '' });
  imCode.mask(codeInput);

  var show = function (item) {
    if (item.classList.contains('hidden')) {
      item.classList.remove('hidden');
    }
  };

  var hide = function (item) {
    if (!item.classList.contains('hidden')) {
      item.classList.add('hidden');
    }
  };

  var clearError = function () {
    codeError.textContent = '';

    if (codeLabel.classList.contains('js--error')) {
      codeLabel.classList.remove('js--error');
    }

    if (codeInput.classList.contains('js--wrong-input')) {
      codeInput.classList.remove('js--wrong-input');
    }
  };

  var onPhoneInput = function () {
    var str = phoneInput.value;
    if (str.length === 16 && str.indexOf('_') === -1) {
      phoneButton.removeAttribute('disabled');
    } else {
      phoneButton.setAttribute('disabled', '');
    }
  };

  var onChangeButtonClick = function () {
    deviceRegistration.classList.remove('js--contacts');
    deviceRegistration.classList.add('js--device-data');

    registrationItem[0].classList.remove('js--checked');
    registrationItem[1].classList.remove('js--active');

    show(contactsPhone);
    hide(contactsCode);
  };

  var onPhoneSubmit = function (evt) {
    evt.preventDefault();
    selectedPhone.textContent = phoneInput.value;
    hide(contactsPhone);
    show(contactsCode);
  };

  var onCodeInput = function () {
    clearError();
    if (codeInput.value.length === 7) {
      codeButton.removeAttribute('disabled');
    } else {
      codeButton.setAttribute('disabled', '');
    }
  }

  var onCodeSubmit = function (evt) {
    evt.preventDefault();
    if (codeInput.value !== CORRECT_CODE) {
      if (!codeLabel.classList.contains('js--error')) {
        codeLabel.classList.add('js--error');
      }

      if (!codeInput.classList.contains('js--wrong-input')) {
        codeInput.classList.add('js--wrong-input');
      }

      if (attempts === 0) {
        codeError.textContent = ERROR_MESSAGES.first;
      }

      if (attempts > 0) {
        codeError.textContent = ERROR_MESSAGES.second;
        codeButton.setAttribute('disabled', '');
      }

      attempts++;
    } else {
      deviceRegistration.classList.add('js--personal-data');
      deviceRegistration.classList.remove('js--contacts');
    }
  };

  phoneInput.addEventListener('input', onPhoneInput);
  changeButton.addEventListener('click', onChangeButtonClick);
  phoneForm.addEventListener('submit', onPhoneSubmit);
  codeInput.addEventListener('input', onCodeInput);
  codeForm.addEventListener('submit', onCodeSubmit);
})();
