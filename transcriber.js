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
