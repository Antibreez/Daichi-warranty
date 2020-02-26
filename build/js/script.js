(function () {
  var nameInput = document.querySelector("input[name='name']");
  var passwordInput = document.querySelector("input[name='password']");
  var submitButton = document.querySelector('.authorization__button');

  if (!nameInput || !passwordInput || !submitButton) {
    return;
  }

  var onSubmitButtonClick = function () {
    if (nameInput.value === '') {
      nameInput.classList.add('js--wrong-input');
    }

    if (passwordInput.value === '') {
      passwordInput.classList.add('js--wrong-input');
    }
  }

  var onInput = function (evt) {
    var target = evt.target;
    if (target.classList.contains('js--wrong-input')) {
      target.classList.remove('js--wrong-input');
    }
  }

  submitButton.addEventListener('click', onSubmitButtonClick);
  nameInput.addEventListener('input', onInput);
  passwordInput.addEventListener('input', onInput);
})();

(function () {
  var oldProductsButton = document.querySelector('.not-used-products__button');
  var oldProductsShow = document.querySelector('.not-used-products__show');
  var oldProductsHide = document.querySelector('.not-used-products__hide');
  var oldProducts = document.querySelector('.not-used-products__content');

  if (!oldProductsButton) {
    return;
  }

  var oldProductsButtonToggle = function (item) {
    item.classList.toggle('shown');
    item.classList.toggle('hidden');
  };

  var onOldProductsButtonClick = function () {
    oldProductsButtonToggle(oldProductsShow);
    oldProductsButtonToggle(oldProductsHide);
    oldProducts.classList.toggle('show');
  };

  oldProductsButton.addEventListener('click', onOldProductsButtonClick);
})();

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
    }
  };

  phoneInput.addEventListener('input', onPhoneInput);
  changeButton.addEventListener('click', onChangeButtonClick);
  phoneForm.addEventListener('submit', onPhoneSubmit);
  codeInput.addEventListener('input', onCodeInput);
  codeForm.addEventListener('submit', onCodeSubmit);
})();

(function () {
  var body = document.querySelector('body');

  var deviceRegistration = document.querySelector('.device-registration');
  var registrationItem = document.querySelectorAll('.device-registration__navigation-item');

  var deviceData = document.querySelector('.device-data');
  var deviceDataForm = document.querySelector('.device-data form');
  var warrantyCodeButton = document.querySelector("label[for='serial-number-1'] button");
  var popup = document.querySelector('.popup-warranty');
  var popupClose = document.querySelector('.popup-warranty__close');
  var popupOverlay = document.querySelector('.popup-warranty__overlay');

  var calendarInput = document.querySelector('.device-data__purchase-date');
  var calendarButton = document.querySelector('.device-data__calendar');

  var serialNumberInput = document.querySelectorAll('.device-data__serial-number');
  var dataSubmit = document.querySelector('.device-data__submit');

  if(!warrantyCodeButton) {
    return;
  }

  var checkValidity = function () {
    if(
      serialNumberInput[0].value.length === 6
      && serialNumberInput[1].value.length === 6
      && serialNumberInput[2].value.length === 6
      && (/^[0-9.]+$/).test(calendarInput.value)
    ) {
      dataSubmit.removeAttribute('disabled');
    } else {
      dataSubmit.setAttribute('disabled', '');
    }
  };

  var getCorrectNumber = function (num) {
    return Math.floor(num / 10) > 0 ? num : '0' + num;
  };

  var getDate = function (date) {
    var date = new Date(date);

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    return getCorrectNumber(day) + '.' + getCorrectNumber(month) + '.' + year;
  };

  var picker = new Pikaday({
    field: calendarButton,
    firstDay: 1,
    onSelect: function() {
      var date = new Date(picker);
      calendarInput.value = getDate(date);
      checkValidity();
    }
  });

  var im = new Inputmask('99.99.9999', { 'placeholder': 'ДД.ММ.ГГГГ'});
  im.mask(calendarInput);

  var onSerialNumberInput = function (evt) {
    var target = evt.target;

    if (target.value.length === 6) {
      if (target.classList.contains('js--wrong-input')) {
        target.classList.remove('js--wrong-input');
      }

      if (target.id === 'serial-number-1' || target.id === 'serial-number-2') {
        target.nextSibling.nextSibling.focus();
      }

      if (target.id === 'serial-number-3') {
        calendarInput.focus();
      }
    } else {
      target.classList.add('js--wrong-input');
    }

    checkValidity();
  };

  var onCalendarInput = function () {
    checkValidity();
    console.log(calendarInput.value.length);

  };

  var openPopup = function () {
    popup.classList.remove('hidden');
    body.classList.add('popup');
  };

  var closePopup = function () {
    popup.classList.add('hidden');
    body.classList.remove('popup');
  }

  var onWarrantyCodeButtonClick = function () {
    openPopup();
  };

  var onPopupCloseClick = function () {
    closePopup();
  };

  var onPopupOverlayClick = function () {
    closePopup();
  };

  var onSubmit = function (evt) {
    evt.preventDefault();
    deviceRegistration.classList.add('js--contacts');
    deviceRegistration.classList.remove('js--device-data');

    registrationItem[0].classList.add('js--checked');
    registrationItem[1].classList.add('js--active');
  };

  warrantyCodeButton.addEventListener('click', onWarrantyCodeButtonClick);
  popupClose.addEventListener('click', onPopupCloseClick);
  popupOverlay.addEventListener('click', onPopupOverlayClick);

  serialNumberInput.forEach(function (el) {
    el.addEventListener('input', onSerialNumberInput);
  });

  calendarInput.addEventListener('input', onCalendarInput);
  deviceDataForm.addEventListener('submit', onSubmit);
}());
