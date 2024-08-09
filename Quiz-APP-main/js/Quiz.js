import { Question } from "./Question.js";
import { CreateQuiz, startQuiz } from "./main.js";

export class Quiz{
    static index = 0;
    constructor(Category, Difficulity , NumOfQuestions){
        this.Category=Category;
        this.Difficulity=Difficulity;
        this.NumOfQuestions = NumOfQuestions;
        this.questions=[];
        this.grade=0;
    }
    async getDataFromAPi(){
     let request =await fetch(`https://opentdb.com/api.php?amount=${this.NumOfQuestions}&category=${this.Category}&difficulty=${this.Difficulity}&type=multiple`);
     let data= await request.json();
     this.createQuestions(data.results);   
    }

    createQuestions(data){
        for (const question of data ) {
            this.questions.push(
                new Question(question.category,question.correct_answer,question.incorrect_answers,question.question)
            );
        }
    }

    startQuiz(){
        CreateQuiz.style.display="none";
        startQuiz.style.display="block";
        this.questions[Quiz.index].displayQuestion(Quiz.index ,this.Difficulity,this.NumOfQuestions,this.grade);
        //gradeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee 
    }

     nextQuestion(){
        Quiz.index++;
        if(Quiz.index < this.questions.length){
        this.questions[Quiz.index].displayQuestion(Quiz.index ,this.Difficulity,this.NumOfQuestions,this.grade);      
         }
         else{
            this.gameOver();
         }
    }

    gameOver(){
        var msg="";
        if(this.grade == this.questions.length * this.questions[0].mark)
        {
            msg=
            `
            <div class="alert alert-success">
            <p><b> Congratulations you are doing Great </b> </p>    
            <p class="text-center">your garde is ${this.grade}</p>
            </div>
            `;
        }else if(this.grade < this.questions.length * this.questions[0].mark && this.grade > 0)
        {
            msg=
            `
            <div class="alert alert-warning">
                <p><b> you are doing Great but you still have to do more</b></p>
                 <p class="text-center">your garde is ${this.grade}</p>
            </div>
            `;
        }else{
            msg=
            `
            <div class="alert alert-danger">
                <p><b>you are failed Soory :''''(</b></p>
                 <p class="text-center">your garde is ${this.grade}</p>
            </div>
            `;
        }
        msg+=
        `
        <div class="d-flex justify-content-evenly">
            <button class="btn btn-success" onclick="location.reload()">Try Again</button>
            <button class="btn btn-danger" onclick="window.close()">close</button>
        </div>
        `
        startQuiz.innerHTML = msg;
    }
  
}