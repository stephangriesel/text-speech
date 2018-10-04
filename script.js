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

// Add speak function
const talktome = () => {
    // Confirm if speaking
    if(speech.speaking) {
        console.error('I am here speaking already..');
        return;
    }
    if(textInput.value !== ''){
        
        // Get text
        const speakText = new SpeechSynthesisUtterance(textInput.value);
        
        // End speak
        speakText.onend = e => {
            console.log('Finished talking to you...')
        }

        // Error
        speakText.onerror = e => {
            ('ERROR ERROR!!');
        }

        //  Voice 
        const voiceChoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

        // Voice loop
        voices.forEach(voice => {
            if(voice.name === voiceChoice) {
                speakText.voice = voice;
            }
        });

        // Pitch & Rate
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;
        // Say it
        speech.speak(speakText);

    }
};

