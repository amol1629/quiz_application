// const main_body = document.querySelector(".main-body");

const remove_on_second_page = document.querySelector(".removed-on-second-page");

const btn_lets_begin = document.querySelector(".lets-begin")

const btn_start_quiz = document.querySelector(".btn-start-quiz");

const instruction_page = document.querySelector(".inst-page");

const inst_page_btn_quit = instruction_page.querySelector(".btn-exit-continue .quit");

const inst_page_btn_continue = instruction_page.querySelector(".btn-exit-continue .continue");

const quiz_page = document.querySelector(".quiz-page");

const quiz_page_option_list = document.querySelector(".optiton-list");

const result_page = document.querySelector(".result-page");

let correct_answer_icon = '<div class="ans_correct_icon"><i class="fas fa-check"></i></div>';

let wrong_answer_icon = '<div class="ans-wrong-icon"><i class="fas fa-times" ></i></div> ';

const quiz_page_next_button = document.querySelector("footer .btn-next");

const quiz_page_btn_previous = document.querySelector("footer .btn-previous");

const quiz_page_total_remaining_questions = document.querySelector("footer .total-questions-remaining");

const quiz_page_remaining_time_text = document.querySelector(".remaining-time");

const quiz_page_remaining_time_sec = document.querySelector(".time-sec");

const quiz_page_time_line = document.querySelector("header .time-line");

const result_page_final_score = document.querySelector(".final-score");

const result_page_btn_play_button = document.querySelector(".play_again");

const result_page_btn_quit_button = document.querySelector(".result-page .buttons .stop");




let question_count = 0;
let your_score = 0;
let remaining_question_counter = 1;
let update_time_value = 0;
let time_Value = 20;
let timer_line_count;


// Buttons Styling :

// First page 'lets begin' button :
btn_lets_begin.onclick = function () {
        instruction_page.classList.add("activate_Info_Page");
        btn_start_quiz.classList.add("first-page-remove")

}

// Instruction page 'exit' button : 
inst_page_btn_quit.onclick = function () {
        instruction_page.classList.remove("activate_Info_Page");
        remove_on_second_page.classList.remove("removed-on-second-page");
        btn_start_quiz.classList.remove("first-page-remove")

}

// Instruction page 'continue' button : 
inst_page_btn_continue.onclick = function () {
        instruction_page.classList.remove("activate_Info_Page");
        remove_on_second_page.classList.remove("removed-on-second-page");
        btn_start_quiz.classList.add("first-page-remove");
        quiz_page.classList.add("quiz-page-activated")
        displayQuestions(0);

        // Footer remaining question increment :
        footer_remaining_question_number(1);

        // Timer gets decrement by calling timer() function
        timer_started(time_Value);

        // Timer line :
        timer_line_increment(0);

}


// Result page 'play again' button :
result_page_btn_play_button.onclick = function () {
        instruction_page.classList.remove("activate_Info_Page");
        btn_start_quiz.classList.add("first-page-remove");
        quiz_page.classList.add("quiz-page-activated");
        result_page.classList.remove("activate_result_page");

        displayQuestions(question_count);
        footer_remaining_question_number(remaining_question_counter);
        quiz_page_next_button.classList.remove("show");
        clearInterval(update_time_value);
        timer_started(time_Value);
        clearInterval(timer_line_count);
        timer_line_increment(0);
}


// Result page 'exit' button :
result_page_btn_quit_button.onclick = function () {
        window.location.reload();
}


// Event listeners on buttons :

// 'mouseover' eventlistener on 'lets begin' button : 
btn_lets_begin.addEventListener('mouseover', function onMouseover(event) {
        document.body.style.backgroundImage = "url('/04--Images/bg-7.jpg')";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundSize = "auto auto"
        document.body.style.transition = "all 0.3s ease";
});


// 'mouseout' eventlistener on 'lets begin' button : 
btn_lets_begin.addEventListener('mouseout', function onMouseout(event) {
        document.body.style.backgroundImage = "url('/04--Images/bg-10.jpg')";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundSize = "auto auto"
        document.body.style.transition = "all 0.3s ease"

});


// 'onclick' event listener on 'lets begin' : 
btn_lets_begin.addEventListener('click', function onClick(event) {
        document.body.style.backgroundImage = "url('/04--Images/bg-5.webp')";
        document.body.style.backgroundRepeat = "no-repeat";
        // document.body.style.backgroundSize = "cover";
        document.body.style.backgroundSize = "auto auto"
        document.body.style.transition = "all 0.3s ease"


});


// 'onclick' event listener on instruction page's 'exit' button : 
inst_page_btn_quit.addEventListener('click', function onClick(event) {

        document.body.style.backgroundImage = "url('/04--Images/bg-2.jpg')";
        document.body.style.backgroundRepeat = "no-repeat";
        // document.body.style.backgroundSize = "cover";
        document.body.style.backgroundSize = "auto auto"
        document.body.style.transition = "all 0.3s ease"

});


// 'onclick' event listener on instruction page's 'continue' button : 
inst_page_btn_continue.addEventListener('click', function onClick(event) {
        document.body.style.backgroundImage = "url('/04--Images/bg-6.jpg')";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundSize = "auto auto"
        document.body.style.transition = "all 0.3s ease"

        // Whenever user click on 'countinue' button, both 'next' and 'previous' buttons gets hidden :
        quiz_page_next_button.classList.remove("show");
        quiz_page_btn_previous.classList.add("hide-previous-button");

});






// Questions rendering started : 
// Shows questions on the quiz page :
function displayQuestions(index) {
        let quiz_title = document.querySelector(".questions");

        let question_insertion = "<span>" + sample_questions[index].question_number + ". " + sample_questions[index].question + "</span>";

        let option_insertion = '<div class="option">' + sample_questions[index].options[0] + '</div>' +
                '<div class="option">' + sample_questions[index].options[1] + '</div>' +
                '<div class="option">' + sample_questions[index].options[2] + '</div>' +
                '<div class="option">' + sample_questions[index].options[3] + '</div>';

        quiz_title.innerHTML = question_insertion;

        quiz_page_option_list.innerHTML = option_insertion;


        const option_selected = quiz_page_option_list.querySelectorAll(".option");

        for (let i = 0; i < option_selected.length; i++) {
                option_selected[i].setAttribute("onclick", "optionSelected(this)");
                
        }
}


// Function for option selection :
function optionSelected(answer) {
        // Shows which answer user is selected
        let user_Selected_Answer = answer.textContent;
        
        let right_Answer = sample_questions[question_count].correctAnswer;

        let all_Options = quiz_page_option_list.children.length;

        if (user_Selected_Answer == right_Answer) {
                your_score++;
                answer.classList.add("ans-correct");
                answer.insertAdjacentHTML("beforeend", correct_answer_icon);
        } else {
                answer.classList.add("ans-wrong");
                answer.insertAdjacentHTML("beforeend", wrong_answer_icon); 
                
                for (let i = 0; i < all_Options; i++){
                        if (quiz_page_option_list.children[i].textContent == right_Answer) {
                                quiz_page_option_list.children[i].setAttribute("ans-correct", "option correct");  
                                quiz_page_option_list.children[i].classList.add("ans-correct");
                                quiz_page_option_list.children[i].insertAdjacentHTML("beforeend", correct_answer_icon);
                        }
                }
        }


        for (let i = 0; i < all_Options; i++){
                quiz_page_option_list.children[i].classList.add("ans-disabled")
        }

        // Whenever user selects an options 'next' button will be displayed
        quiz_page_next_button.classList.add("show");

        // Whenever user selects an options from then 'previous' button will be displayed
        quiz_page_btn_previous.classList.remove("hide-previous-button");

        // Timer gets stopped when user selects any option : 
        clearInterval(update_time_value);

        // Timer line gets stopped when user selects any option : 
        clearInterval(timer_line_count);

}



// 'next' Button of quiz page Selection :
quiz_page_next_button.onclick = () => {
        if (question_count < sample_questions.length - 1) {
                question_count++;
                remaining_question_counter++;
                displayQuestions(question_count);
                footer_remaining_question_number(remaining_question_counter);

                // When user click 'next' button the for the next question 'next' button will be hidden 
                quiz_page_next_button.classList.remove("show");

                clearInterval(update_time_value);
                timer_started(time_Value);
                clearInterval(timer_line_count);
                timer_line_increment(0);

        } else {
                clearInterval(update_time_value);
                clearInterval(timer_line_count);
                display_Show_Result_Page();
        }
}


// 'previous' Button of quiz page Selection : 
quiz_page_btn_previous.onclick = () => {
        if (question_count != 0) {
                question_count--;
                remaining_question_counter--;
                displayQuestions(question_count);
                footer_remaining_question_number(remaining_question_counter);
                clearInterval(update_time_value);
                timer_started(time_Value);
                clearInterval(timer_line_count);
                timer_line_increment(0);

                quiz_page_remaining_time_text.textContent = "Remaining Time"
        }
}


// Remaining question number increment of quiz page footer:
function footer_remaining_question_number(index) {
        let total_Remaining_QueNo_Tag = '<span><p>' + index + '</p>of<p>' + sample_questions.length + '</p>questions</span>';

        quiz_page_total_remaining_questions.innerHTML = total_Remaining_QueNo_Tag;
}


// Function for timer in quiz page header:
function timer_started(time) {
        update_time_value = setInterval(timer_update, 1000);

        function timer_update() {
        
                quiz_page_remaining_time_sec.textContent = time;
                time--;

                if (time < 0) {
                        clearInterval(update_time_value);
                        quiz_page_remaining_time_text.textContent = "Time Ended"

                        const right_Answer = sample_questions[question_count].correctAnswer;

                        const all_Options = quiz_page_option_list.children.length;
                        
                        for (let i = 0; i < all_Options; i++) {
                                if (quiz_page_option_list.children[i].textContent == right_Answer) {
                                        quiz_page_option_list.children[i].setAttribute("ans-correct", "option correct");
                                        quiz_page_option_list.children[i].classList.add("ans-correct");
                                        quiz_page_option_list.children[i].insertAdjacentHTML("beforeend", correct_answer_icon);
                                }
                        }

                        for (let i = 0; i < all_Options; i++) {
                                quiz_page_option_list.children[i].classList.add("ans-disabled")
                        }

                        quiz_page_next_button.classList.add("show");

                        quiz_page_btn_previous.classList.remove("hide-previous-button");
                }
        }
}



// Function for Timer line in quiz page header:
function timer_line_increment(time) {
        timer_line_count = setInterval(timer, 34);
        
        function timer() {
                time += 1;
                quiz_page_time_line.style.width = time + "px";

                if (time > 610) {
                        clearInterval(timer_line_count);
                }
        }
}



// Displaying Show result page after click on last 'next' button : 
function display_Show_Result_Page() {
        instruction_page.classList.remove("activate_Info_Page");
        btn_start_quiz.classList.add("first-page-remove");
        quiz_page.classList.remove("quiz-page-activated");
        result_page.classList.add("activate_result_page");

        document.body.style.backgroundImage = "url('/04--Images/bg-10.jpg')";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundSize = "auto auto"
        document.body.style.transition = "all 0.3s ease"

        let your_final_score = '<span>Scores<span class="obt-score">' + your_score + '</span>/ ' + sample_questions.length + '</span>';

        result_page_final_score.innerHTML = your_final_score;
}