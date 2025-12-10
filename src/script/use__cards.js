document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.block-two__card');
  const contentBlock = document.querySelector('.block-one__content');

  const titleCopy = contentBlock.querySelector('.title_copy');
  const textCopy = contentBlock.querySelector('.text_copy');
  const imgCopy = contentBlock.querySelector('.img_copy');

  const btnWorking = document.querySelector('.working_with_data');
  const btnReports = document.querySelector('.reports');
  const btnAnalytics = document.querySelector('.analytics');
  const btns = document.querySelectorAll('.box__btn-select');

  const cardsContainer = document.querySelector('.block-two__twen-nine');

  const btnSlider = document.querySelectorAll('.box_slider-btn');

  let currentIndex = 0; // индекс активной карточки

  function activateCard(card, scroll = true) {
    cards.forEach(c => {
      c.classList.remove('active');
      c.querySelector('.content__title').classList.remove('active-title');
      c.querySelector('.content__text').classList.remove('active-text');
    });

    card.classList.add('active');
    card.querySelector('.content__title').classList.add('active-title');
    card.querySelector('.content__text').classList.add('active-text');

    const cardTitle = card.querySelector('.content__title').textContent;
    const cardText = card.querySelector('.content__text').textContent;
    const cardImg = card.querySelector('img').getAttribute('src');

    titleCopy.textContent = cardTitle;
    textCopy.textContent = cardText;
    imgCopy.setAttribute('src', cardImg);
    imgCopy.setAttribute('alt', cardTitle);

    if (scroll && cardsContainer) {
      if (window.innerWidth > 767) {
        // вертикальный скролл (desktop)
        const cardTop = card.offsetTop;
        const containerHeight = cardsContainer.clientHeight;
        const cardHeight = card.clientHeight;

        cardsContainer.scrollTo({
          top: cardTop - (containerHeight / 2 - cardHeight / 2),
          behavior: "smooth"
        });
      } else {
        // горизонтальный скролл (mobile)
        const cardLeft = card.offsetLeft;
        const containerWidth = cardsContainer.clientWidth;
        const cardWidth = card.clientWidth;

        cardsContainer.scrollTo({
          left: cardLeft - (containerWidth / 2 - cardWidth / 2),
          behavior: "smooth"
        });
      }
    }

    // обновляем индекс
    currentIndex = Array.from(cards).indexOf(card);
  }

  function activateButton(button, typeText) {
    btns.forEach(b => b.classList.remove('active-btn'));
    button.classList.add('active-btn');

    const targetCard = Array.from(cards).find(c => {
      const type = c.querySelector('.content__type');
      return type && type.textContent.trim().toLowerCase() === typeText.toLowerCase();
    });

    if (targetCard) {
      activateCard(targetCard, true);
    }
  }

  // Кнопки категорий
  btnWorking.addEventListener('click', () => activateButton(btnWorking, 'Работа с данными'));
  btnReports.addEventListener('click', () => activateButton(btnReports, 'Отчеты'));
  btnAnalytics.addEventListener('click', () => activateButton(btnAnalytics, 'Аналитика'));

  // Клики по карточкам
  cards.forEach(card => {
    card.addEventListener('click', () => activateCard(card, false));
  });

  // Слайдер: влево / вправо
  if (btnSlider.length === 2) {
    const [btnPrev, btnNext] = btnSlider;

    btnPrev.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + cards.length) % cards.length; // зацикливаем
      activateCard(cards[currentIndex], true);
    });

    btnNext.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % cards.length; // зацикливаем
      activateCard(cards[currentIndex], true);
    });
  }

  // По умолчанию активируем первую категорию
  if (cards.length > 0) {
    activateButton(btnWorking, 'Работа с данными');
  }
});


/* ----- Перенос box_slider ----- */
document.addEventListener('DOMContentLoaded', function() {
  const boxSlider = document.querySelector('.box_slider');
  const blockNavigation = document.querySelector('.block-navigation');
  const twentyNineContainer = document.querySelector('.twenty-nine__container');

  function moveBoxSlider() {
    if (!boxSlider) return;

    if (window.innerWidth <= 767) {
      // Переносим в конец twenty-nine__container
      if (twentyNineContainer && boxSlider.parentElement !== twentyNineContainer) {
        twentyNineContainer.appendChild(boxSlider);
      }
    } else {
      // Возвращаем обратно в block-navigation
      if (blockNavigation && boxSlider.parentElement !== blockNavigation) {
        blockNavigation.appendChild(boxSlider);
      }
    }
  }

  // при загрузке
  moveBoxSlider();
  // при изменении ширины окна
  window.addEventListener('resize', moveBoxSlider);
});
