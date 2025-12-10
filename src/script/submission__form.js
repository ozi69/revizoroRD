document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-page");
  const inputs = form.querySelectorAll("input");
  const selectBox = form.querySelector(".select__tarif");
  const selectValue = form.querySelector(".select__tarif-value");
  const list = form.querySelector(".select__tarif-list");

  let tarifSelected = false;

  // обработка выбора тарифа
  list.addEventListener("click", (e) => {
    if (e.target.classList.contains("list-tarif")) {
      selectValue.textContent = e.target.textContent;
      tarifSelected = true;
      removeError(selectBox);
      list.style.display = "none"; // скрываем список после выбора
    }
  });

  // показать/скрыть список тарифов
  selectBox.querySelector(".select__tarif-box").addEventListener("click", () => {
    list.style.display = list.style.display === "block" ? "none" : "block";
  });

  // валидация формы
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // не отправляем сразу
    let valid = true;

    // проверка всех input
    inputs.forEach(input => {
      if (input.value.trim() === "") {
        showError(input);
        valid = false;
      } else {
        removeError(input);
      }
    });

    // проверка тарифа
    if (!tarifSelected) {
      showError(selectBox);
      valid = false;
    } else {
      removeError(selectBox);
    }

    if (valid) {
      form.submit(); // можно отправить
    }
  });

  // функции ошибок
  function showError(element) {
    removeError(element);
    const error = document.createElement("p");
    error.className = "error-message";
    error.textContent = "*Это поле обязательно для заполнения";
    error.style.color = "red";
    error.style.fontSize = "1.6rem";
    element.insertAdjacentElement("beforebegin", error);
  }

  function removeError(element) {
    const prevError = element.previousElementSibling;
    if (prevError && prevError.classList.contains("error-message")) {
      prevError.remove();
    }
  }
});