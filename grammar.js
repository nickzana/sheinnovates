/**
 * @typedef GrammarBotClient
 *
 * Client for the GrammarBot API.
 */
class GrammarBotClient {
	_apiKey = "f8a5476c0dmsh0944856f713f44ep14a1dfjsn96d9d75c6d1b";

	ROOT_URL = "https://grammarbot.p.rapidapi.com/check";

	/*
	 * Builds a request to check the grammar of the provided text.
	 *
	 * @param {string} text		- The text of the string to check for grammar mistakes
	 * @param {string} lang		- The language to check the grammar of the text in
	 */
	buildCheckRequest(text, lang) {
		let xhr = new XMLHttpRequest();

		let url = new URL(this.ROOT_URL);
		url.searchParams.set('text', text);
		url.searchParams.set('language', lang);

		xhr.withCredentials = true;
		xhr.open("POST", url);
		xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
		xhr.setRequestHeader("x-rapidapi-host", "grammarbot.p.rapidapi.com");
		xhr.setRequestHeader("x-rapidapi-key", this._apiKey);

		return xhr;
	}

	/*
	 * Called when the grammar results are received from the API.
	 * @callback GrammarBotClient~receiver
	 * @param {Object[]} corrections		- The array of correction objects received from the GrammarBot API.
	 */

	/*
	 * Checks the grammar of the provided text in the given language and calls
	 * onReceive with the result of the grammar
	 *
	 * @param {string} text		- The text of the string to check for grammar mistakes
	 * @param {string} lang		- The language to check the grammar of the text in
	 *
	 * @param {GrammarBotClient~receiver}		- Callback to receive the grammar results from the API
	 */
	check(text, lang, receiver) {
		let request = this.buildCheckRequest(text, lang);
		request.addEventListener("readystatechange", function() {
			if (this.readyState == this.DONE) {
				let grammarCorrections = [];
				var json = JSON.parse(this.responseText);

				for(const match of json.matches) {
					grammarCorrections.push(match.message);
				}

				receiver(grammarCorrections);
			}
		});

		request.send();
	}

	constructor(apiKey) {
		//this._apiKey = apiKey;
	}
}
