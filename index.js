var state;
var elements;

/**
 * @typedef	 {Object}	PageElements	- Class containing references to mutatable elements in the DOM
 */
class PageElements {

	questionText = document.getElementById("question");
	recordButton = document.getElementById("record");
	transcriptText = document.getElementById("transcript-text");
	nextQuestionButton = document.getElementById("change-question-button");
	errors = document.getElementById("transcript-result");

	constructor() {}
}

/**
 * @typedef	 {Object}	State			- Class representing the state of the program
 * @property {string}	question		- The current question being displayed to the user.
 * @property {string}	language		- The language the user speaks
 * @property {number}	difficulty		- The difficulty of question to present to the user
 * @property {_errors} grammarCorrections - Array that stores the grammar errors
 */
class State {
	_question;

	/**
	 * @param {string} value			- the value to set the question to
	 */
	set question(value) {
		if(true)//boolean if they want it to talk
			speakTheQuestion(value);

		this._question = value;
	}

	get question() {
		return this._question;
	}

	_language;

	/**
	 * @param {string} value			- the value to set the language to
	 */
	set language(value) {
		this._language = value;
	}

	get language() {
		return this._language;
	}

	_difficulty;

	/**
	 * @param {number} value			- the value to set the difficulty to
	 */
	set difficulty(value) {
		this._difficulty = value;
	}

	get difficulty() {
		return this._difficulty;
	}


	/**
	 * Create a state for the program
	 * @param {string} language - the language the user speaks
	 * @param {number} difficulty - the difficulty of the questions
	 */
	constructor(language, difficulty) {
		this.language = language;
		this.difficulty = difficulty;
		this.question = randomQuestion(language, difficulty);
	}
}

function formatString(userInput){
    userInput = userInput.split(' ').join('%20');
    var formatUserInput = "text=" + userInput + "&language=en-US";
    console.log(formatUserInput)
    return formatUserInput;
}

function tryAgain(){
	grammarCorrections = []; 
	//speechtotext
	//formatString(speachtoText)
	//grammarcorretipn() returns errors
	//state.errors=
}

function grammarCorrections(){
    const data = changeString("I goes too the stores");
    const grammarCorrections = [];
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            var json = JSON.parse(this.responseText);
            console.log(this.responseText);
            if(json.matches.length == 0){
                console.log("Correct")
            }else{
                for(const match of json.matches){
                    grammarCorrections.push(match.message);
                }
                console.log(grammarCorrections);
				return grammarCorrections;
			}
        }

    });

    xhr.open("POST", "https://grammarbot.p.rapidapi.com/check");
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("x-rapidapi-host", "grammarbot.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "f8a5476c0dmsh0944856f713f44ep14a1dfjsn96d9d75c6d1b");

    xhr.send(data);
}
function getUserInput(){
    var transcript = "";
    if("webkitSpeechRecognition" in window){
        var recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
 //stop on mouse up
    document.onmousedown = function(){
        recognition.onstart = function(){
            console.log("Recording started");
        };
    }
    document.onmouseup = function(){
        recognition.onres
    }



    }else{
        console.log("Not supported by Browser")
    }

}

function speakTheQuestion(question){
	var synthesis = window.speechSynthesis;
	var utterance = new SpeechSynthesisUtterance(userinput);

	synthesis.speak(utterance);
}

/**
 * Return a question to ask the user
 * @param {string} language - language of the question to return
 * @param {number} difficulty - difficulty of the question between 1 and 10
 * @returns {string}
 */
function randomQuestion(language, difficulty) {
	// TODO: Pull a quote from a database
	var questions = [
		 "What is your favorite animal?",
		 "What is your favorite color?"
	];
	var randQuestion = questions[Math.floor(Math.random() * questions.length)];
	// if(true)
	// 	speakTheQuestion(randQuestion);

	return randQuestion;
}
/**
 * Runs on launch of the site to do initial setup
 */
function onStart() {
	// TODO: Get default language from browser
	state = new State('en-US', 5);
	elements = new PageElements();
}

/** Execute initialization code */
onStart();
