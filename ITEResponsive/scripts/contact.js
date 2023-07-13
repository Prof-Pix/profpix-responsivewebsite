const SendConcern = document.querySelector(".form-send-concern");

const SendUsButton = document.querySelector(".sendusamessage-button");

SendUsButton.addEventListener ("click", () => {
    SendConcern.classList.toggle("form-send-concern-active");
})


//For Form Sending Effect

const inputContact = document.querySelectorAll(".input-contact");
const SubmitButton = document.querySelector(".send-concern-button");
const SelectOption = document.querySelector(".concern-option");
const concernSubmitted = document.querySelector(".concern-submitted");

let isSubmitButtonClicked = false;
let intervalId;

SubmitButton.addEventListener ("click", () => {

    let isAllInputFilled = true;

    for (let i = 0; i < inputContact.length; i++) {

        if (inputContact[i].value == "" || SelectOption.value == "Please select your concern") {
            alert("Please fill up all the required fields");
            isAllInputFilled = false;
            break;
        }

    }

    if (isAllInputFilled) {
            SelectOption.value = "Please select your concern";
        concernSubmitted.innerHTML = "Concern Submitted!";
        setTimeout(()=> {
            SendConcern.classList.toggle("form-send-concern-active");
            concernSubmitted.innerHTML = "";
        }, 2000);
        
        inputContact.forEach ( (input) => {
            input.value = "";
        })
    }
})