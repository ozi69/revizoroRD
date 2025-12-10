document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('.btn__description');
  
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      const isMobileView = window.matchMedia('(max-width: 767px)').matches;
      
      if (isMobileView) {
        // Мобильная версия
        const mobileBlock = this.closest('.block-product__mobile');
        if (!mobileBlock) return;
        
        // Находим следующий .product__description (может быть не сразу после)
        let nextElement = mobileBlock.nextElementSibling;
        while (nextElement && !nextElement.classList.contains('product__description')) {
          nextElement = nextElement.nextElementSibling;
        }
        
        if (nextElement) {
          nextElement.classList.toggle('active');
          
          // Добавляем класс к изображению и самому блоку
          const mobileImg = mobileBlock.querySelector('.block-product__mobile-img');
          if (mobileImg) {
            mobileImg.classList.toggle('active');
          }
          
          // Добавляем класс .active к .block-product__mobile
          mobileBlock.classList.toggle('active');
        }
      } else {
        // Десктопная версия
        const desktopBlock = this.closest('.block-product');
        if (!desktopBlock) return;
        
        // Находим следующий .product__description
        let nextElement = desktopBlock.nextElementSibling;
        while (nextElement && !nextElement.classList.contains('product__description')) {
          nextElement = nextElement.nextElementSibling;
        }
        
        if (nextElement) {
          nextElement.classList.toggle('active');
          desktopBlock.classList.toggle('active');
        }
      }
    });
  });
});