document.addEventListener("DOMContentLoaded", function(){

  var items = document.querySelectorAll(".timeline li");
  
  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  function callbackFunc() {
    for (var i = 0; i < items.length; i++) {
      if (isElementInViewport(items[i])) {
        if(!items[i].classList.contains("in-view")){
          items[i].classList.add("in-view");
        }
      } else if(items[i].classList.contains("in-view")) {
          items[i].classList.remove("in-view");
      }
    }
  }
   
  window.addEventListener("load", callbackFunc);
  window.addEventListener("scroll", callbackFunc);
  const boxes = document.querySelectorAll(".box");
  let activeIndex = 1;
  let isTransitioning = false;
  
  function updateCurrentImg() {
    isTransitioning = true;
  
    boxes.forEach((box, index) => {
      const isActive = index === activeIndex;
      box.classList.toggle("expanded", isActive);
      box.classList.toggle("closed", !isActive);
    });
  
    setTimeout(() => {
      isTransitioning = false;
    }, 500);
  }
  
  function handleArrowKey(event) {
    if (isTransitioning) {
      return;
    }
  
    if (event.key === "ArrowRight") {
      activeIndex = (activeIndex + 1) % boxes.length;
    } else if (event.key === "ArrowLeft") {
      activeIndex = (activeIndex - 1 + boxes.length) % boxes.length;
    }
  
    updateCurrentImg();
  }
  
  function handleBoxClick(index) {
    if (isTransitioning) {
      return;
    }
  
    if (index === activeIndex && boxes[index].classList.contains("expanded")) {
      boxes.forEach((box) => box.classList.remove("closed", "expanded"));
      activeIndex = 0;
    } else {
      activeIndex = index;
      updateCurrentImg();
    }
  }
  
  document.addEventListener("keydown", handleArrowKey);
  
  updateCurrentImg();
  
  boxes.forEach((box, index) => {
    box.addEventListener("click", () => handleBoxClick(index));
  });
  
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.nextElementSibling;
    const icon = item.querySelector('i');
  
    item.addEventListener('click', () => {
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          const otherAnswer = otherItem.nextElementSibling;
          const otherIcon = otherItem.querySelector('i');
  
          otherAnswer.classList.remove('active');
          otherIcon.classList.remove('active');
          otherAnswer.style.maxHeight = "0";
        }
      });
  
      answer.classList.toggle('active');
      icon.classList.toggle('active');
      if (answer.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight + "px";
      } else {
        answer.style.maxHeight = "0";
      }
    });
  });

  const elementsToAnimate = document.querySelectorAll(".animate-on-observe")

  const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
          if (entry.isIntersecting) {
              entry.target.classList.add("active")
          } else {
              entry.target.classList.remove("active")
          }
      })
  })

  elementsToAnimate.forEach((element) => observer.observe(element))

})  
