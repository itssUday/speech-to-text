const resultElement = document.getElementById('result');
let recognition;

function startConverting() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        setupRecognition(recognition);
        recognition.start();
    } else {
        alert("Speech Recognition not supported in this browser.");
    }
}

function setupRecognition(recognition) {
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognition.onresult = function(event) {
        const { finalTranscript, interimTranscript } = processResult(event.results);
        resultElement.innerHTML = finalTranscript + interimTranscript;
    }
}

function processResult(results) {
    let finalTranscript = '';
    let interimTranscript = '';

    for (let i = 0; i < results.length; i++) {
        let transcript = results[i][0].transcript;
        transcript = transcript.replace(/\n/g, "<br>");
        if (results[i].isFinal) {
            finalTranscript += transcript;
        } else {
            interimTranscript += transcript;
        }
    }
    return { finalTranscript, interimTranscript };
}

function stopConverting() {
    if (recognition) {
        recognition.stop();
        recognition = null;
    }
}