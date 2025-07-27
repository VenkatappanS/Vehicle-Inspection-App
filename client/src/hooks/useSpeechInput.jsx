import { useState } from 'react';

const useSpeechInput = () => {
  const [isListening, setIsListening] = useState(false);
  const [activeField, setActiveField] = useState('');

  const startListening = (fieldLabel, onResult) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition not supported in this browser');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setActiveField(fieldLabel);
    setIsListening(true);
    console.log("🎤 Listening started for:", fieldLabel);


    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
      setIsListening(false);
    };

    recognition.onerror = (err) => {
      console.error('Speech recognition error:', err);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  return { isListening, activeField, startListening };
};

export default useSpeechInput;
