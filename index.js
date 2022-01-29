var state;

/**
 * @typedef	 {Object}	State			- Class representing the state of the program
 * @property {string}	question		- The current question being displayed to the user.
 * @property {string}	language		- The language the user speaks
 * @property {number}	difficulty		- The difficulty of question to present to the user
 */
class State {
	_question;

	/**
	 * @param {string} value			- the value to set the question to
	 */
	set question(value) {
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
