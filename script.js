// Var for SpeechAPI, more info on API can be found here: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis
const speech = window.speechSynthesis;

// DOM elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const rateValue = document.querySelector('#rate-value');
const rate = document.querySelector('#rate');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const voiceSelect = document.querySelector('#voice-select');

// Initialize voices array
let voices = [];

const getVoices = () => {
    voices = speech.getVoices();
    console.log("Get Voices!")
    console.log(voices);

    // For each voices (aka loop)
    voices.forEach(voice => {
        // Create option element
        const option = document.createElement('option');
        // Complete option with voice and lang
        option.textContent = voice.name + '(' + voice.lang +')';
        // Set attributes
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
    });

};

getVoices();
if(speech.onvoiceschanged !== undefined) {
    speech.onvoiceschanged = getVoices;
}