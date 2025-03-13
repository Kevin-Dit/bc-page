$(document).ready(function () {
  AOS.init({
    offset: 0,
    duration: 400,
    delay: 0,
    once: false,
  });

  $(".client-logo-list").slick({
    infinite: false,
    slidesToShow: 9,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 7,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  });
  //  ----pdp-faq-accordion-start---

  $(".faq-title").click(function () {
    var $thisBody = $(this).next(".faq-body");
    var isBodyVisible = $thisBody.is(":visible");

    var currentHeight = $thisBody.height();
    var otherVisibleBodyHeights = $(".faq-body:visible")
      .not($thisBody)
      .map(function () {
        return $(this).height();
      })
      .get();

    var maxHeight = Math.max(...otherVisibleBodyHeights);

    $thisBody.css("height", maxHeight);

    $(".faq-body").not($thisBody).slideUp();

    $thisBody.slideToggle();

    if (!isBodyVisible) {
      $(".faq-title").removeClass("active");
    }

    $(this).toggleClass("active", !isBodyVisible);

    $thisBody.promise().done(function () {
      $thisBody.css("height", "auto");
    });
  });

  //  ----pdp-faq-accordion-end---

  //   ---testimonial-slider-start--------

  $(".testimonial-content-inner").slick({
    arrows: true,
    dots: false,
    infinite: true,
    slidesToScroll: 1,
    slidesToShow: 1,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 577,
        settings: {
          slidesToShow: 2,
          arrows: true,
        },
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 2,
          arrows: true,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          arrows: true,
        },
      },
    ],
  });

  $('.process-slider').slick({
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    vertical: true,
    verticalSwiping: true
  });

  // Highlight active slide
  $('.process-slider').on('afterChange', function (event, slick, currentSlide) {
    $('.process-step').removeClass('active');
    $('.process-step').eq(currentSlide).addClass('active');
  });

});

document.querySelectorAll(".open-popup").forEach(button => {
  button.addEventListener("click", function (event) {
    event.preventDefault();
    document.querySelector(".contact-popup-overlay").classList.add("active");
  });
});

document.querySelector(".close-popup").addEventListener("click", function () {
  document.querySelector(".contact-popup-overlay").classList.remove("active");
});

let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const indicator = document.querySelector('.indicator');
const navNumbers = document.querySelectorAll('.nav-number');

function updateSlides() {
  slides.forEach((slide, index) => {
    slide.classList.remove('active');
    slide.style.opacity = '0.5';
  });
  slides[currentIndex].classList.add('active');
  slides[currentIndex].style.opacity = '1';
  indicator.style.transform = `translateY(${currentIndex * (100)}%)`;

  navNumbers.forEach((nav, index) => {
    nav.classList.toggle('active', index === currentIndex);
  });
}

navNumbers.forEach(nav => {
  nav.addEventListener('click', () => {
    currentIndex = parseInt(nav.getAttribute('data-index'));
    updateSlides();
  });
});

const autoSlideInterval = 2000;
let autoSlideTimer = setInterval(() => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlides();
}, autoSlideInterval);

// Mouse Wheel Scroll
// let isScrolling = false;
// document.addEventListener("wheel", (event) => {
//   if (isScrolling) return;
//   isScrolling = true;

//   if (event.deltaY > 0) {
//     currentIndex = Math.min(currentIndex + 1, slides.length - 1);
//   } else {
//     currentIndex = Math.max(currentIndex - 1, 0);
//   }

//   updateSlides();
//   setTimeout(() => (isScrolling = false), 500);
// });

slider.addEventListener('mouseenter', () => {
  clearInterval(autoSlideTimer);
});

slider.addEventListener('mouseleave', () => {
  autoSlideTimer = setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlides();
  }, autoSlideInterval);
});