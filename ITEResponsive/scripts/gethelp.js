const faqQuestions = document.querySelectorAll(".faq-question");


faqQuestions.forEach( (question, index) => {
    let newIndex = index + 1;

    const plusDropSign = document.querySelector(`.plus-drop-sign-${newIndex}`);
    const faqAnswer = document.querySelector(`.faq-${newIndex}-answer`);

    question.addEventListener("click", () => {
        faqAnswer.classList.toggle("active");
    
        if (faqAnswer.classList.contains("active")) {
            plusDropSign.innerHTML = `<i class="fa-solid fa-arrow-turn-down"></i>`;
            question.style.backgroundColor = "#f3f4f6";
        }
    
        else {
            question.style.backgroundColor = "transparent";
            plusDropSign.innerHTML = `<i class="fa-solid fa-plus"></i>`;
        }
    
    })

})

window.addEventListener("click", (event) => {
    faqQuestions.forEach((question, index) => {
      let newIndex = index + 1;
  
      const faqAnswer = document.querySelector(`.faq-${newIndex}-answer`);
  
      if ( !event.target.matches(`.faq-${newIndex}-answer`) && !question.contains(event.target)) {
        faqAnswer.classList.remove("active");
        question.style.backgroundColor = "transparent";
        const plusDropSign = document.querySelector(`.plus-drop-sign-${newIndex}`);
        plusDropSign.innerHTML = `<i class="fa-solid fa-plus"></i>`;
      }
    });
  });










