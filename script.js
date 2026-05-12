let box = document.querySelector(".box");
let btn = document.querySelector("button");

const speakfun = (input) => {
    let speakInput = new SpeechSynthesisUtterance(input);
    speakInput.rate = 1;
    speakInput.pitch = 1;
    speakInput.volume = 1;
    speakInput.lang = "hi-IN";//FOR INDIAN women (en-IN) , indian men (hi-IN)
    window.speechSynthesis.speak(speakInput);
}

window.onload = () => {
    greetingfun();
}

const greetingfun = () => {
    let date = new Date();
    let hour = date.getHours();
    if (hour >= 0 && hour < 12) {
        speakfun("good morning users , how can i help you!");
    } else if (hour >= 12 && hour < 16) {
        speakfun("good afternoon users , how can i help you!");
    } else {
        speakfun("good evening users , how can i help you!");
    }
}

const startVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
        let recognition = new webkitSpeechRecognition();
        recognition.lang = "en-US";
        recognition.onresult = (e) => {
            let spokenText = e.results[0][0].transcript;
            handleCommands(spokenText.toLowerCase());
            box.classList.remove("btn-box");
            btn.innerHTML = `<i class="fa-solid fa-microphone-lines-slash"></i>`
        }
        recognition.start();
    } else {
        alert("your browser does not support voice input");
    }
}

btn.onclick = () => {
    box.classList.add("btn-box");
    btn.innerHTML = `<i class="fa-solid fa-microphone-lines"></i>`
    startVoiceInput();
}

const handleCommands = (command) => {
    if (command.includes("hello")) {
        speakfun("hello,nice too hear you users")
    } else if (command.includes("who are you")) {
        speakfun("virtual assistant");
    } else if (command.includes("owner")) {
        speakfun("don't ask my owner will get angry");
    } else if (command.includes("when did you developed") || command.includes("your birth date")) {
        speakfun("i was developed on 6-july-2025");
    } else if (command.includes("open youtube")) {
        speakfun("opening.. youtube");
        window.location.href = "https://www.youtube.com";
    } else if (command.includes("open google")) {
        speakfun("opening.. google");
        window.location.href = "https://www.google.com";
    } else if (command.includes("open facebook")) {
        speakfun("opening.. facebook");
        window.location.href = "https://www.facebook.com";
    } else if (command.includes("open instagram")) {
        speakfun("opening.. instagram");
        window.location.href = "https://www.instagram.com";
    } else if (command.includes("open snapchat")) {
        speakfun("opening.. snapchat");
        window.location.href = "https://www.snapchat.com";
    } else if (command.includes("open calculator")) {
        speakfun("opening.. calculator");
        window.location.href = "calculator://";
    } else if (command.includes("tell me time") || command.includes("what's the time like")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" })
        speakfun(time);
    } else if (command.includes("tell me date") || command.includes("what is today's date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "long" })
        speakfun(date);
    } else if (command.includes("who is neema's mother")) {
        speakfun("her mother is meena devi ,hello meena devi ,you are welcomed on this website");
    } else {
        speakfun(`this is,what i found on internet regarding ${command}`);
        window.location.href = `https://www.google.com/search?q=${command}`;
    }
}
