var state;
var elements;
var grammar;
/**
 * @typedef	 {Object}	State			- Class representing the state of the program
 * @property {string}	question		- The current question being displayed to the user.
 * @property {string}	transcriptText	- A variable to store the text transcribed from the user's speech
 * @property {Object[]} corrections		- Array that stores the grammar errors
 * @property {Transcriber} transcriber	- Voice transcription provider
 * @property {boolean}  isTranscribing  - Whether the user is currently speaking
 * @property {string}   category		- The category of question the user has selected
 */
class State {
	_question = randomQuestion("none");

	/**
	 * @param {string} value			- the value to set the question to
	 */
	set question(value) {
		//boolean if they want it to talk
		this._question = value;
		this.corrections = null;
		this.updateGui();
	}

	get question() {
		return this._question;
	}

	_transcriptText = "";

	/**
	 * @param {string} value			- the value to set the transcriptText to
	 */
	set transcriptText(value) {
		if (value == null) {
			this.transcriptText = "";
			return;
		}

		if (value.length == 0) {
			value = "";
		} else if(value.charAt(0) != value.charAt(0).toUpperCase()) {
			// Eliminate common speech transcription mistake of first letter being lowercase
			var firstLetter = value.charAt(0).toUpperCase();
			value = value.replace(value.charAt(0), firstLetter);
		}

		this._transcriptText = value;

		if (!this.isTranscribing) {
			grammar.check(this.transcriptText, 'en-US', function(corrections) {
				state.corrections = corrections;
				state.updateGui();
			});
		}

		this.updateGui();
	}

	get transcriptText() {
		return this._transcriptText;
	}

	_isTranscribing = false;

	set isTranscribing(value) {
		this._isTranscribing = value;

		if (this.isTranscribing) {
			this.transcriber.start();
		} else {
			state.transcriber.stop();
		}

		this.updateGui();
	}

	get isTranscribing() {
		return this._isTranscribing;
	}
	_corrections = null;

	set corrections(value) {
		this._corrections = value;
		this.updateGui();
	}

	get corrections(){
		return this._corrections;
	}

	transcriber;

	_category = "none";

	set category(value) {
		this._category = value;
		this.question = randomQuestion(this.category);
	}

	get category() {
		return this._category;
	}

	/**
	 * Create a state for the program
	 */
	constructor() {
		this.transcriber  = new Transcriber(
			// receiver: Called when new text is sent from the Transcriber
			function(transcript) {
				state.transcriptText = transcript
			},
			// onEnd: Called when transcription has completed, either automatically or manually
			function(_) {
				state.isTranscribing = false;
			},
			// whether transcription is continuous
			true, // TODO: This could be dynamically decided based on if the user is holding the button or just pressed it
			// The language, only English for now
			'en-US',
			// interimResults, allows for incremental handling of transcript
			false
		);

		this.updateGui();
	}

	updateGui() {
		elements.updateGui(this);
	}
}

function speakTheQuestion(question){
	var synthesis = window.speechSynthesis;
	var utterance = new SpeechSynthesisUtterance(question);
	if(SpeechSynthesisEvent != null)
		synthesis.speak(utterance);
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
	elements = new PageElements();
}

/** Execute initialization code */
onStart();
