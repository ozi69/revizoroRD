document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.container__content-carusel');
  const wrappers = document.querySelectorAll('.container-wrapper');
  const prevBtn = document.querySelector('.arrow-left_pag');
  const nextBtn = document.querySelector('.arrow-right_pag');
  const counter = document.querySelector('.counter_pag');
  
  let currentPage = 1;
  const totalPages = wrappers.length;
  
  // Показываем только первый wrapper, остальные скрываем
  wrappers.forEach((wrapper, index) => {
    wrapper.style.display = index === 0 ? 'flex' : 'none';
  });
  
  // Функция обновления отображения
  function updateDisplay() {
    wrappers.forEach((wrapper, index) => {
      wrapper.style.display = index === currentPage - 1 ? 'flex' : 'none';
    });
    counter.textContent = currentPage;
    
    // Обновляем состояние кнопок
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
    
    // Добавляем/удаляем классы для стилизации disabled кнопок
    if (currentPage === 1) {
      prevBtn.classList.add('disabled');
    } else {
      prevBtn.classList.remove('disabled');
    }
    
    if (currentPage === totalPages) {
      nextBtn.classList.add('disabled');
    } else {
      nextBtn.classList.remove('disabled');
    }
  }
  
  // Обработчики для кнопок
  prevBtn.addEventListener('click', function() {
    if (currentPage > 1) {
      currentPage--;
      updateDisplay();
    }
  });
  
  nextBtn.addEventListener('click', function() {
    if (currentPage < totalPages) {
      currentPage++;
      updateDisplay();
    }
  });
  
  // Инициализация
  updateDisplay();
});