document.addEventListener('DOMContentLoaded', function() {
  // Функция для закрытия всех выпадающих списков
  function closeAllDropdowns(excludeElement = null) {
    // Закрываем городской список
    const cityList = document.querySelector('.city-list__select');
    const cityArrow = document.querySelector('.item-city__btn .arrow__btn--header');
    if (cityList && cityList !== excludeElement) {
      cityList.classList.remove('active');
      if (cityArrow) cityArrow.classList.remove('rotated');
    }
    
    // Закрываем навигационные списки
    document.querySelectorAll('.block-header__nav-list.active').forEach(list => {
      if (list !== excludeElement) {
        list.classList.remove('active');
        const btn = list.previousElementSibling;
        if (btn) {
          const arrow = btn.querySelector('.arrow__btn--header');
          if (arrow) arrow.classList.remove('rotated');
        }
      }
    });
  }

  // Обработчик для кнопки города (работает так же как nav-btn)
  const cityBtn = document.querySelector('.item-city__btn');
  if (cityBtn) {
    const cityList = document.querySelector('.city-list__select');
    const cityArrow = cityBtn.querySelector('.arrow__btn--header');
    
    cityBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      closeAllDropdowns(cityList);
      if (cityList) cityList.classList.toggle('active');
      if (cityArrow) cityArrow.classList.toggle('rotated');
    });
  }

  // Обработчики для навигационных кнопок
  const navButtons = document.querySelectorAll('.nav-btn');
  navButtons.forEach(button => {
    const arrow = button.querySelector('.arrow__btn--header');
    const navList = button.nextElementSibling;
    
    button.addEventListener('click', function(e) {
      e.stopPropagation();
      closeAllDropdowns(navList);
      navList.classList.toggle('active');
      if (arrow) arrow.classList.toggle('rotated');
    });
  });
  
  // Закрытие всех списков при клике вне их области
  document.addEventListener('click', function() {
    closeAllDropdowns();
  });
  
  // Предотвращаем закрытие при клике внутри списка
  document.querySelectorAll('.city-list__select, .block-header__nav-list').forEach(list => {
    list.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  });
});