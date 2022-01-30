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
	categories = document.getElementById("categories");
	transcriptContainer = document.getElementById("transcript-container");
	transcriptResult = document.getElementById("transcript-result");
	textToSpeech = document.getElementById("text-to-speech");
	recordingContainer = document.getElementById("recording-container");

	constructor() {
		this.nextQuestionButton.addEventListener('click', () => {
			state.question = randomQuestion(state.category);
		})

		this.categories.addEventListener('change', (e) => {
			state.category = e.target.value;
		})

		this.textToSpeech.addEventListener('click', () =>{
			speakTheQuestion(this.questionText.textContent);
		})

		this.recordButton.onclick = function() {
			console.log("Pressed record");
			state.isTranscribing = !state.isTranscribing;
		};
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

		if (state.category == "none") {
			this.questionContainer.style.display = 'none';
		} else {
			this.questionContainer.style.display = 'flex';
			this.recordButton.scrollIntoView();
		}

		if (state.isTranscribing) {
			this.recordingContainer.style.display = 'none';
			this.recordButton.textContent = "Stop Recording";
			this.transcriptContainer.style.display = "none";
		} else {
			this.recordButton.textContent = "Record";

			if (state.corrections != null) {
				this.transcriptContainer.style.display = "block";
				this.transcriptContainer.scrollIntoView();
			}
		}
	}
}
