/**
 * @typedef	 {Object}	PageElements	- Class containing references to mutatable elements in the DOM
 */
class PageElements {

	questionContainer = document.getElementById("question-container");
	questionText = document.getElementById("question");
	recordButton = document.getElementById("record");
	transcriptText = document.getElementById("transcript-text");
	nextQuestionButton = document.getElementById("change-question-button");
	corrections = document.getElementById("transcript-result");
	periodDropdown = document.getElementById("period_dropdown");
	categories = document.getElementById("categories");
	transcriptContainer = document.getElementById("transcript-container");
	// TODO: update id to match other ID styles
	tryAgainButton = document.getElementById("tryAgainBtn");

	constructor() {
		this.nextQuestionButton.addEventListener('click', () => {
			updateQuestion(randomQuestion(this.periodDropdown.value))
		})

		this.categories.addEventListener('click', () => {
			if (this.periodDropdown.value != -1) {
				this.questionContainer.style.display = 'flex'
				updateQuestion(randomQuestion(this.periodDropdown.value))
			}
			if (this.periodDropdown.value == -1) this.questionContainer.style.display = 'none'
		})

		this.recordButton.addEventListener('click', () => {
			if (state.recording == false) {
				state.transcriber.start();
				this.recordButton.textContent = "Stop Recording"
				state.recording = true;
			} else {
				this.recordButton.textContent = "Record"
				state.recording = false;
				this.transcriptContainer.style.display = 'block'
				this.transcriptContainer.scrollIntoView()
			}
		})

		this.tryAgainButton.addEventListener('click', () => {
			this.transcriptContainer.style.display = 'none'
		})
	}
}
