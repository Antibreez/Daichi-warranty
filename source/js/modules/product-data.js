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
  });

  calendarInput.addEventListener('input', onCalendarInput);
  productDataForm.addEventListener('submit', onSubmit);
}());
