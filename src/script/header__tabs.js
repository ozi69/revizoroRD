// header_tabs.js — надежное переключение табов + анимация (текст — только opacity, картинка подъезжает)
(function () {
  const PRELOADER_SELECTOR = '.preloader';
  const TAB_BTN_SELECTOR = '.section-block__tab-btn';
  const CONTENT_SELECTOR = '.block-content_box-change';
  const TEXT_SELECTOR = '.box-change__text';
  const IMG_SELECTOR = '.box-change__img img';
  const DEFAULT_TAB_NAME = 'tab3';

  function $$(selector) { return Array.from(document.querySelectorAll(selector)); }

  document.addEventListener('DOMContentLoaded', () => {
    const tabs = $$(TAB_BTN_SELECTOR);
    const contents = $$(CONTENT_SELECTOR);
    if (!tabs.length || !contents.length) return;

    // Анимируем только opacity для текста (но при этом не мешаем прелоадеру)
    function animateText(textEl) {
      if (!textEl) return;

      // Если элемент в процессе reveal от прелоадера — не вмешиваемся,
      // чтобы не прерывать его animation.
      if (textEl.classList.contains('reveal') && !textEl.classList.contains('ready')) {
        // просто обеспечим, что opacity будет доведено до 1 в конце reveal'а
        // (ничего дополнительно не делаем)
        return;
      }

      // убедимся, что текст физически на месте (чтобы fade-in был виден)
      // но не делаем этого, если прелоадер/реveal всё ещё выполняется
      if (!textEl.classList.contains('reveal')) {
        textEl.style.transform = 'none';
      }

      // сбрасываем предыдущие классы/анимации
      textEl.classList.remove('fade-in');
      textEl.style.removeProperty('animation');

      // стартуем с opacity 0, затем добавим анимацию
      textEl.style.opacity = '0';
      void textEl.offsetWidth;
      textEl.classList.add('fade-in');

      const onEnd = () => {
        // оставляем текст в нормальной позиции и в видимом состоянии
        textEl.style.opacity = '1';
        textEl.style.removeProperty('animation');
        textEl.classList.remove('fade-in');
        textEl.removeEventListener('animationend', onEnd);
      };
      textEl.addEventListener('animationend', onEnd);
    }

    // Картинка подъезжает снизу вверх
    function animateImage(imgEl) {
      if (!imgEl) return;
      imgEl.classList.remove('img-up');
      imgEl.style.removeProperty('animation');
      imgEl.style.transform = 'translateY(4rem)';
      imgEl.style.opacity = '0';
      void imgEl.offsetWidth;
      imgEl.classList.add('img-up');

      const onEnd = () => {
        imgEl.style.transform = 'none';
        imgEl.style.opacity = '1';
        imgEl.style.removeProperty('animation');
        imgEl.classList.remove('img-up');
        imgEl.removeEventListener('animationend', onEnd);
      };
      imgEl.addEventListener('animationend', onEnd);
    }

    // Активировать таб
    function activateTab(tabName, { animate = true } = {}) {
      tabs.forEach(t => t.classList.remove('is-current'));
      contents.forEach(c => c.classList.remove('is-current'));

      const tabEl = tabs.find(t => String(t.dataset.tab) === String(tabName)) || tabs[0];
      const contentEl = contents.find(c => String(c.dataset.content) === String(tabName)) || contents[0];
      if (!tabEl || !contentEl) return;

      tabEl.classList.add('is-current');
      contentEl.classList.add('is-current');

      const textEl = contentEl.querySelector(TEXT_SELECTOR);
      const imgEl = contentEl.querySelector(IMG_SELECTOR);

      if (!animate) {
        // Если прелоадер всё ещё в DOM — не форсим transform/opacity для элементов,
        // чтобы прелоадер мог корректно проиграть reveal анимации.
        const preloaderPresent = !!document.querySelector(PRELOADER_SELECTOR);

        if (textEl) {
          textEl.classList.remove('fade-in');
          textEl.style.removeProperty('animation');
          // Сбрасываем transform только если прелоадера нет — иначе пусть reveal придёт сам.
          if (!preloaderPresent) {
            textEl.style.transform = 'none';
            textEl.style.opacity = '1';
          }
        }
        if (imgEl) {
          imgEl.classList.remove('img-up');
          imgEl.style.removeProperty('animation');
          imgEl.style.transform = 'none';
          imgEl.style.opacity = '1';
        }
        return;
      }

      // Перед fade-in убедимся, что текст не находится в процессе reveal.
      // Если находится — не вмешиваемся (animateText это учитывает).
      animateText(textEl);
      animateImage(imgEl);
    }

    // дефолтный таб
    const defaultTabEl = tabs.find(t => t.dataset.tab === DEFAULT_TAB_NAME) || tabs[0];
    const defaultTabName = defaultTabEl ? defaultTabEl.dataset.tab : tabs[0]?.dataset.tab;

    // Всегда показываем дефолт без анимации (гарантированно видно) —
    // но если прелоадер присутствует, то не будем форсить transform, чтобы не ломать reveal.
    activateTab(defaultTabName, { animate: false });

    // Если прелоадера уже нет — через таймаут запускаем анимацию
    if (!document.querySelector(PRELOADER_SELECTOR)) {
      setTimeout(() => {
        activateTab(defaultTabName, { animate: true });
      }, 50);
    }

    // клики по табам
    tabs.forEach(tab => {
      tab.addEventListener('click', (ev) => {
        ev.preventDefault && ev.preventDefault();
        if (tab.classList.contains('is-current')) return;
        activateTab(tab.dataset.tab, { animate: true });
      });
    });

    // Возврат через back/forward (bfcache)
    window.addEventListener('pageshow', (e) => {
      if (e.persisted) {
        const activeTab = tabs.find(t => t.classList.contains('is-current')) || defaultTabEl;
        const name = activeTab ? activeTab.dataset.tab : defaultTabName;
        activateTab(name, { animate: false });
      }
    });
  });
})();
