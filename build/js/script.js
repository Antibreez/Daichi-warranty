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
  var body = document.querySelector('body');
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
      && (calendarInput.value.length === 10 && calendarInput.value[9] !== 'Г')
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

  warrantyCodeButton.addEventListener('click', onWarrantyCodeButtonClick);
  popupClose.addEventListener('click', onPopupCloseClick);
  popupOverlay.addEventListener('click', onPopupOverlayClick);

  serialNumberInput.forEach(function (el) {
    el.addEventListener('input', onSerialNumberInput);
  });

  calendarInput.addEventListener('input', onCalendarInput);
}());

(function () {
  var phoneInput = document.querySelector('.contacts input');
  var button = document.querySelector('.contacts__button');

  if (!phoneInput) {
    return;
  }

  var im = new Inputmask('+7(999)999-99-99');
  im.mask(phoneInput);

  var onInput = function () {
    var str = phoneInput.value;
    if (str.length === 16 && str.indexOf('_') === -1) {
      button.removeAttribute('disabled');
    } else {
      button.setAttribute('disabled', '');
    }
  };

  phoneInput.addEventListener('input', onInput);
})();
