// define global variable to keep track of current question
let questionNumber = 0;
// set global variable of score
let score = 0
// set up highscore array for local storage
scoresArray = [[0, 0]];
// Define variables for DOM manipulation

let mainText = document.querySelector(".mainTextBox");
let inputSection = document.querySelector(".choices");
let feedbackSection = document.querySelector(".results");
let start = document.querySelector(".start");
let seeHighScores = document.querySelector("#highScores");
//variables for creating answer lists
let questList = document.createElement("ul");
let questChoice0 = document.createElement("li");
let questChoice1 = document.createElement("li");
let questChoice2 = document.createElement("li");
let questChoice3 = document.createElement("li");
// let hsTable = document.createElement("table");
// let hsRow = document.createElement("tr");
// let hsPara = document.createElement("p");
// Define questions for quiz
let questionsObject = {
    question0: {
        question: "What is the opening tag on every HTML page?",
        choices: ["<!DOCTYPE html>", "<head>", "<html>", "<body>"],
        answer: "<!DOCTYPE html>"
    },
    question1: {
        question: "What is the CSS attribute that changes text color?",
        choices: ["color", "font", "background", "border"],
        answer: "color"
    }
};
//convert questions from object to array
questionArray = Object.values(questionsObject);


//Set event listener to High Scores button -- need to make function
seeHighScores.addEventListener("click", showHighScores);

// Set the start button
start.addEventListener("click", startQuiz);

// The quiz function itself
function startQuiz() {

    console.log(questionNumber);
    console.log(questionArray);
    console.log(questionArray[questionNumber]["question"])
    //Replace main text with question
    mainText.innerHTML = '<h2>' + questionArray[questionNumber]["question"] + '<h2>';
    //clear response text
    feedbackSection.innerHTML = "";
    // populate choices as li 
    questList.setAttribute("class", "possAnswers");
    questChoice0.setAttribute("class", "guess0 guessRow");
    questChoice1.setAttribute("class", "guess1 guessRow");
    questChoice2.setAttribute("class", "guess2 guessRow");
    questChoice3.setAttribute("class", "guess3 guessRow");
    inputSection.appendChild(questList);
    questChoice0.textContent = questionArray[questionNumber].choices[0];;
    questList.appendChild(questChoice0);
    questChoice1.textContent = questionArray[questionNumber].choices[1];;
    questList.appendChild(questChoice1);
    questChoice2.textContent = questionArray[questionNumber].choices[2];;
    questList.appendChild(questChoice2);
    questChoice3.textContent = questionArray[questionNumber].choices[3];;
    questList.appendChild(questChoice3);
    //Add event listener for clicks on li choices
    // Do I need to do this on every run of startQuiz
    document.querySelector(".guess0").addEventListener("click", checkGuess);
    document.querySelector(".guess1").addEventListener("click", checkGuess);
    document.querySelector(".guess2").addEventListener("click", checkGuess);
    document.querySelector(".guess3").addEventListener("click", checkGuess);
    return;
}

function checkGuess(event) {
    //returns text value of click event
    console.log(event.path[0].textContent);
    console.log(questionArray[questionNumber]["answer"]);
    if (event.path[0].textContent === questionArray[questionNumber]["answer"]) {
        questionNumber++;
        console.log(questionNumber);
        feedbackSection.textContent = "Correct!";
        score += 5;
        //set timer before loop
        // var pauseSeconds = 5;

        // var pauseTime = setInterval(function() {
        //     console.log('pause seconds = ' +pauseSeconds);

        //     if (pauseSeconds === 0) {
        //         clearInterval(pauseTime);
        //     };
        //     pauseSeconds--;
        // }, 1000);
        // setTimeout(function() {
        //     console.log('pause');
        // }, 3000);
    } else {
        questionNumber++;
        feedbackSection.textContent = "Wrong!";
    }

    if (questionNumber === questionArray.length) {
        pauseTimer();
        // setTimeout(finalScore, 1000);
    } else {
        pauseQuiz();
    };
}

function finalScore() {
    console.log("end of question array");
    feedbackSection.innerHTML = "";
    //show end of game
    mainText.textContent = "Finished!";
    inputSection.textContent = "Your final score is: " + score;
    // check for high scores
    var latestScores = JSON.parse(localStorage.getItem("highScores"));
    console.log(latestScores)
    //initialize scores variable if doesn't already exist in local storage
    if (latestScores === null) {
        latestScores = scoresArray;
        localStorage.setItem("highScores", JSON.stringify(latestScores));
        console.log(latestScores);
        console.log(latestScores.length);
        //print results to screen
        inputSection.innerHTML = '<p>Your final score is: ' + score + '.</p> <h2>New High Score!</h2><label for="initials">Enter your initials:</label> <input type="text" name="initials" class="initials"></input><button class="initialSubmit">Submit</button>';
        //add event listener for button
        var hsSubmitButton = document.querySelector(".initialSubmit");
        hsSubmitButton.addEventListener("click", logHighScores);
        console.log(hsSubmitButton);
    } else {
        //check to see if top ten scores
        var latestScores = JSON.parse(localStorage.getItem("highScores"));
        console.log(latestScores.length);
        highScoresLength = latestScores.length;
        console.log(highScoresLength);
        for (i = 0; i < highScoresLength; i++) {
            console.log(latestScores[i][1]);
            if (score >= latestScores[i][1]) {
                inputSection.innerHTML = '<p>Your final score is: ' + score + '.</p> <h2>New High Score!</h2><label for="initials">Enter your initials:</label> <input type="text" name="initials" class="initials"></input><button class="initialSubmit">Submit</button>';
                //add event listener for button
                var hsSubmitButton = document.querySelector(".initialSubmit");
                hsSubmitButton.addEventListener("click", logHighScores);
            } else {
                inputSection.innerHTML = '<p>Your final score is: ' + score + '.</p>';
                feedbackSection.innerHTML = '<button class="playAgain">play Again?</button><button class="seeHS">See High Scores</button>';
                let startAgain = document.querySelector(".playAgain");
                startAgain.addEventListener("click", startOver);
                let seeHS = document.querySelector(".seeHS");
                seeHS.addEventListener("click", showHighScores);
            }
        }
    }

}


function logHighScores() {
    console.log(score);
    hsInitials = document.querySelector(".initials").value;
    console.log(hsInitials);
    var latestScores = JSON.parse(localStorage.getItem("highScores"));
    console.log(latestScores.length);
    //Make sure no more than 10 entries in latest scores
    if (latestScores > 10) {
        latestScores.pop();
    }
    highScoresLength = latestScores.length;
    //find location in high scores array for latest high score
    for (i = 0; i < highScoresLength; i++) {
        console.log(latestScores[i][1]);
        if (score >= latestScores[i][1]) {
            if (i === 0) {
                //add new score to beginning, then add to i to stop loop
                latestScores.unshift([hsInitials, score]);
                i = i + highScoresLength;
                //double check if latest score only has 10 items
                if (latestScores.length > 10) {
                    latestScores.pop();

                }
            } else if (i === 10) {
                // if at the end of the array, remove the last item and add the new data
                latestScores.pop();
                latestScores.push([hsInitials, score]);
            } else {
                // add new data in the current index
                latestScores.splice(i, 0, [hsInitials, score]);
                //if latestscore is now > 10, remove the last element
                if (latestScores.length > 10) {
                    latestScores.pop();
                }
            }

        }
    }
    //save new high scores
    console.log(latestScores);
    localStorage.setItem("highScores", JSON.stringify(latestScores));
    showHighScores();
}

function showHighScores() {
    mainText.innerHTML = "<h2 class='highScoreHeader'>High Scores</h2>";
    //get high scores from local storage
    var latestScores = JSON.parse(localStorage.getItem("highScores"));
    inputSection.textContent = "";

    console.log(latestScores.length);
    // To get for loop to work with multiple children, must define create element in each loop
    for (let i = 0; i < latestScores.length; i++) {
        console.log(i);
        var hsPara = document.createElement("p");
        hsPara.setAttribute("class", "highScoreRows")
        hsPara.innerText = latestScores[i][0] + ' - ' + latestScores[i][1];
        inputSection.appendChild(hsPara);
    };
    feedbackSection.innerHTML = '<button class="playAgain">play Again?</button><button class="clearHS">Clear High Scores?</button>';
    let playAgain = document.querySelector(".playAgain");
    playAgain.addEventListener("click", startOver);
    let clearHS = document.querySelector(".clearHS");
    clearHS.addEventListener("click", clearHighScores);
}

function clearHighScores() {
    latestScores = scoresArray;
    localStorage.setItem("highScores", JSON.stringify(latestScores));
    showHighScores();
}

function startOver() {
    location.reload();
}

function pauseQuiz() {
    var secondsLeft = 2;
    // stop listening for clicks on rows. clicking during timer causes errors
    document.querySelector(".guess0").removeEventListener("click", checkGuess);
    document.querySelector(".guess1").removeEventListener("click", checkGuess);
    document.querySelector(".guess2").removeEventListener("click", checkGuess);
    document.querySelector(".guess3").removeEventListener("click", checkGuess);
    // Sets interval in variable
    var timerInterval = setInterval(function () {
        secondsLeft--;
        if (secondsLeft === 0) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            // Calls function to create and append image
            startQuiz();
        }

    }, 1000);
}

function pauseTimer() {
    var secondsLeft = 2;
    // stop listening for clicks on rows. clicking during timer causes errors
    document.querySelector(".guess0").removeEventListener("click", checkGuess);
    document.querySelector(".guess1").removeEventListener("click", checkGuess);
    document.querySelector(".guess2").removeEventListener("click", checkGuess);
    document.querySelector(".guess3").removeEventListener("click", checkGuess);
    // Sets interval in variable
    var timerInterval = setInterval(function () {
        secondsLeft--;
        if (secondsLeft === 0) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            // Calls function to create and append image
            finalScore();
        }

    }, 1000);
}
