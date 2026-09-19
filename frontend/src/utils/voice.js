const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

export function startListening(language = "en-IN") {
  return new Promise((resolve, reject) => {
    if (!SpeechRecognition) {
      reject(
        new Error(
          "Speech recognition is not supported in this browser."
        )
      );
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = language;
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      console.log("Sahaay voice recognition started.");
    };

    recognition.onresult = (event) => {
      const transcript =
        event.results[0][0].transcript;

      console.log("Sahaay recognized:", transcript);

      resolve(transcript);
    };

    recognition.onerror = (event) => {
      console.error(
        "Sahaay speech recognition error:",
        event.error
      );

      reject(new Error(event.error));
    };

    recognition.onend = () => {
      console.log("Sahaay voice recognition ended.");
    };

    try {
      recognition.start();
    } catch (error) {
      console.error(
        "Could not start speech recognition:",
        error
      );

      reject(error);
    }
  });
}


export function speakText(
  text,
  language = "en-IN"
) {
  return new Promise((resolve, reject) => {
    if (!("speechSynthesis" in window)) {
      reject(
        new Error(
          "Speech synthesis is not supported in this browser."
        )
      );
      return;
    }

    if (!text) {
      resolve();
      return;
    }

    window.speechSynthesis.cancel();

    const utterance =
      new SpeechSynthesisUtterance(text);

    utterance.lang = language;
    utterance.rate = 0.95;
    utterance.pitch = 1;

    utterance.onend = () => {
      resolve();
    };

    utterance.onerror = () => {
      reject(
        new Error("Speech synthesis failed.")
      );
    };

    window.speechSynthesis.speak(utterance);
  });
}


export function stopSpeaking() {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}