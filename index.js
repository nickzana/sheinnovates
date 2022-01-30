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
 * @property {string}	transcriptText	- A variable to store the text transcribed from the user's speech
 * @property {Object[]} corrections		- Array that stores the grammar errors
 * @property {Transcriber} transcriber	- Voice transcription provider
 * @property {boolean}  isTranscribing  - Whether the user is currently speaking
 */
class State {
	recording = false;
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

	_transcriptText;

	/**
	 * @param {string} value			- the value to set the transcriptText to
	 */
	set transcriptText(value) {
		this._transcriptText = value;
	}

	get transcriptText() {
		return this._transcriptText;
	}

	_isTranscribing = false;

	set isTranscribing(value) {
		this._isTranscribing = value;
	}

	get isTranscribing() {
		return this._isTranscribing;
	}

	transcriber;

	/**
	 * Sends transcript to grammar checker and updates errors
	 */
	checkTranscript(transcript) {
		console.log(transcript);
		// TODO: Send transcription text to grammar checker and update errors array
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
		this.transcriptText = "";

		this.transcriber  = new Transcriber(
			// receiver: Called when new text is sent from the Transcriber
			function(transcript) { 
				state.transcriptText = transcript 
			},
			// onEnd: Called when transcription has completed, either automatically or manually
			function(_) {
				state.isTranscribing = false;
				state.checkTranscript(state.transcriptText);
			},
			// whether transcription is continuous
			true, // TODO: This could be dynamically decided based on if the user is holding the button or just pressed it
			// The language, only English for now
			'en-US',
			// interimResults, allows for incremental handling of transcript
			false
		);
	}
}


var SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

/**
 * @typedef Transcriber
 *
 * Transcriber code adapted from MDN Web Speech API Documentation Example Code
 * See https://github.com/mdn/web-speech-api/
 */
class Transcriber {
	
	_recognition;

	/**
	 * Called when the transcriber provides a string transcribed from the user's speech
	 * @callback Transcriber~receiver
	 * @param {string} transcript
	 */

	/**
	 * @param {Transcriber~receiver} receiver		- Callback to receive transcription
	 * @param {Transcriber~onEnd}	 onEnd			- Callback to perform at end of transcription
	 * @param {boolean}				 continuous		- Whether recognizer continues listening automatically after first sentence
	 * @param {string}				 lang,			- The language to detect and transcribe
	 * @param {boolean}				 intermResults,	- Whether to send results after each word spoken, or only at the end
	 */
	constructor(receiver, onEnd, continuous, lang, interimResults) {
		// Protect against unsuported browsers
		// if(window.speechRecognition == undefined) {
		// 	return null;
		// }

		// Protect against browsers that support the API but have not been verified to work
		this._recognition = new SpeechRecognition() || new webkitSpeechRecognition();
		if (this._recognition == null) {
			return null;
		}
		this._recognition.continuous = continuous;
		this._recognition.lang = lang;
		this._recognition.interimResults = interimResults;
		
		this._recognition.onresult = function(event) {
			const transcript = event.results[0][0].transcript;
			receiver(transcript);
		};

		this._recognition.onend = onEnd;
	}

	start() {
		if (this._recognition != null) {
			this._recognition.start();
		}

	}

	stop() {
		if (this._recognition != null) {
			this._recognition.stop();
		}
	}

	cancel() {
		if (this._recognition != null) {
			this._recognition.cancel();
		}
	}
}

function formatString(userInput){
    userInput = userInput.split(' ').join('%20');
    var formatUserInput = "text=" + userInput + "&language=en-US";
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
	var utterance = new SpeechSynthesisUtterance(question);
	synthesis.speak(utterance);
}

/**
 * Return a question to ask the user
 * @param {string} language - language of the question to return
 * @param {number} difficulty - difficulty of the question between 1 and 10
 * @returns {string}
 */
/**
 * Return a question to ask the user
 * @param {string} language - language of the question to return
 * @param {number} difficulty - difficulty of the question between 1 and 10
 * @returns {string}
 */
function randomQuestion(language, difficulty, category) {
	const ques =
`What is your name?
Where do you live?
Where are you from?
Where were you born?
What do you do?
What do you study?
Describe yourself in three words.
Tell me about yourself.
Who is your favourite person in the world and why?
What do you want to do when you’re older?
What type of house do you live in?
How many people are in your family?
Do you have any brothers or sisters?
What does your dad do?
What does your mum do?
Describe your brother/sister.
Are you married?
Do you have any pets?
Do you want any pets?
Do you want any children?
Do you have any children?
Describe your house.
Describe your city or town.
What do you like to do in your free time?
What sport do you do?
Do you prefer winter sports or summer sports?
What if your favourite sport?
Do you like listening to music?
Do you like reading books?
What was the last book you read
What was the last movie you watched?
What type of music do you like listening to?
What type of movies do you like to watch?
Do you prefer arts or sports?
Do you like art?
What do you like to do to relax?
What do you think of modern art?
Do you prefer team games or individual games?
Where is the best place you’ve ever been on holiday?
Where was the last place you went on holiday?
Do you prefer beaches or mountains?
Do you like to travel alone or in a group?
Do you prefer to eat in the hotel or at local restaurants?
Do you prefer to use the local currency or pay for everything on card?
Do you prefer to use a map or an app?
Do you prefer to plan your holiday or leave everything to chance?
Do you prefer to stay in a hotel or an air bnb?
Do you like to learn the language of the country you’re in or use English?`
	var questions = ques.split('\n');
	var prev = 0;
	if(category == 11)
	{
		prev = 0;
	}
	else if(category == 23)
	{
		prev = 11;
	}
	else if(category == 38)
	{
		prev = 23;
	}
	else if(category == 48)
	{
		prev ==38;
	}

	var ans =  questions[Math.floor(Math.random(category - prev) * questions.length) + prev];
}

const question = document.getElementById('question')
function updateQuestion(newQuestion) {
	question.textContent = newQuestion
}

const updateQuestionBtn = document.getElementById('change-question-button')
updateQuestionBtn.addEventListener('click', () => {
	updateQuestion(questions[Math.floor(Math.random()*questions.length)])
})

questions = ['question#1', 'question#2', 'question#3']

const transcriptText = document.getElementById('transcript-text')
function updateTranscriptText(newTranscript) {
	transcriptText.textContent = newTranscript
}

const transcriptResult = document.getElementById('transcript-result')
function updateTranscriptResult(newTranscript) {
	transcriptResult.textContent = newTranscript
}

const transcriptContainer = document.getElementById('transcript-container')
const recordBtn = document.getElementById('record')
recordBtn.addEventListener('click', () => {
	if (state.recording == false) {
		recordBtn.textContent = "Stop Recording"
		state.recording = true;
		alert("recording")
	} else {
		recordBtn.textContent = "Record"
		state.recording = false;
		transcriptContainer.style.display = 'block'
		transcriptContainer.scrollIntoView()
	}
})

const tryAgainBtn = document.getElementById('tryAgainBtn')

tryAgainBtn.addEventListener('click', () => {
	transcriptContainer.style.display = 'none'
})

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
