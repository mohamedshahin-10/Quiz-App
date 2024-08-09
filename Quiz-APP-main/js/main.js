//https://opentdb.com/api.php?amount=10&category=25&difficulty=easy&type=multiple

import { Quiz } from "./Quiz.js";

// variables
export let CreateQuiz=document.querySelector("#createQuiz");
export let startQuiz=document.querySelector("#startQuiz");
let Category=document.querySelector("#Category");
let Difficulty=document.querySelector("#difficulty");
let NumOfQuestions=document.querySelector("#numQuestions");
let BtnSubmit=document.querySelector("#submit");
let error = document.querySelector(".error");
let bars=document.querySelector("#bars");

export let newQuiz;
BtnSubmit.addEventListener('click',async function(){
    if(!NumOfQuestions.value || NumOfQuestions.value < 0){
        error.innerHTML="please add valid number of questions !!";
        error.classList.add("alert-danger");
    }else{
        error.innerHTML="";
        error.classList.remove("alert-danger");
         newQuiz= new Quiz(Category.value, Difficulty.value ,NumOfQuestions.value );
         await newQuiz.getDataFromAPi();  
         drawbars(newQuiz.questions.length);
        newQuiz.startQuiz();   
    }
  
})

function drawbars(numOfQuestions){
    let box="";
    for (let index = 0; index < numOfQuestions; index++) {
        box+=
        `
        <div class="col-3">
                <div class="bar bg-secondary rounded-3"></div>
        </div>
        `;
    }
    bars.innerHTML=box;
}