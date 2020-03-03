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

  var isNameExist = function () {
    return nameInput.value === 'ivanov';
  };

  var checkValues = function () {
    if (nameInput.value.length > 0 && passwordInput.value.length > 0) {
      if (submitButton.hasAttribute('disabled')) {
        submitButton.removeAttribute('disabled');
      }
    }
  }

  var onSubmit = function (evt) {
    evt.preventDefault();

    if (nameInput.value === '' || passwordInput.value === '') {
      if (!submitButton.hasAttribute('disabled')) {
        submitButton.setAttribute('disabled', '');
      }
    }

    if (nameInput.value === '') {
      nameInput.classList.add('js--wrong-input');
      nameLabel.classList.add('js--wrong');
      nameMessage.textContent = ERROR_MESSAGE.empty;
    } else if (!isNameExist()) {
      nameInput.classList.add('js--wrong-input');
      nameLabel.classList.add('js--wrong');
      nameMessage.textContent = ERROR_MESSAGE.notFound;
    }

    if (passwordInput.value === '') {
      passwordInput.classList.add('js--wrong-input');
      passwordLabel.classList.add('js--wrong');
      passwordMessage.textContent = ERROR_MESSAGE.empty;
    }

    if (
      nameInput.value.length > 0
      && isNameExist()
      && passwordInput.value.length > 0
    ) {

      form.submit();
    }
  }

  var onNameInput = function () {
    checkValues();

    if (nameInput.classList.contains('js--wrong-input')) {
      nameInput.classList.remove('js--wrong-input');
    }

    if (nameLabel.classList.contains('js--wrong')) {
      nameLabel.classList.remove('js--wrong');
    }

    nameMessage.textContent = '';
  };

  var onPasswordInput = function () {
    checkValues();

    if (passwordInput.classList.contains('js--wrong-input')) {
      passwordInput.classList.remove('js--wrong-input');
    }

    if (passwordLabel.classList.contains('js--wrong')) {
      passwordLabel.classList.remove('js--wrong');
    }

    passwordMessage.textContent = '';
  };

  submitButton.addEventListener('click', onSubmit);
  nameInput.addEventListener('input', onNameInput);
  passwordInput.addEventListener('input', onPasswordInput);
})();
