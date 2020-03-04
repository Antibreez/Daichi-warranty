(function () {
  var form = document.querySelector('.authorization__form');
  var nameInput = document.querySelector("input[name='name']");
  var nameLabel = document.querySelector("label[for='name']");
  var nameMessage = document.querySelector('.authorization__name-error');
  var passwordInput = document.querySelector("input[name='password']");
  var passwordLabel = document.querySelector("label[for='password']");
  var passwordMessage = document.querySelector('.authorization__password-error');
  var submitButton = document.querySelector('.authorization__button');

  if (!nameInput || !passwordInput || !submitButton) {
    return;
  }

  var ERROR_MESSAGE = {
    empty: 'Обязательное поле',
    notFound: 'Пользователь с такой электронной почтой не зарегистрирован в системе.'
  };

  var isNameInputBecameEmpty = false;
  var isPasswordInputBecameEmpty = false;

  var isNameExist = function () {
    return nameInput.value === 'ivanov';
  };

  var checkValues = function () {
    if (nameInput.value.length > 0 && passwordInput.value.length > 0) {
      if (submitButton.hasAttribute('disabled')) {
        submitButton.removeAttribute('disabled');
      }
    }

    if (nameInput.value.length === 0 || passwordInput.value.length === 0) {
      if (!submitButton.hasAttribute('disabled')) {
        submitButton.setAttribute('disabled', '');
      }
    }
  }

  var onEmptyName = function () {
    isNameInputBecameEmpty = true;

    if (!nameInput.classList.contains('js--wrong-input')) {
      nameInput.classList.add('js--wrong-input');
    }

    if (!nameLabel.classList.contains('js--wrong')) {
      nameLabel.classList.add('js--wrong');
    }

    nameMessage.textContent = ERROR_MESSAGE.empty;
  }

  var onEmptyPassword = function () {
    isPasswordInputBecameEmpty = true;

    if (!passwordInput.classList.contains('js--wrong-input')) {
      passwordInput.classList.add('js--wrong-input');
    }

    if (!passwordLabel.classList.contains('js--wrong')) {
      passwordLabel.classList.add('js--wrong');
    }

    passwordMessage.textContent = ERROR_MESSAGE.empty;
  }

  var onSubmit = function (evt) {
    evt.preventDefault();

    if (nameInput.value === '' && passwordInput.value === '') {
      onEmptyName();
      onEmptyPassword();
      checkValues();
      return;
    }

    if (!isNameExist()) {
      nameInput.classList.add('js--wrong-input');
      nameLabel.classList.add('js--wrong');
      nameMessage.textContent = ERROR_MESSAGE.notFound;
    } else {
      form.submit();
    }
  }

  var onNameInput = function () {
    checkValues();

    if (nameInput.value === '') {
      onEmptyName();
    }

    if (nameInput.value.length > 0 && isNameInputBecameEmpty) {
      isNameInputBecameEmpty = false;

      if (nameInput.classList.contains('js--wrong-input')) {
        nameInput.classList.remove('js--wrong-input');
      }

      if (nameLabel.classList.contains('js--wrong')) {
        nameLabel.classList.remove('js--wrong');
      }

      nameMessage.textContent = '';
    }
  };

  var onPasswordInput = function () {
    checkValues();

    if (passwordInput.value === '') {
      onEmptyPassword();
    }

    if (passwordInput.value.length > 0 && isPasswordInputBecameEmpty) {
      isPasswordInputBecameEmpty = false;

      if (passwordInput.classList.contains('js--wrong-input')) {
        passwordInput.classList.remove('js--wrong-input');
      }

      if (passwordLabel.classList.contains('js--wrong')) {
        passwordLabel.classList.remove('js--wrong');
      }

      passwordMessage.textContent = '';
    }
  };

  submitButton.addEventListener('click', onSubmit);
  nameInput.addEventListener('input', onNameInput);
  passwordInput.addEventListener('input', onPasswordInput);
})();

(function () {
  var oldProductsButton = document.querySelector('.not-used-products__button');
  var oldProductsShow = document.querySelector('.not-used-products__show');
  var oldProductsHide = document.querySelector('.not-used-products__hide');
  var oldProducts = document.querySelector('.not-used-products__content');
  var dropdown = document.querySelector('.account-header__dropdown');
  var navigation = document.querySelector('.account-header__nav');
  var closeNavButton = document.querySelector('.account-header__nav-button');

  if (!oldProductsButton) {
    return;
  }

  var oldProductsButtonToggle = function (item) {
    item.classList.toggle('js--shown');
    item.classList.toggle('js--hidden');
  };

  var onOldProductsButtonClick = function () {
    oldProductsButtonToggle(oldProductsShow);
    oldProductsButtonToggle(oldProductsHide);
    oldProducts.classList.toggle('js--show');
  };

  var onDropdownClick = function () {
    if (!navigation.classList.contains('js--show')) {
      navigation.classList.add('js--show');
    }
  }

  var onNavCloseClick = function () {
    if (navigation.classList.contains('js--show')) {
      navigation.classList.remove('js--show');
    }
  }

  oldProductsButton.addEventListener('click', onOldProductsButtonClick);
  dropdown.addEventListener('click', onDropdownClick);
  closeNavButton.addEventListener('click', onNavCloseClick);
})();

(function () {
  var productRegistration = document.querySelector('.product-registration');
  var registrationItem = document.querySelectorAll('.product-registration__navigation-item');

  var contacts = document.querySelector('.contacts');
  var contactsPhone = document.querySelector('.contacts__phone-number');
  var contactsCode = document.querySelector('.contacts__code');
  var phoneInput = document.querySelector("input[name='phone-number']");
  var codeInput = document.querySelector("input[name='phone-code']")
  var phoneButton = document.querySelector('.contacts__phone-form button');
  var codeButton = document.querySelector('.contacts__code-form button')
  var phoneForm = document.querySelector('.contacts__phone-form');
  var codeForm = document.querySelector('.contacts__code-form');
  var productChangeButton = document.querySelector('.contacts__product-card .product-card__change');
  var selectedPhone = document.querySelector('.contacts__selected-phone');
  var codeError = document.querySelector('.contacts__code-error-message');
  var codeLabel = document.querySelector('.contacts__code-form label');
  var phoneChangeButton = document.querySelector('.contacts__selected-phone-change');

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

  var onProductChangeClick = function () {
    productRegistration.classList.remove('js--contacts');
    productRegistration.classList.add('js--product-data');

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

    codeInput.focus();
  };

  var onPhoneChangeClick = function () {
    hide(contactsCode);
    show(contactsPhone);

    phoneInput.focus();
  }

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
      if (productRegistration.classList.contains('product-registration--account')) {
        productRegistration.classList.add('js--registration-end');
        productRegistration.classList.remove('js--contacts');

        registrationItem[0].classList.add('js--checked');
         registrationItem[1].classList.add('js--active');
      } else {
        productRegistration.classList.add('js--personal-data');
        productRegistration.classList.remove('js--contacts');
      }
    }
  };

  phoneInput.addEventListener('input', onPhoneInput);
  productChangeButton.addEventListener('click', onProductChangeClick);
  phoneForm.addEventListener('submit', onPhoneSubmit);
  codeInput.addEventListener('input', onCodeInput);
  codeForm.addEventListener('submit', onCodeSubmit);
  phoneChangeButton.addEventListener('click', onPhoneChangeClick);
})();

(function () {
  var body = document.querySelector('body');
  var phoneInput = document.querySelector("input[name='phone-number']");

  var productRegistration = document.querySelector('.product-registration');
  var registrationItem = document.querySelectorAll('.product-registration__navigation-item');

  var productData = document.querySelector('.product-data');
  var productDataForm = document.querySelector('.product-data form');
  var warrantyCodeButton = document.querySelector("label[for='serial-number-1'] button");
  var popup = document.querySelector('.popup-warranty');
  var popupClose = document.querySelector('.popup-warranty__close');
  var popupOverlay = document.querySelector('.popup-warranty__overlay');

  var calendarInput = document.querySelector('.product-data__purchase-date');
  var calendarButton = document.querySelector('.product-data__calendar');

  var serialNumberInput = document.querySelectorAll('.product-data__serial-number');
  var dataSubmit = document.querySelector('.product-data__submit');

  if(!warrantyCodeButton) {
    return;
  }

  var isSerialNumberValid = function (target) {
    return (/^[A-Za-z0-9]{6}/).test(target.value);
  };

  var isCalendarValid = function () {
    return (/^[0-9.]+$/).test(calendarInput.value);
  };

  var checkValidity = function () {
    if(
      isSerialNumberValid(serialNumberInput[0])
      && isSerialNumberValid(serialNumberInput[1])
      && isSerialNumberValid(serialNumberInput[2])
      && isCalendarValid()
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

    target.setCustomValidity('');

    if(!isSerialNumberValid(target) && target.value.length === 6) {
      target.setCustomValidity('Разрешены только латинские буквы и цыфры');
      target.reportValidity();
    }

    if (isSerialNumberValid(target) && target.value.length === 6) {
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

  // var onInputBlur = function (evt) {
  //   var target = evt.target;

  //   if (target.value.length < 6) {
  //     target.setCustomValidity('Введите 6 символов');
  //     target.reportValidity();
  //   }
  // }

  var onCalendarInput = function () {
    checkValidity();
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
    productRegistration.classList.add('js--contacts');
    productRegistration.classList.remove('js--product-data');

    if (!productRegistration.classList.contains('product-registration--account')) {
      registrationItem[0].classList.add('js--checked');
      registrationItem[1].classList.add('js--active');
    }

    phoneInput.focus();
  };

  warrantyCodeButton.addEventListener('click', onWarrantyCodeButtonClick);
  popupClose.addEventListener('click', onPopupCloseClick);
  popupOverlay.addEventListener('click', onPopupOverlayClick);

  serialNumberInput.forEach(function (el) {
    el.addEventListener('input', onSerialNumberInput);
    //el.addEventListener('blur', onInputBlur);
  });

  calendarInput.addEventListener('input', onCalendarInput);
  productDataForm.addEventListener('submit', onSubmit);
}());

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
