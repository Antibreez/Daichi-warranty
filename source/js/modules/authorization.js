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
