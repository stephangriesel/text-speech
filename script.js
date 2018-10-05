// Var for SpeechAPI, more info on API can be found here: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis
const synth = window.speechSynthesis;

// DOM elements
const textForm = document.querySelector("form");
const textInput = document.querySelector("#text-input");
const rateValue = document.querySelector("#rate-value");
const rate = document.querySelector("#rate");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");
const voiceSelect = document.querySelector("#voice-select");
const body = document.querySelector("body");

// Initialize voices array
let voices = [];

const getVoices = () => {
  voices = synth.getVoices();
  console.log("Get Voices!");
  console.log(voices);

  // For each voices (aka loop)
  voices.forEach(voice => {
    // Create option element
    const option = document.createElement("option");
    // Complete option with voice and lang
    option.textContent = voice.name + "(" + voice.lang + ")";
    // Set attributes
    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);
    voiceSelect.appendChild(option);
  });
};

getVoices();
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

// Add speak function
const speak = () => {
  // Confirm if speaking
  if (synth.speaking) {
    console.error("I am here speaking already..");
    return;
  }
  if (textInput.value !== "") {
    // Background image
    body.style.background = "#FFF url(6.gif)";
    body.style.backgroundRepeat = "repeat-x";
    body.style.backgroundSize = "100% 100%";
    body.style.backgroundPosition = "500px 200px";

    // Get text
    const speakText = new SpeechSynthesisUtterance(textInput.value);

    // End speak
    speakText.onend = e => {
      console.log("Finished talking to you...");
      body.style.background = "#FFF";
    };

    // Error
    speakText.onerror = e => {
      ("ERROR ERROR!!");
    };

    //  Voice
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute(
      "data-name"
    );

    // Voice loop
    voices.forEach(voice => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });

    // Pitch & Rate
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;
    // Say it
    synth.speak(speakText);
  }
};

// Event Listener

// Form submit
textForm.addEventListener("submit", e => {
  e.preventDefault();
  speak();
  textInput.blur();
});

// Value change for rate
rate.addEventListener("change", e => (rateValue.textContent = rate.value));

// Value change for pitch
pitch.addEventListener("change", e => (pitchValue.textContent = pitch.value));

// Voice select change
voiceSelect.addEventListener("change", e => speak());
