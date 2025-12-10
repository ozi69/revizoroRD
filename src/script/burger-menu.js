document.addEventListener('DOMContentLoaded', function() {
  const burgerMenu = document.querySelector('.burger-menu');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeIcon = document.querySelector('.close-icon');
  const body = document.body;

  let scrollPosition = 0; // Для сохранения позиции прокрутки

  // Функция блокировки прокрутки
  function disableScroll() {
    scrollPosition = window.scrollY; // Сохраняем текущую позицию
    body.style.position = 'fixed';
    body.style.top = `-${scrollPosition}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.overflow = 'hidden';
  }

  // Функция разблокировки прокрутки
  function enableScroll() {
    body.style.position = '';
    body.style.top = '';
    body.style.left = '';
    body.style.right = '';
    body.style.overflow = '';
    window.scrollTo(0, scrollPosition); // Возвращаемся к сохраненной позиции
  }

  // Открытие меню
  burgerMenu.addEventListener('click', function() {
    mobileMenu.classList.add('active');
    disableScroll();
  });

  // Закрытие меню
  closeIcon.addEventListener('click', function() {
    mobileMenu.classList.remove('active');
    enableScroll();
  });

  // Работа dropdown внутри меню
  const buttons = document.querySelectorAll('.burger-menu__nav-list__btn');
  
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      const parentItem = this.closest('.burger__nav-list__item');
      
      // Закрываем все открытые dropdown
      document.querySelectorAll('.burger__nav-list__item').forEach(item => {
        if (item !== parentItem) {
          item.classList.remove('active');
        }
      });
      
      // Переключаем текущий
      parentItem.classList.toggle('active');
    });
  });
});
