var state;

/** Class representing the state of the program */
class State {
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

function changeString(userInput){
    userInput = userInput.split(' ').join('%20');
    var formatUserInput = "text=" + userInput + "&language=en-US";
    console.log(formatUserInput)
    return formatUserInput;
}


function obj(){
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

/**
 * Return a random element from an array
 * @param {*[]} arr - The array to select an element from
 * @returns {*}
 */
Array.prototype.random = function (arr) {
	return arr[Math.floor(Math.random() * arr.length())];
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
	return questions.random();
}

/**
 * Runs on launch of the site to do initial setup
 */
function onStart() {
	// TODO: Get default language from browser
	state = new State('en-US', 5);
}

/** Execute initialization code */
onStart();
