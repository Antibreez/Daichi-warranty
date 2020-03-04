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
