document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".section-thirty__three .thirty-three__container");
  if (!container) return;

  const cards = Array.from(container.querySelectorAll(".thirty-three__card"));
  if (cards.length === 0) return;

  const DURATION = 600;  // transition в мс
  const STAGGER  = 180;  // задержка при возврате
  let hiddenCount = 0;   // сколько ушло

  function isMobile() {
    return window.innerWidth <= 767;
  }

  function topIndex() {
    return isMobile() ? cards.length - 1 - hiddenCount : hiddenCount;
  }

  function hideTopCard() {
    const i = topIndex();
    const card = cards[i];
    if (!card || card.classList.contains("is-out")) return;

    card.classList.add("is-out");
    hiddenCount++;
  }

  function restoreAllReverse() {
    if (hiddenCount === 0) return;

    let remaining = hiddenCount;

    if (!isMobile()) {
      // десктоп — возвращаем с начала
      for (let step = 0, i = hiddenCount - 1; i >= 0; i--, step++) {
        const card = cards[i];
        setTimeout(() => {
          card.classList.remove("is-out");
          card.addEventListener("transitionend", function onEnd() {
            card.removeEventListener("transitionend", onEnd);
            remaining--;
            if (remaining === 0) hiddenCount = 0;
          });
        }, step * STAGGER);
      }
    } else {
      // мобилка — возвращаем с конца
      for (let step = 0, i = cards.length - hiddenCount; i < cards.length; i++, step++) {
        const card = cards[i];
        setTimeout(() => {
          card.classList.remove("is-out");
          card.addEventListener("transitionend", function onEnd() {
            card.removeEventListener("transitionend", onEnd);
            remaining--;
            if (remaining === 0) hiddenCount = 0;
          });
        }, step * STAGGER);
      }
    }
  }

  cards.forEach((card, idx) => {
    card.addEventListener("click", () => {
      // десктоп: возврат на последней
      if (!isMobile()) {
        if (hiddenCount === cards.length - 1 && idx === cards.length - 1) {
          restoreAllReverse();
          return;
        }
        if (idx === topIndex()) hideTopCard();
      }
      // мобилка: возврат на первой
      else {
        if (hiddenCount === cards.length - 1 && idx === 0) {
          restoreAllReverse();
          return;
        }
        if (idx === topIndex()) hideTopCard();
      }
    });
  });

  // сброс при ресайзе
  window.addEventListener("resize", () => {
    hiddenCount = 0;
    cards.forEach(c => c.classList.remove("is-out"));
  });
});