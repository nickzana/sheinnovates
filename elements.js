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
	tryAgainButton = document.getElementById("try-again-btn");
	transcriptResult = document.getElementById("transcript-result");

	constructor() {
		this.nextQuestionButton.addEventListener('click', () => {
			state.question = randomQuestion(this.periodDropdown.value);
		})

		this.categories.addEventListener('click', () => {
			if (this.periodDropdown.value != -1) {
				this.questionContainer.style.display = 'flex'
				state.question = randomQuestion(this.periodDropdown.value);
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
				state.transcriber.stop();
				state.recording = false;
				this.transcriptContainer.style.display = 'block'
				this.transcriptContainer.scrollIntoView()
			}
		})

		this.tryAgainButton.addEventListener('click', () => {
			this.transcriptContainer.style.display = 'none'
		})
	}

	updateTranscriptResult(newTranscript) {
		if (newTranscript != undefined) {
			while (elements.corrections.firstChild) {
				elements.corrections.removeChild(elements.corrections.firstChild);
			}
			for (let i = 0; i < newTranscript.length; i++) {
				let listItem = document.createElement('li')
				listItem.textContent = newTranscript[i]
				elements.corrections.appendChild(listItem)
			}
			if (newTranscript.length == 0) {
				let listItem = document.createElement('li')
				listItem.textContent = "Correct! :)"
				elements.transcriptResult.appendChild(listItem)
			}
		}
	}

	updateGui(state) {
		this.questionText.textContent = state.question;

		this.transcriptText.textContent = state.transcriptText;

		this.updateTranscriptResult(state.corrections);
	}
}
