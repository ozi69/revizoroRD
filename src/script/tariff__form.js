document.addEventListener("DOMContentLoaded", () => {
  const selectBox = document.querySelector(".select__tarif-box");
  const selectValue = document.querySelector(".select__tarif-value");
  const selectList = document.querySelector(".select__tarif-list");
  const arrow = selectBox.querySelector("span svg");
  const options = document.querySelectorAll(".list-tarif");

  // открыть/закрыть список
  selectBox.addEventListener("click", () => {
    selectList.classList.toggle("active");
    arrow.classList.toggle("rotate");
  });

  // выбор тарифа
  options.forEach(option => {
    option.addEventListener("click", () => {
      selectValue.textContent = option.textContent;
      selectList.classList.remove("active");
      arrow.classList.remove("rotate");
    });
  });

  // клик вне — закрыть список
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".select__tarif")) {
      selectList.classList.remove("active");
      arrow.classList.remove("rotate");
    }
  });
});
