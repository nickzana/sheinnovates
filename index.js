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
