document.getElementById("start").onclick = function() {
        // new speech recognition object
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
    var SpeechRecognitionEvent = window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;


    // This runs when the speech recognition service starts
    recognition.onstart = function() {
        console.log("We are listening. Try speaking into the microphone.");
    };
    // This runs when the speech recognition service returns result
    recognition.onresult = function(event) {
        var transcript = event.results[0][0].transcript;
        var confidence = event.results[0][0].confidence;
    };

    // start recognition
    $('start').on('click', function(e) {
        recognition.start();
      });
}

document.getElementById("stop").onclick = function() {}

$('stop').on('click', function(_) {
	recognition.stop();
  });
