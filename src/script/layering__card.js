document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".section-one .box-card__layering");
  const counter = document.querySelector(".section-one .counter__card");

  let current = 0;

  if (!cards.length || !counter) return;

  // Инициализация
  cards.forEach((card, index) => {
    if (index === 0) {
      card.classList.add("active");
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
      card.classList.remove("active", "fixed");
    }

    // клик по карточке
    card.addEventListener("click", (e) => {
      const rect = card.getBoundingClientRect();
      const offsetY = e.clientY - rect.top;

      // верхняя зона (возврат)
      if (offsetY <= 80) {
        showCard(index);
        return;
      }

      // переход вперёд (если это активная карточка)
      if (index === current) {
        showNextCard();
      }
    });
  });

  updateCounter();

  // показать следующую карточку
  function showNextCard() {
    if (current >= cards.length - 1) return;

    cards[current].classList.remove("active");
    cards[current].classList.add("fixed");

    current++;

    cards[current].classList.remove("hidden");
    cards[current].classList.add("active");

    updateCounter();
  }

  // вернуться к конкретной карточке
  function showCard(index) {
    if (index === current) return;

    // убрать все карточки выше выбранной
    for (let i = index + 1; i < cards.length; i++) {
      cards[i].classList.add("hidden");
      cards[i].classList.remove("active", "fixed");
    }

    // активируем выбранную
    cards[index].classList.remove("hidden");
    cards[index].classList.add("active");

    current = index;
    updateCounter();
  }

  function updateCounter() {
    counter.textContent = String(current + 1).padStart(2, "0");
  }
});
