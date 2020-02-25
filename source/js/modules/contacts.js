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
