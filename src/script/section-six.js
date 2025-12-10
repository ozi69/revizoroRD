// Блоки карточек и стрелки
const blocks = document.querySelectorAll('.section-six__block');
const container = document.querySelector('.section-six__container');
const leftArrow = document.querySelector('.arrow-left');
const rightArrow = document.querySelector('.arrow-right');

let currentMode = null; // 'desktop' или 'mobile'

// --- Десктопная логика ---
function initDesktop() {
  currentMode = 'desktop';

  // Скрываем стрелки на десктопе
  leftArrow.style.display = 'none';
  rightArrow.style.display = 'none';

  // Сбрасываем стили мобильного режима
  container.style.overflowX = '';
  container.style.scrollBehavior = '';

  blocks.forEach((block, index) => {
    block.style.display = '';
    block.style.transitionDelay = "0s";

    block.onclick = () => {
      if (window.innerWidth <= 767) return; // защита на мобилке

      if (index === 0) {
        blocks.forEach((b, i) => {
          if (i !== 0) {
            b.classList.remove(`active-${i + 1}`, `shifted-${i + 1}`);
            b.style.transitionDelay = "0s";
          }
        });
        return;
      }

      // Сброс всех классов
      blocks.forEach((b, i) => {
        if (i !== 0) {
          b.classList.remove(`active-${i + 1}`, `shifted-${i + 1}`);
          b.style.transitionDelay = "0s";
        }
      });

      // Проставляем активные для диапазона [2..index+1]
      for (let i = 1; i <= index; i++) {
        blocks[i].classList.add(`active-${i + 1}`);
      }

      // Следующая карточка shifted с задержкой
      const nextBlock = blocks[index + 1];
      if (nextBlock) {
        nextBlock.style.transitionDelay = "0.1s";
        nextBlock.classList.add(`shifted-${index + 2}`);
      }
    };
  });
}

// --- Мобильная логика ---
function initMobile() {
  currentMode = 'mobile';

  // Показываем стрелки
  leftArrow.style.display = 'flex';
  rightArrow.style.display = 'flex';

  // Контейнер для скролла
  container.style.overflowX = 'auto';
  container.style.scrollBehavior = 'smooth';

  // Сбрасываем transition и классы desktop
  blocks.forEach(b => {
    b.classList.remove(...Array.from(b.classList).filter(c => c.startsWith('active-') || c.startsWith('shifted-')));
    b.style.transitionDelay = "0s";
    b.style.display = "flex";
  });

  const step = blocks[0].offsetWidth + 8; // ширина карточки + gap

  function updateArrows() {
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    const currentScroll = container.scrollLeft;

    if (currentScroll <= 0) {
      leftArrow.style.opacity = '0.5';
      leftArrow.style.pointerEvents = 'none';
    } else {
      leftArrow.style.opacity = '1';
      leftArrow.style.pointerEvents = 'auto';
    }

    if (currentScroll >= maxScrollLeft - 5) {
      rightArrow.style.opacity = '0.5';
      rightArrow.style.pointerEvents = 'none';
    } else {
      rightArrow.style.opacity = '1';
      rightArrow.style.pointerEvents = 'auto';
    }
  }

  leftArrow.onclick = () => {
    container.scrollBy({ left: -step, behavior: 'smooth' });
    setTimeout(updateArrows, 400);
  };

  rightArrow.onclick = () => {
    container.scrollBy({ left: step, behavior: 'smooth' });
    setTimeout(updateArrows, 400);
  };

  // Инициализация стрелок
  updateArrows();
}

// --- Обработка ресайза ---
function handleResize() {
  if (window.innerWidth <= 767 && currentMode !== 'mobile') {
    initMobile();
  } else if (window.innerWidth > 767 && currentMode !== 'desktop') {
    initDesktop();
  }
}

window.addEventListener('resize', handleResize);
handleResize(); // запуск при загрузке страницы
