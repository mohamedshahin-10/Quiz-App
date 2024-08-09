import { newQuiz, startQuiz } from "./main.js";

export class Question{
    constructor(category,correctAnswer , options , questionHeader){
        this.questionHeader=questionHeader;
        this.correctAnswer = correctAnswer;
        this.incorrect_options = options;
        this.userAnwer="";
        this.allOptions=this.incorrect_options.concat(this.correctAnswer).sort(),
        this.mark=1;
        this.isAnswered=false;
        this.Category=category;
    }
    checkAnswer(event){
        var quiz=newQuiz;
        if(!this.isAnswered){
            this.userAnwer=event.target.innerHTML;
        
            if(this.userAnwer.toLowerCase() == this.correctAnswer.toLowerCase()){
                event.target.classList.add("bg-success","animate__animated","animate__shakeY");
                quiz.grade +=this.mark;
                document.querySelector("div.bg-secondary").classList.replace("bg-secondary","bg-success");
            }else{
                event.target.classList.add("bg-danger","animate__animated","animate__shakeX");
                document.querySelector("div.bg-secondary").classList.replace("bg-secondary","bg-danger");
            }
            this.isAnswered=true;
            
           
            setTimeout(function(){
                quiz.nextQuestion()
            },1000);
             

        }
       
    }
   displayQuestion(index ,Difficulity,numOfQuestions,grade= 0 ){
        
        var box=
        `
        <div>
            <div id="questionHeader" class="d-flex justify-content-between">
                <span class="bg-success rounded-3 p-2 text-white">Category: ${this.Category} | Difficulty :${Difficulity}</span>
                <span class="bg-success rounded-3 p-2 text-white">${index+1} of ${numOfQuestions}</span>
            </div>
            <div id="questionBody" class="row">
                <div class="col-12">
                    <p class="">${this.questionHeader}</p>
                </div>
                <div class="container-fluid">
                    <ul class="row  g-3">
                        ${this.allOptions.map((option)=>`
                                 <div class="col-md-6 ">
                                    <li>${option}</li>
                                 </div>
                            `).join("")}
                    </ul>
                </div>
            </div>
            <div>
               <h4 class="text-center">Grade : ${grade}</h4>
            </div>
        </div>
        `;
        startQuiz.innerHTML = box;
        let options=document.querySelectorAll("#questionBody li");
        for (const option of options) {
            option.addEventListener('click',(e)=>{
                this.checkAnswer(e);
              });
        }
       
    }
}