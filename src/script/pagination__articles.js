document.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('.twenty__four-container');
  const articleBlocks = document.querySelectorAll('.twenty__four-container__articles');
  const prevBtn = document.querySelector('.arrow-left_pag');
  const nextBtn = document.querySelector('.arrow-right_pag');
  const counter = document.querySelector('.counter_pag');
  const loadMoreBtn = document.querySelector('.btn-twenty__four');
  
  let currentPage = 1;
  const totalPages = articleBlocks.length;
  
  // Проверяем ширину экрана
  function checkScreenWidth() {
    return window.innerWidth <= 767;
  }
  
  // Инициализация
  function init() {
    if (checkScreenWidth()) {
      // Мобильный вид - показываем только первый блок и кнопку "показать еще"
      articleBlocks.forEach((block, index) => {
        block.style.display = index === 0 ? 'flex' : 'none';
      });
      loadMoreBtn.style.display = 'flex';
      loadMoreBtn.style.opacity = '1';
      loadMoreBtn.disabled = false;
      document.querySelector('.block-pagination').style.display = 'none';
      
      // Проверяем, нужно ли сразу деактивировать кнопку
      if (articleBlocks.length <= 1) {
        loadMoreBtn.style.opacity = '0.5';
        loadMoreBtn.disabled = true;
      }
    } else {
      // Десктопный вид - используем пагинацию
      updateVisibility();
      loadMoreBtn.style.display = 'none';
      document.querySelector('.block-pagination').style.display = 'flex';
    }
  }
  
  // Функция обновления видимости блоков для пагинации
  function updateVisibility() {
    articleBlocks.forEach((block, index) => {
      block.style.display = (index + 1 === currentPage) ? 'flex' : 'none';
    });
    counter.textContent = currentPage;
    
    // Обновляем состояние кнопок
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
  }
  
  // Функция для показа следующего блока (мобильный вид)
  function showNextBlock() {
    const visibleBlocks = document.querySelectorAll('.twenty__four-container__articles[style="display: flex;"]');
    const nextIndex = visibleBlocks.length;
    
    if (nextIndex < articleBlocks.length) {
      articleBlocks[nextIndex].style.display = 'flex';
      
      // Если это был последний блок, делаем кнопку неактивной
      if (nextIndex + 1 === articleBlocks.length) {
        loadMoreBtn.style.opacity = '0.5';
        loadMoreBtn.disabled = true;
      }
    }
  }
  
  // Обработчики для кнопок пагинации
  prevBtn.addEventListener('click', function() {
    if (currentPage > 1) {
      currentPage--;
      updateVisibility();
    }
  });
  
  nextBtn.addEventListener('click', function() {
    if (currentPage < totalPages) {
      currentPage++;
      updateVisibility();
    }
  });
  
  // Обработчик для кнопки "показать еще"
  loadMoreBtn.addEventListener('click', showNextBlock);
  
  // Обработчик изменения размера окна
  window.addEventListener('resize', function() {
    init();
    // При переходе из мобильного в десктопный вид сбрасываем currentPage
    if (!checkScreenWidth()) {
      currentPage = 1;
      updateVisibility();
    }
  });
  
  // Инициализируем при загрузке
  init();
  
  // Добавляем стили для скрытия блоков по умолчанию (на случай, если JS не загрузится)
  const style = document.createElement('style');
  style.textContent = `
    .twenty__four-container__articles {
      display: none;
    }
    .twenty__four-container__articles:first-child {
      display: flex;
    }
    .btn-twenty__four {
      display: none;
    }
    .btn-twenty__four[disabled] {
      opacity: 0.5;
      pointer-events: none;
      cursor: default;
    }
  `;
  document.head.appendChild(style);
});