document.addEventListener('DOMContentLoaded', function() {
    const wrapper = document.querySelector('.section-seven__wrapper');
    const containers = document.querySelectorAll('.section-seven__container');
    const arrowLeft = document.querySelector('.arrows_seven-left');
    const arrowRight = document.querySelector('.arrows_seven-right');
    const counter = document.querySelector('.carusel-counter span');
    
    let currentIndex = 0;
    const totalSlides = containers.length;
    
    // Рассчитываем ширину слайда + gap
    function getSlideStep() {
        const containerWidth = containers[0].offsetWidth;
        const gap = parseInt(window.getComputedStyle(wrapper).gap) || 0;
        return containerWidth + gap;
    }
    
    // Инициализация слайдера
    function initSlider() {
        updateSlider();
        updateCounter();
        updateArrows();
    }
    
    // Обновление позиции слайдера
    function updateSlider() {
        const step = getSlideStep();
        wrapper.style.transform = `translateX(-${currentIndex * step}px)`;
    }
    
    // Обновление счетчика
    function updateCounter() {
        counter.textContent = `${(currentIndex + 1).toString().padStart(2, '0')}`;
    }
    
    // Обновление состояния кнопок
    function updateArrows() {
        arrowLeft.classList.toggle('disabled', currentIndex === 0);
        arrowRight.classList.toggle('disabled', currentIndex === totalSlides - 1);
    }
    
    // Переход к предыдущему слайду
    arrowLeft.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
            updateCounter();
            updateArrows();
        }
    });
    
    // Переход к следующему слайду
    arrowRight.addEventListener('click', function() {
        if (currentIndex < totalSlides - 1) {
            currentIndex++;
            updateSlider();
            updateCounter();
            updateArrows();
        }
    });
    
    // Инициализация при загрузке
    initSlider();
    
    // Обработка ресайза окна
    window.addEventListener('resize', function() {
        updateSlider();
    });
});