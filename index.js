var state;
var elements;
var grammar;

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
		if(value != null){
			var firstLetter = value.charAt(0).toUpperCase();
			console.log(firstLetter);
			value = value.replace(value.charAt(0), firstLetter);
		}
		updateTranscriptText(value);
		this._transcriptText = value;
		if (!this.isTranscribing) {
			grammar.check(this._transcriptText, this.language, function(corrections) {
				state.corrections = corrections;
			});
		}
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
	_corrections;

	set corrections(value){
		updateTranscriptResult(value);
		this._corrections = value;
	}

	get corrections(){
		return this._corrections;
	}

	transcriber;

	/**
	 * Sends transcript to grammar checker and updates errors
	 */
	checkTranscript(transcript) {
		console.log(transcript)
		updateTranscriptText(transcript)
		var corrections = grammarCorrections(transcript)
		updateTranscriptResult(corrections)
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

function tryAgain(){
	grammarCorrections = [];
	//speechtotext
	//formatString(speachtoText)
	//grammarcorretipn() returns errors
	//state.errors=
}

function speakTheQuestion(question){
	var synthesis = window.speechSynthesis;
	var utterance = new SpeechSynthesisUtterance(question);
	synthesis.speak(utterance);
}

function updateQuestion(newQuestion) {
	elements.questionText.textContent = newQuestion
}

function updateTranscriptText(newTranscript) {
	elements.transcriptText.textContent = newTranscript
}
function clearTranscriptText() {
	elements.transcriptText.textContent = ""
}

function updateTranscriptResult(newTranscript) {
	if (newTranscript != undefined) {
		while (elements.corrections.firstChild) {
			elements.corrections.removeChild(elements.corrections.firstChild);
		}
		for (let i = 0; i < newTranscript.length; i++) {
			let listItem = document.createElement('li')
			listItem.textContent = newTranscript[i]
			console.log(newTranscript[i])
			elements.corrections.appendChild(listItem)
		}
	}
}
function clearTranscriptResult() {
	elements.corrections.textContent = ""
}

/**
 * Runs on launch of the site to do initial setup
 */
function onStart() {
	elements = new PageElements();
	// TODO: Fill with API Key
	grammar = new GrammarBotClient("");
	// TODO: Get default language from browser
	state = new State('en-US', 5);
}

/** Execute initialization code */
onStart();
