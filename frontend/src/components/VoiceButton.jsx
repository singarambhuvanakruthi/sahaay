import { useState } from "react";

import { askSahaay } from "../api/sahaayAi";
import {
  startListening,
  speakText,
  stopSpeaking,
} from "../utils/voice";

function VoiceButton({
  language = "en-IN",
}) {
  const [isListening, setIsListening] =
    useState(false);

  const [isSpeaking, setIsSpeaking] =
    useState(false);

  const [recognizedText, setRecognizedText] =
    useState("");

  const [answer, setAnswer] =
    useState("");

  const [error, setError] =
    useState("");

  const getLanguageName = () => {
    if (language === "hi-IN") {
      return "Hindi";
    }

    if (language === "te-IN") {
      return "Telugu";
    }

    return "English";
  };

  const handleVoiceClick = async () => {
    setError("");
    setRecognizedText("");
    setAnswer("");
    setIsListening(true);

    try {
      const text =
        await startListening(language);

      setRecognizedText(text);

      const data =
        await askSahaay(
          text,
          getLanguageName()
        );

      setAnswer(data.answer);
      setIsSpeaking(true);

      try {
        await speakText(
          data.answer,
          language
        );
      } finally {
        setIsSpeaking(false);
      }
    } catch (err) {
      console.error(
        "Sahaay voice error:",
        err
      );

      setError(
        "Could not reach Sahaay AI. Please check that the backend is running."
      );
    } finally {
      setIsListening(false);
    }
  };

  const handleStop = () => {
    stopSpeaking();

    setIsSpeaking(false);
    setIsListening(false);
  };

  return (
    <div className="voice-button-wrapper">
      <button
        type="button"
        className={`voice-button ${
          isListening ? "listening" : ""
        }`}
        onClick={handleVoiceClick}
        aria-label={
          isListening
            ? "Listening"
            : "Start voice assistance"
        }
        disabled={
          isListening || isSpeaking
        }
      >
        <span
          className="voice-icon"
          aria-hidden="true"
        >
          Mic
        </span>

        <span>
          <strong>
            {isListening
              ? "Listening..."
              : isSpeaking
              ? "Speaking..."
              : "Voice"}
          </strong>
          <small>Ask Sahaay with speech</small>
        </span>
      </button>

      {(isListening || isSpeaking) && (
        <button
          type="button"
          className="voice-stop-button"
          onClick={handleStop}
        >
          Stop
        </button>
      )}

      {recognizedText && (
        <div className="voice-result">
          <p>
            <strong>You said:</strong>
          </p>

          <p>
            {recognizedText}
          </p>
        </div>
      )}

      {answer && (
        <div className="voice-result">
          <p>
            <strong>Sahaay says:</strong>
          </p>

          <p>
            {answer}
          </p>
        </div>
      )}

      {error && (
        <p
          className="voice-error"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default VoiceButton;
