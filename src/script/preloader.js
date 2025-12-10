// Полный скрипт прелоадера + фиксации финальных состояний (включая section-block__tab-btn)
(function () {
  const KEY = 'preloaderPlayed';
  const SMALL_SCREEN_QUERY = '(max-width: 767px)';

  // Хелпер: фиксирует элемент в финальном состоянии и выключает animation
  function fixToFinal(el, finalStyles = {}) {
    if (!el) return;
    el.classList.remove('reveal', 'active');
    el.classList.add('ready');
    el.style.animation = 'none';
    // применяем финальные стили
    for (const prop in finalStyles) {
      el.style[prop] = finalStyles[prop];
    }
  }

  // Хелпер для NodeList
  function fixListToFinal(list, finalStyles = {}) {
    if (!list) return;
    list.forEach(el => fixToFinal(el, finalStyles));
  }

  // Если экран маленький — НЕ запускаем прелоадер/анимации,
  // а сразу выставляем финальное состояние (удаляем/скрываем прелоадер)
  if (window.matchMedia && window.matchMedia(SMALL_SCREEN_QUERY).matches) {
    // Сбросим блокировку скролла и выставим финальные классы/стили
    document.body.style.overflow = 'auto';
    document.querySelector('header')?.classList.add('reveal');
    document.querySelector('.block-core__btn')?.classList.add('reveal');
    if (document.querySelector('.block-opacity')) {
      document.querySelector('.block-opacity').style.setProperty('display', 'block');
    }

    // Удаляем preloader если остался
    const preloader = document.querySelector('.preloader');
    if (preloader) preloader.remove();

    // main-topic image — выставляем готовым
    const mainTopicImg = document.querySelector('.main-topic__img');
    if (mainTopicImg) {
      mainTopicImg.classList.add('ready');
      mainTopicImg.classList.remove('active');
      mainTopicImg.style.animation = 'none';
      mainTopicImg.style.transform = 'translateY(0)';
      mainTopicImg.style.opacity = '1';
    }

    // header-title h1/p — готово
    const headerH1 = document.querySelector('.header-title h1');
    const headerP  = document.querySelector('.header-title p');
    if (headerH1) {
      headerH1.classList.add('ready');
      headerH1.classList.remove('reveal');
      headerH1.style.animation = 'none';
      headerH1.style.opacity = '1';
      headerH1.style.clipPath = 'inset(0 0 0 0)';
    }
    if (headerP) {
      headerP.classList.add('ready');
      headerP.classList.remove('reveal');
      headerP.style.animation = 'none';
      headerP.style.opacity = '1';
      headerP.style.clipPath = 'inset(0 0 0 0)';
    }

    // section-block__content
    const sectionContent = document.querySelector('.section-block__content');
    if (sectionContent) {
      sectionContent.classList.add('ready');
      sectionContent.classList.remove('reveal');
      sectionContent.style.animation = 'none';
      sectionContent.style.clipPath = 'inset(0 0 0 0)';
      sectionContent.style.opacity = '1';
    }

    // block-content_box-link
    const boxLink = document.querySelector('.block-content_box-link');
    if (boxLink) {
      boxLink.classList.add('ready');
      boxLink.classList.remove('reveal');
      boxLink.style.animation = 'none';
      boxLink.style.clipPath = 'inset(0 0 0 0)';
      boxLink.style.opacity = '1';
    }

    // все box-change__text
    const boxChangeTextList = document.querySelectorAll('.box-change__text');
    boxChangeTextList.forEach(el => {
      el.classList.add('ready');       // элемент помечен как готовый
      el.classList.remove('reveal');
      el.style.animation = 'none';
      el.style.clipPath = 'inset(0 0 0 0)';
      el.style.opacity = '1';
      el.style.transform = 'none';
    });

    // все табы — готово
    const tabBtns = document.querySelectorAll('.section-block__tab-btn');
    tabBtns.forEach(el => {
      el.classList.add('ready');
      el.classList.remove('reveal');
      el.style.animation = 'none';
      el.style.clipPath = 'inset(0 0 0 0)';
      el.style.opacity = '1';
    });

    // Дальше — не выполняем остальную логику прелоадера
    return;
  }

  // --- основной сценарий для экранов >= 768px ---
  if (!sessionStorage.getItem(KEY)) {
    sessionStorage.setItem(KEY, 'true');

    // Блокируем скролл
    document.body.style.overflow = 'hidden';

    // Элементы
    const blockOpacity = document.querySelector('.block-opacity');
    if (blockOpacity) blockOpacity.style.display = 'none';

    const headerEl = document.querySelector('header');
    if (headerEl && !headerEl.classList.contains('header__animation')) {
      headerEl.classList.add('header__animation');
    }

    const preloader = document.querySelector('.preloader');
    const preloaderWhite = document.querySelector('.preloader-white');
    const preloaderBlue = document.querySelector('.preloader-blue');
    const preloaderImg = document.querySelector('.preloader-img');
    const preloaderText = document.querySelector('.preloader-text');

    const mainTopicImg = document.querySelector('.main-topic__img');
    const headerH1 = document.querySelector('.header-title h1');
    const headerP  = document.querySelector('.header-title p');
    const sectionContent = document.querySelector('.section-block__content');


    // === Запуск прелоадера (тайминги взяты из твоего кода) ===
    if (preloaderWhite) setTimeout(() => preloaderWhite.classList.add('active'), 200);
    if (preloaderImg) setTimeout(() => preloaderImg.classList.add('active'), 700);
    if (preloaderText) setTimeout(() => preloaderText.classList.add('active'), 900);
    if (preloaderBlue) setTimeout(() => preloaderBlue.classList.add('active'), 2700);

    // main image — запускаем анимацию один раз через добавление .active
    if (mainTopicImg) setTimeout(() => mainTopicImg.classList.add('active'), 2800);

    // Скрытие прелоадера и удаление
    if (preloader) {
      setTimeout(() => {
        preloader.classList.add('active'); // класс .active запускает preloaderHide в CSS
        // удаляем preloader после завершения transition
        preloader.addEventListener('transitionend', () => {
          if (preloader.parentNode) preloader.remove();
        }, { once: true });
      }, 3600);
    }

    // === Обработчики окончаний анимаций ===

    // main-topic image — когда mainImgUp закончится, фиксируем картинку и запускаем reveal секций
    if (mainTopicImg) {
      mainTopicImg.addEventListener('animationend', (e) => {
        if (e.animationName === 'mainImgUp') {
          fixToFinal(mainTopicImg, { transform: 'translateY(0)', opacity: '1' });

          // Запускаем reveal sectionContent и заголовка, если они ещё не в ready
          if (sectionContent && !sectionContent.classList.contains('ready')) {
            sectionContent.classList.add('reveal');
          }
          if (headerH1 && !headerH1.classList.contains('ready')) {
            headerH1.classList.add('reveal');
          }
        }
      });
    }

    // Глобальный обработчик animationend — ловим revealUp, titleDown, textUp_01, textDown и revealLeft и т.д.
    document.addEventListener('animationend', (e) => {
      // revealUp для section-block__content
      if (e.animationName === 'revealUp' && e.target.classList && e.target.classList.contains('section-block__content')) {
        // фиксируем section-block__content в финальном состоянии
        fixToFinal(e.target, { clipPath: 'inset(0 0 0 0)', opacity: '1' });

        // показываем box-change__text (они запускают свою анимацию textDown)
        document.querySelectorAll('.box-change__text').forEach(p => {
          if (!p.classList.contains('ready')) p.classList.add('reveal');
        });

        // запускаем box-link (через animationstart / setTimeout ниже) — ничего тут не делаем дополнительно
      }

      // revealUp для блоков .block-content_box-link (если он проигрывался)
      if (e.animationName === 'revealUp' && e.target.classList && e.target.classList.contains('block-content_box-link')) {
        fixToFinal(e.target, { clipPath: 'inset(0 0 0 0)', opacity: '1' });
      }

      // titleDown — h1 заголовка
      if (e.animationName === 'titleDown' && e.target.tagName === 'H1') {
        fixToFinal(e.target, { clipPath: 'inset(0 0 0 0)', opacity: '1' });
        // запустить p заголовка, если нужно
        if (headerP && !headerP.classList.contains('ready')) headerP.classList.add('reveal');
      }

      // textUp_01 — p внутри .header-title
      if (e.animationName === 'textUp_01' && e.target.tagName === 'P' && e.target.closest('.header-title')) {
        fixToFinal(e.target, { clipPath: 'inset(0 0 0 0)', opacity: '1' });

        // Финальная секция: показать header и кнопку, показать .block-opacity и разблокировать скролл после transition
        const header = document.querySelector('header');
        const coreBtn = document.querySelector('.block-core__btn');

        header?.classList.add('reveal');
        coreBtn?.classList.add('reveal');
        if (blockOpacity) blockOpacity.style.display = 'block';

        if (header && coreBtn) {
          let finishedHeader = false;
          let finishedBtn = false;
          const checkUnlock = () => {
            if (finishedHeader && finishedBtn) document.body.style.overflow = 'auto';
          };
          header.addEventListener('transitionend', (te) => {
            if (te.propertyName === 'opacity') { finishedHeader = true; checkUnlock(); }
          }, { once: true });
          coreBtn.addEventListener('transitionend', () => { finishedBtn = true; checkUnlock(); }, { once: true });
        }
      }

      // textDown — для .box-change__text (внутренний эффект)
      if (e.animationName === 'textDown' && e.target.classList && e.target.classList.contains('box-change__text')) {
        fixToFinal(e.target, { transform: 'translateY(0)', opacity: '1' });
      }

      // revealLeft — табы
      if (e.animationName === 'revealLeft' && e.target.classList && e.target.classList.contains('section-block__tab-btn')) {
        fixToFinal(e.target, { clipPath: 'inset(0 0 0 0)', opacity: '1' });
      }

      // textDown внутри .block-content_box-change — это уже твоя логика, если нужно её обработать при окончании, здесь оставлена
    });

    // animationstart — для синхронизации табов и пр.
    document.addEventListener('animationstart', (e) => {
      // Когда block-content_box-change p начинает анимацию → показываем табы
      if (
        e.animationName === 'textDown' &&
        e.target.tagName === 'P' &&
        e.target.closest('.block-content_box_change') // на случай разного написания
      ) {
        document.querySelectorAll('.section-block__tab-btn').forEach(btn => {
          if (!btn.classList.contains('ready')) btn.classList.add('reveal');
        });
      }

      // fallback: оригинальный селектор
      if (
        e.animationName === 'textDown' &&
        e.target.tagName === 'P' &&
        e.target.closest('.block-content_box-change')
      ) {
        document.querySelectorAll('.section-block__tab-btn').forEach(btn => {
          if (!btn.classList.contains('ready')) btn.classList.add('reveal');
        });
      }

      // Когда section-block__content начинает анимацию → через 0.1s запускаем box-link
      if (e.animationName === 'revealUp' && e.target.classList && e.target.classList.contains('section-block__content')) {
        setTimeout(() => {
          const boxLink = document.querySelector('.block-content_box-link');
          if (boxLink && !boxLink.classList.contains('ready')) boxLink.classList.add('reveal');
        }, 100);
      }

      // Синхронизация с синим фоном
      if (e.animationName === 'blueUp' && e.target.classList && e.target.classList.contains('preloader-blue')) {
        preloaderImg?.classList.add('hide-under-blue');
        preloaderText?.classList.add('hide-under-blue');
      }
    });

  } else {
    // Если прелоадер уже был — сразу выставляем ВСЕ элементы в конечное состояние

    document.body.style.overflow = 'auto';
    document.querySelector('header')?.classList.add('reveal');
    document.querySelector('.block-core__btn')?.classList.add('reveal');
    document.querySelector('.block-opacity')?.style.setProperty('display', 'block');

    // Удаляем preloader если остался
    const preloader = document.querySelector('.preloader');
    if (preloader) preloader.remove();

    // main-topic image
    const mainTopicImg = document.querySelector('.main-topic__img');
    if (mainTopicImg) {
      mainTopicImg.classList.add('ready');
      mainTopicImg.classList.remove('active');
      mainTopicImg.style.animation = 'none';
      mainTopicImg.style.transform = 'translateY(0)';
      mainTopicImg.style.opacity = '1';
    }

    // header-title h1/p
    const headerH1 = document.querySelector('.header-title h1');
    const headerP  = document.querySelector('.header-title p');
    if (headerH1) {
      headerH1.classList.add('ready');
      headerH1.classList.remove('reveal');
      headerH1.style.animation = 'none';
      headerH1.style.opacity = '1';
      headerH1.style.clipPath = 'inset(0 0 0 0)';
    }
    if (headerP) {
      headerP.classList.add('ready');
      headerP.classList.remove('reveal');
      headerP.style.animation = 'none';
      headerP.style.opacity = '1';
      headerP.style.clipPath = 'inset(0 0 0 0)';
    }

    // section-block__content
    const sectionContent = document.querySelector('.section-block__content');
    if (sectionContent) {
      sectionContent.classList.add('ready');
      sectionContent.classList.remove('reveal');
      sectionContent.style.animation = 'none';
      sectionContent.style.clipPath = 'inset(0 0 0 0)';
      sectionContent.style.opacity = '1';
    }

    // block-content_box-link
    const boxLink = document.querySelector('.block-content_box-link');
    if (boxLink) {
      boxLink.classList.add('ready');
      boxLink.classList.remove('reveal');
      boxLink.style.animation = 'none';
      boxLink.style.clipPath = 'inset(0 0 0 0)';
      boxLink.style.opacity = '1';
    }

    // все box-change__text
    const boxChangeTextList = document.querySelectorAll('.box-change__text');
    boxChangeTextList.forEach(el => {
      el.classList.add('ready');       // элемент помечен как готовый
      el.classList.remove('reveal');
      el.style.animation = 'none';
      el.style.clipPath = 'inset(0 0 0 0)';
      el.style.opacity = '1';
      el.style.transform = 'none';
    });

    // все табы — готово
    const tabBtns = document.querySelectorAll('.section-block__tab-btn');
    tabBtns.forEach(el => {
      el.classList.add('ready');
      el.classList.remove('reveal');
      el.style.animation = 'none';
      el.style.clipPath = 'inset(0 0 0 0)';
      el.style.opacity = '1';
    });
  }
})();
