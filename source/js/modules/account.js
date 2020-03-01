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
